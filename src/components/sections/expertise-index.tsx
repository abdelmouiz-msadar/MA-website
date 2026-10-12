"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { ArrowUpRight } from "@/components/ui/icons";
import { Reveal } from "@/components/ui/reveal";
import type { Expertise } from "@/lib/content/expertises";
import { expertiseHref } from "@/lib/content/routes";
import { cn } from "@/lib/utils";

/** Numbered list of expertises; on desktop a sticky photo follows the row being hovered or focused. */
export function ExpertiseIndex({ items }: { items: Expertise[] }) {
  const [active, setActive] = useState(0);
  const total = String(items.length).padStart(2, "0");

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 lg:gap-x-6">
      <div className="hidden lg:col-span-5 lg:block">
        <div className="sticky top-28">
          <div className="relative aspect-[4/5] overflow-hidden bg-stone">
            {items.map((item, i) => (
              <div
                key={item.slug}
                aria-hidden
                className={cn(
                  "absolute inset-0 transition-[opacity,transform] duration-700 ease-editorial",
                  i === active ? "scale-100 opacity-100" : "scale-[1.04] opacity-0",
                )}
              >
                <Image src={item.image} alt="" fill sizes="(min-width: 1680px) 700px, 42vw" className="object-cover" />
              </div>
            ))}
            <div className="pointer-events-none absolute inset-x-0 bottom-0 bg-linear-to-t from-black/70 to-transparent p-6 pt-20 text-white">
              <p aria-hidden className="tabular text-sm font-semibold text-white/80">
                {items[active].index} / {total}
              </p>
              <p aria-hidden className="mt-1 text-xl font-semibold">
                {items[active].name}
              </p>
            </div>
          </div>
        </div>
      </div>

      <ol className="border-b border-border lg:col-span-7 lg:col-start-6">
        {items.map((item, i) => {
          const isActive = i === active;
          return (
            <Reveal as="li" key={item.slug}>
              <Link
                href={expertiseHref(item.slug)}
                onMouseEnter={() => setActive(i)}
                onFocus={() => setActive(i)}
                className="group grid grid-cols-[5.5rem_1fr] items-start gap-x-5 border-t border-border py-6 sm:grid-cols-[7.5rem_1fr] lg:grid-cols-[3rem_1fr_auto] lg:gap-x-6 lg:py-8"
              >
                <div className="relative aspect-square overflow-hidden bg-stone lg:hidden">
                  <Image src={item.image} alt="" fill sizes="120px" className="object-cover" />
                </div>
                <span
                  aria-hidden
                  className={cn(
                    "tabular hidden pt-1.5 text-sm font-semibold transition-colors duration-300 lg:block",
                    isActive ? "text-accent" : "text-muted",
                  )}
                >
                  {item.index}
                </span>
                <span className="min-w-0">
                  <span className="block text-xl font-semibold transition-transform duration-500 ease-editorial sm:text-h3 lg:group-hover:translate-x-1.5">
                    {item.name}
                  </span>
                  <span className="mt-2 block max-w-lg text-sm text-muted sm:text-base">{item.summary}</span>
                </span>
                <span
                  aria-hidden
                  className={cn(
                    "hidden h-11 w-11 items-center justify-center border transition-colors duration-300 ease-editorial lg:flex",
                    isActive ? "border-ink bg-ink text-paper" : "border-border text-text",
                  )}
                >
                  <ArrowUpRight size={16} />
                </span>
              </Link>
            </Reveal>
          );
        })}
      </ol>
    </div>
  );
}
