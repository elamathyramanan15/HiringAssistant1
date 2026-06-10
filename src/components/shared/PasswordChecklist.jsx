export function PasswordChecklist({ password }) {
  const checks = [
    { label: 'Minimum 8 characters',  valid: password.length >= 8 },
    { label: 'One uppercase letter',  valid: /[A-Z]/.test(password) },
    { label: 'One number',            valid: /[0-9]/.test(password) },
    { label: 'One special character', valid: /[^A-Za-z0-9]/.test(password) },
  ];
  return (
    <div className="mt-2 p-3 bg-purple-50 rounded-lg border border-purple-100">
      <p className="text-xs font-semibold text-purple-700 mb-2">Password must contain:</p>
      <ul className="space-y-1.5">
        {checks.map((c) => (
          <li key={c.label} className="flex items-center gap-2 text-xs">
            <span className={`w-4 h-4 rounded flex items-center justify-center border flex-shrink-0 transition-colors ${c.valid ? 'bg-purple-600 border-purple-600' : 'bg-white border-gray-300'}`}>
              {c.valid && <svg className="w-2.5 h-2.5 text-white" fill="none" viewBox="0 0 10 8"><path d="M1 4l3 3 5-6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>}
            </span>
            <span className={c.valid ? 'text-purple-600 line-through opacity-60' : 'text-gray-500'}>{c.label}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
