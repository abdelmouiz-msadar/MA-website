import Link from "next/link";
import type { ReactNode } from "react";
import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal";
import { needOptions } from "@/lib/content/contact";
import { routes } from "@/lib/content/routes";

/** Closing call-to-action on a pale wash. With `showNeeds`, adds one outlined chip per contact subject (pre-selects the form). */
export function ClosingCta({
  title,
  body,
  children,
  showNeeds = false,
}: {
  title: string;
  body: string;
  children: ReactNode;
  showNeeds?: boolean;
}) {
  return (
    <section className="bg-wash py-24 sm:py-28">
      <Container>
        <Reveal className="mx-auto flex max-w-[960px] flex-col items-center text-center">
          <h2 className="max-w-[22ch] text-[clamp(2rem,3.8vw,3.25rem)] font-bold leading-[1.1] tracking-[-0.01em] text-navy text-balance">
            {title}
          </h2>
          <p className="mt-5 max-w-[56ch] text-[17px] leading-relaxed text-ink/80 sm:text-[19px]">{body}</p>
          {showNeeds ? (
            <ul className="mt-10 flex flex-wrap justify-center gap-2.5">
              {needOptions.map((opt) => (
                <li key={opt.value}>
                  <Link
                    href={`${routes.contact}?sujet=${opt.value}`}
                    className="inline-flex min-h-11 items-center border border-brand/50 bg-white/60 px-4 py-2 text-[15px] text-brand transition-colors hover:border-brand hover:bg-brand hover:text-white"
                  >
                    {opt.label}
                  </Link>
                </li>
              ))}
            </ul>
          ) : null}
          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">{children}</div>
        </Reveal>
      </Container>
    </section>
  );
}
