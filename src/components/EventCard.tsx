import Image from "next/image";
import type { SaildeckEvent } from "@/data/events";
import { inr } from "@/data/yachts";
import { CalendarIcon, PinIcon } from "./icons";

/**
 * Poster-style placard, same visual language as `ProductCard` — but this one
 * is a <button>, not a <Link>: clicking it opens the detail popup in place
 * rather than navigating to a new page.
 */
export function EventCard({
  event,
  onOpen,
  priority = false,
}: {
  event: SaildeckEvent;
  onOpen: (event: SaildeckEvent) => void;
  priority?: boolean;
}) {
  const soldOut = event.booked >= event.capacity;

  return (
    <button
      type="button"
      onClick={() => onOpen(event)}
      data-cta="event-card"
      className="group relative isolate flex aspect-[9/16] flex-col justify-end overflow-hidden rounded-2xl bg-navy-deep text-left shadow-[var(--shadow-card)] ring-1 ring-transparent transition-all duration-500 hover:shadow-[var(--shadow-card-hover)] hover:ring-crimson/60"
    >
      <Image
        src={event.image}
        alt={event.imageAlt}
        fill
        sizes="(max-width: 768px) 50vw, (max-width: 1280px) 33vw, 25vw"
        priority={priority}
        className="object-cover transition-transform duration-[900ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.07]"
      />

      <div
        className="absolute inset-0 bg-gradient-to-t from-navy-deep via-navy-deep/55 to-navy-deep/5 transition-opacity duration-500 group-hover:via-navy-deep/65"
        aria-hidden="true"
      />

      <div className="absolute left-3 top-3 z-10 flex flex-wrap gap-2 sm:left-4 sm:top-4">
        <span className="rounded-full bg-white/15 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.12em] text-white ring-1 ring-white/25 backdrop-blur-md sm:px-3 sm:text-[11px]">
          {event.category}
        </span>
        {soldOut && (
          <span className="rounded-full bg-crimson px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.12em] text-white sm:px-3 sm:text-[11px]">
            Sold out
          </span>
        )}
      </div>

      <div className="relative z-10 p-3.5 sm:p-5">
        <span className="mb-2.5 block h-[3px] w-8 rounded-full bg-crimson transition-all duration-500 group-hover:w-16" aria-hidden="true" />

        <h3 className="font-body text-[0.95rem] font-semibold leading-[1.25] tracking-tight text-white [text-shadow:0_1px_14px_rgba(6,28,46,0.55)] sm:text-lg lg:text-xl">
          {event.title}
        </h3>

        <div className="mt-2 flex flex-col gap-1 text-[11px] text-white/80 sm:text-[12.5px]">
          <span className="flex items-center gap-1.5">
            <CalendarIcon className="h-3.5 w-3.5 shrink-0" /> {event.dateLabel} · {event.timeLabel}
          </span>
          <span className="flex items-center gap-1.5">
            <PinIcon className="h-3.5 w-3.5 shrink-0" /> {event.location.split(",")[0]}
          </span>
        </div>

        <div className="mt-3 flex items-center justify-between">
          <span className="text-sm font-semibold text-white sm:text-base">
            {inr(event.price)} <span className="text-[11px] font-normal text-white/70">/ person</span>
          </span>
          <span className="text-[10px] font-semibold uppercase tracking-[0.1em] text-white transition-all duration-300 group-hover:text-crimson sm:text-[11px]">
            {soldOut ? "Details" : "View & book"}
          </span>
        </div>
      </div>
    </button>
  );
}
