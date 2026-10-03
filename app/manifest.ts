import type { MetadataRoute } from "next"

export const dynamic = "force-static"

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "ConvertLAB",
    short_name: "ConvertLAB",
    description: "Clinical calculators, lab tools, conversions and references.",
    start_url: "/",
    display: "standalone",
    background_color: "#f7f9fc",
    theme_color: "#073a68",
    orientation: "portrait",
    icons: [
      { src: "/icon-192x192.png", sizes: "192x192", type: "image/png" },
      { src: "/icon-512x512.png", sizes: "512x512", type: "image/png" }
    ]
  }
}
