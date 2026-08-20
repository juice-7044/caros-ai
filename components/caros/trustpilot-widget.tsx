"use client"

import { useEffect, useRef } from "react"

declare global {
  interface Window {
    Trustpilot?: {
      loadFromElement?: (element: HTMLElement, forceReload?: boolean) => void
    }
  }
}

const TRUSTPILOT_ATTRIBUTES = {
  "data-locale": "en-US",
  "data-template-id": "56278e9abfbbba0bdcd568bc",
  "data-businessunit-id": "6a85bb452d3cdad756440fa7",
  "data-style-height": "52px",
  "data-style-width": "100%",
  "data-token": "54408afc-3dd2-45ae-b5b8-3ab8115cde87",
} as const

export function TrustpilotWidget() {
  const widgetRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const widget = widgetRef.current
    if (!widget) return

    Object.entries(TRUSTPILOT_ATTRIBUTES).forEach(([name, value]) => {
      widget.setAttribute(name, value)
    })

    widget.innerHTML = `<a href="https://www.trustpilot.com/review/getcaros.com" target="_blank" rel="noopener">Trustpilot</a>`
    window.Trustpilot?.loadFromElement?.(widget, true)
  }, [])

  return <div ref={widgetRef} className="trustpilot-widget" aria-label="Trustpilot review collector" />
}
