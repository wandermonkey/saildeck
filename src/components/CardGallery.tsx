"use client";

import { useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "./icons";

type Shot = { src: string; alt: string };

/**
 * A small, click-through photo viewer for a listing card — so a visitor can
 * flip through a boat's photos at a glance without opening the detail page.
 * Deliberately lighter than `Gallery.tsx`'s full scroll-snap carousel (no
 * thumbnail strip, no lightbox — a card thumbnail doesn't need either):
 * just swap the active image, arrows and dots.
 */
export function CardGallery({ images, priority = false }: { images: Shot[]; priority?: boolean }) {
  const [index, setIndex] = useState(0);

  if (images.length === 0) return null;
  const shot = images[index];

  function go(e: React.MouseEvent, delta: number) {
    // The card itself is a <Link> — arrows must never trigger that navigation.
    e.preventDefault();
    e.stopPropagation();
    setIndex((i) => (i + delta + images.length) % images.length);
  }

  return (
    <div className="relative h-full w-full">
      <Image
        src={shot.src}
        alt={shot.alt}
        fill
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        priority={priority && index === 0}
        className="object-cover transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.04]"
      />

      {images.length > 1 && (
        <>
          <button
            type="button"
            onClick={(e) => go(e, -1)}
            aria-label="Previous photo"
            className="absolute left-2 top-1/2 grid h-8 w-8 -translate-y-1/2 place-items-center rounded-full bg-white/90 text-navy opacity-100 shadow-sm backdrop-blur transition-opacity hover:bg-white md:opacity-0 md:focus-visible:opacity-100 md:group-hover:opacity-100"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>
          <button
            type="button"
            onClick={(e) => go(e, 1)}
            aria-label="Next photo"
            className="absolute right-2 top-1/2 grid h-8 w-8 -translate-y-1/2 place-items-center rounded-full bg-white/90 text-navy opacity-100 shadow-sm backdrop-blur transition-opacity hover:bg-white md:opacity-0 md:focus-visible:opacity-100 md:group-hover:opacity-100"
          >
            <ChevronRight className="h-4 w-4" />
          </button>

          <div className="absolute bottom-3 left-1/2 flex -translate-x-1/2 gap-1.5">
            {images.map((img, i) => (
              <span
                key={img.src}
                className={`h-1.5 rounded-full shadow-sm transition-all ${
                  i === index ? "w-4 bg-white" : "w-1.5 bg-white/60"
                }`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
