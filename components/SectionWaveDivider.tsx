/**
 * Wavy transition between sections: renders one of the hand-drawn
 * section-divider curves (from public/assets/sectiondevider{1,2,3}.svg,
 * inlined here so the shape can be closed into a fill). The curve is closed
 * down to the bottom edge and filled with the **next** section's background,
 * so the area above the line reads as the previous section and the area
 * below reads as the next one. Full viewport width (edge to edge).
 *
 * The pre-filled loop shapes (from public/assets/SVG/sectiondevider{1,2,3}.svg.svg)
 * are layered exactly on top, same position, higher z-index — they give each
 * loop its own designer-chosen fill instead of relying on the base curve's
 * fill-rule to guess it.
 */

type NextSectionBg = "section" | "section-muted" | "accent" | "primaryDark";

type SectionWaveDividerProps = {
  /** Background color of the section **below** this divider (fills under the curve). */
  nextBg: NextSectionBg;
  variant?: 1 | 2 | 3;
  className?: string;
};

const fillByNext: Record<NextSectionBg, string> = {
  section: "var(--color-section-base)",
  "section-muted": "var(--color-section-muted)",
  accent: "var(--color-accent)",
  primaryDark: "rgb(var(--tw-color-primary-dark) / 1)",
};

type Curve = { viewBoxWidth: number; viewBoxHeight: number; d: string };

const curveByVariant: Record<1 | 2 | 3, Curve> = {
  1: {
    viewBoxWidth: 2098.13,
    viewBoxHeight: 94.03,
    d: "M0,28.12c97.23,1,194.55-.09,291.75,2.07,6.99.54,13.94,1.55,20.49,3.73,18.56,5.43,33.78,25.32,22.14,43.49-5.41,8.38-17.23,11.62-25.9,6.39-14.8-8.75-14.04-29.84-.82-40.16,17.39-13.89,42.6-14.1,64.05-15.43,56.13-2.42,112.37-2.73,168.5.57,5.46.44,10.99,1.05,16.44,2.05,8.61,1.61,16.83,4.05,23.92,8.63,12.6,7.7,17.2,22.93,9.58,35.34-10.28,19.14-49.32,29.32-56.11,2.15-2.15-9.96,2.38-20.74,9.73-27.64,11.58-11.08,28.61-12.96,44.11-13.47,147.08.95,1078.34,3.91,1225.4,5.52,22.75,0,48.44,1.25,67.07-13.82,4.46-3.71,8.58-8.46,9.54-14.28,1.13-6.35-4.11-11.26-10.28-12.27-9.54-1.77-20.35,1.42-27.77,7.51-9.26,7.44-10.99,19.51,1.19,25.47,3.68,1.88,8.27,3.07,13.02,3.83,77.04,7.59,154.83,6.68,232.02,1.62",
  },
  2: {
    viewBoxWidth: 2270.43,
    viewBoxHeight: 132.55,
    d: "M.35,49.34c36.11,36.11,285.39,12.98,334.84-.32,10.2-3.24,22.26-9.67,27.36-19.05,5.71-9.57,1.04-21.49-8.43-26.5-9.08-5.32-21.43-3.26-28.73,4.24-12.75,12.97-9.43,34.36.83,48.09,5.95,8.19,14.17,14.25,23.11,18.63,10.73,5.25,22.48,8.37,34.16,10.74,112.61,22.84,235-24.85,342.66,14.47,5.5,2.84,9.84,7.07,11.54,12.5,2.14,6.12-.07,14.24-4.98,17.73-20.75,13.99-50.54-43.28,14.12-61.78,180.92-45.26,375.74,13.57,555-34.66,2.29-1.29,3.83-2.66,4.45-4.95.36-1.77-.29-3.56-1.4-5.01-4.46-5.99-16.51-9.87-25-8.66-6.96.5-18.99,5.37-13.96,14.01,1.46,2.49,4.28,4.91,7.72,7.08,72.49,42.59,166.7,14.58,248.02-1.14,19.27-2.91,39.49-2.79,57.01,6.89,15.89,8.53,28.32,25.28,26.41,43.78-.89,13.1-12.38,30.39-26.56,29.76-9.15-1.87-4.78-14.59-1.51-20.42,15.71-30.13,54.53-38.4,86.9-41.27,9.79-1.07,19.7-1.47,29.58-1.67,192.31-1.17,384.62-1.63,576.93-2.56",
  },
  3: {
    viewBoxWidth: 2116,
    viewBoxHeight: 143.46,
    d: "M.02,81.44c41.66-1.76,376.82,4,417.68-5.06,6.91-1.59,13.95-3.5,20.43-6.27,19.02-7.46,36.58-29.77,35.73-50.75-3.04-28.63-49.36-2.04-33.98,33.62,7.27,16.97,25.9,25.23,43.1,28.98,45.29,9.45,728.11-1.15,774.26-1.84,31.6-1.06,64.33-.94,94.4-12.02,17.36-6.33,35.44-21.52,34.71-41.18-.16-12.13-9.13-23-20.75-25.54-13.87-3.55-30.17,4.03-36.88,17.21-7.87,14.59-3.14,32.54,9.03,43.67,10.18,9.64,24.23,14.56,37.79,17.56,66.6,11.94,314.25-1.39,381.71-.29,11.8.25,23.68.57,35.36,2.24,17.49,2.44,35.7,8.74,47.57,22.4,6.86,7.62,11.22,19.32,8.65,27.46-2.49,9.85-13.03,14.86-21.59,8.53-6.81-4.73-10.88-13.36-10.53-21.77.66-18.83,19.12-27.22,35.15-30.77,43.28-10.71,218.43-9.71,264.15-9.26",
  },
};

