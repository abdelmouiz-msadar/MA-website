import { homeSections } from "@/lib/content/pages";

/** "Support & astreinte 24/7" with a softly pulsing dot — always shown on a dark background. */
export function AvailabilityBadge() {
  const { availabilityLabel, availabilityValue } = homeSections.maintenance;
  return (
    <span className="inline-flex items-center gap-3 border border-white/25 bg-white/10 px-4 py-2.5 text-[13px] font-bold uppercase tracking-[0.1em] text-white">
      <span aria-hidden className="relative flex h-2.5 w-2.5">
        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-brand-light opacity-70" />
        <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-brand-light" />
      </span>
      {availabilityLabel} {availabilityValue}
    </span>
  );
}
