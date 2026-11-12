import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  build: {
    // Keep every image as a file. Inlined data: URLs break the gallery
    // filter in constants and the admin import, which uploads by URL.
    assetsInlineLimit: 0,
  },
})
