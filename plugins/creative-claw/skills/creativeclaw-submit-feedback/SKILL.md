---
name: creativeclaw-submit-feedback
description: "Send actionable product and quality feedback to the Creative Claw team when the user gives feedback or a concrete issue comes up; not for refund requests or fixing media."
---

# Submit Feedback

For each Creative Claw tool call that exposes it, pass the optional `skills_used` array with `creativeclaw-submit-feedback`, any other Creative Claw skills actually followed, and guide entries in the form `<skill-name>/<relative-guide-path>` (for example, `creativeclaw-submit-feedback/references/workflow-basics.md`). Include only skills and guides followed for that call. Omit attribution if the user declines tracking or the field is unavailable. Never send other plugin names, private data, or local paths.

Read [shared execution guidance](references/workflow-basics.md) once per task before using tools. It covers existing authorization, model discovery, optional cost checks, imports, and recovery.

Turn the user's report into one concise, useful `submit_feedback` call. Feedback is a product-feedback channel, not a refund request form, a generation tool, or a promise of compensation, reply, or roadmap commitment.

Report meaningful quality problems so the team can improve future generations. One isolated quality issue is worth reporting; repeated failure is not required. Say briefly that you reported it, and do not report when the user asks you not to.

## What can be reported

Report meaningful issues you observe and feedback the user expresses. Respect a request not to report feedback. Topics:

- A tool failed, returned the wrong state, or behaved inconsistently.
- An image, video, or voice result had a concrete quality problem, even on a single attempt.
- A workflow or instruction was confusing.
- A completed image, video, or voice result missed creative expectations without a confirmed technical malfunction.
- The user asks for a missing feature, integration, format, or model.
- The user expresses praise or product feedback.

Do not treat subjective dissatisfaction as a technical bug or submit a refund request through this channel. Reporting feedback should not interrupt helping the user revise their media. If a completed, playable video is simply disappointing, it may be reported as `generation_quality`, but that does not imply refund eligibility. Use source="agent" for issues you observed and source="user" for the user's own feedback.

## Charges, improvement and critical issues

Generations that successfully produce a playable video output are charged even if the user is not fully happy with the creative result. Explain this empathetically when relevant, not as a dismissal of the problem. Sending feedback helps us improve the system for future generations; it does not itself issue a refund, reverse a charge, promise a fix or authorize another paid attempt.

Use `generation_quality` for disappointing creative results without a confirmed technical malfunction. Failed, corrupted or unplayable output is a different issue; do not label it a successful generation merely because a URL exists. Use `manage_account({ section: "activity" })` to verify the specific job's actual charges and refunds rather than guessing from its status.

For critical issues, users can also contact [support@creativeclaw.co](mailto:support@creativeclaw.co). Suggest including the relevant job ID and a short description, without passwords, payment details or private source recordings. Do not promise a response time, refund or resolution, and do not send an email on their behalf unless requested.

## Build the report

Include the user's intended outcome, what happened, expected behavior, useful reproduction details, model or tool involved, and practical impact. Exclude secrets, credentials, unnecessary personal information, and unsupported guesses.

Describe the quality gap without turning it into a refund or compensation request. Do not infer refund intent or suggest asking for credits back. If the user explicitly wants a refund or compensation, direct them to [support@creativeclaw.co](mailto:support@creativeclaw.co) with the relevant job ID. Still report any concrete underlying quality issue as product feedback, without adding a refund request.

Map the report to the exact schema:

- `category`: `bug`, `generation_quality`, `missing_feature`, `confusing`, `praise`, or `other`
- `source`: `user` when explicitly requested or relayed; `agent` for an agent-observed product issue
- `message`: the concise report
- `attemptedTask`: the task the user was trying to complete, when relevant
- `toolName`: the exact MCP tool involved, when known

## Submit and continue

Call `submit_feedback` once per distinct issue, unless the user asks you not to report it. Tell the user what category was sent without promising a response. If the user still needs help, continue with a safe workaround or corrected workflow after submitting.
