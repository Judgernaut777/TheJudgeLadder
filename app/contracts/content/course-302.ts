import type { Course } from "./types";

export const course302: Course = {
  code: "302",
  slug: "aijl-302",
  title: "AI DevOps",
  rungLabel: "Rung 3+ — Supplemental",
  track: "supplemental",
  durationDays: 3,
  confers: "AIJL Rung 3+",
  gateText:
    "You can operate a known AI stack safely — and you can justify where it runs as a trust decision, not a technical preference.",
  gateSource: "authored",
  summary:
    "For operators. Stand up, host, log, deploy, and roll back a known AI stack — with the DevOps you absolutely must know, arriving attached to the AI task that needs it. Assumes zero DevOps experience.",
  prerequisites: ["301"],
  modules: [
    {
      id: "302-m1",
      title: "Day 1 — Stand It Up",
      lessons: [
        {
          id: "302-m1-l1",
          title: "What this course is, and what it refuses to be",
          blocks: [
            { type: "paragraph", text: "302 does not teach DevOps. It teaches the DevOps you cannot operate AI infrastructure without — and every candidate topic faces one filter: does an AI infrastructure operator absolutely need this? 'It would help' and 'a real DevOps engineer would know it' are both out. What remains fits in three days because there is no fundamentals module: every operations concept arrives attached to the AI task that needs it. Containers arrive because you are standing up an inference server. Environment variables arrive because that is where the endpoint and key live. Git arrives because a prompt change needs to be revertible." },
            { type: "paragraph", text: "301 gave the vocabulary; 302 gives the hands. Nothing 301 defined is defined again — open weights, on-prem, residency, classification are assumed words. Here you provision, size, pin, configure, and roll back. By the end you will be a competent operator of a known stack: able to run it, follow the runbook, make the hosting decision from a data profile, and diagnose the failure modes you trained on. You will not be a DevOps engineer, and the credential does not pretend otherwise — architecture and novel-failure debugging belong to 502." },
            { type: "table", headers: ["Explicitly not taught", "Why"], rows: [
              ["Shell scripting, pipes, text processing", "You run things and read output; you do not automate a shell"],
              ["Networking beyond 'is it up, where does it listen'", "Subnets and firewalls belong to whoever runs the network"],
              ["Building container images from scratch", "You run and inspect images; you do not author base layers"],
              ["Orchestration (Kubernetes and equivalents)", "Only if the reference stack requires it — otherwise a career, not a prerequisite"],
              ["Git branching strategy, PR workflow", "You need revertible history, not a collaboration model"],
              ["CI/CD pipeline construction", "Running a defined deploy is required; building the pipeline is not"],
              ["Infrastructure-as-code, load balancing, HA", "502, where design lives"],
            ] },
          ],
        },
        {
          id: "302-m1-l2",
          title: "Reach the endpoint: the first successful call",
          blocks: [
            { type: "paragraph", text: "Everything begins with one managed inference call. An endpoint is a URL where a model listens; a request carries your input plus configuration; the response carries output plus metadata — tokens used, model version, finish reason. You will make this call with curl or a small script, and you will read the entire response, not just the text, because the metadata is how you will later detect half the failures in this course." },
            { type: "paragraph", text: "The call needs a key, and the key arrives attached to its own lesson: credentials do not live in code. An API key committed to a repository is an incident — repos leak, get forked, get indexed, get screenshotted. The key lives in the environment: an environment variable or a config file excluded from version control. When the code needs it, the code reads the environment. This is not tidiness; it is the difference between a credential you control and one you have already lost." },
            { type: "callout", tone: "key", title: "Reading failures", text: "A 401 means the key is wrong or missing. A 403 means the key is right but not permitted. A 429 means rate limit. A 500 means their side. Operators read status codes before they read error messages, and read error messages before they touch anything. Most 'the model is broken' reports are a 401 wearing a costume." },
          ],
          practice: [
            {
              kind: "classification",
              id: "302-p1",
              title: "Read the failure",
              instructions: "Each symptom appeared while calling a managed inference endpoint. Classify the most likely cause.",
              items: [
                { id: "a", text: "Every request returns HTTP 401 immediately, on a machine where the call worked yesterday." },
                { id: "b", text: "Requests succeed in bursts, then fail with HTTP 429 during the team's busiest hour." },
                { id: "c", text: "A teammate's script works; yours fails with HTTP 401, and your key is pasted directly in the script as 'sk-...x7q' — and the repo was pushed to a shared space last night." },
                { id: "d", text: "All requests from all team members return HTTP 500 for twenty minutes, then recover with no changes on your side." },
              ],
              categories: [
                { id: "key", label: "Key invalid/expired/missing" },
                { id: "ratelimit", label: "Rate limit" },
                { id: "leaked", label: "Key compromised — rotate now" },
                { id: "provider", label: "Provider-side incident" },
              ],
              key: { a: "key", b: "ratelimit", c: "leaked", d: "provider" },
            },
          ],
        },
        {
          id: "302-m1-l3",
          title: "Stand up self-hosted inference: containers and quantization",
          blocks: [
            { type: "paragraph", text: "Now the other hosting model: running an open-weights model yourself. The vehicle is a container — a packaged, isolated runtime that carries the model server and its dependencies as one unit. The vocabulary is three words: an image is the package, a container is a running instance of it, and a registry is where images live. You will pull an inference-server image, run it, exec into it to look around, and read its logs — those four verbs are the whole container skill this course requires." },
            { type: "paragraph", text: "The model must fit the hardware you actually have, and that is a quantization decision. Models are stored as numbers; using fewer bits per number shrinks memory and speeds inference at the cost of quality. Full precision might need hardware you do not have; an 8-bit quant usually costs little; a 4-bit quant runs almost anywhere but degrades on exactly the long-context, careful-reasoning work this program cares about. Sizing is a tradeoff you can state: what fits, what each step down costs, and what the workload cannot afford to lose." },
            { type: "callout", tone: "warning", title: "Adoptability note", text: "If your delivery site has no GPU hardware, this module runs against a shared remote lab or a small CPU-quantized model — slower and less realistic, but the decisions you learn to make are identical. The gate runs on a simulated harness regardless." },
            { type: "paragraph", text: "When it does not work — and on day one it will not — the diagnostic loop is: is the process alive, what port is it listening on, what do the logs say. Processes, ports, and log reading are the shell skills this course keeps; everything fancier was filtered out in lesson one." },
          ],
        },
      ],
    },
    {
      id: "302-m2",
      title: "Day 2 — Decide and Control It",
      lessons: [
        {
          id: "302-m2-l1",
          title: "The trust-first decision procedure",
          frameworkRef: "tracks/infrastructure-and-trust.md",
          blocks: [
            { type: "paragraph", text: "This is the one wholly new concept in the course, and it carries the gate. 301 taught the axis — cloud versus on-prem, open versus closed — as vocabulary. Here is the procedure, and it is ordered: first build the data profile (classification, residency requirement, consequence of a leak, governing regime); the profile determines the set of permissible configurations; only then choose one on capability and cost. Trust narrows the options before preferences are allowed to speak." },
            { type: "paragraph", text: "The failure this prevents is choosing by habit or benchmark: picking the hosted API because it scores better, then discovering the data profile forbade it. That practitioner has automated a decision they never made. Open-versus-closed and cloud-versus-on-prem are one decision wearing two hats, and the decision is about trust — who must you trust with this data, and is that trust acceptable for this profile?" },
            { type: "callout", tone: "key", title: "The gate's second half", text: "You can justify where it runs as a trust decision, not a technical preference. In the exam you will be handed data profiles and configuration options, and you will mark every configuration permissible or not. Candidates reasoning from capability, cost, or convenience pick wrong. Candidates reasoning from the trust question pick right." },
          ],
          practice: [
            {
              kind: "classification",
              id: "302-p2",
              title: "Permissible or not?",
              instructions: "For each data profile + configuration pair, decide whether the configuration is permissible.",
              contextTitle: "Reference configurations",
              context: [
                { type: "table", headers: ["Config", "Hosting", "Data path"], rows: [
                  ["C1", "Hosted API, US regions", "Prompts leave the organization; provider retains 30 days"],
                  ["C2", "Self-hosted open weights, on-prem", "Nothing leaves the building"],
                  ["C3", "Hosted API, EU region pinned", "Prompts leave the organization; stays in EU; zero retention"],
                ] },
              ],
              items: [
                { id: "a", text: "Profile: PUBLIC marketing copy. Config: C1." },
                { id: "b", text: "Profile: CONFIDENTIAL personnel records; residency: must not leave national jurisdiction (EU); leak consequence: severe. Config: C1." },
                { id: "c", text: "Same profile as (b). Config: C2." },
                { id: "d", text: "Same profile as (b). Config: C3." },
                { id: "e", text: "Profile: INTERNAL engineering notes; no residency requirement; leak consequence: moderate. Config: C3." },
              ],
              categories: [
                { id: "permitted", label: "Permissible" },
                { id: "not", label: "Not permissible" },
              ],
              key: { a: "permitted", b: "not", c: "permitted", d: "permitted", e: "permitted" },
            },
          ],
        },
        {
          id: "302-m2-l2",
          title: "Enforce residency technically",
          blocks: [
            { type: "paragraph", text: "A residency requirement and a residency guarantee are different objects. The requirement is a sentence in a policy; the guarantee is a technical state you build and can demonstrate. Two mechanisms do most of the work. Region pinning: configuring every service and client to use only endpoints in the permitted jurisdiction — and verifying it, because defaults drift and SDKs phone home. Egress control: the network itself refuses connections to anywhere else, so a misconfigured client fails closed instead of leaking quietly." },
            { type: "paragraph", text: "The operator's discipline is verification over configuration. 'We set the region' is a claim; 'here is the egress rule, and here is a test showing a request to a non-EU endpoint being refused' is evidence. When an auditor asks — and at 501 someone is trained to ask — the answer is the demonstration, not the intention." },
            { type: "list", items: [
              "Pin regions in: the model endpoint, the embedding/retrieval service, logging and telemetry, backups. The forgotten fourth is where violations actually happen.",
              "Egress rules are the guarantee; application config is the convenience. Trust the firewall, verify the config.",
              "Subprocessors count. A provider whose support tooling reads your logs from another jurisdiction is a residency decision you made by omission.",
            ] },
          ],
        },
        {
          id: "302-m2-l3",
          title: "Decide what gets logged — and what must never be",
          blocks: [
            { type: "paragraph", text: "301 taught you to know that you are logged. You now sit on the other chair: you decide. Logging is a genuine dilemma, not a dial toward 'more.' Too little and you cannot answer the questions 501's auditor will ask — what did the system do, what did it see, what tripped. Too much and the log itself becomes an exfiltration event you built: a store of every prompt including the confidential ones, readable by whoever can read logs, retained under whoever's policy governs the log platform." },
            { type: "paragraph", text: "The working rule: log events and metadata, gate content by classification. Requests, actions, approvals, model versions, token counts — logged always. Prompt and response bodies — logged for low classifications, redacted or omitted for high ones, under a written rule, not an ad-hoc feeling. And secrets never: a credential in a log is the credential-in-chat failure with extra steps, and log-scrubbing for secret-shaped strings is part of the pipeline, not an afterthought." },
            { type: "callout", tone: "key", title: "The inversion", text: "A log capturing classified material is an exfiltration event you built. The gate's seeded defects always include logging misconfiguration in one of these two directions — absent where required, or capturing what must not be retained. Both directions fail; that is deliberate, and you will see the same two-sided design again at 401, 402, 501, and 502." },
          ],
        },
        {
          id: "302-m2-l4",
          title: "Secrets infrastructure and operating economics",
          blocks: [
            { type: "paragraph", text: "301 gave the personal rule — never paste a credential. This is the machinery that makes the rule scalable: a secrets store (a vault) holds credentials; applications fetch them at runtime under their own identity; nothing sits in code, config files, or chat transcripts. The three operations you must be able to perform cold: rotation (replace a credential on a schedule and on suspicion), scoping (each service gets the narrowest credential that works — one service's key is never another's), and revocation (kill a credential now, and have the system survive it gracefully)." },
            { type: "paragraph", text: "Then the economics invisible from 301's desk. Cost scales with tokens; context-heavy patterns cost real money at volume. Latency shapes what the system can be used for. Capacity — rate limits, concurrency, context budget — fails silently under load if nobody planned it: the tenth concurrent user degrades everyone's answers, and no error is ever raised. The operator who cannot state the stack's cost, latency, and capacity profile cannot say whether a proposed use is viable, which makes it a trust-relevant competency, not an accounting detail." },
          ],
        },
      ],
    },
    {
      id: "302-m3",
      title: "Day 3 — Change It Without Breaking It",
      lessons: [
        {
          id: "302-m3-l1",
          title: "Prompts and configs are deployable artifacts",
          blocks: [
            { type: "paragraph", text: "A prompt template in production is code. It changes system behaviour, it can introduce defects, and it must therefore be versioned, staged, reviewed, and revertible like anything else that runs. The Git this course requires is four verbs: clone, commit, diff, revert. Branching strategy and merge rituals belong to collaboration models you were explicitly not taught — what you need is the ability to answer 'what changed, when, and how do I put it back.'" },
            { type: "paragraph", text: "Environments make change safe: dev, staging, prod — the same stack configured three ways. Changes are born in dev, proven in staging against realistic workloads, and only then shipped to prod through the runbook. The deploy itself is mechanical: the runbook is the artifact, followed exactly, including its rollback section. An operator who improvises during a deploy is not being agile; they are making an unreviewed change to production." },
          ],
        },
        {
          id: "302-m3-l2",
          title: "Rollback and the AI-specific failure modes",
          blocks: [
            { type: "paragraph", text: "Rollback in AI systems has a twist with no analogue in ordinary software: behaviour is probabilistic. 'It worked before' is a weaker signal than usual, because the same prompt on the same model version can produce a different distribution of outputs tomorrow. Roll back the artifact — the prompt, the config, the model version — and then verify behaviour empirically, not by assumption. A model version change is a behaviour change; treat a provider's silent upgrade as a deploy you didn't schedule." },
            { type: "paragraph", text: "The failure modes you must detect, because no general-ops instinct covers them: silent quality regression (outputs still fluent, quietly worse — caught only by comparing against known-good examples); context exhaustion (long sessions degrading per the rot you know from 101); retrieval returning nothing (the assistant answering from thin air instead of saying so); and provider deprecation (the model version you pinned reaching end-of-life on someone else's calendar)." },
            { type: "callout", tone: "key", title: "Break-and-recover", text: "Today ends with break-and-recover against the reference stack: your instructor breaks it in one of these ways, you detect, diagnose, roll back, and verify. The gate's defect adjudication is this same skill against a simulated stack — every defect category maps to a failure mode you were trained on." },
          ],
          practice: [
            {
              kind: "classification",
              id: "302-p3",
              title: "Name the failure mode",
              instructions: "Each incident report describes one of the AI-specific failure modes. Name it.",
              items: [
                { id: "a", text: "Users report the assistant 'feels vaguer this week.' Outputs are fluent, no errors anywhere, but answers that used to cite specifics now generalize. The prompt and config are unchanged since last month." },
                { id: "b", text: "In long working sessions the assistant 'forgets' constraints stated at the start; short sessions are fine." },
                { id: "c", text: "Questions about the product catalog get confident, detailed, wrong answers. The retrieval service logs show zero matching documents for the past two days." },
                { id: "d", text: "Monday: all integrations fail with 'model not found.' The provider's changelog Friday announced the version's removal." },
              ],
              categories: [
                { id: "regression", label: "Silent quality regression" },
                { id: "context", label: "Context exhaustion" },
                { id: "retrieval", label: "Retrieval returning nothing" },
                { id: "deprecation", label: "Provider deprecation" },
              ],
              key: { a: "regression", b: "context", c: "retrieval", d: "deprecation" },
            },
          ],
        },
        {
          id: "302-m3-l3",
          title: "What your users inherit — and the gate",
          blocks: [
            { type: "paragraph", text: "Every decision in this course lands on a Rung 3 practitioner downstream. The answer key to 301's data-flow map — where pasted text goes, what the connector can see, what classification may enter, whether it is retained — is authored by whoever made your hosting, logging, and scope decisions. 301 certifies that a practitioner can answer the data question; 302 certifies that you are the reason there is an answer." },
            { type: "paragraph", text: "Gate briefing. Part 1: multiple choice — operational consequence only; nothing 301 defined, nothing from the not-taught list. Part 2A, stack diagnosis: a running tool-connected stack on the simulated harness with seeded defects — residency, credential handling, logging, reversibility, environment, capacity. Find all of them; classify each from the fixed list. Part 2B, hosting adjudication: data profiles and configuration options; mark every one permissible or not. Standard: ≥85% MC, ≥90% across the practicals." },
            { type: "callout", tone: "info", title: "The authored gate", text: "302's gate is authored by the curriculum, not quoted from the framework — the framework defines gates for the five rungs only. You can operate a known AI stack safely, and you can justify where it runs as a trust decision, not a technical preference. Holding 301 and 302 confers Rung 3+." },
          ],
        },
      ],
    },
  ],
};
