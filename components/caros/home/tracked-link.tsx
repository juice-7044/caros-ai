"use client"

import type { ReactNode } from "react"
import { track } from "@/lib/analytics-client"

type Evt = [name: string, props?: Record<string, unknown>]

/** Anchor that records analytics events on click. A demo click is only a click: arrival on the demo site is not observed. */
export function TrackedLink({
  href,
  events,
  external,
  className,
  children,
}: {
  href: string
  events: Evt[]
  external?: boolean
  className?: string
  children: ReactNode
}) {
  return (
    <a
      href={href}
      className={className}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      onClick={() => events.forEach(([name, props]) => track(name, props))}
    >
      {children}
    </a>
  )
}
