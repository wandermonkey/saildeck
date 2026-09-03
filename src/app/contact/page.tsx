import type { Metadata } from "next";

import { PageHero } from "@/components/PageHero";
import { EnquiryForm } from "@/components/EnquiryForm";
import { JsonLd } from "@/components/JsonLd";
import { Reveal } from "@/components/Reveal";
import { SectionTitle } from "@/components/ui";
import { WhatsAppIcon, PhoneIcon, MailIcon, AnchorIcon } from "@/components/icons";

import { marinas } from "@/data/company";
import { buildMetadata, breadcrumbSchema } from "@/lib/seo";
import { site, telLink, mailLink, whatsappLink } from "@/lib/site";

export const metadata: Metadata = buildMetadata({
  title: "Contact Saildeck — Charters, Speedboats & Marine Services",
  description:
    "Get in touch with Saildeck. WhatsApp +91 84248 48489 or email info@saildeck.com for yacht charters, speedboat transfers, brokerage, management and sailing courses.",
  path: "/contact",
});

const breadcrumb = [
  { name: "Home", path: "/" },
  { name: "Contact", path: "/contact" },
];

export default function ContactPage() {
  return (
    <>
      <JsonLd data={breadcrumbSchema(breadcrumb)} />

      <PageHero
        breadcrumb={breadcrumb}
        eyebrow="Get in touch"
        title="Tell us what you need."
        accent="We will do the rest."
        sub="Two fields are genuinely required: your name and a number we can reach you on. Everything else just helps us quote faster."
        image="https://images.unsplash.com/photo-1676629147275-c306d03fe4fa?auto=format&fit=crop&w=2000&q=80"
        imageAlt="A boat under way across golden water seen from above"
        compact
      />

      <section className="py-14 md:py-20">
        <div className="container-x grid gap-12 lg:grid-cols-[1fr_1.25fr] lg:items-start lg:gap-16">
          <Reveal>
            <div className="space-y-4">
              <a
                href={whatsappLink()}
                target="_blank"
                rel="noopener noreferrer"
                data-cta="contact-whatsapp"
                className="card card-hover group flex items-start gap-5 p-6"
              >
                <span className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-[#25D366]/12 text-[#25D366]">
                  <WhatsAppIcon className="h-6 w-6" />
                </span>
                <div>
                  <h2 className="font-display text-lg">WhatsApp</h2>
                  <p className="mt-1.5 text-sm leading-relaxed text-muted">
                    The fastest route. Send your date and group size — we reply with
                    options and a price, usually within the hour.
                  </p>
                  <span className="mt-2.5 inline-block text-sm font-semibold text-[#1da851]">{site.phoneDisplay}</span>
                </div>
              </a>

              <a href={telLink} data-cta="contact-call" className="card card-hover group flex items-start gap-5 p-6">
                <span className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-crimson-soft text-crimson">
                  <PhoneIcon className="h-5 w-5" />
                </span>
                <div>
                  <h2 className="font-display text-lg">Call us</h2>
                  <p className="mt-1.5 text-sm leading-relaxed text-muted">
                    Open every day, 7am to 10pm. Best if your date is within 48 hours.
                  </p>
                  <span className="mt-2.5 inline-block text-sm font-semibold text-crimson">{site.phoneDisplay}</span>
                </div>
              </a>

              <a href={mailLink} data-cta="contact-mail" className="card card-hover group flex items-start gap-5 p-6">
                <span className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-teal-soft text-teal">
                  <MailIcon className="h-5 w-5" />
                </span>
                <div>
                  <h2 className="font-display text-lg">Email</h2>
                  <p className="mt-1.5 text-sm leading-relaxed text-muted">
                    Best for detailed enquiries, corporate bookings and anything needing
                    documents attached.
                  </p>
                  <span className="mt-2.5 inline-block text-sm font-semibold text-teal">{site.email}</span>
                </div>
              </a>

              <div className="card flex items-start gap-5 p-6">
                <span className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-navy/8 text-navy">
                  <AnchorIcon />
                </span>
                <div>
                  <h2 className="font-display text-lg">Registered address</h2>
                  <address className="mt-1.5 text-sm not-italic leading-relaxed text-muted">
                    {site.legalName}
                    <br />
                    {site.address.street}
                    <br />
                    {site.address.city} {site.address.postalCode}, {site.address.state}
                  </address>
                </div>
              </div>
            </div>
          </Reveal>

          <Reveal delay={120}>
            <h2 className="mb-4 font-display text-2xl">Send an enquiry</h2>
            <EnquiryForm />
          </Reveal>
        </div>
      </section>

      {/* Boarding points */}
      <section className="border-t border-line bg-surface py-14 md:py-20">
        <div className="container-x">
          <Reveal>
            <SectionTitle
              eyebrow="Boarding points"
              title="Where to"
              accent="meet your boat"
              sub="Your exact jetty and reporting time are confirmed on the booking sheet the day before you sail."
            />
          </Reveal>

          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {marinas.map((m, i) => (
              <Reveal key={m.name} delay={(i % 3) * 60}>
                <div className="card h-full p-6">
                  <p className="text-xs font-semibold uppercase tracking-wider text-crimson">{m.city}</p>
                  <h3 className="mt-1.5 font-display text-lg">{m.name}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted">{m.blurb}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
