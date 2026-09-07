"use client";

import { useMemo, useState } from "react";
import { ProductCard } from "./ProductCard";
import { productCategories, type Product, type ProductCategory } from "@/data/products";

type Filter = "all" | ProductCategory;

/**
 * Client-side filtering only — the full list is server-rendered first, so every
 * experience stays in the HTML for crawlers regardless of the active chip.
 * Same contract as FleetGrid.
 */
export function ProductGrid({ products }: { products: Product[] }) {
  const [active, setActive] = useState<Filter>("all");

  const shown = useMemo(
    () => (active === "all" ? products : products.filter((p) => p.category === active)),
    [active, products]
  );

  const filters: { id: Filter; label: string }[] = [
    { id: "all", label: "All experiences" },
    ...productCategories.map((c) => ({ id: c as Filter, label: c })),
  ];

  return (
    <>
      <div className="flex flex-wrap gap-2" role="group" aria-label="Filter experiences">
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
        Showing {shown.length} of {products.length} experiences
      </p>

      <div className="mt-7 grid grid-cols-2 gap-3 sm:gap-5 md:grid-cols-3 xl:grid-cols-4">
        {shown.map((p, i) => (
          <ProductCard key={p.slug} product={p} priority={i < 4} />
        ))}
      </div>

      {shown.length === 0 && (
        <p className="mt-10 text-center text-muted">
          Nothing in that category yet — try another, or just ask us.
        </p>
      )}
    </>
  );
}
