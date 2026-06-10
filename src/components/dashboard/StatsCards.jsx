import { Briefcase, Users, CheckCircle, CalendarCheck, TrendingUp, TrendingDown } from 'lucide-react'

const stats = [
  {
    label: 'Active Job Descriptions',
    value: '12',
    badge: '+2 new',
    trend: 'up',
    icon: Briefcase,
  },
  {
    label: 'Total Candidates',
    value: '1,284',
    badge: '+12%',
    trend: 'up',
    icon: Users,
  },
  {
    label: 'Shortlisted Candidates',
    value: '84',
    badge: '-3%',
    trend: 'down',
    icon: CheckCircle,
  },
  {
    label: 'Scheduled Interviews',
    value: '16',
    badge: '+5 today',
    trend: 'up',
    icon: CalendarCheck,
  },
]

export default function StatsCards() {
  return (
    <div style={{
      display: 'grid',
      gridTemplateColumns: 'repeat(4, 1fr)',
      gap: '16px',
      marginBottom: '24px',
    }}>
      {stats.map(({ label, value, badge, trend, icon: Icon }) => (
        <div key={label} style={{
          background: '#fff', borderRadius: '12px',
          border: '1px solid #E5E7EB', padding: '20px',
          display: 'flex', flexDirection: 'column', gap: '12px',
        }}>
          {/* Top Row */}
          <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
            <div style={{
              width: '40px', height: '40px', borderRadius: '10px',
              background: '#F3F0FF', display: 'flex',
              alignItems: 'center', justifyContent: 'center',
            }}>
              <Icon size={20} color="#7C3AED" />
            </div>

            <span style={{
              fontSize: '12px', fontWeight: 500,
              color: trend === 'up' ? '#10B981' : '#EF4444',
              display: 'flex', alignItems: 'center', gap: '3px',
            }}>
              {trend === 'up'
                ? <TrendingUp size={14} />
                : <TrendingDown size={14} />}
              {badge}
            </span>
          </div>

          {/* Label + Value */}
          <div>
            <div style={{ fontSize: '13px', color: '#6B7280' }}>{label}</div>
            <div style={{ fontSize: '26px', fontWeight: 700, color: '#111827', marginTop: '2px' }}>
              {value}
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}