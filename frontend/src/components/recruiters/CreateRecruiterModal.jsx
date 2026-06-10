import { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import { PasswordChecklist } from '../shared/PasswordChecklist';
import { departments, recruiterRoles } from '../../data/mockData';
import {
  validateEmail,
  validatePhone,
  validateStrongPassword,
  validateName
} from '../../auth/validation';

const InputField = ({ label, name, type='text', placeholder, icon, form, set, errors }) => (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1.5">{label} <span className="text-red-500">*</span></label>
      <div className="relative">
        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">{icon}</span>
        <input type={type} value={form[name]} onChange={e => set(name, e.target.value)} placeholder={placeholder}
          className={`w-full pl-9 pr-3 py-2.5 rounded-lg border text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition ${errors[name] ? 'border-red-400 bg-red-50' : 'border-gray-200 bg-gray-50'}`} />
      </div>
      {errors[name] && <p className="text-xs text-red-500 mt-1">{errors[name]}</p>}
    </div>
  );
export function CreateRecruiterModal({ onClose }) {
  const [form, setForm] = useState({ firstName:'', lastName:'', email:'', phone:'', role:'', department:'', password:'', sendCredentials: true });
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const set = (k, v) => setForm(f => ({ ...f, [k]: v }));
const validate = () => {
  const e = {};

  e.firstName = validateName(form.firstName, "First name");
  e.lastName = validateName(form.lastName, "Last name");
  e.email = validateEmail(form.email);
  e.phone = validatePhone(form.phone);
  e.password = validateStrongPassword(form.password);

  if (!form.role) e.role = "Recruiter role is required";
  if (!form.department) e.department = "Department is required";

  Object.keys(e).forEach((key) => {
    if (!e[key]) delete e[key];
  });

  setErrors(e);
  return Object.keys(e).length === 0;
};
  const handleSubmit = () => { if (validate()) { alert('Recruiter created successfully!'); onClose(); } };

  

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl mx-4 max-h-[90vh] flex flex-col">
        <div className="px-8 pt-7 pb-5 border-b border-gray-100 flex-shrink-0">
          <div className="flex items-start justify-between">
            <div>
              <nav className="flex items-center gap-1 text-xs text-gray-400 mb-2">
                <span>Dashboard</span><span>›</span><span>Recruiters</span><span>›</span>
                <span className="text-purple-600 font-medium">Create Recruiter</span>
              </nav>
              <h2 className="text-2xl font-bold text-gray-900">Create Recruiter</h2>
              <p className="text-sm text-gray-500 mt-1">Add a new recruiter account to your platform</p>
            </div>
            <button onClick={onClose} className="p-1.5 rounded-lg text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-colors">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12"/></svg>
            </button>
          </div>
        </div>
        <div className="overflow-y-auto flex-1 px-8 py-6 space-y-7">
          <section>
            <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-widest mb-4 pb-2 border-b border-gray-100">Personal Information</h3>
            <div className="grid grid-cols-2 gap-4">
             <InputField
  label="First Name"
  name="firstName"
  form={form}
  set={set}
  errors={errors}
  placeholder="Enter first name"
  icon={<svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/></svg>}
/>

<InputField
  label="Last Name"
  name="lastName"
  form={form}
  set={set}
  errors={errors}
  placeholder="Enter last name"
  icon={<svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/></svg>}
/>

<InputField
  label="Work Email Address"
  name="email"
  type="email"
  form={form}
  set={set}
  errors={errors}
  placeholder="email@company.com"
  icon={<svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/></svg>}
/>

<InputField
  label="Phone Number"
  name="phone"
  form={form}
  set={set}
  errors={errors}
  placeholder="Enter 10-digit phone number"
  icon={<svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/></svg>}
/>
            </div>
          </section>
          <section>
            <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-widest mb-4 pb-2 border-b border-gray-100">Role Assignment</h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Recruiter Role <span className="text-red-500">*</span></label>
                <select value={form.role} onChange={e => set('role', e.target.value)} className={`w-full px-3 py-2.5 rounded-lg border text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 transition ${errors.role ? 'border-red-400 bg-red-50' : 'border-gray-200 bg-gray-50'}`}>
                  <option value="">Select role</option>
                  {recruiterRoles.map(r => <option key={r}>{r}</option>)}
                </select>
                {errors.role && <p className="text-xs text-red-500 mt-1">{errors.role}</p>}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Department <span className="text-red-500">*</span></label>
                <select value={form.department} onChange={e => set('department', e.target.value)} className={`w-full px-3 py-2.5 rounded-lg border text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 transition ${errors.department ? 'border-red-400 bg-red-50' : 'border-gray-200 bg-gray-50'}`}>
                  <option value="">Select department</option>
                  {departments.map(d => <option key={d}>{d}</option>)}
                </select>
                {errors.department && <p className="text-xs text-red-500 mt-1">{errors.department}</p>}
              </div>
            </div>
          </section>
          <section>
            <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-widest mb-4 pb-2 border-b border-gray-100">Account Setup</h3>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Password <span className="text-red-500">*</span></label>
              <div className="relative">
                <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"/></svg>
                <input type={showPassword ? 'text' : 'password'} value={form.password} onChange={e => set('password', e.target.value)} placeholder="Enter password"
                  className={`w-full pl-9 pr-10 py-2.5 rounded-lg border text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 transition ${errors.password ? 'border-red-400 bg-red-50' : 'border-gray-200 bg-gray-50'}`} />
                <button type="button" onClick={() => setShowPassword(v => !v)} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
                  {showPassword ? <EyeOff size={16}/> : <Eye size={16}/>}
                </button>
              </div>
              {errors.password && <p className="text-xs text-red-500 mt-1">{errors.password}</p>}
              <PasswordChecklist password={form.password} />
            </div>
            <div className="mt-4 p-4 bg-gray-50 rounded-xl border border-gray-200">
              <label className="flex items-start gap-3 cursor-pointer select-none">
                <div onClick={() => set('sendCredentials', !form.sendCredentials)}
                  className={`mt-0.5 w-4 h-4 rounded border-2 flex items-center justify-center flex-shrink-0 transition-colors cursor-pointer ${form.sendCredentials ? 'bg-purple-600 border-purple-600' : 'bg-white border-gray-300'}`}>
                  {form.sendCredentials && <svg className="w-2.5 h-2.5 text-white" fill="none" viewBox="0 0 10 8"><path d="M1 4l3 3 5-6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>}
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-800">Send credentials by email</p>
                  <p className="text-xs text-gray-500 mt-0.5">The recruiter will receive their login credentials via email automatically</p>
                </div>
              </label>
            </div>
          </section>
        </div>
        <div className="px-8 py-5 border-t border-gray-100 flex justify-end gap-3 flex-shrink-0">
          <button onClick={onClose} className="px-5 py-2.5 text-sm font-medium text-gray-700 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">Cancel</button>
          <button onClick={handleSubmit} className="px-6 py-2.5 text-sm font-semibold text-white bg-purple-700 rounded-lg hover:bg-purple-800 transition-colors shadow-sm">Create Recruiter</button>
        </div>
      </div>
    </div>
  );
}
