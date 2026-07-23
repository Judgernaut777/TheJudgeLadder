# Rung 2 — Prompt workflows

**Your role: you chain the steps by hand.**

Rung 2 begins the moment you notice you are typing the same kind of request for the third time. The move that defines the rung: stop treating each chat as a one-off performance and start treating your prompts as **reusable assets** — templates you save, refine, and chain together.

The box is still sealed. No tools, no reach into the world. What changes is not the model's capability but *your relationship to the task*: you decompose it into steps, build a template for each step, and run the steps in sequence — with you personally carrying the output of one step into the input of the next.

## From performance to pipeline

Three shifts happen at this rung, and together they are the difference between "using a chatbot" and "having a workflow":

**Decomposition.** A recurring task stops being one big ask and becomes named stages. "Write my weekly summary" decomposes into *gather notes → summarize → format as email*. Each stage gets its own template, tuned to do one thing well. Small, single-purpose prompts beat one sprawling mega-prompt — a lesson that returns at rung 5, where it reappears as the reason multi-agent systems exist.

**Templates.** A prompt template is a saved prompt with blanks: the instructions, the role, the format spec, and the examples stay fixed; this week's material drops into the slot. Templates convert your rung-1 iteration from a cost you pay every time into an investment you make once. Every time you refine the template instead of the one-off answer, you are compounding.

**Structured output.** Once a prompt's output feeds another prompt, sloppiness stops being tolerable. You start demanding structure: "return exactly five bullets," "output a table with these three columns," "respond in this exact format." Structured output is what makes chaining possible — step two can only consume step one's output reliably if step one's output has a reliable shape.

## The name for what you're now doing

There is a formal name for the skill you are building: **context engineering** — deliberately curating what goes on the model's desk, rather than wordsmithing individual requests. Your templates are context-engineering artifacts: each one is a considered decision about what the model needs to see, in what order, with what examples. The term was introduced in [the Context pillar](../00-foundations/the-context-pillar.md); rung 2 is where it stops being theory and becomes your actual practice.

## You are the wiring — feel it

At rung 2 you are the wiring between every step: copy out of step one, paste into step two, copy out of step two, paste into the email. Every Friday. By hand.

Do not rush past this friction — it is load-bearing for the whole ladder. The copy-paste tedium you feel at rung 2 is the honest, felt-in-the-hands answer to a question that matters enormously at rung 3: *why would anyone give an AI tools?* Not because tools are futuristic — because **you are currently doing, by hand, mechanical transport that contains no judgment**. Moving text between boxes is not judgment. Noticing that is what makes the next rung legible.

## Judgment at this rung

Judgment moves up one level: from evaluating each answer to **designing the pipeline** — deciding how the task decomposes, what each stage's template demands, what structure flows between stages. You still verify outputs (that instinct never retires), but you now also judge the *system* that produces them.

- [In practice: the weekly summary at rung 2](in-practice.md)
- [Competencies and gate](competencies.md)
- [Vocabulary](vocabulary.md)
