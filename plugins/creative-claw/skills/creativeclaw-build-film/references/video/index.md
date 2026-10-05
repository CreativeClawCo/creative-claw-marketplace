# Video model selection

Package access does not mean loading every guide. Honor an explicit model choice. For a known model, read only its matching reference, then get_model_params for the current contract. If choosing a model, use list_models with category video first. Pricing and availability come from live tools, not these snapshots.

| Model or family | Read when selected |
| --- | --- |
| Gemini Omni, video/gemini-omni-flash | [Gemini Omni](gemini-omni.md), the existing general default |
| Seedance 2.5 | [Seedance 2.5](seedance-2-5.md), premium cinematic, reference-rich and long (up to 30 s) scenes, 480p drafts, and supported edits/extensions |
| Seedance Mini | [Seedance Mini](seedance-mini.md), only when the user asks for it |
| H3 Max, H3 Max Extend, H3 Max Insert, and H3 Max Fast/Turbo | [MiniMax H3 Max](minimax-h3-max.md), cinematic motion, cheap fast drafts, extending a clip, inserting new footage into an interval, and native audio |
| Wan 3.0 | [Wan](wan-3.md), native-audio 2–30 s single-pass clips, references, source transformations, and document or webpage briefs |
| Veo, Grok, FLUX, Sora, Kling, H3, Hailuo, HappyHorse, HeyGen or another explicitly requested route | [Additional models](other-models.md), model-specific distinctions and live-schema lookup |
| Lip-sync a finished clip to prepared speech | [video/sync-3](other-models.md) |

Read [reference production](reference-production.md) when preparing shot assets, [voice in video](voice-in-video.md) when a shot has speech, and [Review/Auto](review.md) before generation. Model guides do not authorize extra paid drafts, retries or changing providers. Report concrete product or quality issues through `submit_feedback` and say briefly that you did; do not report when the user asks you not to.

Planning-only requests can use this selection index without reading every model guide. Read a specific guide when committing model-specific timing, references or shot constraints. Do not render clips unless production was requested.

## Worked production recipes

Choose the relevant workflow: [product ad](recipe-product-ad.md), [consistent Character scene](recipe-character-scene.md), or [source edit and extension](recipe-source-edit.md). For creator ads, first choose a [UGC production path](ugc-paths.md).
