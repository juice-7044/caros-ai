/** A small dead band prevents flicker from touchpad overscroll near the top. */
export function shouldCollapseLauncher(scrollY: number, wasCompact: boolean): boolean {
  return scrollY > (wasCompact ? 8 : 24)
}

export function getLauncherLayout(hasDock: boolean, scrolled: boolean): 'docked' | 'floating' {
  return hasDock && !scrolled ? 'docked' : 'floating'
}