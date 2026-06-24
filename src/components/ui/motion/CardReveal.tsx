"use client";

import { FadeUp } from "./FadeUp";
import { CARD_SCALE, type RevealDirection } from "./variants";

/** FadeUp preset for individual cards inside a CardGrid: fade + y/x + slight scale settle. */
export function CardReveal({
  children,
  className,
  direction,
}: {
  children: React.ReactNode;
  className?: string;
  direction?: RevealDirection;
}) {
  return (
    <FadeUp viewportTrigger={false} scale={CARD_SCALE} direction={direction} className={className}>
      {children}
    </FadeUp>
  );
}
