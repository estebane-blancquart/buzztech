import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [
    react(),
    {
      name: 'inject-base-tag',
      transformIndexHtml(html) {
        return html.replace('<head>', '<head><base href="/buzztech/">')
      },
    },
  ],
  base: '/buzztech/',
})
