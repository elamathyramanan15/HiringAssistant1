import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  Search, LayoutGrid, List,
  Clock, GraduationCap, Sparkles,
  ChevronDown, Bookmark, Filter
} from 'lucide-react'

const candidates = [
  {
    id: 1, name: 'Alexandra Vance',   role: 'Senior Product Designer',  score: 94,
    years: 8,  edu: 'M.S. Human Computer…', skills: ['Figma', 'Prototyping', 'User Research'],
    extra: 2,
    summary: 'Alexandra shows exceptional leadership qualities and a deep understanding of complex design systems. Her experience at high-growth startups makes her a particularly strong match.',
  },
  {
    id: 2, name: 'Marcus Chen',       role: 'Lead UX Engineer',         score: 88,
    years: 6,  edu: 'B.S. Computer…',       skills: ['React', 'TypeScript', 'Accessibility'],
    extra: 2,
    summary: 'Marcus bridges the gap between design and engineering seamlessly. His focus on accessibility and performance is a rare find for this seniority level.',
  },
  {
    id: 3, name: 'Elena Rodriguez',   role: 'Senior UI Developer',      score: 82,
    years: 10, edu: 'B.F.A Graphic…',       skills: ['HTML/CSS', 'JavaScript', 'Animation'],
    extra: 2,
    summary: 'Highly creative developer with a strong visual eye. While missing some specific stack requirements, her depth in fundamental UI patterns is superior.',
  },
  {
    id: 4, name: 'Sarah Jenkins',     role: 'Design Manager',           score: 91,
    years: 12, edu: 'MBA in…',              skills: ['Mentorship', 'Strategy', 'Stakeholder Mgmt'],
    extra: 2,
    summary: 'Sarah is an industry veteran with a proven track record of scaling design teams. Her strategic mindset is exactly what the department needs for Q4.',
  },
  {
    id: 5, name: 'Jameson Thorne',    role: 'Product Designer',         score: 76,
    years: 4,  edu: 'B.A. Digital…',        skills: ['Figma', 'Interaction Design', 'Mobile Design'],
    extra: 1,
    summary: 'A rising talent with high potential. His portfolio shows incredible visual craft, though he might need guidance on the technical implementation side.',
  },
  {
    id: 6, name: 'Priya Nair',        role: 'UX Researcher',            score: 85,
    years: 7,  edu: 'M.A. Cognitive Sci…', skills: ['Usability Testing', 'Interviews', 'Figma'],
    extra: 1,
    summary: 'Priya brings rigorous research methodology combined with an ability to translate findings into actionable design decisions quickly.',
  },
]

const getInitials = (name) =>
  name.split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase()

const avatarColors = [
  ['#EDE9FE', '#7C3AED'],
  ['#ECFDF5', '#059669'],
  ['#EFF6FF', '#2563EB'],
  ['#FFF7ED', '#EA580C'],
  ['#FDF2F8', '#A21CAF'],
  ['#F0FDF4', '#16A34A'],
]

const scoreColor = (s) => {
  if (s >= 90) return '#059669'
  if (s >= 80) return '#7C3AED'
  if (s >= 70) return '#D97706'
  return '#EF4444'
}

const scoreRing = (score, size = 52, stroke = 4) => {
  const r   = (size - stroke) / 2
  const c   = 2 * Math.PI * r
  const off = c - (score / 100) * c
  const col = scoreColor(score)
  return (
    <svg width={size} height={size} style={{ transform: 'rotate(-90deg)' }}>
      <circle cx={size/2} cy={size/2} r={r} fill="none" stroke="#E5E7EB" strokeWidth={stroke} />
      <circle
        cx={size/2} cy={size/2} r={r} fill="none"
        stroke={col} strokeWidth={stroke}
        strokeDasharray={c} strokeDashoffset={off}
        strokeLinecap="round"
      />
    </svg>
  )
}

