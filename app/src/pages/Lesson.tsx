import { useMemo, useState } from "react";
import { Link, useNavigate, useParams } from "react-router";
import { getCourse, getLesson, getModule, lessonCount } from "@contracts/content";
import { AppHeader } from "@/components/AppHeader";
import { ContentBlocks } from "@/components/ContentBlocks";
import { InstrumentPlayer, type InstrumentValue } from "@/components/instruments/InstrumentPlayer";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";
import { trpc } from "@/providers/trpc";
import NotFound from "./NotFound";

export default function LessonPage() {
  const { slug, lessonId } = useParams<{ slug: string; lessonId: string }>();
  const course = slug ? getCourse(slug) : undefined;
  const lesson = course && lessonId ? getLesson(course, lessonId) : undefined;
  const module = course && lesson ? getModule(course, lesson.moduleId) : undefined;
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const utils = trpc.useUtils();

  const [answers, setAnswers] = useState<Record<string, InstrumentValue>>({});
  const [completed, setCompleted] = useState(false);

  const completeMutation = trpc.progress.completeLesson.useMutation({
    onSuccess: async () => {
      setCompleted(true);
      await utils.progress.courseProgress.invalidate();
      await utils.progress.myOverview.invalidate();
    },
  });

  const flatLessons = useMemo(
    () => (course ? course.modules.flatMap((m) => m.lessons) : []),
    [course],
  );

  if (!course || !lesson || !module) return <NotFound />;

  const idx = flatLessons.findIndex((l) => l.id === lesson.id);
  const next = flatLessons[idx + 1];
  const practice = lesson.practice ?? [];

  return (
    <div className="min-h-screen bg-background">
      <AppHeader />
      <main className="ledger-frame max-w-4xl py-10">
        <p className="micro-label mb-2 text-muted-foreground">
          <Link to={`/course/${course.slug}`} className="hover:text-foreground">
            AIJL {course.code}
          </Link>{" "}
          · {module.title} · Lesson {idx + 1} of {lessonCount(course)}
        </p>
        <h1 className="mb-8 font-display text-3xl font-semibold tracking-tight">
          {lesson.title}
        </h1>

        {/* Reading */}
        <article className="mb-10">
          <ContentBlocks blocks={lesson.content} />
        </article>

        {/* Practice */}
        {practice.length > 0 && (
          <section className="mb-10 space-y-6">
            <div className="double-rule-t pt-6">
              <h2 className="mb-1 font-display text-2xl font-semibold tracking-tight">
                Practice
              </h2>
              <p className="text-sm text-muted-foreground">
                Self-check with keys. Nothing here counts toward the gate.
              </p>
            </div>
            {practice.map((instrument) => (
              <InstrumentPlayer
                key={instrument.id}
                instrument={instrument}
                mode="practice"
                value={answers[instrument.id] ?? {}}
                onChange={(v) => setAnswers((prev) => ({ ...prev, [instrument.id]: v }))}
              />
            ))}
          </section>
        )}

        {/* Completion + navigation */}
        <div className="double-rule-t flex flex-wrap items-center justify-between gap-4 pt-6">
          <div>
            {isAuthenticated ? (
              completed ? (
                <p className="font-mono text-xs font-semibold uppercase tracking-[0.12em] text-pass">
                  ✓ Recorded complete
                </p>
              ) : (
                <Button
                  variant="secondary"
                  onClick={() =>
                    completeMutation.mutate({
                      courseCode: course.code,
                      lessonId: lesson.id,
                    })
                  }
                  disabled={completeMutation.isPending}
                >
                  Mark lesson complete
                </Button>
              )
            ) : (
              <p className="text-sm text-muted-foreground">
                <Link to="/login" className="underline underline-offset-4">
                  Sign in
                </Link>{" "}
                to record completion.
              </p>
            )}
          </div>
          <div className="flex gap-2">
            {module.quiz && module.quiz.length > 0 && (
              <Button
                variant="outline"
                onClick={() =>
                  navigate(`/course/${course.slug}/module/${module.id}/quiz`)
                }
              >
                Knowledge check
              </Button>
            )}
            {next ? (
              <Button onClick={() => navigate(`/course/${course.slug}/lesson/${next.id}`)}>
                Next lesson →
              </Button>
            ) : (
              <Button onClick={() => navigate(`/course/${course.slug}/gate`)}>
                To the gate →
              </Button>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
