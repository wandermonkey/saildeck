import type { Metadata } from "next";

import { PageHero } from "@/components/PageHero";
import { HubGrid } from "@/components/HubGrid";
import { CtaBand } from "@/components/CtaBand";
import { Faq } from "@/components/Faq";
import { JsonLd } from "@/components/JsonLd";
import { Reveal } from "@/components/Reveal";
import { EnquiryForm } from "@/components/EnquiryForm";
import { SectionTitle } from "@/components/ui";

import { yachtSalesPages } from "@/data/pages";
import { buildMetadata, breadcrumbSchema, faqSchema } from "@/lib/seo";
import { site } from "@/lib/site";

export const metadata: Metadata = buildMetadata({
  title: "Buy & Sell Yachts in India — Brokerage, New Builds & Valuations",
  description:
    "Buy or sell a yacht, sailing boat or speedboat in India. Independent survey, honest valuation, import and duty guidance, registration, berthing and ongoing management.",
  path: "/yachts",
});

const breadcrumb = [
  { name: "Home", path: "/" },
  { name: "Buy & Sell Yachts", path: "/yachts" },
];

const faqs = [
  {
    q: "Do you charge buyers or sellers?",
    a: "Sellers pay a commission on completion, agreed in writing before we list. There is no upfront fee and nothing to pay if the boat does not sell. Buyers pay us nothing.",
  },
  {
    q: "What is the biggest mistake people make buying a boat in India?",
    a: "Skipping the survey, and not checking the customs and import trail on a foreign-built hull. Missing import papers are the single most common reason a sale collapses at the final stage, and they hurt the next resale too.",
  },
  {
    q: "Can you handle the import of a boat bought overseas?",
    a: "Yes — freight, customs, duty, commissioning and registration. Get the duty position confirmed before you commit to the purchase rather than after; it materially changes the landed cost.",
  },
  {
    q: "Do you also manage the boat after I buy it?",
    a: "Yes. Most owners who buy through us also take management — crew, compliance, maintenance and berthing — and some place the vessel in our charter fleet to offset running costs.",
  },
];

export default function YachtsPage() {
  const itemList = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Saildeck yacht sales services",
    itemListElement: yachtSalesPages.map((p, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: `${p.title} ${p.accent ?? ""}`.trim(),
      url: `${site.url}${p.href}`,
    })),
  };

  return (
    <>
      <JsonLd data={[breadcrumbSchema(breadcrumb), itemList, faqSchema(faqs)]} />

      <PageHero
        breadcrumb={breadcrumb}
        eyebrow="Brokerage"
        title="Buy and sell"
        accent="yachts"
        sub="We are operators before we are brokers, which means our advice is shaped by what a boat costs to actually run in Indian waters — not by what is easiest to sell you this quarter."
        image="https://images.unsplash.com/photo-1574850802664-10ad30c3ed80?auto=format&fit=crop&w=2000&q=80"
        imageAlt="Yachts moored along a marina pontoon"
        facts={[
          { label: "Valuation", value: "Free" },
          { label: "Survey", value: "Independent" },
          { label: "Sizes", value: "16 – 100 ft" },
          { label: "After sale", value: "Management" },
        ]}
      />

      <section className="py-14 md:py-20">
        <div className="container-x">
          <Reveal>
            <SectionTitle
              align="center"
              eyebrow="Services"
              title="Whether you are buying"
              accent="or letting go"
            />
          </Reveal>
          <div className="mt-11">
            <HubGrid pages={yachtSalesPages} columns={2} />
          </div>
        </div>
      </section>

      <section className="border-y border-line bg-surface py-14 md:py-20">
        <div className="container-x grid gap-12 lg:grid-cols-[1.1fr_1fr] lg:items-start lg:gap-16">
          <Reveal>
            <SectionTitle eyebrow="Questions" title="Brokerage" accent="FAQ" />
            <div className="mt-8">
              <Faq faqs={faqs} />
            </div>
          </Reveal>
          <Reveal delay={120} className="lg:sticky lg:top-28">
            <div id="enquire" className="scroll-mt-28">
              <h2 className="mb-4 font-display text-xl">Talk to a broker</h2>
              <EnquiryForm preset="Buy a yacht or boat" compact />
            </div>
          </Reveal>
        </div>
      </section>

      <CtaBand
        title="Buying, selling,"
        accent="or just weighing it up?"
        sub="A conversation costs nothing and usually saves more than it should."
        whatsappMessage="Hi Saildeck! I would like to talk about buying or selling a boat."
      />
    </>
  );
}
