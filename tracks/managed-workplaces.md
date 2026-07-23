# Reading the ladder in a managed workplace

*How the framework shifts when you climb it inside an organization — approved tools, an IT department, policies you didn't write.*

The ladder itself does not change: five rungs, one moving part, judgment at every level. What changes is **how the infrastructure & trust track lands on you**. If you work somewhere with an IT department, approved tools, and acceptable-use policies, a large share of that track has already been carried by someone else — and a different share has quietly become *more* important, not less.

The reallocation rule, in one sentence:

> **Anything you would have had to build or run, the organization has absorbed. Anything about what data moves where, you still own — and own harder.**

The individual thesis shifts accordingly: less "everyone becomes a little devops," more **ops-aware, governance-fluent**.

## What you can hold at recognition-only

These remain in your vocabulary (and in the [glossary](../reference/glossary.md), which is never abridged) — but in a managed workplace you need to *recognize* them, not operate them:

- **Open vs. closed weights, cloud vs. on-prem.** Someone above you already made this call when they chose the approved tools. The trust decision was made organizationally; you don't re-make it per task. Your one operational question: *which tool is approved for which kind of work?* — because that answer dictates everything below.
- **Quantization, containers, endpoints, environments, deployment, rollback, Git.** The machinery of running software. In a managed workplace, run by people whose job that is. Recognize the words; don't carry the pager.
- **Logging infrastructure** — with one important inversion. You will never set up logging. But **know that you are logged**: prompts, connected-tool activity, and AI interactions on workplace systems are typically recorded. This isn't a threat; it's the flip side of rung 5's observability story — the audit trail that makes autonomy governable is the same trail that records your usage. Behave, and paste, accordingly.
- **Secrets infrastructure.** You won't run a vault. The personal rule survives at full strength: **never paste a credential into an AI tool.** No approved tool changes this rule.
- **Sandboxing.** If agents run in your workplace, someone sandboxed them. Recognition is enough.

## What you own harder than the general reader

- **The data question, promoted to the whole game.** Rung 3's gate asked "can you state where your data goes?" In a workplace this becomes the central skill: for every approved tool, know **what classification of data may enter it**. Personal information about customers or colleagues, unreleased figures, contract terms, anything under NDA — each has an answer to "may this be pasted here?", and knowing those answers *is* workplace AI competence. When you don't know, the answer is "not yet — ask."
- **Exfiltration.** The workplace version is mundane and constant: convenient-but-unapproved tools. The shadow-AI pattern — pasting work material into a personal account because the approved tool is clunkier — is a data-leaving-the-building event, however innocent it feels.
- **Injection, both kinds.** Being in a managed environment protects you from none of this: you still read email, your tools still read documents, and rung-4 agents in your workplace still read the web. Recognizing injection-shaped anomalies stays a front-line skill at every desk.
- **Human-in-the-loop, reframed as policy.** For some categories of work, per-action human approval isn't a rung you're passing through — it's a **mandated stopping point**. Where policy says a human approves, that approval gate is a load-bearing control someone placed deliberately. Treat "the AI could just do this part too" as a thought to raise, not a workaround to take.
- **Least privilege, from the other side.** As an individual you learned to *grant* minimal access. As an employee you also *live under* it: your accounts and tools are scoped to your role. The fluency is understanding that limited access is design, not distrust — and that **routing around it is the violation**, even in service of getting work done faster.
- **Escalation.** The term this context adds to the framework. Every autonomy policy has a "must escalate" column; in a workplace, so do you. Knowing which decisions are yours and which must go to a person with the authority to make them — and treating handing-up as competence rather than failure — is the human half of rung 5's escalation machinery.

## One caveat

This reallocation is **role-dependent**. If you build or operate systems for your organization, the full infrastructure track is yours at full weight — nothing here is abbreviated for you. The recognition-only compression applies to the majority whose job is to *use* AI inside the environment others maintain. And compression applies to attention, never to the reference: every term stays in the glossary at full definition.