type Loop = { d: string; fill: string };

/** Pre-filled loop cutouts, same artwork/scale as curveByVariant, positioned via their own viewBox. */
const loopsByVariant: Record<1 | 2 | 3, { viewBoxWidth: number; viewBoxHeight: number; loops: Loop[] }> = {
  1: {
    viewBoxWidth: 2098.12,
    viewBoxHeight: 94.03,
    loops: [
      { d: "M334.39,77.42c-5.42,8.37-17.23,11.61-25.9,6.39-14.81-8.75-14.04-29.84-.82-40.17,3.55-2.84,7.43-5.1,11.53-6.93,15.08,7.75,25.33,24.87,15.19,40.71Z", fill: "#f8f8f2" },
      { d: "M590.16,74.8c-10.28,19.13-49.33,29.32-56.11,2.15-2.15-9.96,2.38-20.73,9.73-27.64,8.57-8.19,20.1-11.35,31.8-12.65,1.72.83,3.39,1.76,5,2.8,12.59,7.7,17.19,22.93,9.58,35.34Z", fill: "#f8f8f2" },
      { d: "M1889.91,13.26c-.97,5.82-5.09,10.57-9.55,14.28-5.5,4.45-11.62,7.48-18.1,9.54-3.36-.74-6.52-1.74-9.21-3.11-12.18-5.96-10.45-18.03-1.19-25.47,7.42-6.08,18.23-9.28,27.77-7.51,6.16,1.02,11.41,5.92,10.28,12.27Z", fill: "#fff" },
    ],
  },
  2: {
    viewBoxWidth: 2270.43,
    viewBoxHeight: 132.55,
    loops: [
      { d: "M1605.08,85.42c-.89,13.1-12.38,30.4-26.56,29.77-9.15-1.87-4.78-14.59-1.51-20.42,5.94-11.37,15.16-19.63,26.1-25.67,1.8,5.15,2.56,10.65,1.97,16.32Z", fill: "#f8f8f2" },
      { d: "M1306.28,28.48c-.61,2.29-2.15,3.66-4.44,4.95-7.54,2.03-15.12,3.87-22.71,5.53-1.84-.97-3.67-1.99-5.48-3.06-3.45-2.17-6.27-4.58-7.72-7.08-5.04-8.64,7-13.52,13.95-14.01,8.49-1.22,20.54,2.67,25,8.66,1.11,1.45,1.76,3.24,1.4,5.01Z", fill: "#fff" },
      { d: "M732.71,129.87c-14.04,9.47-32.22-13.69-22.46-35.39,5.33,1.52,10.63,3.24,15.9,5.16,5.5,2.84,9.85,7.07,11.54,12.5,2.14,6.12-.07,14.24-4.98,17.73Z", fill: "#f8f8f2" },
      { d: "M362.54,29.97c-5.1,9.38-17.16,15.81-27.35,19.05-3.14.84-7.08,1.73-11.73,2.63-8-13.6-9.6-32.21,1.93-43.94,7.3-7.49,19.64-9.55,28.72-4.24,9.47,5.01,14.15,16.93,8.43,26.5Z", fill: "#fff" },
    ],
  },
  3: {
    viewBoxWidth: 2116.01,
    viewBoxHeight: 143.46,
    loops: [
      { d: "M447.97,64.86c-3.36-3.38-6.13-7.31-8.09-11.88-15.38-35.67,30.94-62.25,33.98-33.62.7,17.27-11.09,35.45-25.89,45.5Z", fill: "#f8f8f2" },
      { d: "M1848.82,131.63c-2.48,9.84-13.02,14.85-21.58,8.52-6.81-4.73-10.89-13.36-10.54-21.77.37-10.46,6.23-17.7,14.11-22.68,3.41,2.44,6.56,5.25,9.36,8.47,6.86,7.61,11.22,19.32,8.65,27.46Z", fill: "#fff" },
      { d: "M1351.64,68.1c-1.37.5-2.74.99-4.12,1.44-3.51-2.08-6.81-4.48-9.77-7.29-12.17-11.12-16.91-29.07-9.03-43.67,6.71-13.18,23.01-20.76,36.88-17.2,11.62,2.53,20.59,13.4,20.75,25.54.73,19.66-17.34,34.85-34.71,41.18Z", fill: "#f8f8f2" },
    ],
  },
};

