"use client";

import { motion } from "framer-motion";
import type { Locale } from "@/lib/translations";
import { getTranslations } from "@/lib/getTranslations";
import { RevealStagger } from "@/components/motion/RevealStagger";

const stepClass =
  "rounded-xl border-2 border-accent/25 bg-surface/5 p-6 cursor-default";

// Quick on/off switch so illustrations can be removed easily.
const SHOW_YARN_ILLUSTRATIONS = true;

/** Same frame for all steps so aspect ratio, width, and vertical slot match. */
const YARN_ILLUSTRATION_VIEWBOX = "0 -12 500 352";
const yarnIllustrationSvgClassName =
  "mx-auto block h-auto w-full max-w-full text-accent";

function YarnIllustrationFrame({
  children,
  /** Nudge artwork down in user units (step 2 sits high vs. neighbors). */
  translateY = 0,
}: {
  children: React.ReactNode;
  translateY?: number;
}) {
  return (
    <div className="mt-4 w-full" aria-hidden>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox={YARN_ILLUSTRATION_VIEWBOX}
        className={yarnIllustrationSvgClassName}
        fill="none"
      >
        <g
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <g transform={`translate(0, ${translateY})`}>{children}</g>
        </g>
      </svg>
    </div>
  );
}

function YarnIllustration({ step }: { step: 1 | 2 | 3 }) {
  if (step === 1) {
    return (
      <YarnIllustrationFrame>
        <path
          strokeWidth={6}
          d="M 60,280 C 90,310 130,240 160,280 Q 190,290 220,220 L 220,164"
        />
        <path strokeWidth={5} d="M 220,220 Q 230,250 250,280" />
        <path strokeWidth={4} d="M 220,175 Q 190,185 195,215" />
        <path strokeWidth={5} d="M 220,175 Q 260,160 270,100" />
        <path
          strokeWidth={6}
          d="M 340,180 C 340,140 310,120 310,80 C 310,20 390,20 390,80 C 390,120 360,140 360,180"
        />
        <path
          strokeWidth={6}
          d="M 335,185 Q 350,195 365,185 M 338,195 Q 350,205 362,195 M 343,205 Q 350,212 357,205"
        />
        <path
          strokeWidth={4}
          d="M 345,175 L 345,125 C 335,110 345,100 350,100 C 355,100 365,110 355,125 L 355,175"
        />
        <circle cx={220} cy={140} r={24} strokeWidth={6} />
        <line x1={212} y1={135} x2={212} y2={135} strokeWidth={7} />
        <line x1={228} y1={135} x2={228} y2={135} strokeWidth={7} />
        <path strokeWidth={4} d="M 210,148 Q 220,160 230,148" />
        <path
          strokeWidth={4}
          d="M 350,15 Q 360,0 345,-10 M 285,45 Q 270,35 260,45 M 415,45 Q 430,35 440,45"
        />
      </YarnIllustrationFrame>
    );
  }

  if (step === 2) {
    return (
      <YarnIllustrationFrame translateY={26}>
        <path
          strokeWidth={6}
          d="M 40,280 C 70,310 100,250 130,280 Q 145,290 160,220 L 160,164"
        />
        <path strokeWidth={5} d="M 160,220 Q 170,250 190,280" />
        <path strokeWidth={4} d="M 160,175 Q 130,185 135,215" />
        <path strokeWidth={5} d="M 160,175 Q 190,185 205,160" />
        <circle cx={160} cy={140} r={24} strokeWidth={6} />
        <line x1={152} y1={135} x2={152} y2={135} strokeWidth={7} />
        <line x1={168} y1={135} x2={168} y2={135} strokeWidth={7} />
        <path strokeWidth={4} d="M 150,148 Q 160,160 170,148" />

        <path
          strokeWidth={6}
          d="M 460,280 C 430,310 400,250 370,280 Q 355,290 340,220 L 340,164"
        />
        <path strokeWidth={5} d="M 340,220 Q 330,250 310,280" />
        <path strokeWidth={5} d="M 340,175 Q 310,185 295,160" />
        <path strokeWidth={4} d="M 340,175 Q 370,185 365,215" />
        <circle cx={340} cy={140} r={24} strokeWidth={6} />
        <line x1={332} y1={135} x2={332} y2={135} strokeWidth={7} />
        <line x1={348} y1={135} x2={348} y2={135} strokeWidth={7} />
        <path strokeWidth={4} d="M 330,148 Q 340,160 350,148" />

        <path
          strokeWidth={3}
          d="M 160,110 Q 160,100 175,90 C 205,80 215,40 185,25 C 150,10 100,20 95,55 C 90,80 125,95 145,90 Q 155,95 160,110"
        />
        <path
          strokeWidth={5}
          d="M 140,45 C 140,35 160,35 160,45 C 160,55 150,55 150,62 M 150,72 L 150,72"
        />

        <path
          strokeWidth={4}
          d="M 340,110 Q 340,100 325,90 C 295,80 285,40 315,25 C 350,10 400,20 405,55 C 410,80 375,95 355,90 Q 345,95 340,110"
        />
        <path strokeWidth={6} d="M 335,55 L 345,65 L 365,45" />
      </YarnIllustrationFrame>
    );
  }

  return (
    <YarnIllustrationFrame>
      <path
        strokeWidth={6}
        d="M 60,280 C 90,310 130,240 160,280 Q 170,290 180,220 L 180,164"
      />
      <path strokeWidth={5} d="M 180,220 Q 190,250 210,280" />
      <path strokeWidth={4} d="M 180,175 Q 150,185 155,215" />
      <path strokeWidth={5} d="M 180,175 Q 210,185 240,160" />
      <circle cx={180} cy={140} r={24} strokeWidth={6} />
      <line x1={172} y1={135} x2={172} y2={135} strokeWidth={7} />
      <line x1={188} y1={135} x2={188} y2={135} strokeWidth={7} />
      <path strokeWidth={4} d="M 170,148 Q 180,160 190,148" />

      <path
        strokeWidth={5}
        d="M 240,110 Q 270,105 300,110 Q 305,135 300,160 Q 270,165 240,160 Z"
      />
      <path strokeWidth={4} d="M 260,108 Q 270,125 280,108" />
      <path strokeWidth={3} d="M 275,135 L 280,140 L 290,125" />
      <path
        strokeWidth={3}
        d="M 255,175 L 255,185 M 270,175 L 270,185 M 285,175 L 285,185"
      />

      <path strokeWidth={6} d="M 230,190 L 235,280 L 305,280 L 310,190" />
      <path strokeWidth={5} d="M 230,190 Q 210,160 195,180" />
      <path strokeWidth={5} d="M 310,190 Q 330,160 345,180" />
      <path strokeWidth={4} d="M 270,190 Q 268,235 270,280" />

      <path strokeWidth={6} d="M 350,210 L 430,210 L 425,280 L 355,280 Z" />
      <path strokeWidth={4} d="M 390,210 Q 388,245 390,280" />
      <path strokeWidth={5} d="M 370,240 L 380,250 L 405,225" />
      <path
        strokeWidth={4}
        d="M 425,280 C 440,280 450,270 460,285 C 470,300 490,280 500,285"
      />
    </YarnIllustrationFrame>
  );
}

