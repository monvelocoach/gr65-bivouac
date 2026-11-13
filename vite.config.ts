import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      manifest: {
        name: 'GR65 Bivouac',
        short_name: 'GR65',
        description: 'App bivouac pour le GR65',
        theme_color: '#0C0A0E',
        icons: []
      }
    })
  ]
})
