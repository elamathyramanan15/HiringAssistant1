import { useNavigate } from 'react-router-dom'
import { Upload, Users, Plus } from 'lucide-react'
import StatsCards from '../components/dashboard/StatsCards'
import RecentJobDescriptions from '../components/dashboard/RecentJobDescriptions'
import TopRankedCandidates from '../components/dashboard/TopRankedCandidates'
import CandidatePipeline from '../components/dashboard/CandidatePipeline'
import UpcomingInterviews from '../components/dashboard/UpcomingInterviews'

export default function RecruiterDashboard() {
  const navigate = useNavigate()

  return (
    <main style={{ flex: 1, padding: '32px', background: '#F3F4F6' }}>

      {/* Title Row */}
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '20px' }}>
        <div>
          <h1 style={{ fontSize: '22px', fontWeight: 700, color: '#111827', marginBottom: '4px' }}>
            Recruiter Dashboard
          </h1>
          <p style={{ fontSize: '14px', color: '#6B7280' }}>
            Overview of your active hiring cycles and priority pipelines.
          </p>
        </div>
        <button
          onClick={() => navigate('/create-job')}
          style={{
            display: 'flex', alignItems: 'center', gap: '6px',
            background: '#7C3AED', color: '#fff', border: 'none',
            borderRadius: '8px', padding: '10px 18px',
            fontSize: '14px', fontWeight: 500, cursor: 'pointer',
          }}
        >
          <Plus size={16} />
          Create Job Description
        </button>
      </div>

      {/* Action Buttons */}
      <div style={{ display: 'flex', gap: '12px', marginBottom: '24px' }}>
        <button 
        onClick={() => navigate('/upload-resumes')}
        style={{
          display: 'flex', alignItems: 'center', gap: '8px',
          background: '#F3F0FF', border: '1px solid #DDD6FE',
          borderRadius: '8px', padding: '10px 20px',
          fontSize: '14px', fontWeight: 500, color: '#7C3AED', cursor: 'pointer',
        }}>
          <Upload size={16} />
          Upload Resumes
        </button>
        <button 
         onClick={() => navigate('/candidates')} 
        style={{
          display: 'flex', alignItems: 'center', gap: '8px',
          background: '#fff', border: '1px solid #E5E7EB',
          borderRadius: '8px', padding: '10px 20px',
          fontSize: '14px', fontWeight: 500, color: '#374151', cursor: 'pointer',
        }}>
          <Users size={16} />
          View Candidates
        </button>
      </div>

      {/* Row 1 — Stat Cards */}
      <StatsCards />

      {/* Row 2 — Jobs Table + Top Candidates */}
      <div style={{ display: 'grid', gridTemplateColumns: '1.4fr 1fr', gap: '24px', marginBottom: '24px' }}>
        <RecentJobDescriptions />
        <TopRankedCandidates />
      </div>

      {/* Row 3 — Pipeline + Upcoming Interviews */}
      <div style={{ display: 'grid', gridTemplateColumns: '1.4fr 1fr', gap: '24px' }}>
        <CandidatePipeline />
        <UpcomingInterviews />
      </div>

    </main>
  )
}