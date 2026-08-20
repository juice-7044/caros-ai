import { defineRouting } from "next-intl/routing"
import { createNavigation as createSharedPathnamesNavigation } from "next-intl/navigation"

export const routing = defineRouting({
  locales: [
    "en", "es", "fr", "ja", "zh", "de", "pl", "ru", "sq", "it", "ar", "hi",
    "pt-BR", "pt-PT",
  ],
  defaultLocale: "en",
  localePrefix: "always",
})

export const { Link, redirect, usePathname, useRouter, getPathname } = createSharedPathnamesNavigation(routing)
