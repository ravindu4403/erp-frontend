import axios from "axios";

// Use environment variable, fallback to current path for development
const baseURL = import.meta.env.VITE_API_URL 
  ? import.meta.env.VITE_API_URL 
  : "/api";

const api = axios.create({
  baseURL: baseURL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: false,
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