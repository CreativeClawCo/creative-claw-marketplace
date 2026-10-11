# HeyGen Lipsync

Model: `video/heygen-lipsync`, direct HeyGen API. Use for an existing video plus a finished replacement recording. For a still image, use HeyGen Avatar 4 instead.

Call `get_model_params` for current options, then `estimate_generation` with the exact source and audio. Generate speech first when using a cloned or designed Character voice. Submit one video in `video_urls`, one recording in `audio_urls`, a short descriptive `prompt`, and optional `extras.mode`: `speed` (default) or `precision`. Prompt is not sent to HeyGen. Poll the same Creative Claw job with `check_job`; the completed video is saved in the workspace library.

Speed costs 3 credits per delivered second; Precision costs 6. Both inputs are measured before quoting and charging. The reservation uses the longer input, or the source duration when dynamic duration is disabled, then completion settles against measured output. Partial ranges can retain full source duration and are not priced as a guaranteed shorter clip. Failed duration measurement stops before charging.

Optional extras: `start_time`, `end_time` in source seconds; `keep_the_same_format` (default true); `enable_dynamic_duration` (default true); `disable_music_track`, `enable_speech_enhancement`, `enable_watermark` (default false); `fps_mode` (`vfr`, `cfr`, `passthrough`); `title`. No output resolution, aspect ratio, duration, image, Character, or native speech control. Captions are generated automatically by HeyGen; deprecated `enable_caption` is deliberately omitted. Keep speech enhancement off when the supplied performance should be retained.

No manual speaker-selection field is documented; use `video/sync-3` for that workflow. Language-specific quality is unverified. Do not transfer HeyGen translation language counts to this operation.

Provider contract checked 2026-10-11: [Create](https://developers.heygen.com/reference/create-lipsync), [Poll](https://developers.heygen.com/reference/get-lipsync), [Pricing](https://help.heygen.com/en/articles/10060327-heygen-api-pricing-explained). Uses an idempotency key and durable polling. Customer callbacks, HeyGen asset IDs and folder IDs are not exposed.
