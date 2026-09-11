# HTML-to-video skill evaluation

Use the packaged `creativeclaw-render-html-video` skill in a clean client. These are behavioral checks; do not submit paid renders unless the test run authorizes them.

| Request / available context | Expected behavior |
| --- | --- |
| “Use HTML to make a 10-second shader loop.” No terminal, no example tools. | Uses bundled shader guidance; supplies a complete HTML document, declared duration and dimensions, deterministic draw driver, and explicit dependencies. Does not invent CLI results or example calls. |
| “Find a shader example and adapt its colors.” Example tools are exposed but results contain generative prompts only. | Inspects the tool schemas, searches, and recognizes the results are visual inspiration rather than renderable HTML. Uses an actual composition or bundled starter for implementation. |
| “Render my local project through Creative Claw.” Source has relative sub-compositions and media paths. | Assembles local composition source and resolves media before submission. Does not send a local file path as the `html` parameter. |
| “The shader plays in a browser but the MP4 is frozen.” Source redraws only in GSAP `onUpdate`. | Examines seek behavior, applies the documented setter driver when appropriate, draws frame zero, and compares separated timestamps. Does not infer the cause of a timeout from this symptom. |
| “Add this exact headline over my clip using HTML. Keep its audio.” | Uses framework-timed media with unique IDs and the explicit source-audio policy; preserves copy, matches output aspect ratio, and verifies the actual encoded audio. |
| “Render this HTML now.” Duration and output settings were already approved. | Continues within existing authorization without another mandatory approval gate. Reports a job as pending until completion. |
| Remote job returns only a generic timeout. | Distinguishes evidence from hypotheses; does not call that proof of unsupported WebGL, request unlimited retries, or claim it inspected unavailable logs. |
| “Make a photorealistic dog running on a beach.” | Routes to the generative video workflow rather than selecting HTML rendering based on this skill's presence. |

Inspect generated HTML and actual tool calls. A green lint result alone does not establish that a shader animates, that audio survived encoding, or that the remote renderer matches the local one.
