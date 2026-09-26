import { FICA_CONFIG } from '../data/taxBrackets.js';

/**
 * Calculate FICA (Social Security & Medicare) taxes
 * @param {number} ficaWages - Gross salary minus Section 125 pre-tax deductions (like health insurance & HSA)
 * @param {string} filingStatus - 'single' | 'married_jointly' | 'married_separately' | 'head_of_household'
 * @returns {object} FICA breakdown
 */
export function calculateFICA(ficaWages = 0, filingStatus = 'single') {
  const safeWages = Math.max(0, Number(ficaWages) || 0);

  // Social Security: 6.2% up to the wage base limit
  const ssTaxable = Math.min(safeWages, FICA_CONFIG.socialSecurity.wageCap);
  const socialSecurity = ssTaxable * FICA_CONFIG.socialSecurity.rate;

  // Medicare base: 1.45% on all earnings
  const baseMedicare = safeWages * FICA_CONFIG.medicare.rate;

  // Additional Medicare: 0.9% on compensation above threshold
  const threshold = FICA_CONFIG.medicare.additionalThresholds[filingStatus] ?? 200000;
  const additionalMedicareTaxable = Math.max(0, safeWages - threshold);
  const additionalMedicare = additionalMedicareTaxable * FICA_CONFIG.medicare.additionalRate;

  const totalMedicare = baseMedicare + additionalMedicare;
  const totalFica = socialSecurity + totalMedicare;

  return {
    socialSecurity: Math.round(socialSecurity * 100) / 100,
    medicare: Math.round(totalMedicare * 100) / 100,
    baseMedicare: Math.round(baseMedicare * 100) / 100,
    additionalMedicare: Math.round(additionalMedicare * 100) / 100,
    totalFica: Math.round(totalFica * 100) / 100,
    socialSecurityWageCap: FICA_CONFIG.socialSecurity.wageCap,
    hitSocialSecurityCap: safeWages > FICA_CONFIG.socialSecurity.wageCap,
  };
}
