// One engine renders every instrument kind — lesson practice (with keys,
// immediate feedback) and gate practicals (sanitized, answers only).
import { useMemo, useState } from "react";
import type {
  BooleanSetInstrument,
  ClassificationInstrument,
  DefectHuntInstrument,
  DispositionInstrument,
  Instrument,
  MatrixInstrument,
  SanitizedInstrument,
  TableFillInstrument,
} from "@contracts/content/types";
import { ContentBlocks } from "@/components/ContentBlocks";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { checkInstrument, verdictSummary } from "@/lib/instrumentCheck";
import { cn } from "@/lib/utils";

type AnyInstrument = Instrument | SanitizedInstrument;
export type InstrumentValue = Record<string, unknown>;

export interface InstrumentPlayerProps {
  instrument: AnyInstrument;
  value: InstrumentValue;
  onChange: (value: InstrumentValue) => void;
  mode: "practice" | "gate";
  /** Gate result feedback: ids the candidate got wrong (from the server). */
  wrongIds?: Set<string> | null;
}

function unitClass(
  id: string,
  checkedIds: Set<string> | null,
  wrongIds: Set<string> | null | undefined,
  answeredWrong: Set<string> | null,
) {
  // wrongIds: server-side verdict (gate review); answeredWrong: local practice verdict
  const wrong = wrongIds?.has(id) || answeredWrong?.has(id);
  const knownRight =
    (wrongIds && !wrongIds.has(id) && checkedIds?.has(id)) ||
    (answeredWrong && !answeredWrong.has(id) && checkedIds?.has(id));
  if (wrong) return "border-crimson/60 bg-destructive/10";
  if (knownRight) return "border-pass/50 bg-sage/20";
  return "border-border";
}

