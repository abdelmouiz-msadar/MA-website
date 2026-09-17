import type { ProcessStep } from "@/lib/content/site";

export function ProcessTimeline({ steps }: { steps: ProcessStep[] }) {
  return (
    <ol className="relative flex flex-col">
      <div
        aria-hidden
        className="absolute top-0 bottom-0 left-[7px] hidden w-px bg-ink/15 sm:block"
      />
      {steps.map((step, i) => (
        <li
          key={step.index}
          className="relative grid grid-cols-1 gap-4 border-t border-ink/15 py-10 sm:grid-cols-[120px_1fr] sm:gap-10 lg:py-12"
        >
          <div className="flex items-center gap-4 sm:block">
            <span
              aria-hidden
              className="relative z-10 hidden h-[15px] w-[15px] shrink-0 items-center justify-center rounded-full border-2 border-steel bg-paper sm:flex"
            />
            <span className="font-mono text-[13px] text-steel/70 sm:mt-4 sm:block">{step.index}</span>
          </div>
          <div className="flex flex-col gap-4">
            <h3 className="text-[22px] sm:text-[26px] font-medium tracking-[-0.01em] text-ink">
              {step.title}
            </h3>
            <p className="max-w-[62ch] text-[16px] leading-relaxed text-ink-soft">{step.description}</p>
            <ul className="mt-2 grid grid-cols-1 gap-x-8 gap-y-2 sm:grid-cols-2">
              {step.details.map((d) => (
                <li key={d} className="flex gap-3 text-[14px] leading-snug text-ink-soft">
                  <span aria-hidden className="mt-[9px] h-1 w-1 shrink-0 rounded-full bg-steel" />
                  {d}
                </li>
              ))}
            </ul>
          </div>
          {i === steps.length - 1 ? <div className="absolute bottom-0 left-0 w-full border-b border-ink/15" /> : null}
        </li>
      ))}
    </ol>
  );
}
