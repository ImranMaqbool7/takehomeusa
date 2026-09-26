import { formatCurrency, formatPercent } from '../utils/formatters.js';

export default function TaxBreakdownChart({ calculation }) {
  if (!calculation || !calculation.chartSlices || calculation.grossSalary === 0) {
    return null;
  }

  const { chartSlices, grossSalary } = calculation;

  return (
    <div className="bg-white rounded-xl p-5 sm:p-6 border border-slate-200/80 shadow-xs">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
        <div>
          <h4 className="text-base font-bold text-slate-900">
            Income Distribution Breakdown
          </h4>
          <p className="text-xs text-slate-500">
            Where your gross salary of {formatCurrency(grossSalary)} goes each year
          </p>
        </div>
        <div className="text-right">
          <span className="inline-flex items-center px-2.5 py-1 rounded-md text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200/60">
            Take-Home: {formatPercent(calculation.takeHomePercentage)}
          </span>
        </div>
      </div>

      {/* Stacked Proportional Bar */}
      <div className="w-full h-8 sm:h-9 rounded-lg overflow-hidden flex bg-slate-100 p-1 shadow-inner gap-0.5">
        {chartSlices.map((slice, idx) => (
          <div
            key={idx}
            style={{
              width: `${Math.max(slice.percentage, 1.5)}%`,
              backgroundColor: slice.color,
            }}
            className="h-full rounded transition-all duration-300 relative group cursor-pointer"
            title={`${slice.label}: ${formatCurrency(slice.amount)} (${slice.percentage.toFixed(1)}%)`}
          />
        ))}
      </div>

      {/* Legend & Amounts Grid */}
      <div className="mt-5 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
        {chartSlices.map((slice, idx) => (
          <div
            key={idx}
            className="flex flex-col p-2.5 rounded-lg border border-slate-100 bg-slate-50/50 hover:bg-slate-50 transition-colors"
          >
            <div className="flex items-center gap-1.5 mb-1">
              <span
                className="w-2.5 h-2.5 rounded-full shrink-0"
                style={{ backgroundColor: slice.color }}
              />
              <span className="text-xs font-medium text-slate-600 truncate">
                {slice.label}
              </span>
            </div>
            <div className="text-sm font-bold text-slate-900 tabular-nums">
              {formatCurrency(slice.amount)}
            </div>
            <div className="text-[11px] text-slate-500 font-mono">
              {slice.percentage.toFixed(1)}% of gross
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
