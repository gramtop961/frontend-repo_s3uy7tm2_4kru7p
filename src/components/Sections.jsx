import React, { useState } from 'react';

function Section({ id, title, children }) {
  return (
    <section id={id} className="bg-white">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:py-20">
        <h2 className="text-2xl font-semibold tracking-tight text-black sm:text-3xl">{title}</h2>
        <div className="mt-8">{children}</div>
      </div>
    </section>
  );
}

export default function Sections() {
  const [openIndex, setOpenIndex] = useState(null);
  const faqs = [
    { q: 'How soon can we start?', a: 'We can typically begin within one week after kickoff.' },
    { q: 'Do you work with DSOs?', a: 'Yes, we support single practices and multi-location DSOs.' },
    { q: 'What KPIs do you track?', a: 'Booked calls, show rate, lead quality, and patient LTV.' },
    { q: 'Contracts?', a: 'Month-to-month with clear milestones and transparency.' },
  ];

  return (
    <>
      <Section id="about" title="About Velodent">
        <p className="max-w-3xl text-black/70">
          We partner with forward-thinking dental practices to build predictable growth engines.
          Our approach is simple: a crisp brand presence, frictionless funnel, and data-backed iteration.
        </p>
      </Section>

      <Section id="services" title="Services">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {[
            'Brand & Positioning',
            'High-converting Websites',
            'Paid Acquisition',
            'Analytics & Attribution',
            'Automations & CRM',
            'Creative Production',
          ].map((s) => (
            <div
              key={s}
              className="rounded-xl border border-black/10 bg-white p-6 shadow-sm transition-transform hover:-translate-y-0.5"
            >
              <h3 className="text-lg font-medium text-black">{s}</h3>
              <p className="mt-2 text-sm text-black/70">
                Enterprise-grade execution with clean deliverables and measurable outcomes.
              </p>
            </div>
          ))}
        </div>
      </Section>

      <Section id="case-studies" title="Case Studies">
        <div className="grid gap-6 md:grid-cols-3">
          {[
            { title: 'Invisalign Growth', stat: '+142% qualified consults' },
            { title: 'Implant Pipeline', stat: '3.1x ROAS within 90 days' },
            { title: 'Multi-Location DSO', stat: '-37% CPL with better quality' },
          ].map((c) => (
            <div key={c.title} className="rounded-xl border border-black/10 bg-white p-6 shadow-sm">
              <h3 className="text-lg font-medium text-black">{c.title}</h3>
              <p className="mt-2 text-sm text-black/70">{c.stat}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section id="testimonials" title="Testimonials">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {new Array(6).fill(null).map((_, i) => (
            <blockquote key={i} className="rounded-xl border border-black/10 bg-white p-6 shadow-sm">
              <p className="text-sm text-black/80">
                “Velodent finally aligned our brand and acquisition. Clean execution and real results.”
              </p>
              <footer className="mt-3 text-xs text-black/60">Practice Owner</footer>
            </blockquote>
          ))}
        </div>
      </Section>

      <Section id="faq" title="FAQ">
        <div className="divide-y divide-black/10 rounded-xl border border-black/10 bg-white">
          {faqs.map((item, idx) => (
            <button
              key={item.q}
              onClick={() => setOpenIndex(idx === openIndex ? null : idx)}
              className="w-full px-6 py-4 text-left"
            >
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-black">{item.q}</span>
                <span className="text-xl leading-none text-black">{openIndex === idx ? '−' : '+'}</span>
              </div>
              {openIndex === idx && (
                <p className="mt-2 text-sm text-black/70">{item.a}</p>
              )}
            </button>
          ))}
        </div>
      </Section>

      <Section id="book" title="Book a Call">
        <div className="flex flex-col items-center justify-center gap-4 rounded-2xl border border-black/10 bg-white p-8 text-center shadow-sm">
          <p className="max-w-2xl text-black/70">
            Ready to audit your growth engine? Book a 20‑minute discovery call.
          </p>
          <a
            href="https://cal.com/velodent-ogbkfv/20min"
            target="_blank"
            rel="noreferrer"
            className="rounded-full bg-black px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-black/90"
          >
            Book Now
          </a>
        </div>
      </Section>

      <footer className="border-t border-black/10 bg-white">
        <div className="mx-auto max-w-7xl px-4 py-8 text-center text-sm text-black/60">
          © {new Date().getFullYear()} Velodent. All rights reserved.
        </div>
      </footer>
    </>
  );
}
