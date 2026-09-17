import type { ReactNode } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";

type Variant = "primary" | "secondary" | "ghost";

export function CtaLink({
  href,
  children,
  variant = "primary",
  className,
}: {
  href: string;
  children: ReactNode;
  variant?: Variant;
  className?: string;
}) {
  const base =
    "group inline-flex items-center gap-3 px-6 py-3.5 text-[13px] font-medium tracking-[0.04em] uppercase transition-colors duration-200";

  const variants: Record<Variant, string> = {
    primary: "bg-ink text-white hover:bg-steel",
    secondary: "border border-ink/25 text-ink hover:border-steel hover:text-steel",
    ghost: "px-0 py-0 text-ink hover:text-steel",
  };

  return (
    <Link href={href} className={cn(base, variants[variant], className)}>
      <span>{children}</span>
      <span
        aria-hidden
        className="inline-block transition-transform duration-200 group-hover:translate-x-1"
      >
        &rarr;
      </span>
    </Link>
  );
}
