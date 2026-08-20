"use client"

import { useParams, usePathname } from "next/navigation"
import { Link } from "@/i18n/routing"

const locales = [
  { code: "en", label: "English" },
  { code: "es", label: "Español" },
  { code: "fr", label: "Français" },
  { code: "ja", label: "日本語" },
  { code: "zh", label: "中文" },
  { code: "de", label: "Deutsch" },
  { code: "pl", label: "Polski" },
  { code: "ru", label: "Русский" },
  { code: "sq", label: "Shqip" },
  { code: "it", label: "Italiano" },
  { code: "ar", label: "العربية" },
  { code: "hi", label: "हिन्दी" },
  { code: "pt-BR", label: "Português (BR)" },
  { code: "pt-PT", label: "Português (PT)" },
] as const

export function LanguageSwitcher() {
  const pathname = usePathname()
  const params = useParams<{ locale?: string }>()
  const currentLocale = params.locale ?? "en"
  const currentPathname = pathname || "/"

  console.log("Current pathname:", pathname)
  console.log("Current locale from params:", currentLocale)

  return (
    <nav className="flex max-w-full flex-wrap items-center gap-x-3 gap-y-1" aria-label="Language selection">
      {locales.map((locale) => (
        <Link
          key={locale.code}
          href={currentPathname}
          locale={locale.code}
          scroll={false}
          aria-current={currentLocale === locale.code ? "page" : undefined}
          className={currentLocale === locale.code ? "language-switcher-active font-semibold text-[#F5A623]" : "text-foreground/60 transition-colors hover:text-foreground"}
        >
          {locale.label}
        </Link>
      ))}
    </nav>
  )
}
