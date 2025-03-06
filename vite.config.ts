import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';

export default defineConfig({
  build: {
    outDir: 'build', // Change this to 'build'
  },
  plugins: [
    react(),
  ],
});
