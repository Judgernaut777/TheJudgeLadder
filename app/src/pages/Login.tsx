import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { trpc } from "@/providers/trpc";

function getOAuthUrl() {
  const kimiAuthUrl = import.meta.env.VITE_KIMI_AUTH_URL;
  const appID = import.meta.env.VITE_APP_ID;
  const redirectUri = `${window.location.origin}/api/oauth/callback`;
  // base64url: standard base64 can contain "+", which URL query decoding
  // turns into a space, corrupting the redirect URI on the way back.
  const state = btoa(redirectUri)
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/, "");

  const url = new URL(`${kimiAuthUrl}/api/oauth/authorize`);
  url.searchParams.set("client_id", appID);
  url.searchParams.set("redirect_uri", redirectUri);
  url.searchParams.set("response_type", "code");
  url.searchParams.set("scope", "profile");
  url.searchParams.set("state", state);

  return url.toString();
}

/** Local (Docker) deployments: username/password against the app's own
 *  database instead of Kimi OAuth. */
function LocalLoginForm() {
  const utils = trpc.useUtils();
  const [mode, setMode] = useState<"login" | "register">("login");
  const [username, setUsername] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);

  const onSuccess = async () => {
    await utils.invalidate();
    window.location.href = "/";
  };
  const onError = (e: { message: string }) => setError(e.message);

  const loginMutation = trpc.localAuth.login.useMutation({ onSuccess, onError });
  const registerMutation = trpc.localAuth.register.useMutation({ onSuccess, onError });
  const pending = loginMutation.isPending || registerMutation.isPending;

  return (
    <CardContent className="space-y-4">
      <div className="grid grid-cols-2 gap-2">
        <Button
          type="button"
          variant={mode === "login" ? "default" : "outline"}
          onClick={() => setMode("login")}
        >
          Sign in
        </Button>
        <Button
          type="button"
          variant={mode === "register" ? "default" : "outline"}
          onClick={() => setMode("register")}
        >
          Create account
        </Button>
      </div>
      <form
        className="space-y-3"
        onSubmit={(e) => {
          e.preventDefault();
          setError(null);
          if (mode === "login") {
            loginMutation.mutate({ username, password });
          } else {
            registerMutation.mutate({ username, password, displayName: displayName || undefined });
          }
        }}
      >
        <div className="space-y-1">
          <Label htmlFor="username">Username</Label>
          <Input
            id="username"
            autoComplete="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        {mode === "register" && (
          <div className="space-y-1">
            <Label htmlFor="displayName">Display name (optional)</Label>
            <Input
              id="displayName"
              value={displayName}
              onChange={(e) => setDisplayName(e.target.value)}
            />
          </div>
        )}
        <div className="space-y-1">
          <Label htmlFor="password">Password</Label>
          <Input
            id="password"
            type="password"
            autoComplete={mode === "login" ? "current-password" : "new-password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          {mode === "register" && (
            <p className="text-xs text-muted-foreground">At least 8 characters.</p>
          )}
        </div>
        {error && <p className="border border-crimson/60 bg-destructive/10 p-2 text-sm">{error}</p>}
        <Button className="w-full" size="lg" type="submit" disabled={pending}>
          {pending ? "Working…" : mode === "login" ? "Sign in" : "Create account"}
        </Button>
      </form>
    </CardContent>
  );
}

export default function Login() {
  const modeQuery = trpc.localAuth.mode.useQuery(undefined, { staleTime: Infinity });

  return (
    <div
      className="flex min-h-screen items-center justify-center bg-sage px-4 text-ink"
      style={{
        backgroundImage:
          "repeating-linear-gradient(0deg, hsl(60 11% 11% / 0.05) 0 1px, transparent 1px 26px)",
      }}
    >
      <Card className="double-rule-t w-full max-w-sm border-ink/40 bg-card">
        <CardHeader className="text-center">
          <p className="micro-label mb-1 text-muted-foreground">
            AIJL · Examination register
          </p>
          <CardTitle className="font-display text-2xl font-semibold tracking-tight">
            Sign the register
          </CardTitle>
        </CardHeader>
        {modeQuery.data?.local ? (
          <LocalLoginForm />
        ) : (
          <CardContent>
            <Button
              className="w-full"
              size="lg"
              onClick={() => {
                window.location.href = getOAuthUrl();
              }}
            >
              Sign in with Kimi
            </Button>
          </CardContent>
        )}
      </Card>
    </div>
  );
}
