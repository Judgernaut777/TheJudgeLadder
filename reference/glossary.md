# Glossary

Every term in the framework, in one place, grouped by the rung where it first matters. This is the full reference — **never abridged**. Elsewhere in the repo, terms appear only when needed; here, everything appears, defined completely, whatever your role or reading path.

---

## Foundations (before rung 1)

**LLM (large language model).** An AI model trained on enormous amounts of text that produces text in response to text. The engine inside chatbots, assistants, and agents alike.

**Model.** The trained artifact that turns input into output. Distinct from the app wrapped around it.

**Inference.** Running the model: input in, output out. Training happens once, in advance; inference happens every time you press enter.

**Prompt.** The entire input sent to the model in a turn — instructions, question, examples, pasted material, all of it.

**Token.** The unit models read and write; roughly three-quarters of an English word. Context sizes and usage costs are measured in tokens.

**Context window.** The model's fixed-size working area, in tokens. Everything the model can consider in a turn must fit in it; anything outside it does not exist for the model.

**System prompt.** Standing instructions given to the model before the user's message, usually invisible in products. Why the same model behaves differently in different apps.

**Hallucination.** Confident, fluent, wrong output — a structural property of models, not a glitch. A sealed model cannot check anything; it can only produce plausible text, and some plausible text is false.

**Verification.** Checking factual output against something outside the model before relying on it. The first judgment skill of the ladder and the muscle behind every later gate.

### The Context pillar

**Stateless model.** The model has no memory. Every turn it wakes with amnesia and re-reads everything; its context window is its entire reality for that turn.

**Context engineering.** Deliberately curating what goes into the context window — the successor discipline to prompt engineering. Named formally at rung 2, practiced (under different names) at every rung.

**Context rot.** Output quality degrades as context grows, well below the advertised window size. Chroma technical report (Hong, Troynikov & Huber, July 2025): 18 frontier models tested (GPT-4.1, Claude Opus 4, Gemini 2.5 among them), all degrade non-uniformly, sometimes 30–50%. A fuller desk is a worse desk.

**Lost in the middle.** Attention is U-shaped — strong at the start and end of context, weak in the middle. Liu et al. (Stanford, TACL 2024): 30%+ accuracy drop when the key fact sits mid-context.

**Distractor interference.** Similar-but-irrelevant content actively misleads the model — the specific reason "dump everything in" backfires.

**Effective vs. advertised context.** The context size at which a model stays reliably accurate is far below the marketed limit — think ~150–400K effective tokens on models advertising 2M. Budget to the effective number.

**Truncation / eviction.** When a conversation outgrows the window, the oldest material silently falls off — why long chats forget their beginnings.

---

## Rung 1 — Chat

**Iteration.** The deliberate loop of ask → inspect → adjust → re-ask. The first answer is a draft.

**Zero-shot / few-shot.** Asking without examples vs. including one or more examples of the desired output. Few-shot is the cheapest reliable way to control format and tone.

**Persona / role prompting.** Assigning the model a role to shift tone, depth, and emphasis — a compact way to load implicit context.

---

## Rung 2 — Prompt workflows

**Prompt template.** A saved prompt with slots: fixed instructions and examples, a blank for this time's material. The unit of reuse.

**Decomposition.** Breaking a recurring task into named stages, each handled by a focused prompt. Reappears at rung 5 as the logic of multi-agent design.

**Prompt chaining.** Feeding one prompt's output into the next prompt's input; at rung 2, the human is the connective tissue.

**Structured output.** Output demanded in an exact shape (counts, columns, formats) so downstream steps can consume it reliably.

---

## Rung 3 — Supervised action

**Tool / function calling.** The mechanism by which a model requests that an external tool be run and incorporates the result. Shared by rungs 3–5; supervision, not mechanism, is what varies.

**Grounding.** Tying output to retrieved, checkable sources. The reason tools exist; paired against hallucination.

**Retrieval / RAG (retrieval-augmented generation).** Fetching relevant documents onto the model's desk before answering — context management, per question. Complement to long context, not competitor.

**Connector / integration.** A configured link between an AI and a real service. Every connector is a capability and a data pathway at once.

**Human-in-the-loop.** A human approval inside the action loop; nothing fires without a person. Paired against human-on-the-loop (rung 5).

**Citation.** A pointer from claim to source. A citation is a claim, not proof — follow it.

### Infrastructure & trust — where the model lives

**Closed weights (cloud/API).** Model as a service; you never hold the model; data round-trips to the provider.

**Open weights.** Published model weights anyone can download and run. Open weights ≠ open source.

**Cloud / SaaS.** Software consumed as someone else's hosted service.

**On-prem / self-hosted.** Software (including models) run on machines you control.

**Local inference.** Running a model on your own device; data never leaves it.

