"use client"

import Script from "next/script"
import { usePathname } from "next/navigation"
import { FORM_PATHS } from "@/lib/site"

/**
 * LeadConnector floating chat widget.
 *
 * Suppressed on any page listed in FORM_PATHS (pages that already contain a
 * lead form), so visitors aren't offered two competing ways to get in touch.
 */
export function ChatWidget() {
  const pathname = usePathname()
  const isFormPage = FORM_PATHS.some((path) => pathname === path || pathname.startsWith(`${path}/`))

  if (isFormPage) return null

  return (
    <Script
      src="https://widgets.leadconnectorhq.com/loader.js"
      data-resources-url="https://widgets.leadconnectorhq.com/chat-widget/loader.js"
      data-widget-id="6a7b70dc07e4c1b0f2a46740"
      strategy="afterInteractive"
    />
  )
}
