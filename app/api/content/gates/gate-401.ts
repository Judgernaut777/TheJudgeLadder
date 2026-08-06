// SERVER ONLY — contains answer keys. Never import from frontend code.
import type { CourseGate } from "./gate-101-201";

export const gate401: CourseGate = {
  mcBank: [
    { id: "401-mc-1", question: "An agent differs from a tool because an agent:", options: ["Costs more", "Acts in a loop — proposes, acts, observes, proposes again — without you at each step", "Uses a bigger model", "Has a name"], answer: 1 },
    { id: "401-mc-2", question: "Agents fail differently from tools mainly because:", options: ["They fail more often", "They can fail silently mid-loop — each step locally plausible, the trajectory wrong", "They cannot be stopped", "Their errors are always visible"], answer: 1 },
    { id: "401-mc-3", question: "A well-formed handoff is to an agent what ___ is to a prompt:", options: ["Temperature", "The desk — everything it wakes up to and every boundary it operates within", "A fine-tune", "A plugin"], answer: 1 },
    { id: "401-mc-4", question: "Which is NOT a required handoff component?", options: ["Done-criteria for the task", "Scope — what it may and may not touch", "A personality description", "Stop conditions and escalation path"], answer: 2 },
    { id: "401-mc-5", question: "A budget in a handoff caps:", options: ["Only money", "Time, tool calls, and/or cost — the dimensions in which a loop can run away", "The model's context window", "The team's headcount"], answer: 1 },
    { id: "401-mc-6", question: "The record an agent must emit exists so that:", options: ["The vendor can bill correctly", "A human who was not there can reconstruct what the agent did and why", "The agent feels accountable", "Legal is satisfied in principle"], answer: 1 },
    { id: "401-mc-7", question: "A run that finishes on budget with a correct-looking output but no record is:", options: ["A success — output is what matters", "A defective run — unreviewable is unapprovable at this rung", "A minor documentation issue", "Grounds to re-run it later"], answer: 1 },
    { id: "401-mc-8", question: "An agent that hits an ambiguity and escalates instead of guessing has:", options: ["Failed its task", "Behaved exactly as a well-handed-off agent should", "Wasted the budget", "Proved the model is weak"], answer: 1 },
    { id: "401-mc-9", question: "The 'merely unimpressive' run — clean but pointless — is caught by:", options: ["The budget", "Run review by a human with judgment; no automatic check catches pointlessness", "The stop conditions", "The vendor's telemetry"], answer: 1 },
    { id: "401-mc-10", question: "Accountability for an agent's outcome sits with:", options: ["The model provider", "The human who handed off the task — delegation does not transfer ownership", "The agent", "The procurement team"], answer: 1 },
    { id: "401-mc-11", question: "Retrying a failing API call until the budget is exhausted indicates:", options: ["Persistence, a virtue", "A stop-condition failure — the loop could not recognize it was stuck", "A rate limit problem only", "Good cost management"], answer: 1 },
    { id: "401-mc-12", question: "Reviewing runs sample-based rather than exhaustively is acceptable when:", options: ["Never — every run must be reviewed", "The sampling is deliberate and the stakes justify it — review rigor scales with consequence", "The agent is usually right", "Time is short"], answer: 1 },
    { id: "401-mc-13", question: "The correct first response to a defective run is:", options: ["Patch the output by hand and move on", "Fix the handoff — scope, stop conditions, or record — so the defect class cannot recur", "Reduce the budget", "Switch models"], answer: 1 },
    { id: "401-mc-14", question: "Granting an agent broader scope 'to be safe' so it is never blocked:", options: ["Is good practice", "Inverts the discipline — scope is a boundary, and every boundary you remove is a defect you will meet later", "Saves review time", "Is required by most vendors"], answer: 1 },
    { id: "401-mc-15", question: "The Rung 4 gate certifies you can:", options: ["Build an agent from scratch", "Hand off bounded work to an agent and judge the runs it brings back", "Supervise a team of agents", "Guarantee agents never err"], answer: 1 },
  ],
  practicals: [
    {
      kind: "booleanSet",
      id: "401-gate-practical-a",
      title: "Handoff components",
      instructions:
        "For each candidate component: does it belong in a well-formed agent handoff? Mark yes only for components the handoff discipline requires.",
      display: "yesno",
      subjects: [
        { id: "c1", label: "Task statement with explicit done-criteria" },
        { id: "c2", label: "Scope and boundaries — what the agent may and may not touch" },
        { id: "c3", label: "Tool list with the permissions granted for each" },
        { id: "c4", label: "Budget — cap on time, tool calls, or cost" },
        { id: "c5", label: "Stop conditions and the escalation path when they fire" },
        { id: "c6", label: "The record the agent must emit" },
        { id: "c7", label: "The model vendor's uptime SLA" },
        { id: "c8", label: "A personality description for the agent" },
        { id: "c9", label: "The team's org chart" },
        { id: "c10", label: "The agent's confidence target" },
      ],
      key: { c1: true, c2: true, c3: true, c4: true, c5: true, c6: true, c7: false, c8: false, c9: false, c10: false },
    },
    {
      kind: "disposition",
      id: "401-gate-practical-b",
      title: "Run review",
      instructions:
        "You review runs from 'Scribe', an agent that drafts weekly status summaries from the project tracker. Its handoff grants: read access to the tracker and the shared drive; 40 tool calls per run; stop and escalate on any ambiguity in the figures; emit a full run record. Approve or refuse each run. Refusals require the correct reason code.",
      scenarioTitle: "Handoff under review",
      scenario: [
        { type: "paragraph", text: "Scribe's handoff: read-only tracker + shared drive; 40 tool calls per run; on ambiguous figures, stop and escalate — never guess; every run must emit a complete record (inputs, calls, output). Output figures must trace to tracker entries." },
      ],
      items: [
        { id: "run1", title: "Run 041 — completed, 22 calls, every figure traced, record complete", body: [{ type: "paragraph", text: "The summary matches the tracker; two low-priority items were reasonably omitted and the record notes why." }] },
        { id: "run2", title: "Run 042 — completed after 118 calls, record shows 76 retries of a failing API", body: [{ type: "paragraph", text: "Scribe kept retrying the tracker API through repeated failures until it succeeded." }] },
        { id: "run3", title: "Run 043 — clean execution, 19 calls, but one key figure appears in no tracker entry", body: [{ type: "paragraph", text: "The figure is plausible and the prose is confident; the record shows no source for it." }] },
        { id: "run4", title: "Run 044 — completed, output correct, no run record emitted", body: [{ type: "paragraph", text: "The record module errored and Scribe delivered the summary anyway." }] },
        { id: "run5", title: "Run 045 — stopped at call 9, escalated: 'two tracker entries contradict each other on the launch date'", body: [{ type: "paragraph", text: "No summary produced; the escalation names the exact contradiction." }] },
        { id: "run6", title: "Run 046 — correct summary, but the record shows reads from the HR system", body: [{ type: "paragraph", text: "Scribe's handoff grants the tracker and shared drive only." }] },
      ],
      reasonCodes: [
        { id: "r-stop", label: "Stop-condition failure — loop did not stop when it should" },
        { id: "r-unver", label: "Output contains an untraceable claim" },
        { id: "r-record", label: "Missing or incomplete run record" },
        { id: "r-scope", label: "Acted outside granted scope" },
      ],
      key: {
        run1: { decision: "approve" },
        run2: { decision: "refuse", reason: "r-stop" },
        run3: { decision: "refuse", reason: "r-unver" },
        run4: { decision: "refuse", reason: "r-record" },
        run5: { decision: "approve" },
        run6: { decision: "refuse", reason: "r-scope" },
      },
    },
  ],
};
