"use client"

import { useCallback, useEffect, useRef, useState } from "react"
import { useTranslations } from "next-intl"
import { Link } from "@/i18n/routing"
import { acceptAll, customize, rejectNonEssential, defaultConsent, type ConsentChoices } from "@/lib/consent"
import { OPEN_CONSENT_EVENT, loadMetaPixel, privacyEnv, readConsent, saveConsent } from "@/lib/consent-client"

const BUTTON = "inline-flex h-10 flex-1 items-center justify-center rounded-full border border-foreground/40 bg-background px-4 text-sm font-semibold text-foreground transition-colors hover:bg-foreground hover:text-background focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold"

function Toggle({ id, label, desc, checked, onChange, on, off }: { id: string; label: string; desc: string; checked: boolean; onChange: (v: boolean) => void; on: string; off: string }) {
  return (
    <div className="flex items-start justify-between gap-4 py-3">
      <div className="min-w-0">
        <label htmlFor={id} className="block text-sm font-semibold">{label}</label>
        <p id={`${id}-desc`} className="mt-0.5 text-xs leading-snug text-muted-foreground">{desc}</p>
      </div>
      <button
        id={id} type="button" role="switch" aria-checked={checked} aria-describedby={`${id}-desc`}
        onClick={() => onChange(!checked)}
        className="flex h-8 shrink-0 items-center gap-2 rounded-full border border-foreground/30 px-3 text-xs font-semibold focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold aria-checked:border-gold aria-checked:bg-gold aria-checked:text-gold-foreground"
      >
        {checked ? on : off}
      </button>
    </div>
  )
}

/**
 * Non-blocking consent banner (fixed, so no layout shift). Shown when no valid choice is stored, and reopened from the
 * footer "Cookie settings" control. Reject is as prominent as Accept. Rendered after mount to avoid hydration drift.
 */
export function ConsentBanner() {
  const t = useTranslations("Consent")
  const [open, setOpen] = useState(false)
  const [custom, setCustom] = useState(false)
  const [choices, setChoices] = useState<ConsentChoices>(defaultConsent({}))
  const [gpc, setGpc] = useState(false)
  const ref = useRef<HTMLDivElement>(null)
  const headingRef = useRef<HTMLHeadingElement>(null)
  const returnFocus = useRef<HTMLElement | null>(null)
  const hasChoice = useRef(false)

  // First visit: show if no valid record. Returning visit: nothing to show (the inline script already replayed it).
  useEffect(() => {
    setGpc(privacyEnv().globalPrivacyControl === true)
    const stored = readConsent()
    if (stored) { hasChoice.current = true; setChoices({ analytics: stored.analytics, marketing: stored.marketing }); if (stored.marketing) loadMetaPixel() }  // Google signals were already replayed by the inline script in app/layout.tsx
    else setOpen(true)
  }, [])

  // Footer "Cookie settings" reopens with the current choices and moves focus into the dialog.
  useEffect(() => {
    const reopen = () => {
      returnFocus.current = document.activeElement as HTMLElement | null
      const stored = readConsent()
      if (stored) setChoices({ analytics: stored.analytics, marketing: stored.marketing })
      setCustom(true)
      setOpen(true)
      requestAnimationFrame(() => headingRef.current?.focus())
    }
    window.addEventListener(OPEN_CONSENT_EVENT, reopen)
    return () => window.removeEventListener(OPEN_CONSENT_EVENT, reopen)
  }, [])

  // Publish the banner height so the chat/voice launcher can sit above it instead of underneath (see globals.css).
  useEffect(() => {
    const root = document.documentElement
    if (!open || !ref.current) { root.removeAttribute("data-caros-consent-open"); root.style.removeProperty("--caros-consent-offset"); return }
    const el = ref.current
    const update = () => root.style.setProperty("--caros-consent-offset", `${el.offsetHeight}px`)
    root.setAttribute("data-caros-consent-open", "")
    update()
    const ro = new ResizeObserver(update)
    ro.observe(el)
    return () => { ro.disconnect(); root.removeAttribute("data-caros-consent-open"); root.style.removeProperty("--caros-consent-offset") }
  }, [open])

  const close = useCallback(() => {
    setOpen(false); setCustom(false)
    const back = returnFocus.current
    returnFocus.current = null
    if (back && document.contains(back)) requestAnimationFrame(() => back.focus())
  }, [])

  const choose = (record: ReturnType<typeof rejectNonEssential>) => { saveConsent(record); hasChoice.current = true; close() }

  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape" && hasChoice.current) close() }
    document.addEventListener("keydown", onKey)
    return () => document.removeEventListener("keydown", onKey)
  }, [open, close])

  if (!open) return null
  const env = { globalPrivacyControl: gpc }

  return (
    <div
      ref={ref} role="dialog" aria-modal="false" aria-labelledby="caros-consent-title" aria-describedby="caros-consent-body" data-caros-consent
      className="fixed inset-x-0 bottom-0 z-[9000] max-h-[60dvh] overflow-y-auto border-t border-foreground/15 bg-background p-4 shadow-[0_-8px_30px_rgba(0,0,0,0.18)] min-[720px]:inset-x-auto min-[720px]:bottom-4 min-[720px]:right-4 min-[720px]:w-[26rem] min-[720px]:max-h-[85dvh] min-[720px]:rounded-2xl min-[720px]:border"
    >
      <h2 id="caros-consent-title" ref={headingRef} tabIndex={-1} className="text-base font-bold outline-none">{custom ? t("customTitle") : t("title")}</h2>
      {custom ? (
        <div className="mt-2 divide-y divide-foreground/10">
          <div className="py-3">
            <p className="text-sm font-semibold">{t("essential")} <span className="ml-1 text-xs font-normal text-muted-foreground">({t("on")})</span></p>
            <p className="mt-0.5 text-xs leading-snug text-muted-foreground">{t("essentialDesc")}</p>
          </div>
          <Toggle id="caros-consent-analytics" label={t("analytics")} desc={t("analyticsDesc")} checked={choices.analytics} onChange={(v) => setChoices({ ...choices, analytics: v })} on={t("on")} off={t("off")} />
          <Toggle id="caros-consent-marketing" label={t("marketing")} desc={gpc ? t("gpc") : t("marketingDesc")} checked={choices.marketing && !gpc} onChange={(v) => !gpc && setChoices({ ...choices, marketing: v })} on={t("on")} off={t("off")} />
        </div>
      ) : (
        <p id="caros-consent-body" className="mt-1 text-sm leading-snug text-muted-foreground">{t("body")}</p>
      )}
      <div className="mt-3 flex flex-col gap-2 min-[720px]:flex-row">
        <button type="button" className={BUTTON} onClick={() => choose(rejectNonEssential(Date.now()))}>{t("reject")}</button>
        <button type="button" className={BUTTON} onClick={() => choose(acceptAll(env, Date.now()))}>{t("acceptAll")}</button>
        {custom ? (
          <button type="button" className={BUTTON} onClick={() => choose(customize(choices, env, Date.now()))}>{t("save")}</button>
        ) : (
          <button type="button" className={BUTTON} onClick={() => { setCustom(true); requestAnimationFrame(() => headingRef.current?.focus()) }}>{t("customize")}</button>
        )}
      </div>
      <Link href="/privacy#cookies" className="mt-3 inline-block text-xs text-muted-foreground underline underline-offset-4 hover:text-foreground">{t("privacyLink")}</Link>
    </div>
  )
}
