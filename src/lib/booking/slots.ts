/**
 * Canonical booking slots, identical for every boat in the fleet — separate
 * from each `Yacht`'s own `pricingSlots` display copy (which varies boat to
 * boat and exists only to render the marketing pricing table). A boat's
 * single booking price is its `basePrice` (see `src/data/yachts.ts`); every
 * standard slot costs that price, and every special slot costs that price
 * plus a surcharge.
 */

export type SlotId = "7-9" | "9-11" | "1-3" | "3-5" | "4-6" | "6-8" | "5-7" | "5-8" | "5-9";

export type SlotDef = {
  id: SlotId;
  label: string;
  /** 24-hour "HH:MM", used for overlap checks. */
  start: string;
  end: string;
  kind: "standard" | "special";
  /** % added on top of the boat's base price. 0 for standard slots. */
  surchargePct: number;
};

export const STANDARD_SLOTS: SlotDef[] = [
  { id: "7-9", label: "7:00 AM – 9:00 AM", start: "07:00", end: "09:00", kind: "standard", surchargePct: 0 },
  { id: "9-11", label: "9:00 AM – 11:00 AM", start: "09:00", end: "11:00", kind: "standard", surchargePct: 0 },
  { id: "1-3", label: "1:00 PM – 3:00 PM", start: "13:00", end: "15:00", kind: "standard", surchargePct: 0 },
  { id: "3-5", label: "3:00 PM – 5:00 PM", start: "15:00", end: "17:00", kind: "standard", surchargePct: 0 },
  { id: "4-6", label: "4:00 PM – 6:00 PM", start: "16:00", end: "18:00", kind: "standard", surchargePct: 0 },
  { id: "6-8", label: "6:00 PM – 8:00 PM", start: "18:00", end: "20:00", kind: "standard", surchargePct: 0 },
];

export const SPECIAL_SLOTS: SlotDef[] = [
  { id: "5-7", label: "5:00 PM – 7:00 PM", start: "17:00", end: "19:00", kind: "special", surchargePct: 30 },
  { id: "5-8", label: "5:00 PM – 8:00 PM", start: "17:00", end: "20:00", kind: "special", surchargePct: 50 },
  { id: "5-9", label: "5:00 PM – 9:00 PM", start: "17:00", end: "21:00", kind: "special", surchargePct: 70 },
];

export const ALL_SLOTS: SlotDef[] = [...STANDARD_SLOTS, ...SPECIAL_SLOTS];

export function getSlot(id: string): SlotDef | undefined {
  return ALL_SLOTS.find((s) => s.id === id);
}

/** The price a given slot costs for a boat with this base (standard-slot) price. */
export function slotPrice(basePrice: number, slot: SlotDef): number {
  return Math.round(basePrice * (1 + slot.surchargePct / 100));
}

function toMinutes(hhmm: string): number {
  const [h, m] = hhmm.split(":").map(Number);
  return h * 60 + m;
}

/** True if two slots' time ranges intersect — e.g. 3–5pm and 4–6pm, or 6–8pm
 *  and the 5–9pm special. A boat can only run one charter at a time, so an
 *  overlapping slot must be treated as unavailable, not just an exact match. */
export function slotsOverlap(a: SlotDef, b: SlotDef): boolean {
  return toMinutes(a.start) < toMinutes(b.end) && toMinutes(b.start) < toMinutes(a.end);
}
