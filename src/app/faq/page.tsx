import type { Metadata } from "next";
import Link from "next/link";

import { PageHero } from "@/components/PageHero";
import { CtaBand } from "@/components/CtaBand";
import { Faq } from "@/components/Faq";
import { JsonLd } from "@/components/JsonLd";
import { Reveal } from "@/components/Reveal";
import { SectionTitle } from "@/components/ui";

import { destinations } from "@/data/destinations";
import { speedboatRoutes } from "@/data/speedboats";
import { buildMetadata, breadcrumbSchema, faqSchema } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "FAQ — Charters, Speedboats, Buying a Boat & Sailing Courses",
  description:
    "Answers on yacht charter pricing, booking and weather policy, speedboat transfers to Elephanta and Alibaug, buying and selling boats in India, ownership costs and sailing courses.",
  path: "/faq",
});

const breadcrumb = [
  { name: "Home", path: "/" },
  { name: "FAQ", path: "/faq" },
];

const groups = [
  {
    id: "charters",
    title: "Charters",
    accent: "and booking",
    faqs: [
      {
        q: "What is included in the hourly charter price?",
        a: "The captain, crew, fuel for the standard route, life jackets for every guest and the on-board sound system. Catering, bar, decoration, water sports and extra hours are quoted separately before you pay anything.",
      },
      {
        q: "Is the price per person or per boat?",
        a: "Per boat, per hour. Four guests and fourteen guests pay the same rate on the same vessel, which is why the per-head cost falls sharply as your group grows.",
      },
      {
        q: "Is there a minimum booking duration?",
        a: "Two hours on weekends and public holidays, one hour midweek on most boats. Island and full-day charters are quoted as packages rather than by the hour.",
      },
      {
        q: "How do I pay, and what about the deposit?",
        a: "A deposit confirms and holds your slot; the balance is due before boarding. We accept UPI and bank transfer, and issue a GST invoice on request for corporate bookings.",
      },
      {
        q: "What is your cancellation policy?",
        a: "Cancellations well ahead of the date are refundable less a booking fee; close to the date the deposit is usually retained because the slot can no longer be resold. Weather cancellations called by the coast guard are always rescheduled free of charge. Exact terms are on your booking confirmation.",
      },
      {
        q: "How far in advance should I book?",
        a: "Weekday charters can often be arranged in the same week. Weekend slots, sunset departures and anything in December need two to three weeks' notice.",
      },
    ],
  },
  {
    id: "on-the-day",
    title: "On the day",
    accent: "and on board",
    faqs: [
      {
        q: "How do we board the boat?",
        a: "From the jetty, by tender out to the yacht at anchor — usually about ten minutes. Arrive fifteen minutes before your slot; the tender cannot wait without eating into your charter time.",
      },
      {
        q: "Can we bring children?",
        a: "Yes. Child-size life jackets are carried on every boat and the crew is trained in water rescue. Children must be supervised on deck at all times, and infants count toward the licensed capacity.",
      },
      {
        q: "Will I get seasick?",
        a: "Most guests do not — charters stay in sheltered water and the season avoids rough conditions. If you are prone to motion sickness, take a tablet an hour before boarding and ask us for a boat with stabilisers.",
      },
      {
        q: "Can we play our own music?",
        a: "Yes, every boat has a Bluetooth system. Volume limits apply near anchorages and after dark under harbour rules.",
      },
      {
        q: "Can we bring our own food and alcohol?",
        a: "Outside food and a cake are generally fine and we will confirm per boat. Alcohol rules vary by vessel and by the permits in force on the day, so check with us before buying anything.",
      },
    ],
  },
  {
    id: "speedboats",
    title: "Speedboat",
    accent: "transfers",
    faqs: [
      ...speedboatRoutes.flatMap((r) => r.faqs.slice(0, 2)),
      {
        q: "Do speedboats run during the monsoon?",
        a: "No. Crossings are suspended through the southwest monsoon, roughly June to September, when the coast guard restricts small-craft movement.",
      },
    ],
  },
  {
    id: "buying",
    title: "Buying, selling",
    accent: "and owning",
    faqs: [
      {
        q: "What does it cost to own a yacht in India?",
        a: "Beyond the purchase price, budget for berthing, crew, insurance, annual survey, fuel, maintenance and monsoon layup. As a planning figure, annual running costs land near ten percent of the vessel's value.",
      },
      {
        q: "Can I charter my boat out to offset costs?",
        a: "Yes, and it can cover a meaningful share of running costs — not usually all of them. It requires commercial registration, licensed crew and the right insurance, all of which need planning before purchase rather than afterwards.",
      },
      {
        q: "What paperwork do I need to sell my boat?",
        a: "Registration certificate, proof of ownership and purchase, insurance history, survey reports, service records, and customs documents for an imported vessel. Missing import papers are the most common reason a sale collapses at the final stage.",
      },
      {
        q: "Should I buy a boat already in India or import one?",
        a: "A boat already imported and registered here removes duty risk and paperwork uncertainty. Importing gives more choice for the money but needs the duty position confirmed before you commit.",
      },
    ],
  },
  {
    id: "sailing",
    title: "Sailing",
    accent: "school",
    faqs: [
      {
        q: "Do I need to know how to swim to learn sailing?",
        a: "No. Every student wears a buoyancy aid and a safety boat is on the water throughout. Being comfortable in water helps your confidence but is not a requirement to start.",
      },
      {
        q: "Is an RYA certificate recognised internationally?",
        a: "Yes. RYA qualifications are the most widely recognised recreational sailing certificates in the world, and Day Skipper or above is what most overseas charter companies ask for before bareboat hire.",
      },
      {
        q: "What is a good first sailing boat to buy?",
        a: "For an adult, a Laser/ILCA or a stable two-person dinghy. For a child, an Optimist. Both have active fleets in India and hold their value because there is always another family looking for one.",
      },
    ],
  },
  {
    id: "season",
    title: "Season",
    accent: "and weather",
    faqs: [
      {
        q: "When is the boating season in India?",
        a: "October to May on the west coast. The southwest monsoon closes charter operations from June to September, which is when refit, repair and monsoon layup work happens instead.",
      },
      {
        q: "What happens if the weather is bad on my date?",
        a: "If the coast guard suspends sailing or the captain judges conditions unsafe, we reschedule to another date at no cost. That decision is made on safety grounds and is never commercial.",
      },
      ...destinations.slice(0, 2).map((d) => d.faqs[d.faqs.length - 1]),
    ],
  },
];

