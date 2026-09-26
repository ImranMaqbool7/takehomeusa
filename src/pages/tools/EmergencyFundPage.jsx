import { useState } from 'react';
import SEO from '../../components/SEO.jsx';
import RelatedTools from '../../components/RelatedTools.jsx';
import AdPlaceholder from '../../components/AdPlaceholder.jsx';
import { formatCurrency } from '../../utils/formatters.js';
import { ShieldAlert, ShieldCheck } from 'lucide-react';

export default function EmergencyFundPage() {
  const [rentMortgage, setRentMortgage] = useState(1800);
  const [groceries, setGroceries] = useState(600);
  const [utilities, setUtilities] = useState(250);
  const [transportation, setTransportation] = useState(400);
  const [healthcareDebt, setHealthcareDebt] = useState(350);

  const monthlyEssential = rentMortgage + groceries + utilities + transportation + healthcareDebt;
  const month3 = monthlyEssential * 3;
  const month6 = monthlyEssential * 6;

  return (
    <div className="min-h-screen">
      <SEO
        title="Emergency Fund Calculator — Calculate 3 to 6 Month Reserve | TakeHomeUSA"
        description="Calculate how much you need in an emergency fund to protect against job loss, unexpected medical bills, or emergencies."
        canonicalPath="/tools/emergency-fund"
      />

      <section className="pt-8 pb-10 text-center px-4 max-w-4xl mx-auto">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold mb-3">
          <ShieldAlert className="w-3.5 h-3.5 text-emerald-600" />
          <span>Financial Safety Cushion</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight">
          Emergency Fund Calculator
        </h1>
        <p className="mt-3 text-base sm:text-lg text-slate-600 max-w-2xl mx-auto">
          Calculate the exact dollar cushion needed in a High-Yield Savings Account (HYSA) to weather any financial storm.
        </p>
      </section>

      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <div className="lg:col-span-5 bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-3">
            <h3 className="font-bold text-slate-900 text-sm mb-2">Essential Monthly Expenses</h3>
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Housing (Rent/Mortgage)</label>
              <input
                type="number"
                value={rentMortgage}
                onChange={(e) => setRentMortgage(Math.max(0, Number(e.target.value)))}
                className="w-full px-3 py-2 rounded-lg border border-slate-300 font-semibold text-slate-900 text-sm"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Groceries & Household Food</label>
              <input
                type="number"
                value={groceries}
                onChange={(e) => setGroceries(Math.max(0, Number(e.target.value)))}
                className="w-full px-3 py-2 rounded-lg border border-slate-300 font-semibold text-slate-900 text-sm"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Utilities & Phone</label>
              <input
                type="number"
                value={utilities}
                onChange={(e) => setUtilities(Math.max(0, Number(e.target.value)))}
                className="w-full px-3 py-2 rounded-lg border border-slate-300 font-semibold text-slate-900 text-sm"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Transportation & Gas</label>
              <input
                type="number"
                value={transportation}
                onChange={(e) => setTransportation(Math.max(0, Number(e.target.value)))}
                className="w-full px-3 py-2 rounded-lg border border-slate-300 font-semibold text-slate-900 text-sm"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Healthcare & Debt Minimums</label>
              <input
                type="number"
                value={healthcareDebt}
                onChange={(e) => setHealthcareDebt(Math.max(0, Number(e.target.value)))}
                className="w-full px-3 py-2 rounded-lg border border-slate-300 font-semibold text-slate-900 text-sm"
              />
            </div>
          </div>

          <div className="lg:col-span-7 bg-slate-900 text-white rounded-2xl p-6 sm:p-8 shadow-xl border border-slate-800 space-y-6">
            <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider block">
              Emergency Cushion Targets
            </span>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-4 bg-slate-800/80 rounded-xl border border-slate-700">
                <span className="text-xs text-slate-400 block font-medium">3-Month Safety Net</span>
                <span className="text-3xl font-extrabold text-white block my-1 tabular-nums">
                  {formatCurrency(month3)}
                </span>
                <span className="text-[11px] text-slate-400">Suitable for dual-income households with stable jobs</span>
              </div>

              <div className="p-4 bg-slate-800/80 rounded-xl border border-emerald-500/50 bg-emerald-950/20">
                <span className="text-xs text-emerald-400 block font-medium">6-Month Safety Net</span>
                <span className="text-3xl font-extrabold text-emerald-400 block my-1 tabular-nums">
                  {formatCurrency(month6)}
                </span>
                <span className="text-[11px] text-slate-300">Recommended for single earners, freelancers & families</span>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-slate-800/40 border border-slate-700 text-xs text-slate-300 flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-emerald-400 shrink-0" />
              <span>Keep your emergency fund liquid in a federally insured High-Yield Savings Account (HYSA) or money market account earning 4%+ APY.</span>
            </div>
          </div>
        </div>

        <AdPlaceholder slot="horizontal" />
        <RelatedTools currentToolId="emergency-fund" />
      </section>
    </div>
  );
}
