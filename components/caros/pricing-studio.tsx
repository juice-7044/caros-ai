"use client"

import dynamic from "next/dynamic"
import { useEffect, useRef, useState } from "react"
import type { PricingSceneCapability } from "@/lib/pricing3d-scene-types"
import { PRICING, type PricingConfiguration } from "@/lib/pricing"
import { localeHref, spanishTranslator } from "@/lib/spanish"
import oldCatalog from "@/messages/full/product-pages.es.json"
import en from "@/messages/pricing3d/en.json"
import es from "@/messages/pricing3d/es.json"
import { track } from "@/lib/analytics-client"
import { HiringCalculator } from "@/components/caros/home/hiring-calculator"
import { StackCalculator } from "@/components/caros/home/stack-calculator"
import { MODE_COUNT, type StoryMode } from "@/lib/hiring-story"

// This boundary is never imported by the server. Three loads only after the stage is enabled.
const Scene = dynamic(() => import("@/components/caros/pricing-scene/scene"), { ssr: false })
const CAPABILITIES: PricingSceneCapability[] = ["platform", "marketing", "sales", "communication", "reactivation", "automation", "service", "reputation", "community"]

export function PricingStudio({ locale }: { locale: string }) {
  const t = locale === "es" ? es : en
  const tr = spanishTranslator(locale, oldCatalog)
  const [configuration, setConfiguration] = useState<PricingConfiguration>("core")
  const [capability, setCapability] = useState<PricingSceneCapability>("platform")
  const [enabled, setEnabled] = useState(false)
  const [near, setNear] = useState(false)
  const [visited, setVisited] = useState(false)
  const [paused, setPaused] = useState(false)
  const [hidden, setHidden] = useState(false)
  const [ready, setReady] = useState(false)
  const [failed, setFailed] = useState(false)
  const [dissolve, setDissolve] = useState(false)
  const [toolbar, setToolbar] = useState(false)
  const stage = useRef<HTMLDivElement>(null)
  const rail = useRef<HTMLElement>(null)
  const [employees, setEmployees] = useState("5")
  const [salary, setSalary] = useState("50000")
  const [mode, setMode] = useState<StoryMode>("five")
  const price = PRICING[configuration]

  useEffect(() => {
    const motion = matchMedia("(prefers-reduced-motion: reduce)")
    const connection = (navigator as Navigator & { connection?: { saveData?: boolean; effectiveType?: string } }).connection
    const lowPower = connection?.saveData || ["slow-2g", "2g"].includes(connection?.effectiveType ?? "") || matchMedia("(max-width: 767px)").matches
    const canRender = () => { try { const canvas = document.createElement("canvas"); const gl = canvas.getContext("webgl2"); if (!gl) return false; gl.getExtension("WEBGL_lose_context")?.loseContext(); return true } catch { return false } }
    setEnabled(!motion.matches && !lowPower && canRender())
    const preference = () => { if (motion.matches) { setEnabled(false); setDissolve(false) } }
    motion.addEventListener("change", preference)
    const visibility = () => setHidden(document.hidden)
    document.addEventListener("visibilitychange", visibility)
    const observer = new IntersectionObserver(([entry]) => { setNear(entry.isIntersecting); if (entry.isIntersecting) setVisited(true) }, { threshold: 0.08 })
    if (stage.current) observer.observe(stage.current)
    const priceObserver = new IntersectionObserver(([entry]) => setToolbar(!entry.isIntersecting && entry.boundingClientRect.top < 0), { threshold: 0 })
    if (rail.current) priceObserver.observe(rail.current)
    return () => { observer.disconnect(); priceObserver.disconnect(); motion.removeEventListener("change", preference); document.removeEventListener("visibilitychange", visibility) }
  }, [])

  const demo = <a className="pricing-primary" href="https://demo.getcaros.com" target="_blank" rel="noopener noreferrer" onClick={() => track("pricing_cta", { cta: "demo", location: "pricing_studio" })}>{t.demo} <span aria-hidden="true">↗</span></a>
  return <>
    <section className="pricing-studio" aria-labelledby="pricing-title">
      <div className="pricing-container">
        <header className="pricing-heading">
          <p className="pricing-eyebrow">{t.eyebrow}</p>
          <h1 id="pricing-title">{t.title}<br /><em>{t.accent}</em></h1>
          <p className="pricing-intro">{t.intro}</p>
          <p className="pricing-audience">{t.audience} <a href={localeHref("/industries/startups", locale)}>{t.startups} ↗</a></p>
        </header>
        <div className="pricing-composition">
          <aside className="pricing-rail" ref={rail} aria-label={t.configuration}>
            <label htmlFor="pricing-configuration" className="pricing-eyebrow">{t.configuration}</label>
            <select id="pricing-configuration" data-pricing="configuration" value={configuration} onChange={(e) => { const next = e.target.value as PricingConfiguration; setConfiguration(next); track("pricing_configuration", { item: next }) }}>
              {(Object.keys(PRICING) as PricingConfiguration[]).map(id => <option key={id} value={id}>{t[id]}</option>)}
            </select>
            <div data-pricing="price" aria-live="polite" aria-atomic="true">
              <p className="pricing-small">{t.monthly}</p>
              <strong className="pricing-amount">{tr(price.monthlyLabel)}</strong>
              <p className="pricing-small pricing-implementation">{t.implementation}</p>
              <strong className="pricing-setup">{configuration === "nonprofit" ? t.consultationLabel : tr(price.implementationLabel)}</strong>
            </div>
            <p className="pricing-qualifier">{configuration === "nonprofit" ? t.consultation : t.fee}</p>
            {configuration === "nonprofit" ? <a className="pricing-primary" href={localeHref("/industries/nonprofits#nonprofit-consultation", locale)}>{t.review} ↗</a> : demo}
            <a className="pricing-secondary" href={localeHref("/revenue-audit", locale)}>{t.review} ↗</a>
            <a className="pricing-terms-link" href="#pricing-commercial-terms" onClick={() => { const target = document.getElementById("pricing-commercial-terms"); if (target instanceof HTMLDetailsElement) target.open = true }}>{t.termsLink} ↓</a>
          </aside>
          <div className="pricing-art">
            <label className="pricing-stage-selector" htmlFor="pricing-sculpture">
              <span>{t.included}</span>
              <select id="pricing-sculpture" value={capability} onChange={(event) => { const next = event.target.value as PricingSceneCapability; setCapability(next); setDissolve(false); track("pricing_capability", { item: next }) }}>
                {CAPABILITIES.map(id => <option value={id} key={id}>{t[id]}</option>)}
              </select>
            </label>
            <div className="pricing-stage" ref={stage} role="group" aria-label={t.stageLabel} data-pricing="stage" data-paused={paused || !near || hidden}>
              {(!ready || !enabled || failed) && <div className="pricing-fallback" data-pricing="fallback"><div className="pricing-orbit" aria-hidden="true" /><img src="/caros-logo.png" alt="CAROS" width="560" height="374" fetchPriority="high" /><p>{failed ? t.failed : enabled ? t.loading : t.fallback}</p></div>}
              {enabled && visited && !failed && <Scene capability={capability} paused={paused || !near || hidden} dissolve={dissolve} onReady={() => setReady(true)} onError={() => { setFailed(true); setEnabled(false); setReady(false) }} onInteraction={(kind) => track("pricing_scene", { kind })} />}
              <span className="pricing-stage-index" aria-hidden="true">{String(CAPABILITIES.indexOf(capability) + 1).padStart(2, "0")} / 09</span>
            </div>
            <div className="pricing-motion-controls">
              <button type="button" aria-pressed={enabled} onClick={() => { setEnabled(!enabled); setFailed(false); setReady(false); setDissolve(false); track("pricing_scene_mode", { action: enabled ? "static" : "3d" }) }}>{enabled ? t.static : t.show3d}</button>
              {enabled && <><button type="button" aria-pressed={paused} onClick={() => setPaused(!paused)}>{paused ? t.resume : t.pause}</button><button type="button" aria-pressed={dissolve} onClick={() => { setDissolve(!dissolve); track("pricing_scene_preview", { action: dissolve ? "reassemble" : "dissolve" }) }}>{dissolve ? t.reassemble : t.dissolve}</button></>}
            </div>
            <p className="pricing-hint">{enabled ? t.hint : t.fallback}</p>
            <p className="pricing-stage-value" aria-live="polite"><strong>{t[capability]}</strong> {t[`${capability}Body`]}</p>
          </div>
        </div>
        <section className="pricing-explorer" aria-labelledby="pricing-capabilities">
          <div className="pricing-explorer-heading"><p className="pricing-eyebrow">{t.included}</p><h2 id="pricing-capabilities">{t.explorer}</h2><p>{t.explainer}</p></div>
          <div className="pricing-capability-buttons" role="group" aria-label={t.explorer}>
            {CAPABILITIES.map((id, i) => <button type="button" key={id} data-capability={id} aria-pressed={capability === id} aria-controls="pricing-capability-copy" onClick={() => { setCapability(id); setDissolve(false); track("pricing_capability", { item: id }) }}><span aria-hidden="true">{String(i + 1).padStart(2, "0")}</span>{t[id]}</button>)}
          </div>
          <div id="pricing-capability-copy" className="pricing-capability-copy" aria-live="polite" aria-atomic="true"><h3>{t[capability]}</h3><p>{t[`${capability}Body`]}</p></div>
          <p className="pricing-qualifier">{t.setup}</p>
          <details className="pricing-all-capabilities"><summary>{t.included}</summary><dl>{CAPABILITIES.map(id => <div key={id}><dt>{t[id]}</dt><dd>{t[`${id}Body`]}</dd></div>)}</dl></details>
        </section>
      </div>
      {toolbar && <div className="pricing-toolbar" data-pricing="toolbar"><p><span>{t[configuration]}</span><strong>{tr(price.monthlyLabel)}</strong></p>{demo}</div>}
    </section>
    <section className="pricing-workbench"><div className="pricing-container"><p className="pricing-eyebrow">CAROS / USD</p><h2>{t.costTitle}</h2><p className="pricing-workbench-intro">{t.costBody}</p>
      <details><summary>{t.hiring}</summary><HiringCalculator employees={employees} salary={salary} mode={mode} onEmployees={setEmployees} onSalary={setSalary} onMode={(m) => { setMode(m); setEmployees(String(MODE_COUNT[m])) }} /></details>
      <details><summary>{t.stack}</summary><StackCalculator /></details>
    </div></section>
  </>
}
