import type { Course } from "./types";

export const course201: Course = {
  code: "201",
  slug: "aijl-201",
  title: "Advanced AI Prompting",
  rungLabel: "Rung 2 — Prompt Workflows",
  track: "core",
  durationDays: 1,
  confers: "AIJL Rung 2",
  gateText: "You reuse instead of rewriting — and you feel the copy-paste friction.",
  gateSource: "framework",
  summary:
    "From single prompts to pipelines: decomposition, templates, structured output, chaining by hand — and discovering, by counting, exactly where your judgment goes.",
  prerequisites: ["101"],
  modules: [
    {
      id: "201-m1",
      title: "Module 1 — The Trigger and the Decomposition",
      subtitle: "When repetition becomes a workflow",
      lessons: [
        {
          id: "201-m1-l1",
          title: "The third time you type the same request",
          frameworkRef: "02-prompt-workflows/README.md",
          blocks: [
            { type: "paragraph", text: "Rung 2 does not begin with a new tool or a new technique. It begins with a feeling: you are typing a request you have typed before. The first time you summarized a weekly report, that was Rung 1 work. The second time, a mild sense of déjà vu. The third time, the framework says, the rung has changed — you are no longer doing a task, you are performing a routine, and a routine that lives only in your head is a routine you will re-derive, slightly differently, forever." },
            { type: "paragraph", text: "The tell is repetition of shape, not of content. The report changes every week; the way you ask does not. That stable shape is an asset you are currently carrying around unredeemed — every refinement you discovered last week ('shorter', 'lead with the risk', 'not for the director, for the whole department') evaporates unless it lands somewhere permanent." },
            { type: "callout", tone: "key", title: "The gate, first half", text: "You reuse instead of rewriting. If every week starts from a blank chat, you are still at Rung 1 with good habits — faster, but carrying the same load. Rung 2 is the rung where improvements stop evaporating." },
            { type: "paragraph", text: "This lesson's discipline is simply noticing. For one week, log every AI request you make more than twice. The log is your pipeline inventory: each recurring request is a candidate for everything else in this course." },
          ],
        },
        {
          id: "201-m1-l2",
          title: "Decomposition: name the stages",
          frameworkRef: "Rung 2 competency 1",
          blocks: [
            { type: "paragraph", text: "A recurring task decomposes. 'Produce the weekly brief' is not one act — it is gather the inputs, extract what changed, draft the summary, check it against the sources, format it for the reader. Naming those stages explicitly is the first skill of this rung, because everything downstream — templates, chaining, eventually tools and agents — works on stages, not on the whole undifferentiated blob." },
            { type: "paragraph", text: "Why not one mega-prompt that does everything? Because a sprawling prompt fails sprawling: when the output disappoints, you cannot tell which stage failed, so you cannot fix it — you can only re-roll the whole thing and hope. Small single-purpose prompts isolate failure, and isolated failure is fixable failure. This is the same logic the framework applies to agents three rungs from now: small beats monolithic, at every altitude." },
            { type: "list", items: [
              "Test of a good decomposition: each stage has one input, one output, and one way to tell it went wrong.",
              "If a stage's output feeds the next stage, its shape must be predictable — that is Module 2's whole subject.",
              "Stages that contain no decision are candidates for elimination or automation. Stages that are all decision are where you live.",
            ] },
            { type: "paragraph", text: "Decompose one of your logged routines from the last lesson right now — on paper, in three to six stages. You will build this pipeline across the rest of the course, and the gate exam runs against it." },
          ],
          practice: [
            {
              kind: "classification",
              id: "201-p1",
              title: "Stage or not?",
              instructions: "A student decomposed 'turn meeting notes into a client-ready summary.' Classify each proposed stage: well-formed (one input, one output, identifiable failure) or poorly formed.",
              items: [
                { id: "a", text: "Extract decisions and action items from the raw notes into a fixed list format." },
                { id: "b", text: "Make the summary good." },
                { id: "c", text: "Draft the client summary from the extracted list, in the client's preferred structure." },
                { id: "d", text: "Check the draft against the notes and also do any follow-up research that seems needed." },
              ],
              categories: [
                { id: "well", label: "Well-formed stage" },
                { id: "poor", label: "Poorly formed" },
              ],
              key: { a: "well", b: "poor", c: "well", d: "poor" },
            },
          ],
        },
      ],
    },
    {
      id: "201-m2",
      title: "Module 2 — Templates and Structure",
      subtitle: "Making improvements permanent",
      lessons: [
        {
          id: "201-m2-l1",
          title: "Templates: refine the template, not the answer",
          frameworkRef: "Rung 2 competency 2",
          blocks: [
            { type: "paragraph", text: "A template is a saved prompt with slots: the fixed scaffolding of your request, with gaps where this week's material goes. 'Summarize the following report for [AUDIENCE], in [FORMAT], leading with [PRIORITY]. Report: [INPUT].' Everything you learned in Rung 1 about context-rich prompting gets written down once, and from then on you fill slots instead of re-deriving phrasing." },
            { type: "paragraph", text: "The discipline that defines the rung is where fixes go. When output disappoints, the Rung 1 move is to patch the answer; the Rung 2 move is to patch the template. Patching the answer fixes this week. Patching the template fixes every week after — the fix is permanent because it is stored. A student who keeps editing outputs by hand while their template stays broken has understood nothing, however good their outputs look." },
            { type: "callout", tone: "key", title: "Real slots, not hardcoding", text: "The difference between a template and a saved answer is parameterization. If last week's subject matter is baked into the prompt text, you have a fossil, not a tool — it will pass on familiar material and fail the moment the domain changes. The gate tests exactly this: your templates run against a novel domain, and only genuinely parameterized ones survive the swap." },
            { type: "paragraph", text: "Build now: convert the pipeline you decomposed into one template per stage. Keep them somewhere durable and portable — a notes file, a repository, anywhere that is not the chat itself. You will carry these into the certification gate." },
          ],
        },
        {
          id: "201-m2-l2",
          title: "Structured output: exact shapes, on purpose",
          frameworkRef: "Rung 2 competency 4",
          blocks: [
            { type: "paragraph", text: "A pipeline stage can only consume the previous stage's output if that output has a predictable form. 'Give me a summary' produces a different creature every run; 'give me exactly four fields — DECISION, OWNER, DATE, RISK — one line each, in that order' produces something the next stage can rely on, and something you can check mechanically. Structure is what makes chaining possible at all; the framework is explicit about this." },
            { type: "paragraph", text: "Structured output is also a verification lever. A mandated shape is a contract you can audit: if a field is missing, misordered, or padded, you know instantly — the failure is visible at a glance in a way that prose failures never are. This is why the gate's practical mandates a schema and validates your outputs against it byte-for-byte: schema conformance is machine-checkable evidence that your pipeline is real." },
            { type: "list", items: [
              "Name the fields, fix the order, fix the count. Vague structure is not structure.",
              "One line per field beats prose for anything another stage must consume.",
              "If a stage's output keeps breaking the next stage, the fix is almost always upstream: tighten the producing template's format instructions.",
            ] },
            { type: "paragraph", text: "Update your stage templates now: each one specifies its output shape exactly. The gate publishes the required schema in advance precisely so you can build toward it." },
          ],
          practice: [
            {
              kind: "classification",
              id: "201-p2",
              title: "Structured enough to chain?",
              instructions: "For each output specification, decide: can the next stage reliably consume it?",
              items: [
                { id: "a", text: "Four labelled fields, one per line, fixed order: DECISION / OWNER / DATE / RISK." },
                { id: "b", text: "A clear, well-organized summary of the key points." },
                { id: "c", text: "A table with columns Item, Status, Blocker — one row per action item, no preamble." },
                { id: "d", text: "Whatever format best suits the content." },
              ],
              categories: [
                { id: "chainable", label: "Chainable — predictable form" },
                { id: "not", label: "Not chainable" },
              ],
              key: { a: "chainable", b: "not", c: "chainable", d: "not" },
            },
          ],
        },
        {
          id: "201-m2-l3",
          title: "Context engineering, named",
          frameworkRef: "Vocabulary, Context pillar",
          blocks: [
            { type: "paragraph", text: "What you have been doing all course has a formal name: context engineering — the discipline of deciding what the model wakes up to. At Rung 1 you practised it per-turn, by hand, on the desk. A template is a context-engineering artifact: a frozen, reusable decision about what goes on the desk for this class of task. The vocabulary matters because it converts a bag of tricks into a practice you can reason about, teach, and improve." },
            { type: "paragraph", text: "The Rung 1 lessons all still apply, now at template scale. Context rot does not retire because your prompt is saved: a template that pastes three reference documents where two are near-miss distractors rots on schedule, every run. Desk hygiene becomes template hygiene — curate what the template injects, keep it minimal, keep it current." },
            { type: "callout", tone: "info", title: "Judgment relocates, it does not retire", text: "At Rung 1 you verified each answer. At Rung 2 you verify the system: does the pipeline, run on unfamiliar input, still produce checkable truth? The reflex from the 101 gate is now applied one level up — spot-check the pipeline's outputs against sources, especially right after any template change. A template regression is a truth regression on every future run." },
          ],
        },
      ],
    },
    {
      id: "201-m3",
      title: "Module 3 — You Are the Wiring",
      subtitle: "The friction, felt and counted",
      lessons: [
        {
          id: "201-m3-l1",
          title: "Chaining by hand",
          frameworkRef: "Rung 2 competency 3",
          blocks: [
            { type: "paragraph", text: "With templates built and outputs structured, you can now run the whole pipeline: paste input into stage one, carry its output to stage two, and so on to the end. Notice what the connective tissue is. It is you. Your clipboard, your judgement of when a stage is done, your hands moving text between chats. The framework's name for this is exact: you are the wiring." },
            { type: "paragraph", text: "Do it now — run your pipeline end to end on one real input, and while you do, count. Count every copy-paste, every window switch, every time you carry something from one place to another without changing it. The framework's own worked example ends at seven manual transfers per week. Whatever your number is, write it down; the next lesson is about what it means." },
          ],
        },
        {
          id: "201-m3-l2",
          title: "Two minutes of judgment, seven transfers of transport",
          frameworkRef: "02-prompt-workflows/in-practice.md",
          blocks: [
            { type: "paragraph", text: "Here is the analysis at the heart of this course, and the heart of its gate. Look at your counted transfers and separate them into two piles. Judgment: evaluating, deciding, approving — the moments where you contributed something only you could contribute. Mechanical transport: copying, pasting, reformatting, moving — moments where you were a cable." },
            { type: "paragraph", text: "In the framework's worked example, the split lands at roughly two minutes of judgment against seven manual transfers containing no decision at all. Almost everything the practitioner does in their own pipeline is transport. The routine feels substantial because it fills time; analyzed, it is two minutes of human contribution wrapped in manual data movement." },
            { type: "callout", tone: "key", title: "The gate, second half", text: "You feel the copy-paste friction — precisely. Not 'AI could be better somehow,' but the ability to look at your routine and point at exactly which parts are judgment and which are transport passing through your hands. If the routine feels fine and complete, you are not ready for Rung 3, because you will not understand what problem tools solve. The friction is the tuition; the gate confirms it was paid." },
            { type: "paragraph", text: "This is also the moment the rest of the ladder snaps into focus. Rung 3 — tools, connectors, agents — exists to delete the transport pile. But the judgment pile does not shrink as transport is automated; it relocates and intensifies. Someone still evaluates, decides, and approves — now at the speed the machine sets. A student who cannot already see their two minutes clearly will lose them entirely inside an automated system." },
          ],
          practice: [
            {
              kind: "classification",
              id: "201-p3",
              title: "Judgment or transport?",
              instructions: "Classify each step of this weekly-brief pipeline. This is the exact shape of Part 2B of the certification gate.",
              contextTitle: "Reference pipeline",
              context: [
                { type: "paragraph", text: "Weekly brief pipeline: (1) Open last week's brief and copy its structure. (2) Paste this week's three source reports into the extraction template. (3) Read the extracted changes and decide which two lead the brief. (4) Copy the extraction output into the drafting template. (5) Review the draft against the source reports — confirm every figure. (6) Reformat the draft's table to match house style by hand. (7) Approve and send to the distribution list." },
              ],
              items: [
                { id: "a", text: "Step 1 — Copy last week's structure." },
                { id: "b", text: "Step 2 — Paste sources into the template." },
                { id: "c", text: "Step 3 — Decide which two changes lead." },
                { id: "d", text: "Step 4 — Carry extraction output to the drafting template." },
                { id: "e", text: "Step 5 — Verify every figure against sources." },
                { id: "f", text: "Step 6 — Reformat the table by hand." },
                { id: "g", text: "Step 7 — Approve and send." },
              ],
              categories: [
                { id: "judgment", label: "Judgment — evaluating, deciding, approving" },
                { id: "transport", label: "Mechanical transport" },
              ],
              key: { a: "transport", b: "transport", c: "judgment", d: "transport", e: "judgment", f: "transport", g: "judgment" },
            },
          ],
        },
        {
          id: "201-m3-l3",
          title: "Gate briefing: what the exam looks like",
          blocks: [
            { type: "paragraph", text: "Three parts, all auto-scored, all required. Part 1: multiple choice across the whole course, weighted toward templates, structure, and the judgment/transport split. Part 2A: five novel inputs — from a domain you have not seen — run through your own templates, with outputs validated against a published schema and a content key. Part 2B: judgment/transport classification on a provided reference pipeline, like the exercise you just did." },
            { type: "paragraph", text: "Why five inputs, and why a novel domain? A single task can be improvised; five consistent outputs cannot. And a hardcoded 'template' passes on familiar material and fails on unfamiliar — the domain swap is the machine-checkable proof that your slots are real slots. Bring templates that are genuinely parameterized, or do not bother sitting the gate." },
            { type: "list", items: [
              "Standard: ≥85% MC, ≥90% across the practicals, both required.",
              "The schema is published in advance — build toward it.",
              "Your templates are the instrument. Arriving with nothing built means there is nothing to test.",
            ] },
          ],
        },
      ],
    },
  ],
};
