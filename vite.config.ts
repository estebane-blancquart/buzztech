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
          @use "@/theme/variables" as *;
        `,
      },
    },
  },
  test: {
    environment: 'jsdom',
    setupFiles: ['./src/core/tests/index.ts'],
    globals: true,
  },
});