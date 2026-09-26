import { calculateFederalTax } from './federalTax.js';
import { calculateStateTax } from './stateTax.js';
import { calculateFICA } from './fica.js';
import { calculatePreTaxDeductions } from './deductions.js';
import { getStateById } from '../data/states.js';
import { TAX_YEAR } from '../data/taxBrackets.js';

/**
 * Pay frequency divisor constants
 */
export const FREQUENCY_DIVISORS = {
  annual: 1,
  monthly: 12,
  semimonthly: 24,
  biweekly: 26,
  weekly: 52,
};

export const FREQUENCY_LABELS = {
  annual: 'Annual',
  monthly: 'Monthly',
  semimonthly: 'Semi-Monthly',
  biweekly: 'Bi-Weekly',
  weekly: 'Weekly',
};

/**
 * Master Take-Home Pay Calculation
 * 
 * @param {object} input
 * @param {number|string} input.grossSalary - Gross annual salary
 * @param {string} input.stateId - 2-letter state code e.g. 'TX', 'CA', 'FL'
 * @param {string} input.filingStatus - 'single' | 'married_jointly' | 'married_separately' | 'head_of_household'
 * @param {string} input.payFrequency - 'annual' | 'monthly' | 'semimonthly' | 'biweekly' | 'weekly'
 * @param {number|string} input.k401Value - 401k value entered
 * @param {'percent'|'dollar'} input.k401Type - 'percent' | 'dollar'
 * @param {number|string} input.healthInsuranceMonthly - Monthly health insurance
 * @param {number|string} input.hsaAnnual - Annual HSA contribution
 * @returns {object} Complete calculated breakdown
 */
