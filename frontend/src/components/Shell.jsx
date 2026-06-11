import { useState, useEffect } from 'react';
import { Sidebar } from './layout/Sidebar';
import { Topbar } from './layout/Topbar';
import Dashboard from '../pages/Dashboard';
import Recruiters from '../pages/Recruiters';
import PlatformAnalytics from '../pages/PlatformAnalytics';
import Settings from '../pages/Settings';


export default function Shell({ setView }) {
 const [activePage, setActivePage] = useState(
  localStorage.getItem('activePage') || 'Dashboard'
);

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <Sidebar activePage={activePage} setActivePage={setActivePage} setView={setView} />

      <div className="ml-[250px] flex-1 flex flex-col min-h-screen">
        <Topbar />

        <div className="flex-1">
          {activePage === 'Dashboard'          && <Dashboard />}
          {activePage === 'Recruiters'         && <Recruiters />}
          {activePage === 'Platform Analytics' && <PlatformAnalytics />}
          {activePage === 'Settings'           && <Settings setView={setView} />}
        </div>
      </div>
    </div>
  );
}