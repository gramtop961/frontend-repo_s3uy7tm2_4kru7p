import React from 'react';

export default function Hero() {
  return (
    <section id="home" className="bg-white">
      <div className="mx-auto max-w-7xl px-4 py-14 sm:py-16 md:py-20">
        {/* Dominant, centered video */}
        <div className="mx-auto w-full max-w-7xl">
          <div className="relative aspect-video overflow-hidden rounded-xl border border-black/10 shadow-md">
            <iframe
              className="h-full w-full"
              src="https://youtu.be/Nw478YoO3og?si=Tlq4mQe0x2RlSpPJ"
              title="Velodent Intro"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            />
          </div>
        </div>

        {/* Text under video, centered (unchanged) */}
        <div className="mx-auto mt-10 max-w-3xl text-center">
          <h1 className="text-3xl font-semibold tracking-tight text-black sm:text-4xl md:text-5xl">
            Premium Dental Growth, Minimal Design
          </h1>
          <p className="mt-4 text-base leading-relaxed text-black/70 sm:text-lg">
            Velodent delivers enterprise-grade marketing systems for modern dental practices.
            Clean visuals, precise messaging, and measurable outcomes.
          </p>
          <ul className="mx-auto mt-6 grid max-w-xl grid-cols-1 gap-2 text-left text-sm text-black/70 sm:grid-cols-3 sm:text-center">
            <li className="flex items-center justify-center gap-2">
              <span className="inline-block h-1.5 w-1.5 rounded-full bg-black" /> ROI-focused
            </li>
            <li className="flex items-center justify-center gap-2">
              <span className="inline-block h-1.5 w-1.5 rounded-full bg-black" /> HIPAA-aware
            </li>
            <li className="flex items-center justify-center gap-2">
              <span className="inline-block h-1.5 w-1.5 rounded-full bg-black" /> White-glove onboarding
            </li>
          </ul>
          <div className="mt-8 flex items-center justify-center gap-3">
            <a
              href="https://cal.com/velodent-ogbkfv/20min"
              target="_blank"
              rel="noreferrer"
              className="rounded-full bg-black px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-black/90"
            >
              Book a 20‑min call
            </a>
            <a
              href="#services"
              className="rounded-full border border-black px-6 py-3 text-sm font-medium text-black transition-colors hover:bg-black hover:text-white"
            >
              Explore services
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
