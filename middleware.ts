import createMiddleware from "next-intl/middleware"
import {NextRequest} from "next/server"
import {routing} from "@/i18n/routing"

const intlMiddleware = createMiddleware(routing)

export default function middleware(request: NextRequest) {
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
