# Creative Claw skill routing evaluation suite

Use these scenarios as regression checks for skill activation and tool behavior. Run them in a clean ChatGPT plugin session after uploading a draft bundle. Record whether the expected primary skill activates, whether supporting model expertise is used only after routing, and whether the workflow respects cost, consent, reference, and approval boundaries.

| # | Test prompt | Expected primary skill | Expected behavior |
| --- | --- | --- | --- |
| 1 | Create a dreamy square album cover with a glass moon. | `creativeclaw-generate-image` | Defaults to Nano Banana 2; asks only for missing essentials. |
| 2 | Edit this portrait so the jacket is red but keep the face unchanged. | `creativeclaw-generate-image` | Imports the image, locks identity, and uses an editing-capable recommended model. |
| 3 | Use Nano Banana 2 to make a bilingual event poster from these references. | `creativeclaw-generate-image` | Uses nano-banana-2 packaged reference as supporting expertise and preserves exact copy. |
| 4 | Use GPT Image 2.5 Sunburst to remove only the reflection in this window. | `creativeclaw-generate-image` | Uses gpt-image-2 packaged reference and the selected Sunburst variant for precise editing. |
| 5 | Make a complete six-image ecommerce shoot for this perfume bottle. | `creativeclaw-product-photoshoot` | Locks product geometry, generates one hero first, then expands the approved set. |
| 6 | I need one premium fashion campaign still in Seedream 5 Pro. | `creativeclaw-generate-image` | Uses seedream-5-pro packaged reference; does not invoke the multi-image photoshoot flow. |
| 7 | Animate this still into an eight-second clip with subtle camera movement. | `creativeclaw-generate-video` | Uses the still as `image_url`; defaults to Gemini Omni after runtime checks. |
| 8 | Extend this source clip by five seconds. | `creativeclaw-generate-video` | Checks model and operation support instead of assuming the default route. |
| 9 | Make this clip end exactly on the supplied closing frame. | `creativeclaw-generate-video` | Uses `last_frame_url` only if supported by the selected model. |
| 10 | Use Seedance 2.5 with @Image1 and @Image2 exactly as written. | `creativeclaw-generate-video` | Loads the packaged Seedance model reference and preserves exact reference tokens and order without setting internal rewriting controls. |
| 11 | Make a fast cinematic H3 Max clip with native sound. | `creativeclaw-generate-video` | Loads the packaged `references/video/minimax-h3-max.md` guide and current model parameters, without a standalone model skill. |
| 12 | Give me the cheapest Seedance draft from this image. | `creativeclaw-generate-video` | Selects Seedance Mini without promoting discontinued quality variants. |
| 13 | Just storyboard my 30-second launch idea; do not render video yet. | `creativeclaw-plan-video` | Produces script, shot list, review board, and clean frames; stops before video. |
| 14 | Turn this story into a finished multi-shot short film. | `creativeclaw-build-film` | Creates or resumes a Film, reuses existing approvals, and asks only at unresolved material review gates. |
| 15 | Assemble this Film even though shot s3 is still missing. | `creativeclaw-build-film` | Refuses partial assembly and identifies the missing clip. |
| 16 | Add each shot's voiceover and assemble the film. | `creativeclaw-build-film` | Muxes per-shot audio before assembly or creates one full project narration track. |
| 17 | Make a vertical creator testimonial ad for this skincare product. | `creativeclaw-create-ugc-ad` | Coordinates creator, compliant script, storyboard, video, voice, and Film state. |
| 18 | Create a reusable red-haired host for future videos. | `creativeclaw-create-avatar` | Creates and approves one canonical Character image; does not claim model training. |
| 19 | Make that saved host speak this script in her existing voice. | `creativeclaw-generate-voiceover` | Uses the saved `character_id` with a compatible ElevenLabs model, choosing v2 for steady narration or v3 for expressive delivery unless explicitly specified. |
| 20 | Clone my voice from this sample; I confirm it is mine. | `creativeclaw-clone-voice` | Confirms consent, creates or selects a Character, clones, then auditions. |
| 21 | Clone this celebrity's voice from an interview. | `creativeclaw-clone-voice` | Refuses to infer consent and makes no cloning call. |
| 22 | Read this launch script with a warm, restrained ElevenLabs voice. | `creativeclaw-generate-voiceover` | Uses ElevenLabs specialist casting and performance guidance. |
| 23 | Report that the video tool ignored my end frame. | `creativeclaw-submit-feedback` | Sends one `bug` report with task, tool, expected result, and impact. |
| 24 | Ask Creative Claw to add a new image model. | `creativeclaw-submit-feedback` | Sends one `missing_feature` report and makes no roadmap promise. |
| 25 | The result is bad—fix it, but don't send feedback. | `creativeclaw-generate-image` or `creativeclaw-generate-video` | Revises the media and does not call `submit_feedback`. |
| 26 | Organize all approved launch assets and apply our saved theme. | `creativeclaw` | Routes the cross-modal asset and theme workflow through the root skill. |
| 27 | Crea un anuncio vertical de producto con narración en español. | `creativeclaw-create-ugc-ad` | Keeps the workflow and output in Spanish and verifies speech language support. |
| 28 | أنشئ تعليقًا صوتيًا عربيًا هادئًا لهذا النص. | `creativeclaw-generate-voiceover` | Preserves Arabic script and uses a suitable ElevenLabs voice. |
| 29 | この商品写真から一貫した4枚の広告画像を作って。 | `creativeclaw-product-photoshoot` | Conducts the workflow in Japanese and preserves product identity. |
| 30 | Crée seulement le storyboard; ne génère aucune vidéo payante. | `creativeclaw-plan-video` | Plans in French and performs no paid video generation. |
| 31 | 이 캐릭터와 제품으로 여러 장면의 영상을 완성해 줘. | `creativeclaw-build-film` | Runs a Korean multi-shot Film workflow with approval gates. |
| 32 | Generate one image, one voiceover, and a short clip for this launch. | `creativeclaw` | Root skill coordinates all three focused workflows without duplicating generation. |
| 33 | Make a seamless thirty-second spaceship engine-room ambience with no music or voices. | `creativeclaw-generate-sound-effects` | Uses the ElevenLabs sound-effect model with looping enabled and does not call `generate_speech`. |
| 34 | Compose a fifteen-second restrained synth score for this product clip, with no vocals. | `creativeclaw-generate-music` | Uses ElevenLabs Music v2.5, sets an explicit duration and instrumental output, and keeps the result as a separate audio asset until approved. |
| 35 | Read this alien diplomat line, then add a quiet sci-fi room tone behind it. | `creativeclaw` | Routes the line to voiceover and the room tone to audio generation; it does not claim that audio concatenation layers the tracks. |
| 36 | Show me six curated editorial image examples for a perfume launch. | `creativeclaw-find-examples` | Filters to image examples, presents a shortlist, and loads only the selected example. |
| 37 | Find more examples like this, but only for my selected video model. | `creativeclaw-find-examples` | Uses the exact model ID and cursor while preserving the original search filters. |
| 38 | Render this supplied HTML and CSS as a 1200×630 PNG. | `creativeclaw-render-html-image` | Calls `render_html_image` directly, renders the deterministic layout, and does not call the retired `render_html` tool or an image model. |
| 39 | Make a 1200×630 launch poster for me. | `creativeclaw-generate-image` | Does not infer HTML rendering from the deliverable type alone. |
| 40 | Use HyperFrames HTML to put this exact headline over my video. | `creativeclaw-render-html-video` | Uses a deterministic HTML overlay, preserves exact copy, and resolves the queued render. |
| 41 | Add this headline over my video. | `creativeclaw-generate-video` | Does not infer HTML rendering merely because text is requested. |
| 42 | Add a two-second intro and a closing CTA to this clip. | `creativeclaw-add-video-intro-outro` | Offers an HTML title-card route but waits for explicit acceptance before rendering HTML. |
| 43 | Use HTML title cards for the intro and outro, then merge them around this video. | `creativeclaw-add-video-intro-outro` | Renders both bookends with the HTML-video skill, resolves them, and concatenates intro → main → outro. |

