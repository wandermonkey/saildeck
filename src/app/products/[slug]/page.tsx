import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";

import { Gallery } from "@/components/Gallery";
import { ProductCard } from "@/components/ProductCard";
import { EnquiryForm } from "@/components/EnquiryForm";
import { CtaBand } from "@/components/CtaBand";
import { Faq } from "@/components/Faq";
import { JsonLd } from "@/components/JsonLd";
import { Reveal } from "@/components/Reveal";
import { RichText } from "@/components/RichText";
import { Button, SectionTitle, Pill } from "@/components/ui";
import { ArrowIcon, WhatsAppIcon, CheckIcon } from "@/components/icons";

import { products, getProduct } from "@/data/products";
import { buildMetadata, breadcrumbSchema, faqSchema, serviceSchema } from "@/lib/seo";
import { whatsappLink } from "@/lib/site";

export function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) return buildMetadata({ title: "Not found", description: "", noIndex: true });

  return buildMetadata({
    title: product.seoTitle,
    description: product.seoDescription,
    path: `/products/${product.slug}`,
    image: product.gallery[0].src,
  });
}

/**
 * Experience landing page — intentionally light for now.
 *
 * Each of these is a distinct search intent with its own URL, banner and copy,
 * but the body below the fold is the shared enquiry path rather than bespoke
 * content. The per-experience detail (inclusions, pricing) comes later; until
 * it does, every page still converts, because the form and the WhatsApp button
 * are the whole point of the page.
 *
 * LAYOUT: the title sits on white ABOVE the banner rather than in a frosted
 * panel over it. These pages sell an atmosphere, so the photograph has to be
 * seen whole — the same reasoning behind the boat pages, where the gallery
 * carries the page and no scrim competes with it.
 */
