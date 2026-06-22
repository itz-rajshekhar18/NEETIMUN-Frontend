import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { Avatar } from "@/components/ui/Avatar";

export function ProfileCard({
  name,
  role,
  quote,
  href,
  size = "md",
  className,
}: {
  name: string;
  role: string;
  quote?: string;
  href?: string;
  size?: "md" | "lg";
  className?: string;
}) {
  return (
    <div className={cn("group flex flex-col gap-4", className)}>
      <Avatar
        name={name}
        size={size}
        shape="tile"
        className="transition-transform duration-300 ease-out group-hover:-translate-y-1.5"
      />
      <div className="flex flex-col gap-1">
        <span className="text-xs font-medium uppercase tracking-wide-label text-gold-600">
          {role}
        </span>
        <h3 className="font-display text-xl text-navy-900">{name}</h3>
      </div>
      {quote ? (
        <p className="text-sm leading-relaxed text-muted italic">
          &ldquo;{quote}&rdquo;
        </p>
      ) : null}
      {href ? (
        <Link
          href={href}
          className="flex items-center gap-2 text-sm font-medium text-navy-900 hover:text-gold-600"
        >
          View Profile
          <ArrowRight
            size={14}
            className="transition-transform duration-200 group-hover:translate-x-1"
          />
        </Link>
      ) : null}
    </div>
  );
}
