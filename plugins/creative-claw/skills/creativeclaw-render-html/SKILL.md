---
name: creativeclaw-render-html
description: "Render an exact HTML/CSS layout to a PNG, or a HyperFrames HTML/CSS/JS composition to video, with Creative Claw. Use only when the user explicitly asks for HTML, CSS, HyperFrames, or code-based rendering, supplies HTML, or accepts that method; not for ordinary images, posters, social cards, or AI video."
---

# Render HTML

Read [shared execution guidance](references/workflow-basics.md) once per task before using tools. It covers existing authorization, model discovery, optional cost checks, imports, and recovery.

Two tools:

- `render_html_image`: a fixed-size HTML/CSS layout to a PNG. It completes synchronously; do not call `check_job` for it.
- `render_html_video`: a HyperFrames HTML/CSS/JS composition to video. It returns a queued job; resolve it with `check_job` when the final URL is needed.

This is an explicit-only route. A poster, banner, social card, overlay, intro, outro, or video that needs text is not by itself a reason to use HTML. Use `creativeclaw-generate-image` or `creativeclaw-generate-video` unless the user asks for HTML, CSS, HyperFrames, or code-driven rendering, supplies HTML, or accepts the method when offered. If the user names an image or video model, that choice wins.

`creativeclaw-edit-media` owns work on finished videos: burning a watermark (`merge_media` with `operation:"overlay_images"`) and merging intros or outros. This skill can make the parts: a transparent PNG mark or a rendered title card.

## Good uses

- Image: a brand or theme reference board; an OG image, quote card, title card, badge, comparison graphic, or UI mockup; an exact-text watermark with `transparent_background: true`; a layout the user wants to approve before using it as a generation reference.
- Video: exact animated text, captions, lower thirds, or calls to action over existing footage; title cards, logo stings, charts, UI motion, intros, and outros; canvas, WebGL, shader, or deterministic 3D product motion.
- Not for photorealistic scenes, character motion, or cinematic generative footage.
- For a reusable layout with text and image slots, use `list_templates` to find one, `create_template` or `update_template` to save it, and `render_template` to fill it.

## Render an image

1. Confirm the pixel size, the exact visible copy, and whether the user supplied HTML or wants you to write it.
2. For branded work, call `get_theme`, and use `search_assets` for approved logos and images. Import local or attached media first.
3. Write a complete fixed-size layout. Set `html, body` margins to zero, hide overflow, and declare fonts. Tailwind utilities work without a CDN; ordinary `<style>` blocks work as in Chromium.
4. Pass public images or fonts through `inline_images` and reference each as `{{token}}`. URLs must be reachable at render time.
5. Call `render_html_image` with `html`, `width`, `height`, a useful `name`, and stable `tags`.
6. Check the PNG for font loading, text fit, crop, contrast, and logo fidelity.

```text
render_html_image({
  width: 1200,
  height: 630,
  name: "launch-announcement-card",
  tags: ["launch", "social-card"],
  html: `<main style="width:1200px;height:630px;display:grid;place-items:center;background:linear-gradient(135deg,#111827,#312e81);color:white;font:800 72px/1.05 Inter,sans-serif;text-align:center;padding:90px">Version 2.0<br>ships today</main>`
})
```

- No default font is injected. Load a web font or pass a font URL through `inline_images`, with a fallback.
- Make the layout fill the canvas. Avoid content whose height depends on the viewport or on unbounded text.
- Use HTTP(S) URLs only; no local paths, blob URLs, or expired signed URLs.
- If the PNG becomes a generation reference, repeat the exact brand and text constraints in that prompt; a generative model may not keep them.

## Render a video

Choose the source:

- **Single HTML (default):** pass `html` for short, self-contained motion.
- **Full project ZIP:** only for a ZIP example selected from `search_examples` or a HyperFrames project the user already has. Pass `project_url` for an unchanged public ZIP, or `project_asset_id` for an uploaded or edited one. Read [project packaging](references/project-packaging.md). Complexity alone is not a reason to start a ZIP project.

To find a starting point, call `search_examples` with `render_type: "html_video"`, then load one selected result with `search_examples({ id })`. Read [example discovery](references/example-discovery.md). A generative prompt is not HTML.

1. Set duration, even width and height, FPS, format, exact copy, and source media. Do not ask again for an HTML choice the user already made.
2. For single HTML, import media and use public HTTP(S) URLs. For ZIPs, bundle assets and keep relative paths. For overlays, match the source video's size and aspect ratio.
3. For branded work, call `get_theme` and use its fonts, colors, logos, and motion style.
4. Read [composition contract](references/composition-contract.md), then only the references below that apply. Plain finite CSS keyframes work for simple motion; prefer one paused GSAP timeline for orchestration. To silence a source video, put `muted` on its opening `<video>` tag; setting `video.muted = true` later in JavaScript is not enough. Keep narration and music in separate `<audio>` elements.
5. Call `render_html_video` with exactly one source (`html`, `project_url`, or `project_asset_id`) and the supported output options (`duration`, `fps`, `width`, `height`, `format`, `name`, `tags`). Do not invent upload, preflight, or dependency parameters.
6. Resolve the job, then check text fit, safe zones, timing, media sync, encoded size, and audio before using the output elsewhere.

Use 24 FPS for a cinematic look, 30 for normal graphics, and 60 only when the smoothness is worth it. Other values are normalized to 24, 30, or 60.

| Need | Reference |
| --- | --- |
| Full project ZIP | [Project packaging](references/project-packaging.md) |
| Typography, UI demos, charts, logo stings, title cards | [DOM and product motion](references/dom-product-motion.md) |
| Procedural 2D, Three.js, GLSL, HTML as texture | [Canvas and WebGL](references/canvas-webgl.md) |
| Footage overlays, captions, narration, music, source audio | [Audio and media](references/audio-media.md) |
| Examples to start from | [Example discovery](references/example-discovery.md) |
| Review, local checks, blank frames, timeouts | [Verification and troubleshooting](references/verification.md) |

The [WebGL example](assets/webgl-orbit.html) is a complete document to validate locally or adapt into the `html` string; its file path is not a tool input.

Use `estimate_generation` with `operation: "html_video"` only when the user asks about cost or gives a budget, with the real duration, size, and FPS in `params`.
