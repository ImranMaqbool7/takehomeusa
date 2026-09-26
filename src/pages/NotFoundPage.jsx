import { Link } from 'react-router-dom';
import SEO from '../components/SEO.jsx';
import { Home, ArrowLeft } from 'lucide-react';

export default function NotFoundPage() {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center px-4 text-center">
      <SEO
        title="Page Not Found — TakeHomeUSA"
        description="The requested page could not be found. Return to TakeHomeUSA Salary After Tax Calculator."
      />
      <span className="text-6xl font-extrabold text-emerald-600 mb-2">404</span>
      <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-3">
        Page Not Found
      </h1>
      <p className="text-sm text-slate-600 max-w-md mb-8">
        We couldn't find the page or calculator you were looking for. Use the links below to return to our calculators.
      </p>
      <div className="flex flex-wrap items-center justify-center gap-3">
        <Link
          to="/"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-600 text-white font-semibold text-sm hover:bg-emerald-700 shadow-sm"
        >
          <Home className="w-4 h-4" />
          <span>Home Page</span>
        </Link>
        <Link
          to="/salary-after-tax-calculator"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white border border-slate-300 text-slate-700 font-semibold text-sm hover:bg-slate-50"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Salary Calculator</span>
        </Link>
      </div>
    </div>
  );
}
