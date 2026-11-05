# Redesign review: unified Revenue Operating System + Spanish (branch `redesign/unified-revenue-os-es`)

Nothing here is published, pushed or deployed. Local commit only. Brief: `~/.hermes/composer-pastes/pasted_content_2026-11-05_15-51-29-873_e607fd.txt`. Design rules: `DESIGN.md`.

## 1. What changed

**New homepage (9-section sequence)** in `app/[locale]/page.tsx`:
1. `Hero` (rewritten) + `HiringCalculator`: hiring-cost headline, "What about 10?", transition line, "One unified Revenue Operating System · One dashboard" chip and value proposition, primary CTA -> https://demo.getcaros.com, secondary -> `#unified-capabilities`. All of it fits the first viewport at 360/390/768/1440 (checked). The chat dock (`data-caros-chat-dock`) is preserved.
2. `UnifiedSystem` + `ProductShowcase`: nine expandable capability cards (native `<details>`, lucide icons) and the screenshot slot.
3. `DisconnectedCost`: ten separate tiles under tangled dashed lines vs the same ten feeding one CAROS hub. Diagrams, no competitor logos, caveat that CAROS does not replace every specialized platform.
4. `StackCalculator`.
5. `ChallengePairs`: 8 short problem/solution pairs.
6. `LifecycleFlow`: ATTRACT -> ENGAGE -> CONVERT -> SERVE -> RETAIN -> REACTIVATE, each tagged AI-powered / Human-assisted / Automated. CSS-only glow cycle, off under `prefers-reduced-motion` (verified).
7. `ProductExperience`: live demo CTA + existing-tools/integrations chips (qualified) + industries link.
8. `Roi` (existing `RoiCalculator`, now inside an expandable `<details>`) + audit CTA (`/revenue-audit`) + link to the other free calculators (`/diagnostic`).
9. `CtaBand` (extended with `children` and `trackDemo`), brand tagline, exact privacy statement, then the unchanged Trustpilot section.

New files: `components/caros/home/{challenge-pairs,disconnected-cost,hiring-calculator,home-analytics,lifecycle-flow,number-field,product-experience,product-showcase,stack-calculator,tracked-link,unified-system}.tsx`, `lib/{home-calculators,analytics,analytics-client,home-nav}.ts`, `DESIGN.md`.
Modified: `hero.tsx`, `roi.tsx`, `cta-band.tsx`, `audit-form.tsx` (instrumentation only), `app/globals.css` (lifecycle animation), `app/layout.tsx` + `app/[locale]/layout.tsx` + `lib/positioning-metadata.ts` (title/description/slogan), `app/sitemap.ts`, five industry/why-caros pages (hreflang `x-default`), `whats-included/page.tsx`, `messages/en.json`, `messages/es.json`, `messages/full/home-general.es.json`.

**Supporting pages (concise positioning only, no copy duplication):** global description/titles/slogan now say "unified Revenue Operating System / one dashboard"; `how-it-works` subtitle; `compare` body gets the "not simply an AI receptionist, CRM, email platform, chatbot or phone system" statement; footer tagline is the brand tagline (EN/ES); `whats-included` no longer says CAROS "replaces" tools (struck-through list removed, heading "What It Can Consolidate", caveat added). Pricing, legal clauses, demo links, integrations, Trustpilot and voice/chat were not touched. Industry catalogs and prices unchanged.

**SEO:** `x-default` hreflang added to the five pages that overrode the layout alternates (they had only en/es). Sitemap gained `/why-caros`, `/compare`, `/faq`, `/resources`, `/affiliates` (both locales; 78 -> 88 URLs). `thank-you` stays out. lang/canonical/hreflang audited on all 90 pages.

## 2. Capability claims

**Current source of truth: "Confirmed by Ann (product owner), 2026-11-05".** Ann confirmed the brief's wording for the four areas below, overriding the earlier code-evidence qualifications. The earlier evidence notes are kept as history (read-only review of `/Users/anns-macbook/Projects/ask-caros`; code evidence, not proof of production flag state).

