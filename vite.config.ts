import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'path'

export default defineConfig({
  plugins: [
    react(),
    {
      name: 'inject-base-tag',
      transformIndexHtml(html) {
        return html.replace(
          '<head>',
          '<head><base href="/">'
        );
      },
    },
  ],
  base: '/',
  publicDir: resolve(__dirname, 'public'),
})
