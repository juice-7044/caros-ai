import { createRequire } from 'node:module'
import { mkdirSync, writeFileSync } from 'node:fs'
import assert from 'node:assert/strict'
const require=createRequire(import.meta.url)
const { chromium }=require(process.env.PLAYWRIGHT_MODULE || '/Users/anns-macbook/.npm/_npx/e41f203b7505f1fb/node_modules/playwright')
const base=process.env.BASE_URL || 'http://localhost:3105'
const out=process.env.EVIDENCE_DIR || '/Users/anns-macbook/.hermes/profiles/wiki-skill/cache/scratch/pricing3d-evidence'
mkdirSync(out,{recursive:true})
const browser=await chromium.launch({headless:true,channel:'chrome',args:['--enable-webgl','--use-angle=swiftshader','--enable-unsafe-swiftshader']})
const results=[]
async function safe(context){
  await context.route('**/*',route=>{const req=route.request();const url=new URL(req.url());return !['GET','HEAD'].includes(req.method()) || url.origin!==new URL(base).origin ? route.abort() : route.continue()})
}
async function reject(page){const banner=page.locator('[data-caros-consent]');if(await banner.isVisible()) await banner.getByRole('button',{name:/Reject|Rechazar/i}).click()}
try {
 for(const locale of ['en','es']) for(const width of [360,390,768,1440,1920,2560]){
  const context=await browser.newContext({viewport:{width,height:1000},reducedMotion:'reduce',hasTouch:width<768,isMobile:width<768});await safe(context)
  const page=await context.newPage();const errors=[];page.on('pageerror',e=>errors.push(e.message))
  assert.equal((await page.goto(`${base}/${locale}/pricing`)).status(),200);await page.waitForTimeout(500);await reject(page)
  assert.equal(await page.locator('.pricing-stage canvas').count(),0,'reduced motion is lightweight')
  const initial=await page.locator('[data-pricing=price]').innerText();assert.match(initial,/997/);assert.match(initial,/2[,.]500/)
  const box=await page.locator('.pricing-rail .pricing-primary').boundingBox();assert.ok(box.y<1000,'primary price CTA appears in first viewport')
  for(const button of await page.locator('[data-capability]').all()) {await button.focus();await page.keyboard.press('Enter');await page.waitForTimeout(100);assert.equal(await button.getAttribute('aria-pressed'),'true');assert.equal(await page.locator('[data-pricing=price]').innerText(),initial)}
  for(const [id,monthly] of [['medical','2,999'],['finance10','3,997'],['finance25','4,997'],['enterprise',null],['nonprofit',null]]){
   await page.locator('#pricing-configuration').selectOption(id);const text=await page.locator('[data-pricing=price]').innerText();if(monthly)assert.ok(text.includes(monthly)||text.includes(monthly.replace(',','.')));else assert.doesNotMatch(text,/\$\d/)
  }
  await page.locator('#pricing-configuration').selectOption('core');await page.evaluate(()=>scrollTo(0,0))
  const seo=await page.evaluate(()=>({lang:document.documentElement.lang,canonical:document.querySelector('link[rel=canonical]').href,alternates:document.querySelectorAll('link[hreflang]').length,overflow:document.documentElement.scrollWidth>innerWidth,broken:[...document.images].filter(i=>i.complete&&!i.naturalWidth).map(i=>i.src),events:(window.dataLayer||[]).filter(x=>String(x.event).startsWith('caros_'))}))
  assert.equal(seo.lang,locale);assert.equal(seo.canonical,`https://getcaros.com/${locale}/pricing`);assert.equal(seo.alternates,3);assert.equal(seo.overflow,false);assert.deepEqual(seo.broken,[]);assert.deepEqual(seo.events,[],'reject prevents analytics');assert.deepEqual(errors,[])
  await page.screenshot({path:`${out}/pricing-${locale}-${width}-hero.png`});await page.locator('.pricing-explorer').scrollIntoViewIfNeeded();await page.screenshot({path:`${out}/pricing-${locale}-${width}-explorer.png`})
  results.push({locale,width,seo,firstCTA:box.y,keyboardCapabilities:9,configurations:6});await context.close()
 }
 for(const locale of ['en','es']){
  const context=await browser.newContext({javaScriptEnabled:false,viewport:{width:390,height:1000}});await safe(context);const page=await context.newPage();assert.equal((await page.goto(`${base}/${locale}/pricing`)).status(),200)
  assert.match(await page.locator('[data-pricing=price]').innerText(),/997/);await page.locator('#pricing-commercial-terms>summary').click()
  const text=await page.locator('#pricing-commercial-terms').innerText();for(const amount of ['2,500','7,499','5,997','6,997','3,997','4,997'])assert.ok(text.includes(amount)||text.includes(amount.replace(',','.')),amount)
  assert.ok(await page.locator('#pricing-commercial-terms a[href*="nonprofit-consultation"]').isVisible());results.push({locale,noJS:true,commercialAmounts:6});await context.close()
 }
 const context=await browser.newContext({viewport:{width:1440,height:1000}});await safe(context)
 await context.addInitScript(()=>{const original=HTMLCanvasElement.prototype.getContext;HTMLCanvasElement.prototype.getContext=function(type,...args){return type.startsWith('webgl')?null:original.call(this,type,...args)}})
 const page=await context.newPage();await page.goto(`${base}/en/pricing`);await reject(page);await page.waitForTimeout(500);assert.equal(await page.locator('.pricing-stage canvas').count(),0);assert.ok(await page.locator('[data-pricing=fallback]').isVisible());results.push({noWebGL:true});await context.close()
 const gl=await browser.newContext({viewport:{width:1440,height:1000}});await safe(gl);const live=await gl.newPage();await live.goto(`${base}/en/pricing`);await reject(live);await live.locator('.pricing-stage canvas').waitFor({timeout:45000});await live.waitForTimeout(1800)
 await live.screenshot({path:`${out}/pricing-en-1440-webgl.png`});await live.locator('[data-capability=marketing]').click();await live.waitForTimeout(1200);await live.screenshot({path:`${out}/pricing-en-1440-marketing.png`})
 await live.getByRole('button',{name:'Preview dissolve',exact:true}).click();await live.waitForTimeout(700);await live.screenshot({path:`${out}/pricing-en-1440-dissolve.png`})
 await live.getByRole('button',{name:'Pause motion',exact:true}).click();assert.equal(await live.locator('[data-pricing=stage]').getAttribute('data-paused'),'true');results.push({webGLCanvas:true,pause:true,dissolveControl:true});await gl.close()
} finally {writeFileSync(`${out}/results.json`,JSON.stringify(results,null,2));await browser.close()}
console.log(JSON.stringify({cases:results.length,out,results},null,2))
