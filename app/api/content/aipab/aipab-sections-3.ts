// SERVER ONLY — AIPAB section banks (parallel forms). Sections 501, 502.
import type { AipabSection } from "./aipab-sections-1";

export const aipab501: AipabSection = {
  courseCode: "501",
  mcBank: [
    { id: "a501-1", question: "Human-on-the-loop means:", options: ["No humans anywhere", "You are the supervisor the loop reports to — control moves from before (approve this) to around and after", "Watching every step", "Approving each action faster"], answer: 1 },
    { id: "a501-2", question: "The autonomy matrix exists because:", options: ["Regulators demand forms", "Nobody is present to improvise the answer — each action is classified may/escalate/never in advance", "Agents enjoy rules", "It replaces guardrails"], answer: 1 },
    { id: "a501-3", question: "Escalating every action produces:", options: ["Maximum safety", "A system with no autonomy — Rung 4 with extra infrastructure", "Better audits", "Lower cost"], answer: 1 },
    { id: "a501-4", question: "A fact-check agent whose job is doubting the gather agent is an example of:", options: ["Waste", "Structural skepticism — independence that is architectural, not attitudinal", "Redundancy to remove", "A prompt trick"], answer: 1 },
    { id: "a501-5", question: "Self-correction inside a run:", options: ["Replaces the audit", "Raises average quality; the audit still stands — someone reads the gradebook", "Is a defect", "Removes the need for guardrails"], answer: 1 },
    { id: "a501-6", question: "The core governance skill in critiquing a policy is:", options: ["Legal analysis", "Seeing the gap between what the policy appears to permit and what it actually permits", "Speed reading", "Writing new policy"], answer: 1 },
    { id: "a501-7", question: "Drift is invisible per-run because:", options: ["Logs hide it", "No rule is broken in any single run — the pattern is only wrong across runs", "It happens at night", "Models conceal it"], answer: 1 },
    { id: "a501-8", question: "A system that behaves well but whose record cannot answer the question is:", options: ["Well governed", "Not auditable — therefore not answerable, however well it behaves", "Fine for production", "A documentation issue only"], answer: 1 },
  ],
  practical: {
    kind: "matrix",
    id: "a501-practical",
    title: "Autonomy policy construct — parallel form",
    instructions:
      "A facilities-management pipeline serves a hospital trust: gather agent (reads maintenance tickets, sensor summaries), planner agent (schedules work orders), dispatch agent (issues work orders to contractors). Classify each action: may do alone / must escalate / must never. Over-permissive ships the irreversible; over-restrictive defeats the point of autonomy.",
    contextTitle: "System description",
    context: [
      { type: "paragraph", text: "Pipeline: overnight facilities triage. Gather reads tickets and sensor summaries. Planner drafts tomorrow's work orders. Dispatch issues approved work orders to registered contractors. Guardrails: spending cap per order ($2,500); clinical areas flagged sensitive; contractor registry managed by procurement." },
    ],
    actions: [
      { id: "a1", label: "Read overnight maintenance tickets and sensor summaries" },
      { id: "a2", label: "Draft work orders for routine, reversible repairs under the spending cap" },
      { id: "a3", label: "Issue a work order affecting a clinical area flagged sensitive" },
      { id: "a4", label: "Issue a routine work order under the spending cap to a registered contractor" },
      { id: "a5", label: "Add a new contractor to the registry and issue them work" },
      { id: "a6", label: "Issue a work order above the spending cap" },
      { id: "a7", label: "Order the shutdown of a ward's power for electrical maintenance" },
      { id: "a8", label: "Re-prioritize the order of drafted work within the approved list" },
    ],
    levels: [
      { id: "alone", label: "May do alone" },
      { id: "escalate", label: "Must escalate" },
      { id: "never", label: "Must never" },
    ],
    key: { a1: "alone", a2: "alone", a3: "escalate", a4: "alone", a5: "never", a6: "escalate", a7: "never", a8: "alone" },
  },
};

