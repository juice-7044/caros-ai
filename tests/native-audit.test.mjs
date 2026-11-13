import test from 'node:test'
import assert from 'node:assert/strict'
import { existsSync } from 'node:fs'
import { createHash } from 'node:crypto'

const moduleUrl = new URL('../lib/revenue-audit-form.ts', import.meta.url)
test('native audit snapshot matches the approved live form and wording-derived token', async () => {
  assert.ok(existsSync(moduleUrl), 'native audit snapshot must exist')
  const { REVENUE_AUDIT: form } = await import(moduleUrl)
  assert.equal(form.endpoint, 'https://ask.getcaros.com/api/forms/STXwJ6GJRXmSPQMOKgOwJsUlEC80c0J_nmQhpRR2yDo')
  assert.equal(form.formId, 'caros-form-hprr2ydo')
  assert.equal(form.id, '0b387c89-a47f-4986-acd3-367e14bd6780')
  assert.deepEqual(form.fields.map(f => [f.name, f.type, !!f.required]), [['name','text',false],['email','email',true],['phone','tel',false],['company','text',false],['site','text',false],['industry','text',false],['consent','text',false],['details','textarea',false],['sms_consent','checkbox',false]])
  const normalized = form.wording.normalize('NFKC').replace(/[\u0000-\u001f\u007f]/g, '').replace(/\s+/g, ' ').trim()
  assert.equal(form.checkboxValue, 'sms-optin-df9eacadc930e901')
  assert.equal(form.checkboxValue, `sms-optin-${createHash('sha256').update(normalized).digest('hex').slice(0,16)}`)
})

test('native transport posts plain FormData JSON, omits unchecked SMS and rejects every failure', async () => {
  const module = await import(moduleUrl)
  assert.equal(typeof module.submitRevenueAudit, 'function', 'native transport must be testable')
  const { submitRevenueAudit, REVENUE_AUDIT: form } = module
  const data = new FormData()
  data.set('email', 'unit@example.invalid')
  data.set('consent', 'Email only')
  data.set('website', '')
  const calls = []
  const mock = async (url, init) => { calls.push([url,init]); return new Response('{"ok":true}') }
  await submitRevenueAudit(data, mock)
  assert.equal(calls[0][0], form.endpoint)
  assert.equal(calls[0][1].method, 'POST')
  assert.deepEqual(calls[0][1].headers, { 'Content-Type': 'application/json' })
  assert.deepEqual(JSON.parse(calls[0][1].body), { email:'unit@example.invalid', consent:'Email only', website:'' })
  data.set('sms_consent', form.checkboxValue)
  await submitRevenueAudit(data, mock)
  assert.equal(JSON.parse(calls[1][1].body).sms_consent, form.checkboxValue)
  for (const response of [new Response('{"ok":false}'), new Response('{"ok":true}', {status:500}), new Response('not json')]) {
    await assert.rejects(submitRevenueAudit(data, async ()=>response))
  }
  await assert.rejects(submitRevenueAudit(data, async ()=>{throw new Error('offline')}))
})
