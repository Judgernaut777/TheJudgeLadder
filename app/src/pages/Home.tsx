import { Link } from "react-router";
import { courses, getCourse, lessonCount, PROGRAM_NAME, RUNGS } from "@contracts/content";
import { AppHeader } from "@/components/AppHeader";
import { Seal } from "@/components/Seal";
import { Progress } from "@/components/ui/progress";
import { useAuth } from "@/hooks/useAuth";
import { trpc } from "@/providers/trpc";

function CourseRow({ code }: { code: string }) {
  const course = getCourse(code);
  const { isAuthenticated } = useAuth();
  const overview = trpc.progress.myOverview.useQuery(undefined, {
    enabled: isAuthenticated,
  });
  if (!course) return null;

  const done =
    overview.data?.progress.filter((p) => p.courseCode === course.code).length ?? 0;
  const total = lessonCount(course);
  const pct = total ? Math.round((done / total) * 100) : 0;
  const certified = (overview.data?.certificates ?? []).some(
    (c) => c.courseCode === course.code,
  );

  return (
    <Link
      to={`/course/${course.slug}`}
      className="register-row group grid grid-cols-[3.5rem_1fr] gap-x-4 border-b border-ink/30 px-4 py-4 sm:grid-cols-[4.5rem_1fr_8rem_15rem_8.5rem] sm:items-center sm:px-5"
    >
      <span className="font-mono text-sm font-semibold tracking-wide">
        {course.code}
        {course.track === "supplemental" && (
          <span className="text-crimson">+</span>
        )}
      </span>
      <span className="min-w-0">
        <span className="block font-display text-[17px] font-semibold leading-snug">
          {course.title}
        </span>
        <span className="register-dim mt-0.5 line-clamp-1 block text-[13px] text-muted-foreground">
          {course.summary}
        </span>
      </span>
      <span className="register-dim col-start-2 mt-1 font-mono text-[11px] uppercase tracking-[0.08em] text-muted-foreground sm:col-start-auto sm:mt-0">
        {course.durationDays}d · {total} lessons
      </span>
      <span className="register-dim col-start-2 mt-1 line-clamp-2 font-display text-[13px] italic leading-snug text-muted-foreground sm:col-start-auto sm:mt-0">
        “{course.gateText}”
      </span>
      <span className="col-start-2 mt-2 flex items-center gap-2 sm:col-start-auto sm:mt-0 sm:justify-end">
        {certified ? (
          <span className="flex items-center gap-2">
            <Seal size={38} center="AIJL" sub="CERTIFIED" />
            <span className="font-mono text-[10px] font-semibold uppercase tracking-[0.12em] text-crimson">
              Certified
            </span>
          </span>
        ) : isAuthenticated && done > 0 ? (
          <span className="flex w-full flex-col gap-1">
            <span className="font-mono text-[11px] text-muted-foreground">{pct}%</span>
            <Progress value={pct} className="h-1.5 w-full sm:w-20" />
          </span>
        ) : (
          <span className="font-mono text-[11px] text-muted-foreground">—</span>
        )}
      </span>
    </Link>
  );
}

export default function Home() {
  const { isAuthenticated } = useAuth();
  const overview = trpc.progress.myOverview.useQuery(undefined, {
    enabled: isAuthenticated,
  });
  const latestPlacement = overview.data?.aipabAttempts?.find(
    (a) => a.completedAt && a.placementRung != null,
  );

  return (
    <div className="min-h-screen bg-background">
      <AppHeader />

      {/* Cover — the register's title page, on sage */}
      <div
        className="border-b border-ink/40 bg-sage text-ink"
        style={{
          backgroundImage:
            "repeating-linear-gradient(0deg, hsl(60 11% 11% / 0.05) 0 1px, transparent 1px 26px)",
        }}
      >
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-8 px-4 py-14 sm:px-10 sm:py-20">
          <div className="max-w-2xl space-y-5">
            <p className="micro-label">
              {PROGRAM_NAME} · Examination register
            </p>
            <h1 className="font-display text-4xl font-semibold leading-[1.08] tracking-tight sm:text-[3.4rem]">
              Judgment does not decrease as you delegate. It relocates — and
              intensifies.
            </h1>
            <p className="max-w-xl text-[15px] leading-relaxed text-ink/75">
              Eight self-paced courses up the Judge Ladder, from your first
              verified claim to governing systems that run themselves. Every
              course ends in one auto-scored Go/No-Go gate. Attendance does not
              certify; demonstrated judgment does.
            </p>
            <p className="font-mono text-xs leading-relaxed tracking-wide text-ink/80">
              <Link to="/aipab" className="underline underline-offset-4 hover:text-ink">
                AIPAB PLACEMENT BATTERY
              </Link>
              {" — "}4 hours · 8 sections · output is a rung, not a score.
              {latestPlacement && (
                <>
                  {" "}Your placement:{" "}
                  <span className="font-semibold">
                    Rung {latestPlacement.placementRung}
                    {latestPlacement.placementPlus ? "+" : ""}
                  </span>
                  .
                </>
              )}
            </p>
          </div>
          <Seal
            size={150}
            center="AIJL"
            sub="REGISTER"
            className="hidden opacity-80 md:block"
          />
        </div>
      </div>

      {/* The register proper */}
      <main className="ledger-frame py-12">
        <div className="hidden grid-cols-[4.5rem_1fr_8rem_15rem_8.5rem] gap-x-4 border-b-2 border-ink/70 px-5 pb-2 sm:grid">
          <span className="micro-label">Code</span>
          <span className="micro-label">Course</span>
          <span className="micro-label">Study</span>
          <span className="micro-label">The gate certifies</span>
          <span className="micro-label text-right">Standing</span>
        </div>

        {RUNGS.map((rung) => (
          <section key={rung.rung}>
            <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1 border-b border-ink/50 bg-sage/60 px-4 py-2.5 sm:px-5">
              <h2 className="font-mono text-xs font-semibold uppercase tracking-[0.18em]">
                Rung {rung.rung} — {rung.name}
              </h2>
              <span className="font-display text-[13px] italic text-ink/70">
                {rung.humanRole}
              </span>
            </div>
            <CourseRow code={rung.coreCode} />
            {rung.supplementalCode && <CourseRow code={rung.supplementalCode} />}
          </section>
        ))}

        <footer className="double-rule-t mt-16 pt-6">
          <p className="font-mono text-[11px] uppercase leading-relaxed tracking-[0.1em] text-muted-foreground">
            The AIJL curriculum teaches against The Judge Ladder™ framework ·
            Self-paced · Every gate certifies against the same standard · 28
            instructional days · One ladder ·{" "}
            {courses.reduce((n, c) => n + lessonCount(c), 0)} lessons
          </p>
        </footer>
      </main>
    </div>
  );
}
