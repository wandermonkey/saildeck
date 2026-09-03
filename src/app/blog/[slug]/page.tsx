import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";

import { CtaBand } from "@/components/CtaBand";
import { JsonLd } from "@/components/JsonLd";
import { Reveal } from "@/components/Reveal";
import { Pill, SectionTitle } from "@/components/ui";
import { CheckIcon, ArrowIcon } from "@/components/icons";
import { RichText } from "@/components/RichText";

import { posts, getPost, formatPostDate } from "@/data/blog";
import { buildMetadata, breadcrumbSchema, articleSchema } from "@/lib/seo";

export function generateStaticParams() {
  return posts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return buildMetadata({ title: "Not found", description: "", noIndex: true });

  return buildMetadata({
    title: post.seoTitle,
    description: post.seoDescription,
    path: `/blog/${post.slug}`,
    image: post.image,
  });
}

export default async function PostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();

  const breadcrumb = [
    { name: "Home", path: "/" },
    { name: "Blog", path: "/blog" },
    { name: post.title, path: `/blog/${post.slug}` },
  ];

  // Same-category posts first, so "keep reading" is actually related — with
  // 30+ posts a plain array-order slice would mostly show unrelated topics.
  const others = posts.filter((p) => p.slug !== post.slug);
  const more = [
    ...others.filter((p) => p.category === post.category),
    ...others.filter((p) => p.category !== post.category),
  ].slice(0, 3);

  return (
    <>
      <JsonLd
        data={[
          breadcrumbSchema(breadcrumb),
          articleSchema({
            title: post.title,
            description: post.seoDescription,
            path: `/blog/${post.slug}`,
            image: post.image,
            datePublished: post.date,
          }),
        ]}
      />

      <article>
        {/* Header on white — long-form reading should not start on a dark hero */}
        <div className="border-b border-line bg-white">
          <div className="container-x max-w-3xl py-10 md:py-14">
            <nav aria-label="Breadcrumb">
              <ol className="flex flex-wrap items-center gap-2 text-xs text-faint">
                {breadcrumb.map((b, i) => (
                  <li key={b.path} className="flex items-center gap-2">
                    {i > 0 && <span aria-hidden="true">/</span>}
                    {i === breadcrumb.length - 1 ? (
                      <span className="line-clamp-1 text-muted">{b.name}</span>
                    ) : (
                      <Link href={b.path} className="transition-colors hover:text-crimson">{b.name}</Link>
                    )}
                  </li>
                ))}
              </ol>
            </nav>

            <div className="mt-5">
              <Pill tone="crimson">{post.category}</Pill>
            </div>

            <h1 className="mt-4 text-3xl leading-[1.12] md:text-[2.75rem]">{post.title}</h1>
            <p className="mt-4 text-lg leading-relaxed text-muted">{post.excerpt}</p>
            <p className="mt-6 text-sm text-faint">
              {formatPostDate(post.date)} · {post.readMins} min read
            </p>
          </div>
        </div>

        <div className="container-x max-w-4xl py-10">
          <div className="relative aspect-[16/9] overflow-hidden rounded-2xl bg-surface-2">
            <Image src={post.image} alt={post.imageAlt} fill priority sizes="(max-width: 1024px) 100vw, 60rem" className="object-cover" />
          </div>
        </div>

        <div className="container-x max-w-3xl pb-16">
          {post.body.map((block, i) => (
            <Reveal key={i} delay={0}>
              <section className={i > 0 ? "mt-10" : ""}>
                {block.heading && <h2 className="text-2xl md:text-[1.7rem]">{block.heading}</h2>}
                {block.paras.map((p, j) => (
                  <p key={j} className="mt-4 leading-[1.75] text-muted">
                    <RichText text={p} />
                  </p>
                ))}
                {block.bullets && (
                  <ul className="mt-5 space-y-2.5">
                    {block.bullets.map((b) => (
                      <li key={b} className="flex items-start gap-3 text-muted">
                        <span className="mt-1 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-teal-soft text-teal">
                          <CheckIcon className="h-3 w-3" />
                        </span>
                        <span className="leading-relaxed"><RichText text={b} /></span>
                      </li>
                    ))}
                  </ul>
                )}
              </section>
            </Reveal>
          ))}
        </div>
      </article>

      {/* More reading */}
      <section className="border-t border-line bg-surface py-14 md:py-20">
        <div className="container-x">
          <Reveal>
            <div className="flex flex-wrap items-end justify-between gap-6">
              <SectionTitle eyebrow="Keep reading" title="More from the" accent="journal" />
              <Link href="/blog" className="inline-flex items-center gap-2 text-sm font-medium text-crimson transition-all hover:gap-3">
                All articles <ArrowIcon className="h-4 w-4" />
              </Link>
            </div>
          </Reveal>

          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {more.map((p, i) => (
              <Reveal key={p.slug} delay={i * 70}>
                <Link href={`/blog/${p.slug}`} className="card card-hover group flex h-full flex-col overflow-hidden" data-cta="blog-more">
                  <div className="relative aspect-[16/10] bg-surface-2">
                    <Image src={p.image} alt={p.imageAlt} fill sizes="(max-width: 768px) 100vw, 33vw" className="object-cover transition-transform duration-700 group-hover:scale-105" />
                  </div>
                  <div className="flex flex-1 flex-col p-6">
                    <p className="text-xs font-semibold uppercase tracking-wider text-crimson">{p.category}</p>
                    <h3 className="mt-2 font-display text-lg leading-snug transition-colors group-hover:text-crimson">{p.title}</h3>
                    <p className="mt-2 line-clamp-2 flex-1 text-sm leading-relaxed text-muted">{p.excerpt}</p>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <CtaBand whatsappMessage={`Hi Saildeck! I read your article on ${post.title} and have a question.`} />
    </>
  );
}
