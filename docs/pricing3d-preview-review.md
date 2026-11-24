# CAROS-135 — pricing studio preview review

**Preview only. No commit, push, deployment, database, API/form submission or production change was performed.**
Baseline supplied by owner: main `8520579`, deployment `dpl_GdPFQvMPmnJWqxsfhMuXyr3VQrgQ`.

## Outcome

An original ink/champagne sculpture studio replaces the delayed-pricing hero. Core price,
implementation and demo CTA are server-rendered immediately; on mobile the price rail
precedes the artwork. Nine included-capability controls never change configuration price.
Core/Medical/Finance/Nonprofit selection is separate. The shared pricing card now reads
Core price labels from the same immutable source without changing its existing layout.

`lib/pricing.ts` preserves the original exact feature arrays and published amounts:
- Core: $2,500 one-time + $997/month.
- Medical: $7,499 one-time + $2,999/month.
- Finance up to 10: $5,997 implementation + **starting at** $3,997/month.
- Finance 11–25: $6,997 implementation + **starting at** $4,997/month.
- Finance 26+: Enterprise / Custom Quote.
- Nonprofits: consultation / no self-service pricing.

All previous long commercial qualifications, original Core/Medical/Finance feature lists,
nonprofit paragraphs, finance variability/final-price-confirmation/compliance notice and
original diagnostic/demo alternatives are retained verbatim in `pricing-terms.tsx` inside
server-rendered native details. Original source strings/arrays are captured in
`tests/fixtures/pricing-baseline.json`. The old source-location pricing regression was
updated to inspect SSOT and terms component, not weakened or removed. No new tier,
annual billing, promotion, discount, free plan or add-on calculation was introduced.

## Architecture and accessibility

Server route emits metadata, locale-specific canonical/hreflang/OG/Twitter and terms.
The client wrapper itself renders all initial HTML server-side. Only the renderer uses
`dynamic(..., {ssr:false})`, and it mounts after stage intersection and enablement.
Reduced motion, small-screen/low-power/saveData and WebGL failure default to actual
branded PNG plus lightweight linework; visitors may opt into 3D. Controls remain HTML,
including keyboard dissolve, pause, native select, aria-pressed capability buttons and
aria-live copy/prices. All nine descriptions also exist in native details for no-JS use.
Offscreen/document-hidden pause is passed to the renderer. No vertical scroll capture.

Dedicated EN/ES catalogs cover all new display and accessibility copy. Existing exact
Spanish commercial translations remain in use. Startup/service-business scope is explicit,
with a locale-preserving startups link. No unreleased ecosystem is exposed. Illustrative
HiringCalculator and StackCalculator are reused behind native accordions in an ivory band;
formulas are unchanged and no guaranteed savings/profit/subscription replacement is claimed.
Consent-aware analytics use categorical identifiers only, never entered financial values.

## References and dependencies

Reviewed both pinned MIT skill instructions, prompts, demo HTML and license notices at
MengTo/Skills `5b095a86efdf13f4d93b0bd640d3967f228012eb`; visually inspected both real demo
screenshots supplied by parent. Original composition/models, not Saltmere PRO source/assets.
`THIRD_PARTY_NOTICES.md` retains Meng To and demo Three MIT texts. Runtime dependencies
were already present. Added only `@types/three@0.183.1` as a dev dependency. pnpm 12 initially
re-resolved unrelated latest Expo packages; those incidental lock changes were removed,
original resolutions restored, and a successful frozen-lockfile installation verified the
result. Final lock diff is additions only (48 lines), package.json one added dev dependency.
Ignored build scripts during that frozen install; production build subsequently succeeded.

## Real verification

- New SSOT test observed RED (missing SSOT), then GREEN. Route/lazy-wrapper test observed
  RED before implementation. Logs: `docs/tdd-logs/pricing3d-{red,green}.txt`.
- Latest complete unit suite: **104/104 passing**, zero failures, including renderer and
  original calculators. `docs/tdd-logs/pricing3d-suite.txt`.
- Latest standalone `pnpm exec tsc --noEmit --pretty false`: exit 0.
- `node scripts/validate-locales.mjs`: PASS; no suspicious long English duplicates.
- Latest `pnpm build`: exit 0; all 113 static generation jobs completed. Existing config
  skips build-time TS, so the standalone check above was run separately.
- Initial production-mode browser run completed **16 cases**: 12 EN/ES × 360/390/768/1440/
  1920/2560, 2 no-JS, no-WebGL, and WebGL+pause+dissolve. Checked 9 keyboard capability
  choices without price change and all 6 configurations, locale metadata, no overflow,
  no broken images, no post-reject analytics, and visible first-viewport CTA.
- Real screenshot inspected: actual gold extruded CAROS sunburst wordmark renders in WebGL,
  not just an empty canvas. Mobile price and CTA were visible before artwork. Corrected
  route-scoped shared-nav contrast/top spacing after this visual review.
- Latest browser rerun after those corrections completed the **12 responsive locale cases**
  with no overflow/errors and CTA first-viewport y positions 631–727px on a 1000px viewport,
  then the outer 120-second timeout interrupted navigation into the no-JS pass. Therefore
  the original 16-case run is evidence for prior implementation, not a claim that the latest
  full harness completed. Re-run harness after handoff for final no-JS/WebGL acceptance.

Evidence is in `/Users/anns-macbook/.hermes/profiles/wiki-skill/cache/scratch/pricing3d-evidence/`;
hero/explorer screenshots for every viewport and `pricing-en-1440-webgl.png`, marketing and
dissolve images. `results.json` currently contains latest 12-case responsive run.

## Remaining review / handoff

- Production server is available locally on port 3105; parent owns final preview publishing.
- Harness blocks non-GET/HEAD requests and every off-origin request. Shared live chat/voice
  runtime was intentionally not changed; parent must add/enforce branch-only review-mode
  protection before exposing a public preview. Do not submit forms or invoke voice sessions.
- WebGL pause/dissolve controls were exercised; full pixel-level validation of all nine
  sculpture transitions, touch brush gestures, offscreen frame cessation, context-loss
  recovery, payload allowlists under accepted consent and performance budgets remain for
  parent's final browser pass. Capability controls and copy are tested, not live integrations.
- Visual critic provisional: clarity 9, trust 8, evidence integrity 9, responsive 8,
  accessibility 8, claim alignment 9, conversion 9, uniqueness 8. Final screenshot review of
  nav correction and full live interaction is still recommended; this is not production approval.
- Dev webpack was blocked by existing production CSP unsafe-eval restriction; use the
  production build/server for verification rather than relaxing CSP.

```sh
pnpm exec tsc --noEmit --pretty false
node --experimental-strip-types --test tests/*.test.mjs
node scripts/validate-locales.mjs
# Stop port 3105 server before rebuilding.
pnpm build
pnpm exec next start --port 3105
BASE_URL=http://localhost:3105 node scripts/verify-pricing3d.mjs
```
