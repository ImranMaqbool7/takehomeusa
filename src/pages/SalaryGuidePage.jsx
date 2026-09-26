import { useParams, Link } from 'react-router-dom';
import SEO from '../components/SEO.jsx';
import SalaryCalculator from '../components/SalaryCalculator.jsx';
import TaxComparisonTable from '../components/TaxComparisonTable.jsx';
import AdPlaceholder from '../components/AdPlaceholder.jsx';
import RelatedTools from '../components/RelatedTools.jsx';
import FAQAccordion from '../components/FAQAccordion.jsx';
import { calculateTakeHomePay } from '../calculations/salaryCalculator.js';
import { formatCurrency, formatPercent } from '../utils/formatters.js';
import { POPULAR_SALARIES } from '../data/salaryGuidesData.js';
import { DollarSign, Clock, ArrowRight, PieChart, Sparkles } from 'lucide-react';

export default function SalaryGuidePage() {
  const { salaryAmount } = useParams();
  const rawSalary = Number(salaryAmount);
  const salary = isNaN(rawSalary) || rawSalary <= 0 ? 75000 : rawSalary;

  // Base calculation with default single filer in Texas (standard benchmark)
  const calc = calculateTakeHomePay({
    grossSalary: salary,
    stateId: 'TX',
    filingStatus: 'single',
    payFrequency: 'monthly',
  });

  const hourlyRate = Math.round((salary / 2080) * 100) / 100;
  const pageTitle = `$${salary.toLocaleString('en-US')} Salary After Taxes — Take-Home Pay Estimate | TakeHomeUSA`;
  const pageDescription = `How much do you actually take home on a $${salary.toLocaleString('en-US')} salary? Complete 2026 federal tax, FICA, state comparisons, and 50/30/20 budget breakdown.`;

  // 50/30/20 budget based on annual net pay
  const annualNet = calc.annualTakeHome;
  const monthlyNet = calc.frequencies.monthly.takeHome;
  const needs50 = Math.round(monthlyNet * 0.50);
  const wants30 = Math.round(monthlyNet * 0.30);
  const savings20 = Math.round(monthlyNet * 0.20);

  const guideFaqs = [
    {
      question: `How much is $${salary.toLocaleString()} after taxes per month?`,
      answer: `On a $${salary.toLocaleString()} annual salary, a single filer takes home approximately ${formatCurrency(calc.frequencies.monthly.takeHome)} per month in a no-tax state like Texas or Florida, and approximately ${formatCurrency(calc.frequencies.monthly.takeHome * 0.94)} to ${formatCurrency(calc.frequencies.monthly.takeHome * 0.96)} per month in states with state income tax like California or New York.`,
    },
    {
      question: `What is the hourly rate for a $${salary.toLocaleString()} salary?`,
      answer: `A $${salary.toLocaleString()} salary translates to roughly ${formatCurrency(hourlyRate, 2)} per hour, assuming a standard 40-hour work week across 52 weeks (2,080 working hours per year).`,
    },
    {
      question: `What is the biweekly take-home pay on $${salary.toLocaleString()}?`,
      answer: `In a 0% state income tax state, biweekly take-home pay on $${salary.toLocaleString()} is approximately ${formatCurrency(calc.frequencies.biweekly.takeHome)} every two weeks (26 paychecks per year).`,
    },
  ];

  return (
    <div className="min-h-screen">
      <SEO
        title={pageTitle}
        description={pageDescription}
        canonicalPath={`/salary-after-tax/${salary}`}
      />

      {/* Breadcrumbs */}
      <div className="bg-slate-100/70 border-b border-slate-200/80 py-3">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-xs text-slate-500 flex items-center gap-1.5">
          <Link to="/" className="hover:text-emerald-700">Home</Link>
          <span>/</span>
          <Link to="/salary-guides" className="hover:text-emerald-700">Salary Guides</Link>
          <span>/</span>
          <span className="text-slate-800 font-semibold">${salary.toLocaleString()}</span>
        </div>
      </div>

      {/* Hero Header */}
      <section className="pt-8 pb-10 text-center px-4 max-w-4xl mx-auto">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200/70 text-emerald-800 text-xs font-semibold mb-3">
          <DollarSign className="w-3.5 h-3.5 text-emerald-600" />
          <span>Salary Benchmark Guide</span>
        </div>

        <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight">
          ${salary.toLocaleString('en-US')} Salary After Taxes
        </h1>

        <p className="mt-3 text-base sm:text-lg text-slate-600 max-w-2xl mx-auto">
          Here is your estimated take-home pay, federal & state tax breakdown, hourly equivalent, and suggested budget for a <span className="font-semibold text-slate-900">${salary.toLocaleString()}</span> salary.
        </p>

        {/* Quick stat cards */}
        <div className="mt-8 grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-3xl mx-auto">
          <div className="p-3.5 rounded-xl bg-white border border-slate-200 shadow-2xs">
            <span className="text-[11px] text-slate-500 font-medium block">Monthly Net (Est)</span>
            <span className="text-base sm:text-lg font-bold text-emerald-700 tabular-nums">
              {formatCurrency(monthlyNet)}
            </span>
          </div>
          <div className="p-3.5 rounded-xl bg-white border border-slate-200 shadow-2xs">
            <span className="text-[11px] text-slate-500 font-medium block">Biweekly Net</span>
            <span className="text-base sm:text-lg font-bold text-slate-900 tabular-nums">
              {formatCurrency(calc.frequencies.biweekly.takeHome)}
            </span>
          </div>
          <div className="p-3.5 rounded-xl bg-white border border-slate-200 shadow-2xs">
            <span className="text-[11px] text-slate-500 font-medium block">Hourly Equivalent</span>
            <span className="text-base sm:text-lg font-bold text-slate-900 tabular-nums">
              {formatCurrency(hourlyRate, 2)}/hr
            </span>
          </div>
          <div className="p-3.5 rounded-xl bg-white border border-slate-200 shadow-2xs">
            <span className="text-[11px] text-slate-500 font-medium block">Annual Net (Est)</span>
            <span className="text-base sm:text-lg font-bold text-slate-900 tabular-nums">
              {formatCurrency(annualNet)}
            </span>
          </div>
        </div>
      </section>

      {/* Main Interactive Calculator */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SalaryCalculator initialSalary={salary} />
      </section>

      {/* Ad Placement */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AdPlaceholder slot="horizontal" />
      </div>

      {/* Compare this salary across top states */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12">
        <TaxComparisonTable grossSalary={salary} filingStatus="single" />
      </section>

      {/* Suggested 50/30/20 Budget for this salary */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mt-14">
        <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-10 shadow-xs">
          <div className="flex items-center gap-2 mb-2 text-emerald-700 text-xs font-bold uppercase tracking-wider">
            <PieChart className="w-4 h-4" />
            <span>Budgeting Guideline</span>
          </div>
          <h2 className="text-2xl font-bold text-slate-900 mb-2">
            Suggested 50/30/20 Budget for ${salary.toLocaleString()}
          </h2>
          <p className="text-sm text-slate-600 mb-6 leading-relaxed">
            Based on an estimated monthly take-home pay of <strong>{formatCurrency(monthlyNet)}</strong>, here is how the standard 50/30/20 rule recommends dividing your paycheck:
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="p-4 rounded-xl border border-slate-200 bg-emerald-50/40">
              <span className="text-xs font-bold text-emerald-800 uppercase tracking-wider block mb-1">
                50% Essentials (Needs)
              </span>
              <span className="text-2xl font-extrabold text-slate-900 tabular-nums">
                {formatCurrency(needs50)}
              </span>
              <p className="text-xs text-slate-500 mt-2">
                Housing, groceries, utilities, transportation, and health insurance.
              </p>
            </div>

            <div className="p-4 rounded-xl border border-slate-200 bg-blue-50/40">
              <span className="text-xs font-bold text-blue-800 uppercase tracking-wider block mb-1">
                30% Lifestyle (Wants)
              </span>
              <span className="text-2xl font-extrabold text-slate-900 tabular-nums">
                {formatCurrency(wants30)}
              </span>
              <p className="text-xs text-slate-500 mt-2">
                Dining out, entertainment, shopping, subscriptions, and travel.
              </p>
            </div>

            <div className="p-4 rounded-xl border border-slate-200 bg-purple-50/40">
              <span className="text-xs font-bold text-purple-800 uppercase tracking-wider block mb-1">
                20% Savings & Debt
              </span>
              <span className="text-2xl font-extrabold text-slate-900 tabular-nums">
                {formatCurrency(savings20)}
              </span>
              <p className="text-xs text-slate-500 mt-2">
                Emergency fund, retirement (IRA/401k), and extra debt payments.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Explore other salary benchmarks */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-14">
        <div className="bg-slate-50 rounded-2xl border border-slate-200 p-6 sm:p-8">
          <h3 className="text-base font-bold text-slate-900 mb-4">
            Explore Other Salary After Tax Benchmarks
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
            {POPULAR_SALARIES.map((p) => (
              <Link
                key={p.amount}
                to={`/salary-after-tax/${p.amount}`}
                className={`p-3 bg-white rounded-xl border text-xs font-semibold transition-all shadow-2xs flex flex-col justify-between ${
                  p.amount === salary
                    ? 'border-emerald-500 ring-2 ring-emerald-500/20 text-emerald-800'
                    : 'border-slate-200 hover:border-emerald-400 text-slate-800'
                }`}
              >
                <span className="font-bold text-sm text-slate-900">${p.amount.toLocaleString()}</span>
                <span className="text-slate-500 text-[11px] mt-0.5">${p.hourly.toFixed(2)}/hr</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Ad Placement */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AdPlaceholder slot="horizontal" />
      </div>

      {/* FAQ Accordion */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <FAQAccordion items={guideFaqs} title={`$${salary.toLocaleString()} Salary FAQs`} />
      </section>

      {/* Related Tools */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <RelatedTools />
      </section>
    </div>
  );
}