| Area | Source | Copy now (EN catalog; ES mirrors) | History: earlier code evidence in ask-caros |
|---|---|---|---|
| Marketing & social | Code evidence | draft/approve/schedule to connected accounts | LIVE (pilot-gated): `lib/server/social.ts`, `zernio.ts`, `/workspace/social` |
| Sales | Code evidence | pipeline stages, open value, slow-response flags | LIVE: `workspace/pipeline`, `speed-to-lead.ts` |
| Outreach | Code evidence | phone/email/SMS inbox + web chat/voice, "channels depend on what you connect" | LIVE: `texts.ts`, `mail.ts`, `calling.ts`, `retell.ts` |
| **Customer Reactivation** | **Confirmed by Ann (product owner), 2026-11-05** | reengagement email and SMS campaigns, personalized follow-up, repeat-business opportunities; challenge pair "Create intelligent, personalized reengagement workflows." | Was PARTIAL: "Win back" was a read-only list; no campaign launcher found |
| **Workflows & Automation** | **Confirmed by Ann (product owner), 2026-11-05** | workflow builder: dynamic operational workflows, automated tasks, scheduling, coordination | Was PARTIAL: `workspace/automate` read-only, only `workflow.enroll_contact` |
| **Customer Service & Success** | **Confirmed by Ann (product owner), 2026-11-05** | ticketing and customer support, one record per customer | Was PARTIAL: no ticketing found |
| **Reputation Management** | **Confirmed by Ann (product owner), 2026-11-05** | Google, Yelp, Facebook and website reviews, with supported monitoring, response and reputation workflows | Was PARTIAL: Google + Facebook live; Yelp and website reviews NOT FOUND |
| Community | Code evidence | communities, courses, webinars, paid memberships | LIVE |
| More | Code evidence | AI receptionist, reporting, daily briefs, invoicing, e-signature | LIVE |

**Release gate (from Ann):** Yelp and website-review monitoring is being added now and **must be live before the production publish** of this copy. All "partial/Expanding" tags are gone (every capability is `status: "live"`). `tests/caros-home-content.test.mjs` was deliberately changed: it used to forbid "Yelp" outside a "not yet available" qualifier; it now asserts the approved claims and that no "not yet available / not included" wording remains (EN and ES).

**Flags for the owner:**
- "One dashboard": `/workspace` (Command Center) is an overview. Reviews, social, community and inbox are separate sections of the same workspace/login. Copy says "one dashboard / one login" per the brief; confirm that is acceptable.
- **Privacy statement** is used verbatim per the brief. ask-caros code supports per-account isolation (`tenant_id` RLS) but has **no explicit statement** that data is not sold or not used to train across customers. Needs legal/vendor-terms confirmation before publishing.
- Ads: Meta ad launch exists, Google Ads launch not found; ads are not claimed.

## 3. Command Center showcase

Ann supplied the real screenshot: `public/caros-command-center.png` (2798x1718, 373 KB). It labels itself "Illustrative demo workspace" and "All values, charts, and activity on this page are simulated demo data", and the visible caption says so in both locales ("CAROS Command Center · demo workspace with simulated data" / "Centro de Comando de CAROS · espacio de demostración con datos simulados").
- `components/caros/home/product-showcase.tsx` is now a client component using `next/image` (explicit 2798x1718, `sizes`, quality 80, lazy because it is below the fold). The empty lower quarter of the capture is cropped by aspect ratio (2798:1300).
- `next.config.mjs`: removed the global `images.unoptimized: true` and set `formats: [avif, webp]` plus device sizes. This is the only `next/image` user on the site. **Hosting must provide the Next image optimizer (Vercel does).** No extra image files were committed.
- Six CSS-only hotspots (nav = one connected workspace, New deals chart, win rate, pipeline/opportunities, appointments, Ask CAROS), positioned in percent of the visible area, real `<button>`s with `aria-label`, `aria-pressed`, focus ring, text shown in an `aria-live` detail panel under the image (no popover that could clip on narrow screens). Pulse ring is disabled under `prefers-reduced-motion`. Opening one fires `caros_showcase_interaction {action: hotspot, item}` (subject to consent).
- Not done: a smaller copy of the screenshot as the hub of the "CAROS business" diagram. It did not fit cleanly at 360 px next to ten tiles; left out.

