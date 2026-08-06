import { Link } from "react-router";
import { courses, PROGRAM_NAME } from "@contracts/content";
import { AppHeader } from "@/components/AppHeader";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";

export default function Home() {
  const { isAuthenticated } = useAuth();

  return (
    <div className="min-h-screen bg-background">
      <AppHeader />
      <main className="ledger-frame py-10">
        {/* Masthead */}
        <section className="double-rule-t double-rule-b mb-12 space-y-6 py-10 text-center">
          <p className="micro-label text-muted-foreground">
            The AI Judgement Ladder · Register of courses
          </p>
          <h1 className="mx-auto max-w-3xl font-display text-4xl font-semibold leading-tight tracking-tight sm:text-5xl">
            Judgement is trained like a skill and certified like one.
          </h1>
          <p className="mx-auto max-w-2xl font-display text-lg italic leading-relaxed text-muted-foreground">
            Eight courses from "you can talk to an LLM" to "you can certify an
            AI-driven workflow." No percentages on the wall — each rung ends in an
            auto-scored Go/No-Go gate, and the gate's word is final.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
            <Button asChild size="lg">
              <Link to="/aipab">Take the AIPAB placement battery</Link>
            </Button>
            {!isAuthenticated && (
              <Button asChild variant="outline" size="lg">
                <Link to="/login">Sign in</Link>
              </Button>
            )}
          </div>
          <p className="mx-auto max-w-xl text-sm text-muted-foreground">
            Experienced with AI? The battery places you on the ladder in a single
            sitting and substitutes for prerequisite certifications.
          </p>
        </section>

        {/* The register — course ledger */}
        <section>
          <div className="mb-4 flex items-baseline justify-between">
            <h2 className="font-display text-2xl font-semibold tracking-tight">
              The register
            </h2>
            <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-muted-foreground">
              {courses.length} entries · two tracks
            </p>
          </div>

          <div className="hidden grid-cols-[4rem_1fr_9rem_7rem] gap-x-4 border-b-2 border-ink/70 px-4 pb-2 sm:grid">
            <span className="micro-label">Code</span>
            <span className="micro-label">Title</span>
            <span className="micro-label">Duration</span>
            <span className="micro-label text-right">Track</span>
          </div>

          <div>
            {courses.map((course) => (
              <Link
                key={course.code}
                to={`/course/${course.slug}`}
                className="register-row grid grid-cols-[3.5rem_1fr] gap-x-4 gap-y-1 border-b border-ink/25 px-4 py-4 sm:grid-cols-[4rem_1fr_9rem_7rem] sm:items-baseline"
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
                  <span className="register-dim block truncate text-xs text-muted-foreground">
                    {course.summary}
                  </span>
                </span>
                <span className="register-dim font-mono text-[11px] uppercase tracking-[0.1em] text-muted-foreground">
                  {course.durationDays} day{course.durationDays === 1 ? "" : "s"}
                </span>
                <span className="register-dim text-right font-mono text-[11px] uppercase tracking-[0.1em] text-muted-foreground">
                  {course.track === "supplemental" ? "Suppl." : "Core"}
                </span>
              </Link>
            ))}
          </div>

          <div className="mt-8 grid gap-6 border border-ink/30 bg-card p-6 sm:grid-cols-3">
            <div>
              <p className="micro-label mb-2">The rule of the ladder</p>
              <p className="text-sm leading-relaxed text-muted-foreground">
                Complete every lesson, then sit the gate: 85% on knowledge, 90% on the
                practical demonstration. Both required. Attempts are free; the standard
                is not.
              </p>
            </div>
            <div>
              <p className="micro-label mb-2">The supplemental track</p>
              <p className="text-sm leading-relaxed text-muted-foreground">
                402 and 502 branch off the core. The 302 section of the AIPAB gates
                them — fail it and the branch locks for that sitting, but the core
                track continues.
              </p>
            </div>
            <div>
              <p className="micro-label mb-2">Verification</p>
              <p className="text-sm leading-relaxed text-muted-foreground">
                Every certificate carries a serial. Anyone can check a claim on the{" "}
                <Link to="/verify" className="underline underline-offset-4">
                  verification page
                </Link>
                .
              </p>
            </div>
          </div>
        </section>
      </main>

      <footer className="double-rule-t mt-16">
        <div className="ledger-frame flex flex-wrap items-center justify-between gap-2 py-6">
          <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-muted-foreground">
            {PROGRAM_NAME}
          </p>
          <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-muted-foreground">
            Judgement, rung by rung
          </p>
        </div>
      </footer>
    </div>
  );
}
