---
name: creativeclaw-add-video-intro-outro
description: "Add an intro, outro, or both to an existing video with Creative Claw. Use when the user wants title cards, logo stings, opening copy, closing calls to action, or supplied bookend clips merged around a main video."
---

# Add Video Intro and Outro

Read [shared execution guidance](references/workflow-basics.md) once per task before using tools. It covers existing authorization, model discovery, optional cost checks, imports, and recovery.

Create or reuse opening and closing segments, then concatenate them around the main video. This skill owns the bookend workflow and final merge; it does not assume the intro or outro must be HTML-rendered.

## Choose the segment source

- If the user supplies intro or outro clips, import them and use those clips.
- If the user explicitly asks for HTML, HyperFrames, or code-rendered title cards, use `creativeclaw-render-html-video` for the requested segments.
- If the user asks for an intro/outro but has not chosen how to create it, suggest HTML rendering as a strong option for exact text, fonts, colors, and logos. Wait for explicit acceptance before calling `render_html_video`.
- If the user wants generative cinematic footage, use `creativeclaw-generate-video` instead.

This boundary matters: an intro/outro request alone does not authorize the HTML video tool.

## Workflow

1. Identify the main video's durable URL, dimensions, aspect ratio, frame rate, audio, and intended platform. Import local or attached files before editing.
2. Use the requested segments, copy, logo, duration, audio, and transition choices. Infer minor styling defaults; ask only about missing copy or a material unresolved choice, and do not repeat earlier approvals.
3. Create or load the intro and outro. Match the main video's width, height, frame rate, and preferably codec. Use `scale_video` or `trim_video` before assembly when necessary.
4. Resolve every queued segment job with `check_job` and inspect each clip before merging.
5. Call `merge_media({ operation: "merge_videos", video_urls: [...] })` in exact playback order: intro when present, main video, then outro when present.
6. Resolve the merge job with `check_job`, inspect the cut points, audio, dimensions, and total duration, then give the final asset a useful name and tags when supported.

## Example: explicit HTML bookends

For “Use HTML to add a 2-second logo intro and a 3-second CTA outro to this video”:

1. Render the intro with `creativeclaw-render-html-video` at the main video's dimensions and FPS.
2. Render the outro the same way.
3. Resolve both jobs.
4. Merge in order:

```text
merge_media({
  operation: "merge_videos",
  video_urls: ["<intro-url>", "<main-video-url>", "<outro-url>"]
})
```

5. Resolve the returned merge job with `check_job`.

If only one bookend is requested, omit the other URL. If finished intro/outro clips were supplied, skip HTML rendering and merge them directly.

## Gotchas

- `merge_videos` is a hard concatenation; it does not create dissolves, crossfades, or audio transitions. Design the last frames of the intro and first frames of the outro to meet the main clip cleanly, or explain when the requested transition needs a different editing path.
- Mismatched resolution or codec can produce poor joins. Normalize segments before merging.
- Preserve exact visible copy and logo treatment. Keep bookends short unless the user specifies otherwise; do not invent a slogan or call to action.
- HTML-rendered segments and the merge are asynchronous. A job ID is not a finished clip.
- If the main video's audio must continue under a bookend or fade across a cut, simple concatenation is insufficient. Surface that limitation before rendering segments.
