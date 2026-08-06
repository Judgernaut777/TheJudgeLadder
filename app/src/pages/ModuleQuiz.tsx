import { useState } from "react";
import { Link, useParams } from "react-router";
import { getCourse, getModule } from "@contracts/content";
import { AppHeader } from "@/components/AppHeader";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useAuth } from "@/hooks/useAuth";
import { cn } from "@/lib/utils";
import { trpc } from "@/providers/trpc";
import NotFound from "./NotFound";

export default function ModuleQuizPage() {
  const { slug, moduleId } = useParams<{ slug: string; moduleId: string }>();
  const course = slug ? getCourse(slug) : undefined;
  const module = course && moduleId ? getModule(course, moduleId) : undefined;
  const { isAuthenticated } = useAuth();

  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [checked, setChecked] = useState(false);

  const recordMutation = trpc.progress.recordQuizScore.useMutation();

  if (!course || !module || !module.quiz || module.quiz.length === 0) {
    return <NotFound />;
  }

  const quiz = module.quiz;
  const correctCount = quiz.filter((q) => answers[q.id] === q.answerIndex).length;
  const fraction = quiz.length ? correctCount / quiz.length : 1;

  const check = () => {
    setChecked(true);
    if (isAuthenticated) {
      recordMutation.mutate({
        courseCode: course.code,
        moduleId: module.id,
        score: fraction,
      });
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <AppHeader />
      <main className="ledger-frame max-w-3xl py-10">
        <p className="micro-label mb-2 text-muted-foreground">
          <Link to={`/course/${course.slug}`} className="hover:text-foreground">
            AIJL {course.code}
          </Link>{" "}
          · {module.title}
        </p>
        <h1 className="mb-2 font-display text-3xl font-semibold tracking-tight">
          Knowledge check
        </h1>
        <p className="mb-8 text-sm text-muted-foreground">
          Practice-grade. Your best score is kept; nothing here unlocks or blocks the
          gate.
        </p>

        <div className="space-y-4">
          {quiz.map((item, idx) => {
            const chosen = answers[item.id];
            const wrong = checked && chosen !== item.answerIndex;
            return (
              <Card
                key={item.id}
                className={cn(
                  checked && chosen === item.answerIndex && "border-pass/50 bg-sage/20",
                  wrong && "border-crimson/60 bg-destructive/10",
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
                          checked && oi === item.answerIndex && "border-pass bg-sage/30",
                        )}
                      >
                        <input
                          type="radio"
                          name={item.id}
                          className="mt-0.5"
                          checked={chosen === oi}
                          onChange={() => {
                            setAnswers((prev) => ({ ...prev, [item.id]: oi }));
                            setChecked(false);
                          }}
                        />
                        <span>{option}</span>
                      </label>
                    ))}
                  </div>
                  {checked && (
                    <p className="border-t border-ink/20 pt-2 text-xs leading-relaxed text-muted-foreground">
                      {item.explanation}
                    </p>
                  )}
                </CardContent>
              </Card>
            );
          })}
        </div>

        <div className="double-rule-t mt-8 flex items-center justify-between pt-6">
          <Button variant="secondary" onClick={check}>
            Check answers
          </Button>
          {checked && (
            <span
              className={cn(
                "font-mono text-xs font-semibold uppercase tracking-[0.1em]",
                fraction === 1 ? "text-pass" : "text-crimson",
              )}
            >
              {correctCount} of {quiz.length} correct
            </span>
          )}
        </div>
      </main>
    </div>
  );
}
