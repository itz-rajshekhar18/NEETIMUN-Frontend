import type { LucideIcon } from "lucide-react";
import { IconCircle } from "@/components/ui/IconCircle";
import { cn } from "@/lib/utils";

export function FeatureCard({
  icon: Icon,
  title,
  description,
  tone = "light",
  featured = false,
  className,
}: {
  icon: LucideIcon;
  title: string;
  description: string;
  tone?: "light" | "dark";
  featured?: boolean;
  className?: string;
}) {
  const isDarkSurface = tone === "dark" || featured;

  return (
    <div
      className={cn(
        "flex flex-col gap-4 rounded-2xl border p-8 transition-all duration-300 ease-out",
        featured
          ? "border-navy-900 bg-navy-900 text-cream-50 md:-translate-y-4 md:shadow-xl md:shadow-navy-900/20 hover:-translate-y-6 hover:shadow-2xl hover:shadow-navy-900/40 md:hover:-translate-y-6"
          : tone === "dark"
            ? "border-cream-50/10 bg-transparent text-cream-50 hover:-translate-y-1.5 hover:border-gold-400/30"
            : "border-border bg-cream-50 text-navy-900 hover:-translate-y-2 hover:border-gold-400/40 hover:shadow-xl hover:shadow-navy-900/10",
        className,
      )}
    >
      <IconCircle tone={isDarkSurface ? "dark" : "light"}>
        <Icon size={20} />
      </IconCircle>
      <h3
        className={cn(
          "font-display text-xl",
          isDarkSurface ? "text-cream-50" : "text-navy-900",
        )}
      >
        {title}
      </h3>
      <p
        className={cn(
          "text-sm leading-relaxed",
          isDarkSurface ? "text-cream-200/70" : "text-muted",
        )}
      >
        {description}
      </p>
    </div>
  );
}
