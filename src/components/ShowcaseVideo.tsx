"use client";

import { useEffect, useRef, useState } from "react";

/**
 * The homepage showcase video.
 *
 * Saildeck's own footage, shown clean — no dark scrim, no text sitting on top
 * of it. The clip is silent, so it autoplays muted and loops, which every
 * browser permits.
 *
 * Loading is deliberate: `preload="none"` plus an IntersectionObserver means
 * the 2.9 MB file is only fetched once the section is actually about to be
 * seen. Until then the visitor pays for the 90 KB poster image and nothing
 * else — important on Indian mobile data, and it keeps the file out of the
 * homepage's LCP path entirely.
 */
export function ShowcaseVideo({
  src = "/videos/saildeck-hero.mp4",
  webm = "/videos/saildeck-hero.webm",
  poster = "/videos/saildeck-hero-poster.jpg",
  caption,
}: {
  src?: string;
  webm?: string;
  poster?: string;
  caption?: string;
}) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [armed, setArmed] = useState(false);

  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;

    // Respect data-saver and reduced-motion: leave the poster in place.
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const connection = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection;
    if (reduced || connection?.saveData) return;

    /* A plain scroll/resize check rather than IntersectionObserver.
       IO is the tidier API, but it silently never fires in some embedded
       webviews and preview panes — and when the whole point of the component
       is "load the video when it comes into view", a silent no-op means the
       video simply never plays. A rAF-throttled scroll listener always works,
       and it is removed the moment it has done its one job. */
    let frame = 0;

    /* Synchronous — never wrapped in rAF. requestAnimationFrame does not run
       while a tab or embedded pane is not being painted, so an rAF-gated first
       check can leave the video permanently unarmed in exactly the situations
       where nobody is watching to notice. */
    const evaluate = () => {
      const rect = el.getBoundingClientRect();
      const near = rect.top < window.innerHeight + 300 && rect.bottom > -300;
      if (near) {
        setArmed(true);
        cleanup();
      }
    };

    // Subsequent scroll events are throttled; the first check is not.
    const onScroll = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(evaluate);
    };

    const cleanup = () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    evaluate(); // in case it is already on screen at mount

    return cleanup;
  }, []);

  /* Once the sources are in the DOM, start loading and play as soon as there
     is enough data. Calling play() straight after load() races the browser's
     resource-selection step and gets rejected with AbortError, which would
     leave the poster showing forever — so we wait for `canplay` instead. */
  useEffect(() => {
    if (!armed) return;
    const v = videoRef.current;
    if (!v) return;

    const start = () => {
      v.play().catch(() => {
        /* Autoplay refused by policy — the poster stays, a fine fallback. */
      });
    };

    v.preload = "auto";
    v.addEventListener("canplay", start, { once: true });
    v.load();

    return () => v.removeEventListener("canplay", start);
  }, [armed]);

  return (
    <div ref={wrapRef}>
      <div className="relative overflow-hidden rounded-2xl bg-navy-deep shadow-[var(--shadow-float)]">
        <video
          ref={videoRef}
          poster={poster}
          muted
          loop
          playsInline
          preload="none"
          aria-label="Saildeck yacht charters in Mumbai"
          className="block aspect-video w-full object-cover"
        >
          {armed && (
            <>
              <source src={webm} type="video/webm" />
              <source src={src} type="video/mp4" />
            </>
          )}
        </video>
      </div>
      {caption && <p className="mt-3 text-center text-xs text-faint">{caption}</p>}
    </div>
  );
}
