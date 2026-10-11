"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import { Container } from "@/components/ui/container";
import { ArrowRight, ChevronDown, ChevronRight, ClockIcon, CloseIcon, MailIcon, MenuIcon, PhoneIcon, PinIcon } from "@/components/ui/icons";
import { contactInfo, primaryNav } from "@/lib/content/navigation";
import { expertises } from "@/lib/content/expertises";
import { expertiseHref, routes } from "@/lib/content/routes";
import { homeSections, footerContent } from "@/lib/content/pages";
import { finalCta } from "@/lib/content/site";
import { cn } from "@/lib/utils";

export function SiteHeader() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const menuButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const closeMenu = useCallback(() => {
    setMenuOpen(false);
    menuButtonRef.current?.focus();
  }, []);

  const overlay = pathname === "/" && !scrolled;

  return (
    <>
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-40 transition-colors duration-300",
          overlay ? "bg-transparent" : "bg-white/95 shadow-[0_1px_0_rgb(12_47_64/0.08)] backdrop-blur",
        )}
      >
        <div className="brand-line" />

        {/* Utility bar */}
        <div
          className={cn(
            "hidden overflow-hidden transition-[height,opacity] duration-300 lg:block",
            scrolled ? "h-0 opacity-0" : "h-12 opacity-100",
            overlay ? "bg-navy-deep/40 text-white/90" : "border-b border-line text-ink",
          )}
        >
          <Container className="flex h-12 items-center justify-between text-[14px]">
            <div className="flex items-center gap-8">
              <a href={`tel:${contactInfo.phoneHref}`} className="flex items-center gap-2 hover:underline">
                <PhoneIcon size={16} /> {contactInfo.phone}
              </a>
              <a href={`mailto:${contactInfo.email}`} className="flex items-center gap-2 hover:underline">
                <MailIcon size={16} /> {contactInfo.email}
              </a>
            </div>
            <div className="flex items-center gap-8">
              <span className="flex items-center gap-2">
                <ClockIcon size={16} /> {homeSections.maintenance.availabilityLabel}{" "}
                <strong className="font-bold">{homeSections.maintenance.availabilityValue}</strong>
              </span>
              <span className="hidden xl:inline">{footerContent.certifications}</span>
            </div>
          </Container>
        </div>

        {/* Main bar */}
        <Container
          className={cn(
            "flex items-center justify-between gap-6 transition-[height] duration-300",
            scrolled ? "h-16" : "h-[72px] lg:h-20",
          )}
        >
          <Link href="/" aria-label="Maintenance Assistance Plus — Accueil" className="shrink-0">
            <Image
              src={overlay ? "/brand/ma-plus-logo-white.svg" : "/brand/ma-plus-logo-full.svg"}
              alt="Maintenance Assistance Plus"
              width={190}
              height={64}
              preload
              className={cn("w-auto transition-[height] duration-300", scrolled ? "h-10" : "h-11 lg:h-12")}
            />
          </Link>

          <div className="flex items-center gap-6">
            <nav aria-label="Navigation principale" className="hidden items-center gap-7 xl:flex">
              {primaryNav.slice(1).map((item) => {
                const active = pathname === item.href || pathname.startsWith(`${item.href}/`);
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    aria-current={active ? "page" : undefined}
                    className={cn(
                      "relative py-2 text-[15px] font-bold transition-colors",
                      overlay ? "text-white hover:text-white/75" : "text-navy hover:text-brand",
                      active && !overlay && "text-brand",
                    )}
                  >
                    {item.label}
                    <span
                      aria-hidden
                      className={cn(
                        "absolute inset-x-0 -bottom-0.5 h-0.5 origin-left scale-x-0 transition-transform duration-200",
                        overlay ? "bg-white" : "bg-brand",
                        active && "scale-x-100",
                      )}
                    />
                  </Link>
                );
              })}
            </nav>

            <button
              ref={menuButtonRef}
              type="button"
              onClick={() => setMenuOpen(true)}
              aria-expanded={menuOpen}
              aria-controls="site-menu"
              className={cn(
                "flex h-14 w-16 flex-col items-center justify-center gap-0.5 transition-colors",
                overlay ? "bg-navy-deep/55 text-white hover:bg-navy-deep/75" : "bg-brand text-white hover:bg-brand-dark",
              )}
            >
              <MenuIcon size={22} />
              <span className="text-[11px] font-bold uppercase tracking-[0.08em]">Menu</span>
            </button>
          </div>
        </Container>
      </header>

      <MenuOverlay open={menuOpen} onClose={closeMenu} pathname={pathname} />
    </>
  );
}

