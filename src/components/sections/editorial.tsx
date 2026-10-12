import Link from "next/link";
import type { ReactNode } from "react";
import { ArrowUpRight } from "@/components/ui/icons";
import { ParallaxImage } from "@/components/ui/parallax-image";
import { Reveal } from "@/components/ui/reveal";
import { cn } from "@/lib/utils";

const pad = (n: number) => String(n).padStart(2, "0");

/** Large light figures over a hairline that fills green on hover, each linking deeper into the site. */
export function FigureLinks({ items, className }: { items: { value: string; label: string; href: string }[]; className?: string }) {
  return (
    <ul className={cn("grid grid-cols-2 gap-x-6 lg:grid-cols-4", className)}>
      {items.map((item, i) => {
        const numeric = /^\d+$/.test(item.value);
        return (
          <Reveal as="li" key={item.label} delay={i * 80}>
            <Link href={item.href} className="group relative flex h-full flex-col gap-3 pt-6 pb-6 lg:pt-8">
              <span aria-hidden className="absolute inset-x-0 top-0 h-px bg-border" />
              <span
                aria-hidden
                className="absolute inset-x-0 top-0 h-px origin-left scale-x-0 bg-accent transition-transform duration-700 ease-editorial group-hover:scale-x-100 group-focus-visible:scale-x-100"
              />
              <span className="text-figure font-light text-text">
                {numeric ? (
                  <>
                    <span aria-hidden className="tabular">
                      {pad(Number(item.value))}
                    </span>
                    <span className="sr-only">{item.value}</span>
                  </>
                ) : (
                  <span className="tabular">{item.value}</span>
                )}
              </span>
              <span className="flex items-start justify-between gap-3 text-sm font-medium text-muted transition-colors duration-300 group-hover:text-text">
                {item.label}
                <ArrowUpRight
                  size={16}
                  className="mt-0.5 shrink-0 opacity-0 transition-all duration-300 ease-editorial group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:opacity-100 group-focus-visible:opacity-100"
                />
              </span>
            </Link>
          </Reveal>
        );
      })}
    </ul>
  );
}

/** Numbered columns under a hairline: small green index, h3, muted body. */
export function NumberedColumns({
  items,
  className,
}: {
  items: { title: string; body: ReactNode; index?: string }[];
  className?: string;
}) {
  return (
    <ol className={cn("grid grid-cols-1 gap-x-6 gap-y-10", className)}>
      {items.map((item, i) => (
        <Reveal as="li" key={item.title} delay={i * 90} className="border-t border-text/15 pt-6 lg:pt-8">
          <span aria-hidden className="tabular text-sm font-semibold text-accent">
            {item.index ?? pad(i + 1)}
          </span>
          <h3 className="mt-3 text-h3 font-semibold">{item.title}</h3>
          {item.body ? <div className="mt-3 max-w-sm text-muted">{item.body}</div> : null}
        </Reveal>
      ))}
    </ol>
  );
}

/** Compact numbered list in two columns: index + semibold label per row. */
export function NumberedList({ items, className }: { items: string[]; className?: string }) {
  return (
    <ul className={cn("grid grid-cols-1 gap-x-6 min-[400px]:grid-cols-2", className)}>
      {items.map((item, i) => (
        <Reveal as="li" key={item} delay={(i % 2) * 60} className="flex items-baseline gap-4 border-t border-text/15 py-5 sm:py-6">
          <span aria-hidden className="tabular w-6 shrink-0 text-xs font-semibold text-accent">
            {pad(i + 1)}
          </span>
          <span className="text-lg font-semibold sm:text-xl">{item}</span>
        </Reveal>
      ))}
    </ul>
  );
}

/** Two-up grid of short labels separated by hairlines (e.g. client types, scopes). */
export function LabelGrid({ label, items }: { label: string; items: string[] }) {
  return (
    <div>
      <h3 className="eyebrow text-muted">{label}</h3>
      <ul className="mt-4 grid grid-cols-2 border-t border-border">
        {items.map((item, i) => (
          <li key={item} className={cn("border-b border-border py-4 text-base font-semibold", i % 2 ? "border-l pl-5" : "pr-5")}>
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}

/** Rows of numbered title + body, separated by hairlines. */
export function DetailList({ items, className }: { items: { title: string; body: ReactNode }[]; className?: string }) {
  return (
    <ul className={cn("grid grid-cols-1", className)}>
      {items.map((item, i) => (
        <Reveal as="li" key={item.title} delay={i * 70} className="flex items-baseline gap-5 border-t border-text/15 py-6">
          <span aria-hidden className="tabular w-6 shrink-0 text-xs font-semibold text-accent">
            {pad(i + 1)}
          </span>
          <div>
            <h3 className="text-xl font-semibold">{item.title}</h3>
            <div className="mt-2 max-w-xl text-muted">{item.body}</div>
          </div>
        </Reveal>
      ))}
    </ul>
  );
}

/**
 * Alternating feature: 7-column parallax photo beside a 4-column text block,
 * opened either by a large green index ("01 / 08") or by an eyebrow.
 */
export function SplitFeature({
  id,
  index,
  total,
  eyebrow,
  title,
  image,
  imageAlt = "",
  imageClassName,
  reversed = false,
  titleAs: Title = "h2",
  children,
}: {
  id?: string;
  index?: number;
  total?: number;
  eyebrow?: string;
  title: string;
  image: string;
  imageAlt?: string;
  imageClassName?: string;
  reversed?: boolean;
  titleAs?: "h2" | "h3";
  children: ReactNode;
}) {
  return (
    <article id={id} className="grid scroll-mt-28 grid-cols-1 items-center gap-y-8 lg:grid-cols-12 lg:gap-x-6">
      <div className={cn("lg:col-span-7", reversed && "lg:order-2 lg:col-start-6")}>
        <ParallaxImage
          src={image}
          alt={imageAlt}
          sizes="(min-width: 1024px) 58vw, 100vw"
          className="aspect-[4/3]"
          imageClassName={imageClassName}
        />
      </div>
      <div className={cn("lg:col-span-4", reversed ? "lg:col-start-1 lg:row-start-1" : "lg:col-start-9")}>
        {index !== undefined ? (
          <Reveal as="p" className="flex items-baseline gap-4">
            <span aria-hidden className="tabular text-figure font-light text-accent">
              {pad(index)}
            </span>
            {total !== undefined ? (
              <span aria-hidden className="tabular text-sm font-medium text-muted">
                / {pad(total)}
              </span>
            ) : null}
          </Reveal>
        ) : null}
        {eyebrow ? (
          <Reveal as="p" className="eyebrow text-muted">
            {eyebrow}
          </Reveal>
        ) : null}
        <Reveal as={Title} className={cn("text-h2 font-semibold text-balance", index !== undefined ? "mt-6" : "mt-5")}>
          {title}
        </Reveal>
        <Reveal className="mt-5">{children}</Reveal>
      </div>
    </article>
  );
}
