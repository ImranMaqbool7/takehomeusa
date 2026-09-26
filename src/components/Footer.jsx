import { Link } from 'react-router-dom';
import { DollarSign, ShieldCheck } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-300 border-t border-slate-800 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-14 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-8">
          {/* Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <Link to="/" className="inline-flex items-center gap-2 group">
              <div className="w-9 h-9 rounded-xl bg-emerald-500 text-slate-950 flex items-center justify-center font-bold">
                <DollarSign className="w-5 h-5 stroke-[2.5]" />
              </div>
              <span className="text-xl font-bold tracking-tight text-white">
                TakeHome<span className="text-emerald-400">USA</span>
              </span>
            </Link>
            <p className="text-sm text-slate-400 max-w-sm leading-relaxed">
              <strong>Know What You Actually Take Home.</strong> Fast, free, and accurate take-home pay calculator for American workers, contractors, and job seekers across all 50 US states.
            </p>
            <div className="flex items-center gap-2 text-xs text-emerald-400 bg-slate-800/80 px-3 py-2 rounded-lg border border-slate-700/60 w-fit">
              <ShieldCheck className="w-4 h-4 shrink-0" />
              <span>Tax year 2026 calculations • 100% private in-browser engine</span>
            </div>
          </div>

          {/* Tools */}
          <div>
            <h3 className="text-xs font-semibold text-white uppercase tracking-wider mb-4">
              Money Tools
            </h3>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link to="/salary-after-tax-calculator" className="text-slate-400 hover:text-white transition-colors">
                  Salary Calculator
                </Link>
              </li>
              <li>
                <Link to="/tools/credit-card-payoff" className="text-slate-400 hover:text-white transition-colors">
                  Credit Card Payoff
                </Link>
              </li>
              <li>
                <Link to="/tools/rent-vs-buy" className="text-slate-400 hover:text-white transition-colors">
                  Rent vs Buy Calculator
                </Link>
              </li>
              <li>
                <Link to="/tools/auto-loan" className="text-slate-400 hover:text-white transition-colors">
                  Auto Loan Payoff
                </Link>
              </li>
              <li>
                <Link to="/tools/compound-interest" className="text-slate-400 hover:text-white transition-colors">
                  Compound Interest
                </Link>
              </li>
              <li>
                <Link to="/tools/budget-calculator" className="text-slate-400 hover:text-white transition-colors">
                  50/30/20 Budget Tool
                </Link>
              </li>
              <li>
                <Link to="/tools/emergency-fund" className="text-slate-400 hover:text-white transition-colors">
                  Emergency Fund
                </Link>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="text-xs font-semibold text-white uppercase tracking-wider mb-4">
              Resources
            </h3>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link to="/state-taxes" className="text-slate-400 hover:text-white transition-colors">
                  All 50 State Taxes
                </Link>
              </li>
              <li>
                <Link to="/salary-guides" className="text-slate-400 hover:text-white transition-colors">
                  Salary Guides & Tables
                </Link>
              </li>
              <li>
                <Link to="/salary-after-tax-calculator/california" className="text-slate-400 hover:text-white transition-colors">
                  California Paycheck
                </Link>
              </li>
              <li>
                <Link to="/salary-after-tax-calculator/texas" className="text-slate-400 hover:text-white transition-colors">
                  Texas Paycheck (0% Tax)
                </Link>
              </li>
              <li>
                <Link to="/salary-after-tax-calculator/florida" className="text-slate-400 hover:text-white transition-colors">
                  Florida Paycheck (0% Tax)
                </Link>
              </li>
              <li>
                <Link to="/salary-after-tax-calculator/new-york" className="text-slate-400 hover:text-white transition-colors">
                  New York Paycheck
                </Link>
              </li>
              <li>
                <Link to="/salary-after-tax/100000" className="text-slate-400 hover:text-white transition-colors">
                  $100,000 After Tax Guide
                </Link>
              </li>
            </ul>
          </div>

          {/* Company & Legal */}
          <div>
            <h3 className="text-xs font-semibold text-white uppercase tracking-wider mb-4">
              Company
            </h3>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link to="/about" className="text-slate-400 hover:text-white transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-slate-400 hover:text-white transition-colors">
                  Contact
                </Link>
              </li>
              <li>
                <Link to="/privacy" className="text-slate-400 hover:text-white transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/terms" className="text-slate-400 hover:text-white transition-colors">
                  Terms of Use
                </Link>
              </li>
              <li>
                <Link to="/disclaimer" className="text-slate-400 hover:text-white transition-colors">
                  Legal Disclaimer
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Disclaimer Banner */}
        <div className="mt-12 pt-8 border-t border-slate-800 text-xs text-slate-400 leading-relaxed space-y-3">
          <p>
            <strong>Disclaimer:</strong> TakeHomeUSA is an educational calculator and is not a tax advisor, certified public accountant (CPA), or government agency. All numbers provided are estimates based on standard federal, FICA, and state tax rules. Your actual paycheck may vary based on municipal taxes, employer withholding elections, pre-tax commuter benefits, local ordinances, and individual tax circumstances. Consult a qualified tax professional or the IRS for official tax filing guidance.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-between text-slate-500 pt-2 text-xs">
            <p>© 2026 TakeHomeUSA. All rights reserved.</p>
            <div className="flex items-center gap-4 mt-2 sm:mt-0">
              <Link to="/privacy" className="hover:underline">Privacy</Link>
              <span>•</span>
              <Link to="/terms" className="hover:underline">Terms</Link>
              <span>•</span>
              <Link to="/disclaimer" className="hover:underline">Disclaimer</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
