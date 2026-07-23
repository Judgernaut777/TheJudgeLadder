# Rung 3 — Vocabulary

The largest vocabulary of any rung — because the box opens here, and the [infrastructure & trust track](../tracks/infrastructure-and-trust.md) switches on with it.

## Core terms

**Tool / function calling.** The mechanism behind everything at rungs 3–5: the model, mid-response, requests that a specific tool be run (a search, an email draft, a file read) and then incorporates the result. The same mechanism whether a human approves each call (rung 3) or not (rungs 4–5).

**Grounding.** Tying the model's output to retrieved, checkable sources instead of its unaccompanied recall. The deep reason tools exist: a sealed model can only sound right; a grounded one can be checked. One half of the framework's load-bearing pair *grounding vs. hallucination*.

**Retrieval / RAG (retrieval-augmented generation).** Fetching relevant documents and placing them on the model's desk before it answers. Best understood as context management (see [the Context pillar](../00-foundations/the-context-pillar.md)): only the relevant material, fetched fresh per question. Complement to long context windows, not a competitor.

**Citation.** A pointer from a claim to its source. Discipline: a citation is a claim, not proof — models can cite real sources that don't say what the summary says. Follow and confirm.

**Connector / integration.** A configured link between an AI assistant and a real service (email, calendar, files, search). Each connector is both a capability and a data pathway — every one you add extends what the AI can do *and* where your data can flow.

**Human-in-the-loop.** The rung-3 arrangement: a human approval sits inside the action loop, so nothing fires without a person. Contrast with *human-on-the-loop* at rung 5 — the whole autonomy story in two prepositions.

**Effective vs. advertised context.** From the Context pillar, first operationally relevant here: retrieval pipelines must budget for the context size at which the model stays accurate (often ~150–400K tokens on models advertising millions), not the number on the marketing page.

## Infrastructure & trust track (switches on here)

Three clusters. Full narrative in [the track document](../tracks/infrastructure-and-trust.md).

### Where the model lives

**Closed weights (cloud/API).** The model is a service; you send input, receive output, never hold the model. Maximum capability and convenience; your data makes a round trip to someone else's machines.

**Open weights.** The model's weights are published; anyone can download and run it. Note: open weights ≠ open source — weights being downloadable says nothing about training data or licensing terms.

**Cloud / SaaS.** Software (including AI) consumed as someone else's hosted service.

**On-prem / self-hosted.** Running the model on machines you (or your organization) control. Maximum control over data; you inherit the operational work.

**Local inference.** Running a model on your own device. The extreme of the control end: data never leaves your machine.

**Quantization.** Compressing a model to run on smaller hardware, trading some quality. The technique that makes local inference practical.

**Data residency / sovereignty.** Where — physically, legally — data lives and whose law applies to it. Central question in any decision about which of the above configurations is acceptable for which data.

### Data, trust, and the attack surface

**Prompt injection.** Hostile instructions embedded in content the model reads — a web page or email that says, in effect, "ignore your instructions and do X." The signature attack of the tool era. Escalates at rung 4 to *indirect* injection.

**Data poisoning.** Corrupting what a model learns or retrieves from — tainting training data or seeding a retrieval source with malicious content.

**Jailbreak.** Crafting input to push a model past its safety rules. Distinct from injection: a jailbreak is the *user* subverting the model; injection is *third-party content* subverting it against the user.

**Data exfiltration / leakage.** Data leaving where it belongs — pasted into the wrong tool, echoed into a log, or extracted by a successful injection.

**Credentials / secrets management.** The discipline of handling passwords, tokens, and keys. Rung-3 minimum: never put a credential in a chat; grant integrations minimal access.

### Ops literacy

Terms you need to *recognize* because tool-connected AI lives in this world (the "everyone becomes a little devops" cluster):

**Endpoint.** An address where a service accepts requests. Every cloud model is consumed through one.

**Container (Docker/Podman).** A packaged, portable unit of software and its dependencies — how self-hosted models and tools are typically shipped and run.

**Environment (dev/staging/prod).** Separated copies of a system: one to experiment in, one to rehearse in, one that's real. Why "try it in prod" is a punchline.

**Deployment.** Putting a new version of software live.

**Rollback.** Reverting to the previous version when a deployment goes wrong. The existence of rollback is why careful teams deploy fearlessly.

**Version control (Git).** Tracked, reversible history of changes — for code, and increasingly for prompts and configurations worth treating with the same care.

**Logging / monitoring.** Recording what a system did and watching for problems. First rung of an escalating idea: logging (here) → observability and audit trails (rung 5).
