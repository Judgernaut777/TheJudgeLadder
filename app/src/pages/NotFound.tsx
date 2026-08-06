import { Link } from "react-router";
import { AppHeader } from "@/components/AppHeader";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-background">
      <AppHeader />
      <main className="ledger-frame py-24 text-center">
        <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-muted-foreground">
          No such entry
        </p>
        <h1 className="mt-2 font-display text-4xl font-semibold tracking-tight">
          This page is not in the register.
        </h1>
        <Button asChild className="mt-8">
          <Link to="/">Back to the register</Link>
        </Button>
      </main>
    </div>
  );
}
