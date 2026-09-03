import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { ContentPageTemplate } from "@/components/ContentPageTemplate";
import { yachtSalesPages, getYachtSalesPage } from "@/data/pages";
import { buildMetadata } from "@/lib/seo";

export function generateStaticParams() {
  return yachtSalesPages.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const page = getYachtSalesPage(slug);
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
  const page = getYachtSalesPage(slug);
  if (!page) notFound();

  return (
    <ContentPageTemplate
      page={page}
      breadcrumb={[
        { name: "Home", path: "/" },
        { name: "Buy & Sell Yachts", path: "/yachts" },
        { name: `${page.title} ${page.accent ?? ""}`.trim(), path: page.href },
      ]}
      related={yachtSalesPages.filter((p) => p.slug !== page.slug)}
      relatedTitle="Other brokerage services"
    />
  );
}
