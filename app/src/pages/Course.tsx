import { Link, useParams } from "react-router";
import { getCourse, lessonCount } from "@contracts/content";
import { AppHeader } from "@/components/AppHeader";
import { Seal } from "@/components/Seal";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { useAuth } from "@/hooks/useAuth";
import { trpc } from "@/providers/trpc";
import NotFound from "./NotFound";

export default function CoursePage() {
  const { slug } = useParams<{ slug: string }>();
  const course = slug ? getCourse(slug) : undefined;
  const { isAuthenticated } = useAuth();

  const progress = trpc.progress.courseProgress.useQuery(
    { courseCode: course?.code ?? "" },
    { enabled: isAuthenticated && !!course },
  );
  const attempts = trpc.gate.myAttempts.useQuery(
    { courseCode: course?.code ?? "" },
    { enabled: isAuthenticated && !!course },
  );
  const certs = trpc.certs.mine.useQuery(undefined, { enabled: isAuthenticated });

  if (!course) return <NotFound />;

  const doneIds = new Set((progress.data?.lessons ?? []).map((p) => p.lessonId));
  const quizBest = new Map(
    (progress.data?.quizScores ?? []).map((q) => [q.moduleId, q.bestScore]),
  );
  const total = lessonCount(course);
  const pct = total ? Math.round((doneIds.size / total) * 100) : 0;
  const certificate = (certs.data ?? []).find((c) => c.courseCode === course.code);
  const passedAttempts = (attempts.data ?? []).filter((a) => a.passed);

  return (
    <div className="min-h-screen bg-background">
      <AppHeader />
      <main className="ledger-frame max-w-5xl py-10">
        {/* Title block */}
        <div className="mb-10 space-y-4">
          <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
            <span className="font-mono text-sm font-semibold tracking-[0.1em]">
              AIJL {course.code}
              {course.track === "supplemental" && <span className="text-crimson">+</span>}
            </span>
            <span className="micro-label text-muted-foreground">{course.rungLabel}</span>
            <span className="micro-label text-muted-foreground">
              {course.durationDays} day{course.durationDays === 1 ? "" : "s"} · {total} lessons
            </span>
            {certificate && (
              <span className="flex items-center gap-2">
                <Seal size={34} center="AIJL" sub="CERTIFIED" />
                <span className="font-mono text-[10px] font-semibold uppercase tracking-[0.12em] text-crimson">
                  {certificate.serial}
                </span>
              </span>
            )}
          </div>
          <h1 className="font-display text-4xl font-semibold leading-tight tracking-tight">
            {course.title}
          </h1>
          <p className="max-w-2xl text-[15px] leading-relaxed text-muted-foreground">
            {course.summary}
          </p>
          <div className="double-rule-t double-rule-b py-4">
            <p className="micro-label mb-1.5 text-muted-foreground">
              The gate certifies ·{" "}
              {course.gateSource === "framework" ? "framework text" : "program-authored"}
            </p>
            <p className="font-display text-lg italic leading-snug">
              “{course.gateText}”
            </p>
          </div>
          {isAuthenticated ? (
            <div className="flex items-center gap-4">
              <Progress value={pct} className="flex-1" />
              <span className="font-mono text-xs text-muted-foreground">
                {doneIds.size}/{total}
              </span>
            </div>
          ) : (
            <p className="text-sm">
              <Link to="/login" className="underline underline-offset-4">
                Sign in
              </Link>{" "}
              to track progress and sit the gate.
            </p>
          )}
        </div>

        {/* Module register */}
        <div className="space-y-8">
          {course.modules.map((module, mi) => (
            <section key={module.id}>
              <div className="flex flex-wrap items-baseline justify-between gap-x-4 border-b border-ink/50 bg-sage/50 px-4 py-2">
                <h2 className="font-mono text-xs font-semibold uppercase tracking-[0.16em]">
                  Module {mi + 1} — {module.title}
                </h2>
                {module.subtitle && (
                  <span className="font-display text-[13px] italic text-ink/65">
                    {module.subtitle}
                  </span>
                )}
              </div>
              <ul>
                {module.quiz && module.quiz.length > 0 && (
                  <li>
                    <Link
                      to={`/course/${course.slug}/module/${module.id}/quiz`}
                      className="register-row flex items-center justify-between gap-3 border-b border-ink/25 px-4 py-3"
                    >
                      <span className="flex items-center gap-3">
                        <span className="font-mono text-[11px] text-muted-foreground register-dim">
                          KC
                        </span>
                        <span className="text-sm font-medium">
                          Knowledge check — {module.quiz.length} auto-scored questions
                        </span>
                      </span>
                      {quizBest.has(module.id) && (
                        <span className="register-dim font-mono text-[11px] text-muted-foreground">
                          best {Math.round((quizBest.get(module.id) ?? 0) * 100)}%
                        </span>
                      )}
                    </Link>
                  </li>
                )}
                {module.lessons.map((lesson, li) => {
                  const done = doneIds.has(lesson.id);
                  return (
                    <li key={lesson.id}>
                      <Link
                        to={`/course/${course.slug}/lesson/${lesson.id}`}
                        className="register-row flex items-center justify-between gap-3 border-b border-ink/25 px-4 py-3"
                      >
                        <span className="flex items-center gap-3">
                          <span className="register-dim w-7 font-mono text-[11px] text-muted-foreground">
                            {String(li + 1).padStart(2, "0")}
                          </span>
                          <span
                            className={`flex size-4 items-center justify-center border text-[10px] ${
                              done
                                ? "border-pass bg-pass text-primary-foreground"
                                : "border-foreground/40"
                            }`}
                          >
                            {done ? "✓" : ""}
                          </span>
                          <span className="font-display text-[15px] font-medium">
                            {lesson.title}
                          </span>
                        </span>
                        <span className="register-dim font-mono text-[10px] uppercase tracking-[0.1em] text-muted-foreground">
                          {lesson.practice?.length
                            ? `${lesson.practice.length} practice`
                            : ""}
                        </span>
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </section>
          ))}
        </div>

        {/* The gate */}
        <section className="double-rule-t double-rule-b mt-12 space-y-4 py-6">
          <div className="flex flex-wrap items-baseline justify-between gap-2">
            <h2 className="font-display text-2xl font-semibold tracking-tight">
              The gate
            </h2>
            {attempts.data && attempts.data.length > 0 && (
              <p className="font-mono text-[11px] uppercase tracking-[0.1em] text-muted-foreground">
                Sittings {attempts.data.length} · Passed {passedAttempts.length}
              </p>
            )}
          </div>
          <p className="max-w-2xl text-sm leading-relaxed text-muted-foreground">
            Auto-scored Go/No-Go. Multiple choice at 85%+, practical at 90%+, both
            required. Complete every lesson first; prerequisite certifications are
            enforced.
          </p>
          <Button asChild size="lg">
            <Link to={`/course/${course.slug}/gate`}>
              {certificate ? "Review the gate" : "Enter the gate"}
            </Link>
          </Button>
        </section>
      </main>
    </div>
  );
}