// ✅ navigate prop pass pannrom
function CandidateCard({ c, index, view, navigate }) {
  const [bg, fg] = avatarColors[index % avatarColors.length]
  const [saved, setSaved] = useState(false)

  if (view === 'list') {
    return (
      <div style={{
        background: '#fff', border: '1px solid #EDE9FE', borderRadius: '12px',
        padding: '16px 20px', display: 'flex', alignItems: 'center', gap: '16px',
        transition: 'box-shadow 0.2s',
      }}
        onMouseEnter={e => e.currentTarget.style.boxShadow = '0 4px 16px rgba(124,58,237,0.10)'}
        onMouseLeave={e => e.currentTarget.style.boxShadow = 'none'}
      >
        <div style={{
          width: '44px', height: '44px', borderRadius: '50%', flexShrink: 0,
          background: bg, display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: '14px', fontWeight: 700, color: fg,
        }}>
          {getInitials(c.name)}
        </div>

        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ fontSize: '14px', fontWeight: 700, color: '#111827' }}>{c.name}</div>
          <div style={{ fontSize: '12px', color: '#6B7280' }}>{c.role}</div>
        </div>

        <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap', flex: 2 }}>
          {c.skills.map(s => (
            <span key={s} style={{
              background: '#F3F0FF', color: '#7C3AED', fontSize: '11px',
              fontWeight: 500, borderRadius: '20px', padding: '3px 10px',
            }}>{s}</span>
          ))}
        </div>

        <div style={{ position: 'relative', width: '44px', height: '44px' }}>
          {scoreRing(c.score, 44, 4)}
          <span style={{
            position: 'absolute', left: '50%', top: '50%',
            transform: 'translate(-50%, -50%)',
            fontSize: '11px', fontWeight: 700, color: scoreColor(c.score),
          }}>{c.score}%</span>
        </div>

        {/* ✅ Navigate on click */}
        <button
          onClick={() => navigate(`/candidates/${c.id}`)}
          style={{
            padding: '8px 18px', background: '#7C3AED', color: '#fff',
            border: 'none', borderRadius: '8px', fontSize: '13px',
            fontWeight: 600, cursor: 'pointer', whiteSpace: 'nowrap',
          }}
        >
          View Profile
        </button>
      </div>
    )
  }

  // Grid View
  return (
    <div style={{
      background: '#fff', border: '1px solid #EDE9FE', borderRadius: '14px',
      padding: '20px', display: 'flex', flexDirection: 'column', gap: '14px',
      transition: 'box-shadow 0.2s', position: 'relative',
    }}
      onMouseEnter={e => e.currentTarget.style.boxShadow = '0 6px 24px rgba(124,58,237,0.12)'}
      onMouseLeave={e => e.currentTarget.style.boxShadow = 'none'}
    >
      {/* Top Row */}
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div style={{
            width: '48px', height: '48px', borderRadius: '50%',
            background: bg, display: 'flex', alignItems: 'center',
            justifyContent: 'center', fontSize: '16px', fontWeight: 700,
            color: fg, flexShrink: 0,
          }}>
            {getInitials(c.name)}
          </div>
          <div>
            <div style={{ fontSize: '15px', fontWeight: 700, color: '#111827' }}>{c.name}</div>
            <div style={{ fontSize: '12px', color: '#6B7280' }}>{c.role}</div>
          </div>
        </div>

        <div style={{ position: 'relative', width: '52px', height: '52px' }}>
          {scoreRing(c.score)}
          <span style={{
            position: 'absolute', left: '50%', top: '50%',
            transform: 'translate(-50%, -50%)',
            fontSize: '12px', fontWeight: 700, color: scoreColor(c.score),
          }}>{c.score}%</span>
        </div>
      </div>

      {/* Exp + Edu */}
      <div style={{ display: 'flex', gap: '14px' }}>
        <span style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '12px', color: '#6B7280' }}>
          <Clock size={12} color="#9CA3AF" /> {c.years} Years
        </span>
        <span style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '12px', color: '#6B7280' }}>
          <GraduationCap size={12} color="#9CA3AF" /> {c.edu}
        </span>
      </div>

      {/* Skills */}
      <div>
        <div style={{ fontSize: '10px', fontWeight: 700, color: '#9CA3AF', letterSpacing: '0.08em', marginBottom: '6px' }}>
          MATCHED SKILLS
        </div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
          {c.skills.map(s => (
            <span key={s} style={{
              background: '#F3F0FF', color: '#7C3AED', fontSize: '11px',
              fontWeight: 500, borderRadius: '20px', padding: '3px 10px',
            }}>{s}</span>
          ))}
          {c.extra > 0 && (
            <span style={{
              background: '#F9FAFB', color: '#9CA3AF', fontSize: '11px',
              borderRadius: '20px', padding: '3px 10px',
            }}>+{c.extra} more</span>
          )}
        </div>
      </div>

      {/* AI Summary */}
      <div style={{ background: '#FAFAFA', borderRadius: '8px', padding: '12px', border: '1px solid #F3F4F6' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '6px' }}>
          <Sparkles size={12} color="#7C3AED" />
          <span style={{ fontSize: '10px', fontWeight: 700, color: '#7C3AED', letterSpacing: '0.08em' }}>
            AI SUMMARY EXCERPT
          </span>
        </div>
        <p style={{
          fontSize: '12px', color: '#4B5563', lineHeight: '1.6', margin: 0,
          display: '-webkit-box', WebkitLineClamp: 3,
          WebkitBoxOrient: 'vertical', overflow: 'hidden',
        }}>
          "{c.summary}"
        </p>
      </div>

      {/* Bottom Buttons */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '2px' }}>
        {/* ✅ Navigate on click */}
        <button
          onClick={() => navigate(`/candidates/${c.id}`)}
          style={{
            flex: 1, padding: '9px 0', background: '#7C3AED', color: '#fff',
            border: 'none', borderRadius: '8px', fontSize: '13px',
            fontWeight: 600, cursor: 'pointer', display: 'flex',
            alignItems: 'center', justifyContent: 'center', gap: '6px',
          }}
        >
          <span>⊙</span> View Full Profile
        </button>

        <button
          onClick={() => setSaved(v => !v)}
          style={{
            marginLeft: '10px', width: '36px', height: '36px',
            borderRadius: '8px', border: '1px solid #E5E7EB',
            background: saved ? '#F3F0FF' : '#fff',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            cursor: 'pointer',
          }}
        >
          <Bookmark size={15} color={saved ? '#7C3AED' : '#9CA3AF'} fill={saved ? '#7C3AED' : 'none'} />
        </button>
      </div>
    </div>
  )
}

