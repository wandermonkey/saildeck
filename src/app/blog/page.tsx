import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

import { PageHero } from "@/components/PageHero";
import { CtaBand } from "@/components/CtaBand";
import { JsonLd } from "@/components/JsonLd";
import { Reveal } from "@/components/Reveal";
import { Pill } from "@/components/ui";

import { posts, formatPostDate } from "@/data/blog";
import { buildMetadata, breadcrumbSchema } from "@/lib/seo";
import { site } from "@/lib/site";

export const metadata: Metadata = buildMetadata({
  title: "Blog — Guides to Chartering, Boating and Ownership in India",
  description:
    "Practical guides from Saildeck: what a yacht charter really costs in Mumbai, the best season in Goa, speedboat versus ferry to Alibaug, and the true cost of owning a boat in India.",
  path: "/blog",
});

const breadcrumb = [
  { name: "Home", path: "/" },
  { name: "Blog", path: "/blog" },
];

export default function BlogPage() {
  const [lead, ...rest] = posts;

  const itemList = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Saildeck blog",
    itemListElement: posts.map((p, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: p.title,
      url: `${site.url}/blog/${p.slug}`,
    })),
  };

  return (
    <>
      <JsonLd data={[breadcrumbSchema(breadcrumb), itemList]} />

      <PageHero
        breadcrumb={breadcrumb}
        eyebrow="Journal"
        title="Guides worth"
        accent="reading first"
        sub="Written by people who run the boats, not by people reselling them. Prices, seasons, costs and the things nobody tells you until it is too late."
        image="https://images.unsplash.com/photo-1598770722761-0cab70ffd2fb?auto=format&fit=crop&w=2000&q=80"
        imageAlt="View from a boat bow across the water at sunset"
        compact
      />

      {/* Lead article */}
      <section className="py-14 md:py-16">
        <div className="container-x">
          <Reveal>
            <Link href={`/blog/${lead.slug}`} data-cta="blog-lead" className="card card-hover group grid overflow-hidden lg:grid-cols-2">
              <div className="relative aspect-[16/10] lg:aspect-auto lg:min-h-[24rem]">
                <Image
                  src={lead.image}
                  alt={lead.imageAlt}
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>
              <div className="flex flex-col justify-center p-8 md:p-12">
                <div className="flex items-center gap-3">
                  <Pill tone="crimson">{lead.category}</Pill>
                  <span className="text-xs text-faint">Latest</span>
                </div>
                <h2 className="mt-4 font-display text-2xl leading-tight transition-colors group-hover:text-crimson md:text-3xl">
                  {lead.title}
                </h2>
                <p className="mt-3 leading-relaxed text-muted">{lead.excerpt}</p>
                <p className="mt-6 text-xs text-faint">
                  {formatPostDate(lead.date)} · {lead.readMins} min read
                </p>
              </div>
            </Link>
          </Reveal>
        </div>
      </section>

      {/* Rest */}
      <section className="pb-16 md:pb-24">
        <div className="container-x grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {rest.map((p, i) => (
            <Reveal key={p.slug} delay={(i % 3) * 70}>
              <Link href={`/blog/${p.slug}`} data-cta="blog-card" className="card card-hover group flex h-full flex-col overflow-hidden">
                <div className="relative aspect-[16/10] bg-surface-2">
                  <Image
                    src={p.image}
                    alt={p.imageAlt}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </div>
                <div className="flex flex-1 flex-col p-6">
                  <p className="text-xs font-semibold uppercase tracking-wider text-crimson">{p.category}</p>
                  <h2 className="mt-2 font-display text-lg leading-snug transition-colors group-hover:text-crimson">{p.title}</h2>
                  <p className="mt-2 line-clamp-3 flex-1 text-sm leading-relaxed text-muted">{p.excerpt}</p>
                  <p className="mt-4 text-xs text-faint">{formatPostDate(p.date)} · {p.readMins} min read</p>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>

      <CtaBand
        title="Got a question"
        accent="we have not answered?"
        sub="Ask us directly. If it comes up often enough, it becomes the next article."
      />
    </>
  );
}
