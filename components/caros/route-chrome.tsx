"use client"

import type { ReactNode } from "react"
import { usePathname } from "@/i18n/routing"
import { SiteNav } from "@/components/caros/site-nav"
import { SiteFooter } from "@/components/caros/site-footer"
import { ChatWidget } from "@/components/caros/chat-widget"

export function RouteChrome({ children }: { children: ReactNode }) {
  const pathname = usePathname()
  const isThankYou = pathname === "/thank-you"

  return (
    <>
      {!isThankYou && <SiteNav />}
      <main className="min-h-screen overflow-x-hidden">{children}</main>
      {!isThankYou && <SiteFooter />}
      {!isThankYou && <ChatWidget />}
    </>
  )
}
