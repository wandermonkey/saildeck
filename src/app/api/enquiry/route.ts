import { NextResponse } from "next/server";
import { site } from "@/lib/site";

/**
 * Enquiry endpoint.
 *
 * By default this only validates and logs — no email provider is wired up, so
 * the site works out of the box without secrets. Set RESEND_API_KEY and
 * ENQUIRY_TO_EMAIL in .env.local and the same handler starts sending mail.
 *
 * The WhatsApp path in the form is deliberately independent of this route, so
 * leads still reach you even if email delivery is misconfigured.
 */

type Enquiry = {
  name: string;
  phone: string;
  email?: string;
  city?: string;
  date?: string;
  guests?: string;
  occasion?: string;
  message?: string;
};

/** Crude in-memory rate limit: enough to stop casual form spam on a single
 *  instance. For anything serious, put Cloudflare Turnstile in front. */
const hits = new Map<string, { count: number; reset: number }>();

function rateLimited(ip: string) {
  const now = Date.now();
  const entry = hits.get(ip);
  if (!entry || now > entry.reset) {
    hits.set(ip, { count: 1, reset: now + 60_000 });
    return false;
  }
  entry.count += 1;
  return entry.count > 5;
}

export async function POST(request: Request) {
  const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";
  if (rateLimited(ip)) {
    return NextResponse.json({ error: "Too many requests" }, { status: 429 });
  }

  let body: Enquiry;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const name = String(body.name ?? "").trim();
  const phone = String(body.phone ?? "").trim();

  if (name.length < 2 || phone.length < 7) {
    return NextResponse.json(
      { error: "Please include your name and a contact number." },
      { status: 422 }
    );
  }

  const lines = [
    `New charter enquiry from ${site.url}`,
    "",
    `Name:     ${name}`,
    `Phone:    ${phone}`,
    `Email:    ${body.email || "-"}`,
    `City:     ${body.city || "-"}`,
    `Date:     ${body.date || "-"}`,
    `Guests:   ${body.guests || "-"}`,
    `Occasion: ${body.occasion || "-"}`,
    "",
    `Message:  ${body.message || "-"}`,
  ].join("\n");

  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.ENQUIRY_TO_EMAIL;

  if (apiKey && to) {
    try {
      const res = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${apiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          from: "Saildeck Website <enquiries@saildeck.com>",
          to: [to],
          reply_to: body.email || undefined,
          subject: `Charter enquiry — ${name} (${body.city || "unspecified"})`,
          text: lines,
        }),
      });

      if (!res.ok) {
        // Log and still return success: the lead is captured in the logs, and
        // failing the request would push the visitor away for our problem.
        console.error("Resend rejected the enquiry:", await res.text());
      }
    } catch (err) {
      console.error("Enquiry email failed:", err);
    }
  } else {
    console.info("[enquiry] no mail provider configured, logging instead:\n" + lines);
  }

  return NextResponse.json({ ok: true });
}
