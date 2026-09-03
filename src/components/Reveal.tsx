"use client";

import { useEffect, useRef, type ElementType, type ReactNode } from "react";

/**
 * Fade-and-rise on scroll, using IntersectionObserver rather than a motion
 * library — the whole effect costs about 50 lines and no extra KB.
 *
 * IMPORTANT DESIGN DECISION: the hiding is applied by this component at
 * runtime, never by a stylesheet rule that applies before hydration.
 *
 * The earlier version hid every `[data-reveal]` via CSS as soon as a `js`
 * class was on <html>, and revealed it again once the observer fired. That
 * inverted the failure mode: any hydration hiccup — a chunk that 404s, a slow
 * network, a client error anywhere in the tree — left the entire page at
 * opacity 0 while the HTML was perfectly fine underneath. It also meant
 * crawlers and previewers that do not execute JS saw a blank page.
 *
 * Now: content is visible by default. Only elements that are actually below
 * the fold when this mounts get armed for the animation, so there is no flash
 * of already-visible content being hidden and re-shown either.
 */
export function Reveal({
  children,
  as: Tag = "div",
  delay = 0,
  className = "",
}: {
  children: ReactNode;
  as?: ElementType;
  delay?: number;
  className?: string;
}) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    // Already on screen? Leave it alone — animating it in would just flash.
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight * 0.92) return;

    el.classList.add("reveal-armed");

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target); // reveal once, then stop watching
          }
        }
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.05 }
    );

    observer.observe(el);

    /* Failsafe: if the observer somehow never fires (a browser quirk, an
       element that never enters the viewport because a parent is scrolled
       oddly), show the content anyway rather than leaving it hidden. */
    const failsafe = setTimeout(() => el.classList.add("is-visible"), 3000);

    return () => {
      observer.disconnect();
      clearTimeout(failsafe);
    };
  }, []);

  return (
    <Tag
      ref={ref}
      data-reveal=""
      style={{ "--reveal-delay": `${delay}ms` } as React.CSSProperties}
      className={className}
    >
      {children}
    </Tag>
  );
}
