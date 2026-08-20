"use client"

import { useEffect, useRef, useState } from "react"
import { useParams } from "next/navigation"
import { ChevronDown } from "lucide-react"
import { Link, usePathname } from "@/i18n/navigation"
import { cn } from "@/lib/utils"

const locales = [
  { code: "en", label: "English", short: "EN", flag: "🇺🇸" },
  { code: "es", label: "Español", short: "ES", flag: "🇪🇸" },
  { code: "fr", label: "Français", short: "FR", flag: "🇫🇷" },
  { code: "ja", label: "日本語", short: "JA", flag: "🇯🇵" },
  { code: "zh", label: "中文", short: "ZH", flag: "🇨🇳" },
  { code: "de", label: "Deutsch", short: "DE", flag: "🇩🇪" },
  { code: "pl", label: "Polski", short: "PL", flag: "🇵🇱" },
  { code: "ru", label: "Русский", short: "RU", flag: "🇷🇺" },
  { code: "sq", label: "Shqip", short: "SQ", flag: "🇦🇱" },
  { code: "it", label: "Italiano", short: "IT", flag: "🇮🇹" },
  { code: "ar", label: "العربية", short: "AR", flag: "🇸🇦" },
  { code: "hi", label: "हिन्दी", short: "HI", flag: "🇮🇳" },
  { code: "pt-BR", label: "Português (BR)", short: "PT-BR", flag: "🇧🇷" },
  { code: "pt-PT", label: "Português (PT)", short: "PT-PT", flag: "🇵🇹" },
] as const

type LocaleCode = (typeof locales)[number]["code"]

export function LanguageSwitcher({ mobile = false }: { mobile?: boolean }) {
  const pathname = usePathname() || "/"
  const params = useParams<{ locale?: string }>()
  const currentLocale = (params.locale ?? "en") as LocaleCode
  const current = locales.find((locale) => locale.code === currentLocale) ?? locales[0]
  const [open, setOpen] = useState(false)
  const rootRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!open) return
    const closeOnOutside = (event: MouseEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) setOpen(false)
    }
    document.addEventListener("mousedown", closeOnOutside)
    return () => document.removeEventListener("mousedown", closeOnOutside)
  }, [open])

  if (mobile) {
    return (
      <div className="grid grid-cols-2 gap-x-5 gap-y-3">
        {locales.map((locale) => (
          <Link
            key={locale.code}
            href={pathname}
            locale={locale.code}
            scroll={false}
            onClick={() => setOpen(false)}
            className={cn(
              "flex items-center gap-2 text-sm text-foreground/65 hover:text-foreground",
              currentLocale === locale.code && "font-semibold text-gold",
            )}
          >
            <span aria-hidden="true">{locale.flag}</span>
            <span>{locale.label}</span>
          </Link>
        ))}
      </div>
    )
  }

  return (
    <div ref={rootRef} className="relative">
      <button
        type="button"
        aria-label="Select language"
        aria-expanded={open}
        aria-haspopup="listbox"
        onClick={() => setOpen((value) => !value)}
        className="inline-flex h-9 items-center gap-1 rounded-md border border-foreground/15 px-3 text-xs font-semibold tracking-wide text-foreground hover:border-gold hover:text-gold"
      >
        {current.short} <ChevronDown className="h-3.5 w-3.5" aria-hidden="true" />
      </button>
      {open && (
        <div role="listbox" aria-label="Available languages" className="absolute right-0 z-50 mt-2 max-h-80 min-w-48 overflow-y-auto rounded-md border border-foreground/10 bg-background p-1 shadow-xl">
          {locales.map((locale) => (
            <Link
              key={locale.code}
              href={pathname}
              locale={locale.code}
              scroll={false}
              role="option"
              aria-selected={currentLocale === locale.code}
              onClick={() => {
                console.log("[LanguageSwitcher] Clicked:", locale.code, "Current path:", pathname)
                setOpen(false)
              }}
              className={cn(
                "flex items-center gap-2 rounded px-3 py-2 text-sm text-foreground/70 hover:bg-foreground/5 hover:text-foreground",
                currentLocale === locale.code && "font-semibold text-gold",
              )}
            >
              <span aria-hidden="true">{locale.flag}</span>
              <span>{locale.label}</span>
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}
