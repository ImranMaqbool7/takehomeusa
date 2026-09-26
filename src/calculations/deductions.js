import { DEDUCTION_LIMITS } from '../data/taxBrackets.js';

/**
 * Calculate Pre-Tax Deductions and their tax sheltering effects
 * 
 * Rules:
 * - 401(k): Exempt from Federal and State income taxes, but SUBJECT to FICA.
 * - Health Insurance (Section 125 cafeteria plan): Exempt from Federal, State, and FICA.
 * - HSA: Exempt from Federal, most States (except CA & NJ), and FICA.
 * 
 * @param {object} params
 * @param {number} params.grossSalary
 * @param {number} params.k401Value - Value entered
 * @param {'percent'|'dollar'} params.k401Type - 'percent' or 'dollar'
 * @param {number} params.healthInsuranceMonthly - Monthly health premium
 * @param {number} params.hsaAnnual - Annual HSA contribution
 * @param {string} params.stateId - State 2-letter code
 * @returns {object} Deduction breakdown
 */
export function calculatePreTaxDeductions({
  grossSalary = 0,
  k401Value = 0,
  k401Type = 'percent',
  healthInsuranceMonthly = 0,
  hsaAnnual = 0,
  stateId = 'TX',
}) {
  const safeGross = Math.max(0, Number(grossSalary) || 0);

  // 401(k) deduction
  let k401 = 0;
  if (k401Type === 'percent') {
    const pct = Math.max(0, Math.min(100, Number(k401Value) || 0));
    k401 = (safeGross * pct) / 100;
  } else {
    k401 = Math.max(0, Number(k401Value) || 0);
  }
  // Cap at IRS limit and cannot exceed gross salary
  k401 = Math.min(k401, DEDUCTION_LIMITS.k401Max, safeGross);

  // Health insurance (annualized)
  const monthlyHealth = Math.max(0, Number(healthInsuranceMonthly) || 0);
  const healthInsuranceAnnual = Math.min(monthlyHealth * 12, safeGross - k401);

  // HSA (annualized)
  const rawHsa = Math.max(0, Number(hsaAnnual) || 0);
  const hsaMax = DEDUCTION_LIMITS.hsaFamilyMax; // allow up to family limit
  const hsaContribution = Math.min(rawHsa, hsaMax, Math.max(0, safeGross - k401 - healthInsuranceAnnual));

  const totalPreTax = k401 + healthInsuranceAnnual + hsaContribution;

  // FICA wages: Gross minus Section 125 (Health) and HSA. 401(k) is NOT deducted from FICA wages.
  const ficaWages = Math.max(0, safeGross - healthInsuranceAnnual - hsaContribution);

  // Federal taxable income base (before standard deduction)
  const federalTaxableBase = Math.max(0, safeGross - totalPreTax);

  // State taxable income base (CA and NJ do not exempt HSA from state income tax)
  const isHsaTaxableInState = ['CA', 'NJ'].includes(stateId.toUpperCase());
  const stateTaxableBase = isHsaTaxableInState
    ? Math.max(0, safeGross - k401 - healthInsuranceAnnual)
    : federalTaxableBase;

  return {
    k401: Math.round(k401 * 100) / 100,
    healthInsuranceAnnual: Math.round(healthInsuranceAnnual * 100) / 100,
    healthInsuranceMonthly: monthlyHealth,
    hsaContribution: Math.round(hsaContribution * 100) / 100,
    totalPreTax: Math.round(totalPreTax * 100) / 100,
    ficaWages: Math.round(ficaWages * 100) / 100,
    federalTaxableBase: Math.round(federalTaxableBase * 100) / 100,
    stateTaxableBase: Math.round(stateTaxableBase * 100) / 100,
  };
}
