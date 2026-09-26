import { useState } from 'react';
import { formatCurrency, formatPercent } from '../utils/formatters.js';
import TaxBreakdownChart from './TaxBreakdownChart.jsx';
import { ShieldCheck, Info, FileSpreadsheet, ArrowRight, Check } from 'lucide-react';

export default function ResultsDashboard({ calculation, onFrequencyChange }) {
  const [copied, setCopied] = useState(false);

  if (!calculation) return null;

  const {
    grossSalary,
    annualTakeHome,
    selectedPay,
    payFrequency,
    frequencies,
    taxes,
    deductions,
    state,
    filingStatus,
    takeHomePercentage,
  } = calculation;

  const frequencyUnitMap = {
    monthly: 'month',
    biweekly: 'bi-week',
    semimonthly: 'half-month',
    weekly: 'week',
    annual: 'year',
  };

  const currentUnit = frequencyUnitMap[payFrequency] || 'month';

  const handleCopySummary = () => {
    const text = `TakeHomeUSA Estimate: Gross ${formatCurrency(grossSalary)} in ${state.name} (${filingStatus}) = Net Take-Home ${formatCurrency(annualTakeHome)}/year (${formatCurrency(selectedPay.takeHome)}/${currentUnit}). Calculated at https://takehomeusa.com`;
    navigator.clipboard?.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div className="space-y-6" id="results-dashboard">
      {/* Primary Take-Home Pay Hero Card */}
      <div className="bg-slate-900 text-white rounded-2xl p-6 sm:p-8 shadow-xl relative overflow-hidden border border-slate-800">
        <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
        
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                2026 Estimated Take-Home Pay
              </span>
              <span className="text-xs text-slate-400">
                • {state.name}
              </span>
            </div>

            <div className="flex items-baseline gap-2">
              <span className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight tabular-nums">
                {formatCurrency(selectedPay.takeHome)}
              </span>
              <span className="text-lg sm:text-xl font-medium text-emerald-400">
                / {currentUnit}
              </span>
            </div>

            <p className="text-xs sm:text-sm text-slate-400 mt-2">
              You keep <span className="font-semibold text-emerald-400">{formatPercent(takeHomePercentage)}</span> of your {formatCurrency(grossSalary)} annual salary.
            </p>
          </div>

          {/* Quick Frequency Selector Tabs */}
          <div className="bg-slate-800/80 p-1.5 rounded-xl border border-slate-700/60 flex flex-wrap gap-1 self-start md:self-auto">
            {[
              { id: 'monthly', label: 'Monthly' },
              { id: 'biweekly', label: 'Biweekly' },
              { id: 'weekly', label: 'Weekly' },
              { id: 'annual', label: 'Annual' },
            ].map((freq) => (
              <button
                key={freq.id}
                type="button"
                onClick={() => onFrequencyChange && onFrequencyChange(freq.id)}
                className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all ${
                  payFrequency === freq.id
                    ? 'bg-emerald-600 text-white shadow-xs'
                    : 'text-slate-300 hover:text-white hover:bg-slate-700/60'
                }`}
              >
                {freq.label}
              </button>
            ))}
          </div>
        </div>

        {/* 4 Multi-frequency Take-Home Grid */}
        <div className="mt-8 pt-6 border-t border-slate-800 grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div className="bg-slate-800/50 rounded-xl p-3 border border-slate-700/40">
            <span className="text-[11px] text-slate-400 block font-medium">Annual Net</span>
            <span className="text-base sm:text-lg font-bold text-white tabular-nums">
              {formatCurrency(annualTakeHome)}
            </span>
          </div>
          <div className="bg-slate-800/50 rounded-xl p-3 border border-slate-700/40">
            <span className="text-[11px] text-slate-400 block font-medium">Monthly Net</span>
            <span className="text-base sm:text-lg font-bold text-emerald-400 tabular-nums">
              {formatCurrency(frequencies.monthly.takeHome)}
            </span>
          </div>
          <div className="bg-slate-800/50 rounded-xl p-3 border border-slate-700/40">
            <span className="text-[11px] text-slate-400 block font-medium">Biweekly Net</span>
            <span className="text-base sm:text-lg font-bold text-white tabular-nums">
              {formatCurrency(frequencies.biweekly.takeHome)}
            </span>
          </div>
          <div className="bg-slate-800/50 rounded-xl p-3 border border-slate-700/40">
            <span className="text-[11px] text-slate-400 block font-medium">Weekly Net</span>
            <span className="text-base sm:text-lg font-bold text-white tabular-nums">
              {formatCurrency(frequencies.weekly.takeHome)}
            </span>
          </div>
        </div>
      </div>

      {/* Visual Chart */}
      <TaxBreakdownChart calculation={calculation} />

      {/* Tax & Deduction Paystub Breakdown */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="px-6 py-4 border-b border-slate-200/80 bg-slate-50/70 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <FileSpreadsheet className="w-5 h-5 text-emerald-600" />
            <h3 className="font-bold text-slate-900 text-base">
              Estimated Paycheck & Tax Breakdown
            </h3>
          </div>
          <button
            type="button"
            onClick={handleCopySummary}
            className="text-xs font-semibold text-slate-600 hover:text-emerald-700 border border-slate-200 rounded-lg px-2.5 py-1 inline-flex items-center gap-1.5 transition-colors bg-white hover:bg-slate-50"
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-600" />
                <span>Copied!</span>
              </>
            ) : (
              <span>Share / Copy</span>
            )}
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-slate-50 text-[11px] uppercase tracking-wider text-slate-500 font-semibold border-b border-slate-200/60">
              <tr>
                <th className="py-3 px-6">Deduction / Component</th>
                <th className="py-3 px-4 text-right">Per {currentUnit}</th>
                <th className="py-3 px-4 text-right">Annual Total</th>
                <th className="py-3 px-6 text-right">% of Gross</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-medium">
              {/* Gross */}
              <tr className="bg-slate-50/40">
                <td className="py-3.5 px-6 font-bold text-slate-900">Gross Salary</td>
                <td className="py-3.5 px-4 text-right font-bold text-slate-900 tabular-nums">
                  {formatCurrency(selectedPay.gross)}
                </td>
                <td className="py-3.5 px-4 text-right font-bold text-slate-900 tabular-nums">
                  {formatCurrency(grossSalary)}
                </td>
                <td className="py-3.5 px-6 text-right text-slate-500 font-mono">100.0%</td>
              </tr>

              {/* Pre-tax benefits */}
              {deductions.k401 > 0 && (
                <tr className="hover:bg-slate-50/60">
                  <td className="py-3 px-6 text-slate-700 pl-8">
                    401(k) Retirement
                  </td>
                  <td className="py-3 px-4 text-right text-slate-700 tabular-nums">
                    -{formatCurrency(selectedPay.k401)}
                  </td>
                  <td className="py-3 px-4 text-right text-slate-700 tabular-nums">
                    -{formatCurrency(deductions.k401)}
                  </td>
                  <td className="py-3 px-6 text-right text-slate-500 font-mono">
                    {formatPercent(deductions.k401 / grossSalary)}
                  </td>
                </tr>
              )}

              {deductions.healthInsuranceAnnual > 0 && (
                <tr className="hover:bg-slate-50/60">
                  <td className="py-3 px-6 text-slate-700 pl-8">
                    Health Insurance (Pre-Tax)
                  </td>
                  <td className="py-3 px-4 text-right text-slate-700 tabular-nums">
                    -{formatCurrency(selectedPay.healthInsurance)}
                  </td>
                  <td className="py-3 px-4 text-right text-slate-700 tabular-nums">
                    -{formatCurrency(deductions.healthInsuranceAnnual)}
                  </td>
                  <td className="py-3 px-6 text-right text-slate-500 font-mono">
                    {formatPercent(deductions.healthInsuranceAnnual / grossSalary)}
                  </td>
                </tr>
              )}

              {deductions.hsa > 0 && (
                <tr className="hover:bg-slate-50/60">
                  <td className="py-3 px-6 text-slate-700 pl-8">
                    Health Savings Account (HSA)
                  </td>
                  <td className="py-3 px-4 text-right text-slate-700 tabular-nums">
                    -{formatCurrency(selectedPay.hsa)}
                  </td>
                  <td className="py-3 px-4 text-right text-slate-700 tabular-nums">
                    -{formatCurrency(deductions.hsa)}
                  </td>
                  <td className="py-3 px-6 text-right text-slate-500 font-mono">
                    {formatPercent(deductions.hsa / grossSalary)}
                  </td>
                </tr>
              )}

              {/* Taxes */}
              <tr className="hover:bg-slate-50/60">
                <td className="py-3 px-6 text-slate-800">
                  <div className="flex flex-col">
                    <span className="font-semibold">Federal Income Tax</span>
                    <span className="text-[11px] text-slate-500">
                      Standard deduction: {formatCurrency(taxes.federalStandardDeduction)}
                    </span>
                  </div>
                </td>
                <td className="py-3 px-4 text-right text-slate-800 tabular-nums">
                  -{formatCurrency(selectedPay.federalTax)}
                </td>
                <td className="py-3 px-4 text-right text-slate-800 tabular-nums">
                  -{formatCurrency(taxes.federal)}
                </td>
                <td className="py-3 px-6 text-right text-slate-500 font-mono">
                  {formatPercent(taxes.federalEffectiveRate)}
                </td>
              </tr>

              <tr className="hover:bg-slate-50/60">
                <td className="py-3 px-6 text-slate-800">
                  <div className="flex flex-col">
                    <span className="font-semibold">{state.name} State Income Tax</span>
                    <span className="text-[11px] text-slate-500">
                      {state.isNoIncomeTaxState ? '0% State Tax State' : `${state.type} rate system`}
                    </span>
                  </div>
                </td>
                <td className="py-3 px-4 text-right text-slate-800 tabular-nums">
                  -{formatCurrency(selectedPay.stateTax)}
                </td>
                <td className="py-3 px-4 text-right text-slate-800 tabular-nums">
                  -{formatCurrency(taxes.state)}
                </td>
                <td className="py-3 px-6 text-right text-slate-500 font-mono">
                  {formatPercent(taxes.stateEffectiveRate)}
                </td>
              </tr>

              <tr className="hover:bg-slate-50/60">
                <td className="py-3 px-6 text-slate-800">
                  <div className="flex flex-col">
                    <span className="font-semibold">Social Security (OASDI)</span>
                    <span className="text-[11px] text-slate-500">
                      6.2% up to {formatCurrency(taxes.socialSecurityWageCap || 176100)} cap
                    </span>
                  </div>
                </td>
                <td className="py-3 px-4 text-right text-slate-800 tabular-nums">
                  -{formatCurrency(selectedPay.socialSecurity)}
                </td>
                <td className="py-3 px-4 text-right text-slate-800 tabular-nums">
                  -{formatCurrency(taxes.socialSecurity)}
                </td>
                <td className="py-3 px-6 text-right text-slate-500 font-mono">
                  {formatPercent(taxes.socialSecurity / grossSalary)}
                </td>
              </tr>

              <tr className="hover:bg-slate-50/60">
                <td className="py-3 px-6 text-slate-800">
                  <div className="flex flex-col">
                    <span className="font-semibold">Medicare</span>
                    <span className="text-[11px] text-slate-500">
                      1.45% base {taxes.additionalMedicare > 0 ? '+ 0.9% additional' : ''}
                    </span>
                  </div>
                </td>
                <td className="py-3 px-4 text-right text-slate-800 tabular-nums">
                  -{formatCurrency(selectedPay.medicare)}
                </td>
                <td className="py-3 px-4 text-right text-slate-800 tabular-nums">
                  -{formatCurrency(taxes.medicare)}
                </td>
                <td className="py-3 px-6 text-right text-slate-500 font-mono">
                  {formatPercent(taxes.medicare / grossSalary)}
                </td>
              </tr>

              {/* Total Deductions row */}
              <tr className="bg-slate-50/80 font-bold text-slate-900 border-t border-slate-200">
                <td className="py-3.5 px-6">Total Taxes & Deductions</td>
                <td className="py-3.5 px-4 text-right text-red-600 tabular-nums">
                  -{formatCurrency(selectedPay.totalDeductions)}
                </td>
                <td className="py-3.5 px-4 text-right text-red-600 tabular-nums">
                  -{formatCurrency(deductions.totalDeductions)}
                </td>
                <td className="py-3.5 px-6 text-right text-red-600 font-mono">
                  {formatPercent(deductions.effectiveTotalDeductionRate)}
                </td>
              </tr>

              {/* Net Take-Home row */}
              <tr className="bg-emerald-50/60 font-extrabold text-slate-900 border-t-2 border-emerald-500">
                <td className="py-4 px-6 text-emerald-950 text-base">
                  Estimated Take-Home Pay (Net)
                </td>
                <td className="py-4 px-4 text-right text-emerald-800 text-lg tabular-nums">
                  {formatCurrency(selectedPay.takeHome)}
                </td>
                <td className="py-4 px-4 text-right text-emerald-800 text-lg tabular-nums">
                  {formatCurrency(annualTakeHome)}
                </td>
                <td className="py-4 px-6 text-right text-emerald-800 font-mono">
                  {formatPercent(takeHomePercentage)}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Mandatory Accuracy & Educational Disclaimer */}
      <div className="rounded-xl border border-amber-200/80 bg-amber-50/70 p-4 text-xs text-amber-900 leading-relaxed flex items-start gap-3">
        <Info className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
        <div className="space-y-1">
          <p className="font-semibold text-amber-950">
            This calculator provides estimates for educational purposes and may not reflect your exact tax situation.
          </p>
          <p className="text-amber-800/90">
            Estimated result. Actual take-home pay can vary based on your tax situation, benefits, deductions, local taxes (e.g. city or county surtaxes), and employer payroll settings.
          </p>
        </div>
      </div>
    </div>
  );
}
