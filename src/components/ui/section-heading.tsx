import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export function Eyebrow({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <p
      className={cn(
        "font-mono text-[12px] uppercase tracking-[0.14em] text-steel flex items-center gap-3",
        className,
      )}
    >
      <span aria-hidden className="h-px w-8 bg-steel/50" />
      {children}
    </p>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  lead,
  align = "left",
  className,
  titleAs: Title = "h2",
}: {
  eyebrow?: string;
  title: ReactNode;
  lead?: ReactNode;
  align?: "left" | "center";
  className?: string;
  /** Render the heading as h1 when this is the page's primary heading. Defaults to h2. */
  titleAs?: "h1" | "h2";
}) {
  return (
    <div className={cn("flex flex-col gap-4", align === "center" && "items-center text-center", className)}>
      {eyebrow ? <Eyebrow>{eyebrow}</Eyebrow> : null}
      <Title className="text-[clamp(1.75rem,3.2vw,2.75rem)] font-medium leading-[1.1] tracking-[-0.01em] text-ink text-balance">
        {title}
      </Title>
      {lead ? <p className="max-w-[52ch] text-[17px] leading-[1.6] text-ink-soft">{lead}</p> : null}
    </div>
  );
}
