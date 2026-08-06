// SERVER ONLY — contains answer keys. Never import from frontend code.
import type { CourseGate } from "./gate-101-201";

export const gate301: CourseGate = {
  mcBank: [
    { id: "301-mc-1", question: "A tool differs from a chat model because a tool can:", options: ["Produce longer answers", "Act on the world — send, delete, book, move money — not merely produce text", "Remember previous sessions", "Run without a prompt"], answer: 1 },
    { id: "301-mc-2", question: "The defining question before granting a tool any access is:", options: ["Is the vendor reputable?", "What can it touch, and what is the worst it can do there?", "How much does it cost?", "Does the team like the interface?"], answer: 1 },
    { id: "301-mc-3", question: "A deep research tool returns an answer with twelve citations. The citations are:", options: ["Proof the answer is correct", "Pointers to check — a citation is a claim about a source, not evidence", "Decoration added by the interface", "Guaranteed to be real pages"], answer: 1 },
    { id: "301-mc-4", question: "Multimodal input (images, audio, video) changes:", options: ["The model's reliability", "What can be put on the desk — not how much you can trust what comes off it", "The need for verification (it removes it)", "Only the price"], answer: 1 },
    { id: "301-mc-5", question: "The three questions of 'where does the data go' are:", options: ["Who, what, when", "Who can see it; is it retained or trained on; under what terms and jurisdiction", "How fast, how big, how often", "Which model, which region, which plan"], answer: 1 },
    { id: "301-mc-6", question: "The enterprise tier of the same tool matters mainly because:", options: ["It is faster", "The default data handling differs — consumer tiers may retain or train on inputs", "It has a better interface", "It uses a different model"], answer: 1 },
    { id: "301-mc-7", question: "Approval queues exist because:", options: ["Legal requires paperwork", "Tool actions can be irreversible — judgment must sit between the proposal and the execution", "Tools are too slow otherwise", "It is a compliance formality with no operational effect"], answer: 1 },
    { id: "301-mc-8", question: "Approval discipline fails in two directions. They are:", options: ["Too fast and too slow", "Rubber-stamping everything, and refusing everything — both abolish the judgment the queue exists to hold", "Approving internally and refusing externally", "Approving big actions and refusing small ones"], answer: 1 },
    { id: "301-mc-9", question: "Refusing every proposed action fails because:", options: ["Vendors object", "Work migrates to shadow tools and the approved channel loses all value — discipline is selective, not blanket", "The queue overflows", "It is technically impossible"], answer: 1 },
    { id: "301-mc-10", question: "Reason codes on refusals exist so that:", options: ["The tool learns manners", "The refusal is auditable and the proposer can fix the defect and resubmit", "Statistics look better", "Approvals can be automated later"], answer: 1 },
    { id: "301-mc-11", question: "Least privilege means:", options: ["Giving the tool the smallest access the task actually requires", "Paying for the cheapest tier", "Restricting tools to senior staff", "Using one tool at a time"], answer: 0 },
    { id: "301-mc-12", question: "An approval decision should rest on:", options: ["How confidently the tool phrases its proposal", "What the action will do and where its outputs go", "How busy the approver is", "Whether the tool has been right before"], answer: 1 },
    { id: "301-mc-13", question: "The point of a data-flow map is:", options: ["A deliverable for auditors only", "You cannot judge a proposed action without knowing what data it moves and to whom", "It speeds up the tools", "It replaces vendor due diligence"], answer: 1 },
    { id: "301-mc-14", question: "Vendor data terms change over time. The safe posture is:", options: ["Assume the original terms hold", "Treat the data-flow map as living — re-check it periodically", "Stop using the tool", "Only check after an incident"], answer: 1 },
    { id: "301-mc-15", question: "The Rung 3 gate certifies that you can:", options: ["Configure any tool unaided", "Direct tools with your eyes open — knowing what they touch and approving selectively", "Write vendor contracts", "Train others on the interface"], answer: 1 },
  ],
  practicals: [
    {
      kind: "disposition",
      id: "301-gate-practical-a",
      title: "The approval queue",
      instructions:
        "You are the approver for a team assistant tool with granted access to: the team email account, the team calendar, the shared drive, and the weekly report folder. It has NO access to payment systems, payroll, or external posting accounts. For each proposed action, approve or refuse. Refusals require the correct reason code.",
      scenarioTitle: "Operating context",
      scenario: [
        { type: "paragraph", text: "The assistant proposes ten actions this morning. Granted scope: team email, team calendar, shared drive, weekly report folder. Anything touching payments, payroll, external accounts, or unvetted third-party services is outside scope. Sensitive client material must not leave approved destinations. Actions carrying unverified factual claims must not be sent." },
      ],
      items: [
        { id: "a1", title: "Archive 400 read newsletters older than 90 days", body: [{ type: "paragraph", text: "Move them to the shared drive's Archive folder. Fully reversible; internal." }] },
        { id: "a2", title: "Delete the shared drive folder 'Archive 2019' to free space", body: [{ type: "paragraph", text: "Permanent deletion. No backup is mentioned in the proposal." }] },
        { id: "a3", title: "Email the draft client contract to an address found on the vendor's website", body: [{ type: "paragraph", text: "The address was scraped from a public page this morning and has not been verified with the client." }] },
        { id: "a4", title: "Post the approved announcement text to the team's internal bulletin", body: [{ type: "paragraph", text: "Text was approved by the communications lead yesterday. Internal destination." }] },
        { id: "a5", title: "Reply-all to the company thread with a summary of the incident, including the suspected cause", body: [{ type: "paragraph", text: "The suspected cause has not been confirmed by the investigation." }] },
        { id: "a6", title: "Book offsite flights, charging the corporate card", body: [{ type: "paragraph", text: "The assistant found a good fare and wants to purchase immediately." }] },
        { id: "a7", title: "Summarize this week's support tickets into the weekly report folder", body: [{ type: "paragraph", text: "Internal summary; reversible; within the report folder scope." }] },
        { id: "a8", title: "Add the new intern to the payroll system", body: [{ type: "paragraph", text: "Start date is Monday; the assistant offers to set everything up." }] },
        { id: "a9", title: "Translate the public marketing one-pager into Spanish for review", body: [{ type: "paragraph", text: "Draft saved to the shared drive for a human to review before any use." }] },
        { id: "a10", title: "Upload the customer list to a free online CSV converter", body: [{ type: "paragraph", text: "The converter is a third-party website the assistant found via search." }] },
      ],
      reasonCodes: [
        { id: "r-scope", label: "Outside granted scope" },
        { id: "r-irrev", label: "Irreversible without safeguards" },
        { id: "r-data", label: "Sensitive data to unapproved destination" },
        { id: "r-unver", label: "Carries unverified factual claims" },
      ],
      key: {
        a1: { decision: "approve" },
        a2: { decision: "refuse", reason: "r-irrev" },
        a3: { decision: "refuse", reason: "r-data" },
        a4: { decision: "approve" },
        a5: { decision: "refuse", reason: "r-unver" },
        a6: { decision: "refuse", reason: "r-scope" },
        a7: { decision: "approve" },
        a8: { decision: "refuse", reason: "r-scope" },
        a9: { decision: "approve" },
        a10: { decision: "refuse", reason: "r-data" },
      },
    },
    {
      kind: "tableFill",
      id: "301-gate-practical-b",
      title: "The data-flow map",
      instructions:
        "Read the vendor's data-handling summary and complete the map: where does each data class go, may it be used for training or product improvement, and is it acceptable for sensitive client material under the team policy (sensitive material requires in-tenant processing and never-training)?",
      contextTitle: "Vendor data-handling summary — Northwind Assistant (enterprise tier)",
      context: [
        { type: "paragraph", text: "Prompts and uploaded files are processed by Northwind's model provider and retained 30 days for abuse prevention. Enterprise content is never used for training. Support tickets may be reviewed by Northwind staff. Usage telemetry (feature clicks, session lengths) is aggregated and may inform product improvement. Documents connected from your drive are indexed within your tenant and are not shared with other customers or used for training." },
      ],
      columns: [
        { id: "dest", label: "Processed by", options: ["Model provider", "Vendor staff", "Aggregated vendor pool", "Stays in your tenant"] },
        { id: "train", label: "Training / product improvement", options: ["May be used", "Never used"] },
        { id: "sens", label: "Acceptable for sensitive client material?", options: ["Yes", "No"] },
      ],
      rows: [
        { id: "r1", label: "Prompts and uploaded files" },
        { id: "r2", label: "Support tickets" },
        { id: "r3", label: "Usage telemetry" },
        { id: "r4", label: "Connected drive documents" },
      ],
      key: {
        r1: { dest: "Model provider", train: "Never used", sens: "No" },
        r2: { dest: "Vendor staff", train: "Never used", sens: "No" },
        r3: { dest: "Aggregated vendor pool", train: "May be used", sens: "No" },
        r4: { dest: "Stays in your tenant", train: "Never used", sens: "Yes" },
      },
    },
  ],
};
