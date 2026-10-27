# Voice in video: one path per speaking shot

## Whose voice

When a Character speaks and the voice is unknown and matters, ask one question:
- **Design** a new voice from a description: `design_voice`, three auditions. Auditions use the Character's real lines as `text`.
- **Your own voice:** `clone_voice` without audio opens the voice card, which records and clones it with consent (creativeclaw-clone-voice).
- **Stock voice:** a catalog voice, saved with `update_character({ id, voice_model, voice_id })`.

If the voice doesn't matter, pick a stock voice and name it. In ChatGPT the Voice Studio card saves the choice; read it back with `list_characters` rather than saving again.

Save the voice on the Character. Every line reuses `character_id` + `voice_option_id` + the same speech model and settings:
- Designed ElevenLabs voice → `speech/elevenlabs-v4`
- Google-designed voice → `speech/gemini-3.8-flash-tts`
- Cartesia clone → `speech/cartesia-sonic`
- ElevenLabs clone → `speech/elevenlabs-v2` for a steady read, or `speech/elevenlabs-v4` for expressive delivery or dialogue
- Stock voice → its saved model

**A recurring speaker becomes a Character.** When the same person will speak in more than one shot or video (a presenter, founder, doctor, creator or host, including a real person from a supplied photo), settle the voice before the first speaking shot, then offer once to save that person with their face references and the chosen voice as a Character (`create_character`, then the voice as above). Save only when the user agrees. Every later line and video then reuses the same face and voice instead of rebuilding them.

## Pacing

At most 2.5 spoken words per clip second, with about 0.5 s of air at each end (5 s ≈ 10 words, 8 s ≈ 17). Lock clip durations from the speech result's `wordTimings`. Audition the shot's real first line with `generate_speech` and get it approved before paid video.

## Choose the path

First read the selected model's spoken-language guidance from `get_model_params({ model })`. For visible speech in an unsupported or unverified language, follow [spoken languages](spoken-languages.md): one image and one audio-driven generation for a single talking face; consistent images from the same references, per-shot speech and concatenation only when multiple shots are requested. Documented languages keep the normal paths below.

**A. Native dialogue** (a native-audio model with documented support for the requested spoken language): quote the line and name the speaker. The model invents the voice, which can change between clips. Suitable for a one-off where that variation is acceptable.

**B. Exact words or an exact voice with visible lips:** make the speech first. The speech is the finished line itself: `generate_speech` with the chosen voice, or a recording the user supplies. A voice sample, or audio cut from an earlier clip, is not the line; if that is all there is, clone or design the voice from it first, then generate each line. Then choose by what is on screen:
- **One person speaking, to camera or clearly in view** (presenter, doctor, founder, creator, spokesperson) → `video/minimax-h3-max-lip-sync`, in any language: `image_url` = the approved shot image with the face clearly visible, `extras.audio_url` = the finished line. The video is exactly as long as the audio and keeps it as the soundtrack, so the words come out exactly as recorded. Framing, wardrobe and setting come from the image; its prompt does not direct the acting or camera. It costs the same per second as H3 Max reference mode at 480P. Check its current audio-length limits with `get_model_params`. `video/heygen-avatar-4` takes the same image and audio when it is selected.
- **Several people in frame, a conversation, or a shot where body performance or camera movement matters more than exact words** → Seedance 2.5 or H3 Max with the finished line in `audio_urls` plus an image or video reference, only when the requested language is documented for the selected model. These models perform the line again from the reference: they can add, drop or repeat words even when the line is quoted, so check the result's words before using it. Check the model's own tokens and limits.
- Any finished speaking clip → `video/sync-3`, the recommended lip-sync model: `video_urls` = [clip], `audio_urls` = [line], equal lengths. If `audio_urls` is omitted, Creative Claw extracts the source video's embedded audio. Automatic or manual speaker selection is supported. Never silently replace a model the user selected.
- [HeyGen Lipsync](heygen-lipsync.md) remains an alternative when explicitly selected: one `video_urls` clip and one `audio_urls` recording, `extras.mode: "precision"` (default mode, 6 credits per output second); choose Speed explicitly for lower cost at 3 credits per output second. Source framing is retained; inspect dynamic-duration behavior before submitting.

In any prompt for a model that speaks, quote only the words to be said. Keep production labels (scene numbers, "ONLY", notes about other shots) out of the prompt: speaking models can read them aloud.

Gemini Omni accepts no audio input on the current route. Don't pay for speech first and then send the shot to Omni; use path A, or a model above. If a generated performance drifts from the prepared recording, replacing its soundtrack does not fix mouth timing. Use a requested lip-sync repair with `video/sync-3`, preserving an explicit model choice, or an authorized new audio-driven take. Add an audio overlay alone only for voiceover without visible speech or when matching lip timing has actually been verified.

**C. Voiceover, no visible speaker:** prompt "no dialogue, no music", then add the speech afterwards.

**D. UGC creator:** A for a quick one-off; B when the creator recurs or the script is exact.

## Mix

- `add_audio_to_video` with `audio_mode: "mix"` keeps the clip's own sound and layers the new track over it at the video's length. Set `original_volume` and `added_volume` (0–1; about 0.3 for music under speech). `start_offset` delays the new track.
- `audio_mode: "replace"` (the default) discards the clip's audio and ends at the shorter input.
- `stitch_clips` with one clip plus `audio: { url, start_delay_seconds }` layers the track at full level and can run past the clip's end.
- `assemble_film` narration replaces every shot's audio. Set `with_narration: false` when shots carry dialogue.

## Order

Dialogue per shot → `assemble_film` (`with_narration: false` if shots speak) → `add_subtitles` → music bed with `add_audio_to_video` `audio_mode: "mix"` → check the duration and that the dialogue survived.