**Quantization.** Compressing a model to run on smaller hardware at some quality cost; what makes local inference practical.

**Data residency / sovereignty.** Where data physically and legally lives, and whose law applies.

### Infrastructure & trust — attack surface

**Prompt injection.** Hostile instructions embedded in content the model reads. Escalates at rung 4 to indirect injection.

**Data poisoning.** Corrupting a model's training data or a retrieval source it depends on.

**Jailbreak.** A user crafting input to push a model past its safety rules. Distinct from injection (third-party content subverting the model against its user).

**Data exfiltration / leakage.** Data leaving where it belongs — via the wrong tool, a log, or an attack.

**Credentials / secrets management.** Handling passwords, tokens, and keys. Minimum standard: never in a chat; narrowest grants everywhere.

### Infrastructure & trust — ops literacy

**Container (Docker/Podman).** A packaged, portable unit of software plus dependencies.

**Endpoint.** An address where a service accepts requests.

**Environment (dev/staging/prod).** Separated copies of a system for experimenting, rehearsing, and running for real.

**Deployment.** Putting a new version live.

**Rollback.** Reverting to the previous version when a deployment goes wrong.

**Version control (Git).** Tracked, reversible change history — for code, prompts, and configurations.

**Logging / monitoring.** Recording what a system did; watching for problems. Grows into observability/audit trails at rung 5.

---

## Rung 4 — Single-purpose agent

**Agent.** A tool-using AI whose actions fire on its own decision in pursuit of a goal you set. Same tools as rung 3; the trigger hand moved.

**Agent loop (plan → act → observe).** The repeating cycle of a running agent. At rung 3 a human sits inside it; at rung 4 it closes without one.

**Orchestration.** Coordinating steps (rung 4) or multiple agents (rung 5) into a coherent run.

**Persistent memory.** Storage read and written across runs. Memory is across windows; context is within one. Exists because the model is stateless and context rots.

**Compaction / summarization.** An agent condensing its own history to keep its context useful over a long run.

**Autonomy (gated / bounded).** Free action within set boundaries, stopping at a kept human checkpoint.

**Approval gate.** The deliberately retained human checkpoint, placed where actions become hard to reverse.

**MCP (Model Context Protocol).** A standard for connecting AI to tools and data — "a USB port for agent tools": build once, plug into anything that speaks it.

**Least privilege.** Grant the narrowest access that does the job; unneeded permissions are pure attack surface.

**Sandboxing.** Running an agent in a contained space where its mistakes stay contained.

**Indirect prompt injection.** Injection via content an autonomous agent reads with no human watching. The realistic failure mode of agents.

**KV cache.** *(Technical track.)* The working structure a model builds over its context during one generation; grows with context, lives in GPU memory. Why long context is slow and hardware-hungry.

**Prompt caching.** *(Technical track.)* Reusing the KV cache across requests sharing a long prefix. KV cache = mechanism within one generation; prompt caching = its reuse across requests. A first-order cost lever for agent loops.

---

## Rung 5 — Autonomous / multi-agent

**Multi-agent system.** Cooperating single-purpose agents composed into a pipeline — decomposition, promoted from prompts to agents.

**Orchestrator / supervisor.** The component coordinating a multi-agent run: sequencing, routing, failure handling.

**Handoff.** The structured transfer of work from one agent to the next.

**Guardrails.** Hard limits enforced by the system rather than a watching human — an approval gate, written down and automated.

**Autonomy matrix / policy.** The explicit mapping of actions to permissions: may do alone / must escalate / must never.

**Human-on-the-loop.** Supervision after and around the loop rather than inside it: monitor the record, intervene on escalation. Pairs with human-in-the-loop (rung 3).

**Observability / audit log.** The complete record of what a system did. The final form of rung-3 logging; the medium of on-the-loop supervision.

**Drift.** Behavior sliding away from intent across runs with no single run visibly wrong. Visible only to someone reading across the record.

**Self-correction / feedback loop.** Agents checking and repairing each other's work within a run. Raises average quality; does not replace external audit.

**Escalation.** The designed path by which a system (or a person) stops and hands a decision up to someone with the authority to make it.

---

## The escalating terms

Several ideas deliberately reappear up the ladder in stronger forms. When you meet the later form, call back to the earlier:

- **logging** (rung 3) → **observability / audit log** (rung 5)
- **prompt injection** (rung 3) → **indirect prompt injection** (rung 4)
- **context window** (foundations) → **context engineering** (rung 2) → **RAG** (rung 3) → **memory, compaction, caching** (rung 4)

## The two load-bearing pairs

If you remember only two things: **human-in-the-loop vs. human-on-the-loop** — the whole autonomy story in two prepositions — and **grounding vs. hallucination** — the reason tools exist. Everything else in this glossary hangs off one of those two.
