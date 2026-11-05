import test from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'

const messages = lang => JSON.parse(readFileSync(new URL(`../messages/${lang}.json`, import.meta.url), 'utf8'))
const read = p => readFileSync(new URL(`../${p}`, import.meta.url), 'utf8')

test('story mode follows the headcount: ten at 10 or more, otherwise the five-role view, custom counts flagged', async () => {
  const { storyView } = await import('../lib/hiring-story.ts')
  assert.deepEqual(storyView('5'), { mode: 'five', count: 5, exact: true })
  assert.deepEqual(storyView('10'), { mode: 'ten', count: 10, exact: true })
  assert.deepEqual(storyView('7'), { mode: 'five', count: 7, exact: false })
  assert.deepEqual(storyView('9'), { mode: 'five', count: 9, exact: false })
  assert.deepEqual(storyView('25'), { mode: 'ten', count: 25, exact: false })
  assert.deepEqual(storyView('').mode, 'five')
  assert.equal(storyView('').exact, false)
  assert.equal(storyView('abc').mode, 'five')
  assert.equal(storyView('-3').mode, 'five')
  assert.equal(storyView('9999999').count, 1000)
})

test('toggle choices map to the shared headcount string', async () => {
  const { MODE_COUNT, storyView } = await import('../lib/hiring-story.ts')
  assert.equal(MODE_COUNT.five, 5)
  assert.equal(MODE_COUNT.ten, 10)
  for (const mode of ['five', 'ten']) assert.equal(storyView(String(MODE_COUNT[mode])).mode, mode)
})

test('story headcount parsing matches the calculator (same cap and coercion as hiringCost)', async () => {
  const { storyView } = await import('../lib/hiring-story.ts')
  const { hiringCost, LIMITS } = await import('../lib/home-calculators.ts')
  for (const v of ['5', '10', '7.9', '', ' ', 'abc', '-3', '0', '1e9', '1001', 12, null, undefined]) {
    assert.equal(storyView(v).count * 1000, hiringCost({ employees: v, salary: 1000 }).annual, `count for ${v}`)
  }
  assert.equal(storyView('1e9').count, LIMITS.employees)
})

test('story copy: exact headlines, five positions, ten functions, in EN and ES', () => {
  const en = messages('en').Home
  assert.equal(en.hero.title, 'Your Business Is Growing.')
  assert.equal(en.hero.subtitle, 'Your Operations Should Grow With It.')
  assert.match(en.hero.growthBody, /customers.*communication.*responsibilities.*expectations/i)
  assert.match(en.hero.productValue, /one.*dashboard.*Revenue Operating System/i)
  assert.equal(en.hero.traditional, 'Traditionally, keeping up with growth means hiring more people.')
  assert.match(en.hero.traditionalBody, /marketing.*sales.*customer communication.*operations.*customer success/i)
  assert.equal(en.story.costQuestion, 'So, what would it cost you to hire five more employees? What about ten?')
  assert.equal(en.story.rolesTitle, 'Here’s the work behind that number.')
  assert.equal(en.story.revealTitle, 'What if you could scale the work without scaling your headcount at the same rate?')
  assert.equal(en.story.functionsTitle, 'Ten Business Functions. One Connected Operating System.')
  assert.equal(en.disconnected.title, 'And hiring more people isn’t the only expense that comes with growth.')
  assert.match(en.disconnected.bridge, /different software systems your business relies on/i)
  for (const lang of ['en', 'es']) {
    const m = messages(lang).Home
    for (const k of ['growthBody', 'productValue', 'traditional', 'traditionalBody']) assert.ok(m.hero[k])
    assert.ok(m.story.costQuestion && m.disconnected.bridge)
  }
  assert.equal(en.story.emphasis, 'ONE DASHBOARD. ONE UNIFIED REVENUE OPERATING SYSTEM.')
  assert.equal(en.story.roles[0].title, 'Marketing & Social Media Coordinator')
  assert.equal(en.story.roles[4].title, 'Customer Success & Reputation Coordinator')
  assert.equal(en.story.functions[9].title, 'Community Building')
  for (const lang of ['en', 'es']) {
    const s = messages(lang).Home.story
    assert.equal(s.roles.length, 5)
    assert.equal(s.functions.length, 10)
    assert.ok(s.functions.every(f => f.title && f.text.split('.').filter(Boolean).length === 1), 'one sentence per function')
  }
})

test('story copy makes no guaranteed-savings, replacement or elimination claims and states disclaimers', () => {
  for (const lang of ['en', 'es']) {
    const m = messages(lang).Home
    // The salary disclaimer is the one place that must name the word, as a negation.
    const text = JSON.stringify([{ ...m.story, salaryDisclaimer: '' }, m.disconnected, m.hero])
    assert.doesNotMatch(text, /guarantee|garantiz|eliminat|elimina |(?<!not )replaces? (your|every|all)|(?<!no )reemplaza (tu|tus|todo|todos|todas|cada)/i)
  }
  const en = messages('en').Home.story
  assert.match(en.rolesDisclaimer, /illustrative examples, not (mandatory )?staffing recommendations/i)
  assert.match(en.salaryDisclaimer, /hypothetical hiring costs, not guaranteed savings/i)
  assert.match(en.functionsDisclaimer, /not ten (full-time )?(employees|workers)|do(es)? not (mean|imply)/i)
})

test('hero has no free-resources link or chat dock; story precedes showcase, comparison, calculator, capabilities', () => {
  const hero = read('components/caros/home/hero.tsx')
  assert.doesNotMatch(hero, /freeAuditCta|data-caros-chat-dock/)
  const page = read('app/[locale]/page.tsx')
  const order = ['<Hero', '<ProductShowcase', '<DisconnectedCost', '<StackCalculator', '<UnifiedSystem', '<ChallengePairs', '<LifecycleFlow', '<ProductExperience', '<Roi', '<CtaBand']
  const at = order.map(s => page.indexOf(s))
  assert.ok(at.every(i => i >= 0), `missing: ${order.filter((s, i) => at[i] < 0)}`)
  assert.deepEqual([...at].sort((a, b) => a - b), at)
  assert.doesNotMatch(read('components/caros/home/unified-system.tsx'), /ProductShowcase|\bshowcase\b/)
})

test('the floating contact launcher does not wait for a hero dock', () => {
  const widget = read('components/caros/chat-widget.tsx')
  assert.doesNotMatch(widget, /setLauncherReady\(pathname !== '\/' \|\| !!target\)/)
  assert.doesNotMatch(widget, /new MutationObserver/)
})
