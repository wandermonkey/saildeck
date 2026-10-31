import "server-only";
import { randomUUID } from "node:crypto";
import { db } from "./db";
import { ALL_SLOTS, getSlot, slotPrice, slotsOverlap, type SlotId } from "./slots";

export type BookingStatus = "held" | "confirmed" | "cancelled" | "expired" | "blocked";

export type AddonLine = { id: string; label: string; price: number };

export type BookingRow = {
  id: string;
  yachtSlug: string;
  yachtName: string;
  bookingDate: string;
  slotId: string;
  slotStart: string;
  slotEnd: string;
  basePrice: number;
  slotPrice: number;
  addons: AddonLine[];
  addonsTotal: number;
  comment: string;
  totalPrice: number;
  depositAmount: number;
  balanceAmount: number;
  customerName: string;
  customerPhone: string;
  customerEmail: string;
  status: BookingStatus;
  holdExpiresAt: number | null;
  razorpayOrderId: string;
  razorpayPaymentId: string;
  source: string;
  createdByAdminId: string;
  blockReason: string;
  createdAt: number;
  updatedAt: number;
};

const HOLD_MINUTES = 15;
const DEPOSIT_RATE = 0.5;

function toRow(r: Record<string, unknown>): BookingRow {
  return {
    id: String(r.id),
    yachtSlug: String(r.yacht_slug),
    yachtName: String(r.yacht_name),
    bookingDate: String(r.booking_date),
    slotId: String(r.slot_id),
    slotStart: String(r.slot_start),
    slotEnd: String(r.slot_end),
    basePrice: Number(r.base_price),
    slotPrice: Number(r.slot_price),
    addons: JSON.parse(String(r.addons_json || "[]")),
    addonsTotal: Number(r.addons_total),
    comment: String(r.comment ?? ""),
    totalPrice: Number(r.total_price),
    depositAmount: Number(r.deposit_amount),
    balanceAmount: Number(r.balance_amount),
    customerName: String(r.customer_name ?? ""),
    customerPhone: String(r.customer_phone ?? ""),
    customerEmail: String(r.customer_email ?? ""),
    status: String(r.status) as BookingStatus,
    holdExpiresAt: r.hold_expires_at == null ? null : Number(r.hold_expires_at),
    razorpayOrderId: String(r.razorpay_order_id ?? ""),
    razorpayPaymentId: String(r.razorpay_payment_id ?? ""),
    source: String(r.source ?? "website"),
    createdByAdminId: String(r.created_by_admin_id ?? ""),
    blockReason: String(r.block_reason ?? ""),
    createdAt: Number(r.created_at),
    updatedAt: Number(r.updated_at),
  };
}

/** Rows that actually occupy a slot right now: confirmed/blocked always, a
 *  held row only while its hold hasn't expired. Also opportunistically
 *  deletes long-expired holds so the table doesn't accumulate abandoned
 *  carts forever. */
async function activeRowsForDate(yachtSlug: string, bookingDate: string): Promise<BookingRow[]> {
  const client = await db();
  const now = Date.now();

  await client.execute({
    sql: `DELETE FROM bookings WHERE status = 'held' AND hold_expires_at < ?`,
    args: [now - 60_000],
  });

  const res = await client.execute({
    sql: `SELECT * FROM bookings WHERE yacht_slug = ? AND booking_date = ?
          AND (status IN ('confirmed','blocked') OR (status = 'held' AND hold_expires_at >= ?))`,
    args: [yachtSlug, bookingDate, now],
  });
  return res.rows.map((r) => toRow(r as Record<string, unknown>));
}

/** Per-slot availability for a boat on a date, true = bookable. */
export async function getAvailability(yachtSlug: string, bookingDate: string): Promise<Record<SlotId, boolean>> {
  const active = await activeRowsForDate(yachtSlug, bookingDate);
  const result = {} as Record<SlotId, boolean>;
  for (const slot of ALL_SLOTS) {
    result[slot.id] = !active.some((row) => {
      const rowSlot = getSlot(row.slotId);
      return rowSlot ? slotsOverlap(rowSlot, slot) : false;
    });
  }
  return result;
}

export type HoldItemInput = {
  yachtSlug: string;
  yachtName: string;
  bookingDate: string;
  slotId: string;
  basePrice: number;
  addons: AddonLine[];
  comment: string;
};

