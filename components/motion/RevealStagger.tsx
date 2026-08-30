"use client";

import React, { useRef } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";

const transition = { duration: 0.45, ease: "easeOut" as const };
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.05,
    },
  },
};
const itemVariants = {
  hidden: { opacity: 0, y: 12 },
  visible: { opacity: 1, y: 0 },
};

type RevealStaggerProps = {
  children: React.ReactNode;
  className?: string;
  once?: boolean;
  as?: "div" | "ol" | "ul";
};

export function RevealStagger({
  children,
  className,
  once = true,
  as: Tag = "div",
}: RevealStaggerProps) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once, margin: "-30px 0px -30px 0px" });
  const reduceMotion = useReducedMotion();
  const MotionTag = Tag === "ol" ? motion.ol : Tag === "ul" ? motion.ul : motion.div;

  const content =
    reduceMotion ? children : React.Children.map(children, (child) =>
      React.isValidElement(child) && (Tag === "ol" || Tag === "ul") ? (
        React.cloneElement(child as React.ReactElement<{ variants?: typeof itemVariants; transition?: typeof transition }>, {
          variants: itemVariants,
          transition,
        })
      ) : (
        <motion.div variants={itemVariants} transition={transition}>
          {child}
        </motion.div>
      )
    );

  return (
    <MotionTag
      ref={ref as React.RefObject<HTMLOListElement & HTMLUListElement & HTMLDivElement>}
      className={className}
      initial={reduceMotion ? false : "hidden"}
      animate={reduceMotion || inView ? "visible" : "hidden"}
      variants={reduceMotion ? undefined : containerVariants}
      transition={reduceMotion ? { duration: 0 } : undefined}
    >
      {content}
    </MotionTag>
  );
}
