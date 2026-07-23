# Rung 5 — Autonomous / multi-agent

**Your role: you set guardrails, audit after.**

At rung 4 you kept one hand on the system: the approval gate, exercised before anything irreversible. Rung 5 removes that last synchronous touch. The system runs on its own schedule, end to end — and instead of approving outputs before they ship, you **set the boundaries in advance and inspect the record afterward**.

The preposition flips here: rung 3 was human-**in**-the-loop; rung 5 is human-**on**-the-loop. You are no longer a component the loop passes through. You are the supervisor it reports to.

## Why "multi-agent"

Work at this rung is typically decomposed across several cooperating agents rather than one. The weekly-summary pipeline becomes: a **gather** agent that finds and reads sources, a **fact-check** agent that verifies the draft's claims against its citations, a **format-and-send** agent that produces and dispatches the email. An **orchestrator** coordinates them, passing work from one to the next in **handoffs**.

This should feel familiar rather than exotic — it is rung 2's decomposition lesson, promoted. Back then you learned that small single-purpose prompts beat one mega-prompt; the same logic, applied to agents, says small single-purpose agents beat one do-everything agent. Each stays focused, each keeps a small desk (the Context pillar never stops applying), and — critically — each can hold a *different perspective*: a fact-check agent whose entire job is doubting the gather agent's draft is structurally more skeptical than one agent grading its own homework.

And to say it one final time: these agents use the **same tools that appeared at rung 3**. Search, email. Five rungs, one tool set, and the only thing that ever moved was the hand on the trigger.

## What replaces the gate

Removing the human checkpoint does not mean removing control. It means control changes tense — from *before* (approve this) to *around* (operate inside this) and *after* (account for what you did):

**Guardrails.** Hard limits enforced by the system, not by a watching human: only send to the team list; never exceed N sources; if fact-check confidence is low, stop. A guardrail is your rung-4 gate, written down and automated.

**Autonomy policy.** The explicit decision, action by action, of what the system may do alone, what it must escalate to a human, and what it must never do. At rung 4 this lived in one gate; at rung 5 it becomes a written matrix, because nobody is present to improvise the answer.

**Escalation on trip.** When a guardrail trips, the system stops and a human gets pulled in. The design goal of rung 5 is not "no humans ever" — it is "humans exactly when the boundaries say so."

**Observability and the audit trail.** The record of everything the system did: what it retrieved, what each agent decided, what tripped, what shipped. This is rung 3's humble "logging" grown into its final form — and it is where *your* remaining work lives. On-the-loop supervision *is* reading this record well: skimming normal runs, drilling into anomalies, noticing **drift** — the slow slide of behavior away from intent that no single run makes obvious.

**Self-correction.** Well-built rung-5 systems check and repair their own work — the fact-check agent bouncing a bad draft back to the gather agent. This raises average quality; it does not replace the audit. A system that grades its own homework still needs someone reading the gradebook.

## Shown, not built

An honest framing note: **most people should aim to recognize and govern rung-5 systems, not to construct them.** Building multi-agent pipelines is real engineering. But systems like this are rapidly becoming things ordinary workers *encounter* — a pipeline someone else built, running in your workplace, touching your work.

For that reason the bar at this rung is deliberately different from the rungs below. Rungs 1–4 asked you to *do*. Rung 5 asks you to *judge from outside*: read an autonomy policy and see what it actually permits; read an audit trail and reconstruct what happened; look at an output that arrived with no human in its history and know which questions to ask. That is not a consolation prize — at this rung, governing well *is* the scarce skill.

## Judgment at this rung

Judgment reaches its final altitude: **the boundaries of the system itself.** Are the guardrails the right guardrails? Is the autonomy policy drawn where reversibility and stakes say it should be? Does the audit trail actually capture what you'd need to catch drift? Nothing about the day-to-day output passes through you anymore — which is precisely why the quality of the boundaries, and the discipline of the after-the-fact review, is everything. The Judge's job was never to turn every screw. It was to make sure the machine answers to someone.

- [In practice: the weekly summary at rung 5](in-practice.md)
- [Competencies and gate](competencies.md)
- [Vocabulary](vocabulary.md)
