import { useState } from 'react';
import { Plus, Search, Filter, MoreVertical } from 'lucide-react';
import { CreateRecruiterModal } from '../components/recruiters/CreateRecruiterModal';
import { departments } from '../data/mockData';
import { useEffect } from 'react';
import API from '../api';

const PAGE_SIZE = 8;

export default function Recruiters({ globalSearch = '' }) {
  const [showModal, setShowModal] = useState(false);
  const [search, setSearch]       = useState('');
  const [deptFilter, setDept]     = useState('');
  const [statusFilter, setStatus] = useState('');
  const [page, setPage]           = useState(1);
 const [openMenu, setOpenMenu]   = useState(null);
 const [recruiterList, setRecruiterList] = useState([]);

 useEffect(() => {
  fetchRecruiters();
 }, []);

 const fetchRecruiters = async () => {
  try {
    const response = await API.get('/dashboard/recruiters');
    setRecruiterList(response.data.data || []);
  } catch (error) {
    console.error('Failed to fetch recruiters', error);
  }
};

const dynamicDepartments = [
  ...new Set([
    ...departments,
    ...recruiterList.map(r => r.dept).filter(Boolean),
  ]),
];

  const filtered = recruiterList.filter(r => {
  const combinedSearch = search || globalSearch;
  const searchValue = combinedSearch.toLowerCase();

  const name = r.name || '';
  const email = r.email || '';
  const dept = r.dept || '';
  const status = r.status || '';

  const matchSearch =
    !searchValue ||
    name.toLowerCase().includes(searchValue) ||
    email.toLowerCase().includes(searchValue) ||
    dept.toLowerCase().includes(searchValue) ||
    status.toLowerCase().includes(searchValue);

  const matchDept = !deptFilter || dept === deptFilter;
  const matchStatus =
  !statusFilter ||
  status.toUpperCase() === statusFilter.toUpperCase();

  return matchSearch && matchDept && matchStatus;
});
  const totalPages = Math.ceil(filtered.length / PAGE_SIZE);
  const paged      = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  const updateRecruiterStatus = async (userId, status) => {
    try {
      await API.post(`/dashboard/recruiters/${userId}/status`, {
        status,
      });

      await fetchRecruiters();
      setOpenMenu(null);
    } catch (error) {
      alert(error?.response?.data?.message || 'Failed to update recruiter status');
    }
  };
const deleteRecruiter = async (userId) => {
  if (!window.confirm("Delete this recruiter?")) return;

  try {
    await API.delete(`/dashboard/recruiters/${userId}`);

    await fetchRecruiters();
    setOpenMenu(null);
  } catch (error) {
    alert(error?.response?.data?.message || 'Failed to delete recruiter');
  }
};

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
                {dynamicDepartments.map(d => <option key={d}>{d}</option>)}
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
                <option value="ACTIVE">Active</option>
                <option value="INACTIVE">Inactive</option>
                <option value="BLOCKED">Blocked</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-visible">
        <div className="px-6 py-4 border-b border-gray-100">
          <h2 className="text-base font-bold text-gray-900">All Recruiters</h2>
          <p className="text-xs text-gray-400 mt-0.5">Showing {paged.length} of {filtered.length} recruiters</p>
        </div>
        <div className="overflow-x-auto overflow-y-visible">
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
                    <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold ${r.status==='ACTIVE'?'bg-green-100 text-green-700':'bg-gray-100 text-gray-500'}`}>
                      <span className={`w-1.5 h-1.5 rounded-full ${r.status==='ACTIVE'?'bg-green-500':'bg-gray-400'}`}/>
                      {r.status}
                    </span>
                  </td>
                 <td className="py-4 px-4 text-center">
  <div className="relative inline-block">
    <button
  type="button"
  onClick={() => setOpenMenu(openMenu === r.user_id ? null : r.user_id)}
  className="p-1.5 rounded-lg hover:bg-gray-100 transition-colors"
    >
      <MoreVertical size={16} className="text-gray-400"/>
    </button>

    {openMenu === r.user_id && (
      <div className="absolute right-0 top-8 w-40 bg-white border border-gray-200 rounded-xl shadow-lg z-[9999]">
       <button onClick={() => updateRecruiterStatus(r.user_id, 'ACTIVE')} className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-50">
          Activate
        </button>
        <button onClick={() => updateRecruiterStatus(r.user_id, 'INACTIVE')} className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-50">
          Deactivate
        </button>
        <button onClick={() => updateRecruiterStatus(r.user_id, 'BLOCKED')} className="block w-full text-left px-4 py-2 text-sm text-orange-600 hover:bg-orange-50">
          Block Account
        </button>
        <button onClick={() => deleteRecruiter(r.user_id)} className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50">
          Delete
        </button>
      </div>
    )}
  </div>
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
      {showModal && (
  <CreateRecruiterModal
    onClose={() => setShowModal(false)}
    onCreated={fetchRecruiters}
  />
)}
    </main>
  );
}
