import { useEffect, useState } from "react";
import { Link } from "react-router";
import {
  AIPAB_DURATION_MINUTES,
  AIPAB_SECTION_ORDER,
  placementLabel,
} from "@contracts/content";
import { AppHeader } from "@/components/AppHeader";
import {
  InstrumentPlayer,
  type InstrumentValue,
} from "@/components/instruments/InstrumentPlayer";
import { MCBank } from "@/components/instruments/MCBank";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useAuth } from "@/hooks/useAuth";
import { trpc } from "@/providers/trpc";

type BatteryState =
  | { stage: "briefing" }
  | { stage: "section" }
  | { stage: "transition"; message: string }
  | {
      stage: "result";
      placement: { rung: number; plus: boolean };
      results: { courseCode: string; passed: boolean; skipped: boolean }[];
      endReason: string;
    };

function useCountdown(deadline: Date | null) {
  const [now, setNow] = useState(() => Date.now());
  useEffect(() => {
    const t = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(t);
  }, []);
  if (!deadline) return null;
  const ms = Math.max(0, deadline.getTime() - now);
  const h = Math.floor(ms / 3_600_000);
  const m = Math.floor((ms % 3_600_000) / 60_000);
  const s = Math.floor((ms % 60_000) / 1000);
  return { ms, label: `${h}:${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}` };
}

