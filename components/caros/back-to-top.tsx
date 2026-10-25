"use client"

import { useEffect, useState } from "react"
import { useLocale } from "next-intl"
import { usePathname } from "@/i18n/routing"
import { ArrowUp } from "lucide-react"

/** Opposite corner from chat; below the footer's 80px content inset. */
export function BackToTop() {
  const locale = useLocale()
  const pathname = usePathname()
  const [visible, setVisible] = useState(false)
  const label = locale === "es" ? "Volver arriba" : "Back to top"

  useEffect(() => {
    const update = () => setVisible(window.scrollY > 600)
    update()
    window.addEventListener("scroll", update, { passive: true })
    return () => window.removeEventListener("scroll", update)
  }, [pathname])

  if (!visible) return null

  return (
    <button
      type="button"
      data-caros-back-to-top
      aria-label={label}
      onClick={() => {
        window.scrollTo({
          top: 0,
          behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "instant" : "smooth",
        })
        // The button disappears at the top: move keyboard focus to a stable target.
        const main = document.querySelector<HTMLElement>("main")
        if (main) {
          if (!main.hasAttribute("tabindex")) {
            main.setAttribute("tabindex", "-1")
            main.addEventListener("blur", () => main.removeAttribute("tabindex"), { once: true })
          }
          main.focus({ preventScroll: true })
        }
      }}
      className="fixed bottom-[max(16px,env(safe-area-inset-bottom))] left-[max(16px,env(safe-area-inset-left))] z-40 inline-flex h-11 items-center gap-2 rounded-full border border-gold/60 bg-background px-4 text-xs font-semibold text-foreground shadow-lg transition-colors hover:bg-gold hover:text-gold-foreground focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-gold"
    >
      <ArrowUp className="size-4" aria-hidden="true" />
      {label}
    </button>
  )
}
