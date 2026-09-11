# Shared composition contract: HTML and ZIP

`render_html_video` accepts exactly one complete `html` string or uploaded `project_asset_id`. The following assembly rule applies only to the single-HTML method; ZIP projects preserve relative files and nested `data-composition-src`. Keep authoring files locally if useful, but assemble their contents into the submitted document. Inline local CSS, scripts, SVG, and scene markup. Resolve CSS `url()`, script imports, fonts, textures, and nested assets too; replacing only top-level paths is insufficient. Avoid external `data-composition-src` unless the composition has already been assembled into the final HTML.

Use absolute, worker-accessible HTTP(S) dependency and asset URLs when not inlining. In single HTML, localhost, local paths, relative URLs, session-only URLs, and browser blob URLs do not transfer to the remote worker. In ZIPs, bundled relative files do transfer; see [project packaging](project-packaging.md) for network limits. Audio/video have stricter rules in [audio-media.md](audio-media.md). Pin external library versions for reproducibility; use compatible imports and addons from the same release. A local successful fetch does not prove worker access. Load dependencies during setup, never during frame evaluation.

## Root and timeline

- Put the standalone root directly in the body, not in a `<template>`. Set a fixed pixel CSS width/height and matching `data-width`, `data-height`, `data-duration`, and `data-composition-id`. Match tool dimensions and duration. Set root duration in authored HTML; changing it later in script is not a reliable length override.
- Register one completed paused timeline per composition at `window.__timelines[compositionId]`. Initialize the registry defensively for ordinary browser inspection: `window.__timelines = window.__timelines || {}`. Do not play it as the render clock.
- Async setup such as font loading is possible: finish loading, layout measurement, and timeline construction before publishing the timeline key. Registering an empty timeline early can signal readiness prematurely. Bound loading failures and surface them; do not invent a server readiness/preflight API.
- Use `data-start` and `data-duration` for timed clips. `class="clip"` is a useful convention; `data-track-index` is an editing lane, not CSS stacking. Set `z-index` intentionally. Animate inner visuals without fighting the framework's clip visibility.
- For several scenes, prefer one root and sections on a main timeline at absolute seconds. Keep IDs unique. For single HTML, a modular project needs assembly, not concatenated full HTML documents. A ZIP may preserve separate scene documents: register a paused timeline for each mounted composition and retain its timing and relative paths.

## Seekable state

Every frame must be reconstructible from the requested time, including backward and out-of-order seeks. Avoid wall clocks, accumulating delta time, unseeded random values, infinite repeats, user-input state, and per-frame fetches. Precompute seeded geometry once. Prefer explicit `fromTo` states; avoid CSS and GSAP competing for the same transform. Use transforms/opacity where suitable, but do not invent a universal property allowlist: masks, filters, SVG strokes, and layout properties may be valid when needed.

CSS/WAAPI/Three adapters depend on the deployed runtime. Validate actual seeking rather than assuming ordinary browser playback proves capture works. Core documentation allows async setup and more properties than some older animation summaries suggest; preserve the behavioral contract instead of copying those conflicting blanket restrictions.
