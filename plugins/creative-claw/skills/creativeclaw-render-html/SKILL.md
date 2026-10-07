---
name: creativeclaw-render-html
description: "Render an exact HTML/CSS layout to a PNG, or make a motion-graphics video as a HyperFrames HTML/CSS/JS composition, with Creative Claw. Use only when the user explicitly asks for HTML, CSS, HyperFrames, or code-based rendering, supplies HTML, accepts that method, or explicitly asks for motion graphics, kinetic typography, animated titles, or an animated explainer; not for ordinary images, posters, social cards, or filmed-looking AI video."
---

# Render HTML

For each Creative Claw tool call that exposes it, pass the optional `skills_used` array with `creativeclaw-render-html`, any other Creative Claw skills actually followed, and guide entries in the form `<skill-name>/<relative-guide-path>` (for example, `creativeclaw-render-html/references/workflow-basics.md`). Include only skills and guides followed for that call. Omit attribution if the user declines tracking or the field is unavailable. Never send other plugin names, private data, or local paths.

Read [shared execution guidance](references/workflow-basics.md) once per task before using tools. It covers existing authorization, model discovery, optional cost checks, imports, and recovery.

Three tools:

- `render_html_image`: a fixed-size HTML/CSS layout to a PNG. It completes synchronously; do not call `check_job` for it.
- `generate_html_video`: Creative Claw's own video agent makes a motion-graphics video. It writes the HyperFrames composition, makes the images, voiceover, music and sound it needs, checks the result, and renders it. You send a prompt, not HTML.
- `render_html_video`: renders a HyperFrames HTML/CSS/JS composition or project ZIP you supply. It returns a queued job; resolve it with `check_job` when the final URL is needed.

Which video tool: use `generate_html_video` unless the user supplied the HTML or project, or you have HyperFrames authoring skills installed in this session (a `hyperframes` skill in your skill list) and can write and check the composition yourself; in that case author it and use `render_html_video`. If the user asks for one of the two, follow that.

Older clients may not list `generate_html_video`. There the same agent is `render_html_video` with `method: "generate"`, `method: "edit"` (with `cloud_project_id`) and `method: "status"`.

This is an explicit-only route. A poster, banner, social card, overlay, intro, outro, or video that needs text is not by itself a reason to use it. Use `creativeclaw-generate-image` or `creativeclaw-generate-video` unless the user asks for HTML, CSS, HyperFrames, or code-driven rendering, supplies HTML, accepts the method when offered, or explicitly asks for motion graphics, kinetic typography, animated titles, or an animated explainer. If the user names an image or video model, that choice wins.

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

## Make a video with the video agent

`generate_html_video` hands the brief to Creative Claw's own cloud agent. It writes the composition with the HyperFrames best practices built in (seekable timelines, text fit, safe zones, audio mixing, beat-synced motion), generates the images, voiceover, music and sound effects the brief calls for, checks the result, and renders the finished MP4 with audio. You write no HTML and read none of the composition references below. Use it when the user explicitly asks for that kind of video: motion graphics, kinetic typography, an animated explainer or promo, a lyric video, or animated captions and titles over supplied media.

1. Write the brief as `prompt`: what the video is for, the exact on-screen copy and narration script when the user gave them, the visual style, the music, and the ending. Say what matters most. Pass `duration`, `width` and `height`.
2. Pass the user's own images, footage, audio and logos as `reference_assets`, each with a `description` of its role. Import local or attached media first.
3. To start from an existing project instead of a blank one, also pass it as `project_url` (a public ZIP, such as the `zipUrl` of a ZIP example from `search_examples`) or `project_asset_id` (a ZIP in the workspace). It is unpacked as the starting project and the agent builds on it, keeping its scenes and motion and changing what the brief asks. Pass that project's own `duration`, `width` and `height` unless the user wants them changed. This is how to turn a template into the user's video, or to continue a project the user edited elsewhere.
4. Set `effort` to what the user asks for: `light` for simple changes and basic videos, `medium` (default) for most videos, `high` for complex or polished work. Higher effort is slower and costs more. Do not change it silently.
5. `media_budget_credits` caps what the agent may spend on generated media in the turn (default 200). Pass `0` when the user wants no generated media, or a lower number when they set a limit. The agent is told its budget and plans around it.
6. The call returns a `cloud_project_id` and a turn takes several minutes. The video card follows progress on its own, then plays the video and offers the download and a Request changes box. One call gives one card for the whole turn, so call nothing to wait.
   - In Review mode the turn does not start: the card shows the request (prompt, assets, effort, media budget, estimated cost) and the result says `status: "awaiting_approval"`. Tell the user it is ready to review and that Generate in the card starts it. One call is enough for the request.
   - `check_job` with the `cloud_project_id` as `job_id` is for you, not the user: it returns the state, the video `url`, the agent's summary, the final cost and the media it generated, and shows the user nothing; the video card stays their view. Call it when you need the outcome to answer or continue, never in a loop.
   - When the user changes the video from the card, the card updates in place and reports the result to you. Do not repeat their edit.
7. For changes the user asks for, call `generate_html_video` again with the `cloud_project_id` and the feedback as `prompt`. It keeps the project and renders again. Small fixes suit `effort: "light"`.

```text
generate_html_video({
  prompt: "A 30-second explainer for a budgeting app: three benefits as bold kinetic titles over clean UI-style graphics, warm upbeat narration in English, light electronic music, end card with the app name and 'Get the app'.",
  duration: 30,
  width: 1920,
  height: 1080,
  effort: "medium"
})
```

Each turn, a new video or a change, holds 200 credits when it starts and settles the real cost when the agent finishes, from the agent's work plus the media it generated. A failed turn is not charged. Tell the user the final cost the result states. For a cost question before starting, use `estimate_generation` with `operation: "html_video"` and `params.method` set to `"generate"`, or `"edit"` for a change.

Write and render the HTML yourself (next section) only when the user supplied HTML, wants a project rendered exactly as it is, or needs exact control of the code.

## Render your own HTML video

Choose the source:

- **Single HTML (default):** pass `html` for short, self-contained motion.
- **Full project ZIP:** only for a ZIP example selected from `search_examples` or a HyperFrames project the user already has. Pass `project_url` for an unchanged public ZIP, or `project_asset_id` for an uploaded or edited one. Read [project packaging](references/project-packaging.md). Complexity alone is not a reason to start a ZIP project.

To find a starting point, call `search_examples` with `render_type: "html_video"`, then load one selected result with `search_examples({ id })`. Read [example discovery](references/example-discovery.md). A generative prompt is not HTML.

1. Set duration, even width and height, FPS, format, exact copy, and source media. Keep an HTML choice the user already made.
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
