# Audio and media
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
    window.__timelines = window.__timelines || {};
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

For single HTML, import local/attached media through available Creative Claw asset tools, inspecting their schemas first. ZIP projects may instead bundle media and reference it by project-relative paths. Use permanent, worker-accessible HTTP(S) URLs; when one source supplies picture and sound, use its imported permanent asset URL for both. Authoring a filename or browser blob URL does not upload bytes. Inline composition code is supported; this does not imply inline audio support.

## Timed footage and sound

```html
<video id="footage" src="https://YOUR_ASSET_HOST/source.mp4"
  data-start="0" data-duration="8" muted playsinline></video>
<audio id="source-audio" src="https://YOUR_ASSET_HOST/source.mp4"
  data-start="0" data-duration="8" data-volume="1"></audio>
```

Replace the illustrative URLs with real imported asset URLs. Keep `src` directly on each element, unique audio IDs, and explicit timing. Omit audio for deliberately silent output. For single HTML, audio `data:`, `blob:`, relative paths, and `<source>`-only markup are unsupported; use absolute HTTP(S) for video too. ZIP projects support bundled relative audio/video paths. Preserve intended silence, muted footage and zero volume; do not add or remove audio without user intent. Do not add `crossorigin` to video/audio; let HyperFrames seek and play them. Do not call `play`, `pause`, or set `currentTime` in composition code.

Avoid double timing: do not put `data-start` on both a plain wrapper and its nested timed video. Put a timed video inside an untimed crop wrapper, and animate the inner visual/crop transform as appropriate. Set full-frame geometry and intentional `object-fit` so source and output aspect ratios do not stretch. Distinguish intentional cropping from preserving the complete frame with padding.

## Narration, music, and reactive motion

Use supplied or authorized generated narration and music, then align beats to actual media timing. Speech generation is a separate workflow; rendering HTML does not synthesize a voice. Layer each source with its own ID/start/duration. `data-volume` gives a baseline; GSAP volume tweens can express fades/ducking on runtimes that support encoded automation. Their targets replace the baseline, so use the actual intended gains rather than assuming multiplication.

For audio-reactive graphics, precompute an amplitude/beat envelope when tools are available and inline the resulting numeric data. Sample/interpolate it from composition time. Live microphone input or a realtime WebAudio analyser is not a reliable offline clock. Browser audio playback does not establish that the encoder mixed the track.

The existing single-HTML renderer has authored-audio validation; the ZIP pilot does not offer equivalent automatic audio validation. Silence alone does not establish a defect, and no audio is a valid deliverable. A completed job still needs a listening check for timing, clipping, channel balance, and intelligibility; detection of nonzero samples alone is not quality verification. Do not add a dummy audio track to work around silence validation.
