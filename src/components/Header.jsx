import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { DollarSign, Menu, X, ArrowRight, ShieldCheck, MapPin, BookOpen, Info } from 'lucide-react';

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const navLinks = [
    { label: 'Salary Calculator', path: '/salary-after-tax-calculator', icon: DollarSign },
    { label: 'State Taxes', path: '/state-taxes', icon: MapPin },
    { label: 'Salary Guides', path: '/salary-guides', icon: BookOpen },
    { label: 'About', path: '/about', icon: Info },
  ];

  const handleCalculateClick = () => {
    setMobileMenuOpen(false);
    if (location.pathname === '/' || location.pathname === '/salary-after-tax-calculator') {
      const calcEl = document.getElementById('calculator-section');
      if (calcEl) {
        calcEl.scrollIntoView({ behavior: 'smooth' });
        return;
      }
    }
    navigate('/salary-after-tax-calculator');
  };

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-18">
          {/* Logo */}
          <Link
            to="/"
            className="flex items-center gap-2.5 group focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 rounded-lg p-1"
            aria-label="TakeHomeUSA Home"
          >
            <div className="w-10 h-10 rounded-xl bg-emerald-600 text-white flex items-center justify-center shadow-sm group-hover:bg-emerald-700 transition-colors">
              <DollarSign className="w-6 h-6 stroke-[2.5]" />
            </div>
            <div className="flex flex-col">
              <div className="flex items-center gap-1">
                <span className="text-xl font-bold tracking-tight text-slate-900">
                  TakeHome<span className="text-emerald-600">USA</span>
                </span>
                <span className="inline-flex items-center px-1.5 py-0.2 text-[10px] font-semibold bg-emerald-50 text-emerald-700 rounded border border-emerald-200/60 uppercase tracking-wider">
                  US
                </span>
              </div>
              <span className="text-[11px] text-slate-500 font-medium hidden sm:block">
                Know What You Actually Take Home
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-1 lg:space-x-2" aria-label="Main Navigation">
            {navLinks.map((link) => {
              const isActive = location.pathname === link.path;
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                    isActive
                      ? 'bg-slate-100 text-emerald-700 font-semibold'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          {/* Desktop Right CTA */}
          <div className="hidden md:flex items-center space-x-4">
            <button
              onClick={handleCalculateClick}
              className="inline-flex items-center justify-center px-4 py-2 text-sm font-semibold rounded-lg text-white bg-emerald-600 hover:bg-emerald-700 shadow-sm transition-all focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 active:scale-[0.98]"
            >
              Calculate My Pay
              <ArrowRight className="ml-1.5 w-4 h-4" />
            </button>
          </div>

          {/* Mobile Hamburger Button */}
          <div className="flex md:hidden items-center gap-2">
            <button
              onClick={handleCalculateClick}
              className="px-3 py-1.5 text-xs font-semibold rounded-md text-white bg-emerald-600 hover:bg-emerald-700"
            >
              Calculate
            </button>
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100 focus:outline-none focus:ring-2 focus:ring-emerald-500"
              aria-expanded={mobileMenuOpen}
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-slate-200 bg-white px-4 pt-2 pb-4 space-y-1 shadow-lg animate-in slide-in-from-top-2 duration-150">
          {navLinks.map((link) => {
            const Icon = link.icon;
            const isActive = location.pathname === link.path;
            return (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setMobileMenuOpen(false)}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-base font-medium transition-colors ${
                  isActive
                    ? 'bg-emerald-50 text-emerald-700 font-semibold'
                    : 'text-slate-700 hover:bg-slate-100 hover:text-slate-900'
                }`}
              >
                <Icon className={`w-5 h-5 ${isActive ? 'text-emerald-600' : 'text-slate-400'}`} />
                {link.label}
              </Link>
            );
          })}

          <div className="pt-2">
            <button
              onClick={handleCalculateClick}
              className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-lg text-white bg-emerald-600 hover:bg-emerald-700 font-semibold text-center shadow-sm"
            >
              Calculate Take-Home Pay
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          <div className="pt-3 px-3 flex items-center gap-2 text-xs text-slate-500 border-t border-slate-100 mt-2">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>Updated with 2026/2025 IRS federal tax rules</span>
          </div>
        </div>
      )}
    </header>
  );
}
