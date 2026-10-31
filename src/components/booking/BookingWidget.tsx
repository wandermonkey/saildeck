"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { ALL_SLOTS, slotPrice } from "@/lib/booking/slots";
import { inr } from "@/data/yachts";
import { useCart } from "./CartProvider";

/**
 * Lives in the sticky booking card on a boat's page. Picking a date fetches
 * live availability so taken/blocked slots grey out before the visitor
 * wastes a click choosing one — final availability is still re-checked
 * server-side at checkout, since this is a best-effort UI hint, not a lock.
 */
export function BookingWidget({
  yachtSlug,
  yachtName,
  basePrice,
}: {
  yachtSlug: string;
  yachtName: string;
  basePrice: number;
}) {
  const { addItem } = useCart();
  const [date, setDate] = useState("");
  const [slotId, setSlotId] = useState("");
  const [availability, setAvailability] = useState<Record<string, boolean> | null>(null);
  const [loading, setLoading] = useState(false);
  const [added, setAdded] = useState(false);

  const todayStr = useMemo(() => new Date().toISOString().slice(0, 10), []);

  useEffect(() => {
    setAdded(false);
    setSlotId("");
    if (!date) {
      setAvailability(null);
      return;
    }
    setLoading(true);
    fetch(`/api/booking/availability?slug=${encodeURIComponent(yachtSlug)}&date=${date}`)
      .then((r) => r.json())
      .then((data) => setAvailability(data.availability ?? null))
      .catch(() => setAvailability(null))
      .finally(() => setLoading(false));
  }, [date, yachtSlug]);

  function handleAdd() {
    const slot = ALL_SLOTS.find((s) => s.id === slotId);
    if (!date || !slot) return;
    addItem({
      yachtSlug,
      yachtName,
      bookingDate: date,
      slotId: slot.id,
      slotLabel: slot.label,
      basePrice,
      slotPrice: slotPrice(basePrice, slot),
    });
    setAdded(true);
    setSlotId("");
  }

  return (
    <div className="mt-5 rounded-xl border border-line bg-surface p-4">
      <p className="text-xs font-semibold uppercase tracking-wide text-navy">Book this boat</p>

      <label className="mt-3 block">
        <span className="mb-1 block text-xs text-muted">Date</span>
        <input
          type="date"
          min={todayStr}
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="w-full rounded-lg border border-line bg-white px-3 py-2 text-sm text-ink outline-none focus:border-crimson"
        />
      </label>

      {date && (
        <div className="mt-3">
          <span className="mb-1.5 block text-xs text-muted">Slot</span>
          {loading ? (
            <p className="text-xs text-faint">Checking availability…</p>
          ) : (
            <div className="grid grid-cols-2 gap-2">
              {ALL_SLOTS.map((slot) => {
                const price = slotPrice(basePrice, slot);
                const available = availability ? availability[slot.id] !== false : true;
                return (
                  <button
                    key={slot.id}
                    type="button"
                    disabled={!available}
                    onClick={() => setSlotId(slot.id)}
                    data-cta="yacht-slot-select"
                    className={`rounded-lg border px-2.5 py-2 text-left text-xs transition-colors ${
                      slotId === slot.id ? "border-crimson bg-crimson-soft" : "border-line bg-white hover:border-crimson"
                    } ${!available ? "cursor-not-allowed opacity-40" : ""}`}
                  >
                    <span className="block font-medium text-navy">{slot.label}</span>
                    <span className="block text-faint">
                      {inr(price)}
                      {slot.kind === "special" && ` (+${slot.surchargePct}%)`}
                      {!available && " — booked"}
                    </span>
                  </button>
                );
              })}
            </div>
          )}
        </div>
      )}

      <button
        type="button"
        onClick={handleAdd}
        disabled={!date || !slotId}
        data-cta="yacht-add-to-cart"
        className="mt-4 flex w-full items-center justify-center gap-2 rounded-full bg-crimson px-6 py-3 text-sm font-semibold text-white transition-all hover:-translate-y-0.5 hover:bg-crimson-dark disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:translate-y-0"
      >
        Add to cart
      </button>

      {added && (
        <p className="mt-3 text-center text-xs text-teal">
          Added to cart.{" "}
          <Link href="/cart" className="font-semibold underline">
            View cart →
          </Link>
        </p>
      )}
    </div>
  );
}
