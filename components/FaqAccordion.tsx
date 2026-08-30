"use client";

import { useState, useId, useRef } from "react";
import { motion, useReducedMotion } from "framer-motion";

export type FaqItem = { question: string; answer: string };

export function FaqAccordion({ items }: { items: FaqItem[] }) {
  const baseId = useId().replace(/:/g, "");
  const [openSet, setOpenSet] = useState<Set<number>>(new Set());
  const buttonRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const reduceMotion = useReducedMotion();
  const duration = reduceMotion ? 0 : 0.3;

  function toggle(index: number) {
    setOpenSet((prev) => {
      const next = new Set(prev);
      if (next.has(index)) next.delete(index);
      else next.add(index);
      return next;
    });
  }

  function focusButton(index: number) {
    buttonRefs.current[index]?.focus();
  }

  function handleKeyDown(index: number, e: React.KeyboardEvent) {
    switch (e.key) {
      case "Enter":
      case " ":
        e.preventDefault();
        toggle(index);
        break;
      case "ArrowDown":
      case "ArrowRight":
        e.preventDefault();
        focusButton(Math.min(index + 1, items.length - 1));
        break;
      case "ArrowUp":
      case "ArrowLeft":
        e.preventDefault();
        focusButton(Math.max(index - 1, 0));
        break;
      case "Home":
        e.preventDefault();
        focusButton(0);
        break;
      case "End":
        e.preventDefault();
        focusButton(items.length - 1);
        break;
    }
  }

  return (
    <div className="space-y-2" role="list">
      {items.map((item, index) => {
        const isOpen = openSet.has(index);
        const triggerId = `${baseId}-trigger-${index}`;
        const panelId = `${baseId}-panel-${index}`;

        return (
          <div
            key={index}
            className="overflow-hidden rounded-xl border-2 border-accent/30 bg-surface/5"
            role="listitem"
          >
            <h3 className="m-0">
              <button
                ref={(el) => {
                  buttonRefs.current[index] = el;
                }}
                type="button"
                id={triggerId}
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => toggle(index)}
                onKeyDown={(e) => handleKeyDown(index, e)}
                className={[
                  "flex w-full cursor-pointer items-center justify-between gap-4 px-5 py-4 text-left text-lg font-semibold text-accent",
                  // Same surface hue as the row; hover deepens that fill on the button only
                  "bg-surface/5 transition-[background-color] duration-200 ease-out hover:bg-surface/10",
                  // Inner radius matches inside of border-2 + rounded-xl
                  isOpen
                    ? "rounded-t-[calc(0.75rem-2px)]"
                    : "rounded-[calc(0.75rem-2px)]",
                  "outline-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-accent",
                ].join(" ")}
              >
                <span>{item.question}</span>
                <motion.span
                  className="shrink-0 text-accent"
                  aria-hidden
                  animate={{ rotate: isOpen ? 180 : 0 }}
                  transition={{ duration }}
                >
                  <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </motion.span>
              </button>
            </h3>
            <motion.div
              id={panelId}
              role="region"
              aria-labelledby={triggerId}
              aria-hidden={!isOpen}
              initial={false}
              animate={{ height: isOpen ? "auto" : 0, opacity: isOpen ? 1 : 0 }}
              transition={{ duration, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="overflow-hidden border-t-2 border-accent/20"
            >
              <div className="px-5 py-4 text-surface/90 leading-relaxed">
                {item.answer}
              </div>
            </motion.div>
          </div>
        );
      })}
    </div>
  );
}
