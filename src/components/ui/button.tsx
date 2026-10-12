import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";
import { ArrowUpRight } from "@/components/ui/icons";
import { cn } from "@/lib/utils";

type Variant = "solid" | "inverted" | "outline" | "outline-light";

const variants: Record<Variant, string> = {
  /** Black on light backgrounds. */
  solid: "bg-ink text-paper",
  /** White on dark backgrounds and photography. */
  inverted: "bg-paper text-ink hover:text-paper",
  outline: "border border-text/25 text-text hover:border-green hover:text-paper",
  "outline-light": "border border-paper/35 text-paper hover:border-green",
};

const sizes = {
  md: "min-h-[48px] px-7 py-3.5 text-sm",
  lg: "min-h-[56px] px-8 py-4 text-[0.9375rem]",
};

type Shared = { variant?: Variant; size?: keyof typeof sizes; className?: string; children: ReactNode };

const base =
  "group relative isolate inline-flex items-center justify-center gap-2.5 overflow-hidden font-semibold transition-colors duration-300 ease-editorial";

/** Green fill that sweeps in from the left on hover. */
function Sweep() {
  return (
    <span
      aria-hidden
      className="absolute inset-0 -z-10 origin-left scale-x-0 bg-green transition-transform duration-500 ease-editorial group-hover:scale-x-100"
    />
  );
}

function Arrow() {
  return (
    <ArrowUpRight
      size={16}
      className="shrink-0 transition-transform duration-500 ease-editorial group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
    />
  );
}

export function ButtonLink({
  href,
  variant = "solid",
  size = "lg",
  className,
  children,
  ...rest
}: Shared & Omit<ComponentProps<typeof Link>, "className" | "children">) {
  return (
    <Link href={href} className={cn(base, sizes[size], variants[variant], className)} {...rest}>
      <Sweep />
      <span>{children}</span>
      <Arrow />
    </Link>
  );
}

export function Button({
  variant = "solid",
  size = "md",
  className,
  children,
  ...rest
}: Shared & Omit<ComponentProps<"button">, "className" | "children">) {
  return (
    <button className={cn(base, sizes[size], variants[variant], className)} {...rest}>
      <Sweep />
      <span>{children}</span>
      <Arrow />
    </button>
  );
}

/** Underlined text link whose rule fills with green on hover. */
export function TextLink({ href, children, className }: { href: string; children: ReactNode; className?: string }) {
  return (
    <Link href={href} className={cn("group relative inline-flex items-center gap-1.5 pb-1.5 text-sm font-semibold", className)}>
      <span>{children}</span>
      <ArrowUpRight
        size={14}
        className="transition-transform duration-300 ease-editorial group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
      />
      <span aria-hidden className="absolute inset-x-0 bottom-0 h-px bg-current opacity-25" />
      <span
        aria-hidden
        className="absolute inset-x-0 bottom-0 h-px origin-left scale-x-0 bg-accent transition-transform duration-500 ease-editorial group-hover:scale-x-100 group-focus-visible:scale-x-100"
      />
    </Link>
  );
}
