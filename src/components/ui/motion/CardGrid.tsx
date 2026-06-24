"use client";

import { StaggerContainer } from "./StaggerContainer";
import { CARD_STAGGER } from "./variants";

/** StaggerContainer preset with a pronounced, sequential cascade for card grids. */
export function CardGrid({
  children,
  className,
  delayChildren,
}: {
  children: React.ReactNode;
  className?: string;
  /** Override the initial delay before the first card animates. Useful for section choreography where you want the heading to lead. */
  delayChildren?: number;
}) {
  return (
    <StaggerContainer className={className} stagger={CARD_STAGGER} delayChildren={delayChildren}>
      {children}
    </StaggerContainer>
  );
}
