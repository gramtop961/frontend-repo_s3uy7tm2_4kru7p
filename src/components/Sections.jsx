import { motion } from 'framer-motion';
import { Phone, Calendar, Shield, CreditCard, Repeat, BarChart } from 'lucide-react';

function SectionHeader({ eyebrow, title, subtitle }) {
  return (
    <div className="text-center max-w-3xl mx-auto mb-10">
      {eyebrow && (
        <p className="text-xs uppercase tracking-widest text-black/50">{eyebrow}</p>
      )}
      <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight text-black mt-2">{title}</h2>
      {subtitle && (
        <p className="text-black/70 mt-3 text-sm sm:text-base">{subtitle}</p>
      )}
    </div>
  );
}

export default function Sections() {
  return (
    <div className="bg-white text-black">
      {/* About */}
      <section id="about" className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-16">
        <SectionHeader
          eyebrow="About"
          title="Automation that feels bespoke"
          subtitle="We help dental teams operate at enterprise scale with minimal overhead, using compliant AI that respects patient privacy and clinic workflows."
        />
        <div className="max-w-4xl mx-auto text-center text-black/80 leading-relaxed">
          Our systems plug into your existing tools to automate reception, recalls, insurance checks, and follow-ups. It’s the same warm patient experience—just handled with precision, speed, and consistency 24/7.
        </div>
      </section>

      {/* Services */}
      <section id="services" className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-16 border-t border-black/10">
        <SectionHeader
          eyebrow="Services"
          title="Velodent AI Automation Suite"
          subtitle="Every part of the patient journey, unified."
        />
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            { icon: Phone, title: 'AI Receptionist', desc: 'Answers calls, routes questions, and books appointments automatically.' },
            { icon: Calendar, title: 'Appointment & Recall', desc: 'Scheduling, rescheduling, and 6‑month cleaning reminders.' },
            { icon: Shield, title: 'Insurance Verification', desc: 'Eligibility checks and pre-visit verification to reduce friction.' },
            { icon: CreditCard, title: 'Payment & Claims', desc: 'Guided payments and claim assistance to improve collections.' },
            { icon: Repeat, title: 'Lead Follow-up', desc: 'Instant outreach for inbound leads and win-back workflows.' },
            { icon: BarChart, title: 'Dashboard & Analytics', desc: 'Real-time metrics on volume, conversions, and ROI.' },
          ].map((item, idx) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.05 }}
              className="group rounded-2xl border border-black/10 p-5 hover:shadow-sm transition-shadow bg-white"
            >
              <div className="flex items-center gap-3">
                <item.icon className="h-5 w-5 text-black" />
                <h3 className="font-medium">{item.title}</h3>
              </div>
              <p className="mt-2 text-sm text-black/70">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Case Studies */}
      <section id="cases" className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-16 border-t border-black/10">
        <SectionHeader
          eyebrow="Case Studies"
          title="Measured impact across clinics"
          subtitle="Real results from practices adopting automation."
        />
        <div className="grid md:grid-cols-3 gap-6">
          {[
            {
              title: 'Urban Family Dental',
              metric: '+42% booking rate',
              detail: 'AI receptionist + recall boosted new patient conversions within 60 days.'
            },
            {
              title: 'Smile & Co. Ortho',
              metric: '-35% no‑shows',
              detail: 'Automated reminders and rescheduling flows cut missed appointments.'
            },
            {
              title: 'Harbor Pediatric Dental',
              metric: '2.3× ROI in 90 days',
              detail: 'Insurance checks + claim guidance improved billing efficiency.'
            },
          ].map((c) => (
            <div key={c.title} className="rounded-2xl border border-black/10 p-6 bg-white">
              <div className="text-sm text-black/60">{c.metric}</div>
              <div className="mt-2 font-medium">{c.title}</div>
              <div className="mt-2 text-sm text-black/70">{c.detail}</div>
              <a href="#contact" className="mt-4 inline-block text-sm underline underline-offset-4">View details</a>
            </div>
          ))}
        </div>
      </section>

      {/* Testimonials */}
      <section id="testimonials" className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-16 border-t border-black/10">
        <SectionHeader
          eyebrow="What Our Clients Say"
          title="Trusted by modern dental teams"
        />
        <div className="grid md:grid-cols-3 gap-6">
          {[
            {
              quote: 'We picked up missed calls at all hours. The AI books seamlessly—patients think it\'s a concierge.',
              name: 'Dr. Lena M., Urban Family Dental',
            },
            {
              quote: 'Insurance eligibility used to bottleneck us. Now it\'s quiet and predictable.',
              name: 'Brian T., Practice Manager',
            },
            {
              quote: 'We saw fewer no-shows and a clean calendar. The team finally breathes.',
              name: 'Dr. Paolo R., Smile & Co. Ortho',
            },
          ].concat([
            {
              quote: 'Setup was fast. Patients love the reminders and texts—zero complaints.',
              name: 'Katherine L., Operations Lead',
            },
            {
              quote: 'Follow-ups revived stale leads from last year. Worth it for that alone.',
              name: 'Jordan S., Owner',
            },
            {
              quote: 'The analytics view is our new morning ritual. Clear and actionable.',
              name: 'Mika R., Admin',
            },
          ]).map((t, i) => (
            <motion.div
              key={t.name + i}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: (i % 3) * 0.05 }}
              className="rounded-2xl border border-black/10 p-6 bg-white"
            >
              <p className="text-sm leading-relaxed">“{t.quote}”</p>
              <div className="mt-4 text-sm text-black/60">{t.name}</div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-16 border-t border-black/10">
        <SectionHeader
          eyebrow="FAQ"
          title="Frequently asked questions"
          subtitle="Details on privacy, setup, and outcomes."
        />
        <div className="divide-y divide-black/10 rounded-2xl border border-black/10 bg-white">
          {[
            {
              q: 'How do you handle PHI and privacy?',
              a: 'We follow strict access controls and data minimization. Workflows are designed to be HIPAA-aligned, and we sign BAAs on request.'
            },
            {
              q: 'What does setup look like?',
              a: 'Most clinics are live in 7–14 days. We integrate calendars, phone, and practice tools, then train flows on your tone and policies.'
            },
            {
              q: 'How do you measure ROI?',
              a: 'We compare pre/post metrics: bookings, no-shows, conversion rates, and reclaimed missed calls—reported in your dashboard.'
            },
            {
              q: 'Can we keep our front desk team?',
              a: 'Absolutely. Automation removes repetitive tasks so your team can focus on high-touch care and complex conversations.'
            },
          ].map((f, i) => (
            <details key={f.q} className="group p-5">
              <summary className="cursor-pointer list-none font-medium flex items-center justify-between">
                <span>{f.q}</span>
                <span className="ml-4 text-black/40 group-open:rotate-45 transition-transform">+</span>
              </summary>
              <p className="mt-3 text-sm text-black/70 leading-relaxed">{f.a}</p>
            </details>
          ))}
        </div>
      </section>

      {/* Contact / Book */}
      <section id="book" className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-16 border-t border-black/10">
        <SectionHeader
          eyebrow="Book Now"
          title="Schedule a Private Demo or Strategy Call"
          subtitle="Pick a time that works for you."
        />
        <div className="flex flex-col items-center">
          <a
            href="https://cal.com/velodent-ogbkfv/20min"
            className="rounded-full border border-black px-6 py-3 text-sm font-medium hover:bg-black hover:text-white transition-colors"
          >
            Open Cal.com
          </a>
          <p className="mt-3 text-xs text-black/60">We\'ll confirm via email and SMS reminders.</p>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-black/10">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-sm text-black/60">© {new Date().getFullYear()} Velodent. All rights reserved.</div>
          <div className="flex items-center gap-6 text-sm">
            <a href="mailto:hello@velodent.ai" className="hover:underline">hello@velodent.ai</a>
            <a href="#" className="hover:underline">Live chat</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
