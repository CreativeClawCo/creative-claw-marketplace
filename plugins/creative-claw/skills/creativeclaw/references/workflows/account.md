# Account, balance and generation charges

Use `manage_account` when the user wants to view their connected account, understand their balance, review recent generation costs, check whether a specific generation was charged or refunded, or access purchase/subscription management.

## Open the relevant view

- `manage_account({ section: "overview" })`: connected account/workspace and current credit balance.
- `manage_account({ section: "activity" })`: recent generations, credit purchases, charges and refunds. Start here for "How much did that video cost?" or "Was I charged for the failed generation?"
- `manage_account({ section: "settings" })`: generation settings, including Review/Auto.
- For purchases or subscription changes, open the account view and direct the user to its returned account link and billing controls. This tool is read-only: it does not itself buy credits, change subscriptions, issue refunds or charge the user. Do not claim those changes are complete from opening the view.

Use current tool results, not an old conversation balance. Do not expose unrelated account activity when answering a narrow question.

## Explain a specific generation's cost

1. Match the generation using its job ID when available; otherwise use its model, time, prompt or output. If multiple results fit, ask which one rather than choosing arbitrarily.
2. Inspect structuredContent.generations and structuredContent.ledger. Match ledger jobId or its linked generation.id. The short text summary is only a subset of the returned activity.
3. Distinguish gross charged credits, credited refunds and net credits used. When a matched generation shows 100 charged and 100 refunded, say "100 credits were charged and returned; net cost 0", not "never charged."
4. Use recorded ledger evidence to determine whether a charge/refund happened. A failed status alone does not prove there was no charge or that a refund completed. An estimate is not proof of actual cost. A null creditsCharged value means unknown, not zero.
5. Do not count a merged activity row and its transactionIds as separate charges. Do not infer generation cost from the total balance difference, which may include unrelated activity.
6. If no matching charge appears, say no matching charge was found in the returned recent activity, not that no charge ever occurred. The current view retrieves the latest 100 transactions and 20 recent jobs plus linked jobs; it is not a complete historical search. Use the returned full activity/account link for older records.
7. Use check_job for a known pending job's current state when needed. Use search_assets to locate saved media, not as the authoritative billing ledger. Do not create another generation to test whether billing works.

Report costs in the units returned, normally credits. Do not convert to a currency amount without a verified purchase rate and a reason the user needs that conversion.

## Separate account questions from other actions

- Future cost or affordability: estimate_generation for the proposed settings.
- Current balance or past charges: manage_account.
- Purchase/subscription changes: user-operated controls on the returned account page.
- Product feedback: follow the feedback workflow only if the user asks or approves sending it. An ordinary balance question does not authorize submit_feedback.
- Suspected billing discrepancy: report what the returned records establish and what remains unknown; do not promise a refund, compensation or support response.
