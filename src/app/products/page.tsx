import type { Metadata } from "next";

import { PageHero } from "@/components/PageHero";
import { ProductGrid } from "@/components/ProductGrid";
import { CtaBand } from "@/components/CtaBand";
import { JsonLd } from "@/components/JsonLd";
import { Reveal } from "@/components/Reveal";
import { Faq } from "@/components/Faq";
import { SectionTitle } from "@/components/ui";

import { products } from "@/data/products";
import { buildMetadata, breadcrumbSchema, faqSchema } from "@/lib/seo";
import { site } from "@/lib/site";

export const metadata: Metadata = buildMetadata({
  title: "Experiences & Events — Dinners, Proposals, Shoots & Cruises on a Yacht",
  description:
    "Eleven ways to use a Saildeck boat: private dinners, proposals, sunset and sunrise cruises, birthdays, wedding shoots, film productions and photographer bookings in Mumbai and Goa.",
  path: "/products",
});

const breadcrumb = [
  { name: "Home", path: "/" },
  { name: "Experiences", path: "/products" },
];

const faqs = [
  {
    q: "Is an experience priced differently from a normal charter?",
    a: "The boat is charged the same way — per boat, per hour or per slot. What changes is what we add on top: decoration, catering, a cake, a photographer or a permission. Those are quoted as separate lines so you can see exactly what each one costs before you commit.",
  },
  {
    q: "Can I combine two of these?",
    a: "Almost always, and most people do. A proposal that becomes a dinner, or a sunset cruise with a photographer on board, is one booking rather than two. Tell us the shape of the evening and we will price it as a single charter.",
  },
  {
    q: "How far ahead should I book?",
    a: "For a sunset slot on a weekend, two to three weeks. For a weekday morning, a few days is usually enough. Proposals, shoots and anything needing a permission want more notice — a fortnight at minimum, more in December and January.",
  },
  {
    q: "Which boat will we be on?",
    a: "Whichever one suits the group size, the occasion and the date. Tell us the head count and what you are planning and we will name one boat rather than send you a list — that is the part we are actually useful for.",
  },
];

export default function ProductsPage() {
  // ItemList markup helps Google read this as a browsable collection.
  const itemList = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Saildeck experiences and events",
    numberOfItems: products.length,
    itemListElement: products.map((p, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: p.name,
      url: `${site.url}/products/${p.slug}`,
    })),
  };

  return (
    <>
      <JsonLd data={[breadcrumbSchema(breadcrumb), itemList, faqSchema(faqs)]} />

      <PageHero
        breadcrumb={breadcrumb}
        eyebrow="Experiences & events"
        title="Eleven experiences,"
        accent="one harbour."
        sub="Dinners, proposals, sunrise runs and film shoots — the reasons people actually book us, each one set up end to end by the same crew that runs the fleet."
        image="https://images.unsplash.com/photo-1774579891903-b48c080536b5?auto=format&fit=crop&w=2000&q=80"
        imageAlt="Two luxury yachts moored at a dock at sunset"
        compact
        facts={[
          { label: "Experiences", value: `${products.length}` },
          { label: "Most booked", value: "Sunset cruise" },
          { label: "Group size", value: "2 – 30 guests" },
          { label: "Ports", value: "Mumbai · Goa · Navi Mumbai" },
        ]}
      />

      <section className="py-14 md:py-20">
        <div className="container-x">
          <Reveal>
            <ProductGrid products={products} />
          </Reveal>
        </div>
      </section>

      <section className="border-t border-line bg-surface py-14 md:py-20">
        <div className="container-x">
          <Reveal>
            <SectionTitle align="center" eyebrow="Questions" title="Planning an" accent="occasion" />
          </Reveal>
          <Reveal delay={100}>
            <div className="mx-auto mt-10 max-w-3xl">
              <Faq faqs={faqs} />
            </div>
          </Reveal>
        </div>
      </section>

      <CtaBand
        title="Tell us the occasion,"
        accent="we will set the boat up."
        whatsappMessage="Hi Saildeck! I was looking at your experiences and would like to plan one."
      />
    </>
  );
}
