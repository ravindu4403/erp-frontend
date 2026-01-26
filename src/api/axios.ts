// Temporary axios config for testing
import axios from "axios";

// Hardcode for production testing
const baseURL = window.location.hostname.includes('vercel.app')
  ? "https://jayanthatradersprdbackend-dev.up.railway.app"
  : "/api";

const api = axios.create({
  baseURL: baseURL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: false,
});

export default api;