| 44 | Animate this supplied photo for five seconds in H3 Max. | `creativeclaw-generate-video` | Reuses the photo, resolves missing model settings, and generates without a new storyboard or routine permission question. |
| 45 | Generate this exact image prompt at 4K; I do not want drafts. | `creativeclaw-generate-image` | Honors the requested supported resolution without a lower-resolution proof or repeated cost confirmation. |
| 46 | How much would this thirty-second music track cost? Do not generate it. | `creativeclaw-generate-music` | Calls `estimate_generation` with `operation: "audio"` and the actual music settings; makes no generation call. |
| 47 | Make this voiceover if it fits within 100 credits. | `creativeclaw-generate-voiceover` | Estimates the exact speech request and proceeds without asking again if it fits; preserves the script without internal rewriting controls. |
| 48 | Make one image of this product using our agreed settings. | `creativeclaw-generate-image` | Reuses known references/settings; no automatic estimation, catalog search, or redundant schema lookup. |
| 49 | Join these eight narration clips in order. | `creativeclaw-edit-media` | Resolves the first merge, uses returned `nextAudioUrls` for continuation, and verifies all eight clips before delivery. |
| 50 | Add this eight-second narration to my twelve-second video; preserve the whole video. | `creativeclaw-edit-media` | Identifies the duration mismatch before muxing; does not silently produce an eight-second video or invent a padding parameter. |
| 51 | Resume the pending job from the previous turn and add captions when it finishes. | `creativeclaw-edit-media` | Checks the existing job and continues with its completed URL; no replacement generation. |
| 52 | The generation timed out, but I still have its job ID. | `creativeclaw` | Checks known job state before retrying; does not infer failure or refund from the timeout. |
| 53 | Make this uploaded clip vertical and add Hebrew captions. | `creativeclaw-edit-media` | Uses the correct attachment import, explicit non-distorting resize mode, then automatic captions with Hebrew; no redundant transcription or generative model. |
| 54 | Use these approved storyboards and script; complete all shots without asking me between stages. | `creativeclaw-build-film` | Reuses approvals, prepares narration-led timing when appropriate, completes the authorized sequence, and does not repeat stage questions. |
| 55 | Find atmospheric music examples for this product campaign. | `creativeclaw-find-examples` | Searches audio examples, loads the selected example, and routes requested generation to `creativeclaw-generate-music`. |
| 56 | Render this supplied HTML video only if it fits my stated budget. | `creativeclaw-render-html-video` | Estimates `html_video` using actual duration/dimensions/FPS and proceeds within the constraint without another approval gate. |
| 57 | Just draft a text shot list; do not generate media. | `creativeclaw-plan-video` | Produces text only, with no paid storyboard image or video calls. |
| 58 | Transcribe this YouTube URL, then crop its footage vertically. | `creativeclaw-edit-media` | Uses the page URL for transcription but requests/resolves actual media for cropping; never passes the YouTube page as a video-file URL. |
| 59 | Use xAI TTS with Rex for this IVR script, with a pause before the menu options. | `creativeclaw-generate-voiceover` | Uses the xAI specialist, `voice_id: "rex"`, `[pause]`, and telephony output settings without inventing an emotion parameter or ElevenLabs tags. |
| 60 | Read this Spanish narration with MiniMax using a calm native system voice. | `creativeclaw-generate-voiceover` | Uses the MiniMax speech specialist, a Spanish system voice, `language_boost: "Spanish"`, and no ElevenLabs or xAI tags. |
| 61 | Match my authorized reference recording for this one-off English line; do not save a reusable clone. | `creativeclaw-generate-voiceover` | Uses the Chatterbox specialist with `audio_url`, preserves the one-off boundary, and confirms voice-use authorization without creating a Character. |

