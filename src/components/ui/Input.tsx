import { cn } from "@/lib/utils";

export function Input({
  className,
  ...props
}: React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      className={cn(
        "w-full rounded-xl border border-border bg-cream-50 px-4 py-3 text-sm text-navy-900 placeholder:text-navy-900/40 transition-colors duration-200 focus:border-navy-900 focus:outline-none focus-visible:ring-2 focus-visible:ring-gold-500 focus-visible:ring-offset-2 focus-visible:ring-offset-cream-50",
        className,
      )}
      {...props}
    />
  );
}
