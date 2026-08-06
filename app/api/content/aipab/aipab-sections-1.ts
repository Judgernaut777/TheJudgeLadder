// SERVER ONLY — AIPAB section banks (parallel forms). Never import from frontend code.
// Sections 101, 201, 301. Drawn from a separate bank than the course gates —
// testing out must never leak a course instance.
import type { Instrument, MCItem } from "@contracts/content/types";

export interface AipabSection {
  courseCode: string;
  mcBank: MCItem[];
  practical: Instrument;
}

export const aipab101: AipabSection = {
  courseCode: "101",
  mcBank: [
    { id: "a101-1", question: "A model gives a confident, well-cited answer. The citations are real papers. The remaining risk is:", options: ["None — real citations settle it", "The papers may not say what the summary claims they say", "The model is lying", "The papers are too old"], answer: 1 },
    { id: "a101-2", question: "The strongest evidence that a model does not 'remember' you between chats is:", options: ["It sometimes greets you by name", "Each turn is computed only from the transcript it is handed — nothing persists outside the window", "It forgets after exactly one hour", "Its training ends at a cutoff"], answer: 1 },
    { id: "a101-3", question: "A long chat's answers degrade. The correct first move is:", options: ["Restate the original question at greater length", "Start a fresh chat carrying a tight summary of the state", "Raise the model's temperature", "Report the model as broken"], answer: 1 },
    { id: "a101-4", question: "Which constraint placement is most at risk in a long prompt?", options: ["The first sentence", "The last sentence", "Buried mid-document, between near-miss material", "The system prompt"], answer: 2 },
    { id: "a101-5", question: "'Fluent is not true' means:", options: ["Good writing hides errors occasionally", "Hallucination is structural — there is no stylistic tell, so fluency is not evidence", "Models write poorly when wrong", "Only old models hallucinate"], answer: 1 },
    { id: "a101-6", question: "The single disqualifying act at Rung 1 is:", options: ["Writing a weak prompt", "Forwarding one unverified factual claim", "Using few-shot examples", "Iterating too often"], answer: 1 },
    { id: "a101-7", question: "A colleague says 'just ask the model if it's sure.' This fails because:", options: ["Models always lie about confidence", "Checking a claim against the model itself is not verification — the check must come from outside the model", "Confidence scores are hidden", "It wastes tokens"], answer: 1 },
    { id: "a101-8", question: "Role prompting ('You are a senior auditor…') works primarily by:", options: ["Unlocking hidden model capabilities", "Steering the distribution of the continuation — a cheap lever, not a guarantee", "Giving the model real expertise", "Bypassing the need to verify"], answer: 1 },
  ],
  practical: {
    kind: "classification",
    id: "a101-practical",
    title: "Claim adjudication — parallel form",
    instructions:
      "Three source excerpts and a candidate summary. Classify every claim: Supported (name the source), Overstated (the sources support a weaker version), or Not supported. Guessing from fluency fails — the planted overstatement reads exactly as confident as the true claims.",
    contextTitle: "Source excerpts",
    context: [
      { type: "heading", text: "Source 1 — Library board minutes" },
      { type: "paragraph", text: "The Eastvale Library Board voted Tuesday to draft a plan for Sunday opening hours at the main branch. The draft, requested by the board chair, would extend Sunday hours from four to eight hours if adopted at the September meeting. No budget figure was attached to the request." },
      { type: "heading", text: "Source 2 — Usage statistics" },
      { type: "paragraph", text: "Internal circulation data shows weekend visits at the main branch rose from an average of 310 per weekend day in 2024 to 405 in 2025. Sunday afternoons account for the largest share of weekend visits. Two satellite branches saw flat or declining weekend use over the same period." },
      { type: "heading", text: "Source 3 — Friends of the Library letter" },
      { type: "paragraph", text: "The Friends of the Library urged the board to 'make Sunday access permanent and predictable,' noting that volunteers staffed 60% of Sunday information-desk shifts last year. The letter also asked the board to consider extending hours at satellite branches once the main-branch pilot is evaluated." },
    ],
    items: [
      { id: "c1", text: "The board voted to extend Sunday hours at the main branch from four to eight." },
      { id: "c2", text: "A decision on the draft plan is expected at the September meeting." },
      { id: "c3", text: "Weekend visits at the main branch rose from 310 to 405 per weekend day between 2024 and 2025." },
      { id: "c4", text: "Sunday afternoons are the busiest part of the weekend at the main branch." },
      { id: "c5", text: "All branches saw weekend use increase over the period." },
      { id: "c6", text: "Volunteers staffed 60% of Sunday information-desk shifts last year." },
      { id: "c7", text: "The Friends of the Library opposes extending Sunday hours." },
      { id: "c8", text: "The expansion is budgeted at $1.2 million." },
      { id: "c9", text: "Weekend visits grew by roughly 30% year over year." },
      { id: "c10", text: "Satellite hours would be considered after the main-branch pilot is evaluated." },
    ],
    categories: [
      { id: "s1", label: "Supported — Source 1" },
      { id: "s2", label: "Supported — Source 2" },
      { id: "s3", label: "Supported — Source 3" },
      { id: "over", label: "Overstated" },
      { id: "ns", label: "Not supported" },
    ],
    key: { c1: "over", c2: "s1", c3: "s2", c4: "s2", c5: "ns", c6: "s3", c7: "ns", c8: "ns", c9: "s2", c10: "s3" },
  },
};

