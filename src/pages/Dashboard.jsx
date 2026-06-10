import { useState } from 'react';
import { Users, UserCheck, Briefcase, Calendar, Plus, TrendingUp, MoreVertical } from 'lucide-react';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
  ResponsiveContainer, PieChart, Pie, Cell
} from 'recharts';
import { statsData, pipelineData, statusData, allRecruiters } from '../data/mockData';
import { CreateRecruiterModal } from '../components/recruiters/CreateRecruiterModal';

const iconMap = {
  Users, UserCheck, Briefcase, Calendar,
};

export default function Dashboard() {
  const [showModal, setShowModal] = useState(false);

  return (
    <main className="p-6 bg-gray-50 min-h-[calc(100vh-65px)]">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Dashboard Overview</h1>
          <p className="text-sm text-gray-500 mt-0.5">Monitor your platform's recruiting activity</p>
        </div>
        <button onClick={() => setShowModal(true)}
          className="flex items-center gap-2 bg-purple-700 text-white text-sm font-semibold px-4 py-2.5 rounded-xl hover:bg-purple-800 transition-colors">
          <Plus size={16}/> Create Recruiter
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-4 gap-5 mb-6">
        {statsData.map((stat) => {
          const StatIcon = iconMap[stat.Icon];
          return (
            <div key={stat.label} className="bg-white rounded-2xl shadow-sm p-6">
              <div className="flex items-start justify-between mb-3">
                <span className="text-sm text-gray-500 font-medium">{stat.label}</span>
                <div className="w-9 h-9 bg-violet-100 rounded-lg flex items-center justify-center">
                  <StatIcon size={18} className="text-purple-700"/>
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

      {/* Charts Row */}
      <div className="flex gap-5 mb-6">
        <div className="bg-white rounded-2xl shadow-sm p-6 flex-[1.85]">
          <div className="flex items-start justify-between mb-4">
            <div>
              <h2 className="text-lg font-bold text-gray-900">Hiring Pipeline Overview</h2>
              <p className="text-sm text-gray-500">Monthly candidates and hires</p>
            </div>
            <div className="w-9 h-9 bg-violet-100 rounded-lg flex items-center justify-center">
              <TrendingUp size={18} className="text-purple-700"/>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={280}>
            <BarChart data={pipelineData} barGap={4}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F3F4F6"/>
              <XAxis dataKey="month" tick={{ fontSize:12, fill:'#9CA3AF' }} axisLine={false} tickLine={false}/>
              <YAxis tick={{ fontSize:12, fill:'#9CA3AF' }} axisLine={false} tickLine={false}/>
              <Tooltip contentStyle={{ borderRadius:'12px', border:'1px solid #E5E7EB', fontSize:'13px' }}/>
              <Legend verticalAlign="bottom" align="center" iconType="circle" iconSize={8} wrapperStyle={{ paddingTop:'12px', fontSize:'13px' }}/>
              <Bar dataKey="Candidates" fill="#7C3AED" radius={[4,4,0,0]} barSize={20}/>
              <Bar dataKey="Hired" fill="#C4B5FD" radius={[4,4,0,0]} barSize={20}/>
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
                {statusData.map((entry) => <Cell key={entry.name} fill={entry.color}/>)}
              </Pie>
              <Tooltip contentStyle={{ borderRadius:'12px', border:'1px solid #E5E7EB', fontSize:'13px' }}/>
            </PieChart>
          </ResponsiveContainer>
          <div className="space-y-2.5 mt-2">
            {statusData.map((item) => (
              <div key={item.name} className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }}/>
                  <span className="text-gray-600">{item.name}</span>
                </div>
                <span className="font-semibold text-gray-900">{item.value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recruiter Activity Table */}
      <div className="bg-white rounded-2xl shadow-sm p-6">
        <div className="mb-5">
          <h2 className="text-lg font-bold text-gray-900">Recruiter Activity</h2>
          <p className="text-sm text-gray-500">Recent recruiter performance metrics</p>
        </div>
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-100">
              {['Recruiter Name','Department','Active Jobs','Candidates Processed','Status','Actions'].map((h, i) => (
                <th key={h} className={`text-left text-[11px] font-semibold text-gray-400 uppercase tracking-wider pb-3 ${i===0?'pl-2':''} ${i===5?'text-right pr-2':''}`}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {allRecruiters.slice(0, 5).map((r) => (
              <tr key={r.email} className="border-b border-gray-50 hover:bg-gray-50/60 transition-colors">
                <td className="py-3.5 pl-2">
                  <div className="flex items-center gap-3">
                    <div className={`w-8 h-8 ${r.bg} rounded-full flex items-center justify-center text-white text-xs font-bold flex-shrink-0`}>{r.initials}</div>
                    <span className="text-sm font-medium text-gray-900">{r.name}</span>
                  </div>
                </td>
                <td className="py-3.5 text-sm text-gray-600">{r.dept}</td>
                <td className="py-3.5 text-sm font-medium text-gray-900">{r.jobs}</td>
                <td className="py-3.5 text-sm font-medium text-gray-900">{r.candidates}</td>
                <td className="py-3.5">
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold ${r.status==='Active'?'bg-green-100 text-green-700':'bg-gray-100 text-gray-500'}`}>
                    {r.status}
                  </span>
                </td>
                <td className="py-3.5 text-right pr-2">
                  <button className="p-1 rounded-lg hover:bg-gray-100 transition-colors">
                    <MoreVertical size={16} className="text-gray-400"/>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showModal && <CreateRecruiterModal onClose={() => setShowModal(false)}/>}
    </main>
  );
}