export type CustomerInfo = {
  name: string;
  phone: string;
  email: string;
};

/** Validates every cart line against current availability (including the
 *  other lines in the same cart, so the same slot can't be requested twice
 *  in one go), then inserts them all as short-lived `held` rows. Throws with
 *  a human-readable message if anything in the cart is no longer available —
 *  the caller should show that to the customer rather than retry blindly. */
export async function createHold(items: HoldItemInput[], customer: CustomerInfo): Promise<BookingRow[]> {
  if (items.length === 0) throw new Error("Cart is empty.");

  const client = await db();
  const now = Date.now();
  const holdExpiresAt = now + HOLD_MINUTES * 60_000;

  const byKey = new Map<string, HoldItemInput[]>();
  for (const item of items) {
    const key = `${item.yachtSlug}|${item.bookingDate}`;
    byKey.set(key, [...(byKey.get(key) ?? []), item]);
  }

  for (const [, group] of byKey) {
    const [{ yachtSlug, bookingDate }] = group;
    const active = await activeRowsForDate(yachtSlug, bookingDate);
    const activeSlots = active.map((row) => getSlot(row.slotId)).filter((s): s is NonNullable<typeof s> => !!s);
    const claimedSlots: typeof activeSlots = [];

    for (const item of group) {
      const slot = getSlot(item.slotId);
      if (!slot) throw new Error(`Unknown slot "${item.slotId}".`);
      const taken = [...activeSlots, ...claimedSlots].some((existing) => slotsOverlap(existing, slot));
      if (taken) {
        throw new Error(`${item.yachtName} is no longer available on ${item.bookingDate} for that slot — please pick another.`);
      }
      claimedSlots.push(slot);
    }
  }

  const rows: BookingRow[] = [];
  for (const item of items) {
    const slot = getSlot(item.slotId);
    if (!slot) throw new Error(`Unknown slot "${item.slotId}".`);
    const price = slotPrice(item.basePrice, slot);
    const addonsTotal = item.addons.reduce((sum, a) => sum + a.price, 0);
    const total = price + addonsTotal;
    const deposit = Math.round(total * DEPOSIT_RATE);
    const balance = total - deposit;
    const id = randomUUID();

    await client.execute({
      sql: `INSERT INTO bookings (
              id, yacht_slug, yacht_name, booking_date, slot_id, slot_start, slot_end,
              base_price, slot_price, addons_json, addons_total, comment, total_price,
              deposit_amount, balance_amount, customer_name, customer_phone, customer_email,
              status, hold_expires_at, source, created_at, updated_at
            ) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,'held',?,'website',?,?)`,
      args: [
        id, item.yachtSlug, item.yachtName, item.bookingDate, item.slotId, slot.start, slot.end,
        item.basePrice, price, JSON.stringify(item.addons), addonsTotal, item.comment, total,
        deposit, balance, customer.name, customer.phone, customer.email,
        holdExpiresAt, now, now,
      ],
    });

    rows.push({
      id, yachtSlug: item.yachtSlug, yachtName: item.yachtName, bookingDate: item.bookingDate,
      slotId: item.slotId, slotStart: slot.start, slotEnd: slot.end, basePrice: item.basePrice,
      slotPrice: price, addons: item.addons, addonsTotal, comment: item.comment, totalPrice: total,
      depositAmount: deposit, balanceAmount: balance, customerName: customer.name,
      customerPhone: customer.phone, customerEmail: customer.email, status: "held",
      holdExpiresAt, razorpayOrderId: "", razorpayPaymentId: "", source: "website",
      createdByAdminId: "", blockReason: "", createdAt: now, updatedAt: now,
    });
  }

  return rows;
}

export async function confirmBookings(ids: string[], razorpayOrderId: string, razorpayPaymentId: string): Promise<BookingRow[]> {
  const client = await db();
  const now = Date.now();
  const confirmed: BookingRow[] = [];
  for (const id of ids) {
    await client.execute({
      sql: `UPDATE bookings SET status='confirmed', razorpay_order_id=?, razorpay_payment_id=?, hold_expires_at=NULL, updated_at=?
            WHERE id=? AND status='held'`,
      args: [razorpayOrderId, razorpayPaymentId, now, id],
    });
    const res = await client.execute({ sql: `SELECT * FROM bookings WHERE id=?`, args: [id] });
    if (res.rows[0]) confirmed.push(toRow(res.rows[0] as Record<string, unknown>));
  }
  return confirmed;
}

