# Async Jobs and `check_job`

Several Creative Claw tools are asynchronous — they submit work to a queue and return immediately with a job ID. You poll for completion with `check_job`.

## Which tools are async

- `generate_video` — always async. 30 s – 2 min typical.
- `generate_image` — async on some models (heavy ones); sync on most. The response shape tells you which.
- `generate_3d_model` — async. Can take several minutes.
- `transcribe` — async. 30 s – 3 min depending on audio length.

## The shape

**Async submission:**
```json
{ "jobId": "abc-123", "status": "queued" }
```

**Polling:**
```
check_job({ jobId: "abc-123" })
```

Returns one of:
```json
{ "status": "queued" }
{ "status": "in_progress" }
{ "status": "completed", "result": { /* tool-specific payload */ } }
{ "status": "failed", "error": "..." }
```

## Polling pattern

1. Call the async tool. Save the `jobId`.
2. Poll `check_job` every 5–10 seconds.
3. Stop on `completed` (return `result` to the user) or `failed` (surface the error).
4. Cap at a reasonable timeout. For video gen: 5 minutes. For transcription: 10 minutes.

## Don't block the user

When the job is going to take more than ~10 seconds:

- Tell the user up front: *"Generating now — videos take 30 s – 2 min. I'll check on it."*
- Poll without flooding them with status messages. One update at job start, one at completion. If it's taking unusually long (≥ 1 min for video), one mid-update is reasonable.
- If the user asks something else while a job is running, you can keep polling between turns or wait for them to ask "is it done?"

## Parallel jobs

For multi-asset workflows (generate 5 video clips, transcribe 4 source files):

- Fire all jobs in parallel — multiple tool calls in one message.
- Save all `jobId`s.
- Poll each with `check_job`. Total wall time ≈ slowest job, not sum.

## Failure modes

- **Soft failures** (model returned an error) → `status: "failed"` with an `error` string. Show the user, suggest retry or different model. Failed generations are refunded automatically — you don't pay for failures.
- **Stuck jobs** (no status change for several minutes past the typical window) → tell the user, stop polling, suggest re-submitting.
- **Network errors on `check_job`** → retry once, then surface.

## Don't

- **Don't claim the result is ready when you only have a `jobId`.** Always wait for `status === "completed"`.
- **Don't poll faster than every 3 s.** Wastes credits' worth of API calls and adds no signal.
- **Don't poll forever.** Cap and bail.
- **Don't re-submit on `in_progress`** — that's a new job, not a retry.
