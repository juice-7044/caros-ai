import { existsSync, readFileSync } from "node:fs"
import { join } from "node:path"
import { useTranslations } from "next-intl"
import { ArrowRight } from "lucide-react"
import { DEMO_URL, SCREENSHOT_PATH } from "@/lib/home-nav"
import { TrackedLink } from "./tracked-link"

/** Real screenshot only: /public/caros-command-center.png. Without it, an honest unavailable notice; never a mock UI. */
function readScreenshot() {
  const file = join(process.cwd(), "public", "caros-command-center.png")
  if (!existsSync(file)) return null
  const head = readFileSync(file).subarray(0, 24)
  const isPng = head.subarray(1, 4).toString("ascii") === "PNG"
  return isPng ? { width: head.readUInt32BE(16), height: head.readUInt32BE(20) } : null
}

export function ProductShowcase() {
  const t = useTranslations("Home.showcase")
  const shot = readScreenshot()

  if (shot) {
    return (
      <figure className="overflow-hidden rounded-2xl border border-border bg-card shadow-sm">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={SCREENSHOT_PATH} alt={t("alt")} width={shot.width} height={shot.height} loading="lazy" className="h-auto w-full" />
        <figcaption className="border-t border-border px-5 py-3 font-mono text-xs uppercase tracking-[0.14em] text-muted-foreground">
          {t("caption")}
        </figcaption>
      </figure>
    )
  }

  return (
    <div data-screenshot-unavailable className="flex flex-col items-start gap-4 rounded-2xl border border-dashed border-gold/50 bg-card p-8 lg:p-10">
      <p className="text-2xl font-display leading-tight">{t("unavailableTitle")}</p>
      <p className="max-w-xl text-muted-foreground">{t("unavailableBody")}</p>
      <TrackedLink
        href={DEMO_URL}
        external
        events={[["demo_click", { location: "showcase" }], ["showcase_interaction", { action: "demo_cta" }]]}
        className="group inline-flex h-12 items-center gap-2 rounded-full bg-gold px-6 font-semibold text-gold-foreground hover:bg-gold/90"
      >
        {t("cta")}
        <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
      </TrackedLink>
    </div>
  )
}
