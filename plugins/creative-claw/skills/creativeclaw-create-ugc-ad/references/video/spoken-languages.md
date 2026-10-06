# Talking videos in unsupported or unverified languages

## Check the spoken language first

Choose by the language spoken in the video, not the language of the chat. Read the selected model's language guidance from the existing `get_model_params({ model })` call before preparing a speaking shot. There is no extra language argument to `list_models` or `get_model_params`.

Use the normal native-dialogue workflow when the requested language is documented for that model. Do not route all non-English speech through this recipe. Use the audio-driven recipe below only when native dialogue in the requested language is unsupported or unverified for the chosen model. Exact or recurring voice requirements are a separate decision in [voice in video](voice-in-video.md).

Compact orientation, checked 2026-10-06:

| Model family | Spoken-language guidance |
| --- | --- |
| Veo and Gemini Omni | English is documented. Google calls other languages unevaluated, so mark them unverified, not impossible. |
| H3 / H3 Max / H3 Max Fast | H3 documents English, Chinese and several other dialogue languages. Max/Fast use that family baseline as inherited guidance, not separately published language validation. Get the full list from `get_model_params`. |
| H3 Max Recast and Kling Motion Control Pro | Preserve the source video soundtrack, or remove it where supported. This does not establish native generated-speech or translation support; the recorded language comes from the source. |
| Seedance 2.5 | English and Chinese, plus other documented languages including Spanish, Japanese and Arabic. Get the complete version-specific list from `get_model_params`; do not assume all Seedance versions share it. |

An audio reference can guide a newly generated voice without preserving its words, language or timing. It does not make an unverified language reliable. Prompt-language support and a brand's TTS or translation language list do not establish video-dialogue support.

Explain the relevant limitation briefly and recommend prepared speech plus `video/minimax-h3-max-lip-sync` or `video/heygen-avatar-4`. H3 Max Lip Sync advertises any language driven by supplied audio; review the actual result. For HeyGen, choose the audio-driven Avatar 4 route, not generic HeyGen Video 1 native generation. Honor an explicit model choice and explain the proposed change before switching.

## One talking face or one requested shot

Reuse or prepare one clean character image and one finished speech recording, then make one video generation within the selected endpoint's limits. Keep a single requested camera view. Do not create extra angles, scene variants, or a montage merely because the language is unverified.

Use the requested script and a speech model/voice that supports its language. Reuse supplied finished speech when available. Check the audio and its measured duration before submitting video. Private cloning samples are not final speech.

- H3 Max Lip Sync: `image_url` is the clean shot image; `extras.audio_url` is the completed speech. Its prompt is not a camera or acting control. Prepare the framing in the image and use the current duration/resolution limits returned by `get_model_params`.
- HeyGen Avatar 4: `image_url` is the clean face image and `extras.audio_url` supplies the speech. Read its current parameters; supplied audio overrides text-to-speech and voice selection.

Do not attach unsupported reference arrays or `character_id` to a literal-image lip-sync request. Build the likeness into the image first. If the single recording exceeds the selected endpoint's duration limit, explain the necessary split or choose a suitable longer audio-driven route; do not invent extra scenes.

## Multiple shots, only when the user wants them

1. Plan the requested number of shots and camera views. Reuse the same Character face/identity references, wardrobe, product and location anchors throughout. Keep one image model, aspect ratio and look line for the sequence.
2. Prepare one clean image per shot using those same identity references on every image call. Add the first approved shot as a look reference for later images, while retaining the original identity anchors. Change only the requested camera position, framing or pose: for example a front medium shot, a three-quarter medium close-up, then a closer front view. Keep the speaking mouth clearly visible. If the user wants the same camera position throughout, keep it.
3. Compare the images for consistent face, hair, clothing, product and setting. Use full-frame images, not character-sheet grids as video inputs. Reuse suitable existing images; do not generate multiple candidates per shot by default.
4. Prepare the approved dialogue with the same saved voice and settings. Split a finished recording at natural sentence boundaries, or generate the planned segments with that same voice. Use measured audio durations and `wordTimings` when available. Meet the chosen model's minimum and maximum clip lengths without cutting words or changing playback speed.
5. Generate each shot once with its clean image and corresponding speech segment using the selected dedicated lip-sync/avatar route. The shared identity references were used to build the images; pass only the video inputs supported by this route. Different camera views come from the images, not an unsupported camera prompt.
6. Check the completed clips for correct words, pronunciation, mouth timing and character continuity. Concatenate their completed URLs in shot order with `merge_media({ operation: "merge_videos", video_urls: [...] })`, preserving each clip's audio. For a Film project, keep `with_narration: false` when assembling speaking shots. See [media assembly](../media-assembly.md).

Replacing the soundtrack alone cannot repair visible mouth timing. If repair is requested, use a real lip-sync operation on the existing clip or another explicitly authorized take. For off-camera narration, ordinary footage plus a voiceover remains appropriate and does not need this recipe.

## Evidence and maintenance

Primary sources: [MiniMax H3 dialogue languages](https://github.com/MiniMax-AI/MiniMax-H3/blob/main/README.md), [H3 Max's relationship to H3](https://fal.ai/learn/devs/introducing-h3-max-by-fal), [Seedance 2.5 languages](https://docs.volcengine.com/docs/ark/seedance-2-5), [Veo limitations](https://ai.google.dev/gemini-api/docs/veo), [Omni limitations](https://ai.google.dev/gemini-api/docs/omni), [H3 Max Lip Sync](https://fal.ai/h3-max-lip-sync), [HeyGen Avatar 4 audio input](https://fal.ai/models/fal-ai/heygen/avatar4/image-to-video/api).

When adding or updating a model, recheck the exact version and provider route, update its `get_model_params` language guidance and this compact overview if needed, and synchronize the canonical references. Mark missing evidence unverified, not unsupported. Keep complete language lists in the live model guidance, not duplicated across skills.
