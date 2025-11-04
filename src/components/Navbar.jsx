import { useEffect } from 'react';
import { motion } from 'framer-motion';

export default function Navbar({ onOpenDashboard }) {
  // Make navbar sticky with subtle shadow on scroll
  useEffect(() => {
    const handler = () => {
      const el = document.getElementById('navbar');
      if (!el) return;
      if (window.scrollY > 8) {
        el.classList.add('shadow-sm');
      } else {
        el.classList.remove('shadow-sm');
      }
    };
    window.addEventListener('scroll', handler);
    return () => window.removeEventListener('scroll', handler);
  }, []);

  const navItems = [
    { label: 'Home', href: '#home' },
    { label: 'About', href: '#about' },
    { label: 'Services', href: '#services' },
    { label: 'Case Studies', href: '#cases' },
    { label: 'Testimonials', href: '#testimonials' },
    { label: 'FAQ', href: '#faq' },
    { label: 'Contact / Book Now', href: '#book' },
  ];

  return (
    <div id="navbar" className="sticky top-0 z-50 bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/80 border-b border-black/5">
      <nav className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <a href="#home" className="font-semibold tracking-tight text-black">Velodent</a>
          <div className="hidden md:flex items-center gap-8">
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="text-sm text-black/80 hover:text-black transition-colors"
              >
                {item.label}
              </a>
            ))}
          </div>
          <motion.button
            whileHover={{ y: -1 }}
            whileTap={{ scale: 0.98 }}
            onClick={onOpenDashboard}
            className="rounded-full border border-black px-4 py-2 text-sm font-medium text-black hover:bg-black hover:text-white transition-colors"
          >
            Dashboard
          </motion.button>
        </div>
      </nav>
    </div>
  );
}
