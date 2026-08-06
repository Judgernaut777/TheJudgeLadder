// SERVER ONLY — AIPAB section banks (parallel forms). Sections 302, 401, 402.
import type { AipabSection } from "./aipab-sections-1";

export const aipab302: AipabSection = {
  courseCode: "302",
  mcBank: [
    { id: "a302-1", question: "A data profile forbids EU personal data leaving the EU. The strongest permissible configuration is:", options: ["Global endpoint with a contractual residency clause", "In-region inference with region pinning and egress control — a guarantee, not a clause", "US endpoint with encryption", "Any endpoint, since the vendor is certified"], answer: 1 },
    { id: "a302-2", question: "A log pipeline that captures full prompts at a client that forbids retention is:", options: ["Thorough observability", "An exfiltration event the operator built", "Fine if access-controlled", "Required for debugging"], answer: 1 },
    { id: "a302-3", question: "Why is rolling back a model version harder to confirm than rolling back ordinary software?", options: ["Models lack versions", "Behavior is probabilistic — 'it worked before' is a weaker signal; you compare distributions, not single outputs", "Containers can't be reverted", "Git doesn't track models"], answer: 1 },
    { id: "a302-4", question: "A secret found in a container's environment variables, visible in logs, is classified as:", options: ["Convenience", "A credential-handling defect — secrets belong in the vault with rotation and revocation", "Normal for dev", "A network issue"], answer: 1 },
    { id: "a302-5", question: "The trust-first decision procedure orders the hosting decision as:", options: ["Benchmark → cost → compliance annex", "Data profile → permissible configuration set → one choice", "Vendor shortlist → pilot → hope", "Cost → speed → residency if convenient"], answer: 1 },
    { id: "a302-6", question: "Silent quality regression is best detected by:", options: ["Watching error rates", "Periodic evaluation against known-good workloads — nothing errors when output just gets worse", "User complaints", "Longer timeouts"], answer: 1 },
    { id: "a302-7", question: "The 302 credential certifies:", options: ["A DevOps engineer", "A competent operator of a known AI stack — runbook, hosting decision from a data profile, trained failure modes", "A security architect", "A model trainer"], answer: 1 },
    { id: "a302-8", question: "Prompts and configs are:", options: ["Ephemeral", "Deployable artifacts — versioned, staged, reviewed, reverted", "Personal notes", "Documentation only"], answer: 1 },
  ],
  practical: {
    kind: "defectHunt",
    id: "a302-practical",
    title: "Stack diagnosis — parallel form",
    instructions:
      "Below is a running tool-connected stack. It contains exactly the seeded defects a trained operator should catch. Mark each labelled spot defective or clean, and classify each defect. Every defect maps to a failure mode the course teaches; condemning a sound mechanism costs the same as missing a defect.",
    artifactTitle: "Presented stack — regional clinic summarizer",
    artifact: [
      { type: "paragraph", text: "s1 — Inference: managed endpoint, vendor's global default region. Data profile: patient intake summaries, residency required in-region." },
      { type: "paragraph", text: "s2 — API key stored in the container image's ENV, rotated quarterly via the vault." },
      { type: "paragraph", text: "s3 — Application logs capture full prompts and completions, retained 13 months 'for debugging'." },
      { type: "paragraph", text: "s4 — Model version pinned; upgrades go through staging with an evaluation suite before prod." },
      { type: "paragraph", text: "s5 — Prompt templates edited directly in production by operators; no version history." },
      { type: "paragraph", text: "s6 — Egress rules restrict the workload to the inference endpoint and the internal document store." },
      { type: "paragraph", text: "s7 — Rate budget set at average load; no alerting when the context window fills — long documents are silently truncated." },
      { type: "paragraph", text: "s8 — Rollback: previous model version and prompt set retained, restore runbook tested monthly." },
    ],
    spots: [
      { id: "s1", label: "s1 — global default region inference" },
      { id: "s2", label: "s2 — API key in container ENV" },
      { id: "s3", label: "s3 — full prompts logged, 13-month retention" },
      { id: "s4", label: "s4 — pinned model, staged upgrades" },
      { id: "s5", label: "s5 — prompts edited live in prod" },
      { id: "s6", label: "s6 — restrictive egress" },
      { id: "s7", label: "s7 — silent context truncation under load" },
      { id: "s8", label: "s8 — tested rollback path" },
    ],
    categories: [
      { id: "residency", label: "Residency — inference reaching a region the data profile forbids" },
      { id: "credential", label: "Credential handling — secret in the wrong place" },
      { id: "logging", label: "Logging — capturing material that must not be retained" },
      { id: "reversibility", label: "Reversibility — no rollback path for prompt/model changes" },
      { id: "capacity", label: "Capacity — budget that fails silently under load" },
    ],
    key: {
      s1: { defective: true, category: "residency" },
      s2: { defective: true, category: "credential" },
      s3: { defective: true, category: "logging" },
      s4: { defective: false },
      s5: { defective: true, category: "reversibility" },
      s6: { defective: false },
      s7: { defective: true, category: "capacity" },
      s8: { defective: false },
    },
  },
};

