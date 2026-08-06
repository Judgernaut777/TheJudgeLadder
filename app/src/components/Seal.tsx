import { useId } from "react";
import { cn } from "@/lib/utils";

/** The register seal — a circular stamp in crimson, awarded on certification.
 *  Rotated slightly like a hand stamp; ring text set in mono. */
export function Seal({
  size = 96,
  center = "AIJL",
  sub = "GATE PASSED",
  className,
}: {
  size?: number;
  center?: string;
  sub?: string;
  className?: string;
}) {
  const id = useId();
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 120 120"
      className={cn("-rotate-6 text-crimson", className)}
      aria-hidden="true"
    >
      <defs>
        <path
          id={id}
          d="M 60,60 m -44,0 a 44,44 0 1,1 88,0 a 44,44 0 1,1 -88,0"
        />
      </defs>
      <circle cx="60" cy="60" r="56" fill="none" stroke="currentColor" strokeWidth="2.5" />
      <circle cx="60" cy="60" r="52.5" fill="none" stroke="currentColor" strokeWidth="0.75" />
      <circle
        cx="60"
        cy="60"
        r="33"
        fill="none"
        stroke="currentColor"
        strokeWidth="1"
        strokeDasharray="2 3"
      />
      <text
        fontSize="9"
        fontFamily="'IBM Plex Mono', monospace"
        fontWeight="600"
        letterSpacing="2"
        fill="currentColor"
      >
        <textPath href={`#${id}`}>AI JUDGEMENT LADDER · REGISTERED ·</textPath>
      </text>
      <text
        x="60"
        y="58"
        textAnchor="middle"
        fontSize="16"
        fontFamily="'Fraunces', serif"
        fontWeight="700"
        fill="currentColor"
      >
        {center}
      </text>
      <text
        x="60"
        y="73"
        textAnchor="middle"
        fontSize="6.5"
        fontFamily="'IBM Plex Mono', monospace"
        letterSpacing="1.5"
        fill="currentColor"
      >
        {sub}
      </text>
    </svg>
  );
}
