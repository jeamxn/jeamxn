import { reactRouter } from "@react-router/dev/vite";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "vite";
export default defineConfig({
  plugins: [tailwindcss(), reactRouter()],
  resolve: { tsconfigPaths: true },
  server: {
    host: true,
    port: Number(process.env.WEB_PORT ?? 5410),
    strictPort: true,
    proxy: {
      "/api": {
        target: process.env.JEAMXN_DEV_API_URL ?? "http://127.0.0.1:5411",
        changeOrigin: true,
      },
    },
  },
});
