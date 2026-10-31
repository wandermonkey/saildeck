"use client";

import { useState } from "react";
import { bookForCustomer, blockSlotAction, cancelBookingAction } from "../actions";

type CellBooking = {
  id: string;
  status: string;
  customerName: string;
  customerPhone: string;
  blockReason: string;
};

export function CalendarCell({
  date,
  slotId,
  slotLabel,
  yachtSlug,
  yachtName,
  basePrice,
  booking,
}: {
  date: string;
  slotId: string;
  slotLabel: string;
  yachtSlug: string;
  yachtName: string;
  basePrice: number;
  booking: CellBooking | null;
}) {
  const [open, setOpen] = useState(false);

  const tone = !booking
    ? "border-line bg-white hover:border-crimson"
    : booking.status === "blocked"
    ? "border-line bg-surface-2"
    : booking.status === "held"
    ? "border-amber-300 bg-amber-50"
    : "border-teal bg-teal-soft";

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className={`w-full rounded-lg border px-2 py-1.5 text-left text-[11px] transition-colors ${tone}`}
      >
        {!booking && <span className="text-faint">Available</span>}
        {booking?.status === "confirmed" && (
          <>
            <span className="block font-medium text-navy">{booking.customerName || "Booked"}</span>
            <span className="block text-faint">{booking.customerPhone}</span>
          </>
        )}
        {booking?.status === "held" && <span className="text-amber-700">Held — checkout in progress</span>}
        {booking?.status === "blocked" && (
          <>
            <span className="block font-medium text-navy">Blocked</span>
            <span className="block text-faint">{booking.blockReason}</span>
          </>
        )}
      </button>

      {open && (
        <div className="absolute left-0 top-full z-20 mt-1 w-60 rounded-xl border border-line bg-white p-3 shadow-[var(--shadow-float)]">
          <p className="text-xs font-semibold text-navy">{slotLabel}</p>

          {!booking ? (
            <>
              <form action={bookForCustomer} className="mt-2 space-y-1.5">
                <input type="hidden" name="yachtSlug" value={yachtSlug} />
                <input type="hidden" name="yachtName" value={yachtName} />
                <input type="hidden" name="bookingDate" value={date} />
                <input type="hidden" name="slotId" value={slotId} />
                <input type="hidden" name="basePrice" value={basePrice} />
                <input name="customerName" placeholder="Customer name" required className="w-full rounded border border-line px-2 py-1.5 text-xs" />
                <input name="customerPhone" placeholder="Phone" required className="w-full rounded border border-line px-2 py-1.5 text-xs" />
                <button type="submit" className="w-full rounded-full bg-crimson px-3 py-1.5 text-xs font-semibold text-white hover:bg-crimson-dark">
                  Book for customer
                </button>
              </form>
              <form action={blockSlotAction} className="mt-2 space-y-1.5 border-t border-line pt-2">
                <input type="hidden" name="yachtSlug" value={yachtSlug} />
                <input type="hidden" name="yachtName" value={yachtName} />
                <input type="hidden" name="bookingDate" value={date} />
                <input type="hidden" name="slotId" value={slotId} />
                <input name="reason" placeholder="Reason (e.g. maintenance)" className="w-full rounded border border-line px-2 py-1.5 text-xs" />
                <button type="submit" className="w-full rounded-full border border-line px-3 py-1.5 text-xs font-medium text-navy hover:border-crimson hover:text-crimson">
                  Block this slot
                </button>
              </form>
            </>
          ) : (
            <form action={cancelBookingAction.bind(null, booking.id)} className="mt-2">
              <button type="submit" className="w-full rounded-full border border-line px-3 py-1.5 text-xs font-medium text-crimson hover:bg-crimson-soft">
                {booking.status === "blocked" ? "Unblock" : "Cancel booking"}
              </button>
            </form>
          )}
        </div>
      )}
    </div>
  );
}
