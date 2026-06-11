import { useNavigate } from "react-router-dom";
import { useState, useRef } from 'react'
import {
  Search, Filter, Plus, MoreHorizontal,
  Briefcase, Clock, Settings, TrendingUp,
  TrendingDown, ChevronRight, X, Mail, Phone,
  MapPin, Download, Calendar, UserCheck, UserX,
  CheckCircle, GraduationCap
} from 'lucide-react'

const initialColumns = {
  applied: {
    label: 'Applied', color: '#6B7280',
    candidates: [
      {
        id: 1, name: 'Alexander Wright', role: 'Sr. UX Designer',
        exp: '8 Years exp', time: '2h ago', match: 82,
        avatar: 'AW', color: '#7C3AED',
        email: 'a.wright@example.com', phone: '+1 (555) 101-2020',
        location: 'San Francisco, CA',
        skills: ['Figma', 'User Research', 'Prototyping', 'Wireframing'],
        matchingSkills: ['Figma', 'User Research', 'Prototyping'],
        missingSkills: ['Adobe XD', 'Motion Design'],
        education: 'B.F.A Design — RISD, 2016',
        prevCompany: 'Airbnb Design Studio',
        summary: 'Alexander is a seasoned UX designer with strong leadership in B2C products. Deep expertise in design systems and cross-functional collaboration.',
      },
      {
        id: 2, name: 'Sophia Chen', role: 'Product Designer',
        exp: '4 Years exp', time: '5h ago', match: 85,
        avatar: 'SC', color: '#EC4899',
        email: 's.chen@example.com', phone: '+1 (555) 202-3030',
        location: 'New York, NY',
        skills: ['Figma', 'Interaction Design', 'Mobile UI', 'React Native'],
        matchingSkills: ['Figma', 'Mobile UI', 'Interaction Design'],
        missingSkills: ['Swift UI'],
        education: 'B.Sc. HCI — Carnegie Mellon, 2020',
        prevCompany: 'Meta Product Design',
        summary: 'Sophia brings strong mobile-first thinking and a sharp visual sensibility. Known for rapid prototyping and user testing cycles.',
      },
      {
        id: 3, name: 'Marcus Miller', role: 'UI Engineer',
        exp: '3 Years exp', time: '1d ago', match: 78,
        avatar: 'MM', color: '#0EA5E9',
        email: 'm.miller@example.com', phone: '+1 (555) 303-4040',
        location: 'Austin, TX',
        skills: ['React', 'TailwindCSS', 'TypeScript', 'Storybook'],
        matchingSkills: ['React', 'TypeScript', 'TailwindCSS'],
        missingSkills: ['Vue.js', 'GraphQL'],
        education: 'B.S. Computer Science — UT Austin, 2021',
        prevCompany: 'Dell Technologies',
        summary: 'Marcus is a solid UI engineer with clean code habits. His component library work at Dell shows maturity beyond his years of experience.',
      },
    ]
  },
  underReview: {
    label: 'Under Review', color: '#D97706',
    candidates: [
      {
        id: 4, name: 'Elena Rodriguez', role: 'Sr. Product Designer',
        exp: '10 Years exp', time: '10m ago', match: 95,
        avatar: 'ER', color: '#10B981',
        email: 'e.rodriguez@example.com', phone: '+1 (555) 404-5050',
        location: 'Seattle, WA',
        skills: ['Figma', 'Design Systems', 'User Research', 'Prototyping', 'Accessibility'],
        matchingSkills: ['Figma', 'Design Systems', 'User Research', 'Accessibility'],
        missingSkills: [],
        education: 'M.A. Interaction Design — SVA, 2015',
        prevCompany: 'Amazon UX',
        summary: 'Elena is an exceptional designer with a decade of craft. Her accessibility-first approach and system thinking make her a standout candidate.',
      },
      {
        id: 5, name: 'James Wilson', role: 'Design Lead',
        exp: '12 Years exp', time: '1h ago', match: 88,
        avatar: 'JW', color: '#F59E0B',
        email: 'j.wilson@example.com', phone: '+1 (555) 505-6060',
        location: 'Chicago, IL',
        skills: ['Leadership', 'Design Strategy', 'Figma', 'Stakeholder Mgmt'],
        matchingSkills: ['Leadership', 'Design Strategy', 'Figma'],
        missingSkills: ['Data Analysis'],
        education: 'MBA Design Leadership — IIT, 2013',
        prevCompany: 'Google Design',
        summary: 'James has a proven track record leading large design orgs. His strategic mindset and executive presence are rare at this level.',
      },
    ]
  },
  shortlisted: {
    label: 'Shortlisted', color: '#7C3AED',
    candidates: [
      {
        id: 6, name: 'Olivia Taylor', role: 'UX Specialist',
        exp: '6 Years exp', time: '3h ago', match: 89,
        avatar: 'OT', color: '#EC4899',
        email: 'o.taylor@example.com', phone: '+1 (555) 606-7070',
        location: 'Boston, MA',
        skills: ['Usability Testing', 'Figma', 'Journey Mapping', 'Interviews'],
        matchingSkills: ['Usability Testing', 'Figma', 'Journey Mapping'],
        missingSkills: ['Quantitative Research'],
        education: 'M.S. UX Research — Bentley, 2018',
        prevCompany: 'HubSpot UX',
        summary: 'Olivia brings rigorous research methods combined with strong communication skills. Her work at HubSpot directly impacted product NPS.',
      },
    ]
  },
  interview: {
    label: 'Interview', color: '#0EA5E9',
    candidates: [
      {
        id: 7, name: 'David Kim', role: 'Interaction Designer',
        exp: '5 Years exp', time: '20m ago', match: 91,
        avatar: 'DK', color: '#7C3AED',
        email: 'd.kim@example.com', phone: '+1 (555) 707-8080',
        location: 'Los Angeles, CA',
        skills: ['Interaction Design', 'Figma', 'After Effects', 'Principle'],
        matchingSkills: ['Interaction Design', 'Figma', 'After Effects'],
        missingSkills: ['Lottie', 'Three.js'],
        education: 'B.F.A Interaction Design — Art Center, 2019',
        prevCompany: 'Netflix Product',
        summary: 'David creates delightful micro-interactions that elevate product feel. His Netflix portfolio shows industry-leading motion design work.',
      },
      {
        id: 8, name: 'Sarah Jenkins', role: 'Visual Designer',
        exp: '4 Years exp', time: '45m ago', match: 82,
        avatar: 'SJ', color: '#0EA5E9',
        email: 's.jenkins@example.com', phone: '+1 (555) 808-9090',
        location: 'Remote',
        skills: ['Branding', 'Figma', 'Illustration', 'Typography'],
        matchingSkills: ['Figma', 'Typography', 'Illustration'],
        missingSkills: ['Motion Design', '3D Design'],
        education: 'B.A. Graphic Design — Parsons, 2020',
        prevCompany: 'Spotify Brand Studio',
        summary: 'Sarah has an incredible visual vocabulary built through brand work at Spotify. Her typography and illustration skills are top-tier.',
      },
    ]
  },
  selected: {
    label: 'Selected', color: '#10B981',
    candidates: [
      {
        id: 9, name: 'Thomas Moore', role: 'Principal Designer',
        exp: '15 Years exp', time: '1d ago', match: 98,
        avatar: 'TM', color: '#10B981',
        email: 't.moore@example.com', phone: '+1 (555) 909-1010',
        location: 'San Francisco, CA',
        skills: ['Design Strategy', 'Systems Design', 'Leadership', 'Figma', 'Research'],
        matchingSkills: ['Design Strategy', 'Systems Design', 'Leadership', 'Figma'],
        missingSkills: [],
        education: 'M.Des. — Royal College of Art, 2010',
        prevCompany: 'Apple Design',
        summary: 'Thomas is a principal-level designer with Apple pedigree. He has shipped products used by hundreds of millions of users globally.',
      },
    ]
  },
}

