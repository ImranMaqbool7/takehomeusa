import SEO from '../components/SEO.jsx';

export default function TermsOfUsePage() {
  return (
    <div className="min-h-screen">
      <SEO
        title="Terms of Use — TakeHomeUSA"
        description="TakeHomeUSA terms of use and website guidelines."
        canonicalPath="/terms"
      />

      <section className="pt-8 pb-10 text-center px-4 max-w-4xl mx-auto">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
          Terms of Use
        </h1>
        <p className="mt-2 text-sm text-slate-500">
          Last revised: January 1, 2026
        </p>
      </section>

      <section className="max-w-3xl mx-auto px-4 sm:px-6 pb-20 prose prose-slate">
        <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-10 shadow-xs space-y-6 text-sm text-slate-600 leading-relaxed">
          <h2 className="text-lg font-bold text-slate-900">1. Acceptance of Terms</h2>
          <p>
            By accessing and utilizing TakeHomeUSA, you agree to be bound by these Terms of Use and all applicable laws and regulations. If you do not agree with any part of these terms, you should discontinue use immediately.
          </p>

          <h2 className="text-lg font-bold text-slate-900">2. Educational & Informational Purpose Only</h2>
          <p>
            All calculations, algorithms, estimators, tables, and guides provided by TakeHomeUSA are created solely for general educational, estimation, and informational purposes. <strong>TakeHomeUSA does not provide formal tax, accounting, investment, legal, or financial advice.</strong>
          </p>

          <h2 className="text-lg font-bold text-slate-900">3. Disclaimer of Warranties</h2>
          <p>
            The website and its calculations are provided on an "as is" and "as available" basis without any express or implied warranties. While we make every good-faith effort to maintain up-to-date IRS and state tax rules, we do not warrant the absolute accuracy, completeness, or reliability of any calculation.
          </p>

          <h2 className="text-lg font-bold text-slate-900">4. Limitation of Liability</h2>
          <p>
            Under no circumstances shall TakeHomeUSA, its authors, or affiliates be liable for any direct, indirect, incidental, or consequential damages resulting from the use or inability to use this site, including decisions made regarding employment, salary negotiation, or tax planning.
          </p>

          <h2 className="text-lg font-bold text-slate-900">5. Intellectual Property</h2>
          <p>
            The software architecture, calculator design, branding, and written editorial content on TakeHomeUSA are protected by copyright and intellectual property laws.
          </p>
        </div>
      </section>
    </div>
  );
}
