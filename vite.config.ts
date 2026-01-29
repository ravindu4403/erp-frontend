// vite.config.ts
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],

  preview: {
    // Railway domain එක exact එක add කරන්න
    allowedHosts: ["erp-frontend-production-4f4c.up.railway.app"],
  },
});