## 4. Formulas and assumptions (`lib/home-calculators.ts`)

- Hiring: `annual = employees x salary`. Defaults 5 x $50,000 = $250,000; 10 = $500,000. Always labelled "Illustrative only. Excludes benefits, payroll taxes, recruiting, onboarding, and other employment expenses."
- Stack: `annualSoftware = subscriptions x avgMonthly x 12`; `annualTime = employees x weeklyHoursPerEmployee x 52 x hourlyCost`; `combined = both`; breakdown shares = each / combined. Hours are labelled **per employee**, and employees multiply **once**. The platform/login count is context only (field says so; test proves changing it does not change the result). Time is labelled "an estimate, not audited savings"; the result states it is not a savings or ROI figure and that some spend may not be addressable.
- Defensive: input kept as strings; empty/NaN/Infinity/negative -> 0; whole numbers for counts; caps: employees 1,000, salary $1,000,000, subscriptions 500, monthly $100,000, hours/week 168, hourly $1,000, so totals never overflow. No guaranteed savings or ROI anywhere.

## 5. Analytics (`lib/analytics.ts`, `lib/analytics-client.ts`)

All events go to the existing GTM `window.dataLayer` as `caros_<name>`. **Nothing is sent unless the visitor granted the analytics category** (see section 5a), and still nothing when `navigator.doNotTrack === '1'` or `navigator.globalPrivacyControl === true`. Payloads are allowlisted (`cta, location, field, action, section, depth, expanded, item, locale, kind`); strings cut to 64 chars; names, emails, phone numbers, salaries, counts and totals can't pass (tested). Existing thank-you purchase tracking is untouched.

| Event | Fires when |
|---|---|
| `caros_home_engagement` | first pointer/key/scroll on the homepage, once per visit |
| `caros_scroll_depth` {depth 25/50/75/100} | each milestone once |
| `caros_hero_cta_click` {cta, location} | click on hero primary/secondary CTA |
| `caros_employee_calc_interaction` {field} | first edit of each field (or preset) per page view; field name only |
| `caros_stack_calc_interaction` {field} | same, stack calculator |
| `caros_showcase_interaction` {action: expand/collapse/hotspot, item} | capability card toggled / hotspot opened |
| `caros_demo_click` {location} | click on a link to demo.getcaros.com. **Click only; arrival/visit on the demo is not observed** |
| `caros_audit_start` | first focus inside the revenue-audit form, once |
| `caros_audit_complete` | after the API returns OK, before the booking redirect. No form data |

The audit form payload, validation, consent and `/api/revenue-audit` are unchanged.

## 5a. Cookie consent (new)

