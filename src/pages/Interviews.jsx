import { useState } from 'react'
import {
  Calendar, Clock, Search, Bell, ChevronDown, Plus,
  Video, Users, MapPin, MoreHorizontal, CheckCircle,
  XCircle, AlertCircle, RefreshCw, Filter, Eye,
  MessageSquare, CalendarDays, TrendingUp, UserCheck,
  ChevronLeft, ChevronRight, Sparkles, Briefcase
} from 'lucide-react'

// ─── Data ──────────────────────────────────────────────────────────────────────
const stats = [
  { label: 'Total Interviews',    value: 248, delta: '+12 this week', icon: CalendarDays, bg: '#F5F3FF', color: '#7C3AED' },
  { label: 'Scheduled',           value: 34,  delta: '8 today',       icon: Clock,        bg: '#EFF6FF', color: '#2563EB' },
  { label: 'Completed',           value: 186, delta: '+24 this month', icon: CheckCircle,  bg: '#ECFDF5', color: '#059669' },
  { label: 'Pending Feedback',    value: 19,  delta: 'Action needed',  icon: AlertCircle,  bg: '#FFFBEB', color: '#D97706' },
  { label: 'Cancelled',           value: 9,   delta: '-3 vs last week',icon: XCircle,      bg: '#FEF2F2', color: '#EF4444' },
]

const upcoming = [
  { id:1, name:'Priya Nair',        role:'UX Researcher',          round:'Final Round',    date:'Today',    time:'10:00 AM', type:'Video', status:'scheduled',  avatar:['#EDE9FE','#7C3AED'] },
  { id:2, name:'Marcus Chen',       role:'Lead UX Engineer',       round:'Technical',      date:'Today',    time:'2:30 PM',  type:'Video', status:'scheduled',  avatar:['#EFF6FF','#2563EB'] },
  { id:3, name:'Sarah Jenkins',     role:'Design Manager',         round:'Culture Fit',    date:'Tomorrow', time:'11:00 AM', type:'On-site', status:'scheduled', avatar:['#ECFDF5','#059669'] },
  { id:4, name:'Jameson Thorne',    role:'Product Designer',       round:'Portfolio Review',date:'Jun 12', time:'3:00 PM',  type:'Video', status:'pending',    avatar:['#FFF7ED','#EA580C'] },
  { id:5, name:'Elena Rodriguez',   role:'Senior UI Developer',    round:'Technical',      date:'Jun 13',   time:'9:30 AM',  type:'Phone', status:'scheduled',  avatar:['#FDF2F8','#A21CAF'] },
]

const tableData = [
  { id:1, name:'Alexandra Vance', role:'Sr. Product Designer',  interviewer:'Riya Mehta',    round:'Final',           date:'Jun 10, 10:00 AM', type:'Video',   status:'scheduled'       },
  { id:2, name:'Marcus Chen',     role:'Lead UX Engineer',      interviewer:'Dev Kapoor',     round:'Technical',       date:'Jun 10, 2:30 PM',  type:'Video',   status:'scheduled'       },
  { id:3, name:'Lena Park',       role:'Frontend Engineer',     interviewer:'Arun Sharma',    round:'HR Screening',    date:'Jun 9, 11:00 AM',  type:'Phone',   status:'completed'       },
  { id:4, name:'Noah Williams',   role:'Data Scientist',        interviewer:'Pooja Iyer',     round:'Case Study',      date:'Jun 9, 3:00 PM',   type:'Video',   status:'pending_feedback'},
  { id:5, name:'Sara Kim',        role:'Product Manager',       interviewer:'Riya Mehta',     round:'Culture Fit',     date:'Jun 8, 10:30 AM',  type:'On-site', status:'completed'       },
  { id:6, name:'James O\'Brien',  role:'Backend Engineer',      interviewer:'Dev Kapoor',     round:'Technical',       date:'Jun 8, 2:00 PM',   type:'Video',   status:'cancelled'       },
  { id:7, name:'Priya Nair',      role:'UX Researcher',         interviewer:'Arun Sharma',    round:'Final',           date:'Jun 10, 10:00 AM', type:'Video',   status:'scheduled'       },
  { id:8, name:'Tom Carter',      role:'DevOps Engineer',       interviewer:'Pooja Iyer',     round:'Technical',       date:'Jun 7, 9:00 AM',   type:'Video',   status:'completed'       },
]

