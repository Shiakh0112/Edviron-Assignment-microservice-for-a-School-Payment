import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
  },
  build: {
    outDir: "dist",
  },
  // ⚡ ye sabse important hai refresh issue solve karne ke liye
  preview: {
    port: 5000,
  },
});
