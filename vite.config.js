import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: "/workflow",
  build: {
    chunkSizeWarningLimit: 1000 // Increase this limit as needed
  }
})
