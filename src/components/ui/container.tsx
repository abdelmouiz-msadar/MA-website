import type { ElementType, ReactNode } from "react";
import { cn } from "@/lib/utils";

export function Container({
  className,
  children,
  as: Tag = "div",
}: {
  className?: string;
  children: ReactNode;
  as?: ElementType;
}) {
  return (
    <Tag className={cn("mx-auto w-full max-w-[var(--container-max)] px-[var(--gutter)]", className)}>
      {children}
    </Tag>
  );
}
