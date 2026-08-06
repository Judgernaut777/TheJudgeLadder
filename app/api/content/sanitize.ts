// SERVER ONLY — strips answer keys before gate content crosses to a client.
// The sanitized shapes are declared in contracts; this module guarantees we
// never leak `key` or `answer` fields over the wire.
import type {
  Instrument,
  MCItem,
  SanitizedInstrument,
  SanitizedMCItem,
} from "@contracts/content/types";
import type { CourseGate } from "./gates";

export interface SanitizedGate {
  mcBank: SanitizedMCItem[];
  practicals: SanitizedInstrument[];
}

export function sanitizeMC(item: MCItem): SanitizedMCItem {
  const { answer: _answer, ...rest } = item;
  return rest;
}

export function sanitizeInstrument(inst: Instrument): SanitizedInstrument {
  const { key: _key, ...rest } = inst;
  return rest as SanitizedInstrument;
}

export function sanitizeGate(gate: CourseGate): SanitizedGate {
  return {
    mcBank: gate.mcBank.map(sanitizeMC),
    practicals: gate.practicals.map(sanitizeInstrument),
  };
}
