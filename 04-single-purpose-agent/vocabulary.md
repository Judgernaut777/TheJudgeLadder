# Rung 4 — Vocabulary

## Core terms

**Agent.** A tool-using AI whose actions fire on its own decision in pursuit of a goal you set. Not a different technology from rung 3 — the same tools with the trigger hand moved. If a system takes real-world actions without per-action human approval, it is operating as an agent, whatever the product calls it.

**Agent loop (plan → act → observe).** The repeating cycle a running agent executes: plan a step, take it, observe the result, re-plan with the result in context. At rung 3 you sat inside this loop approving each "act"; at rung 4 it closes without you.

**Orchestration.** Coordinating multiple steps (and later, at rung 5, multiple agents) into a coherent run — sequencing, retries, deciding what happens when a step fails.

**Persistent memory.** Storage an agent reads and writes *across* runs — decisions, preferences, history. The pairing to keep straight: **memory is across windows; context is within one.** Memory exists because the model is stateless and context rots (see [the Context pillar](../00-foundations/the-context-pillar.md)).

**Compaction / summarization.** An agent continuously condensing its own working history so the desk stays useful over a long run. The Context pillar's summarization strategy, made automatic.

**Autonomy (gated / bounded).** The rung-4 mode: the agent acts freely *within* boundaries you set, and stops at the gate you kept. Distinguished from rung 5, where the gate moves after the fact.

**Approval gate.** The human checkpoint deliberately retained inside an otherwise autonomous flow, placed where actions become hard to reverse. The defining artifact of rung 4.

**MCP (Model Context Protocol).** A standard for connecting AI systems to tools and data sources — think *a USB port for agent tools*: build a tool once, plug it into any assistant or agent that speaks the standard. Why the tool ecosystem is composable rather than one-off.

## Infrastructure & trust track

**Least privilege.** Grant the narrowest access that lets the job get done. Every unneeded permission is attack surface with no offsetting benefit — a configuration error even before anything goes wrong.

**Sandboxing.** Running an agent in a contained space where its actions (and its mistakes) stay contained — limited file access, limited network reach, no blast radius beyond the sandbox walls.

**Indirect prompt injection.** Rung 3's injection, compounded by autonomy: hostile instructions embedded in content the agent reads *while no human is watching* — a web page, an email, a document. The realistic failure mode of agents, and the concrete reason least privilege, sandboxing, and approval gates exist.

## Technical track (optional depth)

**KV cache.** The working data structure a model builds over its context during a single generation; it grows with context length and lives in GPU memory. The mechanical reason long contexts are slow and hardware-hungry.

**Prompt caching.** Reusing the computed KV cache *across requests* that share a long prefix, making repeated long-context calls faster and cheaper. Keep the two distinct: KV cache is the mechanism within one generation; prompt caching is its reuse across requests. For agent builders this is a first-order cost lever, since agent loops re-send long, mostly-identical contexts continuously.
