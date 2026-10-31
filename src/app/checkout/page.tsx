"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Script from "next/script";
import { useCart } from "@/components/booking/CartProvider";
import { inr } from "@/data/yachts";
import { site } from "@/lib/site";
import { ShieldIcon } from "@/components/icons";

declare global {
  interface Window {
    Razorpay: new (options: Record<string, unknown>) => { open: () => void };
  }
}

type Status = "idle" | "starting" | "paying" | "verifying" | "error";

export default function CheckoutPage() {
  const { items, grandTotal, depositTotal, balanceTotal, clear } = useCart();
  const router = useRouter();
  const [scriptReady, setScriptReady] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", phone: "" });
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");

  const set = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm((f) => ({ ...f, [k]: e.target.value }));

  async function pay(e: React.FormEvent) {
    e.preventDefault();
    setError("");

    if (form.name.trim().length < 2 || form.phone.trim().length < 7) {
      setError("Please enter your name and a contact number.");
      return;
    }
    if (!scriptReady || typeof window.Razorpay === "undefined") {
      setError("Payment is still loading — give it a second and try again.");
      return;
    }

    setStatus("starting");
    try {
      const holdRes = await fetch("/api/booking/hold", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          customer: form,
          items: items.map((i) => ({
            yachtSlug: i.yachtSlug,
            yachtName: i.yachtName,
            bookingDate: i.bookingDate,
            slotId: i.slotId,
            basePrice: i.basePrice,
            addons: i.addons,
            comment: i.comment,
          })),
        }),
      });
      const hold = await holdRes.json();
      if (!holdRes.ok) throw new Error(hold.error ?? "Could not start checkout.");

      setStatus("paying");
      const razorpay = new window.Razorpay({
        key: hold.keyId,
        order_id: hold.orderId,
        amount: hold.amount,
        currency: hold.currency,
        name: site.name,
        description: `Deposit — ${items.map((i) => i.yachtName).join(", ")}`,
        prefill: { name: form.name, email: form.email, contact: form.phone },
        theme: { color: "#A80B28" },
        handler: async (response: {
          razorpay_order_id: string;
          razorpay_payment_id: string;
          razorpay_signature: string;
        }) => {
          setStatus("verifying");
          try {
            const verifyRes = await fetch("/api/booking/verify", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ ...response, bookingIds: hold.bookingIds }),
            });
            const verify = await verifyRes.json();
            if (!verifyRes.ok) throw new Error(verify.error ?? "Payment could not be verified.");
            clear();
            router.push(`/booking-confirmed?ids=${hold.bookingIds.join(",")}`);
          } catch (err) {
            setError(
              err instanceof Error
                ? `${err.message} Message us on WhatsApp with your payment ID so we can confirm it manually.`
                : "Payment went through but we couldn't verify it — message us on WhatsApp with the payment ID."
            );
            setStatus("error");
          }
        },
        modal: { ondismiss: () => setStatus("idle") },
      });
      razorpay.open();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong. Please try again.");
      setStatus("error");
    }
  }

  if (items.length === 0) {
    return (
      <section className="py-16">
        <div className="container-x text-center">
          <p className="text-muted">Your cart is empty.</p>
          <Link href="/fleet" className="mt-4 inline-block text-sm font-semibold text-crimson hover:underline">
            Browse the fleet →
          </Link>
        </div>
      </section>
    );
  }

  return (
    <>
      <Script src="https://checkout.razorpay.com/v1/checkout.js" onReady={() => setScriptReady(true)} />

      <div className="border-b border-line bg-white">
        <div className="container-x py-10 md:py-14">
          <nav aria-label="Breadcrumb">
            <ol className="flex flex-wrap items-center gap-2 text-xs text-faint">
              <li><Link href="/" className="transition-colors hover:text-crimson">Home</Link></li>
              <li aria-hidden="true">/</li>
              <li><Link href="/cart" className="transition-colors hover:text-crimson">Cart</Link></li>
              <li aria-hidden="true">/</li>
              <li className="text-muted">Checkout</li>
            </ol>
          </nav>
          <h1 className="mt-4 text-3xl md:text-[2.4rem]">Checkout</h1>
        </div>
      </div>

      <section className="py-12 md:py-16">
        <div className="container-x grid gap-8 lg:grid-cols-3 lg:items-start">
          <form onSubmit={pay} className="rounded-2xl border border-line bg-white p-6 shadow-[var(--shadow-card)] lg:col-span-2 md:p-7">
            <h2 className="font-display text-lg font-semibold text-navy">Your details</h2>

            <div className="mt-5 grid gap-4">
              <label className="block">
                <span className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-muted">
                  Name <span className="text-crimson">*</span>
                </span>
                <input required type="text" value={form.name} onChange={set("name")} className={input} placeholder="Aarav Sharma" />
              </label>

              <div className="grid gap-4 sm:grid-cols-2">
                <label className="block">
                  <span className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-muted">
                    Phone <span className="text-crimson">*</span>
                  </span>
                  <input required type="tel" value={form.phone} onChange={set("phone")} className={input} placeholder="+91 98200 00000" />
                </label>
                <label className="block">
                  <span className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-muted">Email</span>
                  <input type="email" value={form.email} onChange={set("email")} className={input} placeholder="you@example.com" />
                </label>
              </div>
            </div>

            {error && (
              <p role="alert" className="mt-4 rounded-lg bg-crimson-soft px-4 py-3 text-sm text-crimson">
                {error}
              </p>
            )}

            <button
              type="submit"
              disabled={status === "starting" || status === "paying" || status === "verifying"}
              data-cta="checkout-pay-deposit"
              className="mt-6 w-full rounded-full bg-crimson px-6 py-3.5 text-sm font-semibold text-white transition-all hover:-translate-y-0.5 hover:bg-crimson-dark disabled:opacity-60"
            >
              {status === "starting" && "Reserving your slot..."}
              {status === "paying" && "Waiting for payment..."}
              {status === "verifying" && "Confirming..."}
              {(status === "idle" || status === "error") && `Pay deposit — ${inr(depositTotal)}`}
            </button>

            <p className="mt-4 flex items-center justify-center gap-1.5 text-center text-xs text-faint">
              <ShieldIcon className="h-4 w-4 text-teal" /> Payments are processed securely by Razorpay.
            </p>
          </form>

          <div className="rounded-2xl border border-line bg-white p-6 shadow-[var(--shadow-card)]">
            <h2 className="font-display text-lg font-semibold text-navy">Order summary</h2>
            <ul className="mt-4 space-y-3 text-sm">
              {items.map((item) => (
                <li key={item.cartId} className="border-b border-line pb-3">
                  <p className="font-medium text-navy">{item.yachtName}</p>
                  <p className="text-xs text-muted">
                    {item.bookingDate} · {item.slotLabel}
                  </p>
                </li>
              ))}
            </ul>
            <dl className="mt-4 space-y-2 text-sm">
              <div className="flex justify-between">
                <dt className="text-muted">Total</dt>
                <dd className="font-medium text-navy">{inr(grandTotal)}</dd>
              </div>
              <div className="flex justify-between border-t border-line pt-2">
                <dt className="text-muted">Deposit due now (50%)</dt>
                <dd className="font-semibold text-navy">{inr(depositTotal)}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-muted">Balance due on the day</dt>
                <dd className="text-muted">{inr(balanceTotal)}</dd>
              </div>
            </dl>
          </div>
        </div>
      </section>
    </>
  );
}

const input =
  "w-full rounded-xl border border-line bg-white px-4 py-3 text-sm text-ink placeholder:text-faint outline-none transition-colors focus:border-crimson";
