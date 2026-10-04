/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  reactStrictMode: true,
  poweredByHeader: false,
  images: { unoptimized: true },
  // Android emulator reaches your computer at 10.0.2.2 (dev server only, ignored by the static export)
  allowedDevOrigins: ["10.0.2.2", "localhost", "127.0.0.1"],
}
export default nextConfig
