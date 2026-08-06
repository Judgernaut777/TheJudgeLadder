import { useState } from "react";
import { Link, useParams } from "react-router";
import { getCourse } from "@contracts/content";
import { AppHeader } from "@/components/AppHeader";
import { Seal } from "@/components/Seal";
import {
  InstrumentPlayer,
  type InstrumentValue,
} from "@/components/instruments/InstrumentPlayer";
import { MCBank } from "@/components/instruments/MCBank";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useAuth } from "@/hooks/useAuth";
import { trpc } from "@/providers/trpc";
import NotFound from "./NotFound";

export default function GatePage() {
  const { slug } = useParams<{ slug: string }>();
  const course = slug ? getCourse(slug) : undefined;
  const { isAuthenticated, isLoading } = useAuth({ redirectOnUnauthenticated: true });
  const utils = trpc.useUtils();

  const [attemptId, setAttemptId] = useState<number | null>(null);
  const [mcAnswers, setMcAnswers] = useState<Record<string, unknown>>({});
  const [practicalAnswers, setPracticalAnswers] = useState<Record<string, InstrumentValue>>({});
  const [result, setResult] = useState<{
    passed: boolean;
    mcScore: number;
    practicalScore: number;
    wrongMc: Set<string>;
    wrongUnits: Record<string, string[]>;
    serial?: string;
    confersLabel?: string;
  } | null>(null);
  const [startError, setStartError] = useState<string | null>(null);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const gateQuery = trpc.gate.forCourse.useQuery(
    { courseCode: course?.code ?? "" },
    { enabled: !!course },
  );

  const startMutation = trpc.gate.start.useMutation({
    onSuccess: (data) => {
      setAttemptId(data.attemptId);
      setResult(null);
      setMcAnswers({});
      setPracticalAnswers({});
      setStartError(null);
    },
    onError: (e) => setStartError(e.message),
  });

  const submitMutation = trpc.gate.submit.useMutation({
    onSuccess: async (data) => {
      setResult({
        passed: data.passed,
        mcScore: data.mcScore,
        practicalScore: data.practicalScore,
        wrongMc: new Set(data.wrongMc),
        wrongUnits: data.wrongUnits,
        serial: data.certificate?.serial,
        confersLabel: data.certificate?.confersLabel,
      });
      await utils.progress.myOverview.invalidate();
      await utils.gate.myAttempts.invalidate();
      await utils.certs.mine.invalidate();
    },
    onError: (e) => setSubmitError(e.message),
  });

  if (!course) return <NotFound />;
  if (isLoading || !isAuthenticated) return null;

  const gate = gateQuery.data;
  const pct = (f: number) => `${Math.round(f * 100)}%`;

  return (
    <div className="min-h-screen bg-background">
      <AppHeader />
      <main className="ledger-frame max-w-4xl py-10">
        <p className="micro-label mb-1 text-muted-foreground">
          <Link to={`/course/${course.slug}`} className="hover:text-foreground">
            AIJL {course.code}
          </Link>{" "}
          — the gate
        </p>
        <h1 className="mb-2 font-display text-3xl font-semibold tracking-tight">
          {course.title}
        </h1>

        <div className="double-rule-t double-rule-b my-6 py-5">
          <p className="font-display text-lg italic leading-snug">“{course.gateText}”</p>
          <p className="micro-label mt-2 text-muted-foreground">
            Score ≥85% on knowledge and ≥90% on the demonstration. The register's word
            is final.
          </p>
        </div>

        {/* Before the sitting */}
        {attemptId === null && result === null && (
          <div className="space-y-4">
            {startError && (
              <div className="border border-crimson/60 bg-destructive/10 p-3 text-sm">
                {startError}
              </div>
            )}
            <p className="max-w-2xl text-sm leading-relaxed text-muted-foreground">
              {gate
                ? `This sitting has ${gate.mcBank.length} questions and ${gate.practicals.length} demonstrations. Once you begin, finish in this session — there is no save-and-return.`
                : "Loading the gate…"}
            </p>
            <Button
              size="lg"
              disabled={!gate || startMutation.isPending}
              onClick={() => startMutation.mutate({ courseCode: course.code })}
            >
              {startMutation.isPending ? "Checking eligibility…" : "Begin the sitting"}
            </Button>
          </div>
        )}

        {/* During the sitting */}
        {attemptId !== null && result === null && gate && (
          <div className="space-y-10">
            <section className="space-y-4">
              <h2 className="rule-ink-b pb-2 font-display text-2xl font-semibold tracking-tight">
                Part 1 — Knowledge
              </h2>
              <MCBank items={gate.mcBank} value={mcAnswers} onChange={setMcAnswers} />
            </section>

            <section className="space-y-6">
              <h2 className="rule-ink-b pb-2 font-display text-2xl font-semibold tracking-tight">
                Part 2 — Demonstration
              </h2>
              {gate.practicals.map((practical) => (
                <InstrumentPlayer
                  key={practical.id}
                  instrument={practical}
                  mode="gate"
                  value={practicalAnswers[practical.id] ?? {}}
                  onChange={(v) =>
                    setPracticalAnswers((prev) => ({ ...prev, [practical.id]: v }))
                  }
                />
              ))}
            </section>

            {submitError && (
              <div className="border border-crimson/60 bg-destructive/10 p-3 text-sm">
                {submitError}
              </div>
            )}

            <div className="double-rule-t flex items-center justify-between pt-6">
              <Button variant="outline" onClick={() => setAttemptId(null)}>
                Abandon this sitting
              </Button>
              <Button
                size="lg"
                disabled={submitMutation.isPending}
                onClick={() =>
                  submitMutation.mutate({
                    attemptId,
                    mcAnswers,
                    practicalAnswers: practicalAnswers as Record<string, Record<string, unknown>>,
                  })
                }
              >
                {submitMutation.isPending ? "Scoring…" : "Submit the sitting"}
              </Button>
            </div>
          </div>
        )}

        {/* The verdict */}
        {result && (
          <div className="space-y-6">
            <Card className={result.passed ? "border-pass/60 bg-sage/25" : "border-crimson/60 bg-destructive/10"}>
              <CardContent className="space-y-4 pt-6">
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <p className="font-display text-3xl font-semibold tracking-tight">
                      {result.passed ? "Go." : "No-Go."}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Knowledge {pct(result.mcScore)} · Demonstration{" "}
                      {pct(result.practicalScore)}
                    </p>
                  </div>
                  {result.passed && <Seal size={110} center="AIJL" sub="GATE PASSED" />}
                </div>
                {result.passed && result.serial && (
                  <div className="border-t border-ink/30 pt-4">
                    <p className="micro-label mb-1 text-muted-foreground">Conferred</p>
                    <p className="font-semibold">{result.confersLabel}</p>
                    <p className="font-mono text-sm">Serial {result.serial}</p>
                    <p className="mt-1 text-sm text-muted-foreground">
                      Anyone can check this serial on the{" "}
                      <Link to={`/verify/${result.serial}`} className="underline underline-offset-4">
                        verification page
                      </Link>
                      .
                    </p>
                  </div>
                )}
                {!result.passed && (
                  <p className="text-sm">
                    Missed answers are marked below. Review, rest, and sit again —
                    attempt counts do not count against you.
                  </p>
                )}
              </CardContent>
            </Card>

            {gate && (
              <div className="space-y-8 opacity-90">
                <section className="space-y-4">
                  <h2 className="rule-ink-b pb-2 font-display text-xl font-semibold tracking-tight">
                    Knowledge — reviewed
                  </h2>
                  <MCBank
                    items={gate.mcBank}
                    value={mcAnswers}
                    onChange={() => {}}
                    wrongIds={result.wrongMc}
                    disabled
                  />
                </section>
                <section className="space-y-6">
                  <h2 className="rule-ink-b pb-2 font-display text-xl font-semibold tracking-tight">
                    Demonstration — reviewed
                  </h2>
                  {gate.practicals.map((practical) => (
                    <InstrumentPlayer
                      key={practical.id}
                      instrument={practical}
                      mode="gate"
                      value={practicalAnswers[practical.id] ?? {}}
                      onChange={() => {}}
                      wrongIds={new Set(result.wrongUnits[practical.id] ?? [])}
                    />
                  ))}
                </section>
              </div>
            )}

            <div className="flex gap-2">
              <Button asChild variant="outline">
                <Link to={`/course/${course.slug}`}>Back to the course</Link>
              </Button>
              {!result.passed && (
                <Button onClick={() => { setResult(null); setAttemptId(null); }}>
                  Sit again
                </Button>
              )}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

// Badge kept imported for future per-part chips
void Badge;
