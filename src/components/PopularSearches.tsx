import Link from "next/link";

/**
 * Keyword-phrased internal links.
 *
 * Two jobs. For visitors it is a shortcut to the thing they actually came for.
 * For Google it supplies descriptive anchor text pointing at the commercial
 * pages — anchor text is one of the stronger on-site relevance signals, and
 * "Yacht rental in Mumbai" tells a crawler far more than "Mumbai" does.
 *
 * Homepage only. Repeating a block like this sitewide turns it into
 * boilerplate, which Google discounts.
 */
const searches: { label: string; href: string }[] = [
  { label: "Yacht rental in Mumbai", href: "/destinations/mumbai" },
  { label: "Yacht charter in Goa", href: "/destinations/goa" },
  { label: "Boat rental in Navi Mumbai", href: "/destinations/navi-mumbai" },
  { label: "Speedboat to Elephanta Caves", href: "/speedboats/mumbai-to-elephanta" },
  { label: "Mumbai to Alibaug speedboat", href: "/speedboats/mumbai-to-alibaug" },
  { label: "Sunset cruise in Mumbai", href: "/charters" },
  { label: "Birthday party on a yacht", href: "/charters" },
  { label: "Proposal on a yacht", href: "/charters" },
  { label: "Corporate yacht charter", href: "/charters" },
  { label: "Pre-wedding shoot on a yacht", href: "/charters" },
  { label: "Buy a motor yacht in India", href: "/yachts/buy-a-motor-yacht" },
  { label: "Sell your yacht", href: "/yachts/sell-your-yacht" },
  { label: "Buy a speedboat in India", href: "/yachts/buy-a-speedboat" },
  { label: "Yacht management services", href: "/management/yacht-management" },
  { label: "Yacht refit and repair", href: "/management/yacht-refit-and-repair" },
  { label: "Monsoon boat storage", href: "/management/monsoon-storage" },
  { label: "Marina consultancy in India", href: "/management/marina-consultancy" },
  { label: "Learn to sail in Mumbai", href: "/about/sailing-school/learn-to-sail" },
  { label: "RYA sailing courses in India", href: "/about/sailing-school/rya-courses" },
  { label: "Yacht charter price in Mumbai", href: "/blog/what-it-costs-to-rent-a-yacht-in-mumbai" },
];

export function PopularSearches() {
  return (
    <section className="border-t border-line bg-surface py-12">
      <div className="container-x">
        <h2 className="text-xs font-semibold uppercase tracking-[0.16em] text-faint">
          Popular on Saildeck
        </h2>
        <ul className="mt-5 flex flex-wrap gap-2">
          {searches.map((s) => (
            <li key={s.label}>
              <Link
                href={s.href}
                className="inline-block rounded-full border border-line bg-white px-4 py-2 text-sm text-muted transition-colors hover:border-crimson hover:text-crimson"
              >
                {s.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
