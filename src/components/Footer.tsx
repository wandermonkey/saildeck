import Link from "next/link";
import Image from "next/image";
import { site, telLink, mailLink } from "@/lib/site";
import { navigation } from "@/data/navigation";
import { PhoneIcon, MailIcon, PinIcon } from "./icons";

/**
 * The footer is the site map. Every page sits one click from every other page,
 * which is how link equity spreads across a site this size.
 *
 * Layout note: the columns are built from a flat, hand-ordered list rather than
 * from the nav tree's nesting. Rendering nested children inline made the
 * columns different heights and knocked the headings out of line — a flat list
 * per column keeps every heading on the same baseline and every link on the
 * same grid.
 */

type Column = { title: string; href?: string; links: { label: string; href: string }[] };

const find = (label: string) => navigation.find((n) => n.label === label);

const columns: Column[] = [
  {
    title: "Charter",
    href: "/fleet",
    links: [
      { label: "Our Fleet", href: "/fleet" },
      { label: "Charter Types", href: "/charters" },
      ...(find("Destinations")?.children ?? []).map((c) => ({
        label: `Yachts in ${c.label}`,
        href: c.href,
      })),
    ],
  },
  {
    title: "Speedboats",
    href: "/speedboats",
    links: [
      { label: "All Routes", href: "/speedboats" },
      ...(find("Speedboats")?.children ?? []).map((c) => ({ label: c.label, href: c.href })),
    ],
  },
  {
    title: "Buy & Sell",
    href: "/yachts",
    links: [
      { label: "Brokerage Overview", href: "/yachts" },
      ...(find("Buy & Sell Yachts")?.children ?? []).map((c) => ({ label: c.label, href: c.href })),
    ],
  },
  {
    title: "Management",
    href: "/management",
    links: [
      { label: "All Services", href: "/management" },
      ...(find("Management")?.children ?? []).map((c) => ({ label: c.label, href: c.href })),
    ],
  },
  {
    title: "Company",
    href: "/about",
    links: [
      { label: "About Us", href: "/about" },
      { label: "Team", href: "/about/team" },
      { label: "Marinas", href: "/about/marinas" },
      { label: "Sailing School", href: "/about/sailing-school" },
      { label: "Learn to Sail", href: "/about/sailing-school/learn-to-sail" },
      { label: "RYA Courses", href: "/about/sailing-school/rya-courses" },
      { label: "Blog", href: "/blog" },
      { label: "FAQ", href: "/faq" },
      { label: "Contact", href: "/contact" },
    ],
  },
];

export function Footer() {
  return (
    <footer className="bg-navy text-white/70">
      <div className="container-x py-16">
        {/* Brand block sits above the columns so the five link columns can share
            one even grid instead of one being twice as wide as the others. */}
        <div className="grid gap-10 border-b border-white/10 pb-12 lg:grid-cols-[1.4fr_1fr] lg:items-start lg:gap-16">
          <div>
            <Link href="/" aria-label={`${site.name} home`} className="inline-block">
              <Image
                src="/images/logo-saildeck-white.svg"
                alt="Saildeck"
                width={300}
                height={72}
                className="h-10 w-auto"
              />
            </Link>
            <p className="mt-5 max-w-md text-sm leading-relaxed">
              Yacht charters, speedboat transfers, brokerage and complete marine services
              across Mumbai, Navi Mumbai and Goa. Licensed crew, transparent hourly
              pricing, and one point of contact from enquiry to boarding.
            </p>

            <div className="mt-6 flex flex-wrap gap-2">
              {[
                { href: site.social.instagram, label: "Instagram" },
                { href: site.social.facebook, label: "Facebook" },
                { href: site.social.youtube, label: "YouTube" },
                { href: site.social.linkedin, label: "LinkedIn" },
              ].map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-full border border-white/15 px-3.5 py-1.5 text-xs transition-colors hover:border-teal hover:text-white"
                >
                  {s.label}
                </a>
              ))}
            </div>
          </div>

          <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
            <li className="flex items-start gap-3 text-sm">
              <PhoneIcon className="mt-0.5 h-4 w-4 shrink-0 text-teal" />
              <a href={telLink} className="transition-colors hover:text-white" data-cta="footer-call">
                {site.phoneDisplay}
              </a>
            </li>
            <li className="flex items-start gap-3 text-sm">
              <MailIcon className="mt-0.5 h-4 w-4 shrink-0 text-teal" />
              <a href={mailLink} className="transition-colors hover:text-white" data-cta="footer-mail">
                {site.email}
              </a>
            </li>
            <li className="flex items-start gap-3 text-sm sm:col-span-2 lg:col-span-1">
              <PinIcon className="mt-0.5 h-4 w-4 shrink-0 text-teal" />
              <address className="not-italic leading-relaxed">
                {site.address.street}
                <br />
                {site.address.city} {site.address.postalCode}, {site.address.state}
              </address>
            </li>
          </ul>
        </div>

        {/* Five equal columns, every heading on the same baseline */}
        <nav aria-label="Footer" className="grid grid-cols-2 gap-x-6 gap-y-10 pt-12 sm:grid-cols-3 lg:grid-cols-5">
          {columns.map((col) => (
            <div key={col.title} className="min-w-0">
              <h3 className="text-xs font-semibold uppercase tracking-[0.14em] text-white">
                {col.href ? (
                  <Link href={col.href} className="transition-colors hover:text-teal">
                    {col.title}
                  </Link>
                ) : (
                  col.title
                )}
              </h3>
              <ul className="mt-4 space-y-2.5">
                {col.links.map((l) => (
                  <li key={l.href + l.label}>
                    <Link
                      href={l.href}
                      className="block text-sm leading-snug transition-colors hover:text-teal"
                    >
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </nav>
      </div>

      <div className="border-t border-white/10">
        <div className="container-x flex flex-col items-center justify-between gap-3 py-6 text-xs md:flex-row">
          <p>© {new Date().getFullYear()} {site.legalName}. All rights reserved.</p>
          <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2">
            <Link href="/privacy" className="transition-colors hover:text-teal">Privacy Policy</Link>
            <Link href="/terms" className="transition-colors hover:text-teal">Terms &amp; Conditions</Link>
            <Link href="/faq" className="transition-colors hover:text-teal">FAQ</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
