# Growth-first homepage correction

## Owner-requested narrative

Growth → increased demands → staffing costs → CAROS value → software fragmentation → unified solution. Built from live main `ba09e7b`; the rejected Vercel/v0 draft is not used.

- H1: “Your Business Is Growing. Your Operations Should Grow With It.”
- Short conversational growth introduction and compact CAROS value statement above the fold.
- Traditional staffing transition names marketing, sales, communications, operations and customer success.
- Hiring question is now a smaller continuation heading directly above the existing interactive calculator, not the opening.
- Five roles / ten functions share the existing calculator state. Disclaimers and custom-headcount behavior are preserved.
- CAROS reveal asks about scaling work without proportional headcount; shortened supporting copy avoids a repeated long category list.
- Both CTAs, real screenshot, convergence animation, reduced-motion path and all lower-page functionality remain.
- Software section opens with a conversational bridge instead of an abrupt oversized heading. Comparison and stack calculator are unchanged.
- Every changed display string localized into Spanish, retaining informal tú.

## Scope / unchanged contracts

No edits to APIs, lead forms, chat/voice logic, consent/analytics runtime, CSP, pricing, legal pages, capability availability, calculators' arithmetic or dashboard image. Existing contact remains available. Only homepage presentation/catalogs and corresponding tests change.

## Verification

- Deliberate test expectation change: growth H1 replaces cost-question H1; full CAROS reveal title and software bridge follow latest owner brief.
- Unit RED: prior copy fails expected growth headline. GREEN: all 76 automated tests pass.
- Browser RED against prior production build: growth/product-value/demands/cost-question blocks absent.
- Updated real-browser story checks: 204/204 pass, EN/ES × 360/390/768/1440. Checks now enforce growth → product teaser → traditional demands → cost question → calculator → responsibilities → CAROS reveal → CTA → screenshot → software, and above-fold CAROS value, not an above-fold calculator. Shared state, expandable functions, contact/consent layout, convergence and reduced motion regressions included.
- Standalone TypeScript check clean; locale schemas match; production build succeeds.
- Manual mobile English / Spanish and desktop review before publication.

Native-speaker polish remains a follow-up, not a release gate per owner. No new product functionality or savings guarantee is introduced.
