import Link from "next/link";
import type { ReactNode } from "react";
import { ChevronRight } from "@/components/ui/icons";
import { cn } from "@/lib/utils";

type Variant = "outline" | "solid" | "text";
type Tone = "light" | "dark";

const styles: Record<Variant, Record<Tone, string>> = {
  outline: {
    light: "border border-brand text-brand hover:bg-brand hover:text-white",
    dark: "border border-white/70 text-white hover:bg-white hover:text-navy",
  },
  solid: {
    light: "bg-brand text-white hover:bg-brand-dark",
    dark: "bg-white text-navy hover:bg-brand-light hover:text-navy",
  },
  text: {
    light: "text-brand",
    dark: "text-white",
  },
};

export function ButtonLink({
  href,
  children,
  variant = "outline",
  tone = "light",
  size = "md",
  className,
}: {
  href: string;
  children: ReactNode;
  variant?: Variant;
  tone?: Tone;
  size?: "md" | "lg";
  className?: string;
}) {
  const isText = variant === "text";
  return (
    <Link
      href={href}
      className={cn(
        "group inline-flex items-center gap-2 font-bold transition-colors duration-200",
        size === "md" ? "text-[15px]" : "text-[17px]",
        isText ? "py-1" : "min-h-12 px-5 py-3",
        styles[variant][tone],
        className,
      )}
    >
      <ChevronRight size={16} className="shrink-0 transition-transform duration-200 group-hover:translate-x-0.5" />
      <span
        className={cn(
          isText &&
            "border-b border-current/60 pb-0.5 transition-colors group-hover:border-current",
        )}
      >
        {children}
      </span>
    </Link>
  );
}
