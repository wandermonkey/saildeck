import type { Metadata } from "next";

import { PageHero } from "@/components/PageHero";
import { CtaBand } from "@/components/CtaBand";
import { JsonLd } from "@/components/JsonLd";
import { Reveal } from "@/components/Reveal";
import { SectionTitle } from "@/components/ui";
import { CheckIcon } from "@/components/icons";

import { teamRoles } from "@/data/company";
import { buildMetadata, breadcrumbSchema } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Our Team — Captains, Crew and Engineers at Saildeck",
  description:
    "The people behind Saildeck: licensed captains, trained deck crew, a dedicated charter desk, yard engineers and certified sailing instructors across Mumbai, Navi Mumbai and Goa.",
  path: "/about/team",
});

const breadcrumb = [
  { name: "Home", path: "/" },
  { name: "About Us", path: "/about" },
  { name: "Team", path: "/about/team" },
];

export default function TeamPage() {
  return (
    <>
      <JsonLd data={breadcrumbSchema(breadcrumb)} />

      <PageHero
        breadcrumb={breadcrumb}
        eyebrow="Team"
        title="The people who make"
        accent="the day work"
        sub="A charter looks effortless from the deck. It is the result of five different roles doing their part before you ever reach the jetty."
        image="https://images.unsplash.com/photo-1708246117134-9b3b72fd4e76?auto=format&fit=crop&w=2000&q=80"
        imageAlt="Crew and guests aboard a chartered boat"
        compact
      />

      <section className="py-14 md:py-20">
        <div className="container-x">
          <Reveal>
            <SectionTitle
              eyebrow="Roles"
              title="Who you will"
              accent="deal with"
              sub="Every charter involves most of these people. The one you will actually talk to is the charter desk — and it is the same person from your first message to boarding."
            />
          </Reveal>

          <div className="mt-11 space-y-5">
            {teamRoles.map((r, i) => (
              <Reveal key={r.role} delay={(i % 3) * 60}>
                <div className="card grid gap-6 p-7 md:grid-cols-[1fr_1.3fr] md:p-9">
                  <div>
                    <h2 className="font-display text-xl md:text-2xl">{r.role}</h2>
                    <p className="mt-1 text-xs font-semibold uppercase tracking-wider text-crimson">{r.count}</p>
                    <p className="mt-4 text-sm leading-relaxed text-muted">{r.blurb}</p>
                  </div>

                  <ul className="grid gap-2.5 sm:grid-cols-2 md:border-l md:border-line md:pl-8">
                    {r.responsibilities.map((x) => (
                      <li key={x} className="flex items-start gap-2.5 text-sm text-muted">
                        <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-teal-soft text-teal">
                          <CheckIcon className="h-3 w-3" />
                        </span>
                        {x}
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal delay={100}>
            <div className="mt-12 rounded-2xl border border-line bg-surface p-8 text-center">
              <h2 className="font-display text-xl">Want to work on the water?</h2>
              <p className="mx-auto mt-3 max-w-lg text-sm leading-relaxed text-muted">
                We hire deckhands, skippers, engineers and instructors through the season,
                and we train people with no marine background who are willing to start at
                the bottom. Send us a line and tell us what you can do.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      <CtaBand
        title="Questions about"
        accent="crew or careers?"
        whatsappMessage="Hi Saildeck! I have a question about your team."
      />
    </>
  );
}
