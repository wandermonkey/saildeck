import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";

import { PageHero } from "@/components/PageHero";
import { Gallery } from "@/components/Gallery";
import { EnquiryForm } from "@/components/EnquiryForm";
import { CtaBand } from "@/components/CtaBand";
import { Faq } from "@/components/Faq";
import { JsonLd } from "@/components/JsonLd";
import { Reveal } from "@/components/Reveal";
import { Button, SectionTitle, Pill } from "@/components/ui";
import { ArrowIcon, WhatsAppIcon, CheckIcon, ClockIcon, UsersIcon, RouteIcon } from "@/components/icons";

import { speedboatRoutes, getSpeedboatRoute } from "@/data/speedboats";
import { inr } from "@/data/yachts";
import { buildMetadata, breadcrumbSchema, faqSchema, serviceSchema } from "@/lib/seo";
import { whatsappLink } from "@/lib/site";

export function generateStaticParams() {
  return speedboatRoutes.map((r) => ({ slug: r.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const r = getSpeedboatRoute(slug);
  if (!r) return buildMetadata({ title: "Not found", description: "", noIndex: true });

  return buildMetadata({
    title: r.seoTitle,
    description: r.seoDescription,
    path: `/speedboats/${r.slug}`,
    image: r.image,
  });
}

export default async function SpeedboatRoutePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const r = getSpeedboatRoute(slug);
  if (!r) notFound();

  const breadcrumb = [
    { name: "Home", path: "/" },
    { name: "Speedboats", path: "/speedboats" },
    { name: r.name, path: `/speedboats/${r.slug}` },
  ];

  const others = speedboatRoutes.filter((x) => x.slug !== r.slug);

  return (
    <>
      <JsonLd
        data={[
          breadcrumbSchema(breadcrumb),
          faqSchema(r.faqs),
          serviceSchema({
            name: `${r.name} speedboat transfer`,
            description: r.seoDescription,
            path: `/speedboats/${r.slug}`,
            price: r.priceOneWay,
            priceUnit: "E48", // per unit of service, i.e. per boat trip
            image: r.image,
            areaServed: ["Mumbai"],
          }),
        ]}
      />

      <PageHero
        breadcrumb={breadcrumb}
        eyebrow={`${r.from} → ${r.to}`}
        title={r.h1}
        accent={r.accent}
        sub={r.intro}
        image={r.image}
        imageAlt={r.imageAlt}
        facts={[
          { label: "Crossing", value: r.duration },
          { label: "Distance", value: r.distanceNm },
          { label: "Capacity", value: r.capacity },
          { label: "From", value: `${inr(r.priceOneWay)} one way` },
        ]}
      >
        <div className="flex flex-wrap gap-3">
          <Button
            href={whatsappLink(`Hi Saildeck! I would like to book the ${r.name} speedboat transfer.`)}
            variant="whatsapp"
            size="lg"
            external
            dataCta="speedboat-hero-whatsapp"
          >
            <WhatsAppIcon className="h-5 w-5" />
            Book on WhatsApp
          </Button>
          <Button href="#enquire" variant="light" size="lg" dataCta="speedboat-hero-cta">
            Send an enquiry <ArrowIcon className="h-4 w-4" />
          </Button>
        </div>
      </PageHero>

      <section className="py-14 md:py-20">
        <div className="container-x grid gap-12 lg:grid-cols-[1.1fr_1fr] lg:items-start lg:gap-16">
          <div className="min-w-0">
            {/* Photo carousel — same component as the boat listings, so people
                can see the actual boats before they read the price. */}
            <Reveal>
              <Gallery shots={r.gallery} priority />
            </Reveal>

            {/* Pricing */}
            <Reveal>
              <div className="mt-12">
              <SectionTitle eyebrow="Pricing" title="What it" accent="costs" />
              <p className="mt-4 leading-relaxed text-muted">
                Prices are for the whole boat, not per person — {r.capacity.toLowerCase()} travel
                for the same rate. Fuel, skipper and safety equipment are included.
              </p>

              <div className="mt-7 grid gap-4 sm:grid-cols-2">
                <div className="card p-6">
                  <p className="text-xs font-semibold uppercase tracking-wider text-faint">One way</p>
                  <p className="mt-2 font-display text-3xl font-semibold text-navy">{inr(r.priceOneWay)}</p>
                  <p className="mt-1 text-sm text-muted">{r.from} to {r.to}</p>
                </div>
                <div className="card border-crimson/30 p-6">
                  <div className="flex items-center justify-between">
                    <p className="text-xs font-semibold uppercase tracking-wider text-faint">Same-day return</p>
                    <Pill tone="crimson">Better value</Pill>
                  </div>
                  <p className="mt-2 font-display text-3xl font-semibold text-navy">{inr(r.priceReturn)}</p>
                  <p className="mt-1 text-sm text-muted">Includes waiting time</p>
                </div>
              </div>

              <p className="mt-4 text-xs text-faint">
                Indicative rates. Final pricing depends on date, timing and boat availability —
                confirmed in writing before any deposit.
              </p>
              </div>
            </Reveal>

            {/* Included */}
            <Reveal delay={80}>
              <div className="mt-12">
                <h2 className="text-2xl md:text-[1.75rem]">What is included</h2>
                <ul className="mt-6 grid gap-3 sm:grid-cols-2">
                  {r.includes.map((x) => (
                    <li key={x} className="flex items-start gap-3 text-sm text-muted">
                      <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-teal-soft text-teal">
                        <CheckIcon className="h-3 w-3" />
                      </span>
                      {x}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>

            {/* Good to know */}
            <Reveal delay={120}>
              <div className="mt-12 rounded-2xl border border-line bg-surface p-7">
                <h2 className="font-display text-xl">Good to know</h2>
                <ul className="mt-4 space-y-2.5 text-sm leading-relaxed text-muted">
                  {r.goodToKnow.map((g) => (
                    <li key={g}>· {g}</li>
                  ))}
                </ul>
              </div>
            </Reveal>

            {/* FAQ */}
            <Reveal delay={140}>
              <div className="mt-12">
                <SectionTitle eyebrow="Questions" title="Frequently" accent="asked" />
                <div className="mt-6">
                  <Faq faqs={r.faqs} />
                </div>
              </div>
            </Reveal>
          </div>

          <Reveal delay={120} className="lg:sticky lg:top-28">
            <div id="enquire" className="scroll-mt-28">
              <h2 className="mb-4 font-display text-xl">Book this transfer</h2>
              <EnquiryForm preset="Speedboat transfer" compact />
            </div>
          </Reveal>
        </div>
      </section>

      {/* Other routes */}
      <section className="border-t border-line bg-surface py-14 md:py-20">
        <div className="container-x">
          <Reveal>
            <SectionTitle eyebrow="Other routes" title="Also running from" accent="Mumbai" />
          </Reveal>
          <div className="mt-9 grid gap-4 md:grid-cols-2">
            {others.map((o, i) => (
              <Reveal key={o.slug} delay={i * 70}>
                <Link href={`/speedboats/${o.slug}`} className="card card-hover group flex h-full flex-col p-6" data-cta="other-route">
                  <span className="grid h-10 w-10 place-items-center rounded-full bg-crimson-soft text-crimson">
                    <RouteIcon />
                  </span>
                  <h3 className="mt-4 font-display text-lg transition-colors group-hover:text-crimson">{o.name}</h3>
                  <p className="mt-2 flex-1 text-sm leading-relaxed text-muted">{o.from} to {o.to}</p>
                  <div className="mt-4 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-muted">
                    <span className="flex items-center gap-1.5"><ClockIcon className="h-4 w-4 text-teal" />{o.duration}</span>
                    <span className="flex items-center gap-1.5"><UsersIcon className="h-4 w-4 text-teal" />{o.capacity}</span>
                    <span className="ml-auto font-display text-base font-semibold text-navy">{inr(o.priceOneWay)}</span>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <CtaBand
        title={`${r.name},`}
        accent="on your schedule."
        whatsappMessage={`Hi Saildeck! I would like to book the ${r.name} speedboat.`}
      />
    </>
  );
}