export const aipab502: AipabSection = {
  courseCode: "502",
  mcBank: [
    { id: "a502-1", question: "The 502 gate's second half — 'what you build can answer for itself' — means:", options: ["Good documentation", "The guardrails are enforced rather than documented, and the record you designed captures what an auditor will actually need", "The system passes its demo", "The builder attended the review"], answer: 1 },
    { id: "a502-2", question: "Drift-visibility fails most often by:", options: ["Too little logging", "A schema that captures every run perfectly but makes cross-run comparison impossible", "Too much logging", "Missing dashboards"], answer: 1 },
    { id: "a502-3", question: "Sovereignty by design derives the architecture from:", options: ["The vendor matrix", "The data profile — the most sensitive byte and whose law claims it — upward", "Cost targets", "Existing infrastructure"], answer: 1 },
    { id: "a502-4", question: "The component most likely to leak sovereignty while the model endpoint stays compliant:", options: ["The load balancer", "Logging, telemetry, and backups", "The API gateway", "The queue"], answer: 1 },
    { id: "a502-5", question: "Guardrails as code means:", options: ["A policy PDF", "Enforcement that does not depend on anyone watching", "Good prompting", "Regular audits"], answer: 1 },
    { id: "a502-6", question: "A model version change is treated as:", options: ["A drop-in upgrade", "A behaviour change — regression testing compares distributions against known-good workloads", "A vendor problem", "Invisible"], answer: 1 },
    { id: "a502-7", question: "On ambiguity, the autonomy matrix should:", options: ["Proceed", "Escalate", "Guess", "Loop"], answer: 1 },
    { id: "a502-8", question: "An internal handoff between two agents is:", options: ["Safe by virtue of being internal", "A trust-boundary crossing — crossings are where enforcement lives", "Unlogged", "Free"], answer: 1 },
  ],
  practical: {
    kind: "booleanSet",
    id: "a502-practical",
    title: "Auditability adjudication — parallel form",
    instructions:
      "You are reviewing an architecture before build. Below: the design summary and the exact record schema it will emit. For each governance question, mark whether the design as specified can answer it. Mark answerable only what the record as specified can actually answer — an architecture that 'should' record something and a record that does are different artifacts.",
    display: "yesno",
    yesLabel: "Answerable",
    noLabel: "Not answerable",
    contextTitle: "Architecture and emitted record schema",
    context: [
      { type: "paragraph", text: "Design: three-agent permit-triage pipeline for a municipal authority, fully in-region. Gather → assessor → dispatcher. Guardrails as code on disbursement actions. Autonomy matrix implemented in the dispatcher." },
      { type: "list", items: [
        "Record schema per run: run_id, timestamp, agent, action_type, input_hash, output_hash, decision_code, guardrail_trips (list), escalation_payload (nullable).",
        "decision_code drawn from a fixed enum: APPROVE, ESCALATE, REJECT, SKIP.",
        "Escalations carry: what tripped, current action, prior action summaries.",
        "No source identifiers are recorded for retrieved documents.",
        "No cross-run index exists; records are stored as independent run files.",
      ] },
    ],
    subjects: [
      { id: "q1", label: "For a given run, which actions tripped a guardrail?" },
      { id: "q2", label: "When the system escalated, what was it doing and what had it already done?" },
      { id: "q3", label: "Which source document led the assessor to approve permit application #4471?", description: "Consider what input_hash can and cannot tell you." },
      { id: "q4", label: "Has the pipeline's approval rate drifted over the last quarter?", description: "Consider the storage layout." },
      { id: "q5", label: "Did any disbursement action execute without a guardrail evaluation?", description: "Guardrails are code; decision_code and guardrail_trips are recorded per action." },
      { id: "q6", label: "Is the share of runs citing one particular source increasing?", description: "A drift-visibility question." },
    ],
    key: { q1: true, q2: true, q3: false, q4: false, q5: true, q6: false },
  },
};
