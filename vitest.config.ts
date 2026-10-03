import { defineConfig } from "vitest/config"
import path from "node:path"

export default defineConfig({
  test: {
    environment: "node",
    include: ["lib/**/*.test.ts"],
    // Legacy web-PWA test: this mobile build uses public/sw.js, not public/service-worker.js
    exclude: ["node_modules/**", "lib/calculators/service-worker-routes.test.ts"],
  },
  resolve: { alias: { "@": path.resolve(process.cwd(), ".") } },
})
