import type { LucideIcon } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";

export function CommitteeCard({
  tag,
  difficulty,
  icon: Icon,
  tagline,
  briefing,
  href,
  dark = false,
}: {
  tag: string;
  difficulty: string;
  icon: LucideIcon;
  tagline: string;
  briefing: string;
  href: string;
  dark?: boolean;
}) {
  return (
    <div
      className={cn(
        "group flex flex-col overflow-hidden rounded-2xl border transition-all duration-300 ease-out hover:-translate-y-1.5 hover:shadow-xl",
        dark
          ? "border-navy-900 bg-navy-900 text-cream-50 hover:border-gold-400/40 hover:shadow-navy-900/40"
          : "border-border bg-cream-50 text-navy-900 hover:border-gold-400/40 hover:shadow-navy-900/10",
      )}
    >
      <div
        className={cn(
          "relative h-48 bg-gradient-to-br",
          dark
            ? "from-navy-700 to-navy-900"
            : "from-navy-800 to-navy-950",
        )}
      >
        <span className="absolute top-4 left-4">
          <Badge variant={dark ? "dark" : "default"}>{difficulty}</Badge>
        </span>
      </div>

      <div className="flex flex-1 flex-col gap-4 p-8">
        <div className="flex items-center gap-2 text-sm font-medium uppercase tracking-wide-label text-gold-500">
          <Icon size={16} />
          {tag}
        </div>
        <h3 className="font-display text-xl leading-snug">{tagline}</h3>
        <p
          className={cn(
            "text-sm leading-relaxed",
            dark ? "text-cream-200/70" : "text-muted",
          )}
        >
          {briefing}
        </p>
        <div className="mt-auto flex flex-col gap-3 pt-2 sm:flex-row">
          <Button href={href} variant={dark ? "outline-light" : "outline"}>
            Study Guide
          </Button>
          <Button href={href} variant={dark ? "light" : "primary"}>
            Apply for Portfolio
          </Button>
        </div>
      </div>
    </div>
  );
}
