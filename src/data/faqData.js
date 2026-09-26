/**
 * Comprehensive FAQ content for TakeHomeUSA
 */

export const FAQS = [
  {
    id: 'how-calculated',
    question: 'How is take-home pay calculated?',
    answer: 'Take-home pay (net pay) is the amount you actually receive in your paycheck after all mandatory payroll taxes and voluntary deductions are subtracted from your gross salary. The formula is: Gross Salary − Pre-Tax Deductions (401k, Health, HSA) − Federal Income Tax − State & Local Income Taxes − FICA Taxes (Social Security & Medicare) = Net Take-Home Pay.',
  },
  {
    id: 'tax-on-50k',
    question: 'How much tax do I pay on a $50,000 salary?',
    answer: 'For a single filer earning $50,000 with no dependents or deductions in 2026: you pay approximately $3,825 in Federal Income Tax (an effective federal rate of ~7.65% after the $15,000 standard deduction) and $3,825 in FICA (Social Security & Medicare). In a state with no income tax like Texas or Florida, your total tax is about $7,650, leaving you with an estimated take-home pay of ~$42,350 per year (~$3,529/month). In states with state income tax (like California or New York), you will pay an additional $1,200 to $2,100 in state taxes.',
  },
  {
    id: 'how-much-75k',
    question: 'How much is $75,000 after taxes?',
    answer: 'On a $75,000 salary as a single filer: Federal income tax is approximately $8,105 (~10.8%), Social Security is $4,650 (6.2%), and Medicare is $1,088 (1.45%). In zero-tax states (Texas, Florida, Washington, etc.), your estimated net take-home pay is around $61,157 per year, or approximately $5,096 per month ($2,352 biweekly). In higher-tax states like California, take-home pay is roughly $57,700/year.',
  },
  {
    id: 'how-much-100k',
    question: 'How much is $100,000 after taxes?',
    answer: 'Earning a six-figure salary of $100,000 as a single filer leaves you with between $72,500 and $78,000 depending on your state. You pay approximately $13,605 in Federal Income Tax and $7,650 in FICA taxes. In Texas, Florida, or Washington (0% state tax), your net take-home pay is roughly $78,745 ($6,562/month). In California or New York, state income tax reduces net take-home pay to approximately $73,200/year ($6,100/month).',
  },
  {
    id: 'does-state-have-tax',
    question: 'Does my state have income tax?',
    answer: 'There are 9 US states that do not levy a broad individual income tax on earned wages: Alaska, Florida, Nevada, New Hampshire (which taxes dividends/interest, phasing to 0%), South Dakota, Tennessee, Texas, Washington (no tax on wages, only on high capital gains), and Wyoming. The remaining 41 states plus Washington, D.C. have either a flat rate (like Colorado, Illinois, North Carolina, Arizona) or a graduated progressive tax bracket system (like California, New York, New Jersey).',
  },
  {
    id: 'what-is-fica',
    question: 'What is FICA tax?',
    answer: 'FICA stands for the Federal Insurance Contributions Act. It is a mandatory federal payroll tax that funds Social Security and Medicare. Both employees and employers contribute matching amounts: employees pay 6.2% for Social Security and 1.45% for Medicare, for a total standard employee FICA rate of 7.65%.',
  },
  {
    id: 'what-is-social-security',
    question: 'What is Social Security tax?',
    answer: 'Social Security tax (OASDI) is 6.2% of your gross earnings up to the annual wage base limit ($176,100 for 2025/2026). Any income earned above this cap is exempt from Social Security tax. The maximum Social Security tax an individual employee pays in a year is capped at $10,918.20.',
  },
  {
    id: 'what-is-medicare',
    question: 'What is Medicare tax?',
    answer: 'Medicare tax is 1.45% of all earned wages with no salary cap. Furthermore, the Affordable Care Act levies an Additional Medicare Tax of 0.9% on earnings exceeding $200,000 for single filers ($250,000 for married couples filing jointly), bringing the marginal Medicare tax to 2.35% on amounts above those thresholds.',
  },
  {
    id: 'does-401k-reduce-tax',
    question: 'Does 401(k) reduce taxable income?',
    answer: 'Yes! Traditional 401(k) and 403(b) contributions are made with pre-tax dollars. Every dollar you contribute reduces your federal and state taxable income by that dollar, potentially lowering your marginal tax bracket. However, 401(k) contributions are still subject to FICA taxes (Social Security and Medicare). For 2025/2026, the elective deferral limit is $23,500.',
  },
  {
    id: 'is-calculator-accurate',
    question: 'Is this calculator accurate?',
    answer: 'TakeHomeUSA uses current IRS federal income tax brackets, standard deduction amounts, FICA limits, and up-to-date state tax codes. However, this calculator provides estimates for educational and planning purposes. Your exact paycheck may differ due to municipal/local city taxes (such as NYC or Philadelphia local taxes), state disability insurance (SDI) deductions, employer benefits, pretax transit benefits, and itemized deductions on your annual tax return.',
  },
];
