import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      manifest: {
        name: 'Weather App',
        short_name: 'Weather',
        start_url: '/',
        display: "standalone",
        description: 'A weather app created by Abbas Zabier',
        theme_color: '#ffffff',
        icons: [
          {
            src: '/cloudy.png',
            sizes: '192x192',
            type: 'image/png',
            purpose: "any maskable",
          },
          {
            src: '/cloudy.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'any maskable',
          },
        ],
      },
      workbox: {
        maximumFileSizeToCacheInBytes: 5000000,
      },
    })
  ],
});
