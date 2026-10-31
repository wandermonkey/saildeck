"use client";

import { Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { CheckIcon, WhatsAppIcon } from "@/components/icons";
import { whatsappLink } from "@/lib/site";

function Confirmation() {
  const ids = useSearchParams().get("ids")?.split(",").filter(Boolean) ?? [];

  return (
    <section className="py-16 md:py-24">
      <div className="container-x mx-auto max-w-lg text-center">
        <div className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-teal-soft text-teal">
          <CheckIcon className="h-8 w-8" />
        </div>
        <h1 className="mt-6 text-3xl">Booking confirmed</h1>
        <p className="mt-3 text-muted">
          Thank you — your deposit has been received and your slot is reserved. We&apos;ll be in touch on WhatsApp
          shortly to confirm the details and arrange the balance payment on the day.
        </p>

        {ids.length > 0 && (
          <p className="mt-4 rounded-xl bg-surface p-3.5 text-xs text-muted">
            Booking reference{ids.length > 1 ? "s" : ""}: {ids.join(", ")}
          </p>
        )}

        <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
          <a
            href={whatsappLink("Hi Saildeck! I just completed a booking on the website and wanted to confirm the details.")}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 rounded-full bg-[#25D366] px-6 py-3.5 font-semibold text-[#04210f] transition-all hover:-translate-y-0.5"
          >
            <WhatsAppIcon className="h-5 w-5" /> Message us on WhatsApp
          </a>
          <Link
            href="/fleet"
            className="flex items-center justify-center gap-2 rounded-full border border-line px-6 py-3.5 text-sm font-medium text-navy transition-colors hover:border-crimson hover:text-crimson"
          >
            Back to the fleet
          </Link>
        </div>
      </div>
    </section>
  );
}

export default function BookingConfirmedPage() {
  return (
    <Suspense>
      <Confirmation />
    </Suspense>
  );
}
