"use client"

import { useEffect, useState } from "react"
import { ArrowUp } from "lucide-react"
import { cn } from "@/lib/utils"
import type { TocEntry } from "./legal-doc"

export function LegalToc({ entries }: { entries: TocEntry[] }) {
  const [activeId, setActiveId] = useState<string>(entries[0]?.id ?? "")
  const [showTop, setShowTop] = useState(false)

  useEffect(() => {
    const sections = entries
      .map((e) => document.getElementById(e.id))
      .filter((el): el is HTMLElement => Boolean(el))

    const observer = new IntersectionObserver(
      (observed) => {
        for (const entry of observed) {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id)
          }
        }
      },
      { rootMargin: "-30% 0px -60% 0px", threshold: 0 },
    )

    sections.forEach((section) => observer.observe(section))

    const onScroll = () => setShowTop(window.scrollY > 600)
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })

    return () => {
      observer.disconnect()
      window.removeEventListener("scroll", onScroll)
    }
  }, [entries])

  return (
    <nav aria-label="On this page" className="sticky top-28">
      <p className="font-mono text-xs uppercase tracking-[0.16em] text-muted-foreground">On this page</p>
      <ul className="mt-4 space-y-1 border-l border-border">
        {entries.map((entry) => {
          const active = entry.id === activeId
          return (
            <li key={entry.id}>
              <a
                href={`#${entry.id}`}
                className={cn(
                  "-ml-px block border-l-2 py-1.5 pl-4 text-sm leading-snug transition-colors",
                  active
                    ? "border-gold font-semibold text-foreground"
                    : "border-transparent text-muted-foreground hover:border-gold/40 hover:text-foreground",
                )}
              >
                {entry.title}
              </a>
            </li>
          )
        })}
      </ul>

      <button
        type="button"
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        className={cn(
          "mt-8 inline-flex items-center gap-2 rounded-full border border-border px-4 py-2 text-xs font-semibold text-muted-foreground transition-all hover:border-gold hover:text-gold",
          showTop ? "opacity-100" : "pointer-events-none opacity-0",
        )}
      >
        <ArrowUp className="h-3.5 w-3.5" />
        Back to top
      </button>
    </nav>
  )
}
