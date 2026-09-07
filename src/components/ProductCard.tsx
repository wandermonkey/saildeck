import Image from "next/image";
import Link from "next/link";
import { ArrowIcon } from "./icons";
import type { Product } from "@/data/products";

/**
 * Experience placard — a 9:16 portrait poster rather than the fleet's
 * photo-above-white-panel card.
 *
 * The two listings are deliberately different shapes. On the fleet page the
 * boat has to be easy to inspect, so the photo sits clean and the facts live
 * on a white panel underneath. Here there are no specs to compare — the job is
 * to make someone want the evening — so the type sits over the photograph and
 * the whole tile reads as a poster.
 *
 * TYPE: the title is set in the body sans, not the Playfair display face used
 * for headings elsewhere. Playfair's thin serifs broke up badly at ~15px
 * reversed out of a photograph; a semibold sans at the same size is far
 * clearer, and it is what poster-style cards use for good reason. The display
 * face still carries the page headings, so the two never compete.
 *
 * The card is one big <a>: the entire tile is the hit target, not just the
 * text at the bottom. An earlier version used a stretched-link <span> inside
 * the heading, but its containing block resolved to the absolutely positioned
 * caption wrapper rather than the card, so only the bottom strip was
 * clickable. Making the link the card itself removes the failure mode.
 */
export function ProductCard({ product, priority = false }: { product: Product; priority?: boolean }) {
  return (
    <Link
      href={`/products/${product.slug}`}
      data-cta="product-card"
      className="group relative isolate flex aspect-[9/16] flex-col justify-end overflow-hidden rounded-2xl bg-navy-deep shadow-[var(--shadow-card)] ring-1 ring-transparent transition-all duration-500 hover:shadow-[var(--shadow-card-hover)] hover:ring-crimson/60"
    >
      <Image
        src={product.image}
        alt={product.imageAlt}
        fill
        sizes="(max-width: 768px) 50vw, (max-width: 1280px) 33vw, 25vw"
        priority={priority}
        className="object-cover transition-transform duration-[900ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.07]"
      />

      {/* Legibility scrim. Bottom-heavy so the type always has a dark bed —
          these photos are user-replaceable, and a bright frame must not be
          able to make the title unreadable once real photography lands. */}
      <div
        className="absolute inset-0 bg-gradient-to-t from-navy-deep via-navy-deep/55 to-navy-deep/5 transition-opacity duration-500 group-hover:via-navy-deep/65"
        aria-hidden="true"
      />

      <span className="absolute left-3 top-3 z-10 rounded-full bg-white/15 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.12em] text-white ring-1 ring-white/25 backdrop-blur-md sm:left-4 sm:top-4 sm:px-3 sm:text-[11px]">
        {product.category}
      </span>

      {/* Static in flow, pushed down by justify-end. z-10 lifts it over the
          scrim — z-index applies to flex items even when position is static,
          which keeps this out of the absolute-positioning tangle above. */}
      <div className="relative z-10 p-3.5 sm:p-5">
        {/* Accent rule that draws out on hover — the small motion that makes
            the tile feel alive without shifting the type around. */}
        <span
          className="mb-2.5 block h-[3px] w-8 rounded-full bg-crimson transition-all duration-500 group-hover:w-16"
          aria-hidden="true"
        />

        {/* font-body is load-bearing: globals.css sets a Playfair family on
            every h1–h4 in @layer base, so without it this heading silently
            reverts to the display serif this card is deliberately avoiding. */}
        <h3 className="font-body text-[0.95rem] font-semibold leading-[1.25] tracking-tight text-white [text-shadow:0_1px_14px_rgba(6,28,46,0.55)] sm:text-lg lg:text-xl">
          {product.name}
        </h3>

        <p className="mt-1.5 line-clamp-2 text-[11.5px] font-normal leading-snug text-white/75 sm:text-[13px] sm:leading-relaxed">
          {product.teaser}
        </p>

        <span className="mt-3 inline-flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-[0.12em] text-white transition-all duration-300 group-hover:gap-2.5 group-hover:text-crimson sm:text-[11px]">
          Explore
          <ArrowIcon className="h-3 w-3 sm:h-3.5 sm:w-3.5" />
        </span>
      </div>
    </Link>
  );
}