const timeline = [
  { time:'2h ago',  icon: CheckCircle, color:'#059669', bg:'#ECFDF5', text:'Interview completed', sub:'Alexandra Vance — Sr. Product Designer — Final Round' },
  { time:'4h ago',  icon: Calendar,    color:'#7C3AED', bg:'#F5F3FF', text:'Interview scheduled', sub:'Priya Nair — UX Researcher — Jun 10, 10:00 AM' },
  { time:'5h ago',  icon: MessageSquare,color:'#2563EB',bg:'#EFF6FF', text:'Feedback submitted',  sub:'Lena Park — Frontend Engineer — by Arun Sharma' },
  { time:'Yesterday',icon:RefreshCw,   color:'#D97706', bg:'#FFFBEB', text:'Interview rescheduled',sub:'Noah Williams — Data Scientist — moved to Jun 14' },
  { time:'Yesterday',icon: XCircle,    color:'#EF4444', bg:'#FEF2F2', text:'Interview cancelled',  sub:'James O\'Brien — Backend Engineer — Technical Round' },
  { time:'Jun 8',   icon: CheckCircle, color:'#059669', bg:'#ECFDF5', text:'Interview completed',  sub:'Sara Kim — Product Manager — Culture Fit' },
]

const statusMeta = {
  scheduled:        { label:'Scheduled',        bg:'#F5F3FF', color:'#7C3AED' },
  completed:        { label:'Completed',         bg:'#ECFDF5', color:'#059669' },
  pending_feedback: { label:'Pending Feedback',  bg:'#FFFBEB', color:'#D97706' },
  pending:          { label:'Pending',           bg:'#FFFBEB', color:'#D97706' },
  cancelled:        { label:'Cancelled',         bg:'#FEF2F2', color:'#EF4444' },
}

const typeMeta = {
  'Video':   { icon: Video,   color:'#7C3AED' },
  'On-site': { icon: MapPin,  color:'#059669' },
  'Phone':   { icon: Users,   color:'#2563EB' },
}

// Calendar data
const calendarDays = [
  { d:1 }, { d:2 }, { d:3 }, { d:4 }, { d:5 }, { d:6 }, { d:7 },
  { d:8 }, { d:9 }, { d:10, interviews:3, active:true }, { d:11 }, { d:12, interviews:2 }, { d:13, interviews:1 }, { d:14 },
  { d:15 }, { d:16 }, { d:17, interviews:1 }, { d:18 }, { d:19, interviews:4 }, { d:20 }, { d:21 },
  { d:22, interviews:2 }, { d:23 }, { d:24, interviews:1 }, { d:25, interviews:3 }, { d:26 }, { d:27 }, { d:28 },
  { d:29 }, { d:30 },
]

const getInitials = n => n.split(' ').map(w=>w[0]).join('').slice(0,2).toUpperCase()

// ─── Sub-components ────────────────────────────────────────────────────────────
function StatCard({ label, value, delta, icon: Icon, bg, color }) {
  return (
    <div style={{
      background:'#fff', border:'1px solid #EDE9FE', borderRadius:'14px',
      padding:'20px', display:'flex', flexDirection:'column', gap:'12px',
      transition:'box-shadow 0.2s', cursor:'default',
    }}
      onMouseEnter={e=>e.currentTarget.style.boxShadow='0 4px 20px rgba(124,58,237,0.10)'}
      onMouseLeave={e=>e.currentTarget.style.boxShadow='none'}
    >
      <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between' }}>
        <span style={{ fontSize:'13px', color:'#6B7280', fontWeight:500 }}>{label}</span>
        <div style={{ width:36, height:36, borderRadius:10, background:bg, display:'flex', alignItems:'center', justifyContent:'center' }}>
          <Icon size={17} color={color} />
        </div>
      </div>
      <div>
        <div style={{ fontSize:'28px', fontWeight:800, color:'#111827', fontFamily:'Sora, sans-serif', lineHeight:1 }}>{value}</div>
        <div style={{ fontSize:'12px', color:'#9CA3AF', marginTop:4 }}>{delta}</div>
      </div>
    </div>
  )
}

