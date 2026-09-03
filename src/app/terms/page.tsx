import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";
import { site } from "@/lib/site";

export const metadata: Metadata = buildMetadata({
  title: "Terms & Conditions",
  description:
    "Booking terms for Saildeck yacht charters: deposits, cancellations, weather policy, guest capacity and conduct on board.",
  path: "/terms",
});

/* DRAFT — a starting point only. Your deposit percentages, cancellation
   windows and liability wording must be set by you and checked by a lawyer
   before this goes live. Placeholders are marked clearly. */
export default function TermsPage() {
  return (
    <article className="container-x max-w-3xl pb-24 pt-[calc(var(--nav-h)+5rem)]">
      <h1 className="text-4xl md:text-5xl">Terms &amp; conditions</h1>
      <p className="mt-4 text-sm text-fog">Last updated: {new Date().getFullYear()}</p>

      <div className="mt-12 space-y-8 leading-relaxed text-mist">
        <section>
          <h2 className="font-display text-xl font-semibold text-foam">Bookings and payment</h2>
          <p className="mt-3">
            A booking is confirmed only when the deposit is received. The balance is
            payable before boarding. Quoted rates are per hour and cover the crew, fuel
            for the agreed route and safety equipment; add-ons are quoted separately.
          </p>
        </section>

        <section>
          <h2 className="font-display text-xl font-semibold text-foam">Cancellations</h2>
          <p className="mt-3">
            Cancellations made more than [X] days before the charter are refunded less
            a booking fee. Cancellations inside [X] days forfeit the deposit, as the
            slot can rarely be resold at short notice. Rescheduling is subject to
            availability.
          </p>
        </section>

        <section>
          <h2 className="font-display text-xl font-semibold text-foam">Weather and safety</h2>
          <p className="mt-3">
            If the coast guard suspends sailing, or the captain judges conditions
            unsafe, the charter is rescheduled at no additional cost. The
            captain&apos;s decision on safety, route and timing is final and is not
            open to negotiation on the day.
          </p>
        </section>

        <section>
          <h2 className="font-display text-xl font-semibold text-foam">Capacity and conduct</h2>
          <p className="mt-3">
            Guest numbers may not exceed the vessel&apos;s licensed capacity under any
            circumstances. Guests must follow crew instructions at all times. We may
            end a charter without refund in cases of dangerous behaviour, damage to the
            vessel, or intoxication that puts anyone at risk.
          </p>
        </section>

        <section>
          <h2 className="font-display text-xl font-semibold text-foam">Liability</h2>
          <p className="mt-3">
            Guests board at their own risk and are responsible for their personal
            belongings. Our liability is limited to the value of the charter, except
            where liability cannot be limited under Indian law.
          </p>
        </section>

        <section>
          <h2 className="font-display text-xl font-semibold text-foam">Contact</h2>
          <p className="mt-3">
            {site.legalName}, {site.address.street}, {site.address.city}{" "}
            {site.address.postalCode}. Phone {site.phoneDisplay}, email{" "}
            <a href={`mailto:${site.email}`} className="text-champagne">
              {site.email}
            </a>
            .
          </p>
        </section>
      </div>
    </article>
  );
}
