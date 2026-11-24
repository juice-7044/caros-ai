# Startups & Founders implementation review

## Outcome and scope

Local review only, based on `origin/main` at `2f2d88bc266c2f94d8fa11e9b113711ed4bc4ea8`, branch `feat/startups-founders`. No push, PR, merge, or deployment performed.

- Added dedicated `/en/industries/startups` and `/es/industries/startups` routes. Static route takes precedence over `[trade]`; startup content is intentionally not in `INDUSTRY_SLUGS` or the trade calculator.
- Preserved the requested English hero, supporting paragraph, stage card headlines/taglines, section headings, reporting questions, FAQ questions, and scenario closing. Spanish uses the existing informal register and catalogs.
- Three stage cards, six problem/capability pairs, six illustrative journey stages, three explicitly hypothetical scenarios, five reporting questions, five FAQs, and five audience labels in each language.
- Shared `INDUSTRY_NAV` supplies desktop/mobile navigation and directory exactly once. New startup nav targets have a 44px minimum height without changing other menu items.
- Added startup label to `INDUSTRIES`, localized its exact-source mappings, and mounted the existing homepage `Industries` audience strip, previously unused by the current homepage. Homepage orb, container widths, story/calculator sequence, and forms are unchanged.
- Broadened directory introduction, description, fit closing, and CTA to explicitly include early-stage startups and established businesses.
- Primary destination: existing `DEMO_URL`, `https://demo.getcaros.com`. Secondary: existing `AUDIT_HREF`, rendered as `/{locale}/revenue-audit`. No commercial offers, numbers, startup discounts, or security promises added.
- Metadata includes locale self-canonical, en/es/x-default, matching social titles/descriptions, page-specific OG URL, inherited CAROS brand images and social locale. Twitter does not define a URL property in the metadata standard. FAQ, BreadcrumbList, and Service JSON-LD match visible content and contain no numeric offers.

## Capability evidence and boundaries

Product repository inspected read-only using `git fetch origin`, `git show origin/main:<path>`, and `git grep ... origin/main`. Product revision: `ac52b5303586416e0aab0ec4d7ec1f800916ed15`. Its dirty/untracked workspace was not changed, switched, built, or tested. No live flags, account data, customer actions, or credentials were inspected.

Approved marketing evidence: `docs/redesign-review.md`, capability table lines 25–37, and current `messages/en.json` Home capabilities. Ann's prior confirmation covers workflow builder, email/SMS reactivation, ticketing/customer support. Owner-approved capabilities are not silently removed because one source slice lacks their implementation.

| Startup capability | Implementation evidence | Limits reflected in copy |
| --- | --- | --- |
| Inquiry capture | `app/api/forms/[key]/route.ts` POST calls `publicSiteFormSubmit`; `lib/server/site-forms.ts` wires native contact matching, tags, notes, consent, and optional enrollment to `site-forms-flow` | Requires `CAROS_SITE_FORMS=on`, DB migrations, form setup, native automation account, and enabled enrollment configuration. No promise every inbound message triggers the same response. |
| Contacts, notes and pipeline | `lib/server/native-crm-store.ts` persists contacts/notes/tasks; `lib/server/native-crm-deals.ts` implements create, move, status/value updates and pipeline edits; `lib/server/crm-reader.ts` selects native implementations | Account configuration and membership apply. `native-crm-opportunities.ts` alone is a read-only slice and was not treated as proof of write capability. |
| Next actions and ownership | `native-crm-store.ts:addTask` writes title, due date and optional `assignee_id`; native deals expose stored `owner_id` | Task assignment and ownership are setup/process choices, not a promise that automated tasks always choose an assignee. Current task read slice returns `assigneeId:null`; native deal update does not expose owner assignment. Startup copy promises context and ownership visibility, not a new owner-assignment editor. |
| Discovery scheduling | `lib/server/native-calendar.ts:createCalcomCalendar` reads connected calendars/slots and implements real Cal.com booking/change requests; selected in `crm-reader.ts` | Requires active Cal.com connections, event types, usable tokens, contact email, and provider availability. No invented calendar integration. No bookings made in this review. |
| Approved/configured follow-up | `lib/caros/workflow-engine.ts` supports tags, stage events, tasks, waits, email and SMS; `lib/server/workflow-runner.ts:runOne` executes effects, validates generated words, checks consent and suppresses duplicates; `lib/server/workflows-wire.ts` wires mail, tasks, trigger matching and activation | Native account and automation configuration required. Standard customer-facing workflows default off until enabled. Writer, sender, scheduler, permissions and consent must be available. SMS has explicit account/A2P/contact-consent gates, currently narrower than email. No claim that selecting contacts is a special security or approval-enforcement feature. |
| Customer-win onboarding | Same configured stage/tag triggers and task/message steps; `crm-reader.ts` calls workflow triggers for saved changes. `lib/caros/workflows/contract-onboarding.ts` is a CAROS-only launch example, not a universal startup onboarding template | Hypothetical scenario explicitly requires configured handoff trigger/workflow. No claim all startup sales automatically launch identical onboarding. Owner-confirmed workflow builder supports tailored setup; no startup-specific default is claimed. |
| Retention and support | Workflow tasks, waits, email/SMS and contact history above; ticketing and customer support explicitly confirmed by Ann in `docs/redesign-review.md:36` | Ticketing is owner-approved evidence, not inferred from `call-tickets.ts` (that file is browser dialing tickets, not service tickets). Follow-ups use enabled workflows and appropriate channels. |
| Reporting | `app/api/caros/reports/route.ts` gates reports with `CAROS_REPORTS=on`; `lib/server/reports.ts` implements calls, agents, appointments and source attribution over stored records. Native pipeline provides opportunity stage/status/value context | Current attribution table counts contact sources and intake leads, not comprehensive paid-customer revenue attribution or multi-touch ROI. Founder reporting is phrased as questions, with explicit available-data/connected-system qualification. No claim of universal attribution accuracy or guaranteed revenue. |

