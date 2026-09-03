import type { Metadata } from "next";

import { PageHero } from "@/components/PageHero";
import { HubGrid } from "@/components/HubGrid";
import { CtaBand } from "@/components/CtaBand";
import { Faq } from "@/components/Faq";
import { JsonLd } from "@/components/JsonLd";
import { Reveal } from "@/components/Reveal";
import { EnquiryForm } from "@/components/EnquiryForm";
import { SectionTitle } from "@/components/ui";

import { sailingSchoolPages } from "@/data/pages";
import { buildMetadata, breadcrumbSchema, faqSchema } from "@/lib/seo";
import { site } from "@/lib/site";

export const metadata: Metadata = buildMetadata({
  title: "Sailing School in Mumbai & Goa — Learn to Sail and RYA Courses",
  description:
    "Learn to sail in Mumbai and Goa with certified instructors. Beginner dinghy and keelboat courses, junior sailing, internationally recognised RYA certification, gear and boats.",
  path: "/about/sailing-school",
});

const breadcrumb = [
  { name: "Home", path: "/" },
  { name: "About Us", path: "/about" },
  { name: "Sailing School", path: "/about/sailing-school" },
];

const faqs = [
  {
    q: "Do I need to know how to swim to learn sailing?",
    a: "No. Every student wears a buoyancy aid at all times and a safety boat is on the water throughout the session. Being comfortable in water helps your confidence but is not a requirement to start.",
  },
  {
    q: "What is the best age to start sailing?",
    a: "Children can join structured junior sailing from around eight, when they are big enough to handle a small dinghy. There is no upper limit — a meaningful share of our beginners are over fifty.",
  },
  {
    q: "When can I take a course?",
    a: "October to May. The southwest monsoon closes sailing on the west coast from June to September, and courses do not run in that window.",
  },
  {
    q: "Is an RYA certificate recognised outside India?",
    a: "Yes. RYA qualifications are the most widely recognised recreational sailing certificates in the world, and Day Skipper or above is what most overseas charter companies ask for before bareboat hire.",
  },
  {
    q: "What should I bring to my first lesson?",
    a: "Clothes that can get wet, shoes with grip, sun protection and a change of clothes. Boats, buoyancy aids and all equipment are provided.",
  },
];

export default function SailingSchoolPage() {
  const itemList = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Saildeck sailing school",
    itemListElement: sailingSchoolPages.map((p, i) => ({
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
        eyebrow="Sailing school"
        title="Learn to sail,"
        accent="properly"
        sub="Sailing is far easier to start than it looks and far harder to master than it looks, which is why it holds people for a lifetime. We put you on the helm on day one."
        image="https://images.unsplash.com/photo-1414437384035-787b9df782d7?auto=format&fit=crop&w=2000&q=80"
        imageAlt="Sailing boats out on the water during a lesson"
        facts={[
          { label: "Start age", value: "8 years+" },
          { label: "Group size", value: "Max 4 per boat" },
          { label: "Certification", value: "RYA route" },
          { label: "Season", value: "Oct – May" },
        ]}
      />

      <section className="py-14 md:py-20">
        <div className="container-x">
          <Reveal>
            <SectionTitle
              align="center"
              eyebrow="Programmes"
              title="From first lesson to"
              accent="first boat"
              sub="Start with a half-day taster and carry on as far as you want to. Most people who try it once come back."
            />
          </Reveal>
          <div className="mt-11">
            <HubGrid pages={sailingSchoolPages} columns={2} />
          </div>
        </div>
      </section>

      <section className="border-y border-line bg-surface py-14 md:py-20">
        <div className="container-x grid gap-12 lg:grid-cols-[1.1fr_1fr] lg:items-start lg:gap-16">
          <Reveal>
            <SectionTitle eyebrow="Questions" title="Before your first" accent="lesson" />
            <div className="mt-8">
              <Faq faqs={faqs} />
            </div>
          </Reveal>
          <Reveal delay={120} className="lg:sticky lg:top-28">
            <div id="enquire" className="scroll-mt-28">
              <h2 className="mb-4 font-display text-xl">Book a course</h2>
              <EnquiryForm preset="Sailing school" compact />
            </div>
          </Reveal>
        </div>
      </section>

      <CtaBand
        title="Try it once."
        accent="It is cheaper than you think."
        whatsappMessage="Hi Saildeck! I would like to learn to sail — can you send course details?"
      />
    </>
  );
}
