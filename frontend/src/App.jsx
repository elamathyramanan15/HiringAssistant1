import { useState } from 'react';
import LoginPage from './pages/LoginPage';
import ForgotPasswordPage from './ForgotPasswordPage';
import CreatePasswordPage from './CreatePasswordPage';
import Dashboard from './pages/Dashboard';

export default function App() {
  const hasResetToken = new URLSearchParams(window.location.search).get('token');

  const [view, setView] = useState(hasResetToken ? 'create' : 'login');

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
        {view === 'login' && <LoginPage setView={setView} />}
        {view === 'forgot' && <ForgotPasswordPage setView={setView} />}
        {view === 'create' && <CreatePasswordPage setView={setView} />}
        {view === 'dashboard' && <Dashboard setView={setView} />}
      </div>
    </div>
  );
}