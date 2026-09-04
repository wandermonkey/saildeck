"use client";

import { useState } from "react";
import { whatsappLink } from "@/lib/site";
import { WhatsAppIcon, CheckIcon } from "./icons";

/**
 * Seven fields, no account, no cart. High-ticket charters convert on a
 * conversation, so the form's job is to capture just enough to quote — and to
 * offer WhatsApp at equal weight for people who will not fill a form at all.
 */
export function EnquiryForm({ preset = "", compact = false }: { preset?: string; compact?: boolean }) {
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    city: "Mumbai",
    service: preset || "Yacht charter",
    date: "",
    guests: "",
    message: "",
  });

  const set =
    (k: keyof typeof form) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) =>
      setForm((f) => ({ ...f, [k]: e.target.value }));

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("sending");
    try {
      const res = await fetch("/api/enquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error("Request failed");
      setStatus("sent");
    } catch {
      setStatus("error");
    }
  }

  // Everything typed, handed straight to WhatsApp — so an abandoned or failed
  // form still becomes a lead instead of a dead end.
  const waMessage = `Hi Saildeck! I would like to enquire.
Name: ${form.name || "-"}
Service: ${form.service}
City: ${form.city}
Date: ${form.date || "-"}
Guests: ${form.guests || "-"}
${form.message ? `Notes: ${form.message}` : ""}`;

  if (status === "sent") {
    return (
      <div className="rounded-2xl border border-line bg-white p-9 text-center shadow-[var(--shadow-card)]">
        <div className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-teal-soft text-teal">
          <CheckIcon className="h-7 w-7" />
        </div>
        <h3 className="mt-5 font-display text-2xl">Enquiry received</h3>
        <p className="mx-auto mt-3 max-w-sm text-sm leading-relaxed text-muted">
          We will come back with options and a price, usually within the hour. Want it
          faster? Message us directly.
        </p>
        <a
          href={whatsappLink(waMessage)}
          target="_blank"
          rel="noopener noreferrer"
          data-cta="form-success-whatsapp"
          className="mt-6 inline-flex items-center gap-2 rounded-full bg-[#25D366] px-7 py-3.5 font-semibold text-[#04210f] transition-transform hover:-translate-y-0.5"
        >
          <WhatsAppIcon className="h-5 w-5" />
          Continue on WhatsApp
        </a>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="rounded-2xl border border-line bg-white p-6 shadow-[var(--shadow-card)] md:p-7">
      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="Your name" required>
          <input required type="text" autoComplete="name" value={form.name} onChange={set("name")} className={input} placeholder="Aarav Sharma" />
        </Field>

        <Field label="Phone / WhatsApp" required>
          <input required type="tel" inputMode="tel" autoComplete="tel" value={form.phone} onChange={set("phone")} className={input} placeholder="+91 98200 00000" />
        </Field>

        <Field label="Email">
          <input type="email" autoComplete="email" value={form.email} onChange={set("email")} className={input} placeholder="you@example.com" />
        </Field>

        <Field label="What do you need?">
          <select value={form.service} onChange={set("service")} className={input}>
            <option>Yacht charter</option>
            <option>Speedboat transfer</option>
            <option>Buy a yacht or boat</option>
            <option>Sell my yacht</option>
            <option>Yacht management</option>
            <option>Refit or repair</option>
            <option>Monsoon storage</option>
            <option>Sailing school</option>
            <option>Marina consultancy</option>
            <option>Something else</option>
          </select>
        </Field>

        <Field label="City">
          <select value={form.city} onChange={set("city")} className={input}>
            <option>Mumbai</option>
            <option>Navi Mumbai</option>
            <option>Goa</option>
            <option>Elsewhere in India</option>
          </select>
        </Field>

        <Field label="Preferred date">
          <input type="date" value={form.date} onChange={set("date")} className={input} />
        </Field>

        {!compact && (
          <Field label="Guests">
            <input type="number" min={1} max={60} value={form.guests} onChange={set("guests")} className={input} placeholder="12" />
          </Field>
        )}

        <Field label="Anything else?" full>
          <textarea rows={3} value={form.message} onChange={set("message")} className={`${input} resize-none`} placeholder="Occasion, catering, boarding point..." />
        </Field>
      </div>

      {status === "error" && (
        <p role="alert" className="mt-4 rounded-lg bg-crimson-soft px-4 py-3 text-sm text-crimson">
          Something went wrong sending that. Please use the WhatsApp button below — it
          carries everything you just typed.
        </p>
      )}

      {/* Always stacked, never side by side. This form sits in sidebars as
          narrow as ~23rem, and a viewport-based `sm:flex-row` switched the
          buttons to a row once the *window* passed 640px regardless of how
          narrow the sidebar itself was — cramming "Send enquiry" and
          "WhatsApp instead" into a strip too tight for either label. */}
      <div className="mt-6 flex flex-col gap-2.5">
        <button
          type="submit"
          disabled={status === "sending"}
          data-cta="form-submit"
          className="w-full rounded-full bg-crimson px-6 py-3.5 text-sm font-semibold text-white transition-all hover:-translate-y-0.5 hover:bg-crimson-dark disabled:opacity-60"
        >
          {status === "sending" ? "Sending..." : "Send enquiry"}
        </button>
        <a
          href={whatsappLink(waMessage)}
          target="_blank"
          rel="noopener noreferrer"
          data-cta="form-whatsapp"
          className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-[#25D366] px-6 py-3.5 text-sm font-semibold text-[#04210f] transition-all hover:-translate-y-0.5"
        >
          <WhatsAppIcon className="h-4 w-4" />
          WhatsApp instead
        </a>
      </div>

      <p className="mt-4 text-center text-xs text-faint">
        No spam and no third-party calls. We use your details only to answer your enquiry.
      </p>
    </form>
  );
}

const input =
  "w-full rounded-xl border border-line bg-white px-4 py-3 text-sm text-ink placeholder:text-faint outline-none transition-colors focus:border-crimson";

function Field({
  label,
  children,
  required,
  full,
}: {
  label: string;
  children: React.ReactNode;
  required?: boolean;
  full?: boolean;
}) {
  return (
    <label className={`block ${full ? "sm:col-span-2" : ""}`}>
      <span className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-muted">
        {label}
        {required && <span className="text-crimson"> *</span>}
      </span>
      {children}
    </label>
  );
}
