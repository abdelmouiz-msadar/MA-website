import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type Tone = "light" | "dark";

const eyebrowTones = {
  light: "text-brand",
  dark: "text-brand-light",
  /** Over photography, where the light blue can disappear into bright areas. */
  image: "text-white",
};

export function Eyebrow({
  children,
  tone = "light",
  className,
}: {
  children: ReactNode;
  tone?: keyof typeof eyebrowTones;
  className?: string;
}) {
  return (
    <p className={cn("text-[13px] font-bold uppercase tracking-[0.12em]", eyebrowTones[tone], className)}>
      {children}
    </p>
  );
}

/** Renders `title`, colouring the `highlight` substring in the brand blue (ENGIE-style split headline). */
export function HighlightText({ title, highlight, tone = "light" }: { title: string; highlight?: string; tone?: Tone }) {
  const at = highlight ? title.indexOf(highlight) : -1;
  if (!highlight || at === -1) return <>{title}</>;
  return (
    <>
      {title.slice(0, at)}
      <span className={tone === "light" ? "text-brand" : "text-brand-light"}>{highlight}</span>
      {title.slice(at + highlight.length)}
    </>
  );
}

const sizes = {
  display: "text-[clamp(2.5rem,5.4vw,4.5rem)] leading-[1.05]",
  page: "text-[clamp(2.25rem,4.8vw,4rem)] leading-[1.08]",
  section: "text-[clamp(1.875rem,3.4vw,3rem)] leading-[1.12]",
  sub: "text-[clamp(1.5rem,2.4vw,2.125rem)] leading-[1.2]",
};

export function SectionIntro({
  eyebrow,
  title,
  highlight,
  lead,
  tone = "light",
  align = "left",
  size = "section",
  titleAs: Title = "h2",
  className,
}: {
  eyebrow?: string;
  title: string;
  highlight?: string;
  lead?: ReactNode;
  tone?: Tone;
  align?: "left" | "center";
  size?: keyof typeof sizes;
  titleAs?: "h1" | "h2";
  className?: string;
}) {
  return (
    <div
      className={cn(
        "flex flex-col gap-5",
        align === "center" && "mx-auto items-center text-center",
        className,
      )}
    >
      {eyebrow ? <Eyebrow tone={tone}>{eyebrow}</Eyebrow> : null}
      <Title
        className={cn(
          "font-bold tracking-[-0.01em] text-balance",
          sizes[size],
          tone === "light" ? "text-navy" : "text-white",
          align === "center" ? "max-w-[22ch]" : "max-w-[24ch]",
        )}
      >
        <HighlightText title={title} highlight={highlight} tone={tone} />
      </Title>
      {lead ? (
        <p
          className={cn(
            "max-w-[60ch] text-[17px] leading-relaxed sm:text-[19px]",
            tone === "light" ? "text-ink/80" : "text-white/80",
          )}
        >
          {lead}
        </p>
      ) : null}
    </div>
  );
}
