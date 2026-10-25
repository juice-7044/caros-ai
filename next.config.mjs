import createNextIntlPlugin from "next-intl/plugin"

const withNextIntl = createNextIntlPlugin("./i18n/request.ts")

/** @type {import('next').NextConfig} */
const securityHeaders = [
  { key: "Content-Security-Policy", value: [
    "default-src 'self'",
    "base-uri 'self'",
    "object-src 'none'",
    "frame-ancestors 'self'",
    "script-src 'self' 'unsafe-inline' https://www.googletagmanager.com https://www.google-analytics.com https://links.getcaros.com https://widget.trustpilot.com https://widgets.leadconnectorhq.com https://stcdn.leadconnectorhq.com https://services.leadconnectorhq.com https://dashboard.retellai.com",
    "style-src 'self' 'unsafe-inline' https://stcdn.leadconnectorhq.com https://fonts.bunny.net https://fonts.googleapis.com",
    "font-src 'self' https://fonts.gstatic.com https://fonts.bunny.net data:",
    "img-src 'self' data: blob: https:",
    "connect-src 'self' https://www.google-analytics.com https://analytics.google.com https://links.getcaros.com https://backend.leadconnectorhq.com https://widgets.leadconnectorhq.com https://services.leadconnectorhq.com https://services.msgsndr.com https://api.retellai.com wss://api.retellai.com https://*.livekit.cloud wss://*.livekit.cloud",
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
  images: {
    unoptimized: true,
  },
}

export default withNextIntl(nextConfig)
