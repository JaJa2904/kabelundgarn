"use client";

import { useReducedMotion } from "framer-motion";
import { motion } from "framer-motion";

const MotionAnchor = motion.a;
type MotionButtonProps = React.ComponentProps<typeof MotionAnchor>;

export function MotionButton({
  children,
  className,
  href,
  target,
  rel,
  ...rest
}: MotionButtonProps) {
  const reduceMotion = useReducedMotion();

  const hover = reduceMotion
    ? {}
    : { y: -3, transition: { duration: 0.3 } };
  const tap = reduceMotion ? {} : { scale: 0.98, transition: { duration: 0.1 } };

  return (
    <motion.a
      className={className}
      href={href}
      target={target}
      rel={rel}
      whileHover={hover}
      whileTap={tap}
      {...rest}
    >
      {children}
    </motion.a>
  );
}
