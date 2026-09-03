import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";
import { site } from "@/lib/site";

export const metadata: Metadata = buildMetadata({
  title: "Privacy Policy",
  description:
    "How Saildeck collects, uses and protects the personal information you share when enquiring about a yacht charter.",
  path: "/privacy",
});

/* DRAFT — written as a starting point, not legal advice. Have a lawyer review
   this against India's DPDP Act 2023 before you publish it. */
export default function PrivacyPage() {
  return (
    <article className="container-x max-w-3xl pb-24 pt-[calc(var(--nav-h)+5rem)]">
      <h1 className="text-4xl md:text-5xl">Privacy policy</h1>
      <p className="mt-4 text-sm text-fog">Last updated: {new Date().getFullYear()}</p>

      <div className="prose-invert mt-12 space-y-8 leading-relaxed text-mist">
        <section>
          <h2 className="font-display text-xl font-semibold text-foam">What we collect</h2>
          <p className="mt-3">
            When you send an enquiry we collect your name, phone number, and
            optionally your email address, preferred date, group size and any notes
            you add. We also collect standard technical information such as your IP
            address and browser type when you visit the site.
          </p>
        </section>

        <section>
          <h2 className="font-display text-xl font-semibold text-foam">Why we use it</h2>
          <p className="mt-3">
            Solely to respond to your enquiry, quote and operate your charter, and to
            keep records required for safety and tax purposes. We do not sell your
            details, and we do not share them with third parties except the boat
            operator and crew running your specific charter.
          </p>
        </section>

        <section>
          <h2 className="font-display text-xl font-semibold text-foam">WhatsApp</h2>
          <p className="mt-3">
            If you contact us via WhatsApp, that conversation is also governed by
            WhatsApp&apos;s own privacy policy. We retain the chat as a record of your
            booking.
          </p>
        </section>

        <section>
          <h2 className="font-display text-xl font-semibold text-foam">Your rights</h2>
          <p className="mt-3">
            You can ask us what we hold about you, ask us to correct it, or ask us to
            delete it, subject to records we must keep by law. Write to{" "}
            <a href={`mailto:${site.email}`} className="text-champagne">
              {site.email}
            </a>{" "}
            and we will respond within thirty days.
          </p>
        </section>

        <section>
          <h2 className="font-display text-xl font-semibold text-foam">Contact</h2>
          <p className="mt-3">
            {site.legalName}, {site.address.street}, {site.address.city}{" "}
            {site.address.postalCode}. Phone {site.phoneDisplay}.
          </p>
        </section>
      </div>
    </article>
  );
}
