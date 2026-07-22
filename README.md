# The Judge Ladder

**A conceptual framework for how your role changes as you hand more of a task to AI.**

Most explanations of AI adoption are organized around what the *model* can do. The Judge Ladder is organized around the only thing that actually changes for *you*: where you sit relative to the loop of work. It is a framework for individual practice — one person, one task, five distinct positions — not a maturity model for organizations and not a forecast of AI capability.

The name states the thesis. At every rung of the ladder, the part of your job that remains is **judgment**. Climbing the ladder never eliminates judgment; it moves the place where judgment is applied — from every sentence, to every action, to every goal, to the boundaries of the system itself.

## The ladder

| Rung | Name | Your role |
|---|---|---|
| 1 | **Chat** | You drive every turn |
| 2 | **Prompt workflows** | You chain the steps by hand |
| 3 | **Supervised action** | You approve each action |
| 4 | **Single-purpose agent** | You set the goal, review the result |
| 5 | **Autonomous / multi-agent** | You set guardrails, audit after |

## One moving part

The ladder is a story about a single moving part: **where the human sits relative to the loop.** Everything else is scenery.

Three structural facts hold the whole framework together:

1. **Rungs 1 and 2 are a sealed box.** No tools, no reach into the world. The model works only with what is in the chat. You are the model's only connection to reality — you paste things in, you carry things out.

2. **The box opens at rung 3, and the tools never leave.** Web search, email, file access — whatever tools appear at rung 3 are the *same* tools used at rungs 4 and 5. Nothing new is bolted on above rung 3.

3. **What changes from rung 3 upward is whose hand is on the trigger.** At rung 3, you approve every individual action. At rung 4, you approve the goal and review the result. At rung 5, you approve the boundaries and audit the record. Same tools, different hand on the trigger.

Fact 3 dissolves the most common confusion in this space: *"Isn't tool use just what an agent does?"* Yes — same mechanism. An agent is not a different kind of AI; it is the same tool-using AI with a different hand on the trigger. That is why rung 3 is named **supervised action** and not "tool use": tools are not what distinguishes the rung. Supervision is.

## Two contrast pairs worth memorizing

If you retain nothing else from this framework, retain these two pairs — they are the spine:

- **Human-*in*-the-loop vs. human-*on*-the-loop.** In the loop (rung 3): nothing happens without your approval. On the loop (rung 5): things happen, and you watch the record. The entire autonomy story fits in those two prepositions.
- **Grounding vs. hallucination.** A model with no tools can only sound right. A model with tools can *check*. Grounding — tying output to retrieved, citable sources — is the reason tools exist at all.

## Judgment climbs with capability

Each rung has a gate: the sign that you actually operate at that rung rather than merely using its tools. The gates are deliberately about **restraint**:

- Rung 1: you *instinctively verify* factual output.
- Rung 2: you *reuse* instead of rewriting — and notice the friction of being the wiring.
- Rung 3: you act on the real world safely *and can state where your data goes*.
- Rung 4: you hand over the goal, trust the approval gate enough not to watch every step — *but still review*.
- Rung 5: you can *recognize and govern* an autonomous system: read its guardrails, read its audit trail, catch drift.

Capability and judgment must climb together. That is the Judge in Judge Ladder.

## One task, five rungs

The framework is best understood by carrying **one real task** up the ladder and watching only the human's position change. Throughout this repo, the running example is:

> *"Produce a weekly summary of what's happening in our field and send it to the team."*

Each rung's `in-practice.md` shows this task at that rung. To apply the framework to your own work, pick one recurring task of your own and rebuild the same table for it — [`worksheet.md`](worksheet.md) is the blank instrument.

## How to read this repo

Start with the foundations, then walk the rungs in order. Rungs 1–3 are where most of the value is for most people; rungs 4–5 make full sense only after you have felt the friction and the trust questions the lower rungs produce.

```
00-foundations/         Terms you need before rung 1, and the Context pillar
01-chat/                Rung 1
02-prompt-workflows/    Rung 2
03-supervised-action/   Rung 3 — the box opens; the infrastructure & trust track switches on
04-single-purpose-agent/  Rung 4
05-autonomous-multi-agent/ Rung 5 — framed as "recognize and govern," not "build"
tracks/
  infrastructure-and-trust.md   The parallel track that activates at rung 3
  managed-workplaces.md         Reading the ladder inside an organization with approved tools
reference/
  glossary.md           Every term, all rungs — the full reference, never abridged
  ladder-one-pager.md   The whole framework on one page
  framework-comparison.md  How the ladder relates to other public frameworks
  industry-examples.md  The running-example table transposed to five industries
worksheet.md            Your task through five rungs (blank)
```

Each rung directory follows the same shape:

- `README.md` — the concept: what is new at this rung and why it exists
- `in-practice.md` — the running example, lived at this rung
- `competencies.md` — what operating at this rung looks like, and the gate for climbing
- `vocabulary.md` — the terms that first *matter* at this rung

Terminology in this framework is placed at the rung where you first hit the wall it solves — never dumped up front. The [glossary](reference/glossary.md) is the one place everything appears together.
