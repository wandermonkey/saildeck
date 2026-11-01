"use client";

import { useMemo, useState } from "react";
import { YachtCard } from "./YachtCard";
import { basePrice, type Yacht } from "@/data/yachts";

type LocationFilter = "all" | "mumbai" | "goa" | "navi-mumbai";
type TypeFilter = "all" | "Motor Yacht" | "Sailing Yacht" | "Catamaran" | "Speedboat" | "small" | "large" | "budget";

const locationFilters: { id: LocationFilter; label: string }[] = [
  { id: "all", label: "All locations" },
  { id: "mumbai", label: "Mumbai" },
  { id: "goa", label: "Goa" },
  { id: "navi-mumbai", label: "Navi Mumbai" },
];

const typeFilters: { id: TypeFilter; label: string }[] = [
  { id: "all", label: "All boats" },
  { id: "Motor Yacht", label: "Motor Yachts" },
  { id: "Sailing Yacht", label: "Sailing Yachts" },
  { id: "Catamaran", label: "Catamarans" },
  { id: "Speedboat", label: "Speedboats" },
  { id: "small", label: "Couples & Small Groups" },
  { id: "large", label: "Groups 15+" },
  { id: "budget", label: "Under ₹10,000" },
];

/**
 * Client-side filtering only — the full list is server-rendered first, so
 * every boat stays in the HTML for crawlers regardless of the active chips.
 * Location and type/budget are two independent single-select rows, combined
 * with AND — e.g. "Goa" + "Catamarans" shows only Goa-based catamarans.
 */
export function FleetGrid({ yachts }: { yachts: Yacht[] }) {
  const [location, setLocation] = useState<LocationFilter>("all");
  const [type, setType] = useState<TypeFilter>("all");

  const shown = useMemo(() => {
    return yachts.filter((y) => {
      const locationMatch = location === "all" || y.destinations.includes(location);

      const typeMatch = (() => {
        switch (type) {
          case "all":
            return true;
          case "small":
            return y.guests <= 12;
          case "large":
            return y.guests >= 15;
          case "budget":
            return basePrice(y) < 10000;
          default:
            return y.category === type;
        }
      })();

      return locationMatch && typeMatch;
    });
  }, [location, type, yachts]);

  return (
    <>
      <div className="flex flex-wrap gap-2" role="group" aria-label="Filter by location">
        {locationFilters.map((f) => (
          <button
            key={f.id}
            type="button"
            onClick={() => setLocation(f.id)}
            aria-pressed={location === f.id}
            className={`rounded-full border px-5 py-2.5 text-sm font-medium transition-all ${
              location === f.id
                ? "border-navy bg-navy text-white"
                : "border-line bg-white text-muted hover:border-navy hover:text-navy"
            }`}
          >
            {f.label}
          </button>
        ))}
      </div>

      <div className="mt-3 flex flex-wrap gap-2" role="group" aria-label="Filter by boat type, group size or budget">
        {typeFilters.map((f) => (
          <button
            key={f.id}
            type="button"
            onClick={() => setType(f.id)}
            aria-pressed={type === f.id}
            className={`rounded-full border px-5 py-2.5 text-sm font-medium transition-all ${
              type === f.id
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
