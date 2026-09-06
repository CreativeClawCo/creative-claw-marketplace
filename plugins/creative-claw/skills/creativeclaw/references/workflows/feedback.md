# Product feedback workflow

Use `submit_feedback` to help the Creative Claw team improve the product without derailing the user's media task. Sending feedback contacts the Creative Claw team, so do it only when the user asks or approves.

## When to submit

- A tool errors, returns the wrong result, or forces a workaround → `category: "bug"`.
- The user requests a feature, workflow, or model that is unavailable → `category: "missing_feature"`.
- A tool, parameter, result, or workflow is difficult to understand → `category: "confusing"`.
- Image, video, or speech quality misses a concrete expectation → use `bug` for clearly wrong output; otherwise use `other` and describe the quality gap.
- The user explicitly praises an outcome or workflow → `category: "praise"`.

Common reports include generation artifacts, identity or style drift, poor lip-sync or audio, unexpected model behavior, missing editing controls, requests for a new image/video/speech model, and unclear errors.

## How to submit

1. State the attempted task and the exact observed problem or request.
2. Include the model ID, operation, and relevant settings when known; do not include credentials, private media, or unnecessary personal data.
3. Use `source: "agent"` for friction you observed and the user approved reporting. Use `source: "user"` when relaying the user's own words or intent.
4. Send one concise, specific report. Do not submit duplicates for the same incident.
5. Treat it as fire-and-forget. Continue the user's task and do not promise a response or resolution.

Examples:

```text
submit_feedback({
  category: "missing_feature",
  source: "user",
  attemptedTask: "Generate a cinematic product clip with a requested model",
  message: "User requested support for [model ID/name], which is not in the current video catalog."
})
```

```text
submit_feedback({
  category: "bug",
  source: "agent",
  attemptedTask: "Preserve a Character's face in image-to-video",
  message: "[model ID] completed, but the face changed substantially despite the approved Character reference."
})
```
