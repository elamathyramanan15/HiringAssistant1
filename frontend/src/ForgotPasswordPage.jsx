import { useState } from 'react';
import API from './api';

export default function ForgotPasswordPage({ setView }) {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSendResetLink = async () => {
    try {
      setLoading(true);

      const response = await API.post('/auth/forgot-password', {
        email,
      });

      alert(response.data.message);

      if (response.data.data?.reset_link) {
        console.log('Reset Link:', response.data.data.reset_link);
      }

    } catch (error) {
      alert(error?.response?.data?.message || 'Unable to send reset link');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full bg-[#EDEEFA] flex items-center justify-center py-8 px-4">
      <div className="bg-white rounded-3xl shadow-xl w-full max-w-md overflow-y-auto max-h-[90vh] px-10 py-8">

        <button onClick={() => setView('login')}
          className="border border-gray-200 rounded-xl px-4 py-1.5 text-sm text-gray-600 flex items-center gap-1 hover:bg-gray-100 transition mb-6">
          ← Back
        </button>

        <div className="flex flex-col items-center mb-4">
          <div className="bg-purple-600 rounded-2xl p-3 mb-2">
            <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect width="20" height="16" x="2" y="4" rx="2" /><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
            </svg>
          </div>
          <h1 className="text-xl font-bold">Hire<span className="text-purple-600">AI</span></h1>
        </div>

        <div className="flex justify-center mb-4">
          <div className="bg-purple-100 rounded-full w-16 h-16 flex items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#7c3aed" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect width="18" height="11" x="3" y="11" rx="2" ry="2" /><path d="M7 11V7a5 5 0 0 1 10 0v4" />
            </svg>
          </div>
        </div>

        <h2 className="text-2xl font-bold text-center text-gray-800 mb-2">Forgot Password?</h2>
        <p className="text-center text-gray-500 text-sm mb-5">
          Enter your registered email address and we will send you a password reset link.
        </p>

        <div className="mb-3">
          <label className="block text-sm text-gray-600 mb-1">Email Address</label>
          <input
            type="email"
            placeholder="you@company.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="border border-gray-200 rounded-xl px-4 py-3 w-full focus:outline-none focus:ring-2 focus:ring-purple-300"
          />
        </div>

        <div className="bg-purple-50 border border-purple-100 rounded-xl px-4 py-3 text-purple-700 text-sm flex items-center gap-2 mb-5">
          <span>ℹ️</span> A password reset link will be sent to your email address.
        </div>

        <button
          onClick={handleSendResetLink}
          className="w-full bg-gradient-to-r from-purple-600 to-violet-500 text-white font-bold rounded-xl py-3 hover:opacity-90 transition mb-4">
          {loading ? 'Sending...' : 'Send Reset Link'}
        </button>

        <div className="flex items-center gap-3 mb-4">
          <hr className="flex-1 border-gray-200" />
          <span className="text-sm text-gray-400">or</span>
          <hr className="flex-1 border-gray-200" />
        </div>

        <button onClick={() => setView('login')}
          className="w-full border border-gray-200 rounded-xl py-3 text-gray-700 hover:bg-gray-50 transition">
          ← Back to Login
        </button>

        <p className="text-center text-xs text-gray-400 mt-6">
          Need help? <span className="text-purple-600 cursor-pointer">Contact Support</span>
          {' · '}<span className="text-purple-600 cursor-pointer">Privacy Policy</span>
        </p>

      </div>
    </div>
  );
}