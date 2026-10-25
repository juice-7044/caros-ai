# CAROS audience positioning

## Approved language

Core sentence:

> CAROS is built for businesses and organizations where timely communication, consistent follow-up, and strong relationships drive growth.

Short audience description: **relationship-driven businesses and organizations**.

Short headline: **Built around the relationships that drive growth.**

Spanish core sentence:

> CAROS está diseñado para empresas y organizaciones donde la comunicación oportuna, el seguimiento constante y las relaciones sólidas impulsan el crecimiento.

## Scope and boundaries

- Use this positioning for the overall product, general landing pages, resources, affiliate messaging, and default SEO/share descriptions.
- Do not describe CAROS as designed only for home services, local trades, or commercial service businesses. Organizations include nonprofits and religious/community institutions.
- Keep dedicated industry pages specific. Home services, roofing, HVAC, legal, healthcare and other verticals remain valid audiences and examples.
- Do not imply that every organization fits or qualifies for a standard price. Preserve specialized pricing and the nonprofit consultation flow.
- Adapt general examples to inquiries, follow-up, engagements, bookings, relationships, or measurable outcomes. Avoid mechanically replacing every instance of "job" in trade-specific content.
- The $12,000 engagement example is illustrative, not an average or a guaranteed recovery.

## Implementation

- English and Spanish copy lives in `messages/en.json` and `messages/es.json`.
- Overall metadata uses `Metadata.description`; industries and diagnostic descriptions have their own localized keys.
- `lib/positioning-metadata.ts` preserves social-card branding/images when descriptions change. Build input metadata explicitly; Next's resolved parent metadata types are not interchangeable with input metadata types.
- Updated components read the translated copy rather than duplicating English strings on Spanish routes.
- This pass does not claim to translate every pre-existing paragraph of the website. Existing unrelated English content on Spanish routes is a separate localization task.

## Verification

Run `node --experimental-strip-types --test tests/caros-*.test.mjs`, `npm exec -- tsc --noEmit`, and `npm run build`.

Check rendered general pages in both locales, including metadata and share images; preserve dedicated industry content, prices, consent, integrations and widget behavior. A source search alone is not enough: inherited descriptions can remain stale on many routes even when visible page copy is correct.
