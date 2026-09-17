import { cn } from "@/lib/utils";

export function Chevron({ size = 9, className }: { size?: number; className?: string }) {
  return (
    <svg
      aria-hidden
      width={size}
      height={size}
      viewBox="0 0 9 9"
      className={cn("transition-transform duration-200", className)}
    >
      <path d="M1 3L4.5 6.5L8 3" stroke="currentColor" strokeWidth="1.2" fill="none" />
    </svg>
  );
}
