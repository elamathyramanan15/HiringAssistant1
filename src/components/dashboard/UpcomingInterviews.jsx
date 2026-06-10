import { useState } from 'react'
import { Calendar, ExternalLink, ChevronDown } from 'lucide-react'

const interviews = [
  { name: 'Sarah Jenkins', initials: 'SJ', color: '#7C3AED', role: 'Sr. Frontend Engineer', type: 'Technical Interview', time: '10:30 AM', tomorrow: false },
  { name: 'David Miller',  initials: 'DM', color: '#0EA5E9', role: 'DevOps Architect',       type: 'Cultural Fit',        time: '02:00 PM', tomorrow: false },
  { name: 'Anna Smith',    initials: 'AS', color: '#10B981', role: 'Financial Analyst',       type: 'Final Round',         time: '09:15 AM', tomorrow: true  },
]

const dropdownStyle = {
  padding: '5px 24px 5px 10px', fontSize: '12px', fontWeight: 500,
  color: '#374151', background: '#fff',
  border: '1px solid #E5E7EB', borderRadius: '6px',
  cursor: 'pointer', outline: 'none',
  appearance: 'none', WebkitAppearance: 'none',
}

export default function UpcomingInterviews() {
  const [schedule, setSchedule] = useState('Today')

  const filtered = interviews.filter(iv => {
    if (schedule === 'Today')    return !iv.tomorrow
    if (schedule === 'Tomorrow') return iv.tomorrow
    return true
  })

  return (
    <div style={{ background: '#fff', borderRadius: '12px', border: '1px solid #E5E7EB', padding: '20px' }}>

      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '18px' }}>
        <div>
          <div style={{ fontSize: '16px', fontWeight: 600, color: '#111827' }}>Upcoming Interviews</div>
          <div style={{ fontSize: '13px', color: '#6B7280', marginTop: '2px' }}>Schedule for today and tomorrow.</div>
        </div>

        {/* ✅ Filter Dropdown */}
        <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
          <select value={schedule} onChange={e => setSchedule(e.target.value)} style={dropdownStyle}>
            <option>Today</option>
            <option>Tomorrow</option>
            <option>This Week</option>
          </select>
          <ChevronDown size={12} color="#7C3AED" style={{ position: 'absolute', right: '8px', pointerEvents: 'none' }} />
        </div>
      </div>

      {/* Interview Rows */}
      {filtered.map((iv, i) => (
        <div key={i} style={{
          display: 'flex', alignItems: 'center', gap: '12px',
          padding: '12px 0',
          borderBottom: i < filtered.length - 1 ? '1px solid #F9FAFB' : 'none',
        }}>
          <div style={{
            width: '38px', height: '38px', borderRadius: '50%',
            background: iv.color, display: 'flex', alignItems: 'center',
            justifyContent: 'center', fontSize: '13px', fontWeight: 600, color: '#fff', flexShrink: 0,
          }}>{iv.initials}</div>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: '14px', fontWeight: 500, color: '#111827' }}>{iv.name}</div>
            <div style={{ fontSize: '12px', color: '#6B7280', marginTop: '1px' }}>{iv.role}</div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '12px', color: '#9CA3AF', marginTop: '3px' }}>
              <Calendar size={13} />{iv.type}
            </div>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '6px' }}>
            <span style={{ fontSize: '13px', fontWeight: 600, color: iv.tomorrow ? '#F59E0B' : '#7C3AED', whiteSpace: 'nowrap' }}>
              {iv.tomorrow ? `Tomorrow, ${iv.time}` : iv.time}
            </span>
            <button style={{ background: 'none', border: '1px solid #E5E7EB', borderRadius: '6px', padding: '4px 6px', cursor: 'pointer', color: '#9CA3AF', display: 'flex', alignItems: 'center' }}>
              <ExternalLink size={14} />
            </button>
          </div>
        </div>
      ))}

      <button style={{
        display: 'block', width: '100%', marginTop: '16px', padding: '10px',
        background: '#F9FAFB', border: '1px solid #E5E7EB', borderRadius: '8px',
        fontSize: '13px', fontWeight: 500, color: '#374151', cursor: 'pointer', textAlign: 'center',
      }}>
        View Full Schedule
      </button>
    </div>
  )
}