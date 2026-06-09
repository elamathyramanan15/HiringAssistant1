import { useEffect, useState } from 'react';
import {
  Users, UserCheck, Briefcase, Calendar,
  Search, Bell,
  LayoutDashboard, BarChart3, Settings, LogOut,
  Plus, TrendingUp, MoreVertical
} from 'lucide-react';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
  ResponsiveContainer, PieChart, Pie, Cell
} from 'recharts';
import API from '../api';

const navItems = [
  { label: 'Dashboard', icon: LayoutDashboard, active: true },
  { label: 'Recruiters', icon: Users, active: false },
  { label: 'Platform Analytics', icon: BarChart3, active: false },
  { label: 'Settings', icon: Settings, active: false },
];

const statusColors = ['#7C3AED', '#A78BFA', '#C4B5FD', '#EDE9FE', '#DDD6FE'];

export default function Dashboard({ setView }) {
  const [statsData, setStatsData] = useState([]);
  const [pipelineData, setPipelineData] = useState([]);
  const [statusData, setStatusData] = useState([]);
  const [recruiters, setRecruiters] = useState([]);

  const user = JSON.parse(localStorage.getItem('user')) || {};
  const displayName = `${user.first_name || 'Admin'} ${user.last_name || 'User'}`.trim();

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const response = await API.get('/dashboard/admin');
      const data = response.data.data;

      setStatsData([
        { label: 'Total Recruiters', value: data.stats.total_recruiters, change: '+12%', positive: true, Icon: Users },
        { label: 'Total Candidates', value: data.stats.total_candidates, change: '+23%', positive: true, Icon: UserCheck },
        { label: 'Active Job Descriptions', value: data.stats.active_jobs, change: '-5%', positive: false, Icon: Briefcase },
        { label: 'Interviews Scheduled', value: data.stats.interviews_scheduled, change: '+18%', positive: true, Icon: Calendar },
      ]);

      setPipelineData(data.pipeline || []);

      setStatusData(
        (data.candidate_status || []).map((item, index) => ({
          ...item,
          color: statusColors[index % statusColors.length],
        }))
      );

      setRecruiters(
        (data.recruiters || []).map((r, index) => ({
          ...r,
          initials: r.name
            .split(' ')
            .map(word => word[0])
            .join('')
            .slice(0, 2)
            .toUpperCase(),
          bg: ['bg-violet-600', 'bg-violet-500', 'bg-violet-400'][index % 3],
        }))
      );
    } catch (error) {
      alert('Failed to load dashboard data');
    }
  };

  const handleSignOut = () => {
    localStorage.removeItem('access_token');
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    localStorage.removeItem('role');
    setView('login');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <aside className="fixed left-0 top-0 h-screen w-[250px] bg-white border-r border-gray-200 z-30 flex flex-col">
        <div className="px-6 py-6 flex items-center gap-2.5">
          <div className="w-9 h-9 bg-purple-700 rounded-lg flex items-center justify-center text-lg">
            🤖
          </div>
          <div>
            <span className="font-bold text-gray-900 text-lg">HireAI</span>
            <p className="text-[11px] text-gray-400 -mt-0.5">Admin</p>
          </div>
        </div>

        <nav className="flex-1 px-3 mt-2 space-y-1">
          {navItems.map((item) => {
            const NavIcon = item.icon;
            return (
              <a
                key={item.label}
                href="#"
                onClick={(e) => e.preventDefault()}
                className={`flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                  item.active
                    ? 'bg-violet-100 text-violet-700'
                    : 'text-gray-600 hover:bg-gray-50'
                }`}
              >
                <NavIcon size={18} />
                {item.label}
              </a>
            );
          })}
        </nav>

        <div className="px-3 pb-6">
          <button
            onClick={handleSignOut}
            className="flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium text-red-500 hover:bg-red-50 transition-colors w-full"
          >
            <LogOut size={18} />
            Sign Out
          </button>
        </div>
      </aside>

      <div className="ml-[250px]">
        <header className="sticky top-0 z-20 bg-white border-b border-gray-200 px-6 py-3 flex items-center justify-between">
          <div className="relative w-full max-w-md">
            <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search recruiters, candidates, jobs..."
              className="w-full pl-10 pr-4 py-2 rounded-full border border-gray-200 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-300 focus:border-purple-300"
            />
          </div>

          <div className="flex items-center gap-4 ml-6">
            <button className="relative p-2 rounded-full hover:bg-gray-100 transition-colors">
              <Bell size={20} className="text-gray-500" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full" />
            </button>

            <div className="flex items-center gap-3">
              <div className="w-9 h-9 bg-purple-700 rounded-full flex items-center justify-center text-white text-xs font-bold">
                {displayName.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase()}
              </div>
              <div className="hidden sm:block">
                <p className="text-sm font-semibold text-gray-900 leading-tight">{displayName}</p>
                <p className="text-xs text-gray-400">Administrator</p>
              </div>
            </div>
          </div>
        </header>

        <main className="p-6 bg-gray-50 min-h-[calc(100vh-65px)]">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Dashboard Overview</h1>
              <p className="text-sm text-gray-500 mt-0.5">Monitor your platform&apos;s recruiting activity</p>
            </div>
            <button className="flex items-center gap-2 bg-purple-700 text-white text-sm font-semibold px-4 py-2.5 rounded-xl hover:bg-purple-800 transition-colors">
              <Plus size={16} />
              Create Recruiter
            </button>
          </div>

          <div className="grid grid-cols-4 gap-5 mb-6">
            {statsData.map((stat) => {
              const StatIcon = stat.Icon;
              return (
                <div key={stat.label} className="bg-white rounded-2xl shadow-sm p-6">
                  <div className="flex items-start justify-between mb-3">
                    <span className="text-sm text-gray-500 font-medium">{stat.label}</span>
                    <div className="w-9 h-9 bg-violet-100 rounded-lg flex items-center justify-center">
                      <StatIcon size={18} className="text-purple-700" />
                    </div>
                  </div>
                  <p className="text-3xl font-bold text-gray-900 mb-1">{stat.value}</p>
                  <div className={`flex items-center gap-1 text-sm font-medium ${stat.positive ? 'text-green-600' : 'text-red-500'}`}>
                    <span>{stat.positive ? '↑' : '↓'}</span>
                    <span>{stat.change}</span>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="flex gap-5 mb-6">
            <div className="bg-white rounded-2xl shadow-sm p-6 flex-[1.85]">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h2 className="text-lg font-bold text-gray-900">Hiring Pipeline Overview</h2>
                  <p className="text-sm text-gray-500">Monthly candidates and hires</p>
                </div>
                <div className="w-9 h-9 bg-violet-100 rounded-lg flex items-center justify-center">
                  <TrendingUp size={18} className="text-purple-700" />
                </div>
              </div>
              <ResponsiveContainer width="100%" height={280}>
                <BarChart data={pipelineData} barGap={4}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F3F4F6" />
                  <XAxis dataKey="month" tick={{ fontSize: 12, fill: '#9CA3AF' }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fontSize: 12, fill: '#9CA3AF' }} axisLine={false} tickLine={false} />
                  <Tooltip contentStyle={{ borderRadius: '12px', border: '1px solid #E5E7EB', fontSize: '13px' }} />
                  <Legend verticalAlign="bottom" align="center" iconType="circle" iconSize={8} wrapperStyle={{ paddingTop: '12px', fontSize: '13px' }} />
                  <Bar dataKey="Candidates" fill="#7C3AED" radius={[4, 4, 0, 0]} barSize={20} />
                  <Bar dataKey="Hired" fill="#C4B5FD" radius={[4, 4, 0, 0]} barSize={20} />
                </BarChart>
              </ResponsiveContainer>
            </div>

            <div className="bg-white rounded-2xl shadow-sm p-6 flex-1">
              <div className="mb-4">
                <h2 className="text-lg font-bold text-gray-900">Candidate Status</h2>
                <p className="text-sm text-gray-500">Distribution by stage</p>
              </div>
              <ResponsiveContainer width="100%" height={200}>
                <PieChart>
                  <Pie data={statusData} cx="50%" cy="50%" innerRadius={60} outerRadius={90} paddingAngle={3} dataKey="value" stroke="none">
                    {statusData.map((entry) => (
                      <Cell key={entry.name} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip contentStyle={{ borderRadius: '12px', border: '1px solid #E5E7EB', fontSize: '13px' }} />
                </PieChart>
              </ResponsiveContainer>

              <div className="space-y-2.5 mt-2">
                {statusData.map((item) => (
                  <div key={item.name} className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-2">
                      <span className="w-3 h-3 rounded-full inline-block" style={{ backgroundColor: item.color }} />
                      <span className="text-gray-600">{item.name}</span>
                    </div>
                    <span className="font-semibold text-gray-900">{item.value}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-sm p-6">
            <div className="mb-5">
              <h2 className="text-lg font-bold text-gray-900">Recruiter Activity</h2>
              <p className="text-sm text-gray-500">Recent recruiter performance metrics</p>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-100">
                    <th className="text-left text-[11px] font-semibold text-gray-400 uppercase tracking-wider pb-3 pl-2">Recruiter Name</th>
                    <th className="text-left text-[11px] font-semibold text-gray-400 uppercase tracking-wider pb-3">Department</th>
                    <th className="text-left text-[11px] font-semibold text-gray-400 uppercase tracking-wider pb-3">Active Jobs</th>
                    <th className="text-left text-[11px] font-semibold text-gray-400 uppercase tracking-wider pb-3">Candidates Processed</th>
                    <th className="text-left text-[11px] font-semibold text-gray-400 uppercase tracking-wider pb-3">Status</th>
                    <th className="text-right text-[11px] font-semibold text-gray-400 uppercase tracking-wider pb-3 pr-2">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {recruiters.map((r) => (
                    <tr key={r.user_id} className="border-b border-gray-50 hover:bg-gray-50/60 transition-colors">
                      <td className="py-3.5 pl-2">
                        <div className="flex items-center gap-3">
                          <div className={`w-8 h-8 ${r.bg} rounded-full flex items-center justify-center text-white text-xs font-bold flex-shrink-0`}>
                            {r.initials}
                          </div>
                          <span className="text-sm font-medium text-gray-900">{r.name}</span>
                        </div>
                      </td>
                      <td className="py-3.5 text-sm text-gray-600">{r.dept}</td>
                      <td className="py-3.5 text-sm text-gray-900 font-medium">{r.jobs}</td>
                      <td className="py-3.5 text-sm text-gray-900 font-medium">{r.candidates}</td>
                      <td className="py-3.5">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold ${
                          r.status?.toLowerCase() === 'active'
                            ? 'bg-green-100 text-green-700'
                            : 'bg-gray-100 text-gray-500'
                        }`}>
                          {r.status}
                        </span>
                      </td>
                      <td className="py-3.5 text-right pr-2">
                        <button className="p-1 rounded-lg hover:bg-gray-100 transition-colors">
                          <MoreVertical size={16} className="text-gray-400" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

        </main>
      </div>
    </div>
  );
}