const activityLog = [
  { text: 'Thomas Moore moved to Selected',    time: '12m ago', color: '#10B981' },
  { text: 'Interview scheduled for David Kim', time: '1h ago',  color: '#0EA5E9' },
  { text: 'New application: Alexander Wright', time: '3h ago',  color: '#7C3AED' },
]

// ─── Candidate Modal ──────────────────────────────────────────────────────────
function CandidateModal({ candidate, onClose }) {
  const navigate = useNavigate()
  if (!candidate) return null

  const scoreColor = candidate.match >= 90 ? '#059669' : candidate.match >= 80 ? '#7C3AED' : '#D97706'

  const size = 80, stroke = 6
  const r    = (size - stroke) / 2
  const circ = 2 * Math.PI * r
  const off  = circ - (candidate.match / 100) * circ

  const statusSteps = ['Applied', 'Under Review', 'Shortlisted', 'Interview', 'Selected']
  const currentStep = statusSteps.indexOf(
    candidate.match >= 95 ? 'Selected' :
    candidate.match >= 90 ? 'Interview' :
    candidate.match >= 85 ? 'Shortlisted' :
    candidate.match >= 80 ? 'Under Review' : 'Applied'
  )

  return (
    <div
      onClick={onClose}
      style={{
        position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.45)',
        zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center',
        padding: '20px',
      }}
    >
      <div
        onClick={e => e.stopPropagation()}
        style={{
          background: '#fff', borderRadius: '16px', width: '100%', maxWidth: '760px',
          maxHeight: '88vh', overflowY: 'auto',
          boxShadow: '0 24px 64px rgba(0,0,0,0.18)',
        }}
      >
        {/* Modal Header */}
        <div style={{
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          padding: '20px 24px', borderBottom: '1px solid #F3F4F6', position: 'sticky',
          top: 0, background: '#fff', zIndex: 10, borderRadius: '16px 16px 0 0',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
            <div style={{
              width: '52px', height: '52px', borderRadius: '50%',
              background: candidate.color, display: 'flex', alignItems: 'center',
              justifyContent: 'center', fontSize: '16px', fontWeight: 700, color: '#fff',
            }}>
              {candidate.avatar}
            </div>
            <div>
              <div style={{ fontSize: '18px', fontWeight: 700, color: '#111827' }}>{candidate.name}</div>
              <div style={{ fontSize: '13px', color: '#7C3AED', fontWeight: 500 }}>{candidate.role}</div>
            </div>
          </div>
          <button
            onClick={onClose}
            style={{
              background: '#F3F4F6', border: 'none', borderRadius: '8px',
              padding: '8px', cursor: 'pointer', display: 'flex', alignItems: 'center',
            }}
          >
            <X size={18} color="#6B7280" />
          </button>
        </div>

        {/* Modal Body */}
        <div style={{ padding: '24px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>

          {/* LEFT COLUMN */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>

            {/* Contact Info */}
            <div style={{ background: '#F9FAFB', borderRadius: '12px', padding: '16px' }}>
              <div style={{ fontSize: '11px', fontWeight: 700, color: '#9CA3AF', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '12px' }}>
                Contact Information
              </div>
              {[
                { icon: Mail,      text: candidate.email    },
                { icon: Phone,     text: candidate.phone    },
                { icon: MapPin,    text: candidate.location },
                { icon: Briefcase, text: candidate.exp      },
              ].map(({ icon: Icon, text }) => (
                <div key={text} style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', color: '#374151', marginBottom: '8px' }}>
                  <Icon size={14} color="#9CA3AF" /> {text}
                </div>
              ))}
            </div>

            {/* Resume Summary */}
            <div style={{ background: '#F9FAFB', borderRadius: '12px', padding: '16px' }}>
              <div style={{ fontSize: '11px', fontWeight: 700, color: '#9CA3AF', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '12px' }}>
                Resume Summary
              </div>
              <div style={{ marginBottom: '12px' }}>
                <div style={{ fontSize: '12px', fontWeight: 600, color: '#374151', marginBottom: '6px' }}>Skills</div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '5px' }}>
                  {candidate.skills.map(s => (
                    <span key={s} style={{
                      background: '#F3F0FF', color: '#7C3AED', border: '1px solid #DDD6FE',
                      borderRadius: '20px', padding: '2px 10px', fontSize: '11px', fontWeight: 500,
                    }}>{s}</span>
                  ))}
                </div>
              </div>
              <div style={{ marginBottom: '12px' }}>
                <div style={{ fontSize: '12px', fontWeight: 600, color: '#374151', marginBottom: '4px' }}>Education</div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '13px', color: '#6B7280' }}>
                  <GraduationCap size={13} color="#9CA3AF" /> {candidate.education}
                </div>
              </div>
              <div>
                <div style={{ fontSize: '12px', fontWeight: 600, color: '#374151', marginBottom: '4px' }}>Previous Company</div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '13px', color: '#6B7280' }}>
                  <Briefcase size={13} color="#9CA3AF" /> {candidate.prevCompany}
                </div>
              </div>
            </div>

            {/* Candidate Status */}
            <div style={{ background: '#F9FAFB', borderRadius: '12px', padding: '16px' }}>
              <div style={{ fontSize: '11px', fontWeight: 700, color: '#9CA3AF', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '12px' }}>
                Candidate Status
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0' }}>
                {statusSteps.map((step, idx) => (
                  <div key={step} style={{ display: 'flex', alignItems: 'center', flex: idx < statusSteps.length - 1 ? 1 : 0 }}>
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px' }}>
                      <div style={{
                        width: '22px', height: '22px', borderRadius: '50%',
                        background: idx <= currentStep ? '#7C3AED' : '#E5E7EB',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        flexShrink: 0,
                      }}>
                        {idx <= currentStep && <CheckCircle size={12} color="#fff" />}
                      </div>
                      <span style={{
                        fontSize: '9px', color: idx <= currentStep ? '#7C3AED' : '#9CA3AF',
                        fontWeight: idx <= currentStep ? 600 : 400, whiteSpace: 'nowrap',
                        textAlign: 'center',
                      }}>
                        {step}
                      </span>
                    </div>
                    {idx < statusSteps.length - 1 && (
                      <div style={{
                        flex: 1, height: '2px', marginBottom: '18px',
                        background: idx < currentStep ? '#7C3AED' : '#E5E7EB',
                      }} />
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div style={{ background: '#F5F3FF', borderRadius: '12px', padding: '16px', border: '1px solid #EDE9FE' }}>
              <div style={{ fontSize: '11px', fontWeight: 700, color: '#7C3AED', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '14px' }}>
                ✦ AI Match Analysis
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '16px' }}>
                <div style={{ position: 'relative', width: size, height: size }}>
                  <svg width={size} height={size} style={{ transform: 'rotate(-90deg)' }}>
                    <circle cx={size/2} cy={size/2} r={r} fill="none" stroke="#E5E7EB" strokeWidth={stroke} />
                    <circle cx={size/2} cy={size/2} r={r} fill="none"
                      stroke={scoreColor} strokeWidth={stroke}
                      strokeDasharray={circ} strokeDashoffset={off}
                      strokeLinecap="round" />
                  </svg>
                  <div style={{
                    position: 'absolute', inset: 0, display: 'flex',
                    flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
                  }}>
                    <span style={{ fontSize: '18px', fontWeight: 800, color: scoreColor }}>{candidate.match}%</span>
                    <span style={{ fontSize: '8px', color: '#9CA3AF', fontWeight: 600 }}>MATCH</span>
                  </div>
                </div>
                <div>
                  <div style={{ fontSize: '14px', fontWeight: 700, color: '#111827', marginBottom: '2px' }}>
                    {candidate.match >= 90 ? 'Excellent Fit' : candidate.match >= 80 ? 'Strong Fit' : 'Good Fit'}
                  </div>
                  <div style={{ fontSize: '12px', color: '#6B7280' }}>vs. Job Description</div>
                </div>
              </div>
              <div style={{ marginBottom: '12px' }}>
                <div style={{ fontSize: '11px', fontWeight: 700, color: '#9CA3AF', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '6px' }}>
                  Matching Skills
                </div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '5px' }}>
                  {candidate.matchingSkills.map(s => (
                    <span key={s} style={{
                      background: '#ECFDF5', color: '#059669', border: '1px solid #A7F3D0',
                      borderRadius: '20px', padding: '2px 10px', fontSize: '11px', fontWeight: 500,
                    }}>✓ {s}</span>
                  ))}
                </div>
              </div>
              {candidate.missingSkills.length > 0 && (
                <div>
                  <div style={{ fontSize: '11px', fontWeight: 700, color: '#9CA3AF', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '6px' }}>
                    Missing Skills
                  </div>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '5px' }}>
                    {candidate.missingSkills.map(s => (
                      <span key={s} style={{
                        background: '#FEF2F2', color: '#EF4444', border: '1px solid #FECACA',
                        borderRadius: '20px', padding: '2px 10px', fontSize: '11px', fontWeight: 500,
                      }}>✗ {s}</span>
                    ))}
                  </div>
                </div>
              )}
              <div style={{ marginTop: '14px', background: '#fff', borderRadius: '8px', padding: '12px', border: '1px solid #EDE9FE' }}>
                <div style={{ fontSize: '10px', fontWeight: 700, color: '#7C3AED', marginBottom: '6px' }}>AI SUMMARY</div>
                <p style={{ fontSize: '12px', color: '#4B5563', lineHeight: '1.6', margin: 0 }}>
                  "{candidate.summary}"
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons Footer */}
        <div style={{
          display: 'flex', gap: '10px', padding: '16px 24px',
          borderTop: '1px solid #F3F4F6', flexWrap: 'wrap',
          position: 'sticky', bottom: 0, background: '#fff',
          borderRadius: '0 0 16px 16px',
        }}>
          <button style={{
            flex: 1, padding: '10px', background: '#7C3AED', color: '#fff',
            border: 'none', borderRadius: '8px', fontSize: '13px',
            fontWeight: 600, cursor: 'pointer', display: 'flex',
            alignItems: 'center', justifyContent: 'center', gap: '6px',
          }}>
            <UserCheck size={15} /> Selected
          </button>

          {/* ── CHANGED: Schedule Interview navigates to /schedule-interview ── */}
          <button
            onClick={() => { onClose(); navigate('/schedule-interview') }}
            style={{
              flex: 1, padding: '10px', background: '#EFF6FF', color: '#2563EB',
              border: '1px solid #BFDBFE', borderRadius: '8px', fontSize: '13px',
              fontWeight: 600, cursor: 'pointer', display: 'flex',
              alignItems: 'center', justifyContent: 'center', gap: '6px',
            }}>
            <Calendar size={15} /> Schedule Interview
          </button>

          <button style={{
            flex: 1, padding: '10px', background: '#FEF2F2', color: '#EF4444',
            border: '1px solid #FECACA', borderRadius: '8px', fontSize: '13px',
            fontWeight: 600, cursor: 'pointer', display: 'flex',
            alignItems: 'center', justifyContent: 'center', gap: '6px',
          }}>
            <UserX size={15} /> Reject
          </button>
          <button style={{
            flex: 1, padding: '10px', background: '#F9FAFB', color: '#374151',
            border: '1px solid #E5E7EB', borderRadius: '8px', fontSize: '13px',
            fontWeight: 600, cursor: 'pointer', display: 'flex',
            alignItems: 'center', justifyContent: 'center', gap: '6px',
          }}>
            <Download size={15} /> Download Resume
          </button>
        </div>
      </div>
    </div>
  )
}

