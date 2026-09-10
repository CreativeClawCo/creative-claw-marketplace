# Cut-and-reframe input contract

The tool executes your selections; it neither finds highlights nor transcribes. Outputs: one H.264/AAC MP4 (no audio stream if the source is silent), a JSON technical report and a contact sheet. Poll `check_job` for their durable URLs.

Defaults: 1080×1920, source average frame rate converted to constant frame rate, 30ms edge fades, no loudness normalization, padding, no captions. Width and height are independent, so 9:16, 16:9, 1:1, 4:5 and other even dimensions from 128–1920 are accepted. The input may itself be landscape, portrait or square; framing determines whether it is padded or cropped into the requested output without stretching. Frame quantization changes each selected duration by at most half an output frame. Do not claim sample-exact source boundaries. Source limits: 4 hours, 10GB and up to 60fps. Supported explicit fps strings: `24`, `25`, `30`, `50`, `60`; `source` retains a rational rate such as 30000/1001.

Example: two chosen passages, captions supplied only for the actual words retained (illustrative timings—replace with real alignment):

```json
{
  "video_url": "https://YOUR_CREATIVE_CLAW_CDN/source.mp4",
  "name": "Interview — the useful takeaway",
  "segments": [
    {"start": 12.1, "end": 15.9, "framing": {"mode": "pad"}},
    {"start": 40.2, "end": 44.8, "framing": {"mode": "pad"}}
  ],
  "width": 1080,
  "height": 1920,
  "captions": {
    "style": "plain",
    "words": [
      {"start": 12.3, "end": 12.7, "text": "Example"},
      {"start": 40.4, "end": 40.8, "text": "Takeaway"}
    ]
  }
}
```

For a verified 1920×1080 source, a 606×1080 crop is approximately 9:16. A two-second segment can use:

```json
{"mode":"crop","width":606,"height":1080,"keyframes":[
  {"time":0,"x":400,"y":0},
  {"time":2,"x":700,"y":0}
]}
```

Those coordinates are examples, not a face detector. Set keyframes from actual observations. Static framing uses `x`/`y` instead of `keyframes`. Maximum 20 keyframes per segment. Rotation is applied before coordinates are interpreted.

Captions are omitted unless the `captions` object is supplied. When present, captions accept 1–10,000 source-timed words in source order, `plain` or `karaoke`, `words_per_caption` 1–7 (default 3), and installed Noto Sans, Hebrew, Arabic, CJK SC/JP/KR fonts. The renderer remaps words even when source ranges are reordered. Caption text cannot inject ASS formatting. It does not accept SRT/ASS files, preserve selectable subtitle streams, or accept arbitrary styles; captions already burned into the source remain visible as pixels.

Pilot billing is stated in the runtime tool description, separate from transcription or later subtitling. `estimate_generation` does not estimate this edit operation. Never treat example timings, pricing or schemas as a substitute for current tool output.
