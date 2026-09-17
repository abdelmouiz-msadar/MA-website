import type { ReactNode } from "react";
import { Container } from "@/components/ui/container";

export function ClosingCta({
  title,
  body,
  children,
}: {
  title: ReactNode;
  body: ReactNode;
  children: ReactNode;
}) {
  return (
    <section className="bg-ink text-white">
      <Container className="flex flex-col items-start gap-8 py-24 sm:py-28">
        <h2 className="max-w-[18ch] text-[clamp(2rem,4vw,3.25rem)] font-medium leading-[1.08] tracking-[-0.01em] text-balance">
          {title}
        </h2>
        <p className="max-w-[48ch] text-[17px] leading-relaxed text-white/60">{body}</p>
        <div className="flex flex-wrap gap-4">{children}</div>
      </Container>
    </section>
  );
}
