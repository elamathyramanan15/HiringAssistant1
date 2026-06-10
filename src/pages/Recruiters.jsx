import { useState } from 'react';
import { Plus, Search, Filter, MoreVertical } from 'lucide-react';
import { CreateRecruiterModal } from '../components/recruiters/CreateRecruiterModal';
import { allRecruiters, departments } from '../data/mockData';

const PAGE_SIZE = 8;

export default function Recruiters() {
  const [showModal, setShowModal] = useState(false);
  const [search, setSearch]       = useState('');
  const [deptFilter, setDept]     = useState('');
  const [statusFilter, setStatus] = useState('');
  const [page, setPage]           = useState(1);

  const filtered = allRecruiters.filter(r => {
    const matchSearch = r.name.toLowerCase().includes(search.toLowerCase()) || r.email.toLowerCase().includes(search.toLowerCase());
    const matchDept   = !deptFilter   || r.dept   === deptFilter;
    const matchStatus = !statusFilter || r.status === statusFilter;
    return matchSearch && matchDept && matchStatus;
  });
  const totalPages = Math.ceil(filtered.length / PAGE_SIZE);
  const paged      = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  return (
    <main className="p-6 bg-gray-50 min-h-[calc(100vh-65px)]">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Recruiter Management</h1>
          <p className="text-sm text-gray-500 mt-0.5">Manage and monitor all recruiter accounts</p>
        </div>
        <button onClick={() => setShowModal(true)} className="flex items-center gap-2 bg-purple-700 text-white text-sm font-semibold px-5 py-2.5 rounded-xl hover:bg-purple-800 transition-colors">
          <Plus size={16}/>Create Recruiter
        </button>
      </div>

      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 mb-5">
        <div className="grid grid-cols-3 gap-4">
          <div>
            <label className="block text-xs font-semibold text-gray-500 mb-2">Search Recruiter</label>
            <div className="relative">
              <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"/>
              <input value={search} onChange={e => { setSearch(e.target.value); setPage(1); }} placeholder="Search by name or email..."
                className="w-full pl-9 pr-3 py-2.5 text-sm border border-gray-200 rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent"/>
            </div>
          </div>
          <div>
            <label className="block text-xs font-semibold text-gray-500 mb-2">Filter by Department</label>
            <div className="relative">
              <Filter size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"/>
              <select value={deptFilter} onChange={e => { setDept(e.target.value); setPage(1); }}
                className="w-full pl-9 pr-3 py-2.5 text-sm border border-gray-200 rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-purple-400 appearance-none">
                <option value="">All Departments</option>
                {departments.map(d => <option key={d}>{d}</option>)}
              </select>
            </div>
          </div>
          <div>
            <label className="block text-xs font-semibold text-gray-500 mb-2">Filter by Status</label>
            <div className="relative">
              <Filter size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"/>
              <select value={statusFilter} onChange={e => { setStatus(e.target.value); setPage(1); }}
                className="w-full pl-9 pr-3 py-2.5 text-sm border border-gray-200 rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-purple-400 appearance-none">
                <option value="">All Status</option>
                <option>Active</option>
                <option>Inactive</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-100">
          <h2 className="text-base font-bold text-gray-900">All Recruiters</h2>
          <p className="text-xs text-gray-400 mt-0.5">Showing {paged.length} of {filtered.length} recruiters</p>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-100 bg-gray-50/60">
                {['Recruiter Name','Email Address','Department','Active Jobs','Candidates Processed','Status','Actions'].map((h,i) => (
                  <th key={h} className={`py-3 px-4 text-left text-[11px] font-semibold text-gray-400 uppercase tracking-wider ${i===6?'text-center':''}`}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {paged.map((r) => (
                <tr key={r.email} className="hover:bg-purple-50/30 transition-colors">
                  <td className="py-4 px-4">
                    <div className="flex items-center gap-3">
                      <div className={`w-9 h-9 ${r.bg} rounded-full flex items-center justify-center text-white text-xs font-bold flex-shrink-0`}>{r.initials}</div>
                      <span className="text-sm font-semibold text-gray-900">{r.name}</span>
                    </div>
                  </td>
                  <td className="py-4 px-4 text-sm text-gray-500">{r.email}</td>
                  <td className="py-4 px-4 text-sm text-gray-700">{r.dept}</td>
                  <td className="py-4 px-4 text-sm font-medium text-gray-900">{r.jobs}</td>
                  <td className="py-4 px-4 text-sm font-medium text-gray-900">{r.candidates}</td>
                  <td className="py-4 px-4">
                    <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold ${r.status==='Active'?'bg-green-100 text-green-700':'bg-gray-100 text-gray-500'}`}>
                      <span className={`w-1.5 h-1.5 rounded-full ${r.status==='Active'?'bg-green-500':'bg-gray-400'}`}/>
                      {r.status}
                    </span>
                  </td>
                  <td className="py-4 px-4 text-center">
                    <button className="p-1.5 rounded-lg hover:bg-gray-100 transition-colors"><MoreVertical size={16} className="text-gray-400"/></button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {totalPages > 1 && (
          <div className="px-6 py-4 border-t border-gray-100 flex items-center justify-between">
            <p className="text-sm text-gray-500">Page {page} of {totalPages}</p>
            <div className="flex items-center gap-1">
              <button onClick={() => setPage(p => Math.max(1, p-1))} disabled={page===1}
                className="w-8 h-8 flex items-center justify-center rounded-lg border border-gray-200 text-gray-500 hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7"/></svg>
              </button>
              {Array.from({ length: totalPages }, (_, i) => i+1).map(n => (
                <button key={n} onClick={() => setPage(n)}
                  className={`w-8 h-8 flex items-center justify-center rounded-lg text-sm font-semibold transition-colors ${page===n?'bg-purple-700 text-white':'border border-gray-200 text-gray-600 hover:bg-gray-50'}`}>{n}</button>
              ))}
              <button onClick={() => setPage(p => Math.min(totalPages, p+1))} disabled={page===totalPages}
                className="w-8 h-8 flex items-center justify-center rounded-lg border border-gray-200 text-gray-500 hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7"/></svg>
              </button>
            </div>
          </div>
        )}
      </div>
      {showModal && <CreateRecruiterModal onClose={() => setShowModal(false)}/>}
    </main>
  );
}
