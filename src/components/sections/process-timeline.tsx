"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";
import { ui } from "@/lib/content/ui";
import { cn } from "@/lib/utils";

export type TimelineStep = { index: string; title: string; description?: string };

/**
 * Steps joined by a rule that fills in green as the list scrolls through the viewport —
 * horizontal on desktop, vertical on mobile. Pass the desktop column count via `className`.
 */
export function ProcessTimeline({ steps, className }: { steps: TimelineStep[]; className?: string }) {
  const ref = useRef<HTMLOListElement>(null);
  // 0 → steps.length - 1: how far along the sequence the reader has scrolled.
  const [progress, setProgress] = useState(0);
  const last = steps.length - 1;

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let frame = 0;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const measure = () => {
      frame = 0;
      if (reduced) return setProgress(last);
      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight;
      const start = vh * 0.85;
      const end = vh * 0.4;
      const t = (start - rect.top) / (start - end + rect.height * 0.5);
      setProgress(Math.min(1, Math.max(0, t)) * last);
    };
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(measure);
    };
    schedule();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
    };
  }, [last]);

  return (
    <ol ref={ref} className={cn("grid grid-cols-1 lg:gap-x-8", className)}>
      {steps.map((step, i) => {
        const reached = progress >= i - 0.02;
        const current = reached && progress < i + 0.98;
        const fill = Math.min(1, Math.max(0, progress - i));
        return (
          <li key={step.index} className="relative flex gap-6 pb-10 last:pb-0 lg:block lg:pt-12 lg:pb-0">
            <div
              aria-hidden
              className={cn(
                "relative flex w-3 shrink-0 flex-col items-center pt-2 lg:absolute lg:top-0 lg:left-0 lg:w-auto lg:flex-row lg:pt-0",
                i === last ? "lg:right-0" : "lg:-right-8",
              )}
            >
              <span className="relative h-3 w-3 shrink-0 rounded-full bg-border">
                <span
                  className={cn(
                    "absolute inset-0 rounded-full bg-accent transition-[opacity,transform] duration-500 ease-editorial",
                    reached ? "opacity-100" : "opacity-0",
                    current && "scale-[1.35]",
                  )}
                />
              </span>
              {i < last ? (
                <span className="relative mt-2 w-px flex-1 bg-border lg:mt-0 lg:ml-2 lg:h-px lg:w-auto">
                  <span
                    className="absolute inset-0 origin-top bg-accent [scale:1_var(--p)] lg:origin-left lg:[scale:var(--p)_1]"
                    style={{ "--p": fill } as CSSProperties}
                  />
                </span>
              ) : null}
            </div>
            <div className="min-w-0 flex-1">
              <span aria-hidden className="tabular relative block text-[2.25rem] leading-none font-light text-muted lg:text-[2.75rem]">
                {step.index}
                <span className={cn("absolute inset-0 text-accent transition-opacity duration-500", reached ? "opacity-100" : "opacity-0")}>
                  {step.index}
                </span>
              </span>
              <h3 className="mt-3 text-h3 font-semibold lg:mt-4">
                <span className="sr-only">{ui.step(i + 1)}</span>
                {step.title}
              </h3>
              {step.description ? <p className="mt-3 max-w-xs text-muted">{step.description}</p> : null}
            </div>
          </li>
        );
      })}
    </ol>
  );
}
