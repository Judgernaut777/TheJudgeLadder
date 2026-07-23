# Rung 5 — Vocabulary

**Multi-agent system.** Several cooperating agents, each with a narrow job, composed into a pipeline. Rung 2's decomposition lesson promoted: small single-purpose agents beat one do-everything agent — smaller desks, clearer permissions, and structurally independent perspectives (a dedicated fact-checker is more skeptical than an agent grading its own work).

**Orchestrator / supervisor.** The component that coordinates a multi-agent run: sequencing agents, routing work between them, handling failures, enforcing the run's structure.

**Handoff.** The transfer of work from one agent to the next — the gather agent's draft passing to the fact-checker. Handoffs are where structure lives in a multi-agent system, and where structured output (rung 2) pays off one more time.

**Guardrails.** Hard limits enforced by the system rather than a watching human: allowed recipients, allowed sources, stop-conditions. A rung-4 approval gate, written down and automated.

**Autonomy matrix / policy.** The explicit, written mapping of actions to permissions: may do alone / must escalate / must never. Rung 5's core governance artifact — it exists because no human is present to improvise the answer.

**Human-on-the-loop.** The rung-5 supervision mode: the system runs without per-action or per-output human approval; a human monitors the record and intervenes on escalation. Completes the framework's load-bearing pair with rung 3's human-*in*-the-loop — the whole autonomy story in two prepositions.

**Observability / audit log.** The complete record of what the system did: retrievals, decisions, handoffs, trips, sends. The final form of the escalating idea that began as "logging" at rung 3. On-the-loop supervision is, concretely, the practice of reading this well.

**Drift.** The slow slide of a system's behavior away from intent — no rule broken, every run individually fine, the pattern wrong. Visible only across runs, which is why the audit practice exists.

**Self-correction / feedback loop.** Agents checking and repairing each other's work inside the run — the fact-checker bouncing a bad draft for redrafting. Raises average quality; does not replace external audit.

**Escalation.** The designed path by which the system stops and summons a human — the guardrail trip's other half. The goal of rung 5 autonomy is not "no humans"; it is "humans exactly when the boundaries say so."
