"use client";

import { useId, type ReactNode } from "react";
import { cn } from "@/lib/utils";

/** Fieldset title: eyebrow type over a hairline. */
export function FieldsetLegend({ children }: { children: ReactNode }) {
  return <legend className="eyebrow mb-4 w-full border-b border-border pb-3 text-text">{children}</legend>;
}

export type ControlProps = {
  id: string;
  placeholder: string;
  required?: boolean;
  "aria-invalid"?: boolean;
  "aria-describedby"?: string;
  className: string;
};

/** Underlined input whose label floats up on focus or once filled; a green rule draws in on focus. */
export function FloatingField({
  label,
  required,
  error,
  hint,
  className,
  children,
}: {
  label: string;
  required?: boolean;
  error?: string;
  hint?: string;
  className?: string;
  children: (props: ControlProps) => ReactNode;
}) {
  const id = useId();
  const describedBy = [error ? `${id}-error` : null, hint ? `${id}-hint` : null].filter(Boolean).join(" ") || undefined;

  return (
    <div className={cn("flex flex-col gap-2", className)}>
      <div className="relative">
        {children({
          id,
          placeholder: " ",
          required,
          "aria-invalid": error ? true : undefined,
          "aria-describedby": describedBy,
          className:
            "peer block w-full border-b border-border bg-transparent pt-7 pb-2.5 text-md text-text outline-none transition-colors duration-300 placeholder:text-transparent hover:border-text/40 focus:border-text/40 focus-visible:outline-none aria-[invalid=true]:border-accent",
        })}
        <label
          htmlFor={id}
          className="pointer-events-none absolute top-0 left-0 origin-[0_0] translate-y-0 scale-[0.85] text-base text-muted transition-transform duration-300 ease-editorial peer-placeholder-shown:translate-y-7 peer-placeholder-shown:scale-100 peer-focus:translate-y-0 peer-focus:scale-[0.85] peer-focus:text-text"
        >
          {label}
          {required ? (
            <span aria-hidden className="text-accent">
              {" "}
              *
            </span>
          ) : null}
        </label>
        <span
          aria-hidden
          className="pointer-events-none absolute bottom-0 left-0 h-0.5 w-full origin-left scale-x-0 bg-accent transition-transform duration-500 ease-editorial peer-focus:scale-x-100"
        />
      </div>
      {error || hint ? (
        <div className="flex items-start justify-between gap-4 text-sm">
          <span id={error ? `${id}-error` : undefined} className="font-medium text-accent">
            {error}
          </span>
          {hint ? (
            <span id={`${id}-hint`} className="shrink-0 text-xs text-muted">
              {hint}
            </span>
          ) : null}
        </div>
      ) : null}
    </div>
  );
}

/** Toggleable chip backed by a visually hidden checkbox; fills green when selected. */
export function ChoiceChip({
  name,
  value,
  label,
  checked,
  onToggle,
}: {
  name: string;
  value: string;
  label: string;
  checked: boolean;
  onToggle: () => void;
}) {
  return (
    <label className="relative cursor-pointer">
      <input type="checkbox" name={name} value={value} checked={checked} onChange={onToggle} className="peer sr-only" />
      <span
        className={cn(
          "inline-flex min-h-[44px] items-center gap-2.5 border px-4 py-2 text-sm transition-colors duration-300 ease-editorial peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-accent",
          checked ? "border-accent bg-accent text-paper" : "border-border text-text hover:border-text/50",
        )}
      >
        <span
          aria-hidden
          className={cn(
            "flex h-3.5 w-3.5 shrink-0 items-center justify-center border transition-colors duration-300",
            checked ? "border-paper bg-paper" : "border-text/35",
          )}
        >
          {checked ? <span className="h-1.5 w-1.5 bg-accent" /> : null}
        </span>
        {label}
      </span>
    </label>
  );
}
