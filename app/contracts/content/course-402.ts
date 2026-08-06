import type { Course } from "./types";

export const course402: Course = {
  code: "402",
  slug: "aijl-402",
  title: "AI DevSecOps",
  rungLabel: "Rung 4+ — Supplemental",
  track: "supplemental",
  durationDays: 5,
  confers: "AIJL Rung 4+",
  gateText:
    "You can contain an agent against injection — and you can state its blast radius if it is fully compromised.",
  gateSource: "authored",
  summary:
    "For operators. Assume the agent will be compromised: identity, privilege, containment, injection defense, detection, and response — and the blast-radius answer that separates securing from hoping.",
  prerequisites: ["401", "302"],
  modules: [
    {
      id: "402-m1",
      title: "Day 1 — Assume Compromise",
      lessons: [
        {
          id: "402-m1-l1",
          title: "The agent is the target, not the model",
          blocks: [
            { type: "paragraph", text: "This course opens with one assumption, stated on hour one and never relaxed: the agent will be compromised. Everything else follows from designing for that. And the threat model matters first: an attacker wants the agent, not the model, because the agent is where capability lives — tools, credentials, destinations, standing permission to act. A compromised chat model produces bad text. A compromised agent sends your data somewhere, with your permissions, at machine speed." },
            { type: "paragraph", text: "The attack vector you already know: injection. At 401 you learned it as the realistic failure mode. Here the operator's version: injection is not a bug to patch; it is a property of the architecture. The model reads retrieved content the same way it reads instructions — no filter fixes that, because the confusion is the mechanism. Defense is therefore containment and detection, not a better filter. Products that promise to 'solve injection' are selling the filter story; you were trained to know better." },
            { type: "callout", tone: "warning", title: "Jailbreak ≠ injection", text: "Frequently confused, defended differently. A jailbreak is the user subverting the model — coaxing it past its guidelines. Injection is third-party content subverting the model against the user. Your agents face the second. Defenses aimed at the first do nothing for the second, and an audit that conflates them certifies the wrong thing." },
            { type: "paragraph", text: "So the primary design question is never 'can it be compromised?' — assume yes. It is: what happens when it is? That is blast radius, and it is the question this entire course answers. Today you threat-model a running agent end to end: inputs, tools, credentials, outputs, destinations." },
          ],
        },
        {
          id: "402-m1-l2",
          title: "Scope: the narrowest course in the program",
          blocks: [
            { type: "paragraph", text: "402 is bounded on three sides, and knowing the boundaries is half of taking the course. Below you: 401 selected an agent's permission set and understood indirect injection — 402 builds and administers the systems that make those true. Beside you: 302 runs the stack and operates the vault — 402 threat-models what 302 built and adds defense and detection. Above you: guardrails, autonomy policy, audit trails, and multi-agent architecture are Rung 5 constructs. 402 does not touch them. Its world is a single-purpose agent with bounded autonomy and an approval gate — securing that." },
            { type: "table", headers: ["Concept", "Established below", "402 does"], rows: [
              ["Least privilege", "Select the permission set for one agent (401)", "Administer the identity and permission system — roles, service accounts, token lifecycle, revocation"],
              ["Sandboxing", "Knows it exists (401, recognition)", "Builds the containment — filesystem isolation, egress policy, resource limits"],
              ["Indirect injection", "Recognizes it as the failure mode (401)", "Defends structurally — provenance, allowlisting, instruction/data separation, output filtering, detection"],
              ["Secrets", "302 runs the vault", "Threat-models it — rotation under compromise, blast radius of a leaked token, misuse detection"],
              ["Logging", "302 configures it", "Builds detection on top of it"],
            ] },
            { type: "paragraph", text: "One topic gets its first real home here: data poisoning — corrupting a retrieval corpus. It appeared in the Rung 3 vocabulary and nowhere in the core track's practical work, because defending a corpus is an operator's job. It is yours now." },
          ],
        },
      ],
    },
    {
      id: "402-m2",
      title: "Day 2 — Identity and Privilege",
      lessons: [
        {
          id: "402-m2-l1",
          title: "Agent identity: never a borrowed human's",
          blocks: [
            { type: "paragraph", text: "An agent must act as itself. Service accounts and workload identity give the agent its own principal — its own credentials, its own grants, its own audit trail. The forbidden pattern is an agent inheriting a human's credentials: the agent then has everything the human has (usually far more than the mission needs), every action is logged against a person who did not take it, and revoking the agent means breaking the human. Identity is where least privilege stops being a selection exercise and becomes administration." },
            { type: "paragraph", text: "Scoped grants, enforced at the system: the permission set a 401 practitioner selects must be enforced where the agent cannot talk its way past it — at the identity provider, the proxy, the tool layer. Configuration the agent can influence is a suggestion. Configuration enforced below it is a control." },
          ],
        },
        {
          id: "402-m2-l2",
          title: "Token lifecycle: the drill that matters is revocation",
          blocks: [
            { type: "paragraph", text: "Tokens have a lifecycle — issuance, scope, expiry, rotation, revocation — and every stage is a control surface. Short expiry limits the value of a leaked token. Rotation limits the window. But the drill that matters is revocation under active compromise: kill the agent's credentials now, while it is mid-run with an attacker's instructions, and have the system survive it. Teams discover during their first real incident that revocation 'works in the console' but the agent caches the token, or the retry loop re-authenticates through a backdoor integration nobody remembered. Drill it before you need it." },
            { type: "paragraph", text: "Secrets threat modeling is the vault's other side: 302 runs the vault; you assume a token leaked and work out what it reaches. A scoped, expiring token answers 'not much'; a broad, standing one answers 'everything, indefinitely.' And the recurring practice that finds the commonest real-world problem: privilege review. Permissions accrete — every incident, every 'temporary' grant, every scope added under deadline and never removed. Accreted permission is the most common finding in real reviews, and the only cure is a calendar, not a feeling." },
          ],
          practice: [
            {
              kind: "classification",
              id: "402-p1",
              title: "Find the identity defect",
              instructions: "Each configuration describes an agent's identity/privilege posture. Classify the primary defect (or none).",
              items: [
                { id: "a", text: "The research agent authenticates as its owner's user account 'because SSO was easier.' Grants: full drive read, send as the owner." },
                { id: "b", text: "Service account, scoped to the project folder, 24-hour token expiry, rotation automated." },
                { id: "c", text: "Service account scoped correctly, but its token has no expiry and no documented revocation procedure." },
                { id: "d", text: "The agent's send scope was broadened to all-staff during an incident in March. It is now October; the scope remains." },
              ],
              categories: [
                { id: "identity", label: "Agent on human credentials" },
                { id: "clean", label: "No defect" },
                { id: "lifecycle", label: "Token lifecycle gap" },
                { id: "accretion", label: "Accreted permission" },
              ],
              key: { a: "identity", b: "clean", c: "lifecycle", d: "accretion" },
            },
          ],
        },
      ],
    },
    {
      id: "402-m3",
      title: "Day 3 — Containment",
      lessons: [
        {
          id: "402-m3-l1",
          title: "Building the sandbox",
          blocks: [
            { type: "paragraph", text: "Containment turns 'assume compromise' from a slogan into an architecture. Filesystem isolation: the agent sees only its working directories. Process isolation: it cannot reach other processes or their memory. Resource limits: a runaway loop — or an attacker's crypto-miner — hits a ceiling. These are constructive skills, and you build them on live systems today: no exercise in this course executes an attack." },
            { type: "paragraph", text: "Egress control is the single highest-value control in agentic security, and it deserves the emphasis. An agent that cannot open arbitrary network connections cannot exfiltrate — the attacker's instructions may execute perfectly inside the sandbox and have nowhere to send the loot. Allowlist destinations; deny by default; log every refused connection, because refused egress is your earliest compromise signal." },
            { type: "callout", tone: "key", title: "Containment fails at the seams", text: "The classic defeat paths: a sandbox that shares a credential with an unsandboxed system; a mounted path that bridges inside and outside; one permissive egress rule added 'for debugging' that reopens everything. The gate's defect hunt always includes a seam failure — because real ones do." },
          ],
        },
        {
          id: "402-m3-l2",
          title: "Designing the blast radius deliberately",
          blocks: [
            { type: "paragraph", text: "Blast radius is not discovered after an incident; it is designed before one. The procedure: enumerate everything a fully compromised agent could reach — every asset, every action, every destination — then shrink the list. Each removal is a containment decision: a grant narrowed, an egress rule closed, a credential scoped down. What remains on the list after shrinking is the honest answer to the gate's question: if this agent is fully owned, here is the worst it can do." },
            { type: "paragraph", text: "Notice what this exercise really is: the 401 claim — an unneeded permission is a configuration error before anything goes wrong — tested against an adversary. The 401 practitioner writes their judgment into a handoff and trusts it. You assume an attacker read that handoff and is now operating inside it. A practitioner who cannot state the blast radius has not secured the agent; they have hoped about it." },
          ],
        },
      ],
    },
    {
      id: "402-m4",
      title: "Day 4 — Injection Defense and Data Integrity",
      lessons: [
        {
          id: "402-m4-l1",
          title: "Structural injection defense",
          blocks: [
            { type: "paragraph", text: "Since injection cannot be filtered away, it is defended structurally, in layers. Source provenance and allowlisting: control what the agent is permitted to read — an agent that only reads known-good sources has a much smaller injection surface. Instruction/data separation: keep retrieved content marked as data, structurally distinct from instructions, where the platform supports it — and know its limits, because the separation is leaky by nature. Output filtering and destination constraint: catch the exfiltration attempt at the exit — the agent's outputs can only go to approved destinations, so the classic 'forward this to the attacker' fails even when every upstream layer missed it." },
            { type: "paragraph", text: "Defense in depth is the organizing rule: no single control holds. The question for each layer is not 'does this stop injection?' — nothing does — but 'is the failure of this layer survivable?' A design where one missed layer means total compromise is not layered; it is queued." },
          ],
        },
        {
          id: "402-m4-l2",
          title: "Data poisoning: the durable attack",
          blocks: [
            { type: "paragraph", text: "A single injected page is transient — read once, acted on once. A poisoned retrieval corpus is durable: the attacker's content sits in your own knowledge base and is retrieved, trusted, as your own material, run after run. Poisoning detection looks different from injection detection: corpus hygiene (provenance on every document, review of additions, integrity checks on what changed), and drift in retrieval patterns — sources that suddenly dominate, new documents with outsized influence." },
            { type: "paragraph", text: "The operator posture treats the corpus as an attack surface with an owner: who can write to it, how additions are reviewed, how you would detect and roll back a poisoning event. At 502 you will build the corpus that must be defended; here you defend it." },
          ],
        },
      ],
    },
    {
      id: "402-m5",
      title: "Day 5 — Detection and Response",
      lessons: [
        {
          id: "402-m5-l1",
          title: "What compromise looks like in the logs",
          blocks: [
            { type: "paragraph", text: "Detection lives on top of the logging 302 configured — which is why the two courses interlock. The signals are subtle: a successful injection looks like the agent doing plausible things slightly wrong. Tool calls to destinations never seen before; privilege use outside the mission's normal pattern; retrieval from sources not in the allowlist; egress refusals clustering — the sandbox reporting someone is trying to leave. Exfiltration through a legitimate channel is the hard case: the send connector sending to an approved address, with contents that are not the mission's." },
            { type: "paragraph", text: "Detection rules encode these as queries over the logs: anomaly against baseline, not signature against known-bad. You will write three today: new-destination detection, privilege-anomaly detection, and egress-cluster alerting. Each fires quietly, and each deserves a human look — that is the human-on-the-loop posture arriving early." },
          ],
        },
        {
          id: "402-m5-l2",
          title: "Incident response on a presented compromise",
          blocks: [
            { type: "paragraph", text: "The response sequence is four moves: contain (isolate the agent — sandbox harder, cut egress, stop the loop), revoke (kill its credentials — the drill from Day 2), preserve the record (logs, traces, the exact retrieved content — you will need them and so will whoever reviews this), and determine reach: what did the compromise actually touch? Reach is the blast-radius question asked under pressure, and it is answerable only if you did the Day 3 work before the incident." },
            { type: "callout", tone: "info", title: "The exercise format", text: "The harness presents an agent that has been compromised: logs, traces, evidence. You contain, revoke, preserve, and determine reach. The competency is the response, not the attack — you never need to run an exploit to practise handling one. That is a program-wide rule: constructive work live, adversarial work in the harness." },
            { type: "paragraph", text: "Gate briefing. Part 1: multiple choice across the week. Part 2A, security defect adjudication: a deployed agent's security configuration with seeded defects — identity, privilege, token lifecycle, containment, source control, output constraint, detection. Find all; classify each. Part 2B, blast-radius adjudication: given a complete configuration, assume full compromise via injection, and mark each asset and action reachable or not. Standard: ≥85% MC, ≥90% across the practicals. Reflexive pessimism fails exactly like reflexive optimism — some things are genuinely contained, and marking them reachable means you do not understand the controls in place." },
          ],
          practice: [
            {
              kind: "booleanSet",
              id: "402-p2",
              title: "Blast-radius drill",
              display: "yesno",
              yesLabel: "Reachable",
              noLabel: "Not reachable",
              instructions: "Configuration: agent runs sandboxed (filesystem limited to /work, no other mounts); egress allowlist = company API and one search provider; credentials scoped read-only to the project DB, 24h expiry; send connector → internal addresses only. Assume full compromise via injection. What can the attacker reach?",
              subjects: [
                { id: "a", label: "Files under /work" },
                { id: "b", label: "The production customer database (separate credentials)" },
                { id: "c", label: "Project DB contents, read" },
                { id: "d", label: "An external server of the attacker's choosing" },
                { id: "e", label: "Internal email addresses (as destinations)" },
              ],
              key: { a: true, b: false, c: true, d: false, e: true },
            },
          ],
        },
      ],
    },
  ],
};
