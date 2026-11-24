import test from 'node:test'
import assert from 'node:assert/strict'
import {readFileSync} from 'node:fs'
const css=readFileSync('app/[locale]/pricing/pricing-studio.css','utf8')
test('configuration label has a desktop-only block gap while mobile stays at eight pixels',()=>{
 const desktop=css.split('@media(min-width:1100px)')[1]?.split('@media')[0]||''
 assert.match(desktop,/\.pricing-rail>\.pricing-eyebrow\{display:block;margin-bottom:16px\}/)
 const mobile=css.split('@media(max-width:767px)')[1]?.split('@media')[0]||''
 assert.match(mobile,/\.pricing-rail>\.pricing-eyebrow\{margin-bottom:8px;display:block\}/)
})
