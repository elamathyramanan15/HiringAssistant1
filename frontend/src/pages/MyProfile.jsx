import {
  User, Mail, Phone, MapPin,
  Briefcase, Award, Grid, Building2,
  Calendar, MessageCircle, Sparkles,
  Shield, CreditCard, Edit3,
  Users, Search, Star, CheckSquare,
  BarChart2, Heart, FileText, UserCheck,
} from 'lucide-react'

// ─── Sample Data ──────────────────────────────────────────────────────────────
const profile = {
  initials:    'RK',
  name:        'Riya Krishnamurthy',
  designation: 'Senior Talent Acquisition Specialist',
  role:        'Administrator',
  company:     'NexHire Solutions Pvt. Ltd.',
  companyShort:'NexHire Solutions',
  employeeId:  'EMP-2024-0047',
  email:       'riya.k@nexhire.io',
  phone:       '+91 98452 31076',
  location:    'Bengaluru, Karnataka, India',
  department:  'Human Resources',
  joiningDate: '14 March 2022',
  about:
    "I'm a results-driven talent acquisition specialist with over 6 years of experience in end-to-end recruitment for product, engineering, and design roles. I'm passionate about building inclusive hiring pipelines and leveraging AI-powered tools to identify the best-fit candidates quickly and fairly. At NexHire Solutions, I lead screening workflows for mid-to-senior-level positions across 12 active job requisitions. I believe great hiring starts with genuine human connection, and I strive to create a candidate experience that is transparent, respectful, and efficient.",
  skills: [
    { label: 'Recruitment',            Icon: Users },
    { label: 'Candidate Screening',    Icon: Search },
    { label: 'Talent Acquisition',     Icon: UserCheck },
    { label: 'Interview Coordination', Icon: CheckSquare },
    { label: 'Hiring Management',      Icon: Star },
    { label: 'Workforce Planning',     Icon: BarChart2 },
    { label: 'Employer Branding',      Icon: Heart },
    { label: 'JD Writing',             Icon: FileText },
  ],
}

// ─── Reusable pieces ──────────────────────────────────────────────────────────
function SectionCard({ children, style }) {
  return (
    <div style={{
      background: '#fff',
      border: '1px solid #EDE9FE',
      borderRadius: 14,
      padding: '20px 22px',
      ...style,
    }}>
      {children}
    </div>
  )
}

function CardTitle({ icon: Icon, children }) {
  return (
    <div style={{
      display: 'flex', alignItems: 'center', gap: 7,
      fontSize: 11, fontWeight: 700, color: '#9CA3AF',
      letterSpacing: '0.08em', marginBottom: 16,
    }}>
      <Icon size={13} color="#8B5CF6" />
      {children}
    </div>
  )
}

function InfoRow({ icon: Icon, label, value, last }) {
  return (
    <div style={{
      display: 'flex', alignItems: 'center', gap: 12,
      padding: '10px 0',
      borderBottom: last ? 'none' : '1px solid #F3F4F6',
    }}>
      <div style={{
        width: 32, height: 32, borderRadius: 8,
        background: '#F5F3FF',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        flexShrink: 0,
      }}>
        <Icon size={14} color="#8B5CF6" />
      </div>
      <div>
        <div style={{ fontSize: 11, color: '#9CA3AF', marginBottom: 1 }}>{label}</div>
        <div style={{ fontSize: 13, fontWeight: 600, color: '#111827' }}>{value}</div>
      </div>
    </div>
  )
}

function Badge({ icon: Icon, children }) {
  return (
    <span style={{
      display: 'inline-flex', alignItems: 'center', gap: 5,
      background: '#F5F3FF', color: '#6D28D9',
      fontSize: 11, fontWeight: 600,
      padding: '3px 10px', borderRadius: 20,
      border: '1px solid #DDD6FE',
    }}>
      <Icon size={11} />
      {children}
    </span>
  )
}

