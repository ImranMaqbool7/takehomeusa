import SEO from '../components/SEO.jsx';
import { ShieldCheck, Calculator, RefreshCw, AlertCircle } from 'lucide-react';
import RelatedTools from '../components/RelatedTools.jsx';

export default function AboutPage() {
  return (
    <div className="min-h-screen">
      <SEO
        title="About TakeHomeUSA — Mission, Methodology & Accuracy | TakeHomeUSA"
        description="Learn how TakeHomeUSA computes accurate US paycheck estimates, our tax bracket data methodology, and why we built this free personal finance utility."
        canonicalPath="/about"
      />

      <section className="pt-8 pb-10 text-center px-4 max-w-4xl mx-auto">
        <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight">
          About TakeHomeUSA
        </h1>
        <p className="mt-3 text-base sm:text-lg text-slate-600 max-w-2xl mx-auto">
          Built to give American workers total clarity over their real paycheck numbers.
        </p>
      </section>

      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-10 shadow-xs space-y-6">
          <h2 className="text-2xl font-bold text-slate-900">
            Our Mission: Know What You Actually Take Home
          </h2>
          <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
            When you receive a job offer, raise, or contract rate, it’s always quoted in gross annual earnings. But you cannot pay your rent, groceries, or child care with gross earnings. You pay with what actually arrives in your checking account.
          </p>
          <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
            <strong>TakeHomeUSA</strong> was created to deliver an immediate, ad-monetized, 100% free, and private calculation utility without requiring accounts, logins, or invasive tracking. All math runs instantly in your web browser.
          </p>

          <h3 className="text-xl font-bold text-slate-900 pt-4">
            How Our Calculations Work
          </h3>
          <p className="text-slate-600 text-sm leading-relaxed">
            Our calculation engine replicates the standard IRS payroll withholding methodology combined with state revenue rules:
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 my-4">
            <div className="p-4 rounded-xl border border-slate-200 bg-slate-50">
              <div className="flex items-center gap-2 font-bold text-slate-900 text-sm mb-1">
                <Calculator className="w-4 h-4 text-emerald-600" />
                <span>IRS Tax Brackets (2026/2025)</span>
              </div>
              <p className="text-xs text-slate-500 leading-relaxed">
                Applies standard deductions ($15,000 single / $30,000 married) and computes marginal brackets (10%, 12%, 22%, 24%, 32%, 35%, 37%).
              </p>
            </div>

            <div className="p-4 rounded-xl border border-slate-200 bg-slate-50">
              <div className="flex items-center gap-2 font-bold text-slate-900 text-sm mb-1">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <span>FICA Contributions</span>
              </div>
              <p className="text-xs text-slate-500 leading-relaxed">
                Enforces the Social Security 6.2% wage cap ($176,100 limit) and Medicare 1.45% plus 0.9% additional surtax over thresholds.
              </p>
            </div>

            <div className="p-4 rounded-xl border border-slate-200 bg-slate-50">
              <div className="flex items-center gap-2 font-bold text-slate-900 text-sm mb-1">
                <RefreshCw className="w-4 h-4 text-emerald-600" />
                <span>All 50 State Systems</span>
              </div>
              <p className="text-xs text-slate-500 leading-relaxed">
                Supports all 9 zero-tax states, flat-tax states, and complex progressive states like California and New York.
              </p>
            </div>

            <div className="p-4 rounded-xl border border-slate-200 bg-slate-50">
              <div className="flex items-center gap-2 font-bold text-slate-900 text-sm mb-1">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <span>Pre-Tax Benefits</span>
              </div>
              <p className="text-xs text-slate-500 leading-relaxed">
                Models pre-tax 401(k), Section 125 health insurance, and HSA contributions accurately according to federal tax code.
              </p>
            </div>
          </div>

          <h3 className="text-xl font-bold text-slate-900 pt-4">
            Why Paychecks May Differ From Estimates
          </h3>
          <p className="text-slate-600 text-sm leading-relaxed">
            While our engine is built with high fidelity, real-world payroll involves variables unique to each employer and municipal jurisdiction:
          </p>
          <ul className="list-disc list-inside space-y-1.5 text-xs sm:text-sm text-slate-600 pl-2">
            <li><strong>Municipal & County Surtaxes:</strong> Certain cities (such as New York City, Philadelphia, or Detroit) and Maryland/Indiana counties impose local payroll surtaxes not captured in baseline state calculations.</li>
            <li><strong>State Disability / Paid Family Leave:</strong> States like California (SDI), New Jersey (FLI), and New York mandate small payroll deductions (usually 0.5%–1.1%) for disability and family leave programs.</li>
            <li><strong>W-4 Withholding Elections:</strong> If you claim child tax credits, other dependents, or extra withholding on your Form W-4, your employer will withhold differently.</li>
            <li><strong>Post-Tax Deductions:</strong> Roth 401(k) contributions, union dues, wage garnishments, or supplemental life insurance are deducted after taxes.</li>
          </ul>

          <div className="mt-8 p-4 rounded-xl bg-amber-50 border border-amber-200 flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
            <p className="text-xs text-amber-900 leading-relaxed">
              <strong>Educational Disclaimer:</strong> TakeHomeUSA is an independent informational utility and is not an authorized tax preparer, CPA firm, or government agency. Always consult official IRS guidelines or a licensed tax professional for personal tax filing advice.
            </p>
          </div>
        </div>

        <RelatedTools />
      </section>
    </div>
  );
}