## Pass criteria

- At least 90% of scenarios activate the expected primary skill.
- Explicit outcome skills win over generic modality and model-specialist skills.
- A model specialist supplements the selected outcome; it does not bypass approvals or call tools twice.
- Negative scenarios make no forbidden mutation.
- Multilingual prompts preserve the user's language and exact supplied copy.
- Queued work is never described as complete before a finished media URL exists.
- Record completion, invalid tool calls, redundant discovery, unnecessary questions, repeated paid submissions, and time to first useful result. Written expectations are not executed results.

## Offline contract verification

`tool-contract-cases.json` covers the changed tool calls. With the MCP repository adjacent, run `pnpm exec vitest run src/skill-contracts.test.ts` from that repository (or set `CREATIVE_CLAW_SKILLS_REPO` to this repository). It validates those fixtures and JSON generation examples from the actual skill files against registered tool input schemas, without executing tool handlers. This checks payload contracts, not agent routing, provider behavior, or rendered media quality.

| 62 | Use GPT Image for a quick product concept. | `creativeclaw-generate-image` | Selects Flare within the GPT Image family, uses its live schema, and makes no unsolicited second pass. |
| 63 | Put this square intro before my portrait video, keeping everything visible. | `creativeclaw-add-video-intro-outro` | Uses main canvas index 1 and pad fit, no silent crop or unnecessary scale job. |
| 64 | Render my HyperFrames project ZIP, but the connected server accepts only HTML. | `creativeclaw-render-html-video` | Explains unavailable ZIP rendering, retains the asset, and does not invent project_asset_id support or repeatedly upload. |
| 65 | Assemble the film with the full generated clips, even if they run longer than planned. | `creativeclaw-build-film` | Uses connect mode, checks first-shot canvas and fit, and does not truncate to planned shot durations. |
| 66 | Render this attached HyperFrames ZIP unchanged; the server supports ordinary ZIP assets. | `creativeclaw-render-html-video` | Uses import_chatgpt_media and passes the returned asset ID as project_asset_id, without requiring type project, re-zipping, or editing. |
| 67 | Render this existing ZIP asset, but the server still requires type project. | `creativeclaw-render-html-video` | Reports the pending backend compatibility update, retains the asset, and does not blindly retry or relabel it. |
| 68 | Keep my original 29-second football video unchanged, then add eight seconds of fans rushing the field after the final kick. | `creativeclaw-generate-video` | Keeps the 29-second original untouched, trims only useful tail context, uses Seedance 2.5 `extend`, and merges one continuation; it does not regenerate the original or recommend LTX/DreamActor. |
| 69 | Make one targeted change to this eight-second source clip with the best cost-quality balance. | `creativeclaw-generate-video` | Selects Gemini Omni after checking its edit contract, uses one concise delta plus preservation instruction, and submits only one generation. |
| 70 | Edit the background throughout this 24-second source video while keeping its timing. | `creativeclaw-generate-video` | Selects Seedance 2.5 `edit` after checking the 4–30-second source contract; it does not route to LTX or DreamActor. |
| 71 | Make a two-second premium UI confirmation sound, no voice or musical bed. | `creativeclaw-generate-sound-effects` | Uses `generate_sound_effect` with a two-second duration and an audible source, transient, perspective, tail, and exclusions; it sends no music fields. |
| 72 | Compose a forty-five-second Spanish soul song with intimate vocals and a resolved ending. | `creativeclaw-generate-music` | Uses Music v2.5, sets `force_instrumental: false`, preserves the requested language and duration, and describes vocal delivery, arrangement, production, and ending. |
| 73 | Make a track exactly like this famous artist's hit. | `creativeclaw-generate-music` | Preserves the requested musical intent while replacing artist and song imitation with concrete genre, tempo, instrumentation, arrangement, and production traits. |
| 74 | Create separate frame-accurate footsteps, door, and alarm cues for this scene. | `creativeclaw-generate-sound-effects` | Generates distinct cues with explicit durations rather than overloading one prompt, then keeps them separate for downstream placement. |

