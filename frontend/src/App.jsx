import { useState } from 'react';
import LoginPage from './pages/LoginPage';
import ForgotPasswordPage from './ForgotPasswordPage';
import CreatePasswordPage from './CreatePasswordPage';
import Dashboard from './pages/Dashboard';
import ProtectedRoute from './auth/ProtectedRoute';
import SessionTimeout from './auth/SessionTimeout';
import Shell from './components/Shell';

export default function App() {
  const hasResetToken = new URLSearchParams(window.location.search).get('token');
  const token =
  localStorage.getItem('access_token') ||
  sessionStorage.getItem('access_token') ||
  localStorage.getItem('token') ||
  sessionStorage.getItem('token');
  
  const [view, setView] = useState(
    hasResetToken ? 'create' : token ? 'dashboard' : 'login'
);

  return (
    <div className={view === 'dashboard' ? 'min-h-screen w-screen' : 'h-screen w-screen overflow-hidden'}>
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(8px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-in-out;
        }
      `}</style>

      <div className="animate-fadeIn h-full w-full" key={view}>
        {view === 'dashboard' && <SessionTimeout setView={setView} />}

        {view === 'login' && <LoginPage setView={setView} />}
        {view === 'forgot' && <ForgotPasswordPage setView={setView} />}
        {view === 'create' && <CreatePasswordPage setView={setView} />}

        {view === 'dashboard' && (
          <ProtectedRoute allowedRoles={['Admin', 'Recruiter']} setView={setView}>
            <Dashboard setView={setView} />
          </ProtectedRoute>
        )}
      </div>
    </div>
  );
}