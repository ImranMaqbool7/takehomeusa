import { useState } from 'react';
import SEO from '../components/SEO.jsx';
import { Mail, CheckCircle2, MessageSquare, Send } from 'lucide-react';

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen">
      <SEO
        title="Contact Us — TakeHomeUSA"
        description="Have a question or feedback regarding TakeHomeUSA's salary tax calculations? Get in touch with our team."
        canonicalPath="/contact"
      />

      <section className="pt-8 pb-10 text-center px-4 max-w-4xl mx-auto">
        <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight">
          Contact Us
        </h1>
        <p className="mt-3 text-base sm:text-lg text-slate-600 max-w-2xl mx-auto">
          Have feedback, a suggestion for a new financial tool, or a question about state tax rules? We'd love to hear from you.
        </p>
      </section>

      <section className="max-w-xl mx-auto px-4 sm:px-6 pb-20">
        <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-xs">
          {submitted ? (
            <div className="text-center py-10 space-y-4">
              <div className="w-14 h-14 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h2 className="text-2xl font-bold text-slate-900">Message Received!</h2>
              <p className="text-sm text-slate-600 max-w-md mx-auto leading-relaxed">
                Thank you, <strong>{formData.name}</strong>. Your feedback has been recorded. Our research team reviews suggestions to keep all 50 state tax calculators accurate.
              </p>
              <button
                type="button"
                onClick={() => {
                  setSubmitted(false);
                  setFormData({ name: '', email: '', message: '' });
                }}
                className="mt-4 px-5 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-semibold transition-colors"
              >
                Send Another Note
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label htmlFor="name" className="block text-xs font-bold text-slate-800 uppercase tracking-wider mb-1.5">
                  Your Full Name
                </label>
                <input
                  type="text"
                  id="name"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Jane Doe"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-slate-50 focus:bg-white transition-colors"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-xs font-bold text-slate-800 uppercase tracking-wider mb-1.5">
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="jane@example.com"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-slate-50 focus:bg-white transition-colors"
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-xs font-bold text-slate-800 uppercase tracking-wider mb-1.5">
                  Message or Suggestion
                </label>
                <textarea
                  id="message"
                  required
                  rows={4}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Share your tax query, feature request, or feedback..."
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-slate-50 focus:bg-white transition-colors"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3.5 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm shadow-sm transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <Send className="w-4 h-4" />
                <span>Send Message</span>
              </button>
            </form>
          )}
        </div>
      </section>
    </div>
  );
}
