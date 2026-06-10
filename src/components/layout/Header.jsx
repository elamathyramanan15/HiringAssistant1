import { Search, Bell, Plus } from 'lucide-react'

export default function Header() {
  return (
    <header style={{
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      background: '#fff', padding: '14px 28px',
      borderBottom: '1px solid #E5E7EB',
    }}>

      {/* Search Bar */}
      <div style={{
        display: 'flex', alignItems: 'center', gap: '8px',
        background: '#F9FAFB', border: '1px solid #E5E7EB',
        borderRadius: '8px', padding: '8px 14px', width: '320px',
      }}>
        <Search size={16} color="#9CA3AF" />
        <input
          type="text"
          placeholder="Search candidates, jobs, resumes..."
          style={{
            border: 'none', background: 'transparent', outline: 'none',
            fontSize: '14px', color: '#374151', width: '100%',
          }}
        />
      </div>

      {/* Right Side */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>

        

        {/* Bell Icon */}
        <button style={{
          position: 'relative', background: 'none', border: 'none',
          cursor: 'pointer', padding: '6px', borderRadius: '8px', color: '#6B7280',
        }}>
          <Bell size={20} />
          <span style={{
            position: 'absolute', top: '4px', right: '4px',
            width: '8px', height: '8px', background: '#7C3AED',
            borderRadius: '50%', border: '2px solid #fff',
          }} />
        </button>

        {/* User Info */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div style={{ textAlign: 'right' }}>
            <div style={{ fontSize: '14px', fontWeight: 600, color: '#111827' }}>Marcus Reeves</div>
            <div style={{ fontSize: '12px', color: '#6B7280' }}>Head Recruiter</div>
          </div>
          <div style={{
            width: '36px', height: '36px', borderRadius: '50%',
            background: '#7C3AED', display: 'flex', alignItems: 'center',
            justifyContent: 'center', color: '#fff', fontSize: '13px', fontWeight: 600,
          }}>
            MR
          </div>
        </div>
      </div>
    </header>
  )
}