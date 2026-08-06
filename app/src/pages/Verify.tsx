import { useState } from "react";
import { useParams } from "react-router";
import { AppHeader } from "@/components/AppHeader";
import { Seal } from "@/components/Seal";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { trpc } from "@/providers/trpc";

export default function Verify() {
  const { serial: serialParam } = useParams<{ serial: string }>();
  const [serial, setSerial] = useState(serialParam ?? "");
  const [query, setQuery] = useState(serialParam ?? "");

  const lookup = trpc.certs.verify.useQuery(
    { serial: query },
    { enabled: query.trim().length > 0, retry: false },
  );

  const result = lookup.data;

  return (
    <div className="min-h-screen bg-background">
      <AppHeader />
      <main className="ledger-frame max-w-2xl py-16">
        <h1 className="mb-2 text-center font-display text-3xl font-semibold tracking-tight">
          Verify a certificate
        </h1>
        <p className="mb-10 text-center text-sm text-muted-foreground">
          Enter the serial printed on an AIJL certificate. No sign-in required.
        </p>
        <form
          className="flex gap-2"
          onSubmit={(e) => {
            e.preventDefault();
            setQuery(serial.trim());
          }}
        >
          <Input
            value={serial}
            onChange={(e) => setSerial(e.target.value)}
            placeholder="AIJL-201-…"
            className="font-mono"
          />
          <Button type="submit" disabled={lookup.isFetching}>
            Check
          </Button>
        </form>

        {query && (
          <div className="mt-10">
            {lookup.isFetching ? (
              <p className="text-center font-mono text-xs uppercase tracking-[0.14em] text-muted-foreground">
                Checking the register…
              </p>
            ) : result?.valid ? (
              <div className="double-rule-t double-rule-b flex flex-wrap items-center justify-between gap-6 bg-card px-6 py-8">
                <div className="space-y-1">
                  <p className="micro-label text-pass">Verified — on the register</p>
                  <h2 className="font-display text-2xl font-semibold tracking-tight">
                    {result.holderName}
                  </h2>
                  <p className="text-sm font-medium">{result.confersLabel}</p>
                  <p className="text-sm text-muted-foreground">{result.courseTitle}</p>
                  <p className="pt-2 font-mono text-xs text-muted-foreground">
                    {result.serial} · issued{" "}
                    {new Date(result.issuedAt).toLocaleDateString()}
                  </p>
                </div>
                <Seal size={96} center="AIJL" sub="VERIFIED" />
              </div>
            ) : (
              <div className="double-rule-t double-rule-b px-6 py-8 text-center">
                <p className="micro-label text-crimson">Not on the register</p>
                <p className="mt-2 text-sm text-muted-foreground">
                  No certificate carries this serial. Check the characters and try
                  again — or treat the claim as unverified.
                </p>
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  );
}
