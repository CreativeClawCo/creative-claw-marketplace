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

It is not the right tool for photorealistic scene invention, character motion, or cinematic generative footage.

## Workflow

1. Confirm that the user explicitly wants the HTML/HyperFrames route. Establish duration, even-numbered width and height, FPS, output format, exact copy, and source media.
2. Import local or attached media and use durable public HTTP(S) URLs in the HTML. For overlays, match the source video's aspect ratio and dimensions; scale or pad the source first when necessary.
3. For branded work, call `get_theme` and use its approved fonts, colors, logos, and motion character.
4. Author a deterministic HyperFrames composition. Prefer one fixed-size root with `data-composition-id`, `data-width`, `data-height`, and `data-duration`; use a single paused GSAP timeline registered as `window.__timelines[compositionId]` for advanced animation. Plain CSS keyframes also work for simple motion.
5. Call `render_html_video` with `html`, `duration`, `fps`, `width`, `height`, `format`, `name`, and `tags`. Rendering is asynchronous: resolve the returned job with `check_job` when the final URL is needed.
6. Inspect text fit, safe zones, animation timing, media sync, encoded dimensions, and audio before using the output in another edit.

Use 24 FPS for a cinematic cadence, 30 FPS for normal graphics, and 60 FPS only when the extra smoothness justifies the cost. The renderer normalizes other positive values to 24, 30, or 60, so request one of those directly.

## Example: text over an existing video

This pattern keeps media playback under HyperFrames control. Replace `SOURCE_URL`, dimensions, duration, copy, and theme values. Keep the video muted and add a separate `<audio id>` only when the approved source audio should remain.

```html
<!doctype html>
<html><head>
  <script src="https://cdn.jsdelivr.net/npm/gsap@3.14.2/dist/gsap.min.js"></script>
  <style>
    html,body{margin:0;background:#000;overflow:hidden}
    #overlay{position:relative;width:1920px;height:1080px;overflow:hidden;font-family:Inter,sans-serif}
    #source{position:absolute;inset:0;width:100%;height:100%;object-fit:cover}
    #copy{position:absolute;left:96px;right:96px;bottom:88px;color:#fff;font-size:84px;font-weight:800;line-height:.98;text-shadow:0 4px 28px #000}
  </style>
</head><body>
  <main id="overlay" data-composition-id="overlay" data-width="1920" data-height="1080" data-duration="8">
    <video id="source" src="SOURCE_URL" data-start="0" data-duration="8" muted playsinline></video>
    <section class="clip" data-start="0" data-duration="8"><div id="copy">Your exact launch copy</div></section>
    <audio id="source-audio" src="SOURCE_URL" data-start="0" data-duration="8" data-volume="1"></audio>
  </main>
  <script>
    const tl=gsap.timeline({paused:true});
    tl.fromTo('#copy',{y:56,opacity:0},{y:0,opacity:1,duration:.6,ease:'power3.out'},.35)
      .to('#copy',{y:-24,opacity:0,duration:.4,ease:'power2.in'},7.35);
    window.__timelines.overlay=tl;
  </script>
</body></html>
```

```text
render_html_video({
  html: "<the composition above>",
  duration: 8,
  fps: 30,
  width: 1920,
  height: 1080,
  format: "mp4",
  name: "launch-overlay-v1",
  tags: ["launch", "overlay", "html-video"]
})
```

If the source should be silent, omit the `<audio>` element. If the audio source differs from the video, use its own durable HTTP(S) URL.

## Example: standalone title card

For a short title card, the same root can omit `<video>` and animate a full-bleed background, logo, headline, and subtitle. A minimal call might use `duration: 2`, `fps: 30`, and dimensions matching the video it will precede. Fade visual elements to the intended final cut color before the last frame so a later hard concatenation feels deliberate.

## Example: timed lower third

Keep the source video full-frame, use a `section` covering the full duration, and animate a lower-third panel in at 1.0 seconds and out at 4.5 seconds on the single paused timeline. Keep important copy inside roughly 5–10% safe margins, especially for vertical social crops.

## Gotchas

- Width and height must be even numbers. Keep the root explicitly sized; `height: 100%` collapses when its ancestors have no resolved height.
- Use absolute HTTP(S) URLs for media. Relative paths, `data:`, and `blob:` media are unsupported. Put `src` directly on `<video>` and `<audio>` rather than relying on `<source>` children.
- When the same source supplies both picture and audio, import it as a permanent Creative Claw asset before using that URL in both elements.
- Every `<audio>` needs a unique `id`. Do not add `crossorigin` to `<video>` or `<audio>`.
- Let HyperFrames own media playback. Do not call `play()`, `pause()`, or set `currentTime` in composition code.
- Do not put `data-start` on both a plain wrapper and its nested `<video>`. Time one or the other.
- Keep one paused timeline per composition and register it only after it is built. Root `data-duration` controls the rendered length; animation after that point is cut off.
- Avoid clocks, unseeded randomness, infinite animation repeats, and network-dependent runtime logic. Every frame must be seekable and deterministic.
- Do not set an initial CSS `transform` on an element and tween that same transform with GSAP. Put both the start and end states in `fromTo`.
- The job is unfinished until `check_job` returns a completed video URL. Longer, larger, and higher-FPS renders cost more. Respect existing authorization without a routine approval gate.

Use `estimate_generation` with `operation: "html_video"` only for user-requested cost/budget help, supplying actual duration, dimensions, and FPS in `params`. Respect existing authorization without a routine approval gate.
