import { useState, useMemo } from 'react';
import SEO from '../../components/SEO.jsx';
import RelatedTools from '../../components/RelatedTools.jsx';
import AdPlaceholder from '../../components/AdPlaceholder.jsx';
import { formatCurrency } from '../../utils/formatters.js';
import { TrendingUp, DollarSign } from 'lucide-react';

export default function CompoundInterestPage() {
  const [initialInvestment, setInitialInvestment] = useState(10000);
  const [monthlyContribution, setMonthlyContribution] = useState(500);
  const [years, setYears] = useState(25);
  const [interestRate, setInterestRate] = useState(8);

  const result = useMemo(() => {
    const P = Number(initialInvestment) || 0;
    const PMT = Number(monthlyContribution) || 0;
    const t = Number(years) || 1;
    const r = (Number(interestRate) || 0) / 100;
    const n = 12; // monthly compounding

    // Future value of principal: P * (1 + r/n)^(n*t)
    const fvPrincipal = P * Math.pow(1 + r / n, n * t);

    // Future value of series: PMT * (((1 + r/n)^(n*t) - 1) / (r/n))
    const fvSeries = r === 0 ? PMT * n * t : PMT * ((Math.pow(1 + r / n, n * t) - 1) / (r / n));

    const totalBalance = fvPrincipal + fvSeries;
    const totalContributed = P + (PMT * n * t);
    const totalInterestEarned = Math.max(0, totalBalance - totalContributed);

    return {
      totalBalance,
      totalContributed,
      totalInterestEarned,
    };
  }, [initialInvestment, monthlyContribution, years, interestRate]);

  return (
    <div className="min-h-screen">
      <SEO
        title="Compound Interest Calculator — Grow Your Wealth | TakeHomeUSA"
        description="Forecast the long-term compounding growth of your monthly savings, 401(k), and index fund investments over 10 to 40 years."
        canonicalPath="/tools/compound-interest"
      />

      <section className="pt-8 pb-10 text-center px-4 max-w-4xl mx-auto">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold mb-3">
          <TrendingUp className="w-3.5 h-3.5 text-emerald-600" />
          <span>Wealth Accumulation</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight">
          Compound Interest Calculator
        </h1>
        <p className="mt-3 text-base sm:text-lg text-slate-600 max-w-2xl mx-auto">
          See how regular monthly investments compound exponentially over time.
        </p>
      </section>

      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <div className="lg:col-span-5 bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider mb-1">
                Initial Deposit ($)
              </label>
              <input
                type="number"
                value={initialInvestment}
                onChange={(e) => setInitialInvestment(Math.max(0, Number(e.target.value)))}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 font-bold text-slate-900 text-base"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider mb-1">
                Monthly Contribution ($)
              </label>
              <input
                type="number"
                value={monthlyContribution}
                onChange={(e) => setMonthlyContribution(Math.max(0, Number(e.target.value)))}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 font-bold text-slate-900 text-base"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider mb-1">
                Years to Grow ({years} yrs)
              </label>
              <input
                type="range"
                min="1"
                max="45"
                value={years}
                onChange={(e) => setYears(Number(e.target.value))}
                className="w-full accent-emerald-600"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider mb-1">
                Annual Return Rate ({interestRate}%)
              </label>
              <input
                type="range"
                min="1"
                max="15"
                step="0.5"
                value={interestRate}
                onChange={(e) => setInterestRate(Number(e.target.value))}
                className="w-full accent-emerald-600"
              />
              <span className="text-[11px] text-slate-400">Historical S&P 500 average is ~8% to 10%</span>
            </div>
          </div>

          <div className="lg:col-span-7 bg-slate-900 text-white rounded-2xl p-6 sm:p-8 shadow-xl border border-slate-800 space-y-6">
            <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider block">
              Estimated Balance after {years} Years
            </span>

            <div className="text-4xl sm:text-5xl font-extrabold text-white tabular-nums">
              {formatCurrency(result.totalBalance)}
            </div>

            <div className="grid grid-cols-2 gap-4 pt-4 border-t border-slate-800">
              <div className="p-3 bg-slate-800/60 rounded-xl">
                <span className="text-xs text-slate-400 block">Total Principal Deposited</span>
                <span className="text-lg font-bold text-white tabular-nums">
                  {formatCurrency(result.totalContributed)}
                </span>
              </div>
              <div className="p-3 bg-slate-800/60 rounded-xl">
                <span className="text-xs text-slate-400 block">Compound Interest Earned</span>
                <span className="text-lg font-bold text-emerald-400 tabular-nums">
                  {formatCurrency(result.totalInterestEarned)}
                </span>
              </div>
            </div>
          </div>
        </div>

        <AdPlaceholder slot="horizontal" />
        <RelatedTools currentToolId="compound-interest" />
      </section>
    </div>
  );
}
