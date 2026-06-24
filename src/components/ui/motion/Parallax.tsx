"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import { EASE } from "./variants";

/**
 * Wraps a decorative element with a subtle scroll-linked vertical drift.
 * Renders a full-bleed positioning context (`absolute inset-0`) so the child
 * keeps its own absolute-centering classes working as before.
 */
export function Parallax({
  children,
  className,
  range = 16,
  fadeIn,
}: {
  children: React.ReactNode;
  className?: string;
  range?: number;
  /** When provided, the element fades in on page load with the given delay and duration. */
  fadeIn?: { delay: number; duration: number };
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], reduced ? [0, 0] : [-range, range]);

  const entranceProps =
    fadeIn && !reduced
      ? {
          initial: { opacity: 0 },
          animate: { opacity: 1 },
          transition: { duration: fadeIn.duration, ease: EASE, delay: fadeIn.delay },
        }
      : {};

  return (
    <motion.div ref={ref} style={{ y }} className={className} {...entranceProps}>
      {children}
    </motion.div>
  );
}
