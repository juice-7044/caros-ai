"use client"

import { useEffect } from "react"
import { useLocale } from "next-intl"
import { track } from "@/lib/analytics-client"
import { newScrollMilestones } from "@/lib/analytics"

/** Renders nothing. Reports homepage engagement (first interaction) and scroll-depth milestones, once each per visit. */
export function HomeAnalytics() {
  const locale = useLocale()
  useEffect(() => {
    const seen = new Set<number>()
    let engaged = false
    const engage = () => {
      if (engaged) return
      engaged = true
      track("home_engagement", { location: "home", locale })
    }
    const onScroll = () => {
      const doc = document.documentElement
      const scrollable = doc.scrollHeight - window.innerHeight
      if (scrollable <= 0) return
      const percent = ((window.scrollY + window.innerHeight) / doc.scrollHeight) * 100
      newScrollMilestones(percent, seen).forEach((depth) => track("scroll_depth", { depth, location: "home" }))
    }
    const onScrollAll = () => { engage(); onScroll() }
    window.addEventListener("scroll", onScrollAll, { passive: true })
    window.addEventListener("pointerdown", engage, { once: true })
    window.addEventListener("keydown", engage, { once: true })
    return () => {
      window.removeEventListener("scroll", onScrollAll)
      window.removeEventListener("pointerdown", engage)
      window.removeEventListener("keydown", engage)
    }
  }, [locale])
  return null
}