Stealth is an audience context only. No confidentiality, NDA enforcement, security certification or special privacy feature is promised. Bootstrapped and Funded are labels only. Pricing language is limited to the requested flat monthly fee wording.

## Verification and reproduction

From `/Users/anns-macbook/Projects/caros-ai`:

```sh
node --test tests/startups.test.mjs
node --test tests/*.test.mjs
npx tsc --noEmit
node scripts/validate-locales.mjs
npm run build
npm run start -- --port 3101
# In another terminal, with installed Google Chrome:
PLAYWRIGHT_MODULE=/Users/anns-macbook/.npm/_npx/e41f203b7505f1fb/node_modules/playwright BASE_URL=http://localhost:3101 node scripts/verify-startups.mjs
```

Actual results:

- New scoped tests: 4/4 pass. Dedicated-route test initially failed because route was absent; locale/content/home tests then failed because startup catalogs and homepage inclusion were absent. Nav target test failed before the 44px startup link change. Browser hit-testing caught primary and secondary CTA collisions with the existing floating widget; compacted only this route's mobile hero typography/spacing, then both tests passed without changing widget behavior.
- Full unit suite: **98 tests, 98 passed, 0 failed, 0 skipped**.
- Standalone TypeScript: exit 0. Required separately because Next build explicitly skips type validation.
- Locale validator: `es: PASS`, schemas match, **0 suspicious long English duplicates**.
- Production build: exit 0; startup static route listed. Existing warnings: baseline-browser-mapping data age and deprecated middleware convention. Node unit runner also emits the existing MODULE_TYPELESS_PACKAGE_JSON warning. Dependency manifests unchanged.
- Browser: **8 rendered configurations**, EN/ES at **360, 390, 768, 1440**, height 900. No document horizontal overflow or broken images. Exact section counts and all FAQs opening verified. Hero CTA targets at least 44px, keyboard focus outline verified with actual Tab/Shift+Tab. New startup desktop/mobile nav links at least 44px; actual clicks navigate successfully.
- Desktop dropdown/mobile menu: EN/ES each tested at 1440/390. Language switching tested both directions, retaining `/industries/startups` in both menu modes. Each localized directory links once to startup route, and actual link clicks were exercised. Homepage audience text exists in both rendered locales.
- Metadata at each viewport: matching title, description, canonical, three hreflang alternates, OG URL/locale, OG/Twitter titles/descriptions/images. FAQ JSON-LD compared with rendered questions/answers, Service URL checked.
- Sitemap: **98 URL entries, 98 unique**, each startup locale URL exactly once. **98/98 routes requested**, all HTTP 200, zero MISSING_MESSAGE/INVALID_MESSAGE markers, all self-canonicals correct, no repeated CAROS title suffix. This route crawl is not a claim of a full native-speaker translation audit of untouched content.
- Cookie banner rendered normally; rejected nonessential cookies in an isolated browser session to inspect the page and operate the menus. Initial banner screenshot retained in scratch. Chat launcher stayed present and untouched; no conversations or form submissions made. Existing widgets can overlay scrolled body content; no claim of a globally redesigned widget layout.
- `git diff --check`: pass. Tracked diff does not modify APIs, audit forms, consent, CSP, prices, legal pages, chat/voice widget, dependency manifests, or homepage orb.

