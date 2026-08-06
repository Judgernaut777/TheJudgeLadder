import { useState } from "react";
import { useNavigate } from "react-router";
import { PROGRAM_NAME } from "@contracts/content";
import { AppHeader } from "@/components/AppHeader";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/hooks/useAuth";
import { trpc } from "@/providers/trpc";

export default function Login() {
  const [mode, setMode] = useState<"signin" | "register">("signin");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const { isAuthenticated, isLoading, refresh } = useAuth();

  const utils = trpc.useUtils();
  const signIn = trpc.localAuth.signIn.useMutation({
    onSuccess: async () => {
      await utils.invalidate();
      await refresh();
      navigate("/dashboard");
    },
    onError: (e) => setError(e.message),
  });
  const register = trpc.localAuth.register.useMutation({
    onSuccess: async () => {
      await utils.invalidate();
      await refresh();
      navigate("/dashboard");
    },
    onError: (e) => setError(e.message),
  });

  if (!isLoading && isAuthenticated) {
    navigate("/dashboard");
    return null;
  }

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    if (mode === "signin") {
      signIn.mutate({ username, password });
    } else {
      register.mutate({ username, password, name: name || undefined });
    }
  };

  const pending = signIn.isPending || register.isPending;

  return (
    <div className="min-h-screen bg-background">
      <AppHeader />
      <main className="ledger-frame max-w-md py-16">
        <div className="double-rule-t double-rule-b py-8">
          <p className="micro-label mb-2 text-center text-muted-foreground">
            {PROGRAM_NAME}
          </p>
          <h1 className="mb-8 text-center font-display text-3xl font-semibold tracking-tight">
            {mode === "signin" ? "Sign in" : "Register"}
          </h1>
          <form onSubmit={submit} className="space-y-4">
            {mode === "register" && (
              <div className="space-y-1.5">
                <label className="micro-label" htmlFor="name">
                  Display name
                </label>
                <Input
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="As it should appear on certificates"
                  autoComplete="name"
                />
              </div>
            )}
            <div className="space-y-1.5">
              <label className="micro-label" htmlFor="username">
                Username
              </label>
              <Input
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                autoComplete="username"
                required
              />
            </div>
            <div className="space-y-1.5">
              <label className="micro-label" htmlFor="password">
                Password
              </label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete={mode === "signin" ? "current-password" : "new-password"}
                required
              />
            </div>
            {error && (
              <p className="border border-crimson/60 bg-destructive/10 p-3 text-sm">
                {error}
              </p>
            )}
            <Button type="submit" className="w-full" disabled={pending}>
              {pending
                ? "Working…"
                : mode === "signin"
                  ? "Sign in"
                  : "Create account"}
            </Button>
          </form>
          <div className="mt-6 text-center">
            <button
              type="button"
              className="font-mono text-xs uppercase tracking-[0.12em] text-muted-foreground underline underline-offset-4 hover:text-foreground"
              onClick={() => {
                setMode(mode === "signin" ? "register" : "signin");
                setError(null);
              }}
            >
              {mode === "signin"
                ? "No account? Register"
                : "Have an account? Sign in"}
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}
