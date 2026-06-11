import { useNavigate } from 'react-router-dom'
import StatsCards from '../components/dashboard/StatsCards'
import RecentJobDescriptions from '../components/dashboard/RecentJobDescriptions'
import UpcomingInterviews from '../components/dashboard/UpcomingInterviews'
import RecruiterCharts from '../components/dashboard/RecruiterCharts'

export default function RecruiterDashboard() {

  const navigate = useNavigate()

  return (

    <main
      style={{
        flex: 1,
        padding: '24px',
        background: '#F8FAFC',
        minHeight: '100vh',
        width: '100%',
        boxSizing: 'border-box',
      }}
    >


      {/* Title */}

      <div
        style={{
          marginBottom: '24px',
        }}
      >

        <h1
          style={{
            fontSize: '22px',
            fontWeight: 700,
            color: '#111827',
            margin: 0,
          }}
        >
          Recruiter Dashboard
        </h1>


        <p
          style={{
            fontSize: '14px',
            color: '#6B7280',
            marginTop: '6px',
          }}
        >
          Overview of your active hiring cycles and priority pipelines.
        </p>

      </div>





      {/* Stats Cards */}

      <div style={{ marginBottom: '24px' }}>
        <StatsCards />
      </div>





      {/* Charts */}

      <div
        style={{
          background: '#ffffff',
          borderRadius: '12px',
          marginBottom: '24px',
        }}
      >

        <RecruiterCharts />

      </div>





      {/* Recent Jobs */}

      <div
        style={{
          width: '100%',
          marginBottom: '24px',
        }}
      >

        <RecentJobDescriptions />

      </div>





      {/* Upcoming Interviews */}

      <div
        style={{
          width: '100%',
        }}
      >

        <UpcomingInterviews />

      </div>



    </main>

  )
}