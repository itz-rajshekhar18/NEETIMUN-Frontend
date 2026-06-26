"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { LucideIcon } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { IconCircle } from "@/components/ui/IconCircle";
import { cn } from "@/lib/utils";

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];
const VIEWPORT = { once: true, margin: "-50px" } as const;

export function CommitteeCard({
  tag,
  title,
  description,
  icon: Icon,
  badges,
  agenda,
  portfolioTypes,
  href,
  className,
}: {
  tag: string;
  title: string;
  description: string[];
  icon: LucideIcon;
  badges: string[];
  agenda: string | null;
  portfolioTypes: string[];
  href: string;
  className?: string;
}) {
  const reduced = useReducedMotion();

  const sec = (index: number) => ({
    initial: { opacity: 0, y: reduced ? 0 : 10 },
    whileInView: { opacity: 1, y: 0 },
    viewport: VIEWPORT,
    transition: {
      duration: reduced ? 0.01 : 0.45,
      ease: EASE,
      delay: reduced ? 0 : index * 0.07,
    },
  });

  return (
    <div
      className={cn(
        "group relative flex flex-col overflow-hidden rounded-3xl border border-navy-900/10 bg-cream-50 transition-all duration-300 ease-out hover:-translate-y-2 hover:border-gold-400/30 hover:shadow-[0_28px_64px_-12px_rgba(10,27,63,0.15)] lg:flex-row",
        className,
      )}
    >
      {/* Icon sidebar */}
      <div className="relative z-10 flex h-44 shrink-0 flex-col items-center justify-center overflow-hidden bg-gradient-to-br from-navy-800 to-navy-950 lg:h-auto lg:w-64">
        {/* Watermark icon */}
        <Icon
          size={128}
          aria-hidden
          className="absolute text-cream-50 opacity-[0.05]"
        />

        {/* Gold radial bloom */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(circle at 50% 50%, rgba(201,162,39,0.20) 0%, transparent 58%)",
          }}
        />

        {/* Pulsing glow ring */}
        {!reduced && (
          <motion.div
            aria-hidden
            className="pointer-events-none absolute rounded-full"
            style={{
              width: 100,
              height: 100,
              background:
                "radial-gradient(circle, rgba(201,162,39,0.22) 0%, transparent 68%)",
            }}
            animate={{ opacity: [0.35, 0.75, 0.35], scale: [0.9, 1.1, 0.9] }}
            transition={{
              duration: 3.6,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        )}

        {/* Icon + tag */}
        <div className="relative z-10 flex flex-col items-center gap-3">
          <IconCircle tone="dark" className="h-14 w-14">
            <Icon size={22} />
          </IconCircle>
          <span className="text-[11px] font-semibold uppercase tracking-wide-label text-gold-400">
            {tag}
          </span>
        </div>
      </div>

      {/* Content panel */}
      <div className="relative z-10 flex flex-1 flex-col gap-6 p-8 lg:p-10">
        {/* ① Category badges */}
        <motion.div {...sec(0)} className="flex flex-wrap gap-2.5">
          {badges.map((badge) => (
            <Badge key={badge} variant="gold" className="tracking-wider">
              {badge}
            </Badge>
          ))}
        </motion.div>

        {/* ② Committee title */}
        <motion.h2
          {...sec(1)}
          className="font-display text-2xl tracking-tight text-navy-900 lg:text-3xl"
        >
          {title}
        </motion.h2>

        {/* ③ Agenda */}
        {agenda && (
          <motion.div {...sec(2)} className="flex flex-col gap-1.5">
            <span className="text-[11px] font-semibold uppercase tracking-wide-label text-gold-600">
              Agenda
            </span>
            <p className="text-sm italic leading-6 text-navy-900/65">
              {agenda}
            </p>
          </motion.div>
        )}

        {/* ④ Description */}
        <motion.div {...sec(3)} className="flex flex-col gap-3">
          {description.map((para, i) => (
            <p key={i} className="text-sm leading-7 text-muted">
              {para}
            </p>
          ))}
        </motion.div>

        {/* ⑤ Portfolio types */}
        {portfolioTypes.length > 0 && (
          <motion.div {...sec(4)} className="flex flex-col gap-2.5">
            <span className="text-[11px] font-semibold uppercase tracking-wide-label text-gold-600">
              Portfolio Types
            </span>
            <div className="flex flex-wrap gap-2">
              {portfolioTypes.map((type) => (
                <span
                  key={type}
                  className="inline-flex items-center rounded-full border border-navy-900/15 bg-cream-100 px-3 py-1 text-[11px] font-medium uppercase tracking-wide-label text-navy-700 transition-all duration-200 ease-out hover:-translate-y-px hover:border-gold-400/50 hover:shadow-sm"
                >
                  {type}
                </span>
              ))}
            </div>
          </motion.div>
        )}

        {/* ⑥ CTAs */}
        <motion.div
          {...sec(5)}
          className="mt-auto flex flex-col gap-3 pt-4 sm:flex-row"
        >
          <Button href={href} variant="outline">
            Study Guide
          </Button>
          <Button href="/registration" variant="primary">
            Apply for Portfolio
          </Button>
        </motion.div>
      </div>
    </div>
  );
}
