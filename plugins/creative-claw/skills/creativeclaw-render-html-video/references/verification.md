# Verification and troubleshooting

## Before submission

Inspect the exact final HTML or ZIP project: fixed root dimensions/duration match output options, IDs are unique, timeline registration follows setup, assets resolve through public URLs (single HTML) or bundled relative files (ZIP), and every visible state is seekable. Review the first frame, entrance/exit boundaries, midpoint, reading holds, and last encoded frame (roughly `duration - 1/fps`). Test repeated/backward seeks such as `0, 2, 1, 2`; matching timestamps should reproduce the same state.

Use local HyperFrames checks **when the CLI, browser, and needed dependencies are available**. Inspect the installed version/help before selecting flags. Typical commands from a local project directory are `npx hyperframes check --snapshots` and `npx hyperframes snapshot`; `check` already includes lint. Do not silently install/upgrade a toolchain solely because an upstream skill does so. A local project can hold the exact submitted document as `index.html`, but local assets or sidecar files are not transmitted with the HTML string. ZIP projects transmit bundled files; check their paths and Git LFS hydration before uploading.

Without local tooling, perform source review and use exposed preview/inspection tools if available. State which checks were unavailable. Do not claim that the remote service always performs `check`, offers a preflight endpoint, or shares the local CLI version. Browser inspection and local checks do not prove remote compatibility.

## After an authorized render

Poll the returned job ID through `check_job` using its actual schema. A queued/in-progress job is not a finished video. Inspect failures before starting another job; do not blindly resubmit while an existing job is running. After completion, inspect the output and confirm duration, dimensions, FPS, framing, text fit, motion, and sound through available media tools. Report unverified properties honestly. Respect existing cost authorization; get direction before consequential retries outside it.

## Diagnose by symptom

| Symptom | Inspect first |
| --- | --- |
| Registration/readiness timeout | First script/load error, unfinished setup promise, exact root/timeline key, premature registration, failed dependency requests. |
| Static canvas or wrong backward seek | Whether the time driver actually redraws; suppressed callbacks; delta accumulation; stale uniforms/textures; adapter availability. |
| Blank WebGL or black capture | Context creation, shader/link logs, viewport and canvas size, camera/material visibility, drawing-buffer lifetime, texture access. |
| Content collapsed or clipped | Explicit root/ancestor sizes, actual fonts, inline transforms, text wrapping, peak overshoot, z-index. |
| Missing or unsynchronized media | Worker-accessible direct `src`, audio ID, nested timing, source range, separate audio track, actual encoded sound. |
| Local success but remote failure | Exact submitted HTML, external requests, library versions, worker version/deployment if exposed, GPU/browser capabilities, workload. |
| DOM motion audit says static but shader moves | Pixel samples at distinct times; DOM bounding boxes do not describe canvas contents. Do not add meaningless DOM motion to appease an audit. |

Preserve the failing composition, exact options, job ID/error, and known runtime versions when available. Reduce one variable at a time: assets, shaders, geometry, resolution, duration. Distinguish observed evidence from a hypothesis. No automatic feedback message or public reproduction upload is part of this workflow; send only when explicitly requested.

## Bundled example validation status

`assets/webgl-orbit.html` is a complete 640×360, four-second document with a pinned external GSAP script and no other assets. It initializes a visible frame and a paused timeline. In a plain browser, seek with `window.__timelines.orbit.time(2, true)`; a paused initial frame is expected. Submit its file **contents** as `html` with width 640, height 360, duration 4, and FPS 30 when rendering is authorized.

Validated locally on 2026-09-08 with HyperFrames 0.8.30 on macOS/Apple M4 Pro: `check --snapshots` passed with no lint/runtime/layout/motion findings and 5/5 contrast checks. A four-second MP4 rendered successfully at 640×360, 30 FPS, 120 frames. This bundled example has not been rendered remotely; local success does not certify every worker/GPU configuration. The separately reported spiral-galaxy success on local HF 0.8.30 and remote rendering is evidence for that composition only.

## Adaptation sources

Read from the actual installed HyperFrames entry, core, animation, and CLI skills; core references `minimal-composition`, `determinism-rules`, `variables-and-media`; animation adapters `gsap`, `three`, `html-in-canvas-patterns` and rules `discrete-text-sequence`, `cursor-click-ripple`; CLI reference `lint-validate-inspect`. This skill adapts their composition mechanics to Creative Claw's single-HTML and full-project ZIP methods. It does not inherit their project installation, mandatory local checks, automatic feedback, or assumptions about worker features.
