# Voice in video: one path per speaking shot

Choose from the material already available. One presenter image and finished speech go to HeyGen Avatar 6. For a new scene with interacting speakers or substantial body or camera movement, choose Seedance 2.5, 2.5 Flash, 2.0 Mini or Kling 4.0 Omni before storyboarding, make the lines first and keep them with [exact audio](#exact-audio-keep-finished-speech-or-a-song-as-recorded), in any language. Existing footage with visible speech goes to `lip_sync_video` when the mouths need matching. Gemini Omni 1.2 Flash generates native sound and accepts no audio input. Mix off-screen narration over the footage.

## Whose voice

When a Character speaks and the voice is unknown and matters, ask one question:
- **Design** a new voice from a description: `design_voice`, three auditions. ElevenLabs and Fish can audition a real line. Google chooses its preview text.
- **Your own voice:** `clone_voice` without audio opens the voice card, which records and clones it with consent (creativeclaw-clone-voice).
- **Stock voice:** use `search_voices` for the spoken language and requested accent. Use the selected model and voice ID together. With the user's agreement, save the selection with `update_character({ id, voice_model, voice_id })`.

If the voice doesn't matter, pick a stock voice and name it. In ChatGPT the Voice Studio card saves the choice; read it back with `list_characters` rather than saving again.

Save the voice on the Character. Every line reuses `character_id` + `voice_option_id` + the same speech model and settings:
- Designed ElevenLabs voice → `speech/elevenlabs-v4`
- Google-designed voice → `speech/gemini-3.8-flash-tts`
- Cartesia clone → `speech/cartesia-sonic`
- ElevenLabs clone → `speech/elevenlabs-v2` for a steady read, or `speech/elevenlabs-v4` for expressive delivery or dialogue
- Stock voice → its saved model

**A recurring speaker becomes a Character.** When the same person will speak in more than one shot or video (a presenter, founder, doctor, creator or host, including a real person from a supplied photo), settle the voice before the first speaking shot, then offer once to save that person with their face references and the chosen voice as a Character (`create_character`, then the voice as above). Save only when the user agrees. Every later line and video then reuses the same face and voice instead of rebuilding them.

**Voices first for continuity.** When the user wants the same people across clips, make the voices before the video: settle each speaker's voice, generate every line with `generate_speech` in that voice, and send it with the shot (path B below: HeyGen Avatar 6 for one person in view, otherwise Seedance 2.5, Flash, Mini or Kling 4.0 Omni with the lines kept by exact audio). Native dialogue (path A) invents a new voice in every clip, and Gemini Omni takes no audio, so neither carries a recurring speaker.

When the user likes a generated look or voice, offer once to save it as a named Character for future work. Check `list_characters` first. A request to save already gives agreement. When authorized, update the existing Character or create one with the approved image or selected voice. Reuse its ID for later shots or speech. A voice-only Character works for a narrator. If the voice card already saved the selection, reuse that record.

## Pacing

At most 2.5 spoken words per clip second, with about 0.5 s of air at each end (5 s ≈ 10 words, 8 s ≈ 17). Lock clip durations from the speech result's `wordTimings`. Audition the shot's real first line with `generate_speech` and get it approved before paid video.

## Choose the path

First read the selected model's spoken-language guidance from `get_model_params({ model })`. Native dialogue (path A) needs a documented language. Finished speech kept by exact audio (path B) works in any language. For a talking face in an unsupported or unverified language, follow [spoken languages](spoken-languages.md).

**A. Native dialogue** (a native-audio model with documented support for the requested spoken language): quote the line and name the speaker. The model invents the voice, which can change between clips. Suitable only for a one-off where that variation is acceptable, never for a speaker who appears in another clip.

**B. Exact words or an exact voice with visible lips:** make the speech first. The speech is the finished line itself: `generate_speech` with the chosen voice, or a recording the user supplies. A voice sample, or audio cut from an earlier clip, is not the line; if that is all there is, clone or design the voice from it first, then generate each line. Then choose by what is on screen:
- **One person speaking, to camera or clearly in view** (presenter, doctor, founder, creator, spokesperson) → `video/heygen-avatar-6`, in any language: `image_url` = one approved shot image of that one person with the face clearly visible (never a character sheet or multi-panel image), `extras.audio_url` = the finished line. The video is exactly as long as the audio and keeps it as the soundtrack, so the words come out exactly as recorded. Gestures follow the script; `extras.motion_prompt` directs gestures, expression, posture and camera (a push-in works). The presenter moves in place, the background stays still, and the first frame is a close redraw of the image, not the exact pixels. Output follows the image's framing at 1080p or 2K. `video/heygen-avatar-6-turbo` takes the same inputs at half the price for drafts and long budget clips. If HeyGen is unavailable for the account, use `video/minimax-h3-max-lip-sync` with the same image and audio; `video/heygen-avatar-4` when it is selected. Check current limits with `get_model_params`.
- **Several people in frame, a conversation, or a shot led by body performance or camera movement** → Seedance 2.5, 2.5 Flash, 2.0 Mini or Kling 4.0 Omni with the finished lines in `audio_urls` and `extras.exact_audio` (below), in any language. The clip keeps every line word for word and needs no lip-sync pass. Without `extras.exact_audio` the lines are only voice references: the model performs them anew and can add, drop or repeat words.
- **An existing video whose mouths must match a voice** (new or corrected speech, a dub, a voice that drifted; real people, cartoons, 3D characters or animals; one speaker or several) → `lip_sync_video`, not `generate_video`: `video_url` = the clip, `audio_url` = the finished line or full track, which replaces the video's audio, or no `audio_url` when the video already has the voice in it. Lengths need not match: a longer voice holds the last frame. Music in the track is fine. Say who speaks in `prompt` when it isn't obvious ("the first voice is the owl, the second the squirrel"). Leave `model` out; use `model: "sync-3"` only when the user asks for Sync 3. Only the speaking character's lower face changes, one line at a time. Lines spoken off screen or with the mouth out of view stay as they are and come back in `warnings`, so tell the user which ones. It follows Review and Auto and finishes through `check_job`: a short clip takes about a minute and a half, a minute of dialogue about five minutes. Never silently replace a model the user selected.
- [HeyGen Lipsync](heygen-lipsync.md) remains an alternative when explicitly selected: one `video_urls` clip and one `audio_urls` recording, `extras.mode: "precision"` (default mode); choose Speed explicitly for half the price per output second. Source framing is retained; inspect dynamic-duration behavior before submitting.

In any prompt for a model that speaks, quote only the words to be said. Keep production labels (scene numbers, "ONLY", notes about other shots) out of the prompt: speaking models can read them aloud.

Gemini Omni accepts no audio input on the current route. Don't pay for speech first and then send the shot to Omni; use path A, or a model above. If a generated performance drifts from the prepared recording, replacing its soundtrack does not fix mouth timing. Use a requested lip-sync repair with `lip_sync_video`, preserving an explicit model choice, or an authorized new audio-driven take. Add an audio overlay alone only for voiceover without visible speech or when matching lip timing has actually been verified.

**C. Voiceover, no visible speaker:** prompt "no dialogue, no music", then add the speech afterwards.

**D. UGC creator:** A for a quick one-off; B when the creator recurs or the script is exact.

## Exact audio: keep finished speech or a song as recorded

On `video/seedance-2.5`, `video/seedance-2.5-flash`, `video/seedance-2.0-mini` and `video/kling-4.0-omni`, finished audio (lines from `generate_speech`, the user's recording, a song or a section of one) is kept exactly as recorded, in any language, and the picture is animated to it. Without `extras.exact_audio`, audio in `audio_urls` is only a voice reference and is performed anew: other words, another voice, shifted timing. `get_model_params` describes it for each of these models. Call `generate_video` with:

- `audio_urls`: the finished lines or song, in order.
- `extras.exact_audio: { tracks: [{ audio: 1, as: "speech", start: 0.5 }, ...] }`. `audio` is the 1-based position in `audio_urls`. `as` is `speech`, `music`, `sfx`, or `guide` (stays an ordinary audio reference, for a voice or style hint only). `start` is seconds into the clip: place each line where the prompt has it, never in silence the prompt fills with action. Tracks must not overlap.
- An optional opening frame as `image_url`, made at the output's aspect ratio; the clip opens on it, and with exact audio it may go beside `image_urls`. `image_urls` are references only (faces, places, products) and never the first frame.
- `aspect_ratio` when there is no `image_url` (else 16:9).
- A prompt with a timed shot plan for the whole clip and the camera moving in every beat, naming the lines `@Audio1`, `@Audio2`. A prompt with little action gives a stiff shot.
- Sound effects timed after the last line ("from 9.5 s, after he stops talking, the engine roars"): the model adds sound only where the audio is silent, and an effect asked for earlier can drown the words. Write the beat after the last line as "nobody speaks", or the model may invent an echo of the last line there.

```json
{
  "model": "video/seedance-2.5-flash",
  "duration": 10,
  "image_url": "<approved opening frame>",
  "image_urls": ["<Dana's character sheet>"],
  "audio_urls": ["<Itay's line>", "<Dana's line>"],
  "prompt": "0–4 s: slow push-in on Itay at the wheel as he says @Audio1. 4–8 s: the camera pans to Dana (@Image1) in the passenger seat; she answers @Audio2. 8–10 s: wide tracking shot of the car on the coast road; nobody speaks. From 8.5 s the engine roars.",
  "extras": { "exact_audio": { "tracks": [{ "audio": 1, "as": "speech", "start": 0.5 }, { "audio": 2, "as": "speech", "start": 4.5 }] } }
}
```

The clip runs from the start to the last line's end plus 1 s, or the requested duration if longer (Mini 4–15 s, Seedance 2.5 and Flash 4–30 s, Kling 3–30 s). The audio travels in a video input, so it costs about 20% more. The kept voice can come back slightly quieter. When exact audio can't apply, the request runs as an ordinary audio reference and the result says why: tell the user, since the words may change.

## Mix

- `add_audio_to_video` with `audio_mode: "mix"` keeps the clip's own sound and layers the new track over it at the video's length. Set `original_volume` and `added_volume` (0–1; about 0.3 for music under speech). `start_offset` delays the new track.
- `audio_mode: "replace"` (the default) discards the clip's audio and ends at the shorter input.
- `stitch_clips` with one clip plus `audio: { url, start_delay_seconds }` layers the track at full level and can run past the clip's end.
- `assemble_film` narration replaces every shot's audio. Set `with_narration: false` when shots carry dialogue.

## Order

Dialogue per shot (no music or background ambience in the clips) → `assemble_film` (`with_narration: false` if shots speak) → `add_subtitles` → scene ambience bed, then music, each with `add_audio_to_video` `audio_mode: "mix"` ([media assembly](../media-assembly.md)) → check the duration, that the dialogue survived and that no join changes background.
