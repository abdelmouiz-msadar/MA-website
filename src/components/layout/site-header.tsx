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
const desktopNav = primaryNav.filter((item) => item.href !== routes.home && item.href !== routes.contact);
const mobileNav = primaryNav.filter((item) => item.href !== routes.home);

const isActive = (pathname: string, href: string) => pathname === href || pathname.startsWith(`${href}/`);

export function SiteHeader() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const menuButtonRef = useRef<HTMLButtonElement>(null);

  // Solid once the page moves; slides away while scrolling down, returns on the way up.
  useEffect(() => {
    let last = window.scrollY;
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 48);
      const delta = y - last;
      if (Math.abs(delta) < 8) return;
      setHidden(delta > 0 && y > 320);
      last = y;
    };
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

  // Every page opens on a dark photographic hero, so the bar starts in its light-on-dark state.
  const onDark = !scrolled || menuOpen;
  const solid = scrolled && !menuOpen;

  return (
    <>
      <header
        onFocusCapture={() => setHidden(false)}
        className={cn(
          "fixed inset-x-0 top-0 z-50 border-b transition-[transform,background-color,border-color] duration-500 ease-editorial",
          solid ? "border-border bg-background/90 backdrop-blur-md" : "border-transparent bg-transparent",
          hidden && !menuOpen && "-translate-y-full",
          onDark && "focus-light",
        )}
      >
        <div className="px-gutter">
          <div className="mx-auto flex h-20 max-w-container items-center justify-between gap-8 md:h-24">
            <Link href={routes.home} aria-label={ui.homeAria} onClick={closeMenu} className="-my-2 flex shrink-0 items-center py-2">
              <span className="relative block">
                <Image src="/brand/ma-plus-logo.svg" alt="" width={210} height={46} preload className="h-[38px] w-auto md:h-[46px]" />
                <Image
                  src="/brand/ma-plus-logo-white.svg"
                  alt=""
                  width={210}
                  height={46}
                  preload
                  className={cn("absolute inset-0 h-full w-auto transition-opacity duration-500", !onDark && "opacity-0")}
                />
              </span>
            </Link>

            <nav aria-label={ui.mainNav} className="hidden items-center gap-10 lg:flex">
              <ul className="flex items-center gap-8 xl:gap-9">
                {desktopNav.map((item) => {
                  const active = isActive(pathname, item.href);
                  return (
                    <li key={item.href}>
                      <Link
                        href={item.href}
                        aria-current={active ? "page" : undefined}
                        className={cn(
                          "group relative block py-2 text-sm font-medium transition-colors duration-300",
                          onDark ? "text-white/85 hover:text-white" : "text-muted hover:text-text",
                          active && (onDark ? "text-white!" : "text-text!"),
                        )}
                      >
                        {item.label}
                        <span
                          aria-hidden
                          className={cn(
                            "absolute bottom-0.5 left-0 h-px w-full origin-left transition-transform duration-500 ease-editorial",
                            active ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100",
                            onDark ? "bg-white" : "bg-accent",
                          )}
                        />
                      </Link>
                    </li>
                  );
                })}
              </ul>
              <Link
                href={routes.contact}
                aria-current={pathname === routes.contact ? "page" : undefined}
                className={cn(
                  "group relative isolate inline-flex min-h-[44px] items-center gap-2 overflow-hidden px-5 text-sm font-semibold transition-colors duration-300 ease-editorial",
                  onDark ? "bg-paper text-ink hover:text-paper" : "bg-ink text-paper",
                )}
              >
                <span
                  aria-hidden
                  className="absolute inset-0 -z-10 origin-left scale-x-0 bg-green transition-transform duration-500 ease-editorial group-hover:scale-x-100"
                />
                {primaryNav.find((item) => item.href === routes.contact)?.label}
                <ArrowUpRight
                  size={14}
                  className="transition-transform duration-500 ease-editorial group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                />
              </Link>
            </nav>

            <button
              ref={menuButtonRef}
              type="button"
              onClick={() => setMenuOpen((open) => !open)}
              aria-expanded={menuOpen}
              aria-controls={MENU_ID}
              aria-label={menuOpen ? ui.closeMenu : ui.openMenu}
              className={cn(
                "-mr-2 flex h-11 items-center gap-3 px-2 text-sm font-semibold transition-colors duration-300 lg:hidden",
                onDark ? "text-white" : "text-text",
              )}
            >
              <span>{menuOpen ? ui.close : ui.menu}</span>
              <span aria-hidden className="relative flex h-3 w-6 flex-col justify-between">
                <span
                  className={cn(
                    "h-px w-full origin-center bg-current transition-transform duration-300 ease-in-out",
                    menuOpen && "translate-y-[5.5px] rotate-45",
                  )}
                />
                <span
                  className={cn(
                    "ml-auto h-px origin-center bg-current transition-[transform,width] duration-300 ease-in-out",
                    menuOpen ? "w-full -translate-y-[5.5px] -rotate-45" : "w-2/3",
                  )}
                />
              </span>
            </button>
          </div>
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
