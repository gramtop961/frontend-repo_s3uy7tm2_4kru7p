import { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function DashboardModal({ open, onClose }) {
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape') onClose();
    };
    if (open) document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 bg-white"
          role="dialog"
          aria-modal="true"
        >
          <div className="absolute inset-0 flex items-center justify-center px-4">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              className="w-full max-w-md rounded-2xl border border-black/10 p-6 bg-white"
            >
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold">Sign in to Dashboard</h3>
                <button
                  onClick={onClose}
                  className="text-black/60 hover:text-black transition-colors"
                  aria-label="Close"
                >
                  ✕
                </button>
              </div>
              <form className="mt-6 space-y-4">
                <div>
                  <label className="block text-sm mb-1">Email</label>
                  <input
                    type="email"
                    className="w-full rounded-lg border border-black/20 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-black/10"
                    placeholder="you@clinic.com"
                  />
                </div>
                <div>
                  <label className="block text-sm mb-1">Password</label>
                  <input
                    type="password"
                    className="w-full rounded-lg border border-black/20 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-black/10"
                    placeholder="••••••••"
                  />
                </div>
                <div className="flex items-center justify-between">
                  <button
                    type="button"
                    className="rounded-full border border-black px-5 py-2 text-sm font-medium hover:bg-black hover:text-white transition-colors"
                  >
                    Sign In
                  </button>
                  <a href="#" className="text-sm text-black/70 hover:underline">Forgot Password?</a>
                </div>
              </form>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
