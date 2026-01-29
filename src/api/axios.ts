import axios from "axios";

const rawApiUrl = (import.meta.env.VITE_API_URL || "").trim();
const normalizedApiUrl = rawApiUrl.replace(/\/+$/, ""); // trailing / අයින් කරනවා

const resolvedBaseURL = normalizedApiUrl
  ? normalizedApiUrl.endsWith("/api")
    ? normalizedApiUrl
    : `${normalizedApiUrl}/api`
  : "/api";

const api = axios.create({
  baseURL: resolvedBaseURL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: false,
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
