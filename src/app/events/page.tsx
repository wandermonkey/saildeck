import type { Metadata } from "next";

import { PageHero } from "@/components/PageHero";
import { EventsGrid } from "@/components/EventsGrid";
import { CtaBand } from "@/components/CtaBand";
import { JsonLd } from "@/components/JsonLd";
import { Reveal } from "@/components/Reveal";

import { events } from "@/data/events";
import { buildMetadata, breadcrumbSchema } from "@/lib/seo";
import { site } from "@/lib/site";

export const metadata: Metadata = buildMetadata({
  title: "Events — Parties & Themed Cruises in Mumbai",
  description:
    "Ticketed yacht parties and themed cruises in Mumbai — sunset music cruises, New Year's Eve, full moon sailing and more. Book your spot on WhatsApp.",
  path: "/events",
});

const breadcrumb = [
  { name: "Home", path: "/" },
  { name: "Events", path: "/events" },
];

export default function EventsPage() {
  const eventListJsonLd = events.map((e) => ({
    "@context": "https://schema.org",
    "@type": "Event",
    name: e.title,
    startDate: e.dateISO,
    eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
    eventStatus: "https://schema.org/EventScheduled",
    location: {
      "@type": "Place",
      name: e.location,
      address: e.location,
    },
    image: new URL(e.image, site.url).toString(),
    description: e.description,
    offers: {
      "@type": "Offer",
      price: e.price,
      priceCurrency: "INR",
      availability:
        e.booked >= e.capacity ? "https://schema.org/SoldOut" : "https://schema.org/InStock",
      url: `${site.url}/events`,
    },
  }));

  return (
    <>
      <JsonLd data={[breadcrumbSchema(breadcrumb), ...eventListJsonLd]} />

      <PageHero
        breadcrumb={breadcrumb}
        eyebrow="Events"
        title="Parties & cruises,"
        accent="one ticket away."
        sub="Ticketed nights out on the water — sunset music cruises, themed parties and seasonal specials. Pick a date, check the spots left, and book your place on WhatsApp."
        image="https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=2000&q=80"
        imageAlt="Guests enjoying a party on a yacht deck at sunset"
        compact
        facts={[
          { label: "Events", value: `${events.length}` },
          { label: "From", value: "₹1,000" },
          { label: "Where", value: "Gateway of India, Mumbai" },
          { label: "Book via", value: "WhatsApp" },
        ]}
      />

      <section className="py-14 md:py-20">
        <div className="container-x">
          <Reveal>
            <EventsGrid events={events} />
          </Reveal>
        </div>
      </section>

      <CtaBand
        title="Hosting your own night out?"
        accent="Let's build it together."
        whatsappMessage="Hi Saildeck! I'd like to ask about hosting a private event on one of your boats."
      />
    </>
  );
}