// ─── Main Page ────────────────────────────────────────────────────────────────
export default function AiScreening() {
  const navigate = useNavigate()  // ✅ here define pannrom
  const [view,      setView]   = useState('grid')
  const [search,    setSearch] = useState('')
  const [sort,      setSort]   = useState('Highest Match')
  const [expFilter, setExp]    = useState('5+ Years')

  const filtered = candidates.filter(c =>
    c.name.toLowerCase().includes(search.toLowerCase()) ||
    c.role.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', background: '#F5F3FF', minHeight: '100vh', fontFamily: 'DM Sans, sans-serif' }}>

      {/* Top Bar */}
      <div style={{
        background: '#fff', borderBottom: '1px solid #EDE9FE',
        padding: '14px 32px', display: 'flex', alignItems: 'center',
        justifyContent: 'space-between', gap: '16px',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <h1 style={{ fontSize: '20px', fontWeight: 800, color: '#111827', margin: 0 }}>
            AI Screening Results
          </h1>
          <span style={{
            background: '#F3F0FF', color: '#7C3AED', fontSize: '12px',
            fontWeight: 600, borderRadius: '20px', padding: '3px 12px',
          }}>
            {filtered.length * 26} Candidates
          </span>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div style={{ position: 'relative' }}>
            <Search size={14} color="#9CA3AF" style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)' }} />
            <input
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Search candidates..."
              style={{
                paddingLeft: '34px', paddingRight: '14px', paddingTop: '8px', paddingBottom: '8px',
                border: '1px solid #E5E7EB', borderRadius: '8px', fontSize: '13px',
                color: '#111827', outline: 'none', width: '220px', background: '#FAFAFA',
              }}
            />
          </div>

          <button style={{
            display: 'flex', alignItems: 'center', gap: '6px',
            padding: '8px 14px', border: '1px solid #E5E7EB',
            borderRadius: '8px', background: '#fff', fontSize: '13px',
            color: '#374151', cursor: 'pointer', fontWeight: 500,
          }}>
            <Filter size={14} /> More Filters
          </button>

          <div style={{ display: 'flex', border: '1px solid #E5E7EB', borderRadius: '8px', overflow: 'hidden' }}>
            {[['grid', LayoutGrid], ['list', List]].map(([v, Icon]) => (
              <button
                key={v}
                onClick={() => setView(v)}
                style={{
                  padding: '8px 10px', border: 'none', cursor: 'pointer',
                  background: view === v ? '#F3F0FF' : '#fff',
                  color: view === v ? '#7C3AED' : '#9CA3AF',
                  display: 'flex', alignItems: 'center',
                }}
              >
                <Icon size={16} />
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Filter Bar */}
      <div style={{
        background: '#fff', borderBottom: '1px solid #EDE9FE',
        padding: '10px 32px', display: 'flex', alignItems: 'center', gap: '10px',
      }}>
        {[
          { value: sort,      onChange: setSort, options: ['Highest Match', 'Most Experience', 'Most Recent'] },
          { value: expFilter, onChange: setExp,  options: ['Any Experience', '1+ Years', '3+ Years', '5+ Years', '8+ Years'] },
        ].map((sel, i) => (
          <div key={i} style={{ position: 'relative' }}>
            <select
              value={sel.value}
              onChange={e => sel.onChange(e.target.value)}
              style={{
                appearance: 'none', padding: '6px 28px 6px 12px',
                border: '1px solid #E5E7EB', borderRadius: '20px',
                fontSize: '12px', fontWeight: 500, color: '#374151',
                background: '#fff', cursor: 'pointer', outline: 'none',
              }}
            >
              {sel.options.map(o => <option key={o}>{o}</option>)}
            </select>
            <ChevronDown size={12} color="#6B7280" style={{ position: 'absolute', right: '10px', top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none' }} />
          </div>
        ))}

        <span style={{ fontSize: '12px', color: '#9CA3AF', marginLeft: 'auto' }}>
          Showing {filtered.length} of {filtered.length * 26} results
        </span>
      </div>

      {/* Cards */}
      <div style={{ flex: 1, padding: '28px 32px', overflowY: 'auto' }}>
        {view === 'grid' ? (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '20px' }}>
            {filtered.map((c, i) => (
              // ✅ navigate prop pass pannrom
              <CandidateCard key={c.id} c={c} index={i} view="grid" navigate={navigate} />
            ))}
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {filtered.map((c, i) => (
              <CandidateCard key={c.id} c={c} index={i} view="list" navigate={navigate} />
            ))}
          </div>
        )}
      </div>

      <style>{`* { box-sizing: border-box; } input::placeholder { color: #9CA3AF; }`}</style>
    </div>
  )
}