/** Single layout container: max-width used site-wide (header, sections, footer, dividers). */
export const CONTAINER_MAX = "max-w-6xl";

/** Horizontal padding for all container-aligned content (header, sections, dividers). */
export const SECTION_PX = "px-4 md:px-6";

/** Uniform vertical padding for content sections, contact, and footer. */
export const SECTION_PY = "py-12 md:py-16 lg:py-20";

/** Top-only / bottom-only — use with a bottom wave so the wave sits on the section edge like `border-b`. */
export const SECTION_PT = "pt-12 md:pt-16 lg:pt-20";
export const SECTION_PB = "pb-12 md:pb-16 lg:pb-20";

/** Scroll margin for anchor targets (avoids sticky header overlap). Use when section has id. */
export const SECTION_SCROLL_MARGIN = "scroll-mt-20 md:scroll-mt-24";

const MAX_WIDTH = {
  default: CONTAINER_MAX,
  narrow: "max-w-3xl",
  tight: "max-w-2xl",
} as const;

function joinClass(...parts: (string | undefined | false)[]): string {
  return parts.filter(Boolean).join(" ").trim();
}

type SectionProps = {
  /** Semantic element. */
  as?: "section" | "footer" | "main";
  id?: string;
  /** Passed to aria-labelledby on the wrapper. */
  ariaLabelledBy?: string;
  /** Merged with base section classes. */
  className?: string;
  /**
   * `default` — full vertical padding.
   * `topOnly` — top padding only; use when a bottom wave is the last child (wave flush with section bottom).
   * `none` — no vertical padding (e.g. Hero).
   */
  padding?: "default" | "none" | "topOnly";
  /** When true and id is set, applies scroll-mt so anchor scroll accounts for sticky header. Default true. */
  scrollMargin?: boolean;
  children: React.ReactNode;
};

/**
 * Wrapper for page sections: full-width background, consistent vertical spacing.
 * Direct children are usually SectionContainer.
 */
export function Section({
  as: Tag = "section",
  id,
  ariaLabelledBy,
  className,
  padding = "default",
  scrollMargin = true,
  children,
}: SectionProps) {
  return (
    <Tag
      id={id}
      className={joinClass(
        padding === "default" && SECTION_PY,
        padding === "topOnly" && SECTION_PT,
        id && scrollMargin && SECTION_SCROLL_MARGIN,
        className
      )}
      aria-labelledby={ariaLabelledBy}
    >
      {children}
    </Tag>
  );
}

type SectionContainerProps = {
  /** Constrains content width. */
  size?: keyof typeof MAX_WIDTH;
  /** Merged with container classes (e.g. "relative" + SECTION_PY for Hero). */
  className?: string;
  children: React.ReactNode;
};

/**
 * Inner container for section content: max-width and horizontal padding.
 * Use inside Section (or standalone on pages with main + single container).
 */
export function SectionContainer({
  size = "default",
  className,
  children,
}: SectionContainerProps) {
  return (
    <div
      className={joinClass(
        "mx-auto",
        SECTION_PX,
        MAX_WIDTH[size],
        className
      )}
    >
      {children}
    </div>
  );
}
