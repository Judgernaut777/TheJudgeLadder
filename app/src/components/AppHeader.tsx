import { Link, NavLink } from "react-router";
import { PROGRAM_NAME } from "@contracts/content";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";

const navItems = [
  { to: "/", label: "Courses" },
  { to: "/aipab", label: "AIPAB" },
  { to: "/dashboard", label: "Dashboard" },
  { to: "/certificates", label: "Certificates" },
  { to: "/verify", label: "Verify" },
];

export function AppHeader() {
  const { user, isAuthenticated, logout, isLoading } = useAuth();
  return (
    <header className="sticky top-0 z-40 border-b-0 bg-background/95 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-6xl items-center gap-6 px-4 sm:px-10">
        <Link to="/" className="flex items-center gap-2.5">
          <span className="inline-block size-2.5 rounded-full bg-crimson" aria-hidden />
          <span className="font-display text-lg font-semibold tracking-tight">
            {PROGRAM_NAME}
          </span>
        </Link>
        <nav className="flex flex-1 items-center gap-1 overflow-x-auto">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.to === "/"}
              className={({ isActive }) =>
                `px-2.5 py-1.5 font-mono text-[11px] font-medium uppercase tracking-[0.14em] ${
                  isActive
                    ? "bg-foreground text-background"
                    : "text-foreground/60 hover:text-foreground"
                }`
              }
            >
              {item.label}
            </NavLink>
          ))}
        </nav>
        <div className="flex items-center gap-3">
          {isLoading ? null : isAuthenticated ? (
            <>
              <span className="hidden font-mono text-xs text-muted-foreground sm:inline">
                {user?.name ?? "Signed in"}
              </span>
              <Button variant="outline" size="sm" onClick={logout}>
                Sign out
              </Button>
            </>
          ) : (
            <Button asChild size="sm">
              <Link to="/login">Sign in</Link>
            </Button>
          )}
        </div>
      </div>
      <div className="double-rule-b" />
    </header>
  );
}
