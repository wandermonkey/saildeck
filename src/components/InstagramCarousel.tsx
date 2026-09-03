"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight, ArrowIcon } from "./icons";
import { instagramPosts } from "@/data/instagram";
import { site } from "@/lib/site";

/**
 * Instagram feed carousel.
 *
 * Same scroll-snap approach as the product gallery: native touch swipe and
 * momentum for free, arrow buttons for desktop, no carousel library and no
 * extra KB. Each card links out to the post.
 */
export function InstagramCarousel() {
  const trackRef = useRef<HTMLDivElement>(null);
  const [atStart, setAtStart] = useState(true);
  const [atEnd, setAtEnd] = useState(false);

  const update = useCallback(() => {
    const t = trackRef.current;
    if (!t) return;
    setAtStart(t.scrollLeft < 8);
    setAtEnd(t.scrollLeft + t.clientWidth >= t.scrollWidth - 8);
  }, []);

  useEffect(() => {
    const t = trackRef.current;
    if (!t) return;
    update();
    t.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      t.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, [update]);

  /* Scroll by roughly one card, so a click always lands on a card edge. */
  const nudge = (dir: -1 | 1) => {
    const t = trackRef.current;
    if (!t) return;
    const card = t.querySelector("a");
    const step = card ? card.clientWidth + 20 : t.clientWidth * 0.8;
    t.scrollBy({ left: dir * step, behavior: "smooth" });
  };

  return (
    <section className="border-y border-line bg-surface py-16 md:py-20">
      <div className="container-x">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <p className="eyebrow">@saildeck</p>
            <h2 className="mt-3 text-3xl leading-tight md:text-[2.4rem]">
              Straight from the <span className="italic font-normal text-crimson">deck</span>
            </h2>
            <p className="mt-3 max-w-lg text-muted">
              What our charters actually look like, posted as they happen.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <a
              href={site.social.instagram}
              target="_blank"
              rel="noopener noreferrer"
              data-cta="instagram-follow"
              className="inline-flex items-center gap-2 rounded-full border border-line bg-white px-5 py-2.5 text-sm font-medium text-navy transition-colors hover:border-crimson hover:text-crimson"
            >
              Follow us <ArrowIcon className="h-3.5 w-3.5" />
            </a>

            <div className="hidden gap-2 sm:flex">
              <button
                type="button"
                onClick={() => nudge(-1)}
                disabled={atStart}
                aria-label="Previous posts"
                className="grid h-10 w-10 place-items-center rounded-full border border-line bg-white text-navy transition-all hover:border-crimson hover:text-crimson disabled:opacity-35 disabled:hover:border-line disabled:hover:text-navy"
              >
                <ChevronLeft className="h-4 w-4" />
              </button>
              <button
                type="button"
                onClick={() => nudge(1)}
                disabled={atEnd}
                aria-label="More posts"
                className="grid h-10 w-10 place-items-center rounded-full border border-line bg-white text-navy transition-all hover:border-crimson hover:text-crimson disabled:opacity-35 disabled:hover:border-line disabled:hover:text-navy"
              >
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>

        <div
          ref={trackRef}
          className="no-scrollbar -mx-5 mt-9 flex snap-x snap-mandatory gap-5 overflow-x-auto px-5 pb-2 md:mx-0 md:px-0"
        >
          {instagramPosts.map((p, i) => (
            <a
              key={p.image + i}
              href={p.href}
              target="_blank"
              rel="noopener noreferrer"
              data-cta="instagram-post"
              className="group w-[15rem] shrink-0 snap-start overflow-hidden rounded-2xl border border-line bg-white shadow-[var(--shadow-card)] transition-shadow hover:shadow-[var(--shadow-card-hover)] sm:w-[17rem]"
            >
              <div className="relative aspect-square overflow-hidden bg-surface-2">
                <Image
                  src={p.image}
                  alt={p.alt}
                  fill
                  sizes="(max-width: 640px) 60vw, 17rem"
                  loading="lazy"
                  className="object-cover transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-105"
                />

                {p.kind !== "photo" && (
                  <span className="absolute right-3 top-3 grid h-7 w-7 place-items-center rounded-full bg-black/45 text-white backdrop-blur-sm">
                    {p.kind === "reel" ? (
                      <svg viewBox="0 0 24 24" fill="currentColor" className="h-3.5 w-3.5" aria-hidden="true">
                        <path d="M8 5.14v13.72a1 1 0 0 0 1.5.87l11.15-6.86a1 1 0 0 0 0-1.74L9.5 4.27A1 1 0 0 0 8 5.14Z" />
                      </svg>
                    ) : (
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-3.5 w-3.5" aria-hidden="true">
                        <rect x="8" y="3" width="13" height="13" rx="2" />
                        <path d="M3 8v11a2 2 0 0 0 2 2h11" />
                      </svg>
                    )}
                  </span>
                )}
              </div>

              <p className="line-clamp-2 p-4 text-sm leading-relaxed text-muted">{p.caption}</p>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
