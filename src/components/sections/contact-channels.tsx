"use client";

import { useEffect, useRef, useState, type ComponentType, type ReactNode, type SVGProps } from "react";
import { CheckIcon, CopyIcon, DirectionsIcon, MailIcon, PhoneIcon, PinIcon } from "@/components/ui/icons";
import { contactBuilder } from "@/lib/content/contact";
import { contactInfo } from "@/lib/content/navigation";
import { contactLabels } from "@/lib/content/pages";

const directionsUrl = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(
  [contactInfo.companyName, ...contactInfo.addressLines].join(", "),
)}`;

// Lets long addresses wrap after the "@" instead of mid-word on narrow screens.
const [emailUser, emailDomain] = contactInfo.email.split("@");

export function ContactChannels() {
  const [copied, setCopied] = useState(false);
  const resetTimer = useRef<number | undefined>(undefined);

  useEffect(() => () => window.clearTimeout(resetTimer.current), []);

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(contactInfo.email);
      setCopied(true);
      window.clearTimeout(resetTimer.current);
      resetTimer.current = window.setTimeout(() => setCopied(false), 2200);
    } catch {
      // Clipboard unavailable (e.g. insecure context): the mailto link remains.
    }
  };

  return (
    <ul className="flex flex-col gap-3">
      <Channel icon={PhoneIcon} label={contactLabels.phone}>
        <a href={`tel:${contactInfo.phoneHref}`} className="text-[19px] font-bold text-white after:absolute after:inset-0 hover:text-brand-light">
          {contactInfo.phone}
        </a>
      </Channel>

      <Channel icon={MailIcon} label={contactLabels.email}>
        <a href={`mailto:${contactInfo.email}`} className="block text-[15px] font-bold break-words text-white hover:text-brand-light sm:text-[17px]">
          {emailUser}@<wbr />
          {emailDomain}
        </a>
        <button
          type="button"
          onClick={copyEmail}
          className="relative z-10 mt-2 inline-flex items-center gap-2 text-[14px] font-bold text-brand-light transition-colors hover:text-white"
        >
          {copied ? <CheckIcon size={16} strokeWidth={2.5} /> : <CopyIcon size={16} />}
          <span aria-live="polite">{copied ? contactBuilder.copied : contactBuilder.copy}</span>
        </button>
      </Channel>

      <Channel icon={PinIcon} label={contactLabels.address}>
        <address className="text-[16px] leading-relaxed text-white not-italic">
          {contactInfo.addressLines.map((line) => (
            <span key={line} className="block">
              {line}
            </span>
          ))}
        </address>
        <a
          href={directionsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-2 inline-flex items-center gap-2 text-[14px] font-bold text-brand-light transition-colors hover:text-white"
        >
          <DirectionsIcon size={16} />
          {contactBuilder.directions}
        </a>
      </Channel>
    </ul>
  );
}

function Channel({
  icon: Icon,
  label,
  children,
}: {
  icon: ComponentType<SVGProps<SVGSVGElement> & { size?: number }>;
  label: string;
  children: ReactNode;
}) {
  return (
    <li className="group relative flex items-start gap-5 border border-white/15 bg-white/[0.06] p-5 transition-[background-color,border-color] duration-300 hover:border-white/35 hover:bg-white/10 sm:p-6">
      <span className="flex h-12 w-12 shrink-0 items-center justify-center bg-brand text-white transition-colors duration-300 group-hover:bg-white group-hover:text-navy">
        <Icon size={22} />
      </span>
      <div className="min-w-0 flex-1">
        <p className="text-[13px] font-bold uppercase tracking-[0.1em] text-white/60">{label}</p>
        <div className="mt-1.5">{children}</div>
      </div>
    </li>
  );
}
