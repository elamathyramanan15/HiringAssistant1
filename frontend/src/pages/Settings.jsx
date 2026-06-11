import { useEffect, useState } from 'react';
import { Camera, Lock, RefreshCw, LogOut, Eye, EyeOff } from 'lucide-react';
import { PasswordChecklist } from '../components/shared/PasswordChecklist';

export default function Settings({ setView }) {
  const getStoredUser = () => {
    return JSON.parse(
      localStorage.getItem('user') ||
      sessionStorage.getItem('user') ||
      '{}'
    );
  };

  const getProfileFromStorage = () => {
    const storedUser = getStoredUser();

    return {
      firstName: storedUser.first_name || '',
      lastName: storedUser.last_name || '',
      email: storedUser.email || '',
      phone: storedUser.phone_number || storedUser.phone || '',
      role: storedUser.role || '',
    };
  };

  const [profile, setProfile] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    role: '',
  });

  const [passwords, setPasswords] = useState({ current: '', newPass: '', confirm: '' });
  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [savedMsg, setSavedMsg] = useState('');

  useEffect(() => {
    setProfile(getProfileFromStorage());
  }, []);

  const handleSave = () => {
    setSavedMsg('Changes saved successfully!');
    setTimeout(() => setSavedMsg(''), 3000);
  };

  const handleReset = () => {
    if (!passwords.current) return alert('Please enter your current password.');
    if (passwords.newPass !== passwords.confirm) return alert('New passwords do not match.');
    alert('Password reset successfully!');
    setPasswords({ current: '', newPass: '', confirm: '' });
  };

  const handleCancel = () => {
    setProfile(getProfileFromStorage());
  };

  const handleSignOut = () => {
    localStorage.removeItem('access_token');
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    localStorage.removeItem('role');
    localStorage.removeItem('email');

    sessionStorage.removeItem('access_token');
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('user');
    sessionStorage.removeItem('role');
    sessionStorage.removeItem('email');

    setView && setView('login');
  };

  const avatarInitials =
    `${profile.firstName?.[0] || ''}${profile.lastName?.[0] || ''}`.toUpperCase() || 'U';

  const displayName =
    `${profile.firstName || ''} ${profile.lastName || ''}`.trim() || 'User';

  const displayRole =
    profile.role
      ? profile.role.charAt(0).toUpperCase() + profile.role.slice(1).toLowerCase()
      : 'User';

  const SectionCard = ({ icon, title, subtitle, children }) => (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
      <div className="flex items-center gap-4 px-6 py-5 border-b border-gray-100">
        <div className="w-10 h-10 bg-purple-100 rounded-xl flex items-center justify-center text-purple-600">{icon}</div>
        <div>
          <h2 className="text-base font-bold text-gray-900">{title}</h2>
          <p className="text-sm text-gray-500">{subtitle}</p>
        </div>
      </div>
      <div className="px-6 py-6">{children}</div>
    </div>
  );

  const PwField = ({ label, value, show, onToggle, onChange, placeholder }) => (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1.5">{label}</label>
      <div className="relative">
        <input type={show ? 'text' : 'password'} value={value} onChange={onChange} placeholder={placeholder}
          className="w-full px-4 py-2.5 pr-10 rounded-lg border border-gray-200 bg-gray-50 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition" />
        <button type="button" onClick={onToggle} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
          {show ? <EyeOff size={16}/> : <Eye size={16}/>}
        </button>
      </div>
    </div>
  );

  return (
    <main className="p-6 bg-gray-50 min-h-[calc(100vh-65px)]">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Settings</h1>
        <p className="text-sm text-gray-500 mt-0.5">Manage your account</p>
      </div>

      <div className="max-w-3xl space-y-6">

        {/* Personal Information */}
        <SectionCard
          icon={<svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/></svg>}
          title="Personal information"
          subtitle="Update your profile details"
        >
          {/* Avatar row */}
          <div className="flex items-center gap-4 mb-6 p-4 bg-gray-50 rounded-xl border border-gray-100">
            <div className="w-16 h-16 bg-purple-600 rounded-full flex items-center justify-center text-white text-xl font-bold flex-shrink-0">
              {avatarInitials}
            </div>

            <div className="flex-1">
              <p className="font-bold text-gray-900 text-base">{displayName}</p>
              <p className="text-sm text-gray-500">{displayRole}</p>
            </div>

            <button className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 border border-gray-200 rounded-lg hover:bg-gray-100 transition-colors">
              <Camera size={15}/>
              Upload photo
            </button>
          </div>

          {/* Fields */}
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">First name</label>
              <input value={profile.firstName} onChange={e => setProfile(p => ({ ...p, firstName: e.target.value }))}
                className="w-full px-4 py-2.5 rounded-lg border border-gray-200 bg-gray-50 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Last name</label>
              <input value={profile.lastName} onChange={e => setProfile(p => ({ ...p, lastName: e.target.value }))}
                className="w-full px-4 py-2.5 rounded-lg border border-gray-200 bg-gray-50 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Email address</label>
              <input type="email" value={profile.email} onChange={e => setProfile(p => ({ ...p, email: e.target.value }))}
                className="w-full px-4 py-2.5 rounded-lg border border-gray-200 bg-gray-50 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Phone number</label>
              <input value={profile.phone} onChange={e => setProfile(p => ({ ...p, phone: e.target.value }))}
                className="w-full px-4 py-2.5 rounded-lg border border-gray-200 bg-gray-50 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition" />
            </div>
          </div>
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Role</label>
            <input value={displayRole} readOnly
              className="w-full max-w-xs px-4 py-2.5 rounded-lg border border-gray-200 bg-gray-100 text-sm text-gray-500 cursor-not-allowed" />
          </div>

          {savedMsg && <p className="text-sm text-green-600 font-medium mb-3">{savedMsg}</p>}
          <div className="flex gap-3">
            <button onClick={handleCancel}
              className="px-5 py-2.5 text-sm font-medium text-gray-700 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">Cancel</button>
            <button onClick={handleSave}
              className="px-5 py-2.5 text-sm font-semibold text-white bg-purple-700 rounded-lg hover:bg-purple-800 transition-colors">Save Changes</button>
          </div>
        </SectionCard>

        {/* Password Management */}
        <SectionCard
          icon={<Lock size={20}/>}
          title="Password management"
          subtitle="Keep your account secure"
        >
          <div className="space-y-4 mb-6">
            <PwField label="Current password" value={passwords.current} show={showCurrent} onToggle={() => setShowCurrent(v => !v)}
              onChange={e => setPasswords(p => ({ ...p, current: e.target.value }))} placeholder="Enter current password" />
            <PwField label="New password" value={passwords.newPass} show={showNew} onToggle={() => setShowNew(v => !v)}
              onChange={e => setPasswords(p => ({ ...p, newPass: e.target.value }))} placeholder="Enter new password" />
            {passwords.newPass && <PasswordChecklist password={passwords.newPass} />}
            <PwField label="Confirm new password" value={passwords.confirm} show={showConfirm} onToggle={() => setShowConfirm(v => !v)}
              onChange={e => setPasswords(p => ({ ...p, confirm: e.target.value }))} placeholder="Confirm new password" />
          </div>
          <button onClick={handleReset}
            className="w-full py-2.5 text-sm font-semibold text-gray-800 border-2 border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
            Reset password
          </button>
        </SectionCard>

        {/* Account Actions */}
        <SectionCard
          icon={<svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"/><circle cx="12" cy="12" r="3" strokeWidth={1.5}/></svg>}
          title="Account actions"
          subtitle="Manage your active sessions"
        >
          <div className="space-y-3">
            {/* Refresh */}
            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl border border-gray-100">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center text-purple-600">
                  <RefreshCw size={18}/>
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-900">Refresh data now</p>
                  <p className="text-xs text-gray-500">Sync latest platform data</p>
                </div>
              </div>
              <button onClick={() => {
                setProfile(getProfileFromStorage());
                alert('Data refreshed!');
              }}
                className="px-4 py-2 text-sm font-semibold text-gray-800 border-2 border-gray-200 rounded-lg hover:bg-gray-100 transition-colors">
                Refresh
              </button>
            </div>

            {/* Sign out */}
            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl border border-gray-100">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center text-red-500">
                  <LogOut size={18}/>
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-900">Sign out</p>
                  <p className="text-xs text-gray-500">Log out of your current session</p>
                </div>
              </div>
              <button onClick={handleSignOut}
                className="px-4 py-2 text-sm font-semibold text-red-600 border-2 border-red-200 rounded-lg hover:bg-red-50 transition-colors">
                Sign out
              </button>
            </div>
          </div>
        </SectionCard>

      </div>
    </main>
  );
}