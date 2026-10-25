import test from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'

const source = path => readFileSync(new URL(path, import.meta.url), 'utf8')

test('homepage provides a stable dock after the CTA helper links', () => {
  const hero = source('../components/caros/home/hero.tsx')
  assert.ok(hero.indexOf('data-caros-chat-dock') > hero.indexOf('t("freeAuditCta")'))
  assert.match(hero, /min-h-\[76px\]/)
})

test('one session owner portals only the launcher; panel stays outside the hero', () => {
  const widget = source('../components/caros/chat-widget.tsx')
  assert.match(widget, /createPortal\(launcher, dockTarget\)/)
  assert.match(widget, /data-layout=/)
  assert.match(widget, /launcherCompact/)
  assert.match(widget, /compact && <span className=\{styles\.compactLabel\}>Talk to us<\/span>/)
  assert.match(widget, /target\?\.getBoundingClientRect\(\)\.bottom/)
  assert.doesNotMatch(widget, /shouldCollapseLauncher\(window\.scrollY/)
})

test('collapse waits until visitors have scrolled past the dock, not just started scrolling', async () => {
  const { shouldCollapseLauncher, getLauncherLayout } = await import('../lib/caros-widget-dock.ts')
  // Reported regression: after an 80px scroll, the CTA dock is still below the viewport.
  assert.equal(shouldCollapseLauncher(895, false), false)
  assert.equal(shouldCollapseLauncher(500, false), false)
  assert.equal(shouldCollapseLauncher(120, false), false)
  assert.equal(shouldCollapseLauncher(96, false), false)
  assert.equal(shouldCollapseLauncher(95, false), true)
  assert.equal(shouldCollapseLauncher(105, true), true)
  assert.equal(shouldCollapseLauncher(112, true), false)
  assert.equal(shouldCollapseLauncher(-20, true), true)
  assert.equal(getLauncherLayout(true, false), 'docked')
  assert.equal(getLauncherLayout(true, true), 'floating')
  assert.equal(getLauncherLayout(false, false), 'floating')
})
