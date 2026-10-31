import { NextResponse } from "next/server";
import { getAvailability } from "@/lib/booking/store";

const DATE_RE = /^\d{4}-\d{2}-\d{2}$/;

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const slug = searchParams.get("slug") ?? "";
  const date = searchParams.get("date") ?? "";

  if (!slug || !DATE_RE.test(date)) {
    return NextResponse.json({ error: "Provide a boat slug and a date (YYYY-MM-DD)." }, { status: 422 });
  }

  try {
    const availability = await getAvailability(slug, date);
    return NextResponse.json({ availability });
  } catch (err) {
    console.error("Availability lookup failed:", err);
    return NextResponse.json({ error: "Could not check availability. Please try again." }, { status: 502 });
  }
}
