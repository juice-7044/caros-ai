# Native Revenue Audit consent review

## Scope and source

Branch `fix/native-audit-sms-consent` was created from freshly fetched `origin/main` (`e74e366`). This replaces only the website AuditForm integration, its ordinary Spanish labels and relevant tests. No push, deployment, backend configuration write, database write, live submission or message was performed.

The authoritative saved form and generated snippet were read back by the parent agent from the signed-in CAROS `GET /api/caros/site-forms` after the owner's successful consent configuration save. This implementation uses that supplied verified readback; it did not repeat or change the configuration:

- Form ID: `0b387c89-a47f-4986-acd3-367e14bd6780`
- Form name: `getcaros.com: Revenue Audit request`
- HTML ID: `caros-form-hprr2ydo`
- Endpoint: `https://ask.getcaros.com/api/forms/STXwJ6GJRXmSPQMOKgOwJsUlEC80c0J_nmQhpRR2yDo`
- Active; server-owned tags `revenue-audit-request` and `source-website` remain unchanged.
- SMS key: `sms_consent`; exact value: `sms-optin-df9eacadc930e901`.

`lib/revenue-audit-form.ts` stores the static snapshot and a small public JSON transport. Payload fields, in saved order:

| Key | Native control | Required |
| --- | --- | --- |
| name | text | No |
| email | email | **Yes** |
| phone | tel | No |
| company | text | No |
| site | text | No |
| industry | text | No |
| consent | text | No |
| details | textarea, rows=4 | No |
| sms_consent | checkbox, initially unchecked | No |

The separate `website` honeypot is offscreen, `aria-hidden`, `tabindex=-1`, `autocomplete=off`. The actual visible website field remains `site`. Native FormData entries are serialized directly as JSON; empty text entries and the honeypot survive, while unchecked `sms_consent` is omitted entirely. Checked SMS sends the exact saved string, never a boolean or `on`. The generic text `consent` field is labeled Contact preference and explained as distinct from SMS authorization.

## Approved wording and localization

The checkbox label's complete textContent (including the linked policy words) is exactly:

> I consent to receive non-marketing text messages from CAROSAI about my Revenue Audit inquiry, appointment confirmations, appointment reminders, and audit follow-up at the phone number provided. Message frequency may vary. Message and data rates may apply. Reply STOP to opt out or HELP for assistance. Consent is not a condition of purchase. See our Privacy Policy and Terms & Conditions.

The previous verification mismatch was two spaces after `CAROSAI` in the input versus one in saved wording: CAROS normalizes wording with NFKC and whitespace collapse. The saved wording and hash were not changed. The unit test independently computes SHA-256 of normalized wording and checks the first 16 hexadecimal characters against the saved token.

EN/ES ordinary labels, validation, errors, submitting state, button and thanks are localized without changing payload keys or values. Both locales retain this approved English SMS wording with `lang="en"`; Privacy Policy and Terms & Conditions remain English within the label while their hrefs follow the locale. The Spanish notice is outside the exact label:

> El consentimiento para SMS se muestra en inglés con el texto aprobado.

**Follow-up:** Spanish legal SMS wording requires its own approved backend wording/value pair. Existing translated legal catalog text is not reused with this English hash. No Spanish consent version was invented.

## Success, errors and analytics

Only HTTP success **and** parsed `ok: true` produce the in-place thanks: “Thanks! We got it and someone from CAROS will be in touch.” There is no automatic calendar redirect or claim that an audit is booked. HTTP failure, `ok: false`, malformed JSON and network errors reject; the UI shows a localized honest failure and preserves entered values and checkbox state. Pending submissions are guarded against duplicates. `audit_start` and `audit_complete` remain PII-free with only the existing location property; completion occurs only after accepted transport.

The shared `lib/caros-leads.ts`, other forms, API routes, pricing, legal pages, consent runtime, homepage/orb and ask-caros app were not edited. Four older tests were updated because their prior requirements explicitly mandated the now-replaced sendLead/checkbox/redirect behavior. The eight pre-existing untracked full-homepage screenshots were left untouched and excluded from the commit.

## Real verification results

