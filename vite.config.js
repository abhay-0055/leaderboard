import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");
  const proxy = {};

  if (env.REGISTRATIONS_CSV_URL) {
    const url = new URL(env.REGISTRATIONS_CSV_URL);
    proxy["/api/registrations"] = {
      target: url.origin,
      changeOrigin: true,
      rewrite: () => url.pathname + url.search,
    };
  }

  return {
    plugins: [react()],
    server: { proxy },
  };
});