The old positioning test asserted the previous exact Industries subtitle. Its two locale expectations were deliberately updated for the user-authorized startup-inclusive introduction. Diagnostic counts, fit-card counts, pricing, consent, trade-page and all unrelated assertions are retained.

## Screenshots and saved results

Repository evidence (absolute root `/Users/anns-macbook/Projects/caros-ai`):

- `docs/screenshots/startups-en-360-full.png`
- `docs/screenshots/startups-en-390-full.png`
- `docs/screenshots/startups-en-768-full.png`
- `docs/screenshots/startups-en-1440-full.png`
- `docs/screenshots/startups-es-360-full.png`
- `docs/screenshots/startups-es-390-full.png`
- `docs/screenshots/startups-es-768-full.png`
- `docs/screenshots/startups-es-1440-full.png`
- `docs/audit/startups/rendered.json`: per-configuration metadata/layout evidence.
- `docs/audit/startups/interactions.json`: four navigation/language-switch combinations and sitemap counts.
- `docs/audit/startups/route-crawl.json`: per-route HTTP status, canonical, title, missing-message marker check.

Scratch: `/Users/anns-macbook/.hermes/profiles/wiki-skill/cache/scratch/startups-evidence/`, including initial consent and navigation-arrival screenshots. Execution logs: `startups-tests.log`, `startups-build.log`, `startups-browser.log` in the same scratch parent. Eight pre-existing untracked `docs/screenshots/home-*-full.png` were preserved and excluded from the commit.

## Visual critic assessment

Subjective review against actual desktop/mobile screenshots, including cropped readable hero views and full-page composition. Shared directory/homepage retain their existing visual system; no numerical business proof is implied by these review scores.

| Category | Startup page | Directory change | Homepage audience inclusion | Observed basis |
| --- | --- | --- | --- | --- |
| Product clarity | 9 | 9 | 9 | Founder-specific entrance, stage labels and next steps; broader audience text is explicit. |
| Visual trust | 9 | 9 | 9 | Existing Archivo/Instrument Serif, gold accent, light/dark editorial bands and native cards. |
| Evidence integrity | 9 | 9 | 9 | No fabricated dashboard, testimonial, logo or metric; hypotheticals labeled. |
| Responsive polish | 8 | 8 | 8 | Eight startup sizes checked; compact mobile hero avoids CTA collision. Shared fixed widget remains unchanged. |
| Accessibility | 8 | 8 | 8 | Readable body, native details, keyboard focus and 44px new targets; existing shared small controls not redesigned. |
| Claim alignment | 8 | 9 | 9 | Setup dependencies and source-attribution limits stated; owner-approved support capabilities distinguished from code evidence. |
| Conversion path | 9 | 9 | 9 | Existing demo and localized business review, no invented offer. |
| Uniqueness | 8 | 8 | 8 | CAROS black/gold editorial treatment, startup lifecycle rather than a trade calculator. |

## Changed source files

`app/[locale]/industries/startups/page.tsx`, `app/[locale]/page.tsx`, `app/sitemap.ts`, `components/caros/site-nav.tsx`, `lib/industries.ts`, `lib/site.ts`, `messages/en.json`, `messages/es.json`, `messages/full/shared.es.json`, `messages/full/industry-ui.es.json`, `messages/full/home-general.es.json`, `tests/startups.test.mjs`, `tests/caros-positioning.test.mjs`, `scripts/verify-startups.mjs`, plus this review and the evidence files listed above.

## Remaining review boundary

No implementation/test blockers remain. Parent independent review and explicit publication approval are still required. Native Spanish editorial review is recommended, not represented as completed. Code inspection is not proof of live account flags, sender/Cal.com connectivity, or enabled tenant workflows. No product environment was changed to make these hypothetical examples live.
