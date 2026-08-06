import { useMemo, useState } from "react";
import { Link, useParams } from "react-router";
import { getCourse } from "@contracts/content";
import { AppHeader } from "@/components/AppHeader";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useAuth } from "@/hooks/useAuth";
import { cn } from "@/lib/utils";
import { trpc } from "@/providers/trpc";
import NotFound from "./NotFound";

/** Auto-scored module knowledge check. Practice-grade: scoring is local and
 *  immediate; the best score is persisted for signed-in users. */
export default function ModuleQuizPage() {
  const { slug, moduleId } = useParams<{ slug: string; moduleId: string }>();
  const course = slug ? getCourse(slug) : undefined;
  const module = course?.modules.find((m) => m.id === moduleId);
  const { isAuthenticated } = useAuth();
  const utils = trpc.useUtils();

  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [scored, setScored] = useState(false);

  const recordMutation = trpc.progress.recordQuizScore.useMutation({
    onSuccess: async () => {
      await utils.progress.myOverview.invalidate();
    },
  });

  const quiz = useMemo(() => module?.quiz ?? [], [module]);

  if (!course || !module || quiz.length === 0) return <NotFound />;

  const correctCount = quiz.filter((q) => answers[q.id] === q.answer).length;
  const score = correctCount / quiz.length;
  const allAnswered = quiz.every((q) => answers[q.id] !== undefined);

  const submit = () => {
    setScored(true);
    if (isAuthenticated) {
      recordMutation.mutate({ courseCode: course.code, moduleId: module.id, score });
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <AppHeader />
      <main className="ledger-frame max-w-3xl py-10">
        <div className="mb-8 space-y-2">
          <div className="flex flex-wrap items-center gap-2 font-mono text-[11px] uppercase tracking-[0.12em] text-muted-foreground">
            <Link to={`/course/${course.slug}`} className="hover:text-foreground hover:underline underline-offset-4">
              AIJL {course.code} — {course.title}
            </Link>
            <span>/</span>
            <span>{module.title}</span>
          </div>
          <h1 className="font-display text-3xl font-semibold tracking-tight">Knowledge check</h1>
          <p className="text-sm text-muted-foreground">
            Auto-scored, ungraded. This checks recall; the gate checks judgment — and it
            will not show you which items were wrong until after you submit.
          </p>
        </div>

        <div className="space-y-4">
          {quiz.map((item, idx) => {
            const chosen = answers[item.id];
            const wrong = scored && chosen !== item.answer;
            const right = scored && chosen === item.answer;
            return (
              <Card
                key={item.id}
                className={cn(
                  wrong && "border-crimson/60 bg-destructive/10",
                  right && "border-pass/60 bg-sage/20",
                )}
              >
                <CardContent className="space-y-3 pt-5">
                  <p className="text-[15px] font-medium">
                    <span className="mr-2 font-mono text-xs text-muted-foreground">
                      {String(idx + 1).padStart(2, "0")}
                    </span>
                    {item.question}
                  </p>
                  <div className="grid gap-2">
                    {item.options.map((option, oi) => (
                      <label
                        key={oi}
                        className={cn(
                          "flex cursor-pointer items-start gap-2 rounded-sm border border-foreground/25 p-2 text-sm",
                          chosen === oi && "border-foreground bg-sage/20",
                          scored && "cursor-default",
                        )}
                      >
                        <input
                          type="radio"
                          name={item.id}
                          className="mt-0.5"
                          checked={chosen === oi}
                          disabled={scored}
                          onChange={() => setAnswers((prev) => ({ ...prev, [item.id]: oi }))}
                        />
                        <span>{option}</span>
                      </label>
                    ))}
                  </div>
                  {scored && (
                    <p className="text-sm text-muted-foreground">
                      {wrong ? "Incorrect. " : "Correct. "}
                      {item.explanation ?? `Answer: ${item.options[item.answer]}`}
                    </p>
                  )}
                </CardContent>
              </Card>
            );
          })}
        </div>

        <div className="double-rule-t mt-10 flex flex-wrap items-center justify-between gap-3 pt-6">
          <Button asChild variant="outline">
            <Link to={`/course/${course.slug}`}>Back to course</Link>
          </Button>
          <div className="flex items-center gap-3">
            {scored && (
              <span className={`font-mono text-sm font-semibold tabular-nums ${score >= 0.85 ? "text-pass" : "text-muted-foreground"}`}>
                {correctCount}/{quiz.length} · {Math.round(score * 100)}%
              </span>
            )}
            {scored ? (
              <Button
                variant="outline"
                onClick={() => {
                  setAnswers({});
                  setScored(false);
                }}
              >
                Try again
              </Button>
            ) : (
              <Button onClick={submit} disabled={!allAnswered}>
                Check answers
              </Button>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
