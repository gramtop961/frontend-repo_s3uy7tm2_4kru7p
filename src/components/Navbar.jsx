import React from 'react';

const navItems = [
  { href: '#home', label: 'Home' },
  { href: '#about', label: 'About' },
  { href: '#services', label: 'Services' },
  { href: '#case-studies', label: 'Case Studies' },
  { href: '#testimonials', label: 'Testimonials' },
  { href: '#faq', label: 'FAQ' },
  { href: '#book', label: 'Contact / Book Now' },
];

export default function Navbar({ onOpenDashboard }) {
  return (
    <header className="sticky top-0 z-50 border-b border-black/10 bg-white/80 backdrop-blur supports-[backdrop-filter]:bg-white/60">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 md:py-5">
        {/* Logo / Brand - increased size for visibility */}
        <a href="#home" className="text-2xl font-semibold tracking-tight text-black md:text-3xl">
          Velodent
        </a>

        {/* Navigation links - slightly larger */}
        <nav className="hidden items-center gap-8 md:flex">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="text-base text-black/80 transition-colors hover:text-black"
            >
              {item.label}
            </a>
          ))}
        </nav>

        {/* Actions - larger buttons */}
        <div className="flex items-center gap-3">
          <a
            href="#book"
            className="hidden rounded-full border border-black px-5 py-2.5 text-base font-medium text-black transition-colors hover:bg-black hover:text-white md:inline-block"
          >
            Book Now
          </a>
          <button
            onClick={onOpenDashboard}
            className="rounded-full bg-black px-5 py-2.5 text-base font-medium text-white transition-colors hover:bg-black/90"
          >
            Dashboard
          </button>
        </div>
      </div>
    </header>
  );
}
