import { useState, useRef } from 'react'
import {
  Search, Filter, Plus, MoreHorizontal,
  Briefcase, Clock, Settings, TrendingUp,
  TrendingDown, ChevronRight
} from 'lucide-react'

const initialColumns = {
  applied: {
    label: 'Applied', color: '#6B7280',
    candidates: [
      { id: 1, name: 'Alexander Wright', role: 'Sr. UX Designer',    exp: '8 Years exp', time: '2h ago',  match: 82, avatar: 'AW', color: '#7C3AED' },
      { id: 2, name: 'Sophia Chen',      role: 'Product Designer',   exp: '4 Years exp', time: '5h ago',  match: 85, avatar: 'SC', color: '#EC4899' },
      { id: 3, name: 'Marcus Miller',    role: 'UI Engineer',        exp: '3 Years exp', time: '1d ago',  match: 78, avatar: 'MM', color: '#0EA5E9' },
    ]
  },
  underReview: {
    label: 'Under Review', color: '#D97706',
    candidates: [
      { id: 4, name: 'Elena Rodriguez',  role: 'Sr. Product Designer', exp: '10 Years exp', time: '10m ago', match: 95, avatar: 'ER', color: '#10B981' },
      { id: 5, name: 'James Wilson',     role: 'Design Lead',          exp: '12 Years exp', time: '1h ago',  match: 88, avatar: 'JW', color: '#F59E0B' },
    ]
  },
  shortlisted: {
    label: 'Shortlisted', color: '#7C3AED',
    candidates: [
      { id: 6, name: 'Olivia Taylor',    role: 'UX Specialist',      exp: '6 Years exp', time: '3h ago',  match: 89, avatar: 'OT', color: '#EC4899' },
    ]
  },
  interview: {
    label: 'Interview', color: '#0EA5E9',
    candidates: [
      { id: 7, name: 'David Kim',        role: 'Interaction Designer', exp: '5 Years exp', time: '20m ago', match: 91, avatar: 'DK', color: '#7C3AED' },
      { id: 8, name: 'Sarah Jenkins',    role: 'Visual Designer',      exp: '4 Years exp', time: '45m ago', match: 82, avatar: 'SJ', color: '#0EA5E9' },
    ]
  },
  selected: {
    label: 'Selected', color: '#10B981',
    candidates: [
      { id: 9, name: 'Thomas Moore',     role: 'Principal Designer',   exp: '15 Years exp', time: '1d ago', match: 98, avatar: 'TM', color: '#10B981' },
    ]
  },
}

const activityLog = [
  { text: 'Thomas Moore moved to Selected',       time: '12m ago', color: '#10B981' },
  { text: 'Interview scheduled for David Kim',    time: '1h ago',  color: '#0EA5E9' },
  { text: 'New application: Alexander Wright',    time: '3h ago',  color: '#7C3AED' },
]

