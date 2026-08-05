export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000/api";

const API_SERVER_URL = API_BASE_URL.replace(/\/api\/?$/, "");

// Gallery assets are served by the API server, which may run on a different
// host or port from the Vite frontend.
export const getMediaUrl = (src) => {
  if (!src) return "";
  if (src.startsWith("/media/")) return `${API_SERVER_URL}${src}`;

  try {
    const url = new URL(src);
    if (url.pathname.startsWith("/media/") && ["localhost", "127.0.0.1"].includes(url.hostname)) {
      return `${API_SERVER_URL}${url.pathname}`;
    }
  } catch {
    return src;
  }

  return src;
};

export const getAuthHeaders = () => {
  const token = localStorage.getItem("adminToken");
  return token ? { Authorization: `Bearer ${token}` } : {};
};

export const setAuthToken = (token) => {
  localStorage.setItem("adminToken", token);
};

export const clearAuthToken = () => {
  localStorage.removeItem("adminToken");
};

export const isAdminLoggedIn = () => Boolean(localStorage.getItem("adminToken"));
