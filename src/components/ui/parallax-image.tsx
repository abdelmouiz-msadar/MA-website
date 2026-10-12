"use client";

import Image from "next/image";
import { useEffect, useRef, type CSSProperties, type ReactNode } from "react";
import { cn } from "@/lib/utils";

// Driven by --open (0 → 1, entering) and --drift (-1 → 1, crossing) set on the frame while scrolling.
const styles = {
  frame: { clipPath: "inset(calc((1 - var(--open, 0)) * 8%) 0 calc((1 - var(--open, 0)) * 8%) 0)" },
  zoom: { transform: "scale(calc(1.15 - var(--open, 0) * 0.15))" },
  drift: { transform: "translateY(calc(var(--drift, 0) * 5%))" },
} satisfies Record<string, CSSProperties>;

/**
 * Editorial image: opens from a clipped band as it scrolls into view, settles from a slight zoom,
 * and drifts vertically while it crosses the viewport.
 */
export function ParallaxImage({
  src,
  alt,
  sizes,
  className,
  imageClassName,
  children,
}: {
  src: string;
  alt: string;
  sizes: string;
  /** Aspect-ratio classes for the frame. */
  className?: string;
  imageClassName?: string;
  /** Overlays rendered above the image, inside the frame. */
  children?: ReactNode;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      el.style.setProperty("--open", "1");
      return;
    }

    let frame = 0;
    const update = () => {
      frame = 0;
      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight;
      // 0 when the top edge reaches the bottom of the viewport, 1 once it has risen 60% of the way up.
      const open = Math.min(1, Math.max(0, (vh - rect.top) / (vh * 0.6)));
      // -1 → 1 across the whole pass through the viewport.
      const drift = Math.min(1, Math.max(-1, ((vh - rect.top) / (vh + rect.height)) * 2 - 1));
      el.style.setProperty("--open", open.toFixed(3));
      el.style.setProperty("--drift", drift.toFixed(3));
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <div ref={ref} className="relative overflow-hidden" style={styles.frame}>
      <div className="h-full w-full" style={styles.zoom}>
        <div className={cn("relative overflow-hidden bg-stone", className)}>
          <div className="absolute inset-x-0 -top-[6%] -bottom-[6%]" style={styles.drift}>
            <Image src={src} alt={alt} fill sizes={sizes} className={cn("object-cover", imageClassName)} />
          </div>
          {children}
        </div>
      </div>
    </div>
  );
}
