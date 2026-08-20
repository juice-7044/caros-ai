"use client"

import dynamic from "next/dynamic"

const TrustpilotWidget = dynamic(() => import("@/components/TrustpilotWidget"), {
  ssr: false,
})

export function TrustpilotWidgetLoader() {
  return <TrustpilotWidget />
}
