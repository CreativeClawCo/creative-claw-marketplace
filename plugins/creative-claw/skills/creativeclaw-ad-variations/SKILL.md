---
name: creativeclaw-ad-variations
description: "Turn one product shot, one model or one existing ad into a numbered set of video ad variations: each variation is generated with its own hook visuals and line, or gets a new generated opening spliced onto the existing ad, or (cheapest) keeps the same footage with a new voiceover or captions. One estimate for the set. Use for hook tests, A/B ad variants for Meta, Instagram or TikTok, or 'N versions of my ad'."
---

# Ad Variations

For each Creative Claw tool call that exposes it, pass the optional `skills_used` array with `creativeclaw-ad-variations`, any other Creative Claw skills actually followed, and guide entries in the form `<skill-name>/<relative-guide-path>` (for example, `creativeclaw-ad-variations/references/workflow-basics.md`). Include only skills and guides followed for that call. Omit attribution if the user declines tracking or the field is unavailable. Never send other plugin names, private data, or local paths.

**Not connected yet?** If no Creative Claw tools (such as `list_models` or `generate_image`) are available, the plugin is installed but the server is not connected. Stop and give the user the click path: open the [Creative Claw plugin page](https://claude.ai/customize/plugins/id/3b9e3067-1092-46a5-b613-f52ddf9476ca%40anthropic-plugin-directory/connectors) in Claude, then the **Connectors** tab, press **Connect**, press **Add** if an "Add custom connector" dialog opens, and sign in. In Claude Code they run `/mcp` instead. Then they ask again. Do not substitute other tools or describe a result that was not generated.

Read [shared execution guidance](references/workflow-basics.md) once per task before using tools, and [media assembly](references/media-assembly.md) before the first `add_audio_to_video` or `merge_media` call. Older clients that list `operation` on `merge_media` and lack `add_audio_to_video`: follow the fallback line there. Read [video model selection](references/video/index.md), then only the selected model's guide, and [Review/Auto handling](references/video/review.md) before the first `generate_video`.

One source becomes N variations, numbered, with one estimate for the whole set. By default every variation is its own video generation, so its picture sells its line. `video/gemini-omni-flash` at 720p is the default model (9:16 or 16:9, 3 to 10 s).

## 1. Find the source and what stays fixed

- **Product shot (an image):** the start frame of every variation (`image_url`, the ad's `aspect_ratio`). When the shot has another ratio, first make one keyframe at the ad's ratio with `generate_image` (the shot as `image_url`, "extend the background, keep the product exactly"), say it is one image, and show it with the plan.
- **Same model (person) and script:** the Character (`list_characters`) or the model photo, plus the product photo. The person shows or uses the product without speaking to camera. The script stays word for word, so one voiceover serves the whole set.
- **Existing ad:** get the file. Attached or local media: follow [platform upload](references/platform-upload.md). You cannot open the user's ad account; for "my best performing Meta ad" without a file, ask them to attach or link that ad, once. Ask for the version without burned-in captions when they have one; old captions would show the old hook. Then `transcribe` it (word timings): the hook is its first sentence. If the ad was made in Creative Claw, `search_assets` with `type: "audio"` and a few words of the transcript returns its speech with the saved voice ID, so new lines keep the same voice.

Infer the rest (ratio, length, platform) from the request; ask only for what is missing and changes the result, such as the product or the script.

## 2. Choose the mode

| Mode | Each variation | Main cost per variation |
| --- | --- | --- |
| New version (default for a product shot or a model) | A whole new clip from the same anchors, its action matched to its line, plus its voiceover | One `generate_video` (Omni 8 s at 720p: 120 credits) |
| New hook (default for an existing ad) | A new 3 to 5 s opening generated to land on the first frame of the ad's body, then the unchanged body | One short `generate_video` (Omni 3 s: 45, 4 s: 60) |
| Same footage (cheapest, or when asked) | Only the audio or captions change, on one shared clip or the ad itself | About 6 credits |

What the variations differ in: the hook angle by default; the voiceover copy, or the voice and delivery when the script is fixed. Change one of these per set so results compare cleanly. A face speaking on screen keeps its own audio: re-voicing it breaks lip sync, so give that ad new hooks, not a new voiceover.

Burn captions onto every variation with `add_subtitles` unless the user says no: the hook then reads on mute. Pass `language` when the ad is not in English, and leave styling fields out unless the user asked for a look.

## 3. Write the set

- Number the variations and give each a short name by angle (problem, feature, social moment, offer, curiosity). Use only claims the user gave or that are verifiable; keep the product name, disclosures and CTA exact unless the CTA is the variable.
- For each, write the line and the picture that sells it: the action, camera and light for its clip, or for a new hook, the opening scene and how it moves into the ad.
- Lines fit their clip: at most 2.5 spoken words per second, with about 0.5 s of air at each end (an 8 s clip holds about 17 words; a 3 s hook about 4). A new hook's clip runs its line's length plus about 0.5 s.
- One voice for the whole set unless the voice is the variable. Call `get_model_params` once for the speech model (`speech/elevenlabs-v4` by default) and pick one stock voice that fits, the ad's own voice, or the user's saved Character voice.
- Write in the user's language.

## 4. One estimate, one go-ahead

1. Estimate each kind of generation once with `estimate_generation` and multiply: one clip per distinct duration (exact model, duration, resolution, ratio), one voiceover with the longest line (speech is priced by characters), one image when keyframes or opening scenes are needed.
2. Add the utility prices: `add_audio_to_video` 2 credits per voiceover, `merge_media` 2 credits to join each new hook to the body, `add_subtitles` 6 credits per minute with a 2-credit minimum per video, `trim_video` 2 and `extract_frames` 2 per call. Final costs are confirmed after each job.
3. Show the plan in one message: a numbered table (number, name, the exact line, the picture, its length), what stays fixed, model, ratio and resolution, and one total for the set.
4. Approval:
   - **Auto:** ask once, unless the user already said to go ahead without seeing the lines. Their yes covers every step in the plan; do not ask again per variation.
   - **Review:** every `generate_video` returns its own approval card. Say so in the plan, then submit all N clips in that same message so the cards arrive together. Each card's Generate approves its clip and the voiceover, merges and captions that finish that variation; continue each one as its card is submitted. When the user wants one approval for the set, offer the same-footage mode.

## 5. Produce

Start every independent job together and resolve each with `check_job` before using its output.

**New version**
1. All N clips: same start frame or references, each with its own prompt for the action that sells its line, ending with "no speech, no music, no on-screen text". All N voiceovers at the same time (one, reused, when the script is fixed).
2. Check each voiceover's duration against its clip. If one runs longer, tell the user and offer a shorter line; never cut words or freeze the last frame.
3. Add each voiceover with `add_audio_to_video`, `audio_mode: "mix"`, `original_volume` about 0.2 (keeps the clip's ambience) and `start_offset` about 0.3 s. The video keeps its full length; plain `replace` would end it at the last word.

**New hook**
1. Once for the set: `trim_video` the body from the end of the hook's last word to the end; `extract_frames` with `mode: "single"`, `position: "first"` on the body (the landing frame) and on the ad (its opening frame).
2. Per hook: `generate_video` with `image_url` = the opening frame, or a new opening scene made from it with `generate_image` when the hook needs another look; `last_frame_url` = the landing frame; `duration` = the line plus about 0.5 s (3 to 5 s); the ad's ratio. The prompt describes the hook's action "ending exactly on the final frame", with no speech, music or on-screen text. Its voiceover in the ad's voice.
3. Add the voiceover to the new hook as above, then join them with `merge_media`, `video_urls` = [new hook, body]. The body keeps its own audio and music.

**Same footage**
1. Make the one shared clip (or use the ad) and the N voiceovers together.
2. Add each voiceover with `add_audio_to_video`, `audio_mode: "mix"`, `original_volume: 0` (mutes the old voiceover; also drops its music) and `start_offset` about 0.3 s.
3. For an ad whose audio must stay, vary the opening moment instead: one `cut_and_reframe_video` each, cut on sentence boundaries from the transcript, source ranges not overlapping (for example the payoff line to the end first, then the start up to that line), framing `{"mode":"center_crop"}`, `width` and `height` = the source size.

Then, in every mode: caption each finished variation with `add_subtitles`, and name every result with `update_asset` (`Ad variation 1 - problem hook`) plus one shared tag such as `ad-variations-<product>`.

## Deliver

Give the set as a numbered list: number, name, the line, length and URL, plus the original shot or ad as the control. Report what was charged against the estimate and any variation that failed. Offer the next step in one line: more hooks, the winner at a higher resolution, or other placement ratios with `cut_and_reframe_video`.
