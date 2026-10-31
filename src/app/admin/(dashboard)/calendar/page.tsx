import Link from "next/link";
import { yachts, basePrice } from "@/data/yachts";
import { ALL_SLOTS, getSlot, slotsOverlap } from "@/lib/booking/slots";
import { listBookingsForRange } from "@/lib/booking/store";
import { addDays, todayLocal } from "@/lib/booking/dates";
import { CalendarCell } from "./CalendarCell";

export const dynamic = "force-dynamic";
export const metadata = { title: "Calendar" };

const DATE_RE = /^\d{4}-\d{2}-\d{2}$/;

export default async function CalendarPage({
  searchParams,
}: {
  searchParams: Promise<{ slug?: string; from?: string }>;
}) {
  const sp = await searchParams;
  const slug = yachts.some((y) => y.slug === sp.slug) ? sp.slug! : yachts[0].slug;
  const yacht = yachts.find((y) => y.slug === slug)!;
  const from = sp.from && DATE_RE.test(sp.from) ? sp.from : todayLocal();
  const to = addDays(from, 6);
  const dates = Array.from({ length: 7 }, (_, i) => addDays(from, i));

  const rows = await listBookingsForRange(slug, from, to);
  const price = basePrice(yacht);

  function cellFor(date: string, slotId: string) {
    const slot = getSlot(slotId);
    if (!slot) return null;
    const row = rows.find((r) => r.bookingDate === date && (() => { const s = getSlot(r.slotId); return s ? slotsOverlap(s, slot) : false; })());
    if (!row) return null;
    return { id: row.id, status: row.status, customerName: row.customerName, customerPhone: row.customerPhone, blockReason: row.blockReason };
  }

  return (
    <div className="container-x py-8">
      <h1 className="font-display text-2xl text-navy">Booking calendar</h1>

      <div className="mt-5 flex flex-wrap items-end gap-4">
        <form method="get" className="flex items-end gap-2">
          <label className="block">
            <span className="mb-1 block text-xs font-semibold uppercase tracking-wide text-muted">Boat</span>
            <select name="slug" defaultValue={slug} className="rounded-lg border border-line bg-white px-3 py-2 text-sm">
              {yachts.map((y) => (
                <option key={y.slug} value={y.slug}>
                  {y.name}
                </option>
              ))}
            </select>
          </label>
          <input type="hidden" name="from" value={from} />
          <button type="submit" className="rounded-lg border border-line px-3 py-2 text-sm font-medium text-navy hover:border-crimson hover:text-crimson">
            View
          </button>
        </form>

        <div className="flex items-center gap-2">
          <Link
            href={`/admin/calendar?slug=${slug}&from=${addDays(from, -7)}`}
            className="rounded-lg border border-line px-3 py-2 text-sm font-medium text-navy hover:border-crimson hover:text-crimson"
          >
            ← Previous week
          </Link>
          <Link
            href={`/admin/calendar?slug=${slug}&from=${todayLocal()}`}
            className="rounded-lg border border-line px-3 py-2 text-sm font-medium text-navy hover:border-crimson hover:text-crimson"
          >
            Today
          </Link>
          <Link
            href={`/admin/calendar?slug=${slug}&from=${addDays(from, 7)}`}
            className="rounded-lg border border-line px-3 py-2 text-sm font-medium text-navy hover:border-crimson hover:text-crimson"
          >
            Next week →
          </Link>
        </div>
      </div>

      <p className="mt-3 text-sm text-muted">
        {yacht.name} · base price {price} per standard 2-hour slot · {from} – {to}
      </p>

      <div className="mt-5 overflow-x-auto">
        <table className="w-full min-w-[960px] border-separate border-spacing-2">
          <thead>
            <tr>
              <th className="w-28 text-left text-xs font-semibold uppercase tracking-wide text-muted">Slot</th>
              {dates.map((date) => (
                <th key={date} className="text-left text-xs font-semibold uppercase tracking-wide text-muted">
                  {new Date(date + "T00:00:00").toLocaleDateString("en-IN", { weekday: "short", day: "numeric", month: "short" })}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {ALL_SLOTS.map((slot) => (
              <tr key={slot.id}>
                <td className="align-top text-xs font-medium text-navy">
                  {slot.label}
                  {slot.kind === "special" && <span className="ml-1 text-faint">(+{slot.surchargePct}%)</span>}
                </td>
                {dates.map((date) => (
                  <td key={date} className="align-top">
                    <CalendarCell
                      date={date}
                      slotId={slot.id}
                      slotLabel={slot.label}
                      yachtSlug={yacht.slug}
                      yachtName={yacht.name}
                      basePrice={price}
                      booking={cellFor(date, slot.id)}
                    />
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
