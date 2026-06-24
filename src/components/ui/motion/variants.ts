import type { Transition, Variants } from "framer-motion";

export const EASE: Transition["ease"] = [0.16, 1, 0.3, 1];
export const DURATION = 0.65;
export const VIEWPORT = { once: true, margin: "-80px" } as const;

/** Default stagger for general use (buttons, small groups). */
export const STAGGER = 0.1;
export const DELAY_CHILDREN = 0.05;

/** Tighter, quick cascade for eyebrow -> heading -> subtitle. */
export const HEADING_STAGGER = 0.12;
export const HEADING_SCALE = 0.98;

/** Pronounced, sequential cascade for card grids so cards visibly introduce themselves one by one. */
export const CARD_STAGGER = 0.15;
export const CARD_SCALE = 0.96;

export type RevealDirection = "up" | "left" | "right";

export function fadeVariants(
  direction: RevealDirection,
  reduced: boolean,
  delay = 0,
  scale = 1,
): Variants {
  if (reduced) {
    return {
      hidden: { opacity: 1, y: 0, x: 0, scale: 1 },
      visible: { opacity: 1, y: 0, x: 0, scale: 1 },
    };
  }
  const hidden: Record<string, number> = { opacity: 0, scale };
  if (direction === "up") hidden.y = 28;
  else if (direction === "left") hidden.x = -24;
  else hidden.x = 24;
  return {
    hidden,
    visible: {
      opacity: 1,
      y: 0,
      x: 0,
      scale: 1,
      transition: { duration: DURATION, ease: EASE, delay },
    },
  };
}

export function fadeUpVariants(reduced: boolean, delay = 0, scale = 1): Variants {
  return fadeVariants("up", reduced, delay, scale);
}

export function fadeInVariants(reduced: boolean, delay = 0): Variants {
  if (reduced) {
    return {
      hidden: { opacity: 1 },
      visible: { opacity: 1 },
    };
  }
  return {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { duration: DURATION, ease: EASE, delay },
    },
  };
}

export function staggerVariants(
  reduced: boolean,
  stagger = STAGGER,
  delayChildren = DELAY_CHILDREN,
): Variants {
  if (reduced) {
    return { hidden: {}, visible: {} };
  }
  return {
    hidden: {},
    visible: {
      transition: { staggerChildren: stagger, delayChildren },
    },
  };
}
