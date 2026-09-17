"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";
import type { Expertise } from "@/lib/content/expertises";

export function ExpertiseIndex({
  items,
  showCapabilities = false,
}: {
  items: Expertise[];
  /** Show a short capability preview alongside the image — used on the full /expertises directory. */
  showCapabilities?: boolean;
}) {
  const [activeIndex, setActiveIndex] = useState(0);
  const active = items[activeIndex];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 lg:gap-16">
      {/* List */}
      <ul className="border-t border-ink/15">
        {items.map((item, i) => {
          const isActive = i === activeIndex;
          return (
            <li key={item.slug} className="border-b border-ink/15">
              <button
                type="button"
                onClick={() => setActiveIndex(i)}
                aria-expanded={isActive}
                aria-controls={`expertise-panel-${item.slug}`}
                className={cn(
                  "group flex w-full items-center gap-5 py-5 text-left transition-colors",
                  "lg:py-6",
                )}
              >
                <span
                  className={cn(
                    "font-mono text-[13px] tabular-nums transition-colors",
                    isActive ? "text-steel" : "text-ink/35",
                  )}
                >
                  {item.index}
                </span>
                <span
                  className={cn(
                    "flex-1 text-[19px] sm:text-[22px] font-medium tracking-[-0.01em] transition-colors",
                    isActive ? "text-ink" : "text-ink/45 group-hover:text-ink/70",
                  )}
                >
                  {item.name}
                  {item.shortLabel ? (
                    <span className="ml-2 text-[13px] font-mono font-normal text-ink/35">
                      {item.shortLabel}
                    </span>
                  ) : null}
                </span>
                <span
                  aria-hidden
                  className={cn(
                    "hidden sm:inline text-[13px] transition-transform",
                    isActive ? "translate-x-0 text-steel" : "-translate-x-1 text-ink/0",
                  )}
                >
                  &rarr;
                </span>
              </button>

              {/* Mobile inline panel */}
              <div
                id={`expertise-panel-${item.slug}`}
                className={cn("lg:hidden overflow-hidden transition-[max-height] duration-300", isActive ? "max-h-[420px]" : "max-h-0")}
              >
                <div className="pb-6">
                  <div className="relative mb-4 aspect-[4/3] w-full overflow-hidden bg-grey-200">
                    <Image src={item.image} alt="" fill sizes="100vw" className="object-cover" />
                  </div>
                  <p className="text-[15px] leading-relaxed text-ink-soft">{item.summary}</p>
                  {showCapabilities ? (
                    <ul className="mt-4 flex flex-col gap-2">
                      {item.capabilities.slice(0, 3).map((cap) => (
                        <li key={cap} className="flex gap-3 text-[13px] leading-snug text-ink-soft">
                          <span aria-hidden className="mt-[7px] h-1 w-1 shrink-0 rounded-full bg-steel" />
                          {cap.split(" : ")[0]}
                        </li>
                      ))}
                    </ul>
                  ) : null}
                  <Link
                    href={`/expertises/${item.slug}`}
                    className="mt-4 inline-flex items-center gap-2 text-[13px] font-medium uppercase tracking-[0.04em] text-steel"
                  >
                    En savoir plus <span aria-hidden>&rarr;</span>
                  </Link>
                </div>
              </div>
            </li>
          );
        })}
      </ul>

      {/* Desktop visual panel */}
      <div className="hidden lg:block">
        <div className="sticky top-[104px]">
          <div className="relative aspect-[4/5] w-full overflow-hidden bg-grey-200">
            <Image
              key={active.slug}
              src={active.image}
              alt=""
              fill
              sizes="40vw"
              className="object-cover"
              priority={activeIndex === 0}
            />
          </div>
          <div className="mt-6 flex items-start justify-between gap-6">
            <div className="max-w-[42ch]">
              <p className="text-[15px] leading-relaxed text-ink-soft">{active.summary}</p>
              {showCapabilities ? (
                <ul className="mt-4 flex flex-col gap-2">
                  {active.capabilities.slice(0, 4).map((cap) => (
                    <li key={cap} className="flex gap-3 text-[13px] leading-snug text-ink-soft">
                      <span aria-hidden className="mt-[7px] h-1 w-1 shrink-0 rounded-full bg-steel" />
                      {cap.split(" : ")[0]}
                    </li>
                  ))}
                </ul>
              ) : null}
            </div>
            <Link
              href={`/expertises/${active.slug}`}
              className="shrink-0 inline-flex items-center gap-2 text-[13px] font-medium uppercase tracking-[0.04em] text-steel hover:text-steel-dark"
            >
              Découvrir <span aria-hidden>&rarr;</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
