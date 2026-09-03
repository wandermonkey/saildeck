import type { PricingSlot } from "@/data/yachts";
import { inr } from "@/data/yachts";

/**
 * Charter time-slot pricing grid.
 *
 * Boats are often priced by departure slot rather than a flat hourly rate
 * once catering, tide and sunset timing are factored in — this renders that
 * table exactly as the operator supplies it, plus optional add-on charges and
 * a small-print note (e.g. permission requirements for an overnight sail).
 *
 * The table scrolls horizontally on narrow screens inside its own container
 * rather than forcing the page to scroll sideways.
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
      <div className="overflow-x-auto rounded-2xl border border-line bg-white">
        <table className="w-full min-w-[36rem] border-collapse text-sm">
          <thead>
            <tr className="bg-surface text-left text-xs font-semibold uppercase tracking-wide text-faint">
              <th className="px-5 py-3">Start time</th>
              <th className="px-5 py-3">End time</th>
              <th className="px-5 py-3">Sailing</th>
              <th className="px-5 py-3">Anchorage</th>
              <th className="px-5 py-3 text-right">Amount</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-line">
            {slots.map((s, i) => (
              <tr key={i}>
                <td className="whitespace-nowrap px-5 py-3 font-medium text-navy">{s.start}</td>
                <td className="whitespace-nowrap px-5 py-3 font-medium text-navy">{s.end}</td>
                <td className="px-5 py-3 text-muted">{s.sailing}</td>
                <td className="px-5 py-3 text-muted">{s.anchorage}</td>
                <td className="whitespace-nowrap px-5 py-3 text-right font-display font-semibold text-crimson">
                  {inr(s.amount)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

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
