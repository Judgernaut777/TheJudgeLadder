// SERVER ONLY — registry of gated assessment banks. Never import from frontend code.
import type { CourseGate } from "./gate-101-201";
import { gate101, gate201 } from "./gate-101-201";
import { gate301 } from "./gate-301";
import { gate302 } from "./gate-302";
import { gate401 } from "./gate-401";
import { gate402 } from "./gate-402";
import { gate501 } from "./gate-501";
import { gate502 } from "./gate-502";

export type { CourseGate };

export const gates: Record<string, CourseGate> = {
  "101": gate101,
  "201": gate201,
  "301": gate301,
  "302": gate302,
  "401": gate401,
  "402": gate402,
  "501": gate501,
  "502": gate502,
};

export function getGate(courseCode: string): CourseGate | undefined {
  return gates[courseCode];
}
