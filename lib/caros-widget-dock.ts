/** Collapse only after the entire CTA dock passes the sticky navigation. */
export function shouldCollapseLauncher(dockBottom: number, wasCompact: boolean): boolean {
  return dockBottom < (wasCompact ? 112 : 96)
}

export function getLauncherLayout(hasDock: boolean, scrolled: boolean): 'docked' | 'floating' {
  return hasDock && !scrolled ? 'docked' : 'floating'
}