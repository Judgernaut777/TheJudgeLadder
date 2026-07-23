# The Context pillar

> **The model is stateless and its attention rots — so your job, at every rung, is deciding what deserves to be on the desk.**

That sentence is the anchor for everything in this document, and this document is the anchor for half the framework. Context management shows up at every single rung — it just wears different names (prompting, templates, retrieval, memory, compaction). Learn the pillar once and every later term becomes a variation you already understand.

## The stateless model

The foundational reframe, and the one most worth internalizing: **the model has no memory.** None. Every turn, it wakes up with amnesia and re-reads everything — the instructions, the whole conversation so far, whatever documents are attached — and only then produces its answer. What looks like a continuous conversation is a stack of independent awakenings, each handed a transcript.

The practical consequence: the model's context window **is its entire reality for that turn**. If something is not in the window, the model does not know it — not "forgot it," never knew it. Every technique in this framework for making AI useful is, underneath, a technique for getting the right things into that window.

## The desk

Think of the context window as a **desk**. It has a fixed size, measured in tokens. Everything the model works with must physically fit on the desk: your instructions, the conversation, the pasted articles, the retrieved documents.

The naive intuition is that a bigger desk is simply better, and that the right move is to pile everything on it. Both halves of that intuition are wrong, and the next three sections are why.

## Context rot: a fuller desk is a worse desk

Performance degrades as context grows — *well before* the window is full. A technical report from Chroma (Hong, Troynikov & Huber, July 2025) tested 18 frontier models — GPT-4.1, Claude Opus 4, and Gemini 2.5 among them — and found that all of them degrade non-uniformly as input length grows, sometimes by 30–50%, far below their advertised limits.

This is **context rot**: more tokens on the desk degrade the quality of attention paid to each one. A fuller desk is a worse desk.

## Lost in the middle

The degradation is not even. Model attention is U-shaped: strong at the beginning of the context, strong at the end, weak in the middle. Liu et al. (Stanford, TACL 2024) showed accuracy drops of 30%+ when the key fact sits mid-context rather than at either edge.

The model skims the middle like a bored reader. Put what matters at the start or the end; assume the middle of a long context is where information goes to be ignored.

## Distractor interference

Worse than being ignored: similar-but-irrelevant content actively misleads. A document that *almost* answers the question pulls the model toward wrong answers more effectively than obvious junk would. This is the specific reason "just dump everything in" backfires — the dump is full of near-misses, and near-misses are poison.

## Effective ≠ advertised context

Put the three effects together and you get a rule of thumb: the context size at which a model stays reliably accurate is far below the number on the marketing page. Models advertising multi-million-token windows tend to hold high accuracy in the low hundreds of thousands — think ~150–400K effective on a 2M-window model, task-dependent. Plan around the effective number, not the advertised one.

## Context engineering

**Context engineering** is the discipline all of this implies: deliberately curating what goes on the desk — what gets included, what gets summarized, what gets left out, what sits at the edges. It is the successor discipline to "prompt engineering": as the work gets more serious, wordsmithing the request matters less and curating the desk matters more. You will meet this term formally at rung 2, because rung 2 is where you start doing it on purpose.

## Management strategies, mapped to the ladder

Every context-management strategy you will encounter exists because the model is stateless and its attention rots. Each appears at the rung where you first need it:

| Strategy | What it is | Where it appears |
|---|---|---|
| **Truncation / eviction** | When the conversation outgrows the desk, the oldest material silently falls off. This is why long chats "forget" their beginnings. | Felt at rung 1, understood here |
| **RAG (retrieval-augmented generation)** | Instead of dumping every document on the desk, retrieve and place only the relevant ones, per question. | Rung 3 |
| **Summarization / compaction** | Replace bulky history with a dense summary to reclaim desk space. This is what well-built agents do continuously. | Rung 4 |
| **Persistent memory** | Storage *across* turns and sessions, outside the window entirely — it exists precisely *because* context is stateless and rots. Memory is across windows; context is within one. | Rung 4 |

One misconception to retire now: long context windows and RAG are **complements, not competitors**. A bigger desk does not remove the need to choose what goes on it; it changes the budget, not the job.

## The mechanics (technical aside — safe to skip until rung 4)

For readers who want the machinery: attention cost is quadratic — doubling the context roughly quadruples the work. The model also builds a working structure called the **KV cache** that grows with context length and lives in GPU memory, which is why long contexts are slow and hardware-hungry. **Prompt caching** reuses that structure across requests, which is why re-sending the same long prefix can be fast and cheap while a fresh long context is neither. These three facts are revisited in rung 4's vocabulary, where they start affecting real decisions.

## The takeaway

You now hold the one job description that never changes across all five rungs: **decide what deserves to be on the desk.** At rung 1 you do it by hand, paste by paste. At rung 5 you do it by policy, deciding what an autonomous system may retrieve and retain. Same job. Different altitude.
