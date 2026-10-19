# HeyGen Lipsync

## HeyGen Lipsync usage

Replace a visible speaker's speech in an existing video using finished audio. Supply exactly one public HTTPS video_urls entry and one public HTTPS audio_urls entry. The audio supplies the words, voice, emotion, language, and pacing. The required prompt is a task label and is not sent to HeyGen. Within HeyGen, Precision is the default mode at 6 credits per output second; explicitly selected Speed costs 3 credits per output second. Prepare speech first, estimate with the intended settings, submit once, and use check_job for the permanent result saved in the asset library. Review mouth timing and the preserved performance before delivery.

For lip-syncing an existing video to finished speech, recommend video/sync-3. Supply one video_urls input and one finished speech recording in audio_urls; if audio_urls is omitted, Creative Claw extracts the source video's embedded audio. Sync 3 supports automatic or manual speaker selection. Keep video/heygen-lipsync as an alternative when explicitly selected; its mode defaults to precision and it requires one video_urls and one audio_urls input. Honor an explicit model choice and never switch or retry a paid generation automatically.

### When to use it

- Replacing dialogue or correcting a script while keeping an existing on-camera performance and framing.
- Giving a filmed speaker a cloned or designed voice after generating the finished speech separately.
- Localizing a talking clip when you already have the finished target-language recording. Lipsync itself does not translate.

### When to choose another tool

- You have a still portrait rather than a video. Use video/heygen-avatar-4 with the image and prepared speech.
- You need a new scene, camera move, body performance, or background. Generate or edit the footage with a video model first, then lip-sync the finished clip if needed.
- You only need narration over footage with no visible speaking mouth. Use an audio overlay or editing workflow. Mouth synthesis adds no value here.
- Several faces are visible and you must explicitly select the speaker. Consider video/sync-3 and inspect its current speaker-selection controls. HeyGen Lipsync exposes no speaker-selection field.
- You need translation, text-to-speech, voice cloning, or voice design. Perform that step first, then provide the final recording in audio_urls. A cloning sample is not the replacement dialogue.

### Speed or Precision

- Speed: Choose explicitly for quick reviews and cost-sensitive clips. It is the faster, lower-cost mode. 3 credits per output second.
- Precision: Recommended default for existing-video lip sync, prioritizing mouth fidelity. HeyGen describes higher-fidelity avatar inference. Quality and completion time are not guaranteed. 6 credits per output second.
- Use the user's requested mode. If unspecified, use Precision. Do not override an explicit Speed choice or run both modes; each submission is a separate paid generation.

### How to prompt it

prompt is a required task label in generate_video and is not included in the HeyGen provider request.

Task label: `Sync this video to the supplied finished speech.`

- Put the exact words, pronunciation, pauses, emotion, and delivery into the audio before submitting.
- A longer prompt, quoted script, camera instructions, negative prompt, or emotion tags cannot steer this endpoint. Do not copy TTS expression syntax into this prompt.

### Prepare the inputs

- Exactly one existing video in top-level video_urls and one finished replacement recording in top-level audio_urls. Both must be public HTTPS URLs the service can fetch.
- For a partial edit, start_time and end_time are source-video timestamps in seconds. They must fall within the measured source duration, with end_time greater than start_time.
- Prefer a clearly visible speaking face, a readable mouth, steady lighting, and limited occlusion. These are practical quality recommendations, not additional API requirements.
- Listen to the replacement speech first. Fix wording, pronunciation, voice, emotion, and pacing before paying to synchronize the video.
- Prefer clean speech with little noise or competing dialogue. Keep music separately when you need precise control over the final mix.
- Align the recording's pauses and overall pace with the visible performance. For fixed timing, make the speech fit the available time before submitting.
- Singing, overlapping speakers, fast cuts, covered mouths, or extreme angles need careful evaluation. Do not promise reliable results for these cases.

### Feature controls

- extras.mode: precision (default, 6 credits/output second) or explicitly selected speed (3 credits/output second). Select based on the mode guidance above.
- extras.keep_the_same_format: true by default, requesting source encoding format, resolution, and bitrate. false lets HeyGen choose; it does not unlock resolution or aspect_ratio parameters.
- extras.enable_dynamic_duration: true by default, allowing output duration to adjust to the replacement audio. false requests source timing. Prepare speech to fit first and review the delivered length; fixed timing does not guarantee every word will fit naturally.
- extras.disable_music_track: false by default. true requests removal of source background music. Do not assume it reconstructs clean ambience or provides separate stems. Add a controlled music mix afterward if needed.
- extras.enable_speech_enhancement: false by default. true requests speech enhancement and can modify the recording. Leave false when the supplied voice and delivery are the priority.
- extras.enable_watermark: false by default. true requests a HeyGen watermark.
- extras.start_time: optional start of the lip-sync interval, in source seconds, at or above zero and before the source end. Omit both time fields for a whole-video edit.
- extras.end_time: optional end of the interval, in source seconds, greater than start_time and no later than the source end. An interval selects the mouth edit, not an export trim. Do not assume automatic audio cropping or a proportionally smaller bill.
- extras.fps_mode: optional vfr (variable frame rate), cfr (constant frame rate), or passthrough. Consider cfr for downstream editing workflows that need constant frame rate; otherwise omit to use the provider default.
- extras.title: optional nonempty display title for the provider job. It organizes the job and does not affect the performance.

