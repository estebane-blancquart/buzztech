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
                additionalData: "\n          @use \"@/theme/mixins\" as *;\n          @use \"@/theme/variables\" as *;\n        ",
            },
        },
    },
});
