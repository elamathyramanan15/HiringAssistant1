// App.jsx
import { Routes, Route, useNavigate } from 'react-router-dom'

import Sidebar from './components/layout/Sidebar'
import Header from './components/layout/Header'
import RecruiterDashboard from './pages/RecruiterDashboard'
import CreateJobDescription from './pages/CreateJobDescription'
import JobDescriptions from './pages/JobDescriptions'   // already imported ✅
import Candidates from './pages/Candidates'
import UploadResumes from './pages/UploadResumes'
import AiScreening from './pages/AiScreening'
import Interviews from './pages/Interviews'
import MyProfile from './pages/MyProfile'
import CandidateProfile from './pages/CandidateProfile'
import ScheduleInterview from './pages/ScheduleInterview'

export default function App() {
  const navigate = useNavigate()  
  return (
    <div style={{ display: 'flex', minHeight: '100vh' }}>
      <Sidebar />
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
        <Header />
        <Routes>
          <Route path="/"           element={<RecruiterDashboard />} />
          <Route path="/jobs"       element={<JobDescriptions />} />  {/* ← ADD THIS */}
          <Route path="/create-job" element={<CreateJobDescription />} />
                    <Route path="/edit-job/:id"   element={<CreateJobDescription />} />
          <Route path="/candidates"     element={<Candidates />} />
          <Route path="/candidates/:id" element={<CandidateProfile />} />
           <Route path="/upload-resumes" element={<UploadResumes />} />
             <Route path="/upload"     element={<UploadResumes />} />
  <Route path="/screening"  element={<AiScreening />} />
         <Route path="/interviews" element={<Interviews />} />
         <Route path="/my-profile" element={<MyProfile />} />
         <Route path="/schedule-interview" element={<ScheduleInterview />} />
        </Routes>
      </div>
    </div>
  )
}