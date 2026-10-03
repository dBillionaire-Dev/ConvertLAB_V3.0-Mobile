import type { CapacitorConfig } from "@capacitor/cli"

const config: CapacitorConfig = {
  appId: "com.convertlab.app",
  appName: "ConvertLAB",
  webDir: "out",
  server: {
    androidScheme: "https",
  },
}

export default config
