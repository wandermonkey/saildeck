import type { MetadataRoute } from "next";
import { yachts } from "@/data/yachts";
import { destinations } from "@/data/destinations";
import { speedboatRoutes } from "@/data/speedboats";
import { managementServices, sailingSchoolPages, yachtSalesPages } from "@/data/pages";
import { posts } from "@/data/blog";
import { site } from "@/lib/site";

/**
 * Generated at build time from the same data the pages use, so a new boat or
 * service is in the sitemap the moment it exists — no manual list to forget.
 *
 * Priorities reflect commercial value: the city and speedboat pages rank above
 * the informational ones because they are what people search before booking.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const url = (path: string) => new URL(path, site.url).toString();

  const entry = (
    path: string,
    priority: number,
    changeFrequency: "weekly" | "monthly" | "yearly" = "monthly"
  ) => ({ url: url(path), lastModified: now, changeFrequency, priority });

  return [
    entry("/", 1, "weekly"),

    // Highest commercial intent
    entry("/destinations/mumbai", 0.95, "weekly"),
    entry("/destinations/goa", 0.95, "weekly"),
    entry("/charters", 0.95, "weekly"),
    entry("/speedboats", 0.9, "weekly"),
    ...speedboatRoutes.map((r) => entry(`/speedboats/${r.slug}`, 0.9, "weekly")),

    entry("/fleet", 0.9, "weekly"),
    ...yachts.map((y) => entry(`/fleet/${y.slug}`, 0.85)),

    entry("/destinations", 0.8, "weekly"),
    entry("/destinations/navi-mumbai", 0.85, "weekly"),
    entry("/destinations/rest-of-india", 0.7),

    entry("/yachts", 0.85),
    ...yachtSalesPages.map((p) => entry(p.href, 0.8)),

    entry("/contact", 0.8),
    entry("/about/sailing-school", 0.75),
    ...sailingSchoolPages.map((p) => entry(p.href, 0.7)),

    entry("/management", 0.75),
    ...managementServices.map((p) => entry(p.href, 0.7)),

    entry("/blog", 0.7, "weekly"),
    ...posts.map((p) => entry(`/blog/${p.slug}`, 0.65)),

    entry("/about", 0.6),
    entry("/about/marinas", 0.6),
    entry("/about/team", 0.5),
    entry("/faq", 0.6),

    entry("/privacy", 0.2, "yearly"),
    entry("/terms", 0.2, "yearly"),
  ];
}
