import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

import { PageHero } from "@/components/PageHero";
import { YachtCard } from "@/components/YachtCard";
import { EnquiryForm } from "@/components/EnquiryForm";
import { CtaBand } from "@/components/CtaBand";
import { Faq } from "@/components/Faq";
import { JsonLd } from "@/components/JsonLd";
import { Reveal } from "@/components/Reveal";
import { SectionTitle, SectionHead } from "@/components/ui";
import { OccasionIcon, ClockIcon, CheckIcon, ArrowIcon } from "@/components/icons";

import { yachts, inr } from "@/data/yachts";
import { charterOccasions } from "@/data/company";
import { destinations } from "@/data/destinations";
import { buildMetadata, breadcrumbSchema, faqSchema, serviceSchema } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Private Yacht Charters in India — Hourly Hire with Captain & Crew",
  description:
    "Private yacht charters in Mumbai, Navi Mumbai and Goa from ₹11,900 per hour. Sunset cruises, birthdays, proposals, corporate offsites and full-day island charters with captain and crew.",
  path: "/charters",
});

const breadcrumb = [
  { name: "Home", path: "/" },
  { name: "Charters", path: "/charters" },
];

const faqs = [
  {
    q: "How much does a private yacht charter cost in India?",
    a: "Saildeck charters start at ₹11,900 per hour and run to ₹33,000 per hour for the flagship. That is per boat, not per person — the captain, crew, fuel for the standard route and life jackets are included.",
  },
  {
    q: "What is the minimum charter duration?",
    a: "Two hours on weekends and public holidays, one hour midweek on most boats. Island and full-day charters are quoted as a package rather than by the hour.",
  },
  {
    q: "How do I pay and what is the deposit?",
    a: "A deposit confirms and holds your slot; the balance is due before boarding. We accept UPI and bank transfer, and issue a GST invoice on request for corporate bookings.",
  },
  {
    q: "Can we bring outside food and alcohol on board?",
    a: "Outside food and a cake are generally fine. Alcohol rules vary by vessel and by the permits in force on the day, so check with us before buying anything.",
  },
  {
    q: "What happens if the weather turns on our date?",
    a: "If the coast guard suspends sailing or the captain judges conditions unsafe, we reschedule at no cost. The captain's decision on safety is final and is never a commercial one.",
  },
  {
    q: "Do you provide catering and decoration?",
    a: "Yes, both are arranged with 48 hours' notice — floral or balloon setups, a custom cake, canapés or a full meal, a bar, a photographer and a DJ. Everything is quoted before you commit.",
  },
  {
    q: "Are children allowed on a charter?",
    a: "Yes. Child-size life jackets are carried on every boat and the crew is trained in water rescue. Children count toward the licensed capacity and must be supervised on deck.",
  },
];

const included = [
  "Licensed captain and deck crew",
  "Fuel for the agreed standard route",
  "Life jackets for every guest, child sizes included",
  "Bluetooth sound system",
  "Drinking water and soft drinks on most boats",
  "Tender transfer from the jetty to the yacht",
];

const addOns = [
  "Catering — canapés to a full sit-down meal",
  "Bar setup with ice and glassware",
  "Floral, balloon and themed decoration",
  "Custom cake for birthdays and anniversaries",
  "Photographer, videographer or drone operator",
  "Jet skis, kayaks and snorkelling gear",
  "Live musician or DJ",
  "Ground transfers to the jetty",
];

