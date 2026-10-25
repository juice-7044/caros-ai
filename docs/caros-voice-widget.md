# CAROS custom voice widget

The CAROS widget replaces the stock Retell module embed. Do not mount both, and do not restore the old LeadConnector widget alongside it.

## Files

- `components/caros/chat-widget.tsx`: accessible launcher/panel and explicit call controls.
- `components/caros/chat-widget.module.css`: CAROS gold/black styling; desktop launcher raised by `4in` (384 CSS pixels) above the prior 24px offset, capped for short screens. Mobile uses a separate reachable offset and viewport-bounded panel.
- `lib/caros-voice-session.ts`: one session owner, stale-callback guards, microphone cleanup, and fixed public agent configuration.
- `registry/orbe/particles-orb/particles-orb.tsx` and `registry/lib/`: particle renderer and supporting utilities supplied by the site owner. No separate microphone analyser is mounted.

## Retell integration

Uses official `retell-client-js-sdk@3.0.3`, dynamically loaded only after Start. Public key, agent ID and version remain the owner-supplied values. Only a **public** key belongs in this module. Never add a Retell private API key to the client.

- Actual SDK `live`/`end`/`error` hooks control call lifecycle.
- Actual incoming audio samples drive `levelRef`. The visual `speaking` state is an audio-activity estimate; it is not an exact agent speech boundary and can include background sound. The UI labels the connection/microphone honestly rather than inventing thinking or user-speaking events.
- `transcript: false`: no monitoring scopes or transcript access requested.
- Opening/minimizing the panel does not start or stop a call. Start is explicit; End and unmount disconnect immediately. A minimized live call has a visible call-in-progress launcher and timer.
- User mic permission is requested by the SDK only after Start. There is no second microphone stream for the particles.
- Public-key allowed domains/reCAPTCHA are configured in Retell, not by expanding browser scopes. If reCAPTCHA is enabled on this public key later, add the supported per-request token flow before enabling calls.

## Verification

```sh
pnpm exec tsc --noEmit
node --test tests/caros-voice-*.test.mjs
pnpm build
```

Browser checks cover 1440×1000, 759×559 and 390×844 layouts, keyboard-close/focus, reduced-motion frame stability, launcher/panel rendering, and a deliberately intercepted 401 response from `/v3/create-web-call` (no real call).

A successful build, visible orb or mocked request is **not** a live voice-call acceptance test. A real call incurs provider usage and must be approved separately. Verify actual connection, microphone, agent audio, mute, hang-up and cleanup after approval.

Production: Vercel project **`caros-ai`** serves `getcaros.com`. The sibling `caros-ai-bes4` must not be assumed to hold production environment configuration.
