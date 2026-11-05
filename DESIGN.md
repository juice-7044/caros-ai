# CAROS design notes (redesign: unified Revenue Operating System)

**Direction:** an operator's workspace, written like an editorial. Calm, airy, precise. Gold marks the one thing to look at.

## Tokens (existing; do not change)
- Light surface `--background` #fff, text/ink `--ink` #0a0a0a, dark bands `bg-ink` with `text-ink-foreground`/`text-ink-muted`, borders `ink-border`.
- Accent `--gold` #c9a227 (`text-gold`, `bg-gold`, `text-gold-gradient` for one accent phrase per headline).
- Type: `font-display` (Archivo 800) for headlines, `font-serif` italic (Instrument Serif) for the accent phrase, `font-mono` uppercase eyebrows, Archivo body.
- Icons: lucide-react only, 1.5–2px stroke, recognizable (Megaphone, Handshake, MessageSquare, RotateCcw, Workflow, LifeBuoy, Star, Users, Plus).

## Layout rules
- One idea per section: eyebrow, one headline, at most two short sentences, one visual, one CTA. Section padding `py-20 lg:py-28`.
- Alternate light and `bg-ink` bands to pace the page. Generous whitespace; no decorative blobs, no stock gradients beyond the existing `radial-glow`.
- Details live behind native `<details>` / accordions, never in long paragraphs.
- Diagrams are SVG/CSS built from real labels (functions, lifecycle stages). They are explicitly *diagrams*, not product screens.

## Homepage composition and container
- **Container:** every homepage section (hero, story band, screenshot, software comparison, calculators, capabilities, challenges, lifecycle, product experience, ROI, final CTA) uses the shared `.home-container` in `app/globals.css`: `max-width: min(94vw, 2560px)`, fluid gutters `clamp(1.25rem, 2.4vw, 3rem)`. Content uses ~88–92% of the viewport at 1920/2560 and is capped at 2560px on ultrawide. Do not add per-section `max-w-[1200px]`/`max-w-6xl` outer strips.
- Prose keeps its own line-length bound (`max-w-[60ch]`-ish); fill width with grids and composition, not by stretching paragraphs.
- **Hero:** a real entrance. Eyebrow (`HomePage.hero.eyebrow`), large black display H1 with the gold italic second phrase, the growth sentence and the CAROS definition, over the original ASCII globe (`AnimatedGlobe`, right side, `aria-hidden`, pointer-events none) and faint grid. The globe lives only in the hero: pale and cropped on mobile, a full sphere from `lg`. It pauses offscreen/hidden tabs and draws one static frame under `prefers-reduced-motion`.
- **Story band:** the traditional-hiring transition, cost question, calculator, roles/functions, convergence, CAROS reveal and both CTAs sit in one contiguous band directly under the hero (outside the orb section), followed by the real screenshot and software costs.

## Honesty rules
- Never render invented product UI, metrics, testimonials or customer names. Calculators show the visitor's own inputs.
- Calculator output is illustrative: no guaranteed savings or ROI; exclusions are stated next to the number.
- Product screenshot only from `/public/caros-command-center.png`, and only if the file exists; otherwise an honest "screenshot unavailable" panel with the demo CTA.
- Capability copy is limited to what `docs/redesign-review.md` lists as confirmed; integrations are qualified ("supported", "where connected").

## Motion
- Subtle reveal only (existing `Reveal`). The lifecycle animation and any hotspot pulse must stop under `prefers-reduced-motion` and still read as a static diagram.

## Interaction and accessibility
- Inputs are native `<input type=number>` with visible labels, 44px+ targets, `aria-live="polite"` results.
- CTAs: primary gold pill "See CAROS in Action" -> https://demo.getcaros.com; secondary outline pill -> in-page anchor.
- Spanish (es-419) is a first-class locale: every new string exists in `messages/en.json` and `messages/es.json`; numbers use the locale formatter, currency stays USD.

## Analytics
- Events are pushed to `window.dataLayer` through `lib/analytics.ts` only. Names are stable English identifiers. Payloads never carry personal information or entered financial values (only bucketed/boolean metadata). Nothing is sent when Do Not Track or Global Privacy Control is on.
