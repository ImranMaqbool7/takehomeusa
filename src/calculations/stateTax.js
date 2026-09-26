import { getStateById } from '../data/states.js';

/**
 * Calculate State Income Tax for any US state
 * @param {string} stateId - 2-letter state code e.g. 'CA', 'TX', 'NY'
 * @param {number} adjustedIncome - Income eligible for state tax
 * @param {string} filingStatus - 'single' | 'married_jointly' | 'married_separately' | 'head_of_household'
 * @returns {object} State tax details
 */
export function calculateStateTax(stateId = 'TX', adjustedIncome = 0, filingStatus = 'single') {
  const safeIncome = Math.max(0, Number(adjustedIncome) || 0);
  const state = getStateById(stateId) || getStateById('TX');

  if (!state || state.type === 'no_income_tax') {
    return {
      tax: 0,
      taxableIncome: 0,
      standardDeduction: 0,
      effectiveRate: 0,
      marginalRate: 0,
      stateName: state ? state.name : 'Unknown State',
      stateId: state ? state.id : stateId,
      isNoIncomeTax: true,
      notes: state ? state.notes : 'No state income tax.',
    };
  }

  // Determine standard deduction
  let standardDeduction = 0;
  if (state.standardDeduction) {
    standardDeduction = state.standardDeduction[filingStatus] ?? state.standardDeduction.single ?? 0;
  }

  const taxableIncome = Math.max(0, safeIncome - standardDeduction);

  let tax = 0;
  let marginalRate = 0;

  if (state.type === 'flat') {
    tax = taxableIncome * (state.rate || 0);
    marginalRate = state.rate || 0;
  } else if (state.type === 'progressive' && state.brackets) {
    const statusBrackets = state.brackets[filingStatus] || state.brackets.single || [];
    let previousLimit = 0;

    for (const bracket of statusBrackets) {
      if (taxableIncome > previousLimit) {
        const taxableChunk = Math.min(taxableIncome - previousLimit, bracket.upTo - previousLimit);
        tax += taxableChunk * bracket.rate;
        marginalRate = bracket.rate;
        previousLimit = bracket.upTo;
      } else {
        break;
      }
    }
  }

  const effectiveRate = safeIncome > 0 ? (tax / safeIncome) : 0;

  return {
    tax: Math.round(tax * 100) / 100,
    taxableIncome: Math.round(taxableIncome * 100) / 100,
    standardDeduction,
    effectiveRate,
    marginalRate,
    stateName: state.name,
    stateId: state.id,
    isNoIncomeTax: false,
    notes: state.notes,
  };
}
