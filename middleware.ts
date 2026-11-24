import createMiddleware from "next-intl/middleware"
import {NextRequest, NextResponse} from "next/server"
import {routing} from "@/i18n/routing"
import {pricingReviewMode} from "@/lib/pricing-review"

const intlMiddleware = createMiddleware(routing)

// next-intl answers a locale-less address such as /pricing with a **temporary** 307 to /en/pricing. Search engines treat
// a temporary redirect as "the original address is still the canonical one", so on 15 Nov 2026 Search Console reported
// 40 of the 96 sitemap pages as "Duplicate without user-selected canonical", with Google's canonical pointing at the
// locale-less address. Making the same redirect permanent (308) tells Google the /en/... address is the one to keep, and
// the duplicates should fold in as pages are recrawled. Nothing changes for a visitor: a browser follows both.
export default function middleware(request: NextRequest) {
  const reviewOnly = pricingReviewMode(process.env)
  if (reviewOnly && !["GET", "HEAD", "OPTIONS"].includes(request.method)) {
    return NextResponse.json({ok:false,error:"Review preview: submissions are disabled."}, {status:405,headers:{"Cache-Control":"no-store"}})
  }
  if (request.nextUrl.pathname.startsWith("/api/")) return NextResponse.next()
  // Lets the locale layout emit a self-referencing canonical + hreflang for every page.
  request.headers.set("x-caros-pathname", request.nextUrl.pathname)
  const response = intlMiddleware(request)
  let out = response
  if (response.status === 307) {
    const location = response.headers.get("location")
    if (location) {
      out = NextResponse.redirect(new URL(location, request.url), 308)
      for (const cookie of response.cookies.getAll()) out.cookies.set(cookie)
    }
  }
  const localeCookie = out.cookies.get("NEXT_LOCALE")
  if (localeCookie) {
    out.cookies.set("NEXT_LOCALE", localeCookie.value, {
      httpOnly: true,
      secure: true,
      sameSite: "lax",
      path: "/",
    })
  }
  if (reviewOnly) out.headers.set("X-Robots-Tag", "noindex, nofollow")
  return out
}

export const config = {
  matcher: [
    "/api/:path*",
    "/((?!api|_next|_vercel|.*\\..*).*)",
  ],
}
