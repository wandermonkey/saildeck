import type { PricingSlot } from "@/data/yachts";

/**
 * Charter time-slot list ("Slots and Timings").
 *
 * Deliberately shows only departure windows and what each slot covers, not
 * a per-slot price — the single headline price lives in the sticky booking
 * card instead, so there's one number per boat rather than a price next to
 * every row.
 *
 * This used to be an HTML <table>, then a boxed card list — both still read
 * as "a table" on a phone. Plain text lines (time range, then the
 * sailing/anchorage detail underneath) have no minimum width and no columns
 * to crop, so they reflow naturally at every screen size.
 */
export function PricingTable({
  slots,
  inclusions,
  extras,
  note,
}: {
  slots: PricingSlot[];
  inclusions?: string[];
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
              {s.start} – {s.end}
            </p>
            <p className="mt-0.5 text-muted">
              {s.sailing}
              {s.anchorage && <> · {s.anchorage}</>}
            </p>
          </li>
        ))}
      </ul>

      {inclusions && inclusions.length > 0 && (
        <div className="mt-5 rounded-xl border border-line bg-teal-soft/40 p-4">
          <p className="text-xs font-semibold uppercase tracking-wide text-teal">Inclusions</p>
          <ul className="mt-2.5 space-y-2 text-sm font-medium text-navy">
            {inclusions.map((x) => (
              <li key={x} className="flex gap-2">
                <span className="mt-0.5 text-teal">●</span>
                <span>{x}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {extras && extras.length > 0 && (
        <div className="mt-5 rounded-xl border border-line bg-surface p-4">
          <p className="text-xs font-semibold uppercase tracking-wide text-crimson">Add-ons</p>
          <ul className="mt-2.5 space-y-2 text-sm font-medium text-navy">
            {extras.map((x) => (
              <li key={x} className="flex gap-2">
                <span className="mt-0.5 text-crimson">●</span>
                <span>{x}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {note && <p className="mt-3 text-xs italic text-faint">{note}</p>}
    </div>
  );
}
