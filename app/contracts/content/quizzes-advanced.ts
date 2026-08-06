// Auto-scored module knowledge checks — courses 401–502.
// Practice-grade: keys ship to the client. Not part of any gate.
import type { MCItem } from "./types";

export const quizzesAdvanced: Record<string, MCItem[]> = {
  // ---------------- AIJL 401 ----------------
  "401-m1": [
    { id: "401-m1-q1", question: "The one-sentence climb to Rung 4 is:", options: ["Approve more actions, faster", "Stop approving each action and start approving the goal", "Stop reviewing output", "Get better tools"], answer: 1 },
    { id: "401-m1-q2", question: "What makes a system an agent here is:", options: ["A smarter model", "New technology", "The same model and tools — with the trigger hand moved: actions fire on its own decision toward a goal you set", "A larger context window"], answer: 2 },
    { id: "401-m1-q3", question: "The agent loop is:", options: ["Ask → answer", "Plan → act → observe, repeated — closing without you inside it", "Train → test → deploy", "Read → write → delete"], answer: 1 },
    { id: "401-m1-q4", question: "If a product takes real-world actions without per-action approval, it is:", options: ["Still Rung 3", "Operating as an agent, whatever the product calls it", "Safe by default", "Rung 2"], answer: 1 },
  ],
  "401-m2": [
    { id: "401-m2-q1", question: "The exact pairing to keep straight is:", options: ["Memory is within one window; context is across windows", "Memory is across windows; context is within one", "They are synonyms", "Memory is faster than context"], answer: 1 },
    { id: "401-m2-q2", question: "Memory exists because:", options: ["Models are curious", "The model is stateless and context rots — storage across runs compensates for both", "Regulations require it", "It is cheaper"], answer: 1 },
    { id: "401-m2-q3", question: "Compaction is:", options: ["Data compression", "The agent continuously condensing its own working history so the desk stays useful", "Deleting old files", "A network optimization"], answer: 1 },
    { id: "401-m2-q4", question: "MCP matters because:", options: ["It is faster", "A standard connector interface makes the tool ecosystem composable rather than one-off", "It is more secure automatically", "It removes the need for review"], answer: 1 },
  ],
  "401-m3": [
    { id: "401-m3-q1", question: "Goal-setting at Rung 4 is:", options: ["Optional paperwork", "This rung's context engineering — a weak handoff forces the agent to guess your judgment; a strong one transfers it", "The vendor's job", "Only needed once"], answer: 1 },
    { id: "401-m3-q2", question: "When a draft disappoints, the fix is rarely:", options: ["Rewrite the handoff", "Tighten the constraints", "Watch the agent more closely", "Adjust the escalation cases"], answer: 2, explanation: "Same move Rung 2 taught: fix the template, not the answer — one altitude up." },
    { id: "401-m3-q3", question: "An unneeded permission on an agent is:", options: ["Harmless until used", "A configuration error even before anything goes wrong — pure attack surface", "Good for flexibility", "Required for most tasks"], answer: 1 },
    { id: "401-m3-q4", question: "The agent operates inside:", options: ["Its own judgment", "A fossilized record of your judgment — every live approval you used to give is now written down", "The vendor's policy", "Random choice"], answer: 1 },
  ],
  "401-m4": [
    { id: "401-m4-q1", question: "The approval gate belongs:", options: ["On every action", "Nowhere — trust the agent", "Where actions become hard to reverse — searches run free; a sent email is gated", "On the cheapest actions"], answer: 2 },
    { id: "401-m4-q2", question: "Indirect injection is the realistic failure mode of agents because:", options: ["Agents are poorly built", "The agent reads dozens of pages with no human watching — the Rung 3 tripwire is gone", "Users are careless", "Models hallucinate"], answer: 1 },
    { id: "401-m4-q3", question: "Sandboxing is:", options: ["A slower environment", "A contained space where the agent's mistakes stay contained — the structural version of the same caution", "A testing fad", "Optional for trusted agents"], answer: 1 },
    { id: "401-m4-q4", question: "The gate never comes off because:", options: ["Policy says so", "Reliability reduces the frequency of a bad draft, not the cost of the one that reaches forty inboxes unsupervised", "Agents don't improve", "Legal requires it"], answer: 1 },
  ],
  "401-m5": [
    { id: "401-m5-q1", question: "Failing toward control looks like:", options: ["Approving everything", "Hovering — re-checking each search, redoing the agent's work; the tell is the agent saves you no time", "Never using agents", "Writing long handoffs"], answer: 1 },
    { id: "401-m5-q2", question: "Failing toward abdication looks like:", options: ["Careful review", "The review became a skim, then a click — you could not describe the last draft you approved", "Frequent escalation", "Tight constraints"], answer: 1 },
    { id: "401-m5-q3", question: "The fifty-second Friday is:", options: ["A deadline", "Fifty-one routine Fridays, then the one where a bullet cites a page that doesn't say what the bullet says — the gate exists for that Friday", "A weekly meeting", "A maintenance window"], answer: 1 },
    { id: "401-m5-q4", question: "On the gate's run review, refusing a clean run that is merely unimpressive is:", options: ["Good judgment", "Failing toward control — confusing 'not excellent' with 'not acceptable'", "Required", "Neutral"], answer: 1 },
  ],
  // ---------------- AIJL 402 ----------------
  "402-m1": [
    { id: "402-m1-q1", question: "The working assumption of the entire course is:", options: ["The agent is probably safe", "The agent will be compromised — design for that", "Attacks are rare", "The vendor handles security"], answer: 1 },
    { id: "402-m1-q2", question: "Injection is best understood as:", options: ["A bug to patch", "A property of the architecture — defense is containment and detection, not a filter that 'fixes' it", "A user problem", "Solved in new models"], answer: 1 },
    { id: "402-m1-q3", question: "Jailbreak vs. injection, operationally:", options: ["Same thing", "Jailbreak is the user subverting the model; injection is third-party content subverting it against the user — different defenses", "Injection is worse spelling", "Jailbreak is theoretical"], answer: 1 },
    { id: "402-m1-q4", question: "The primary design question is not 'can it be compromised' but:", options: ["Who is liable", "What happens when it is — the blast radius", "How much it costs", "Whether logs exist"], answer: 1 },
  ],
  "402-m2": [
    { id: "402-m2-q1", question: "An agent must never run on:", options: ["A service account", "A human's borrowed credentials", "Scoped tokens", "Workload identity"], answer: 1 },
    { id: "402-m2-q2", question: "The token-lifecycle drill that matters most is:", options: ["Issuance", "Revocation under active compromise", "Renewal", "Documentation"], answer: 1 },
    { id: "402-m2-q3", question: "The most common real-world privilege finding is:", options: ["Missing accounts", "Accreted permission — granted once, never removed", "Strong passwords", "Expired domains"], answer: 1 },
    { id: "402-m2-q4", question: "Secrets threat modeling at 402 means:", options: ["Running the vault (that's 302)", "Assuming a token leaked and working out what it reaches", "Choosing a vault vendor", "Encrypting disks"], answer: 1 },
  ],
  "402-m3": [
    { id: "402-m3-q1", question: "The single highest-value control in agentic security is:", options: ["Antivirus", "Egress control — what the agent may reach on the network", "Strong passwords", "Frequent patching"], answer: 1 },
    { id: "402-m3-q2", question: "Tool-level containment means:", options: ["Trusting the agent not to ask", "Constraining what a tool can do rather than trusting the agent not to ask", "Removing all tools", "Rate limiting"], answer: 1 },
    { id: "402-m3-q3", question: "Designing the blast radius deliberately means:", options: ["Hoping for the best", "Enumerating reachable assets and actions for a fully compromised agent — then shrinking the list", "Buying insurance", "Writing an apology template"], answer: 1 },
    { id: "402-m3-q4", question: "A sandbox defeated by a shared credential, mounted path, or permissive egress rule is:", options: ["Rare", "A containment failure mode — the leak is usually through something shared", "Impossible", "Acceptable"], answer: 1 },
  ],
  "402-m4": [
    { id: "402-m4-q1", question: "Source provenance and allowlisting control:", options: ["What the agent may output", "What the agent is permitted to read", "Who can log in", "Model choice"], answer: 1 },
    { id: "402-m4-q2", question: "Output filtering and destination constraint catch exfiltration:", options: ["At the entrance", "At the exit rather than the entrance", "Never", "Only offline"], answer: 1 },
    { id: "402-m4-q3", question: "Data poisoning is more dangerous than a single injected page because:", options: ["It is louder", "A poisoned retrieval corpus is durable — it keeps feeding the corruption", "It costs more", "It is illegal"], answer: 1 },
    { id: "402-m4-q4", question: "Defense in depth for agents asks:", options: ["Which single control is strongest", "Whether the failure of any one control is survivable", "How many vendors to buy", "Whether the model is new"], answer: 1 },
  ],
  "402-m5": [
    { id: "402-m5-q1", question: "A successful injection in the logs is usually:", options: ["Obvious", "Subtle — the signals exist but blend into normal operation", "Absent entirely", "Marked ALERT"], answer: 1 },
    { id: "402-m5-q2", question: "The hard exfiltration case to detect is:", options: ["A foreign IP", "Data leaving through a legitimate channel", "Encrypted traffic", "Large downloads"], answer: 1 },
    { id: "402-m5-q3", question: "Agent incident response order:", options: ["Delete, rebuild, forget", "Contain, revoke, preserve the record, determine reach", "Reboot, patch, resume", "Call the vendor first"], answer: 1 },
    { id: "402-m5-q4", question: "'Determining reach' is:", options: ["A network scan", "The blast-radius question asked under pressure", "A PR exercise", "Optional"], answer: 1 },
  ],
  // ---------------- AIJL 501 ----------------
  "501-m1": [
    { id: "501-m1-q1", question: "The preposition flip is:", options: ["Human-by-the-loop", "Human-in-the-loop → human-on-the-loop — you are the supervisor the loop reports to, not a component it passes through", "Human-off-the-loop entirely", "Loop-without-human"], answer: 1 },
    { id: "501-m1-q2", question: "Control at Rung 5 changes tense:", options: ["From after to before", "From before (approve this) to around (operate inside this) and after (account for what you did)", "Tense is unchanged", "From around to before"], answer: 1 },
    { id: "501-m1-q3", question: "Your absence at Rung 5 is:", options: ["Negligence", "The feature — your boundaries are the control; judgment is front-loaded, not removed", "A bug", "Temporary"], answer: 1 },
    { id: "501-m1-q4", question: "The 501/502 boundary is:", options: ["Curriculum-invented, like 302/402", "Written into the framework itself: for most people, recognize and govern — not build; builders exist", "Arbitrary", "Based on seniority"], answer: 1 },
  ],
  "501-m2": [
    { id: "501-m2-q1", question: "Multi-agent design is:", options: ["A fashion", "Rung 2's decomposition lesson promoted — small single-purpose agents beat one do-everything agent", "Always wrong", "Cheaper"], answer: 1 },
    { id: "501-m2-q2", question: "Structural skepticism means:", options: ["Training agents to be rude", "A fact-check agent whose entire job is doubting the gather agent — independence that is architectural, not attitudinal", "Manual review of everything", "Distrusting vendors"], answer: 1 },
    { id: "501-m2-q3", question: "Least privilege across a pipeline means:", options: ["Everyone gets read access", "Only the send agent holds send rights — a permission topology, not a single set", "All agents share credentials", "The orchestrator holds everything"], answer: 1 },
    { id: "501-m2-q4", question: "Reading a design cold means identifying:", options: ["The vendor", "Which agent does what, what each is permitted, where the handoffs are, which agent holds which privileges", "The cost", "The model version only"], answer: 1 },
  ],
  "501-m3": [
    { id: "501-m3-q1", question: "Guardrails are:", options: ["Suggestions in a prompt", "Hard limits enforced by the system, not a watching human — a Rung 4 approval gate written down and automated", "Legal documents", "Optional at scale"], answer: 1 },
    { id: "501-m3-q2", question: "The autonomy matrix classifies each action as:", options: ["Fast / slow / expensive", "May do alone / must escalate / must never", "Old / new", "Safe / unsafe"], answer: 1 },
    { id: "501-m3-q3", question: "Escalating everything produces:", options: ["Safety", "A system with no autonomy — Rung 4 with extra infrastructure, defeating the point", "Compliance", "Better output"], answer: 1 },
    { id: "501-m3-q4", question: "Self-correction inside a run:", options: ["Replaces the audit", "Raises average quality — and never replaces the audit; a system grading its own homework still needs someone reading the gradebook", "Is a defect", "Slows everything"], answer: 1 },
  ],
  "501-m4": [
    { id: "501-m4-q1", question: "Reading an audit trail well means:", options: ["Reading every line of every run", "Skim normal runs, drill into anomalies — only drilling is unsustainable, only skimming is not supervision", "Reading monthly summaries only", "Trusting the dashboard"], answer: 1 },
    { id: "501-m4-q2", question: "A useful trail must capture:", options: ["Only errors", "Retrievals, decisions, handoffs, trips, sends", "Only sends", "User passwords"], answer: 1 },
    { id: "501-m4-q3", question: "Judging an autonomous output from outside means asking:", options: ["Does it read well?", "What system produced this, under what policy, with what verification, and where is the record?", "Is it long enough?", "Who signed it?"], answer: 1 },
    { id: "501-m4-q4", question: "A system whose record cannot answer the question is:", options: ["Fine if it behaves", "Not auditable, therefore not answerable — however well it behaves", "Normal", "Cheaper to run"], answer: 1 },
  ],
  "501-m5": [
    { id: "501-m5-q1", question: "Drift is:", options: ["A crash", "The slow slide of behavior away from intent — no rule broken, every run individually fine, the pattern wrong", "A hack", "Normal variation"], answer: 1 },
    { id: "501-m5-q2", question: "Drift is visible:", options: ["In any single run", "Only across runs — which is the entire reason the audit practice exists", "In the logs' error rate", "To the vendor"], answer: 1 },
    { id: "501-m5-q3", question: "Nine of the last ten runs citing the same publication is:", options: ["Efficiency", "Drift — nothing violated, but the summary has quietly become a single-source digest", "Proof of quality", "A citation error"], answer: 1 },
    { id: "501-m5-q4", question: "Tightening a boundary because the record was read is:", options: ["Overreaction", "On-the-loop supervision — the adjustment is the job", "Micromanagement", "The vendor's role"], answer: 1 },
  ],
  // ---------------- AIJL 502 ----------------
  "502-m1": [
    { id: "502-m1-q1", question: "502 is the only course whose audience is:", options: ["Managers", "Builders — the framework's own carve-out: for them the bar includes construction", "Auditors", "Vendors"], answer: 1 },
    { id: "502-m1-q2", question: "A requirements document that omits the supervisor produces:", options: ["A faster system", "An unanswerable system by design — before a line is built", "A cheaper system", "Nothing unusual"], answer: 1 },
    { id: "502-m1-q3", question: "Designing for structural skepticism is:", options: ["A prompt tweak", "An architectural choice — the fact-check bounce wired into the topology, not bolted on", "A staffing decision", "Optional"], answer: 1 },
    { id: "502-m1-q4", question: "An internal handoff between agents is:", options: ["Safe because internal", "A trust-boundary crossing — and crossings are where enforcement lives", "Free of risk", "Unlogged by default"], answer: 1 },
  ],
  "502-m2": [
    { id: "502-m2-q1", question: "Serving architecture separates a demo from a service by:", options: ["The model size", "Real concurrency, request routing, queueing — holding up at actual load, not responding to a test", "The UI", "The price"], answer: 1 },
    { id: "502-m2-q2", question: "Retrieval infrastructure gets its first real ownership here because:", options: ["RAG was unimportant before", "RAG was defined at 301 as a user concept and nobody in the catalog has built its machinery until now", "It is easy", "Vendors require it"], answer: 1 },
    { id: "502-m2-q3", question: "Corpus integrity from the builder's chair means:", options: ["402 defends it; you build the corpus that must be defended — provenance on every document, reviewed additions", "Ignoring poisoning", "Buying a clean corpus", "Trusting contributors"], answer: 0 },
    { id: "502-m2-q4", question: "An architecture that exists only in console clicks cannot be:", options: ["Deployed", "Audited — which in this program means it cannot answer for itself; infrastructure-as-code makes it reviewable, revertible, reproducible", "Scaled", "Sold"], answer: 1 },
  ],
  "502-m3": [
    { id: "502-m3-q1", question: "The auditor is:", options: ["An obstacle", "Your customer — design the record for the 501 graduate who will read it", "The vendor", "Optional"], answer: 1 },
    { id: "502-m3-q2", question: "Designing so drift is visible is:", options: ["A monitoring addon", "A schema decision made months before anyone needs it — the record must support cross-run comparison", "Impossible", "A dashboard"], answer: 1 },
    { id: "502-m3-q3", question: "A schema can fail drift-visibility by:", options: ["Capturing too little per run", "Capturing every run perfectly while making cross-run comparison impossible — inconsistent fields, units, source identifiers", "Being encrypted", "Being open source"], answer: 1 },
    { id: "502-m3-q4", question: "Instrumenting the trip means:", options: ["Logging errors", "An escalation carries context with it — what tripped, what the system was doing, what it had done — so a human woken at 2 a.m. can act", "Paging the vendor", "Retrying automatically"], answer: 1 },
  ],
  "502-m4": [
    { id: "502-m4-q1", question: "Guardrails as code means:", options: ["Documented policy", "Enforcement that does not depend on anyone watching — the send agent cannot reach unlisted recipients because the system prevents it", "A style guide", "A prompt instruction"], answer: 1 },
    { id: "502-m4-q2", question: "On ambiguity, the autonomy matrix should:", options: ["Proceed", "Escalate", "Guess", "Retry"], answer: 1 },
    { id: "502-m4-q3", question: "Sovereignty by design starts from:", options: ["The vendor matrix", "The most sensitive byte the system will ever touch, and whose law claims it — every downstream decision answers that question", "Cost", "Performance"], answer: 1 },
    { id: "502-m4-q4", question: "The forgotten fourth that leaks sovereignty is:", options: ["The model endpoint", "Logging, telemetry, and backups — they leave the jurisdiction while the endpoint stays compliant", "The UI", "The documentation"], answer: 1 },
  ],
  "502-m5": [
    { id: "502-m5-q1", question: "A pipeline dying mid-mission leaves:", options: ["Nothing", "State everywhere — partial outputs, held locks, a send that may or may not have happened; design the failure modes, not just the happy path", "Only a log line", "A clean retry"], answer: 1 },
    { id: "502-m5-q2", question: "A model version change is:", options: ["A drop-in replacement", "A behaviour change — probabilistic behaviour makes regression testing a comparison of distributions, not strings", "Invisible to users", "Always an improvement"], answer: 1 },
    { id: "502-m5-q3", question: "Handover to a 302 operator and a 501 supervisor requires:", options: ["Nothing — the system explains itself", "The runbook, the data-flow answers, and the audit schema documentation — a system its operators cannot operate is one you did not finish", "A marketing deck", "Source code only"], answer: 1 },
    { id: "502-m5-q4", question: "The 502 gate scores:", options: ["Construction speed", "Adjudication, not construction — architecture defect hunting and auditability determination against fixed keys", "Code quality", "Presentation skill"], answer: 1 },
  ],
};
