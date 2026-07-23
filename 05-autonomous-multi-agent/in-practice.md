# In practice — the weekly summary at rung 5

| | Rung 5 |
|---|---|
| **Tools** | Same as rungs 3–4 — web search, email. Still nothing new. |
| **What it looks like** | Runs Friday on its own — gather agent, fact-check agent, format/send agent; you see it after the fact, or when a guardrail trips |
| **Who fires each action** | The AI runs the loop; you set the boundaries and audit the record |

## The system, described once

Three agents and an orchestrator, configured with a written autonomy policy:

- **Gather agent** — searches the week, selects sources, drafts five cited bullets. May: search freely, read freely. May not: touch email.
- **Fact-check agent** — takes the draft, follows every citation, verifies each bullet against its source. May: re-search to verify. Must: bounce mismatches back to the gather agent (self-correction), and *stop the pipeline* if a bullet still fails verification after one bounce — that's a guardrail trip.
- **Format/send agent** — formats the approved draft and sends it. May send **only** to the team list; any other recipient is a hard guardrail stop. This is also the only agent with send rights — least privilege, now distributed across the pipeline.
- **Escalation rule:** any trip pauses the run and messages you with the audit trail attached.

## The week, narrated

Friday, 8:00 a.m. You are on vacation. The pipeline runs: gather drafts, fact-check follows all five citations, one bullet overstates its source, bounce, redraft, verify clean, format, send. The team gets its summary at 8:14. You were asleep. **You see nothing, and nothing needed you** — that is the designed normal.

Tuesday, back at your desk, you do your rung-5 work: fifteen minutes with the audit trails from the last two runs. You skim the normal one. In Friday's you notice the bounce — read what the fact-checker caught, agree with its call. You also notice the gather agent has cited the same publication in nine of the last ten runs. No rule broken. But that's **drift** — the summary is quietly becoming a single-source digest — and no individual run would ever have shown it. You adjust the gather agent's instructions to require source diversity. That adjustment *is* on-the-loop supervision: a boundary tightened because the record was actually read.

Three Fridays later, your phone buzzes: **guardrail trip.** The gather agent picked up an article that — buried mid-page — contained instruction-shaped text asking the reader to forward the summary to an outside address. The injected instruction survived into the draft's metadata; the format/send agent hit the recipients-must-be-team-list guardrail and the pipeline froze. You read the trail, confirm the injection attempt, drop the source from the allowed pool, and restart the run. The email that would have leaked was never sent — not because you were watching, but because the boundary you wrote eight months ago was.

## What to notice

**Your absence is the feature; your boundaries are the control.** Every safety property in Friday's saves — the verification bounce, the recipient stop, the escalation to your phone — was authored by you, in advance, in the autonomy policy. Rung 5 doesn't remove human judgment; it *front-loads* it.

**The audit is real work, and it caught what no gate could.** The drift toward a single source would have sailed through any per-run review — each individual summary was fine. Only the pattern across runs showed it, and only because someone read across runs. That reading is the rung-5 skill.

**Count the humans in the loop: zero. Count the humans on the loop: one. That one matters.**
