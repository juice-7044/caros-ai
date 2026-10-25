"use client"

import Script from "next/script"

/** Retell voice widget. The previous LeadConnector chat embed remains disabled. */
export function ChatWidget() {
  return (
    <Script
      id="retell-widget"
      src="https://dashboard.retellai.com/retell-widget-v2.js"
      type="module"
      data-voice-public-key="public_key_39a99c32f015ae9b68999"
      data-voice-agent-id="agent_b1913c7cc373ca7b77384368dc"
      data-agent-version="9"
      data-title="Talk to CAROS"
      data-fab-text="Talk to us"
      strategy="afterInteractive"
    />
  )
}