function MenuOverlay({ open, onClose, pathname }: { open: boolean; onClose: () => void; pathname: string }) {
  const panelRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const [expertisesOpen, setExpertisesOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key !== "Tab" || !panelRef.current) return;
      const focusables = panelRef.current.querySelectorAll<HTMLElement>("a[href], button:not([disabled])");
      const first = focusables[0];
      const last = focusables[focusables.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      document.removeEventListener("keydown", onKey);
    };
  }, [open, onClose]);

  return (
    <div
      id="site-menu"
      ref={panelRef}
      role="dialog"
      aria-modal="true"
      aria-label="Menu"
      inert={!open}
      className={cn(
        "fixed inset-0 z-50 overflow-y-auto bg-white transition-[opacity,visibility] duration-300",
        open ? "visible opacity-100" : "invisible opacity-0",
      )}
    >
      <div className="brand-line" />
      <Container className="flex h-[72px] items-center justify-between lg:h-24">
        <Link href="/" onClick={onClose} aria-label="Maintenance Assistance Plus — Accueil">
          <Image src="/brand/ma-plus-logo-full.svg" alt="Maintenance Assistance Plus" width={190} height={64} className="h-11 w-auto lg:h-12" />
        </Link>
        <button
          ref={closeRef}
          type="button"
          onClick={onClose}
          aria-label="Fermer le menu"
          className="flex h-12 w-12 items-center justify-center border border-line text-navy transition-colors hover:border-brand hover:text-brand"
        >
          <CloseIcon size={22} />
        </button>
      </Container>

      <Container className="grid grid-cols-1 gap-12 pt-6 pb-16 lg:grid-cols-[1fr_1fr_1.1fr] lg:gap-0 lg:pt-10">
        {/* Primary pages */}
        <div className="lg:border-r lg:border-line lg:pr-12">
          <p className="mb-4 text-[14px] text-muted">Découvrez</p>
          <ul className="flex flex-col">
            {primaryNav.map((item) => {
              const active = item.href === "/" ? pathname === "/" : pathname.startsWith(item.href);
              const isExpertises = item.href === routes.expertises;
              return (
                <li key={item.href} className="border-b border-line/70 lg:border-none">
                  <div className="flex items-center justify-between">
                    <Link
                      href={item.href}
                      onClick={onClose}
                      aria-current={active ? "page" : undefined}
                      className={cn(
                        "group flex flex-1 items-center justify-between gap-6 py-3.5 text-[24px] font-bold transition-colors sm:text-[28px] lg:py-2.5",
                        active ? "text-brand" : "text-navy hover:text-brand",
                      )}
                    >
                      {item.label}
                      <ArrowRight size={22} className="hidden shrink-0 transition-transform group-hover:translate-x-1 lg:block" />
                    </Link>
                    {isExpertises ? (
                      <button
                        type="button"
                        onClick={() => setExpertisesOpen((v) => !v)}
                        aria-expanded={expertisesOpen}
                        aria-controls="menu-expertises"
                        aria-label="Afficher les domaines d'expertise"
                        className="flex h-11 w-11 items-center justify-center text-navy lg:hidden"
                      >
                        <ChevronDown size={22} className={cn("transition-transform", expertisesOpen && "rotate-180")} />
                      </button>
                    ) : null}
                  </div>
                  {isExpertises ? (
                    <div
                      id="menu-expertises"
                      className={cn("grid transition-[grid-template-rows] duration-300 lg:hidden", expertisesOpen ? "grid-rows-[1fr] pb-3" : "grid-rows-[0fr]")}
                    >
                      <ul className="min-h-0 overflow-hidden" inert={!expertisesOpen}>
                        {expertises.map((exp) => (
                          <li key={exp.slug}>
                            <Link href={expertiseHref(exp.slug)} onClick={onClose} className="flex items-baseline gap-3 py-2 text-[16px] text-ink">
                              <span className="text-[13px] font-bold text-brand">{exp.index}</span>
                              {exp.name}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ) : null}
                </li>
              );
            })}
          </ul>
        </div>

        {/* Expertise domains (desktop) */}
        <div className="hidden lg:block lg:border-r lg:border-line lg:px-12">
          <p className="mb-4 text-[14px] text-muted">Nos expertises</p>
          <ul className="flex flex-col">
            {expertises.map((exp) => (
              <li key={exp.slug}>
                <Link
                  href={expertiseHref(exp.slug)}
                  onClick={onClose}
                  className={cn(
                    "group flex items-center justify-between gap-4 py-2.5 text-[17px] transition-colors",
                    pathname === expertiseHref(exp.slug) ? "text-brand" : "text-ink hover:text-brand",
                  )}
                >
                  <span className="flex items-baseline gap-3">
                    <span className="text-[13px] font-bold text-brand">{exp.index}</span>
                    {exp.name}
                  </span>
                  <ChevronRight size={16} className="shrink-0 text-muted transition-transform group-hover:translate-x-0.5 group-hover:text-brand" />
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact */}
        <div className="flex flex-col gap-8 lg:pl-12">
          <div>
            <p className="mb-4 text-[14px] text-muted">{finalCta.cta.label}</p>
            <ul className="flex flex-col gap-3 text-[16px] text-ink">
              <li>
                <a href={`tel:${contactInfo.phoneHref}`} className="flex items-center gap-3 hover:text-brand">
                  <PhoneIcon size={18} className="text-brand" /> {contactInfo.phone}
                </a>
              </li>
              <li>
                <a href={`mailto:${contactInfo.email}`} className="flex items-center gap-3 break-words hover:text-brand">
                  <MailIcon size={18} className="shrink-0 text-brand" /> {contactInfo.email}
                </a>
              </li>
              <li className="flex items-start gap-3">
                <PinIcon size={18} className="mt-0.5 shrink-0 text-brand" />
                <span>{contactInfo.addressLines.join(", ")}</span>
              </li>
            </ul>
          </div>
          <Link href={routes.contact} onClick={onClose} className="group relative block aspect-[16/10] overflow-hidden">
            <Image
              src="/images/team-cta-inspection.jpg"
              alt=""
              fill
              sizes="(min-width: 1024px) 30vw, 100vw"
              className="object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="card-overlay absolute inset-0" />
            <span className="absolute inset-x-0 bottom-0 flex items-center justify-between gap-4 p-5 text-[20px] font-bold text-white">
              {finalCta.title}
              <ArrowRight size={22} className="shrink-0 transition-transform group-hover:translate-x-1" />
            </span>
          </Link>
        </div>
      </Container>
    </div>
  );
}
