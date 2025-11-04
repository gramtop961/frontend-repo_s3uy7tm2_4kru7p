import { useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Sections from './components/Sections';
import DashboardModal from './components/DashboardModal';

function App() {
  const [dashboardOpen, setDashboardOpen] = useState(false);

  return (
    <div className="min-h-screen bg-white text-black">
      <Navbar onOpenDashboard={() => setDashboardOpen(true)} />
      <main>
        <Hero />
        <Sections />
      </main>
      <DashboardModal open={dashboardOpen} onClose={() => setDashboardOpen(false)} />
    </div>
  );
}

export default App;
