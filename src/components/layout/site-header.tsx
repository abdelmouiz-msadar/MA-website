"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import { ButtonLink } from "@/components/ui/button";
import { EmailText } from "@/components/ui/email-text";
import { ArrowUpRight } from "@/components/ui/icons";
import { ctas } from "@/lib/content/cta";
import { contactInfo, primaryNav } from "@/lib/content/navigation";
import { routes } from "@/lib/content/routes";
import { ui } from "@/lib/content/ui";
import { cn } from "@/lib/utils";

const MENU_ID = "menu-mobile";
const desktopNav = primaryNav.filter((item) => item.href !== routes.home);
const mobileNav = primaryNav.filter((item) => item.href !== routes.home);

const isActive = (pathname: string, href: string) => pathname === href || pathname.startsWith(`${href}/`);

export function SiteHeader() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const menuButtonRef = useRef<HTMLButtonElement>(null);

  // Stays in place at all times; turns into a frosted white bar once the page moves.
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    const frame = requestAnimationFrame(onScroll);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  const closeMenu = useCallback(() => setMenuOpen(false), []);

  useEffect(() => {
    if (!menuOpen) return;
    const root = document.documentElement;
    const background = Array.from(document.querySelectorAll("main, footer, .skip-link"));
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== "Escape") return;
      setMenuOpen(false);
      menuButtonRef.current?.focus();
    };
    const desktop = window.matchMedia("(min-width: 1024px)");
    const onDesktop = (e: MediaQueryListEvent) => e.matches && setMenuOpen(false);

    root.style.overflow = "hidden";
    background.forEach((el) => el.setAttribute("inert", ""));
    document.addEventListener("keydown", onKey);
    desktop.addEventListener("change", onDesktop);
    return () => {
      root.style.overflow = "";
      background.forEach((el) => el.removeAttribute("inert"));
      document.removeEventListener("keydown", onKey);
      desktop.removeEventListener("change", onDesktop);
    };
  }, [menuOpen]);

  // Every page opens on a dark photographic hero, so the bar starts light-on-dark.
  const solid = scrolled && !menuOpen;

  return (
    <>
      <header
        className={cn(
          "nav-enter fixed inset-x-0 top-0 z-50 transition-[background-color,border-color] duration-500 ease-reveal",
          solid
            ? "border-b border-ink/10 bg-white/85 backdrop-blur-md"
            : cn("focus-light", !menuOpen && "bg-linear-to-b from-black/45 via-black/15 to-transparent"),
        )}
      >
        <div className="mx-auto flex h-24 max-w-container items-center justify-between gap-8 px-gutter">
          <Link href={routes.home} aria-label={ui.homeAria} onClick={closeMenu} className="flex shrink-0 items-center">
            <span className="relative block">
              <Image src="/brand/ma-plus-logo.png" alt="" width={194} height={44} preload className="h-10 w-auto md:h-11" />
              <Image
                src="/brand/ma-plus-logo-white.png"
                alt=""
                width={194}
                height={44}
                preload
                className={cn("absolute inset-0 h-full w-auto transition-opacity duration-500", solid && "opacity-0")}
              />
            </span>
          </Link>

          <nav
            aria-label={ui.mainNav}
            className={cn("hidden lg:flex lg:items-center lg:gap-8 xl:gap-12", solid ? "text-ink" : "text-white")}
          >
            {desktopNav.map((item) => {
              const active = isActive(pathname, item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  aria-current={active ? "page" : undefined}
                  className={cn(
                    "relative py-2 text-sm font-bold tracking-wide uppercase transition-colors after:absolute after:bottom-1 after:left-0 after:h-px after:transition-[width] after:duration-300 hover:after:w-full",
                    solid ? "after:bg-green hover:text-green" : "after:bg-green-bright hover:text-green-bright",
                    active ? cn("after:w-full", solid ? "text-green" : "text-green-bright") : "after:w-0",
                  )}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          <button
            ref={menuButtonRef}
            type="button"
            onClick={() => setMenuOpen((open) => !open)}
            aria-expanded={menuOpen}
            aria-controls={MENU_ID}
            aria-label={menuOpen ? ui.closeMenu : ui.openMenu}
            className={cn("-mr-3 flex min-h-11 items-center gap-2 px-3 lg:hidden", solid ? "text-ink" : "text-white")}
          >
            <span aria-hidden className="flex w-6 flex-col gap-[5px]">
              <span
                className={cn("h-[2px] w-full bg-current transition-transform duration-300", menuOpen && "translate-y-[3.5px] rotate-45")}
              />
              <span
                className={cn("h-[2px] w-full bg-current transition-transform duration-300", menuOpen && "-translate-y-[3.5px] -rotate-45")}
              />
            </span>
            <span className="text-xs font-bold tracking-widest uppercase">{menuOpen ? ui.close : ui.menu}</span>
          </button>
        </div>
      </header>

      <MobileMenu open={menuOpen} pathname={pathname} onClose={closeMenu} />
    </>
  );
}

function MobileMenu({ open, pathname, onClose }: { open: boolean; pathname: string; onClose: () => void }) {
  return (
    <div
      id={MENU_ID}
      inert={!open}
      className={cn(
        "theme-dark fixed inset-0 z-40 flex flex-col overflow-y-auto overscroll-contain bg-background pt-24 pb-8 text-text transition-[clip-path,visibility] duration-600 ease-reveal md:pt-28 lg:hidden",
        open ? "visible [clip-path:inset(0_0_0_0)]" : "invisible [clip-path:inset(0_0_100%_0)]",
      )}
    >
      <nav aria-label={ui.mobileNav} className="px-gutter">
        <ul className="flex flex-col border-t border-text/10">
          {mobileNav.map((item, i) => {
            const active = isActive(pathname, item.href);
            return (
              <li
                key={item.href}
                style={{ transitionDelay: open ? `${100 + i * 45}ms` : "0ms" }}
                className={cn(
                  "border-b border-text/10 transition-[opacity,transform] duration-500 ease-reveal",
                  open ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0",
                )}
              >
                <Link
                  href={item.href}
                  onClick={onClose}
                  aria-current={active ? "page" : undefined}
                  className="group flex min-h-[60px] items-center justify-between gap-4 py-3"
                >
                  <span className={cn("text-h3 font-semibold transition-colors duration-300", active ? "text-text" : "text-text/80 group-hover:text-text")}>
                    {item.label}
                  </span>
                  {active ? (
                    <span aria-hidden className="h-1.5 w-1.5 shrink-0 bg-accent" />
                  ) : (
                    <ArrowUpRight
                      size={16}
                      className="shrink-0 text-text/40 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-text"
                    />
                  )}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      <div
        style={{ transitionDelay: open ? "450ms" : "0ms" }}
        className={cn(
          "mt-auto flex flex-col gap-8 px-gutter pt-12 transition-[opacity,transform] duration-600 ease-reveal",
          open ? "translate-y-0 opacity-100" : "translate-y-3 opacity-0",
        )}
      >
        <div className="flex flex-col gap-1 text-sm">
          <span className="eyebrow mb-2 text-muted">{ui.reachUs}</span>
          <a href={`mailto:${contactInfo.email}`} className="w-fit py-1.5 text-lg text-text transition-opacity hover:opacity-70">
            <EmailText email={contactInfo.email} />
          </a>
          <a href={`tel:${contactInfo.phoneHref}`} className="w-fit py-1.5 text-lg whitespace-nowrap text-text transition-opacity hover:opacity-70">
            {contactInfo.phone}
          </a>
        </div>
        <ButtonLink href={ctas.contactUs.href} variant="inverted" onClick={onClose} className="w-full sm:w-auto sm:self-start">
          {ctas.contactUs.label}
        </ButtonLink>
      </div>
    </div>
  );
}
