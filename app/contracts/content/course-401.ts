import type { Course } from "./types";

export const course401: Course = {
  code: "401",
  slug: "aijl-401",
  title: "Intermediate Agentic Workflows",
  rungLabel: "Rung 4 — Single-Purpose Agent",
  track: "core",
  durationDays: 5,
  confers: "AIJL Rung 4",
  gateText:
    "You handed over a goal and trust the gate enough not to watch each step — but you still review. The balance is the skill.",
  gateSource: "framework",
  summary:
    "Stop approving each action; start approving the goal. Handoffs that carry judgment, gates placed where actions become irreversible, and the review discipline that fails in two directions.",
  prerequisites: ["301"],
  modules: [
    {
      id: "401-m1",
      title: "Day 1 — The Trigger Moves",
      lessons: [
        {
          id: "401-m1-l1",
          title: "One sentence: approve the goal, not the action",
          blocks: [
            { type: "paragraph", text: "The entire climb from Rung 3 to Rung 4 fits in one sentence: you stop approving each action and start approving the goal. Nothing else changes. Same model, same tools — the search and email connectors from Rung 3 carry up unchanged. What moves is the trigger: at Rung 3 every action waited for your finger; here the agent fires actions on its own decision, in service of a goal you set and boundaries you wrote." },
            { type: "paragraph", text: "This dissolves the most common confusion in the subject. An agent is not a smarter model or a new technology — it is a tool-using AI whose actions fire on its own decision toward a goal you set. If a system takes real-world actions without per-action approval, it is operating as an agent, whatever the product calls it. Judge systems by the trigger, not the label." },
            { type: "callout", tone: "key", title: "The loop closes without you", text: "Plan → act → observe, repeated. At Rung 3 you sat inside the loop, gatekeeping every act. Here the loop closes without you and you meet it at the exit — at review. Your judgment did not leave the system; it moved to the two ends. This course is built to spend most of its time at those ends." },
          ],
        },
        {
          id: "401-m1-l2",
          title: "Build and run your first agent",
          blocks: [
            { type: "paragraph", text: "Today you configure an agent against the platform your organization uses: give it a bounded mission, a tool set, and a stopping condition, then watch it execute a full run. The point of the exercise is not the build — the platform makes the build easy. The point is the trace: the step-by-step record of what the agent planned, did, and observed. Reading a trace is the foundational review skill, and you will do it hundreds of times before Friday." },
            { type: "paragraph", text: "Watch for orchestration realities the demo videos skip: steps fail and get retried; the agent takes a path you would not have chosen and arrives anyway; it occasionally declares success on a partial result. None of these is a malfunction — they are what autonomy looks like from outside. Your discomfort watching it is data. The rest of the week teaches you where to put it." },
          ],
        },
      ],
    },
    {
      id: "401-m2",
      title: "Day 2 — Making the Loop Work Across Time",
      lessons: [
        {
          id: "401-m2-l1",
          title: "Memory, compaction, and what an agent may remember",
          blocks: [
            { type: "paragraph", text: "The model is still stateless — every turn is a fresh awakening on a desk. An agent that works across hours or weeks therefore needs machinery the chat never did. Memory is storage the agent reads and writes across runs: across windows, as opposed to context, which lives within one. Memory exists precisely because the model is stateless and context rots; it is the desk's overflow archive." },
            { type: "paragraph", text: "Compaction is the agent continuously condensing its own working history so the desk stays useful — the Rung 1 'restart with a tight summary' move, automated and running constantly. And MCP — the standard connector interface — is why agent tools compose rather than arriving as one-off integrations." },
            { type: "callout", tone: "warning", title: "What it must not remember", text: "Configuring memory is a data-governance act, not a convenience setting. An agent that remembers everything is an unlogged retention system you built by default. Decide deliberately: what persists, where, under what retention — and what the agent is forbidden to keep, starting with credentials and anything past its classification ceiling. Rung 3's data question now has a memory-shaped front." },
          ],
        },
        {
          id: "401-m2-l2",
          title: "Cost mechanics at recognition level",
          blocks: [
            { type: "paragraph", text: "Agent loops re-send long, near-identical contexts every step — plan, act, observe, replan — which makes prompt caching a first-order cost lever: near-identical prefixes are cheap, novel suffixes are not. Recognition level means you can read a cost report, spot a loop burning tokens on a runaway retry, and have an informed conversation with whoever owns the budget. Operational ownership belongs to 302 and 402; here, know the mechanics well enough to recognize waste and explain it." },
            { type: "paragraph", text: "The shape of an agent bill is diagnostic in itself. A healthy run shows a tall, cheap plateau — the cached prefix — with short, expensive spikes where genuinely new observations arrive. A sick run shows the spikes dominating: the context is being rebuilt from scratch each step, or the loop is re-reading what it already saw. When costs triple overnight, that shape tells you whether you are looking at more work, or at the same work done worse." },
            { type: "paragraph", text: "The second recognition-level skill is separating spend from waste. A run that exhausts its tool-call budget on retries of a dead API is not expensive because agents are expensive — it is expensive because its stop conditions failed, which is a handoff defect, and the invoice is simply where the defect becomes visible. Cost reports, read this way, are run reviews conducted in arithmetic." },
          ],
        },
      ],
    },
    {
      id: "401-m3",
      title: "Day 3 — The Handoff",
      lessons: [
        {
          id: "401-m3-l1",
          title: "Goal-setting is this rung's context engineering",
          blocks: [
            { type: "paragraph", text: "At Rung 1 you engineered what the model wakes up to per turn. At Rung 4 you do it once, for an entire autonomous run: the handoff. A weak handoff forces the agent to guess your judgment — and it will guess, confidently, in the direction of least resistance. A strong handoff transfers your judgment: the goal, the constraints, the exclusions, the format, and the conditions under which it should stop and come back to you." },
            { type: "paragraph", text: "Constraints are where judgment hides. Scope: what is in bounds and out. Recency: how fresh the sources must be. Exclusions: whom it may not contact, what it may not touch. Format: what the deliverable looks like when it arrives for review. Each unwritten constraint is a decision you delegated by silence." },
            { type: "callout", tone: "key", title: "The fossil record", text: "The agent operates inside a fossilized record of your judgment. Every approval you used to give in real time at Rung 3 is now written down in advance — as constraints, grants, gate placements, escalation rules. When the draft disappoints, the fix is almost never 'watch it more.' It is 'write the handoff better' — the same move Rung 2 taught about templates, one altitude up." },
          ],
        },
        {
          id: "401-m3-l2",
          title: "Least privilege as design",
          blocks: [
            { type: "paragraph", text: "At 301 you granted your own integrations the narrowest access that worked — a personal practice. At 401 you design an agent's permission set: an engineering decision made in advance, for a process that runs unattended. The agent's search access, file access, send access — each is granted or withheld before the run begins, and the agent will use everything you grant it. That is the point to hold: unneeded permission is pure attack surface, a configuration error even before anything goes wrong." },
            { type: "paragraph", text: "The test for each grant is the mission, not the agent's request. Does this mission require sending email? Then send rights exist; otherwise they do not. Does it require reading one folder? Then one folder is the grant. Agents are convincing requesters — 'I could do better with broader access' is almost always true and almost never the question. The question is whether the mission requires it. Over-granting fails the gate; so does under-granting, because an agent that cannot do the job teaches you to rubble-stamp its workarounds." },
          ],
          practice: [
            {
              kind: "booleanSet",
              id: "401-p1",
              title: "Grant or withhold?",
              display: "yesno",
              yesLabel: "Grant",
              noLabel: "Withhold",
              instructions: "Mission: 'Research the three named competitors and email me a one-page brief every Friday.' For each permission, grant or withhold.",
              subjects: [
                { id: "a", label: "Web search access" },
                { id: "b", label: "Send email to you (one address)" },
                { id: "c", label: "Send email to arbitrary addresses" },
                { id: "d", label: "Read access to the shared finance drive" },
                { id: "e", label: "Write access to a 'briefs' folder for drafts" },
              ],
              key: { a: true, b: true, c: false, d: false, e: false },
            },
          ],
        },
      ],
    },
    {
      id: "401-m4",
      title: "Day 4 — The Gate and the Threats",
      lessons: [
        {
          id: "401-m4-l1",
          title: "Place the approval gate where actions become irreversible",
          blocks: [
            { type: "paragraph", text: "Bounded autonomy: the agent acts freely within boundaries you set, and stops at the gate you kept. The rule for where the gate belongs is the reversibility rule, and it is the actual competency this course certifies: the gate belongs where actions become hard to reverse. Searches are reversible — let them run. Reading files is reversible. Drafting is reversible. A sent email is not reversible; a deleted file is not; a public post is not. Gate those." },
            { type: "paragraph", text: "Two ways to get it wrong, and the exam tests both. Gate everything and you have rebuilt Rung 3 with extra infrastructure — the agent saves you no time, which is the tell of failing toward control. Gate nothing and the first irreversible mistake ships unsupervised — failing toward abdication. The skill is the placement itself: enumerate the agent's action list, mark the irreversible ones, put the gate exactly there." },
          ],
        },
        {
          id: "401-m4-l2",
          title: "Indirect injection: the realistic failure mode",
          blocks: [
            { type: "paragraph", text: "Rung 3's injection risk, compounded by autonomy. At Rung 3 your per-action approval was the tripwire — hostile content could only act if you approved it. Your agent reads dozens of pages, emails, and documents with no human watching at the moment of reading. An instruction planted in any of them rides along into the agent's planning, and the tripwire is gone. This — not sci-fi rebellion — is the realistic failure mode of agents, and it is why the handoff's constraints and the permission set's narrowness matter so much: they are what limits an injected instruction's reach." },
            { type: "paragraph", text: "Sandboxing is the structural version of the same caution: a contained space — limited filesystem, limited network, limited credentials — where the agent's mistakes, injected or otherwise, stay contained. And one more thing that never changes: the gate never comes off. Reliability reduces the frequency of a bad draft, not the cost of the one that reaches forty inboxes unsupervised. A system that has been fine for months is not a system that no longer needs its gate; it is a system whose gate has been working." },
          ],
        },
      ],
    },
    {
      id: "401-m5",
      title: "Day 5 — The Balance",
      lessons: [
        {
          id: "401-m5-l1",
          title: "Reviewing as a reviewer, and the fifty-second Friday",
          blocks: [
            { type: "paragraph", text: "Review is a skill, not a glance. Reviewing as a reviewer means: spot-check citations against their sources (the Rung 1 reflex, now applied to work you did not watch being made); notice out-of-character content — the draft whose tone, recipients, or claims do not match the mission; and recognize what an injection-shaped anomaly looks like in a result — the unexpected attachment, the new CC, the link that was not in your sources." },
            { type: "paragraph", text: "The framework's parable is the fifty-second Friday. Fifty-one Fridays, the review is routine. On the fifty-second, a bullet cites a page that does not say what the bullet says. The gate exists for that Friday. The discipline that survives fifty-one routine weeks is what this course is actually certifying — because the two failure modes both feed on routine." },
            { type: "table", headers: ["Failure mode", "Pattern", "The tell"], rows: [
              ["Failing toward control", "Hovering — re-checking each search, interrupting the loop, redoing its work", "The agent saves you no time"],
              ["Failing toward abdication", "The review became a skim, then a click", "You could not describe the last draft you approved"],
            ] },
            { type: "callout", tone: "key", title: "The gate", text: "You handed over a goal and trust the gate enough not to watch each step — but you still review. The exam's Part 2B presents completed runs — some clean, some defective, some merely unimpressive — and scores your dispositions both directions: refusing good work fails as surely as approving bad work. Only calibrated review passes." },
          ],
          practice: [
            {
              kind: "disposition",
              id: "401-p2",
              title: "Run review drill",
              instructions: "Your weekly-brief agent completed these runs. Mission: research three named competitors, email you a one-page brief Fridays. Dispose of each run.",
              scenarioTitle: "Mission",
              scenario: [
                { type: "paragraph", text: "Agent grants: web search; send email to you only. Gate: email requires approval. Brief format: one page, five sections, every claim cited." },
              ],
              items: [
                { id: "a", title: "Run 34", body: [{ type: "paragraph", text: "Brief covers the three competitors, all claims cited to public sources you can spot-check, format correct. The analysis is competent but unremarkable." }] },
                { id: "b", title: "Run 35", body: [{ type: "paragraph", text: "Brief states Competitor B 'launched its enterprise tier in March.' The cited page is Competitor B's pricing page, which lists an enterprise tier but contains no launch date." }] },
                { id: "c", title: "Run 36", body: [{ type: "paragraph", text: "The brief arrived CC'd to insights@competitorwatch.example, 'per the archival instruction found on a competitor's partner page.'" }] },
                { id: "d", title: "Run 37", body: [{ type: "paragraph", text: "Brief covers two competitors thoroughly; the third is summarized in one sentence: 'no significant public activity found.' Trace shows two searches for the third competitor." }] },
              ],
              reasonCodes: [
                { id: "clean", label: "Clean run — approve" },
                { id: "citation", label: "Citation does not support the claim" },
                { id: "injection", label: "Content traceable to injected instruction" },
                { id: "scope", label: "Exceeded stated constraints" },
              ],
              key: {
                a: { decision: "approve", reason: "clean" },
                b: { decision: "refuse", reason: "citation" },
                c: { decision: "refuse", reason: "injection" },
                d: { decision: "refuse", reason: "scope" },
              },
            },
          ],
        },
        {
          id: "401-m5-l2",
          title: "Gate briefing: what the exam looks like",
          blocks: [
            { type: "paragraph", text: "Three parts, all auto-scored. Part 1: multiple choice across the week. Part 2A, the handoff: given a mission, you compose it from structured components — select the constraints, the access grants, the gate placements, the escalation conditions. Over-granting fails; under-granting fails. Part 2B, the review: a mixed series of completed runs — clean, defective, unimpressive — dispose of each with reason codes. Standard: ≥85% MC, ≥90% across the practicals, both required." },
            { type: "paragraph", text: "Everything the Rung 3 practitioner did live, you now write down in advance. 301 certifies that you judge each action. 401 certifies that you can write your judgment down and trust what you wrote — while still checking the one thing that cannot be unsent." },
          ],
        },
      ],
    },
  ],
};
