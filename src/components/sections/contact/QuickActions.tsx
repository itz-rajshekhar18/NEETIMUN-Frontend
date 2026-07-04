import Link from "next/link";
import { cn } from "@/lib/utils";
import { quickActions } from "@/lib/data/contact";

export function QuickActions({ className }: { className?: string }) {
  return (
    <div className={cn("flex flex-wrap gap-2", className)}>
      {quickActions.map((action) => {
        const isExternal = action.href.startsWith("http");
        return (
          <Link
            key={action.label}
            href={action.href}
            {...(isExternal ? { target: "_blank", rel: "noreferrer" } : {})}
            className="group inline-flex items-center gap-2 rounded-full border border-border bg-cream-50 px-4 py-2 text-sm font-medium text-navy-900 shadow-sm shadow-navy-900/[0.04] transition-all duration-200 ease-out hover:-translate-y-0.5 hover:border-gold-400/60 hover:shadow-md hover:shadow-navy-900/[0.08] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-500 focus-visible:ring-offset-2 focus-visible:ring-offset-cream-100"
          >
            <action.icon
              size={14}
              className="shrink-0 text-gold-600 transition-transform duration-200 group-hover:scale-110"
            />
            {action.label}
          </Link>
        );
      })}
    </div>
  );
}
