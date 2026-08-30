# Image generation and editing

Choose an image model by capability, anchor branded work with theme assets, and preserve approved elements across iterations.

## Workflow

1. Define the subject, intended use, aspect ratio, style, required text, and what must remain exact.
2. For branded work, call `get_theme`. Reuse its colors, notes, logos, and reference images. Do not invent missing brand details.
3. Call `search_assets` for source images, product shots, Characters, and prior approved outputs. Import missing media through `../platform-upload.md`.
4. Call `list_models({ category: "image" })`. Choose a generation- or edit-capable model, then call `get_model_params` for that exact ID.
5. Generate with `generate_image`; provide `image_url` for edits. Use the preferred `size` field when supported.
6. If the prompt contains exact quoted text, per-region instructions, or reference tokens, send it verbatim with `agentic_prompting: false`.
7. Inspect the output. For revisions, describe both the delta and what must remain unchanged.
8. Name, tag, and describe approved assets.

## Model picker

Runtime discovery is authoritative. These are current routing defaults:

| Need                                                                           | Start with               | Why                                                                                  |
| ------------------------------------------------------------------------------ | ------------------------ | ------------------------------------------------------------------------------------ |
| General generation or edit                                                     | `image/nano-banana-2`    | Default; strong balance of quality, reasoning, speed, and cost.                      |
| Complex professional asset, precise typography, demanding multi-reference edit | `image/nano-banana-pro`  | Higher reasoning and composition quality.                                            |
| Cheap drafts or bulk variations                                                | `image/nano-banana-lite` | Fastest low-cost Nano Banana tier.                                                   |
| Product or marketing imagery with many references                              | `image/seedream-5-lite`  | Strong product work, precise edits, up to 10 references, and high-resolution output. |
| Premium Seedream product/marketing work                                        | `image/seedream-5-pro`   | Flagship 1K/2K generation and edit path.                                             |
| Typography, 4K, or strict instruction adherence                                | `image/gpt-image-2`      | Strong text rendering and prompt adherence.                                          |
| Direct OpenAI route when exposed                                               | `image/gpt-image-direct` | Same model family through the direct provider route.                                 |
| Natural-language edit with up to three sources                                 | `image/grok-imagine-pro` | Strong detail, typography, and edit support.                                         |
| Professional generation without tuning                                         | `image/flux-2-pro`       | Generation-only, polished default look.                                              |
| Illustration and design                                                        | `image/recraft-v3`       | Generation-only specialist for graphic and illustrative work.                        |
| Precise edit or consistency                                                    | `image/flux-kontext-max` | Edit-only.                                                                           |
| Cheap edit test                                                                | `image/flux-dev`         | Edit-only low-cost option.                                                           |

Do not use retired or unlisted model IDs. In particular, discover a current draft model instead of assuming an old FLUX Schnell ID still exists.

## Reference handling

- `image_url` is the primary source/edit image.
- Additional references are model-specific. Inspect `get_model_params`; many supported image models accept `extras.image_urls`.
- Theme reference images describe visual language. Tell the model which attributes to borrow—palette, lighting, composition, material, or typography—and which subject matter not to copy.
- For a saved Character, pass `character_id` instead of manually repeating its image and description.
- Use a durable Creative Claw URL. Never pass a local path or private attachment URL to a URL-only field.

## Prompt structure

Use compact art direction:

```text
Subject and action. Composition and camera. Environment and lighting.
Visual medium and finish. Brand palette and mood. Exact text, if any.
Preserve: [identity/product/logo/geometry]. Avoid: [specific failure modes].
```

For editing, lead with the change:

```text
Change [one concrete element]. Preserve [identity, pose, product geometry,
lighting, crop, background, and every unmentioned detail].
```

Use positive instructions for required content and a short negative list for recurring model failures. Do not overload a draft with conflicting styles.

## Tool notes

- `generate_image` supports generation and edit mode, `size`, one to four outputs, seed, output format, optional background removal, Characters, prompt rewriting, and model-specific `extras`.
- `compare_models` compares two to four generation-capable models. Use it when the user is choosing a visual direction, not for exact source-image edits.
- The inline viewer may monitor completion. Use `check_job({ job_id })` only when a later step requires the final URL or no viewer is monitoring.
- `remove_background` is preferable to regenerating when the only task is a cutout.
- `upscale_media` is preferable to regenerating an approved image solely for resolution.

## Quality gate

Before approval, check subject identity, hands/faces, product geometry, readable text, logo integrity, crop, target ratio, color fidelity, and unwanted artifacts. When one element is wrong, edit the approved candidate instead of restarting unless the composition itself failed.
