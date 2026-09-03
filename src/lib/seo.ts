import type { Metadata } from "next";
import { site } from "./site";

/**
 * Every page builds metadata through this helper so canonical URLs, Open Graph
 * and Twitter cards can never drift out of sync — the most common technical
 * SEO failure on small sites.
 */
export function buildMetadata({
  title,
  description,
  path = "/",
  image,
  noIndex = false,
}: {
  title: string;
  description: string;
  path?: string;
  image?: string;
  noIndex?: boolean;
}): Metadata {
  const url = new URL(path, site.url).toString();
  const ogImage = image ?? `${site.url}/og.jpg`;

  return {
    title,
    description,
    alternates: { canonical: url },
    robots: noIndex
      ? { index: false, follow: false }
      : { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1 },
    openGraph: {
      title,
      description,
      url,
      siteName: site.name,
      locale: "en_IN",
      type: "website",
      images: [{ url: ogImage, width: 1200, height: 630, alt: title }],
    },
    twitter: { card: "summary_large_image", title, description, images: [ogImage] },
  };
}

/* ---------------------------------------------------------------------------
   JSON-LD builders. Google reads these to generate rich results: the business
   panel, star ratings, FAQ accordions and breadcrumb trails in the SERP.
   --------------------------------------------------------------------------- */

export function localBusinessSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": `${site.url}/#business`,
    name: site.legalName,
    alternateName: site.name,
    description: site.description,
    url: site.url,
    telephone: site.phone,
    email: site.email,
    priceRange: site.priceRange,
    image: `${site.url}/og.jpg`,
    logo: `${site.url}/images/logo-saildeck.svg`,
    address: {
      "@type": "PostalAddress",
      streetAddress: site.address.street,
      addressLocality: site.address.city,
      addressRegion: site.address.state,
      postalCode: site.address.postalCode,
      addressCountry: site.address.country,
    },
    geo: { "@type": "GeoCoordinates", latitude: site.geo.lat, longitude: site.geo.lng },
    openingHours: site.hours,
    areaServed: [
      { "@type": "City", name: "Mumbai" },
      { "@type": "City", name: "Navi Mumbai" },
      { "@type": "State", name: "Goa" },
    ],
    sameAs: Object.values(site.social).filter(Boolean),
  };
}

/**
 * Organisation + website identity. Separate from LocalBusiness because Google
 * uses this one for the knowledge panel and brand entity, and it is what links
 * the social profiles to the brand name.
 */
export function organizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${site.url}/#organization`,
    name: site.legalName,
    alternateName: site.name,
    url: site.url,
    logo: {
      "@type": "ImageObject",
      url: `${site.url}/images/logo-saildeck.svg`,
    },
    image: `${site.url}/og.jpg`,
    description: site.description,
    email: site.email,
    telephone: site.phone,
    address: {
      "@type": "PostalAddress",
      streetAddress: site.address.street,
      addressLocality: site.address.city,
      addressRegion: site.address.state,
      postalCode: site.address.postalCode,
      addressCountry: site.address.country,
    },
    contactPoint: {
      "@type": "ContactPoint",
      telephone: site.phone,
      contactType: "customer service",
      areaServed: "IN",
      availableLanguage: ["en", "hi", "mr"],
    },
    sameAs: Object.values(site.social).filter(Boolean),
  };
}

export function websiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${site.url}/#website`,
    url: site.url,
    name: site.name,
    description: site.description,
    publisher: { "@id": `${site.url}/#organization` },
    inLanguage: "en-IN",
  };
}

export function breadcrumbSchema(trail: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: trail.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: new URL(item.path, site.url).toString(),
    })),
  };
}

export function faqSchema(faqs: { q: string; a: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };
}

export function serviceSchema({
  name,
  description,
  path,
  price,
  priceUnit = "HUR",
  image,
  areaServed = ["Mumbai", "Navi Mumbai", "Goa"],
}: {
  name: string;
  description: string;
  path: string;
  /** Omit for services quoted on enquiry rather than at a list price. */
  price?: number;
  priceUnit?: string;
  image: string;
  areaServed?: string[];
}) {
  const url = new URL(path, site.url).toString();

  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name,
    description,
    serviceType: "Marine services",
    provider: { "@id": `${site.url}/#business` },
    areaServed: areaServed.map((a) => ({ "@type": "Place", name: a })),
    url,
    image,
    ...(price
      ? {
          offers: {
            "@type": "Offer",
            price,
            priceCurrency: "INR",
            availability: "https://schema.org/InStock",
            url,
            // Unit price so the SERP reads "from ₹11,900 per hour" rather than
            // a bare number that looks like the whole charter cost.
            priceSpecification: {
              "@type": "UnitPriceSpecification",
              price,
              priceCurrency: "INR",
              unitCode: priceUnit,
              referenceQuantity: { "@type": "QuantitativeValue", value: 1, unitCode: priceUnit },
            },
          },
        }
      : {}),
  };
}

export function articleSchema({
  title,
  description,
  path,
  image,
  datePublished,
}: {
  title: string;
  description: string;
  path: string;
  image: string;
  datePublished: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: title,
    description,
    image,
    datePublished,
    dateModified: datePublished,
    author: { "@type": "Organization", name: site.legalName, url: site.url },
    publisher: { "@id": `${site.url}/#business` },
    mainEntityOfPage: new URL(path, site.url).toString(),
  };
}
