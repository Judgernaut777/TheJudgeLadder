import { useEffect, useMemo, useState } from "react";
import { Link, useParams } from "react-router";
import { allLessons, getCourse, getLesson } from "@contracts/content";
import { AppHeader } from "@/components/AppHeader";
import { ContentBlocks } from "@/components/ContentBlocks";
import {
  InstrumentPlayer,
  type InstrumentValue,
} from "@/components/instruments/InstrumentPlayer";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";
import { trpc } from "@/providers/trpc";
import NotFound from "./NotFound";

export default function LessonPage() {
  const { slug, lessonId } = useParams<{ slug: string; lessonId: string }>();
  const course = slug ? getCourse(slug) : undefined;
  const found = course && lessonId ? getLesson(course, lessonId) : undefined;
  const { isAuthenticated } = useAuth();
  const utils = trpc.useUtils();

  const progress = trpc.progress.courseProgress.useQuery(
    { courseCode: course?.code ?? "" },
    { enabled: isAuthenticated && !!course },
  );
  const completeMutation = trpc.progress.completeLesson.useMutation({
    onSuccess: async () => {
      if (course) {
        await utils.progress.courseProgress.invalidate({ courseCode: course.code });
        await utils.progress.myOverview.invalidate();
      }
    },
  });

  const [practiceAnswers, setPracticeAnswers] = useState<Record<string, InstrumentValue>>({});

  useEffect(() => {
    setPracticeAnswers({});
  }, [lessonId]);

  const navigation = useMemo(() => {
    if (!course || !lessonId) return { prev: undefined, next: undefined };
    const flat = allLessons(course);
    const idx = flat.findIndex((pair) => pair.lesson.id === lessonId);
    return {
      prev: idx > 0 ? flat[idx - 1].lesson : undefined,
      next: idx >= 0 && idx < flat.length - 1 ? flat[idx + 1].lesson : undefined,
    };
  }, [course, lessonId]);

  if (!course || !found) return <NotFound />;
  const { lesson, module } = found;
  const completed = (progress.data?.lessons ?? []).some((p) => p.lessonId === lesson.id);

  return (
    <div className="min-h-screen bg-background">
      <AppHeader />
      <main className="ledger-frame max-w-3xl py-10">
        <div className="mb-8 space-y-3">
          <div className="flex flex-wrap items-center gap-2 font-mono text-[11px] uppercase tracking-[0.12em] text-muted-foreground">
            <Link to={`/course/${course.slug}`} className="hover:text-foreground hover:underline underline-offset-4">
              AIJL {course.code} — {course.title}
            </Link>
            <span>/</span>
            <span>{module.title}</span>
          </div>
          <h1 className="font-display text-3xl font-semibold leading-tight tracking-tight">
            {lesson.title}
          </h1>
          {lesson.frameworkRef && (
            <p className="micro-label text-muted-foreground">
              Framework · {lesson.frameworkRef}
            </p>
          )}
        </div>

        <article className="space-y-4">
          <ContentBlocks blocks={lesson.blocks} />
        </article>

        {lesson.practice && lesson.practice.length > 0 && (
          <section className="mt-12 space-y-6">
            <div className="rule-ink-t pt-6">
              <h2 className="font-display text-2xl font-semibold tracking-tight">
                Practice
              </h2>
              <p className="mt-1 text-sm text-muted-foreground">
                Ungraded. Check your answers as often as you like — the gate will not
                be this forgiving.
              </p>
            </div>
            {lesson.practice.map((instrument) => (
              <InstrumentPlayer
                key={instrument.id}
                instrument={instrument}
                mode="practice"
                value={practiceAnswers[instrument.id] ?? {}}
                onChange={(v) =>
                  setPracticeAnswers((prev) => ({ ...prev, [instrument.id]: v }))
                }
              />
            ))}
          </section>
        )}

        <div className="double-rule-t mt-12 flex flex-wrap items-center justify-between gap-3 pt-6">
          <div className="flex gap-2">
            {navigation.prev && (
              <Button asChild variant="outline">
                <Link to={`/course/${course.slug}/lesson/${navigation.prev.id}`}>
                  ← Prev
                </Link>
              </Button>
            )}
          </div>
          <div className="flex items-center gap-3">
            {isAuthenticated &&
              (completed ? (
                <span className="font-mono text-[11px] font-semibold uppercase tracking-[0.12em] text-pass">
                  ✓ Completed
                </span>
              ) : (
                <Button
                  onClick={() =>
                    completeMutation.mutate({ courseCode: course.code, lessonId: lesson.id })
                  }
                  disabled={completeMutation.isPending}
                >
                  Mark complete
                </Button>
              ))}
            {navigation.next ? (
              <Button asChild variant="outline">
                <Link to={`/course/${course.slug}/lesson/${navigation.next.id}`}>
                  Next →
                </Link>
              </Button>
            ) : (
              <Button asChild>
                <Link to={`/course/${course.slug}/gate`}>To the gate →</Link>
              </Button>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