Test-first failures were observed before implementation: missing native snapshot, missing native form in the browser, missing testable native transport and missing consent language attribute. The browser test also caught missing Name/Website Spanish catalog entries, which were added.

- `node --test tests/*.test.mjs`: **94 passed, 0 failed** (includes snapshot/hash and mocked transport).
- `npx tsc --noEmit`: **PASS**, run separately because the existing Next build config skips type validation.
- `node scripts/validate-locales.mjs`: **PASS**; schemas match, 0 suspicious long English duplicates.
- `npm run build`: **PASS**, Next.js 16.0.10 webpack; 111 static pages generated.
- `tests/native-audit.browser.mjs` against the real local **production** server: **10 mocked submissions PASS** across EN/ES, with unchecked email-only success, checked/full-field success, HTTP 500, HTTP 200 `ok:false`, and network failure per locale. It checks exact endpoint/method/JSON, exact label text and policy hrefs, optional initial checkbox, only email required, honeypot accessibility, localized native validation, preserved values/checked state on errors, in-place success and unchanged route. No request reaches the public form service.
- Real Chromium layout checks: EN/ES at widths **390 and 1440**, no horizontal overflow. Full-page and complete-form screenshots captured; mobile ES and desktop EN complete-form screenshots visually inspected with no clipped controls or consent. Tall capture viewport permits the entire form without sticky-header occlusion; submission scenarios use a 1440×1000 viewport.
- `git diff --check`: **PASS**.

The first standalone tsc run found stale generated `.next/types` references to API routes removed upstream. Only the generated `.next` build output was cleared after stopping our port-3101 dev listener; a clean production build and subsequent tsc passed. No source workaround or API route was added. Existing non-blocking warnings remain: Node typeless-package reparsing, outdated baseline-browser-mapping data, and Next's deprecated middleware convention.

### CORS and CSP

Read-only OPTIONS request to the exact endpoint with `Origin: https://getcaros.com`, requested method POST and header content-type returned **HTTP 204** with:

- `access-control-allow-origin: *`
- `access-control-allow-methods: GET,POST,OPTIONS`
- `access-control-allow-headers: content-type`

The current `next.config.mjs` already allows `https://ask.getcaros.com` in connect-src, so no CSP change was made. No live POST was used to verify delivery, contact creation or consent-event persistence; those remain intentionally untested in production.

## Reproduction and evidence

Production server remains at `http://localhost:3101` (`next start --port 3101`). Browser harness requires externally available Playwright, consistent with the repo's other browser scripts; no dependency/lockfile was changed. Exact command used:

```sh
PLAYWRIGHT_MODULE=/Users/anns-macbook/.npm/_npx/e41f203b7505f1fb/node_modules/playwright \
AUDIT_SCREENSHOTS=/Users/anns-macbook/.hermes/profiles/wiki-skill/cache/scratch \
node tests/native-audit.browser.mjs
```

Set PLAYWRIGHT_MODULE to an installed Playwright module on another machine; optional CHROMIUM_PATH selects its executable. The harness rejects non-local AUDIT_TEST_URL values and intercepts every native public-form request.

Evidence root: `/Users/anns-macbook/.hermes/profiles/wiki-skill/cache/scratch/`.

Complete form screenshots:

- `/Users/anns-macbook/.hermes/profiles/wiki-skill/cache/scratch/native-audit-form-en-390.png`
- `/Users/anns-macbook/.hermes/profiles/wiki-skill/cache/scratch/native-audit-form-en-1440.png`
- `/Users/anns-macbook/.hermes/profiles/wiki-skill/cache/scratch/native-audit-form-es-390.png`
- `/Users/anns-macbook/.hermes/profiles/wiki-skill/cache/scratch/native-audit-form-es-1440.png`

Full-page screenshots have matching names without `form-`: `native-audit-{en,es}-{390,1440}.png`. Logs: `native-audit-tests.txt`, `native-audit-build.txt`, `native-audit-browser.txt` in that same evidence root. These local evidence files are outside the repository and not included in the task commit.

Remaining release work: parent review and authorized publishing; production delivery verification only under explicit permission, without creating unintended leads or messages. No deployment is claimed here.
