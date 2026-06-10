import { useParams, useNavigate } from 'react-router-dom'
import {
  Mail, Phone, MapPin, GraduationCap, Sparkles,
  Calendar, ChevronRight, ThumbsUp, ThumbsDown,
  ArrowRight, Star, X
} from 'lucide-react'

// ─── Shared Data (import from a shared file in your project) ──────────────────
export const candidates = [
  {
    id: 1,
    name: 'Alexandra Vance',
    role: 'Senior Product Designer',
    score: 94,
    years: 8,
    email: 'a.vance@example.com',
    phone: '+1 (555) 012-3456',
    location: 'San Francisco, CA (Open to Remote)',
    edu: [
      { years: '2015 – 2017', deg: 'M.S. Human-Computer Interaction', school: 'Carnegie Mellon University', note: 'Thesis with Distinction' },
      { years: '2011 – 2015', deg: 'B.A. Digital Media', school: 'University of Michigan', note: 'Cum Laude' },
    ],
    skills: ['Figma', 'Prototyping', 'User Research', 'Design Systems', 'Accessibility', 'Motion Design'],
    matched: ['Figma', 'Prototyping', 'User Research'],
    gaps: ['Framer', 'Principle'],
    summary: 'Alexandra shows exceptional leadership qualities and a deep understanding of complex design systems. Her experience at high-growth startups makes her a particularly strong match.',
    completeness: 96,
    pipeline: '3 Days',
    source: 'LinkedIn',
  },
  {
    id: 2,
    name: 'Marcus Chen',
    role: 'Lead UX Engineer',
    score: 88,
    years: 6,
    email: 'm.chen@example.com',
    phone: '+1 (555) 023-4567',
    location: 'New York, NY (Hybrid)',
    edu: [
      { years: '2014 – 2018', deg: 'B.S. Computer Science', school: 'UC Berkeley', note: "Dean's List" },
      { years: '2018 – 2019', deg: 'UX Certificate', school: 'Interaction Design Foundation', note: '' },
    ],
    skills: ['React', 'TypeScript', 'Accessibility', 'CSS', 'Node.js', 'Jest'],
    matched: ['React', 'TypeScript', 'Accessibility'],
    gaps: ['Vue', 'GraphQL'],
    summary: 'Marcus bridges the gap between design and engineering seamlessly. His focus on accessibility and performance is a rare find for this seniority level.',
    completeness: 88,
    pipeline: '5 Days',
    source: 'Referral',
  },
  {
    id: 3,
    name: 'Elena Rodriguez',
    role: 'Senior UI Developer',
    score: 82,
    years: 10,
    email: 'e.rodriguez@example.com',
    phone: '+1 (555) 034-5678',
    location: 'Austin, TX (On-site)',
    edu: [
      { years: '2010 – 2014', deg: 'B.F.A. Graphic Design', school: 'Parsons School of Design', note: 'Senior Award' },
      { years: '2014 – 2015', deg: 'Front-End Bootcamp', school: 'General Assembly', note: '' },
    ],
    skills: ['HTML/CSS', 'JavaScript', 'Animation', 'SVG', 'GSAP', 'Webpack'],
    matched: ['HTML/CSS', 'JavaScript', 'Animation'],
    gaps: ['React', 'TypeScript', 'Go'],
    summary: 'Highly creative developer with a strong visual eye. While missing some specific stack requirements, her depth in fundamental UI patterns is superior.',
    completeness: 92,
    pipeline: '7 Days',
    source: 'Portfolio',
  },
  {
    id: 4,
    name: 'Sarah Jenkins',
    role: 'Design Manager',
    score: 91,
    years: 12,
    email: 's.jenkins@example.com',
    phone: '+1 (555) 045-6789',
    location: 'Seattle, WA (Open to Remote)',
    edu: [
      { years: '2005 – 2009', deg: 'B.A. Visual Communications', school: 'RISD', note: 'Summa Cum Laude' },
      { years: '2011 – 2013', deg: 'MBA, Innovation Track', school: 'Wharton School', note: '' },
    ],
    skills: ['Mentorship', 'Strategy', 'Stakeholder Mgmt', 'OKRs', 'Hiring', 'Design Ops'],
    matched: ['Mentorship', 'Strategy', 'Stakeholder Mgmt'],
    gaps: ['Figma', 'Miro'],
    summary: 'Sarah is an industry veteran with a proven track record of scaling design teams. Her strategic mindset is exactly what the department needs for Q4.',
    completeness: 100,
    pipeline: '2 Days',
    source: 'Executive Search',
  },
  {
    id: 5,
    name: 'Jameson Thorne',
    role: 'Product Designer',
    score: 76,
    years: 4,
    email: 'j.thorne@example.com',
    phone: '+1 (555) 056-7890',
    location: 'Chicago, IL (Hybrid)',
    edu: [
      { years: '2017 – 2021', deg: 'B.A. Digital Arts', school: 'Emerson College', note: '' },
    ],
    skills: ['Figma', 'Interaction Design', 'Mobile Design', 'Sketch', 'InVision'],
    matched: ['Figma', 'Interaction Design', 'Mobile Design'],
    gaps: ['React', 'Technical Specs', 'Design Systems'],
    summary: 'A rising talent with high potential. His portfolio shows incredible visual craft, though he might need guidance on the technical implementation side.',
    completeness: 78,
    pipeline: '10 Days',
    source: 'Job Board',
  },
  {
    id: 6,
    name: 'Priya Nair',
    role: 'UX Researcher',
    score: 85,
    years: 7,
    email: 'p.nair@example.com',
    phone: '+1 (555) 067-8901',
    location: 'Boston, MA (Open to Remote)',
    edu: [
      { years: '2013 – 2015', deg: 'M.A. Cognitive Science', school: 'Johns Hopkins', note: 'Graduate Fellowship' },
      { years: '2009 – 2013', deg: 'B.Sc. Psychology', school: 'University of Toronto', note: '' },
    ],
    skills: ['Usability Testing', 'Interviews', 'Figma', 'Surveys', 'A/B Testing', 'Affinity Mapping'],
    matched: ['Usability Testing', 'Interviews', 'Figma'],
    gaps: ['SQL', 'Qualtrics'],
    summary: 'Priya brings rigorous research methodology combined with an ability to translate findings into actionable design decisions quickly.',
    completeness: 94,
    pipeline: '4 Days',
    source: 'Referral',
  },
]

