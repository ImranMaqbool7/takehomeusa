import { useState, useMemo } from 'react';
import SEO from '../../components/SEO.jsx';
import RelatedTools from '../../components/RelatedTools.jsx';
import AdPlaceholder from '../../components/AdPlaceholder.jsx';
import { formatCurrency } from '../../utils/formatters.js';
import { Car } from 'lucide-react';

export default function AutoLoanPayoffPage() {
  const [vehiclePrice, setVehiclePrice] = useState(35000);
  const [downPayment, setDownPayment] = useState(5000);
  const [termMonths, setTermMonths] = useState(60);
  const [interestRate, setInterestRate] = useState(6.5);

  const loan = useMemo(() => {
    const P = Math.max(0, vehiclePrice - downPayment);
    const r = (interestRate / 100) / 12;
    const n = termMonths;
    if (P === 0 || n === 0) return { monthlyPayment: 0, totalInterest: 0, totalCost: 0 };
    const monthlyPayment = r === 0 ? P / n : (P * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
    const totalCost = monthlyPayment * n;
    const totalInterest = totalCost - P;
    return {
      principal: P,
      monthlyPayment,
      totalInterest,
      totalCost,
    };
  }, [vehiclePrice, downPayment, termMonths, interestRate]);

  return (
    <div className="min-h-screen">
      <SEO
        title="Auto Loan Payoff Calculator — Monthly Car Payment | TakeHomeUSA"
        description="Calculate monthly car loan payments, amortization, interest charges, and loan payoff duration."
        canonicalPath="/tools/auto-loan"
      />

      <section className="pt-8 pb-10 text-center px-4 max-w-4xl mx-auto">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold mb-3">
          <Car className="w-3.5 h-3.5 text-emerald-600" />
          <span>Vehicle Financing</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight">
          Auto Loan Payoff Calculator
        </h1>
        <p className="mt-3 text-base sm:text-lg text-slate-600 max-w-2xl mx-auto">
          Calculate your monthly auto payment and see how much total interest you'll pay over the life of the loan.
        </p>
      </section>

      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <div className="lg:col-span-5 bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider mb-1">
                Vehicle Price ($)
              </label>
              <input
                type="number"
                value={vehiclePrice}
                onChange={(e) => setVehiclePrice(Math.max(0, Number(e.target.value)))}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 font-bold text-slate-900"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider mb-1">
                Down Payment / Trade-In ($)
              </label>
              <input
                type="number"
                value={downPayment}
                onChange={(e) => setDownPayment(Math.max(0, Number(e.target.value)))}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 font-bold text-slate-900"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider mb-1">
                Loan Term ({termMonths} Months)
              </label>
              <select
                value={termMonths}
                onChange={(e) => setTermMonths(Number(e.target.value))}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 font-medium text-slate-900 bg-white"
              >
                <option value="36">36 Months (3 Years)</option>
                <option value="48">48 Months (4 Years)</option>
                <option value="60">60 Months (5 Years)</option>
                <option value="72">72 Months (6 Years)</option>
                <option value="84">84 Months (7 Years)</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider mb-1">
                Interest Rate (APR %)
              </label>
              <input
                type="number"
                step="0.1"
                value={interestRate}
                onChange={(e) => setInterestRate(Math.max(0, Number(e.target.value)))}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 font-bold text-slate-900"
              />
            </div>
          </div>

          <div className="lg:col-span-7 bg-slate-900 text-white rounded-2xl p-6 sm:p-8 shadow-xl border border-slate-800 space-y-6">
            <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider block">
              Estimated Monthly Payment
            </span>

            <div className="text-4xl sm:text-5xl font-extrabold text-white tabular-nums">
              {formatCurrency(loan.monthlyPayment)}
              <span className="text-lg font-medium text-emerald-400"> / month</span>
            </div>

            <div className="grid grid-cols-2 gap-4 pt-4 border-t border-slate-800">
              <div className="p-3 bg-slate-800/60 rounded-xl">
                <span className="text-xs text-slate-400 block">Total Interest Paid</span>
                <span className="text-lg font-bold text-amber-400 tabular-nums">
                  {formatCurrency(loan.totalInterest)}
                </span>
              </div>
              <div className="p-3 bg-slate-800/60 rounded-xl">
                <span className="text-xs text-slate-400 block">Total Loan Amount</span>
                <span className="text-lg font-bold text-white tabular-nums">
                  {formatCurrency(loan.principal)}
                </span>
              </div>
            </div>
          </div>
        </div>

        <AdPlaceholder slot="horizontal" />
        <RelatedTools currentToolId="auto-loan" />
      </section>
    </div>
  );
}