Files: `lib/consent.ts` (pure state logic, unit-tested), `lib/consent-client.ts` (cookie, Google update, lazy Meta Pixel), `components/caros/consent-banner.tsx`, `cookie-settings-button.tsx` (footer), inline default script in `app/layout.tsx`, `Consent` + `footer.cookieSettings` keys in both catalogs, new privacy section 9.5 (EN + ES, no other clause touched).
- **Defaults:** all non-essential denied. `gtag('consent','default',{ad_storage, ad_user_data, ad_personalization, analytics_storage: 'denied', functionality_storage, security_storage: 'granted', wait_for_update: 500})` is a `beforeInteractive` script placed before the affiliate, GTM and gtag scripts. A stored choice is replayed as `consent update` in that same script, before GTM loads. Choice changes call `gtag('consent','update', ...)`.
- **Meta Pixel:** no longer in the layout. `loadMetaPixel()` runs only when marketing is granted (`fbq('consent','revoke')`, init, `grant`, PageView) and on later revoke calls `fbq('consent','revoke')`. Revoking after load cannot unload the script until the next page load.
- **Removed:** the GTM `<noscript>` iframe and the Meta `<noscript>` image: noscript cannot honor consent. Cost: no-JS visitors are no longer counted by either (they were mostly bots).
- **Choices:** Accept all / Reject non-essential / Customize (analytics, marketing toggles, essential shown as always on). Accept and Reject are identical buttons, same size and weight. Stored in first-party cookie `caros_consent` = `{v:1, ts, analytics, marketing}`, 180 days, `SameSite=Lax`, `Secure` on https. A different `v` re-prompts. Footer "Cookie settings" reopens it (focus moves to the dialog heading; Esc closes a reopened dialog and returns focus to the footer button).
- **GPC:** marketing is capped to denied even on Accept all or a manual toggle, and the toggle explains why. DNT/GPC also still block our own events.
- **Layout:** `position: fixed`, rendered after mount, so no layout shift (CLS 0 measured). It is not blocking (`aria-modal=false`) and also shows on `/thank-you`. On mobile it is a bottom sheet (max 60dvh); on >=720 px a card at bottom right. While open it publishes its height and `globals.css` lifts the floating chat/voice launcher above it. The hero-docked launcher is in page flow, so on a first mobile paint (360/390) the banner can sit over it until the visitor chooses or scrolls; it is never permanently covered.
- **Classification:** *Essential:* language cookie, `caros_consent`, Vercel Web Analytics (`@vercel/analytics`, cookieless; kept on, see limitations), and the **affiliate manager** (`links.getcaros.com/js/am.js`, `affiliateManager.init`, keeps loading): it stores the referral so affiliate commissions are attributed, which is a contractual function the visitor requested by following an affiliate link. This is a judgment call; **confirm with legal**. *Analytics:* Google Analytics (G-MT8HLMZL04) / GTM Google tags and our `caros_*` events. *Marketing:* Meta Pixel (1646397766883866) and advertising signals.
- GTM and the gtag library still load (needed for Consent Mode, which sends cookieless pings while denied). Third-party tags inside the GTM container (non-Google) are **not** governed by Consent Mode automatically; the container must be configured with consent checks in GTM. Not verifiable from this repo.
- **Pre-existing finding:** the Content-Security-Policy in `next.config.mjs` has no `connect.facebook.net` in `script-src` or `connect-src`, so the Meta Pixel script was already blocked in production before this change (browser run: the `fbevents.js` request is attempted after Accept and fails). Consent plumbing is correct, but Meta will not receive events until the CSP is widened. I did not change the CSP (security policy decision for Ann).

## 6. Verification

