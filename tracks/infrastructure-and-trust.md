# The infrastructure & trust track

*A parallel spine of the framework. Dormant at rungs 1–2, switches on at rung 3, runs to the top.*

## Why this track exists

Rungs 1 and 2 are a sealed box: the model touches nothing, so questions about servers, credentials, and attack surfaces simply do not arise. You can live at rung 2 forever knowing none of this.

Crossing into rung 3 changes that in one stroke. The moment the AI acts outside the chat, **you inherit responsibility for what makes that safe** — not as an optional enrichment, but as part of what standing on rung 3 means. This track is that inheritance, organized.

The half-joking summary: **everyone becomes a little bit devops.** Not everyone becomes an engineer — but everyone using tool-connected AI ends up needing a working vocabulary for where software runs, where data flows, and what can go wrong in between.

## The three clusters

### 1. Where the model lives

A model is software running somewhere, and *where* is a decision with consequences:

- **Closed weights, cloud/API** — the model is a service you call. You never hold the model; your data makes a round trip to the provider's machines.
- **Open weights** — the model's weights are published for anyone to download and run. (Open weights ≠ open source: downloadable weights say nothing about training data or license terms.)
- **Cloud/SaaS vs. on-prem/self-hosted** — consume someone's hosted service, or run it on machines you control.
- **Local inference** — run the model on your own device; data never leaves. **Quantization** — compressing models to fit smaller hardware — is what makes this practical.
- **Data residency / sovereignty** — where data physically and legally lives, and whose law applies. The question that forces all the above choices to be made deliberately.

### 2. Data, trust, and the attack surface

What can go wrong once an AI reads the world and acts on it:

- **Prompt injection** (rung 3) — hostile instructions hidden in content the model reads. Escalates to **indirect prompt injection** (rung 4) when an autonomous agent reads that content with no human watching.
- **Data poisoning** — corrupting what a model learns or retrieves from.
- **Jailbreak** — a *user* pushing the model past its rules (distinct from injection, which is *third-party content* subverting it against the user).
- **Data exfiltration / leakage** — data ending up where it shouldn't: the wrong tool, a log, an attacker's inbox.
- **Least privilege** (rung 4) — narrowest access that does the job; unneeded permissions are pure attack surface.
- **Sandboxing** (rung 4) — contained spaces where an agent's mistakes stay contained.
- **Credentials/secrets** — never in a chat window, ever; minimal grants everywhere.

### 3. Ops literacy

The recognition-level vocabulary of running software, because tool-connected AI lives in that world: **deployment** and **rollback**, **environments** (dev/staging/prod), **containers**, **endpoints**, **version control (Git)**, **logging/monitoring**. Defined in the [rung 3 vocabulary](../03-supervised-action/vocabulary.md) and the [glossary](../reference/glossary.md).

## The two ideas this track is actually about

Everything above is inventory. These two are the point:

### Ops burden = rung × hosting

How much of this track you personally carry is **not fixed by how high you climb**. It is the product of two dials: your rung, and your hosting choice.

|  | Managed cloud service | Self-hosted / local |
|---|---|---|
| **Rung 3** | Very little ops: connect approved integrations, mind your data and credentials | Substantial ops: you run the model, the connectors, the logs |
| **Rung 4–5** | Still modest: the provider runs the machinery; you own goals, gates, and audits | The full stack: deployment, sandboxing, monitoring, rollback — all yours |

A rung-4 user on a managed platform may carry *less* operational burden than a rung-3 user self-hosting. **Devops is a dial you choose, not a wall you hit.** Nobody should stay off rung 4 out of fear of servers; choosing managed hosting is choosing to rent that burden out.

### One decision wearing two hats — and it's a trust decision

Open-vs-closed weights and cloud-vs-on-prem look like two separate technical choices. In practice they are **one decision wearing two hats**, and the decision is about **trust**, not technology:

- **Closed weights in the cloud:** maximum capability, minimum operational work, minimum control — your data leaves, and you trust the provider's handling of it.
- **Open weights on your own machines:** maximum control — data never leaves — bought with operational work and, typically, some capability.

Every configuration between the poles is a point on the same axis: *how much do you need to control, and what are you willing to trust others with?* Answer the trust question first — what data is in play, what happens if it leaks, whose rules govern it — and the technical configuration usually picks itself.
