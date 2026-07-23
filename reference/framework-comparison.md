# How the Judge Ladder relates to other frameworks

"Is there a standard for this?" Reasonable question; short answer: there are several public framings, none of which does the Judge Ladder's specific job — describing **an individual's changing role** relative to the task loop. Here is how the ladder sits against the ones you are most likely to encounter.

## OpenAI's five levels — organizational scale, not individual practice

OpenAI has described a five-level progression: **Chatbots → Reasoners → Agents → Innovators → Organizations.** It is the framing you will most often meet in the press, so it is worth being able to translate.

The essential difference: OpenAI's levels describe **what AI systems can do**, culminating in AI operating at the scale of whole organizations. The Judge Ladder describes **what one person does** — where a single worker's hand and judgment sit as they delegate one task. Organizational usage and individual usage; the frameworks answer different questions, and both questions are real.

Translation guide, rung by rung:

| Judge Ladder | OpenAI levels |
|---|---|
| Rung 1 (Chat), Rung 2 (Prompt workflows) | L1 "Chatbots" (with L2 "Reasoners" as the improving engine underneath) |
| Rung 3 (Supervised action) | L3 "Agents" |
| Rung 4 (Single-purpose agent) | L3 "Agents" |
| Rung 5 (Autonomous / multi-agent) | No clean equivalent |

Two things to notice in that table:

**Rungs 3 and 4 both land on OpenAI's "Agents."** Their L3 does not distinguish approving-each-action from delegating-the-goal. The Judge Ladder splits exactly there — because that is precisely where individuals get confused ("isn't tool use just what an agent does?"), and where the practical experience of using AI changes most. The ladder is deliberately more granular exactly where people need granularity. That is a feature, not a disagreement.

**Rung 5 maps to nothing.** OpenAI's L4 ("Innovators") and L5 ("Organizations") describe model capabilities that do not yet exist in anyone's hands. Rung 5 describes a *practice* that exists today: multi-agent pipelines running under guardrails with humans on the loop. A capability forecast and a practice description simply pass each other at that altitude.

Use OpenAI's vocabulary when you need to talk about where the *field* or an *organization* is going; use the ladder when you need to talk about where *you* are with a given task.

## Dan Shapiro's five levels — closest in spirit, scoped to coding

Shapiro's five-level model of AI-assisted software development (consciously modeled on the NHTSA driving-autonomy levels, running to a fully "Dark Factory" end state) is the framework closest to the ladder in spirit: it is organized around **the human's changing role**, not the machine's capability, and its narration of how each level *feels* to the person living it is excellent.

The difference is scope: Shapiro's levels are specifically about writing software. The Judge Ladder generalizes the same instinct to any recurring knowledge task. If you are a developer, read his levels as a domain-specific companion piece; the two frameworks will feel like the same idea told at different widths.

## The "five asks" list — an orthogonal axis, not a sixth rung

A list circulates widely on LinkedIn in several variants: use AI to *do this for me / do this with me / help me think / find my blind spots / challenge my thinking*. People sometimes ask where it fits on the ladder.

It doesn't — and that is the interesting thing about it. The five asks classify **the type of intellectual work** you request; the ladder classifies **the autonomy arrangement** you delegate under. The axes are orthogonal, and every combination is real: you can ask "challenge my thinking" of a sealed rung-1 chat, and a rung-5 pipeline can exist whose entire job is finding blind spots in your team's weekly output.

Used as a cross-cutting lens, the list is genuinely useful at any rung — it is a prompt to notice that "do this for me" is only one of five things AI is good for. Just never mistake it for a level: it is a second dimension, not a higher rung.

## Summary

| Framework | Organizing principle | Scope | Relation to the ladder |
|---|---|---|---|
| **Judge Ladder** | Where the human sits relative to the loop | Any individual's recurring task | — |
| OpenAI five levels | AI capability | Field-wide / organizational | Vocabulary bridge; rungs 3–4 both = their "Agents"; rung 5 has no equivalent |
| Shapiro's five levels | The human's changing role | Software development | Closest in spirit; domain-specific companion |
| "Five asks" list | Type of intellectual work | Any single request | Orthogonal axis; a lens for every rung, never a rung |
