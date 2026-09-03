import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { PageHero } from "@/components/PageHero";
import { YachtCard } from "@/components/YachtCard";
import { EnquiryForm } from "@/components/EnquiryForm";
import { CtaBand } from "@/components/CtaBand";
import { Faq } from "@/components/Faq";
import { JsonLd } from "@/components/JsonLd";
import { Reveal } from "@/components/Reveal";
import { Button, SectionTitle, Pill } from "@/components/ui";
import { ArrowIcon, WhatsAppIcon, AnchorIcon, RouteIcon } from "@/components/icons";

import { destinations, getDestination } from "@/data/destinations";
import { yachtsInDestination, yachts, inr } from "@/data/yachts";
import { buildMetadata, breadcrumbSchema, faqSchema, serviceSchema } from "@/lib/seo";
import { whatsappLink } from "@/lib/site";

export function generateStaticParams() {
  return destinations.map((d) => ({ slug: d.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const d = getDestination(slug);
  if (!d) return buildMetadata({ title: "Not found", description: "", noIndex: true });

  return buildMetadata({
    title: d.seoTitle,
    description: d.seoDescription,
    path: `/destinations/${d.slug}`,
    image: d.image,
  });
}

export default async function DestinationPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const d = getDestination(slug);
  if (!d) notFound();

  // "Rest of India" has no home fleet, so fall back to showing the whole fleet.
  const fleet = d.slug === "rest-of-india" ? yachts.slice(0, 6) : yachtsInDestination(d.slug);
  const cheapest = fleet.length ? Math.min(...fleet.map((y) => y.pricePerHour)) : 11900;

  const breadcrumb = [
    { name: "Home", path: "/" },
    { name: "Destinations", path: "/destinations" },
    { name: d.name, path: `/destinations/${d.slug}` },
  ];

  return (
    <>
      <JsonLd
        data={[
          breadcrumbSchema(breadcrumb),
          faqSchema(d.faqs),
          serviceSchema({
            name: `Yacht charter in ${d.name}`,
            description: d.seoDescription,
            path: `/destinations/${d.slug}`,
            price: cheapest,
            image: d.image,
            areaServed: [d.name],
          }),
        ]}
      />

      <PageHero
        breadcrumb={breadcrumb}
        eyebrow={`${fleet.length} boats available · from ${inr(cheapest)}/hour`}
        title={d.h1}
        accent={d.accent}
        sub={d.intro}
        image={d.image}
        imageAlt={d.imageAlt}
        facts={d.facts}
      >
        <div className="flex flex-wrap gap-3">
          <Button href="#enquire" size="lg" dataCta="destination-hero-cta">
            Check availability <ArrowIcon className="h-4 w-4" />
          </Button>
          <Button
            href={whatsappLink(`Hi Saildeck! I want to book a boat in ${d.name}.`)}
            variant="light"
            size="lg"
            external
            dataCta="destination-hero-whatsapp"
          >
            <WhatsAppIcon className="h-5 w-5" />
            WhatsApp us
          </Button>
        </div>
      </PageHero>

      {/* Departure points */}
      <section className="bg-surface py-14 md:py-20">
        <div className="container-x">
          <Reveal>
            <SectionTitle
              eyebrow="Boarding"
              title="Where charters leave from in"
              accent={d.shortName}
              sub="Boarding points are confirmed when you book. Arrive fifteen minutes early — the tender will not wait."
            />
          </Reveal>

          <div className="mt-10 grid gap-4 md:grid-cols-3">
            {d.departures.map((dep, i) => (
              <Reveal key={dep.name} delay={i * 80}>
                <div className="card h-full p-6">
                  <span className="grid h-10 w-10 place-items-center rounded-full bg-crimson-soft text-crimson">
                    <AnchorIcon />
                  </span>
                  <h3 className="mt-4 font-display text-lg">{dep.name}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted">{dep.note}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Routes */}
      <section className="py-14 md:py-20">
        <div className="container-x grid gap-12 lg:grid-cols-[1fr_1.2fr] lg:items-start lg:gap-16">
          <Reveal>
            <SectionTitle eyebrow="Popular routes" title="What people actually" accent="book" />
            <p className="mt-5 leading-relaxed text-muted">{d.bestTime}</p>
            <p className="mt-4 text-sm text-muted">{d.fleetNote}</p>
            <div className="mt-7">
              <Button href="/charters" variant="outline" dataCta="destination-charters">
                Charter types <ArrowIcon className="h-4 w-4" />
              </Button>
            </div>
          </Reveal>

          <div className="space-y-4">
            {d.routes.map((r, i) => (
              <Reveal key={r.name} delay={i * 70}>
                <div className="card flex flex-wrap items-center justify-between gap-4 p-6">
                  <div className="flex min-w-0 items-start gap-4">
                    <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-teal-soft text-teal">
                      <RouteIcon />
                    </span>
                    <div className="min-w-0">
                      <h3 className="font-display text-lg">{r.name}</h3>
                      <p className="mt-1 text-sm text-muted">{r.note}</p>
                    </div>
                  </div>
                  <Pill tone="crimson">{r.duration}</Pill>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Fleet */}
      {fleet.length > 0 && (
        <section className="border-y border-line bg-surface py-14 md:py-20">
          <div className="container-x">
            <Reveal>
              <SectionTitle
                eyebrow="Available here"
                title="Boats based in"
                accent={d.shortName}
                sub={`${fleet.length} boats, priced by the hour with captain and crew included.`}
              />
            </Reveal>
            <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {fleet.map((y, i) => (
                <Reveal key={y.slug} delay={(i % 3) * 70}>
                  <YachtCard yacht={y} priority={i === 0} />
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* FAQ + form */}
      <section className="py-14 md:py-20">
        <div className="container-x grid gap-12 lg:grid-cols-[1.1fr_1fr] lg:items-start lg:gap-16">
          <Reveal>
            <SectionTitle eyebrow="Questions" title={`Chartering in ${d.shortName}`} accent="answered" />
            <div className="mt-8">
              <Faq faqs={d.faqs} />
            </div>
          </Reveal>

          <Reveal delay={120} className="lg:sticky lg:top-28">
            <div id="enquire" className="scroll-mt-28">
              <h2 className="mb-4 font-display text-xl">Check {d.shortName} availability</h2>
              <EnquiryForm preset="Yacht charter" />
            </div>
          </Reveal>
        </div>
      </section>

      <CtaBand
        title={`Your ${d.shortName} charter,`}
        accent="one message away."
        whatsappMessage={`Hi Saildeck! I would like to check boat availability in ${d.name}.`}
      />
    </>
  );
}
