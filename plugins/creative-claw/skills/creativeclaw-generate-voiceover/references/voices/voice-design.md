# Design a new voice

Use `design_voice` when the user wants a new synthetic voice from a description and has no recording to clone: "make me a new voice", "give my character a voice", a fictional narrator. It is not cloning, so no speaker recording or cloning consent is needed. Never design a voice to imitate a real person.

## Where each voice comes from

- A consenting speaker's recording → `clone_voice` (creativeclaw-clone-voice).
- A description → `design_voice`.
- A stock catalog voice → `manage_character({ id, voice_model, voice_id })`. This saves the choice on the Character without generating anything.

## Preview

Call `design_voice({ prompt, text, provider, character_id })`:
- `prompt` (20 to 1,000 characters): age, accent, timbre, pace, attitude and use. Describe the sound, never a real person's name or identity.
- `text` (100 to 1,000 characters): one or two of the Character's real lines, about 200 characters. Omit it only when no script exists yet.
- `provider`: `"elevenlabs"` (default), `"google"`, or `"fish"`. For Google or Fish, add `language_code`, such as `"he-IL"`.
- `character_id`: the Character that should get the voice, when known.

Every preview returns three auditions. Let the user pick one. In ChatGPT the Voice Studio card plays them and saves the choice; read it back with `list_characters` rather than saving again.

## Save

`design_voice` only creates the auditions. Save the pick with `manage_character`, passing the audition's `preview_id` as `voice_preview_id`:

- Existing Character: `manage_character({ id, voice_preview_id })`. For an avatar, use the SAME Character `id` so its image and voice stay together.
- New voice-only Character: `manage_character({ title, voice_preview_id })`.

A save keeps the Character's other voices and makes this one preferred for its speech model. If the save hits the limit, relay the tool's message and link, and offer `replace_voice_option_id` to replace a saved designed voice from the same provider. Never quote plan prices.

Older clients may not list `voice_preview_id` on `manage_character`. There the save is `design_voice({ action: "save", preview_id, character_id })`, or `character_name` for a new Character.

## Speak

Call `generate_speech({ character_id, model, text })`:
- ElevenLabs design → `speech/elevenlabs-v4`.
- Google design → `speech/gemini-3.8-flash-tts`.
- Fish design → `speech/fish-drama-3`.

Pass `voice_option_id` to pick a saved voice that is not the preferred one; `list_characters` shows the options. Keep the same Character, model and settings for every line of a project.

## Fish design

With `provider: "fish"`, the description allows up to 2,000 characters and the audition text must be 1 to 150 characters. Three WAV auditions cost 2 credits total, charged once per request. Defaults: `guidance_scale: 2`, `instruct_guidance_scale: 0`, `speed: 1`, `num_step: 32`; an optional seed is supported. Start with defaults. For Hebrew use `language_code: "he-IL"` and full niqqud on every spoken word.

```json
{"provider":"fish","prompt":"Warm Israeli female narrator, expressive modern Hebrew, clear diction and an easy conversational pace.","text":"שָׁלוֹם, אֵיזֶה כֵּיף שֶׁאַתֶּם כָּאן. הַיּוֹם נַתְחִיל בְּסִפּוּר קָטָן.","language_code":"he-IL"}
```

Fish candidate IDs are temporary. Save the selected Creative Claw preview using `manage_character({voice_preview_id})`; this creates a private voice and a Drama 3 Character option. The Character retains its other model voices. Accepted saves with an unknown outcome must not be retried automatically.