export type AdminBookingInput = {
  yachtSlug: string;
  yachtName: string;
  bookingDate: string;
  slotId: string;
  basePrice: number;
  customerName: string;
  customerPhone: string;
  customerEmail?: string;
  comment?: string;
  adminId: string;
};

/** Admin books a slot directly for a customer — confirmed immediately, no
 *  payment required (the owner collects payment however they choose). */
export async function createAdminBooking(input: AdminBookingInput): Promise<string> {
  const slot = getSlot(input.slotId);
  if (!slot) throw new Error(`Unknown slot "${input.slotId}".`);

  const active = await activeRowsForDate(input.yachtSlug, input.bookingDate);
  if (active.some((row) => { const s = getSlot(row.slotId); return s ? slotsOverlap(s, slot) : false; })) {
    throw new Error("That slot is already booked or blocked.");
  }

  const client = await db();
  const now = Date.now();
  const price = slotPrice(input.basePrice, slot);
  const id = randomUUID();

  await client.execute({
    sql: `INSERT INTO bookings (
            id, yacht_slug, yacht_name, booking_date, slot_id, slot_start, slot_end,
            base_price, slot_price, addons_json, addons_total, comment, total_price,
            deposit_amount, balance_amount, customer_name, customer_phone, customer_email,
            status, source, created_by_admin_id, created_at, updated_at
          ) VALUES (?,?,?,?,?,?,?,?,?,'[]',0,?,?,?,?,?,?,?,'confirmed','admin',?,?,?)`,
    args: [
      id, input.yachtSlug, input.yachtName, input.bookingDate, input.slotId, slot.start, slot.end,
      input.basePrice, price, input.comment ?? "", price, price, 0,
      input.customerName, input.customerPhone, input.customerEmail ?? "",
      input.adminId, now, now,
    ],
  });

  return id;
}

export type BlockInput = {
  yachtSlug: string;
  yachtName: string;
  bookingDate: string;
  slotId: string;
  reason: string;
  adminId: string;
};

export async function createBlock(input: BlockInput): Promise<string> {
  const slot = getSlot(input.slotId);
  if (!slot) throw new Error(`Unknown slot "${input.slotId}".`);

  const active = await activeRowsForDate(input.yachtSlug, input.bookingDate);
  if (active.some((row) => { const s = getSlot(row.slotId); return s ? slotsOverlap(s, slot) : false; })) {
    throw new Error("That slot already has a booking or block on it.");
  }

  const client = await db();
  const now = Date.now();
  const id = randomUUID();

  await client.execute({
    sql: `INSERT INTO bookings (
            id, yacht_slug, yacht_name, booking_date, slot_id, slot_start, slot_end,
            base_price, slot_price, addons_json, addons_total, total_price, deposit_amount, balance_amount,
            status, source, created_by_admin_id, block_reason, created_at, updated_at
          ) VALUES (?,?,?,?,?,?,?,0,0,'[]',0,0,0,0,'blocked','admin',?,?,?,?)`,
    args: [id, input.yachtSlug, input.yachtName, input.bookingDate, input.slotId, slot.start, slot.end, input.adminId, input.reason, now, now],
  });

  return id;
}

export async function cancelBooking(id: string): Promise<void> {
  const client = await db();
  await client.execute({
    sql: `UPDATE bookings SET status='cancelled', updated_at=? WHERE id=?`,
    args: [Date.now(), id],
  });
}

/** Everything occupying a boat's calendar across a date range, for the admin
 *  week view. Includes held rows regardless of expiry so admins can see
 *  "someone's mid-checkout" — expired ones are visually distinguishable via
 *  `holdExpiresAt`. */
export async function listBookingsForRange(yachtSlug: string, fromDate: string, toDate: string): Promise<BookingRow[]> {
  const client = await db();
  const res = await client.execute({
    sql: `SELECT * FROM bookings WHERE yacht_slug = ? AND booking_date BETWEEN ? AND ?
          AND status != 'cancelled' AND status != 'expired'
          ORDER BY booking_date, slot_start`,
    args: [yachtSlug, fromDate, toDate],
  });
  return res.rows.map((r) => toRow(r as Record<string, unknown>));
}
