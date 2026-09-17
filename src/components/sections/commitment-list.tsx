import type { Commitment } from "@/lib/content/site";

export function CommitmentList({ items }: { items: Commitment[] }) {
  return (
    <ul className="grid grid-cols-1 border-t border-ink/15 sm:grid-cols-2">
      {items.map((item) => (
        <li
          key={item.index}
          className="group flex items-start gap-6 border-b border-ink/15 py-9 sm:py-12 sm:odd:border-r sm:odd:pr-10 sm:even:pl-10"
        >
          <span
            aria-hidden
            className="w-[1.4em] shrink-0 text-[34px] font-light leading-none tracking-[-0.02em] text-steel/35 tabular-nums sm:text-[42px]"
          >
            {item.index}
          </span>
          <div className="flex flex-col gap-2.5">
            <h3 className="text-[19px] font-medium tracking-[-0.005em] text-ink sm:text-[21px]">
              {item.title}
            </h3>
            <p className="max-w-[44ch] text-[15px] leading-relaxed text-ink-soft">{item.description}</p>
          </div>
        </li>
      ))}
    </ul>
  );
}
