# The ladder in five industries

The running example — a weekly field summary, climbed rung by rung — is deliberately generic. Here is the same table transposed into five industries, each with one recurring task of the same shape: real inputs, a judgment call, and an output that actually goes somewhere.

Read any table **vertically** and the same three structural facts appear every time:

1. Rungs 1–2 have **zero tools** — the sealed box. You carry everything in and out.
2. The tools appear at rung 3 and **never change** through rung 5.
3. The only column that keeps moving is the last one: **whose hand is on the trigger.**

Tools are named as categories, not products — the framework doesn't care which vendor's search box or record system you use, and the tables shouldn't either.

---

## Healthcare

*Task: a weekly digest of new clinical guidance relevant to the practice, sent to the clinical team.*

| Rung | Tools | What it looks like | Who fires each action |
|---|---|---|---|
| 1 | None | Paste guideline updates and abstracts into the chat, get a plain-language digest; you find every source and send the result yourself | You — every real-world step |
| 2 | None | Saved templates: *summarize new guidance → rank by relevance to our patient population → format for the team* — run by hand each week | You — you are the wiring between steps |
| 3 | Medical literature search, secure staff messaging | AI searches the week's literature → you approve the source list → drafts a cited digest → offers to send to the team channel → you approve | You, each action |
| 4 | Same tools | "Every Thursday, compile the guidance digest" — it runs its own searches, remembers what last week covered, drafts; the send waits at your review gate | The AI; you set the goal, review before send |
| 5 | Same tools | Runs Thursday alone — gather agent, citation-check agent, format/send agent; guardrails on sources and recipients; you audit the trail | The AI runs the loop; you set boundaries, audit |

*Trust-track note:* the tool set here is deliberately literature-and-messaging only. Patient information belongs in approved clinical systems and nowhere else — which approved tool may hold which data is the central workplace skill from [managed workplaces](../tracks/managed-workplaces.md).

---

## Financial services

*Task: a weekly market recap with client-relevant highlights, sent to your client list.*

| Rung | Tools | What it looks like | Who fires each action |
|---|---|---|---|
| 1 | None | Paste the week's market commentary and figures into the chat, get a readable recap; you gather every number and send every email yourself | You — every real-world step |
| 2 | None | Saved templates: *summarize the week → pull out what matters for our typical client → format as a client note* — chained by hand | You — you are the wiring between steps |
| 3 | Market data feed, CRM, email | AI pulls the week's data → you approve → drafts the recap with figures cited to the feed → proposes the recipient list from the CRM → you approve the send | You, each action |
| 4 | Same tools | "Every Friday after close, draft the recap" — it pulls data, remembers which topics clients asked about, drafts; nothing reaches a client without your review | The AI; you set the goal, review before send |
| 5 | Same tools | Runs Friday alone — data-gather agent, figures-check agent, format/send agent; hard guardrail: recipients must match the approved client list; you audit weekly | The AI runs the loop; you set boundaries, audit |

*Trust-track note:* client communications are exactly the kind of output where a human review gate is often a **mandated** stopping point, not a personal preference — rung 4's gate here is policy, and treating it as load-bearing rather than friction is the competence.

---

## Retail & e-commerce

*Task: a weekly sales-and-inventory roll-up for the operations team.*

| Rung | Tools | What it looks like | Who fires each action |
|---|---|---|---|
| 1 | None | Export the week's numbers, paste them into the chat, get a narrative summary; you pull every report and post the result yourself | You — every real-world step |
| 2 | None | Saved templates: *summarize sales vs. last week → flag inventory risks → format for the ops channel* — you carry the numbers between steps | You — you are the wiring between steps |
| 3 | Sales analytics, inventory system, team chat | AI queries the week's sales → you approve → checks stock levels on the movers → drafts the roll-up with flagged risks → offers to post it → you approve | You, each action |
| 4 | Same tools | "Every Monday morning, prep the roll-up" — it queries both systems, remembers which flags you acted on before, drafts; posts only after your review | The AI; you set the goal, review before send |
| 5 | Same tools | Runs Monday alone — sales agent, inventory agent, a reconcile-and-post agent; guardrail: any anomaly beyond a set threshold stops the run and pages you | The AI runs the loop; you set boundaries, audit |

---

## Manufacturing & logistics

*Task: a weekly production and quality report for plant leadership.*

| Rung | Tools | What it looks like | Who fires each action |
|---|---|---|---|
| 1 | None | Paste line output figures and incident notes into the chat, get a clean report draft; every number is fetched and every copy is distributed by you | You — every real-world step |
| 2 | None | Saved templates: *summarize output vs. plan → summarize quality incidents → merge into the leadership format* — chained by hand | You — you are the wiring between steps |
| 3 | Production data (ERP), maintenance logs, email | AI pulls the week's production data → you approve → cross-reads maintenance logs for context on the dips → drafts the report → offers to send → you approve | You, each action |
| 4 | Same tools | "Every Friday at shift end, compile the report" — it pulls data, reads the logs, remembers recurring issues, drafts; you review before it goes to leadership | The AI; you set the goal, review before send |
| 5 | Same tools | Runs Friday alone — data agent, downtime-analysis agent, format/send agent; guardrail: safety-related incidents are never summarized-and-sent, always escalated to a human | The AI runs the loop; you set boundaries, audit |

---

## Education

*Task: a weekly student-progress digest for families.*

| Rung | Tools | What it looks like | Who fires each action |
|---|---|---|---|
| 1 | None | Paste the week's grades and notes into the chat, get a warm, readable digest; you compile every input and send every message yourself | You — every real-world step |
| 2 | None | Saved templates: *summarize progress per student → soften and standardize the tone → format for families* — run by hand each week | You — you are the wiring between steps |
| 3 | LMS/gradebook, school messaging system | AI reads the week's gradebook entries → you approve → drafts per-family digests → queues them in the messaging system → you approve each batch | You, each action |
| 4 | Same tools | "Every Friday, draft the family digests" — it reads the gradebook, remembers each family's communication preferences, drafts; nothing sends until you review | The AI; you set the goal, review before send |
| 5 | Same tools | Runs Friday alone — progress agent, tone-check agent, send agent; guardrails: only enrolled families as recipients, and any concerning pattern goes to you, not to a template | The AI runs the loop; you set boundaries, audit |

*Trust-track note:* student records are classified data in every school system — the rung-3 gate question ("where does this data go?") must have an answer of *approved school systems only* before this task crosses rung 3 at all.

---

## Using these tables

Find the table nearest your world and read it vertically once more: the task never changed, the tools froze at rung 3, and the moving part was always you. Then take it to [the worksheet](../worksheet.md) — the nearest table is a legitimate starting template for your own task; adjust the tools and the stakes, and the gates take care of the rest.
