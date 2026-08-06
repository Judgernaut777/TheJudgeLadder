import { Button } from "@/components/ui/button";
import { Link } from "react-router";

export default function NotFound() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="double-rule-t double-rule-b w-full max-w-sm py-8 text-center">
        <p className="font-display text-6xl font-semibold tracking-tight">404</p>
        <p className="micro-label mt-2 text-muted-foreground">
          Not entered in the register
        </p>
        <p className="mt-4 text-sm text-muted-foreground">
          This page does not exist — or has not been written yet.
        </p>
        <Button asChild className="mt-6">
          <Link to="/">Back to the register</Link>
        </Button>
      </div>
    </div>
  );
}
