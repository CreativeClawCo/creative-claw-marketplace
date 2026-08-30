# Queued jobs and `check_job`

Creative Claw may return a completed result immediately or a queued job. Trust the response shape instead of assuming a model is synchronous.

## When to poll

- The inline media viewer can monitor image and video generation for the user. Do not add redundant polling only to display the result.
- Call `check_job` when the current client has no monitoring UI, when the user asks for status, or when a follow-up tool needs the completed URL.
- `generate_video` is normally queued. `generate_image` varies by model/provider. `transcribe`, `isolate_audio`, and some processing operations are queued.

## Pattern

1. Save the returned `jobId` or job ID.
2. When resolution is necessary, call `check_job({ job_id: "..." })`.
3. Continue until `completed` or `failed`, using the cadence suggested by the tool response. Do not poll faster than every few seconds.
4. On completion, take the durable result URL from the completed payload.
5. On failure, surface the error. Do not silently change models or resubmit a paid request.

Possible states include `queued`, `in_progress`, `completed`, and `failed`. A job ID is not a finished asset.

## Multiple jobs

Submit independent, user-approved generations in parallel when the client permits it. Keep each job ID associated with its intended shot or asset. Poll only when the downstream workflow needs the results.

## Stalled work

If a job remains pending well beyond the tool's estimate, provide one concise status update and stop repeated polling after a reasonable cap. Preserve the job ID so the user can resume checking. Never submit a replacement charge without confirmation.
