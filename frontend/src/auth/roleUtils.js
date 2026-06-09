export const getStoredRole = () => {
  return localStorage.getItem("role") || sessionStorage.getItem("role");
};

export const getStoredToken = () => {
  return localStorage.getItem("token") || sessionStorage.getItem("token") ||
    localStorage.getItem("access_token") || sessionStorage.getItem("access_token");
};

export const clearAuthStorage = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("access_token");
  localStorage.removeItem("role");
  localStorage.removeItem("email");

  sessionStorage.removeItem("token");
  sessionStorage.removeItem("access_token");
  sessionStorage.removeItem("role");
  sessionStorage.removeItem("email");
};