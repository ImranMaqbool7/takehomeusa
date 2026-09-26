import SEO from '../components/SEO.jsx';
import SalaryCalculator from '../components/SalaryCalculator.jsx';
import TaxComparisonTable from '../components/TaxComparisonTable.jsx';
import FAQAccordion from '../components/FAQAccordion.jsx';
import RelatedTools from '../components/RelatedTools.jsx';
import AdPlaceholder from '../components/AdPlaceholder.jsx';
import { Shield, Zap, Sparkles, CheckCircle2 } from 'lucide-react';
import { FAQS } from '../data/faqData.js';

export default function Home() {
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: FAQS.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };

  return (
    <div className="min-h-screen">
      <SEO
        title="Salary After Tax Calculator — Estimate Your US Take-Home Pay | TakeHomeUSA"
        description="Calculate your estimated salary after federal tax, state tax, Social Security, Medicare, and common deductions. Free US take-home pay calculator."
        canonicalPath="/"
        jsonLd={faqSchema}
      />

      {/* Hero Section */}
      <section className="pt-8 pb-10 sm:pt-12 sm:pb-14 text-center px-4 max-w-4xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200/80 text-emerald-800 text-xs font-semibold mb-4 shadow-2xs">
          <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
          <span>Updated for 2026 / 2025 IRS Tax Brackets</span>
        </div>

        <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 tracking-tight leading-[1.15]">
          Salary After Tax Calculator
        </h1>

        <p className="mt-4 text-base sm:text-xl text-slate-600 max-w-2xl mx-auto leading-relaxed">
          See your estimated US take-home pay after federal taxes, state taxes, Social Security, and Medicare.
        </p>

        {/* Trust Statement */}
        <div className="mt-6 flex flex-wrap items-center justify-center gap-3 sm:gap-6 text-xs sm:text-sm font-semibold text-slate-700">
          <div className="flex items-center gap-1.5 text-emerald-700">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            <span>100% Free</span>
          </div>
          <span className="text-slate-300">•</span>
          <div className="flex items-center gap-1.5 text-emerald-700">
            <Zap className="w-4 h-4 text-emerald-600" />
            <span>Instant Results</span>
          </div>
          <span className="text-slate-300">•</span>
          <div className="flex items-center gap-1.5 text-emerald-700">
            <Shield className="w-4 h-4 text-emerald-600" />
            <span>No Sign Up Required</span>
          </div>
        </div>
      </section>

      {/* Main Calculator Card */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SalaryCalculator initialSalary={75000} initialStateId="TX" />
      </section>

      {/* Ad Placement: After Calculator */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AdPlaceholder slot="horizontal" />
      </div>

      {/* Compare Across Top States */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12">
        <TaxComparisonTable grossSalary={75000} filingStatus="single" />
      </section>

      {/* SEO Educational Guide Content */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mt-16 prose prose-slate">
        <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-10 shadow-xs space-y-6">
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
            How Your US Take-Home Paycheck is Calculated
          </h2>
          <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
            When you receive a salary offer in the United States, the stated number is your <strong>gross annual compensation</strong>. The actual amount deposited into your checking account every two weeks or month is your <strong>net take-home pay</strong>. Understanding the gap between gross and net income is essential for personal budgeting, evaluating job opportunities, and negotiating relocation offers.
          </p>

          <h3 className="text-lg sm:text-xl font-bold text-slate-900 mt-6">
            1. Federal Income Tax Withholding
          </h3>
          <p className="text-slate-600 text-sm leading-relaxed">
            The federal government taxes individual income using a <strong>graduated progressive tax rate</strong> system with seven brackets: 10%, 12%, 22%, 24%, 32%, 35%, and 37%. Before tax rates are applied, the IRS allows the <strong>standard deduction</strong> ($15,000 for single filers, $30,000 for married couples filing jointly). Only income above this deduction is subject to taxation. Because higher rates only apply to portions of income within each bracket, your <em>effective tax rate</em> is always lower than your <em>marginal top tax bracket</em>.
          </p>

          <h3 className="text-lg sm:text-xl font-bold text-slate-900 mt-4">
            2. State Income Taxes: 0% vs Flat vs Progressive
          </h3>
          <p className="text-slate-600 text-sm leading-relaxed">
            Where you live has a major impact on what you keep. Nine US states (including Texas, Florida, Washington, Nevada, and Tennessee) levy <strong>no individual earned income tax</strong> on wages. Other states like Colorado, Arizona, Georgia, and North Carolina levy a single <strong>flat tax rate</strong>. States like California, New York, New Jersey, and Hawaii have multi-bracket <strong>progressive income taxes</strong> that range up to 13.3%.
          </p>

          <h3 className="text-lg sm:text-xl font-bold text-slate-900 mt-4">
            3. FICA Payroll Taxes (Social Security & Medicare)
          </h3>
          <p className="text-slate-600 text-sm leading-relaxed">
            Every W-2 worker in America pays mandatory FICA taxes:
          </p>
          <ul className="list-disc list-inside space-y-1.5 text-sm text-slate-600 pl-2">
            <li><strong>Social Security (OASDI):</strong> 6.2% of wages up to the annual limit ($176,100).</li>
            <li><strong>Medicare:</strong> 1.45% on all earnings, plus an additional 0.9% on compensation over $200,000 ($250,000 for joint filers).</li>
          </ul>

          <h3 className="text-lg sm:text-xl font-bold text-slate-900 mt-4">
            4. Pre-Tax Deductions That Save You Money
          </h3>
          <p className="text-slate-600 text-sm leading-relaxed">
            Contributing to employer-sponsored <strong>401(k) retirement plans</strong>, <strong>Health Savings Accounts (HSA)</strong>, and <strong>pre-tax health insurance premiums</strong> reduces your federal and state taxable income. For instance, contributing $5,000 into a traditional 401(k) in a 22% tax bracket saves you over $1,100 in federal taxes while building your retirement nest egg.
          </p>
        </div>
      </section>

      {/* Ad Placement: Between Content Sections */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AdPlaceholder slot="horizontal" />
      </div>

      {/* More Money Tools Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <RelatedTools />
      </section>

      {/* Ad Placement: Before FAQ */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AdPlaceholder slot="horizontal" />
      </div>

      {/* FAQ Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <FAQAccordion items={FAQS} />
      </section>
    </div>
  );
}
