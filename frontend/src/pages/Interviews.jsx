
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  Clock, Search, Bell, ChevronDown, Plus,
  Video, Users, MapPin, MoreHorizontal, CheckCircle,
  XCircle, AlertCircle, Filter, Eye,
  RefreshCw, CalendarDays, Briefcase, X
} from 'lucide-react'

// ─── Data ──────────────────────────────────────────────────────────────────────
const stats = [
  { label: 'Total Interviews',  value: 248, delta: '+12 this week',  icon: CalendarDays, bg: '#F5F3FF', color: '#7C3AED' },
  { label: 'Scheduled',         value: 34,  delta: '8 today',        icon: Clock,        bg: '#EFF6FF', color: '#2563EB' },
  { label: 'Completed',         value: 186, delta: '+24 this month', icon: CheckCircle,  bg: '#ECFDF5', color: '#059669' },
  { label: 'Pending Feedback',  value: 19,  delta: 'Action needed',  icon: AlertCircle,  bg: '#FFFBEB', color: '#D97706' },
  { label: 'Cancelled',         value: 9,   delta: '-3 vs last week',icon: XCircle,      bg: '#FEF2F2', color: '#EF4444' },
]

const upcoming = [
  { id:1, name:'Priya Nair',      role:'UX Researcher',       round:'Final Round',      date:'Today',    time:'10:00 AM', type:'Online',  status:'scheduled', avatar:['#EDE9FE','#7C3AED'] },
  { id:2, name:'Marcus Chen',     role:'Lead UX Engineer',    round:'Technical',        date:'Today',    time:'2:30 PM',  type:'Online',  status:'scheduled', avatar:['#EFF6FF','#2563EB'] },
  { id:3, name:'Sarah Jenkins',   role:'Design Manager',      round:'Culture Fit',      date:'Tomorrow', time:'11:00 AM', type:'Offline', status:'scheduled', avatar:['#ECFDF5','#059669'] },
  { id:4, name:'Jameson Thorne',  role:'Product Designer',    round:'Portfolio Review', date:'Jun 12',   time:'3:00 PM',  type:'Online',  status:'pending',   avatar:['#FFF7ED','#EA580C'] },
  { id:5, name:'Elena Rodriguez', role:'Senior UI Developer', round:'Technical',        date:'Jun 13',   time:'9:30 AM',  type:'Online',  status:'scheduled', avatar:['#FDF2F8','#A21CAF'] },
]

const tableData = [
  { id:1, name:'Alexandra Vance', role:'Sr. Product Designer', round:'Final',        date:'Jun 10, 10:00 AM', type:'Online',  status:'scheduled'        },
  { id:2, name:'Marcus Chen',     role:'Lead UX Engineer',     round:'Technical',    date:'Jun 10, 2:30 PM',  type:'Online',  status:'scheduled'        },
  { id:3, name:'Lena Park',       role:'Frontend Engineer',    round:'HR Screening', date:'Jun 9, 11:00 AM',  type:'Online',  status:'completed'        },
  { id:4, name:'Noah Williams',   role:'Data Scientist',       round:'Case Study',   date:'Jun 9, 3:00 PM',   type:'Online',  status:'pending_feedback' },
  { id:5, name:'Sara Kim',        role:'Product Manager',      round:'Culture Fit',  date:'Jun 8, 10:30 AM',  type:'Offline', status:'completed'        },
  { id:6, name:"James O'Brien",   role:'Backend Engineer',     round:'Technical',    date:'Jun 8, 2:00 PM',   type:'Online',  status:'cancelled'        },
  { id:7, name:'Priya Nair',      role:'UX Researcher',        round:'Final',        date:'Jun 10, 10:00 AM', type:'Online',  status:'scheduled'        },
  { id:8, name:'Tom Carter',      role:'DevOps Engineer',      round:'Technical',    date:'Jun 7, 9:00 AM',   type:'Online',  status:'completed'        },
]

