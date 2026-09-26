import { Link } from 'react-router-dom';
import SEO from '../components/SEO.jsx';
import AdPlaceholder from '../components/AdPlaceholder.jsx';
import RelatedTools from '../components/RelatedTools.jsx';
import { POPULAR_SALARIES } from '../data/salaryGuidesData.js';
import { calculateTakeHomePay } from '../calculations/salaryCalculator.js';
import { formatCurrency } from '../utils/formatters.js';
import { BookOpen, ArrowRight, DollarSign } from 'lucide-react';

export default function SalaryGuidesDirectoryPage() {
  const guideRows = POPULAR_SALARIES.map((item) => {
    const calc = calculateTakeHomePay({
      grossSalary: item.amount,
      stateId: 'TX',
      filingStatus: 'single',
    });
    return {
      ...item,
      monthlyTakeHome: calc.frequencies.monthly.takeHome,
      annualTakeHome: calc.annualTakeHome,
    };
  });

  return (
    <div className="min-h-screen">
      <SEO
        title="US Salary Guides & Paycheck Benchmarks 2026 | TakeHomeUSA"
        description="Comprehensive US salary after-tax guide. See how much you keep on $40k, $50k, $75k, $100k, $150k, $200k, and more after federal, state, and FICA deductions."
        canonicalPath="/salary-guides"
      />

      <section className="pt-8 pb-10 text-center px-4 max-w-4xl mx-auto">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold mb-3">
          <BookOpen className="w-3.5 h-3.5 text-emerald-600" />
          <span>Paycheck Guides & Benchmarks</span>
        </div>

        <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight">
          Salary After Tax Guides (2026)
        </h1>
        <p className="mt-3 text-base sm:text-lg text-slate-600 max-w-2xl mx-auto">
          Detailed paycheck breakdowns for standard salary levels. Compare net take-home pay, hourly conversions, and tax withholdings.
        </p>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
          <div className="px-6 py-4 border-b border-slate-200/80 bg-slate-50/70">
            <h2 className="text-lg font-bold text-slate-900">
              Popular US Salary Benchmarks
            </h2>
            <p className="text-xs text-slate-500">
              Estimated single filer take-home pay in a baseline 0% state tax state (Texas / Florida).
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-slate-50/50 text-slate-500 text-[11px] uppercase tracking-wider font-semibold border-b border-slate-200/60">
                <tr>
                  <th className="py-3.5 px-6">Salary Level</th>
                  <th className="py-3.5 px-4">Career Stage</th>
                  <th className="py-3.5 px-4">Hourly Equivalent</th>
                  <th className="py-3.5 px-4">Est. Annual Net</th>
                  <th className="py-3.5 px-4">Est. Monthly Net</th>
                  <th className="py-3.5 px-6">View Guide</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-medium">
                {guideRows.map((row) => (
                  <tr key={row.amount} className="hover:bg-slate-50/80 transition-colors">
                    <td className="py-4 px-6 font-bold text-slate-900 text-base tabular-nums">
                      ${row.amount.toLocaleString()}
                    </td>
                    <td className="py-4 px-4 text-slate-600 text-xs">
                      <span className="px-2.5 py-1 rounded-md bg-slate-100 font-semibold text-slate-700">
                        {row.tier}
                      </span>
                    </td>
                    <td className="py-4 px-4 text-slate-700 tabular-nums">
                      {formatCurrency(row.hourly, 2)}/hr
                    </td>
                    <td className="py-4 px-4 font-bold text-slate-900 tabular-nums">
                      {formatCurrency(row.annualTakeHome)}
                    </td>
                    <td className="py-4 px-4 font-extrabold text-emerald-700 tabular-nums">
                      {formatCurrency(row.monthlyTakeHome)}
                    </td>
                    <td className="py-4 px-6">
                      <Link
                        to={`/salary-after-tax/${row.amount}`}
                        className="inline-flex items-center gap-1 text-xs font-bold text-emerald-600 hover:text-emerald-700"
                      >
                        Full Breakdown <ArrowRight className="w-3 h-3" />
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <AdPlaceholder slot="horizontal" />

        <RelatedTools />
      </section>
    </div>
  );
}
