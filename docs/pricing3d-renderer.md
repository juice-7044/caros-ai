# CAROS pricing Three.js renderer

## Integration contract

`components/caros/pricing-scene/scene.tsx` default-exports the client component. Its exact public contract is exported from `lib/pricing3d-scene-types.ts`:

```ts
interface PricingSceneProps {
  capability: 'platform' | 'marketing' | 'sales' | 'communication' |
    'reactivation' | 'automation' | 'service' | 'reputation' | 'community';
  paused?: boolean;
  dissolve?: boolean;
  onReady?: () => void;
  onError?: (message: string) => void;
  onInteraction?: (kind: 'dissolve' | 'rotate' | 'reassemble') => void;
}
```

The wrapper must supply a **definite stage height**, localized HTML controls, accessible description, loading state and fallback. The canvas is decorative (`aria-hidden`, presentation role), not an inaccessible replacement for the capability information. `dissolve` enables whole-model keyboard preview without requiring a pointer hit; false releases it. Lazy import this module only for the enabled preview. This module does not change pricing/catalog data or load remote models, fonts, textures or HDRIs.

## Actual implementation

- Nine independent, genuine mesh sculptures: manually drawn/extruded CAROS condensed wordmark with oval sunburst O; hollow megaphone and signal arcs; rising pipeline bars/arrow; receiver and speech loop; circular return arrow; interlinked toothed gears; lifebuoy/headset; star/laurel; three gathered figures and a linking orbit. The logo was adapted from `public/caros-logo.png` and reviewed against `components/caros/sunburst.tsx`. This is a **stylized 3D adaptation**, not a claim of exact production CAD/vector equivalence.
- Each primitive's transform is baked before merging and centering into the common pivot. Geometry is lazily cached per capability (bounded to nine); materials are shared. Gold is `MeshPhysicalMaterial`, metalness 1, roughness .27, with PMREM `RoomEnvironment`, broad warm key, cool rim, fill, ACES filmic output and sRGB. An analytic low-opacity gold ground pool provides a lightweight grounding cue; this is not a physically correct contact shadow/reflection. There are no shadow-map clipping mismatches because shadow maps are not used.
- Deterministic LCG sampling builds triangle-area cumulative weights, binary-searches weighted triangles and uses square-root barycentric coordinates. Samples include normalized interpolated normals and stable seeds. Desktop uses 18,000 reusable points at DPR <=1.5; coarse-pointer devices use 6,000 at DPR <=1. No sample buffers are regenerated every frame.
- Solid fragments and point vertices share the **same GLSL rest-coordinate erosion field**. Solid fragments are discarded at its threshold; grains enter over a narrow overlapping threshold band. A 65%/26%/9% near/medium/far distribution, normal expansion and correlated flow preserve most of the silhouette. The intact mesh remains visible/raycastable even when its shader discards all fragments. Empty-space hits do not activate the brush. Raycasting updates every active frame, including while the model rotates under a stationary pointer. Brush position eases at 16/s; exposure grows at 8/s and returns at 3.5/s.
- Capability selection uses a 2.35-second dissolve / home morph / reform envelope. The old solid erodes first; equal-budget source and target homes interpolate in the particle vertex shader, with a bounded arcing flight displacement; only while both solids are fully eroded does the intact picking mesh switch to the target. The target then reforms at the matching threshold. Rapid changes snapshot current interpolated homes and restart within the fully dissolved phase, rather than flashing an intact intermediate object. GPU point attributes are updated in place, not replaced on every selection. Cached source homes are not mutated.
- Pointer movement brushes; horizontal pointer-down drag rotates within a bounded yaw. Touch uses `touch-action: pan-y` and never prevents vertical scrolling. Touch up, leave, cancel and window blur release pointer activation. Parent keyboard preview remains controlled by its prop.
- Idle rendering settles and stops. `paused`, document hidden, and offscreen observation stop RAF; resume clamps delta time. Runtime reduced motion immediately shows intact models without autonomous transitions or dissolution. Context loss and shader compile failure report through `onError` and stop retrying. Unmount cancels RAF, removes all listeners/observers, and disposes owned geometries, materials, PMREM texture target and renderer/context.

## Evidence and remaining acceptance checks

Executed in this worktree:

```
node --test tests/pricing3d-scene.test.mjs
# tests 3, pass 3, fail 0
```

Tests were introduced before their implementations: missing sampler first failed; after sampler passed, missing model builder/interpolation/transition functions failed; all now pass. They exercise deterministic seeds, 10,000 sample count/finiteness, a 4:1 unequal-triangle distribution, unit normals, empty-surface rejection, all nine distinct centered nonzero geometry bounds, immutable home interpolation and transition phase boundaries. These are pure CPU tests, **not visual proof**.

A scoped TypeScript program checked only the four owned TS/TSX modules with strict mode, Bundler resolution, React JSX and skipLibCheck: **0 diagnostics**. For this check, `@types/three@0.183.1` was downloaded/extracted only to profile scratch and mapped through temporary compiler options. **The repository still needs the page worker to add `@types/three` to devDependencies**; no package or lock files were changed by this worker. Node 26 prints its pre-existing typeless-package warning when executing the TS helper directly; package type was deliberately left unchanged.

`curl http://localhost:3101/en/pricing-3d` could not connect when checked. No competing server or broad build was started. **The actual component's WebGL/browser acceptance is not yet run by this worker.** Parent has separately exercised the original MIT reference demos, which does not validate this renderer. Parent must verify real shader compilation, letter legibility, gold highlights, pixel-level erosion, holes/no-hit, return, three sculpture morphs, rapid switches, touch scroll, keyboard preview, reduced motion, offscreen/pause, context loss and unmount in the integrated wrapper before publication. No fabricated screenshots or canvas-existence claims are supplied.

Useful real runtime probes on `[data-pricing3d-scene]`: `data-selected`, `data-phase` (`idle`, `dissolving`, `morphing`, `reforming`), `data-hit`, `data-exposure`, `data-morph`, `data-particle-count`, and actual render counter `data-frames`. A stationary no-hit pointer must report hit=false and exposure decay to zero. Pause/offscreen should stop frame counter growth. Mid-transition morph must lie strictly between 0 and 1. Probe values are useful diagnostics, **not substitutes for rendered-pixel comparisons**.

## Dependencies and attribution

Imports: React, `three` (installed 0.183.2), `three/addons/environments/RoomEnvironment.js`, `three/addons/utils/BufferGeometryUtils.js`. No R3F dependency is needed by this module.

The erosion handoff, sampling approach, grain distribution and damping are adapted from the public MIT `hover-particle-dissolve` and `3d-feature-objects` skills/demos, pinned source SHA `5b095a86efdf13f4d93b0bd640d3967f228012eb`. Reviewed both SKILL.md files, both demo/PROMPT.md files, both demo/index.html sources, root LICENSE, and demo Three-LICENSE.txt before implementation. No Saltmere PRO/gated source or assets were copied.

### Adapted skill/demo license

MIT License

Copyright (c) 2026 Meng To

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.

### Three.js reference/demo license

The MIT License

Copyright © 2010-2023 three.js authors

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.

Installed modern Three.js remains covered by its own bundled LICENSE; preserve it in distribution together with this attribution.