function OptionSelect({
  value,
  placeholder,
  options,
  onValue,
  disabled,
}: {
  value: string | undefined;
  placeholder: string;
  options: { id: string; label: string }[];
  onValue: (v: string) => void;
  disabled?: boolean;
}) {
  return (
    <Select value={value} onValueChange={onValue} disabled={disabled}>
      <SelectTrigger className="w-full sm:w-72">
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent>
        {options.map((o) => (
          <SelectItem key={o.id} value={o.id}>
            {o.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}

function YesNo({
  value,
  onValue,
  yesLabel = "Yes",
  noLabel = "No",
}: {
  value: boolean | undefined;
  onValue: (v: boolean) => void;
  yesLabel?: string;
  noLabel?: string;
}) {
  return (
    <div className="flex gap-2">
      {[
        { v: true, label: yesLabel },
        { v: false, label: noLabel },
      ].map(({ v, label }) => (
        <Button
          key={label}
          type="button"
          size="sm"
          variant={value === v ? "default" : "outline"}
          onClick={() => onValue(v)}
        >
          {label}
        </Button>
      ))}
    </div>
  );
}

/** Bodies never read `key`, so they accept keyed (practice) and sanitized
 *  (gate) instruments alike. */
type Keyless<T> = T | Omit<T, "key">;

interface BodyProps<T> {
  inst: T;
  value: InstrumentValue;
  set: (itemId: string, v: unknown) => void;
  cls: (id: string) => string;
}

function ClassificationBody({ inst, value, set, cls }: BodyProps<Keyless<ClassificationInstrument>>) {
  return (
    <div className="space-y-3">
      {inst.items.map((item) => (
        <div key={item.id} className={cn("rounded-md border p-3", cls(item.id))}>
          <p className="mb-2 text-sm">{item.text}</p>
          {item.detail && <p className="mb-2 text-xs text-muted-foreground">{item.detail}</p>}
          <OptionSelect
            value={value[item.id] as string | undefined}
            placeholder="Classify…"
            options={inst.categories}
            onValue={(v) => set(item.id, v)}
          />
        </div>
      ))}
    </div>
  );
}

function TableFillBody({ inst, value, set, cls }: BodyProps<Keyless<TableFillInstrument>>) {
  return (
    <div className="overflow-x-auto rounded-md border">
      <table className="w-full text-sm">
        <thead className="bg-muted/60">
          <tr>
            <th className="px-3 py-2 text-left font-semibold" />
            {inst.columns.map((col) => (
              <th key={col.id} className="px-3 py-2 text-left font-semibold">
                {col.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {inst.rows.map((row) => {
            const rowValue = (value[row.id] ?? {}) as Record<string, unknown>;
            return (
              <tr key={row.id} className="border-t align-top">
                <td className="px-3 py-2 font-medium">
                  {row.label}
                  {row.detail && (
                    <span className="block text-xs font-normal text-muted-foreground">{row.detail}</span>
                  )}
                </td>
                {inst.columns.map((col) => (
                  <td key={col.id} className={cn("px-3 py-2", cls(`${row.id}.${col.id}`))}>
                    {col.freeText ? (
                      <input
                        type="text"
                        value={(rowValue[col.id] as string | undefined) ?? ""}
                        placeholder="Type…"
                        onChange={(e) => set(row.id, { ...rowValue, [col.id]: e.target.value })}
                        className="h-8 w-full min-w-32 rounded-md border border-input bg-background px-2 text-sm outline-none focus-visible:ring-2 focus-visible:ring-ring"
                      />
                    ) : (
                      <OptionSelect
                        value={rowValue[col.id] as string | undefined}
                        placeholder="Choose…"
                        options={(col.options ?? []).map((o) => ({ id: o, label: o }))}
                        onValue={(v) => set(row.id, { ...rowValue, [col.id]: v })}
                      />
                    )}
                  </td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

function DefectHuntBody({ inst, value, set, cls }: BodyProps<Keyless<DefectHuntInstrument>>) {
  return (
    <div className="space-y-3">
      {inst.spots.map((spot) => {
        const spotValue = (value[spot.id] ?? {}) as { defective?: boolean; category?: string };
        return (
          <div key={spot.id} className={cn("rounded-md border p-3", cls(spot.id))}>
            <p className="mb-2 text-sm font-medium">{spot.label}</p>
            {spot.description && <p className="mb-2 text-xs text-muted-foreground">{spot.description}</p>}
            <div className="flex flex-wrap items-center gap-3">
              <YesNo
                value={spotValue.defective}
                yesLabel="Defective"
                noLabel="Clean"
                onValue={(v) =>
                  set(spot.id, { defective: v, category: v ? spotValue.category : undefined })
                }
              />
              {spotValue.defective && (
                <OptionSelect
                  value={spotValue.category}
                  placeholder="Defect class…"
                  options={inst.categories}
                  onValue={(v) => set(spot.id, { ...spotValue, category: v })}
                />
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}

function DispositionBody({ inst, value, set, cls }: BodyProps<Keyless<DispositionInstrument>>) {
  return (
    <div className="space-y-3">
      {inst.items.map((item) => {
        const itemValue = (value[item.id] ?? {}) as { decision?: "approve" | "refuse"; reason?: string };
        return (
          <div key={item.id} className={cn("rounded-md border p-3", cls(item.id))}>
            <p className="mb-1 text-sm font-semibold">{item.title}</p>
            <div className="mb-3 text-sm text-muted-foreground">
              <ContentBlocks blocks={item.body} />
            </div>
            <div className="flex flex-wrap items-center gap-3">
              <div className="flex gap-2">
                <Button
                  type="button"
                  size="sm"
                  variant={itemValue.decision === "approve" ? "default" : "outline"}
                  onClick={() => set(item.id, { decision: "approve" })}
                >
                  Approve
                </Button>
                <Button
                  type="button"
                  size="sm"
                  variant={itemValue.decision === "refuse" ? "destructive" : "outline"}
                  onClick={() => set(item.id, { decision: "refuse", reason: itemValue.reason })}
                >
                  Refuse
                </Button>
              </div>
              {itemValue.decision === "refuse" && (
                <OptionSelect
                  value={itemValue.reason}
                  placeholder="Reason code…"
                  options={inst.reasonCodes}
                  onValue={(v) => set(item.id, { ...itemValue, reason: v })}
                />
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}

function BooleanSetBody({ inst, value, set, cls }: BodyProps<Keyless<BooleanSetInstrument>>) {
  return (
    <div className="space-y-3">
      {inst.subjects.map((subject) => (
        <div
          key={subject.id}
          className={cn("flex flex-wrap items-center justify-between gap-3 rounded-md border p-3", cls(subject.id))}
        >
          <div>
            <p className="text-sm">{subject.label}</p>
            {subject.description && (
              <p className="text-xs text-muted-foreground">{subject.description}</p>
            )}
          </div>
          <YesNo
            value={value[subject.id] as boolean | undefined}
            yesLabel={inst.yesLabel ?? "Yes"}
            noLabel={inst.noLabel ?? "No"}
            onValue={(v) => set(subject.id, v)}
          />
        </div>
      ))}
    </div>
  );
}

function MatrixBody({ inst, value, set, cls }: BodyProps<Keyless<MatrixInstrument>>) {
  return (
    <div className="space-y-3">
      {inst.actions.map((action) => (
        <div
          key={action.id}
          className={cn("flex flex-wrap items-center justify-between gap-3 rounded-md border p-3", cls(action.id))}
        >
          <div>
            <p className="text-sm font-medium">{action.label}</p>
            {action.description && (
              <p className="text-xs text-muted-foreground">{action.description}</p>
            )}
          </div>
          <OptionSelect
            value={value[action.id] as string | undefined}
            placeholder="Band…"
            options={inst.levels}
            onValue={(v) => set(action.id, v)}
          />
        </div>
      ))}
    </div>
  );
}

export function InstrumentPlayer({
  instrument,
  value,
  onChange,
  mode,
  wrongIds,
}: InstrumentPlayerProps) {
  const [practiceWrong, setPracticeWrong] = useState<Set<string> | null>(null);
  const [practiceRightIds, setPracticeRightIds] = useState<Set<string> | null>(null);
  const [practiceSummary, setPracticeSummary] = useState<string | null>(null);

  const hasKey = "key" in instrument;
  const set = (itemId: string, v: unknown) => {
    onChange({ ...value, [itemId]: v });
    setPracticeWrong(null);
    setPracticeRightIds(null);
    setPracticeSummary(null);
  };

  const cls = (id: string) =>
    unitClass(id, practiceRightIds, wrongIds ?? null, practiceWrong);

  const check = () => {
    if (!hasKey) return;
    const units = checkInstrument(instrument as Instrument, value);
    const wrong = new Set(units.filter((u) => !u.correct).map((u) => u.id));
    setPracticeWrong(wrong);
    setPracticeRightIds(new Set(units.filter((u) => u.correct).map((u) => u.id)));
    const s = verdictSummary(units);
    setPracticeSummary(`${s.correct} of ${s.total} correct`);
  };

  const body = useMemo(() => {
    switch (instrument.kind) {
      case "classification":
        return <ClassificationBody inst={instrument} value={value} set={set} cls={cls} />;
      case "tableFill":
        return <TableFillBody inst={instrument} value={value} set={set} cls={cls} />;
      case "defectHunt":
        return <DefectHuntBody inst={instrument} value={value} set={set} cls={cls} />;
      case "disposition":
        return <DispositionBody inst={instrument} value={value} set={set} cls={cls} />;
      case "booleanSet":
        return <BooleanSetBody inst={instrument} value={value} set={set} cls={cls} />;
      case "matrix":
        return <MatrixBody inst={instrument} value={value} set={set} cls={cls} />;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [instrument, value, practiceWrong, practiceRightIds, wrongIds]);

  return (
    <Card className="border-ink/35">
      <CardHeader>
        <div className="flex flex-wrap items-center justify-between gap-2">
          <CardTitle className="font-display text-lg font-semibold tracking-tight">
            {instrument.title}
          </CardTitle>
          <div className="flex items-center gap-2">
            {instrument.timeHintMinutes && (
              <Badge variant="outline">~{instrument.timeHintMinutes} min</Badge>
            )}
            <Badge variant={mode === "practice" ? "secondary" : "default"}>
              {mode === "practice" ? "Practice" : "Gate"}
            </Badge>
          </div>
        </div>
        <p className="max-w-3xl text-sm leading-relaxed text-muted-foreground">
          {instrument.instructions}
        </p>
      </CardHeader>
      <CardContent className="space-y-5">
        {"contextTitle" in instrument && instrument.context && (
          <div className="border border-ink/25 bg-secondary/40 p-4">
            <p className="micro-label mb-2 text-muted-foreground">
              {instrument.contextTitle}
            </p>
            <ContentBlocks blocks={instrument.context} />
          </div>
        )}
        {"scenario" in instrument && instrument.scenario && (
          <div className="border border-ink/25 bg-secondary/40 p-4">
            <p className="micro-label mb-2 text-muted-foreground">
              {instrument.scenarioTitle ?? "Scenario"}
            </p>
            <ContentBlocks blocks={instrument.scenario} />
          </div>
        )}
        {"artifact" in instrument && instrument.artifact && (
          <div className="border border-ink/25 bg-secondary/40 p-4">
            <p className="micro-label mb-2 text-muted-foreground">
              {instrument.artifactTitle ?? "Artifact"}
            </p>
            <ContentBlocks blocks={instrument.artifact} />
          </div>
        )}
        {body}
        {mode === "practice" && hasKey && (
          <div className="flex items-center gap-3 border-t pt-4">
            <Button type="button" variant="secondary" onClick={check}>
              Check answers
            </Button>
            {practiceSummary && (
              <span
                className={cn(
                  "font-mono text-xs font-semibold uppercase tracking-[0.1em]",
                  practiceWrong && practiceWrong.size === 0 ? "text-pass" : "text-crimson",
                )}
              >
                {practiceSummary}
              </span>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
