---
name: creativeclaw-submit-feedback
description: "Send actionable feedback to the Creative Claw team. Use when the user reports a bug, generation-quality problem, confusing workflow, missing feature or model, request, or explicit praise."
---

# Submit Feedback

Turn the user's report into one concise, useful `submit_feedback` call. Feedback is a support channel; it is not a generation tool and does not guarantee a reply or roadmap commitment.

## When to use

- A tool failed, returned the wrong state, or behaved inconsistently.
- An image, video, or voice result had a repeatable quality problem.
- A workflow or instruction was confusing.
- The user asks for a missing feature, integration, format, or model.
- The user explicitly asks to send praise or product feedback.

Do not submit ordinary dissatisfaction without enough context, silently report generation failures, or use this skill when the user only wants help revising media. If you observed the issue rather than receiving an explicit request, offer to report it and wait for approval.

## Build the report

Include the user's intended outcome, what happened, expected behavior, useful reproduction details, model or tool involved, and practical impact. Exclude secrets, credentials, unnecessary personal information, and unsupported guesses.

Map the report to the exact schema:

- `category`: `bug`, `missing_feature`, `confusing`, `praise`, or `other`
- `source`: `user` when explicitly requested or relayed; `agent` for an agent-observed product issue
- `message`: the concise report
- `attemptedTask`: the task the user was trying to complete, when relevant
- `toolName`: the exact MCP tool involved, when known

## Submit and continue

After the user asks or approves, call `submit_feedback` once per distinct issue. Confirm what category was sent without promising a response. If the user still needs help, continue with a safe workaround or corrected workflow after submitting.
