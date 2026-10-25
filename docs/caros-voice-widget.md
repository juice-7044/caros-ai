# CAROS custom voice and text-chat widget

The CAROS widget replaces the stock Retell module embed. Do not mount both, and do not restore the old LeadConnector widget alongside it.

## Files

- `components/caros/chat-widget.tsx`: accessible launcher/panel and explicit call controls.
- `components/caros/chat-widget.module.css`: CAROS gold/black styling; expanded homepage launcher is portaled into the reserved hero dock beneath the CTA helper links. It stays expanded throughout the hero/CTA area, including the scroll needed to reach it on short/mobile screens. Only after the dock bottom passes 96px from the viewport top does it become a floating circle; scrolling back until the dock bottom reaches 112px restores the expanded launcher. The floating circle always carries a visible “Talk to us” label, including on interior pages. Resize observation accounts for responsive hero height and font/layout changes.
- `lib/caros-widget-dock.ts`: pure layout/scroll decisions. Only the launcher changes location; the single voice/chat session owner and fixed conversation panel stay in shared chrome. The dock reserves its height to prevent a scroll-induced layout jump. Portal launchers define their own theme tokens rather than relying on inheritance from the widget root.
- `lib/caros-voice-session.ts`: one session owner, stale-callback guards, microphone cleanup, and fixed public agent configuration.
- `lib/caros-chat-session.ts`: separate website chat agent/public key; lazy session creation and safe message retry/reset handling.
- `components/caros/text-chat.tsx`: plain-text message history, input, error/retry and new-chat controls.
- `registry/orbe/particles-orb/particles-orb.tsx` and `registry/lib/`: particle renderer and supporting utilities supplied by the site owner. No separate microphone analyser is mounted.

## Retell integration

Uses official `retell-client-js-sdk@3.0.3`, dynamically loaded only after Start. Public key, agent ID and version remain the owner-supplied values. Only a **public** key belongs in this module. Never add a Retell private API key to the client.

- Actual SDK `live`/`end`/`error` hooks control call lifecycle.
- Actual incoming audio samples drive `levelRef`. The visual `speaking` state is an audio-activity estimate; it is not an exact agent speech boundary and can include background sound. The UI labels the connection/microphone honestly rather than inventing thinking or user-speaking events.
- `transcript: false`: no monitoring scopes or transcript access requested.
- Opening/minimizing the panel or scrolling does not start or stop a call. Start is explicit; End and unmount disconnect immediately. A minimized live call has a green status dot and an accessible call-in-progress label/timer; the docked launcher also shows the timer in its text.
- User mic permission is requested by the SDK only after Start. There is no second microphone stream for the particles.
- Public-key allowed domains/reCAPTCHA are configured in Retell, not by expanding browser scopes. If reCAPTCHA is enabled on this public key later, add the supported per-request token flow before enabling calls.

## Website text chat

The owner explicitly chose **website text chat**, not phone SMS. The chooser offers Voice and Text chat without loading a second stock widget. Voice and chat use distinct public keys and agent IDs. The voice agent retains version 9; the chat version is omitted because no chat version was supplied.

Chat uses the same documented/public-key flow as Retell's stock widget: `POST https://api.retellai.com/create-chat` with `agent_id`, then `POST /create-chat-completion` with `chat_id` and `content`, authenticated with the supplied chat public key. Choosing a channel makes no provider request; the first message starts the session. No API key, phone number or messaging consent is collected for this website chat.

Only agent/user text is displayed using React escaping, never raw HTML or tool-call arguments/results. History is held in memory through minimization and channel switching; refreshing clears the browser view, **not** Retell's server records. New chat clears the current view and cancels local pending requests, but does not claim to delete a provider transcript. Cancellation/retries warn when delivery cannot be confirmed. Public-key domain/reCAPTCHA restrictions still apply.

## Verification

```sh
pnpm exec tsc --noEmit
node --test tests/caros-*.test.mjs
pnpm build
```

Browser checks cover 1440×1000, 759×559 and 390×844 layouts, keyboard-close/focus, reduced motion, native scroll collapse, no scroll-induced layout jump, client-side interior/back navigation, and stable dialog identity. A locally mocked pending chat reply survives minimization and launcher relocation without creating a real provider session. Earlier voice checks deliberately intercepted a 401 response from `/v3/create-web-call` (no real call).

The root-layout GHL `external-tracking.js` embed is removed; verify its absence from both script elements and resource requests. The separate affiliate manager and server-side GHL form integrations remain intact.

A successful build, visible orb or mocked request is **not** a live voice-call acceptance test. A real call incurs provider usage and must be approved separately. Verify actual connection, microphone, agent audio, mute, hang-up and cleanup after approval.

Production: Vercel project **`caros-ai`** serves `getcaros.com`. The sibling `caros-ai-bes4` must not be assumed to hold production environment configuration.
