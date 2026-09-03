"use client";

import { useMemo, useState } from "react";
import { YachtCard } from "./YachtCard";
import type { Yacht } from "@/data/yachts";

type Filter = "all" | "mumbai" | "goa" | "navi-mumbai" | "small" | "large";

const filters: { id: Filter; label: string }[] = [
  { id: "all", label: "All boats" },
  { id: "mumbai", label: "Mumbai" },
  { id: "goa", label: "Goa" },
  { id: "navi-mumbai", label: "Navi Mumbai" },
  { id: "small", label: "Up to 12 guests" },
  { id: "large", label: "15+ guests" },
];

/**
 * Client-side filtering only — the full list is server-rendered first, so
 * every boat stays in the HTML for crawlers regardless of the active chip.
 */
export function FleetGrid({ yachts }: { yachts: Yacht[] }) {
  const [active, setActive] = useState<Filter>("all");

  const shown = useMemo(() => {
    switch (active) {
      case "mumbai":
      case "goa":
      case "navi-mumbai":
        return yachts.filter((y) => y.destinations.includes(active));
      case "small":
        return yachts.filter((y) => y.guests <= 12);
      case "large":
        return yachts.filter((y) => y.guests >= 15);
      default:
        return yachts;
    }
  }, [active, yachts]);

  return (
    <>
      <div className="flex flex-wrap gap-2" role="group" aria-label="Filter the fleet">
        {filters.map((f) => (
          <button
            key={f.id}
            type="button"
            onClick={() => setActive(f.id)}
            aria-pressed={active === f.id}
            className={`rounded-full border px-5 py-2.5 text-sm font-medium transition-all ${
              active === f.id
                ? "border-crimson bg-crimson text-white"
                : "border-line bg-white text-muted hover:border-crimson hover:text-crimson"
            }`}
          >
            {f.label}
          </button>
        ))}
      </div>

      <p className="mt-4 text-sm text-faint" aria-live="polite">
        Showing {shown.length} of {yachts.length} boats
      </p>

      <div className="mt-7 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {shown.map((y, i) => (
          <YachtCard key={y.slug} yacht={y} priority={i < 3} />
        ))}
      </div>

      {shown.length === 0 && (
        <p className="mt-10 text-center text-muted">
          Nothing matches that combination — try another filter, or just ask us.
        </p>
      )}
    </>
  );
}
