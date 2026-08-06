import type { Course } from "./types";

export const course501: Course = {
  code: "501",
  slug: "aijl-501",
  title: "Agentic Orchestration",
  rungLabel: "Rung 5 — Autonomous / Multi-Agent",
  track: "core",
  durationDays: 5,
  confers: "AIJL Rung 5",
  gateText: "For most people: recognize and govern — not build.",
  gateSource: "framework",
  summary:
    "Human-on-the-loop. Read multi-agent designs cold, critique autonomy policies for what they actually permit, audit run records for what happened — and catch the drift no single run reveals.",
  prerequisites: ["401"],
  modules: [
    {
      id: "501-m1",
      title: "Day 1 — The Preposition Flips",
      lessons: [
        {
          id: "501-m1-l1",
          title: "Human-on-the-loop",
          blocks: [
            { type: "paragraph", text: "Rung 3 was human-in-the-loop: the process could not proceed without you. Rung 4 kept one hand on the system — the approval gate, exercised before anything irreversible. Rung 5 removes that last synchronous touch. You are human-on-the-loop: no longer a component the loop passes through, but the supervisor it reports to. The whole autonomy story lives in those two prepositions." },
            { type: "paragraph", text: "Control changes tense. At Rung 3 control was before: approve this action. Here it is around — the system operates inside boundaries you set — and after: you account for what it did. The system runs on its own schedule, end to end, and your absence is the feature. But your boundaries are the control: Rung 5 does not remove human judgment, it front-loads it. Every safety property in a Rung 5 system was authored by a human in advance." },
            { type: "callout", tone: "key", title: "The only gate split by role", text: "For most people: recognize and govern — not build. Builders exist, and for them the bar includes construction. That split is the 501/502 boundary, and unlike every other supplemental boundary, it is quoted from the framework itself. 501 is the governance course. Construction is 502." },
            { type: "paragraph", text: "Today you observe the reference pipeline — a working multi-agent system shipped with this course — run a full cycle with no human in it. Watch it work. Then the rest of the week teaches you to govern it." },
          ],
        },
        {
          id: "501-m1-l2",
          title: "The bar is different here: judge from outside",
          blocks: [
            { type: "paragraph", text: "Rungs 1–4 asked you to do. Rung 5 asks you to judge from outside: read an autonomy policy and see what it actually permits — not what it appears to; read an audit trail and reconstruct what happened; look at an output that arrived with no human in its history and know which questions to ask. This is not a consolation prize for non-builders. Systems like this are increasingly things ordinary professionals encounter — a pipeline someone else built, running in their workplace, touching their work. Governing well is the scarce skill." },
            { type: "paragraph", text: "A convenient consequence: because every Rung 5 competency is adjudication rather than production, this is the most adoptable course in the program — documents and a harness, nothing else. The highest rung has the lowest facilitation burden." },
          ],
        },
      ],
    },
    {
      id: "501-m2",
      title: "Day 2 — Reading a Multi-Agent Design",
      lessons: [
        {
          id: "501-m2-l1",
          title: "Why multi-agent, and structural skepticism",
          blocks: [
            { type: "paragraph", text: "Why not one powerful agent? Rung 2's decomposition lesson, promoted: small single-purpose agents beat one do-everything agent — smaller desks, clearer permissions, isolated failures. A pipeline of specialists (gather, draft, fact-check, send) is auditable in a way a monolith never is, because each agent's job, permissions, and handoffs can be read separately." },
            { type: "paragraph", text: "The design pattern with the most governance value: structural skepticism. A fact-check agent whose entire job is doubting the gather agent is more skeptical than one agent grading its own homework — the independence is architectural, not attitudinal. When you read a design, look for it: does anything in this system have the assigned job of doubting? A pipeline with no skeptic is a pipeline that grades its own homework, and a system that grades its own homework still needs someone reading the gradebook. That someone is you." },
            { type: "callout", tone: "info", title: "Permission topology", text: "401's single permission set becomes a topology: only the send agent holds send rights; only the retrieval agent touches the corpus; the fact-checker reads everything and sends nothing. Reading a design cold means producing this map — which agent does what, what each is permitted, where the handoffs are, which agent holds which privileges. Same tools as Rung 3, by the way. Five rungs, one tool set; only the hand on the trigger ever moved." },
          ],
          practice: [
            {
              kind: "classification",
              id: "501-p1",
              title: "Read the design",
              instructions: "Pipeline: GatherAgent (web search, read-only) → DraftAgent (writes brief) → CheckAgent (verifies claims against GatherAgent's sources) → SendAgent (email). Classify each design property.",
              items: [
                { id: "a", text: "SendAgent holds the only send rights in the pipeline." },
                { id: "b", text: "CheckAgent's only job is doubting the other agents' work." },
                { id: "c", text: "DraftAgent also holds send rights 'as a fallback when SendAgent is busy.'" },
                { id: "d", text: "CheckAgent and DraftAgent are the same process with two prompts." },
              ],
              categories: [
                { id: "good", label: "Sound design property" },
                { id: "flaw", label: "Design flaw" },
              ],
              key: { a: "good", b: "good", c: "flaw", d: "flaw" },
            },
          ],
        },
      ],
    },
    {
      id: "501-m3",
      title: "Day 3 — What Replaces the Gate",
      lessons: [
        {
          id: "501-m3-l1",
          title: "Guardrails and the autonomy matrix",
          blocks: [
            { type: "paragraph", text: "With no human present, the Rung 4 approval gate gets written down and automated. Guardrails are hard limits enforced by the system, not a watching human: the send agent physically cannot send to unlisted recipients; the pipeline physically cannot execute an action on the never list. A guardrail that depends on anyone watching is not a guardrail; it is a hope with a dashboard." },
            { type: "paragraph", text: "The autonomy matrix is the load-bearing document: action by action, may do alone / must escalate / must never. It exists because nobody is present to improvise the answer. Drawing the boundaries is the Rung 4 reversibility rule applied to a whole system: stakes and irreversibility say where the lines go. Escalation on trip is not a failure of autonomy — the goal is not 'no humans ever,' it is 'humans exactly when the boundaries say so.'" },
            { type: "callout", tone: "key", title: "Both directions fail", text: "Classifying an irreversible action 'may do alone' is the failure that ships the unsendable email. Classifying everything 'must escalate' produces a system with no autonomy — Rung 4 with extra infrastructure, defeating the point. The gate's construct exercise scores both directions." },
          ],
        },
        {
          id: "501-m3-l2",
          title: "Critiquing a policy: the gap is where governance failures live",
          blocks: [
            { type: "paragraph", text: "The core governance skill, and the harder half of the exam: given a written autonomy policy and a proposed behaviour, determine whether the policy permits it. Policies routinely permit more than their authors believe. 'The system may share findings with authorized partners' permits emailing the brief to any address the system judges to be a partner — did the author mean that? The gap between what a policy appears to permit and what it actually permits is where governance failures live." },
            { type: "paragraph", text: "Read policies adversarially — not hostile to the author, but loyal to the reader who will inherit the consequences. For each clause, ask: what is the worst behaviour this sentence technically allows? If the worst case is unacceptable, the clause is wrong, however reasonable it sounds. Self-correction loops (agents repairing each other's work) raise average quality; they do not replace the audit, and they never excuse a permissive gap." },
          ],
          practice: [
            {
              kind: "classification",
              id: "501-p2",
              title: "Does the policy permit it?",
              instructions: "For each proposed behaviour, determine whether the written policy technically permits it.",
              contextTitle: "Autonomy policy (excerpt)",
              context: [
                { type: "paragraph", text: "The pipeline may distribute completed briefs to stakeholders on the approved distribution list. It may add recipients to the list when they request inclusion. Briefs containing financial projections require review before distribution. The pipeline may not access personnel systems." },
              ],
              items: [
                { id: "a", text: "Emailing a completed brief to a VP who emailed the system last week asking to receive it." },
                { id: "b", text: "Emailing a brief containing next-quarter revenue projections without review." },
                { id: "c", text: "Adding an external consultant to the distribution list after she requests inclusion." },
                { id: "d", text: "Querying the HR database to 'verify a stakeholder's department.'" },
              ],
              categories: [
                { id: "permits", label: "Policy permits it" },
                { id: "forbids", label: "Policy forbids it" },
              ],
              key: { a: "permits", b: "forbids", c: "permits", d: "forbids" },
            },
          ],
        },
      ],
    },
    {
      id: "501-m4",
      title: "Day 4 — The Audit Trail",
      lessons: [
        {
          id: "501-m4-l1",
          title: "Reading well: skim normal runs, drill into anomalies",
          blocks: [
            { type: "paragraph", text: "Observability is the final form of an idea that has been escalating since Rung 3: logging (know that you are logged) → configuration (302) → this. A useful trail captures retrievals, decisions, handoffs, trips, and sends — enough to reconstruct what the system did without having watched it. What the trail must capture is defined by the questions someone will later ask; the auditor is the trail's customer." },
            { type: "paragraph", text: "Reading well is a practice with two halves, and both are the skill. Skim normal runs — pattern-level attention across many runs, sustainable forever. Drill into anomalies — the trip, the unusual destination, the run that took a weird path — all the way to the record's bottom. Only drilling is not sustainable; only skimming is not supervision. The 401 balance, one altitude up." },
          ],
        },
        {
          id: "501-m4-l2",
          title: "Reconstruct, and judge from outside",
          blocks: [
            { type: "paragraph", text: "Reconstruction: given the record alone, state what the system did — what it retrieved, what it decided, what tripped, what shipped. This is the exam's first audit task, and the discipline is loyalty to the record: what the trail shows, not what the system probably did. If the trail does not show it, you do not know it — which is exactly the point of the second skill." },
            { type: "paragraph", text: "Judging an autonomous output from outside: a brief arrives with no human in its history. The questions are always the same — what system produced this, under what policy, with what verification, and where is the record? And the inadequate trail: recognizing when the record cannot answer the question. A system that is not auditable is not answerable, however well it behaves. The gate scores this directly: you will mark governance questions answerable or not answerable from a given record — and 'well behaved but unanswerable' fails." },
          ],
        },
      ],
    },
    {
      id: "501-m5",
      title: "Day 5 — Drift",
      lessons: [
        {
          id: "501-m5-l1",
          title: "Drift: visible only across runs",
          blocks: [
            { type: "paragraph", text: "The last competency, and the one that makes the audit practice necessary. Drift is the slow slide of behaviour away from intent: no rule broken, every run individually fine, the pattern wrong. The framework's worked case: nine of the last ten runs cite the same publication. Nothing violated. The summary has quietly become a single-source digest — and the single source could be anyone, including someone who knows you read it." },
            { type: "paragraph", text: "Why drift is invisible per-run: every individual run passes review. The pattern exists only across runs, which is the entire reason the audit practice exists — a supervisor who reviews runs one at a time cannot see it by construction. Drift detection is the cross-run read: source distributions, output shapes, escalation rates, run durations — what changed slowly while every run looked fine?" },
            { type: "callout", tone: "key", title: "Two-sided, like the good gates", text: "Some exam series contain no drift. Reporting drift reflexively fails alongside missing it — a supervisor who cries drift weekly gets tuned out, and then misses the real one. Only reading across runs distinguishes the two candidates." },
            { type: "paragraph", text: "And the closing move of on-the-loop supervision: tightening a boundary because the record was read. The autonomy matrix gets a new line; the guardrail gets a new rule; the distribution list gets pruned. That adjustment — triggered by evidence, written into the boundaries — is the job. Count the humans in the loop: zero. Count the humans on it: one. That one is the graduate of this course." },
          ],
          practice: [
            {
              kind: "classification",
              id: "501-p3",
              title: "Drift or no drift?",
              instructions: "Each series summarizes ten consecutive pipeline runs. Decide: drift present (and which pattern) or no drift.",
              items: [
                { id: "a", text: "Runs 1–10: sources vary across 12 publications; brief length steady; two runs escalated for missing data." },
                { id: "b", text: "Runs 1–3 cite five different sources. Runs 4–10 cite the same industry blog as primary source; briefs gradually adopt that blog's terminology." },
                { id: "c", text: "Runs 1–10: escalation rate climbs from 1 in 10 to 6 in 10 as source coverage shrinks; the gather agent increasingly returns partial results." },
                { id: "d", text: "Runs 1–10: run duration rises 15% after a provider announced longer reasoning traces; outputs unchanged in content and sources." },
              ],
              categories: [
                { id: "none", label: "No drift" },
                { id: "source-narrowing", label: "Drift — source narrowing" },
                { id: "capability-decay", label: "Drift — capability decay" },
                { id: "benign-change", label: "No drift — benign environmental change" },
              ],
              key: { a: "none", b: "source-narrowing", c: "capability-decay", d: "benign-change" },
            },
          ],
        },
        {
          id: "501-m5-l2",
          title: "Gate briefing: what the exam looks like",
          blocks: [
            { type: "paragraph", text: "Part 1: multiple choice across the week. Part 2A, policy adjudication: construct an autonomy matrix for a described system (may / escalate / never — both directions fail), then critique a written policy (does it permit each proposed behaviour?). Part 2B, audit adjudication: a series of run records — reconstruct specified runs, mark governance questions answerable or not from the record, and determine whether drift is present and which pattern. Standard: ≥85% MC, ≥90% across the practicals." },
            { type: "paragraph", text: "401 certifies that you review what the system produced. 501 certifies that you can tell whether the system answers to anyone — including when the answer is no." },
          ],
        },
      ],
    },
  ],
};