export const aipab401: AipabSection = {
  courseCode: "401",
  mcBank: [
    { id: "a401-1", question: "The Rung 4 gate fails in two directions. They are:", options: ["Too fast and too slow", "Failing toward control (hovering — the agent saves no time) and failing toward abdication (skim, then click)", "Under- and over-prompting", "Under- and over-spending"], answer: 1 },
    { id: "a401-2", question: "The approval gate belongs where:", options: ["Every action", "Actions become hard to reverse", "The agent asks for it", "Cost is highest"], answer: 1 },
    { id: "a401-3", question: "Indirect injection outranks sci-fi rebellion as the realistic agent failure mode because:", options: ["Agents are evil", "The agent reads dozens of pages with no human watching — the per-action tripwire is gone", "Models are getting worse", "Rebellion is common"], answer: 1 },
    { id: "a401-4", question: "The fix for a disappointing agent draft is usually:", options: ["Watch it more closely", "Write the handoff better — fix the template, not the answer, one altitude up", "A bigger model", "Remove the gate"], answer: 1 },
    { id: "a401-5", question: "Memory vs. context, exactly:", options: ["Memory within a window; context across windows", "Memory across windows; context within one", "Synonyms", "Memory is a bigger context"], answer: 1 },
    { id: "a401-6", question: "An unneeded permission on an agent is:", options: ["A reserve for later", "A configuration error even before anything goes wrong", "Required for flexibility", "Free"], answer: 1 },
    { id: "a401-7", question: "Why does the gate never come off a reliable agent?", options: ["Policy inertia", "Reliability reduces the frequency of a bad draft, not the cost of the one that ships unsupervised", "Agents degrade", "Vendors require it"], answer: 1 },
    { id: "a401-8", question: "Reviewing as a reviewer includes:", options: ["Approving quickly to save time", "Spot-checking citations and noticing out-of-character or injection-shaped anomalies", "Reading every word of every run always", "Trusting streaks"], answer: 1 },
  ],
  practical: {
    kind: "disposition",
    id: "a401-practical",
    title: "The review — parallel form",
    instructions:
      "A research-digest agent ran five times this week under a fixed handoff (constraints: internal sources plus the approved journal list; output: five-bullet digest to the team channel; anything client-identifying escalates). Dispose of each completed run: approve, or refuse with the reason code. Refusing clean work fails toward control; approving defective work fails toward abdication. Only calibrated review passes.",
    scenarioTitle: "Agent configuration",
    scenario: [
      { type: "paragraph", text: "Agent: weekly research digest. Sources: internal library + approved journal list only. Output: five-bullet digest posted to the team channel. Escalation: any client-identifying content must be handed up, never published." },
    ],
    items: [
      { id: "r1", title: "Run 1 — five bullets, all claims traced to approved journals", body: [{ type: "paragraph", text: "Spot-check: two citations opened, both support their claims. Format correct. Sources all on the approved list." }] },
      { id: "r2", title: "Run 2 — five bullets, one cites a journal article that doesn't contain the claimed figure", body: [{ type: "paragraph", text: "The figure '37% adoption' appears in no cited source; the article discusses a different metric entirely." }] },
      { id: "r3", title: "Run 3 — digest includes a paragraph urging readers to 'confirm your details' via an external link", body: [{ type: "paragraph", text: "The phrasing matches a page the agent retrieved from an unlisted site — instruction-shaped content rode in with the source." }] },
      { id: "r4", title: "Run 4 — five bullets, correct and sourced, but the prose is flat and one bullet is shorter than usual", body: [{ type: "paragraph", text: "All citations hold. Sources approved. Merely unimpressive." }] },
      { id: "r5", title: "Run 5 — digest names a client pilot program in bullet two", body: [{ type: "paragraph", text: "Client-identifying content was published to the channel instead of escalated, and the source was an internal memo outside the approved journal list." }] },
    ],
    reasonCodes: [
      { id: "r-cite", label: "Citation does not support the claim" },
      { id: "r-inject", label: "Content traceable to indirect injection" },
      { id: "r-scope", label: "Exceeded stated constraints" },
      { id: "r-escal", label: "Escalation case published instead of handed up" },
    ],
    key: {
      r1: { decision: "approve" },
      r2: { decision: "refuse", reason: "r-cite" },
      r3: { decision: "refuse", reason: "r-inject" },
      r4: { decision: "approve" },
      r5: { decision: "refuse", reason: "r-escal" },
    },
  },
};