export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) notFound();

  const breadcrumb = [
    { name: "Home", path: "/" },
    { name: "Experiences", path: "/products" },
    { name: product.name, path: `/products/${product.slug}` },
  ];

  const others = products.filter((p) => p.slug !== product.slug).slice(0, 4);

  return (
    <>
      <JsonLd
        data={[
          breadcrumbSchema(breadcrumb),
          serviceSchema({
            name: product.name,
            description: product.seoDescription,
            path: `/products/${product.slug}`,
            image: product.gallery[0].src,
          }),
          ...(product.faqs && product.faqs.length > 0 ? [faqSchema(product.faqs)] : []),
        ]}
      />

      {/* Title block, on white. The banner follows it uncovered. */}
      <div className="border-b border-line bg-white">
        <div className="container-x py-6 md:py-8">
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

          <div className="mt-4 flex flex-wrap items-end justify-between gap-5">
            <div className="min-w-0">
              <Pill tone="crimson">{product.category}</Pill>
              <h1 className="mt-3 text-3xl md:text-[2.6rem]">{product.name}</h1>
              <p className="mt-2 max-w-2xl text-muted">{product.teaser}</p>
            </div>

            <div className="flex flex-wrap gap-3">
              <Button
                href={whatsappLink(product.whatsappMessage)}
                variant="whatsapp"
                external
                dataCta="product-hero-whatsapp"
              >
                <WhatsAppIcon className="h-5 w-5" />
                Chat on WhatsApp
              </Button>
              <Button href="#enquire" variant="outline" dataCta="product-hero-cta">
                Send an enquiry <ArrowIcon className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Stat strip — only for pages that set `facts`, e.g. a price range
          worth surfacing before the fold rather than buried in the copy. */}
      {product.facts && product.facts.length > 0 && (
        <div className="border-b border-line bg-surface">
          <div className="container-x grid grid-cols-2 gap-6 py-6 sm:grid-cols-4">
            {product.facts.map((f) => (
              <div key={f.label}>
                <div className="text-[11px] font-semibold uppercase tracking-wider text-faint">{f.label}</div>
                <div className="mt-1 font-display text-lg font-semibold text-navy">{f.value}</div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Banner. A gallery of several curated same-ratio shots gets the
          carousel, cropped to a consistent wide frame. A single real photo —
          often portrait, never shot to a banner ratio — renders at its own
          intrinsic size instead, so nothing is cropped off it. */}
      <section className="py-6 md:py-8">
        <div className="container-x">
          {product.gallery.length === 1 && product.gallery[0].width && product.gallery[0].height ? (
            <div className="mx-auto overflow-hidden rounded-2xl bg-surface" style={{ maxWidth: product.gallery[0].width }}>
              <Image
                src={product.gallery[0].src}
                alt={product.gallery[0].alt}
                width={product.gallery[0].width}
                height={product.gallery[0].height}
                priority
                sizes="(max-width: 1024px) 100vw, 60rem"
                className="h-auto w-full"
              />
            </div>
          ) : (
            <Gallery
              shots={product.gallery}
              priority
              aspectClass="aspect-[4/3] sm:aspect-[16/9] lg:aspect-[21/9]"
            />
          )}
        </div>
      </section>

      <section className="pb-14 pt-6 md:pb-20 md:pt-8">
        <div className="container-x grid gap-12 lg:grid-cols-[1fr_23rem] lg:items-start lg:gap-16">
          <div className="min-w-0">
            <Reveal>
              <SectionTitle eyebrow="The idea" title="About this" accent="experience" />
              <p className="mt-6 leading-relaxed text-muted">{product.intro}</p>
            </Reveal>

            {/* Long-form detail — only pages with real search demand and a
                lot to say (see products.ts) set `sections`. */}
            {product.sections?.map((s, i) => {
              const paragraphs = Array.isArray(s.body) ? s.body : [s.body];
              return (
                <Reveal key={s.heading} delay={100 + i * 40}>
                  <div className="mt-12">
                    <h2 className="text-2xl md:text-[1.75rem]">{s.heading}</h2>
                    <div className="mt-4 space-y-4 leading-relaxed text-muted">
                      {paragraphs.map((p, pi) => (
                        <p key={pi}><RichText text={p} /></p>
                      ))}
                    </div>
                    {s.bullets && (
                      <ul className="mt-6 grid gap-3 sm:grid-cols-2">
                        {s.bullets.map((b) => (
                          <li key={b} className="flex items-start gap-3 text-sm text-muted">
                            <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-teal-soft text-teal">
                              <CheckIcon className="h-3 w-3" />
                            </span>
                            <RichText text={b} />
                          </li>
                        ))}
                      </ul>
                    )}
                    {s.image && (
                      <figure className="mt-7">
                        {s.image.width && s.image.height ? (
                          // Sized to the photo's own aspect ratio — nothing
                          // cropped off a portrait or square shot to force it
                          // into a fixed landscape frame.
                          <div className="overflow-hidden rounded-2xl bg-surface" style={{ maxWidth: s.image.width }}>
                            <Image
                              src={s.image.src}
                              alt={s.image.alt}
                              width={s.image.width}
                              height={s.image.height}
                              sizes="(max-width: 1024px) 100vw, 60vw"
                              className="h-auto w-full"
                            />
                          </div>
                        ) : (
                          <div className="relative aspect-[16/9] overflow-hidden rounded-2xl bg-surface">
                            <Image
                              src={s.image.src}
                              alt={s.image.alt}
                              fill
                              sizes="(max-width: 1024px) 100vw, 60vw"
                              className="object-cover"
                            />
                          </div>
                        )}
                        {s.image.caption && (
                          <figcaption className="mt-2.5 text-xs text-faint">{s.image.caption}</figcaption>
                        )}
                      </figure>
                    )}
                  </div>
                </Reveal>
              );
            })}

            {/* Boat / price tiers — e.g. compact sail boats through luxury motor yachts. */}
            {product.pricingTiers && product.pricingTiers.length > 0 && (
              <Reveal delay={140}>
                <div className="mt-12">
                  <h2 className="text-2xl md:text-[1.75rem]">Boats and pricing</h2>
                  <div className="mt-6 grid gap-4 sm:grid-cols-3">
                    {product.pricingTiers.map((t) => (
                      <div key={t.label} className="rounded-2xl border border-line bg-white p-5">
                        <h3 className="font-display text-base font-semibold text-navy">{t.label}</h3>
                        <div className="mt-2">
                          <span className="font-display text-xl font-semibold text-crimson">{t.price}</span>
                          {t.unit && <span className="ml-1 text-xs text-muted">{t.unit}</span>}
                        </div>
                        <p className="mt-2.5 text-sm leading-relaxed text-muted">{t.description}</p>
                        {t.bestFor && (
                          <p className="mt-3 text-xs font-medium text-teal">Best for: {t.bestFor}</p>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </Reveal>
            )}

            {/* Add-on cards — decor, photography, catering, drone, etc. */}
            {product.addOns && product.addOns.length > 0 && (
              <Reveal delay={160}>
                <div className="mt-12">
                  <h2 className="text-2xl md:text-[1.75rem]">Add-ons</h2>
                  <div className="mt-6 grid gap-4 sm:grid-cols-2">
                    {product.addOns.map((a) => (
                      <div key={a.title} className="flex items-start justify-between gap-4 rounded-2xl border border-line bg-surface p-5">
                        <div className="min-w-0">
                          <h3 className="font-display text-sm font-semibold text-navy">{a.title}</h3>
                          <p className="mt-1.5 text-sm leading-relaxed text-muted">{a.description}</p>
                        </div>
                        <span className="shrink-0 rounded-full border border-crimson/25 bg-crimson-soft px-3 py-1 text-xs font-medium text-crimson">
                          {a.price}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </Reveal>
            )}

            <Reveal delay={80}>
              <div className="mt-12">
                <h2 className="text-2xl md:text-[1.75rem]">How booking works</h2>
                <ol className="mt-6 space-y-5">
                  {[
                    {
                      title: "Tell us the date and the head count",
                      body: "Message us or fill the form. The two things that decide everything else are when you want to go and how many people are coming.",
                    },
                    {
                      title: "We name a boat and a firm price",
                      body: "One recommendation rather than a catalogue, with the charter and any extras — decoration, catering, a photographer — priced as separate lines.",
                    },
                    {
                      title: "Confirm, and we set it up before you board",
                      body: "A deposit holds the slot. Everything agreed is in place on the boat by the time you reach the jetty.",
                    },
                  ].map((step, i) => (
                    <li key={step.title} className="flex gap-4">
                      <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-crimson-soft font-display text-sm font-semibold text-crimson">
                        {i + 1}
                      </span>
                      <div className="min-w-0">
                        <h3 className="font-display text-base font-semibold text-navy">{step.title}</h3>
                        <p className="mt-1 text-sm leading-relaxed text-muted">{step.body}</p>
                      </div>
                    </li>
                  ))}
                </ol>
              </div>
            </Reveal>

            <Reveal delay={120}>
              <div className="mt-12 rounded-2xl border border-line bg-surface p-6 md:p-7">
                <h2 className="font-display text-xl">Good to know</h2>
                <ul className="mt-4 space-y-2.5 text-sm leading-relaxed text-muted">
                  {(product.goodToKnow ?? [
                    "Charters are priced per boat, not per person — the rate is the same whether two or twenty travel.",
                    "Guest capacity is fixed by each vessel's licence and cannot be exceeded.",
                    "The season runs October to May; the southwest monsoon closes operations.",
                    "Weather cancellations called by the coast guard are rescheduled at no cost.",
                    "Decoration, catering, photography and permissions are quoted before any deposit.",
                  ]).map((g) => (
                    <li key={g}>· {g}</li>
                  ))}
                </ul>
              </div>
            </Reveal>

            {/* Long FAQ — only pages that set `faqs` get this section. */}
            {product.faqs && product.faqs.length > 0 && (
              <Reveal delay={140}>
                <div className="mt-14">
                  <SectionTitle eyebrow="Questions" title="Frequently" accent="asked" />
                  <div className="mt-6">
                    <Faq faqs={product.faqs} />
                  </div>
                </div>
              </Reveal>
            )}
          </div>

          <Reveal delay={120} className="lg:sticky lg:top-28">
            <div id="enquire" className="scroll-mt-28">
              <h2 className="mb-4 font-display text-xl">Enquire about this</h2>
              <EnquiryForm preset="Experience or event" compact />
            </div>
          </Reveal>
        </div>
      </section>

      <section className="border-t border-line bg-surface py-14 md:py-20">
        <div className="container-x">
          <Reveal>
            <SectionTitle eyebrow="More" title="Other" accent="experiences" />
          </Reveal>
          <div className="mt-9 grid grid-cols-2 gap-3 sm:gap-5 lg:grid-cols-4">
            {others.map((p, i) => (
              <Reveal key={p.slug} delay={(i % 4) * 70}>
                <ProductCard product={p} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <CtaBand
        title={`${product.name},`}
        accent="on your date."
        whatsappMessage={product.whatsappMessage}
      />
    </>
  );
}
