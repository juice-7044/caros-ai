"use client"

import { useEffect, useState } from "react"
import { useTranslations } from "next-intl"
import { Link, usePathname } from "@/i18n/routing"
import { LanguageSwitcher } from "@/components/LanguageSwitcher"
import { Menu, X, ChevronDown } from "lucide-react"
import { cn } from "@/lib/utils"
import { NAV_LINKS,   INSIGHTS_URL,
 DIAGNOSTIC_HREF, DIAGNOSTIC_LABEL } from "@/lib/site"
import { INDUSTRY_NAV } from "@/lib/industries"
import { Logo } from "./logo"

export function SiteNav() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const [industriesOpen, setIndustriesOpen] = useState(false)
  const pathname = usePathname()
  const t = useTranslations("nav")
  const navLabels: Record<string, string> = {
    "/": t("home"),
    "/how-it-works": t("howItWorks"),
    "/whats-included": t("included"),
    "/marketing-roi": t("marketingRoi"),
    "/why-caros": t("whyCaros"),
    "/industries": t("industries"),
    "/pricing": t("pricing"),
    "/about": t("about"),
  }

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    onScroll()
    window.addEventListener("scroll", onScroll)
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  useEffect(() => {
    setOpen(false)
    setIndustriesOpen(false)
  }, [pathname])

  return (
    <header
      className={cn(
        "fixed z-50 transition-all duration-500",
        scrolled ? "left-4 right-4 top-4" : "left-0 right-0 top-0",
      )}
    >
      <nav
        className={cn(
          "mx-auto transition-all duration-500",
          scrolled || open
            ? "max-w-[1200px] rounded-2xl border border-foreground/10 bg-background/80 shadow-lg backdrop-blur-xl"
            : "max-w-[1400px] border border-transparent bg-transparent",
        )}
      >
        <div
          className={cn(
            "flex items-center justify-between px-6 transition-all duration-500 lg:px-8",
            scrolled ? "h-14" : "h-20",
          )}
        >
          <Logo className={scrolled ? "h-9" : "h-12"} />

          <div className="hidden items-center gap-10 lg:flex">
            {NAV_LINKS.map((link) => {
              const active = pathname === link.href || pathname.startsWith(`${link.href}/`)

              if (link.href === "/industries") {
                return (
                  <div
                    key={link.href}
                    className="relative"
                    onMouseEnter={() => setIndustriesOpen(true)}
                    onMouseLeave={() => setIndustriesOpen(false)}
                    onFocus={() => setIndustriesOpen(true)}
                    onBlur={(e) => {
                      if (!e.currentTarget.contains(e.relatedTarget as Node)) setIndustriesOpen(false)
                    }}
                  >
                    <Link
                      href={link.href}
                      className={cn(
                        "flex items-center gap-1 text-sm text-foreground/70 transition-colors duration-300 hover:text-foreground",
                        active && "text-foreground",
                      )}
                    >
                      {navLabels[link.href] ?? t(link.labelKey)}
                      <ChevronDown
                        className={cn(
                          "h-3.5 w-3.5 transition-transform duration-300",
                          industriesOpen && "rotate-180",
                        )}
                      />
                    </Link>
                    {/* Dropdown */}
                    <div
                      className={cn(
                        "absolute left-1/2 top-full z-50 w-[560px] -translate-x-1/2 pt-4 transition-all duration-200",
                        industriesOpen ? "visible opacity-100" : "invisible opacity-0",
                      )}
                    >
                      <div className="rounded-2xl border border-foreground/10 bg-background/95 p-3 shadow-xl backdrop-blur-xl">
                        <div className="grid grid-cols-2 gap-1">
                          {INDUSTRY_NAV.map((ind) => {
                            const indActive = pathname === ind.href
                            return (
                              <Link
                                key={ind.href}
                                href={ind.href}
                                className={cn(
                                  "rounded-lg px-3 py-2.5 text-sm text-foreground/70 transition-colors duration-200 hover:bg-secondary hover:text-foreground",
                                  indActive && "bg-secondary text-foreground",
                                )}
                              >
                                {ind.name}
                              </Link>
                            )
                          })}
                        </div>
                        <Link
                          href="/industries"
                          className="mt-1 flex items-center justify-between rounded-lg px-3 py-2.5 text-sm font-semibold text-gold transition-colors duration-200 hover:bg-gold/10"
                        >
                          {t("viewAllIndustries")}
                        </Link>
                      </div>
                    </div>
                  </div>
                )
              }

              if (link.external) {
                return (
                  <a
                    key={link.href}
                    href={link.href}
                    className="group relative text-sm text-foreground/70 transition-colors duration-300 hover:text-foreground"
                  >
                    {navLabels[link.href] ?? t(link.labelKey)}
                    <span className="absolute -bottom-1 left-0 h-px w-0 bg-gold transition-all duration-300 group-hover:w-full" />
                  </a>
                )
              }

              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    "group relative text-sm text-foreground/70 transition-colors duration-300 hover:text-foreground",
                    active && "text-foreground",
                  )}
                >
                  {navLabels[link.href] ?? t(link.labelKey)}
                  <span
                    className={cn(
                      "absolute -bottom-1 left-0 h-px bg-gold transition-all duration-300",
                      active ? "w-full" : "w-0 group-hover:w-full",
                    )}
                  />
                </Link>
              )
            })}
          </div>

          <div className="hidden items-center gap-4 lg:flex">
            <LanguageSwitcher />
            <a
              href={INSIGHTS_URL}
              target="_blank"
              rel="noopener noreferrer"
              className={cn(
                "inline-flex items-center rounded-full border border-gold font-semibold text-gold transition-all duration-300 hover:bg-gold hover:text-gold-foreground",
                scrolled ? "h-9 px-4 text-xs" : "h-11 px-5 text-sm",
              )}
            >
              {t("businessInsights")}
            </a>
          </div>

          <button
            onClick={() => setOpen((v) => !v)}
            className="p-2 text-foreground lg:hidden"
            aria-label={t("toggleMenu")}
            aria-expanded={open}
          >
            {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </nav>

      {/* Mobile full-screen overlay (light) */}
      <div
        className={cn(
          "fixed inset-0 top-0 z-40 flex flex-col bg-background px-8 pb-8 pt-28 transition-all duration-500 lg:hidden",
          open ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0",
        )}
      >
        <div className="flex flex-1 flex-col justify-center gap-5 overflow-y-auto">
          {NAV_LINKS.map((link, i) => {
            if (link.href === "/industries") {
              return (
                <div
                  key={link.href}
                  className={cn(
                    "transition-all duration-500",
                    open ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0",
                  )}
                  style={{ transitionDelay: open ? `${i * 60}ms` : "0ms" }}
                >
                  <Link
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className="font-display text-4xl text-foreground transition-colors hover:text-gold"
                  >
                    {navLabels[link.href] ?? t(link.labelKey)}
                  </Link>
                  <div className="mt-3 grid grid-cols-2 gap-x-4 gap-y-2">
                    {INDUSTRY_NAV.map((ind) => (
                      <Link
                        key={ind.href}
                        href={ind.href}
                        onClick={() => setOpen(false)}
                        className="text-sm text-foreground/60 transition-colors hover:text-gold"
                      >
                        {ind.name}
                      </Link>
                    ))}
                  </div>
                </div>
              )
            }
            if (link.external) {
              return (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className={cn(
                    "font-display text-4xl text-foreground transition-all duration-500 hover:text-gold",
                    open ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0",
                  )}
                  style={{ transitionDelay: open ? `${i * 60}ms` : "0ms" }}
                >
                  {navLabels[link.href] ?? t(link.labelKey)}
                </a>
              )
            }
            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className={cn(
                  "font-display text-4xl text-foreground transition-all duration-500 hover:text-gold",
                  open ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0",
                )}
                style={{ transitionDelay: open ? `${i * 60}ms` : "0ms" }}
              >
                {t(link.labelKey)}
              </Link>
            )
          })}
          <Link
            href={DIAGNOSTIC_HREF}
            onClick={() => setOpen(false)}
            className={cn(
              "font-display text-4xl text-gold transition-all duration-500",
              open ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0",
            )}
            style={{ transitionDelay: open ? `${NAV_LINKS.length * 60}ms` : "0ms" }}
          >
            {DIAGNOSTIC_LABEL}
          </Link>
          <div className="mt-4 border-t border-foreground/10 pt-5">
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">Language</p>
            <LanguageSwitcher mobile />
          </div>
        </div>
        <a
          href={INSIGHTS_URL}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => setOpen(false)}
          className="inline-flex h-14 items-center justify-center rounded-full bg-gold text-base font-semibold text-gold-foreground"
        >
          {t("businessInsights")}
        </a>
      </div>
    </header>
  )
}
