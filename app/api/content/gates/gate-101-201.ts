// SERVER ONLY — contains answer keys. Never import from frontend code.
import type { Instrument, MCItem } from "@contracts/content/types";

export interface CourseGate {
  mcBank: MCItem[];
  practicals: Instrument[];
}

export const gate101: CourseGate = {
  mcBank: [
    { id: "101-mc-1", question: "A chat model contradicts, late in a long conversation, a constraint you set at the start. The most accurate diagnosis is:", options: ["It forgot your constraint, so remind it firmly", "Your constraint fell out of or is buried in the context it was handed this turn", "The model is malfunctioning and should be reported", "Its temperature drifted upward over the session"], answer: 1, explanation: "Stateless model: it never 'had' the constraint except as transcript. Fix the desk, not the model." },
    { id: "101-mc-2", question: "'The desk' in this course refers to:", options: ["The model's long-term memory", "The context window — everything the model sees for a turn", "The system prompt only", "The provider's servers"], answer: 1 },
    { id: "101-mc-3", question: "Which is the correct fix when a long chat starts producing degraded answers?", options: ["Repeat the question more forcefully", "Add the full original documents again at the end", "Summarize the state into a tight brief and start a fresh chat", "Ask the model to try harder"], answer: 2 },
    { id: "101-mc-4", question: "A token is approximately:", options: ["One word", "Three-quarters of a word", "One sentence", "One character"], answer: 1 },
    { id: "101-mc-5", question: "Hallucination is best described as:", options: ["A rare bug in specific model versions", "The model lying deliberately", "Structural — fluent output produced whether or not the underlying claim is true", "A problem only with old models"], answer: 2 },
    { id: "101-mc-6", question: "The stylistic tell that a passage is hallucinated is:", options: ["Overly formal language", "Hedging phrases", "Long sentences", "There is no reliable stylistic tell"], answer: 3 },
    { id: "101-mc-7", question: "The four ingredients of context-rich prompting are:", options: ["Role, tone, length, keywords", "Background, audience, format, constraints", "Flattery, threats, examples, repetition", "Question, answer, review, submit"], answer: 1 },
    { id: "101-mc-8", question: "Few-shot prompting means:", options: ["Asking fewer questions", "Providing one or more example input-output pairs for the model to continue", "Using the model a few times per day", "Keeping prompts under five sentences"], answer: 1 },
    { id: "101-mc-9", question: "Order of operations when output disappoints:", options: ["Role → examples → format → context", "Context → format → examples → role", "Temperature → role → context → format", "Model choice → context → role → format"], answer: 1 },
    { id: "101-mc-10", question: "Iteration should stop when:", options: ["The output is perfect", "Two consecutive adjustments changed prose but not substance, or the output meets the stated need", "You have done exactly three rounds", "The model says it is confident"], answer: 1 },
    { id: "101-mc-11", question: "Context rot refers to:", options: ["Models degrading over months of use", "Quality decaying as the desk fills — attention thinning and near-miss material poisoning output", "Old chats being deleted", "The model's training data aging"], answer: 1 },
    { id: "101-mc-12", question: "Where should your most important constraint sit in a long prompt?", options: ["In the middle, where it has company", "At the beginning or the end, never buried mid-desk", "Anywhere — position does not matter", "In a separate chat"], answer: 1 },
    { id: "101-mc-13", question: "Verification, as this course defines it, means:", options: ["Asking the model to double-check its answer", "Re-reading the output carefully", "Checking the claim against a source outside the model that could prove it wrong", "Getting a colleague to read it"], answer: 2 },
    { id: "101-mc-14", question: "The commonest real-world verification miss is:", options: ["The outright fabrication", "The overstatement — source says 'proposed', summary says 'launched'", "The typo", "The formatting error"], answer: 1 },
    { id: "101-mc-15", question: "The Rung 1 gate certifies:", options: ["Prompting skill", "That you instinctively verify factual output", "Knowledge of AI history", "Speed of prompting"], answer: 1 },
    { id: "101-mc-16", question: "A sealed-box model cannot:", options: ["Generate fluent prose", "Check its own claims against the outside world", "Follow format instructions", "Summarize pasted text"], answer: 1 },
  ],
  practicals: [
    {
      kind: "classification",
      id: "101-gate-practical",
      title: "Claim adjudication",
      instructions:
        "Below are three source excerpts and a candidate summary of them. Classify every claim: Supported (name the source), Overstated (the sources support a weaker version), or Not supported. The classifications cannot be produced without going to the sources.",
      contextTitle: "Source excerpts",
      context: [
        { type: "heading", text: "Source 1 — Council announcement" },
        { type: "paragraph", text: "The Meridian City Council on Monday unveiled a proposed expansion of the harbour district tram line. The plan would extend the line 6.4 kilometres to the ferry terminal, with construction targeted to begin in 2027 pending a funding vote in November. Estimated cost: $48 million." },
        { type: "heading", text: "Source 2 — Ridership report" },
        { type: "paragraph", text: "The transit authority's annual report shows tram ridership reached 2.1 million trips last year, up from 1.9 million the year before. The report notes that ridership on the harbour line specifically grew 22% after weekend service was added." },
        { type: "heading", text: "Source 3 — Business association statement" },
        { type: "paragraph", text: "The Harbour Business Association welcomed the proposal, saying improved transit access 'could bring thousands of additional visitors to the district each year.' The association had previously opposed the tram's weekend service expansion, citing construction disruption." },
      ],
      items: [
        { id: "c1", text: "The council approved a 6.4 km tram extension to the ferry terminal." },
        { id: "c2", text: "The extension's estimated cost is $48 million." },
        { id: "c3", text: "Construction is targeted to begin in 2027." },
        { id: "c4", text: "Tram ridership reached 2.1 million trips last year." },
        { id: "c5", text: "Harbour line ridership grew 22% after weekend service was added." },
        { id: "c6", text: "The Business Association has consistently supported the tram's expansion." },
        { id: "c7", text: "The association believes the extension could bring thousands of additional visitors per year." },
        { id: "c8", text: "The funding vote will take place in November." },
        { id: "c9", text: "Ridership grew by 400,000 trips year over year." },
        { id: "c10", text: "The ferry terminal is the busiest stop on the current line." },
      ],
      categories: [
        { id: "s1", label: "Supported — Source 1" },
        { id: "s2", label: "Supported — Source 2" },
        { id: "s3", label: "Supported — Source 3" },
        { id: "over", label: "Overstated" },
        { id: "ns", label: "Not supported" },
      ],
      key: { c1: "over", c2: "s1", c3: "s1", c4: "s2", c5: "s2", c6: "ns", c7: "s3", c8: "s1", c9: "over", c10: "ns" },
    },
  ],
};

