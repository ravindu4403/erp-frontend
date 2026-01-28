import axios from "axios";

const BASE = (import.meta.env.VITE_API_URL || "").replace(/\/$/, ""); // remove last /

const api = axios.create({
  baseURL: `${BASE}/api`,
  headers: { "Content-Type": "application/json" },
  withCredentials: false,
});

export default api;
