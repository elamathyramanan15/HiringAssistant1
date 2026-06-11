
import RecruiterSidebar from './layout/RecruiterSidebar'
import RecruiterHeader from './layout/RecruiterHeader'
import { Routes, Route } from 'react-router-dom'
import RecruiterDashboard from "../pages/RecruiterDashboard";
import CreateJobDescription from "../pages/CreateJobDescription";
import JobDescriptions from "../pages/JobDescriptions";
import Candidates from "../pages/Candidates";
import UploadResumes from "../pages/UploadResumes";
import AiScreening from "../pages/AiScreening";
import Interviews from "../pages/Interviews";
import MyProfile from "../pages/MyProfile";
import CandidateProfile from "../pages/CandidateProfile";
import ScheduleInterview from "../pages/ScheduleInterview";

export default function RecruiterShell() {

  return (
    <div style={{ display: 'flex', minHeight: '100vh' }}>
      <RecruiterSidebar />
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
        <RecruiterHeader />
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