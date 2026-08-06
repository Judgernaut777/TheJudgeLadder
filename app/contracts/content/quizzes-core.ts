// Auto-scored module knowledge checks — courses 101–302.
// Practice-grade: keys ship to the client. Not part of any gate.
import type { MCItem } from "./types";

export const quizzesCore: Record<string, MCItem[]> = {
  // ---------------- AIJL 101 ----------------
  "101-m1": [
    { id: "101-m1-q1", question: "The most accurate mental model of a chat turn is:", options: ["The model remembers you between sessions", "Each turn is an independent awakening handed a transcript — nothing else", "The model thinks continuously in the background", "The model learns from your corrections permanently"], answer: 1, explanation: "Stateless: every turn the model wakes to a transcript. It never 'had' anything that isn't in that window." },
    { id: "101-m1-q2", question: "If a fact from earlier in the conversation is not inside the context window this turn, the model:", options: ["Forgot it", "Never knew it — it cannot miss what it never had", "Can recall it if asked firmly", "Stored it in long-term memory"], answer: 1 },
    { id: "101-m1-q3", question: "A token is closest to:", options: ["One character", "One word exactly", "About three-quarters of a word", "One sentence"], answer: 2 },
    { id: "101-m1-q4", question: "Which is NOT one of the nine foundational terms introduced on contact?", options: ["Context window", "Temperature", "Kubernetes", "System prompt"], answer: 2 },
  ],
  "101-m2": [
    { id: "101-m2-q1", question: "'Sealed box' means:", options: ["The model is encrypted", "No tools — every point of contact with the world is yours", "The chat cannot be exported", "The provider cannot see your data"], answer: 1 },
    { id: "101-m2-q2", question: "The four ingredients of context-rich prompting are:", options: ["Role, tone, brevity, keywords", "Background, audience, format, constraints", "Greeting, question, thanks, sign-off", "Examples, threats, repetition, flattery"], answer: 1 },
    { id: "101-m2-q3", question: "Few-shot prompting is:", options: ["Keeping prompts short", "Providing example input-output pairs for the model to continue", "Asking the same question a few times", "Using fewer tokens"], answer: 1 },
    { id: "101-m2-q4", question: "Iteration should stop when:", options: ["Exactly three rounds are done", "The model sounds confident", "Adjustments are changing prose but not substance — or the output meets the stated need", "The output is flawless"], answer: 2 },
  ],
  "101-m3": [
    { id: "101-m3-q1", question: "Context rot means:", options: ["Models degrade over months", "Quality decays as the desk fills — attention thins and near-miss material poisons output", "Old chats get deleted", "Training data goes stale"], answer: 1 },
    { id: "101-m3-q2", question: "The attention pattern across a long context is roughly:", options: ["Even throughout", "Strongest in the middle", "U-shaped — beginnings and ends hold, the middle sags", "Random"], answer: 2 },
    { id: "101-m3-q3", question: "The reliable stylistic tell of a hallucinated passage is:", options: ["Overly formal tone", "Hedging language", "Long sentences", "There isn't one — fluent is not true"], answer: 3 },
    { id: "101-m3-q4", question: "The fix for a long, degraded chat is usually:", options: ["Repeat the question louder", "Summarize the state into a tight brief and start a fresh chat", "Paste the entire history again", "Switch to a nicer tone"], answer: 1 },
  ],
  "101-m4": [
    { id: "101-m4-q1", question: "Verification, as this course defines it, is:", options: ["Asking the model to double-check itself", "Re-reading the output twice", "Checking the claim against something outside the model that could prove it wrong", "Getting a second model's opinion"], answer: 2 },
    { id: "101-m4-q2", question: "The commonest real-world verification miss is:", options: ["The outright fabrication", "The typo", "The overstatement — source says 'proposed', summary says 'launched'", "The formatting slip"], answer: 2 },
    { id: "101-m4-q3", question: "The Rung 1 gate certifies:", options: ["Prompting speed", "That you instinctively verify factual output", "Prompting skill", "Vocabulary"], answer: 1 },
    { id: "101-m4-q4", question: "An unverifiable claim in a product you forward should be:", options: ["Forwarded anyway if it reads well", "Marked as unverified rather than forwarded as fact", "Quietly deleted", "Softened with 'maybe'"], answer: 1 },
  ],
  // ---------------- AIJL 201 ----------------
  "201-m1": [
    { id: "201-m1-q1", question: "Rung 2 begins:", options: ["When you get tool access", "The third time you type the same kind of request", "After a certification", "When prompts get long"], answer: 1 },
    { id: "201-m1-q2", question: "Decomposition means:", options: ["Writing one comprehensive mega-prompt", "Breaking a recurring task into named stages with small single-purpose prompts", "Deleting old prompts", "Using bullet points in prompts"], answer: 1 },
    { id: "201-m1-q3", question: "Small single-purpose prompts beat one mega-prompt because:", options: ["They cost fewer tokens", "They isolate failure — a mega-prompt fails sprawling and can't be fixed precisely", "They read better", "They avoid rate limits"], answer: 1 },
    { id: "201-m1-q4", question: "A well-formed pipeline stage has:", options: ["Many inputs, one output", "One input, one output, and one way to tell it went wrong", "No failure modes", "The largest available model"], answer: 1 },
  ],
  "201-m2": [
    { id: "201-m2-q1", question: "A template is:", options: ["A saved answer you resend", "A saved prompt with slots — fixed scaffolding plus gaps for this-time material", "A list of magic words", "An uneditable system prompt"], answer: 1 },
    { id: "201-m2-q2", question: "When output disappoints, the Rung 2 move is to fix:", options: ["The answer, by hand", "The model", "The template — so the fix is permanent", "Your expectations"], answer: 2 },
    { id: "201-m2-q3", question: "Structured output matters primarily because:", options: ["It looks professional", "A stage can only consume the previous stage's output if that output has a predictable form", "Models demand it", "It saves tokens"], answer: 1 },
    { id: "201-m2-q4", question: "Templates are artifacts of:", options: ["Context engineering — deciding what the model wakes up to", "Graphic design", "Network engineering", "Model training"], answer: 0 },
  ],
  "201-m3": [
    { id: "201-m3-q1", question: "'You are the wiring' means:", options: ["You own the templates", "You are the connective tissue carrying outputs between stages by hand", "You control the infrastructure", "You are the most creative component"], answer: 1 },
    { id: "201-m3-q2", question: "In the framework's worked example, the weekly routine contained:", options: ["Seven judgments, two transfers", "Roughly two minutes of judgment against seven manual transfers containing no decision", "Equal parts judgment and transport", "No judgment"], answer: 1 },
    { id: "201-m3-q3", question: "Mechanical transport is:", options: ["Evaluating the draft", "Copying, pasting, reformatting — moments where you are a cable", "Deciding what leads", "Approving the send"], answer: 1 },
    { id: "201-m3-q4", question: "The friction at Rung 2 matters because:", options: ["It builds character", "Feeling exactly which parts are judgment and which are transport is what makes Rung 3's tools comprehensible", "It slows you down usefully", "It is billable"], answer: 1 },
  ],
  // ---------------- AIJL 301 ----------------
  "301-m1": [
    { id: "301-m1-q1", question: "At Rung 3, the division of labor is:", options: ["The AI acts, you watch", "The AI proposes; you dispose — human-in-the-loop", "The AI decides, you approve monthly", "You propose, the AI disposes"], answer: 1 },
    { id: "301-m1-q2", question: "The deep reason tools exist is:", options: ["Convenience", "Speed", "Verifiability — a grounded model can be checked; a sealed one can only sound right", "Cost"], answer: 2 },
    { id: "301-m1-q3", question: "A citation from a grounded model is:", options: ["Proof", "A claim, not proof — follow it and confirm it", "Always fabricated", "The provider's guarantee"], answer: 1 },
    { id: "301-m1-q4", question: "Every connector added is:", options: ["Pure capability", "Pure risk", "Both a capability and a data pathway", "Free"], answer: 2 },
  ],
  "301-m2": [
    { id: "301-m2-q1", question: "If you cannot say where your pasted text goes and who can see it:", options: ["That's normal", "You are not using the tool — you are trusting it blindly", "Ask the model", "It doesn't matter for internal tools"], answer: 1 },
    { id: "301-m2-q2", question: "Prompt injection works because:", options: ["Models are buggy", "The model reads retrieved content the same way it reads your instructions", "Passwords are weak", "Networks are insecure"], answer: 1 },
    { id: "301-m2-q3", question: "Your per-action approval is the tripwire for injection because:", options: ["It logs everything", "You can ask: why does it want to send an email I didn't ask about?", "It encrypts the session", "It slows the attack"], answer: 1 },
    { id: "301-m2-q4", question: "A credential pasted into a chat is:", options: ["Fine if the chat is private", "A credential you no longer control", "Encrypted at rest", "Deleted after the session"], answer: 1 },
  ],
  "301-m3": [
    { id: "301-m3-q1", question: "When you don't know whether a classification of data may enter a tool, the answer is:", options: ["Try it and see", "Not yet — ask", "Yes, if it's convenient", "Only on Fridays"], answer: 1 },
    { id: "301-m3-q2", question: "Shadow AI — pasting work material into a personal account because the approved tool is clunkier — is:", options: ["A productivity hack", "A data-leaving-the-building event, however innocent it feels", "Acceptable for small files", "IT's problem"], answer: 1 },
    { id: "301-m3-q3", question: "Least privilege lived from underneath means:", options: ["Routing around limits to work faster", "Limited access is design, not distrust — routing around it is the violation", "Asking for admin rights", "Ignoring access denials"], answer: 1 },
    { id: "301-m3-q4", question: "Escalating something beyond your access is:", options: ["Failure", "Competence, not failure — handing up is part of the job", "Insurbordination", "Optional"], answer: 1 },
  ],
  // ---------------- AIJL 302 ----------------
  "302-m1": [
    { id: "302-m1-q1", question: "302's scope filter asks of every topic:", options: ["Would a real DevOps engineer know this?", "Does an AI infrastructure operator absolutely need this?", "Is this on the certification exam?", "Is this interesting?"], answer: 1, explanation: "'It would help' and 'a real DevOps engineer would know it' both fail the filter." },
    { id: "302-m1-q2", question: "In 302, ops fundamentals are taught:", options: ["In a dedicated fundamentals week first", "Attached to the AI task that needs them — containers arrive because you are standing up an inference server", "Never", "As optional reading"], answer: 1 },
    { id: "302-m1-q3", question: "An API key committed to a repository is:", options: ["Standard practice", "An incident", "Fine if the repo is private", "Resolved by deleting the file"], answer: 1 },
    { id: "302-m1-q4", question: "Quantization exists in the course because:", options: ["It improves accuracy", "It is how a model is made to fit the hardware you actually have, at a known quality cost", "It speeds up training", "It is required by regulation"], answer: 1 },
  ],
  "302-m2": [
    { id: "302-m2-q1", question: "The trust-first decision procedure starts from:", options: ["Benchmark scores", "The data profile — classification, residency requirement, leak consequence, governing regime", "Cost", "Vendor preference"], answer: 1 },
    { id: "302-m2-q2", question: "The difference between a residency requirement and a residency guarantee is:", options: ["Nothing", "A guarantee is enforced technically — region pinning, egress control — not written down", "A requirement is stronger", "Lawyers"], answer: 1 },
    { id: "302-m2-q3", question: "A log capturing classified material is:", options: ["Good practice", "An exfiltration event you built", "Required by audit", "Harmless if rotated"], answer: 1 },
    { id: "302-m2-q4", question: "301's 'know that you are logged' inverts at 302 to:", options: ["Disable logging", "You now decide what gets logged and what must never be", "Log everything", "Outsource logging"], answer: 1 },
  ],
  "302-m3": [
    { id: "302-m3-q1", question: "Prompts and configurations are treated as:", options: ["Ephemeral text", "Deployable artifacts — versioned, staged, reviewed, reverted like anything else", "Documentation", "Personal notes"], answer: 1 },
    { id: "302-m3-q2", question: "Why is 'it worked before' a weaker rollback signal for AI than for ordinary software?", options: ["AI is newer", "Behavior is probabilistic — the same input does not guarantee the same output", "Logs are missing", "Models can't be versioned"], answer: 1 },
    { id: "302-m3-q3", question: "A silent quality regression is dangerous because:", options: ["It crashes the server", "Nothing errors — output just gets worse, and only evaluation against known-good workloads catches it", "It is expensive", "Users complain immediately"], answer: 1 },
    { id: "302-m3-q4", question: "The development configuration found live in production is:", options: ["Convenient", "A seeded-defect category on the gate — an environment defect", "Normal during migration", "A performance optimization"], answer: 1 },
  ],
};
