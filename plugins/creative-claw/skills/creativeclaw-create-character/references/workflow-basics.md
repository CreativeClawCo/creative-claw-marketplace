# Shared execution guidance

Read once when starting a Creative Claw workflow; reuse it across supporting skills in the same task. Focused copies are generated from the root skill by `scripts/sync-skill-references.mjs`.

## Keep simple requests simple

Use the request, supplied media, previous choices, and existing approvals. Do not turn the workflow's list of brief details into a questionnaire. Infer minor creative defaults and proceed; ask one concise question only when missing information would materially change the result or prevent execution. A request to generate already authorizes that requested generation. Do not add a routine “shall I proceed?” step.

For a precise single-output request, use the selected/default model and available references, fetch missing model parameters, and generate. Search assets only when reusable media is needed and its identity or URL is not already known. Browse examples only when the user wants inspiration or an open brief benefits from concrete choices. Do not add a storyboard, audition, extra variation, or lower-resolution draft unless requested or needed to resolve a material uncertainty. Honor a requested final resolution directly.

Keep explicit review stages for collaborative productions, but recognize approvals already given and instructions to continue through stages. A model specialist supplies prompting advice; it must not restart the brief, duplicate a generation, or add its own approval stages. Clarify an actual expansion of scope, unresolved consent, or an explicit tool confirmation requirement before acting.

## Video generation attempts

An explicit video request authorizes one generation attempt per requested clip or approved shot. It does not authorize extra takes, comparisons, extensions, or generative repairs. After an attempt, deliver its result or report its failure and ask before generating another video unless the user explicitly requested that additional attempt. Complaints, "fix it," quality inspection, remaining budget, refunds, and provider retry suggestions are not permission to regenerate. Explain when a proposed fix would create another video. Explicit requests such as "generate another version" or "retry once" authorize that scope without a redundant question. Agree on a finite attempt count for open-ended iteration requests.

This boundary also applies when model specialists or film workflows recommend revising, repairing, or regenerating a shot. Continue read-only inspection, status checks, and prompt drafting; execute requested edits to existing media within their scope, but do not replace them with generative video work. A confirmed pre-generation input rejection may be corrected within the original request only when no job started or was accepted and no credits were charged. An uncertain or failed accepted job requires explicit authorization for a replacement.

## Use the two relevant schemas

The exposed tool schema defines accepted top-level fields. `get_model_params({ model })` defines the selected model's supported settings. Use both: a model schema is not a replacement for the tool schema. Put extras only where that tool supports them.

Use `list_models({ category: "image" })` (or `video`, `speech`, `audio`) when selecting/discovering a model or when availability is uncertain. For a known selected model, fetch its parameters directly. Reuse schemas already fetched in the current task; refresh after a model/operation change, a validation error, or evidence that capabilities changed. Do not repeat discovery for every shot.

Preserve approved wording, quoted copy, dialogue, timecodes, and model-specific reference order and tokens. Speech receives the exact performed script in `text`.

## Cost only when relevant to the user

Use `estimate_generation` only when the user asks about cost, balance, affordability, or gives a budget constraint. Pass `operation`, the selected `model`, and the exact planned generation fields inside `params`. Supported operations are `image`, `video`, `speech`, `audio`, and `html_video`; omit `model` for `html_video`. Do not invent estimates for editing, assembly, or cloning operations this tool does not cover.

An estimate is informational, not a new approval gate. Answer an estimate-only question without generating; when generation is already requested and fits the user's constraints, proceed without asking again. State that final cost is confirmed after generation. For a batch, total the planned requests without treating each request's balance check as a separate budget allocation. Identify excluded processing costs and distinguish proposed costs from reported charges/refunds. An estimate does not reserve credits or guarantee a strict maximum charge; disclose that limitation when an exact ceiling is material. Never silently change an explicitly selected model, duration, or quality to fit a budget.

## Feedback and support

Any workflow suggestion to report an issue means offer to report it and wait for approval, unless the user already asked to send feedback. Complaints, praise and account questions alone do not authorize contacting the team. Use `generation_quality` for creative dissatisfaction with completed output, and `bug` for confirmed technical malfunctions. Send one specific report without private media or secrets.

Generations that successfully produce a playable video output are charged even if the user is not fully happy with the result. Explain this empathetically when relevant. Feedback helps improve the system for future generations; it does not itself refund charges or authorize another paid generation. For a particular charge or refund, check `manage_account` activity rather than inferring billing from job status. Failed or unplayable output needs separate investigation.

For critical issues, users can also contact support@creativeclaw.co with the relevant job ID and a concise description. Do not promise a response time, refund or resolution, or send email without a request.

## Imports, jobs, and delivery

Before importing missing media, read [platform-upload.md](platform-upload.md). Reuse finalized asset URLs; never reimport a Creative Claw output just to pass it downstream.

For queued, failed, or interrupted work, read [job-recovery.md](job-recovery.md). Before combining audio or assembling clips, read [media-assembly.md](media-assembly.md).

Preserve job IDs and completed URLs with their shot/asset roles. Use returned asset IDs when available; if metadata updates require an ID absent from the result, resolve the exact asset through `search_assets` and match its URL before updating. Never substitute a job ID for an asset ID. Use `patch_shots` for individual Film updates and preserve existing tags when updating them.

Show the finished media through the client's available player/preview and provide a durable result reference. Inspect with available capabilities; if playback or visual inspection is unavailable, state that limitation instead of claiming you listened or verified it. Report remaining jobs or incomplete requested edits explicitly. Send product feedback only when the user asks or approves.