### Second pass (capability claims, Command Center showcase, consent), 2026-11-05
- `node --test tests/*.test.mjs` -> **69 pass, 0 fail** (`docs/tdd-logs/full-suite.txt`). `npx tsc --noEmit -p .` clean (tsbuildinfo cleared). `npm run build` succeeded (run twice: once mid-work, once on the final code). `node scripts/validate-locales.mjs` -> schemas match, 0 suspicious duplicates.
- Production server restarted on port 3101 (previous one killed) and left running. Browser: Chrome for Testing 1208 via playwright-core 1.58 (`CHROMIUM_PATH` / `PLAYWRIGHT_CORE` env vars; the default headless shell was not installed).
- `scripts/verify-consent.mjs` (new): **52/52 checks pass** (one earlier run had 1 failure, a timing race in the script: focus restore is async; script fixed, rerun clean) in EN and ES: banner on first visit; consent default (all denied, `wait_for_update: 500`) is the first consent command in `dataLayer`; no facebook request before a choice; **Reject: no `connect.facebook.net`/`facebook.com/tr` request, no `caros_` events, GA collect pings only `gcs=G100` (denied, cookieless), none with `analytics_storage` granted**; cookie holds `{v:1,ts,...}`; choice persists across reload and the stored state is replayed before GTM; footer link reopens the banner with focus in the dialog, Esc returns focus; **Accept: consent update grants all four signals, `caros_` events flow, the Meta Pixel script is requested** (but fails, see CSP finding in 5a); Customize analytics-only stored without facebook; GPC keeps marketing denied on Accept all; at 360/390/768/1440: no horizontal overflow, CLS 0 from the banner, floating launcher lifted above the banner without overlap. INFO (not asserted): at 360/390 the hero-docked launcher can sit under the banner on first paint until choice/scroll.
- `scripts/capture-home.mjs`: **20/20 checks** (the earlier 18 now run with analytics consent granted, plus image loaded with `naturalWidth > 0`, 6 hotspot buttons with `aria-label`, and hotspot click shows detail and fires `showcase_interaction {action: hotspot, item: deals}`); zero horizontal overflow at 360/390/768/1440 in EN and ES. Optimized image served as AVIF (24 KB) / WebP (27 KB) from the 373 KB PNG (`/_next/image`, `Accept` negotiated). I looked at the 1440 ES and 360 EN showcase renders: markers sit on the intended areas.
- Fold screenshots in `docs/screenshots/`: `home-<locale>-<width>-fold.png` (returning visitor, hero unobstructed) and `-fold-consent.png` (first visit, banner showing). `*-full.png` regenerated but not committed.
- TDD logs: `11-red/green-capability-claims.txt`, `12-red/green-consent.txt`. Honest notes: the red for consent was `ERR_MODULE_NOT_FOUND` (module missing); after adding `lib/consent.ts` I ran the suite again and saw the layout/loader/footer/analytics tests still failing, but that intermediate output was not saved to a file. The showcase test (`caros-home-navigation.test.mjs`) and the analytics test helper (now passes `consent`) were updated after implementation; I saw the old showcase test fail against the new component before replacing it, not saved as a log. Hotspot positions, the banner UI and the Playwright scripts are verified by browser, not unit tests.

Commands (Node v24.22.1; deps via `corepack pnpm install --frozen-lockfile`, which finished but warned `ERR_PNPM_IGNORED_BUILDS` for @parcel/watcher, @swc/core, sharp; builds were unaffected):
- `node --test tests/*.test.mjs` -> **58 pass, 0 fail** (40 before; 18 new). Log: `docs/tdd-logs/full-suite.txt`.
- `npx tsc --noEmit -p .` -> clean (clear `tsconfig.tsbuildinfo` first: a stale incremental cache produced a bogus `dataLayer` error). Note `next.config.mjs` has `ignoreBuildErrors: true`, so the standalone typecheck is the real one.
- `npm run build` (`next build --webpack`) -> compiled, 98 static pages generated.
- `node scripts/validate-locales.mjs` -> en/es schemas match.
- Served with `npx next start -p 3101` (still running at hand-off).
- `scripts/capture-home.mjs`: 18/18 browser checks pass (defaults, preset, empty -> $0, stack $25,200 / platform-invariance / employees x2 -> $31,200, 9 cards, expand, CTA scroll, no broken image, events fired, no PII keys, DNT, reduced motion on/off) and zero horizontal overflow at 360/390/768/1440 in EN and ES. Screenshots: `docs/screenshots/` (fold images committed; `*-full.png` are regenerable and left untracked).
- TDD red/green output: `docs/tdd-logs/NN-red-*.txt` / `NN-green-*.txt` for hiring (2), stack software/time/combined (3), analytics push/sanitize/consent/scroll (4), navigation (1). Honest exceptions: the audit-form instrumentation test and `caros-home-content.test.mjs` were written after the code (no red run); the red for cycle 03/04 was a `ReferenceError`/assertion failure, i.e. feature missing.

