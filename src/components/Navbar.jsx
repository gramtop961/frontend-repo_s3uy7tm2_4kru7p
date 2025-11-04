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
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6">
        <a href="#home" className="font-semibold tracking-tight text-black">Velodent</a>
        <nav className="hidden gap-6 md:flex">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="text-sm text-black/70 transition-colors hover:text-black"
            >
              {item.label}
            </a>
          ))}
        </nav>
        <div className="flex items-center gap-3">
          <a
            href="#book"
            className="hidden rounded-full border border-black px-4 py-2 text-sm font-medium text-black transition-colors hover:bg-black hover:text-white md:inline-block"
          >
            Book Now
          </a>
          <button
            onClick={onOpenDashboard}
            className="rounded-full bg-black px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-black/90"
          >
            Dashboard
          </button>
        </div>
      </div>
    </header>
  );
}
