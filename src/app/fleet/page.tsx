import type { Metadata } from "next";

import { PageHero } from "@/components/PageHero";
import { FleetGrid } from "@/components/FleetGrid";
import { CtaBand } from "@/components/CtaBand";
import { JsonLd } from "@/components/JsonLd";
import { Reveal } from "@/components/Reveal";
import { Faq } from "@/components/Faq";
import { SectionTitle } from "@/components/ui";

import { yachts, inr } from "@/data/yachts";
import { buildMetadata, breadcrumbSchema, faqSchema } from "@/lib/seo";
import { site } from "@/lib/site";

export const metadata: Metadata = buildMetadata({
  title: "Our Fleet — Yachts & Boats for Charter in Mumbai, Navi Mumbai & Goa",
  description:
    "Browse the Saildeck fleet: nine yachts and catamarans for private charter in Mumbai, Navi Mumbai and Goa, from ₹11,900 per hour with captain and crew included.",
  path: "/fleet",
});

const breadcrumb = [
  { name: "Home", path: "/" },
  { name: "Fleet", path: "/fleet" },
];

const faqs = [
  {
    q: "How do I choose the right boat?",
    a: "Group size decides it more than anything else. Below about ₹14,000 an hour you are choosing between good options for up to twelve people; above that you are paying for deck space, a jacuzzi and room for a crowd. Tell us the occasion and head count and we will name one boat.",
  },
  {
    q: "Are the prices per person or per boat?",
    a: "Per boat, per hour. Four guests and fourteen guests pay the same rate on the same vessel, which is why the per-head cost falls sharply as your group grows.",
  },
  {
    q: "Can I see the boat before booking?",
    a: "In most cases yes, subject to the vessel not being out on charter. Ask us and we will arrange a viewing at the jetty.",
  },
  {
    q: "Does every boat operate from every city?",
    a: "No. Each listing shows the ports that boat works from. Some move between Mumbai and Goa seasonally, so availability in a given city depends on the date.",
  },
];

export default function FleetPage() {
  // ItemList markup helps Google read this as a browsable collection.
  const itemList = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Saildeck charter fleet",
    numberOfItems: yachts.length,
    itemListElement: yachts.map((y, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: y.name,
      url: `${site.url}/fleet/${y.slug}`,
    })),
  };

  return (
    <>
      <JsonLd data={[breadcrumbSchema(breadcrumb), itemList, faqSchema(faqs)]} />

      <PageHero
        breadcrumb={breadcrumb}
        eyebrow="The fleet"
        title="Nine boats,"
        accent="one standard"
        sub="Every boat here is one we run ourselves or know first-hand. Prices are per hour and include the captain, crew and fuel for the standard route."
        image="https://images.unsplash.com/photo-1727174674169-c2f484052437?auto=format&fit=crop&w=2000&q=80"
        imageAlt="Aerial view of yachts at anchor in a sheltered bay"
        compact
        facts={[
          { label: "Boats", value: `${yachts.length}` },
          { label: "From", value: `${inr(11900)}/hr` },
          { label: "Capacity", value: "10 – 30 guests" },
          { label: "Ports", value: "Mumbai · Goa · Navi Mumbai" },
        ]}
      />

      <section className="py-14 md:py-20">
        <div className="container-x">
          <Reveal>
            <FleetGrid yachts={yachts} />
          </Reveal>
        </div>
      </section>

      <section className="border-t border-line bg-surface py-14 md:py-20">
        <div className="container-x">
          <Reveal>
            <SectionTitle align="center" eyebrow="Questions" title="Choosing a" accent="boat" />
          </Reveal>
          <Reveal delay={100}>
            <div className="mx-auto mt-10 max-w-3xl">
              <Faq faqs={faqs} />
            </div>
          </Reveal>
        </div>
      </section>

      <CtaBand
        title="Pick a date,"
        accent="we will pick the boat."
        whatsappMessage="Hi Saildeck! I was looking at your fleet and would like help choosing a boat."
      />
    </>
  );
}
