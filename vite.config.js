import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");
  const csvUrl = env.CSV_URL ? new URL(env.CSV_URL) : null;

  return {
    plugins: [react()],
    server: {
      proxy: csvUrl
        ? {
            "/api/csv": {
              target: csvUrl.origin,
              changeOrigin: true,
              rewrite: () => csvUrl.pathname + csvUrl.search,
            },
          }
        : {},
    },
  };
});