const summaryData = [
  { status: 'Scheduled',       count: 34,  pct: 14, color: '#7C3AED', bg: '#F5F3FF', bar: '#7C3AED' },
  { status: 'Completed',       count: 186, pct: 75, color: '#059669', bg: '#ECFDF5', bar: '#059669' },
  { status: 'Pending Feedback',count: 19,  pct: 8,  color: '#D97706', bg: '#FFFBEB', bar: '#D97706' },
  { status: 'Cancelled',       count: 9,   pct: 3,  color: '#EF4444', bg: '#FEF2F2', bar: '#EF4444' },
]

const statusMeta = {
  scheduled:        { label:'Scheduled',       bg:'#F5F3FF', color:'#7C3AED' },
  completed:        { label:'Completed',        bg:'#ECFDF5', color:'#059669' },
  pending_feedback: { label:'Pending Feedback', bg:'#FFFBEB', color:'#D97706' },
  pending:          { label:'Pending',          bg:'#FFFBEB', color:'#D97706' },
  cancelled:        { label:'Cancelled',        bg:'#FEF2F2', color:'#EF4444' },
}

const typeMeta = {
  'Online':  { color:'#7C3AED' },
  'Offline': { color:'#059669' },
}

const avatarPalette = [
  ['#EDE9FE','#7C3AED'], ['#EFF6FF','#2563EB'], ['#ECFDF5','#059669'],
  ['#FFF7ED','#EA580C'], ['#FDF2F8','#A21CAF'], ['#F0FDF4','#16A34A'],
  ['#FEF2F2','#EF4444'], ['#FFFBEB','#D97706'],
]

const getInitials = n => n.split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase()

// ─── Sub-components ────────────────────────────────────────────────────────────
function StatCard({ label, value, delta, icon: Icon, bg, color }) {
  return (
    <div style={{
      background:'#fff', border:'1px solid #EDE9FE', borderRadius:14,
      padding:20, display:'flex', flexDirection:'column', gap:12,
      transition:'box-shadow 0.2s', cursor:'default',
    }}
      onMouseEnter={e => e.currentTarget.style.boxShadow = '0 4px 20px rgba(124,58,237,0.10)'}
      onMouseLeave={e => e.currentTarget.style.boxShadow = 'none'}
    >
      <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between' }}>
        <span style={{ fontSize:13, color:'#6B7280', fontWeight:500 }}>{label}</span>
        <div style={{ width:36, height:36, borderRadius:10, background:bg, display:'flex', alignItems:'center', justifyContent:'center' }}>
          <Icon size={17} color={color} />
        </div>
      </div>
      <div>
        <div style={{ fontSize:28, fontWeight:800, color:'#111827', fontFamily:'Sora, sans-serif', lineHeight:1 }}>{value}</div>
        <div style={{ fontSize:12, color:'#9CA3AF', marginTop:4 }}>{delta}</div>
      </div>
    </div>
  )
}

function StatusBadge({ status }) {
  const m = statusMeta[status] || statusMeta.scheduled
  return (
    <span style={{
      background:m.bg, color:m.color, fontSize:11, fontWeight:600,
      borderRadius:20, padding:'3px 10px', whiteSpace:'nowrap',
    }}>{m.label}</span>
  )
}

function TypeBadge({ type }) {
  const color = typeMeta[type]?.color || '#7C3AED'
  const bg    = type === 'Online' ? '#F5F3FF' : '#ECFDF5'
  return (
    <span style={{ background:bg, color, fontSize:11, fontWeight:600, borderRadius:20, padding:'3px 10px', whiteSpace:'nowrap' }}>
      {type}
    </span>
  )
}

function Avatar({ name, colors, size = 36 }) {
  const [bg, fg] = colors
  return (
    <div style={{
      width:size, height:size, borderRadius:'50%', background:bg,
      display:'flex', alignItems:'center', justifyContent:'center',
      fontSize: size > 36 ? 15 : 12, fontWeight:700, color:fg,
      flexShrink:0, fontFamily:'Sora, sans-serif',
    }}>
      {getInitials(name)}
    </div>
  )
}

