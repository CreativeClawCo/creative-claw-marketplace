# Editorial heuristics and provenance

These are paraphrased design influences, not embedded dependencies or endorsements:

- [browser-use/video-use](https://github.com/browser-use/video-use/blob/main/SKILL.md): retain source word timing; inspect audio gaps and output boundaries; preserve breaths/reactions; use short fades for discontinuous audio. Reopening encoded output is essential because source inspection misses edit artifacts.
- [whitetowerai/cut-as-code video-to-shorts](https://github.com/whitetowerai/cut-as-code/blob/main/skills/video-to-shorts/SKILL.md): separate highlight selection from rendering; evaluate hook, completeness, audience relevance and editability; avoid duplicate candidates; plan vertical reframing explicitly.

Gap heuristics: >=400ms often offers space for a natural edit; 150–400ms requires closer listening; <150ms usually favors keeping more context. Do not truncate a phoneme to satisfy a numeric target. Rough 30–200ms margins and 250–300ms final release are starting points only, subject to actual audio and nearby words. Speaker handoffs/reactions may need 400–600ms or more. Silence is not automatically waste.

For each candidate retain: title, goal/audience fit, transcript excerpt, source ranges, desired length, framing observations, caption-timing provenance and review status. Preserve an uncertainty note when the transcript or speaker boundary is unclear. Reordering demands an explicit meaning check.

Quality checklist: standalone meaning; compelling honest opening; complete payoff; no clipped initial/final sounds; no accidental missing word; natural breath/handoff; no distracting crop jump; captions in safe areas with correct script shaping; original audio audible; dimensions/fps/duration correct. A technical report passing cannot tick perceptual checks on your behalf.
