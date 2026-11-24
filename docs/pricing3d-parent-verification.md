# Pricing studio parent verification (preview only)

Production baseline: main `8520579b96cff696ad87463e99b717c7c8655586`, deployment `dpl_GdPFQvMPmnJWqxsfhMuXyr3VQrgQ`. Do not merge/promote without Ann's review approval.

## Independent checks after integration

- Full suite: **106 passed, 0 failed**; standalone TypeScript and locale validation passed.
- Final production build, with exact preview-branch review mode enabled: passed.
- Final full browser harness: **16 cases passed**. Twelve EN/ES × 360/390/768/1440/1920/2560 responsive cases, two no-JavaScript cases with all commercial amounts available, one unavailable-WebGL fallback, one actual-WebGL controls case. These are scenarios, not a count of every assertion.
- Deep real WebGL check: all **9 sculptures** rendered with distinct screenshot hashes while the Core price stayed fixed. Actual localized raycast brush hit, visible solid-to-grains erosion and reassembly verified. Pause stopped frame progression. Forced context loss restored fallback without losing prices. Spanish touch opt-in/selection and `touch-action:pan-y` passed, without horizontal overflow.
- Reference demos were both run locally in Chrome with their pinned original Three library: no page errors; actual surface erosion and lit instruments visually inspected. Licensing: Meng To MIT plus Three MIT notices retained; Saltmere Pro package/source/assets not copied.

## Parent improvements

A capability selector and live description sit directly beside the sculpture in addition to the detailed explorer below. This avoids requiring a visitor to scroll away from the object to choose a capability. Neither selector changes configuration pricing.

Added a branch-specific review quarantine active **only** for Vercel `preview` + git ref `feat/pricing-3d-preview`. It cannot activate on production:
- Shared chat/voice widget is not mounted in this review deployment.
- Form submit events, fetch mutations and sendBeacon are stopped in the preview browser.
- Middleware refuses non-read requests before API handlers; a no-op probe was used, never a real lead or message.
- Review banner and `X-Robots-Tag: noindex, nofollow` identify the preview.
- Demo and business-review links remain visible and preserve their intended paths. External destinations are separate live sites, not sandboxed replicas.

Test-first quarantine checks failed before its implementation and passed afterwards. Normal production mode remains the original behavior.

## Exact evidence and caveats

Evidence root: `/Users/anns-macbook/.hermes/profiles/wiki-skill/cache/scratch/`.
- `pricing3d-final-tests.txt`, `pricing3d-final-build.txt`, `pricing3d-final-browser.txt`
- `pricing3d-final/deep-checks.json`, nine sculpture PNGs, `brush.png`, `keyboard-dissolve.png`
- `pricing3d-evidence/` responsive screenshots and 16-case results.

The initial deep test used a fixed two-second reassembly wait and failed on software-rendered WebGL. It was corrected to wait for the actual settled exposure with a bounded timeout; the complete rerun passed. This was a timing-test correction, not evidence of a browser hardware FPS budget. Automated tests use software WebGL; touch is emulated, not a physical-device performance certification. Mobile/save-data/reduced-motion default to lightweight view and may explicitly enable 3D. A real-device visual/performance review is appropriate during Ann's preview review. No guaranteed savings or platform-specific compliance guarantee was introduced. No live lead, SMS, call, payment or CRM mutation was performed in verification.
