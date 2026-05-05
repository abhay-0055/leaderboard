import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");
  const proxy = {};

  if (env.REFERRALS_CSV_URL) {
    const url = new URL(env.REFERRALS_CSV_URL);
    proxy["/api/referrals"] = {
      target: url.origin,
      changeOrigin: true,
      rewrite: () => url.pathname + url.search,
    };
  }

  if (env.POINTS_CSV_URL) {
    const url = new URL(env.POINTS_CSV_URL);
    proxy["/api/points"] = {
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
