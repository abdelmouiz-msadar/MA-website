import { Eyebrow } from "@/components/ui/section-heading";

export function PullQuote({ eyebrow, children }: { eyebrow?: string; children: string }) {
  return (
    <div className="flex flex-col gap-6">
      {eyebrow ? <Eyebrow>{eyebrow}</Eyebrow> : null}
      <p className="max-w-[22ch] text-[clamp(1.75rem,3.6vw,3rem)] font-medium leading-[1.15] tracking-[-0.01em] text-balance">
        {children}
      </p>
    </div>
  );
}
