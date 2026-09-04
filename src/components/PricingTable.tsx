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
 * This used to be an HTML <table>, then a boxed card list — both still read
 * as "a table" on a phone. Plain text lines (time range + price on one line,
 * the sailing/anchorage detail underneath) have no minimum width and no
 * columns to crop, so they reflow naturally at every screen size.
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
      <ul className="divide-y divide-line text-sm">
        {slots.map((s, i) => (
          <li key={i} className="py-3">
            <p className="font-medium text-navy">
              {s.start} – {s.end} <span className="text-faint">–</span>{" "}
              <span className="font-display font-semibold text-crimson">{inr(s.amount)}</span>
            </p>
            <p className="mt-0.5 text-muted">
              {s.sailing}
              {s.anchorage && <> · {s.anchorage}</>}
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
