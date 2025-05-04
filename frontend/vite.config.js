import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'path'

export default defineConfig({
  root: '.',
  plugins: [react()],
  build: {
    outDir: resolve(__dirname, '../backend/public'),
    emptyOutDir: true
  },
  server: {
    proxy: {
      '/api': 'http://localhost:5000'
    }
  }
})

