"use client"

import { useEffect, useRef, useState } from "react"
import { useParams, usePathname } from "next/navigation"
import { ChevronDown, Globe2 } from "lucide-react"
import { Link } from "@/i18n/routing"
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
  const pathname = usePathname()
  const params = useParams<{ locale?: string }>()
  const currentLocale = (params.locale ?? "en") as LocaleCode
  const currentPathname = pathname || "/"
  const [open, setOpen] = useState(false)
  const rootRef = useRef<HTMLDivElement>(null)
  const current = locales.find((locale) => locale.code === currentLocale) ?? locales[0]

  useEffect(() => {
    if (!open) return
    const closeOnOutside = (event: MouseEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) setOpen(false)
    }
    document.addEventListener("mousedown", closeOnOutside)
    return () => document.removeEventListener("mousedown", closeOnOutside)
  }, [open])

  const handleKeyDown = (event: React.KeyboardEvent<HTMLButtonElement>) => {
    if (event.key === "Escape") setOpen(false)
    if (event.key === "ArrowDown" || event.key === "Enter" || event.key === " ") {
      event.preventDefault()
      setOpen(true)
    }
  }

  return (
    <div ref={rootRef} className={cn("relative", mobile ? "w-full" : "hidden lg:block")}>
      <button
        type="button"
        aria-label="Select language"
        aria-expanded={open}
        aria-haspopup="listbox"
        onClick={() => setOpen((value) => !value)}
        onKeyDown={handleKeyDown}
        className={cn(
          "inline-flex items-center gap-2 rounded-md border border-foreground/15 px-3 py-2 text-xs font-semibold tracking-wide text-foreground transition-colors hover:border-gold hover:text-gold",
          mobile && "w-full justify-between px-4 py-3 text-base",
        )}
      >
        <span className="inline-flex items-center gap-2"><Globe2 className="h-4 w-4" aria-hidden="true" />{current.flag} {current.short}</span>
        <ChevronDown className={cn("h-3.5 w-3.5 transition-transform", open && "rotate-180")} aria-hidden="true" />
      </button>
      {open && (
        <div
          role="listbox"
          aria-label="Available languages"
          className={cn(
            "absolute z-50 mt-2 max-h-80 min-w-48 overflow-y-auto rounded-md border border-foreground/10 bg-background p-1 shadow-xl",
            mobile ? "relative mt-2 w-full" : "right-0",
          )}
        >
          {locales.map((locale) => (
            <Link
              key={locale.code}
              href={currentPathname}
              locale={locale.code}
              scroll={false}
              role="option"
              aria-selected={currentLocale === locale.code}
              onClick={() => setOpen(false)}
              className={cn(
                "flex w-full items-center justify-between gap-4 rounded px-3 py-2.5 text-sm text-foreground/70 transition-colors hover:bg-foreground/5 hover:text-foreground",
                currentLocale === locale.code && "font-semibold text-[#F5A623]",
              )}
            >
              <span>{locale.flag} {locale.label}</span>
              <span className="font-mono text-[10px]">{locale.short}</span>
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}
