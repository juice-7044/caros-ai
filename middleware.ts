import createMiddleware from "next-intl/middleware"
import {NextRequest} from "next/server"
import {routing} from "@/i18n/routing"

const intlMiddleware = createMiddleware(routing)

export default function middleware(request: NextRequest) {
  console.log("Middleware running for:", request.nextUrl.pathname)
  return intlMiddleware(request)
}

export const config = {
  matcher: [
    "/((?!api|_next|_vercel|.*\\..*).*)",
  ],
}
