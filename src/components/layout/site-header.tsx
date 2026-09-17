"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Container } from "@/components/ui/container";
import { Chevron } from "@/components/ui/chevron";
import { primaryNav, contactInfo } from "@/lib/content/navigation";
import { expertises } from "@/lib/content/expertises";
import { routes, expertiseHref } from "@/lib/content/routes";
import { cn } from "@/lib/utils";

export function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [mobileExpertisesOpen, setMobileExpertisesOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <header className="sticky top-0 z-40 border-b border-ink/10 bg-paper/95 backdrop-blur supports-[backdrop-filter]:bg-paper/80">
        <Container className="flex h-[72px] items-center justify-between">
          <Link
            href="/"
            className="flex items-center gap-2 shrink-0"
            aria-label="Maintenance Assistance Plus — Accueil"
          >
            <Image
              src="/brand/ma-plus-logo-full.svg"
              alt="Maintenance Assistance Plus"
              width={190}
              height={64}
              priority
              className="h-9 w-auto sm:h-10"
            />
          </Link>

          <nav className="hidden lg:flex items-center gap-8" aria-label="Navigation principale">
            {primaryNav.map((item) => {
              const active = item.href === "/" ? pathname === "/" : pathname.startsWith(item.href);

              if (item.href === routes.expertises) {
                return (
                  <div key={item.href} className="group relative">
                    <Link
                      href={item.href}
                      aria-current={active ? "page" : undefined}
                      className={cn(
                        "relative flex items-center gap-1.5 py-2 text-[14px] font-medium text-ink-soft transition-colors hover:text-ink",
                        active && "text-ink",
                      )}
                    >
                      {item.label}
                      <Chevron className="mt-px opacity-60 duration-150 group-hover:rotate-180" />
                      <span
                        aria-hidden
                        className={cn(
                          "absolute -bottom-[1px] left-0 h-[2px] w-full origin-left scale-x-0 bg-steel transition-transform duration-200",
                          active && "scale-x-100",
                        )}
                      />
                    </Link>

                    <div className="invisible absolute left-1/2 top-full -translate-x-1/2 pt-3 opacity-0 transition-all duration-150 group-hover:visible group-hover:opacity-100 group-focus-within:visible group-focus-within:opacity-100">
                      <div className="w-[560px] border border-ink/10 bg-white p-6 shadow-[0_24px_48px_-24px_rgba(20,24,27,0.25)]">
                        <div className="grid grid-cols-2 gap-x-8">
                          {expertises.map((exp) => (
                            <Link
                              key={exp.slug}
                              href={expertiseHref(exp.slug)}
                              className="flex items-baseline gap-3 border-b border-ink/8 py-2.5 text-[14px] text-ink-soft transition-colors hover:text-steel"
                            >
                              <span className="font-mono text-[11px] text-steel/60">{exp.index}</span>
                              {exp.name}
                            </Link>
                          ))}
                        </div>
                        <Link
                          href={routes.expertises}
                          className="mt-5 inline-flex items-center gap-2 text-[12px] font-medium uppercase tracking-[0.06em] text-steel"
                        >
                          Voir toutes les expertises <span aria-hidden>&rarr;</span>
                        </Link>
                      </div>
                    </div>
                  </div>
                );
              }

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  aria-current={active ? "page" : undefined}
                  className={cn(
                    "relative py-2 text-[14px] font-medium text-ink-soft transition-colors hover:text-ink",
                    active && "text-ink",
                  )}
                >
                  {item.label}
                  <span
                    aria-hidden
                    className={cn(
                      "absolute -bottom-[1px] left-0 h-[2px] w-full origin-left scale-x-0 bg-steel transition-transform duration-200",
                      active && "scale-x-100",
                    )}
                  />
                </Link>
              );
            })}
          </nav>

          <div className="hidden lg:flex items-center">
            <a
              href={`tel:${contactInfo.phoneHref}`}
              className="text-[14px] font-medium text-ink hover:text-steel"
            >
              {contactInfo.phone}
            </a>
          </div>

          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label={open ? "Fermer le menu" : "Ouvrir le menu"}
            className="lg:hidden flex flex-col items-center justify-center gap-[5px] w-10 h-10 -mr-2"
          >
            <span
              aria-hidden
              className={cn(
                "block h-[1.5px] w-6 bg-ink transition-transform duration-200",
                open && "translate-y-[6.5px] rotate-45",
              )}
            />
            <span
              aria-hidden
              className={cn("block h-[1.5px] w-6 bg-ink transition-opacity duration-200", open && "opacity-0")}
            />
            <span
              aria-hidden
              className={cn(
                "block h-[1.5px] w-6 bg-ink transition-transform duration-200",
                open && "-translate-y-[6.5px] -rotate-45",
              )}
            />
          </button>
        </Container>
      </header>

      <div
        id="mobile-nav"
        className={cn(
          "lg:hidden fixed inset-x-0 top-[72px] bottom-0 z-30 overflow-y-auto bg-paper transition-transform duration-300 ease-out",
          open ? "translate-x-0" : "translate-x-full",
        )}
      >
        <Container className="flex min-h-full flex-col justify-between py-10">
          <nav className="flex flex-col gap-1" aria-label="Navigation mobile">
            {primaryNav.map((item, i) => {
              if (item.href === routes.expertises) {
                return (
                  <div key={item.href} className="border-b border-ink/10">
                    <div className="flex items-baseline gap-4 py-4">
                      <Link
                        href={item.href}
                        onClick={() => setOpen(false)}
                        className="flex flex-1 items-baseline gap-4 text-2xl font-medium text-ink"
                      >
                        <span className="font-mono text-xs text-steel">{String(i + 1).padStart(2, "0")}</span>
                        {item.label}
                      </Link>
                      <button
                        type="button"
                        onClick={() => setMobileExpertisesOpen((v) => !v)}
                        aria-expanded={mobileExpertisesOpen}
                        aria-controls="mobile-expertises-list"
                        aria-label="Afficher les domaines d'expertise"
                        className="p-2 -m-2"
                      >
                        <Chevron
                          size={12}
                          className={cn("text-ink", mobileExpertisesOpen && "rotate-180")}
                        />
                      </button>
                    </div>
                    <div
                      id="mobile-expertises-list"
                      className={cn(
                        "overflow-hidden transition-[max-height] duration-300",
                        mobileExpertisesOpen ? "max-h-[600px]" : "max-h-0",
                      )}
                    >
                      <ul className="flex flex-col gap-1 pb-4">
                        {expertises.map((exp) => (
                          <li key={exp.slug}>
                            <Link
                              href={expertiseHref(exp.slug)}
                              onClick={() => setOpen(false)}
                              className="flex items-baseline gap-3 py-2 text-[15px] text-ink-soft"
                            >
                              <span className="font-mono text-[11px] text-steel/70">{exp.index}</span>
                              {exp.name}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                );
              }

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="flex items-baseline gap-4 border-b border-ink/10 py-4 text-2xl font-medium text-ink"
                >
                  <span className="font-mono text-xs text-steel">{String(i + 1).padStart(2, "0")}</span>
                  {item.label}
                </Link>
              );
            })}
          </nav>
          <div className="flex flex-col gap-2 pt-8">
            <a href={`tel:${contactInfo.phoneHref}`} className="text-lg font-medium text-ink">
              {contactInfo.phone}
            </a>
            <a href={`mailto:${contactInfo.email}`} className="text-ink-soft">
              {contactInfo.email}
            </a>
          </div>
        </Container>
      </div>
    </>
  );
}