export default function ChartersPage() {
  return (
    <>
      <JsonLd
        data={[
          breadcrumbSchema(breadcrumb),
          faqSchema(faqs),
          serviceSchema({
            name: "Private yacht charter",
            description:
              "Private yacht charters in Mumbai, Navi Mumbai and Goa with licensed captain and crew, hired by the hour.",
            path: "/charters",
            price: 11900,
            image: yachts[0].gallery[0].src,
          }),
        ]}
      />

      <PageHero
        breadcrumb={breadcrumb}
        eyebrow="Charters"
        title="Private charters,"
        accent="by the hour"
        sub="One boat, one group, one captain who works to your plan. No shared decks, no fixed departure times, no queue at the jetty."
        image="https://images.unsplash.com/photo-1749183563789-ae17d4a952d2?auto=format&fit=crop&w=2000&q=80"
        imageAlt="Guests on the upper deck of a chartered yacht"
        facts={[
          { label: "From", value: `${inr(11900)}/hr` },
          { label: "Minimum", value: "1–2 hours" },
          { label: "Guests", value: "2 – 30" },
          { label: "Season", value: "Oct – May" },
        ]}
      />

      {/* Occasions */}
      <section className="py-14 md:py-20">
        <div className="container-x">
          <Reveal>
            <SectionTitle
              align="center"
              eyebrow="Occasions"
              title="What people charter"
              accent="for"
              sub="The boat is the easy part. What makes the day is the planning around it — the timing, the decor, the photographer who knows where to stand."
            />
          </Reveal>

          <div className="mt-11 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {charterOccasions.map((o, i) => (
              <Reveal key={o.name} delay={(i % 3) * 70}>
                <article className="card h-full overflow-hidden">
                  <div className="relative aspect-[16/10] overflow-hidden bg-surface-2">
                    <Image
                      src={o.image}
                      alt={o.imageAlt}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      priority={i < 3}
                      className="object-cover"
                    />
                    <span className="absolute left-3 top-3 grid h-10 w-10 place-items-center rounded-full bg-white/95 text-crimson shadow-sm backdrop-blur">
                      <OccasionIcon name={o.icon} className="h-5 w-5" />
                    </span>
                    <span className="absolute bottom-3 right-3 flex items-center gap-1.5 rounded-full bg-white/95 px-3 py-1 text-[11px] font-medium text-navy shadow-sm backdrop-blur">
                      <ClockIcon className="h-3 w-3" />
                      {o.duration}
                    </span>
                  </div>
                  <div className="p-6">
                    <h3 className="font-display text-lg">{o.name}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-muted">{o.blurb}</p>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Included / add-ons */}
      <section className="border-y border-line bg-surface py-14 md:py-20">
        <div className="container-x grid gap-12 lg:grid-cols-2 lg:gap-16">
          <Reveal>
            <SectionTitle eyebrow="Included" title="What every charter" accent="comes with" />
            <ul className="mt-7 space-y-3">
              {included.map((x) => (
                <li key={x} className="flex items-start gap-3 text-sm text-muted">
                  <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-teal-soft text-teal">
                    <CheckIcon className="h-3 w-3" />
                  </span>
                  {x}
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal delay={120}>
            <SectionTitle eyebrow="Add-ons" title="Everything else is" accent="optional" />
            <p className="mt-4 text-sm leading-relaxed text-muted">
              Quoted separately and confirmed in writing before you pay a deposit — never
              bundled in silently, and never presented as a second bill at the jetty.
            </p>
            <ul className="mt-6 flex flex-wrap gap-2">
              {addOns.map((a) => (
                <li key={a} className="rounded-full border border-line bg-white px-4 py-2 text-sm text-muted">
                  {a}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>

      {/* Fleet */}
      <section className="py-14 md:py-20">
        <div className="container-x">
          <Reveal>
            <SectionHead
              eyebrow="The fleet"
              title="Boats available for"
              accent="charter"
              linkHref="/fleet"
              linkLabel="View all boats"
            />
          </Reveal>
          <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {yachts.slice(0, 6).map((y, i) => (
              <Reveal key={y.slug} delay={(i % 3) * 70}>
                <YachtCard yacht={y} priority={i < 3} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Destinations */}
      <section className="border-y border-line bg-surface py-14 md:py-20">
        <div className="container-x">
          <Reveal>
            <SectionTitle eyebrow="Where" title="Charter from" accent="any of our ports" />
          </Reveal>
          <div className="mt-9 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {destinations.map((d, i) => (
              <Reveal key={d.slug} delay={(i % 4) * 60}>
                <Link href={`/destinations/${d.slug}`} className="card card-hover group flex h-full flex-col p-6" data-cta="charter-destination">
                  <h3 className="font-display text-lg transition-colors group-hover:text-crimson">{d.name}</h3>
                  <p className="mt-2 flex-1 text-sm leading-relaxed text-muted">{d.departures[0].name}</p>
                  <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-crimson transition-all group-hover:gap-3">
                    Explore <ArrowIcon className="h-3.5 w-3.5" />
                  </span>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ + form */}
      <section className="py-14 md:py-20">
        <div className="container-x grid gap-12 lg:grid-cols-[1.1fr_1fr] lg:items-start lg:gap-16">
          <Reveal>
            <SectionTitle eyebrow="Questions" title="Charter" accent="FAQ" />
            <div className="mt-8">
              <Faq faqs={faqs} />
            </div>
          </Reveal>
          <Reveal delay={120} className="lg:sticky lg:top-28">
            <div id="enquire" className="scroll-mt-28">
              <h2 className="mb-4 font-display text-xl">Plan your charter</h2>
              <EnquiryForm preset="Yacht charter" />
            </div>
          </Reveal>
        </div>
      </section>

      <CtaBand whatsappMessage="Hi Saildeck! I would like to plan a private charter." />
    </>
  );
}
