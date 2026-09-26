# TakeHomeUSA — US Salary After Tax Calculator

> **Know What You Actually Take Home.**

TakeHomeUSA is a modern, fast, mobile-responsive personal finance web application built to help US workers, contractors, job seekers, and relocators calculate their estimated net take-home pay after federal income taxes, state taxes, Social Security, Medicare, and common pre-tax benefits (401k, health insurance, and HSA).

---

## Features

- **2026/2025 IRS Tax Engine**: Built with current progressive federal income tax brackets (10% to 37%), inflation-adjusted standard deductions, and FICA wage caps.
- **All 50 US States + Washington D.C.**: Accurately accounts for:
  - 9 No-Income-Tax States (Alaska, Florida, Nevada, New Hampshire, South Dakota, Tennessee, Texas, Washington, Wyoming)
  - Flat Tax States (e.g., Arizona, Colorado, Georgia, Illinois, Indiana, Iowa, Kentucky, North Carolina, Pennsylvania, Utah)
  - Graduated Progressive Bracket States (e.g., California, New York, New Jersey, Massachusetts, Minnesota, Virginia, Hawaii)
- **FICA Payroll Tax Computation**: Calculates Social Security (6.2% up to $176,100 wage cap) and Medicare (1.45% base + 0.9% Additional Medicare surtax).
- **Pre-Tax Deductions**: Models pre-tax 401(k) retirement contributions (percentage or dollar amount), employer Section 125 health insurance premiums, and Health Savings Accounts (HSA).
- **Multi-Frequency Breakdown**: Instant view of take-home pay by Year, Month, Semi-Monthly (24 checks), Bi-Weekly (26 checks), and Weekly (52 checks).
- **Dynamic Visual Breakdown**: Proportional income distribution chart and itemized paystub table.
- **Dedicated SEO Landing Pages**:
  - `/salary-after-tax-calculator/:stateSlug` for all 50 states + DC
  - `/salary-after-tax/:salaryAmount` for standard benchmarks ($40k, $50k, $75k, $100k, $150k, $200k, etc.)
  - Interactive state directory and salary guides directory
- **More Money Tools**:
  - 50/30/20 Budget Calculator
  - Compound Interest Calculator
  - Credit Card Payoff Calculator
  - Rent vs Buy Calculator
  - Auto Loan Payoff Calculator
  - Car Affordability Calculator (20/4/10 Rule)
  - Emergency Fund Calculator
- **Monetization & Ad Readiness**: Clean, non-intrusive reserved ad placement slots designed for Google AdSense without layout shifts.
- **100% Client-Side & Private**: No user salary information or private financial data is ever collected or stored on remote servers.

---

## Tech Stack

- **Framework**: React 19 + Vite
- **Language**: JavaScript (ESNext / JSX)
- **Styling**: Tailwind CSS v4
- **Routing**: React Router v7 (`react-router-dom`)
- **Icons**: Lucide React

---

## Project Structure

```text
src/
├── calculations/
│   ├── federalTax.js          # IRS tax brackets and progressive federal calculations
│   ├── stateTax.js            # All 50 states + DC tax bracket logic
│   ├── fica.js                # Social Security & Medicare with wage caps
│   ├── deductions.js          # 401(k), Section 125 health, and HSA logic
│   └── salaryCalculator.js    # Master calculator orchestrator & frequency divider
├── components/
│   ├── AdPlaceholder.jsx      # Reserved AdSense placement containers
│   ├── CalculatorForm.jsx     # Salary inputs, state selector, filing status & deductions
│   ├── FAQAccordion.jsx       # Expandable 10+ question FAQ with ARIA accessibility
│   ├── Footer.jsx             # Categorized footer with tools, resources, legal & disclaimers
│   ├── Header.jsx             # Brand logo, sticky navigation & mobile drawer
│   ├── RelatedTools.jsx       # Additional money tools cross-linking cards
│   ├── ResultsDashboard.jsx   # Hero net take-home display, frequency tabs & paystub table
│   ├── SalaryCalculator.jsx   # Master component uniting form and reactive calculation
│   ├── SEO.jsx                # Dynamic document title, meta tags, OpenGraph & JSON-LD
│   ├── TaxBreakdownChart.jsx  # Proportional stacked bar breakdown
│   └── TaxComparisonTable.jsx # Multi-state comparative take-home table
├── data/
│   ├── faqData.js             # 10 comprehensive educational tax FAQs
│   ├── salaryGuidesData.js    # Benchmark salary definitions ($40k - $250k)
│   ├── states.js              # Full configuration for all 50 states + Washington D.C.
│   └── taxBrackets.js         # Federal brackets, standard deductions & FICA thresholds
├── pages/
│   ├── AboutPage.jsx          # Mission, calculation methodology & paycheck variances
│   ├── ContactPage.jsx        # User feedback form with success feedback
│   ├── DisclaimerPage.jsx     # Explicit non-advisor educational legal disclaimer
│   ├── Home.jsx               # Homepage with hero, primary calculator, guides & FAQ
│   ├── NotFoundPage.jsx       # 404 handler with quick navigation links
│   ├── PrivacyPolicyPage.jsx  # Client-side privacy statement
│   ├── SalaryGuidePage.jsx    # Dynamic template for /salary-after-tax/:salaryAmount
│   ├── SalaryGuidesDirectoryPage.jsx # Directory of all salary benchmarks
│   ├── StateSalaryPage.jsx    # Dynamic template for /salary-after-tax-calculator/:stateSlug
│   ├── StateTaxesDirectoryPage.jsx   # Directory of all 50 state tax systems
│   └── tools/
│       ├── AutoLoanPayoffPage.jsx
│       ├── BudgetCalculatorPage.jsx
│       ├── CarAffordabilityPage.jsx
│       ├── CompoundInterestPage.jsx
│       ├── CreditCardPayoffPage.jsx
│       ├── EmergencyFundPage.jsx
│       └── RentVsBuyPage.jsx
├── utils/
│   └── formatters.js          # Currency, percentage, and number formatting helpers
├── App.jsx                    # Route provider & layout shell
├── index.css                  # Global Tailwind styles & typography
└── main.jsx                   # React root entry point
```

---

## Installation & Running Locally

### 1. Prerequisites
Ensure you have **Node.js 18+** installed.

### 2. Install Dependencies
```bash
npm install
```

### 3. Run Development Server
```bash
npm run dev
```
Open your browser at `http://localhost:3000`.

### 4. Build for Production
```bash
npm run build
```

---

## Disclaimer
TakeHomeUSA provides estimates for educational and planning purposes only. It is not an authorized tax preparer, CPA firm, or government agency. Actual paychecks may vary based on local municipal taxes, employer deductions, and individual tax elections.
