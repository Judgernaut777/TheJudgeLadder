# Rung 5 — Competencies and gate

## Operating at this rung means you can

- **Read a multi-agent design.** Look at a pipeline of cooperating agents and identify the decomposition: which agent does what, what each is permitted, where the handoffs are, which agent holds which privileges.
- **Write (or critique) guardrails and an autonomy policy.** State, action by action, what a system may do alone, what it must escalate, and what it must never do — with the boundaries drawn where stakes and irreversibility say they belong.
- **Supervise on-the-loop.** Read audit trails as a practice: skim normal runs, drill into anomalies, and catch cross-run drift that no single run reveals.
- **Judge an autonomous output from outside.** When work arrives with no human in its history, know the questions: what system produced this, under what policy, with what verification, and where is the record?

A concrete benchmark for the rung: a pipeline that runs a full cycle of the recurring task with humans touched only on guardrail trips — and, for most people, the ability to *specify and audit* such a pipeline matters more than the ability to assemble it.

## The gate

> **For most people: recognize and govern — not build.**

This is the only rung whose gate is explicitly split by role. Builders exist, and for them the bar includes construction. But the framework's claim is that the scarce, broadly-needed skill at rung 5 is **governance**: the ability to look at an autonomous system and determine whether it is answerable — right guardrails, sane autonomy policy, legible audit trail, drift being caught.

The restraint pattern of every gate reaches its endpoint here. Rung 1's gate was verifying a sentence; rung 4's was reviewing a result; rung 5's is auditing a system. Each time, capability grew and the gate demanded that judgment grow to match. A person who clears this gate can sit in front of the most autonomous configuration this framework describes and still answer the question the whole ladder has been building toward: *who is judging this, and how?* — with, ultimately, their own name.
