import path from "path"
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(),tailwindcss()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  server: {
    port: 5173,
    host: '0.0.0.0', // Permite conexões externas
    strictPort: true, // Garante que a porta 5173 será usada
    allowedHosts: ['team04-code-builders.onrender.com'] // Permite o domínio do Render
  }
})
