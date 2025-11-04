import React, { useState } from 'react';
import Navbar from './components/Navbar.jsx';
import Hero from './components/Hero.jsx';
import Sections from './components/Sections.jsx';
import DashboardModal from './components/DashboardModal.jsx';

export default function App() {
  const [dashboardOpen, setDashboardOpen] = useState(false);

  return (
    <div className="min-h-screen bg-white text-black">
      <Navbar onOpenDashboard={() => setDashboardOpen(true)} />
      <main>
        <Hero />
        <Sections />
      </main>
      <DashboardModal isOpen={dashboardOpen} onClose={() => setDashboardOpen(false)} />
    </div>
  );
}
