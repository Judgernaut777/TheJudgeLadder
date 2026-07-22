# The Judge Ladder — one page

**Five rungs, one moving part: where the human sits relative to the loop. At every rung, the remaining human job is judgment; each rung moves where judgment is applied.**

## The ladder

| Rung | Name | Your role | Judgment applied to | The gate to stand here |
|---|---|---|---|---|
| 1 | Chat | Drive every turn | Every sentence | You instinctively verify factual output |
| 2 | Prompt workflows | Chain the steps by hand | The pipeline design | You reuse instead of rewriting — and feel the copy-paste friction |
| 3 | Supervised action | Approve each action | Each real-world action | You act safely AND can state where your data goes |
| 4 | Single-purpose agent | Set the goal, review the result | The handoff and the review | You trust the gate enough not to watch — but still review |
| 5 | Autonomous / multi-agent | Set guardrails, audit after | The system's boundaries | You can recognize and govern (building optional) |

## One task up the ladder

*"Produce a weekly summary of what's happening in our field and send it to the team."*

| Rung | Tools | What it looks like | Who fires each action |
|---|---|---|---|
| 1 | None | Paste 3 articles in, get summary; you find and send everything | You — every real-world step |
| 2 | None | Saved reusable templates; you still paste in and copy out | You — you are the wiring between steps |
| 3 | Web search, email | AI searches → you approve → drafts → offers to send → you approve | You, each action |
| 4 | Same tools | "Every Friday, compile the summary" — runs its own searches, reads last week's notes, drafts | The AI; you set the goal, review before send |
| 5 | Same tools | Runs Friday alone — gather, fact-check, format/send agents; you see it after, or on a guardrail trip | The AI runs the loop; you set boundaries, audit |

**Read the table vertically:** rungs 1–2 have zero tools (a sealed box). The same tools appear at rung 3 and never change through rung 5. The only column that keeps moving is the last one — *whose hand is on the trigger*. That is the entire framework. (The same table, transposed into five industries: [industry examples](industry-examples.md).)

## Three structural facts

1. **Rungs 1–2 are a sealed box** — no tools; the model knows only what's pasted in; you are its hands and courier.
2. **The box opens at rung 3, and the tools never leave** — nothing new is bolted on above rung 3.
3. **Rung 3 → 4 is the pivot:** you stop approving each action and start approving the goal. ("Isn't tool use just what an agent does?" Yes — same mechanism, different hand on the trigger.)

## The two pairs to remember

- **Human-IN-the-loop (r3) vs. human-ON-the-loop (r5).** Approval inside the loop vs. supervision around it. The whole autonomy story in two prepositions.
- **Grounding vs. hallucination.** A sealed model can only sound right; a tool-equipped model can check. The reason tools exist.

## The standing job description

The model is stateless and its attention rots — so at every rung, your job includes deciding what deserves to be on its desk. By hand at rung 1 (prompting); by design at rung 2 (templates); by retrieval at rung 3 (RAG); by memory and compaction at rung 4; by policy at rung 5.

## Applying it

Pick one recurring task from your own work. Rebuild the second table for it, rung by rung — [the worksheet](../worksheet.md) is the blank. Climb only when a rung's gate is true of you, and remember that every gate is a restraint: verify, reuse, account, review, audit. Capability and judgment climb together, or the ladder tips.
