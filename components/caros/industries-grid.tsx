import Link from "next/link"
import { ArrowUpRight } from "lucide-react"
import { Reveal } from "./reveal"
import { INDUSTRY_NAV } from "@/lib/industries"
import { cn } from "@/lib/utils"

export function IndustriesGrid({ variant = "dark" }: { variant?: "dark" | "light" }) {
  const dark = variant === "dark"
  return (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
      {INDUSTRY_NAV.map((industry, i) => (
        <Reveal key={industry.href} delay={i * 30}>
          <Link
            href={industry.href}
            className={cn(
              "group flex h-full items-center justify-center gap-1.5 rounded-xl border px-4 py-8 text-center text-base font-semibold transition-all duration-300",
              dark
                ? "border-ink-border bg-ink text-ink-foreground/85 hover:border-gold hover:text-gold"
                : "border-border bg-card text-foreground/85 hover:border-gold hover:text-gold",
            )}
          >
            <span className="text-balance">{industry.name}</span>
            <ArrowUpRight
              className="h-4 w-4 shrink-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
              aria-hidden="true"
            />
          </Link>
        </Reveal>
      ))}
    </div>
  )
}
