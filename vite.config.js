import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [react(), tailwindcss()],
  base: '/',

  preview: {
    host: true,
    port: process.env.PORT || 4173,
    allowedHosts: [
      'www.jajisinnovation.com',
      'jajisinnovation.com',
      '.up.railway.app',
    ],
  },

  build: {
    outDir: 'dist',
    sourcemap: false,
    minify: 'terser',
  },
})
