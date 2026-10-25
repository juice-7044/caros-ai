import createMiddleware from "next-intl/middleware"
import {NextRequest} from "next/server"
import {routing} from "@/i18n/routing"

const intlMiddleware = createMiddleware(routing)

export default function middleware(request: NextRequest) {
  // Lets the locale layout emit a self-referencing canonical + hreflang for every page.
  request.headers.set("x-caros-pathname", request.nextUrl.pathname)
  const response = intlMiddleware(request)
  const localeCookie = response.cookies.get("NEXT_LOCALE")

  if (localeCookie) {
    response.cookies.set("NEXT_LOCALE", localeCookie.value, {
      httpOnly: true,
      secure: true,
      sameSite: "lax",
      path: "/",
    })
  }

  return response
}

export const config = {
  matcher: [
    "/((?!api|_next|_vercel|.*\\..*).*)",
  ],
}
