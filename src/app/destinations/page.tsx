import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

import { PageHero } from "@/components/PageHero";
import { CtaBand } from "@/components/CtaBand";
import { JsonLd } from "@/components/JsonLd";
import { Reveal } from "@/components/Reveal";
import { ArrowIcon, PinIcon } from "@/components/icons";

import { destinations } from "@/data/destinations";
import { buildMetadata, breadcrumbSchema } from "@/lib/seo";
import { site } from "@/lib/site";

export const metadata: Metadata = buildMetadata({
  title: "Destinations — Yacht Charters in Mumbai, Goa, Navi Mumbai & Across India",
  description:
    "Where Saildeck sails: private yacht charters from the Gateway of India, the Mandovi in Goa, Belapur in Navi Mumbai, and arranged charters across the rest of the Indian coast.",
  path: "/destinations",
});

const breadcrumb = [
  { name: "Home", path: "/" },
  { name: "Destinations", path: "/destinations" },
];

export default function DestinationsPage() {
  const itemList = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Saildeck destinations",
    itemListElement: destinations.map((d, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: d.name,
      url: `${site.url}/destinations/${d.slug}`,
    })),
  };

  return (
    <>
      <JsonLd data={[breadcrumbSchema(breadcrumb), itemList]} />

      <PageHero
        breadcrumb={breadcrumb}
        eyebrow="Destinations"
        title="Four coastlines,"
        accent="four very different days"
        sub="Mumbai gives you a skyline and a two-hour window at golden hour. Goa gives you a river, an island and time to swim. Navi Mumbai gives you all of it without the drive."
        image="https://images.unsplash.com/photo-1570168007204-dfb528c6958f?auto=format&fit=crop&w=2000&q=80"
        imageAlt="The Gateway of India seen from the harbour at dusk"
        compact
      />

      <section className="py-14 md:py-20">
        <div className="container-x space-y-6">
          {destinations.map((d, i) => (
            <Reveal key={d.slug} delay={(i % 2) * 70}>
              <Link
                href={`/destinations/${d.slug}`}
                data-cta="destination-row"
                className="card card-hover group grid overflow-hidden md:grid-cols-[0.85fr_1.15fr]"
              >
                <div className={`relative aspect-[16/10] md:aspect-auto md:min-h-[19rem] ${i % 2 === 1 ? "md:order-2" : ""}`}>
                  <Image
                    src={d.image}
                    alt={d.imageAlt}
                    fill
                    sizes="(max-width: 768px) 100vw, 42vw"
                    priority={i === 0}
                    className="object-cover transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-105"
                  />
                </div>

                <div className="flex flex-col justify-center p-7 md:p-10">
                  <p className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-crimson">
                    <PinIcon className="h-3.5 w-3.5" />
                    {d.shortName}
                  </p>
                  <h2 className="mt-3 font-display text-2xl md:text-3xl">
                    {d.h1} <span className="italic font-normal text-crimson">{d.accent}</span>
                  </h2>
                  <p className="mt-3 leading-relaxed text-muted">{d.intro}</p>

                  <dl className="mt-6 flex flex-wrap gap-x-8 gap-y-3">
                    {d.facts.slice(0, 3).map((f) => (
                      <div key={f.label}>
                        <dt className="text-[11px] uppercase tracking-wide text-faint">{f.label}</dt>
                        <dd className="mt-0.5 text-sm font-semibold text-navy">{f.value}</dd>
                      </div>
                    ))}
                  </dl>

                  <span className="mt-7 inline-flex items-center gap-2 text-sm font-medium text-crimson transition-all group-hover:gap-4">
                    Explore {d.shortName} <ArrowIcon className="h-4 w-4" />
                  </span>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>

      <CtaBand
        title="Not sure where"
        accent="to sail?"
        sub="Tell us the date and who is coming. We will tell you which coast suits it best — including when the answer is not ours."
      />
    </>
  );
}
