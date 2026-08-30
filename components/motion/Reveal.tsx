"use client";

import { useRef } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";

const transition = { duration: 0.5, ease: "easeOut" as const };
const variants = {
  hidden: { opacity: 0, y: 12 },
  visible: { opacity: 1, y: 0 },
};

type RevealProps = {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  once?: boolean;
};

export function Reveal({
  children,
  className,
  delay = 0,
  once = true,
}: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once, margin: "-40px 0px -40px 0px" });
  const reduceMotion = useReducedMotion();

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={reduceMotion ? false : "hidden"}
      animate={
        reduceMotion || inView
          ? "visible"
          : "hidden"
      }
      variants={reduceMotion ? undefined : variants}
      transition={reduceMotion ? { duration: 0 } : { ...transition, delay }}
    >
      {children}
    </motion.div>
  );
}
