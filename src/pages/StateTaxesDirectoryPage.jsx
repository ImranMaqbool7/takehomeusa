import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import SEO from '../components/SEO.jsx';
import AdPlaceholder from '../components/AdPlaceholder.jsx';
import RelatedTools from '../components/RelatedTools.jsx';
import { STATES, NO_INCOME_TAX_STATES } from '../data/states.js';
import { formatPercent } from '../utils/formatters.js';
import { Search, MapPin, ArrowRight, ShieldCheck } from 'lucide-react';

export default function StateTaxesDirectoryPage() {
  const [search, setSearch] = useState('');
  const [filterType, setFilterType] = useState('all'); // 'all' | 'no_income_tax' | 'flat' | 'progressive'

  const filteredStates = useMemo(() => {
    return STATES.filter((s) => {
      const matchesSearch = s.name.toLowerCase().includes(search.toLowerCase()) || s.id.toLowerCase().includes(search.toLowerCase());
      const matchesType = filterType === 'all' || s.type === filterType;
      return matchesSearch && matchesType;
    });
  }, [search, filterType]);

  return (
    <div className="min-h-screen">
      <SEO
        title="State Income Tax Rates & Calculators 2026 — All 50 States | TakeHomeUSA"
        description="Compare individual state income tax rates across all 50 US states and Washington D.C. Find 0% income tax states, flat tax states, and calculate take-home pay."
        canonicalPath="/state-taxes"
      />

      {/* Header */}
      <section className="pt-8 pb-10 text-center px-4 max-w-4xl mx-auto">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold mb-3">
          <MapPin className="w-3.5 h-3.5 text-emerald-600" />
          <span>All 50 US States + Washington D.C.</span>
        </div>

        <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight">
          US State Income Tax Rates & Directory
        </h1>
        <p className="mt-3 text-base sm:text-lg text-slate-600 max-w-2xl mx-auto">
          Explore individual income tax rates, standard deductions, and calculate your exact take-home pay for any US state.
        </p>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* No Tax Highlight Card */}
        <div className="bg-emerald-900 text-white rounded-2xl p-6 sm:p-8 shadow-sm mb-10 border border-emerald-800">
          <div className="flex items-center gap-2 mb-2 text-emerald-300 text-xs font-bold uppercase tracking-wider">
            <ShieldCheck className="w-4 h-4" />
            <span>0% State Income Tax States</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-white mb-2">
            The 9 States With No Individual Wage Income Tax
          </h2>
          <p className="text-slate-200 text-sm max-w-3xl mb-5 leading-relaxed">
            Residents in these states pay $0 in state individual earned income tax, saving thousands each year compared to the national average:
          </p>
          <div className="flex flex-wrap gap-2.5">
            {NO_INCOME_TAX_STATES.map((s) => (
              <Link
                key={s.id}
                to={`/salary-after-tax-calculator/${s.slug}`}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-800/80 hover:bg-emerald-700 text-white text-xs font-bold border border-emerald-600/50 transition-colors shadow-2xs"
              >
                <span>{s.name}</span>
                <ArrowRight className="w-3 h-3 text-emerald-300" />
              </Link>
            ))}
          </div>
        </div>

        {/* Filter & Search Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-8">
          <div className="relative w-full sm:w-80">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search by state name (e.g. California)..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-300 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>

          <div className="flex items-center gap-1.5 w-full sm:w-auto overflow-x-auto pb-1 sm:pb-0">
            {[
              { id: 'all', label: 'All States (51)' },
              { id: 'no_income_tax', label: 'No Income Tax (9)' },
              { id: 'flat', label: 'Flat Tax' },
              { id: 'progressive', label: 'Progressive' },
            ].map((t) => (
              <button
                key={t.id}
                type="button"
                onClick={() => setFilterType(t.id)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors ${
                  filterType === t.id
                    ? 'bg-emerald-600 text-white shadow-2xs'
                    : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
                }`}
              >
                {t.label}
              </button>
            ))}
          </div>
        </div>

        {/* States Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredStates.map((st) => {
            const isNoTax = st.type === 'no_income_tax';
            return (
              <div
                key={st.id}
                className="bg-white rounded-xl border border-slate-200 p-5 shadow-2xs hover:border-emerald-400 hover:shadow-sm transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-bold text-lg text-slate-900">{st.name}</span>
                    <span className="text-xs font-mono font-semibold px-2 py-0.5 rounded bg-slate-100 text-slate-600">
                      {st.id}
                    </span>
                  </div>

                  <div className="flex items-center gap-2 mb-3">
                    {isNoTax ? (
                      <span className="text-xs font-semibold px-2 py-0.5 rounded bg-emerald-100 text-emerald-800">
                        0% State Income Tax
                      </span>
                    ) : (
                      <span className="text-xs font-semibold px-2 py-0.5 rounded bg-slate-100 text-slate-700 capitalize">
                        {st.type} Rate • Top: {formatPercent(st.topRate)}
                      </span>
                    )}
                  </div>

                  <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed">
                    {st.notes}
                  </p>
                </div>

                <div className="mt-5 pt-3 border-t border-slate-100 flex items-center justify-between">
                  <Link
                    to={`/salary-after-tax-calculator/${st.slug}`}
                    className="text-xs font-bold text-emerald-600 hover:text-emerald-700 inline-flex items-center gap-1"
                  >
                    <span>Calculate {st.name} Paycheck</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>

        {/* Ad Placement */}
        <AdPlaceholder slot="horizontal" />

        {/* Related Tools */}
        <RelatedTools />
      </section>
    </div>
  );
}
