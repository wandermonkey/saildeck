"use client";

import { useEffect, useRef } from "react";

/**
 * Full-bleed background video for the homepage hero.
 *
 * Saildeck's own footage of a charter off the Mumbai coast, shown as the
 * banner itself rather than as a separate section. The clip is silent, so it
 * autoplays muted and loops — permitted by every browser's autoplay policy.
 *
 * The poster is the LCP element and paints immediately; the video is fetched
 * straight away (it IS the hero) but the page never waits on it. Data-saver
 * and reduced-motion users simply get the poster.
 */
export function HeroVideo({
  src = "/videos/saildeck-hero.mp4",
  webm = "/videos/saildeck-hero.webm",
  poster = "/videos/saildeck-hero-poster.jpg",
}: {
  src?: string;
  webm?: string;
  poster?: string;
}) {
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const v = ref.current;
    if (!v) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const connection = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection;
    if (reduced || connection?.saveData) return;

    /* Play once there is enough data. Calling play() immediately races the
       browser's source selection and can be rejected with AbortError. */
    const start = () => {
      v.play().catch(() => {
        /* Autoplay refused — the poster stays. */
      });
    };
    v.addEventListener("canplay", start, { once: true });
    if (v.readyState >= 3) start();

    return () => v.removeEventListener("canplay", start);
  }, []);

  return (
    <video
      ref={ref}
      poster={poster}
      muted
      loop
      playsInline
      autoPlay
      preload="auto"
      aria-hidden="true"
      className="absolute inset-0 h-full w-full object-cover"
    >
      <source src={webm} type="video/webm" />
      <source src={src} type="video/mp4" />
    </video>
  );
}
