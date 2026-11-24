import test from 'node:test'
import assert from 'node:assert/strict'
import {readFileSync} from 'node:fs'
test('review quarantine activates only on this non-production branch',async()=>{
 const {pricingReviewMode}=await import('../lib/pricing-review.ts')
 assert.equal(pricingReviewMode({VERCEL_ENV:'preview',VERCEL_GIT_COMMIT_REF:'feat/pricing-3d-preview'}),true)
 for(const env of [{},{VERCEL_ENV:'production',VERCEL_GIT_COMMIT_REF:'feat/pricing-3d-preview'},{VERCEL_ENV:'preview',VERCEL_GIT_COMMIT_REF:'main'},{VERCEL_ENV:'preview',VERCEL_GIT_COMMIT_REF:'other'}])assert.equal(pricingReviewMode(env),false)
})
test('preview guards submissions, outbound mutations and disables call widget',()=>{
 const source=readFileSync('components/caros/preview-safety.tsx','utf8')
 assert.match(source,/addEventListener\("submit", block, true\)/)
 assert.match(source,/GET.*HEAD/)
 assert.match(source,/window.fetch/)
 assert.match(readFileSync('components/caros/route-chrome.tsx','utf8'),/!reviewOnly && <ChatWidget/)
})
