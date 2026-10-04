import { NextResponse } from "next/server";
import { createHmac, timingSafeEqual } from "crypto";

/**
 * Verifies the payment signature Razorpay's Checkout returns on success.
 * This is the step that actually confirms the payment is genuine — never
 * trust the client-side "success" callback alone, since that fires from the
 * browser and could in principle be forged.
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
    name?: string;
    email?: string;
    phone?: string;
  };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = body;
  if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
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

  // Verified. No database here yet — logged for now so a payment is never
  // silently lost, same pattern as the no-mail-provider fallback in
  // /api/enquiry. Wire this to email/Sheets/a DB when you're ready to track
  // these centrally rather than by log line.
  console.info(
    `[razorpay] Payment verified — order ${razorpay_order_id}, payment ${razorpay_payment_id}, ` +
      `name: ${body.name ?? "-"}, email: ${body.email ?? "-"}, phone: ${body.phone ?? "-"}`
  );

  return NextResponse.json({ ok: true });
}
