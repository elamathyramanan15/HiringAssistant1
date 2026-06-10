import { useState } from 'react'
import { ChevronDown } from 'lucide-react'

const candidates = [
  { name: 'Sarah Jenkins',   initials: 'SJ', meta: '7 yrs Senior Eng · Interviewing',  match: 98, color: '#7C3AED' },
  { name: 'Michael Chen',    initials: 'MC', meta: '5 yrs Product Dev · Shortlisted',   match: 94, color: '#0EA5E9' },
  { name: 'Elena Rodriguez', initials: 'ER', meta: '8 yrs Frontend Lead · Shortlisted', match: 91, color: '#10B981' },
  { name: 'Robert Wilson',   initials: 'RW', meta: '4 yrs Fullstack · Reviewing',       match: 88, color: '#F59E0B' },
  { name: 'Jessica Park',    initials: 'JP', meta: '6 yrs UI Engineer · New',           match: 85, color: '#EC4899' },
]

const dropdownStyle = {
  padding: '5px 24px 5px 10px', fontSize: '12px', fontWeight: 500,
  color: '#374151', background: '#fff',
  border: '1px solid #E5E7EB', borderRadius: '6px',
  cursor: 'pointer', outline: 'none',
  appearance: 'none', WebkitAppearance: 'none',
}

export default function TopRankedCandidates() {
  const [period, setPeriod] = useState('This Week')

  return (
    <div style={{ background: '#fff', borderRadius: '12px', border: '1px solid #E5E7EB', padding: '20px' }}>

      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '18px' }}>
        <div>
          <div style={{ fontSize: '16px', fontWeight: 600, color: '#111827' }}>Top Ranked Candidates</div>
          <div style={{ fontSize: '13px', color: '#6B7280', marginTop: '2px' }}>AI-generated match scoring.</div>
        </div>

        {/* ✅ Filter + Live Badge */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
            <select value={period} onChange={e => setPeriod(e.target.value)} style={dropdownStyle}>
              <option>Filters</option>
              <option>Today</option>
              <option>This Week</option>
              <option>This Month</option>
            </select>
            <ChevronDown size={12} color="#7C3AED" style={{ position: 'absolute', right: '8px', pointerEvents: 'none' }} />
          </div>
          
        </div>
      </div>

      {/* Candidate Rows */}
      {candidates.map((c, i) => (
        <div key={i} style={{
          display: 'flex', alignItems: 'center', gap: '12px',
          padding: '12px 0',
          borderBottom: i < candidates.length - 1 ? '1px solid #F9FAFB' : 'none',
        }}>
          <div style={{
            width: '38px', height: '38px', borderRadius: '50%',
            background: c.color, display: 'flex', alignItems: 'center',
            justifyContent: 'center', fontSize: '13px', fontWeight: 600, color: '#fff', flexShrink: 0,
          }}>{c.initials}</div>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: '14px', fontWeight: 500, color: '#111827' }}>{c.name}</div>
            <div style={{ fontSize: '12px', color: '#9CA3AF', marginTop: '2px' }}>{c.meta}</div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <div>
              <div style={{ fontSize: '14px', fontWeight: 700, color: '#7C3AED', textAlign: 'right' }}>{c.match}%</div>
              <div style={{ fontSize: '10px', color: '#9CA3AF', fontWeight: 500 }}>MATCH</div>
            </div>
            <div style={{ width: '4px', height: '48px', background: '#F3F0FF', borderRadius: '4px', overflow: 'hidden', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end' }}>
              <div style={{ width: '100%', height: `${c.match}%`, background: '#7C3AED', borderRadius: '4px' }} />
            </div>
          </div>
        </div>
      ))}

      <div style={{ textAlign: 'center', marginTop: '16px', fontSize: '13px', color: '#7C3AED', fontWeight: 500, cursor: 'pointer' }}>
        See full candidate ranking →
      </div>
    </div>
  )
}