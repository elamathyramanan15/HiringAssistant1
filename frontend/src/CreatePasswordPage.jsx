import { useState } from 'react';
import API from './api';

export default function CreatePasswordPage({ setView }) {
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [loading, setLoading] = useState(false);

  const token = new URLSearchParams(window.location.search).get('token');

  const checks = {
    minLength: newPassword.length >= 8,
    uppercase: /[A-Z]/.test(newPassword),
    number: /[0-9]/.test(newPassword),
    special: /[^A-Za-z0-9]/.test(newPassword),
  };

  const strength = Object.values(checks).filter(Boolean).length;
  const strengthColors = ['bg-gray-200', 'bg-red-400', 'bg-orange-400', 'bg-yellow-400', 'bg-green-500'];
  const strengthLabels = ['Enter a password', 'Weak', 'Fair', 'Good', 'Strong'];
  const strengthSegments = [0, 1, 2, 3].map(i => i < strength ? strengthColors[strength] : 'bg-gray-200');

  const handleUpdatePassword = async () => {
    try {
      if (!token) {
        alert('Reset token is missing');
        return;
      }

      setLoading(true);

      const response = await API.post('/auth/reset-password', {
        token,
        new_password: newPassword,
        confirm_password: confirmPassword,
      });

      alert(response.data.message);

      window.history.replaceState({}, '', '/');
      setView('login');
    } catch (error) {
      alert(error?.response?.data?.message || 'Password update failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-[#EDEEFA] py-6 px-4" style={{ minHeight: '100vh' }}>
      <div className="flex justify-center">
        <div className="bg-white rounded-3xl shadow-xl w-full max-w-md overflow-y-auto max-h-[90vh] px-8 py-6">

          {/* Back button */}
          <button
            onClick={() => setView('forgot')}
            className="border border-gray-200 rounded-xl px-4 py-1.5 text-sm text-gray-600 flex items-center gap-1 hover:bg-gray-100 transition mb-4"
          >
            ← Back
          </button>

          {/* Logo */}
          <div className="flex flex-col items-center mb-3">
            <div className="bg-purple-600 rounded-2xl p-2.5 mb-1.5">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect width="20" height="16" x="2" y="4" rx="2" />
                <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
              </svg>
            </div>
            <h1 className="text-lg font-bold">Hire<span className="text-purple-600">AI</span></h1>
          </div>

          {/* Key icon */}
          <div className="flex justify-center mb-3">
            <div className="bg-purple-100 rounded-full w-14 h-14 flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#7c3aed" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="7.5" cy="15.5" r="5.5" />
                <path d="m21 2-9.6 9.6" />
                <path d="m15.5 7.5 3 3L22 7l-3-3" />
              </svg>
            </div>
          </div>

          {/* Heading */}
          <h2 className="text-xl font-bold text-center text-gray-800 mb-1">Create new password</h2>
          <p className="text-center text-gray-500 text-xs mb-4">Create a strong password for your account.</p>

          {/* New Password */}
          <div className="mb-1">
            <label className="block text-sm text-gray-600 mb-1">New password</label>
            <div className="flex items-center border border-gray-200 rounded-xl px-4 py-2.5 focus-within:ring-2 focus-within:ring-purple-300">
              <input
                type={showNew ? 'text' : 'password'}
                placeholder="Enter new password"
                value={newPassword}
                onChange={e => setNewPassword(e.target.value)}
                className="flex-1 outline-none text-sm text-gray-800 bg-transparent"
              />
              <button onClick={() => setShowNew(!showNew)} className="text-gray-400 hover:text-gray-600 ml-2 text-sm">
                {showNew ? '🙈' : '👁️'}
              </button>
            </div>
          </div>

          {/* Strength bar */}
          <div className="flex gap-1 mb-1">
            {strengthSegments.map((color, i) => (
              <div key={i} className={`h-1 flex-1 rounded-full transition-all duration-300 ${color}`} />
            ))}
          </div>
          <p className="text-xs text-gray-400 mb-3">{newPassword ? strengthLabels[strength] : 'Enter a password'}</p>

          {/* Requirements */}
          <div className="bg-gray-50 border border-gray-100 rounded-xl px-4 py-2.5 mb-4">
            <p className="text-purple-600 font-semibold text-xs mb-1.5">Password must contain:</p>
            {[
              { label: 'Minimum 8 characters', key: 'minLength' },
              { label: 'One uppercase letter', key: 'uppercase' },
              { label: 'One number', key: 'number' },
              { label: 'One special character', key: 'special' },
            ].map(({ label, key }) => (
              <div key={key} className="flex items-center gap-2 text-xs mb-1">
                <span className={checks[key] ? 'text-green-500' : 'text-gray-300'}>
                  {checks[key] ? '✅' : '☐'}
                </span>
                <span className={checks[key] ? 'text-green-600' : 'text-gray-400'}>{label}</span>
              </div>
            ))}
          </div>

          {/* Confirm Password */}
          <div className="mb-4">
            <label className="block text-sm text-gray-600 mb-1">Confirm password</label>
            <div className="flex items-center border border-gray-200 rounded-xl px-4 py-2.5 focus-within:ring-2 focus-within:ring-purple-300">
              <input
                type={showConfirm ? 'text' : 'password'}
                placeholder="Re-enter your password"
                value={confirmPassword}
                onChange={e => setConfirmPassword(e.target.value)}
                className="flex-1 outline-none text-sm text-gray-800 bg-transparent"
              />
              <button onClick={() => setShowConfirm(!showConfirm)} className="text-gray-400 hover:text-gray-600 ml-2 text-sm">
                {showConfirm ? '🙈' : '👁️'}
              </button>
            </div>
            {confirmPassword && newPassword !== confirmPassword && (
              <p className="text-red-500 text-xs mt-1">Passwords do not match</p>
            )}
          </div>

          {/* Update Password Button */}
          <button
            onClick={() => {
              if (newPassword === confirmPassword && strength === 4) {
                handleUpdatePassword();
              }
            }}
            className={`w-full font-bold rounded-xl py-2.5 transition mb-4 text-sm ${
              newPassword === confirmPassword && strength === 4
                ? 'bg-gradient-to-r from-purple-600 to-violet-500 text-white hover:opacity-90'
                : 'bg-gray-100 text-gray-400 cursor-not-allowed'
            }`}
          >
            {loading ? 'Updating...' : 'Update Password'}
          </button>

          {/* Footer */}
          <p className="text-center text-xs text-gray-400">
            Need help? <span className="text-purple-600 cursor-pointer">Contact Support</span>
            {' · '}<span className="text-purple-600 cursor-pointer">Privacy Policy</span>
          </p>

        </div>
      </div>
    </div>
  );
}