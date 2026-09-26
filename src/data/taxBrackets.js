/**
 * US Federal Tax Constants and Brackets (Tax Year 2025 / 2026)
 * Source: IRS Revenue Procedures
 */

export const TAX_YEAR = 2026;

export const STANDARD_DEDUCTIONS = {
  single: 15000,
  married_jointly: 30000,
  married_separately: 15000,
  head_of_household: 22500,
};

export const FEDERAL_TAX_BRACKETS = {
  single: [
    { upTo: 11925, rate: 0.10 },
    { upTo: 48475, rate: 0.12 },
    { upTo: 103350, rate: 0.22 },
    { upTo: 197300, rate: 0.24 },
    { upTo: 250525, rate: 0.32 },
    { upTo: 626350, rate: 0.35 },
    { upTo: Infinity, rate: 0.37 },
  ],
  married_jointly: [
    { upTo: 23850, rate: 0.10 },
    { upTo: 96950, rate: 0.12 },
    { upTo: 206700, rate: 0.22 },
    { upTo: 394600, rate: 0.24 },
    { upTo: 501050, rate: 0.32 },
    { upTo: 751600, rate: 0.35 },
    { upTo: Infinity, rate: 0.37 },
  ],
  married_separately: [
    { upTo: 11925, rate: 0.10 },
    { upTo: 48475, rate: 0.12 },
    { upTo: 103350, rate: 0.22 },
    { upTo: 197300, rate: 0.24 },
    { upTo: 250525, rate: 0.32 },
    { upTo: 375800, rate: 0.35 },
    { upTo: Infinity, rate: 0.37 },
  ],
  head_of_household: [
    { upTo: 17000, rate: 0.10 },
    { upTo: 64850, rate: 0.12 },
    { upTo: 103350, rate: 0.22 },
    { upTo: 197300, rate: 0.24 },
    { upTo: 250500, rate: 0.32 },
    { upTo: 626350, rate: 0.35 },
    { upTo: Infinity, rate: 0.37 },
  ],
};

export const FICA_CONFIG = {
  socialSecurity: {
    rate: 0.062, // 6.2% employee portion
    wageCap: 176100, // 2025/2026 cap
  },
  medicare: {
    rate: 0.0145, // 1.45% base employee portion
    additionalRate: 0.009, // 0.9% additional Medicare surtax
    additionalThresholds: {
      single: 200000,
      head_of_household: 200000,
      married_jointly: 250000,
      married_separately: 125000,
    },
  },
};

export const DEDUCTION_LIMITS = {
  k401Max: 23500, // 2025/2026 elective employee deferral limit
  hsaSingleMax: 4300,
  hsaFamilyMax: 8550,
};
