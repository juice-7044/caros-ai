import Link from "next/link"
import { Linkedin, Facebook, ArrowUpRight, MapPin, Phone } from "lucide-react"
import {
  AUDIT_HREF,
  AUDIT_LABEL,
  INSIGHTS_URL,
  AUDIT_URL,
  COMPANY_ADDRESS,
  COMPANY_PHONE,
  COMPANY_PHONE_HREF,
} from "@/lib/site"
import { Logo } from "./logo"

const SOCIAL_LINKS = [
  { Icon: Facebook, href: "https://www.facebook.com/carosaillc", label: "CAROS on Facebook" },
  { Icon: Linkedin, href: "https://www.linkedin.com/company/carosai", label: "CAROS on LinkedIn" },
]

const columns = [
  {
    title: "Product",
    links: [
      { name: "What's Included", href: "/whats-included" },
      { name: "Pricing", href: "/pricing" },
      { name: "Industries", href: "/industries" },
      { name: "How It Works", href: "/how-it-works" },
      { name: "Compare", href: "/compare" },
    ],
  },
  {
    title: "Company",
    links: [
      { name: "About", href: "/about" },
      { name: "FAQ", href: "/faq" },
      { name: "Careers", href: "/about" },
    ],
  },
  {
    title: "Resources",
    links: [
      { name: "Free Business Insights", href: INSIGHTS_URL, external: true },
      { name: "Marketing ROI", href: "/marketing-roi" },
      { name: "Free Business Audit", href: AUDIT_URL, external: true },
    ],
  },
  {
    title: "Legal",
    links: [
      { name: "Privacy", href: "/privacy" },
      { name: "Terms", href: "/terms" },
    ],
  },
]

export function SiteFooter() {
  return (
    <footer className="relative border-t border-foreground/10 bg-background">
      <div className="mx-auto max-w-[1400px] px-6 py-20 lg:px-12">
        <div className="grid gap-12 lg:grid-cols-[1.4fr_repeat(4,1fr)]">
          <div className="max-w-xs">
            <Logo className="h-14" />
            <p className="mt-6 text-sm leading-relaxed text-muted-foreground">
              Turn more leads into booked revenue. Built for local service businesses.
            </p>
            <Link
              href={AUDIT_HREF}
              className="mt-8 inline-flex h-11 items-center rounded-full border border-gold px-5 text-sm font-semibold text-gold transition-all duration-300 hover:bg-gold hover:text-gold-foreground"
            >
              {AUDIT_LABEL}
            </Link>

            <address className="mt-8 space-y-3 not-italic">
              <p className="flex items-start gap-3 text-sm text-muted-foreground">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-gold" aria-hidden="true" />
                <span>
                  <span className="sr-only">Headquarters: </span>
                  {COMPANY_ADDRESS}
                </span>
              </p>
              <p className="flex items-center gap-3 text-sm text-muted-foreground">
                <Phone className="h-4 w-4 shrink-0 text-gold" aria-hidden="true" />
                <a href={COMPANY_PHONE_HREF} className="transition-colors hover:text-foreground">
                  {COMPANY_PHONE}
                </a>
              </p>
            </address>
          </div>

          {columns.map((col) => (
            <div key={col.title}>
              <h3 className="eyebrow text-muted-foreground">{col.title}</h3>
              <ul className="mt-5 space-y-3">
                {col.links.map((link) => {
                  const linkClass =
                    "group inline-flex items-center gap-1 text-sm text-muted-foreground transition-colors hover:text-foreground"
                  const linkInner = (
                    <>
                      {link.name}
                      <ArrowUpRight className="h-3 w-3 -translate-x-1 opacity-0 transition-all group-hover:translate-x-0 group-hover:opacity-100" />
                    </>
                  )
                  return (
                    <li key={link.name}>
                      {"external" in link && link.external ? (
                        <a href={link.href} target="_blank" rel="noopener noreferrer" className={linkClass}>
                          {linkInner}
                        </a>
                      ) : (
                        <Link href={link.href} className={linkClass}>
                          {linkInner}
                        </Link>
                      )}
                    </li>
                  )
                })}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-16 flex flex-col items-start gap-6 border-t border-foreground/10 pt-8 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-4">
            <Logo href={null} className="h-9" />
            <p className="text-xs text-muted-foreground">© 2026 CAROS. All rights reserved.</p>
          </div>
          <div className="flex items-center gap-4">
            {SOCIAL_LINKS.map(({ Icon, href, label }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-9 w-9 items-center justify-center rounded-full border border-foreground/15 text-muted-foreground transition-colors hover:border-gold hover:text-gold"
                aria-label={label}
              >
                <Icon className="h-4 w-4" />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