// ─── Main Component ───────────────────────────────────────────────────────────
export default function MyProfile() {
  return (
    <div style={{
      flex: 1,
      background: '#F5F3FF',
      minHeight: '100vh',
      padding: '28px 32px',
      fontFamily: 'DM Sans, sans-serif',
      display: 'flex',
      flexDirection: 'column',
      gap: 16,
    }}>

      {/* Page Header */}
      <div style={{ marginBottom: 4 }}>
        <h1 style={{
          fontSize: 22, fontWeight: 800, color: '#111827',
          fontFamily: 'Sora, sans-serif', margin: 0,
          display: 'flex', alignItems: 'center', gap: 8,
        }}>
          <User size={20} color="#8B5CF6" />
          My Profile
        </h1>
        <p style={{ fontSize: 13, color: '#6B7280', marginTop: 4 }}>
          View your professional information
        </p>
      </div>

      {/* Profile Identity Card */}
      <SectionCard style={{ display: 'flex', alignItems: 'center', gap: 24, flexWrap: 'wrap' }}>
        <div style={{
          width: 80, height: 80, borderRadius: '50%',
          background: '#8B5CF6',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: 26, fontWeight: 800, color: '#fff',
          fontFamily: 'Sora, sans-serif', flexShrink: 0,
          border: '3px solid #EDE9FE',
        }}>
          {profile.initials}
        </div>

        <div style={{ flex: 1, minWidth: 200 }}>
          <div style={{ fontSize: 20, fontWeight: 800, color: '#111827', fontFamily: 'Sora, sans-serif' }}>
            {profile.name}
          </div>
          <div style={{ fontSize: 13, color: '#6B7280', marginTop: 3 }}>
            {profile.designation}
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginTop: 10 }}>
            <Badge icon={Shield}>{profile.role}</Badge>
            <Badge icon={Building2}>{profile.companyShort}</Badge>
            <Badge icon={CreditCard}>{profile.employeeId}</Badge>
          </div>
          <button style={{
            display: 'inline-flex', alignItems: 'center', gap: 6,
            marginTop: 14, padding: '8px 18px',
            borderRadius: 8, border: 'none',
            background: '#8B5CF6', color: '#fff',
            fontSize: 13, fontWeight: 600,
            cursor: 'pointer', fontFamily: 'DM Sans, sans-serif',
          }}>
            <Edit3 size={13} /> Edit Profile
          </button>
        </div>
      </SectionCard>

      {/* Personal + Professional */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
        gap: 16,
      }}>
        <SectionCard>
          <CardTitle icon={CreditCard}>PERSONAL INFORMATION</CardTitle>
          <InfoRow icon={User}     label="Full Name"     value={profile.name} />
          <InfoRow icon={Mail}     label="Email Address" value={profile.email} />
          <InfoRow icon={Phone}    label="Phone Number"  value={profile.phone} />
          <InfoRow icon={MapPin}   label="Location"      value={profile.location} last />
        </SectionCard>

        <SectionCard>
          <CardTitle icon={Briefcase}>PROFESSIONAL INFORMATION</CardTitle>
          <InfoRow icon={Award}     label="Designation"  value={profile.designation} />
          <InfoRow icon={Grid}      label="Department"   value={profile.department} />
          <InfoRow icon={Building2} label="Company Name" value={profile.company} />
          <InfoRow icon={Calendar}  label="Joining Date" value={profile.joiningDate} last />
        </SectionCard>
      </div>

      {/* About Me */}
      <SectionCard>
        <CardTitle icon={MessageCircle}>ABOUT ME</CardTitle>
        <p style={{ fontSize: 13, color: '#374151', lineHeight: 1.8, margin: 0 }}>
          {profile.about}
        </p>
      </SectionCard>

      {/* Skills & Expertise */}
      <SectionCard>
        <CardTitle icon={Sparkles}>SKILLS &amp; EXPERTISE</CardTitle>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
          {profile.skills.map(({ label, Icon }) => (
            <span key={label} style={{
              display: 'inline-flex', alignItems: 'center', gap: 6,
              background: '#F5F3FF', color: '#6D28D9',
              fontSize: 12, fontWeight: 600,
              padding: '6px 14px', borderRadius: 20,
              border: '1px solid #DDD6FE',
            }}>
              <Icon size={13} />
              {label}
            </span>
          ))}
        </div>
      </SectionCard>

      <style>{`* { box-sizing: border-box; }`}</style>
    </div>
  )
}