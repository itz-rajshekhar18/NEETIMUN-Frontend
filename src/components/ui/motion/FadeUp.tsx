"use client";

import { motion, useReducedMotion } from "framer-motion";
import { fadeVariants, VIEWPORT, type RevealDirection } from "./variants";

export function FadeUp({
  children,
  className,
  delay = 0,
  scale = 1,
  direction = "up",
  viewportTrigger = true,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  /** Starting scale before settling to 1 (e.g. 0.96). Defaults to 1 (no scale change). */
  scale?: number;
  /** Reveal direction: "up" (default), "left", or "right". */
  direction?: RevealDirection;
  /** Set false when nesting inside StaggerContainer / RevealSection so timing is inherited from the parent. */
  viewportTrigger?: boolean;
}) {
  const reduced = useReducedMotion();
  const variants = fadeVariants(direction, !!reduced, delay, scale);

  if (!viewportTrigger) {
    return (
      <motion.div className={className} variants={variants}>
        {children}
      </motion.div>
    );
  }

  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={VIEWPORT}
      variants={variants}
    >
      {children}
    </motion.div>
  );
}
