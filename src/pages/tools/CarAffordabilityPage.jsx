import { useState, useMemo } from 'react';
import SEO from '../../components/SEO.jsx';
import RelatedTools from '../../components/RelatedTools.jsx';
import AdPlaceholder from '../../components/AdPlaceholder.jsx';
import { formatCurrency } from '../../utils/formatters.js';
import { Car, CheckCircle } from 'lucide-react';

export default function CarAffordabilityPage() {
  const [grossAnnualIncome, setGrossAnnualIncome] = useState(75000);
  const [downPaymentAvailable, setDownPaymentAvailable] = useState(6000);

  // 20/4/10 Rule: 20% down, 4 years (48 mo) loan, total transportation <= 10% of monthly gross
  const calculation = useMemo(() => {
    const monthlyGross = (Number(grossAnnualIncome) || 0) / 12;
    const maxMonthlyTransportation = monthlyGross * 0.10;
    // Assume $120 for car insurance and gas leaves rest for loan payment
    const maxMonthlyLoanPayment = Math.max(100, maxMonthlyTransportation - 120);

    // Max loan financed with 48 months at 6.5% interest
    const r = (6.5 / 100) / 12;
    const n = 48;
    const maxFinanced = (maxMonthlyLoanPayment * (Math.pow(1 + r, n) - 1)) / (r * Math.pow(1 + r, n));
    const maxCarPrice = maxFinanced + (Number(downPaymentAvailable) || 0);

    return {
      monthlyGross,
      maxMonthlyTransportation,
      maxMonthlyLoanPayment,
      maxCarPrice,
    };
  }, [grossAnnualIncome, downPaymentAvailable]);

  return (
    <div className="min-h-screen">
      <SEO
        title="Car Affordability Calculator — The 20/4/10 Rule | TakeHomeUSA"
        description="Determine what car price you can realistically afford based on your annual gross salary and monthly take-home pay using the 20/4/10 personal finance rule."
        canonicalPath="/tools/car-affordability"
      />

      <section className="pt-8 pb-10 text-center px-4 max-w-4xl mx-auto">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold mb-3">
          <Car className="w-3.5 h-3.5 text-emerald-600" />
          <span>20/4/10 Financial Rule</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight">
          Car Affordability Calculator
        </h1>
        <p className="mt-3 text-base sm:text-lg text-slate-600 max-w-2xl mx-auto">
          Find your safe vehicle budget so car payments don't compromise your savings and investments.
        </p>
      </section>

      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <div className="lg:col-span-5 bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider mb-1">
                Annual Salary ($)
              </label>
              <input
                type="number"
                value={grossAnnualIncome}
                onChange={(e) => setGrossAnnualIncome(Math.max(0, Number(e.target.value)))}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 font-bold text-slate-900"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider mb-1">
                Cash Down Payment Available ($)
              </label>
              <input
                type="number"
                value={downPaymentAvailable}
                onChange={(e) => setDownPaymentAvailable(Math.max(0, Number(e.target.value)))}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 font-bold text-slate-900"
              />
            </div>
          </div>

          <div className="lg:col-span-7 bg-slate-900 text-white rounded-2xl p-6 sm:p-8 shadow-xl border border-slate-800 space-y-6">
            <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider block">
              Recommended Maximum Car Price
            </span>

            <div className="text-4xl sm:text-5xl font-extrabold text-white tabular-nums">
              {formatCurrency(calculation.maxCarPrice)}
            </div>

            <div className="grid grid-cols-2 gap-4 pt-4 border-t border-slate-800">
              <div className="p-3 bg-slate-800/60 rounded-xl">
                <span className="text-xs text-slate-400 block">Target Monthly Payment</span>
                <span className="text-lg font-bold text-emerald-400 tabular-nums">
                  {formatCurrency(calculation.maxMonthlyLoanPayment)}/mo
                </span>
              </div>
              <div className="p-3 bg-slate-800/60 rounded-xl">
                <span className="text-xs text-slate-400 block">Total Monthly Transport (10%)</span>
                <span className="text-lg font-bold text-white tabular-nums">
                  {formatCurrency(calculation.maxMonthlyTransportation)}/mo
                </span>
              </div>
            </div>
          </div>
        </div>

        <AdPlaceholder slot="horizontal" />
        <RelatedTools currentToolId="car-affordability" />
      </section>
    </div>
  );
}
