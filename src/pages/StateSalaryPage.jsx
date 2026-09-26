import { useParams, Link } from 'react-router-dom';
import SEO from '../components/SEO.jsx';
import SalaryCalculator from '../components/SalaryCalculator.jsx';
import AdPlaceholder from '../components/AdPlaceholder.jsx';
import RelatedTools from '../components/RelatedTools.jsx';
import FAQAccordion from '../components/FAQAccordion.jsx';
import { getStateBySlug, STATES, NO_INCOME_TAX_STATES } from '../data/states.js';
import { calculateTakeHomePay } from '../calculations/salaryCalculator.js';
import { formatCurrency, formatPercent } from '../utils/formatters.js';
import { MapPin, Info, ArrowRight, ShieldCheck, DollarSign } from 'lucide-react';

const EXAMPLE_SALARIES = [40000, 50000, 60000, 75000, 100000, 125000, 150000, 200000];

export default function StateSalaryPage() {
  const { stateSlug } = useParams();
  const state = getStateBySlug(stateSlug);

  if (!state) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-20 text-center">
        <h1 className="text-3xl font-bold text-slate-900 mb-4">State Not Found</h1>
        <p className="text-slate-600 mb-8">
          We couldn't locate the state requested. Explore our complete directory of all 50 US states.
        </p>
        <Link
          to="/state-taxes"
          className="inline-flex items-center px-5 py-2.5 rounded-xl bg-emerald-600 text-white font-semibold hover:bg-emerald-700"
        >
          View All 50 State Calculators
        </Link>
      </div>
    );
  }

  // Pre-calculate sample salaries for this state
  const salaryExamples = EXAMPLE_SALARIES.map((salary) => {
    const calc = calculateTakeHomePay({
      grossSalary: salary,
      stateId: state.id,
      filingStatus: 'single',
      payFrequency: 'monthly',
    });
    return {
      salary,
      calc,
    };
  });

  const pageTitle = `${state.name} Salary After Tax Calculator — Take-Home Pay | TakeHomeUSA`;
  const pageDescription = `Calculate your estimated take-home pay on a salary in ${state.name}. Accurate ${state.name} state tax, federal tax, Social Security, and Medicare breakdown for 2026.`;

  // State-specific FAQ
  const stateFaqs = [
    {
      question: `Does ${state.name} have an individual income tax?`,
      answer: state.type === 'no_income_tax'
        ? `No. ${state.name} is one of nine US states that do not levy a broad individual income tax on earned wages, allowing workers to take home a higher percentage of their paycheck.`
        : state.type === 'flat'
        ? `Yes. ${state.name} assesses a flat individual income tax rate of ${formatPercent(state.rate || state.topRate)} on taxable income.`
        : `Yes. ${state.name} has a graduated individual income tax system with brackets reaching up to ${formatPercent(state.topRate)}.`,
    },
    {
      question: `How much do you take home on a $75,000 salary in ${state.name}?`,
      answer: (() => {
        const c = calculateTakeHomePay({ grossSalary: 75000, stateId: state.id, filingStatus: 'single' });
        return `On a $75,000 salary in ${state.name}, a single worker takes home an estimated ${formatCurrency(c.annualTakeHome)} per year (${formatCurrency(c.frequencies.monthly.takeHome)} per month, or ${formatCurrency(c.frequencies.biweekly.takeHome)} biweekly). Federal taxes are approximately ${formatCurrency(c.taxes.federal)}, FICA taxes are ${formatCurrency(c.taxes.totalFica)}, and ${state.name} state tax is ${formatCurrency(c.taxes.state)}.`;
      })(),
    },
    {
      question: `How much is $100,000 after taxes in ${state.name}?`,
      answer: (() => {
        const c = calculateTakeHomePay({ grossSalary: 100000, stateId: state.id, filingStatus: 'single' });
        return `On a $100,000 salary in ${state.name}, an estimated ${formatCurrency(c.annualTakeHome)} is your net take-home pay (${formatCurrency(c.frequencies.monthly.takeHome)}/month). You pay ${formatCurrency(c.taxes.federal)} in federal tax, ${formatCurrency(c.taxes.totalFica)} in FICA, and ${formatCurrency(c.taxes.state)} in ${state.name} state taxes.`;
      })(),
    },
  ];

  return (
    <div className="min-h-screen">
      <SEO
        title={pageTitle}
        description={pageDescription}
        canonicalPath={`/salary-after-tax-calculator/${state.slug}`}
      />

      {/* Breadcrumb Header */}
      <div className="bg-slate-100/70 border-b border-slate-200/80 py-3">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-xs text-slate-500 flex items-center gap-1.5">
          <Link to="/" className="hover:text-emerald-700">Home</Link>
          <span>/</span>
          <Link to="/state-taxes" className="hover:text-emerald-700">State Taxes</Link>
          <span>/</span>
          <span className="text-slate-800 font-semibold">{state.name}</span>
        </div>
      </div>

      {/* Hero Header */}
      <section className="pt-8 pb-10 text-center px-4 max-w-4xl mx-auto">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200/70 text-emerald-800 text-xs font-semibold mb-3">
          <MapPin className="w-3.5 h-3.5 text-emerald-600" />
          <span>{state.name} Tax Year 2026</span>
        </div>

        <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight">
          {state.name} Salary After Tax Calculator
        </h1>

        <p className="mt-3 text-base sm:text-lg text-slate-600 max-w-2xl mx-auto">
          Calculate your estimated take-home pay on a salary in {state.name} after federal tax, {state.name} state income tax, Social Security, and Medicare.
        </p>

        {state.type === 'no_income_tax' && (
          <div className="mt-4 inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-emerald-100 text-emerald-800 font-semibold text-xs">
            <ShieldCheck className="w-4 h-4" />
            <span>{state.name} has NO state income tax on salary & wages!</span>
          </div>
        )}
      </section>

      {/* Calculator configured for this state */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SalaryCalculator initialSalary={75000} initialStateId={state.id} />
      </section>

      {/* Ad Placeholder */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AdPlaceholder slot="horizontal" />
      </div>

      {/* State Tax Salary Examples Table */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12">
        <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
          <div className="px-6 py-4 border-b border-slate-200/80 bg-slate-50/70">
            <h2 className="text-lg font-bold text-slate-900">
              {state.name} Take-Home Pay by Salary Level (Single Filer)
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Estimated net pay after federal, {state.name} state, and FICA payroll deductions.
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-slate-50/50 text-slate-500 text-[11px] uppercase tracking-wider font-semibold border-b border-slate-200/60">
                <tr>
                  <th className="py-3 px-4 sm:px-6">Annual Gross Salary</th>
                  <th className="py-3 px-4">Federal Tax</th>
                  <th className="py-3 px-4">{state.name} Tax</th>
                  <th className="py-3 px-4">FICA Taxes</th>
                  <th className="py-3 px-4">Annual Take-Home</th>
                  <th className="py-3 px-4 sm:px-6">Monthly Take-Home</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-medium">
                {salaryExamples.map(({ salary, calc }) => (
                  <tr key={salary} className="hover:bg-slate-50/70 transition-colors">
                    <td className="py-3.5 px-4 sm:px-6 font-bold text-slate-900">
                      <Link
                        to={`/salary-after-tax/${salary}`}
                        className="text-emerald-700 hover:text-emerald-800 hover:underline flex items-center gap-1"
                      >
                        {formatCurrency(salary)}
                        <ArrowRight className="w-3 h-3 text-slate-400" />
                      </Link>
                    </td>
                    <td className="py-3.5 px-4 text-slate-700 tabular-nums">
                      {formatCurrency(calc.taxes.federal)}
                    </td>
                    <td className="py-3.5 px-4 text-slate-700 tabular-nums">
                      {state.type === 'no_income_tax' ? (
                        <span className="text-emerald-600 font-semibold">$0 (0%)</span>
                      ) : (
                        formatCurrency(calc.taxes.state)
                      )}
                    </td>
                    <td className="py-3.5 px-4 text-slate-700 tabular-nums">
                      {formatCurrency(calc.taxes.totalFica)}
                    </td>
                    <td className="py-3.5 px-4 font-bold text-slate-900 tabular-nums">
                      {formatCurrency(calc.annualTakeHome)}
                    </td>
                    <td className="py-3.5 px-4 sm:px-6 font-extrabold text-emerald-700 tabular-nums">
                      {formatCurrency(calc.frequencies.monthly.takeHome)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* State Tax Law & Guide Description */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mt-14">
        <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-10 shadow-xs space-y-6">
          <h2 className="text-2xl font-bold text-slate-900 tracking-tight">
            Understanding {state.name} State Taxes
          </h2>

          <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
            {state.notes}
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 my-6">
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
              <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider block mb-1">
                Tax Structure
              </span>
              <span className="text-base font-bold text-slate-900 capitalize">
                {state.type.replace('_', ' ')}
              </span>
            </div>
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
              <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider block mb-1">
                Top Marginal State Rate
              </span>
              <span className="text-base font-bold text-emerald-700">
                {formatPercent(state.topRate)}
              </span>
            </div>
          </div>

          <h3 className="text-lg font-bold text-slate-900">
            How Take-Home Pay Works in {state.name}
          </h3>
          <p className="text-slate-600 text-sm leading-relaxed">
            Your final net paycheck in {state.name} is determined by four principal factors:
          </p>
          <ul className="list-disc list-inside space-y-1.5 text-sm text-slate-600 pl-2">
            <li><strong>Federal Income Tax:</strong> Progressive brackets from 10% to 37% after standard deduction.</li>
            <li><strong>{state.name} State Tax:</strong> {state.type === 'no_income_tax' ? '0% individual state income tax.' : `${formatPercent(state.topRate)} top state bracket.`}</li>
            <li><strong>Social Security:</strong> 6.2% on all wages up to the wage cap limit.</li>
            <li><strong>Medicare:</strong> 1.45% base tax on all compensation (+0.9% over $200k).</li>
          </ul>
        </div>
      </section>

      {/* Other Popular State Links */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-14">
        <div className="bg-slate-50 rounded-2xl border border-slate-200 p-6 sm:p-8">
          <h3 className="text-base font-bold text-slate-900 mb-4">
            Compare With Other Popular States
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-3">
            {STATES.filter(s => s.id !== state.id).slice(0, 12).map((s) => (
              <Link
                key={s.id}
                to={`/salary-after-tax-calculator/${s.slug}`}
                className="p-3 bg-white rounded-xl border border-slate-200/80 hover:border-emerald-500 hover:text-emerald-700 text-slate-800 text-xs font-semibold transition-all shadow-2xs flex items-center justify-between"
              >
                <span>{s.name}</span>
                <ArrowRight className="w-3 h-3 text-slate-400" />
              </Link>
            ))}
          </div>
          <div className="mt-4 text-center">
            <Link
              to="/state-taxes"
              className="text-xs font-bold text-emerald-600 hover:text-emerald-700 inline-flex items-center gap-1"
            >
              Browse all 50 US State Income Tax Calculators <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Ad Placeholder */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AdPlaceholder slot="horizontal" />
      </div>

      {/* FAQ for State */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <FAQAccordion items={stateFaqs} title={`${state.name} Take-Home Pay FAQs`} />
      </section>

      {/* Related Tools */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <RelatedTools />
      </section>
    </div>
  );
}
