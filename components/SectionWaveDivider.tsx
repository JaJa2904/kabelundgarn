/**
 * Wavy transition between sections: fill uses the **next** section background
 * (theme vars) so the wave visually matches what sits below; optional crest
 * stroke echoes the old yarn dividers. Full viewport width (edge to edge).
 */

type NextSectionBg = "section" | "section-muted" | "accent" | "primaryDark";

type SectionWaveDividerProps = {
  /** Background color of the section **below** this wave (fills under the curve). */
  nextBg: NextSectionBg;
  variant?: "flow" | "weave";
  className?: string;
};

const fillByNext: Record<NextSectionBg, string> = {
  section: "var(--color-section-base)",
  "section-muted": "var(--color-section-muted)",
  accent: "var(--color-accent)",
  primaryDark: "rgb(var(--tw-color-primary-dark) / 1)",
};

/** Closed path: transparent above wave, filled below (see viewBox). */
function fillPathD(variant: "flow" | "weave"): string {
  if (variant === "weave") {
    return "M0,36 L0,16 C 80 10, 160 22, 240 16 S 400 10, 480 16 S 640 22, 720 16 S 880 10, 960 16 S 1120 22, 1200 16 L1200,36 Z";
  }
  return "M0,36 L0,15 C 95 5, 190 25, 285 15 S 475 5, 570 15 S 760 25, 855 15 S 1045 5, 1140 15 L1200,15 L1200,36 Z";
}

/** Open path along wave crest (stroke only). */
function strokePathD(variant: "flow" | "weave"): string {
  if (variant === "weave") {
    return "M0 16 C 80 10, 160 22, 240 16 S 400 10, 480 16 S 640 22, 720 16 S 880 10, 960 16 S 1120 22, 1200 16";
  }
  return "M0 15 C 95 5, 190 25, 285 15 S 475 5, 570 15 S 760 25, 855 15 S 1045 5, 1140 15 L1200 15";
}

export const SECTION_WAVE_DIVIDER_MT = "mt-10 md:mt-12 lg:mt-14";

export function SectionWaveDivider({
  nextBg,
  variant = "flow",
  className = "",
}: SectionWaveDividerProps) {
  const fill = fillByNext[nextBg];

  return (
    <div className={`w-full ${className}`.trim()} aria-hidden>
      <svg
        viewBox="0 0 1200 36"
        className="block h-7 w-full md:h-9 lg:h-10"
        preserveAspectRatio="none"
      >
        <path d={fillPathD(variant)} fill={fill} />
        <path
          d={strokePathD(variant)}
          fill="none"
          className="stroke-accent/50"
          strokeWidth={2}
          strokeLinecap="round"
          vectorEffect="non-scaling-stroke"
        />
      </svg>
    </div>
  );
}
