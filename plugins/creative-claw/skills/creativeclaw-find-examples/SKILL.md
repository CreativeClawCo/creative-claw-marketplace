---
name: creativeclaw-find-examples
description: "Search, filter, load, and adapt Creative Claw's curated image, video, and audio examples. Use when the user asks for examples, prompt inspiration, style references, alternatives, or a close starting point; do not search before every generation."
---

# Find Creative Claw Examples

Use the curated catalog to help the user choose a direction before generation. Searching and loading examples are read-only: neither tool spends generation credits or creates media.

## When to use it

Use `search_examples` when the user:

- asks to browse examples, prompts, styles, references, or ideas;
- wants something similar to an existing concept;
- has an open brief and would benefit from choosing among concrete directions; or
- asks what a model or modality can make.

Do not call it automatically before every generation. If the brief is already precise, continue with the owning image, video, or voice workflow. You may offer the catalog when it would materially help, but do not interrupt a clear brief with unnecessary browsing.

## Search and filter

All filters are optional. Start with the smallest useful set:

- `query`: natural-language subject, style, mood, composition, or use case. Prefer a compact intent such as `editorial perfume campaign with warm shadows` over a list of keywords.
- `output_type`: `image`, `video`, or `audio`. Omit only when the user genuinely wants to browse across media types.
- `model_id`: an exact Creative Claw model ID. Use it only when the user selected that model or specifically asks what it can do.
- `tags`: up to ten exact tags. Every supplied tag must be present, so begin with one or two discriminating tags instead of over-filtering.
- `limit`: use a small first page, normally 6–12. Increase it only when the user asks for a broad catalog.
- `cursor`: pass the opaque cursor returned by the previous page without modifying it.

If a narrow search returns nothing, relax tags first, then broaden the query or omit the model filter. Do not silently change an explicit output type.

## Selection and use

1. Call `search_examples` and present a concise shortlist with each example's title, media type, preview, model when present, and why it fits.
2. Ask the user to choose when several directions would materially change the result. If one result is an obvious match, explain the choice and continue.
3. Call `get_example({ id_or_slug })` only for the selected example. Search results are summaries; `get_example` loads the complete agent-ready prompt and generation hints.
4. Treat the example as a starting point. Follow its workflow, but pass only its generation-prompt section—adapted to the user's subject and instructions—to the named generation tool.
5. Validate the named model and its current parameters with the owning generation skill before generating. An example does not override the user's explicit model choice or authorize a paid call.

When `requiresReference` is true, let the user choose among the included reference image when available, their own reference, or a newly generated reference. If `referenceExampleSlug` is present and they choose a new catalog reference, load that linked example separately and generate its image first. Never splice two complete example prompts together.

## Examples

Browse focused image directions:

```text
search_examples({
  query: "editorial perfume campaign with warm shadows",
  output_type: "image",
  tags: ["product", "editorial"],
  limit: 6
})
```

Show examples for an explicitly selected model:

```text
search_examples({
  query: "kinetic typography launch reveal",
  output_type: "video",
  model_id: "<exact model ID selected by the user>",
  limit: 8
})
```

Load the chosen result, then adapt it:

```text
get_example({ id_or_slug: "<slug returned by search_examples>" })
```

For another page, repeat the original filters and add the returned `cursor`.
