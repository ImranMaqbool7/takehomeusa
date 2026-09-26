import { Link } from 'react-router-dom';
import { calculateTakeHomePay } from '../calculations/salaryCalculator.js';
import { formatCurrency, formatPercent } from '../utils/formatters.js';
import { KEY_COMPARISON_STATES } from '../data/salaryGuidesData.js';
import { getStateById } from '../data/states.js';
import { ArrowUpRight } from 'lucide-react';

export default function TaxComparisonTable({ grossSalary = 75000, filingStatus = 'single' }) {
  const comparisons = KEY_COMPARISON_STATES.map((stateId) => {
    const state = getStateById(stateId);
    const calc = calculateTakeHomePay({
      grossSalary,
      stateId,
      filingStatus,
      payFrequency: 'annual',
    });
    return {
      state,
      calc,
    };
  });

  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-xs overflow-hidden">
      <div className="px-5 py-4 border-b border-slate-200/80 bg-slate-50/70 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
        <div>
          <h4 className="text-base font-bold text-slate-900">
            Compare Take-Home Pay Across Top States
          </h4>
          <p className="text-xs text-slate-500">
            Estimated take-home on a {formatCurrency(grossSalary)} salary ({filingStatus.replace('_', ' ')})
          </p>
        </div>
        <Link
          to="/state-taxes"
          className="text-xs font-semibold text-emerald-600 hover:text-emerald-700 inline-flex items-center gap-1"
        >
          View All 50 States <ArrowUpRight className="w-3.5 h-3.5" />
        </Link>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead className="bg-slate-50/50 text-slate-500 text-[11px] uppercase tracking-wider border-b border-slate-200/60 font-semibold">
            <tr>
              <th scope="col" className="py-3 px-4">State</th>
              <th scope="col" className="py-3 px-4">State Income Tax</th>
              <th scope="col" className="py-3 px-4">Total Taxes</th>
              <th scope="col" className="py-3 px-4">Annual Take-Home</th>
              <th scope="col" className="py-3 px-4">Monthly Net</th>
              <th scope="col" className="py-3 px-4">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {comparisons.map(({ state, calc }) => {
              const isNoTax = state.type === 'no_income_tax';
              return (
                <tr key={state.id} className="hover:bg-slate-50/80 transition-colors">
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-slate-900">{state.name}</span>
                      {isNoTax && (
                        <span className="px-1.5 py-0.5 text-[10px] font-semibold bg-emerald-100 text-emerald-800 rounded">
                          0% State Tax
                        </span>
                      )}
                    </div>
                  </td>
                  <td className="py-3 px-4 text-slate-700 tabular-nums">
                    {isNoTax ? (
                      <span className="text-emerald-600 font-medium">$0 (0.0%)</span>
                    ) : (
                      <span>{formatCurrency(calc.taxes.state)} ({formatPercent(calc.taxes.stateEffectiveRate)})</span>
                    )}
                  </td>
                  <td className="py-3 px-4 text-slate-700 tabular-nums">
                    {formatCurrency(calc.taxes.totalTax)}
                  </td>
                  <td className="py-3 px-4 font-bold text-slate-900 tabular-nums">
                    {formatCurrency(calc.annualTakeHome)}
                  </td>
                  <td className="py-3 px-4 text-emerald-700 font-semibold tabular-nums">
                    {formatCurrency(calc.frequencies.monthly.takeHome)}
                  </td>
                  <td className="py-3 px-4">
                    <Link
                      to={`/salary-after-tax-calculator/${state.slug}`}
                      className="text-xs font-medium text-emerald-600 hover:text-emerald-800 inline-flex items-center gap-0.5"
                    >
                      Calculator <ArrowUpRight className="w-3 h-3" />
                    </Link>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
