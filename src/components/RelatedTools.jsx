import { Link } from 'react-router-dom';
import { CreditCard, Home, Car, TrendingUp, PiggyBank, PieChart, ShieldAlert, ArrowRight } from 'lucide-react';

export const TOOLS_LIST = [
  {
    id: 'budget-calculator',
    name: '50/30/20 Budget Calculator',
    path: '/tools/budget-calculator',
    description: 'Split your monthly take-home pay into Needs, Wants, and Savings according to the classic rule.',
    icon: PieChart,
    badge: 'Popular',
  },
  {
    id: 'compound-interest',
    name: 'Compound Interest Calculator',
    path: '/tools/compound-interest',
    description: 'Forecast the exponential growth of your investments and retirement contributions over time.',
    icon: TrendingUp,
    badge: 'Wealth',
  },
  {
    id: 'credit-card-payoff',
    name: 'Credit Card Payoff Calculator',
    path: '/tools/credit-card-payoff',
    description: 'See how fast you can eliminate high-interest debt and how much interest you can save.',
    icon: CreditCard,
    badge: 'Debt Free',
  },
  {
    id: 'rent-vs-buy',
    name: 'Rent vs Buy Calculator',
    path: '/tools/rent-vs-buy',
    description: 'Compare the true long-term financial costs of renting an apartment vs buying a home.',
    icon: Home,
    badge: 'Real Estate',
  },
  {
    id: 'auto-loan',
    name: 'Auto Loan Payoff Calculator',
    path: '/tools/auto-loan',
    description: 'Calculate your monthly car payment, amortization schedule, and total interest paid.',
    icon: Car,
    badge: 'Auto',
  },
  {
    id: 'car-affordability',
    name: 'Car Affordability Calculator',
    path: '/tools/car-affordability',
    description: 'Determine what car you can realistically afford using the 20/4/10 financial rule.',
    icon: Car,
    badge: 'Planning',
  },
  {
    id: 'emergency-fund',
    name: 'Emergency Fund Calculator',
    path: '/tools/emergency-fund',
    description: 'Calculate your target 3-to-6 month safety cushion based on essential monthly expenses.',
    icon: ShieldAlert,
    badge: 'Safety Net',
  },
];

export default function RelatedTools({ currentToolId = '' }) {
  const filteredTools = TOOLS_LIST.filter(t => t.id !== currentToolId);

  return (
    <section className="my-16" aria-labelledby="tools-heading">
      <div className="max-w-2xl mx-auto text-center mb-10">
        <h2 id="tools-heading" className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
          More Money Tools
        </h2>
        <p className="mt-2 text-sm text-slate-600">
          Plan every dollar with our suite of free personal finance calculators.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredTools.map((tool) => {
          const Icon = tool.icon;
          return (
            <Link
              key={tool.id}
              to={tool.path}
              className="group bg-white rounded-xl p-5 border border-slate-200/90 hover:border-emerald-400 hover:shadow-md transition-all duration-200 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className="w-10 h-10 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center group-hover:bg-emerald-600 group-hover:text-white transition-colors">
                    <Icon className="w-5 h-5" />
                  </div>
                  {tool.badge && (
                    <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-slate-100 text-slate-600 uppercase tracking-wider">
                      {tool.badge}
                    </span>
                  )}
                </div>
                <h3 className="font-bold text-slate-900 group-hover:text-emerald-600 transition-colors text-base mb-1.5">
                  {tool.name}
                </h3>
                <p className="text-xs text-slate-500 leading-relaxed">
                  {tool.description}
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-100 flex items-center text-xs font-semibold text-emerald-600 group-hover:text-emerald-700">
                <span>Use Calculator</span>
                <ArrowRight className="w-3.5 h-3.5 ml-1 transition-transform group-hover:translate-x-1" />
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