// ─── View Modal ────────────────────────────────────────────────────────────────
function ViewModal({ interview, onClose }) {
  if (!interview) return null
  const fields = [
    ['Candidate Name', interview.name],
    ['Position',       interview.role],
    ['Round',          interview.round],
    ['Date',           interview.date],
    ['Time',           interview.time || '—'],
    ['Interview Type', interview.type],
  ]
  return (
    <div style={{
      position:'fixed', inset:0, background:'rgba(0,0,0,0.35)',
      display:'flex', alignItems:'center', justifyContent:'center',
      zIndex:1000,
    }} onClick={onClose}>
      <div style={{
        background:'#fff', borderRadius:16, padding:32, width:420,
        boxShadow:'0 20px 60px rgba(0,0,0,0.18)', position:'relative',
      }} onClick={e => e.stopPropagation()}>
        {/* Header */}
        <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', marginBottom:20 }}>
          <div>
            <h2 style={{ fontSize:17, fontWeight:800, color:'#111827', margin:0, fontFamily:'Sora, sans-serif' }}>
              Interview Details
            </h2>
            <p style={{ fontSize:12, color:'#9CA3AF', margin:0, marginTop:3 }}>Full interview information</p>
          </div>
          <button onClick={onClose} style={{ width:32, height:32, borderRadius:8, border:'1px solid #E5E7EB', background:'#fff', cursor:'pointer', display:'flex', alignItems:'center', justifyContent:'center' }}>
            <X size={15} color="#6B7280" />
          </button>
        </div>

        {/* Avatar + name */}
        <div style={{ display:'flex', alignItems:'center', gap:12, marginBottom:20, padding:'14px 16px', background:'#F5F3FF', borderRadius:10 }}>
          <div style={{ width:44, height:44, borderRadius:'50%', background:'#EDE9FE', display:'flex', alignItems:'center', justifyContent:'center', fontSize:15, fontWeight:700, color:'#7C3AED', fontFamily:'Sora, sans-serif' }}>
            {getInitials(interview.name)}
          </div>
          <div>
            <div style={{ fontSize:14, fontWeight:700, color:'#111827', fontFamily:'Sora, sans-serif' }}>{interview.name}</div>
            <div style={{ fontSize:12, color:'#7C3AED', fontWeight:500 }}>{interview.role}</div>
          </div>
          <div style={{ marginLeft:'auto' }}><StatusBadge status={interview.status} /></div>
        </div>

        {/* Fields */}
        <div style={{ display:'flex', flexDirection:'column', gap:10 }}>
          {fields.map(([label, val]) => (
            <div key={label} style={{ display:'flex', justifyContent:'space-between', padding:'8px 0', borderBottom:'1px solid #F3F4F6' }}>
              <span style={{ fontSize:12, color:'#9CA3AF', fontWeight:500 }}>{label}</span>
              <span style={{ fontSize:13, fontWeight:600, color:'#111827' }}>{val}</span>
            </div>
          ))}
        </div>

        <button onClick={onClose} style={{
          marginTop:20, width:'100%', padding:'10px 0',
          background:'#7C3AED', color:'#fff', border:'none',
          borderRadius:9, fontSize:13, fontWeight:600, cursor:'pointer',
          fontFamily:'DM Sans, sans-serif',
        }}>
          Close
        </button>
      </div>
    </div>
  )
}