export function ProcessSteps({ locale }: { locale: Locale }) {
  const t = getTranslations(locale);

  return (
    <RevealStagger className="grid gap-6 md:grid-cols-3 md:gap-8" as="ol">
      <motion.li className={stepClass}>
        <span
          className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-accent text-lg font-bold text-white dark:text-onAccent"
          aria-hidden
        >
          1
        </span>
        <h3 className="mt-4 text-xl font-semibold text-accent">
          {t.process.step1.title}
        </h3>
        <p className="mt-2 text-surface/90 leading-relaxed">
          {t.process.step1.description}
        </p>
        {SHOW_YARN_ILLUSTRATIONS && <YarnIllustration step={1} />}
      </motion.li>
      <motion.li className={stepClass}>
        <span
          className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-accent text-lg font-bold text-white dark:text-onAccent"
          aria-hidden
        >
          2
        </span>
        <h3 className="mt-4 text-xl font-semibold text-accent">
          {t.process.step2.title}
        </h3>
        <p className="mt-2 text-surface/90 leading-relaxed">
          {t.process.step2.description}
        </p>
        {SHOW_YARN_ILLUSTRATIONS && <YarnIllustration step={2} />}
      </motion.li>
      <motion.li className={stepClass}>
        <span
          className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-accent text-lg font-bold text-white dark:text-onAccent"
          aria-hidden
        >
          3
        </span>
        <h3 className="mt-4 text-xl font-semibold text-accent">
          {t.process.step3.title}
        </h3>
        <p className="mt-2 text-surface/90 leading-relaxed">
          {t.process.step3.description}
        </p>
        {SHOW_YARN_ILLUSTRATIONS && <YarnIllustration step={3} />}
      </motion.li>
    </RevealStagger>
  );
}
