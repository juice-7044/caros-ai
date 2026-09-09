"use client"

import Script from "next/script"
import { usePathname } from "@/i18n/routing"
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
      data-widget-id="6aa03c4b77b246510fc493e7"
      strategy="afterInteractive"
    />
  )
}
