import { useState } from 'react';
import { ChevronDown, HelpCircle } from 'lucide-react';
import { FAQS } from '../data/faqData.js';

export default function FAQAccordion({ items = FAQS, title = 'Frequently Asked Questions' }) {
  const [openIndex, setOpenIndex] = useState(0);

  const toggleItem = (idx) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <section className="my-16" aria-labelledby="faq-heading">
      <div className="text-center max-w-2xl mx-auto mb-8">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 text-xs font-semibold mb-3 border border-emerald-200/60">
          <HelpCircle className="w-3.5 h-3.5" />
          <span>Tax Knowledge Base</span>
        </div>
        <h2 id="faq-heading" className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
          {title}
        </h2>
        <p className="mt-2 text-sm text-slate-600">
          Everything you need to know about US federal, state, and payroll deductions.
        </p>
      </div>

      <div className="max-w-3xl mx-auto space-y-3">
        {items.map((item, idx) => {
          const isOpen = openIndex === idx;
          return (
            <div
              key={item.id || idx}
              className={`rounded-xl border transition-all duration-200 ${
                isOpen
                  ? 'border-emerald-300 bg-white shadow-sm ring-1 ring-emerald-500/10'
                  : 'border-slate-200 bg-white hover:border-slate-300'
              }`}
            >
              <button
                type="button"
                onClick={() => toggleItem(idx)}
                aria-expanded={isOpen}
                className="w-full text-left px-5 py-4 flex items-center justify-between gap-4 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 rounded-xl"
              >
                <span className="font-semibold text-slate-900 text-sm sm:text-base">
                  {item.question}
                </span>
                <ChevronDown
                  className={`w-5 h-5 text-slate-400 shrink-0 transition-transform duration-200 ${
                    isOpen ? 'rotate-180 text-emerald-600' : ''
                  }`}
                />
              </button>

              {isOpen && (
                <div className="px-5 pb-5 pt-1 text-sm text-slate-600 leading-relaxed border-t border-slate-100">
                  {item.answer}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}
