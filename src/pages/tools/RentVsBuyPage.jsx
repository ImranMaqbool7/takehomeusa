import { useState, useMemo } from 'react';
import SEO from '../../components/SEO.jsx';
import RelatedTools from '../../components/RelatedTools.jsx';
import AdPlaceholder from '../../components/AdPlaceholder.jsx';
import { formatCurrency } from '../../utils/formatters.js';
import { Home } from 'lucide-react';

export default function RentVsBuyPage() {
  const [homePrice, setHomePrice] = useState(420000);
  const [downPaymentPct, setDownPaymentPct] = useState(20);
  const [mortgageRate, setMortgageRate] = useState(6.75);
  const [monthlyRent, setMonthlyRent] = useState(2200);

  const buyDetails = useMemo(() => {
    const P = homePrice * (1 - downPaymentPct / 100);
    const r = (mortgageRate / 100) / 12;
    const n = 360; // 30-year fixed
    const monthlyPI = (P * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
    const propertyTax = (homePrice * 0.012) / 12;
    const homeInsurance = 150;
    const maintenance = (homePrice * 0.01) / 12;
    const totalMonthlyBuy = monthlyPI + propertyTax + homeInsurance + maintenance;
    return {
      monthlyPI,
      propertyTax,
      totalMonthlyBuy,
      downPaymentAmount: homePrice * (downPaymentPct / 100),
    };
  }, [homePrice, downPaymentPct, mortgageRate]);

  return (
    <div className="min-h-screen">
      <SEO
        title="Rent vs Buy Calculator — Housing Cost Comparison | TakeHomeUSA"
        description="Compare the true monthly and long-term costs of renting an apartment vs purchasing a home."
        canonicalPath="/tools/rent-vs-buy"
      />

      <section className="pt-8 pb-10 text-center px-4 max-w-4xl mx-auto">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold mb-3">
          <Home className="w-3.5 h-3.5 text-emerald-600" />
          <span>Real Estate Analysis</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight">
          Rent vs Buy Calculator
        </h1>
        <p className="mt-3 text-base sm:text-lg text-slate-600 max-w-2xl mx-auto">
          Compare total out-of-pocket housing costs to make the right housing choice for your income.
        </p>
      </section>

      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <div className="lg:col-span-5 bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider mb-1">
                Target Home Price ($)
              </label>
              <input
                type="number"
                value={homePrice}
                onChange={(e) => setHomePrice(Math.max(0, Number(e.target.value)))}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 font-bold text-slate-900"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider mb-1">
                Down Payment ({downPaymentPct}%)
              </label>
              <input
                type="range"
                min="3"
                max="50"
                value={downPaymentPct}
                onChange={(e) => setDownPaymentPct(Number(e.target.value))}
                className="w-full accent-emerald-600"
              />
              <span className="text-xs text-slate-500 font-semibold">{formatCurrency(buyDetails.downPaymentAmount)} down</span>
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider mb-1">
                30-Yr Mortgage Rate (%)
              </label>
              <input
                type="number"
                step="0.1"
                value={mortgageRate}
                onChange={(e) => setMortgageRate(Math.max(0, Number(e.target.value)))}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 font-bold text-slate-900"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider mb-1">
                Alternative Monthly Rent ($)
              </label>
              <input
                type="number"
                value={monthlyRent}
                onChange={(e) => setMonthlyRent(Math.max(0, Number(e.target.value)))}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 font-bold text-slate-900"
              />
            </div>
          </div>

          <div className="lg:col-span-7 bg-slate-900 text-white rounded-2xl p-6 sm:p-8 shadow-xl border border-slate-800 space-y-6">
            <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider block">
              Monthly Cost Comparison
            </span>

            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 bg-slate-800/80 rounded-xl border border-slate-700">
                <span className="text-xs text-slate-400 block font-medium">Buying Total Cost</span>
                <span className="text-2xl sm:text-3xl font-bold text-white tabular-nums">
                  {formatCurrency(buyDetails.totalMonthlyBuy)}
                </span>
                <span className="text-[11px] text-slate-400 block mt-1">
                  Includes P&I, property tax, insurance & maintenance
                </span>
              </div>

              <div className="p-4 bg-slate-800/80 rounded-xl border border-slate-700">
                <span className="text-xs text-slate-400 block font-medium">Renting Cost</span>
                <span className="text-2xl sm:text-3xl font-bold text-emerald-400 tabular-nums">
                  {formatCurrency(monthlyRent)}
                </span>
                <span className="text-[11px] text-slate-400 block mt-1">
                  Fixed monthly rent (no maintenance liabilities)
                </span>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-slate-800/40 border border-slate-700/60 text-xs text-slate-300 leading-relaxed">
              {buyDetails.totalMonthlyBuy > monthlyRent ? (
                <span>Renting currently saves you <strong>{formatCurrency(buyDetails.totalMonthlyBuy - monthlyRent)}</strong> per month in cash flow, which can be invested in broad market index funds.</span>
              ) : (
                <span>Buying is estimated to be <strong>{formatCurrency(monthlyRent - buyDetails.totalMonthlyBuy)}</strong> cheaper per month while building long-term equity.</span>
              )}
            </div>
          </div>
        </div>

        <AdPlaceholder slot="horizontal" />
        <RelatedTools currentToolId="rent-vs-buy" />
      </section>
    </div>
  );
}
