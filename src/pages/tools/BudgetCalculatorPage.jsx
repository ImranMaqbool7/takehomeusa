import { useState } from 'react';
import SEO from '../../components/SEO.jsx';
import RelatedTools from '../../components/RelatedTools.jsx';
import AdPlaceholder from '../../components/AdPlaceholder.jsx';
import { formatCurrency } from '../../utils/formatters.js';
import { PieChart, Home, Coffee, PiggyBank, ArrowRight } from 'lucide-react';

export default function BudgetCalculatorPage() {
  const [monthlyTakeHome, setMonthlyTakeHome] = useState(4800);

  const needs = Math.round(monthlyTakeHome * 0.50);
  const wants = Math.round(monthlyTakeHome * 0.30);
  const savings = Math.round(monthlyTakeHome * 0.20);

  return (
    <div className="min-h-screen">
      <SEO
        title="50/30/20 Budget Calculator — Free Take-Home Pay Allocation | TakeHomeUSA"
        description="Divide your monthly take-home pay according to the 50/30/20 budget framework. See exact dollar targets for Needs (50%), Wants (30%), and Savings (20%)."
        canonicalPath="/tools/budget-calculator"
      />

      <section className="pt-8 pb-10 text-center px-4 max-w-4xl mx-auto">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold mb-3">
          <PieChart className="w-3.5 h-3.5 text-emerald-600" />
          <span>Paycheck Allocation</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight">
          50/30/20 Budget Calculator
        </h1>
        <p className="mt-3 text-base sm:text-lg text-slate-600 max-w-2xl mx-auto">
          The simplest, most effective rule of thumb for managing your net take-home salary.
        </p>
      </section>

      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-xs mb-8">
          <label className="block text-sm font-bold text-slate-800 mb-2">
            Your Monthly Take-Home Pay ($)
          </label>
          <div className="relative max-w-md">
            <span className="absolute left-4 inset-y-0 flex items-center text-slate-400 font-bold text-lg">$</span>
            <input
              type="number"
              value={monthlyTakeHome}
              onChange={(e) => setMonthlyTakeHome(Math.max(0, Number(e.target.value)))}
              className="w-full pl-9 pr-4 py-3 text-xl font-bold text-slate-900 rounded-xl border border-slate-300 focus:ring-2 focus:ring-emerald-500 outline-none"
            />
          </div>
        </div>

        {/* 3 Budget Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          <div className="bg-white rounded-2xl border border-emerald-200 p-6 shadow-2xs relative overflow-hidden">
            <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center mb-4">
              <Home className="w-5 h-5" />
            </div>
            <span className="text-xs font-bold text-emerald-800 uppercase tracking-wider block">
              50% Needs
            </span>
            <span className="text-3xl font-extrabold text-slate-900 block my-1 tabular-nums">
              {formatCurrency(needs)}
            </span>
            <span className="text-xs text-slate-500 block">per month</span>
            <p className="text-xs text-slate-600 mt-4 leading-relaxed border-t border-slate-100 pt-3">
              Essential expenses: Rent/mortgage, groceries, utilities, transportation, minimum debt payments, and basic healthcare.
            </p>
          </div>

          <div className="bg-white rounded-2xl border border-blue-200 p-6 shadow-2xs relative overflow-hidden">
            <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center mb-4">
              <Coffee className="w-5 h-5" />
            </div>
            <span className="text-xs font-bold text-blue-800 uppercase tracking-wider block">
              30% Wants
            </span>
            <span className="text-3xl font-extrabold text-slate-900 block my-1 tabular-nums">
              {formatCurrency(wants)}
            </span>
            <span className="text-xs text-slate-500 block">per month</span>
            <p className="text-xs text-slate-600 mt-4 leading-relaxed border-t border-slate-100 pt-3">
              Lifestyle choices: Dining out, gym memberships, concert tickets, vacations, streaming subscriptions, and hobby gear.
            </p>
          </div>

          <div className="bg-white rounded-2xl border border-purple-200 p-6 shadow-2xs relative overflow-hidden">
            <div className="w-10 h-10 rounded-xl bg-purple-100 text-purple-700 flex items-center justify-center mb-4">
              <PiggyBank className="w-5 h-5" />
            </div>
            <span className="text-xs font-bold text-purple-800 uppercase tracking-wider block">
              20% Savings
            </span>
            <span className="text-3xl font-extrabold text-slate-900 block my-1 tabular-nums">
              {formatCurrency(savings)}
            </span>
            <span className="text-xs text-slate-500 block">per month</span>
            <p className="text-xs text-slate-600 mt-4 leading-relaxed border-t border-slate-100 pt-3">
              Future security: Emergency fund contributions, Roth IRA, extra 401(k), index fund investments, and extra mortgage principal.
            </p>
          </div>
        </div>

        <AdPlaceholder slot="horizontal" />
        <RelatedTools currentToolId="budget-calculator" />
      </section>
    </div>
  );
}