**Route audit (rendered, Playwright, `scripts/audit-routes.mjs`)**: 45 routes x 2 locales = 90 pages (sitemap + faq, compare, resources, why-caros, affiliates, thank-you), all 200 after the change. Baseline (main) `docs/audit/baseline-route-audit.json` vs after `docs/audit/after-route-audit.json`. One baseline page (`en/revenue-audit`) timed out once (status 0, `networkidle` flake); it returned 200 in the earlier first baseline run.
Spanish: `html lang`, title, description, canonical and 3 hreflang entries on all 45 `/es` routes; no un-prefixed internal links; English-stopword heuristic found 0 leaks; `scripts/audit-es-parity.mjs` (strings identical in EN and ES) leaves only address/phone, brand names (competitor names in compare), numeric tables, `$` ranges on revenue-audit, "© 2026 CAROS", and the Trustpilot widget's own labels ("Trustpilot review collector", "Customer reviews powered by Trustpilot", loaded as en-US by the third-party script). That is a heuristic, not a human linguistic review.

**Copy reduction (visible text via `innerText`, closed `<details>` excluded):**
| | Baseline | After | Change |
|---|---|---|---|
| Home EN, whole page | 1,836 words | 975 | -46.9% |
| Home EN, excluding header/footer | 1,737 | 872 | -49.8% |
| Home ES, whole page | 2,099 | 1,138 | -45.8% |
| Home ES, excluding header/footer | 1,984 | 1,021 | -48.5% |
| All 45 routes EN | 53,375 | 53,670 | +0.6% |
Only the homepage was reduced; supporting pages were not trimmed (see limitations). Site-wide visible words are essentially unchanged.

## 7. Limitations and open items
- Showcase: no smaller screenshot hub inside the disconnected-vs-unified diagram (section 3). Hotspot copy describes only what the screenshot visibly shows.
- **Release gate:** capability copy now states reactivation campaigns, workflow builder, ticketing and Yelp/website reviews on Ann's confirmation; code evidence in ask-caros did not show them. Yelp/website-review monitoring must be live before production publish.
- Privacy statement unverified in code (section 2).
- "Approximately 50% reduction" achieved on the homepage only. The rest of the site (~53k visible words in EN) was reviewed for positioning but not condensed; that needs page-by-page editorial work.
- Consent: Meta Pixel is blocked by the existing CSP (5a), non-Google tags inside the GTM container are not governed by Consent Mode from this repo, `@vercel/analytics` is left on as cookieless essential measurement, GA cookies already set are not deleted when analytics consent is withdrawn, and the affiliate-manager 'essential' classification needs legal sign-off. Banner/privacy wording is not legal advice and the Spanish copy is unreviewed by a native speaker. No axe/Lighthouse run.
- Earlier stats in section 1 ('no consent banner') are superseded by section 5a.
- `demo_click` cannot prove a demo visit.
- Old homepage section components (`leaks`, `pivot`, `more-leads`, `enter-caros`, `money-journey`, `human-answering`, `retention`, `lifecycle`, `view-360`, `process`, `industries`, `integrations`, `revenue-first`, `pricing-preview`, `attribution`) and the `HomePage.*` message keys are now unused on the homepage but left in place for rollback; `Industries` strip is no longer on the home page (the industries link remains in the product-experience section and nav).
- The old homepage "illustrative dashboard" marquee stats and ASCII globe were removed from the hero.
- Spanish uses informal "tú" to match the existing Spanish catalogs. Needs a native-speaker pass.
- No accessibility tooling (axe/Lighthouse) was run; only structural care (labels, aria-live, native controls, reduced motion). Performance not measured; new client JS is limited to the two calculators, card tracking and the scroll listener.
- Live forms were not submitted; the audit API was not called.
