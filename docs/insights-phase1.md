# Phase 1 Insights staging handoff

This branch is a preview deliverable. Do not merge or deploy to production before Ann’s final approval on JMG-125.

## Publication and preview behavior

- Approved English manuscripts live in `content/insights/`; their original bytes and SEO metadata are preserved. `articles.json` controls presentation, asset mapping, visual approval and publication. The existing Next.js App Router renders these files with `react-markdown` and GFM tables; no CMS or new framework was added.
- All twelve `datePublished` fields are `null`. JMG-136 sets real dates after the launch date is approved. Use an ISO timestamp with an explicit timezone, for example `2026-11-03T09:00:00-05:00`.
- Only `VERCEL_ENV=preview` or local `NODE_ENV=development` without a production Vercel environment can reveal staged drafts. Query strings and cookies cannot enable preview. Preview metadata is noindex/nofollow.
- Production requires `staged=true`, `visualApproved=true`, and a valid publication timestamp at or before the current time. The index, article route, and sitemap use this gate. Unset, future, unapproved, or unstaged articles return 404 in production and stay out of its index and sitemap.
- Pages and sitemap render dynamically so the date gate changes without a redeploy. Unscheduled drafts omit `datePublished` from JSON-LD; dated articles include their actual configured timestamp.
- Nine articles are staged. HVAC’s three manuscripts and SEO fields are prepared but `staged=false`, with images withheld, because JMG-127 has no explicit visual approval. To finish HVAC after approval: confirm the final image package, copy its three blog images to the configured paths, update native dimensions, alt text and source hashes, then set `staged=true` and `visualApproved=true`. Keep the date unset until JMG-136.
- The existing unlocalized article paths redirect through next-intl to `/en/insights`. There is no Spanish article copy; Spanish Resources and footer links explicitly lead to English. `/es/insights` returns 404.

## Links and launch dependencies

The Resources Insights card now points to `/en/insights`. This link changes on the public site only when this PR merges. The external `free-revenue-insights.getcarosai.com` site and existing Free Business Insights tool link are untouched. A separate Insights link is added in the footer.

The four planned GHL landing pages remain in `lib/insights.ts`. CTAs include `utm_source=getcaros&utm_medium=blog&utm_campaign=phase1_<vertical>`; Real Estate uses `phase1_real_estate`. Existing global UTM forwarding skips the Insights section so internal article links remain clean and the explicit CTA attribution stays intact.

JMG-133 has not built these pages yet; JMG-135 must check all four before launch. Calculator URLs below come from the approved handoffs. The Real Estate handoff requires a manual browser functionality check for `https://speed-to-lead.getcaros.com/` and `https://c-v-retention.getcaros.com/`; form submissions and calculator outputs have not been certified by this implementation. Also check `https://revenue-leakage-calculator.getcaros.com/` and `https://free-revenue-audit.getcarosai.com/` during funnel QA. The historical HBR claim in the Real Estate copy remains a JMG-135 prepublication check.

## Article inventory

All dates pending. Image paths are relative to `public/`; HVAC paths are reserved and not yet exported.

| Slug | Vertical | Status | Image | CTA target |
|---|---|---|---|---|
| `roofing-lead-response-storm-season` | roofing | Staged draft | `insights/roofing-lead-response-storm-season.png` | `https://go.getcaros.com/storm-playbook` |
| `roofing-insurance-job-follow-up-system` | roofing | Staged draft | `insights/roofing-insurance-job-follow-up-system.png` | `https://go.getcaros.com/storm-playbook` |
| `roofing-customer-reactivation-repair-reroof` | roofing | Staged draft | `insights/roofing-customer-reactivation-repair-reroof.png` | `https://go.getcaros.com/storm-playbook` |
| `real-estate-speed-to-lead-five-minute-rule` | real-estate | Staged draft | `insights/real-estate-speed-to-lead-five-minute-rule.png` | `https://go.getcaros.com/speed-to-lead` |
| `real-estate-lead-nurture-eighteen-month-buyer` | real-estate | Staged draft | `insights/real-estate-lead-nurture-eighteen-month-buyer.png` | `https://go.getcaros.com/speed-to-lead` |
| `real-estate-past-client-follow-up` | real-estate | Staged draft | `insights/real-estate-past-client-follow-up.png` | `https://go.getcaros.com/speed-to-lead` |
| `hvac-peak-season-call-handling` | hvac | Withheld: visual approval pending | `insights/hvac-peak-season-call-handling.png` | `https://go.getcaros.com/hvac-agreements` |
| `hvac-maintenance-agreement-renewals` | hvac | Withheld: visual approval pending | `insights/hvac-maintenance-agreement-renewals.png` | `https://go.getcaros.com/hvac-agreements` |
| `hvac-aging-systems-report` | hvac | Withheld: visual approval pending | `insights/hvac-aging-systems-report.png` | `https://go.getcaros.com/hvac-agreements` |
| `emergency-plumbing-leads-call-response` | plumbing | Staged draft | `insights/emergency-plumbing-leads-call-response.png` | `https://go.getcaros.com/plumbing-after-hours` |
| `missed-call-text-back-for-plumbers` | plumbing | Staged draft | `insights/missed-call-text-back-for-plumbers.png` | `https://go.getcaros.com/plumbing-after-hours` |
| `plumbing-customer-follow-up-drain-sewer` | plumbing | Staged draft | `insights/plumbing-customer-follow-up-drain-sewer.png` | `https://go.getcaros.com/plumbing-after-hours` |

## Asset provenance and logo checklist

The manifest records source issue, source filename, original manuscript SHA-256, ZIP/export mapping, native dimensions, descriptive alt text, original image SHA-256, and the background/logo pairing. Staged PNGs are copied unchanged from approved packages. Photography is generated illustrative imagery authorized in the source threads, not CAROS staff, testimonials, or documented work. Image captions identify this.

| Asset | Background beneath logo | Logo file used |
|---|---|---|
| Roofing blog images 1–3: approved photo revision | White `#FFFFFF` | `CAROS_Logo_LIGHT-BACKGROUNDS_transparent.png` |
| Real Estate blog images 1–3: approved revision-3 package (unchanged revision-2 standalone graphics) | White `#FFFFFF` | `CAROS_Logo_LIGHT-BACKGROUNDS_transparent.png` |
| Plumbing blog images 1–3: approved people v3 | Black `#000000` | `CAROS_Logo_DARK-BACKGROUNDS-ONLY.jpg` |
| Existing site header/footer | Existing light surfaces | Existing transparent `public/caros-logo.png`, unchanged |

Later dark replacement designs on JMG-130 are review packages. Swap any newly approved graphics through the manifest; do not replace the approved source images silently.

## Validation

- `pnpm test:insights`: date boundary, timezone, invalid/unset/future date, visual approval and preview environment gates; twelve source-copy hashes, nine staged asset hashes/native dimensions and metadata fields.
- `pnpm exec tsc --noEmit`: independent type check (the repository’s existing Next config skips build-time type checking).
- `pnpm build`: production compilation and output-file tracing; all twelve Markdown files are traced into the article function.
- `pnpm verify:insights`: launches and cleans up production and preview servers; verifies every article route, index membership, images, metadata, noindex, JSON-LD, CTAs, sitemap exclusion, locale behavior, Resources link and query-string bypass rejection.
- Browser QA: desktop and 390px mobile index/article layouts, group navigation, correct Spanish Resources target and no page overflow. Screenshots are attached to the Multica handoff.

No production merge, domain promotion, GHL publishing, or scheduling is performed.