export default function AipabPage() {
  const { isAuthenticated, isLoading: authLoading } = useAuth({
    redirectOnUnauthenticated: true,
  });
  const utils = trpc.useUtils();
  const [stage, setStage] = useState<BatteryState>({ stage: "briefing" });
  const [mcAnswers, setMcAnswers] = useState<Record<string, unknown>>({});
  const [practicalAnswers, setPracticalAnswers] = useState<Record<string, InstrumentValue>>({});
  const [error, setError] = useState<string | null>(null);

  const stateQuery = trpc.aipab.state.useQuery(undefined, { enabled: isAuthenticated });
  const attempt = stateQuery.data?.attempt ?? null;

  const startMutation = trpc.aipab.start.useMutation({
    onSuccess: async () => {
      await utils.aipab.state.invalidate();
      setStage({ stage: "section" });
    },
    onError: (e) => setError(e.message),
  });

  const sectionQuery = trpc.aipab.currentSection.useQuery(
    { attemptId: attempt?.id ?? 0 },
    { enabled: stage.stage === "section" && !!attempt && !attempt.completedAt },
  );

  const submitMutation = trpc.aipab.submitSection.useMutation({
    onSuccess: async (res) => {
      setMcAnswers({});
      setPracticalAnswers({});
      await utils.aipab.state.invalidate();
      await utils.progress.myOverview.invalidate();
      if (res.timedOut) {
        setStage({
          stage: "result",
          placement: res.placement,
          results: [],
          endReason: "The clock ran out. Running out of time places you at the last section cleared — that is the instrument working, not a malfunction.",
        });
        return;
      }
      const scoreLine = `MC ${Math.round(res.mcScore * 100)}%, practical ${Math.round(res.practicalScore * 100)}%`;
      if (res.batteryEnded) {
        const fresh = await utils.aipab.state.fetch();
        setStage({
          stage: "result",
          placement: res.placement,
          results: fresh?.attempt?.results ?? [],
          endReason:
            res.endReason === "completed"
              ? "You reached the end of the battery — every section offered was attempted."
              : `Section failed (${scoreLine}). The battery ends here; the untested rungs remain available through coursework.`,
        });
      } else {
        setStage({
          stage: "transition",
          message: res.sectionPassed
            ? `Section cleared (${scoreLine}). Advancing.`
            : `Section not cleared (${scoreLine}) — the supplemental branch is now locked, but the core track continues.`,
        });
      }
    },
    onError: (e) => setError(e.message),
  });

  const deadline = attempt && !attempt.completedAt ? new Date(attempt.deadline) : null;
  const countdown = useCountdown(deadline);

  // Auto-end on the client when the clock hits zero; the server finalizes.
  useEffect(() => {
    if (countdown && countdown.ms <= 0 && stage.stage === "section") {
      void utils.aipab.state.invalidate();
      setStage({ stage: "briefing" });
    }
  }, [countdown, stage.stage, utils]);

  if (authLoading || !isAuthenticated) {
    return (
      <div className="min-h-screen bg-background">
        <AppHeader />
        <main className="mx-auto max-w-4xl px-4 py-16 text-muted-foreground">Loading…</main>
      </div>
    );
  }

  const section = sectionQuery.data;
  const activeAttempt = attempt && !attempt.completedAt ? attempt : null;

  return (
    <div className="min-h-screen bg-background">
      <AppHeader />
      <main className="ledger-frame max-w-4xl py-10">
        <div className="double-rule-b mb-8 flex flex-wrap items-end justify-between gap-3 pb-4">
          <div>
            <h1 className="font-display text-4xl font-semibold tracking-tight">AIPAB</h1>
            <p className="micro-label mt-1 text-muted-foreground">
              Artificial Intelligence Placement Aptitude Battery
            </p>
          </div>
          {activeAttempt && countdown && (
            <div className="border border-ink/40 px-4 py-2 text-center">
              <p className="micro-label text-muted-foreground">Time remaining</p>
              <p className="font-mono text-xl font-semibold tabular-nums">
                {countdown.label}
              </p>
            </div>
          )}
        </div>

        {error && (
          <p className="mb-4 border border-crimson/60 bg-destructive/10 p-3 text-sm">{error}</p>
        )}

        {stage.stage === "briefing" && !activeAttempt && (
          <div className="double-rule-t double-rule-b space-y-5 py-6 text-sm leading-relaxed">
            <p className="document-prose">
              One proctored-style sitting, {AIPAB_DURATION_MINUTES / 60} hours, eight
              sections in a fixed order: {AIPAB_SECTION_ORDER.join(" → ")}. Each
              section is a multiple-choice part (85% minimum) plus a practical part
              (90% minimum). Both are required to advance.
            </p>
            <p className="document-prose">
              Failing the 302 section locks the supplemental branch (402, 502) but the
              core track continues. Failing anything else ends the battery. The clock is
              the second difficulty ramp and it is deliberate: you are not expected to
              finish all eight sections. Running out of time places you at the last
              section cleared.
            </p>
            <p className="document-prose">
              The output is a placement, not a percentage — and a placement substitutes
              for prerequisite certifications across the catalog.
            </p>
            {attempt?.completedAt && attempt.placement && (
              <p className="border border-ink/30 p-3">
                Your most recent battery placed you at{" "}
                <strong>{placementLabel(attempt.placement)}</strong>. Retaking starts a
                new sitting; your best placement stands.
              </p>
            )}
            <Button
              size="lg"
              onClick={() => startMutation.mutate()}
              disabled={startMutation.isPending}
            >
              {attempt?.completedAt ? "Retake the battery" : "Begin the battery"}
            </Button>
          </div>
        )}

        {stage.stage === "briefing" && activeAttempt && (
          <div className="double-rule-t double-rule-b space-y-4 py-6">
            <h2 className="font-display text-2xl font-semibold tracking-tight">
              Battery in progress
            </h2>
            <p className="font-mono text-xs uppercase tracking-[0.1em] text-muted-foreground">
              Section {activeAttempt.sectionIndex + 1} of {activeAttempt.sectionCount} ·
              AIJL {activeAttempt.currentCourseCode}
              {activeAttempt.branchLocked && " · supplemental branch locked"}
            </p>
            <Button size="lg" onClick={() => setStage({ stage: "section" })}>
              Resume the sitting
            </Button>
          </div>
        )}

        {stage.stage === "transition" && (
          <div className="double-rule-t double-rule-b space-y-4 py-6">
            <p className="document-prose">{stage.message}</p>
            <Button onClick={() => setStage({ stage: "section" })}>Next section</Button>
          </div>
        )}

        {stage.stage === "section" && section && (
          <div className="space-y-8">
            <div className="flex flex-wrap items-center gap-x-4 gap-y-1 font-mono text-[11px] uppercase tracking-[0.14em]">
              <span className="bg-foreground px-2.5 py-1 text-background">
                Section {section.sectionIndex + 1} / {section.sectionCount}
              </span>
              <span>AIJL {section.courseCode}</span>
              {attempt?.branchLocked && (
                <span className="text-crimson">Supplemental branch locked</span>
              )}
            </div>

            <section className="space-y-4">
              <h2 className="rule-ink-b pb-2 font-display text-2xl font-semibold tracking-tight">
                Part 1 — Knowledge
              </h2>
              <MCBank items={section.mcBank} value={mcAnswers} onChange={setMcAnswers} />
            </section>

            <section className="space-y-4">
              <h2 className="rule-ink-b pb-2 font-display text-2xl font-semibold tracking-tight">
                Part 2 — Gate demonstration
              </h2>
              <InstrumentPlayer
                instrument={section.practical}
                mode="gate"
                value={practicalAnswers[section.practical.id] ?? {}}
                onChange={(v) =>
                  setPracticalAnswers((prev) => ({ ...prev, [section.practical.id]: v }))
                }
              />
            </section>

            <div className="double-rule-t flex justify-end pt-6">
              <Button
                size="lg"
                disabled={submitMutation.isPending}
                onClick={() =>
                  submitMutation.mutate({
                    attemptId: attempt!.id,
                    mcAnswers,
                    practicalAnswers: practicalAnswers as Record<string, Record<string, unknown>>,
                  })
                }
              >
                {submitMutation.isPending ? "Scoring…" : "Submit section"}
              </Button>
            </div>
          </div>
        )}

        {stage.stage === "result" && (
          <Card>
            <CardHeader>
              <CardTitle>Placement</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-4xl font-bold tracking-tight">
                {placementLabel(stage.placement)}
              </p>
              <p className="text-sm text-muted-foreground">{stage.endReason}</p>
              {stage.results.length > 0 && (
                <ul className="space-y-1 text-sm">
                  {stage.results.map((r) => (
                    <li key={r.courseCode} className="flex items-center gap-2">
                      <Badge variant={r.passed ? "default" : "destructive"}>
                        {r.passed ? "cleared" : "not cleared"}
                      </Badge>
                      <span>AIJL {r.courseCode}</span>
                    </li>
                  ))}
                </ul>
              )}
              <div className="flex gap-2 pt-2">
                <Button asChild>
                  <Link to="/">Browse courses</Link>
                </Button>
                <Button asChild variant="outline">
                  <Link to="/dashboard">Dashboard</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        )}
      </main>
    </div>
  );
}
