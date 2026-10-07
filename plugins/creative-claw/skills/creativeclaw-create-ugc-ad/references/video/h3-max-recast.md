# H3 Max Recast

For face/person swaps, prefer [Kling Motion Control Pro](kling-motion-control.md) with a prepared source-scene image and facial identity binding. `video/minimax-h3-max-recast` remains an alternative for explicitly selected multi-person or multi-shot recasting. It aims to retain action, camera, cuts, framing and soundtrack, but does not guarantee face-only changes or unchanged clothing and other people. Honor an explicit model choice; this is the dedicated Recast model, not general H3 Max.

Inspect `get_model_params` for current availability and controls. Pass exactly one source video in `video_urls` and 1 to 4 ordered replacement-person photos in `image_urls`, one photo per new person. A saved Character photo is appended and counts toward that limit. Default assignment follows people from left to right. Use a concise prompt to specify who becomes whom; pass `prompt: ""` for the default assignment. The prompt limit is 2,000 characters.

The source must be 5 to 30 seconds, with every individual shot at most 15 seconds. Total duration is measured before quoting or charging, but local cut detection is unavailable, so inspect cuts before using a source over 15 seconds. Trim unsuitable footage first and wait for its completed URL. Do not add a duration, aspect ratio, first/last frame or separate audio reference; the source defines these.

Resolution accepts `768P` or `1080P` (default), with optional nonnegative `extras.seed`. Snapshot pricing is 60 or 90 credits per output second respectively. Reuse live pricing and use `estimate_generation` when the user asks about cost or sets a budget. Submit with `generate_video`; use `check_job` when another tool needs the completed URL or no inline viewer monitors the job.

This keeps the source soundtrack rather than synthesizing a new voice or translating speech. If rewritten dialogue is requested, plan its voice and lip-sync work separately. Do not imply that a visual recast also changes the script.
