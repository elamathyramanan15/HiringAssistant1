import { useState } from 'react'
import { MoreVertical, ChevronDown } from 'lucide-react'

const jobs = [
  { title: 'Senior Frontend Engineer',  dept: 'Product',     date: 'Oct 12', applied: 42,  status: 'Open'   },
  { title: 'Product Marketing Manager', dept: 'Marketing',   date: 'Oct 14', applied: 128, status: 'Draft'  },
  { title: 'Lead UX Researcher',        dept: 'Design',      date: 'Oct 15', applied: 56,  status: 'Open'   },
  { title: 'DevOps Architect',          dept: 'Engineering', date: 'Oct 08', applied: 18,  status: 'Closed' },
  { title: 'Financial Analyst',         dept: 'Finance',     date: 'Oct 18', applied: 94,  status: 'Open'   },
]

const statusStyle = {
  Open:   { background: '#ECFDF5', color: '#059669' },
  Draft:  { background: '#FEF3C7', color: '#D97706' },
  Closed: { background: '#FEE2E2', color: '#DC2626' },
}

const dropdownStyle = {
  display: 'flex', alignItems: 'center', gap: '4px',
  padding: '5px 10px', fontSize: '12px', fontWeight: 500,
  color: '#374151', background: '#fff',
  border: '1px solid #E5E7EB', borderRadius: '6px',
  cursor: 'pointer', outline: 'none',
  appearance: 'none', WebkitAppearance: 'none',
}

export default function RecentJobDescriptions() {
  const [filter, setFilter] = useState('All Jobs')

  const filtered = filter === 'All Jobs'
    ? jobs
    : jobs.filter(j => j.status === filter)

  return (
    <div style={{
      background: '#fff', borderRadius: '12px',
      border: '1px solid #E5E7EB', padding: '20px',
    }}>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '18px' }}>
        <div>
          <div style={{ fontSize: '16px', fontWeight: 600, color: '#111827' }}>
            Recent Job Descriptions
          </div>
          <div style={{ fontSize: '13px', color: '#6B7280', marginTop: '2px' }}>
            Track and manage your latest active roles.
          </div>
        </div>

        {/* ✅ Filter Dropdown */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
            <select
              value={filter}
              onChange={e => setFilter(e.target.value)}
              style={dropdownStyle}
            >
              <option>All Jobs</option>
              <option>Open</option>
              <option>Draft</option>
              <option>Closed</option>
            </select>
            <ChevronDown size={12} color="#7C3AED" style={{ position: 'absolute', right: '8px', pointerEvents: 'none' }} />
          </div>
          <span style={{ fontSize: '13px', color: '#7C3AED', fontWeight: 500, cursor: 'pointer' }}>
            View List →
          </span>
        </div>
      </div>

      {/* Table */}
      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr>
            {['Job Title', 'Applied', 'Status', 'Actions'].map(col => (
              <th key={col} style={{
                fontSize: '11px', color: '#9CA3AF', fontWeight: 500,
                textTransform: 'uppercase', letterSpacing: '0.05em',
                padding: '8px 12px', textAlign: 'left',
                borderBottom: '1px solid #F3F4F6',
              }}>{col}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {filtered.map((job, i) => (
            <tr key={i} style={{ borderBottom: i < filtered.length - 1 ? '1px solid #F9FAFB' : 'none' }}>
              <td style={{ padding: '14px 12px' }}>
                <div style={{ fontSize: '14px', fontWeight: 500, color: '#111827' }}>{job.title}</div>
                <div style={{ fontSize: '12px', color: '#9CA3AF', marginTop: '2px' }}>{job.dept} · Created {job.date}</div>
              </td>
              <td style={{ padding: '14px 12px', fontSize: '14px', color: '#111827' }}>{job.applied}</td>
              <td style={{ padding: '14px 12px' }}>
                <span style={{
                  display: 'inline-block', padding: '3px 10px',
                  borderRadius: '20px', fontSize: '12px', fontWeight: 500,
                  ...statusStyle[job.status],
                }}>{job.status}</span>
              </td>
              <td style={{ padding: '14px 12px' }}>
                <button style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#9CA3AF', padding: '4px 8px', borderRadius: '6px' }}>
                  <MoreVertical size={16} />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}