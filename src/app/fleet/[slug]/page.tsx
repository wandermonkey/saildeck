import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";

import { Gallery } from "@/components/Gallery";
import { VideoSection } from "@/components/VideoSection";
import { PricingTable } from "@/components/PricingTable";
import { RichText } from "@/components/RichText";
import { YachtCard } from "@/components/YachtCard";
import { EnquiryForm } from "@/components/EnquiryForm";
import { CtaBand } from "@/components/CtaBand";
import { JsonLd } from "@/components/JsonLd";
import { Reveal } from "@/components/Reveal";
import { Faq } from "@/components/Faq";
import { SectionTitle, Pill } from "@/components/ui";
import {
  CheckIcon, ArrowIcon, WhatsAppIcon, PhoneIcon, StarIcon,
  UsersIcon, RulerIcon, BedIcon, AnchorIcon, PinIcon,
} from "@/components/icons";

import { yachts, getYacht, inr } from "@/data/yachts";
import { destinations } from "@/data/destinations";
import { buildMetadata, breadcrumbSchema, faqSchema } from "@/lib/seo";
import { site, whatsappLink, telLink } from "@/lib/site";

/** Pre-renders all nine boat pages at build time — instant TTFB, perfect CWV. */
export function generateStaticParams() {
  return yachts.map((y) => ({ slug: y.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const yacht = getYacht(slug);
  if (!yacht) return buildMetadata({ title: "Boat not found", description: "", noIndex: true });

  const where = yacht.destinations
    .map((d) => destinations.find((x) => x.slug === d)?.name ?? d)
    .join(" & ");

  const cheapestSlot = yacht.pricingSlots?.length
    ? yacht.pricingSlots.reduce((min, s) => (s.amount < min.amount ? s : min))
    : null;
  const priceLine = cheapestSlot
    ? `From ${inr(cheapestSlot.amount)} for a 2-hour slot`
    : `From ${inr(yacht.pricePerHour)} per hour`;

  return buildMetadata({
    title: `${yacht.name} — ${yacht.category} Charter in ${where}`,
    description: `Charter the ${yacht.name}, a ${yacht.lengthFt}ft ${yacht.category.toLowerCase()} for up to ${yacht.guests} guests in ${where}. ${priceLine} with captain and crew.`,
    path: `/fleet/${yacht.slug}`,
    image: yacht.gallery[0].src,
  });
}

export default async function YachtPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const yacht = getYacht(slug);
  if (!yacht) notFound();

  const places = yacht.destinations.map((d) => destinations.find((x) => x.slug === d)!).filter(Boolean);
  const breadcrumb = [
    { name: "Home", path: "/" },
    { name: "Fleet", path: "/fleet" },
    { name: yacht.name, path: `/fleet/${yacht.slug}` },
  ];

  // When a boat is priced by time slot rather than a flat hourly rate, the
  // schema (and the booking card below) quote the cheapest slot instead of
  // `pricePerHour` — otherwise the rich result shows a number that contradicts
  // the pricing table right there on the page.
  const cheapestSlot = yacht.pricingSlots?.length
    ? yacht.pricingSlots.reduce((min, s) => (s.amount < min.amount ? s : min))
    : null;

  const productSchema = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: `${yacht.name} yacht charter`,
    description: yacht.tagline,
    // Absolute URLs — schema.org validators reject relative image paths.
    image: yacht.gallery.map((g) => new URL(g.src, site.url).toString()),
    brand: { "@type": "Brand", name: site.name },
    offers: {
      "@type": "Offer",
      price: cheapestSlot ? cheapestSlot.amount : yacht.pricePerHour,
      priceCurrency: "INR",
      availability: "https://schema.org/InStock",
      url: `${site.url}/fleet/${yacht.slug}`,
      seller: { "@id": `${site.url}/#business` },
    },
  };

  const similar = yachts
    .filter((y) => y.slug !== yacht.slug && y.destinations.some((d) => yacht.destinations.includes(d)))
    .slice(0, 3);

  const specs = [
    { icon: <UsersIcon className="h-4 w-4" />, label: "Guests", value: `${yacht.guests}` },
    { icon: <RulerIcon className="h-4 w-4" />, label: "Length", value: `${yacht.lengthFt} ft` },
    { icon: <BedIcon className="h-4 w-4" />, label: "Cabins", value: `${yacht.cabins}` },
    { icon: <AnchorIcon className="h-4 w-4" />, label: "Crew", value: `${yacht.crew}` },
    { icon: <PinIcon className="h-4 w-4" />, label: "Based in", value: places.map((p) => p.shortName).join(", ") },
  ];

  return (
    <>
      <JsonLd data={[breadcrumbSchema(breadcrumb), productSchema, faqSchema(yacht.faqs)]} />

      {/* Breadcrumb + title, on white — the photography carries the page from
          here, so there is no dark hero competing with it. */}
      <div className="border-b border-line bg-white">
        <div className="container-x py-6">
          <nav aria-label="Breadcrumb">
            <ol className="flex flex-wrap items-center gap-2 text-xs text-faint">
              {breadcrumb.map((b, i) => (
                <li key={b.path} className="flex items-center gap-2">
                  {i > 0 && <span aria-hidden="true">/</span>}
                  {i === breadcrumb.length - 1 ? (
                    <span className="text-muted">{b.name}</span>
                  ) : (
                    <Link href={b.path} className="transition-colors hover:text-crimson">{b.name}</Link>
                  )}
                </li>
              ))}
            </ol>
          </nav>

          <div className="mt-4 flex flex-wrap items-end justify-between gap-4">
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <Pill tone="crimson">{yacht.category}</Pill>
                {places.map((p) => (
                  <Pill key={p.slug}>{p.name}</Pill>
                ))}
              </div>
              <h1 className="mt-3 text-3xl md:text-[2.6rem]">{yacht.name}</h1>
              <p className="mt-2 max-w-2xl text-muted">{yacht.tagline}</p>
            </div>

            <div className="flex items-center gap-1.5 text-sm text-muted">
              <span className="flex text-[#FBBC05]">
                {[...Array(5)].map((_, i) => <StarIcon key={i} className="h-4 w-4" />)}
              </span>
              <span>{site.rating.value} · {site.rating.count} reviews</span>
            </div>
          </div>
        </div>
      </div>

      {/* ================= GALLERY + BOOKING ================= */}
      <section className="py-8 md:py-10">
        <div className="container-x grid gap-8 lg:grid-cols-[1fr_23rem] lg:items-start lg:gap-10">
          <div className="min-w-0">
            <Gallery shots={yacht.gallery} priority />
          </div>

          {/* Sticky booking card — the conversion anchor for the page */}
          <aside className="lg:sticky lg:top-28">
            <div className="rounded-2xl border border-line bg-white p-6 shadow-[var(--shadow-card)]">
              <div className="flex items-end justify-between">
                <div>
                  {cheapestSlot ? (
                    <>
                      <span className="text-sm text-muted">From </span>
                      <span className="font-display text-3xl font-semibold text-navy">{inr(cheapestSlot.amount)}</span>
                    </>
                  ) : (
                    <>
                      {yacht.wasPricePerHour && (
                        <span className="mr-2 text-sm text-faint line-through">{inr(yacht.wasPricePerHour)}</span>
                      )}
                      <span className="font-display text-3xl font-semibold text-navy">{inr(yacht.pricePerHour)}</span>
                      <span className="text-sm text-muted"> /hour</span>
                    </>
                  )}
                </div>
                <Pill tone="teal">{cheapestSlot ? "2 hr slots" : "2 hr minimum"}</Pill>
              </div>

              {cheapestSlot && (
                <a href="#pricing" className="mt-1 inline-block text-xs font-medium text-crimson hover:underline">
                  See full slot pricing ↓
                </a>
              )}

              <p className="mt-3 text-xs leading-relaxed text-muted">
                Includes captain, crew, fuel for the standard route and life jackets for
                every guest.
              </p>

              <dl className="mt-5 grid grid-cols-2 gap-3 border-t border-line pt-5">
                {specs.slice(0, 4).map((s) => (
                  <div key={s.label} className="flex items-center gap-2.5">
                    <span className="text-teal">{s.icon}</span>
                    <div>
                      <dt className="text-[11px] uppercase tracking-wide text-faint">{s.label}</dt>
                      <dd className="text-sm font-semibold text-navy">{s.value}</dd>
                    </div>
                  </div>
                ))}
              </dl>

              <div className="mt-6 space-y-2.5">
                <a
                  href={whatsappLink(`Hi Saildeck! Is the ${yacht.name} available? I would like to check dates and pricing.`)}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-cta="yacht-whatsapp"
                  className="flex w-full items-center justify-center gap-2 rounded-full bg-[#25D366] px-6 py-3.5 font-semibold text-[#04210f] transition-all hover:-translate-y-0.5"
                >
                  <WhatsAppIcon className="h-5 w-5" />
                  Check availability
                </a>
                <a
                  href="#enquire"
                  data-cta="yacht-form-jump"
                  className="flex w-full items-center justify-center gap-2 rounded-full bg-crimson px-6 py-3.5 font-medium text-white transition-all hover:-translate-y-0.5 hover:bg-crimson-dark"
                >
                  Send an enquiry <ArrowIcon className="h-4 w-4" />
                </a>
                <a
                  href={telLink}
                  data-cta="yacht-call"
                  className="flex w-full items-center justify-center gap-2 rounded-full border border-line px-6 py-3.5 text-sm font-medium text-navy transition-colors hover:border-crimson hover:text-crimson"
                >
                  <PhoneIcon className="h-4 w-4" />
                  {site.phoneDisplay}
                </a>
              </div>
            </div>
          </aside>
        </div>
      </section>

      {/* ================= SPEC STRIP ================= */}
      <div className="border-y border-line bg-surface">
        <div className="container-x grid grid-cols-2 gap-6 py-6 sm:grid-cols-3 lg:grid-cols-5">
          {specs.map((s) => (
            <div key={s.label} className="flex items-center gap-3">
              <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-white text-teal shadow-sm">{s.icon}</span>
              <div className="min-w-0">
                <div className="text-[11px] uppercase tracking-wide text-faint">{s.label}</div>
                <div className="truncate font-display text-base font-semibold text-navy">{s.value}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ================= DESCRIPTION ================= */}
      <section className="py-14 md:py-18">
        <div className="container-x grid gap-12 lg:grid-cols-[1.15fr_1fr] lg:items-start lg:gap-16">
          <Reveal>
            <SectionTitle eyebrow="On board" title={`About the`} accent={yacht.name} />

            {yacht.description ? (
              /* Hand-written copy for this boat — the text Google indexes. */
              <div className="mt-6 space-y-4 leading-relaxed text-muted">
                {yacht.description.map((para, i) => (
                  <p key={i}><RichText text={para} /></p>
                ))}
              </div>
            ) : (
            <div className="mt-6 space-y-4 leading-relaxed text-muted">
              <p>
                The {yacht.name} is a {yacht.lengthFt}-foot {yacht.category.toLowerCase()} chartered by
                the hour with a licensed captain and {yacht.crew} crew, carrying up to{" "}
                {yacht.guests} guests
                {places.length > 1
                  ? ` from either ${places.map((p) => p.name).join(" or ")}`
                  : ` from ${places[0]?.name}`}
                . {yacht.tagline}
              </p>
              <p>
                Rates cover the crew, fuel for the standard route and life jackets for
                everyone aboard. Catering, decoration, photography and water sports are
                quoted separately and confirmed in writing before you pay a deposit — so
                there is never a second bill waiting at the jetty.
              </p>
              <p>
                Boarding is by tender from the jetty and takes about ten minutes. The
                captain holds final authority on route, timing and whether conditions
                permit sailing at all; if the coast guard suspends movement on your date,
                your charter moves to another day at no cost.
              </p>
            </div>
            )}

            {yacht.pricingSlots && yacht.pricingSlots.length > 0 && (
              <div id="pricing" className="scroll-mt-28">
                <h3 className="mt-10 font-display text-xl">Pricing &amp; slots</h3>
                <PricingTable
                  slots={yacht.pricingSlots}
                  extras={yacht.pricingExtras}
                  note={yacht.pricingNote}
                />
              </div>
            )}

            <h3 className="mt-10 font-display text-xl">What is on board</h3>
            <ul className="mt-5 grid gap-3 sm:grid-cols-2">
              {yacht.amenities.map((a) => (
                <li key={a} className="flex items-center gap-3 text-sm text-muted">
                  <span className="grid h-5 w-5 shrink-0 place-items-center rounded-full bg-teal-soft text-teal">
                    <CheckIcon className="h-3 w-3" />
                  </span>
                  {a}
                </li>
              ))}
            </ul>

            <div className="mt-10 rounded-2xl border border-line bg-surface p-6">
              <h3 className="font-display text-base font-semibold">Good to know</h3>
              <ul className="mt-3 space-y-2 text-sm leading-relaxed text-muted">
                <li>· Two-hour minimum on weekends and public holidays, one hour midweek.</li>
                <li>· Guest capacity is fixed by the vessel licence and cannot be exceeded.</li>
                <li>· Charter season runs October to May; the monsoon closes operations.</li>
                <li>· Weather cancellations called by the coast guard are rescheduled free.</li>
              </ul>
            </div>

            {yacht.specs && yacht.specs.length > 0 && (
              <>
                {/* Plain label/value text lines rather than a table — a fixed
                    two-column table forced a horizontal scroll on phones with
                    long values (e.g. "Commercial passenger licence"). Each
                    line wraps on its own now, so nothing is ever cropped. */}
                <h3 className="mt-10 font-display text-xl">Specifications</h3>
                <dl className="mt-4 divide-y divide-line text-sm">
                  {yacht.specs.map((s) => (
                    <div key={s.label} className="py-3">
                      <dt className="text-faint">{s.label}</dt>
                      <dd className="mt-0.5 font-medium text-navy">{s.value}</dd>
                    </div>
                  ))}
                </dl>
              </>
            )}
          </Reveal>

          <Reveal delay={120} className="lg:sticky lg:top-28">
            <div id="enquire" className="scroll-mt-28">
              <h2 className="mb-4 font-display text-xl">Check {yacht.name} availability</h2>
              <EnquiryForm preset="Yacht charter" />
            </div>
          </Reveal>
        </div>
      </section>

      {/* ================= VIDEOS ================= */}
      <VideoSection
        videos={yacht.videos}
        title="See the"
        accent={yacht.name}
        eyebrow="Video"
      />

      {/* ================= FAQ ================= */}
      <section className="border-t border-line py-14 md:py-20">
        <div className="container-x">
          <Reveal>
            <SectionTitle
              align="center"
              eyebrow="Questions"
              title={`${yacht.name}`}
              accent="frequently asked"
              sub="The things people ask before booking this boat. If yours is not here, message us — a real person answers."
            />
          </Reveal>
          <Reveal delay={100}>
            <div className="mx-auto mt-10 max-w-3xl">
              <Faq faqs={yacht.faqs} />
            </div>
          </Reveal>
        </div>
      </section>

      {/* ================= SIMILAR ================= */}
      {similar.length > 0 && (
        <section className="border-t border-line bg-surface py-14 md:py-20">
          <div className="container-x">
            <Reveal>
              <div className="flex flex-wrap items-end justify-between gap-6">
                <SectionTitle eyebrow="Alternatives" title="Also worth a" accent="look" />
                <Link href="/fleet" className="inline-flex items-center gap-2 text-sm font-medium text-crimson transition-all hover:gap-3">
                  All boats <ArrowIcon className="h-4 w-4" />
                </Link>
              </div>
            </Reveal>
            <div className="mt-10 grid gap-6 md:grid-cols-3">
              {similar.map((y, i) => (
                <Reveal key={y.slug} delay={i * 80}>
                  <YachtCard yacht={y} />
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      )}

      <CtaBand
        title={`Hold the`}
        accent={`${yacht.name}?`}
        sub="Tell us your date and we will confirm whether she is free, usually within the hour."
        whatsappMessage={`Hi Saildeck! I would like to book the ${yacht.name}.`}
      />
    </>
  );
}
