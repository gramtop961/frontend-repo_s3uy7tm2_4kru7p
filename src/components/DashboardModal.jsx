import React, { useEffect } from 'react';

export default function DashboardModal({ isOpen, onClose }) {
  useEffect(() => {
    function onKey(e) {
      if (e.key === 'Escape') onClose();
    }
    if (isOpen) window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
      <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl">
        <div className="mb-4 flex items-center justify-between">
          <h3 className="text-lg font-semibold text-black">Sign in to Dashboard</h3>
          <button onClick={onClose} className="rounded-full border border-black/10 px-2 py-1 text-black/70 hover:text-black">✕</button>
        </div>
        <form className="space-y-4">
          <div>
            <label className="block text-sm text-black/80">Email</label>
            <input
              type="email"
              className="mt-1 w-full rounded-lg border border-black/20 px-3 py-2 text-sm outline-none transition focus:border-black"
              placeholder="you@practice.com"
            />
          </div>
          <div>
            <label className="block text-sm text-black/80">Password</label>
            <input
              type="password"
              className="mt-1 w-full rounded-lg border border-black/20 px-3 py-2 text-sm outline-none transition focus:border-black"
              placeholder="••••••••"
            />
          </div>
          <div className="flex items-center justify-between">
            <a href="#" className="text-xs text-black/60 hover:text-black">Forgot password?</a>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="mt-2 w-full rounded-full bg-black px-4 py-2 text-sm font-medium text-white hover:bg-black/90"
          >
            Sign In
          </button>
        </form>
      </div>
    </div>
  );
}
