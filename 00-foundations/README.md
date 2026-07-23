# Foundations

Nine terms and one big idea. This is everything you need before rung 1 — and deliberately nothing more. Every other term in the framework is introduced at the rung where you first hit the wall it solves.

The big idea — how a model's "memory" actually works, and why it is your problem at every rung — gets its own document: [**The Context pillar**](the-context-pillar.md). Do not skip it. It is the single most load-bearing piece of background in the framework.

## The nine terms

**LLM (large language model).** The kind of AI system this framework is about: a model trained on enormous amounts of text that produces text in response to text. Chatbots, assistants, and agents are all interfaces wrapped around an LLM.

**Model.** The trained artifact itself — the thing that turns input text into output text. Different models have different sizes, strengths, and costs. When people say "the model got it wrong," they mean this component, not the app around it.

**Inference.** What happens when a model runs: it takes your input and generates output. Training happened months earlier, once, at enormous expense; inference happens every time you press enter. This distinction matters later, when you meet questions like "where does inference run — someone's cloud, or a machine you control?"

**Prompt.** Everything you send the model in a turn. Not just your question — the instructions, the examples, the pasted material, all of it. The prompt is the whole input, and the quality of the output tracks the quality of the prompt more closely than newcomers expect.

**Token.** The unit models actually read and write — chunks of a few characters, roughly three-quarters of a word in English. Tokens are how context sizes are measured and how usage is billed. You never handle tokens directly, but every limit you will ever hit is denominated in them.

**Context window.** The model's fixed-size working area, measured in tokens. Everything the model can consider in a turn — instructions, conversation so far, pasted documents — must fit inside it. The Context pillar is about what this really implies; the short version: the window is not a nice-to-have detail, it is the model's *entire reality*.

**System prompt.** Standing instructions the model receives before your message — invisible to you in most products. It is why the same underlying model behaves differently in different apps, and why an assistant "knows" its name and rules.

**Hallucination.** Confident, fluent, *wrong* output. Not a glitch — a structural property of how these models work. A model with no tools cannot check anything; it can only produce plausible text. Some of that plausible text is false, and it arrives wearing the same confident tone as the true parts.

**Verification.** The habit that answers hallucination: checking factual output against something outside the model before you rely on it or pass it on. Verification is the first judgment skill of the ladder, and it never goes away — at higher rungs it changes form (checking citations, reviewing an agent's work, reading audit logs), but it is the same muscle. The gate out of rung 1 is not prompting skill; it is that verification has become instinct.

## Where to next

Read [the Context pillar](the-context-pillar.md), then start climbing at [rung 1: Chat](../01-chat/README.md).
