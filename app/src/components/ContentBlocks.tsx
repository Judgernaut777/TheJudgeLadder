import type { ContentBlock } from "@contracts/content/types";
import { cn } from "@/lib/utils";

function Callout({
  title,
  text,
  tone,
}: {
  title: string;
  text: string;
  tone?: "info" | "warning" | "key";
}) {
  const styles = {
    info: "border-foreground/35 bg-secondary/60",
    warning: "border-crimson/60 bg-destructive/10",
    key: "border-sage-deep/60 bg-sage/30",
  } as const;
  return (
    <div className={cn("rounded-sm border p-4", styles[tone ?? "info"])}>
      <p className="micro-label mb-1.5">{title}</p>
      <p className="text-sm leading-relaxed">{text}</p>
    </div>
  );
}

export function ContentBlocks({ blocks }: { blocks: ContentBlock[] }) {
  return (
    <div className="space-y-5">
      {blocks.map((block, i) => {
        switch (block.type) {
          case "heading":
            return (
              <h3
                key={i}
                className="rule-ink-b pb-2 pt-4 font-display text-xl font-semibold tracking-tight"
              >
                {block.text}
              </h3>
            );
          case "paragraph":
            return (
              <p key={i} className="document-prose text-foreground/90">
                {block.text}
              </p>
            );
          case "list":
            return (
              <ul key={i} className="document-prose list-none space-y-2 pl-1">
                {block.items.map((item, j) => (
                  <li key={j} className="flex gap-3">
                    <span className="mt-[0.7em] inline-block size-1.5 shrink-0 bg-foreground/70" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            );
          case "callout":
            return <Callout key={i} title={block.title} text={block.text} tone={block.tone} />;
          case "quote":
            return (
              <blockquote
                key={i}
                className="border-l-2 border-crimson/70 py-1 pl-5 font-display text-lg italic leading-relaxed text-foreground/85"
              >
                <p>{block.text}</p>
                {block.source && (
                  <footer className="micro-label mt-2 not-italic text-muted-foreground">
                    — {block.source}
                  </footer>
                )}
              </blockquote>
            );
          case "table":
            return (
              <div key={i} className="overflow-x-auto border border-ink/40">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-ink/40 bg-secondary/50">
                      {block.headers.map((h, j) => (
                        <th key={j} className="micro-label px-3 py-2 text-left">
                          {h}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {block.rows.map((row, j) => (
                      <tr key={j} className="border-b border-ink/20 last:border-0">
                        {row.map((cell, k) => (
                          <td key={k} className="px-3 py-2 align-top">
                            {cell}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            );
        }
      })}
    </div>
  );
}
