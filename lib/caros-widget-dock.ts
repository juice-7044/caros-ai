/** Collapse only after the entire CTA dock passes the sticky navigation. */
export function shouldCollapseLauncher(dockBottom: number, wasCompact: boolean): boolean {
  return dockBottom < (wasCompact ? 112 : 96)
}

/** True once the footer's bottom bar (copyright + social links) is on screen. */
export function isFooterBarInView(barTop: number | null, viewportHeight: number): boolean {
  return barTop !== null && barTop < viewportHeight
}

export function getLauncherLayout(hasDock: boolean, scrolled: boolean): 'docked' | 'floating' {
  return hasDock && !scrolled ? 'docked' : 'floating'
}