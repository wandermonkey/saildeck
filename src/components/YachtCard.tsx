import Link from "next/link";
import { inr, type Yacht } from "@/data/yachts";
import { CardGallery } from "./CardGallery";
import { ArrowIcon, UsersIcon, RulerIcon, BedIcon } from "./icons";

/**
 * Listing card.
 *
 * The photo sits clean — no dark scrim, no text over it. Everything readable
 * lives on the white panel underneath, which was the brief: on a charter site
 * the boat has to be easy to see at a glance.
 */
export function YachtCard({ yacht, priority = false }: { yacht: Yacht; priority?: boolean }) {
  // Most boats run 2-hour slots, but a few (e.g. Allegra's 3-hour signature
  // package) don't — read the real duration off the cheapest slot's own
  // times rather than hardcoding "2 hrs" for every boat.
  const cheapestSlot = yacht.pricingSlots?.length
    ? yacht.pricingSlots.reduce((min, s) => (s.amount < min.amount ? s : min))
    : null;
  const slotHours = cheapestSlot
    ? Math.round(
        (new Date(`2000/01/01 ${cheapestSlot.end}`).getTime() -
          new Date(`2000/01/01 ${cheapestSlot.start}`).getTime()) /
          3600000
      )
    : null;

  return (
    <article
      className={`card card-hover group flex flex-col overflow-hidden ${yacht.mostBooked ? "card-featured" : ""}`}
    >
      <Link href={`/fleet/${yacht.slug}`} className="relative block aspect-[4/3] overflow-hidden bg-surface" data-cta="yacht-card">
        <CardGallery images={yacht.gallery} priority={priority} />

        <div className="pointer-events-none absolute left-3 top-3 flex gap-2">
          {yacht.mostBooked && (
            <span className="rounded-full bg-amber px-3 py-1 text-[11px] font-semibold uppercase tracking-wide text-navy shadow-sm">
              ★ Most booked
            </span>
          )}
          <span className="rounded-full bg-white/95 px-3 py-1 text-[11px] font-semibold uppercase tracking-wide text-navy shadow-sm backdrop-blur">
            {yacht.category}
          </span>
          {yacht.wasPricePerHour && (
            <span className="rounded-full bg-crimson px-3 py-1 text-[11px] font-semibold uppercase tracking-wide text-white shadow-sm">
              Offer
            </span>
          )}
        </div>
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
                <span className="text-xs text-muted"> / {slotHours} hrs</span>
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
