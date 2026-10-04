import type { Metadata } from "next";
import Link from "next/link";

import { PaymentForm } from "@/components/PaymentForm";
import { ShieldIcon, WhatsAppIcon } from "@/components/icons";
import { CopyField } from "@/components/CopyField";

import { bankDetails, upi } from "@/data/payment";
import { buildMetadata } from "@/lib/seo";
import { site, whatsappLink } from "@/lib/site";

export const metadata: Metadata = buildMetadata({
  title: "Pay Saildeck — Bank Transfer, UPI or Card",
  description: "Pay a Saildeck deposit or balance by bank transfer, UPI or card.",
  path: "/pay",
  noIndex: true,
});

const upiLink = `upi://pay?pa=${encodeURIComponent(upi.vpa)}&pn=${encodeURIComponent(upi.payeeName)}&cu=INR`;
const qrSrc = `https://api.qrserver.com/v1/create-qr-code/?size=280x280&data=${encodeURIComponent(upiLink)}`;

export default function PayPage() {
  return (
    <>
      {/* Plain white header, no banner photo — a payment page should read as
          a utility, not a marketing page. */}
      <div className="border-b border-line bg-white">
        <div className="container-x py-10 md:py-14">
          <nav aria-label="Breadcrumb">
            <ol className="flex flex-wrap items-center gap-2 text-xs text-faint">
              <li><Link href="/" className="transition-colors hover:text-crimson">Home</Link></li>
              <li aria-hidden="true">/</li>
              <li className="text-muted">Pay</li>
            </ol>
          </nav>
          <h1 className="mt-4 text-3xl md:text-[2.4rem]">Pay Saildeck</h1>
          <p className="mt-2 max-w-xl text-muted">
            Pay a deposit or balance by bank transfer, UPI, or card — including international cards.
          </p>
        </div>
      </div>

      <section className="py-12 md:py-16">
        <div className="container-x grid gap-6 lg:grid-cols-3 lg:items-start">
          {/* Bank transfer */}
          <div className="rounded-2xl border border-line bg-white p-6 shadow-[var(--shadow-card)] md:p-7">
            <h2 className="font-display text-lg font-semibold text-navy">Bank transfer</h2>
            <p className="mt-1 text-sm text-muted">NEFT, RTGS or IMPS, any Indian bank.</p>

            <dl className="mt-5 space-y-3.5">
              <CopyField label="Account name" value={bankDetails.accountName} />
              <CopyField label="Account number" value={bankDetails.accountNumber} />
              <CopyField label="IFSC code" value={bankDetails.ifsc} />
              <CopyField
                label={bankDetails.branch ? "Bank & branch" : "Bank"}
                value={bankDetails.branch ? `${bankDetails.bankName}, ${bankDetails.branch}` : bankDetails.bankName}
              />
              <CopyField label="Account type" value={bankDetails.accountType} />
              {bankDetails.swift && <CopyField label="SWIFT / BIC" value={bankDetails.swift} />}
            </dl>

            <p className="mt-5 rounded-xl bg-surface p-3.5 text-xs leading-relaxed text-muted">
              After transferring, please share a screenshot on WhatsApp with your name and booking
              date so we can match it to your booking.
            </p>
          </div>

          {/* UPI */}
          <div className="rounded-2xl border border-line bg-white p-6 shadow-[var(--shadow-card)] md:p-7">
            <h2 className="font-display text-lg font-semibold text-navy">UPI</h2>
            <p className="mt-1 text-sm text-muted">Scan with any UPI app, or pay to our VPA directly.</p>

            <div className="mt-5 flex justify-center">
              <div className="rounded-2xl border border-line bg-white p-3">
                {/* eslint-disable-next-line @next/next/no-img-element -- a third-party-generated QR image, not a site asset Next's optimizer should resize */}
                <img src={qrSrc} alt={`UPI QR code to pay ${upi.payeeName}`} width={220} height={220} className="h-[220px] w-[220px]" />
              </div>
            </div>

            <div className="mt-5">
              <CopyField label="UPI ID" value={upi.vpa} />
            </div>

            <p className="mt-5 rounded-xl bg-surface p-3.5 text-xs leading-relaxed text-muted">
              Same as bank transfer — send us a screenshot on WhatsApp afterwards so we can confirm
              it against your booking.
            </p>
          </div>

          {/* Card */}
          <PaymentForm />
        </div>

        <div className="container-x mt-10">
          <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-xs text-faint">
            <span className="flex items-center gap-1.5">
              <ShieldIcon className="h-4 w-4 text-teal" /> Card payments processed securely by Razorpay
            </span>
            <a
              href={whatsappLink("Hi Saildeck! I have a question about making a payment.")}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-crimson transition-colors hover:text-crimson-dark"
            >
              <WhatsAppIcon className="h-4 w-4" /> Need help? Message us on WhatsApp
            </a>
            <span>{site.email}</span>
          </div>
        </div>
      </section>
    </>
  );
}
