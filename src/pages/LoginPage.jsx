import { useState } from 'react';

export default function LoginPage({ setView }) {
  const [showPassword, setShowPassword] = useState(false);
  const [role, setRole] = useState('Admin');

  return (
    <div className="flex flex-col lg:flex-row h-screen w-screen overflow-hidden font-sans">

      {/* LEFT PANEL */}
      <div className="hidden lg:flex flex-col justify-between px-14 py-10 bg-[#F0EEFF] w-1/2 h-full overflow-hidden">

        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-full bg-purple-700 flex items-center justify-center">
            <span className="text-white text-lg">🤖</span>
          </div>
          <span className="text-gray-900 font-extrabold text-xl tracking-tight">HireAI</span>
        </div>

        <div>
          <h1 className="text-5xl font-extrabold leading-tight text-gray-900">Screen smarter.</h1>
          <h1 className="text-5xl font-extrabold leading-tight text-purple-700">Hire the best.</h1>
          <p className="mt-4 text-gray-500 text-sm leading-relaxed max-w-[300px]">
            AI-powered resume screening that finds top candidates 10x faster, with 94% match accuracy
          </p>

          <div className="relative mt-10 h-52">
            <span className="absolute top-1 left-[30%] text-xl">✨</span>
            <span className="absolute top-6 right-[20%] text-lg">✨</span>
            <span className="absolute bottom-10 left-[16%] text-sm">⭐</span>
            <span className="absolute bottom-2 right-[28%] text-base">⭐</span>

            <div className="absolute top-4 left-4 z-0 bg-white rounded-xl shadow p-4 w-52">
              <div className="space-y-3">
                <div className="bg-gray-200 rounded h-3 w-full" />
                <div className="bg-gray-200 rounded h-3 w-4/5" />
                <div className="bg-gray-200 rounded h-3 w-3/5" />
              </div>
            </div>

            <div className="relative z-10 bg-white rounded-xl shadow-lg p-4 w-52 ml-10 mt-2">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-full bg-gray-300 flex items-center justify-center flex-shrink-0">
                  <span className="text-gray-500 text-sm">👤</span>
                </div>
                <div>
                  <p className="font-bold text-sm text-gray-900">Aisha Patel</p>
                  <p className="text-xs text-gray-500">Data Scientist</p>
                </div>
              </div>
              <span className="inline-block bg-purple-700 text-white text-xs font-bold px-3 py-1 rounded-full">
                ⭐ 94% Match
              </span>
            </div>
          </div>
        </div>

        <div className="flex justify-center pb-2">
          <div className="flex items-center bg-white rounded-full px-5 py-3 shadow text-xs font-medium gap-3 flex-wrap">
            <span className="flex items-center gap-1.5">
              <span className="inline-block w-2 h-2 rounded-full bg-green-500" />
              10x Faster Screening
            </span>
            <span className="w-px h-4 bg-gray-300" />
            <span>94% Match Accuracy</span>
            <span className="w-px h-4 bg-gray-300" />
            <span>2.4k+ Hires Made</span>
          </div>
        </div>
      </div>

      {/* RIGHT PANEL */}
      <div className="flex flex-col bg-white w-full lg:w-1/2 h-full overflow-hidden">
        <div className="flex-1 flex items-center justify-center px-6 lg:px-8 overflow-hidden">
          <div className="w-full max-w-[420px]">

            <div className="text-center mb-6">
              <div className="flex items-center justify-center gap-2 mb-1">
                <span className="text-2xl">🤖</span>
                <span className="text-2xl font-extrabold text-purple-700 tracking-tight">HireAI</span>
              </div>
              <p className="text-sm text-gray-500">AI Hiring Assistant</p>
            </div>

            <div className="mb-5">
              <p className="text-sm text-gray-500 text-center mb-2">Select Your Role</p>
              <div className="flex gap-2">
                <button type="button" onClick={() => setRole('Admin')}
                  className={`w-full py-2 rounded-lg text-sm transition-colors ${role === 'Admin' ? 'bg-purple-700 text-white font-bold' : 'bg-white text-black border border-gray-300'}`}>
                  Admin
                </button>
                <button type="button" onClick={() => setRole('Recruiter')}
                  className={`w-full py-2 rounded-lg text-sm transition-colors ${role === 'Recruiter' ? 'bg-purple-700 text-white font-bold' : 'bg-white text-black border border-gray-300'}`}>
                  Recruiter
                </button>
              </div>
            </div>

            <div className="space-y-4">
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect width="20" height="16" x="2" y="4" rx="2" /><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                  </svg>
                </span>
                <input type="email" placeholder="Email address"
                  className="w-full pl-11 pr-4 py-3 rounded-xl border border-gray-200 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500" />
              </div>

              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect width="18" height="11" x="3" y="11" rx="2" ry="2" /><path d="M7 11V7a5 5 0 0 1 10 0v4" />
                  </svg>
                </span>
                <input type={showPassword ? 'text' : 'password'} placeholder="Password"
                  className="w-full pl-11 pr-11 py-3 rounded-xl border border-gray-200 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500" />
                <button type="button" onClick={() => setShowPassword(prev => !prev)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
                  {showPassword ? (
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94" />
                      <path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19" />
                      <line x1="1" y1="1" x2="23" y2="23" />
                    </svg>
                  ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" /><circle cx="12" cy="12" r="3" />
                    </svg>
                  )}
                </button>
              </div>

              <div className="flex items-center gap-2">
                <input type="checkbox" id="remember" className="w-4 h-4 text-purple-700 border-gray-300 rounded focus:ring-purple-500" />
                <label htmlFor="remember" className="text-sm text-gray-500">Remember me</label>
              </div>

              <button type="button" onClick={() => setView('dashboard')}
                className="w-full py-3 rounded-xl bg-purple-700 text-white font-bold text-sm hover:bg-purple-800 active:scale-[0.98] transition-all">
                Log in
              </button>
            </div>

            <p className="text-center mt-4">
              <button onClick={() => setView('forgot')} className="text-purple-700 text-sm font-medium hover:underline">
                Forgot password?
              </button>
            </p>
          </div>
        </div>

        <div className="px-6 pb-4 text-center flex-shrink-0">
          <p className="text-xs text-gray-400">
            <a href="#" onClick={e => e.preventDefault()} className="hover:underline">Privacy Policy</a>
            <span className="mx-2">·</span>
            <a href="#" onClick={e => e.preventDefault()} className="hover:underline">Terms of Service</a>
            <span className="mx-2">·</span>
            <a href="#" onClick={e => e.preventDefault()} className="hover:underline">Support</a>
          </p>
          <p className="text-xs text-green-600 mt-1">🟢 All systems operational</p>
        </div>
      </div>
    </div>
  );
}