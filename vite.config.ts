// vite.config.ts
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],

  preview: {
    // Add your Railway domain here to allow Vite preview host checks.
    allowedHosts: ["erp-frontend-production-4f4c.up.railway.app"],
  },
});
