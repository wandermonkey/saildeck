import type { Metadata } from "next";

import { PageHero } from "@/components/PageHero";
import { HubGrid } from "@/components/HubGrid";
import { CtaBand } from "@/components/CtaBand";
import { JsonLd } from "@/components/JsonLd";
import { Reveal } from "@/components/Reveal";
import { EnquiryForm } from "@/components/EnquiryForm";
import { SectionTitle } from "@/components/ui";

import { managementServices } from "@/data/pages";
import { buildMetadata, breadcrumbSchema } from "@/lib/seo";
import { site } from "@/lib/site";

export const metadata: Metadata = buildMetadata({
  title: "Yacht Management Services in India — Building, Refit, Storage & Marinas",
  description:
    "Saildeck owner services: boat building, marina consultancy, yacht timeshare, yacht management, refit and repair, monsoon storage and visiting yacht support across India.",
  path: "/management",
});

const breadcrumb = [
  { name: "Home", path: "/" },
  { name: "About Us", path: "/about" },
  { name: "Management", path: "/management" },
];

export default function ManagementPage() {
  const itemList = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Saildeck management services",
    itemListElement: managementServices.map((p, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: `${p.title} ${p.accent ?? ""}`.trim(),
      url: `${site.url}${p.href}`,
    })),
  };

  return (
    <>
      <JsonLd data={[breadcrumbSchema(breadcrumb), itemList]} />

      <PageHero
        breadcrumb={breadcrumb}
        eyebrow="Management"
        title="Owner services,"
        accent="end to end"
        sub="Owning a boat in India is largely an administrative job punctuated by occasional sailing. We take the administration — building, managing, refitting, storing and, when it comes to it, selling."
        image="https://images.unsplash.com/photo-1516132006923-6cf348e5dee2?auto=format&fit=crop&w=2000&q=80"
        imageAlt="Boat under construction and maintenance in a boatyard"
        compact
        facts={[
          { label: "Services", value: `${managementServices.length}` },
          { label: "Haul-out", value: "Up to 60 ft" },
          { label: "Build", value: "Up to 40 ft" },
          { label: "Coverage", value: "Pan-India" },
        ]}
      />

      <section className="py-14 md:py-20">
        <div className="container-x">
          <Reveal>
            <SectionTitle
              align="center"
              eyebrow="What we do"
              title="Seven ways we look after"
              accent="a boat"
              sub="Most owners start with one of these and end up using three. They are priced and contracted separately, so you only take what you need."
            />
          </Reveal>
          <div className="mt-11">
            <HubGrid pages={managementServices} />
          </div>
        </div>
      </section>

      <section className="border-t border-line bg-surface py-14 md:py-20">
        <div className="container-x grid gap-12 lg:grid-cols-[1.1fr_1fr] lg:items-start lg:gap-16">
          <Reveal>
            <SectionTitle eyebrow="The honest version" title="What ownership actually" accent="costs" />
            <div className="mt-6 space-y-4 leading-relaxed text-muted">
              <p>
                As a planning figure, budget annual running costs at roughly ten percent
                of the vessel&apos;s value. It is a blunt instrument, but across a decade of
                Indian ownership it holds up better than any more precise-sounding number.
              </p>
              <p>
                Crew salaries are usually the largest single line, followed by berthing,
                insurance and the annual monsoon haul-out. Fuel is often smaller than
                people expect, because most boats here run fewer hours than their owners
                imagined when they bought them.
              </p>
              <p>
                Three things genuinely reduce it: buying smaller than you first intended,
                chartering the boat out when you are not using it, or buying a share
                rather than the whole vessel. Deferring maintenance is not one of them.
              </p>
            </div>
          </Reveal>

          <Reveal delay={120} className="lg:sticky lg:top-28">
            <div id="enquire" className="scroll-mt-28">
              <h2 className="mb-4 font-display text-xl">Talk to us about your boat</h2>
              <EnquiryForm preset="Yacht management" compact />
            </div>
          </Reveal>
        </div>
      </section>

      <CtaBand whatsappMessage="Hi Saildeck! I would like to talk about management services for my boat." />
    </>
  );
}