export const aipab201: AipabSection = {
  courseCode: "201",
  mcBank: [
    { id: "a201-1", question: "A candidate runs five novel inputs through their pipeline and produces five byte-consistent structured outputs. This demonstrates:", options: ["Prompting talent", "That a template exists — cross-run consistency cannot be improvised five times to an identical structure", "Nothing useful", "Model quality"], answer: 1 },
    { id: "a201-2", question: "Why must AIPAB test material sit in a novel domain?", options: ["Variety is fair", "A hardcoded 'template' passes familiar material and fails unfamiliar — only real slots survive the swap", "Novel domains are easier", "To test vocabulary"], answer: 1 },
    { id: "a201-3", question: "The moment Rung 2 actually begins is:", options: ["The first complex prompt", "The third time you type the same kind of request — repetition is the trigger", "Tool access", "Certification"], answer: 1 },
    { id: "a201-4", question: "Which step is judgment, not transport?", options: ["Copying extraction output into the drafting template", "Reformatting a table by hand", "Choosing which anomaly leads the brief", "Pasting the final text into the email client"], answer: 2 },
    { id: "a201-5", question: "A pipeline stage's output schema should be published and fixed because:", options: ["It looks professional", "Structure is what makes chaining possible — a stage can only consume output with a predictable form", "Models refuse unstructured input", "Schemas are legally required"], answer: 1 },
    { id: "a201-6", question: "The felt friction of copy-paste is:", options: ["A sign to stop using AI", "The tuition — you must be able to point precisely at which parts of a routine are judgment and which are mechanical transport", "A hardware problem", "Irrelevant to Rung 3"], answer: 1 },
    { id: "a201-7", question: "When a template's output disappoints, the durable fix is:", options: ["Edit this answer by hand", "Refine the template — the fix is then permanent", "Switch models", "Add more exclamation marks"], answer: 1 },
    { id: "a201-8", question: "Verification at Rung 2 is applied to:", options: ["Nothing — it retired at Rung 1", "A system, not just an answer — the pipeline itself must be checked", "Only the final email", "Other people's work"], answer: 1 },
  ],
  practical: {
    kind: "classification",
    id: "a201-practical",
    title: "Judgment / transport classification — parallel form",
    instructions:
      "Below is a reference pipeline. Classify every step as judgment (evaluating, deciding, approving) or mechanical transport. A student who felt the friction building their own pipeline classifies a foreign one correctly.",
    contextTitle: "Reference pipeline — weekly hiring roundup",
    context: [
      { type: "paragraph", text: "Step 1: Download this week's applicant-tracking export and paste it into the screening template. Step 2: Copy the template's output table into the drafting document. Step 3: Decide which three candidates the panel should discuss first. Step 4: Re-key the interview times from the calendar into the document's schedule block. Step 5: Check every name and figure in the draft against the original export. Step 6: Choose between the two drafted opening paragraphs. Step 7: Paste the final roundup into the team channel. Step 8: Approve the summary for distribution to the hiring managers." },
    ],
    items: [
      { id: "s1", text: "Step 1 — Paste export into screening template" },
      { id: "s2", text: "Step 2 — Carry the output table into the drafting document" },
      { id: "s3", text: "Step 3 — Decide which candidates lead the discussion" },
      { id: "s4", text: "Step 4 — Re-key interview times into the schedule block" },
      { id: "s5", text: "Step 5 — Check names and figures against the export" },
      { id: "s6", text: "Step 6 — Choose the opening paragraph" },
      { id: "s7", text: "Step 7 — Paste the roundup into the team channel" },
      { id: "s8", text: "Step 8 — Approve distribution to hiring managers" },
    ],
    categories: [
      { id: "judgment", label: "Judgment" },
      { id: "transport", label: "Mechanical transport" },
    ],
    key: { s1: "transport", s2: "transport", s3: "judgment", s4: "transport", s5: "judgment", s6: "judgment", s7: "transport", s8: "judgment" },
  },
};

