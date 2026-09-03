import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { ContentPageTemplate } from "@/components/ContentPageTemplate";
import { sailingSchoolPages, getSailingSchoolPage } from "@/data/pages";
import { buildMetadata } from "@/lib/seo";

export function generateStaticParams() {
  return sailingSchoolPages.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const page = getSailingSchoolPage(slug);
  if (!page) return buildMetadata({ title: "Not found", description: "", noIndex: true });

  return buildMetadata({
    title: page.seoTitle,
    description: page.seoDescription,
    path: page.href,
    image: page.image,
  });
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const page = getSailingSchoolPage(slug);
  if (!page) notFound();

  return (
    <ContentPageTemplate
      page={page}
      breadcrumb={[
        { name: "Home", path: "/" },
        { name: "About Us", path: "/about" },
        { name: "Sailing School", path: "/about/sailing-school" },
        { name: `${page.title} ${page.accent ?? ""}`.trim(), path: page.href },
      ]}
      related={sailingSchoolPages.filter((p) => p.slug !== page.slug)}
      relatedTitle="More from the sailing school"
    />
  );
}
