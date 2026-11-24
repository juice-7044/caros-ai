"use client"

import {useEffect} from "react"

/** Only mounted by the exact review deployment. Normal production behavior is untouched. */
export function PreviewSafety({locale}: {locale: string}) {
  useEffect(() => {
    const block = (event: Event) => { event.preventDefault(); event.stopImmediatePropagation() }
    document.addEventListener("submit", block, true)
    const originalFetch = window.fetch
    const originalBeacon = navigator.sendBeacon
    window.fetch = (input, init) => {
      const method = (init?.method || (input instanceof Request ? input.method : "GET")).toUpperCase()
      if (!["GET", "HEAD"].includes(method)) return Promise.reject(new Error("Review preview: submissions and outbound actions are disabled."))
      return originalFetch.call(window, input, init)
    }
    navigator.sendBeacon = () => false
    return () => {
      document.removeEventListener("submit", block, true)
      window.fetch = originalFetch
      navigator.sendBeacon = originalBeacon
    }
  }, [])
  return <aside data-pricing-review="" role="status" style={{position:"fixed",top:86,right:16,zIndex:70,maxWidth:280,padding:"7px 12px",border:"1px solid #8c753e",borderRadius:6,background:"#17150feb",color:"#dfc58b",fontSize:11,lineHeight:1.5,pointerEvents:"none"}}>{locale === "es" ? "Vista previa: formularios, llamadas y envíos desactivados." : "Review preview: forms, calls and submissions disabled."}</aside>
}
