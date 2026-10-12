import type { ReactNode } from "react";
import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal";

/** Closing call-to-action on a pale wash, used at the end of interior pages. */
export function ClosingCta({ title, body, children }: { title: string; body: string; children: ReactNode }) {
  return (
    <section className="bg-wash py-24 sm:py-28">
      <Container>
        <Reveal className="mx-auto flex max-w-[960px] flex-col items-center text-center">
          <h2 className="max-w-[22ch] text-[clamp(2rem,3.8vw,3.25rem)] font-bold leading-[1.1] tracking-[-0.01em] text-navy text-balance">
            {title}
          </h2>
          <p className="mt-5 max-w-[56ch] text-[17px] leading-relaxed text-ink/80 sm:text-[19px]">{body}</p>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">{children}</div>
        </Reveal>
      </Container>
    </section>
  );
}
