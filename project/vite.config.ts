import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'dist', // Ensure this exists for Vercel deployment
  },
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
});
