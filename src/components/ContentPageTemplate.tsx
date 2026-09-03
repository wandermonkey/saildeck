import Link from "next/link";
import { PageHero } from "./PageHero";
import { CtaBand } from "./CtaBand";
import { EnquiryForm } from "./EnquiryForm";
import { Faq } from "./Faq";
import { JsonLd } from "./JsonLd";
import { Reveal } from "./Reveal";
import { SectionTitle } from "./ui";
import { CheckIcon, ArrowIcon } from "./icons";
import type { ContentPage } from "@/data/pages";
import { breadcrumbSchema, faqSchema, serviceSchema } from "@/lib/seo";

/**
 * One template for every service page — management, sailing school and yacht
 * sales. Each entry brings its own copy, facts and FAQ, so the pages read as
 * distinct rather than as a doorway set.
 */
export function ContentPageTemplate({
  page,
  breadcrumb,
  related,
  relatedTitle = "Related services",
}: {
  page: ContentPage;
  breadcrumb: { name: string; path: string }[];
  related?: ContentPage[];
  relatedTitle?: string;
}) {
  return (
    <>
      <JsonLd
        data={[
          breadcrumbSchema(breadcrumb),
          faqSchema(page.faqs),
          serviceSchema({
            name: `${page.title} ${page.accent ?? ""}`.trim(),
            description: page.seoDescription,
            path: page.href,
            image: page.image,
          }),
        ]}
      />

      <PageHero
        breadcrumb={breadcrumb}
        eyebrow={page.eyebrow}
        title={page.title}
        accent={page.accent}
        sub={page.intro}
        image={page.image}
        imageAlt={page.imageAlt}
        facts={page.facts}
        compact
      />

      <section className="py-14 md:py-20">
        <div className="container-x grid gap-12 lg:grid-cols-[1fr_23rem] lg:items-start lg:gap-16">
          <div className="min-w-0">
            {page.sections.map((s, i) => (
              <Reveal key={s.heading} delay={i * 60}>
                <div className={i > 0 ? "mt-12" : ""}>
                  <h2 className="text-2xl md:text-[1.75rem]">{s.heading}</h2>
                  <p className="mt-4 leading-relaxed text-muted">{s.body}</p>

                  {s.bullets && (
                    <ul className="mt-6 grid gap-3 sm:grid-cols-2">
                      {s.bullets.map((b) => (
                        <li key={b} className="flex items-start gap-3 text-sm text-muted">
                          <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-teal-soft text-teal">
                            <CheckIcon className="h-3 w-3" />
                          </span>
                          {b}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </Reveal>
            ))}

            <Reveal>
              <div className="mt-14">
                <SectionTitle eyebrow="Questions" title="Frequently" accent="asked" />
                <div className="mt-6">
                  <Faq faqs={page.faqs} />
                </div>
              </div>
            </Reveal>
          </div>

          <Reveal delay={120} className="lg:sticky lg:top-28">
            <div id="enquire" className="scroll-mt-28">
              <h2 className="mb-4 font-display text-xl">Talk to us about this</h2>
              <EnquiryForm preset={mapService(page)} compact />
            </div>
          </Reveal>
        </div>
      </section>

      {related && related.length > 0 && (
        <section className="border-t border-line bg-surface py-14 md:py-20">
          <div className="container-x">
            <Reveal>
              <SectionTitle eyebrow="More" title={relatedTitle} />
            </Reveal>
            <div className="mt-9 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((r, i) => (
                <Reveal key={r.href} delay={(i % 3) * 70}>
                  <Link
                    href={r.href}
                    className="card card-hover group flex h-full flex-col p-6"
                    data-cta="related-service"
                  >
                    <h3 className="font-display text-lg leading-tight transition-colors group-hover:text-crimson">
                      {r.title} {r.accent}
                    </h3>
                    <p className="mt-2.5 line-clamp-3 flex-1 text-sm leading-relaxed text-muted">{r.intro}</p>
                    <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-crimson transition-all group-hover:gap-3">
                      Read more <ArrowIcon className="h-3.5 w-3.5" />
                    </span>
                  </Link>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      )}

      <CtaBand whatsappMessage={`Hi Saildeck! I have a question about ${page.title} ${page.accent ?? ""}.`.trim()} />
    </>
  );
}

/** Maps a content page onto the enquiry form's service dropdown options. */
function mapService(page: ContentPage) {
  if (page.href.includes("/yachts/sell")) return "Sell my yacht";
  if (page.href.includes("/yachts/")) return "Buy a yacht or boat";
  if (page.href.includes("sailing-school")) return "Sailing school";
  if (page.href.includes("marina")) return "Marina consultancy";
  if (page.href.includes("refit")) return "Refit or repair";
  if (page.href.includes("storage")) return "Monsoon storage";
  if (page.href.includes("management")) return "Yacht management";
  return "Something else";
}