// ─── Helpers ──────────────────────────────────────────────────────────────────
const avatarColors = [
  ['#EDE9FE', '#7C3AED'],
  ['#ECFDF5', '#059669'],
  ['#EFF6FF', '#2563EB'],
  ['#FFF7ED', '#EA580C'],
  ['#FDF2F8', '#A21CAF'],
  ['#F0FDF4', '#16A34A'],
]

const getInitials = (name) =>
  name.split(' ').map((w) => w[0]).join('').slice(0, 2).toUpperCase()

const scoreColor = (s) => {
  if (s >= 90) return '#059669'
  if (s >= 80) return '#7C3AED'
  if (s >= 70) return '#D97706'
  return '#EF4444'
}

const matchLabel = (s) => {
  if (s >= 90) return 'Superior Candidate Fit'
  if (s >= 80) return 'Strong Candidate Fit'
  if (s >= 70) return 'Moderate Candidate Fit'
  return 'Needs Review'
}

function ScoreRing({ score, size = 96, stroke = 7 }) {
  const r = (size - stroke) / 2
  const c = 2 * Math.PI * r
  const off = c - (score / 100) * c
  const col = scoreColor(score)
  return (
    <div style={{ position: 'relative', width: size, height: size }}>
      <svg width={size} height={size} style={{ transform: 'rotate(-90deg)' }}>
        <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="#E5E7EB" strokeWidth={stroke} />
        <circle
          cx={size / 2} cy={size / 2} r={r} fill="none"
          stroke={col} strokeWidth={stroke}
          strokeDasharray={c} strokeDashoffset={off}
          strokeLinecap="round"
        />
      </svg>
      <div style={{
        position: 'absolute', inset: 0,
        display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'center',
      }}>
        <span style={{ fontSize: 20, fontWeight: 800, color: col, fontFamily: 'Sora, sans-serif', lineHeight: 1 }}>
          {score}%
        </span>
        <span style={{ fontSize: 9, color: '#9CA3AF', marginTop: 2 }}>MATCH</span>
      </div>
    </div>
  )
}

