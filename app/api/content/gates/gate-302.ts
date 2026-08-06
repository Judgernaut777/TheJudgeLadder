// SERVER ONLY — contains answer keys. Never import from frontend code.
import type { CourseGate } from "./gate-101-201";

export const gate302: CourseGate = {
  mcBank: [
    { id: "302-mc-1", question: "Rung 3+ exists because:", options: ["Rung 3 was too easy", "Knowing how to use tools is different from knowing whether the tools you are given are safe to use", "Vendors required it", "It is a legal prerequisite"], answer: 1 },
    { id: "302-mc-2", question: "Shadow AI is:", options: ["A malicious model", "AI use outside the approved stack — usually well-intentioned, always invisible to governance", "A deprecated tool", "AI used at night"], answer: 1 },
    { id: "302-mc-3", question: "The correct response to discovering shadow AI on your team is:", options: ["Discipline the user immediately", "Find out what need the approved stack failed to meet, then route the work to an approved tool or fix the gap", "Ignore it if results are good", "Ban all AI use for a month"], answer: 1 },
    { id: "302-mc-4", question: "The four hosting tiers, ordered by the control they give you, are:", options: ["Consumer SaaS, enterprise SaaS, private/VPC, self-hosted", "Self-hosted, consumer SaaS, VPC, enterprise SaaS", "Enterprise SaaS, consumer SaaS, self-hosted, VPC", "VPC, self-hosted, enterprise SaaS, consumer SaaS"], answer: 0 },
    { id: "302-mc-5", question: "Moving up the hosting tiers trades:", options: ["Cost for speed", "Convenience for control — and operational burden comes with the control", "Quality for price", "Features for support"], answer: 1 },
    { id: "302-mc-6", question: "A data processing agreement (DPA) primarily settles:", options: ["The price", "What the vendor may do with your data — retention, training, jurisdiction, subprocessors", "Uptime guarantees", "Feature roadmaps"], answer: 1 },
    { id: "302-mc-7", question: "'Known stack' in the 3+ gate means:", options: ["Every AI tool in existence", "The specific approved stack you operate — its data paths, tiers, and failure modes, documented", "The tools you personally like", "The vendor's marketing site"], answer: 1 },
    { id: "302-mc-8", question: "A shared team login for an AI tool is defective because:", options: ["It violates the password policy only", "Actions can no longer be attributed to a person — accountability evaporates", "It is slower", "Vendors dislike it"], answer: 1 },
    { id: "302-mc-9", question: "The first question when a new AI tool request lands is:", options: ["How much does it cost?", "What data will it touch, and which tier of hosting does that data class require?", "Does it have a mobile app?", "Who else uses it?"], answer: 1 },
    { id: "302-mc-10", question: "When the approved tool goes down, the safe pattern is:", options: ["Route work through personal tools temporarily", "A documented fallback — approved alternatives or a pause — never improvised routing around governance", "Work offline until it recovers", "Ask the vendor for a refund"], answer: 1 },
    { id: "302-mc-11", question: "A stack register records:", options: ["Vendor logos", "Which tools are approved, for which data classes, at which tier, and who owns the decision", "License costs only", "The IT department's org chart"], answer: 1 },
    { id: "302-mc-12", question: "Self-hosting is justified when:", options: ["It is fashionable", "The data class or regulation demands control no vendor tier offers — and you can carry the operational burden", "It is always the safest default", "The team is large"], answer: 1 },
    { id: "302-mc-13", question: "An AI incident on your stack should be handled as:", options: ["A secret to protect the program", "A recorded event — what happened, what data was involved, what changes — feeding the stack register", "The vendor's problem", "A reason to ban AI"], answer: 1 },
    { id: "302-mc-14", question: "Consumer-tier accounts under a work email address are:", options: ["Fine if the work is small", "Still consumer tier — the data handling follows the plan, not the email domain", "Enterprise tier automatically", "Prohibited by law"], answer: 1 },
    { id: "302-mc-15", question: "The 3+ gate certifies you can:", options: ["Migrate any stack to self-hosting", "Operate a known AI stack safely — and recognize when a described setup is not safe", "Negotiate vendor contracts", "Approve any tool quickly"], answer: 1 },
  ],
  practicals: [
    {
      kind: "defectHunt",
      id: "302-gate-practical-a",
      title: "Stack diagnosis",
      instructions:
        "A product team describes how it uses AI. Ten spots are marked. For each: is it defective? If defective, name the defect class. Clean spots must be marked clean — over-flagging fails this gate as surely as missing a real defect.",
      artifactTitle: "How Team Kestrel uses AI",
      artifact: [
        { type: "paragraph", text: "[s1] The designers paste client mockups into a personal-account chatbot when the approved tool feels slow. [s2] All client documents live in the enterprise workspace, which under the signed DPA are never used for training. [s3] The pod shares one login for the transcription tool — it is passed around as needed. [s4] The support summarizer's vendor processes data in-region under a DPA reviewed by legal last quarter. [s5] Meeting recordings with customer names go to a free online summarizer a PM found. [s6] API keys for the internal prototype live in the team password manager and rotate quarterly. [s7] The intern exports the CRM to CSV and uploads it to an unvetted plugin to clean the data. [s8] When the approved tool is down, people route work through whatever personal tools they have. [s9] The team keeps a one-page register of which tools are approved for which data classes. [s10] The legal team's contract summarizer runs in the VPC deployment security approved." },
      ],
      spots: [
        { id: "s1", label: "s1 — mockups into personal chatbot" },
        { id: "s2", label: "s2 — enterprise workspace + DPA" },
        { id: "s3", label: "s3 — shared transcription login" },
        { id: "s4", label: "s4 — in-region vendor under DPA" },
        { id: "s5", label: "s5 — recordings to free summarizer" },
        { id: "s6", label: "s6 — keys in password manager, rotated" },
        { id: "s7", label: "s7 — CRM export to unvetted plugin" },
        { id: "s8", label: "s8 — personal tools during outages" },
        { id: "s9", label: "s9 — one-page approval register" },
        { id: "s10", label: "s10 — contract summarizer in approved VPC" },
      ],
      categories: [
        { id: "shadow", label: "Shadow AI — use outside the approved stack" },
        { id: "access", label: "Access control — unattributable or unmanaged access" },
        { id: "data", label: "Data handling — sensitive data to an unapproved destination" },
      ],
      key: {
        s1: { defective: true, category: "shadow" },
        s2: { defective: false },
        s3: { defective: true, category: "access" },
        s4: { defective: false },
        s5: { defective: true, category: "data" },
        s6: { defective: false },
        s7: { defective: true, category: "data" },
        s8: { defective: true, category: "shadow" },
        s9: { defective: false },
        s10: { defective: false },
      },
    },
    {
      kind: "classification",
      id: "302-gate-practical-b",
      title: "Hosting adjudication",
      instructions:
        "For each workload, choose the minimum hosting tier that fits the data class. The stack policy: public/internal data may use consumer SaaS; business-confidential data requires enterprise SaaS or higher; client-regulated data requires private/VPC or higher; data under statutory residency and audit requirements requires self-hosted.",
      items: [
        { id: "h1", text: "Drafting social posts from public product announcements" },
        { id: "h2", text: "Summarizing internal strategy offsite notes" },
        { id: "h3", text: "Screening patient intake forms for a clinic client" },
        { id: "h4", text: "Triaging support tickets containing customer account details under a financial-services contract" },
        { id: "h5", text: "Brainstorming names for a new internal tool" },
        { id: "h6", text: "Processing defense-contract documents subject to statutory residency and audit requirements" },
        { id: "h7", text: "Translating confidential board minutes" },
        { id: "h8", text: "Classifying hospital records where the regulator requires dedicated infrastructure with audited isolation" },
      ],
      categories: [
        { id: "consumer", label: "Consumer SaaS is acceptable" },
        { id: "enterprise", label: "Enterprise SaaS minimum" },
        { id: "vpc", label: "Private / VPC minimum" },
        { id: "self", label: "Self-hosted required" },
      ],
      key: { h1: "consumer", h2: "enterprise", h3: "vpc", h4: "vpc", h5: "consumer", h6: "self", h7: "enterprise", h8: "self" },
    },
  ],
};
