import { LayoutDashboard, Users, BarChart3, Settings, LogOut } from 'lucide-react';
import { navItems } from '../../data/mockData';

export function Sidebar({ activePage, setActivePage, setView }) {
  const iconMap = {
    'LayoutDashboard': LayoutDashboard,
    'Users': Users,
    'BarChart3': BarChart3,
    'Settings': Settings,
  };

  return (
    <aside className="fixed left-0 top-0 h-screen w-[250px] bg-white border-r border-gray-200 z-30 flex flex-col">
      <div className="px-6 py-6 flex items-center gap-2.5">
        <div className="w-9 h-9 bg-purple-700 rounded-lg flex items-center justify-center text-lg">🤖</div>
        <div>
          <span className="font-bold text-gray-900 text-lg">HireAI</span>
          <p className="text-[11px] text-gray-400 -mt-0.5">Admin</p>
        </div>
      </div>
      <nav className="flex-1 px-3 mt-2 space-y-1">
        {navItems.map(({ label, icon }) => {
          const NavIcon = iconMap[icon];
          return (
            <button key={label} onClick={() => setActivePage(label)}
              className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium transition-colors ${activePage===label?'bg-violet-100 text-violet-700':'text-gray-600 hover:bg-gray-50'}`}>
              <NavIcon size={18}/>{label}
            </button>
          );
        })}
      </nav>
      <div className="px-3 pb-6">
        <button onClick={() => setView && setView('login')}
          className="flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium text-red-500 hover:bg-red-50 transition-colors w-full">
          <LogOut size={18}/>Sign Out
        </button>
      </div>
    </aside>
  );
}