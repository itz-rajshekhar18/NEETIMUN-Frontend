import { cn } from "@/lib/utils";

const sizeClasses = {
  xs: "h-9 w-9 text-xs",
  sm: "h-10 w-10 text-sm",
  md: "h-48 text-3xl",
  lg: "h-64 text-5xl",
} as const;

export function Avatar({
  name,
  size = "sm",
  shape = "circle",
  className,
}: {
  name: string;
  size?: keyof typeof sizeClasses;
  shape?: "circle" | "tile";
  className?: string;
}) {
  const initials = name
    .split(" ")
    .map((part) => part.charAt(0))
    .join("")
    .slice(0, 2);

  return (
    <span
      className={cn(
        "flex shrink-0 items-center justify-center bg-navy-900 font-display text-cream-50",
        shape === "circle" ? "rounded-full" : "w-full rounded-2xl",
        sizeClasses[size],
        className,
      )}
    >
      {initials}
    </span>
  );
}
