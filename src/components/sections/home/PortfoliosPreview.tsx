"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import { Container } from "@/components/ui/Container";
import { CardGrid, CardReveal, Magnetic, RevealSection } from "@/components/ui/motion";
import { SectionBackdrop } from "@/components/ui/SectionBackdrop";
import { committees } from "@/lib/data/committees";
import { cn } from "@/lib/utils";

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];
const VIEWPORT = { once: true, margin: "-40px" } as const;

/** Accent colours per committee — cycles through a curated set */
const ACCENT_COLORS = [
  { from: "from-navy-900", via: "via-navy-800", to: "to-navy-700" },
  { from: "from-[#1a3a5c]", via: "via-[#1c4870]", to: "to-[#1c3566]" },
  { from: "from-navy-950", via: "via-navy-900", to: "to-navy-800" },
  { from: "from-[#0f2744]", via: "via-navy-800", to: "to-navy-700" },
  { from: "from-navy-800", via: "via-[#1a3560]", to: "to-navy-900" },
  { from: "from-navy-950", via: "via-[#122a57]", to: "to-navy-800" },
];

function CommitteePreviewCard({
  committee,
  index,
}: {
  committee: (typeof committees)[number];
  index: number;
}) {
  const reduced = useReducedMotion();
  const accent = ACCENT_COLORS[index % ACCENT_COLORS.length];
  const Icon = committee.icon;

  return (
    <div
      className={cn(
        // Fixed height ensures every card in the grid is identical
        "group relative flex flex-col overflow-hidden rounded-2xl",
        "border border-border bg-cream-50",
        "transition-all duration-300 ease-out",
        "hover:-translate-y-2 hover:border-gold-400/50",
        "hover:shadow-[0_24px_56px_-10px_rgba(10,27,63,0.18)]",
        // Explicit fixed height — makes all 6 cards identical across both rows
        "h-[380px]",
      )}
    >
      {/* ── TOP ACCENT BAND ── navy gradient with committee monogram ── */}
      <div
        className={cn(
          "relative flex h-[108px] shrink-0 flex-col items-start justify-between overflow-hidden px-6 pt-5 pb-4",
          `bg-gradient-to-br ${accent.from} ${accent.via} ${accent.to}`,
        )}
      >
        {/* Ambient radial glow — subtle depth */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 80% 70% at 10% 120%, rgba(201,162,39,0.12) 0%, transparent 65%)",
          }}
        />

        {/* Gold top hairline */}
        <span
          aria-hidden
          className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-gold-500/40 to-transparent"
        />

        {/* Editorial index number — top-right, reveals to gold on hover */}
        <span
          aria-hidden
          className="pointer-events-none absolute right-5 top-5 font-display text-[11px] leading-none tracking-[0.14em] text-cream-50/25 transition-colors duration-300 group-hover:text-gold-400/60"
        >
          {String(index + 1).padStart(2, "0")}
        </span>

        {/* Committee tag monogram */}
        <motion.span
          initial={{ opacity: 0, y: reduced ? 0 : 6 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={VIEWPORT}
          transition={{ duration: 0.4, ease: EASE, delay: reduced ? 0 : index * 0.05 }}
          className={cn(
            "relative z-10 font-display text-3xl font-normal leading-none tracking-tight text-cream-50/90",
            "transition-colors duration-300 group-hover:text-gold-300",
          )}
        >
          {committee.tag}
        </motion.span>

        {/* Icon + gold divider row at bottom of band */}
        <div className="relative z-10 flex w-full items-end justify-between">
          {/* Gold expanding divider */}
          <span
            aria-hidden
            className="block h-px w-8 bg-gold-500/50 transition-all duration-300 ease-out group-hover:w-16"
          />
          {/* Lucide icon — ghost, bottom-right */}
          <Icon
            size={18}
            className="text-cream-50/25 transition-all duration-300 group-hover:text-gold-400/60"
            strokeWidth={1.5}
          />
        </div>
      </div>

      {/* ── CONTENT BODY ── */}
      <div className="relative flex flex-1 flex-col gap-3.5 px-6 pt-5 pb-6">
        {/* Topic badges — single row, clipped to prevent overflow */}
        <div className="flex flex-wrap items-center gap-1.5 overflow-hidden" style={{ maxHeight: "28px" }}>
          {committee.badges.slice(0, 3).map((badge) => (
            <span
              key={badge}
              className="inline-flex items-center rounded-full border border-gold-400/50 bg-gold-300/20 px-2.5 py-0.5 text-[9px] font-semibold uppercase tracking-wide-label text-gold-600"
            >
              {badge}
            </span>
          ))}
        </div>

        {/* Committee title — clamp to 2 lines for uniformity */}
        <h3 className="line-clamp-2 font-display text-[17px] leading-snug text-navy-900 transition-colors duration-200 group-hover:text-navy-700">
          {committee.title}
        </h3>

        {/* Thin editorial divider */}
        <div className="h-px bg-border" />

        {/* Short description — clamp to 3 lines */}
        <p className="line-clamp-3 flex-1 text-sm leading-relaxed text-muted">
          {committee.shortDescription}
        </p>

        {/* CTA — always pinned at the bottom via mt-auto */}
        <Link
          href={committee.href}
          className="group/cta mt-auto flex items-center gap-1.5 text-sm font-medium text-gold-600 transition-all duration-200 hover:text-gold-700"
        >
          <span className="relative">
            Explore Committee
            <span className="absolute inset-x-0 -bottom-px h-px origin-left scale-x-0 bg-gold-500 transition-transform duration-200 group-hover/cta:scale-x-100" />
          </span>
          <ArrowRight
            size={13}
            className="transition-transform duration-200 ease-out group-hover/cta:translate-x-1.5"
          />
        </Link>
      </div>

      {/* Bottom-edge gold shimmer on hover */}
      <span
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 h-px scale-x-0 bg-gradient-to-r from-transparent via-gold-500/50 to-transparent transition-transform duration-500 group-hover:scale-x-100"
      />
    </div>
  );
}