function StatusBadge({ status }) {
  const m = statusMeta[status] || statusMeta.scheduled
  return (
    <span style={{
      background:m.bg, color:m.color, fontSize:'11px', fontWeight:600,
      borderRadius:'20px', padding:'3px 10px', whiteSpace:'nowrap',
    }}>{m.label}</span>
  )
}

function Avatar({ name, colors, size=36 }) {
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

const avatarPalette = [
  ['#EDE9FE','#7C3AED'], ['#EFF6FF','#2563EB'], ['#ECFDF5','#059669'],
  ['#FFF7ED','#EA580C'], ['#FDF2F8','#A21CAF'], ['#F0FDF4','#16A34A'],
  ['#FEF2F2','#EF4444'], ['#FFFBEB','#D97706'],
]

// ─── Main ──────────────────────────────────────────────────────────────────────
export default function Interviews() {
  const [search, setSearch]           = useState('')
  const [statusFilter, setStatus]     = useState('All')
  const [roundFilter, setRound]       = useState('All Rounds')
  const [roleFilter, setRole]         = useState('All Roles')
  const [openMenu, setOpenMenu]       = useState(null)

  const filteredTable = tableData.filter(r => {
    if (statusFilter !== 'All' && r.status !== statusFilter.toLowerCase().replace(' ','_')) return false
    if (roundFilter !== 'All Rounds' && r.round !== roundFilter) return false
    if (roleFilter !== 'All Roles' && !r.role.includes(roleFilter)) return false
    if (search && !r.name.toLowerCase().includes(search.toLowerCase()) && !r.role.toLowerCase().includes(search.toLowerCase())) return false
    return true
  })

  return (
    <div style={{ flex:1, background:'#F5F3FF', minHeight:'100vh', fontFamily:'DM Sans, sans-serif' }}>
      <link href="https://fonts.googleapis.com/css2?family=Sora:wght@400;600;700;800&family=DM+Sans:wght@400;500;600;700&display=swap" rel="stylesheet" />

      {/* ── Page Header ── */}
      <div style={{
        background:'#fff', borderBottom:'1px solid #EDE9FE',
        padding:'16px 32px', display:'flex', alignItems:'center', justifyContent:'space-between',
      }}>
        <div>
          <h1 style={{ fontSize:'22px', fontWeight:800, color:'#111827', margin:0, fontFamily:'Sora, sans-serif' }}>Interviews</h1>
          <p style={{ fontSize:'13px', color:'#9CA3AF', margin:0, marginTop:2 }}>Manage and track candidate interview processes</p>
        </div>
        <div style={{ display:'flex', alignItems:'center', gap:12 }}>
          {/* Search */}
          <div style={{ position:'relative' }}>
            <Search size={14} color="#9CA3AF" style={{ position:'absolute', left:12, top:'50%', transform:'translateY(-50%)' }} />
            <input
              value={search} onChange={e=>setSearch(e.target.value)}
              placeholder="Search interviews..."
              style={{
                paddingLeft:34, paddingRight:14, paddingTop:9, paddingBottom:9,
                border:'1px solid #E5E7EB', borderRadius:8, fontSize:13,
                color:'#111827', outline:'none', width:220, background:'#FAFAFA',
                fontFamily:'DM Sans, sans-serif',
              }}
            />
          </div>
          {/* Bell */}
          <button style={{
            width:38, height:38, borderRadius:9, border:'1px solid #E5E7EB',
            background:'#fff', display:'flex', alignItems:'center', justifyContent:'center',
            cursor:'pointer', position:'relative',
          }}>
            <Bell size={16} color="#6B7280" />
            <span style={{
              position:'absolute', top:8, right:8, width:7, height:7,
              background:'#EF4444', borderRadius:'50%', border:'1.5px solid #fff',
            }} />
          </button>
          {/* Schedule */}
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

        {/* ── Stats ── */}
        <div style={{ display:'grid', gridTemplateColumns:'repeat(5,1fr)', gap:16 }}>
          {stats.map(s => <StatCard key={s.label} {...s} />)}
        </div>

        {/* ── Filters ── */}
        <div style={{
          background:'#fff', border:'1px solid #EDE9FE', borderRadius:12,
          padding:'14px 20px', display:'flex', alignItems:'center', gap:12,
        }}>
          <Filter size={14} color="#7C3AED" />
          <span style={{ fontSize:13, fontWeight:600, color:'#374151', marginRight:4 }}>Filters:</span>
          {[
            ['Status',       ['All','Scheduled','Completed','Pending Feedback','Cancelled'], statusFilter, setStatus],
            ['Round',        ['All Rounds','HR Screening','Technical','Portfolio Review','Culture Fit','Final'], roundFilter, setRound],
            ['Job Role',     ['All Roles','Engineer','Designer','Manager','Researcher'], roleFilter, setRole],
          ].map(([label, opts, val, set]) => (
            <div key={label} style={{ position:'relative' }}>
              <select value={val} onChange={e=>set(e.target.value)} style={{
                appearance:'none', padding:'7px 28px 7px 12px',
                border:'1px solid #E5E7EB', borderRadius:20,
                fontSize:12, fontWeight:500, color:'#374151',
                background:'#fff', cursor:'pointer', outline:'none',
                fontFamily:'DM Sans, sans-serif',
              }}>
                {opts.map(o=><option key={o}>{o}</option>)}
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
              {['This Week','This Month','Last 30 Days','Custom Range'].map(o=><option key={o}>{o}</option>)}
            </select>
            <ChevronDown size={12} color="#6B7280" style={{ position:'absolute', right:10, top:'50%', transform:'translateY(-50%)', pointerEvents:'none' }} />
          </div>
        </div>

        {/* ── Upcoming + Calendar ── */}
        <div style={{ display:'grid', gridTemplateColumns:'1fr 300px', gap:20 }}>

          {/* Upcoming Interviews */}
          <div style={{ background:'#fff', border:'1px solid #EDE9FE', borderRadius:14, padding:24 }}>
            <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', marginBottom:18 }}>
              <div style={{ display:'flex', alignItems:'center', gap:8 }}>
                <Clock size={15} color="#7C3AED" />
                <span style={{ fontSize:15, fontWeight:700, color:'#111827', fontFamily:'Sora, sans-serif' }}>Upcoming Interviews</span>
                <span style={{ background:'#F5F3FF', color:'#7C3AED', fontSize:11, fontWeight:600, borderRadius:20, padding:'2px 10px' }}>
                  {upcoming.length}
                </span>
              </div>
              <button style={{ background:'none', border:'none', fontSize:12, color:'#7C3AED', fontWeight:600, cursor:'pointer' }}>View all</button>
            </div>

            <div style={{ display:'flex', flexDirection:'column', gap:12 }}>
              {upcoming.map((u, i) => {
                const TypeIcon = typeMeta[u.type]?.icon || Video
                const typeColor = typeMeta[u.type]?.color || '#7C3AED'
                return (
                  <div key={u.id} style={{
                    display:'flex', alignItems:'center', gap:14,
                    padding:'12px 14px', borderRadius:10,
                    border:'1px solid #F3F0FF', background:'#FAFAFA',
                    transition:'background 0.15s',
                  }}
                    onMouseEnter={e=>e.currentTarget.style.background='#F5F3FF'}
                    onMouseLeave={e=>e.currentTarget.style.background='#FAFAFA'}
                  >
                    <Avatar name={u.name} colors={u.avatar} size={40} />
                    <div style={{ flex:1, minWidth:0 }}>
                      <div style={{ fontSize:13, fontWeight:700, color:'#111827', fontFamily:'Sora, sans-serif' }}>{u.name}</div>
                      <div style={{ fontSize:11, color:'#6B7280' }}>{u.role}</div>
                    </div>
                    <div style={{ textAlign:'center' }}>
                      <div style={{ fontSize:11, color:'#7C3AED', fontWeight:600, background:'#F5F3FF', borderRadius:6, padding:'2px 8px' }}>{u.round}</div>
                    </div>
                    <div style={{ textAlign:'right', minWidth:80 }}>
                      <div style={{ fontSize:12, fontWeight:600, color:'#111827' }}>{u.date}</div>
                      <div style={{ fontSize:11, color:'#9CA3AF', display:'flex', alignItems:'center', gap:3, justifyContent:'flex-end' }}>
                        <Clock size={10} /> {u.time}
                      </div>
                    </div>
                    <div style={{ display:'flex', alignItems:'center', gap:4 }}>
                      <TypeIcon size={13} color={typeColor} />
                      <span style={{ fontSize:11, color:typeColor, fontWeight:500 }}>{u.type}</span>
                    </div>
                    <StatusBadge status={u.status} />
                    <button style={{
                      padding:'6px 14px', background:'#7C3AED', color:'#fff',
                      border:'none', borderRadius:7, fontSize:12, fontWeight:600,
                      cursor:'pointer', whiteSpace:'nowrap',
                    }}>
                      View
                    </button>
                  </div>
                )
              })}
            </div>
          </div>

          {/* Calendar */}
          <div style={{ background:'#fff', border:'1px solid #EDE9FE', borderRadius:14, padding:20 }}>
            <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', marginBottom:16 }}>
              <span style={{ fontSize:14, fontWeight:700, color:'#111827', fontFamily:'Sora, sans-serif' }}>June 2026</span>
              <div style={{ display:'flex', gap:4 }}>
                <button style={{ width:26, height:26, borderRadius:6, border:'1px solid #E5E7EB', background:'#fff', cursor:'pointer', display:'flex', alignItems:'center', justifyContent:'center' }}>
                  <ChevronLeft size={13} color="#6B7280" />
                </button>
                <button style={{ width:26, height:26, borderRadius:6, border:'1px solid #E5E7EB', background:'#fff', cursor:'pointer', display:'flex', alignItems:'center', justifyContent:'center' }}>
                  <ChevronRight size={13} color="#6B7280" />
                </button>
              </div>
            </div>

            {/* Day headers */}
            <div style={{ display:'grid', gridTemplateColumns:'repeat(7,1fr)', gap:2, marginBottom:6 }}>
              {['Su','Mo','Tu','We','Th','Fr','Sa'].map(d => (
                <div key={d} style={{ textAlign:'center', fontSize:10, fontWeight:700, color:'#9CA3AF', padding:'4px 0' }}>{d}</div>
              ))}
            </div>

            {/* Days */}
            <div style={{ display:'grid', gridTemplateColumns:'repeat(7,1fr)', gap:3 }}>
              {/* offset — June 2026 starts on Monday (index 1) */}
              <div />
              {calendarDays.map(({ d, interviews, active }) => (
                <div key={d} style={{
                  borderRadius:8, padding:'5px 2px',
                  background: active ? '#7C3AED' : interviews ? '#F5F3FF' : 'transparent',
                  cursor: interviews ? 'pointer' : 'default',
                  display:'flex', flexDirection:'column', alignItems:'center', gap:2,
                  transition:'background 0.15s',
                }}
                  onMouseEnter={e => { if (!active && interviews) e.currentTarget.style.background='#EDE9FE' }}
                  onMouseLeave={e => { if (!active && interviews) e.currentTarget.style.background='#F5F3FF' }}
                >
                  <span style={{ fontSize:12, fontWeight: active ? 700 : interviews ? 600 : 400, color: active ? '#fff' : interviews ? '#7C3AED' : '#374151' }}>
                    {d}
                  </span>
                  {interviews && (
                    <span style={{
                      fontSize:9, fontWeight:700,
                      background: active ? 'rgba(255,255,255,0.3)' : '#7C3AED',
                      color:'#fff', borderRadius:10, padding:'1px 5px', lineHeight:1.4,
                    }}>{interviews}</span>
                  )}
                </div>
              ))}
            </div>

            {/* Legend */}
            <div style={{ marginTop:16, paddingTop:14, borderTop:'1px solid #F3F0FF', display:'flex', flexDirection:'column', gap:8 }}>
              <div style={{ fontSize:11, fontWeight:700, color:'#9CA3AF', letterSpacing:'0.08em' }}>UPCOMING</div>
              {upcoming.slice(0,3).map(u => (
                <div key={u.id} style={{ display:'flex', alignItems:'center', gap:8 }}>
                  <div style={{ width:6, height:6, borderRadius:'50%', background:'#7C3AED', flexShrink:0 }} />
                  <span style={{ fontSize:12, color:'#374151', flex:1 }}>{u.name}</span>
                  <span style={{ fontSize:11, color:'#9CA3AF' }}>{u.time}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ── Table + Timeline ── */}
        <div style={{ display:'grid', gridTemplateColumns:'1fr 280px', gap:20 }}>

          {/* Interview Table */}
          <div style={{ background:'#fff', border:'1px solid #EDE9FE', borderRadius:14, overflow:'hidden' }}>
            <div style={{ padding:'18px 24px', borderBottom:'1px solid #F3F0FF', display:'flex', alignItems:'center', justifyContent:'space-between' }}>
              <div style={{ display:'flex', alignItems:'center', gap:8 }}>
                <Briefcase size={15} color="#7C3AED" />
                <span style={{ fontSize:15, fontWeight:700, color:'#111827', fontFamily:'Sora, sans-serif' }}>Interview Tracking</span>
                <span style={{ background:'#F5F3FF', color:'#7C3AED', fontSize:11, fontWeight:600, borderRadius:20, padding:'2px 10px' }}>
                  {filteredTable.length}
                </span>
              </div>
            </div>

            <div style={{ overflowX:'auto' }}>
              <table style={{ width:'100%', borderCollapse:'collapse', fontSize:13 }}>
                <thead>
                  <tr style={{ background:'#FAFAFA' }}>
                    {['Candidate','Position','Interviewer','Round','Date & Time','Type','Status','Actions'].map(h => (
                      <th key={h} style={{
                        padding:'10px 16px', textAlign:'left', fontSize:11,
                        fontWeight:700, color:'#9CA3AF', letterSpacing:'0.06em',
                        borderBottom:'1px solid #F3F0FF', whiteSpace:'nowrap',
                      }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {filteredTable.map((row, i) => {
                    const [bg, fg] = avatarPalette[i % avatarPalette.length]
                    const TypeIcon = typeMeta[row.type]?.icon || Video
                    const typeColor = typeMeta[row.type]?.color || '#7C3AED'
                    return (
                      <tr key={row.id}
                        style={{ borderBottom:'1px solid #F9F8FF', transition:'background 0.15s' }}
                        onMouseEnter={e=>e.currentTarget.style.background='#FAFAFA'}
                        onMouseLeave={e=>e.currentTarget.style.background='transparent'}
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
                        <td style={{ padding:'12px 16px', color:'#6B7280' }}>{row.interviewer}</td>
                        <td style={{ padding:'12px 16px' }}>
                          <span style={{ background:'#F5F3FF', color:'#7C3AED', fontSize:11, fontWeight:500, borderRadius:6, padding:'3px 8px' }}>{row.round}</span>
                        </td>
                        <td style={{ padding:'12px 16px', color:'#374151', whiteSpace:'nowrap', fontSize:12 }}>{row.date}</td>
                        <td style={{ padding:'12px 16px' }}>
                          <div style={{ display:'flex', alignItems:'center', gap:5 }}>
                            <TypeIcon size={13} color={typeColor} />
                            <span style={{ fontSize:12, color:typeColor, fontWeight:500 }}>{row.type}</span>
                          </div>
                        </td>
                        <td style={{ padding:'12px 16px' }}><StatusBadge status={row.status} /></td>
                        <td style={{ padding:'12px 16px' }}>
                          <div style={{ position:'relative' }}>
                            <button
                              onClick={() => setOpenMenu(openMenu === row.id ? null : row.id)}
                              style={{
                                width:30, height:30, borderRadius:7, border:'1px solid #E5E7EB',
                                background:'#fff', cursor:'pointer', display:'flex',
                                alignItems:'center', justifyContent:'center',
                              }}
                            >
                              <MoreHorizontal size={14} color="#6B7280" />
                            </button>
                            {openMenu === row.id && (
                              <div style={{
                                position:'absolute', right:0, top:34, background:'#fff',
                                border:'1px solid #EDE9FE', borderRadius:10, padding:6,
                                zIndex:10, minWidth:160, boxShadow:'0 8px 24px rgba(0,0,0,0.10)',
                              }}>
                                {[
                                  [Eye, 'View Details'],
                                  [RefreshCw, 'Reschedule'],
                                  [XCircle, 'Cancel Interview'],
                                  [MessageSquare, 'View Feedback'],
                                ].map(([Icon, label]) => (
                                  <button key={label} onClick={()=>setOpenMenu(null)} style={{
                                    display:'flex', alignItems:'center', gap:8, width:'100%',
                                    padding:'8px 12px', border:'none', background:'none',
                                    fontSize:12, color: label==='Cancel Interview' ? '#EF4444' : '#374151',
                                    cursor:'pointer', borderRadius:7, textAlign:'left',
                                    fontFamily:'DM Sans, sans-serif',
                                    transition:'background 0.1s',
                                  }}
                                    onMouseEnter={e=>e.currentTarget.style.background='#F5F3FF'}
                                    onMouseLeave={e=>e.currentTarget.style.background='transparent'}
                                  >
                                    <Icon size={13} color={label==='Cancel Interview'?'#EF4444':'#7C3AED'} />
                                    {label}
                                  </button>
                                ))}
                              </div>
                            )}
                          </div>
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
              {filteredTable.length === 0 && (
                <div style={{ padding:'40px 0', textAlign:'center', color:'#9CA3AF', fontSize:14 }}>
                  No interviews match the selected filters.
                </div>
              )}
            </div>
          </div>

          {/* Activity Timeline */}
          <div style={{ background:'#fff', border:'1px solid #EDE9FE', borderRadius:14, padding:20, alignSelf:'start' }}>
            <div style={{ display:'flex', alignItems:'center', gap:8, marginBottom:18 }}>
              <TrendingUp size={15} color="#7C3AED" />
              <span style={{ fontSize:15, fontWeight:700, color:'#111827', fontFamily:'Sora, sans-serif' }}>Recent Activity</span>
            </div>

            <div style={{ display:'flex', flexDirection:'column', gap:0 }}>
              {timeline.map((item, i) => {
                const Icon = item.icon
                return (
                  <div key={i} style={{ display:'flex', gap:12, position:'relative' }}>
                    {/* Line */}
                    {i < timeline.length - 1 && (
                      <div style={{ position:'absolute', left:16, top:32, width:1, height:'calc(100% - 12px)', background:'#EDE9FE' }} />
                    )}
                    {/* Icon */}
                    <div style={{
                      width:32, height:32, borderRadius:'50%', background:item.bg,
                      display:'flex', alignItems:'center', justifyContent:'center',
                      flexShrink:0, zIndex:1,
                    }}>
                      <Icon size={14} color={item.color} />
                    </div>
                    <div style={{ paddingBottom:16, flex:1, minWidth:0 }}>
                      <div style={{ fontSize:12, fontWeight:600, color:'#111827' }}>{item.text}</div>
                      <div style={{ fontSize:11, color:'#6B7280', lineHeight:1.4, marginTop:2 }}>{item.sub}</div>
                      <div style={{ fontSize:10, color:'#9CA3AF', marginTop:4 }}>{item.time}</div>
                    </div>
                  </div>
                )
              })}
            </div>
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