export default function Candidates() {
  const [columns, setColumns]     = useState(initialColumns)
  const [search, setSearch]       = useState('')
  const [dragId, setDragId]       = useState(null)
  const [dragFrom, setDragFrom]   = useState(null)
  const dragOver                  = useRef(null)

  // Drag handlers
  const onDragStart = (candidateId, fromCol) => {
    setDragId(candidateId)
    setDragFrom(fromCol)
  }

  const onDrop = (toCol) => {
    if (!dragId || dragFrom === toCol) return
    const candidate = columns[dragFrom].candidates.find(c => c.id === dragId)
    if (!candidate) return
    setColumns(prev => ({
      ...prev,
      [dragFrom]: { ...prev[dragFrom], candidates: prev[dragFrom].candidates.filter(c => c.id !== dragId) },
      [toCol]:    { ...prev[toCol],    candidates: [candidate, ...prev[toCol].candidates] },
    }))
    setDragId(null)
    setDragFrom(null)
  }

  const totalCandidates = Object.values(columns).reduce((a, c) => a + c.candidates.length, 0)

  return (
    <div style={{ flex: 1, background: '#F3F4F6', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>

      {/* Top Bar */}
      <div style={{
        background: '#fff', borderBottom: '1px solid #E5E7EB',
        padding: '14px 28px', display: 'flex', alignItems: 'center',
        justifyContent: 'space-between', gap: '16px',
      }}>
        {/* Left — Title + breadcrumb */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div>
            <div style={{ fontSize: '18px', fontWeight: 700, color: '#111827' }}>
              Candidate Pipeline
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginTop: '2px' }}>
              <span style={{ fontSize: '12px', color: '#9CA3AF' }}>Sr. Product Designer Role</span>
              <ChevronRight size={12} color="#9CA3AF" />
              <span style={{
                fontSize: '11px', fontWeight: 500, color: '#7C3AED',
                background: '#F3F0FF', padding: '2px 8px', borderRadius: '4px',
              }}>Active Tracking</span>
            </div>
          </div>
        </div>

        {/* Center — Search */}
        <div style={{
          display: 'flex', alignItems: 'center', gap: '8px',
          background: '#F9FAFB', border: '1px solid #E5E7EB',
          borderRadius: '8px', padding: '8px 14px', width: '280px',
        }}>
          <Search size={15} color="#9CA3AF" />
          <input
            placeholder="Search candidates..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            style={{ border: 'none', outline: 'none', fontSize: '14px', color: '#374151', width: '100%', background: 'transparent' }}
          />
        </div>

        {/* Right — Filter + New Candidate */}
        <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
          <button style={{
            display: 'flex', alignItems: 'center', gap: '6px',
            padding: '8px 16px', border: '1px solid #E5E7EB',
            borderRadius: '8px', background: '#fff', fontSize: '13px',
            fontWeight: 500, color: '#374151', cursor: 'pointer',
          }}>
            <Filter size={14} /> Filter
          </button>
          <button style={{
            display: 'flex', alignItems: 'center', gap: '6px',
            padding: '8px 16px', border: 'none',
            borderRadius: '8px', background: '#7C3AED', fontSize: '13px',
            fontWeight: 500, color: '#fff', cursor: 'pointer',
          }}>
            <Plus size={14} /> New Candidate
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div style={{ display: 'flex', flex: 1, overflow: 'hidden' }}>

        {/* Kanban Board */}
        <div style={{ flex: 1, overflowX: 'auto', padding: '24px 20px', display: 'flex', gap: '16px' }}>
          {Object.entries(columns).map(([colKey, col]) => {
            const filtered = col.candidates.filter(c =>
              c.name.toLowerCase().includes(search.toLowerCase()) ||
              c.role.toLowerCase().includes(search.toLowerCase())
            )
            return (
              <div
                key={colKey}
                style={{ minWidth: '220px', width: '220px', display: 'flex', flexDirection: 'column', gap: '10px' }}
                onDragOver={e => { e.preventDefault(); dragOver.current = colKey }}
                onDrop={() => onDrop(colKey)}
              >
                {/* Column Header */}
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '4px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '7px' }}>
                    <span style={{ fontSize: '12px', fontWeight: 700, color: '#374151', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                      {col.label}
                    </span>
                    <span style={{
                      fontSize: '11px', fontWeight: 600, color: col.color,
                      background: `${col.color}18`,
                      borderRadius: '10px', padding: '1px 7px',
                    }}>
                      {filtered.length}
                    </span>
                  </div>
                  <button style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#9CA3AF', padding: '2px' }}>
                    <Plus size={15} />
                  </button>
                </div>

                {/* Cards */}
                {filtered.map(candidate => (
                  <div
                    key={candidate.id}
                    draggable
                    onDragStart={() => onDragStart(candidate.id, colKey)}
                    style={{
                      background: '#fff', borderRadius: '10px',
                      border: '1px solid #E5E7EB', padding: '14px',
                      cursor: 'grab', boxShadow: '0 1px 3px rgba(0,0,0,0.06)',
                      transition: 'box-shadow 0.15s',
                    }}
                    onMouseEnter={e => e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.10)'}
                    onMouseLeave={e => e.currentTarget.style.boxShadow = '0 1px 3px rgba(0,0,0,0.06)'}
                  >
                    {/* Card Top */}
                    <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '10px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <div style={{
                          width: '34px', height: '34px', borderRadius: '50%',
                          background: candidate.color, display: 'flex',
                          alignItems: 'center', justifyContent: 'center',
                          fontSize: '12px', fontWeight: 600, color: '#fff', flexShrink: 0,
                        }}>
                          {candidate.avatar}
                        </div>
                        <div>
                          <div style={{ fontSize: '13px', fontWeight: 600, color: '#111827' }}>
                            {candidate.name}
                          </div>
                          <div style={{ fontSize: '11px', color: '#9CA3AF', marginTop: '1px' }}>
                            {candidate.role}
                          </div>
                        </div>
                      </div>
                      <button style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#9CA3AF' }}>
                        <MoreHorizontal size={14} />
                      </button>
                    </div>

                    {/* Exp + Time */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', marginBottom: '12px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '5px', fontSize: '11px', color: '#6B7280' }}>
                        <Briefcase size={11} color="#9CA3AF" /> {candidate.exp}
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '5px', fontSize: '11px', color: '#6B7280' }}>
                        <Clock size={11} color="#9CA3AF" /> {candidate.time}
                      </div>
                    </div>

                    {/* Footer — View + Match */}
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                      <span style={{ fontSize: '12px', color: '#7C3AED', fontWeight: 500, cursor: 'pointer' }}>
                        View Candidate
                      </span>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                        <span style={{ fontSize: '11px', color: '#9CA3AF' }}>JD</span>
                        {/* Match circle */}
                        <div style={{
                          width: '30px', height: '30px', borderRadius: '50%',
                          background: `conic-gradient(#7C3AED ${candidate.match * 3.6}deg, #EDE9FE 0deg)`,
                          display: 'flex', alignItems: 'center', justifyContent: 'center',
                          fontSize: '8px', fontWeight: 700, color: '#7C3AED',
                        }}>
                          <div style={{
                            width: '20px', height: '20px', borderRadius: '50%',
                            background: '#fff', display: 'flex', alignItems: 'center',
                            justifyContent: 'center', fontSize: '8px', fontWeight: 700, color: '#7C3AED',
                          }}>
                            {candidate.match}%
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}

                {/* Add Candidate */}
                <button style={{
                  display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px',
                  width: '100%', padding: '10px', border: '1px dashed #D1D5DB',
                  borderRadius: '10px', background: 'transparent', fontSize: '12px',
                  color: '#9CA3AF', cursor: 'pointer', marginTop: '4px',
                }}>
                  <Plus size={13} /> Add Candidate
                </button>
              </div>
            )
          })}
        </div>

        {/* Right Panel — Pipeline Health */}
        <div style={{
          width: '220px', flexShrink: 0, background: '#fff',
          borderLeft: '1px solid #E5E7EB', padding: '20px 16px',
          display: 'flex', flexDirection: 'column', gap: '20px',
          overflowY: 'auto',
        }}>

          {/* Pipeline Health */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '14px' }}>
              <span style={{ fontSize: '13px', fontWeight: 700, color: '#111827', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                Pipeline Health
              </span>
              <MoreHorizontal size={15} color="#9CA3AF" style={{ cursor: 'pointer' }} />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
              {[
                { label: 'Total Applied', value: '1,284', trend: '+12%',  up: true,  icon: '👥', iconBg: '#F3F0FF', iconColor: '#7C3AED' },
                { label: 'Conversion',    value: '4.2%',  trend: '+0.5%', up: true,  icon: '📈', iconBg: '#ECFDF5', iconColor: '#10B981' },
                { label: 'Interviews',    value: '48',    trend: '',      up: true,  icon: '🎤', iconBg: '#EFF6FF', iconColor: '#0EA5E9' },
                { label: 'Rejected',      value: '842',   trend: '',      up: false, icon: '❌', iconBg: '#FEF2F2', iconColor: '#EF4444' },
              ].map(stat => (
                <div key={stat.label} style={{
                  background: '#F9FAFB', borderRadius: '10px',
                  border: '1px solid #F3F4F6', padding: '10px',
                }}>
                  <div style={{
                    width: '28px', height: '28px', borderRadius: '8px',
                    background: stat.iconBg, display: 'flex',
                    alignItems: 'center', justifyContent: 'center',
                    fontSize: '14px', marginBottom: '8px',
                  }}>
                    {stat.icon}
                  </div>
                  {stat.trend && (
                    <div style={{ display: 'flex', alignItems: 'center', gap: '3px', marginBottom: '2px' }}>
                      {stat.up
                        ? <TrendingUp size={10} color="#10B981" />
                        : <TrendingDown size={10} color="#EF4444" />}
                      <span style={{ fontSize: '10px', color: stat.up ? '#10B981' : '#EF4444', fontWeight: 500 }}>
                        {stat.trend}
                      </span>
                    </div>
                  )}
                  <div style={{ fontSize: '16px', fontWeight: 700, color: '#111827' }}>{stat.value}</div>
                  <div style={{ fontSize: '10px', color: '#9CA3AF', marginTop: '1px' }}>{stat.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Activity Log */}
          <div>
            <div style={{ fontSize: '13px', fontWeight: 700, color: '#111827', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '12px' }}>
              Activity Log
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {activityLog.map((log, i) => (
                <div key={i} style={{ display: 'flex', gap: '8px', alignItems: 'flex-start' }}>
                  <div style={{
                    width: '7px', height: '7px', borderRadius: '50%',
                    background: log.color, flexShrink: 0, marginTop: '4px',
                  }} />
                  <div>
                    <div style={{ fontSize: '12px', color: '#374151', lineHeight: '1.4' }}>{log.text}</div>
                    <div style={{ fontSize: '11px', color: '#9CA3AF', marginTop: '2px' }}>{log.time}</div>
                  </div>
                </div>
              ))}
            </div>
            <div style={{ marginTop: '12px', display: 'flex', alignItems: 'center', gap: '4px', cursor: 'pointer' }}>
              <span style={{ fontSize: '12px', color: '#7C3AED', fontWeight: 500 }}>View full activity</span>
              <ChevronRight size={12} color="#7C3AED" />
            </div>
          </div>

          {/* Bottom User */}
          <div style={{ marginTop: 'auto', borderTop: '1px solid #F3F4F6', paddingTop: '14px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', justifyContent: 'space-between' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <div style={{
                  width: '32px', height: '32px', borderRadius: '50%',
                  background: '#7C3AED', display: 'flex', alignItems: 'center',
                  justifyContent: 'center', fontSize: '12px', fontWeight: 600, color: '#fff',
                }}>KM</div>
                <div>
                  <div style={{ fontSize: '12px', fontWeight: 600, color: '#111827' }}>Kathryn Murphy</div>
                  <div style={{ fontSize: '11px', color: '#9CA3AF' }}>HR Director · Recruiting</div>
                </div>
              </div>
              <Settings size={14} color="#9CA3AF" style={{ cursor: 'pointer' }} />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}