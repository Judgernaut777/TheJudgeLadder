import { Link } from "react-router";
import { AppHeader } from "@/components/AppHeader";
import { Seal } from "@/components/Seal";
import { useAuth } from "@/hooks/useAuth";
import { trpc } from "@/providers/trpc";

export default function Certificates() {
  const { isAuthenticated, isLoading } = useAuth({ redirectOnUnauthenticated: true });
  const certs = trpc.certs.mine.useQuery(undefined, { enabled: isAuthenticated });

  if (isLoading || !isAuthenticated) {
    return (
      <div className="min-h-screen bg-background">
        <AppHeader />
        <main className="ledger-frame max-w-4xl py-16 font-mono text-xs uppercase tracking-[0.14em] text-muted-foreground">
          Loading…
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <AppHeader />
      <main className="ledger-frame max-w-4xl py-10">
        <h1 className="mb-2 font-display text-3xl font-semibold tracking-tight">
          Certificates
        </h1>
        <p className="mb-10 text-sm text-muted-foreground">
          Each certificate carries a serial anyone can check on the{" "}
          <Link to="/verify" className="underline underline-offset-4">
            verification page
          </Link>
          .
        </p>
        {(certs.data ?? []).length === 0 ? (
          <div className="double-rule-t double-rule-b py-12 text-center">
            <p className="font-display text-lg italic text-muted-foreground">
              No certificates yet. Pass a gate to earn your first rung.
            </p>
          </div>
        ) : (
          <div className="space-y-8">
            {(certs.data ?? []).map((cert) => (
              <div
                key={cert.id}
                className="double-rule-t double-rule-b relative flex flex-wrap items-center justify-between gap-6 bg-card px-6 py-8 sm:px-10"
              >
                <div className="space-y-2">
                  <p className="micro-label text-muted-foreground">
                    AIJL {cert.courseCode} · Register of record
                  </p>
                  <h2 className="font-display text-2xl font-semibold tracking-tight">
                    {cert.confersLabel}
                  </h2>
                  <p className="text-sm text-muted-foreground">{cert.courseTitle}</p>
                  <p className="pt-2 font-mono text-xs tracking-[0.08em]">
                    SERIAL <span className="font-semibold">{cert.serial}</span>
                  </p>
                  <p className="font-mono text-[11px] text-muted-foreground">
                    ISSUED {new Date(cert.issuedAt).toLocaleDateString()}
                  </p>
                </div>
                <Seal size={110} center="AIJL" sub="GATE PASSED" />
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
