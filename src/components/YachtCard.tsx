import Image from "next/image";
import Link from "next/link";
import { inr, type Yacht } from "@/data/yachts";
import { ArrowIcon, UsersIcon, RulerIcon, BedIcon } from "./icons";

/**
 * Listing card.
 *
 * The photo sits clean — no dark scrim, no text over it. Everything readable
 * lives on the white panel underneath, which was the brief: on a charter site
 * the boat has to be easy to see at a glance.
 */
export function YachtCard({ yacht, priority = false }: { yacht: Yacht; priority?: boolean }) {
  const cover = yacht.gallery[0];

  return (
    <article className="card card-hover group flex flex-col overflow-hidden">
      <Link href={`/fleet/${yacht.slug}`} className="relative block aspect-[4/3] overflow-hidden bg-surface" data-cta="yacht-card">
        <Image
          src={cover.src}
          alt={cover.alt}
          fill
          // Real rendered width per breakpoint, so a 380px card never pulls a
          // 1800px file. Significant LCP win on the listing pages.
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          priority={priority}
          className="object-cover transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.04]"
        />

        <div className="absolute left-3 top-3 flex gap-2">
          <span className="rounded-full bg-white/95 px-3 py-1 text-[11px] font-semibold uppercase tracking-wide text-navy shadow-sm backdrop-blur">
            {yacht.category}
          </span>
          {yacht.wasPricePerHour && (
            <span className="rounded-full bg-crimson px-3 py-1 text-[11px] font-semibold uppercase tracking-wide text-white shadow-sm">
              Offer
            </span>
          )}
        </div>

        {yacht.gallery.length > 1 && (
          <span className="absolute bottom-3 right-3 rounded-full bg-white/90 px-2.5 py-1 text-[11px] font-medium text-navy shadow-sm backdrop-blur">
            {yacht.gallery.length} photos
          </span>
        )}
      </Link>

      <div className="flex flex-1 flex-col p-5">
        <h3 className="font-display text-xl leading-tight">
          <Link href={`/fleet/${yacht.slug}`} className="transition-colors hover:text-crimson">
            {yacht.name}
          </Link>
        </h3>

        <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-muted">{yacht.tagline}</p>

        <ul className="mt-4 flex flex-wrap gap-x-4 gap-y-2 text-xs text-muted">
          <li className="flex items-center gap-1.5"><UsersIcon className="h-3.5 w-3.5 text-teal" />{yacht.guests} guests</li>
          <li className="flex items-center gap-1.5"><RulerIcon className="h-3.5 w-3.5 text-teal" />{yacht.lengthFt} ft</li>
          <li className="flex items-center gap-1.5"><BedIcon className="h-3.5 w-3.5 text-teal" />{yacht.cabins} cabins</li>
        </ul>

        <div className="mt-5 flex items-end justify-between border-t border-line pt-4">
          <div>
            {yacht.pricingSlots && yacht.pricingSlots.length > 0 ? (
              <>
                <span className="text-xs text-muted">From </span>
                <span className="font-display text-xl font-semibold text-navy">
                  {inr(Math.min(...yacht.pricingSlots.map((s) => s.amount)))}
                </span>
                <span className="text-xs text-muted"> / 2 hrs</span>
              </>
            ) : (
              <>
                {yacht.wasPricePerHour && (
                  <span className="mr-1.5 text-xs text-faint line-through">{inr(yacht.wasPricePerHour)}</span>
                )}
                <span className="font-display text-xl font-semibold text-navy">{inr(yacht.pricePerHour)}</span>
                <span className="text-xs text-muted"> /hour</span>
              </>
            )}
          </div>
          <Link
            href={`/fleet/${yacht.slug}`}
            className="inline-flex items-center gap-1.5 text-sm font-medium text-crimson transition-all group-hover:gap-2.5"
          >
            View <ArrowIcon className="h-3.5 w-3.5" />
          </Link>
        </div>
      </div>
    </article>
  );
}
