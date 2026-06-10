import { useState } from 'react'
import { ArrowRight, ChevronDown } from 'lucide-react'

const stages = [
  { label: 'Applied',              count: 34, avatars: [{ initials: 'SJ', color: '#7C3AED' }, { initials: 'MC', color: '#0EA5E9' }, { initials: 'ER', color: '#10B981' }] },
  { label: 'Under Review',         count: 34, avatars: [{ initials: 'RW', color: '#F59E0B' }, { initials: 'JP', color: '#EC4899' }, { initials: 'SJ', color: '#7C3AED' }] },
  { label: 'Shortlist',            count: 34, avatars: [{ initials: 'ER', color: '#10B981' }, { initials: 'MC', color: '#0EA5E9' }, { initials: 'RW', color: '#F59E0B' }] },
  { label: 'Interview Scheduled',  count: 34, avatars: [{ initials: 'SJ', color: '#7C3AED' }, { initials: 'JP', color: '#EC4899' }, { initials: 'ER', color: '#10B981' }] },
  { label: 'Selected',             count: 34, avatars: [{ initials: 'MC', color: '#0EA5E9' }, { initials: 'SJ', color: '#7C3AED' }, { initials: 'RW', color: '#F59E0B' }] },
  { label: 'Rejected',             count: 34, avatars: [{ initials: 'JP', color: '#EC4899' }, { initials: 'ER', color: '#10B981' }, { initials: 'MC', color: '#0EA5E9' }] },
]

const dropdownStyle = {
  padding: '5px 24px 5px 10px', fontSize: '12px', fontWeight: 500,
  color: '#374151', background: '#fff',
  border: '1px solid #E5E7EB', borderRadius: '6px',
  cursor: 'pointer', outline: 'none',
  appearance: 'none', WebkitAppearance: 'none',
}

export default function CandidatePipeline() {
  const [role, setRole] = useState('All Jobs')

  return (
    <div style={{ background: '#fff', borderRadius: '12px', border: '1px solid #E5E7EB', padding: '20px' }}>

      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '18px' }}>
        <div>
          <div style={{ fontSize: '16px', fontWeight: 600, color: '#111827' }}>Candidate Pipeline Overview</div>
          <div style={{ fontSize: '13px', color: '#6B7280', marginTop: '2px' }}>Real-time distribution of candidates across stages.</div>
        </div>

        {/* ✅ Filter Dropdown */}
        <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
          <select value={role} onChange={e => setRole(e.target.value)} style={dropdownStyle}>
            <option>Filters</option>
            <option>Frontend Developer</option>
            <option>UI/UX Designer</option>
            <option>Backend Developer</option>
            <option>Product Manager</option>
          </select>
          <ChevronDown size={12} color="#7C3AED" style={{ position: 'absolute', right: '8px', pointerEvents: 'none' }} />
        </div>
      </div>

      {/* 3x2 Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '12px' }}>
        {stages.map((stage, i) => (
          <div key={i} style={{ border: '1px solid #E5E7EB', borderRadius: '10px', padding: '14px' }}>
            <div style={{ fontSize: '11px', fontWeight: 600, color: '#6B7280', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '8px' }}>{stage.label}</div>
            <div style={{ fontSize: '20px', fontWeight: 700, color: '#111827', marginBottom: '10px' }}>{stage.count}</div>
            <div style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
              {stage.avatars.map((av, j) => (
                <div key={j} style={{
                  width: '26px', height: '26px', borderRadius: '50%',
                  background: av.color, border: '2px solid #fff',
                  marginLeft: j === 0 ? '0' : '-6px',
                  fontSize: '10px', fontWeight: 600, color: '#fff',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  position: 'relative', zIndex: stage.avatars.length - j,
                }}>{av.initials}</div>
              ))}
              <div style={{
                width: '26px', height: '26px', borderRadius: '50%',
                background: '#E5E7EB', border: '2px solid #fff', marginLeft: '-6px',
                fontSize: '10px', fontWeight: 600, color: '#6B7280',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>+31</div>
            </div>
            <div style={{ fontSize: '12px', color: '#7C3AED', fontWeight: 500, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '3px' }}>
              View All <ArrowRight size={13} />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}