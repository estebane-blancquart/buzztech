/// <reference types="vitest" />
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
  plugins: [react()],
  
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
  },
  
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `
          @use "@/theme/mixins" as *;
          @use "@/theme/tokens" as *;
        `,
      },
    },
  },

  // 🚀 OPTIMISATIONS POUR LA PROD
  build: {
    // Minification agressive
    minify: 'esbuild',
    
    // Taille maximale des chunks pour éviter les gros fichiers
    chunkSizeWarningLimit: 1000,
    
    rollupOptions: {
      output: {
        // Séparer les dépendances tierces du code de l'app
        manualChunks: {
          'react-vendor': ['react', 'react-dom', 'react-router-dom'],
          'icons': ['react-icons'],
        },
        
        // Noms de fichiers avec hash pour le cache navigateur
        assetFileNames: 'assets/[name].[hash][extname]',
        chunkFileNames: 'assets/[name].[hash].js',
        entryFileNames: 'assets/[name].[hash].js',
      },
    },
    
    // Optimisation des assets
    assetsInlineLimit: 4096, // Inline les petites images en base64
    cssCodeSplit: true, // Split le CSS par route
    sourcemap: false, // Désactiver en prod pour réduire la taille
  },

  test: {
    environment: 'jsdom',
    setupFiles: ['./src/core/tests/index.ts'],
    globals: true,
  },
});