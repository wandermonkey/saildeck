"use client";

import { useState } from "react";
import { whatsappLink } from "@/lib/site";
import { WhatsAppIcon, CheckIcon } from "./icons";

/**
 * Partner sign-up form for the Agents & B2B Rates page.
 *
 * Deliberately just four fields — an agent deciding whether to resell your
 * boats is not filling in a charter date yet, they're asking "will you talk
 * to me". Company name is folded into the enquiry's message field since the
 * shared /api/enquiry route logs name/phone/email/occasion/message and has
 * no dedicated company field of its own.
 */
export function AgentSignupForm() {
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [form, setForm] = useState({ name: "", phone: "", email: "", company: "" });

  const set =
    (k: keyof typeof form) =>
    (e: React.ChangeEvent<HTMLInputElement>) =>
      setForm((f) => ({ ...f, [k]: e.target.value }));

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("sending");
    try {
      const res = await fetch("/api/enquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name,
          phone: form.phone,
          email: form.email,
          occasion: "Agent / B2B partnership",
          message: `Company: ${form.company || "-"}`,
        }),
      });
      if (!res.ok) throw new Error("Request failed");
      setStatus("sent");
    } catch {
      setStatus("error");
    }
  }

  const waMessage = `Hi Saildeck! I would like to register as an agent / B2B partner.
Name: ${form.name || "-"}
Company: ${form.company || "-"}
Phone: ${form.phone || "-"}
Email: ${form.email || "-"}`;

  if (status === "sent") {
    return (
      <div className="rounded-2xl border border-line bg-white p-9 text-center shadow-[var(--shadow-card)]">
        <div className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-teal-soft text-teal">
          <CheckIcon className="h-7 w-7" />
        </div>
        <h3 className="mt-5 font-display text-2xl">Registration received</h3>
        <p className="mx-auto mt-3 max-w-sm text-sm leading-relaxed text-muted">
          We will come back with your partner net rates and add you to the WhatsApp
          group, usually within one business day. Want it faster? Message us directly.
        </p>
        <a
          href={whatsappLink(waMessage)}
          target="_blank"
          rel="noopener noreferrer"
          data-cta="agent-form-success-whatsapp"
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
          <input type="email" autoComplete="email" value={form.email} onChange={set("email")} className={input} placeholder="you@agency.com" />
        </Field>

        <Field label="Company name" required>
          <input required type="text" autoComplete="organization" value={form.company} onChange={set("company")} className={input} placeholder="Your agency or business" />
        </Field>
      </div>

      {status === "error" && (
        <p role="alert" className="mt-4 rounded-lg bg-crimson-soft px-4 py-3 text-sm text-crimson">
          Something went wrong sending that. Please use the WhatsApp button below — it
          carries everything you just typed.
        </p>
      )}

      <div className="mt-6 flex flex-col gap-2.5">
        <button
          type="submit"
          disabled={status === "sending"}
          data-cta="agent-form-submit"
          className="w-full rounded-full bg-crimson px-6 py-3.5 text-sm font-semibold text-white transition-all hover:-translate-y-0.5 hover:bg-crimson-dark disabled:opacity-60"
        >
          {status === "sending" ? "Sending..." : "Register as a partner"}
        </button>
        <a
          href={whatsappLink(waMessage)}
          target="_blank"
          rel="noopener noreferrer"
          data-cta="agent-form-whatsapp"
          className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-[#25D366] px-6 py-3.5 text-sm font-semibold text-[#04210f] transition-all hover:-translate-y-0.5"
        >
          <WhatsAppIcon className="h-4 w-4" />
          WhatsApp instead
        </a>
      </div>

      <p className="mt-4 text-center text-xs text-faint">
        No spam and no third-party calls. We use your details only to set up your
        partner account.
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
}: {
  label: string;
  children: React.ReactNode;
  required?: boolean;
}) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-muted">
        {label}
        {required && <span className="text-crimson"> *</span>}
      </span>
      {children}
    </label>
  );
}
