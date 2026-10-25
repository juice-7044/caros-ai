import test from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'

const source = path => readFileSync(new URL(path, import.meta.url), 'utf8')
test('GHL external website tracking is removed without deleting affiliate attribution or form APIs', () => {
  const layout = source('../app/layout.tsx')
  assert.doesNotMatch(layout, /external-tracking\.js|data-tracking-id|tk_12d930143d64417686edf3bdbf78f595/)
  assert.match(layout, /caros-affiliate-manager/)
  assert.match(layout, /affiliateManager\.init/)
  assert.match(source('../app/api/revenue-audit/route.ts'), /services\.leadconnectorhq\.com\/contacts\//)
})
