# Rung 2 — Vocabulary

**Prompt template.** A saved prompt with slots: fixed instructions, role, format spec, and examples, plus a blank where this time's material goes. The unit of reuse — refinements go into the template and compound, instead of evaporating with the chat.

**Decomposition.** Breaking a recurring task into named stages, each handled by its own focused prompt. Small single-purpose prompts outperform one sprawling mega-prompt — a principle that echoes all the way up to rung 5's multi-agent designs.

**Prompt chaining.** Feeding one prompt's output into the next prompt's input to run a multi-step pipeline. At this rung the chain's connective tissue is you, copying and pasting.

**Structured output.** Output in a demanded, exact shape — "exactly five bullets," a fixed-column table, a fill-in template. What makes chaining reliable: a step can only consume the previous step's output if that output has a predictable form.

**Context engineering.** The real name for the discipline you are now practicing: deliberately curating what goes on the model's desk — which instructions, which examples, which material, in what order — rather than wordsmithing one-off requests. Successor to "prompt engineering." Introduced conceptually in [the Context pillar](../00-foundations/the-context-pillar.md); made concrete by your templates.
