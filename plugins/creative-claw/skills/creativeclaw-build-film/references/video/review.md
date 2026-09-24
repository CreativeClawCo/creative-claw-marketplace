# Video Review and Auto

Respect the user's persisted render mode. Do not switch modes for them.

- Review: generate_video can return approval_required with a request card and Recovery Job ID. No video has been submitted or charged. Explain this and pause that generation branch. Do not resubmit, poll while approval is pending, or press Generate for the user.
- The user reviews the prompt, references, settings and estimate, then presses Generate in the card. Use any updated values and final context returned by the widget.
- If the user later asks for the result, or a downstream step needs it after submission and final context is missing, check_job with the retained Recovery Job ID retrieves the submitted job.
- Auto: execute within existing authorization without adding a redundant approval question.
- If the client cannot display approval cards, explain that review needs a supported Creative Claw UI, or the user can choose Auto. Do not claim that a request is rendering before it is submitted.

The exact references shown with the video request are reviewed in that card. Do not require a duplicate chat approval for those same references or mark them approved before the user submits. A separately requested earlier image checkpoint, Character-save likeness approval and voice-cloning consent still apply. The video Review card does not approve charges for image or audio generation that occurred beforehand.

A storyboard preview is a creative plan; generated stills may cost credits. A Review card is a proposed request, not playable footage. A generated first cut uses paid completed clips. Keep these meanings distinct.

Store each shot's job/recovery ID. An approval is single-use and bound to its request. New shots, changed models/references/settings or replacement takes require their own authorized request and applicable Review approval. Status checks are not new generation requests.
