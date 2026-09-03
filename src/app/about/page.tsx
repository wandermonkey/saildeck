import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

import { PageHero } from "@/components/PageHero";
import { CtaBand } from "@/components/CtaBand";
import { JsonLd } from "@/components/JsonLd";
import { Reveal } from "@/components/Reveal";
import { SectionTitle, Stat } from "@/components/ui";
import { ArrowIcon } from "@/components/icons";

import { managementServices, sailingSchoolPages } from "@/data/pages";
import { buildMetadata, breadcrumbSchema } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "About Saildeck — Marine Operators in Mumbai, Navi Mumbai & Goa",
  description:
    "Saildeck runs yacht charters, speedboat transfers, brokerage, yacht management, refit and a sailing school across India's west coast, with licensed crew and transparent pricing.",
  path: "/about",
});

const breadcrumb = [
  { name: "Home", path: "/" },
  { name: "About Us", path: "/about" },
];

const sections = [
  { href: "/management", title: "Management", blurb: "Owner services — building, management, refit, storage and marina consultancy." },
  { href: "/about/team", title: "Team", blurb: "The captains, crew, engineers and instructors behind every departure." },
  { href: "/about/marinas", title: "Marinas", blurb: "Where we berth and board across Mumbai, Navi Mumbai, Goa and Alibaug." },
  { href: "/about/sailing-school", title: "Sailing School", blurb: "Learn to sail, RYA certification, gear and your first boat." },
];

export default function AboutPage() {
  return (
    <>
      <JsonLd data={breadcrumbSchema(breadcrumb)} />

      <PageHero
        breadcrumb={breadcrumb}
        eyebrow="About us"
        title="We run boats"
        accent="for a living"
        sub="Not a marketplace, not a lead aggregator. An operating marine business with its own boats, its own crew and its own yard — which is why our advice tends to be blunter than a broker's."
        image="https://images.unsplash.com/photo-1708246116914-a91c0558a1a1?auto=format&fit=crop&w=2000&q=80"
        imageAlt="Guests gathered around a table on the deck of a chartered yacht"
        compact
      />

      <section className="py-14 md:py-20">
        <div className="container-x grid gap-14 lg:grid-cols-2 lg:items-center lg:gap-20">
          <Reveal>
            <SectionTitle eyebrow="Our approach" title="Straight answers," accent="including the no" />
            <div className="mt-7 space-y-5 leading-relaxed text-muted">
              <p>
                Most boat bookings in India go wrong in the same three ways: the price
                changes after you commit, the boat you saw is not the boat that turns up,
                and nobody mentions the sea is too rough until you are standing on the
                jetty with fifteen guests.
              </p>
              <p>
                We built Saildeck around fixing those. The rate you are quoted is the rate
                we charge. The boat in the photographs is the boat you board. And when
                conditions are unsafe we call it early and move your date at no cost —
                even when it costs us the booking.
              </p>
              <p>
                The same principle runs through the rest of the business. We will tell an
                owner their boat is worth less than they hoped, tell a buyer to go a size
                down, and tell a developer their marina site has a permissions problem
                before they have spent anything on design.
              </p>
            </div>

            <div className="mt-10 grid grid-cols-3 gap-6">
              <Stat value="9" label="Boats in the fleet" />
              <Stat value="3" label="Home ports" />
              <Stat value="7" label="Owner services" />
            </div>
          </Reveal>

          <Reveal delay={120}>
            <div className="relative aspect-[4/5] overflow-hidden rounded-2xl">
              <Image
                src="https://images.unsplash.com/photo-1781872324499-e51350ed640e?auto=format&fit=crop&w=1400&q=80"
                alt="A white motor yacht moored in a quiet bay"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
            </div>
          </Reveal>
        </div>
      </section>

      {/* Non-negotiables */}
      <section className="border-y border-line bg-surface py-14 md:py-20">
        <div className="container-x">
          <Reveal>
            <SectionTitle align="center" eyebrow="Non-negotiables" title="Four things we will not" accent="cut corners on" />
          </Reveal>

          <div className="mt-11 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { t: "Safety first, always", d: "Certified captains, coast-guard-compliant gear and a life jacket for every guest including children." },
              { t: "Capacity is a hard limit", d: "We will not squeeze two extra people onto a licensed-for-twelve boat. Ever, for any price." },
              { t: "Honest weather calls", d: "If the captain says the sea is not safe, the charter moves. That decision is never commercial." },
              { t: "One quote, no surprises", d: "Everything is priced before you pay a deposit. There is no second bill waiting at the jetty." },
            ].map((v, i) => (
              <Reveal key={v.t} delay={i * 70}>
                <div className="card h-full p-7">
                  <span className="font-display text-3xl font-semibold text-crimson/25">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className="mt-3 font-display text-lg">{v.t}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted">{v.d}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Section index */}
      <section className="py-14 md:py-20">
        <div className="container-x">
          <Reveal>
            <SectionTitle eyebrow="Explore" title="More about" accent="Saildeck" />
          </Reveal>

          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {sections.map((s, i) => (
              <Reveal key={s.href} delay={(i % 4) * 60}>
                <Link href={s.href} className="card card-hover group flex h-full flex-col p-6" data-cta="about-section">
                  <h3 className="font-display text-lg transition-colors group-hover:text-crimson">{s.title}</h3>
                  <p className="mt-2 flex-1 text-sm leading-relaxed text-muted">{s.blurb}</p>
                  <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-medium text-crimson transition-all group-hover:gap-3">
                    Open <ArrowIcon className="h-3.5 w-3.5" />
                  </span>
                </Link>
              </Reveal>
            ))}
          </div>

          <Reveal delay={100}>
            <div className="mt-10 rounded-2xl border border-line bg-surface p-7">
              <h3 className="font-display text-lg">Owner and trade services</h3>
              <p className="mt-2 text-sm text-muted">Everything we do beyond chartering.</p>
              <ul className="mt-5 flex flex-wrap gap-2">
                {[...managementServices, ...sailingSchoolPages].map((p) => (
                  <li key={p.href}>
                    <Link
                      href={p.href}
                      className="inline-block rounded-full border border-line bg-white px-4 py-2 text-sm text-muted transition-colors hover:border-crimson hover:text-crimson"
                    >
                      {p.title} {p.accent}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>
      </section>

      <CtaBand
        title="Sail with us"
        accent="once."
        sub="Then judge whether any of that was true. Most people book again."
      />
    </>
  );
}