export const aipab402: AipabSection = {
  courseCode: "402",
  mcBank: [
    { id: "a402-1", question: "The entire course rests on one assumption:", options: ["Defense can be perfect", "The agent will be compromised — blast radius is the design question", "Filtering solves injection", "Logs prevent attacks"], answer: 1 },
    { id: "a402-2", question: "The single highest-value containment control is:", options: ["Filesystem isolation", "Egress control — what the agent may reach on the network", "CPU limits", "Frequent restarts"], answer: 1 },
    { id: "a402-3", question: "An agent running on a developer's personal credentials is:", options: ["Convenient for attribution", "An identity defect — agents get service accounts with scoped grants, never borrowed human credentials", "Fine in dev", "Safer than a service account"], answer: 1 },
    { id: "a402-4", question: "Marking a genuinely contained asset 'reachable' on the blast-radius exercise is:", options: ["Safe pessimism", "Wrong — not understanding the controls in place; both directions fail against the same key", "Cautious and correct", "Unscored"], answer: 1 },
    { id: "a402-5", question: "Data poisoning is more durable than a single injected page because:", options: ["It is encrypted", "A corrupted retrieval corpus keeps feeding the corruption to every future run", "It spreads by email", "It cannot be detected"], answer: 1 },
    { id: "a402-6", question: "The token-lifecycle drill that matters most:", options: ["Issuance speed", "Revocation under active compromise", "Documentation", "Token length"], answer: 1 },
    { id: "a402-7", question: "Exfiltration through a legitimate channel is the hard detection case because:", options: ["It is invisible", "The traffic looks authorized — detection must reason about content and pattern, not just destination", "Encryption hides everything", "Logs don't record it"], answer: 1 },
    { id: "a402-8", question: "Incident response for an agent, in order:", options: ["Rebuild, resume, review", "Contain, revoke, preserve the record, determine reach", "Notify, delete, forget", "Patch, reboot, monitor"], answer: 1 },
  ],
  practical: {
    kind: "booleanSet",
    id: "a402-practical",
    title: "Blast-radius adjudication — parallel form",
    instructions:
      "Assume this agent is fully compromised by an attacker via injection. It will do whatever the attacker wants, within whatever the configuration permits. For each asset and action below, mark reachable or not reachable. Both errors cost: believing in containment that doesn't exist, and condemning containment that does.",
    display: "yesno",
    yesLabel: "Reachable",
    noLabel: "Contained",
    contextTitle: "Agent configuration",
    context: [
      { type: "paragraph", text: "Agent 'ProcureBot': service account with scoped grants — read the approved supplier catalog; draft (not send) purchase orders in the procurement system. Sandbox: filesystem isolated to a scratch volume; no mounts from the document store. Egress: allowlist of the catalog API and the procurement system only. Tokens: 1-hour expiry, vault-issued, revocable. Logging: full tool-call log with an alert on any egress attempt outside the allowlist. The procurement system's 'submit' endpoint requires a human-held signing key the agent does not possess." },
    ],
    subjects: [
      { id: "b1", label: "Read the entire approved supplier catalog" },
      { id: "b2", label: "Submit a purchase order that executes payment", description: "Would require the human-held signing key." },
      { id: "b3", label: "Exfiltrate the catalog to an attacker-controlled server", description: "Consider the egress allowlist and the alert." },
      { id: "b4", label: "Draft arbitrary purchase orders in the procurement system", description: "Within the scoped grant." },
      { id: "b5", label: "Read files from the corporate document store", description: "Consider the sandbox mounts." },
      { id: "b6", label: "Persist access after token expiry using the stolen token", description: "Consider the token lifecycle." },
      { id: "b7", label: "Corrupt future runs by poisoning the supplier catalog", description: "The agent holds read access to the catalog." },
      { id: "b8", label: "Leave evidence of the compromise in the tool-call log" },
    ],
    key: { b1: true, b2: false, b3: false, b4: true, b5: false, b6: false, b7: false, b8: true },
  },
};
