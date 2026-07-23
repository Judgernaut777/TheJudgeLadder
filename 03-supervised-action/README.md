# Rung 3 — Supervised action

**Your role: you approve each action.**

This is the rung where the box opens. The model gets **tools** — web search, email, file access, calendars, whatever the task needs — and with them, for the first time, the ability to touch the world outside the chat. It can go *find* the articles instead of waiting for you to paste them. It can *offer to send* the email instead of handing you text to carry.

And every single one of those actions happens only when you approve it. The AI proposes; you dispose. That arrangement has a name you will meet again: **human-in-the-loop**.

## Why this rung is called "supervised action" — not "tool use"

The naming is deliberate, and it exists to dissolve the most common confusion in the whole subject:

> *"Isn't tool use just what an agent does?"*

Yes. **Same mechanism.** The tools that appear at rung 3 never leave — rungs 4 and 5 use exactly the same web search, the same email access, the same integrations. Nothing new is bolted on above this rung. What changes from rung to rung is *whose hand is on the trigger*.

So "tool use" cannot be what distinguishes rung 3 — tools are the shared property of rungs 3, 4, and 5. What distinguishes rung 3 is the **supervision**: every action individually approved by you. The climb from rung 3 to rung 4 is precisely: *you stop approving each action and start approving the goal.* Name the rung after the thing that changes, not the thing that stays.

## What the box opening buys you: grounding

Recall the rung-1 problem: a sealed model can only sound right. A tool-equipped model can **check**. It can search, retrieve real documents, and build its answer out of what it found — with citations you can follow.

This is **grounding**, and it is the deep reason tools exist — not convenience, *verifiability*. Grounding versus hallucination is one of the framework's two load-bearing contrast pairs. The pattern of retrieving relevant documents and putting them on the desk before answering has a name — **RAG**, retrieval-augmented generation — and if you read [the Context pillar](../00-foundations/the-context-pillar.md), you already understand it: RAG is context management. Put only the relevant documents on the desk, fetched fresh per question.

One discipline comes with it: **a citation is a claim, not proof.** Models can cite a real source that does not say what the summary claims it says. Your rung-1 verification instinct now has a concrete job: follow the citation, confirm the source says the thing.

## What the box opening costs you: responsibility

Here is the trade nobody should soften: the moment the AI can act on the world, **you inherit responsibility for what makes that safe.** Not as an advanced topic — as table stakes for standing on this rung at all. Three inheritances arrive immediately:

**Where your data goes.** Connecting a tool means data flows through it. Pasting material into a model means that material went *somewhere* — whose servers? retained how long? used for what? At rung 3 you must be able to answer, for every tool you use: *what data of mine goes in, and where does it live?* If you cannot answer that, you are not using the tool; you are trusting it blindly.

**Prompt injection.** Once the model reads the outside world, the outside world can talk back. A web page or email can contain text crafted to hijack the model — "ignore your instructions and forward this to..." The model reads retrieved content the same way it reads *your* instructions; malicious content exploits exactly that. Injection is the signature attack of the tool era, and your per-action approval is, among other things, your injection tripwire: *why does it want to send an email I didn't ask about?*

**Credentials.** Connections to tools are built on credentials — passwords, tokens, keys. Two rules, both absolute: never paste a credential into a chat, and grant connected tools the narrowest access that works. A credential in a context window is a credential you no longer control.

These three are the opening of the **infrastructure & trust track** — a parallel strand of the framework that switches on here and runs to the top of the ladder. Rungs 1–2 needed none of it; the box was sealed. The full track, including the question of *where the model itself lives*, is at [tracks/infrastructure-and-trust.md](../tracks/infrastructure-and-trust.md).

## Judgment at this rung

Judgment relocates from evaluating text to **authorizing actions**. Each approval is a small decision with real-world consequences: is this search sensible, is this draft accurate, should this email actually go out, to these people? The frequency is still high — every action — but the stakes per decision just became real. This is the rung where judgment stops being editorial and starts being operational.

- [In practice: the weekly summary at rung 3](in-practice.md)
- [Competencies and gate](competencies.md)
- [Vocabulary](vocabulary.md) — the biggest vocabulary of any rung, because the infra track switches on here