export const SECTION_WAVE_DIVIDER_MT = "mt-10 md:mt-12 lg:mt-14";

export function SectionWaveDivider({
  nextBg,
  variant = 1,
  className = "",
}: SectionWaveDividerProps) {
  const fill = fillByNext[nextBg];
  const { viewBoxWidth, viewBoxHeight, d } = curveByVariant[variant];
  const loopLayer = loopsByVariant[variant];

  return (
    <div className={`relative w-full ${className}`.trim()} aria-hidden>
      <svg
        viewBox={`0 0 ${viewBoxWidth} ${viewBoxHeight }`}
        className="block h-auto w-full overflow-visible"
      >
        <path
          d={`${d} L${viewBoxWidth},${viewBoxHeight} L0,${viewBoxHeight} Z`}
          fill={fill}
          fillRule="evenodd"
        />
        <path
          d={d}
          fill="none"
          className="stroke-accent"
          strokeWidth={2}
          strokeLinecap="round"
          vectorEffect="non-scaling-stroke"
        />
      </svg>
      <svg
        viewBox={`0 0 ${loopLayer.viewBoxWidth} ${loopLayer.viewBoxHeight}`}
        preserveAspectRatio="none"
        className="pointer-events-none absolute inset-0 z-10 block h-full w-full overflow-visible"
      >
        {loopLayer.loops.map((loop, i) => (
          <path
            key={i}
            d={loop.d}
            fill={loop.fill}
            className="stroke-accent"
            strokeWidth={1.5}
            vectorEffect="non-scaling-stroke"
          />
        ))}
      </svg>
    </div>
  );
}
