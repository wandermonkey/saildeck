"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { site, telLink, mailLink } from "@/lib/site";
import { headerNav, type NavNode } from "@/data/navigation";
import { PhoneIcon, MailIcon, ChevronDown, WhatsAppIcon } from "./icons";
import { whatsappLink } from "@/lib/site";

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close everything on navigation, and lock scroll behind the mobile sheet.
  useEffect(() => {
    setMobileOpen(false);
    setOpenMenu(null);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  // Escape closes the open dropdown — expected keyboard behaviour for a menu.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpenMenu(null);
        setMobileOpen(false);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  /* A short close delay stops the menu vanishing while the pointer crosses the
     gap between the trigger and the panel. */
  const open = (label: string) => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setOpenMenu(label);
  };
  const scheduleClose = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    closeTimer.current = setTimeout(() => setOpenMenu(null), 140);
  };

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname === href || pathname.startsWith(href + "/");

  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-crimson focus:px-5 focus:py-2 focus:text-sm focus:font-medium focus:text-white"
      >
        Skip to content
      </a>

      {/* Utility bar — the reference site's top strip, carrying contact detail
          that would otherwise crowd the main nav. */}
      <div className="hidden bg-navy text-white/80 lg:block" style={{ height: "var(--topbar-h)" }}>
        <div className="container-x flex h-full items-center justify-between text-xs">
          <div className="flex items-center gap-6">
            <span className="flex items-center gap-2">
              <PhoneIcon className="h-3.5 w-3.5 text-teal" />
              <a href={telLink} className="transition-colors hover:text-white" data-cta="topbar-call">
                {site.phoneDisplay}
              </a>
            </span>
            <span className="flex items-center gap-2">
              <MailIcon className="h-3.5 w-3.5 text-teal" />
              <a href={mailLink} className="transition-colors hover:text-white" data-cta="topbar-mail">
                {site.email}
              </a>
            </span>
          </div>
          <div className="flex items-center gap-6">
            <span>Mumbai · Navi Mumbai · Goa</span>
            <a
              href={whatsappLink()}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-white transition-opacity hover:opacity-80"
              data-cta="topbar-whatsapp"
            >
              <WhatsAppIcon className="h-3.5 w-3.5" />
              WhatsApp us
            </a>
          </div>
        </div>
      </div>

      <header
        className={`sticky top-0 z-50 bg-white transition-shadow duration-300 ${
          scrolled ? "shadow-[0_1px_20px_rgba(10,42,67,0.10)]" : "border-b border-line"
        }`}
      >
        <nav aria-label="Primary" className="container-x flex items-center justify-between gap-6" style={{ height: "var(--nav-h)" }}>
          <Link href="/" aria-label={`${site.name} home`} className="shrink-0">
            <Image
              src="/images/logo-saildeck.svg"
              alt="Saildeck"
              width={300}
              height={72}
              priority
              className="h-9 w-auto md:h-10"
            />
          </Link>

          <ul className="hidden items-center gap-0.5 xl:flex">
            {headerNav.map((item) => (
              <li
                key={item.href}
                className="relative"
                onMouseEnter={() => item.children && open(item.label)}
                onMouseLeave={scheduleClose}
              >
                <Link
                  href={item.href}
                  aria-current={isActive(item.href) ? "page" : undefined}
                  aria-expanded={item.children ? openMenu === item.label : undefined}
                  onFocus={() => item.children && open(item.label)}
                  className={`flex items-center gap-1 rounded-full px-3.5 py-2 text-[0.9rem] font-medium transition-colors ${
                    isActive(item.href) ? "text-crimson" : "text-navy hover:text-crimson"
                  }`}
                >
                  {item.label}
                  {item.children && (
                    <ChevronDown
                      className={`h-3.5 w-3.5 transition-transform duration-200 ${
                        openMenu === item.label ? "rotate-180" : ""
                      }`}
                    />
                  )}
                </Link>

                {item.children && openMenu === item.label && (
                  <div
                    className="animate-menu absolute left-0 top-full z-50 pt-3"
                    onMouseEnter={() => open(item.label)}
                    onMouseLeave={scheduleClose}
                  >
                    <DropdownPanel item={item} />
                  </div>
                )}
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-3">
            {/* Doubles as the Contact link, which is why Contact is flagged
                hideInHeader — two routes to the same page wastes menu space. */}
            <Link
              href="/contact"
              aria-current={pathname === "/contact" ? "page" : undefined}
              className="hidden rounded-full bg-crimson px-5 py-2.5 text-sm font-medium text-white transition-all hover:-translate-y-0.5 hover:bg-crimson-dark sm:block"
              data-cta="nav-contact"
            >
              Contact us
            </Link>

            <button
              type="button"
              onClick={() => setMobileOpen((v) => !v)}
              aria-expanded={mobileOpen}
              aria-controls="mobile-menu"
              aria-label={mobileOpen ? "Close menu" : "Open menu"}
              className="grid h-10 w-10 place-items-center rounded-full border border-line xl:hidden"
            >
              <span className="relative block h-3.5 w-5">
                <span className={`absolute left-0 block h-0.5 w-5 bg-navy transition-all duration-300 ${mobileOpen ? "top-1.5 rotate-45" : "top-0"}`} />
                <span className={`absolute left-0 top-1.5 block h-0.5 w-5 bg-navy transition-all duration-300 ${mobileOpen ? "opacity-0" : "opacity-100"}`} />
                <span className={`absolute left-0 block h-0.5 w-5 bg-navy transition-all duration-300 ${mobileOpen ? "top-1.5 -rotate-45" : "top-3"}`} />
              </span>
            </button>
          </div>
        </nav>
      </header>

      <MobileMenu open={mobileOpen} />
    </>
  );
}

/** Desktop dropdown. Two-level items get a wide panel with grouped columns. */
function DropdownPanel({ item }: { item: NavNode }) {
  const hasGrandchildren = item.children?.some((c) => c.children?.length);

  if (hasGrandchildren) {
    return (
      <div className="w-[46rem] rounded-2xl border border-line bg-white p-3 shadow-[0_20px_50px_-20px_rgba(10,42,67,0.35)]">
        <div className="grid grid-cols-2 gap-2">
          {item.children!.map((child) => (
            <div key={child.href} className="rounded-xl p-3">
              <Link
                href={child.href}
                className="flex items-center justify-between text-sm font-semibold text-navy transition-colors hover:text-crimson"
              >
                {child.label}
              </Link>
              {child.blurb && <p className="mt-0.5 text-xs text-faint">{child.blurb}</p>}
              {child.children && (
                <ul className="mt-2.5 space-y-0.5 border-l border-line pl-3">
                  {child.children.map((g) => (
                    <li key={g.href}>
                      <Link
                        href={g.href}
                        className="block rounded-md py-1 text-[0.82rem] text-muted transition-colors hover:text-crimson"
                      >
                        {g.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="w-72 rounded-2xl border border-line bg-white p-2 shadow-[0_20px_50px_-20px_rgba(10,42,67,0.35)]">
      <ul>
        {item.children!.map((child) => (
          <li key={child.href}>
            <Link href={child.href} className="group/item block rounded-xl px-3.5 py-2.5 transition-colors hover:bg-surface">
              <span className="block text-sm font-medium text-navy group-hover/item:text-crimson">{child.label}</span>
              {child.blurb && <span className="mt-0.5 block text-xs text-faint">{child.blurb}</span>}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

/** Mobile sheet — the full tree as nested accordions. */
function MobileMenu({ open }: { open: boolean }) {
  return (
    <div
      id="mobile-menu"
      hidden={!open}
      className="fixed inset-x-0 bottom-0 top-[var(--nav-h)] z-40 overflow-y-auto bg-white xl:hidden"
    >
      <div className="container-x py-6">
        <ul className="divide-y divide-line">
          {headerNav.map((item) => (
            <li key={item.href} className="py-1">
              {item.children ? (
                <details className="group">
                  <summary className="flex cursor-pointer list-none items-center justify-between py-3 text-base font-medium text-navy">
                    {item.label}
                    <ChevronDown className="h-4 w-4 text-faint transition-transform group-open:rotate-180" />
                  </summary>
                  <div className="pb-3 pl-3">
                    <Link href={item.href} className="block py-2 text-sm font-medium text-crimson">
                      All {item.label.toLowerCase()}
                    </Link>
                    <ul className="space-y-0.5">
                      {item.children.map((child) => (
                        <li key={child.href}>
                          {child.children ? (
                            <details>
                              <summary className="flex cursor-pointer list-none items-center justify-between py-2 text-sm text-navy">
                                {child.label}
                                <ChevronDown className="h-3.5 w-3.5 text-faint" />
                              </summary>
                              <ul className="border-l border-line pb-1 pl-3">
                                <li>
                                  <Link href={child.href} className="block py-1.5 text-sm text-crimson">
                                    Overview
                                  </Link>
                                </li>
                                {child.children.map((g) => (
                                  <li key={g.href}>
                                    <Link href={g.href} className="block py-1.5 text-sm text-muted">
                                      {g.label}
                                    </Link>
                                  </li>
                                ))}
                              </ul>
                            </details>
                          ) : (
                            <Link href={child.href} className="block py-2 text-sm text-muted">
                              {child.label}
                            </Link>
                          )}
                        </li>
                      ))}
                    </ul>
                  </div>
                </details>
              ) : (
                <Link href={item.href} className="block py-3.5 text-base font-medium text-navy">
                  {item.label}
                </Link>
              )}
            </li>
          ))}
        </ul>

        <div className="mt-7 space-y-3">
          <Link
            href="/contact"
            className="block rounded-full bg-crimson px-6 py-3.5 text-center font-medium text-white"
            data-cta="mobile-contact"
          >
            Contact us
          </Link>
          <a
            href={telLink}
            className="block rounded-full border border-line px-6 py-3.5 text-center font-medium text-navy"
            data-cta="mobile-call"
          >
            Call {site.phoneDisplay}
          </a>
        </div>
      </div>
    </div>
  );
}
