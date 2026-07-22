# In practice — the weekly summary at rung 4

| | Rung 4 |
|---|---|
| **Tools** | Same as rung 3 — web search, email. Nothing new. |
| **What it looks like** | "Every Friday, compile the summary" — it runs its own searches, reads last week's file, drafts; you review before send |
| **Who fires each action** | The AI fires actions; you set the goal and review the result |

## The setup, once

You configure the agent one time, and the configuration is a compressed version of everything you learned below this rung:

- **Goal:** every Friday morning, compile the weekly field summary in our five-bullet format.
- **Constraints:** sources from the past seven days; every bullet cited; skip paywalled sources; if something looks like major breaking news, flag it at the top rather than folding it into a bullet.
- **Memory:** keep notes on what was covered each week and what I edit out; don't repeat a story I cut.
- **Access:** web search, and *draft* rights in email — no send rights. (Least privilege: it cannot send even by accident, or by injection.)
- **The gate:** the draft lands in front of me for review. Nothing goes to the team without my approval.

## The week, narrated

Friday, 8:00 a.m. — you're in a meeting, not at your desk. The agent wakes on schedule. It plans its searches, runs them, discards two sources as stale, reads the rest. It consults its memory file: last week you cut a story about a topic you called "not our problem" — it deprioritizes this week's follow-up to that story. It drafts five cited bullets, compacts its working notes into next week's memory, and files the draft with a note: *"One item flagged: possible major development in [area] — treated as top-line flag, not a bullet. Ready for review."*

9:30 — out of the meeting, you open the draft. This is your rung: **the review**. You read all five bullets. You spot-check two citations (the instinct from rung 1, still on duty). The flag at the top is a good call. One bullet over-hedges; you sharpen it yourself. You approve. *Now* it sends.

Your total time: eight minutes, all of it judgment. The agent's total autonomy: everything except the one action that can't be unsent.

## What to notice

**The tools table did not change.** Search and email, same as rung 3. If you compare the rung-3 and rung-4 rows of the running-example table, the *only* difference is the "who fires it" column. That is the entire ladder in miniature.

**Where your rung-3 self went.** Every approval you used to give in real time got written down instead — into the constraints, the access limits, and the gate. The agent is operating inside a fossilized record of your judgment. When the draft disappoints, the fix is rarely "watch it more"; it's "write the handoff better" — exactly the way rung 2 taught you to fix the template, not the answer.

**What the gate is really for.** Fifty-one Fridays, the review is routine. The fifty-second Friday, a bullet cites a page that doesn't say what the bullet says — maybe sloppiness, maybe an injection attempt that made it into the draft. The gate exists for that Friday. That is why the gate never comes off just because the agent has been good for a year — reliability reduces the *frequency* of bad drafts, not the *cost* of the one that reaches forty inboxes unsupervised.
