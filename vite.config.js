import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'https://uangku-api.my.id', // URL server API
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''), // Menghapus '/api' dari path
      },
    },
  },
});
