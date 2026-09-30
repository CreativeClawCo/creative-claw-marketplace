# Voice in video: one path per speaking shot

## Whose voice

When a Character speaks and the voice is unknown and matters, ask one question:
- **Design** a new voice from a description: `design_voice`, three auditions. Auditions use the Character's real lines as `text`.
- **Your own voice:** a recording plus consent, through `clone_voice` (creativeclaw-clone-voice).
- **Stock voice:** a catalog voice, saved with `manage_character({ id, voice_model, voice_id })`.

If the voice doesn't matter, pick a stock voice and name it. In ChatGPT the Voice Studio card saves the choice; read it back with `list_characters` rather than saving again.

Save the voice on the Character. Every line reuses `character_id` + `voice_option_id` + the same speech model and settings:
- Designed ElevenLabs voice → `speech/elevenlabs-v4`
- Google-designed voice → `speech/gemini-3.8-flash-tts`
- Clone → `speech/elevenlabs-v2`, `speech/elevenlabs-v4` or `speech/cartesia-sonic`
- Stock voice → its saved model

## Pacing

At most 2.5 spoken words per clip second, with about 0.5 s of air at each end (5 s ≈ 10 words, 8 s ≈ 17). Lock clip durations from the speech result's `wordTimings`. Audition the shot's real first line with `generate_speech` and get it approved before paid video.

## Choose the path

**A. Native dialogue** (any native-audio model, including the default Gemini Omni): quote the line and name the speaker. The model invents the voice, and it changes every clip. Fine for a one-off, not for a recurring Character.

**B. Exact voice with visible lips:** make the speech first, then one of:
- Seedance 2.5 or Mini, H3 Max, or Wan with `audio_urls` plus an image or video reference (line ≥ 2 s; cite `@Audio1` or `Audio 1`).
- Any finished speaking clip → `video/sync-3`: `video_urls` = [clip], `audio_urls` = [line], equal lengths.
- A single talking head → `video/heygen-avatar-4`: `image_url` = face, `extras.audio_url` = line.

Gemini Omni accepts no audio input. Don't pay for speech first and then send the shot to Omni; use path A, or a model above. If the generated voice drifted from the prepared line, put the prepared line back with `merge_audio_video` (default replace mode).

**C. Voiceover, no visible speaker:** prompt "no dialogue, no music", then add the speech afterwards.

**D. UGC creator:** A for a quick one-off; B when the creator recurs or the script is exact.

## Mix

- `merge_media` `merge_audio_video` with `audio_mode: "mix"` keeps the clip's own sound and layers the new track over it at the video's length. Set `original_volume` and `added_volume` (0–1; about 0.3 for music under speech). `start_offset` delays the new track.
- `audio_mode: "replace"` (the default) discards the clip's audio and ends at the shorter input.
- `compose_video` with one clip plus `audio: { url, start_delay_seconds }` layers the track at full level and can run past the clip's end.
- `assemble_film` narration replaces every shot's audio. Set `with_narration: false` when shots carry dialogue.

## Order

Dialogue per shot → `assemble_film` (`with_narration: false` if shots speak) → `add_subtitles` → music bed with `merge_audio_video` `audio_mode: "mix"` → check the duration and that the dialogue survived.
