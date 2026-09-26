import { useState, useMemo } from 'react';
import SEO from '../../components/SEO.jsx';
import RelatedTools from '../../components/RelatedTools.jsx';
import AdPlaceholder from '../../components/AdPlaceholder.jsx';
import { formatCurrency } from '../../utils/formatters.js';
import { CreditCard, ArrowRight, ShieldCheck, DollarSign } from 'lucide-react';

export default function CreditCardPayoffPage() {
  const [balance, setBalance] = useState(6000);
  const [apr, setApr] = useState(24.99);
  const [monthlyPayment, setMonthlyPayment] = useState(250);

  const result = useMemo(() => {
    const P = Number(balance) || 0;
    const r = (Number(apr) || 0) / 100 / 12;
    const m = Number(monthlyPayment) || 0;

    if (P <= 0 || m <= 0) return { months: 0, totalInterest: 0, totalPaid: 0, possible: true };

    const minRequiredInterest = P * r;
    if (m <= minRequiredInterest) {
      return { months: Infinity, totalInterest: Infinity, totalPaid: Infinity, possible: false };
    }

    // Number of months: n = -ln(1 - (P * r) / m) / ln(1 + r)
    const n = Math.ceil(-Math.log(1 - (P * r) / m) / Math.log(1 + r));
    const totalPaid = m * n;
    const totalInterest = Math.max(0, totalPaid - P);

    return {
      months: n,
      years: (n / 12).toFixed(1),
      totalInterest,
      totalPaid,
      possible: true,
    };
  }, [balance, apr, monthlyPayment]);

  return (
    <div className="min-h-screen">
      <SEO
        title="Credit Card Payoff Calculator — Free Debt Snowball Tool | TakeHomeUSA"
        description="Calculate how long it will take to pay off your credit card balance, see total interest charges, and find out how much you can save by increasing monthly payments."
        canonicalPath="/tools/credit-card-payoff"
      />

      <section className="pt-8 pb-10 text-center px-4 max-w-4xl mx-auto">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold mb-3">
          <CreditCard className="w-3.5 h-3.5 text-emerald-600" />
          <span>Debt Free Strategy</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight">
          Credit Card Payoff Calculator
        </h1>
        <p className="mt-3 text-base sm:text-lg text-slate-600 max-w-2xl mx-auto">
          See exactly how quickly you can eliminate your credit card debt and how much interest you'll save.
        </p>
      </section>

      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Inputs */}
          <div className="lg:col-span-5 bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-5">
            <div>
              <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider mb-1.5">
                Current Card Balance ($)
              </label>
              <input
                type="number"
                value={balance}
                onChange={(e) => setBalance(Math.max(0, Number(e.target.value)))}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-base font-bold text-slate-900 focus:ring-2 focus:ring-emerald-500 outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider mb-1.5">
                Annual Interest Rate (APR %)
              </label>
              <input
                type="number"
                step="0.1"
                value={apr}
                onChange={(e) => setApr(Math.max(0, Number(e.target.value)))}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-base font-bold text-slate-900 focus:ring-2 focus:ring-emerald-500 outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider mb-1.5">
                Target Monthly Payment ($)
              </label>
              <input
                type="number"
                value={monthlyPayment}
                onChange={(e) => setMonthlyPayment(Math.max(0, Number(e.target.value)))}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-base font-bold text-slate-900 focus:ring-2 focus:ring-emerald-500 outline-none"
              />
            </div>
          </div>

          {/* Results */}
          <div className="lg:col-span-7 bg-slate-900 text-white rounded-2xl p-6 sm:p-8 shadow-xl border border-slate-800 space-y-6">
            <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider block">
              Payoff Estimate
            </span>

            {result.possible ? (
              <>
                <div className="flex items-baseline gap-2">
                  <span className="text-4xl sm:text-5xl font-extrabold text-white">
                    {result.months} Months
                  </span>
                  <span className="text-slate-400 text-sm">
                    (~{result.years} years)
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-4 pt-4 border-t border-slate-800">
                  <div className="p-3 bg-slate-800/60 rounded-xl">
                    <span className="text-xs text-slate-400 block">Total Interest Paid</span>
                    <span className="text-xl font-bold text-amber-400">
                      {formatCurrency(result.totalInterest)}
                    </span>
                  </div>
                  <div className="p-3 bg-slate-800/60 rounded-xl">
                    <span className="text-xs text-slate-400 block">Total Principal + Interest</span>
                    <span className="text-xl font-bold text-white">
                      {formatCurrency(result.totalPaid)}
                    </span>
                  </div>
                </div>

                <p className="text-xs text-slate-400">
                  Tip: Adding just $50 more to your monthly payment can shave months off your timeline and save hundreds in financing costs.
                </p>
              </>
            ) : (
              <div className="text-amber-400 p-4 bg-amber-950/40 rounded-xl border border-amber-800 text-sm">
                Your monthly payment of {formatCurrency(monthlyPayment)} is too low to cover the monthly interest charge of {formatCurrency(balance * (apr / 100 / 12))}. Increase your payment to make progress on the principal balance.
              </div>
            )}
          </div>
        </div>

        <AdPlaceholder slot="horizontal" />
        <RelatedTools currentToolId="credit-card-payoff" />
      </section>
    </div>
  );
}
