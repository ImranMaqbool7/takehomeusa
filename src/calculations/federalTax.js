import { FEDERAL_TAX_BRACKETS, STANDARD_DEDUCTIONS } from '../data/taxBrackets.js';

/**
 * Calculate US Federal Income Tax
 * @param {number} grossIncome - Pre-tax adjusted income eligible for federal tax
 * @param {string} filingStatus - 'single' | 'married_jointly' | 'married_separately' | 'head_of_household'
 * @returns {object} Federal tax breakdown
 */
export function calculateFederalTax(grossIncome, filingStatus = 'single') {
  const safeGross = Math.max(0, Number(grossIncome) || 0);
  const status = FEDERAL_TAX_BRACKETS[filingStatus] ? filingStatus : 'single';
  const standardDeduction = STANDARD_DEDUCTIONS[status] || STANDARD_DEDUCTIONS.single;
  
  const taxableIncome = Math.max(0, safeGross - standardDeduction);
  const brackets = FEDERAL_TAX_BRACKETS[status];
  
  let tax = 0;
  let previousLimit = 0;
  let marginalRate = 0;

  for (const bracket of brackets) {
    if (taxableIncome > previousLimit) {
      const taxableInThisBracket = Math.min(taxableIncome - previousLimit, bracket.upTo - previousLimit);
      tax += taxableInThisBracket * bracket.rate;
      marginalRate = bracket.rate;
      previousLimit = bracket.upTo;
    } else {
      break;
    }
  }

  const effectiveRate = safeGross > 0 ? (tax / safeGross) : 0;

  return {
    tax: Math.round(tax * 100) / 100,
    taxableIncome: Math.round(taxableIncome * 100) / 100,
    standardDeduction,
    effectiveRate,
    marginalRate,
  };
}
