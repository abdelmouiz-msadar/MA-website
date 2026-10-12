import type { ReactNode } from "react";
import { Reveal } from "@/components/ui/reveal";
import { cn } from "@/lib/utils";

export function Eyebrow({ children, className }: { children: ReactNode; className?: string }) {
  return <p className={cn("eyebrow text-muted", className)}>{children}</p>;
}

/** Section opener: eyebrow, h2 and lead on the left, an optional action aligned to the bottom right. */
export function SectionHeader({
  eyebrow,
  title,
  lead,
  action,
  className,
}: {
  eyebrow?: string;
  title: ReactNode;
  lead?: ReactNode;
  action?: ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("mb-12 flex flex-col gap-7 lg:mb-16 lg:flex-row lg:items-end lg:justify-between lg:gap-12", className)}>
      <div className="max-w-3xl">
        {eyebrow ? (
          <Reveal>
            <Eyebrow className="mb-5">{eyebrow}</Eyebrow>
          </Reveal>
        ) : null}
        <Reveal as="h2" className="text-h2 font-semibold text-balance">
          {title}
        </Reveal>
        {lead ? (
          <Reveal as="p" className="mt-6 max-w-xl text-lg text-muted">
            {lead}
          </Reveal>
        ) : null}
      </div>
      {action ? <Reveal className="flex shrink-0 items-center gap-6 self-start lg:self-auto">{action}</Reveal> : null}
    </div>
  );
}
