import { useState } from 'react';
import { Search } from 'lucide-react';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
  ResponsiveContainer, PieChart, Pie, Cell
} from 'recharts';
import {
  analyticKpis, analyticPipelineData, analyticAppStatusData,
  analyticHiringTrendData, analyticSelRejData, analyticSkillData,
  analyticRecruiterPerfData, analyticAiScoreData, analyticConversionData,
  analyticJdPerfData, analyticMonthlyRecruiterData, analyticCandidateRecords
} from '../data/mockData';

export default function PlatformAnalytics() {
  const [searchCand, setSearchCand] = useState('');
  const [statusFilter, setStatusFilter] = useState('All statuses');

  const filteredCands = analyticCandidateRecords.filter(c => {
    const matchSearch = c.name.toLowerCase().includes(searchCand.toLowerCase()) || c.jd.toLowerCase().includes(searchCand.toLowerCase());
    const matchStatus = statusFilter === 'All statuses' || c.status === statusFilter;
    return matchSearch && matchStatus;
  });

  const lightCard = "bg-white rounded-xl p-4 border border-gray-200 shadow-sm";
  const chartTooltipStyle = { backgroundColor: '#ffffff', border: '1px solid #e5e7eb', borderRadius: '8px', fontSize: '12px', color: '#111827' };

  return (
    <main className="p-6 bg-gray-50 min-h-[calc(100vh-65px)] text-gray-900">

      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Platform Analytics</h1>
        <p className="text-sm text-gray-500 mt-0.5">AI-driven insights across your hiring platform</p>
      </div>

      {/* KPI Grid */}
      <div className="mb-6">
        <p className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-3">Key Performance Indicators</p>
        <div className="grid grid-cols-5 gap-3">
          {analyticKpis.map((k) => (
            <div key={k.label} className="bg-white rounded-xl p-4 border border-gray-200 shadow-sm">
              <p className="text-xs text-gray-500 mb-1">{k.label}</p>
              <p className="text-2xl font-bold text-gray-900">{k.value}</p>
              <p className="text-xs text-gray-400 mt-0.5">{k.sub}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Analytics Charts label */}
      <p className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-3">Analytics Charts</p>

      {/* Row 1: Pipeline Funnel + App Status Donut */}
      <div className="grid grid-cols-2 gap-4 mb-4">
        <div className={lightCard}>
          <p className="text-sm font-semibold text-gray-800 mb-0.5">Candidate pipeline funnel</p>
          <p className="text-xs text-gray-400 mb-3">Stage-wise drop-off</p>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={analyticPipelineData} layout="vertical" barSize={14}>
              <XAxis type="number" tick={{ fontSize: 10, fill: '#6b7280' }} axisLine={false} tickLine={false} />
              <YAxis type="category" dataKey="stage" tick={{ fontSize: 11, fill: '#374151' }} axisLine={false} tickLine={false} width={80} />
              <Tooltip contentStyle={chartTooltipStyle} />
              <Bar dataKey="count" fill="#818cf8" radius={[0, 4, 4, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className={lightCard}>
          <p className="text-sm font-semibold text-gray-800 mb-0.5">Application status distribution</p>
          <p className="text-xs text-gray-400 mb-1">Current status breakdown</p>
          <div className="flex flex-wrap gap-2 mb-2">
            {analyticAppStatusData.map(s => (
              <span key={s.name} className="flex items-center gap-1 text-xs text-gray-600">
                <span className="w-2 h-2 rounded-full inline-block" style={{ backgroundColor: s.color }} />
                {s.name} {s.value}%
              </span>
            ))}
          </div>
          <ResponsiveContainer width="100%" height={170}>
            <PieChart>
              <Pie data={analyticAppStatusData} cx="50%" cy="50%" innerRadius={50} outerRadius={80} paddingAngle={2} dataKey="value" stroke="none">
                {analyticAppStatusData.map(e => <Cell key={e.name} fill={e.color} />)}
              </Pie>
              <Tooltip contentStyle={chartTooltipStyle} />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Row 2: Monthly hiring trend + Selection vs Rejection */}
      <div className="grid grid-cols-2 gap-4 mb-4">
        <div className={lightCard}>
          <p className="text-sm font-semibold text-gray-800 mb-0.5">Monthly hiring trend</p>
          <p className="text-xs text-gray-400 mb-3">Applications vs selections over time</p>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={analyticHiringTrendData}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f3f4f6" />
              <XAxis dataKey="month" tick={{ fontSize: 11, fill: '#6b7280' }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 10, fill: '#6b7280' }} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={chartTooltipStyle} />
              <Legend iconType="circle" iconSize={8} wrapperStyle={{ fontSize: '12px' }} />
              <Bar dataKey="Applications" fill="#6366f1" radius={[3, 3, 0, 0]} barSize={16} />
              <Bar dataKey="Selections" fill="#10b981" radius={[3, 3, 0, 0]} barSize={16} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className={lightCard}>
          <p className="text-sm font-semibold text-gray-800 mb-0.5">Selection vs rejection trend</p>
          <p className="text-xs text-gray-400 mb-3">Hiring outcomes comparison</p>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={analyticSelRejData}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f3f4f6" />
              <XAxis dataKey="month" tick={{ fontSize: 11, fill: '#6b7280' }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 10, fill: '#6b7280' }} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={chartTooltipStyle} />
              <Legend iconType="circle" iconSize={8} wrapperStyle={{ fontSize: '12px' }} />
              <Bar dataKey="Selected" fill="#10b981" radius={[3, 3, 0, 0]} barSize={16} />
              <Bar dataKey="Rejected" fill="#ef4444" radius={[3, 3, 0, 0]} barSize={16} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Row 3: Skill distribution + Recruiter performance */}
      <div className="grid grid-cols-2 gap-4 mb-4">
        <div className={lightCard}>
          <p className="text-sm font-semibold text-gray-800 mb-0.5">Skill distribution</p>
          <p className="text-xs text-gray-400 mb-3">Top 7 skills in candidate pool</p>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={analyticSkillData} layout="vertical" barSize={14}>
              <XAxis type="number" tick={{ fontSize: 10, fill: '#6b7280' }} axisLine={false} tickLine={false} />
              <YAxis type="category" dataKey="skill" tick={{ fontSize: 11, fill: '#374151' }} axisLine={false} tickLine={false} width={60} />
              <Tooltip contentStyle={chartTooltipStyle} />
              <Bar dataKey="count" fill="#a78bfa" radius={[0, 4, 4, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className={lightCard}>
          <p className="text-sm font-semibold text-gray-800 mb-0.5">Recruiter performance</p>
          <p className="text-xs text-gray-400 mb-3">Applications processed per recruiter</p>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={analyticRecruiterPerfData}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f3f4f6" />
              <XAxis dataKey="name" tick={{ fontSize: 11, fill: '#6b7280' }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 10, fill: '#6b7280' }} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={chartTooltipStyle} />
              <Bar dataKey="count" fill="#38bdf8" radius={[4, 4, 0, 0]} barSize={28} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Row 4: AI Score distribution + Recruiter conversion rate */}
      <div className="grid grid-cols-2 gap-4 mb-4">
        <div className={lightCard}>
          <p className="text-sm font-semibold text-gray-800 mb-0.5">AI score distribution</p>
          <p className="text-xs text-gray-400 mb-3">Candidate quality histogram</p>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={analyticAiScoreData}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f3f4f6" />
              <XAxis dataKey="range" tick={{ fontSize: 9, fill: '#6b7280' }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 10, fill: '#6b7280' }} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={chartTooltipStyle} />
              <Bar dataKey="count" radius={[4, 4, 0, 0]} barSize={22}>
                {analyticAiScoreData.map((_, i) => (
                  <Cell key={i} fill={`hsl(${140 + i * 8}, 60%, ${40 + i * 3}%)`} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className={lightCard}>
          <p className="text-sm font-semibold text-gray-800 mb-0.5">Recruiter conversion rate</p>
          <p className="text-xs text-gray-400 mb-3">Selection rate per recruiter (%)</p>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={analyticConversionData} layout="vertical" barSize={14}>
              <XAxis type="number" tick={{ fontSize: 10, fill: '#6b7280' }} axisLine={false} tickLine={false} unit="%" />
              <YAxis type="category" dataKey="name" tick={{ fontSize: 11, fill: '#374151' }} axisLine={false} tickLine={false} width={55} />
              <Tooltip contentStyle={chartTooltipStyle} />
              <Bar dataKey="rate" fill="#f59e0b" radius={[0, 4, 4, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* JD Performance full-width */}
      <div className={`${lightCard} mb-4`}>
        <p className="text-sm font-semibold text-gray-800 mb-0.5">JD performance analysis</p>
        <p className="text-xs text-gray-400 mb-3">Applications per job description</p>
        <ResponsiveContainer width="100%" height={160}>
          <BarChart data={analyticJdPerfData} layout="vertical" barSize={16}>
            <XAxis type="number" tick={{ fontSize: 10, fill: '#6b7280' }} axisLine={false} tickLine={false} />
            <YAxis type="category" dataKey="jd" tick={{ fontSize: 11, fill: '#374151' }} axisLine={false} tickLine={false} width={130} />
            <Tooltip contentStyle={chartTooltipStyle} />
            <Bar dataKey="count" fill="#6366f1" radius={[0, 4, 4, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Monthly top recruiters full-width */}
      <div className={`${lightCard} mb-4`}>
        <p className="text-sm font-semibold text-gray-800 mb-0.5">Monthly top recruiters</p>
        <p className="text-xs text-gray-400 mb-3">Candidates processed this month per recruiter</p>
        <ResponsiveContainer width="100%" height={180}>
          <BarChart data={analyticMonthlyRecruiterData}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f3f4f6" />
            <XAxis dataKey="name" tick={{ fontSize: 11, fill: '#6b7280' }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fontSize: 10, fill: '#6b7280' }} axisLine={false} tickLine={false} />
            <Tooltip contentStyle={chartTooltipStyle} />
            <Bar dataKey="count" radius={[4, 4, 0, 0]} barSize={40}>
              {analyticMonthlyRecruiterData.map((_, i) => (
                <Cell key={i} fill={['#6366f1', '#8b5cf6', '#6366f1', '#8b5cf6', '#6366f1'][i]} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Candidate Records Table */}
      <div className={`${lightCard} mb-4`}>
        <div className="flex items-center justify-between mb-4">
          <div>
            <p className="text-sm font-semibold text-gray-800">Candidate records</p>
            <p className="text-xs text-gray-400">Search, filter and sort all applications</p>
          </div>
          <div className="flex items-center gap-2">
            <div className="relative">
              <Search size={13} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-gray-400" />
              <input value={searchCand} onChange={e => setSearchCand(e.target.value)} placeholder="Search candidate..."
                className="pl-8 pr-3 py-1.5 text-xs bg-gray-50 border border-gray-200 rounded-lg text-gray-700 focus:outline-none focus:ring-1 focus:ring-purple-400 w-40" />
            </div>
            <select value={statusFilter} onChange={e => setStatusFilter(e.target.value)}
              className="px-3 py-1.5 text-xs bg-gray-50 border border-gray-200 rounded-lg text-gray-700 focus:outline-none focus:ring-1 focus:ring-purple-400">
              <option>All statuses</option>
              <option>Selected</option>
              <option>Shortlisted</option>
              <option>Under review</option>
              <option>Rejected</option>
            </select>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                {['#', 'Candidate', 'Recruiter', 'Job description', 'Applied date', 'Status', 'Match score'].map(h => (
                  <th key={h} className="text-left text-[10px] font-semibold text-gray-400 uppercase tracking-wider pb-2 pr-4">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredCands.map(c => (
                <tr key={c.id} className="hover:bg-gray-50 transition-colors">
                  <td className="py-3 pr-4 text-xs text-gray-400">{c.id}</td>
                  <td className="py-3 pr-4 text-sm font-medium text-gray-900">{c.name}</td>
                  <td className="py-3 pr-4 text-sm text-gray-500">{c.recruiter}</td>
                  <td className="py-3 pr-4 text-sm text-gray-500">{c.jd}</td>
                  <td className="py-3 pr-4 text-xs text-gray-400">{c.date}</td>
                  <td className="py-3 pr-4">
                    <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-semibold text-white ${c.statusColor}`}>{c.status}</span>
                  </td>
                  <td className="py-3">
                    <span className={`text-sm font-bold ${c.score >= 80 ? 'text-green-500' : c.score >= 60 ? 'text-amber-500' : 'text-red-500'}`}>{c.score}%</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* AI Business Insight Report */}
      <div className={lightCard}>
        <p className="text-sm font-semibold text-gray-800 mb-0.5">AI-generated business insight report</p>
        <p className="text-xs text-gray-400 mb-4">Auto-derived from AI analysis data</p>
        <div className="grid grid-cols-5 gap-3 mb-4">
          {[
            { label: 'Top Skill',       value: 'SQL',            sub: '245 candidates' },
            { label: 'Most Applied JD', value: 'Java developer', sub: '180 applications' },
            { label: 'Best Recruiter',  value: 'Pooja',          sub: '18% conversion' },
            { label: 'Avg AI Score',    value: '82%',            sub: 'Good pool quality' },
            { label: 'Bottleneck',      value: 'Under review',   sub: '220 stuck' },
          ].map(i => (
            <div key={i.label} className="bg-gray-50 rounded-lg p-3 border border-gray-200">
              <p className="text-[10px] text-gray-400 uppercase tracking-wide mb-1">{i.label}</p>
              <p className="text-base font-bold text-gray-900 leading-tight">{i.value}</p>
              <p className="text-[10px] text-gray-500 mt-0.5">{i.sub}</p>
            </div>
          ))}
        </div>
        <div className="grid grid-cols-5 gap-3">
          {[
            { label: 'Pipeline Growth', value: '+15%',           sub: 'vs last month',    color: 'text-green-500' },
            { label: 'Selection Rate',  value: '12%',            sub: 'Overall platform', color: 'text-gray-900' },
            { label: 'Role to Fill',    value: 'DevOps engineer', sub: 'Low conversion',  color: 'text-gray-900' },
            { label: 'Screening',       value: '120',            sub: 'This period',      color: 'text-gray-900' },
            { label: 'Rejected',        value: '780',            sub: 'This period',      color: 'text-red-500' },
          ].map(i => (
            <div key={i.label} className="bg-gray-50 rounded-lg p-3 border border-gray-200">
              <p className="text-[10px] text-gray-400 uppercase tracking-wide mb-1">{i.label}</p>
              <p className={`text-base font-bold leading-tight ${i.color}`}>{i.value}</p>
              <p className="text-[10px] text-gray-500 mt-0.5">{i.sub}</p>
            </div>
          ))}
        </div>
      </div>

    </main>
  );
}