### Recommended workflow

1. Inspect the source clip and decide whether there is a visible speaker to synchronize. Reuse existing assets where possible.
2. Prepare and listen to the finished speech. Generate it separately if using a saved Character voice, cloning, voice design, or a translated script.
3. Use Precision by default or Speed when explicitly selected; choose whole-video or partial timing, and whether the output may change duration. Check that a fixed-time recording fits.
4. Call estimate_generation with the same model, input URLs, and extras intended for generate_video. Creative Claw measures the inputs; do not invent a duration to obtain a quote.
5. Submit generate_video with one video, one audio, a short task label, and only the supported extras. Follow any account Review approval returned by the tool.
6. Use check_job with the returned job ID until completion. Deliver the permanent result saved in the asset library; do not submit another paid job just because rendering takes time.
7. Review the actual words and audio, mouth timing, face identity, surrounding performance, and output length. Add styled subtitles or a final music mix afterward when requested.

### Cost and timing

- Speed: 3 credits per delivered output second. Precision: 6 credits per delivered output second. The whole job's credit total is rounded up once.
- Both input durations are measured before quoting or charging. The reservation uses the longer input when enable_dynamic_duration is true, or source-video duration when false. Final settlement uses measured delivered video duration.
- A selected mouth-edit interval may retain the full source video. Never quote only end_time minus start_time or promise a shorter exported clip.

### Limits and review

- The source supplies framing and performance. Review preservation; do not promise pixel-identical faces, bodies, or backgrounds after synthesis.
- This endpoint generates no speech and performs no translation. There is no verified per-language quality list for this endpoint. HeyGen TTS or translation language counts do not establish Lipsync quality.
- HeyGen generates captions automatically. enable_caption is deprecated and not exposed. Caption generation does not mean Creative Claw burns styled subtitles into the delivered video; use add_subtitles afterward for that.
- No duration, resolution, aspect_ratio, images, character_id, seed, voice_id, or emotion control is accepted here. Put media in the top-level arrays and the documented controls in extras. Unknown extras are rejected before submission.
- Do not invent file-size or duration limits absent from the current endpoint contract. Input measurement, availability, and local validation must succeed before submission.

Spoken languages (checked 2026-10-11, direct HeyGen Lipsync, Precision default mode): supplied audio drives mouth movements on an existing video. This endpoint does not generate or translate speech. Prepare correct finished speech in the target language; a verified per-language quality list is not published for this endpoint. Do not borrow HeyGen TTS or translation language counts. Review pronunciation, lip timing, and the preserved performance. Source: https://developers.heygen.com/reference/create-lipsync

### Request examples

Replace the example URLs with your accessible media URLs. Send these as generate_video inputs; estimate with the same model, URLs, and extras first.

#### Estimate before generation

Send this to estimate_generation. Its media URLs and extras go inside params; replace them with the same inputs you will generate with.

```json
{
  "operation": "video",
  "model": "video/heygen-lipsync",
  "params": {
    "video_urls": [
      "https://your-cdn.example/speaker.mp4"
    ],
    "audio_urls": [
      "https://your-cdn.example/finished-speech.wav"
    ],
    "extras": {
      "mode": "precision"
    }
  }
}
```

#### Default Precision, whole video

```json
{
  "model": "video/heygen-lipsync",
  "prompt": "Sync this video to the supplied finished speech.",
  "video_urls": [
    "https://your-cdn.example/speaker.mp4"
  ],
  "audio_urls": [
    "https://your-cdn.example/finished-speech.wav"
  ],
  "extras": {
    "mode": "precision"
  }
}
```

#### Precision with source timing

Prepare the recording to fit the source first. Review actual delivered timing.

```json
{
  "model": "video/heygen-lipsync",
  "prompt": "Sync this video to the supplied finished speech.",
  "video_urls": [
    "https://your-cdn.example/speaker.mp4"
  ],
  "audio_urls": [
    "https://your-cdn.example/finished-speech.wav"
  ],
  "extras": {
    "mode": "precision",
    "keep_the_same_format": true,
    "enable_dynamic_duration": false,
    "enable_speech_enhancement": false
  }
}
```

#### Explicit lower-cost Speed, partial source interval

This example requires a source longer than 6 seconds and speech prepared for the intended interval. This is a mouth edit, not a trim; review audio alignment and full output length.

```json
{
  "model": "video/heygen-lipsync",
  "prompt": "Sync this video to the supplied finished speech.",
  "video_urls": [
    "https://your-cdn.example/speaker.mp4"
  ],
  "audio_urls": [
    "https://your-cdn.example/finished-speech.wav"
  ],
  "extras": {
    "mode": "speed",
    "start_time": 2,
    "end_time": 6
  }
}
```

Provider documentation checked 2026-10-11: https://developers.heygen.com/reference/create-lipsync, https://developers.heygen.com/lipsync-speed, https://developers.heygen.com/lipsync-precision.
