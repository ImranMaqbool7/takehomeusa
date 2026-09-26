import SEO from '../components/SEO.jsx';
import { AlertTriangle, ShieldCheck } from 'lucide-react';
import RelatedTools from '../components/RelatedTools.jsx';

export default function DisclaimerPage() {
  return (
    <div className="min-h-screen">
      <SEO
        title="Legal Disclaimer — TakeHomeUSA"
        description="TakeHomeUSA is an educational calculator and is not a tax advisor, accountant, or government agency."
        canonicalPath="/disclaimer"
      />

      <section className="pt-8 pb-10 text-center px-4 max-w-4xl mx-auto">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
          Disclaimer
        </h1>
        <p className="mt-2 text-sm text-slate-500">
          Important disclosures regarding tax estimates and professional guidance
        </p>
      </section>

      <section className="max-w-3xl mx-auto px-4 sm:px-6 pb-20 prose prose-slate">
        <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-10 shadow-xs space-y-6 text-sm text-slate-600 leading-relaxed">
          <div className="p-5 rounded-xl bg-amber-50 border-2 border-amber-300 text-amber-950 font-bold text-base flex items-start gap-3">
            <AlertTriangle className="w-6 h-6 text-amber-600 shrink-0 mt-0.5" />
            <div>
              <span>TakeHomeUSA is an educational calculator and is not a tax advisor, accountant, or government agency.</span>
            </div>
          </div>

          <h2 className="text-lg font-bold text-slate-900">Not Official IRS Advice</h2>
          <p>
            The calculations provided by TakeHomeUSA are mathematical models designed to estimate net take-home compensation under standard payroll conditions for the 2026 and 2025 tax years. These calculations do not constitute legal, financial, or tax advice, nor are they an official declaration of tax liability from the Internal Revenue Service (IRS) or any state department of revenue.
          </p>

          <h2 className="text-lg font-bold text-slate-900">Why Real Paychecks Differ</h2>
          <p>
            Actual paychecks distributed by employers are subject to numerous factors that cannot be completely simulated in a generalized calculator, including:
          </p>
          <ul className="list-disc list-inside space-y-1.5 pl-2 text-slate-600">
            <li>Specific employer cafeteria plans (Section 125 flexible spending accounts, commuter transit benefits, life insurance).</li>
            <li>Local city, municipality, and school district wage taxes (such as NYC, Yonkers, Philadelphia, Ohio municipal taxes, etc.).</li>
            <li>State-mandated disability (SDI), family temporary disability (FLI), or paid family leave insurance deductions.</li>
            <li>Individual tax situations, including tax credits (Child Tax Credit, Earned Income Tax Credit), capital gains, other income, and deductions reported on Form W-4.</li>
            <li>Mid-year salary adjustments, bonus supplemental tax withholding rates (flat 22% federal), and overtime premiums.</li>
          </ul>

          <h2 className="text-lg font-bold text-slate-900">Consult a Licensed Professional</h2>
          <p>
            Before making binding financial commitments, relocating to another state, signing employment contracts, or executing substantial financial plans, we strongly recommend consulting a licensed Certified Public Accountant (CPA), Enrolled Agent (EA), or qualified tax attorney.
          </p>
        </div>

        <div className="mt-12">
          <RelatedTools />
        </div>
      </section>
    </div>
  );
}
