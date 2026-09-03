import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

import { PageHero } from "@/components/PageHero";
import { CtaBand } from "@/components/CtaBand";
import { JsonLd } from "@/components/JsonLd";
import { Reveal } from "@/components/Reveal";
import { SectionTitle, Button } from "@/components/ui";
import { CheckIcon, ArrowIcon, PinIcon } from "@/components/icons";

import { marinas } from "@/data/company";
import { buildMetadata, breadcrumbSchema } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Marinas & Jetties — Where Saildeck Berths in Mumbai, Goa & Alibaug",
  description:
    "Saildeck departure points and berthing: Gateway of India, Belapur jetty in Navi Mumbai, Panjim and Britona on the Mandovi in Goa, and Mandwa jetty for Alibaug transfers.",
  path: "/about/marinas",
});

const breadcrumb = [
  { name: "Home", path: "/" },
  { name: "About Us", path: "/about" },
  { name: "Marinas", path: "/about/marinas" },
];

export default function MarinasPage() {
  return (
    <>
      <JsonLd data={breadcrumbSchema(breadcrumb)} />

      <PageHero
        breadcrumb={breadcrumb}
        eyebrow="Marinas"
        title="Where we"
        accent="berth and board"
        sub="India has a long coastline and very few working marinas, so most boarding happens from jetties and anchorages. Here is exactly where you will meet your boat."
        image="https://images.unsplash.com/photo-1727174674169-c2f484052437?auto=format&fit=crop&w=2000&q=80"
        imageAlt="Aerial view of boats at anchor in a sheltered bay"
        compact
        facts={[
          { label: "Boarding points", value: `${marinas.length}` },
          { label: "Cities", value: "Mumbai · Navi Mumbai · Goa" },
          { label: "Alibaug", value: "Mandwa jetty" },
          { label: "Consultancy", value: "New marinas" },
        ]}
      />

      <section className="py-14 md:py-20">
        <div className="container-x">
          <Reveal>
            <SectionTitle eyebrow="Boarding points" title="Our jetties and" accent="anchorages" />
          </Reveal>

          <div className="mt-11 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {marinas.map((m, i) => (
              <Reveal key={m.name} delay={(i % 3) * 70}>
                <article className="card flex h-full flex-col overflow-hidden">
                  <div className="relative aspect-[16/10] bg-surface-2">
                    <Image
                      src={m.image}
                      alt={m.imageAlt}
                      fill
                      sizes="(max-width: 768px) 100vw, 33vw"
                      priority={i < 3}
                      className="object-cover"
                    />
                  </div>
                  <div className="flex flex-1 flex-col p-6">
                    <p className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-crimson">
                      <PinIcon className="h-3.5 w-3.5" />
                      {m.city}
                    </p>
                    <h2 className="mt-2 font-display text-lg">{m.name}</h2>
                    <p className="mt-2 flex-1 text-sm leading-relaxed text-muted">{m.blurb}</p>
                    <ul className="mt-4 space-y-2 border-t border-line pt-4">
                      {m.facilities.map((f) => (
                        <li key={f} className="flex items-start gap-2.5 text-xs text-muted">
                          <span className="mt-0.5 grid h-4 w-4 shrink-0 place-items-center rounded-full bg-teal-soft text-teal">
                            <CheckIcon className="h-2.5 w-2.5" />
                          </span>
                          {f}
                        </li>
                      ))}
                    </ul>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-line bg-surface py-14 md:py-20">
        <div className="container-x">
          <Reveal>
            <div className="mx-auto max-w-3xl text-center">
              <SectionTitle
                align="center"
                eyebrow="Marina development"
                title="Building a marina"
                accent="of your own?"
                sub="We advise developers, state tourism boards and private clubs on feasibility, berth mix, permissions, construction oversight and how to run the thing afterwards."
              />
              <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
                <Button href="/management/marina-consultancy" dataCta="marina-consultancy">
                  Marina consultancy <ArrowIcon className="h-4 w-4" />
                </Button>
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center rounded-full border border-line bg-white px-6 py-3 text-sm font-medium text-navy transition-colors hover:border-crimson hover:text-crimson"
                >
                  Talk to us
                </Link>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <CtaBand
        title="Need a berth"
        accent="or a boarding point?"
        whatsappMessage="Hi Saildeck! I have a question about berthing and marinas."
      />
    </>
  );
}