export const gate201: CourseGate = {
  mcBank: [
    { id: "201-mc-1", question: "Rung 2 begins:", options: ["When you get access to tools", "The third time you type the same kind of request", "After a year of practice", "When you learn to code"], answer: 1 },
    { id: "201-mc-2", question: "The test of a well-formed pipeline stage is:", options: ["It uses the most advanced model", "One input, one output, and one way to tell it went wrong", "It handles at least three kinds of task", "It runs without any human attention"], answer: 1 },
    { id: "201-mc-3", question: "Why do small single-purpose prompts beat one mega-prompt?", options: ["They are cheaper per token", "They isolate failure — a mega-prompt fails sprawling and cannot be fixed precisely", "They read more professionally", "They avoid rate limits"], answer: 1 },
    { id: "201-mc-4", question: "A template is:", options: ["A saved answer you resend", "A saved prompt with slots — fixed scaffolding plus gaps for this-time material", "A list of magic keywords", "A system prompt you cannot edit"], answer: 1 },
    { id: "201-mc-5", question: "When output disappoints, the Rung 2 move is to fix:", options: ["The answer, by hand", "The template, so the fix is permanent", "The model's temperature", "The reader's expectations"], answer: 1 },
    { id: "201-mc-6", question: "A hardcoded 'template' fails the novel-domain test because:", options: ["Novel domains use different models", "Last task's subject matter baked into the prompt passes familiar material and fails unfamiliar — proving no real slots exist", "The schema changes", "Hardcoded templates are against policy"], answer: 1 },
    { id: "201-mc-7", question: "Structured output matters primarily because:", options: ["It looks tidy", "A stage can only consume the previous stage's output if that output has a predictable form", "Models prefer it", "It uses fewer tokens"], answer: 1 },
    { id: "201-mc-8", question: "A mandated output schema is also:", options: ["A legal contract", "A verification lever — missing or misordered fields make failure visible at a glance", "A security feature", "Optional decoration"], answer: 1 },
    { id: "201-mc-9", question: "Context engineering is:", options: ["A marketing term for prompting", "The discipline of deciding what the model wakes up to — templates are its artifacts", "Engineering the model's internals", "A job title only"], answer: 1 },
    { id: "201-mc-10", question: "In the framework's worked example, the weekly routine contained:", options: ["Seven judgments and two transfers", "Roughly two minutes of judgment against seven manual transfers containing no decision", "Equal judgment and transport", "No judgment at all"], answer: 1 },
    { id: "201-mc-11", question: "Mechanical transport is:", options: ["Evaluating the draft", "Copying, pasting, reformatting — moments where you are a cable", "Deciding what leads the brief", "Approving the final send"], answer: 1 },
    { id: "201-mc-12", question: "'You are the wiring' means:", options: ["You are the most important component", "You are the connective tissue carrying outputs between stages by hand", "You control the power supply", "You own the templates"], answer: 1 },
    { id: "201-mc-13", question: "The second half of the Rung 2 gate is unusual because it tests:", options: ["A speed metric", "A felt state — that you can point precisely at which parts of a routine are judgment and which are transport", "Your typing accuracy", "Memorized vocabulary"], answer: 1 },
    { id: "201-mc-14", question: "Rung 3's tools exist to delete which pile?", options: ["The judgment pile", "The transport pile", "Both piles", "Neither pile"], answer: 1 },
    { id: "201-mc-15", question: "As transport is automated, the judgment pile:", options: ["Shrinks to zero", "Relocates and intensifies — someone still evaluates, decides, approves, now at machine speed", "Becomes irrelevant", "Transfers to the vendor"], answer: 1 },
  ],
  practicals: [
    {
      kind: "tableFill",
      id: "201-gate-practical-a",
      title: "Structured extraction — five inputs",
      timeHintMinutes: 25,
      instructions:
        "You are the extraction stage. The Fernwood Community Garden co-op routes every inbound message through a mandated intake record before anything is acted on. For each of the five messages below, complete its record: Ref tag — copy the message's Ref code exactly (e.g. ABC-12). Kind — the single category the message concerns. Reply expectation — 'Confirmation requested' when the message explicitly asks for a reply, answer, or confirmation; 'FYI — no reply expected' when it is purely informational. Respond/act by — the deadline the message sets for a response or action, written YYYY-MM-DD; write 'none' if it sets none (an event's own date is not a deadline unless action is required by it). Every cell must be filled — an empty cell fails schema conformance.",
      contextTitle: "Inbound messages — Fernwood Community Garden co-op",
      context: [
        { type: "paragraph", text: "Message 1 — Ref: DUE-31. From Priya, Treasurer: \"The annual plot dues invoices go out Monday 2026-04-13. One member has emailed to ask whether the $60 fee can be split into two payments. Could you confirm the policy so I can reply to them by Friday 2026-04-10?\"" },
        { type: "paragraph", text: "Message 2 — Ref: TLS-07. From Marcus, Tool steward: \"The shared wheelbarrow's axle has snapped again and it is unsafe to use. I've tagged it OUT OF SERVICE and left it by the tool shed. No rush on replacement — just noting it for the spring order.\"" },
        { type: "paragraph", text: "Message 3 — Ref: WTR-12. From the Coordinator: \"Reminder: the irrigation timer on beds 9–14 will be reprogrammed on 2026-04-15. Please move any hose splitters you have attached before then. No reply needed.\"" },
        { type: "paragraph", text: "Message 4 — Ref: EVT-04. From the Events committee: \"The spring workday is set for Saturday 2026-04-18, 9:00–12:00. Please confirm by 2026-04-12 whether your plot can send one helper, and whether we will need the extra wheelbarrow from the depot.\"" },
        { type: "paragraph", text: "Message 5 — Ref: PLT-19. From the Membership secretary: \"A member on the waitlist, J. Okafor, asks whether plot 27 (vacant since March) can be assigned before the workday so they can take part. They would like an answer by 2026-04-11.\"" },
      ],
      columns: [
        { id: "ref", label: "Ref tag (copy exactly)", freeText: true },
        { id: "kind", label: "Kind", options: ["Finance", "Tools", "Water", "Event", "Plot"] },
        { id: "need", label: "Reply expectation", options: ["Confirmation requested", "FYI — no reply expected"] },
        { id: "due", label: "Respond/act by (YYYY-MM-DD or 'none')", freeText: true },
      ],
      rows: [
        { id: "r1", label: "Message 1" },
        { id: "r2", label: "Message 2" },
        { id: "r3", label: "Message 3" },
        { id: "r4", label: "Message 4" },
        { id: "r5", label: "Message 5" },
      ],
      key: {
        r1: { ref: "DUE-31", kind: "Finance", need: "Confirmation requested", due: "2026-04-10" },
        r2: { ref: "TLS-07", kind: "Tools", need: "FYI — no reply expected", due: "none" },
        r3: { ref: "WTR-12", kind: "Water", need: "FYI — no reply expected", due: "2026-04-15" },
        r4: { ref: "EVT-04", kind: "Event", need: "Confirmation requested", due: "2026-04-12" },
        r5: { ref: "PLT-19", kind: "Plot", need: "Confirmation requested", due: "2026-04-11" },
      },
    },
    {
      kind: "classification",
      id: "201-gate-practical",
      title: "Judgment / transport classification",
      instructions:
        "Below is a reference pipeline. Classify every step as judgment (evaluating, deciding, approving) or mechanical transport.",
      contextTitle: "Reference pipeline — monthly expense digest",
      context: [
        { type: "paragraph", text: "Step 1: Open last month's digest and copy its section headers into a new document. Step 2: Paste this month's three expense exports into the extraction template. Step 3: From the extraction, decide which two anomalies deserve the director's attention. Step 4: Copy the extraction output into the drafting template. Step 5: Verify every figure in the draft against the original exports. Step 6: Manually reformat the draft's table to match the department template. Step 7: Choose which of two drafted subject lines fits the month's content. Step 8: Paste the final digest into the email client. Step 9: Approve and send to the distribution list." },
      ],
      items: [
        { id: "s1", text: "Step 1 — Copy last month's headers" },
        { id: "s2", text: "Step 2 — Paste exports into template" },
        { id: "s3", text: "Step 3 — Decide which anomalies lead" },
        { id: "s4", text: "Step 4 — Carry output to drafting template" },
        { id: "s5", text: "Step 5 — Verify figures against exports" },
        { id: "s6", text: "Step 6 — Reformat the table by hand" },
        { id: "s7", text: "Step 7 — Choose the subject line" },
        { id: "s8", text: "Step 8 — Paste digest into email client" },
        { id: "s9", text: "Step 9 — Approve and send" },
      ],
      categories: [
        { id: "judgment", label: "Judgment" },
        { id: "transport", label: "Mechanical transport" },
      ],
      key: { s1: "transport", s2: "transport", s3: "judgment", s4: "transport", s5: "judgment", s6: "transport", s7: "judgment", s8: "transport", s9: "judgment" },
    },
  ],
};
