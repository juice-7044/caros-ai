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
})

test('scroll collapse uses hysteresis and route fallback is compact', async () => {
  const { shouldCollapseLauncher, getLauncherLayout } = await import('../lib/caros-widget-dock.ts')
  assert.equal(shouldCollapseLauncher(0, false), false)
  assert.equal(shouldCollapseLauncher(24, false), false)
  assert.equal(shouldCollapseLauncher(25, false), true)
  assert.equal(shouldCollapseLauncher(12, true), true)
  assert.equal(shouldCollapseLauncher(8, true), false)
  assert.equal(shouldCollapseLauncher(-20, true), false)
  assert.equal(getLauncherLayout(true, false), 'docked')
  assert.equal(getLauncherLayout(true, true), 'floating')
  assert.equal(getLauncherLayout(false, false), 'floating')
})