export default function FaqPage() {
  const all = groups.flatMap((g) => g.faqs);

  return (
    <>
      {/* One FAQPage block covering every question on the page. */}
      <JsonLd data={[breadcrumbSchema(breadcrumb), faqSchema(all)]} />

      <PageHero
        breadcrumb={breadcrumb}
        eyebrow="Before you book"
        title="Questions,"
        accent="answered properly"
        sub="No fine print buried three clicks deep. If something here is still unclear, message us and we will tell you straight."
        image="https://images.unsplash.com/photo-1598737285721-29346a5c9278?auto=format&fit=crop&w=2000&q=80"
        imageAlt="A boat under way on calm water beneath a blue sky"
        compact
      />

      {/* Jump links — 30+ questions is a lot to scroll past */}
      <div className="sticky top-[var(--nav-h)] z-30 border-b border-line bg-white/95 backdrop-blur">
        <div className="container-x no-scrollbar flex gap-2 overflow-x-auto py-3">
          {groups.map((g) => (
            <a
              key={g.id}
              href={`#${g.id}`}
              className="shrink-0 rounded-full border border-line px-4 py-2 text-sm text-muted transition-colors hover:border-crimson hover:text-crimson"
            >
              {g.title}
            </a>
          ))}
        </div>
      </div>

      <section className="py-14 md:py-20">
        <div className="container-x max-w-4xl">
          {groups.map((g, i) => (
            <Reveal key={g.id} delay={0}>
              <div id={g.id} className={`scroll-mt-40 ${i > 0 ? "mt-16" : ""}`}>
                <SectionTitle eyebrow={`0${i + 1}`} title={g.title} accent={g.accent} />
                <div className="mt-6">
                  <Faq faqs={g.faqs} />
                </div>
              </div>
            </Reveal>
          ))}

          <Reveal>
            <div className="mt-16 rounded-2xl border border-line bg-surface p-8 text-center">
              <h2 className="font-display text-xl">Looking for boat-specific answers?</h2>
              <p className="mx-auto mt-3 max-w-lg text-sm leading-relaxed text-muted">
                Every boat in the fleet has its own FAQ covering capacity, boarding and
                what is included on that particular vessel.
              </p>
              <Link
                href="/fleet"
                className="mt-6 inline-flex items-center justify-center rounded-full bg-crimson px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-crimson-dark"
              >
                Browse the fleet
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      <CtaBand
        title="Still not sure?"
        accent="Just ask."
        sub="A two-line WhatsApp message gets you a real answer from someone who runs these boats."
      />
    </>
  );
}
