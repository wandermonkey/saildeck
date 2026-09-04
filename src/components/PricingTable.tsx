import type { PricingSlot } from "@/data/yachts";
import { inr } from "@/data/yachts";

/**
 * Charter time-slot pricing list.
 *
 * Boats are often priced by departure slot rather than a flat hourly rate
 * once catering, tide and sunset timing are factored in — this renders that
 * schedule exactly as the operator supplies it, plus optional add-on charges
 * and a small-print note (e.g. permission requirements for an overnight sail).
 *
 * This used to be an HTML <table> with a fixed min-width, scrolling
 * horizontally inside its own container on narrow screens. In practice that
 * still read as broken on a phone — a table cropped mid-row with no visible
 * scroll affordance, per user feedback. A stacked row-per-slot list has no
 * minimum width at all, so it reflows naturally at every screen size instead
 * of needing to scroll.
 */
export function PricingTable({
  slots,
  extras,
  note,
}: {
  slots: PricingSlot[];
  extras?: string[];
  note?: string;
}) {
  if (slots.length === 0) return null;

  return (
    <div className="mt-4">
      <ul className="divide-y divide-line rounded-2xl border border-line bg-white">
        {slots.map((s, i) => (
          <li key={i} className="flex items-center justify-between gap-4 px-5 py-4">
            <div className="min-w-0">
              <p className="font-medium text-navy">
                {s.start} <span className="text-faint">–</span> {s.end}
              </p>
              <p className="mt-0.5 text-sm text-muted">
                {s.sailing}
                {s.anchorage && <> · {s.anchorage}</>}
              </p>
            </div>
            <p className="shrink-0 whitespace-nowrap font-display text-lg font-semibold text-crimson">
              {inr(s.amount)}
            </p>
          </li>
        ))}
      </ul>

      {extras && extras.length > 0 && (
        <ul className="mt-4 space-y-1.5 text-sm text-muted">
          {extras.map((x) => (
            <li key={x} className="flex gap-2">
              <span className="text-crimson">●</span>
              {x}
            </li>
          ))}
        </ul>
      )}

      {note && <p className="mt-3 text-xs italic text-faint">{note}</p>}
    </div>
  );
}
