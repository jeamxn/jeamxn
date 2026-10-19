import { reactRouter } from "@react-router/dev/vite";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "vite";

const basePath =
  `/${(process.env.JEAMXN_BASE_PATH ?? "/").split("/").filter(Boolean).join("/")}/`.replace(
    /^\/\/$/,
    "/",
  );

export default defineConfig({
  base: basePath,
  define: {
    "import.meta.env.VITE_SITE_URL": JSON.stringify(
      process.env.JEAMXN_SITE_URL ?? "https://jeamxn.dev",
    ),
  },
  plugins: [tailwindcss(), reactRouter()],
  resolve: { tsconfigPaths: true },
  server: {
    host: true,
    port: Number(process.env.WEB_PORT ?? 5410),
    strictPort: true,
  },
});
