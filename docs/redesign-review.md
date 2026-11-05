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

## 2. Capability evidence (from `/Users/anns-macbook/Projects/ask-caros`, read-only)

Code evidence, not proof of production flag state (many features sit behind env flags, e.g. `CAROS_SOCIAL=zernio`).

| Area | Status | Evidence (ask-caros) | Copy used |
|---|---|---|---|
| Marketing & social | LIVE (pilot-gated) | `lib/server/social.ts`, `zernio.ts`, `lib/caros/ai-drafts.ts`, `/workspace/social`, `/approvals` | draft/approve/schedule to connected accounts |
| Sales | LIVE | `app/workspace/pipeline/page.tsx`, `lib/server/speed-to-lead.ts`, contacts | pipeline stages, open value, slow-response flags |
| Outreach | LIVE | `texts.ts`/`twilio.ts`, `mail.ts` (Resend/Postmark), `calling.ts`, `retell.ts`, `/workspace/communicate`, `widget.ts` | phone/email/SMS inbox + web chat/voice, "depends on what you connect" |
| Reactivation | PARTIAL | `app/workspace/retain/page.tsx` "Win back" is a read-only list (`winBack` in `lib/caros/workspace.ts`); no outbound campaign launcher found; "Launch reactivation / $18,750 recovered" appear only in simulated demo images | "see lost opportunities, follow up personally. Automated reengagement campaigns are not yet available" + "Expanding" tag |
| Workflows & automation | PARTIAL | `app/workspace/automate/page.tsx` is "Read only here"; only write is `workflow.enroll_contact`; workflows built at setup; Inngest jobs | "set up with you during implementation... building new workflows in the dashboard is not yet available" |
| Customer service/success | PARTIAL | `/workspace/help`, call notes, meeting follow-ups, contact 360; no ticketing | "one record per customer... dedicated ticketing is not included" |
| Reputation | PARTIAL | Google + Facebook: monitor, post replies, review requests LIVE (`lib/server/reviews.ts`, `google-reviews.ts`, `review-requests.ts`). **Yelp: NOT FOUND. Website reviews: NOT FOUND.** Reply *drafting*: not found | "monitor and reply to Google and Facebook reviews, send review requests. Yelp and website review monitoring are not yet available" |
| Community | LIVE | `lib/server/community.ts`, `app/c/`, `courses.ts`, `webinars.ts`, `community-memberships.ts` | communities, courses, webinars, paid memberships |
| More | LIVE | Retell AI receptionist, `/workspace/intelligence`, `daily-brief.ts`, Stripe invoices, DocuSeal e-sign | listed as such |

The brief's reputation line ("Google, Yelp, Facebook, and website reviews") and reactivation/automation lines were therefore deliberately narrowed. A test (`caros-home-content.test.mjs`) fails if Yelp is mentioned outside the "not yet available" qualifier.

**Flags for the owner:**
- "One dashboard": `/workspace` (Command Center) is an overview (pipeline value, appointments, Ask CAROS). Reviews, social, community and inbox are separate sections of the same workspace/login, not widgets on that screen. Copy says "one dashboard / one login" per the brief; confirm that is acceptable.
- **Privacy statement** is used verbatim per the brief. The ask-caros code and docs support per-account isolation (`tenant_id` RLS, `app/docs/page.tsx`) but contain **no explicit statement** that data is not sold or not used to train across customers. Needs legal/vendor-terms confirmation before publishing.
- Marketing ads: Meta ad launch exists, Google Ads launch not found; ads are not claimed.

## 3. Screenshot status

**Missing.** `public/caros-command-center.png` does not exist. The only dashboard images in ask-caros (`design/demo/*.png`) are a fictional "Comfort First HVAC" simulation containing features the real app lacks, so they were not used. `ProductShowcase` (server component) renders the real image only if that exact file exists and is a valid PNG (dimensions read from the header, lazy, alt text); otherwise an honest "See the real dashboard in the live demo" panel with the demo CTA. No broken image; verified by the browser check. Drop the real file in `public/` to activate it. **Hotspot animations were not built**: positions would have to be invented without seeing the real image; `showcase_interaction` currently covers card expand/collapse and the demo CTA.

