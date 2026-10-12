import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/ui/container";
import { ArrowRight } from "@/components/ui/icons";
import { Reveal } from "@/components/ui/reveal";
import { ui } from "@/lib/content/ui";

/** Closing link to the next page in the reading order; a photo slides in on hover. */
export function NextPage({ href, label, image, eyebrow = ui.nextPage }: { href: string; label: string; image: string; eyebrow?: string }) {
  return (
    <section className="bg-background text-text">
      <Container>
        <Reveal>
          <Link
            href={href}
            className="group relative isolate grid grid-cols-1 items-center gap-6 overflow-hidden border-t border-border py-12 md:grid-cols-[1fr_auto] md:py-16 lg:py-20"
          >
            <div
              aria-hidden
              className="pointer-events-none absolute inset-y-0 right-0 -z-10 hidden w-[38%] overflow-hidden opacity-0 transition-opacity duration-700 ease-editorial group-hover:opacity-100 lg:block"
            >
              <div className="relative h-full w-full translate-x-6 scale-110 transition-transform duration-700 ease-editorial group-hover:translate-x-0">
                <Image src={image} alt="" fill sizes="38vw" className="object-cover" />
              </div>
              <div className="absolute inset-0 bg-linear-to-r from-background via-background/40 to-transparent" />
            </div>
            <div>
              <span className="eyebrow text-muted">{eyebrow}</span>
              <span className="mt-3 block text-h1 font-semibold transition-transform duration-700 ease-editorial group-hover:translate-x-2">
                {label}
              </span>
            </div>
            <span
              aria-hidden
              className="flex h-14 w-14 items-center justify-center border border-text/25 transition-colors duration-300 ease-editorial group-hover:border-ink group-hover:bg-ink group-hover:text-paper md:h-16 md:w-16"
            >
              <ArrowRight size={20} className="transition-transform duration-500 ease-editorial group-hover:translate-x-0.5" />
            </span>
          </Link>
        </Reveal>
      </Container>
    </section>
  );
}
