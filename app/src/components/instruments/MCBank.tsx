// Multiple-choice player for gate sittings. Sanitized items only —
// correct/incorrect highlighting appears only after the server scores.
import type { SanitizedMCItem } from "@contracts/content/types";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

export interface MCBankProps {
  items: SanitizedMCItem[];
  value: Record<string, unknown>; // itemId -> option index
  onChange: (v: Record<string, unknown>) => void;
  /** Server verdict after submit: wrong item ids. */
  wrongIds?: Set<string> | null;
  disabled?: boolean;
}

export function MCBank({ items, value, onChange, wrongIds, disabled }: MCBankProps) {
  return (
    <div className="space-y-4">
      {items.map((item, idx) => {
        const chosen = value[item.id] as number | undefined;
        const wrong = wrongIds?.has(item.id);
        return (
          <Card
            key={item.id}
            className={cn(
              wrong && "border-crimson/60 bg-destructive/10",
            )}
          >
            <CardContent className="space-y-3 pt-5">
              <p className="text-[15px] font-medium">
                <span className="mr-2 font-mono text-xs text-muted-foreground">
                  {String(idx + 1).padStart(2, "0")}
                </span>
                {item.question}
              </p>
              <div className="grid gap-2">
                {item.options.map((option, oi) => (
                  <label
                    key={oi}
                    className={cn(
                      "flex cursor-pointer items-start gap-2 rounded-sm border border-foreground/25 p-2 text-sm",
                      chosen === oi && "border-foreground bg-sage/20",
                      disabled && "cursor-default opacity-80",
                    )}
                  >
                    <input
                      type="radio"
                      name={item.id}
                      className="mt-0.5"
                      checked={chosen === oi}
                      disabled={disabled}
                      onChange={() => onChange({ ...value, [item.id]: oi })}
                    />
                    <span>{option}</span>
                  </label>
                ))}
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}
