import { defineRouting } from "next-intl/routing"
import { createNavigation as createSharedPathnamesNavigation } from "next-intl/navigation"

export const routing = defineRouting({
  locales: ["en", "es"],
  defaultLocale: "en",
  localePrefix: "always",
})

export const { Link, redirect, usePathname, useRouter, getPathname } = createSharedPathnamesNavigation(routing)
