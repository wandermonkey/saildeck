"use client";

import { useEffect } from "react";
import type { SaildeckEvent } from "@/data/events";
import { inr } from "@/data/yachts";
import { whatsappLink } from "@/lib/site";
import { CardGallery } from "./CardGallery";
import { CalendarIcon, ClockIcon, PinIcon, CloseIcon, WhatsAppIcon, CheckIcon } from "./icons";

/**
 * Detail popup for an event — images, pricing, location, terms and a book
 * button, all without leaving the page. Follows the same overlay contract as
 * `Gallery.tsx`'s lightbox (Escape to close, body scroll lock), since that's
 * the one other full-screen overlay already in the codebase.
 */
export function EventModal({ event, onClose }: { event: SaildeckEvent | null; onClose: () => void }) {
  useEffect(() => {
    if (!event) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [event, onClose]);

  if (!event) return null;

  const spotsLeft = Math.max(event.capacity - event.booked, 0);
  const soldOut = spotsLeft === 0;
  const percentBooked = Math.min(Math.round((event.booked / event.capacity) * 100), 100);

  const bookingMessage = soldOut
    ? `Hi Saildeck! I'd like to join the waitlist for "${event.title}" on ${event.dateLabel}.`
    : `Hi Saildeck! I'd like to book "${event.title}" on ${event.dateLabel}, ${event.timeLabel}.`;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={event.title}
      className="fixed inset-0 z-[60] flex items-center justify-center bg-navy-deep/80 p-0 backdrop-blur-sm sm:p-4"
      onClick={onClose}
    >
      <div
        className="flex max-h-full w-full max-w-2xl flex-col overflow-hidden rounded-t-2xl bg-white shadow-[var(--shadow-float)] sm:max-h-[88vh] sm:rounded-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between border-b border-line px-5 py-3.5 sm:px-6">
          <p className="font-display text-lg font-semibold text-navy">{event.title}</p>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="grid h-9 w-9 shrink-0 place-items-center rounded-full border border-line text-navy transition-colors hover:border-crimson hover:text-crimson"
          >
            <CloseIcon className="h-4 w-4" />
          </button>
        </div>

        <div className="overflow-y-auto">
          <div className="relative aspect-[16/9]">
            <CardGallery images={event.gallery} priority />
          </div>

          <div className="p-5 sm:p-6">
            <span className="rounded-full bg-crimson-soft px-3 py-1 text-[11px] font-semibold uppercase tracking-wide text-crimson">
              {event.category}
            </span>

            <dl className="mt-4 grid grid-cols-1 gap-3 text-sm sm:grid-cols-2">
              <div className="flex items-center gap-2.5">
                <CalendarIcon className="h-5 w-5 shrink-0 text-teal" />
                <div>
                  <dt className="text-[11px] uppercase tracking-wide text-faint">Date</dt>
                  <dd className="font-medium text-navy">{event.dateLabel}</dd>
                </div>
              </div>
              <div className="flex items-center gap-2.5">
                <ClockIcon className="h-5 w-5 shrink-0 text-teal" />
                <div>
                  <dt className="text-[11px] uppercase tracking-wide text-faint">Time</dt>
                  <dd className="font-medium text-navy">{event.timeLabel}</dd>
                </div>
              </div>
              <div className="flex items-center gap-2.5 sm:col-span-2">
                <PinIcon className="h-5 w-5 shrink-0 text-teal" />
                <div>
                  <dt className="text-[11px] uppercase tracking-wide text-faint">Location</dt>
                  <dd className="font-medium text-navy">{event.location}</dd>
                </div>
              </div>
            </dl>

            <p className="mt-4 text-sm leading-relaxed text-muted">{event.description}</p>

            <div className="mt-5 rounded-xl border border-line bg-surface p-4">
              <div className="flex items-end justify-between">
                <div>
                  <span className="text-xs text-muted">Price</span>
                  <p className="font-display text-2xl font-semibold text-navy">
                    {inr(event.price)} <span className="text-xs font-normal text-muted">/ person</span>
                  </p>
                </div>
                <div className="text-right">
                  <span className="text-xs text-muted">{soldOut ? "Status" : "Spots left"}</span>
                  <p className={`font-display text-2xl font-semibold ${soldOut ? "text-crimson" : "text-navy"}`}>
                    {soldOut ? "Sold out" : spotsLeft}
                  </p>
                </div>
              </div>

              <div className="mt-3">
                <div className="h-2 overflow-hidden rounded-full bg-line">
                  <div
                    className={`h-full rounded-full ${soldOut ? "bg-crimson" : "bg-teal"}`}
                    style={{ width: `${percentBooked}%` }}
                  />
                </div>
                <p className="mt-1.5 text-[11px] text-faint">
                  {event.booked} of {event.capacity} spots booked
                </p>
              </div>
            </div>

            <div className="mt-5">
              <p className="text-xs font-semibold uppercase tracking-wide text-muted">Terms & conditions</p>
              <ul className="mt-2.5 space-y-2 text-sm text-muted">
                {event.terms.map((term) => (
                  <li key={term} className="flex gap-2">
                    <CheckIcon className="mt-0.5 h-3.5 w-3.5 shrink-0 text-teal" />
                    <span>{term}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="border-t border-line p-4 sm:p-5">
          <a
            href={whatsappLink(bookingMessage)}
            target="_blank"
            rel="noopener noreferrer"
            data-cta="event-book-whatsapp"
            className={`flex w-full items-center justify-center gap-2 rounded-full px-6 py-3.5 text-sm font-semibold transition-all hover:-translate-y-0.5 ${
              soldOut ? "bg-navy text-white hover:bg-navy-deep" : "bg-[#25D366] text-[#04210f]"
            }`}
          >
            <WhatsAppIcon className="h-5 w-5" />
            {soldOut ? "Join the waitlist on WhatsApp" : "Book on WhatsApp"}
          </a>
        </div>
      </div>
    </div>
  );
}
