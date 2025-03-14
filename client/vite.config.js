import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
// console.log(import.meta.env.REACT_APP_BACKENDURI);

  export default defineConfig({
    server: {
      host: '0.0.0.0',
      port: 4562,
      proxy: {
        '/api': {
          target: "https://tech-job-portal.onrender.com",
          changeOrigin: true,
          secure: false,
        },
      },
        allowedHosts: ['tech-job-portal-1.onrender.com'],
    },
    plugins: [react()],
});



