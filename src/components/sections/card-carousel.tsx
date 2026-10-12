"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { Container } from "@/components/ui/container";
import { SectionHeader } from "@/components/ui/heading";
import { ArrowLeft, ArrowRight } from "@/components/ui/icons";
import { Reveal } from "@/components/ui/reveal";
import { PhotoCard } from "@/components/sections/photo-card";
import { ui } from "@/lib/content/ui";

export type CarouselCard = { key: string; index: string; title: string; description?: string; image: string; href: string };

const navButton =
  "flex h-12 w-12 items-center justify-center border border-text/25 text-text transition-colors duration-300 ease-editorial hover:border-accent hover:bg-accent hover:text-paper disabled:cursor-default disabled:opacity-35 disabled:hover:border-text/25 disabled:hover:bg-transparent disabled:hover:text-text";

/**
 * Full-bleed, snap-scrolling row of portrait photo cards aligned to the content column,
 * with arrow controls beside the section header and a scroll progress rule.
 */
export function CardCarousel({
  id,
  label,
  items,
  eyebrow,
  title,
  lead,
  action,
}: {
  id: string;
  label: string;
  items: CarouselCard[];
  eyebrow?: string;
  title: ReactNode;
  lead?: ReactNode;
  action?: ReactNode;
}) {
  const trackRef = useRef<HTMLUListElement>(null);
  const [view, setView] = useState({ progress: 0, ratio: 1, atStart: true, atEnd: true });

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    let frame = 0;
    const measure = () => {
      frame = 0;
      const max = track.scrollWidth - track.clientWidth;
      setView({
        progress: max > 0 ? track.scrollLeft / max : 0,
        ratio: track.scrollWidth > 0 ? Math.min(1, track.clientWidth / track.scrollWidth) : 1,
        atStart: track.scrollLeft <= 2,
        atEnd: track.scrollLeft >= max - 2,
      });
    };
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(measure);
    };
    schedule();
    track.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    return () => {
      cancelAnimationFrame(frame);
      track.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
    };
  }, []);

  const step = (direction: 1 | -1) => {
    const track = trackRef.current;
    const card = track?.querySelector("li");
    if (!track || !card) return;
    const gap = parseFloat(getComputedStyle(track).columnGap) || 0;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    track.scrollBy({ left: direction * (card.getBoundingClientRect().width + gap), behavior: reduced ? "auto" : "smooth" });
  };

  const controls = (
    <div className="flex items-center gap-2">
      <button type="button" aria-label={`${label} — ${ui.previous}`} aria-controls={id} disabled={view.atStart} onClick={() => step(-1)} className={navButton}>
        <ArrowLeft size={16} />
      </button>
      <button type="button" aria-label={`${label} — ${ui.next}`} aria-controls={id} disabled={view.atEnd} onClick={() => step(1)} className={navButton}>
        <ArrowRight size={16} />
      </button>
    </div>
  );

  return (
    <>
      <Container>
        <SectionHeader
          eyebrow={eyebrow}
          title={title}
          lead={lead}
          action={
            <>
              <div className="hidden md:block">{controls}</div>
              {action}
            </>
          }
        />
      </Container>

      <ul
        id={id}
        ref={trackRef}
        aria-label={label}
        className="no-scrollbar flex snap-x snap-mandatory gap-4 overflow-x-auto px-(--content-edge) pb-1 scroll-px-(--content-edge) md:gap-5"
      >
        {items.map((item, i) => (
          <Reveal
            as="li"
            key={item.key}
            delay={Math.min(i, 3) * 80}
            className="w-[78vw] max-w-[540px] shrink-0 snap-start sm:w-[54vw] md:w-[40vw] lg:w-[29vw] 2xl:w-[25vw]"
          >
            <PhotoCard
              href={item.href}
              image={item.image}
              index={item.index}
              title={item.title}
              description={item.description}
              sizes="(min-width: 1024px) 30vw, (min-width: 768px) 40vw, 78vw"
            />
          </Reveal>
        ))}
        <li aria-hidden className="w-px shrink-0" />
      </ul>

      <div className="mx-auto mt-8 flex w-full max-w-container items-center gap-6 px-gutter">
        <div aria-hidden className="relative h-px flex-1 bg-text/15">
          <div
            className="absolute inset-y-0 left-0 bg-text transition-transform duration-200 ease-out"
            style={{
              width: `${view.ratio * 100}%`,
              transform: `translateX(${view.progress * ((1 - view.ratio) / view.ratio) * 100}%)`,
            }}
          />
        </div>
        <div className="md:hidden">{controls}</div>
      </div>
    </>
  );
}
