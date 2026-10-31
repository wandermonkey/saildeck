import { NextResponse } from "next/server";
import { createHold, type HoldItemInput } from "@/lib/booking/store";

type RequestItem = {
  yachtSlug?: string;
  yachtName?: string;
  bookingDate?: string;
  slotId?: string;
  basePrice?: number;
  addons?: { id?: string; label?: string; price?: number }[];
  comment?: string;
};

type RequestBody = {
  items?: RequestItem[];
  customer?: { name?: string; phone?: string; email?: string };
};

/**
 * Re-validates every cart line against live availability, reserves them as
 * short-lived `held` rows, then opens a single Razorpay order for the
 * combined deposit — same order-creation pattern as
 * /api/razorpay/order/route.ts, just scoped to booking deposits.
 */
export async function POST(request: Request) {
  const keyId = process.env.RAZORPAY_KEY_ID;
  const keySecret = process.env.RAZORPAY_KEY_SECRET;
  if (!keyId || !keySecret) {
    return NextResponse.json(
      { error: "Payments are not configured yet. Set RAZORPAY_KEY_ID and RAZORPAY_KEY_SECRET." },
      { status: 503 }
    );
  }

  let body: RequestBody;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const name = String(body.customer?.name ?? "").trim();
  const phone = String(body.customer?.phone ?? "").trim();
  const email = String(body.customer?.email ?? "").trim();
  if (name.length < 2 || phone.length < 7) {
    return NextResponse.json({ error: "Please include your name and a contact number." }, { status: 422 });
  }

  const items: HoldItemInput[] = (body.items ?? []).map((item) => ({
    yachtSlug: String(item.yachtSlug ?? ""),
    yachtName: String(item.yachtName ?? ""),
    bookingDate: String(item.bookingDate ?? ""),
    slotId: String(item.slotId ?? ""),
    basePrice: Number(item.basePrice ?? 0),
    addons: (item.addons ?? []).map((a) => ({ id: String(a.id ?? ""), label: String(a.label ?? ""), price: Number(a.price ?? 0) })),
    comment: String(item.comment ?? "").slice(0, 1000),
  }));

  if (items.length === 0 || items.some((i) => !i.yachtSlug || !i.bookingDate || !i.slotId)) {
    return NextResponse.json({ error: "Cart is missing required details." }, { status: 422 });
  }

  let held;
  try {
    held = await createHold(items, { name, phone, email });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Could not reserve that slot.";
    return NextResponse.json({ error: message }, { status: 409 });
  }

  const depositTotal = held.reduce((sum, b) => sum + b.depositAmount, 0);
  const auth = Buffer.from(`${keyId}:${keySecret}`).toString("base64");

  try {
    const res = await fetch("https://api.razorpay.com/v1/orders", {
      method: "POST",
      headers: { Authorization: `Basic ${auth}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        amount: Math.round(depositTotal * 100),
        currency: "INR",
        notes: { name, phone, bookingIds: held.map((b) => b.id).join(",") },
      }),
    });

    if (!res.ok) {
      const text = await res.text();
      console.error("Razorpay order creation failed:", text);
      return NextResponse.json({ error: "Could not start the payment. Please try again." }, { status: 502 });
    }

    const order = await res.json();
    return NextResponse.json({
      orderId: order.id,
      amount: order.amount,
      currency: order.currency,
      keyId,
      bookingIds: held.map((b) => b.id),
      depositTotal,
    });
  } catch (err) {
    console.error("Razorpay order request failed:", err);
    return NextResponse.json({ error: "Could not reach the payment provider." }, { status: 502 });
  }
}
