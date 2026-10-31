import { NextResponse } from "next/server";
import { createHmac, timingSafeEqual } from "crypto";
import { confirmBookings } from "@/lib/booking/store";
import { sendBookingNotification } from "@/lib/booking/whatsapp";

/**
 * Verifies the Razorpay signature exactly like /api/razorpay/verify/route.ts
 * — never trust the client-side "success" callback alone — then flips the
 * held booking rows to confirmed and fires the WhatsApp notification.
 */
export async function POST(request: Request) {
  const keySecret = process.env.RAZORPAY_KEY_SECRET;
  if (!keySecret) {
    return NextResponse.json({ error: "Payments are not configured yet." }, { status: 503 });
  }

  let body: {
    razorpay_order_id?: string;
    razorpay_payment_id?: string;
    razorpay_signature?: string;
    bookingIds?: string[];
  };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const { razorpay_order_id, razorpay_payment_id, razorpay_signature, bookingIds } = body;
  if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature || !bookingIds?.length) {
    return NextResponse.json({ error: "Missing payment details." }, { status: 422 });
  }

  const expected = createHmac("sha256", keySecret)
    .update(`${razorpay_order_id}|${razorpay_payment_id}`)
    .digest("hex");

  const a = Buffer.from(expected);
  const b = Buffer.from(razorpay_signature);
  const valid = a.length === b.length && timingSafeEqual(a, b);

  if (!valid) {
    console.error("Razorpay signature mismatch for order", razorpay_order_id);
    return NextResponse.json({ error: "Payment could not be verified." }, { status: 400 });
  }

  const confirmed = await confirmBookings(bookingIds, razorpay_order_id, razorpay_payment_id);
  if (confirmed.length === 0) {
    console.error("Payment verified but no matching held bookings found for", bookingIds);
    return NextResponse.json({ error: "Payment verified, but the booking could not be found. Message us on WhatsApp with your payment ID." }, { status: 500 });
  }

  // Fire-and-forget: a booking must never be lost because a notification
  // channel failed, same philosophy as /api/enquiry's mail fallback.
  sendBookingNotification(confirmed).catch((err) => console.error("Booking notification failed:", err));

  return NextResponse.json({
    ok: true,
    bookings: confirmed.map((b) => ({
      id: b.id,
      yachtName: b.yachtName,
      bookingDate: b.bookingDate,
      slotStart: b.slotStart,
      slotEnd: b.slotEnd,
      totalPrice: b.totalPrice,
      depositAmount: b.depositAmount,
      balanceAmount: b.balanceAmount,
    })),
  });
}