export function PortfoliosPreview() {
  return (
    <section id="portfolios" className="relative py-20">
      <SectionBackdrop variant="gold-bl" range={12} />
      <Container className="flex flex-col gap-12">

        {/* ── Section header ─────────────────────────────────────────── */}
        <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
          <RevealSection className="flex flex-col items-start gap-3 text-left">
            <span className="text-xs font-medium uppercase tracking-wide-label text-gold-600">
              Committees
            </span>
            <h2 className="font-display text-3xl leading-tight text-navy-900 sm:text-4xl lg:text-5xl">
              The Committees
            </h2>
            <p className="max-w-xl text-base leading-relaxed text-muted">
              Six carefully curated councils designed to challenge negotiation,
              diplomacy, policy making, journalism, and international
              cooperation.
            </p>
          </RevealSection>

          <Link
            href="/committees"
            className="group flex shrink-0 items-center gap-1.5 text-sm font-medium text-navy-900 transition-colors duration-200 hover:text-gold-600"
          >
            View All Committees
            <ArrowRight
              size={15}
              className="transition-transform duration-200 group-hover:translate-x-1"
            />
          </Link>
        </div>

        {/* ── Committee card grid ──────────────────────────────────────
              grid-rows-[1fr] ensures ALL cells in each row share the same
              height (CSS grid stretches flex children to fill).
        ─────────────────────────────────────────────────────────────── */}
        <CardGrid
          className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3"
          delayChildren={0.35}
        >
          {committees.map((committee, i) => (
            <CardReveal key={committee.id}>
              <Magnetic range={2} className="w-full">
                <CommitteePreviewCard committee={committee} index={i} />
              </Magnetic>
            </CardReveal>
          ))}
        </CardGrid>

      </Container>
    </section>
  );
}
