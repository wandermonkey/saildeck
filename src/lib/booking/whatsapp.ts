import "server-only";
import type { BookingRow } from "./store";
import { inr } from "@/data/yachts";

/**
 * Sends an automated WhatsApp alert for a newly-confirmed booking, via
 * Meta's WhatsApp Cloud API. The sending number is whatever
 * WHATSAPP_PHONE_NUMBER_ID points at — it does NOT have to be
 * WHATSAPP_NOTIFY_TO, so the owner's own WhatsApp Business app number can
 * stay exactly as it is for customer chats.
 *
 * Business-initiated messages like this need an approved message template
 * (category: Utility) rather than free-form text — see .env.example for the
 * one-time setup this needs in Meta Business Manager. Until the env vars are
 * set, this logs instead of throwing, the same fallback used by
 * /api/enquiry when no mail provider is configured — a booking must never
 * be lost just because a notification channel isn't wired up yet.
 */
export async function sendBookingNotification(bookings: BookingRow[]): Promise<void> {
  const phoneNumberId = process.env.WHATSAPP_PHONE_NUMBER_ID;
  const accessToken = process.env.WHATSAPP_ACCESS_TOKEN;
  const templateName = process.env.WHATSAPP_TEMPLATE_NAME;
  const to = process.env.WHATSAPP_NOTIFY_TO;

  const summary = describeBookings(bookings);

  if (!phoneNumberId || !accessToken || !templateName || !to) {
    console.info("[whatsapp] not configured, logging booking instead:\n" + summary);
    return;
  }

  const first = bookings[0];
  const addonsLine = bookings
    .flatMap((b) => b.addons.map((a) => a.label))
    .join(", ") || "None";
  const commentLine = bookings.map((b) => b.comment).filter(Boolean).join(" | ") || "None";

  try {
    const res = await fetch(`https://graph.facebook.com/v19.0/${phoneNumberId}/messages`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        messaging_product: "whatsapp",
        to,
        type: "template",
        template: {
          name: templateName,
          language: { code: "en" },
          components: [
            {
              type: "body",
              parameters: [
                { type: "text", text: first.customerName },
                { type: "text", text: first.customerPhone },
                { type: "text", text: bookings.map((b) => b.yachtName).join(", ") },
                { type: "text", text: bookings.map((b) => `${b.bookingDate} (${b.slotStart}-${b.slotEnd})`).join(", ") },
                { type: "text", text: addonsLine },
                { type: "text", text: commentLine },
                { type: "text", text: inr(bookings.reduce((s, b) => s + b.depositAmount, 0)) },
                { type: "text", text: inr(bookings.reduce((s, b) => s + b.balanceAmount, 0)) },
              ],
            },
          ],
        },
      }),
    });

    if (!res.ok) {
      console.error("WhatsApp notification failed:", await res.text(), "\nBooking was:\n" + summary);
    }
  } catch (err) {
    console.error("WhatsApp notification request failed:", err, "\nBooking was:\n" + summary);
  }
}

function describeBookings(bookings: BookingRow[]): string {
  return bookings
    .map(
      (b) =>
        `${b.yachtName} — ${b.bookingDate} ${b.slotStart}-${b.slotEnd} — ${b.customerName} (${b.customerPhone}) — ` +
        `deposit ${inr(b.depositAmount)}, balance ${inr(b.balanceAmount)} — add-ons: ${b.addons.map((a) => a.label).join(", ") || "none"}` +
        (b.comment ? ` — note: ${b.comment}` : "")
    )
    .join("\n");
}