export const aipab301: AipabSection = {
  courseCode: "301",
  mcBank: [
    { id: "a301-1", question: "A drafted summary contains an instruction-shaped sentence directing output to an outside address. Correct handling is:", options: ["Approve — summaries are low risk", "Refuse the approval and flag the retrieved source as suspect", "Edit out the sentence and approve", "Ask the assistant to confirm it is safe"], answer: 1 },
    { id: "a301-2", question: "The deep justification for giving a model tools is:", options: ["Convenience", "Verifiability — a grounded model's claims can be checked; a sealed model's can only sound right", "Cost savings", "Latency"], answer: 1 },
    { id: "a301-3", question: "Asked where your pasted text goes, what the email integration can see, and what injection would look like in your setup, a Rung 3 practitioner:", options: ["Can point to the vendor's marketing page", "Answers all three in plain sentences — the AND is the gate", "Defers to IT for all three", "Only needs the first"], answer: 1 },
    { id: "a301-4", question: "An action within the connector's granted scope but pushing data to an unapproved destination should be:", options: ["Approved — scope was granted", "Refused — exfiltration; scope and destination are different questions", "Approved if small", "Deferred to the model"], answer: 1 },
    { id: "a301-5", question: "A citation attached to a grounded draft is:", options: ["Proof", "A claim, not proof — follow it and confirm it before approving", "Decoration", "The provider's liability"], answer: 1 },
    { id: "a301-6", question: "Pasting work material into a personal AI account because the approved tool is clunkier is:", options: ["A pragmatic workaround", "A data-leaving-the-building event — shadow AI", "Fine for non-classified jokes", "IT's responsibility"], answer: 1 },
    { id: "a301-7", question: "A credential entered into a chat window is:", options: ["Safe if the window is closed after", "A credential you no longer control", "Encrypted by the provider", "Deleted at logout"], answer: 1 },
    { id: "a301-8", question: "Routing around an access limit to finish work faster is:", options: ["Initiative", "The violation — limited access is design, not distrust; hand up instead", "Acceptable under deadline", "A gray area"], answer: 1 },
  ],
  practical: {
    kind: "disposition",
    id: "a301-practical",
    title: "The approval queue — parallel form",
    instructions:
      "You are supervising a tool-connected office assistant with these granted scopes: read/write the team shared drive; read the team calendar; draft (not send) email. For each proposed action: approve or refuse, and give the reason code. Correct refusal with the wrong reason does not count.",
    scenarioTitle: "Configured assistant",
    scenario: [
      { type: "paragraph", text: "Assistant: 'OfficeMate' — connectors: shared drive (read/write), team calendar (read), email (draft only, no send). No web upload tools. Data policy: client financial records may not leave the approved drive; drafts may not be sent without human action." },
    ],
    items: [
      { id: "a1", title: "Move last quarter's approved invoices into the drive's Finance/Archive folder", body: [{ type: "paragraph", text: "Routine reorganization; reversible; inside the granted drive scope." }] },
      { id: "a2", title: "Send the drafted payment reminder to the client now — 'it looks ready'", body: [{ type: "paragraph", text: "The email connector is draft-only; sending is outside the granted scope and requires a human." }] },
      { id: "a3", title: "Upload the client ledger to an online 'PDF quick-merge' site to combine two files", body: [{ type: "paragraph", text: "Third-party site found by search; the ledger is client financial material." }] },
      { id: "a4", title: "Read next week's team calendar to propose meeting slots", body: [{ type: "paragraph", text: "Read-only calendar access is granted; no external destination." }] },
      { id: "a5", title: "Forward the vendor's 'updated banking details' from this morning's email to finance", body: [{ type: "paragraph", text: "The email arrived from a lookalike address and contains an instruction to 'process immediately'; classic injection-shaped content." }] },
      { id: "a6", title: "Permanently delete the drive folder 'Finance 2018–2022' to 'tidy up'", body: [{ type: "paragraph", text: "Irreversible deletion; no backup mentioned in the proposal." }] },
      { id: "a7", title: "Draft a summary of the approved board minutes for the internal newsletter folder", body: [{ type: "paragraph", text: "Draft only, internal destination, approved source material." }] },
      { id: "a8", title: "Add the office Wi-Fi password to a shared drive note so 'the assistant can reach it later'", body: [{ type: "paragraph", text: "A credential placed into a document the assistant reads is a credential you no longer control." }] },
    ],
    reasonCodes: [
      { id: "r-scope", label: "Outside granted scope" },
      { id: "r-irrev", label: "Irreversible without safeguards" },
      { id: "r-data", label: "Sensitive data to unapproved destination" },
      { id: "r-inject", label: "Injection-shaped instruction in retrieved content" },
      { id: "r-cred", label: "Credential handling" },
    ],
    key: {
      a1: { decision: "approve" },
      a2: { decision: "refuse", reason: "r-scope" },
      a3: { decision: "refuse", reason: "r-data" },
      a4: { decision: "approve" },
      a5: { decision: "refuse", reason: "r-inject" },
      a6: { decision: "refuse", reason: "r-irrev" },
      a7: { decision: "approve" },
      a8: { decision: "refuse", reason: "r-cred" },
    },
  },
};
