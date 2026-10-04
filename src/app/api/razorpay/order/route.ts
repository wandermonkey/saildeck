import { NextResponse } from "next/server";

/**
 * Creates a Razorpay order server-side, using the secret key, so the client
 * never touches it. Plain fetch against Razorpay's REST API rather than
 * their SDK — one dependency saved for one endpoint — same approach already
 * used for the Resend email call in /api/enquiry.
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

  let body: { amount?: number; name?: string; note?: string };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const amount = Number(body.amount);
  if (!Number.isFinite(amount) || amount < 1 || amount > 1_000_000) {
    return NextResponse.json({ error: "Enter an amount between ₹1 and ₹10,00,000." }, { status: 422 });
  }

  const auth = Buffer.from(`${keyId}:${keySecret}`).toString("base64");

  try {
    const res = await fetch("https://api.razorpay.com/v1/orders", {
      method: "POST",
      headers: {
        Authorization: `Basic ${auth}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        // Razorpay takes amount in paise, INR only.
        amount: Math.round(amount * 100),
        currency: "INR",
        notes: {
          name: body.name?.slice(0, 200) ?? "",
          note: body.note?.slice(0, 500) ?? "",
        },
      }),
    });

    if (!res.ok) {
      const text = await res.text();
      console.error("Razorpay order creation failed:", text);
      return NextResponse.json({ error: "Could not start the payment. Please try again." }, { status: 502 });
    }

    const order = await res.json();
    return NextResponse.json({ orderId: order.id, amount: order.amount, currency: order.currency, keyId });
  } catch (err) {
    console.error("Razorpay order request failed:", err);
    return NextResponse.json({ error: "Could not reach the payment provider." }, { status: 502 });
  }
}