// ─── Candidate Card ───────────────────────────────────────────────────────────
function CandidateCard({ candidate, onViewCandidate }) {
  const navigate  = useNavigate()
  const [menuOpen, setMenuOpen] = useState(false)
  const menuRef                 = useRef(null)

  const menuItems = [
    {
      icon: Calendar, label: 'Schedule Interview', color: '#374151',
      // ── CHANGED: navigate to /schedule-interview ──
      onClick: () => { setMenuOpen(false); navigate('/schedule-interview') },
    },
    {
      icon: Download, label: 'Download Resume', color: '#374151',
      onClick: () => setMenuOpen(false),
    },
    {
      icon: UserX, label: 'Reject Candidate', color: '#EF4444',
      onClick: () => setMenuOpen(false),
    },
  ]

  return (
    <div
      style={{
        background: '#fff', borderRadius: '10px',
        border: '1px solid #E5E7EB', padding: '14px',
        cursor: 'default', boxShadow: '0 1px 3px rgba(0,0,0,0.06)',
        transition: 'box-shadow 0.15s', position: 'relative',
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
            <div style={{ fontSize: '13px', fontWeight: 600, color: '#111827' }}>{candidate.name}</div>
            <div style={{ fontSize: '11px', color: '#9CA3AF', marginTop: '1px' }}>{candidate.role}</div>
          </div>
        </div>

        {/* Three-dot menu */}
        <div style={{ position: 'relative' }} ref={menuRef}>
          <button
            onClick={() => setMenuOpen(v => !v)}
            style={{
              background: menuOpen ? '#F3F0FF' : 'none',
              border: 'none', cursor: 'pointer', color: '#9CA3AF',
              padding: '3px 5px', borderRadius: '5px',
              display: 'flex', alignItems: 'center',
            }}
          >
            <MoreHorizontal size={14} />
          </button>

          {menuOpen && (
            <div style={{
              position: 'absolute', top: '28px', right: 0,
              background: '#fff', border: '1px solid #E5E7EB',
              borderRadius: '10px', boxShadow: '0 8px 24px rgba(0,0,0,0.12)',
              zIndex: 200, minWidth: '170px', overflow: 'hidden',
            }}>
              {menuItems.map(({ icon: Icon, label, color, onClick }) => (
                <div
                  key={label}
                  onClick={onClick}
                  style={{
                    display: 'flex', alignItems: 'center', gap: '9px',
                    padding: '10px 14px', fontSize: '13px',
                    cursor: 'pointer', color,
                  }}
                  onMouseEnter={e => e.currentTarget.style.background = color === '#EF4444' ? '#FEF2F2' : '#F9FAFB'}
                  onMouseLeave={e => e.currentTarget.style.background = '#fff'}
                >
                  <Icon size={14} color={color} /> {label}
                </div>
              ))}
            </div>
          )}
        </div>
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

      {/* Footer */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <span
          onClick={() => onViewCandidate(candidate)}
          style={{ fontSize: '12px', color: '#7C3AED', fontWeight: 500, cursor: 'pointer' }}
        >
          View Candidate
        </span>
        <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
          <span style={{ fontSize: '11px', color: '#9CA3AF' }}>JD</span>
          <div style={{ position: 'relative', width: '30px', height: '30px' }}>
            <svg width="30" height="30" style={{ transform: 'rotate(-90deg)' }}>
              <circle cx="15" cy="15" r="12" fill="none" stroke="#EDE9FE" strokeWidth="3" />
              <circle cx="15" cy="15" r="12" fill="none"
                stroke="#7C3AED" strokeWidth="3"
                strokeDasharray={2 * Math.PI * 12}
                strokeDashoffset={2 * Math.PI * 12 - (candidate.match / 100) * 2 * Math.PI * 12}
                strokeLinecap="round" />
            </svg>
            <div style={{
              position: 'absolute', inset: 0, display: 'flex',
              alignItems: 'center', justifyContent: 'center',
              fontSize: '7px', fontWeight: 700, color: '#7C3AED',
            }}>
              {candidate.match}%
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

// ─── Main Page ────────────────────────────────────────────────────────────────
export default function Candidates() {
  const [columns, setColumns]         = useState(initialColumns)
  const [search, setSearch]           = useState('')
  const [dragId, setDragId]           = useState(null)
  const [dragFrom, setDragFrom]       = useState(null)
  const [selectedCandidate, setSelectedCandidate] = useState(null)
  const dragOver                      = useRef(null)

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

  return (
    <div style={{ flex: 1, background: '#F3F4F6', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>

      <CandidateModal
        candidate={selectedCandidate}
        onClose={() => setSelectedCandidate(null)}
      />

      {/* Top Bar */}
      <div style={{
        background: '#fff', borderBottom: '1px solid #E5E7EB',
        padding: '14px 28px', display: 'flex', alignItems: 'center',
        justifyContent: 'space-between', gap: '16px',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div>
            <div style={{ fontSize: '18px', fontWeight: 700, color: '#111827' }}>Candidate Pipeline</div>
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
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '4px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '7px' }}>
                    <span style={{ fontSize: '12px', fontWeight: 700, color: '#374151', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                      {col.label}
                    </span>
                    <span style={{
                      fontSize: '11px', fontWeight: 600, color: col.color,
                      background: `${col.color}18`, borderRadius: '10px', padding: '1px 7px',
                    }}>
                      {filtered.length}
                    </span>
                  </div>
                  <button style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#9CA3AF', padding: '2px' }}>
                    <Plus size={15} />
                  </button>
                </div>

                {filtered.map(candidate => (
                  <div
                    key={candidate.id}
                    draggable
                    onDragStart={() => onDragStart(candidate.id, colKey)}
                  >
                    <CandidateCard
                      candidate={candidate}
                      onViewCandidate={setSelectedCandidate}
                    />
                  </div>
                ))}

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

        {/* Right Panel */}
        <div style={{
          width: '220px', flexShrink: 0, background: '#fff',
          borderLeft: '1px solid #E5E7EB', padding: '20px 16px',
          display: 'flex', flexDirection: 'column', gap: '20px', overflowY: 'auto',
        }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '14px' }}>
              <span style={{ fontSize: '13px', fontWeight: 700, color: '#111827', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                Pipeline Health
              </span>
              <MoreHorizontal size={15} color="#9CA3AF" style={{ cursor: 'pointer' }} />
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
              {[
                { label: 'Total Applied', value: '1,284', trend: '+12%', up: true,  icon: '👥', iconBg: '#F3F0FF' },
                { label: 'Conversion',    value: '4.2%',  trend: '+0.5%', up: true, icon: '📈', iconBg: '#ECFDF5' },
                { label: 'Interviews',    value: '48',    trend: '',      up: true,  icon: '🎤', iconBg: '#EFF6FF' },
                { label: 'Rejected',      value: '842',   trend: '',      up: false, icon: '❌', iconBg: '#FEF2F2' },
              ].map(stat => (
                <div key={stat.label} style={{ background: '#F9FAFB', borderRadius: '10px', border: '1px solid #F3F4F6', padding: '10px' }}>
                  <div style={{ width: '28px', height: '28px', borderRadius: '8px', background: stat.iconBg, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '14px', marginBottom: '8px' }}>
                    {stat.icon}
                  </div>
                  {stat.trend && (
                    <div style={{ display: 'flex', alignItems: 'center', gap: '3px', marginBottom: '2px' }}>
                      {stat.up ? <TrendingUp size={10} color="#10B981" /> : <TrendingDown size={10} color="#EF4444" />}
                      <span style={{ fontSize: '10px', color: stat.up ? '#10B981' : '#EF4444', fontWeight: 500 }}>{stat.trend}</span>
                    </div>
                  )}
                  <div style={{ fontSize: '16px', fontWeight: 700, color: '#111827' }}>{stat.value}</div>
                  <div style={{ fontSize: '10px', color: '#9CA3AF', marginTop: '1px' }}>{stat.label}</div>
                </div>
              ))}
            </div>
          </div>

          <div>
            <div style={{ fontSize: '13px', fontWeight: 700, color: '#111827', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '12px' }}>
              Activity Log
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {activityLog.map((log, i) => (
                <div key={i} style={{ display: 'flex', gap: '8px', alignItems: 'flex-start' }}>
                  <div style={{ width: '7px', height: '7px', borderRadius: '50%', background: log.color, flexShrink: 0, marginTop: '4px' }} />
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

          <div style={{ marginTop: 'auto', borderTop: '1px solid #F3F4F6', paddingTop: '14px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', justifyContent: 'space-between' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: '#7C3AED', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '12px', fontWeight: 600, color: '#fff' }}>KM</div>
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