export function calculateTakeHomePay({
  grossSalary = 75000,
  stateId = 'TX',
  filingStatus = 'single',
  payFrequency = 'monthly',
  k401Value = 0,
  k401Type = 'percent',
  healthInsuranceMonthly = 0,
  hsaAnnual = 0,
} = {}) {
  // Input sanitation & safety
  let safeGross = Number(grossSalary);
  if (isNaN(safeGross) || safeGross < 0) {
    safeGross = 0;
  }
  // Sanity cap at $100,000,000 to prevent overflow
  if (safeGross > 100000000) {
    safeGross = 100000000;
  }

  const validStateId = (stateId || 'TX').toUpperCase();
  const stateMeta = getStateById(validStateId) || getStateById('TX');
  const validStatus = ['single', 'married_jointly', 'married_separately', 'head_of_household'].includes(filingStatus)
    ? filingStatus
    : 'single';
  const validFrequency = FREQUENCY_DIVISORS[payFrequency] ? payFrequency : 'monthly';

  // 1. Pre-tax deductions calculation
  const deductions = calculatePreTaxDeductions({
    grossSalary: safeGross,
    k401Value,
    k401Type,
    healthInsuranceMonthly,
    hsaAnnual,
    stateId: validStateId,
  });

  // 2. FICA Taxes (Social Security & Medicare)
  const fica = calculateFICA(deductions.ficaWages, validStatus);

  // 3. Federal Income Tax
  const federal = calculateFederalTax(deductions.federalTaxableBase, validStatus);

  // 4. State Income Tax
  const state = calculateStateTax(validStateId, deductions.stateTaxableBase, validStatus);

  // 5. Total Taxes & Total Deductions
  const totalTax = federal.tax + state.tax + fica.totalFica;
  const totalDeductions = totalTax + deductions.totalPreTax;

  // 6. Annual Net Take-Home Pay
  const annualTakeHome = Math.max(0, safeGross - totalDeductions);

  // 7. Frequency breakdowns
  const frequencies = {
    annual: {
      gross: safeGross,
      takeHome: annualTakeHome,
      federalTax: federal.tax,
      stateTax: state.tax,
      socialSecurity: fica.socialSecurity,
      medicare: fica.medicare,
      k401: deductions.k401,
      healthInsurance: deductions.healthInsuranceAnnual,
      hsa: deductions.hsaContribution,
      totalTax,
      totalDeductions,
    },
    monthly: makeFrequencyBreakdown(safeGross, annualTakeHome, federal.tax, state.tax, fica.socialSecurity, fica.medicare, deductions.k401, deductions.healthInsuranceAnnual, deductions.hsaContribution, totalTax, totalDeductions, 12),
    semimonthly: makeFrequencyBreakdown(safeGross, annualTakeHome, federal.tax, state.tax, fica.socialSecurity, fica.medicare, deductions.k401, deductions.healthInsuranceAnnual, deductions.hsaContribution, totalTax, totalDeductions, 24),
    biweekly: makeFrequencyBreakdown(safeGross, annualTakeHome, federal.tax, state.tax, fica.socialSecurity, fica.medicare, deductions.k401, deductions.healthInsuranceAnnual, deductions.hsaContribution, totalTax, totalDeductions, 26),
    weekly: makeFrequencyBreakdown(safeGross, annualTakeHome, federal.tax, state.tax, fica.socialSecurity, fica.medicare, deductions.k401, deductions.healthInsuranceAnnual, deductions.hsaContribution, totalTax, totalDeductions, 52),
  };

  // Selected frequency figures
  const divisor = FREQUENCY_DIVISORS[validFrequency];
  const selectedPay = frequencies[validFrequency];

  // Effective rates
  const effectiveTotalTaxRate = safeGross > 0 ? (totalTax / safeGross) : 0;
  const effectiveTotalDeductionRate = safeGross > 0 ? (totalDeductions / safeGross) : 0;
  const takeHomePercentage = safeGross > 0 ? (annualTakeHome / safeGross) : 0;

  // Chart percentages (relative to gross)
  const chartSlices = safeGross > 0 ? [
    { label: 'Take-Home Pay', amount: annualTakeHome, percentage: (annualTakeHome / safeGross) * 100, color: '#10b981' }, // emerald-500
    { label: 'Federal Income Tax', amount: federal.tax, percentage: (federal.tax / safeGross) * 100, color: '#3b82f6' }, // blue-500
    { label: 'State Income Tax', amount: state.tax, percentage: (state.tax / safeGross) * 100, color: '#f59e0b' }, // amber-500
    { label: 'FICA (SS & Medicare)', amount: fica.totalFica, percentage: (fica.totalFica / safeGross) * 100, color: '#8b5cf6' }, // purple-500
    { label: 'Pre-Tax Benefits', amount: deductions.totalPreTax, percentage: (deductions.totalPreTax / safeGross) * 100, color: '#06b6d4' }, // cyan-500
  ].filter(s => s.amount > 0) : [];

  return {
    taxYear: TAX_YEAR,
    grossSalary: safeGross,
    state: stateMeta,
    filingStatus: validStatus,
    payFrequency: validFrequency,
    frequencyDivisor: divisor,
    selectedPay,
    annualTakeHome: Math.round(annualTakeHome * 100) / 100,
    frequencies,
    taxes: {
      federal: federal.tax,
      federalTaxableIncome: federal.taxableIncome,
      federalEffectiveRate: federal.effectiveRate,
      federalMarginalRate: federal.marginalRate,
      federalStandardDeduction: federal.standardDeduction,

      state: state.tax,
      stateTaxableIncome: state.taxableIncome,
      stateEffectiveRate: state.effectiveRate,
      stateMarginalRate: state.marginalRate,
      stateStandardDeduction: state.standardDeduction,
      isNoIncomeTaxState: state.isNoIncomeTax,

      socialSecurity: fica.socialSecurity,
      medicare: fica.medicare,
      baseMedicare: fica.baseMedicare,
      additionalMedicare: fica.additionalMedicare,
      totalFica: fica.totalFica,
      hitSocialSecurityCap: fica.hitSocialSecurityCap,

      totalTax: Math.round(totalTax * 100) / 100,
      effectiveTotalTaxRate,
    },
    deductions: {
      k401: deductions.k401,
      healthInsuranceAnnual: deductions.healthInsuranceAnnual,
      healthInsuranceMonthly: deductions.healthInsuranceMonthly,
      hsa: deductions.hsaContribution,
      totalPreTax: deductions.totalPreTax,
      totalDeductions: Math.round(totalDeductions * 100) / 100,
      effectiveTotalDeductionRate,
    },
    takeHomePercentage,
    chartSlices,
  };
}

function makeFrequencyBreakdown(gross, takeHome, fed, state, ss, med, k401, health, hsa, totalTax, totalDed, div) {
  return {
    gross: Math.round((gross / div) * 100) / 100,
    takeHome: Math.round((takeHome / div) * 100) / 100,
    federalTax: Math.round((fed / div) * 100) / 100,
    stateTax: Math.round((state / div) * 100) / 100,
    socialSecurity: Math.round((ss / div) * 100) / 100,
    medicare: Math.round((med / div) * 100) / 100,
    k401: Math.round((k401 / div) * 100) / 100,
    healthInsurance: Math.round((health / div) * 100) / 100,
    hsa: Math.round((hsa / div) * 100) / 100,
    totalTax: Math.round((totalTax / div) * 100) / 100,
    totalDeductions: Math.round((totalDed / div) * 100) / 100,
  };
}
