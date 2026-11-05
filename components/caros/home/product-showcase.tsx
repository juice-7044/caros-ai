"use client"

import Image from "next/image"
import { useId, useState } from "react"
import { useTranslations } from "next-intl"
import { SCREENSHOT_PATH } from "@/lib/home-nav"
import { track } from "@/lib/analytics-client"

const IMG_W = 2798
const IMG_H = 1718
/** The demo screen's content ends well above the bottom of the capture; crop the empty lower part. */
const VISIBLE_H = 1300

// Marker centres in source-image pixels (2798x1718), converted to percentages of the visible area so they stay aligned at any width.
const HOTSPOTS = [
  { id: "nav", x: 875, y: 57 },
  { id: "deals", x: 800, y: 548 },
  { id: "winrate", x: 1735, y: 512 },
  { id: "pipeline", x: 520, y: 815 },
  { id: "appointments", x: 1776, y: 815 },
  { id: "ask", x: 2200, y: 1050 },
] as const

const pct = (v: number, of: number) => `${((v / of) * 100).toFixed(2)}%`

/** Real Command Center screenshot (it labels itself an illustrative demo workspace) with CSS-only hotspot markers. */
export function ProductShowcase() {
  const t = useTranslations("Home.showcase")
  const [active, setActive] = useState<string | null>(null)
  const detailId = useId()

  const toggle = (id: string) => {
    const next = active === id ? null : id
    setActive(next)
    if (next) track("showcase_interaction", { action: "hotspot", item: id })
  }

  return (
    <figure className="overflow-hidden rounded-2xl border border-border bg-card shadow-sm">
      <div className="relative w-full overflow-hidden bg-[#f4f5f7]" style={{ aspectRatio: `${IMG_W} / ${VISIBLE_H}` }}>
        <Image
          src={SCREENSHOT_PATH}
          alt={t("alt")}
          width={IMG_W}
          height={IMG_H}
          sizes="(min-width: 1280px) 1152px, 100vw"
          quality={80}
          className="absolute left-0 top-0 h-auto w-full max-w-none"
        />
        <div role="group" aria-label={t("hotspotsLabel")}>
          {HOTSPOTS.map((h) => {
            const isOn = active === h.id
            return (
              <button
                key={h.id}
                type="button"
                aria-label={t(`hotspots.${h.id}.label`)}
                aria-pressed={isOn}
                aria-describedby={isOn ? detailId : undefined}
                onClick={() => toggle(h.id)}
                style={{ left: pct(h.x, IMG_W), top: pct(h.y, VISIBLE_H) }}
                className="caros-hotspot absolute z-10 flex size-8 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold"
              >
                <span aria-hidden className={`caros-hotspot-dot block size-4 rounded-full border-2 border-white bg-gold shadow-md transition-transform ${isOn ? "scale-125" : ""}`} />
              </button>
            )
          })}
        </div>
      </div>
      <div id={detailId} aria-live="polite" className="min-h-[3.75rem] border-t border-border px-5 py-3 text-sm leading-relaxed">
        {active ? (
          <p><span className="font-semibold">{t(`hotspots.${active}.label`)}.</span> <span className="text-muted-foreground">{t(`hotspots.${active}.text`)}</span></p>
        ) : (
          <p className="text-muted-foreground">{t("hotspotsHint")}</p>
        )}
      </div>
      <figcaption className="border-t border-border px-5 py-3 font-mono text-xs uppercase tracking-[0.14em] text-muted-foreground">
        {t("caption")}
      </figcaption>
    </figure>
  )
}
