# Code-driven branded video (HyperFrames + Creative Claw)

For kinetic typography, animated logos, branded title cards, data viz, lower thirds, end screens, and any deterministic frame-accurate video — author it as an HTML/CSS/JS composition and render with `render_html_video`. Creative Claw runs the render on Modal in the cloud and returns a permanent MP4 URL.

## Get the HyperFrames knowledge from its own skills

The full composition contract — timeline rules, capture behavior, scene transitions, layout-before-animation, GSAP patterns, fonts, anti-patterns — lives in the dedicated HyperFrames skills. Install them before authoring:

```
/plugin install hyperframes
/plugin install hyperframes-cli
```

Then invoke `/hyperframes` to author the composition (and `/hyperframes-cli` for `init`, `lint`, `preview`, `render`, `transcribe`, `tts`, etc. locally).

## How Creative Claw integrates

Two Creative Claw features handle the rest of the pipeline:

### 1. Cloud rendering — `render_html_video`

Pass a complete HTML string (the HyperFrames composition) and Creative Claw renders it on Modal with headless Chromium + GSAP, captures the page for `duration` seconds at `fps`, and returns an MP4 URL.

```
render_html_video({
  html: "<full HyperFrames composition>",
  duration: 8,
  fps: 30,
  width: 1920,
  height: 1080,
  format: "mp4",
  name: "product-demo-v1",
  tags: ["product-demo", "hero"],
})
```

Returns `{ jobId, status: "queued" }` — always poll `check_job` until `status === "completed"`. Typical render: 30–120 s.

`render_html_image` is the matching primitive for spot-checking a single frame quickly before committing to a full render.

### 2. Reusable video templates — `create_template` + `render_template`

Save the composition once with `{{parameters}}` placeholders, render many variants by passing parameter values. Use this for content series (one composition, swap data per episode), branded social cards across multiple posts, or anything you'll render more than twice.

```
create_template({ name, html, params: [{ key: "title", type: "string" }, ...] })
render_template({ templateId, params: { title: "..." }, format: "mp4" })
```

## Assets pipeline

Generate every visual asset the composition references first — all Creative Claw outputs are permanent URLs, so you reference them directly in `<img>`, `<video>`, `<audio>`:

- **Branded chrome (title cards, lower thirds, stat overlays)** → `render_html_image`
- **Photoreal hero images / backgrounds** → `generate_image` (always with theme reference image via `image_url` for on-brand work)
- **Cinematic clips** → `generate_video` → poll `check_job`
- **Voiceover** → `generate_speech`
- **Cutout product shots** → `generate_image` then `remove_background`

Pull the brand theme first with `get_theme` so every generation uses the right colors, fonts, logos, and photography style.

Tag every asset at generation time (`tags: ["<project>", "scene-N", "<role>"]`) so `search_assets` finds them later.

## When NOT to use this workflow

- **Photoreal motion of people, scenes, products** → use `generate_video` with an AI model, not HyperFrames.
- **Static branded image** → use `render_html_image`.
- **One-off edits to existing footage** → use the `/video-use` skill (see `edit-video.md`).
