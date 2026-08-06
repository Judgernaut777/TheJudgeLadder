import { useState } from "react";
import { AppHeader } from "@/components/AppHeader";
import { Seal } from "@/components/Seal";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { trpc } from "@/providers/trpc";

export default function Verify() {
  const [serial, setSerial] = useState("");
  const [submitted, setSubmitted] = useState<string | null>(null);

  const result = trpc.certs.verify.useQuery(
    { serial: submitted ?? "" },
    { enabled: !!submitted },
  );

  return (
    <div className="min-h-screen bg-background">
      <AppHeader />
      <main className="ledger-frame max-w-2xl py-10">
        <h1 className="mb-2 font-display text-3xl font-semibold tracking-tight">Verify a certificate</h1>
        <p className="mb-8 text-sm text-muted-foreground">
          Enter the serial printed on an AIJL certificate (e.g. AIJL-101-XXXXXXXX).
        </p>
        <form
          className="mb-8 flex gap-2"
          onSubmit={(e) => {
            e.preventDefault();
            if (serial.trim().length >= 4) setSubmitted(serial.trim());
          }}
        >
          <Input
            value={serial}
            onChange={(e) => {
              setSerial(e.target.value);
              setSubmitted(null);
            }}
            placeholder="AIJL-101-…"
            className="font-mono"
          />
          <Button type="submit" disabled={result.isFetching}>
            {result.isFetching ? "Checking…" : "Verify"}
          </Button>
        </form>

        {submitted && result.data && (
          <div className="double-rule-t double-rule-b py-6">
            {result.data.found ? (
              <div className="flex flex-wrap items-center justify-between gap-6">
                <div className="space-y-1.5 text-sm">
                  <p className="micro-label text-pass">Valid — entered in the register</p>
                  <p className="font-mono text-xs">{submitted}</p>
                  <p className="pt-2 font-display text-lg font-semibold">
                    {result.data.confersLabel}
                  </p>
                  <p>
                    <span className="text-muted-foreground">Holder:</span> {result.data.holderName}
                  </p>
                  <p>
                    <span className="text-muted-foreground">Course:</span> AIJL{" "}
                    {result.data.courseCode} — {result.data.courseTitle}
                  </p>
                  <p>
                    <span className="text-muted-foreground">Issued:</span>{" "}
                    {new Date(result.data.issuedAt).toLocaleDateString()}
                  </p>
                </div>
                <Seal size={96} center="AIJL" sub="VERIFIED" />
              </div>
            ) : (
              <div>
                <p className="micro-label text-crimson">Not found in the register</p>
                <p className="mt-1 font-mono text-xs">{submitted}</p>
                <p className="mt-3 text-sm text-muted-foreground">
                  No certificate carries this serial. Check the characters and try again.
                </p>
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  );
}
