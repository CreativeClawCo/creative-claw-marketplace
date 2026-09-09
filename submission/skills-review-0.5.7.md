# Creative Claw skills: v0.5.7 implementation and follow-up review

Date: 2026-09-08

## Outcome

The updated package contains 25 skills: the router and 24 focused skills, including the new `creativeclaw-edit-media`. The OpenAI upload kit contains the individual skill ZIPs and upload instructions; extract it before attaching individual archives. It is not a single installable skill.

This work updates local skill sources, packaging, release manifests, and tests. It does not submit the plugin, deploy the MCP, or execute paid generations. `MONETIZE_CHAT_GPT_USERS` was not edited. Existing unrelated work, including newer HTML-video resources, was preserved.

## Improvements implemented

1. **Correct tool contracts.** Model discovery uses `category`, not `modality`; speech preserves exact `text` and does not send unsupported `agentic_prompting`. Skills distinguish top-level tool inputs from model-specific parameters.
2. **Less friction.** Reuse current-task model schemas and known assets. No automatic questionnaire, storyboard, audition, lower-resolution draft, or repeated confirmation for an already authorized request. Respect requested output quality and batch scope.
3. **Recovery without duplicate work.** Preserve job IDs, resume interrupted jobs, check uncertain submissions, interpret normalized failures, and keep retries bounded by existing authorization. Do not claim unsupported refund or charge outcomes.
4. **More reliable audio and films.** Plan narration-driven timing before clips. Follow the exact continuation list when merging more than five audio segments. Guard against shorter-input audio/video truncation and avoid promising unsupported music mixing.
5. **Optional cost guidance.** Estimate when the user asks about cost, affordability, balance, or gives a budget—not on every generation. Estimates do not add another approval gate or authorize generation after an estimate-only question. Distinguish estimates from actual charges and unsupported processing costs.
6. **Maintainable, complete packages.** Canonical shared execution, import, recovery, and assembly references are synchronized into focused packages. Validation rejects stale copies, missing links, or archive/source mismatches. Release version is tracked in manifests, not inserted into every skill description.
7. **Existing-media workflow.** The new edit-media skill covers trimming, resizing, captions, transcription, audio cleanup/extraction, and merging, using supported tool fields. It avoids redundant transcription before automatic captions and distinguishes transcription-only YouTube URLs from processable media files.

The follow-up pass also corrected specialist instructions that still forced a draft before a requested final-quality output, mandatory character auditions, and an unnecessary Gemini batch-confirmation rule.

## Verification performed

| Check | Result | What it proves |
| --- | --- | --- |
| Skill frontmatter validation | 25 passed | Required metadata and naming checks |
| Skill architecture validation | Passed | Expected skills and routing structure are present |
| Archive/source validation | 25 ZIPs, 173 files passed | Exact file contents, shared-reference freshness, and relative Markdown links |
| ZIP integrity | Passed | Upload-kit compressed data can be read |
| Registered MCP schema test | Passed: 14 fixtures + 11 generation examples | Documented payloads have accepted top-level fields and parse against registered tool input schemas |
| MCP TypeScript check | Passed | Added integration test typechecks with the repository |
| Whitespace/error check | Passed | No errors from `git diff --check` |

There are now 58 documented routing scenarios. They have **not** been run as live agent workflows. The schema test does not execute handlers or providers, validate every model-specific extra, or prove real-client skill selection and recovery behavior.

## Biggest next improvements

### 1. Run realistic agent evaluations before adding more rules

**Highest priority; evaluation work.** Turn a representative subset of the 58 scenarios into repeatable client runs with mocked tool results, then compare old and new skill behavior. Include a precise one-image request, budget-only music question, interrupted paid job, eight-part narration, Hebrew captions, and an already-approved film.

Measure task completion, invalid calls, unnecessary discovery, redundant questions, duplicate paid submissions, and time to first useful output. Test routing without forcing the desired skill, and test execution with the skill selected. Current validation establishes structural and top-level contract correctness, not these outcomes.

Starting points: `evals/skill-routing-scenarios.md`, `evals/tool-contract-cases.json`, and the MCP repository's `src/skill-contracts.test.ts`.

### 2. Make targeted revisions a first-class workflow

**Skill improvement, with optional backend support.** Add a concise, conditional revision reference for requests such as “same image, change the background” or “replace shot three, keep everything else.” Resolve the previous output and its supported settings, preserve unaffected material, and rerun only the necessary branch of a film or edit sequence. Do not add a planning interview.

Current guidance preserves assets and shot updates, but does not yet provide a dedicated end-to-end revision path. Start inside the existing generation/edit/film skills; create another discoverable skill only if routing tests demonstrate a distinct need.

### 3. Return consistent media metadata from the MCP

**Backend improvement.** Standardize completed media responses around `assetId`, `jobId`, `url`, media type, and available duration/dimensions. Do not fabricate metadata that has not been measured.

For example, `src/tools/generate-audio.ts` saves an asset ID internally but its successful `structuredContent` returns a URL and job ID without the asset ID or measured media duration. Returning those values would reduce follow-up searches and make downstream timing and metadata edits more reliable. Keep old response fields for compatibility.

### 4. Add actual narration/music mixing and duration control

**Backend capability improvement.** Provide supported gain, fades, ducking, and explicit padding/trimming policy for a soundtrack workflow. Today `merge_media` exposes concatenation and audio/video joining; it documents that joining uses the shorter input duration. Skills can prevent accidental truncation but cannot implement a finished mix through nonexistent controls.

This would materially improve films and UGC ads: full-length narration, music beneath speech, and intact final frames. Design it with inspectable inputs and predictable duration before expanding skill instructions.

Starting point: MCP `src/tools/merge-media.ts` and the shared `references/media-assembly.md`.

### 5. Validate model-specific settings, not just tool envelopes

**Test and maintenance improvement.** Extend contract checks with representative, versioned model-schema fixtures for image references, video modes, speech settings, and audio duration fields. Run these alongside package checks when supported models change.

The current test deliberately checks registered top-level tool schemas. Passing it does not establish that arbitrary nested settings are supported by the selected provider/model. Favor a small set of realistic payloads over brittle tests that only match instruction wording.

## Suggested order

Run behavioral evaluations first, add the targeted-revision reference based on observed failures, then prioritize consistent result metadata and audio mixing. Avoid more compulsory questions or additional mandatory planning stages. The skill-creator principles used here favor precise routing, progressive disclosure, and preserving the user's existing authorization.
