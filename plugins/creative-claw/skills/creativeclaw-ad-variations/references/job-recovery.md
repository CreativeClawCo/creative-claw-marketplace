# Jobs and recovery

Trust the returned status. A job ID means submitted work, not a completed asset. Keep the job ID, model, intended output/shot, inputs, and any finished URL associated throughout the task.

## Pending or interrupted work

- Let an available inline viewer monitor a standalone result. Use `check_job({ job_id })` when the user requests status, when no viewer monitors it, or when another tool needs the finished URL.
- Follow any returned polling cadence; do not busy-poll. Continue dependent work only after a completed result supplies the required URL.
- If an execution turn ends while work is pending, retain the job IDs and next steps. Resume those jobs before submitting replacements. Search saved project/asset state if the conversation no longer contains the result.
- A timeout or lost response is not evidence that generation failed. Check the known job first. If no job ID was returned, inspect recent relevant assets/project state; if submission remains uncertain, explain the uncertainty before any replacement that might duplicate paid work.
- A completed merge can still request `continuationRequired`; follow [media-assembly.md](media-assembly.md) before calling the entire deliverable finished.

## Failed work

For video generation, the original request does not authorize another attempt after an accepted job fails. Ask before retrying unless the user explicitly requested that retry or a finite number of attempts. `retryable: true`, no charge, or a refund does not grant permission. Only a confirmed input rejection before any job was accepted or started, with no charge, can be corrected and resubmitted under the original request. Resolve uncertain submissions through status and asset checks, not speculative replacement calls.

Read `isError`, status, and `structuredContent` when present. Prefer normalized `errorCode` and `errorCategory` over interpreting provider prose. Older responses may omit structured recovery fields; do not invent them.

| Result | Next action |
| --- | --- |
| Invalid input, unsupported parameter, inaccessible reference | Correct the specific field or import route using current schemas. Retry within the existing request only when rejection occurred before paid work was accepted; otherwise check the job/charge state first. |
| Temporary provider/capacity issue with `retryable: true` | Respect the suggested wait and confirmation flags. Retry only within existing retry authorization, with a bounded attempt count; never loop indefinitely or silently switch providers/models. |
| Non-retryable failure | Stop polling the terminal job. Explain the concrete input, provider, or account problem and the available next action. |
| Content-policy rejection | Treat the job as terminal. Do not resend the unchanged rejected request or route around safeguards. Offer an appropriate compliant revision. A suggested model is advisory, not automatic authorization. |
| Balance/access block | Explain the reported restriction. When the user wants cost/budget help, use the estimator for supported requests; do not repeatedly submit blocked generations. |

Obey `requiresUserConfirmation`, `requiresPromptRevision`, and `requiresLikenessRightsConfirmation` when returned. Use `suggestedAction`, `suggestedModel`, and `suggestedModelInput` only if they fit the user's intent and the current schemas. Do not spend on a replacement paid generation without applicable user authorization.

Report `creditsCharged` and `creditsRefunded` only when supplied; missing values are unknown, not zero. Distinguish a returned refund amount from a promised future refund. Explain the failure and the smallest useful next action without dumping raw provider diagnostics. Continue unrelated in-scope work and preserve completed outputs.
