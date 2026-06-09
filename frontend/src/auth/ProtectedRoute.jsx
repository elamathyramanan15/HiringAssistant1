export default function ProtectedRoute({ children, allowedRoles, setView }) {
  const token =
    localStorage.getItem("token") || sessionStorage.getItem("token") ||
    localStorage.getItem("access_token") || sessionStorage.getItem("access_token");

  const role =
    localStorage.getItem("role") || sessionStorage.getItem("role");

  const normalizedRole = role?.toString().toLowerCase();
  const normalizedAllowedRoles = allowedRoles?.map((r) => r.toString().toLowerCase());

  if (!token) {
    setView("login");
    return null;
  }

  if (normalizedAllowedRoles && !normalizedAllowedRoles.includes(normalizedRole)) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <h1 className="text-2xl font-bold text-red-600">
          403 - Unauthorized Access
        </h1>
      </div>
    );
  }

  return children;
}