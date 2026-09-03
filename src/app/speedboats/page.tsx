import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

import { PageHero } from "@/components/PageHero";
import { CtaBand } from "@/components/CtaBand";
import { Faq } from "@/components/Faq";
import { JsonLd } from "@/components/JsonLd";
import { Reveal } from "@/components/Reveal";
import { SectionTitle, Pill } from "@/components/ui";
import { ArrowIcon, ClockIcon, UsersIcon, CheckIcon } from "@/components/icons";

import { speedboatRoutes } from "@/data/speedboats";
import { inr } from "@/data/yachts";
import { buildMetadata, breadcrumbSchema, faqSchema } from "@/lib/seo";
import { site } from "@/lib/site";

export const metadata: Metadata = buildMetadata({
  title: "Speedboat Charters in Mumbai — Elephanta, Alibaug & Navi Mumbai Transfers",
  description:
    "Private speedboat transfers from the Gateway of India to Elephanta, Alibaug (Mandwa) and Navi Mumbai. Fixed price per boat, up to 6 guests, your own departure time.",
  path: "/speedboats",
});

const breadcrumb = [
  { name: "Home", path: "/" },
  { name: "Speedboats", path: "/speedboats" },
];

const faqs = [
  {
    q: "Is a speedboat cheaper than the ferry?",
    a: "No. Scheduled ferries are far cheaper per person. You charter a speedboat to travel on your own timing, with your own group, without queuing — not to save money.",
  },
  {
    q: "Is the price per person or per boat?",
    a: "Per boat. A six-seater costs the same whether two people travel or six, which is what makes it sensible for families and groups.",
  },
  {
    q: "Do speedboats run during the monsoon?",
    a: "No. Crossings are suspended through the southwest monsoon, roughly June to September, when the coast guard restricts small-craft movement.",
  },
  {
    q: "How much luggage can we bring?",
    a: "A weekend bag per guest is fine on all routes. Flag large luggage, sports equipment or coolers when booking so we can allocate the right boat.",
  },
  {
    q: "What happens if the sea is rough on our date?",
    a: "The skipper will either delay departure or, if conditions do not permit sailing, reschedule at no cost. We do not run crossings in unsafe conditions.",
  },
];

export default function SpeedboatsPage() {
  const itemList = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Saildeck speedboat routes",
    itemListElement: speedboatRoutes.map((r, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: r.name,
      url: `${site.url}/speedboats/${r.slug}`,
    })),
  };

  return (
    <>
      <JsonLd data={[breadcrumbSchema(breadcrumb), itemList, faqSchema(faqs)]} />

      <PageHero
        breadcrumb={breadcrumb}
        eyebrow="Speedboats"
        title="Beat the traffic."
        accent="Take the water."
        sub="Alibaug in twenty minutes instead of three hours. Elephanta without the ferry queue. Private boats, your timing, one fixed price for the whole boat."
        image="https://images.unsplash.com/photo-1597154200389-d7ac4c75e180?auto=format&fit=crop&w=2000&q=80"
        imageAlt="Speedboat under way at speed across open water"
        facts={[
          { label: "Routes", value: "3 regular" },
          { label: "Capacity", value: "Up to 6 guests" },
          { label: "Crossing", value: "20 – 45 min" },
          { label: "Season", value: "Oct – May" },
        ]}
      />

      <section className="py-14 md:py-20">
        <div className="container-x space-y-6">
          {speedboatRoutes.map((r, i) => (
            <Reveal key={r.slug} delay={(i % 2) * 70}>
              <Link
                href={`/speedboats/${r.slug}`}
                data-cta="speedboat-route"
                className="card card-hover group grid overflow-hidden md:grid-cols-[0.8fr_1.2fr]"
              >
                <div className="relative aspect-[16/10] md:aspect-auto md:min-h-[17rem]">
                  <Image
                    src={r.image}
                    alt={r.imageAlt}
                    fill
                    sizes="(max-width: 768px) 100vw, 40vw"
                    priority={i === 0}
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </div>

                <div className="flex flex-col justify-center p-7 md:p-9">
                  <div className="flex flex-wrap items-center gap-2">
                    <Pill tone="crimson">{r.from} → {r.to}</Pill>
                  </div>

                  <h2 className="mt-3 font-display text-2xl transition-colors group-hover:text-crimson md:text-[1.7rem]">
                    {r.name}
                  </h2>
                  <p className="mt-3 line-clamp-2 leading-relaxed text-muted">{r.intro}</p>

                  <div className="mt-6 flex flex-wrap items-end justify-between gap-5">
                    <dl className="flex flex-wrap gap-x-7 gap-y-3 text-sm">
                      <div className="flex items-center gap-2 text-muted">
                        <ClockIcon className="h-4 w-4 text-teal" />
                        {r.duration}
                      </div>
                      <div className="flex items-center gap-2 text-muted">
                        <UsersIcon className="h-4 w-4 text-teal" />
                        {r.capacity}
                      </div>
                    </dl>

                    <div className="text-right">
                      <span className="font-display text-2xl font-semibold text-navy">{inr(r.priceOneWay)}</span>
                      <span className="block text-xs text-faint">one way, whole boat</span>
                    </div>
                  </div>

                  <span className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-crimson transition-all group-hover:gap-4">
                    Route details and booking <ArrowIcon className="h-4 w-4" />
                  </span>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="border-y border-line bg-surface py-14 md:py-20">
        <div className="container-x grid gap-12 lg:grid-cols-2 lg:gap-16">
          <Reveal>
            <SectionTitle eyebrow="Included" title="What every transfer" accent="includes" />
            <ul className="mt-7 space-y-3">
              {[
                "Private boat — never shared with another group",
                "Licensed skipper and crew",
                "Life jackets for every guest, child sizes available",
                "Fuel for the standard route",
                "Luggage space for a weekend bag per guest",
                "Flexible departure timing within daylight hours",
              ].map((x) => (
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
            <SectionTitle eyebrow="Questions" title="Speedboat" accent="FAQ" />
            <div className="mt-7">
              <Faq faqs={faqs} />
            </div>
          </Reveal>
        </div>
      </section>

      <CtaBand
        title="Where are you"
        accent="headed?"
        sub="Tell us the route, the date and how many are travelling. We will confirm a boat and a price straight away."
        whatsappMessage="Hi Saildeck! I would like to book a speedboat transfer."
      />
    </>
  );
}
