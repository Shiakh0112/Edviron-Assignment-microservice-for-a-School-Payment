import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
  },
  build: {
<<<<<<< HEAD
    outDir: "dist",
=======
    outDir: "dist"
>>>>>>> 2d22727fe96947488a983d0e41256aefc6fd409b
  },
  // ⚡ ye sabse important hai refresh issue solve karne ke liye
  preview: {
    port: 5000,
  },
<<<<<<< HEAD
});
=======
})
>>>>>>> 2d22727fe96947488a983d0e41256aefc6fd409b
