# Cut-and-reframe input contract

`cut_and_reframe_video` executes the cuts you choose; it neither finds highlights nor transcribes. Outputs: one H.264/AAC MP4 (no audio stream if the source is silent), a JSON technical report, and a contact sheet. Poll `check_job` for their durable URLs. The runtime schema is authoritative.

## Source and ranges

- The source must be a finalized video asset in the current workspace. Import it first; a webpage, local path, arbitrary download URL, or transcript is not source footage.
- Source limits: 4 hours, 10 GB, up to 60 fps. Rotation is applied before coordinates are read.
- Ranges are half-open `[start,end)` seconds, listed in output order. Each range is at least 150 ms; ranges must not overlap. At most 40 ranges and 300 output seconds per job.
- Reordering is allowed. Duplicating a range, speed changes, B-roll, music beds, and separate audio/video timelines are not supported.
- Frame quantization changes each range by at most half an output frame. Do not claim sample-exact boundaries.

## Output and framing

Defaults: 1080×1920, the source's average frame rate converted to constant, 30 ms edge fades, no loudness normalization, `pad` framing, no captions. Width and height are independent even integers from 128 to 1920, so 9:16, 16:9, 1:1, 4:5, and custom sizes all work from any source orientation. Explicit fps values: `24`, `25`, `30`, `50`, `60`; `source` keeps a rational rate such as 30000/1001.

Framing is set per range:

- `{"mode":"pad"}`: keeps the full frame. Use it when content matters or the subject position is uncertain.
- `{"mode":"center_crop"}`: only after checking that the subject stays inside the crop.
- `{"mode":"crop", ...}`: a source-pixel rectangle matching the output aspect ratio, with either static `x`/`y` or up to 20 `keyframes` (not both). Keyframe `time` starts at zero for that range. Odd sizes are rounded down to even, so 405×720 becomes 404×720.

For a verified 1920×1080 source, a 606×1080 crop is about 9:16. A two-second range can pan like this:

```json
{"mode":"crop","width":606,"height":1080,"keyframes":[
  {"time":0,"x":400,"y":0},
  {"time":2,"x":700,"y":0}
]}
```

Those coordinates are examples, not a face detector. Set keyframes from what you actually see. Interpolation is not face tracking.

## Captions

Omit `captions` for a clean render. When present: 1–10,000 source-timed words in source order, style `plain` or `karaoke`, `words_per_caption` up to 7 (default 3), and a `font` from Noto Sans, Noto Sans Hebrew, Arabic, or CJK SC/JP/KR. Words keep their source times; the tool remaps them after cuts, even when ranges are reordered, and burns them last. A word that straddles a cut is dropped; the cut is kept, so place boundaries between words. It does not accept SRT/ASS files, arbitrary styles, or formatting codes in caption text, and it does not carry selectable subtitle streams into the output. Captions already burned into the source stay visible.

## Audio

`audio_fade_ms` (default 30, capped at 100) fades each discontinuity to stop clicks; it does not fix a bad sentence cut. Contiguous ranges get no join fade. Original audio stays in sync. `normalize_audio` is opt-in whole-output loudness normalization, not denoising or ducking.

## Example

Two chosen passages, with captions only for words that are kept (illustrative timings; use real alignment):

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

The tool description states its charge, which is separate from transcription or later subtitling. `estimate_generation` does not cover this operation. Never treat example timings or schemas as a substitute for current tool output.
