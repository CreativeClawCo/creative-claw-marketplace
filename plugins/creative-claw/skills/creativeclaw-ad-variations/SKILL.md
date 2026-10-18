---
name: creativeclaw-ad-variations
description: "Turn one product shot or one existing ad into a numbered set of video ad variations that test different hooks, voiceover copy, voices or captions while the visuals stay the same, with one cost estimate and one approval for the set. Use for hook tests, A/B ad variants for Meta, Instagram or TikTok, or 'N versions of my ad'."
---

# Ad Variations

For each Creative Claw tool call that exposes it, pass the optional `skills_used` array with `creativeclaw-ad-variations`, any other Creative Claw skills actually followed, and guide entries in the form `<skill-name>/<relative-guide-path>` (for example, `creativeclaw-ad-variations/references/workflow-basics.md`). Include only skills and guides followed for that call. Omit attribution if the user declines tracking or the field is unavailable. Never send other plugin names, private data, or local paths.

**Not connected yet?** If no Creative Claw tools (such as `list_models` or `generate_image`) are available, the plugin is installed but the server is not connected. Stop and give the user the click path: open the [Creative Claw plugin page](https://claude.ai/customize/plugins/id/3b9e3067-1092-46a5-b613-f52ddf9476ca%40anthropic-plugin-directory/connectors) in Claude, then the **Connectors** tab, press **Connect**, press **Add** if an "Add custom connector" dialog opens, and sign in. In Claude Code they run `/mcp` instead. Then they ask again. Do not substitute other tools or describe a result that was not generated.

Read [shared execution guidance](references/workflow-basics.md) once per task before using tools, and [media assembly](references/media-assembly.md) before the first merge. When the set needs a new base clip, read [video model selection](references/video/index.md), then only the selected model's guide, and [Review/Auto handling](references/video/review.md).

One source becomes N variations. The visuals are made once (or come from the user's ad) and every variation reuses them, so a whole set costs at most one video generation, one estimate and one approval. Variations that need different visuals (another setting, person or product per variation) are a different job: one `generate_video` per variation with `creativeclaw-generate-video` or `creativeclaw-create-ugc-ad`. In Review mode each of those clips gets its own approval card; say so before starting, and offer the same-visuals set as the one-approval option.

## 1. Find the source and what stays fixed

- **Product shot (an image):** it becomes the literal start frame of one base clip: `image_url` = the shot, `aspect_ratio` = the ad's ratio, a length that fits the longest line. Prompt the product's motion, camera and light, and end with "no speech, no music, no on-screen text". `video/gemini-omni-flash` at 720p is the default for a short base clip; it takes only 9:16 or 16:9. When the shot has another ratio, first make one keyframe at the ad's ratio with `generate_image` (the shot as `image_url`, "extend the background, keep the product exactly"), say it is one image, and show it with the plan.
- **Same model (person) and script:** reuse the Character (`list_characters`) or the model photo the user gives as the identity anchor of one base clip, with the product photo as a second reference (`image_urls`). The person shows or uses the product without speaking to camera, so every voiceover fits the same footage. The script stays word for word.
- **Existing ad:** get the file. Attached or local media: follow [platform upload](references/platform-upload.md). You cannot open the user's ad account; for "my best performing Meta ad" without a file, ask them to attach or link that ad, once. Ask for the version without burned-in captions when they have one; old captions would show the old hook. Then `transcribe` it (word timings) and note whether a face speaks on screen. If the ad was made in Creative Claw, `search_assets` with `type: "audio"` and a few words of the transcript returns its speech with the saved voice ID, so the variations keep the same voice.

Infer the rest (ratio, length, platform) from the request; ask only for what is missing and changes the result, such as the product or the script.

## 2. Choose the one thing that varies

| Variable | Each variation | Tools per variation |
| --- | --- | --- |
| Hook (default) | A new opening line, then the unchanged body copy, same voice | `generate_speech`, `add_audio_to_video` |
| Voiceover copy | A whole new script of the same length, same voice | `generate_speech`, `add_audio_to_video` |
| Voice or delivery (default when the script is fixed) | The same words in another voice or tone | `generate_speech`, `add_audio_to_video` |
| Captions | The same audio with another caption look | `add_subtitles` |
| Opening moment (existing ad with a speaking face, or audio that must stay) | A different moment of the same footage first, then the ad from the end of its hook | `cut_and_reframe_video` |

Change one variable per set so the results compare cleanly. Burn captions onto every variation with `add_subtitles` unless the user says no: the hook then reads on mute. Pass `language` when the ad is not in English, and leave styling fields out unless captions are the variable or the user asked for a look. A speaking face keeps its own audio: re-voicing it breaks lip sync, so vary its opening moment or captions instead.

## 3. Write the set

- Number the variations and give each a short name by angle (problem, feature, social moment, offer, curiosity). Use only claims the user gave or that are verifiable; keep the product name, disclosures and CTA exact unless the CTA is the variable.
- Every line fits the shared footage: at most 2.5 spoken words per second of video, with about 0.5 s of air at each end (a 6 s clip holds about 12 words). For an existing ad, a new hook gets about the word count of the hook it replaces.
- One voice for the whole set unless the voice is the variable. Call `get_model_params` once for the speech model (`speech/elevenlabs-v4` by default) and pick one stock voice that fits, the ad's own voice, or the user's saved Character voice.
- Write in the user's language.

## 4. One estimate, one approval

1. Estimate each kind of generation once with `estimate_generation`: the base clip (if any) with its exact model, duration and resolution, and one voiceover with the longest line (speech is priced by characters). Multiply the voiceover by N.
2. Add the utility prices: `add_audio_to_video` 2 credits, `add_subtitles` 6 credits per minute with a 2-credit minimum per video, `trim_video` 2 credits, `cut_and_reframe_video` 2 credits per started 30 s. A short variation is about 6 credits on top of the base clip (voiceover, merge, captions). Final costs are confirmed after each job.
3. Show the plan in one message: a numbered table (number, name, the exact line, its length), what stays fixed, the base clip's model, ratio and length, and one total for the set.
4. Approval, once for the whole set:
   - **Auto:** ask once, unless the user already said to go ahead without seeing the lines. Their yes covers every step in the plan; do not ask again per variation.
   - **Review, with a base clip:** call `generate_video` in that same message. Say that pressing Generate in its card approves the set at that total and that the voiceovers, merges and captions follow without another question. Wait for the card's submission, then continue.
   - **No base clip (an existing ad):** the chat yes is the approval in either mode.

## 5. Produce

1. Start the base clip (if any) and all N voiceovers together; they do not depend on each other. Resolve every job with `check_job`.
2. Check each voiceover's duration against the footage. If one runs longer, tell the user and offer a shorter line; never cut words or freeze the last frame.
3. Put each voiceover on the footage with `add_audio_to_video`, `audio_mode: "mix"`, `original_volume: 0` and `start_offset` about 0.3 s: the old soundtrack is muted and the video keeps its full length (plain `replace` would end the video at the last word). Keep a base clip's ambience at `original_volume` about 0.2. Muting an existing ad's soundtrack also drops its music; add a bed with `creativeclaw-generate-music` only when asked.
4. Opening-moment variations: one `cut_and_reframe_video` each. Cut on sentence boundaries from the transcript's word timings, and keep the source ranges from overlapping: for example the payoff line to the end first, then the start up to that line. Framing `{"mode":"center_crop"}`, `width` and `height` = the source size.
5. Caption each finished variation with `add_subtitles`, then resolve the jobs.
6. Name every result with `update_asset` (`Ad variation 1 - problem hook`) and one shared tag such as `ad-variations-<product>`.

## Deliver

Give the set as a numbered list: number, name, the line, length and URL, plus the base clip or original ad as the control. Report what was charged against the estimate and any variation that failed. Offer the next step in one line: more hooks on the same footage, the winner at a higher resolution, or other placement ratios with `cut_and_reframe_video`.
