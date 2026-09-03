import Link from "next/link";
import type { ReactNode } from "react";

/* Shared primitives. Kept in one file so the visual language stays consistent
   and a change to the button shape lands everywhere at once. */

export function Button({
  href,
  children,
  variant = "primary",
  size = "md",
  external = false,
  className = "",
  dataCta,
}: {
  href: string;
  children: ReactNode;
  variant?: "primary" | "outline" | "light" | "whatsapp";
  size?: "sm" | "md" | "lg";
  external?: boolean;
  className?: string;
  /** Analytics hook — see README for the GA4 event mapping. */
  dataCta?: string;
}) {
  // whitespace-nowrap matters: inside a flex row these will otherwise wrap a
  // two-word label onto two lines and look broken.
  const base =
    "group inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full font-medium transition-all duration-300 active:scale-[0.98]";

  const sizes = { sm: "px-5 py-2.5 text-sm", md: "px-6 py-3 text-sm", lg: "px-8 py-4 text-base" }[size];

  const variants = {
    primary: "bg-crimson text-white hover:bg-crimson-dark hover:shadow-[0_10px_28px_-10px_rgba(168,11,40,0.7)] hover:-translate-y-0.5",
    outline: "border border-line bg-white text-navy hover:border-crimson hover:text-crimson hover:-translate-y-0.5",
    light: "bg-white/12 text-white backdrop-blur-sm ring-1 ring-white/30 hover:bg-white hover:text-navy hover:-translate-y-0.5",
    whatsapp: "bg-[#25D366] text-[#04210f] font-semibold hover:brightness-105 hover:-translate-y-0.5",
  }[variant];

  const classes = `${base} ${sizes} ${variants} ${className}`;

  if (external) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={classes} data-cta={dataCta}>
        {children}
      </a>
    );
  }
  return (
    <Link href={href} className={classes} data-cta={dataCta}>
      {children}
    </Link>
  );
}

export function Eyebrow({ children, light = false }: { children: ReactNode; light?: boolean }) {
  return <p className={`eyebrow ${light ? "text-white/70" : ""}`}>{children}</p>;
}

export function Section({
  children,
  className = "",
  id,
  tone = "white",
}: {
  children: ReactNode;
  className?: string;
  id?: string;
  tone?: "white" | "surface" | "navy";
}) {
  const tones = {
    white: "bg-canvas",
    surface: "bg-surface",
    navy: "bg-navy text-white",
  }[tone];
  return (
    <section id={id} className={`relative py-16 md:py-24 ${tones} ${className}`}>
      {children}
    </section>
  );
}

/** Section heading with an optional serif-italic emphasis phrase. */
export function SectionTitle({
  eyebrow,
  title,
  accent,
  sub,
  align = "left",
  light = false,
}: {
  eyebrow?: string;
  title: string;
  accent?: string;
  sub?: string;
  align?: "left" | "center";
  light?: boolean;
}) {
  return (
    <div className={align === "center" ? "mx-auto max-w-2xl text-center" : "max-w-2xl"}>
      {eyebrow && <Eyebrow light={light}>{eyebrow}</Eyebrow>}
      <h2 className={`mt-3 text-3xl leading-[1.1] md:text-[2.6rem] ${light ? "text-white" : ""}`}>
        {title} {accent && <span className="italic font-normal text-crimson">{accent}</span>}
      </h2>
      {sub && <p className={`mt-4 leading-relaxed ${light ? "text-white/70" : "text-muted"}`}>{sub}</p>}
    </div>
  );
}

export function Stat({ value, label, light = false }: { value: string; label: string; light?: boolean }) {
  return (
    <div>
      <div className={`font-display text-3xl font-semibold md:text-4xl ${light ? "text-white" : "text-navy"}`}>
        {value}
      </div>
      <div className={`mt-1 text-sm ${light ? "text-white/60" : "text-muted"}`}>{label}</div>
    </div>
  );
}

/** Small pill used for durations, categories and tags. */
export function Pill({ children, tone = "line" }: { children: ReactNode; tone?: "line" | "crimson" | "teal" }) {
  const tones = {
    line: "border-line text-muted",
    crimson: "border-crimson/25 bg-crimson-soft text-crimson",
    teal: "border-teal/25 bg-teal-soft text-teal",
  }[tone];
  return (
    <span className={`inline-flex items-center rounded-full border px-3 py-1 text-xs font-medium ${tones}`}>
      {children}
    </span>
  );
}

/** "Eyebrow + big title + link" row used at the top of most listing sections. */
export function SectionHead({
  eyebrow,
  title,
  accent,
  sub,
  linkHref,
  linkLabel,
  light = false,
}: {
  eyebrow: string;
  title: string;
  accent?: string;
  sub?: string;
  linkHref?: string;
  linkLabel?: string;
  light?: boolean;
}) {
  return (
    <div className="flex flex-wrap items-end justify-between gap-6">
      <SectionTitle eyebrow={eyebrow} title={title} accent={accent} sub={sub} light={light} />
      {linkHref && linkLabel && (
        <Link
          href={linkHref}
          className={`inline-flex items-center gap-2 text-sm font-medium transition-all hover:gap-3 ${
            light ? "text-white" : "text-crimson"
          }`}
        >
          {linkLabel}
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4" aria-hidden="true">
            <path d="M5 12h14M13 6l6 6-6 6" />
          </svg>
        </Link>
      )}
    </div>
  );
}
