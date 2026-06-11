import { Search, Bell } from 'lucide-react';

export function Topbar() {
  return (
    <header className="sticky top-0 z-20 bg-white border-b border-gray-200 px-6 py-3 flex items-center justify-between">
      <div className="relative w-full max-w-md">
        <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400"/>
        <input type="text" placeholder="Search recruiters, candidates, jobs..."
          className="w-full pl-10 pr-4 py-2 rounded-full border border-gray-200 text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-300"/>
      </div>
      <div className="flex items-center gap-4 ml-6">
        <button className="relative p-2 rounded-full hover:bg-gray-100 transition-colors">
          <Bell size={20} className="text-gray-500"/>
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full"/>
        </button>
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 bg-purple-700 rounded-full flex items-center justify-center text-white text-xs font-bold">AU</div>
          <div className="hidden sm:block">
            <p className="text-sm font-semibold text-gray-900 leading-tight">Admin User</p>
            <p className="text-xs text-gray-400">Administrator</p>
          </div>
        </div>
      </div>
    </header>
  );
}