// ─── Main ──────────────────────────────────────────────────────────────────────
export default function Interviews() {
  const navigate = useNavigate()
  const [search,       setSearch]    = useState('')
  const [statusFilter, setStatus]    = useState('All')
  const [roundFilter,  setRound]     = useState('All Rounds')
  const [roleFilter,   setRole]      = useState('All Roles')
  const [openMenu,     setOpenMenu]  = useState(null)
  const [modalData,    setModalData] = useState(null)

  const filteredTable = tableData.filter(r => {
    if (statusFilter !== 'All' && r.status !== statusFilter.toLowerCase().replace(/ /g, '_')) return false
    if (roundFilter  !== 'All Rounds' && r.round !== roundFilter) return false
    if (roleFilter   !== 'All Roles'  && !r.role.includes(roleFilter)) return false
    if (search && !r.name.toLowerCase().includes(search.toLowerCase()) && !r.role.toLowerCase().includes(search.toLowerCase())) return false
    return true
  })

  const thStyle = {
    padding:'10px 16px', textAlign:'left', fontSize:11,
    fontWeight:700, color:'#9CA3AF', letterSpacing:'0.06em',
    borderBottom:'1px solid #F3F0FF', whiteSpace:'nowrap', background:'#FAFAFA',
  }

  return (
    <div style={{ flex:1, background:'#F5F3FF', minHeight:'100vh', fontFamily:'DM Sans, sans-serif' }}>
      <link href="https://fonts.googleapis.com/css2?family=Sora:wght@400;600;700;800&family=DM+Sans:wght@400;500;600;700&display=swap" rel="stylesheet" />

      {/* Modal */}
      <ViewModal interview={modalData} onClose={() => setModalData(null)} />

      {/* ── Page Header ── */}
      <div style={{
        background:'#fff', borderBottom:'1px solid #EDE9FE',
        padding:'16px 32px', display:'flex', alignItems:'center', justifyContent:'space-between',
      }}>
        <div>
          <h1 style={{ fontSize:22, fontWeight:800, color:'#111827', margin:0, fontFamily:'Sora, sans-serif' }}>Interviews</h1>
          <p style={{ fontSize:13, color:'#9CA3AF', margin:0, marginTop:2 }}>Manage and track candidate interview processes</p>
        </div>
        <div style={{ display:'flex', alignItems:'center', gap:12 }}>
          <div style={{ position:'relative' }}>
            <Search size={14} color="#9CA3AF" style={{ position:'absolute', left:12, top:'50%', transform:'translateY(-50%)' }} />
            <input
              value={search} onChange={e => setSearch(e.target.value)}
              placeholder="Search interviews..."
              style={{
                paddingLeft:34, paddingRight:14, paddingTop:9, paddingBottom:9,
                border:'1px solid #E5E7EB', borderRadius:8, fontSize:13,
                color:'#111827', outline:'none', width:220, background:'#FAFAFA',
                fontFamily:'DM Sans, sans-serif',
              }}
            />
          </div>
          
          <button style={{
            display:'flex', alignItems:'center', gap:7, padding:'9px 18px',
            background:'#7C3AED', color:'#fff', border:'none', borderRadius:9,
            fontSize:13, fontWeight:600, cursor:'pointer', fontFamily:'DM Sans, sans-serif',
          }}>
            <Plus size={15} /> Schedule Interview
          </button>
        </div>
      </div>

      {/* ── Body ── */}
      <div style={{ padding:'28px 32px', display:'flex', flexDirection:'column', gap:24 }}>

        {/* Stats */}
        <div style={{ display:'grid', gridTemplateColumns:'repeat(5,1fr)', gap:16 }}>
          {stats.map(s => <StatCard key={s.label} {...s} />)}
        </div>

        {/* Filters */}
        <div style={{
          background:'#fff', border:'1px solid #EDE9FE', borderRadius:12,
          padding:'14px 20px', display:'flex', alignItems:'center', gap:12, flexWrap:'wrap',
        }}>
          <Filter size={14} color="#7C3AED" />
          <span style={{ fontSize:13, fontWeight:600, color:'#374151', marginRight:4 }}>Filters:</span>
          {[
            ['Status',   ['All','Scheduled','Completed','Pending Feedback','Cancelled'], statusFilter, setStatus],
            ['Round',    ['All Rounds','HR Screening','Technical','Portfolio Review','Culture Fit','Final'], roundFilter, setRound],
            ['Job Role', ['All Roles','Engineer','Designer','Manager','Researcher'], roleFilter, setRole],
          ].map(([label, opts, val, set]) => (
            <div key={label} style={{ position:'relative' }}>
              <select value={val} onChange={e => set(e.target.value)} style={{
                appearance:'none', padding:'7px 28px 7px 12px',
                border:'1px solid #E5E7EB', borderRadius:20,
                fontSize:12, fontWeight:500, color:'#374151',
                background:'#fff', cursor:'pointer', outline:'none',
                fontFamily:'DM Sans, sans-serif',
              }}>
                {opts.map(o => <option key={o}>{o}</option>)}
              </select>
              <ChevronDown size={12} color="#6B7280" style={{ position:'absolute', right:10, top:'50%', transform:'translateY(-50%)', pointerEvents:'none' }} />
            </div>
          ))}
          <div style={{ position:'relative', marginLeft:'auto' }}>
            <select style={{
              appearance:'none', padding:'7px 28px 7px 12px',
              border:'1px solid #E5E7EB', borderRadius:20,
              fontSize:12, fontWeight:500, color:'#374151',
              background:'#fff', cursor:'pointer', outline:'none',
              fontFamily:'DM Sans, sans-serif',
            }}>
              {['This Week','This Month','Last 30 Days','Custom Range'].map(o => <option key={o}>{o}</option>)}
            </select>
            <ChevronDown size={12} color="#6B7280" style={{ position:'absolute', right:10, top:'50%', transform:'translateY(-50%)', pointerEvents:'none' }} />
          </div>
        </div>

        {/* ── Upcoming Interviews — TABLE ── */}
        <div style={{ background:'#fff', border:'1px solid #EDE9FE', borderRadius:14, overflow:'hidden' }}>
          <div style={{ padding:'18px 24px', borderBottom:'1px solid #F3F0FF', display:'flex', alignItems:'center', justifyContent:'space-between' }}>
            <div style={{ display:'flex', alignItems:'center', gap:8 }}>
              <Clock size={15} color="#7C3AED" />
              <span style={{ fontSize:15, fontWeight:700, color:'#111827', fontFamily:'Sora, sans-serif' }}>Upcoming Interviews</span>
              <span style={{ background:'#F5F3FF', color:'#7C3AED', fontSize:11, fontWeight:600, borderRadius:20, padding:'2px 10px' }}>{upcoming.length}</span>
            </div>
            
          </div>

          <div style={{ overflowX:'auto' }}>
            <table style={{ width:'100%', borderCollapse:'collapse', fontSize:13 }}>
              <thead>
                <tr>
                  {['Candidate Name','Position','Interview Round','Date','Time','Interview Type','Status','Actions'].map(h => (
                    <th key={h} style={thStyle}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {upcoming.map((u, i) => (
                  <tr key={u.id}
                    style={{ borderBottom:'1px solid #F9F8FF', transition:'background 0.15s' }}
                    onMouseEnter={e => e.currentTarget.style.background = '#FAFAFA'}
                    onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
                  >
                    <td style={{ padding:'12px 16px' }}>
                      <div style={{ display:'flex', alignItems:'center', gap:10 }}>
                        <Avatar name={u.name} colors={u.avatar} size={34} />
                        <span style={{ fontWeight:600, color:'#111827' }}>{u.name}</span>
                      </div>
                    </td>
                    <td style={{ padding:'12px 16px', color:'#6B7280' }}>{u.role}</td>
                    <td style={{ padding:'12px 16px' }}>
                      <span style={{ background:'#F5F3FF', color:'#7C3AED', fontSize:11, fontWeight:500, borderRadius:6, padding:'3px 8px' }}>{u.round}</span>
                    </td>
                    <td style={{ padding:'12px 16px', color:'#374151', fontWeight:600, fontSize:12 }}>{u.date}</td>
                    <td style={{ padding:'12px 16px', color:'#6B7280', fontSize:12 }}>
                      <div style={{ display:'flex', alignItems:'center', gap:4 }}>
                        <Clock size={11} color="#9CA3AF" /> {u.time}
                      </div>
                    </td>
                    <td style={{ padding:'12px 16px' }}><TypeBadge type={u.type} /></td>
                    <td style={{ padding:'12px 16px' }}><StatusBadge status={u.status} /></td>
                    <td style={{ padding:'12px 16px' }}>
                      <button
                        onClick={() => setModalData(u)}
                        style={{
                          padding:'6px 16px', background:'#7C3AED', color:'#fff',
                          border:'none', borderRadius:7, fontSize:12, fontWeight:600,
                          cursor:'pointer',
                        }}
                      >
                        View
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* ── Interview Tracking Table ── */}
        <div style={{ background:'#fff', border:'1px solid #EDE9FE', borderRadius:14, overflow:'hidden' }}>
          <div style={{ padding:'18px 24px', borderBottom:'1px solid #F3F0FF', display:'flex', alignItems:'center', gap:8 }}>
            <Briefcase size={15} color="#7C3AED" />
            <span style={{ fontSize:15, fontWeight:700, color:'#111827', fontFamily:'Sora, sans-serif' }}>Interview Tracking</span>
            <span style={{ background:'#F5F3FF', color:'#7C3AED', fontSize:11, fontWeight:600, borderRadius:20, padding:'2px 10px' }}>{filteredTable.length}</span>
          </div>

          <div style={{ overflowX:'auto' }}>
            <table style={{ width:'100%', borderCollapse:'collapse', fontSize:13 }}>
              <thead>
                <tr>
                  {['Candidate Name','Position','Interview Round','Date & Time','Interview Type','Status','Actions'].map(h => (
                    <th key={h} style={thStyle}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filteredTable.map((row, i) => {
                  const [bg, fg] = avatarPalette[i % avatarPalette.length]
                  return (
                    <tr key={row.id}
                      style={{ borderBottom:'1px solid #F9F8FF', transition:'background 0.15s' }}
                      onMouseEnter={e => e.currentTarget.style.background = '#FAFAFA'}
                      onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
                    >
                      <td style={{ padding:'12px 16px' }}>
                        <div style={{ display:'flex', alignItems:'center', gap:10 }}>
                          <div style={{ width:32, height:32, borderRadius:'50%', background:bg, display:'flex', alignItems:'center', justifyContent:'center', fontSize:11, fontWeight:700, color:fg, fontFamily:'Sora, sans-serif', flexShrink:0 }}>
                            {getInitials(row.name)}
                          </div>
                          <span style={{ fontWeight:600, color:'#111827' }}>{row.name}</span>
                        </div>
                      </td>
                      <td style={{ padding:'12px 16px', color:'#6B7280', whiteSpace:'nowrap' }}>{row.role}</td>
                      <td style={{ padding:'12px 16px' }}>
                        <span style={{ background:'#F5F3FF', color:'#7C3AED', fontSize:11, fontWeight:500, borderRadius:6, padding:'3px 8px' }}>{row.round}</span>
                      </td>
                      <td style={{ padding:'12px 16px', color:'#374151', whiteSpace:'nowrap', fontSize:12 }}>{row.date}</td>
                      <td style={{ padding:'12px 16px' }}><TypeBadge type={row.type} /></td>
                      <td style={{ padding:'12px 16px' }}><StatusBadge status={row.status} /></td>
                      <td style={{ padding:'12px 16px' }}>
                        <div style={{ position:'relative' }}>
                          <button
                            onClick={() => setOpenMenu(openMenu === row.id ? null : row.id)}
                            style={{
                              width:30, height:30, borderRadius:7, border:'1px solid #E5E7EB',
                              background: openMenu === row.id ? '#F5F3FF' : '#fff',
                              cursor:'pointer', display:'flex', alignItems:'center', justifyContent:'center',
                            }}
                          >
                            <MoreHorizontal size={14} color={openMenu === row.id ? '#7C3AED' : '#6B7280'} />
                          </button>
                          {openMenu === row.id && (
                            <div style={{
                              position:'absolute', right:0, top:34, background:'#fff',
                              border:'1px solid #EDE9FE', borderRadius:10, padding:6,
                              zIndex:10, minWidth:160, boxShadow:'0 8px 24px rgba(0,0,0,0.10)',
                            }}>
                              {[
                                { label:'View Details', icon: Eye,       action: () => { navigate('/candidate/' + row.id); setOpenMenu(null) } },
                                { label:'Reschedule',   icon: RefreshCw,  action: () => { navigate('/schedule-interview');  setOpenMenu(null) } },
                              ].map(({ label, icon: Icon, action }) => (
                                <button key={label} onClick={action} style={{
                                  display:'flex', alignItems:'center', gap:8, width:'100%',
                                  padding:'8px 12px', border:'none', background:'none',
                                  fontSize:12, color:'#374151', cursor:'pointer', borderRadius:7,
                                  textAlign:'left', fontFamily:'DM Sans, sans-serif',
                                }}
                                  onMouseEnter={e => e.currentTarget.style.background = '#F5F3FF'}
                                  onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
                                >
                                  <Icon size={13} color="#7C3AED" /> {label}
                                </button>
                              ))}
                            </div>
                          )}
                        </div>
                      </td>
                    </tr>
                  )
                })}
                {filteredTable.length === 0 && (
                  <tr>
                    <td colSpan={7} style={{ padding:'40px 0', textAlign:'center', color:'#9CA3AF', fontSize:14 }}>
                      No interviews match the selected filters.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* ── Interview Summary ── */}
        <div style={{ background:'#fff', border:'1px solid #EDE9FE', borderRadius:14, overflow:'hidden' }}>
          <div style={{ padding:'18px 24px', borderBottom:'1px solid #F3F0FF', display:'flex', alignItems:'center', gap:8 }}>
            <CalendarDays size={15} color="#7C3AED" />
            <span style={{ fontSize:15, fontWeight:700, color:'#111827', fontFamily:'Sora, sans-serif' }}>Interview Summary</span>
            <span style={{ background:'#F5F3FF', color:'#7C3AED', fontSize:11, fontWeight:600, borderRadius:20, padding:'2px 10px' }}>Overview</span>
          </div>

          <div style={{ overflowX:'auto' }}>
            <table style={{ width:'100%', borderCollapse:'collapse', fontSize:13 }}>
              <thead>
                <tr>
                  {['Interview Status','Total Count','Progress'].map(h => (
                    <th key={h} style={thStyle}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {summaryData.map((row, i) => (
                  <tr key={row.status}
                    style={{ borderBottom: i < summaryData.length - 1 ? '1px solid #F9F8FF' : 'none', transition:'background 0.15s' }}
                    onMouseEnter={e => e.currentTarget.style.background = '#FAFAFA'}
                    onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
                  >
                    <td style={{ padding:'14px 16px' }}>
                      <div style={{ display:'flex', alignItems:'center', gap:10 }}>
                        <div style={{ width:10, height:10, borderRadius:'50%', background:row.color, flexShrink:0 }} />
                        <span style={{ fontWeight:600, color:'#111827' }}>{row.status}</span>
                      </div>
                    </td>
                    <td style={{ padding:'14px 16px' }}>
                      <span style={{ background:row.bg, color:row.color, fontSize:13, fontWeight:700, borderRadius:8, padding:'4px 14px' }}>
                        {row.count}
                      </span>
                    </td>
                    <td style={{ padding:'14px 16px', minWidth:200 }}>
                      <div style={{ display:'flex', alignItems:'center', gap:10 }}>
                        <div style={{ flex:1, height:8, background:'#F3F4F6', borderRadius:99, overflow:'hidden' }}>
                          <div style={{ height:'100%', width:`${row.pct}%`, background:row.bar, borderRadius:99, transition:'width 0.6s ease' }} />
                        </div>
                        <span style={{ fontSize:12, fontWeight:700, color:row.color, minWidth:34 }}>{row.pct}%</span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

      </div>

      <style>{`
        * { box-sizing: border-box; }
        input::placeholder { color: #9CA3AF; }
        select option { font-family: 'DM Sans', sans-serif; }
      `}</style>
    </div>
  )
}