"use client";

import { useState } from "react";
import Script from "next/script";
import { site } from "@/lib/site";
import { CheckIcon } from "@/components/icons";

declare global {
  interface Window {
    Razorpay: new (options: Record<string, unknown>) => { open: () => void };
  }
}

/**
 * The card-payment half of /pay. Bank transfer and UPI are static info
 * rendered by the page itself — this is the one part that needs a live
 * round trip: create an order server-side, open Razorpay's Checkout with
 * it, then verify the signature server-side before calling it a success.
 */
export function PaymentForm() {
  const [scriptReady, setScriptReady] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", phone: "", amount: "", note: "" });
  const [status, setStatus] = useState<"idle" | "starting" | "paying" | "verifying" | "done" | "error">("idle");
  const [error, setError] = useState("");

  const set =
    (k: keyof typeof form) =>
    (e: React.ChangeEvent<HTMLInputElement>) =>
      setForm((f) => ({ ...f, [k]: e.target.value }));

  async function pay(e: React.FormEvent) {
    e.preventDefault();
    setError("");

    const amount = Number(form.amount);
    if (!amount || amount < 1) {
      setError("Enter the amount you'd like to pay.");
      return;
    }
    if (!scriptReady || typeof window.Razorpay === "undefined") {
      setError("Payment is still loading — give it a second and try again.");
      return;
    }

    setStatus("starting");
    try {
      const orderRes = await fetch("/api/razorpay/order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount, name: form.name, note: form.note }),
      });
      const order = await orderRes.json();
      if (!orderRes.ok) throw new Error(order.error ?? "Could not start the payment.");

      setStatus("paying");
      const razorpay = new window.Razorpay({
        key: order.keyId,
        order_id: order.orderId,
        amount: order.amount,
        currency: order.currency,
        name: site.name,
        description: form.note || "Payment to Saildeck",
        prefill: { name: form.name, email: form.email, contact: form.phone },
        theme: { color: "#A80B28" },
        handler: async (response: {
          razorpay_order_id: string;
          razorpay_payment_id: string;
          razorpay_signature: string;
        }) => {
          setStatus("verifying");
          try {
            const verifyRes = await fetch("/api/razorpay/verify", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ ...response, name: form.name, email: form.email, phone: form.phone }),
            });
            if (!verifyRes.ok) throw new Error("Payment could not be verified.");
            setStatus("done");
          } catch {
            setError("Payment went through but we couldn't verify it automatically — message us on WhatsApp with the payment ID so we can confirm it manually.");
            setStatus("error");
          }
        },
        modal: {
          ondismiss: () => setStatus("idle"),
        },
      });
      razorpay.open();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong. Please try again.");
      setStatus("error");
    }
  }

  if (status === "done") {
    return (
      <div className="rounded-2xl border border-line bg-white p-8 text-center shadow-[var(--shadow-card)]">
        <div className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-teal-soft text-teal">
          <CheckIcon className="h-7 w-7" />
        </div>
        <h3 className="mt-5 font-display text-xl">Payment received</h3>
        <p className="mx-auto mt-3 max-w-sm text-sm leading-relaxed text-muted">
          Thank you — we have your payment and will confirm by WhatsApp or email shortly.
        </p>
      </div>
    );
  }

  return (
    <>
      <Script src="https://checkout.razorpay.com/v1/checkout.js" onReady={() => setScriptReady(true)} />
      <form onSubmit={pay} className="rounded-2xl border border-line bg-white p-6 shadow-[var(--shadow-card)] md:p-7">
        <h3 className="font-display text-lg font-semibold text-navy">Pay by card</h3>
        <p className="mt-1 text-sm text-muted">Visa, Mastercard and Amex — domestic and international cards.</p>

        <div className="mt-5 grid gap-4">
          <label className="block">
            <span className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-muted">
              Amount (INR) <span className="text-crimson">*</span>
            </span>
            <input
              required
              type="number"
              min={1}
              inputMode="decimal"
              value={form.amount}
              onChange={set("amount")}
              className={input}
              placeholder="25000"
            />
          </label>

          <div className="grid gap-4 sm:grid-cols-2">
            <label className="block">
              <span className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-muted">Your name</span>
              <input type="text" autoComplete="name" value={form.name} onChange={set("name")} className={input} placeholder="Aarav Sharma" />
            </label>
            <label className="block">
              <span className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-muted">Phone</span>
              <input type="tel" autoComplete="tel" value={form.phone} onChange={set("phone")} className={input} placeholder="+91 98200 00000" />
            </label>
          </div>

          <label className="block">
            <span className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-muted">Email</span>
            <input type="email" autoComplete="email" value={form.email} onChange={set("email")} className={input} placeholder="you@example.com" />
          </label>

          <label className="block">
            <span className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-muted">What's this for?</span>
            <input type="text" value={form.note} onChange={set("note")} className={input} placeholder="Deposit — Flo, 12 Dec" />
          </label>
        </div>

        {error && (
          <p role="alert" className="mt-4 rounded-lg bg-crimson-soft px-4 py-3 text-sm text-crimson">
            {error}
          </p>
        )}

        <button
          type="submit"
          disabled={status === "starting" || status === "paying" || status === "verifying"}
          data-cta="pay-by-card"
          className="mt-6 w-full rounded-full bg-crimson px-6 py-3.5 text-sm font-semibold text-white transition-all hover:-translate-y-0.5 hover:bg-crimson-dark disabled:opacity-60"
        >
          {status === "starting" && "Starting..."}
          {status === "paying" && "Waiting for payment..."}
          {status === "verifying" && "Confirming..."}
          {(status === "idle" || status === "error") && (form.amount ? `Pay ₹${form.amount}` : "Pay by card")}
        </button>

        <p className="mt-4 text-center text-xs text-faint">
          Payments are processed securely by Razorpay. We never see or store your card details.
        </p>
      </form>
    </>
  );
}

const input =
  "w-full rounded-xl border border-line bg-white px-4 py-3 text-sm text-ink placeholder:text-faint outline-none transition-colors focus:border-crimson";
