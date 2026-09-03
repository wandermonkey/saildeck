"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "./icons";

type Shot = { src: string; alt: string };

/**
 * Photo carousel for the product pages.
 *
 * Built on a scroll-snap track rather than a carousel library: touch swipe,
 * momentum and accessibility come free from the browser, it costs no extra
 * KB, and it degrades to a plain horizontally scrollable strip if JS fails.
 *
 * Deliberately no dark overlay on the images — on a charter site the photo is
 * the product, and scrims were making the boats hard to see.
 */
export function Gallery({ shots, priority = false }: { shots: Shot[]; priority?: boolean }) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [index, setIndex] = useState(0);
  const [lightbox, setLightbox] = useState(false);

  const scrollTo = useCallback((i: number) => {
    const track = trackRef.current;
    if (!track) return;
    const clamped = Math.max(0, Math.min(i, shots.length - 1));
    track.scrollTo({ left: clamped * track.clientWidth, behavior: "smooth" });
    setIndex(clamped);
  }, [shots.length]);

  // Keep the active index in sync when the user swipes rather than clicks.
  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    let frame = 0;
    const onScroll = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        setIndex(Math.round(track.scrollLeft / track.clientWidth));
      });
    };
    track.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      track.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(frame);
    };
  }, []);

  // Arrow keys move the carousel; Escape closes the lightbox.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setLightbox(false);
      if (!lightbox) return;
      if (e.key === "ArrowRight") scrollTo(index + 1);
      if (e.key === "ArrowLeft") scrollTo(index - 1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [lightbox, index, scrollTo]);

  useEffect(() => {
    document.body.style.overflow = lightbox ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [lightbox]);

  const atStart = index === 0;
  const atEnd = index === shots.length - 1;

  return (
    <>
      <div className="relative">
        <div
          ref={trackRef}
          className="no-scrollbar flex snap-x snap-mandatory overflow-x-auto overscroll-x-contain rounded-2xl"
          role="group"
          aria-roledescription="carousel"
          aria-label="Photo gallery"
        >
          {shots.map((shot, i) => (
            <div key={shot.src + i} className="relative aspect-[16/10] w-full shrink-0 snap-center bg-surface">
              <Image
                src={shot.src}
                alt={shot.alt}
                fill
                sizes="(max-width: 1024px) 100vw, 66vw"
                priority={priority && i === 0}
                className="cursor-zoom-in object-cover"
                onClick={() => setLightbox(true)}
              />
            </div>
          ))}
        </div>

        {shots.length > 1 && (
          <>
            <button
              type="button"
              onClick={() => scrollTo(index - 1)}
              disabled={atStart}
              aria-label="Previous photo"
              className="absolute left-3 top-1/2 grid h-11 w-11 -translate-y-1/2 place-items-center rounded-full bg-white/90 text-navy shadow-[0_4px_16px_rgba(10,42,67,0.2)] backdrop-blur transition-all hover:bg-white disabled:pointer-events-none disabled:opacity-0"
            >
              <ChevronLeft />
            </button>
            <button
              type="button"
              onClick={() => scrollTo(index + 1)}
              disabled={atEnd}
              aria-label="Next photo"
              className="absolute right-3 top-1/2 grid h-11 w-11 -translate-y-1/2 place-items-center rounded-full bg-white/90 text-navy shadow-[0_4px_16px_rgba(10,42,67,0.2)] backdrop-blur transition-all hover:bg-white disabled:pointer-events-none disabled:opacity-0"
            >
              <ChevronRight />
            </button>

            <div className="absolute bottom-3 right-3 rounded-full bg-navy/75 px-3 py-1 text-xs font-medium text-white backdrop-blur">
              {index + 1} / {shots.length}
            </div>
          </>
        )}
      </div>

      {/* Thumbnail strip — lets people jump straight to the shot they want */}
      {shots.length > 1 && (
        <div className="no-scrollbar mt-3 flex gap-2.5 overflow-x-auto pb-1">
          {shots.map((shot, i) => (
            <button
              key={shot.src + i}
              type="button"
              onClick={() => scrollTo(i)}
              aria-label={`Show photo ${i + 1}`}
              aria-current={i === index}
              className={`relative h-16 w-24 shrink-0 overflow-hidden rounded-lg transition-all md:h-20 md:w-28 ${
                i === index ? "ring-2 ring-crimson ring-offset-2" : "opacity-65 hover:opacity-100"
              }`}
            >
              <Image src={shot.src} alt="" fill sizes="120px" className="object-cover" />
            </button>
          ))}
        </div>
      )}

      {/* Lightbox */}
      {lightbox && (
        <div
          className="fixed inset-0 z-[60] flex items-center justify-center bg-navy-deep/95 p-4"
          onClick={() => setLightbox(false)}
          role="dialog"
          aria-modal="true"
          aria-label="Photo viewer"
        >
          <button
            type="button"
            onClick={() => setLightbox(false)}
            aria-label="Close photo viewer"
            className="absolute right-5 top-5 grid h-11 w-11 place-items-center rounded-full bg-white/15 text-white transition-colors hover:bg-white/25"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className="h-5 w-5" aria-hidden="true">
              <path d="M18 6 6 18M6 6l12 12" />
            </svg>
          </button>

          <div className="relative h-[80vh] w-full max-w-6xl" onClick={(e) => e.stopPropagation()}>
            <Image src={shots[index].src} alt={shots[index].alt} fill sizes="100vw" className="object-contain" />
          </div>

          {shots.length > 1 && (
            <>
              <button
                type="button"
                onClick={(e) => { e.stopPropagation(); scrollTo(index - 1); }}
                disabled={atStart}
                aria-label="Previous photo"
                className="absolute left-5 grid h-12 w-12 place-items-center rounded-full bg-white/15 text-white transition-colors hover:bg-white/25 disabled:opacity-25"
              >
                <ChevronLeft />
              </button>
              <button
                type="button"
                onClick={(e) => { e.stopPropagation(); scrollTo(index + 1); }}
                disabled={atEnd}
                aria-label="Next photo"
                className="absolute right-5 grid h-12 w-12 place-items-center rounded-full bg-white/15 text-white transition-colors hover:bg-white/25 disabled:opacity-25"
              >
                <ChevronRight />
              </button>
              <p className="absolute bottom-6 text-sm text-white/70">
                {index + 1} of {shots.length} — {shots[index].alt}
              </p>
            </>
          )}
        </div>
      )}
    </>
  );
}
