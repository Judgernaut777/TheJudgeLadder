import type { Course } from "./types";

export const course101: Course = {
  code: "101",
  slug: "aijl-101",
  title: "AI Fundamentals and Prompting",
  rungLabel: "Rung 1 — Chat",
  track: "core",
  durationDays: 1,
  confers: "AIJL Rung 1",
  gateText: "You instinctively verify factual output.",
  gateSource: "framework",
  summary:
    "The entry course. How a chat model actually works, how to steer it, why fluent output is not true output, and the verification reflex every rung above depends on.",
  prerequisites: [],
  modules: [
    {
      id: "101-m1",
      title: "Module 1 — The Machine You're Talking To",
      subtitle: "What a chat model is, and what it is not",
      lessons: [
        {
          id: "101-m1-l1",
          title: "Every turn is a fresh awakening",
          frameworkRef: "Context pillar",
          blocks: [
            { type: "paragraph", text: "The single most important fact about a chat model is the one the interface works hardest to hide: it does not remember you. Between your last message and your next one, nothing persists. The model you are talking to right now was, a moment ago, nowhere — and the one you will talk to in ten seconds will be a different instance, handed the transcript of your conversation as if reading it for the first time." },
            { type: "paragraph", text: "Engineers call this statelessness. Every exchange works the same way: the entire conversation so far — your messages and its replies — is assembled into a single document, and the model generates a continuation. It is not recalling an ongoing relationship. It is reading a script and writing the next line. The feeling of continuity comes entirely from the transcript, not from anything inside the model." },
            { type: "callout", tone: "key", title: "Not 'it forgot' — it never knew", text: "When a model loses track of something you said an hour ago, the natural diagnosis is 'it forgot.' That is wrong, and the wrong diagnosis leads to the wrong fix. It never carried anything forward. What happened is that the thing you said stopped being included in the transcript it was handed — or was buried so deep in it that it stopped mattering. The fix is never 'remind it harder.' It is to manage what is on the desk." },
            { type: "paragraph", text: "This one idea explains most of the strange behaviour you will ever see from a chat model: why it contradicts itself across a long conversation, why opening a fresh chat sometimes fixes a stuck exchange, and why pasting the relevant facts into your message beats referring to 'what we discussed earlier.' You are not talking to a mind that retains you. You are writing to a reader who only ever sees what is on the page." },
          ],
          practice: [
            {
              kind: "booleanSet",
              id: "101-p1",
              title: "Stateless or not?",
              display: "yesno",
              yesLabel: "Consistent with a stateless model",
              noLabel: "Not consistent",
              instructions: "For each behaviour, decide whether it is what you would expect from a model that wakes fresh every turn and only sees the transcript.",
              subjects: [
                { id: "a", label: "In a long chat, the model contradicts a constraint you set near the beginning." },
                { id: "b", label: "The model greets you by name in a brand-new chat where you never gave it." },
                { id: "c", label: "Starting a fresh chat with a clean one-paragraph summary works better than continuing a meandering thread." },
                { id: "d", label: "The model improves at your task over weeks because it has been learning from your past sessions." },
              ],
              key: { a: true, b: false, c: true, d: false },
            },
          ],
        },
        {
          id: "101-m1-l2",
          title: "The desk: the window is the model's whole reality",
          frameworkRef: "Context pillar",
          blocks: [
            { type: "paragraph", text: "If the model wakes fresh each turn, what does it wake to? Everything it can see is called the context window — the running transcript plus whatever else gets placed in front of it for that turn. Picture a worker at a desk: the window is the desk surface. If a document is on the desk, the worker can use it. If it is not on the desk, it does not exist, no matter how certain you are that you mentioned it last week." },
            { type: "paragraph", text: "The window has a fixed size, measured in tokens — roughly three-quarters of a word each. When the conversation outgrows the window, the oldest material falls off the desk. The model does not warn you when this happens. It simply proceeds with a smaller and smaller picture of what you meant, producing answers that are locally fluent and globally wrong." },
            { type: "list", items: [
              "On the desk: the current transcript, your pasted material, system instructions set by the product.",
              "Not on the desk: your other chats, your files, your email, 'what we discussed yesterday' — unless the product explicitly puts them there.",
              "Falling off the desk: the oldest turns of a long conversation, silently.",
            ] },
            { type: "paragraph", text: "The practical discipline follows directly: put what matters on the desk, put it near the ask, and keep the desk clear of what does not matter. A two-line recap at the top of a long session does more for accuracy than any clever phrasing of the question itself. You are the model's only supply line to reality." },
            { type: "callout", tone: "info", title: "Why 'read this back to me' works", text: "Asking the model to summarize the conversation so far is not a courtesy — it is an audit of the desk. Whatever it can summarize is still in the window. Whatever it drops has effectively ceased to exist, and you know to restate it before it costs you." },
          ],
        },
        {
          id: "101-m1-l3",
          title: "Nine words you will hear constantly",
          frameworkRef: "00-foundations/README.md",
          blocks: [
            { type: "paragraph", text: "The field runs on a small vocabulary, and most confusion in AI conversations is vocabulary confusion. These nine terms carry almost everything else you will learn in this program. Do not memorize definitions — attach each one to the picture from the last two lessons." },
            { type: "table", headers: ["Term", "Working meaning"], rows: [
              ["Model", "The system that generates text. Not a database, not a person, not the chat app wrapping it."],
              ["Prompt", "Everything you hand the model for a turn — your instruction plus any material you paste in."],
              ["Context (window)", "The desk. The fixed-size working area the model sees for one turn."],
              ["Token", "The unit text is chopped into. Roughly ¾ of a word. Context limits are measured in tokens."],
              ["Hallucination", "Fluent, confident output that is not true. Structural, not a glitch — see Module 3."],
              ["Temperature", "A dial for randomness in generation. Higher = more varied, lower = more predictable."],
              ["System prompt", "Standing instructions placed on the desk by the product, before anything you type."],
              ["Inference", "The act of generating output from input. 'Running the model.'"],
              ["Grounding", "Connecting output to checkable sources. Absent at Rung 1 — the box is sealed."],
            ] },
            { type: "paragraph", text: "Two of these deserve early respect because they are misused constantly. A hallucination is not the model 'lying' or 'bugging out' — it is the normal product of a system that produces plausible text, full stop. And the context window is not 'how much the model remembers' — it is all the model has ever known, each time." },
          ],
          practice: [
            {
              kind: "classification",
              id: "101-p3",
              title: "Name the concept",
              instructions: "Each scenario illustrates exactly one foundational term. Classify it.",
              items: [
                { id: "a", text: "A user pastes a 40-page contract and asks about a clause; the model answers about a different clause entirely, from a contract it seems to have invented.", detail: "The clause it describes appears nowhere in the pasted document." },
                { id: "b", text: "A product team sets the model to give identical answers to identical questions during testing." },
                { id: "c", text: "A chat app includes hidden instructions: 'You are a concise assistant. Never give legal advice.'" },
                { id: "d", text: "A vendor advertises a '200K' limit; a user discovers that a 250-page transcript gets its earliest pages ignored." },
              ],
              categories: [
                { id: "hallucination", label: "Hallucination" },
                { id: "temperature", label: "Temperature (set low)" },
                { id: "system-prompt", label: "System prompt" },
                { id: "context", label: "Context window limit" },
              ],
              key: { a: "hallucination", b: "temperature", c: "system-prompt", d: "context" },
            },
          ],
        },
      ],
    },
    {
      id: "101-m2",
      title: "Module 2 — Working the Box",
      subtitle: "Steering a sealed model toward useful output",
      lessons: [
        {
          id: "101-m2-l1",
          title: "The sealed box",
          frameworkRef: "01-chat/in-practice.md",
          blocks: [
            { type: "paragraph", text: "At Rung 1 the model has no tools. It cannot search the web, open your files, send anything, or check anything. Every point of contact between the model and the world is you: you carry information in, and you carry output out. This sounds like a limitation to be escaped, and later rungs do escape it — but the sealed box is also a safety property. Nothing the model generates can touch the world until you decide to move it." },
            { type: "paragraph", text: "The consequence that matters for this course: because the box is sealed, the model cannot check its own work against reality. It can check its work against itself — 'review your answer' — which has some value, but it cannot confirm a fact, follow a link, or open the document you meant to paste and forgot. Verification against the world is your job, structurally, not as a best practice. There is no one else." },
            { type: "callout", tone: "warning", title: "The confidence trap", text: "Sealed models answer questions about the world in the same fluent register whether or not the answer is true. Nothing in the prose signals which is which. If you take one habit out of Rung 1, take this: the box's confidence carries no information about its accuracy." },
          ],
        },
        {
          id: "101-m2-l2",
          title: "Context-rich prompting",
          frameworkRef: "Rung 1 competency 2",
          blocks: [
            { type: "paragraph", text: "The difference between a useless answer and a useful one is usually not cleverness of phrasing — it is how much of your situation you put on the desk. A model asked 'write an email about the delay' produces generic filler because generic is all it has. The same model given the project, the reader, the stakes, and the tone produces something you can actually send." },
            { type: "paragraph", text: "Four ingredients do most of the work. Background: what is going on, in two or three sentences. Audience: who will read this and what they care about. Format: the shape of the answer — five bullets, a table, two paragraphs, 150 words. Constraints: what to avoid, what to assume, what is confidential, what tone. You will rarely need all four, but when an answer disappoints, the missing ingredient is almost always one of them." },
            { type: "list", items: [
              "Thin: 'Summarize this report.'",
              "Richer: 'Summarize this report for a department head who has not read it, in five bullets, leading with the decision she needs to make, no jargon.'",
              "Thin: 'Explain this error.'",
              "Richer: 'Explain this error to a new analyst. Assume no background in networking. Give the most likely cause first, then how to confirm it.'",
            ] },
            { type: "paragraph", text: "Notice what this technique is not: it is not magic words, and it is not flattery or threats. It is desk management. You are deciding what the model wakes up to, because nothing else will." },
          ],
          practice: [
            {
              kind: "classification",
              id: "101-p4",
              title: "Which ingredient is missing?",
              instructions: "Each prompt produced a poor result. Identify the missing ingredient: background, audience, format, or constraints.",
              items: [
                { id: "a", text: "'Write a project update.' → The model invents plausible-sounding milestones for a project that does not exist." },
                { id: "b", text: "'Explain quantum computing.' → The answer opens with 'Quantum computers leverage superposition and entanglement' — impenetrable to the new hire it was meant for." },
                { id: "c", text: "'Give me talking points for the board.' → The model returns a 900-word essay instead of talking points." },
                { id: "d", text: "'Draft a reply to this customer complaint.' → The draft promises a full refund, which company policy explicitly forbids." },
              ],
              categories: [
                { id: "background", label: "Background" },
                { id: "audience", label: "Audience" },
                { id: "format", label: "Format" },
                { id: "constraints", label: "Constraints" },
              ],
              key: { a: "background", b: "audience", c: "format", d: "constraints" },
            },
          ],
        },
        {
          id: "101-m2-l3",
          title: "Few-shot and role: the two cheap levers",
          frameworkRef: "Rung 1 competency 3",
          blocks: [
            { type: "paragraph", text: "Once the basics are in place, two steering levers cost almost nothing and pull far above their weight. The first is the example. Showing the model one or two completed input-output pairs — 'few-shot' prompting — communicates format and taste more precisely than any description of them. If you want complaints rewritten in your house style, paste one complaint and its ideal rewrite, then the complaint you want handled. The model continues the pattern." },
            { type: "paragraph", text: "The second is role. 'You are a meticulous copy editor reviewing for a journal' changes what the model notices, because it changes what continuation is plausible. Role works best when it is specific and relevant to the task — a role that names the expertise, the audience, and the standard. Decorative roles ('you are a genius') do nothing; the model cannot be flattered into competence." },
            { type: "callout", tone: "info", title: "Order of operations", text: "Reach for the levers in this order: context first (the right material on the desk), format second (the shape of the answer), examples third (the taste), role last (the stance). Most prompting failures are context failures wearing a clever-phrasing costume." },
            { type: "paragraph", text: "Both levers share a limit that matters more than either lever: they shape style and attention, not truth. A model playing a meticulous editor hallucinates meticulously. Steering makes output more useful; it never makes it more trustworthy. That distinction is the entire boundary between this module and the next." },
          ],
        },
        {
          id: "101-m2-l4",
          title: "Iteration: ask, inspect, adjust — and when to stop",
          frameworkRef: "Rung 1 competency 1",
          blocks: [
            { type: "paragraph", text: "Good results come from loops, not from single perfect prompts. The loop is simple: ask, inspect what came back, adjust the prompt based on what you saw, re-ask. The adjustment is where the skill lives. 'Try again' gives the model nothing; 'shorter, drop the second section, address it to the client not the team' gives it a corrected desk to work from." },
            { type: "paragraph", text: "Two failure modes sit at either end of the loop. Under-iterating: accepting the first fluent answer because it reads well. Over-iterating: polishing a paragraph for nine rounds when round three was already good enough — or worse, iterating a task the model structurally cannot do, like verifying a current fact from inside a sealed box. Knowing which failure you are prone to is worth a deliberate moment here." },
            { type: "list", items: [
              "Stop when: the output meets the need you actually wrote down, not an idealized one.",
              "Stop when: two consecutive adjustments changed the prose but not the substance.",
              "Stop and restart instead: the chat has drifted so far that every answer is fighting the accumulated transcript — a fresh window with a clean brief beats a tenth adjustment.",
              "Never iterate: factual verification. That loop closes against a source, not against the model.",
            ] },
            { type: "paragraph", text: "Notice what iteration improves and what it cannot. It improves fit — tone, structure, completeness against your brief. It does not improve accuracy, because the model's check of its own output uses the same machinery that produced the error. Inspect for fit as much as you like. Inspect for truth somewhere else." },
          ],
        },
      ],
    },
    {
      id: "101-m3",
      title: "Module 3 — Where It Goes Wrong",
      subtitle: "Context rot and structural hallucination",
      lessons: [
        {
          id: "101-m3-l1",
          title: "Context rot: a fuller desk is a worse desk",
          frameworkRef: "Context pillar",
          blocks: [
            { type: "paragraph", text: "More context is not more better. As the desk fills, the model's attention spreads thinner across everything on it, and material in the middle of a long context gets used less reliably than material at the beginning or the end — researchers find a U-shaped attention curve. Your critical constraint, pasted at page 12 of 30, is in the worst seat in the house." },
            { type: "paragraph", text: "Worse than absence is poison. Near-miss material — documents that look relevant but are not, outdated versions of the same file, a similar-but-different policy — actively degrades output, because the model weaves it in with perfect confidence. A desk with three documents where two are distractors performs worse than a desk with only the right one. This is context rot: quality decaying as quantity grows." },
            { type: "list", items: [
              "Put the most important material first or last, never buried mid-desk.",
              "Prefer one right document over five approximately-right ones.",
              "When a long chat degrades, restart with a tight summary rather than appending more.",
              "Keep superseded versions out. 'Policy_v3_FINAL(2)' on the desk alongside v2 is an accuracy incident waiting.",
            ] },
            { type: "callout", tone: "key", title: "The desk audit", text: "Before blaming the model for a bad answer in a long session, audit the desk: what is actually in the window right now, where is it sitting, and what near-miss material is sharing the space? Most 'the model got dumb' reports are desk failures, and desk failures are yours to fix." },
          ],
          practice: [
            {
              kind: "booleanSet",
              id: "101-p5",
              title: "Desk hygiene",
              display: "yesno",
              yesLabel: "Good practice",
              noLabel: "Poor practice",
              instructions: "Judge each practice against what you know about context rot.",
              subjects: [
                { id: "a", label: "Pasting the full 80-page manual 'so the model has everything', when the question concerns one procedure." },
                { id: "b", label: "Restating the three governing constraints at the end of a long prompt, just before the ask." },
                { id: "c", label: "Including last year's version of the policy 'for comparison' without labelling it as superseded." },
                { id: "d", label: "Summarizing a long thread into a brief and starting a fresh chat when answers begin to drift." },
              ],
              key: { a: false, b: true, c: false, d: true },
            },
          ],
        },
        {
          id: "101-m3-l2",
          title: "Fluent is not true",
          frameworkRef: "Foundations",
          blocks: [
            { type: "paragraph", text: "Now the fact this entire course exists to teach. A chat model generates text by continuing patterns — it is built to produce what a good answer sounds like, not to check what a true answer is. When the pattern in its training data is strong, the output is usually right. When the pattern is thin — recent events, obscure specifics, your organization's internal facts — the model does not hesitate or flag uncertainty. It produces the same fluent prose, now unmoored from reality. That is hallucination, and it is structural: not a bug to be patched but the normal operation of the machine, applied where its knowledge runs out." },
            { type: "paragraph", text: "The dangerous corollary: there is no stylistic tell. Hallucinated text does not read differently from true text. It cites real-sounding journals, invents plausible statistics, names courts and case numbers that do not exist — in the same calm register it uses for everything else. Lawyers have filed briefs citing invented cases; analysts have forwarded invented figures upward. In every documented case, the failure was not the model's prose. It was a human who trusted the prose." },
            { type: "quote", text: "The model is not a database with a confidence problem. It is a prose engine. Fluent is the product; true is a coincidence you are responsible for confirming.", source: "Course maxim" },
            { type: "paragraph", text: "Hold the two ideas from this module together and the picture is complete. The desk is the model's entire reality (Module 1), and the model fills gaps in that reality with confident invention (this lesson). Everything you do not supply, it may supply for you — fiction included. The only defence is a habit, and the habit is the next lesson." },
          ],
        },
      ],
    },
    {
      id: "101-m4",
      title: "Module 4 — The Reflex",
      subtitle: "Verification: the gate itself",
      lessons: [
        {
          id: "101-m4-l1",
          title: "Verify before you rely, verify before you forward",
          frameworkRef: "Foundations; the gate",
          blocks: [
            { type: "paragraph", text: "Verification means checking a claim against something outside the model before you rely on it or pass it on. Not re-reading the model's answer. Not asking the model to double-check. Going to a source that exists independently: the original document, the official page, the person who sent the figure, the system of record. The check is only a check if it could, in principle, prove the model wrong." },
            { type: "paragraph", text: "Not every sentence deserves the same scrutiny. Calibrate by consequence: a fact that will be forwarded upward, published, or acted on gets verified; a brainstorming adjective does not. But the reflex must be default-on for anything factual, because the failure mode is never the claim you suspected — it is the one that read as too boring to question. The planted error in a real workflow is almost always a plausible one." },
            { type: "list", items: [
              "Numbers, dates, names, quotes: verify against the source, every time they will travel.",
              "Claims that would embarrass you or harm someone if wrong: verify regardless of how routine they seem.",
              "Anything the model asserts about your organization's facts: it cannot know them unless you supplied them.",
              "The model's own citations: a real-looking citation is a claim, not proof — later rungs return to this at full weight.",
            ] },
            { type: "callout", tone: "key", title: "The gate", text: "Rung 1's certification gate is not prompting skill — the framework is explicit about that. The gate is this: you instinctively verify factual output. Instinctively means it has become faster to check than to wonder whether you should. Everything in the gate exam traces to this reflex." },
            { type: "paragraph", text: "One refinement separates genuine verification from theatre: you are checking the claim, not the vibe. 'Supported' means the source actually states this — not that it states something adjacent, not that the claim sounds consistent with the source's topic. The commonest real-world miss is the overstatement: the source says 'proposed', the summary says 'launched'; the source says 'up to 40%', the summary says '40%'. Weaker and stronger are not the same claim, and forwarding the stronger one is forwarding an unverified claim." },
          ],
          practice: [
            {
              kind: "classification",
              id: "101-p6",
              title: "Supported, overstated, or not supported?",
              instructions: "Classify each claim against the source excerpt. This is the exact shape of the certification gate's practical.",
              contextTitle: "Source excerpt",
              context: [
                { type: "paragraph", text: "The city council announced on Tuesday a proposed expansion of the Riverside cycling network. Under the proposal, 14 kilometres of protected lanes would be added by 2028, at an estimated cost of $9.2 million. The plan requires approval from the transport committee, which votes next month. A 2024 city survey found that 38% of residents cycle at least weekly." },
              ],
              items: [
                { id: "a", text: "The Riverside expansion will add 14 km of protected cycling lanes by 2028." },
                { id: "b", text: "The expansion is estimated to cost $9.2 million." },
                { id: "c", text: "The new lanes have been approved and construction begins this year." },
                { id: "d", text: "Nearly half of the city's residents cycle at least weekly." },
                { id: "e", text: "The transport committee votes on the proposal next month." },
              ],
              categories: [
                { id: "supported", label: "Supported — the source states this" },
                { id: "overstated", label: "Overstated — the source supports a weaker version" },
                { id: "unsupported", label: "Not supported — the source does not state this" },
              ],
              key: { a: "overstated", b: "supported", c: "unsupported", d: "overstated", e: "supported" },
            },
          ],
        },
        {
          id: "101-m4-l2",
          title: "Gate briefing: what the exam looks like",
          blocks: [
            { type: "paragraph", text: "The certification gate has two parts, both scored automatically, both required for a GO. Part 1 is multiple choice covering this whole course, weighted toward Modules 3 and 4. Part 2 is a claim-adjudication practical: you receive source articles and a candidate summary, and you classify every claim as supported, overstated, or not supported — exactly the exercise you just did, at exam length." },
            { type: "paragraph", text: "The passing standard: at least 85% on the multiple choice, and at least 90% of practical classifications correct. The standard is deliberately close to absolute, because the competency is binary in the world: a person who forwards one unverified claim a week is not 90% safe — they are a person who forwards unverified claims." },
            { type: "list", items: [
              "The planted overstatement reads exactly as confident as the true claims. That is the point.",
              "Guessing from fluency fails; the classifications cannot be produced without going to the sources.",
              "Unverifiable claims must be marked, not forwarded. Forwarding one unverified factual claim is the failure this course exists to prevent.",
            ] },
            { type: "callout", tone: "info", title: "If you NO-GO", text: "Failing is not punitive. You retake on a fresh instance after the waiting period. But the standard does not move — difficulty is not the dial anyone turns for convenience, here or anywhere in the program." },
          ],
        },
      ],
    },
  ],
};
