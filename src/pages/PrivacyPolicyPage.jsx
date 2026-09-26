import SEO from '../components/SEO.jsx';
import { Shield } from 'lucide-react';

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen">
      <SEO
        title="Privacy Policy — TakeHomeUSA"
        description="TakeHomeUSA privacy policy. We do not store your salary or financial inputs. All calculations run locally in your browser."
        canonicalPath="/privacy"
      />

      <section className="pt-8 pb-10 text-center px-4 max-w-4xl mx-auto">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
          Privacy Policy
        </h1>
        <p className="mt-2 text-sm text-slate-500">
          Last updated: January 1, 2026
        </p>
      </section>

      <section className="max-w-3xl mx-auto px-4 sm:px-6 pb-20 prose prose-slate">
        <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-10 shadow-xs space-y-6 text-sm text-slate-600 leading-relaxed">
          <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 flex items-center gap-3 text-emerald-900 font-medium">
            <Shield className="w-5 h-5 text-emerald-600 shrink-0" />
            <span>Core Promise: Your salary inputs, tax filing status, and deductions are never transmitted to our servers or stored in any database.</span>
          </div>

          <h2 className="text-lg font-bold text-slate-900">1. Information We Do NOT Collect</h2>
          <p>
            When you enter your annual salary, 401(k) percentage, health insurance deductions, or state of residence into the calculator, that data is processed solely on your client device using JavaScript. None of your confidential financial information is collected, cataloged, or linked to your identity.
          </p>

          <h2 className="text-lg font-bold text-slate-900">2. Analytics & Cookies</h2>
          <p>
            Like virtually all modern web properties, TakeHomeUSA may utilize standard web analytics and browser cookies to monitor aggregate traffic trends, server health, and popular pages. These technologies do not collect personally identifiable information (PII).
          </p>

          <h2 className="text-lg font-bold text-slate-900">3. Advertising Partners</h2>
          <p>
            TakeHomeUSA may display non-personalized or personalized advertising via third-party networks such as Google AdSense. Third-party ad vendors may use cookies to serve ads based on prior visits to our website or other sites on the Internet. Users may opt out of personalized advertising by visiting Google Ads Settings.
          </p>

          <h2 className="text-lg font-bold text-slate-900">4. Third-Party Links</h2>
          <p>
            Our website may contain hyperlinks to educational tax portals, IRS resources, or state departments of revenue. We are not responsible for the privacy practices of external domains.
          </p>

          <h2 className="text-lg font-bold text-slate-900">5. Contact Information</h2>
          <p>
            For questions regarding this privacy policy or our site practices, please contact us via our official contact page.
          </p>
        </div>
      </section>
    </div>
  );
}
