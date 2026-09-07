import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";

import { Gallery } from "@/components/Gallery";
import { ProductCard } from "@/components/ProductCard";
import { EnquiryForm } from "@/components/EnquiryForm";
import { CtaBand } from "@/components/CtaBand";
import { JsonLd } from "@/components/JsonLd";
import { Reveal } from "@/components/Reveal";
import { Button, SectionTitle, Pill } from "@/components/ui";
import { ArrowIcon, WhatsAppIcon } from "@/components/icons";

import { products, getProduct } from "@/data/products";
import { buildMetadata, breadcrumbSchema, serviceSchema } from "@/lib/seo";
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

      {/* Banner carousel. One shot today, a full gallery when Saildeck's own
          photography lands — the component grows arrows, a counter and a
          thumbnail strip on its own as soon as there is more than one. */}
      <section className="py-6 md:py-8">
        <div className="container-x">
          <Gallery
            shots={product.gallery}
            priority
            aspectClass="aspect-[4/3] sm:aspect-[16/9] lg:aspect-[21/9]"
          />
        </div>
      </section>

      <section className="pb-14 pt-6 md:pb-20 md:pt-8">
        <div className="container-x grid gap-12 lg:grid-cols-[1fr_23rem] lg:items-start lg:gap-16">
          <div className="min-w-0">
            <Reveal>
              <SectionTitle eyebrow="The idea" title="About this" accent="experience" />
              <p className="mt-6 leading-relaxed text-muted">{product.intro}</p>
            </Reveal>

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
                  <li>· Charters are priced per boat, not per person — the rate is the same whether two or twenty travel.</li>
                  <li>· Guest capacity is fixed by each vessel&apos;s licence and cannot be exceeded.</li>
                  <li>· The season runs October to May; the southwest monsoon closes operations.</li>
                  <li>· Weather cancellations called by the coast guard are rescheduled at no cost.</li>
                  <li>· Decoration, catering, photography and permissions are quoted before any deposit.</li>
                </ul>
              </div>
            </Reveal>
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
