---
name: creativeclaw-render-html-video
description: "Render a HyperFrames-backed HTML/CSS/JS composition to video with Creative Claw. Use only when the user explicitly asks for HTML-to-video, HyperFrames, code-driven motion, animated HTML, or explicitly chooses HTML rendering for overlays or title cards."
---

# Render HTML Video

Read [shared execution guidance](references/workflow-basics.md) once per task before using tools. It covers existing authorization, model discovery, optional cost checks, imports, and recovery.

`render_html_video` sends an HTML composition to a HyperFrames renderer and returns a queued video job. This is an explicit-only route. Do not select it for ordinary AI video generation, or merely because a video needs text; use `creativeclaw-generate-video` unless the user asks for HTML/HyperFrames/code-driven rendering or explicitly accepts that method.

## Good uses

- Put precise, animated text, captions, lower thirds, labels, or calls to action over an existing video.
- Make deterministic title cards, logo stings, charts, UI motion, intros, or outros.
- Preserve exact copy, fonts, colors, logo placement, and timing that a generative video model may change.
- Build procedural canvas graphics, WebGL/shader backgrounds, and deterministic 3D product motion.

It is not the right tool for photorealistic scene invention, character motion, or cinematic generative footage.

## Choose the source method

- **Single HTML (default):** use `html` for basic, short videos and self-contained motion. An HTML catalog example returns the actual document; adapt it and submit its contents.
- **Full project ZIP:** pass a workspace-owned ZIP asset ID as `project_asset_id` for advanced, full HyperFrames projects **only when adapting a ZIP example selected from search_examples, or when the user already has a full HyperFrames project**. Ordinary `zip` and dedicated `project` assets both work; prefer `project` for a dedicated render project, but do not re-upload an existing ZIP only to change its type. Read [project packaging](references/project-packaging.md) for import routes, editing, and packaging. Complexity alone is not a reason to start a new ZIP project.

For explicit HTML-video requests, look for relevant examples with `search_examples` and load selected matches with `get_example` when those tools are exposed. Read [example discovery](references/example-discovery.md). Inspect the returned source type; a generative prompt is not HTML. If there is no useful example, use the single-HTML method unless the user supplies a full project.

All composition, DOM, canvas/WebGL, timing, media and verification principles below apply to **both methods**. Only transport, dependency paths and packaging differ; a ZIP does not make non-seekable animation render-safe.

## Workflow

1. Establish the explicit HTML/HyperFrames intent from the request or prior authorization; do not ask again when already established. Set duration, even-numbered width and height, FPS, output format, exact copy, and source media.
2. For single HTML, import local or attached media and use durable public HTTP(S) URLs. For ZIPs, bundle assets and preserve project-relative paths. For overlays, match the source video's aspect ratio and dimensions; scale or pad the source first when necessary.
3. For branded work, call `get_theme` and use its approved fonts, colors, logos, and motion character.
4. Read [composition contract](references/composition-contract.md), then only the use-case references below that apply. For single HTML, assemble one complete document with inline composition CSS/JS. For ZIPs, retain the full project structure and relative sub-compositions/assets. Plain finite CSS keyframes work for simple motion; prefer one paused GSAP timeline for orchestration.
5. Inspect the exposed `render_html_video` schema; pass exactly one of the complete `html` or uploaded `project_asset_id`, plus supported output options (`duration`, `fps`, `width`, `height`, `format`, `name`, `tags`). Do not invent file-upload, preflight, or dependency parameters. Rendering is asynchronous: resolve the returned job with the exposed `check_job` schema when the final URL is needed.
6. Inspect text fit, safe zones, animation timing, media sync, encoded dimensions, and audio before using the output in another edit.

Use 24 FPS for a cinematic cadence, 30 FPS for normal graphics, and 60 FPS only when the extra smoothness justifies the cost. The renderer normalizes other positive values to 24, 30, or 60, so request one of those directly.

## Read by use case

| Need | Reference |
| --- | --- |
| Full project ZIP from a selected example or user-supplied project | [Project packaging](references/project-packaging.md) |
| Typography, UI demos, charts, logo stings, title cards | [DOM and product motion](references/dom-product-motion.md) |
| Procedural 2D, Three.js, GLSL, HTML as texture | [Canvas and WebGL](references/canvas-webgl.md) |
| Footage overlays, captions, narration, music, source audio | [Audio and media](references/audio-media.md) |
| Find a reusable starting point when example tools are exposed | [Example discovery](references/example-discovery.md) |
| Review, local checks when available, blank frames or timeouts | [Verification and troubleshooting](references/verification.md) |

The [standalone WebGL example](assets/webgl-orbit.html) is a complete document for local validation or adaptation into the `html` string; its file path is not a render-tool input. Validation status is recorded in the verification reference.

Use `estimate_generation` with `operation: "html_video"` only for user-requested cost/budget help, supplying actual duration, dimensions, and FPS in `params`. Respect existing authorization without a routine approval gate.
