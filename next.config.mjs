import createNextIntlPlugin from "next-intl/plugin"

const withNextIntl = createNextIntlPlugin("./i18n/request.ts")

/** @type {import('next').NextConfig} */
const securityHeaders = [
  { key: "Content-Security-Policy", value: [
    "default-src 'self'",
    "base-uri 'self'",
    "object-src 'none'",
    "frame-ancestors 'self'",
    "script-src 'self' 'unsafe-inline' https://www.googletagmanager.com https://www.google-analytics.com https://widget.trustpilot.com https://dashboard.retellai.com https://connect.facebook.net",
    "style-src 'self' 'unsafe-inline' https://fonts.bunny.net https://fonts.googleapis.com",
    "font-src 'self' https://fonts.gstatic.com https://fonts.bunny.net data:",
    "img-src 'self' data: blob: https:",
    "connect-src 'self' https://ask.getcaros.com https://www.google-analytics.com https://analytics.google.com https://api.retellai.com wss://api.retellai.com https://*.livekit.cloud wss://*.livekit.cloud https://www.facebook.com https://connect.facebook.net",
    "frame-src 'self' https://www.googletagmanager.com https://widget.trustpilot.com",
    "media-src 'self' blob:",
    "form-action 'self'",
    "upgrade-insecure-requests",
  ].join('; ') },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains" },
  { key: "X-Frame-Options", value: "SAMEORIGIN" },
  { key: "Permissions-Policy", value: "camera=(), microphone=(self), geolocation=()" },
]

const nextConfig = {
  async headers() {
    return [{ source: "/(.*)", headers: securityHeaders }]
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  // Optimizer on (AVIF/WebP) for the Command Center screenshot; it is the only next/image user.
  images: {
    formats: ["image/avif", "image/webp"],
    deviceSizes: [360, 480, 640, 768, 1024, 1280, 1600, 1920],
  },
}

export default withNextIntl(nextConfig)
