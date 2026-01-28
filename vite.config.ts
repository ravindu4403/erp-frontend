import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");

  // In dev we can proxy /api/* -> backend.
  // Production should use `VITE_API_URL` (handled in src/api/axios.ts).
  const backend =
    env.VITE_API_URL || "https://psderpbackend-production.up.railway.app";

  return {
    plugins: [react()],
    server: {
      proxy: {
        "/api": {
          target: backend,
          changeOrigin: true,
          secure: false,
          // /api/auth/login -> /auth/login
          rewrite: (path) => path.replace(/^\/api/, ""),
        },
      },
    },
  };
});