import { motion } from 'framer-motion';

export default function Hero() {
  return (
    <section id="home" className="bg-white text-black">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
        <div className="text-center max-w-3xl mx-auto">
          <motion.h1
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tight"
          >
            AI Automation for Modern Dental Clinics
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mt-4 text-base sm:text-lg text-black/70"
          >
            Velodent streamlines front-desk ops, patient onboarding, and recall systems using safe, compliant AI.
          </motion.p>
        </div>

        <div className="mt-10 grid md:grid-cols-2 gap-8 items-center">
          <div className="aspect-video w-full overflow-hidden rounded-xl border border-black/10">
            <iframe
              width="100%"
              height="100%"
              src="https://www.youtube.com/embed/Nw478YoO3og?si=0Pcoc1145T6JDndl"
              title="Velodent Overview"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            />
          </div>

          <div className="flex flex-col items-center md:items-start">
            <ul className="space-y-3 text-sm text-black/80">
              <li>• AI Receptionist that automates front desk operations</li>
              <li>• Appointment booking, rescheduling, and follow-ups</li>
              <li>• Recall systems for cleanings, braces, and more</li>
              <li>• Insurance verification and claim eligibility checks</li>
              <li>• Lead conversion and re-engagement</li>
              <li>• 24/7 management with guaranteed 2× ROI</li>
            </ul>
            <a
              href="https://cal.com/velodent-ogbkfv/20min"
              className="mt-6 inline-flex items-center justify-center rounded-full border border-black px-5 py-2.5 text-sm font-medium hover:bg-black hover:text-white transition-colors"
            >
              Book a 20-Minute Discovery Call
            </a>
          </div>
        </div>

        <div className="mt-8 text-center">
          <p className="text-sm text-black/70">Book a 20-Minute Discovery Call — Choose a Time That Works for You</p>
          <a
            href="https://cal.com/velodent-ogbkfv/20min"
            className="mt-3 inline-flex items-center justify-center rounded-full border border-black px-5 py-2 text-sm font-medium hover:bg-black hover:text-white transition-colors"
          >
            Book Now
          </a>
        </div>
      </div>
    </section>
  );
}
