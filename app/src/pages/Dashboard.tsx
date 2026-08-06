import { Link } from "react-router";
import { courses, lessonCount } from "@contracts/content";
import { AppHeader } from "@/components/AppHeader";
import { Seal } from "@/components/Seal";
import { Progress } from "@/components/ui/progress";
import { useAuth } from "@/hooks/useAuth";
import { trpc } from "@/providers/trpc";

export default function Dashboard() {
  const { isAuthenticated, isLoading } = useAuth({ redirectOnUnauthenticated: true });
  const overview = trpc.progress.myOverview.useQuery(undefined, {
    enabled: isAuthenticated,
  });

  if (isLoading || !isAuthenticated) {
    return (
      <div className="min-h-screen bg-background">
        <AppHeader />
        <main className="ledger-frame py-16 font-mono text-xs uppercase tracking-[0.14em] text-muted-foreground">
          Loading…
        </main>
      </div>
    );
  }

  const progressByCourse = new Map<string, number>();
  for (const row of overview.data?.progress ?? []) {
    progressByCourse.set(row.courseCode, (progressByCourse.get(row.courseCode) ?? 0) + 1);
  }
  const certifiedCourses = new Set((overview.data?.certificates ?? []).map((c) => c.courseCode));
  const attemptsByCourse = new Map<string, NonNullable<typeof overview.data>["attempts"]>();
  for (const a of overview.data?.attempts ?? []) {
    const list = attemptsByCourse.get(a.courseCode) ?? [];
    list.push(a);
    attemptsByCourse.set(a.courseCode, list);
  }

  const ordered = [...courses].sort(
    (a, b) => courses.indexOf(a) - courses.indexOf(b),
  );

  return (
    <div className="min-h-screen bg-background">
      <AppHeader />
      <main className="ledger-frame py-10">
        <div className="mb-8 flex flex-wrap items-baseline justify-between gap-2">
          <h1 className="font-display text-3xl font-semibold tracking-tight">
            Your standing
          </h1>
          <p className="micro-label text-muted-foreground">
            {certifiedCourses.size} of {ordered.length} certified
          </p>
        </div>

        <div className="hidden grid-cols-[4rem_1fr_10rem_12rem_7rem] gap-x-4 border-b-2 border-ink/70 px-4 pb-2 sm:grid">
          <span className="micro-label">Code</span>
          <span className="micro-label">Course</span>
          <span className="micro-label">Lessons</span>
          <span className="micro-label">Gate record</span>
          <span className="micro-label text-right">Standing</span>
        </div>

        <div>
          {ordered.map((course) => {
            const done = progressByCourse.get(course.code) ?? 0;
            const total = lessonCount(course);
            const pctValue = total ? Math.round((done / total) * 100) : 0;
            const certified = certifiedCourses.has(course.code);
            const attempts = attemptsByCourse.get(course.code) ?? [];
            const lastAttempt = attempts.at(0);
            return (
              <Link
                key={course.code}
                to={`/course/${course.slug}`}
                className="register-row grid grid-cols-[3rem_1fr] gap-x-4 gap-y-2 border-b border-ink/25 px-4 py-4 sm:grid-cols-[4rem_1fr_10rem_12rem_7rem] sm:items-center"
              >
                <span className="font-mono text-sm font-semibold">
                  {course.code}
                  {course.track === "supplemental" && (
                    <span className="text-crimson">+</span>
                  )}
                </span>
                <span className="min-w-0">
                  <span className="block truncate font-display text-[15px] font-medium">
                    {course.title}
                  </span>
                  <span className="mt-1 flex items-center gap-3">
                    <Progress value={pctValue} className="h-1.5 w-24" />
                    <span className="register-dim font-mono text-[11px] text-muted-foreground">
                      {pctValue}%
                    </span>
                  </span>
                </span>
                <span className="register-dim font-mono text-[11px] text-muted-foreground">
                  {done}/{total} lessons
                </span>
                <span className="register-dim font-mono text-[11px] text-muted-foreground">
                  {attempts.length === 0
                    ? "no sittings"
                    : `${attempts.length} sitting${attempts.length === 1 ? "" : "s"}` +
                      (lastAttempt?.mcScore != null
                        ? ` · MC ${Math.round(lastAttempt.mcScore * 100)} / PR ${Math.round(
                            (lastAttempt.practicalScore ?? 0) * 100,
                          )}`
                        : " · unsubmitted")}
                </span>
                <span className="sm:text-right">
                  {certified ? (
                    <span className="inline-flex items-center gap-1.5">
                      <Seal size={30} center="AIJL" sub="CERTIFIED" />
                    </span>
                  ) : lastAttempt?.passed === false ? (
                    <span className="font-mono text-[10px] font-semibold uppercase tracking-[0.12em] text-crimson">
                      No-Go
                    </span>
                  ) : done > 0 ? (
                    <span className="font-mono text-[10px] uppercase tracking-[0.12em] text-muted-foreground">
                      In progress
                    </span>
                  ) : (
                    <span className="font-mono text-[10px] uppercase tracking-[0.12em] text-muted-foreground">
                      —
                    </span>
                  )}
                </span>
              </Link>
            );
          })}
        </div>
      </main>
    </div>
  );
}
