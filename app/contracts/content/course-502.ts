import type { Course } from "./types";

export const course502: Course = {
  code: "502",
  slug: "aijl-502",
  title: "On-Prem AI Systems Design",
  rungLabel: "Rung 5+ — Supplemental",
  track: "supplemental",
  durationDays: 5,
  confers: "AIJL Rung 5+",
  gateText:
    "You can build it — and what you build can account for itself in the record it emits.",
  gateSource: "authored",
  summary:
    "For builders — the framework's own carve-out. Architect a sovereign multi-agent system from requirements up: decomposition, permission topology, retrieval infrastructure, guardrails as code, and auditability by design.",
  prerequisites: ["501", "402"],
  modules: [
    {
      id: "502-m1",
      title: "Day 1 — From Requirements to Architecture",
      lessons: [
        {
          id: "502-m1-l1",
          title: "The one course the framework explicitly authorizes",
          blocks: [
            { type: "paragraph", text: "Every other supplemental boundary in this program was authored by the curriculum. This one is quoted: for most people, recognize and govern — not build. Builders exist, and for them the bar includes construction. 502 is that bar: the only course whose audience is builders, and the only one where construction is the competency rather than a means to one. It sits on the deepest prerequisite stack in the program — 501 and 402, which required 401 and 302 — so almost everything is assumed. What remains is genuinely its own." },
            { type: "table", headers: ["Concept", "Established below", "502 does"], rows: [
              ["Multi-agent design", "501: read a design", "Authors one from requirements"],
              ["Guardrails, autonomy policy", "501: write and critique as documents", "Implements them as enforced system behaviour"],
              ["Audit trails", "501: read them; recognize an inadequate one", "Builds the observability that produces an adequate one"],
              ["Hosting", "302: provision and size one deployment", "Designs the stack — serving, storage, retrieval, topology"],
              ["Residency", "302: enforce it on a deployment", "Designs for sovereignty from requirements up"],
              ["Containment and privilege", "402: administer and secure an agent", "Architects the trust boundaries a whole pipeline sits inside"],
            ] },
            { type: "paragraph", text: "Eliciting the real requirements is Day 1's actual work: task, data profile, sovereignty constraints, stakes, the reversibility map, and who supervises. A requirements document that omits the supervisor produces a system no one governs — an unanswerable system by design, before a line is built." },
          ],
        },
        {
          id: "502-m1-l2",
          title: "Decomposition, permission topology, trust boundaries",
          blocks: [
            { type: "paragraph", text: "Decomposition is an architectural decision here — Rung 2's lesson at its final altitude. Which agents, what each may do, where the handoffs go. The same rule as everywhere: small single-purpose agents, because each one gets its own desk, its own permissions, and its own audit segment. Designing for structural skepticism — an agent whose job is doubting another — is an architectural choice, not a configuration one: the fact-check bounce must be wired into the topology, not bolted on as a prompt." },
            { type: "paragraph", text: "Permission topology is a different problem from 402's single-agent security. Distributing least privilege across a pipeline: only the send agent holds send rights; retrieval touches the corpus and nothing else; the skeptic reads everything and can change nothing. And trust boundaries: where the pipeline's internal edges are, and which crossings need enforcement. An internal handoff is not safe because it is internal — it is a boundary crossing, and crossings are where enforcement lives." },
          ],
        },
      ],
    },
    {
      id: "502-m2",
      title: "Day 2 — The Stack",
      lessons: [
        {
          id: "502-m2-l1",
          title: "Serving and retrieval infrastructure",
          blocks: [
            { type: "paragraph", text: "Serving architecture separates a demo from a service: model hosting with real concurrency, request routing, queueing, and the difference between 'responds to my test' and 'holds up at the organization's actual load.' Capacity planning — throughput, concurrency, context budget, cost at scale — is a Day 1 requirement made concrete." },
            { type: "paragraph", text: "Retrieval infrastructure gets its first real ownership anywhere in the catalog: vector stores, indexing, chunking decisions, corpus lifecycle. RAG was defined at 301 as a user concept and has never been built by anyone until now. Corpus management is 402's defense seen from the builder's chair: you build the corpus that must be defended — provenance on every document, reviewed additions, integrity over time. And storage and state: what persists, where, under what retention — including how agent memory (Rung 4) is actually implemented, which is a database with a governance policy." },
            { type: "callout", tone: "info", title: "Infrastructure-as-code", text: "Deferred from 302's not-taught list because it is a design competency, not an operating one. The stack is defined as code: reviewable, revertible, reproducible. An architecture that exists only in someone's console clicks cannot be audited — which in this program means it cannot answer for itself." },
          ],
        },
      ],
    },
    {
      id: "502-m3",
      title: "Day 3 — Building for Auditability",
      lessons: [
        {
          id: "502-m3-l1",
          title: "The auditor is your customer",
          blocks: [
            { type: "paragraph", text: "501's graduate will read what you emit. Design the record for that reader: what a trail must capture — retrievals, decisions, handoffs, trips, sends — including the fields that turn out to matter only after an incident. Instrumenting the trip: when the system escalates to a human, the escalation carries context with it, so a person woken at 2 a.m. can act — what tripped, what the system was doing, what it had already done." },
            { type: "paragraph", text: "Designing so drift is visible is a schema decision made months before anyone needs it. Drift appears only across runs, so the record must support cross-run comparison: consistent fields, consistent units, source identifiers, decision codes. A schema can capture every run perfectly and still make cross-run comparison impossible — that is the auditability property most often absent by accident, and the exam weights it accordingly." },
            { type: "callout", tone: "key", title: "The unanswerable system", text: "Architectures that behave correctly and cannot account for themselves. You learned to recognize them from the auditor's chair at 501. Today you learn to recognize them from the builder's chair — before shipping. A builder who ships a system that behaves perfectly but cannot account for itself has failed this gate." },
          ],
        },
      ],
    },
    {
      id: "502-m4",
      title: "Day 4 — Enforcement and Sovereignty",
      lessons: [
        {
          id: "502-m4-l1",
          title: "Guardrails as code",
          blocks: [
            { type: "paragraph", text: "501 wrote the autonomy matrix as a document. Here it becomes enforced behaviour: may / escalate / never implemented in the system, not trusted to the agents' good behaviour — including what happens on ambiguity, and the correct answer is escalate. Guardrails as code means enforcement that does not depend on anyone watching: the send agent cannot reach unlisted recipients because the system prevents it, not because its instructions discourage it." },
            { type: "paragraph", text: "Self-correction loops as architecture: the fact-check bounce, wired in, with its limits understood — it raises average quality and never replaces the audit. A system that grades its own homework still needs someone reading the gradebook; your job is to make the gradebook legible." },
          ],
        },
        {
          id: "502-m4-l2",
          title: "Sovereignty by design",
          blocks: [
            { type: "paragraph", text: "302 enforced residency on one deployment. Here the whole architecture is derived from the jurisdictional requirement upward: where every component runs, where every byte rests and transits, whose law governs each hop — including the forgotten fourth from 302: logging, telemetry, and backups, which leak sovereignty while the model endpoint stays compliant. Air-gapped and disconnected design is where full on-prem stops being a preference and becomes the only permissible answer — and designing for it means accepting the capability ceiling honestly, because the data profile forbids the alternative." },
            { type: "paragraph", text: "The derivation has a discipline to it. Start with the data classification, not the vendor matrix: what is the most sensitive byte the system will ever touch, and whose law claims it? Every downstream decision — hosting tier, model source, support access, disaster-recovery topology — is then an answer to that question, not a preference. An architecture chosen first and justified afterwards always shows the seam: the compliance annex, the apologetic footnote about telemetry." },
            { type: "paragraph", text: "Honesty about the ceiling is part of the design artifact. A disconnected deployment cannot call the frontier endpoint; its corpus cannot be enriched by a cloud service; its updates arrive on physical media, by procedure, not by API. Writing those sentences into the design, and getting the sponsor to sign them, is what separates a sovereignty architecture from a sovereignty hope. The gate will ask you to spot the hope." },
          ],
        },
      ],
    },
    {
      id: "502-m5",
      title: "Day 5 — Operating Reality",
      lessons: [
        {
          id: "502-m5-l1",
          title: "Failure design and the model lifecycle",
          blocks: [
            { type: "paragraph", text: "High availability and failure design — deferred from 302: what degrades gracefully, what must not fail, and what a partial failure does to a pipeline mid-run. A pipeline that dies halfway through a mission leaves state everywhere: partial outputs, held locks, a send that may or may not have happened. Design the failure modes, not just the happy path." },
            { type: "paragraph", text: "Model lifecycle: evaluation, selection, upgrade, deprecation. A model version change is a behaviour change, and probabilistic behaviour makes regression testing genuinely hard — you compare distributions against known-good workloads, not outputs against a single expected string. And handing over: what an operator (302) and a supervisor (501) each need from you to do their jobs — the runbook, the data-flow answers, the audit schema documentation. A system its operators cannot operate is a system you did not finish." },
          ],
        },
        {
          id: "502-m5-l2",
          title: "Gate briefing: what the exam looks like",
          blocks: [
            { type: "paragraph", text: "Design resists binary scoring — a design has a defensible range, not a right answer. The program's resolution: score adjudication, not construction. Part 2A, architecture defect adjudication: a proposed architecture with seeded defects — sovereignty, permission topology, trust boundaries, reversibility, corpus integrity, failure design, lifecycle. Find all; classify each. Part 2B, auditability adjudication: given an architecture and its emitted record schema plus governance questions, mark each question answerable or not answerable by this design. Part 1: multiple choice across the week. Standard: ≥85% MC, ≥90% across the practicals." },
            { type: "paragraph", text: "Both parts fail in two directions, as every gate on this ladder does. In 2A, a seeded defect you miss and a sound mechanism you condemn cost the same — the competency is telling them apart, not suspecting everything. In 2B, mark answerable only what the record as specified can actually answer; an architecture that 'should' record something and a record that does record it are different artifacts, and only one of them survives an audit." },
            { type: "callout", tone: "info", title: "The closing point", text: "501 certifies that you can tell whether a system answers to anyone. 502 certifies that you can build one that does. Five rungs, one tool set — the only thing that ever moved was the hand on the trigger. At the top of the ladder the hand is off the trigger entirely, and the person who built the machine is accountable for whether it can still be held to account." },
          ],
        },
      ],
    },
  ],
};
