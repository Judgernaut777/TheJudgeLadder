import { useState } from "react";
import { Link, useParams } from "react-router";
import { getCourse } from "@contracts/content";
import { AppHeader } from "@/components/AppHeader";
import {
  InstrumentPlayer,
  type InstrumentValue,
} from "@/components/instruments/InstrumentPlayer";
import { MCBank } from "@/components/instruments/MCBank";
import { Seal } from "@/components/Seal";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";
import { trpc } from "@/providers/trpc";
import NotFound from "./NotFound";

interface GateDetail {
  mcWrong: string[];
  practicalWrong: Record<string, string[]>;
  practicalCorrect: number;
  practicalTotal: number;
}

type Phase =
  | { stage: "briefing" }
  | {
      stage: "sitting";
      attemptId: number;
      mcBank: Parameters<typeof MCBank>[0]["items"];
      practicals: Parameters<typeof InstrumentPlayer>[0]["instrument"][];
      thresholds: { mc: number; practical: number };
    }
  | {
      stage: "result";
      passed: boolean;
      mcScore: number;
      practicalScore: number;
      thresholds: { mc: number; practical: number };
      detail: GateDetail;
      certificate?: { serial: string; confersLabel: string } | null;
      mcBank: Parameters<typeof MCBank>[0]["items"];
      practicals: Parameters<typeof InstrumentPlayer>[0]["instrument"][];
    };

function pct(x: number) {
  return `${Math.round(x * 100)}%`;
}

