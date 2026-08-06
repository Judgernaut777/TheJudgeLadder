// SERVER ONLY — registry of AIPAB section banks. Never import from frontend code.
import type { AipabSection } from "./aipab-sections-1";
import { aipab101, aipab201, aipab301 } from "./aipab-sections-1";
import { aipab302, aipab401, aipab402 } from "./aipab-sections-2";
import { aipab501, aipab502 } from "./aipab-sections-3";

export type { AipabSection };

export const aipabSections: Record<string, AipabSection> = {
  "101": aipab101,
  "201": aipab201,
  "301": aipab301,
  "302": aipab302,
  "401": aipab401,
  "402": aipab402,
  "501": aipab501,
  "502": aipab502,
};

export function getAipabSection(courseCode: string): AipabSection | undefined {
  return aipabSections[courseCode];
}
