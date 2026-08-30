"use client";

import Link from "next/link";
import { useReducedMotion } from "framer-motion";
import { motion } from "framer-motion";

const MotionLink = motion(Link);

type MotionLinkProps = React.ComponentProps<typeof MotionLink>;

/**
 * Primary blue CTA for {@link MotionLinkWithAnimation}.
 * `text-white` + only color/shadow transitions so Framer `y` / `scale` are not slowed by `transition-all`.
 */
export const accentCtaMotionLinkClassName =
  "inline-flex items-center justify-center rounded-xl bg-accent px-8 py-4 text-lg font-semibold text-white shadow-lg transition-colors transition-shadow duration-300 ease-out hover:text-[#ffffcc] hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 focus:ring-offset-primaryDark";

/** Hero off-white CTA — same transition scope as accent CTA for motion compatibility. */
export const heroLightCtaMotionLinkClassName =
  "inline-flex items-center justify-center rounded-xl bg-[#F8F8F2] px-8 py-4 text-lg font-semibold text-accent shadow-lg transition-colors transition-shadow duration-300 ease-out hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-[#F8F8F2]/80 focus:ring-offset-2 focus:ring-offset-accent";

export function MotionLinkWithAnimation({
  children,
  className,
  ...rest
}: MotionLinkProps) {
  const reduceMotion = useReducedMotion();
  const hover = reduceMotion ? {} : { y: -3, transition: { duration: 0.3 } };
  const tap = reduceMotion ? {} : { scale: 0.98, transition: { duration: 0.1 } };

  return (
    <MotionLink
      className={className}
      whileHover={hover}
      whileTap={tap}
      {...rest}
    >
      {children}
    </MotionLink>
  );
}
