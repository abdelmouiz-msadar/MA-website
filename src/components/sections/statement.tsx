"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { cn } from "@/lib/utils";

/** Large statement whose words fill in from pale to full colour as it scrolls through the viewport. */
export function Statement({
  text,
  tone = "light",
  size = "lg",
  as: Tag = "p",
  className,
  children,
}: {
  text: string;
  tone?: "light" | "dark";
  size?: "lg" | "md";
  as?: "p" | "h2" | "blockquote";
  className?: string;
  children?: ReactNode;
}) {
  const ref = useRef<HTMLElement>(null);
  const words = text.split(" ");
  const [filled, setFilled] = useState(words.length);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let frame = 0;
    const update = () => {
      frame = 0;
      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight;
      const start = vh * 0.85;
      const end = vh * 0.35;
      const progress = Math.min(1, Math.max(0, (start - rect.top) / (start - end + rect.height * 0.5)));
      setFilled(Math.round(progress * words.length));
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
  }, [words.length]);

  return (
    <Tag
      ref={ref as never}
      className={cn(
        "font-bold leading-[1.18] tracking-[-0.01em] text-balance",
        size === "lg" ? "text-[clamp(1.875rem,3.8vw,3.5rem)]" : "text-[clamp(1.625rem,3vw,2.75rem)]",
        className,
      )}
    >
      {words.map((word, i) => (
        <span
          key={`${word}-${i}`}
          className={cn(
            "transition-colors duration-300",
            i < filled
              ? tone === "light"
                ? "text-navy"
                : "text-white"
              : tone === "light"
                ? "text-navy/20"
                : "text-white/25",
          )}
        >
          {word}
          {i < words.length - 1 ? " " : ""}
        </span>
      ))}
      {children}
    </Tag>
  );
}
