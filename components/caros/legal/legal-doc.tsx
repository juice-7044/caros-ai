import type { ReactNode } from "react"
import { PageHero } from "@/components/caros/ui-bits"
import { LegalToc } from "./legal-toc"

export type TocEntry = { id: string; title: string }

/** Shared wrapper for legal/policy pages — reuses the template's PageHero and light body. */
export function LegalDoc({
  eyebrow,
  title,
  serifTitle,
  lastUpdated,
  intro,
  toc,
  children,
}: {
  eyebrow: string
  title: string
  serifTitle?: string
  lastUpdated: string
  intro?: ReactNode
  toc: TocEntry[]
  children: ReactNode
}) {
  return (
    <>
      <PageHero eyebrow={eyebrow} title={title} serifTitle={serifTitle} subtitle={intro as string | undefined} />

      <section className="bg-background py-20 lg:py-28">
        <div className="mx-auto max-w-[1200px] px-6 lg:px-12">
          <p className="font-mono text-xs uppercase tracking-[0.16em] text-muted-foreground">
            Last updated: {lastUpdated}
          </p>

          <div className="mt-4 rounded-xl border border-gold/30 bg-gold/[0.06] p-5">
            <p className="text-sm leading-relaxed text-muted-foreground">
              <span className="font-semibold text-foreground">Please note:</span> This document is provided for general
              informational purposes and does not constitute legal advice. Laws vary by jurisdiction and may change over
              time.
            </p>
          </div>

          <div className="mt-12 gap-12 lg:grid lg:grid-cols-[240px_minmax(0,1fr)]">
            {/* Sticky sidebar table of contents */}
            <aside className="hidden lg:block">
              <LegalToc entries={toc} />
            </aside>

            <article className="max-w-[760px] space-y-14">{children}</article>
          </div>
        </div>
      </section>
    </>
  )
}

/** A numbered top-level section. `id` anchors it for the TOC. */
export function LegalSection({
  n,
  id,
  title,
  children,
}: {
  n: number
  id: string
  title: string
  children: ReactNode
}) {
  return (
    <section id={id} className="scroll-mt-28">
      <h2 className="flex items-baseline gap-3 text-pretty text-2xl font-extrabold leading-tight tracking-tight lg:text-3xl">
        <span className="font-mono text-base text-gold">{String(n).padStart(2, "0")}</span>
        {title}
      </h2>
      <div className="mt-5 space-y-4">{children}</div>
    </section>
  )
}

/** A sub-heading within a section. */
export function LegalSubheading({ children }: { children: ReactNode }) {
  return <h3 className="mt-8 text-sm font-bold uppercase tracking-[0.1em] text-foreground">{children}</h3>
}

export function LegalP({ children }: { children: ReactNode }) {
  return <p className="text-pretty leading-relaxed text-muted-foreground">{children}</p>
}

/** Bulleted or lettered list. */
export function LegalList({ items }: { items: ReactNode[] }) {
  return (
    <ul className="space-y-3">
      {items.map((item, i) => (
        <li key={i} className="flex gap-3 leading-relaxed text-muted-foreground">
          <span aria-hidden className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-gold/70" />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  )
}
