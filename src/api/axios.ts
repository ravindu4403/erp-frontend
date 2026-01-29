import axios from "axios";

// In production (Railway/Netlify) you MUST set `VITE_API_URL`.
// Example:
//   VITE_API_URL=https://psderpbackend-production.up.railway.app
// If you don't set it, it will fall back to "/api" (useful only when you have a proxy).
const API_BASE_URL = import.meta.env.VITE_API_URL || "/api";

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: false, // no cookies needed
});

// Attach Authorization token automatically
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
