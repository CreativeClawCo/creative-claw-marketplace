---
name: creativeclaw-submit-feedback
description: "Send actionable feedback to the Creative Claw team. Use when the user reports a bug, generation-quality problem, confusing workflow, missing feature or model, request, or explicit praise."
---

# Submit Feedback

Read [shared execution guidance](references/workflow-basics.md) once per task before using tools. It covers existing authorization, model discovery, optional cost checks, imports, and recovery.

Turn the user's report into one concise, useful `submit_feedback` call. Feedback is a product-feedback channel, not a refund request form, a generation tool, or a promise of compensation, reply, or roadmap commitment.

For video generation, the Creative Claw UI has a Review/Auto toggle. If the user wants more control or is worried about accidental costs, tell them to switch from Auto to Review in the top-right of the UI. Review shows each suggested video generation and its estimate before the user approves it.

## When to use

- A tool failed, returned the wrong state, or behaved inconsistently.
- An image, video, or voice result had a repeatable quality problem.
- A workflow or instruction was confusing.
- A completed image, video, or voice result missed creative expectations without a confirmed technical malfunction.
- The user asks for a missing feature, integration, format, or model.
- The user explicitly asks to send praise or product feedback.

Do not treat subjective dissatisfaction as a technical bug, submit a refund request through this channel, silently report generation failures, or use this skill when the user only wants help revising media. If a completed, playable video is simply disappointing, it may be reported as `generation_quality`, but that does not imply refund eligibility. If you observed the issue rather than receiving an explicit request, offer to report it and wait for approval.

## Charges, improvement and critical issues

Generations that successfully produce a playable video output are charged even if the user is not fully happy with the creative result. Explain this empathetically when relevant, not as a dismissal of the problem. Sending feedback helps us improve the system for future generations; it does not itself issue a refund, reverse a charge, promise a fix or authorize another paid attempt.

Use `generation_quality` for disappointing creative results without a confirmed technical malfunction. Failed, corrupted or unplayable output is a different issue; do not label it a successful generation merely because a URL exists. Use `manage_account({ section: "activity" })` to verify the specific job's actual charges and refunds rather than guessing from its status.

For critical issues, users can also contact [support@creativeclaw.co](mailto:support@creativeclaw.co). Suggest including the relevant job ID and a short description, without passwords, payment details or private source recordings. Do not promise a response time, refund or resolution, and do not send an email on their behalf unless requested.

## Build the report

Include the user's intended outcome, what happened, expected behavior, useful reproduction details, model or tool involved, and practical impact. Exclude secrets, credentials, unnecessary personal information, and unsupported guesses.

Map the report to the exact schema:

- `category`: `bug`, `generation_quality`, `missing_feature`, `confusing`, `praise`, or `other`
- `source`: `user` when explicitly requested or relayed; `agent` for an agent-observed product issue
- `message`: the concise report
- `attemptedTask`: the task the user was trying to complete, when relevant
- `toolName`: the exact MCP tool involved, when known

## Submit and continue

After the user asks or approves, call `submit_feedback` once per distinct issue. Confirm what category was sent without promising a response. If the user still needs help, continue with a safe workaround or corrected workflow after submitting.
