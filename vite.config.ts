import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      devOptions: {
        enabled: true
      },
      manifest: {
        name: "My PWA App",
        short_name: "PWA",
        description: "A Progressive Web App",
        theme_color: "#ffffff",
        background_color: "#ffffff",
        display: "standalone",
      },
    }),
  ],
});