export default function GatePage() {
  const { slug } = useParams<{ slug: string }>();
  const course = slug ? getCourse(slug) : undefined;
  const { isAuthenticated, isLoading: authLoading } = useAuth({
    redirectOnUnauthenticated: true,
  });

  const [phase, setPhase] = useState<Phase>({ stage: "briefing" });
  const [mcAnswers, setMcAnswers] = useState<Record<string, unknown>>({});
  const [practicalAnswers, setPracticalAnswers] = useState<Record<string, InstrumentValue>>({});
  const [startError, setStartError] = useState<string | null>(null);
  const utils = trpc.useUtils();

  const startMutation = trpc.gate.start.useMutation({
    onSuccess: (data) => {
      setStartError(null);
      setMcAnswers({});
      setPracticalAnswers({});
      setPhase({
        stage: "sitting",
        attemptId: data.attemptId,
        mcBank: data.gate.mcBank,
        practicals: data.gate.practicals,
        thresholds: data.thresholds,
      });
      window.scrollTo({ top: 0 });
    },
    onError: (error) => setStartError(error.message),
  });

  const submitMutation = trpc.gate.submit.useMutation({
    onSuccess: async (data) => {
      if (phase.stage !== "sitting") return;
      setPhase({
        stage: "result",
        passed: data.passed,
        mcScore: data.mcScore,
        practicalScore: data.practicalScore,
        thresholds: data.thresholds,
        detail: data.detail as GateDetail,
        certificate: data.certificate
          ? { serial: data.certificate.serial, confersLabel: data.certificate.confersLabel }
          : null,
        mcBank: phase.mcBank,
        practicals: phase.practicals,
      });
      window.scrollTo({ top: 0 });
      await utils.progress.myOverview.invalidate();
      await utils.gate.myAttempts.invalidate();
      await utils.certs.mine.invalidate();
    },
  });

  if (!course) return <NotFound />;
  if (authLoading || !isAuthenticated) {
    return (
      <div className="min-h-screen bg-background">
        <AppHeader />
        <main className="mx-auto max-w-3xl px-4 py-16 text-muted-foreground">Loading…</main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <AppHeader />
      <main className="ledger-frame max-w-3xl py-10">
        <div className="mb-8 space-y-2">
          <Link
            to={`/course/${course.slug}`}
            className="font-mono text-[11px] uppercase tracking-[0.12em] text-muted-foreground hover:text-foreground"
          >
            ← AIJL {course.code} — {course.title}
          </Link>
          <h1 className="font-display text-3xl font-semibold tracking-tight">
            The gate — AIJL {course.code}
          </h1>
        </div>

        {phase.stage === "briefing" && (
          <div className="double-rule-t double-rule-b space-y-5 py-6">
            <div>
              <p className="micro-label mb-1.5 text-muted-foreground">
                Gate — {course.gateSource === "framework" ? "framework text" : "program-authored"}
              </p>
              <p className="font-display text-xl italic leading-snug">
                “{course.gateText}”
              </p>
            </div>
            <ul className="list-none space-y-2.5 text-sm leading-relaxed">
              <li className="flex gap-3">
                <span className="mt-[0.55em] inline-block size-1.5 shrink-0 bg-foreground/70" />
                <span>
                  Two parts, both auto-scored: multiple choice (pass at{" "}
                  <strong>85%</strong> or better) and practical instruments (pass at{" "}
                  <strong>90%</strong> or better). You must clear <strong>both</strong>.
                </span>
              </li>
              <li className="flex gap-3">
                <span className="mt-[0.55em] inline-block size-1.5 shrink-0 bg-foreground/70" />
                <span>
                  Instruments fail in two directions — a missed defect and a false alarm are
                  the same kind of error.
                </span>
              </li>
              <li className="flex gap-3">
                <span className="mt-[0.55em] inline-block size-1.5 shrink-0 bg-foreground/70" />
                <span>
                  One submission per sitting. What you get back is which items you missed —
                  never the keys. Retakes are unlimited; each retake is a fresh sitting.
                </span>
              </li>
              <li className="flex gap-3">
                <span className="mt-[0.55em] inline-block size-1.5 shrink-0 bg-foreground/70" />
                <span>Passing issues your certificate: {course.confers}.</span>
              </li>
            </ul>
            {startError && (
              <p className="rounded-sm border border-crimson/60 bg-destructive/10 p-3 text-sm">
                {startError}
              </p>
            )}
            <Button
              size="lg"
              onClick={() => startMutation.mutate({ courseCode: course.code })}
              disabled={startMutation.isPending}
            >
              {startMutation.isPending ? "Preparing your sitting…" : "Begin the sitting"}
            </Button>
          </div>
        )}

        {phase.stage === "sitting" && (
          <div className="space-y-10">
            <section>
              <div className="rule-ink-b mb-4 pb-2">
                <h2 className="font-display text-2xl font-semibold tracking-tight">
                  Part 1 — Multiple choice
                </h2>
                <p className="micro-label mt-1 text-muted-foreground">
                  {phase.mcBank.length} questions · pass at {pct(phase.thresholds.mc)} or better
                </p>
              </div>
              <MCBank items={phase.mcBank} value={mcAnswers} onChange={setMcAnswers} />
            </section>
            <section className="space-y-6">
              <div className="rule-ink-b pb-2">
                <h2 className="font-display text-2xl font-semibold tracking-tight">
                  Part 2 — Practical
                </h2>
                <p className="micro-label mt-1 text-muted-foreground">
                  {phase.practicals.length} instrument{phase.practicals.length === 1 ? "" : "s"} ·
                  pass at {pct(phase.thresholds.practical)} or better across all scored items
                </p>
              </div>
              {phase.practicals.map((instrument) => (
                <InstrumentPlayer
                  key={instrument.id}
                  instrument={instrument}
                  mode="gate"
                  value={practicalAnswers[instrument.id] ?? {}}
                  onChange={(v) =>
                    setPracticalAnswers((prev) => ({ ...prev, [instrument.id]: v }))
                  }
                />
              ))}
            </section>
            <div className="sticky bottom-0 -mx-4 border-t bg-background/95 px-4 py-4 backdrop-blur">
              <div className="mx-auto flex max-w-3xl items-center justify-between gap-4">
                <p className="text-sm text-muted-foreground">
                  Unanswered items score as wrong.
                </p>
                <Button
                  size="lg"
                  disabled={submitMutation.isPending}
                  onClick={() => {
                    if (phase.stage !== "sitting") return;
                    if (
                      window.confirm(
                        "Submit this sitting for scoring? You cannot change answers afterwards.",
                      )
                    ) {
                      submitMutation.mutate({
                        attemptId: phase.attemptId,
                        mcAnswers,
                        practicalAnswers,
                      });
                    }
                  }}
                >
                  {submitMutation.isPending ? "Scoring…" : "Submit for scoring"}
                </Button>
              </div>
              {submitMutation.error && (
                <p className="mt-2 text-sm text-red-600">{submitMutation.error.message}</p>
              )}
            </div>
          </div>
        )}

        {phase.stage === "result" && (
          <div className="space-y-8">
            <div className="double-rule-t double-rule-b space-y-5 py-6">
              <div className="flex flex-wrap items-center gap-5">
                {phase.passed ? (
                  <>
                    <Seal size={92} center="GO" sub="GATE PASSED" />
                    <div>
                      <p className="font-display text-3xl font-semibold tracking-tight text-pass">
                        Go — gate passed
                      </p>
                      <p className="micro-label mt-1 text-muted-foreground">
                        Entered in the register
                      </p>
                    </div>
                  </>
                ) : (
                  <>
                    <span className="flex size-[92px] -rotate-6 items-center justify-center border-[3px] border-crimson font-display text-xl font-bold uppercase tracking-widest text-crimson">
                      No-Go
                    </span>
                    <div>
                      <p className="font-display text-3xl font-semibold tracking-tight text-crimson">
                        Gate not passed
                      </p>
                      <p className="micro-label mt-1 text-muted-foreground">
                        Review the misses below · retake when ready
                      </p>
                    </div>
                  </>
                )}
              </div>
              <div className="grid gap-3 sm:grid-cols-2">
                <div className="border border-ink/30 p-3">
                  <p className="micro-label text-muted-foreground">Multiple choice</p>
                  <p className="mt-1 font-mono text-2xl font-semibold">{pct(phase.mcScore)}</p>
                  <p className="mt-0.5 font-mono text-[11px] text-muted-foreground">
                    required {pct(phase.thresholds.mc)} ·{" "}
                    {phase.mcScore >= phase.thresholds.mc ? "met" : "not met"}
                  </p>
                </div>
                <div className="border border-ink/30 p-3">
                  <p className="micro-label text-muted-foreground">Practical</p>
                  <p className="mt-1 font-mono text-2xl font-semibold">{pct(phase.practicalScore)}</p>
                  <p className="mt-0.5 font-mono text-[11px] text-muted-foreground">
                    required {pct(phase.thresholds.practical)} · {phase.detail.practicalCorrect}/
                    {phase.detail.practicalTotal} scored items
                  </p>
                </div>
              </div>
              {phase.certificate && (
                <div className="flex flex-wrap items-center justify-between gap-4 border border-pass/50 bg-sage/25 p-4">
                  <div>
                    <p className="font-display text-lg font-semibold">
                      Certificate issued — {phase.certificate.confersLabel}
                    </p>
                    <p className="mt-1 font-mono text-xs tracking-[0.08em]">
                      SERIAL <span className="font-semibold">{phase.certificate.serial}</span> —
                      verifiable on the{" "}
                      <Link to="/verify" className="underline underline-offset-4">
                        verification page
                      </Link>
                    </p>
                  </div>
                  <Seal size={64} center="AIJL" sub="REGISTERED" />
                </div>
              )}
              {!phase.passed && (
                <p className="text-sm text-muted-foreground">
                  Review your misses below — wrong items are marked. Retake whenever you are
                  ready; every retake is a fresh sitting.
                </p>
              )}
              <div className="flex gap-3">
                <Button
                  variant="outline"
                  onClick={() => {
                    setPhase({ stage: "briefing" });
                    setStartError(null);
                  }}
                >
                  {phase.passed ? "Back to briefing" : "Retake the gate"}
                </Button>
                <Button asChild variant="ghost">
                  <Link to={`/course/${course.slug}`}>Back to course</Link>
                </Button>
              </div>
            </div>

            <section>
              <h2 className="rule-ink-b mb-4 pb-2 font-display text-xl font-semibold tracking-tight">
                Your sitting — multiple choice
              </h2>
              <MCBank
                items={phase.mcBank}
                value={mcAnswers}
                onChange={() => undefined}
                wrongIds={new Set(phase.detail.mcWrong)}
                disabled
              />
            </section>
            <section className="space-y-6">
              <h2 className="rule-ink-b pb-2 font-display text-xl font-semibold tracking-tight">
                Your sitting — practical
              </h2>
              {phase.practicals.map((instrument) => (
                <InstrumentPlayer
                  key={instrument.id}
                  instrument={instrument}
                  mode="gate"
                  value={practicalAnswers[instrument.id] ?? {}}
                  onChange={() => undefined}
                  wrongIds={new Set(phase.detail.practicalWrong[instrument.id] ?? [])}
                />
              ))}
            </section>
          </div>
        )}
      </main>
    </div>
  );
}
