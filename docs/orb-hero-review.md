# Orb hero + wide homepage review

Branch `fix/restore-orb-wide-hero` (from origin/main `02dbec8`). Local only; not pushed or deployed.

## What changed
- **`components/caros/home/hero.tsx`** – real entrance hero again: localized eyebrow (`HomePage.hero.eyebrow`, EN + ES already existed), large display H1 (`Home.hero.title` + gold italic `subtitle`), growth sentence, CAROS definition, original `AnimatedGlobe` on the right (`data-hero-orb`, `aria-hidden`, `pointer-events-none`) and the original faint grid (`data-hero-grid`). The calculator is no longer nested inside it. New `StoryTransition` export holds the traditional-hiring paragraph.
- **`app/[locale]/page.tsx`** – `<div data-story="root">` wraps `Hero` + a contiguous `data-story="band"` section (`StoryTransition` + `HiringStory`), then showcase, software cost, etc. in the original order.
- **`components/caros/home/hiring-story.tsx`** – from `xl` the cost question and calculator sit side by side; the CAROS reveal is two columns (title/tagline left, copy + both CTAs right). Copy, state, selectors and CTAs unchanged.
- **`components/caros/animated-globe.tsx`** – original drawing code, chars and gold/ink colours untouched. Added: first frame drawn on the first animation frame, loop only while on screen and tab visible (IntersectionObserver + visibilitychange), single static frame under `prefers-reduced-motion`, `data-frame` counter for checks. Resize handling as before.
- **Container token** – `.home-container` in `app/globals.css`: `max-width: min(94vw, 2560px)`, gutters `clamp(1.25rem, 2.4vw, 3rem)`, full width below 1100px. Replaced every `max-w-[1200px]`/`max-w-6xl`/`max-w-[1300px]` outer strip in the homepage sections, `CtaBand`, the screenshot wrapper and trust strip. Nav widens only from `xl` (`xl:max-w-[min(92vw,1800px)]` scrolled, `min(94vw,2560px)` top). Documented in `DESIGN.md` (composition and container section).
- Copy: no message-file changes.

## Source restoration evidence
`git show 531ea53:components/caros/home/hero.tsx` uses `<AnimatedGlobe />` in a `right-0 top-1/2` 600/820px box at opacity 40 plus 8 horizontal / 12 vertical grid lines at opacity 30. The same component and grid markup were reused (no regenerated art). Deliberate differences: orb is 420–560px, opacity 40 and cropped to the right edge on mobile; from `lg` it is `min(48vw, 860px)` at opacity 70 (the original 40 looked very pale in screenshots).

## Tests
- Unit, red first: `docs/tdd-logs/orb-01-red.txt` (4 failing of 6) -> green `orb-02-green-unit.txt` (full suite 82/82; includes new `tests/caros-orb-hero.test.mjs`).
- Browser: new `scripts/verify-orb-hero.mjs` (EN/ES at 360, 390, 768, 1440, 1920, 2560 + reduced motion + first-visit consent). `orb-03-browser-red-story.txt` records the 9 failures the existing story script showed against the first build; they were layout assumptions and one real bug (a `nowrap` CTA overflowing at 360 in ES). Updated in `scripts/verify-hiring-story.mjs`: calculator may start level with the cost question from 1280px, realistic 1080px viewport height from 1920px, convergence-line spread measured against max 1440px (the visual is capped at `max-w-3xl`).
- `tsc --noEmit` clean, `validate-locales` clean, `npm run build` ok, production server on port 3101.

## Measured content widths (px, inside gutters)
See `docs/screenshots/orb-checks.json` (`widths`); asserted: 1920 and 2560 content is 86–94% of viewport, 1440–1919 is >= 1250px, <= 768 keeps 30–100px total gutters. Prose is bounded (<= 760px).

## Observed issues / limitations
- The existing consent check "banner causes no layout shift (CLS < 0.01)" at 360/390px is flaky: the fixed chat launcher jumps above the banner when the banner opens. Pre-existing: origin/main built and measured 4 of 12 loads >= 0.01, same as this branch. Not fixed here.
- The orb is the original sparse ASCII sphere; at large sizes the particle density is low and mid-rotation frames look like vertical streaks. That is the original look, kept.
- On phones the orb sits faintly behind the text; legible but a little noisy behind the CAROS statement.
- `/tmp` screenshots (not committed) hold the full set; committed screenshots are a small selection in `docs/screenshots/orb-*`.

## Final results (production build, localhost:3101)
- Unit suite 82/82, `tsc --noEmit` clean, locale validation clean, `npm run build` ok.
- `verify-orb-hero.mjs`: 230/230 (EN+ES, 360/390/768/1440/1920/2560, reduced motion, first-visit consent).
- `verify-hiring-story.mjs`: 300/300 at the same six widths.
- `verify-consent.mjs`: 51/52; the failure is the pre-existing 360px CLS race above.
- Measured content widths: 360 -> 320, 390 -> 350, 768 -> 728, 1440 -> 1284, 1920 -> 1713 (89%), 2560 -> 2310 (90%). Not measured at 3840 (cap is 2560px container).