// ─── Main Component ───────────────────────────────────────────────────────────
export default function CandidateProfile() {
  const { id } = useParams()
  const navigate = useNavigate()

  const candidateIndex = candidates.findIndex((c) => c.id === Number(id))
  const candidate = candidates[candidateIndex]

  if (!candidate) {
    return (
      <div style={{ padding: 40, textAlign: 'center', color: '#6B7280' }}>
        Candidate not found.{' '}
        <span style={{ color: '#7C3AED', cursor: 'pointer' }} onClick={() => navigate(-1)}>
          Go back
        </span>
      </div>
    )
  }

  const [avatarBg, avatarFg] = avatarColors[candidateIndex % avatarColors.length]

  return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', background: '#F5F3FF', minHeight: '100vh', fontFamily: 'DM Sans, sans-serif' }}>

      {/* ── Top Bar ── */}
      <div style={{
        background: '#fff', borderBottom: '1px solid #EDE9FE',
        padding: '12px 32px', display: 'flex', alignItems: 'center',
        justifyContent: 'space-between', gap: 16,
      }}>
        {/* Left: breadcrumb + name */}
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 12, color: '#9CA3AF', marginBottom: 4 }}>
            <span style={{ cursor: 'pointer' }} onClick={() => navigate('/hiring-pipeline')}>Hiring Pipeline</span>
            <ChevronRight size={12} />
            <span style={{ cursor: 'pointer' }} onClick={() => navigate(-1)}>{candidate.role}</span>
            <ChevronRight size={12} />
            <span style={{ color: '#7C3AED', fontWeight: 600 }}>Candidate Profile</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <h1 style={{ fontSize: 22, fontWeight: 800, color: '#111827', fontFamily: 'Sora, sans-serif', margin: 0 }}>
              {candidate.name}
            </h1>
            <span style={{
              background: '#ECFDF5', color: '#059669', fontSize: 11, fontWeight: 600,
              borderRadius: 20, padding: '3px 12px', display: 'flex', alignItems: 'center', gap: 4,
            }}>
              <Sparkles size={10} /> HIGH MATCH
            </span>
            <span style={{
              background: '#F3F4F6', color: '#6B7280', fontSize: 11,
              fontWeight: 600, borderRadius: 20, padding: '3px 12px',
            }}>
              ● REVIEWING
            </span>
          </div>
        </div>

        {/* Right: action buttons */}
        <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
          <button style={{
            padding: '8px 18px', border: '1.5px solid #E5E7EB', borderRadius: 8,
            background: '#fff', color: '#6B7280', fontSize: 13, fontWeight: 600, cursor: 'pointer',
          }}>
            Reject
          </button>
          <button style={{
            padding: '8px 18px', border: '1.5px solid #7C3AED', borderRadius: 8,
            background: '#fff', color: '#7C3AED', fontSize: 13, fontWeight: 600,
            cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 6,
          }}>
            <Calendar size={14} /> Schedule Interview
          </button>
          <button style={{
            padding: '8px 18px', border: 'none', borderRadius: 8,
            background: '#7C3AED', color: '#fff', fontSize: 13, fontWeight: 600,
            cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 6,
          }}>
            <Star size={14} /> Shortlist Candidate
          </button>
        </div>
      </div>

      {/* ── Body ── */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 300px', gap: 20, padding: '24px 32px' }}>

        {/* ── LEFT COLUMN ── */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>

          {/* Identity Card */}
          <div style={card}>
            <div style={{ display: 'flex', gap: 18, alignItems: 'flex-start' }}>
              <div style={{
                width: 72, height: 72, borderRadius: '50%', flexShrink: 0,
                background: avatarBg, color: avatarFg,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 22, fontWeight: 700, fontFamily: 'Sora, sans-serif',
              }}>
                {getInitials(candidate.name)}
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 22, fontWeight: 800, color: '#111827', fontFamily: 'Sora, sans-serif' }}>
                  {candidate.name}
                </div>
                <div style={{ fontSize: 14, color: '#7C3AED', fontWeight: 600, marginTop: 2 }}>
                  {candidate.role}
                </div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 16, marginTop: 12 }}>
                  {[
                    [Mail, candidate.email],
                    [Phone, candidate.phone],
                    [MapPin, candidate.location],
                  ].map(([Icon, text]) => (
                    <span key={text} style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 13, color: '#6B7280' }}>
                      <Icon size={14} color="#9CA3AF" /> {text}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Academic Background */}
          <div style={card}>
            <SectionLabel icon={<GraduationCap size={13} color="#7C3AED" />} text="ACADEMIC BACKGROUND" />
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
              {candidate.edu.map((e, i) => (
                <div key={i} style={{
                  border: '1px solid #EDE9FE', borderRadius: 10, padding: 14,
                }}>
                  <div style={{ fontSize: 11, color: '#7C3AED', fontWeight: 600, marginBottom: 4 }}>{e.years}</div>
                  <div style={{ fontSize: 14, fontWeight: 700, color: '#111827' }}>{e.deg}</div>
                  <div style={{ fontSize: 12, color: '#6B7280', marginTop: 2 }}>{e.school}</div>
                  {e.note && (
                    <span style={{
                      display: 'inline-block', marginTop: 8,
                      background: '#F3F0FF', color: '#7C3AED',
                      fontSize: 11, fontWeight: 600, padding: '2px 10px', borderRadius: 20,
                    }}>{e.note}</span>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Core Competencies */}
          <div style={card}>
            <SectionLabel icon={<Star size={13} color="#7C3AED" />} text="CORE COMPETENCIES" />
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginTop: 6 }}>
              {candidate.skills.map((s) => (
                <span key={s} style={{
                  background: '#F9FAFB', color: '#374151', fontSize: 12, fontWeight: 500,
                  borderRadius: 20, padding: '5px 14px', border: '1px solid #E5E7EB',
                }}>{s}</span>
              ))}
            </div>
          </div>
        </div>

        {/* ── RIGHT COLUMN ── */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>

          {/* AI Match Analysis */}
          <div style={card}>
            <div style={{ fontSize: 10, fontWeight: 700, color: '#7C3AED', letterSpacing: '0.1em', marginBottom: 14, display: 'flex', alignItems: 'center', gap: 6 }}>
              <Sparkles size={12} /> AI MATCH ANALYSIS
            </div>

            <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 10 }}>
              <ScoreRing score={candidate.score} />
            </div>

            <div style={{ textAlign: 'center', fontSize: 15, fontWeight: 700, color: '#111827' }}>
              {matchLabel(candidate.score)}
            </div>
            <div style={{ textAlign: 'center', fontSize: 11, color: '#9CA3AF', marginTop: 2 }}>
              Based on role requirements vs. resume keywords
            </div>

            {/* Matched Skills */}
            <div style={{ marginTop: 14 }}>
              <div style={miniLabel}>TOP MATCHED SKILLS</div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                {candidate.matched.map((s) => (
                  <span key={s} style={skillTag}>{s}</span>
                ))}
              </div>
            </div>

            {/* Skill Gaps */}
            <div style={{ marginTop: 12 }}>
              <div style={miniLabel}>POTENTIAL SKILL GAPS</div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                {candidate.gaps.map((g) => (
                  <span key={g} style={gapTag}>{g}</span>
                ))}
              </div>
            </div>

            {/* AI Summary */}
            <div style={{
              background: '#F5F3FF', border: '1px solid #DDD6FE',
              borderRadius: 10, padding: 14, marginTop: 14,
            }}>
              <div style={{ fontSize: 10, fontWeight: 700, color: '#7C3AED', letterSpacing: '0.1em', marginBottom: 8, display: 'flex', alignItems: 'center', gap: 5 }}>
                <Sparkles size={11} /> AI SUMMARY
              </div>
              <p style={{ fontSize: 12, color: '#4B5563', lineHeight: 1.6, margin: 0 }}>
                "{candidate.summary}"
              </p>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 10 }}>
                <button style={prosConsBtn}><ThumbsUp size={12} /> Pros</button>
                <button style={prosConsBtn}><ThumbsDown size={12} /> Cons</button>
                <span style={{ marginLeft: 'auto', fontSize: 12, color: '#7C3AED', fontWeight: 600, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 4 }}>
                  Full Report <ArrowRight size={12} />
                </span>
              </div>
            </div>
          </div>

          {/* Review Progress */}
          <div style={card}>
            <div style={{ fontSize: 13, fontWeight: 700, color: '#111827', marginBottom: 10 }}>Review Progress</div>

            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13, marginBottom: 6 }}>
              <span style={{ color: '#6B7280' }}>Profile Completeness</span>
              <span style={{ fontWeight: 600, color: '#111827' }}>{candidate.completeness}%</span>
            </div>
            <div style={{ height: 4, background: '#E5E7EB', borderRadius: 99, marginBottom: 12 }}>
              <div style={{ height: 4, background: '#7C3AED', borderRadius: 99, width: `${candidate.completeness}%` }} />
            </div>

            {[
              ['Time in Pipeline', candidate.pipeline],
              ['Source', candidate.source],
            ].map(([label, val]) => (
              <div key={label} style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13, padding: '7px 0', borderBottom: '1px solid #F3F4F6' }}>
                <span style={{ color: '#6B7280' }}>{label}</span>
                <span style={{ fontWeight: 600, color: '#111827' }}>{val}</span>
              </div>
            ))}

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: 13, paddingTop: 10, marginTop: 4 }}>
              <span style={{ display: 'flex', alignItems: 'center', gap: 6, color: '#6B7280' }}>
                <Calendar size={14} color="#7C3AED" /> Next Interview
              </span>
              <span style={{
                background: '#FEF3C7', color: '#92400E',
                fontSize: 11, fontWeight: 600, padding: '3px 10px', borderRadius: 20,
              }}>Not Set</span>
            </div>
          </div>

          {/* Generate Interview Guide */}
          <div style={{
            background: '#F5F3FF', border: '1px solid #DDD6FE',
            borderRadius: 12, padding: 16, textAlign: 'center',
          }}>
            <div style={{ fontSize: 13, fontWeight: 700, color: '#111827' }}>Need more context?</div>
            <div style={{ fontSize: 11, color: '#9CA3AF', marginTop: 4 }}>
              Generate a custom interview guide for {candidate.name.split(' ')[0]} based on our company values.
            </div>
            <button style={{
              width: '100%', padding: '11px 0', background: '#7C3AED', color: '#fff',
              border: 'none', borderRadius: 10, fontSize: 13, fontWeight: 700,
              cursor: 'pointer', marginTop: 12,
            }}>
              Generate Interview Guide
            </button>
          </div>
        </div>
      </div>

      <style>{`* { box-sizing: border-box; }`}</style>
    </div>
  )
}

// ─── Style helpers ────────────────────────────────────────────────────────────
const card = {
  background: '#fff',
  border: '1px solid #EDE9FE',
  borderRadius: 14,
  padding: 20,
}

const miniLabel = {
  fontSize: 10, fontWeight: 700, color: '#9CA3AF',
  letterSpacing: '0.08em', marginBottom: 8,
}

const skillTag = {
  background: '#F3F0FF', color: '#7C3AED',
  fontSize: 11, fontWeight: 500, borderRadius: 20, padding: '3px 10px',
}

const gapTag = {
  background: '#FEF3C7', color: '#92400E',
  fontSize: 11, fontWeight: 500, borderRadius: 20, padding: '3px 10px',
}

const prosConsBtn = {
  padding: '5px 12px', borderRadius: 8, fontSize: 12, fontWeight: 600,
  cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 4,
  border: '1px solid #E5E7EB', background: '#fff', color: '#6B7280',
}

function SectionLabel({ icon, text }) {
  return (
    <div style={{ fontSize: 10, fontWeight: 700, color: '#9CA3AF', letterSpacing: '0.1em', marginBottom: 14, display: 'flex', alignItems: 'center', gap: 6 }}>
      {icon} {text}
    </div>
  )
}