## 4. Formulas and assumptions (`lib/home-calculators.ts`)

- Hiring: `annual = employees x salary`. Defaults 5 x $50,000 = $250,000; 10 = $500,000. Always labelled "Illustrative only. Excludes benefits, payroll taxes, recruiting, onboarding, and other employment expenses."
- Stack: `annualSoftware = subscriptions x avgMonthly x 12`; `annualTime = employees x weeklyHoursPerEmployee x 52 x hourlyCost`; `combined = both`; breakdown shares = each / combined. Hours are labelled **per employee**, and employees multiply **once**. The platform/login count is context only (field says so; test proves changing it does not change the result). Time is labelled "an estimate, not audited savings"; the result states it is not a savings or ROI figure and that some spend may not be addressable.
- Defensive: input kept as strings; empty/NaN/Infinity/negative -> 0; whole numbers for counts; caps: employees 1,000, salary $1,000,000, subscriptions 500, monthly $100,000, hours/week 168, hourly $1,000, so totals never overflow. No guaranteed savings or ROI anywhere.

## 5. Analytics (`lib/analytics.ts`, `lib/analytics-client.ts`)

All events go to the existing GTM `window.dataLayer` as `caros_<name>`. There is **no consent banner/CMP on the site** (GTM, GA and Meta Pixel load unconditionally); the only consent-aware rule available is the browser's: nothing is sent when `navigator.doNotTrack === '1'` or `navigator.globalPrivacyControl === true` (browser-verified). Payloads are allowlisted (`cta, location, field, action, section, depth, expanded, item, locale, kind`); strings cut to 64 chars; names, emails, phone numbers, salaries, counts and totals can't pass (tested). Existing thank-you purchase tracking is untouched.

| Event | Fires when |
|---|---|
| `caros_home_engagement` | first pointer/key/scroll on the homepage, once per visit |
| `caros_scroll_depth` {depth 25/50/75/100} | each milestone once |
| `caros_hero_cta_click` {cta, location} | click on hero primary/secondary CTA |
| `caros_employee_calc_interaction` {field} | first edit of each field (or preset) per page view; field name only |
| `caros_stack_calc_interaction` {field} | same, stack calculator |
| `caros_showcase_interaction` {action: expand/collapse/demo_cta, item} | capability card toggled / showcase CTA clicked |
| `caros_demo_click` {location} | click on a link to demo.getcaros.com. **Click only; arrival/visit on the demo is not observed** |
| `caros_audit_start` | first focus inside the revenue-audit form, once |
| `caros_audit_complete` | after the API returns OK, before the booking redirect. No form data |

The audit form payload, validation, consent and `/api/revenue-audit` are unchanged.

## 6. Verification

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
- No real product screenshot; hotspots not built (section 3).
- Capability copy is narrowed where the app does not (yet) support the brief (reactivation campaigns, workflow builder, ticketing, Yelp/website reviews). Product owner should confirm or build before widening.
- Privacy statement unverified in code (section 2).
- "Approximately 50% reduction" achieved on the homepage only. The rest of the site (~53k visible words in EN) was reviewed for positioning but not condensed; that needs page-by-page editorial work.
- No CMP exists; consent awareness is limited to DNT/GPC. Adding a banner is a separate decision.
- `demo_click` cannot prove a demo visit.
- Old homepage section components (`leaks`, `pivot`, `more-leads`, `enter-caros`, `money-journey`, `human-answering`, `retention`, `lifecycle`, `view-360`, `process`, `industries`, `integrations`, `revenue-first`, `pricing-preview`, `attribution`) and the `HomePage.*` message keys are now unused on the homepage but left in place for rollback; `Industries` strip is no longer on the home page (the industries link remains in the product-experience section and nav).
- The old homepage "illustrative dashboard" marquee stats and ASCII globe were removed from the hero.
- Spanish uses informal "tú" to match the existing Spanish catalogs. Needs a native-speaker pass.
- No accessibility tooling (axe/Lighthouse) was run; only structural care (labels, aria-live, native controls, reduced motion). Performance not measured; new client JS is limited to the two calculators, card tracking and the scroll listener.
- Live forms were not submitted; the audit API was not called.
