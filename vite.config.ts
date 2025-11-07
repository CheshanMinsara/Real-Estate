import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // Use a relative base so the app works when served from a subpath or from GitHub Pages
  // './' makes asset URLs relative to the current path and is more forgiving for GH Pages
  base: './',
})