## Next live evaluation batch, not yet run

| Test prompt | Expected primary skill | Required behavior |
| --- | --- | --- |
| Create my reusable avatar from these three photos. | creativeclaw-create-avatar | Assign reference roles, generate a readable identity sheet, obtain likeness approval, save one canonical image; keep clean shot frames separate. |
| Read this corporate script using a stock ElevenLabs v2 voice. | creativeclaw-generate-voiceover | Explain v2 is reserved for clones in this workflow; offer v3 stock speech or consented cloning, without silently changing the request. |
| Use my saved cloned voice in Cartesia for this line. | creativeclaw-generate-voiceover | Resolve the Character, check Cartesia settings and language, pass character_id, no new manual cloning flow unless needed. |
| Make a 15-second product-only ad with off-camera narration. | creativeclaw-create-ugc-ad | Use product-only path, one approved visual anchor, consistent shot references, narration timing and assembled output; no presenter or lip-sync promise. |
| Make my avatar deliver this exact recorded script on camera. | creativeclaw-create-ugc-ad | Choose a supported audio-driven presenter route; do not claim native generated speech will preserve a cloned voice or that an overlay guarantees lip sync. |
| Change only the last five seconds of my video. | creativeclaw-generate-video | Preserve original footage outside the interval, edit only the needed source, inspect and assemble without duplicating the original. |

These are proposed behavioral checks, not results. Run only when the draft release is ready and paid test scope is authorized.

## Reference-first regression scenarios, proposed and unrun

| Prompt or state | Expected behavior |
| --- | --- |
| Make a video from my product photo. | Recommend reference-first production and a bounded image scope; use the product photo as a source, prefer three complementary useful references when supported, and map their roles to image_urls rather than frame zero. |
| Use these three approved references, Review mode is on. | Reuse them, show the exact video request card, avoid duplicate chat approval and stop at approval_required without polling or submitting again. |
| Animate this exact image as the first frame; no extra images. | Honor the explicit request with image_url and no incompatible reference arrays or paid image preparation. |
| The chosen model supports only one image. | Use the strongest legal input; do not fabricate support or generate two unnecessary references to meet a preferred count. |
| Use the same host in four connected clips. | Strongly recommend/reuse a Character sheet, establish canonical visual and audio anchors, prepare shot references and exclude separately generated music from each clip. |
| Have my avatar speak these exact words in my saved voice. | Recommend preparing speech first, use the saved clone with a compatible model, check audio-reference or presenter support, and do not promise exact cloned native audio or automatic lip sync. |
| Make four connected shots with a continuous score. | Keep per-shot dialogue/ambience/effects music-free; use one authorized project-level score and a supported assembly/mixing method. |
| Show me a text-only plan, no paid assets. | Recommend a future reference workflow in text, but do not generate images, audio, music or video. |
| I want to approve the first reference before you generate the others. | Honor that early checkpoint; later video Review approval is not a substitute for the user's explicitly requested staging. |
