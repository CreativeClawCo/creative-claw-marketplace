# Canvas, WebGL, and shaders

Use Canvas 2D for procedural lines, particles, diagrams, and data graphics; WebGL/Three.js for spatial objects, shader plates, and textured product motion. Keep exact readable text in DOM unless the effect needs it rasterized.

## Absolute-time drawing

Write `renderAt(t)` so it clears and redraws the whole frame from `t`. Set canvas backing dimensions to the output dimensions; for Three.js set pixel ratio to 1 and renderer size explicitly. Allocate geometry/materials once. Compute transforms and shader uniforms from absolute time, never increment rotation or integrate a simulation using elapsed frames. Seed random-looking geometry once, or use a deterministic hash.

A practical GSAP driver is an accessor property whose setter draws immediately:

```js
let time = 0;
const driver = {
  get t() { return time; },
  set t(value) { time = value; renderAt(value); }
};
const tl = gsap.timeline({paused: true});
tl.fromTo(driver, {t: 0},
  {t: duration, duration, ease: 'none', lazy: false}, 0);
renderAt(0);
window.__timelines = window.__timelines || {};
window.__timelines.main = tl;
```

This makes drawing part of the property update instead of relying solely on a callback. `lazy:false` requests immediate tween updates. Still test actual seeking; this is a useful implementation pattern, not a guarantee against every worker failure. Setters should redraw all dependent canvas state after computing it from `t`, avoiding property-order dependencies across several tweens.

The documented Three adapter also dispatches `hf-seek` with `event.detail.time` and sets `window.__hfThreeTime`. That is a valid alternative when the deployed adapter is available. Do not ban it. Use one time owner; do not casually combine competing adapter, GSAP, and free-running render loops. `onUpdate` is also a documented pattern, but verify it runs under the actual seek path, including event-suppressed seeks, if drawing depends on it.

## WebGL setup and shader adaptation

- Check context creation and shader compile/link status; expose errors rather than silently producing a blank plate. `preserveDrawingBuffer:true` is a useful capture-compatible option, with a memory/performance tradeoff. It does not fix timeline registration or shader errors.
- Match shader language to context: WebGL1 uses GLSL ES 1.00; WebGL2 uses GLSL ES 3.00 syntax. Map external shader `iTime` to the supplied `t`, resolution to fixed canvas dimensions, and channel inputs to preloaded textures.
- Avoid previous-frame feedback, temporal antialiasing, and accumulating trails unless you can deterministically reconstruct their history from any requested time. Use analytic trails or fixed prerecorded data when appropriate.
- Pin the selected Three.js version and matching addons. Modern ESM needs correctly resolved imports/import maps, including nested bare `three` imports. Classic script examples need an actual global build from a release that provides one. Neither format nor a particular old version is universally required.
- Load texture/model dependencies before publishing readiness. Textures have CORS/readback constraints even when an image displays in DOM. Prefer supported image textures; do not add `crossorigin` to framework-owned video/audio to work around texture problems.

## HTML as texture and advanced GPU features

`layoutsubtree` / `drawElementImage` and WebGPU are browser/runtime capabilities, not guaranteed remote features. Detect them and verify the worker supports them before relying on them. Keep a meaningful fallback (DOM layer, Canvas 2D drawing, or pre-rasterized image); do not promise a placeholder will turn into the desired shader in production. Standard WebGL does not itself capture arbitrary DOM. For animated DOM textures, capture after the DOM state for that time is applied and before uploading/drawing the texture.

## Evidence and starter

Prior validation: the official spiral-galaxy registry example used a GSAP property setter tween with `lazy:false`, `preserveDrawingBuffer:true`, and classic GSAP 3.14.2 / Three.js 0.147 scripts. It succeeded locally on HyperFrames 0.8.30 and remotely. That supports retaining this pattern as a known working reference. Different earlier compositions timed out, possibly on a different worker deployment; the comparison does **not** establish that `onUpdate` caused those timeouts.

[webgl-orbit.html](../assets/webgl-orbit.html) is a small complete example using raw WebGL plus a pinned GSAP script. It includes shader error checks and deterministic redraws. It is not the spiral-galaxy example and does not inherit its validation status. See [verification](verification.md).
