import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
// console.log(import.meta.env.REACT_APP_BACKENDURI);

export default defineConfig({
  plugins: [react()],
  server: {
    port:10000,
    host: '0.0.0.0', 
    allowedHosts: ['*'], 
    proxy:{
      '/api': {
        target: 'https://tech-job-portal.onrender.com', // Use the environment variable
        changeOrigin: true,
        secure:false
      },
    },
  },
});



