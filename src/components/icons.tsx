/* Inline SVG icons — no icon library, which keeps the JS bundle small and is a
   direct Core Web Vitals win. All are decorative unless given a title.

   NOTE: `className` REPLACES the default, it does not merge. If you pass one,
   include the size yourself (`h-4 w-4 ...`) or the SVG renders at its natural
   size and blows out the layout. */

type P = { className?: string };

const stroke = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.6,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  "aria-hidden": true,
  viewBox: "0 0 24 24",
};

export const WhatsAppIcon = ({ className = "h-5 w-5" }: P) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.174.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51l-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884a9.82 9.82 0 016.988 2.898 9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
  </svg>
);

export const GoogleIcon = ({ className = "h-5 w-5" }: P) => (
  <svg viewBox="0 0 48 48" className={className} aria-hidden="true">
    <path fill="#4285F4" d="M45.12 24.5c0-1.56-.14-3.06-.4-4.5H24v8.51h11.84c-.51 2.75-2.06 5.08-4.39 6.64v5.52h7.11c4.16-3.83 6.56-9.47 6.56-16.17z" />
    <path fill="#34A853" d="M24 46c5.94 0 10.92-1.97 14.56-5.33l-7.11-5.52c-1.97 1.32-4.49 2.1-7.45 2.1-5.73 0-10.58-3.87-12.31-9.07H4.34v5.7C7.96 41.07 15.4 46 24 46z" />
    <path fill="#FBBC05" d="M11.69 28.18C11.25 26.86 11 25.45 11 24s.25-2.86.69-4.18v-5.7H4.34C2.85 17.09 2 20.45 2 24s.85 6.91 2.34 9.88l7.35-5.7z" />
    <path fill="#EA4335" d="M24 10.75c3.23 0 6.13 1.11 8.41 3.29l6.31-6.31C34.91 4.18 29.93 2 24 2 15.4 2 7.96 6.93 4.34 14.12l7.35 5.7c1.73-5.2 6.58-9.07 12.31-9.07z" />
  </svg>
);

export const PhoneIcon = ({ className = "h-4 w-4" }: P) => (
  <svg {...stroke} className={className}>
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.9.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92Z" />
  </svg>
);

export const MailIcon = ({ className = "h-4 w-4" }: P) => (
  <svg {...stroke} className={className}>
    <rect x="2" y="4" width="20" height="16" rx="2" />
    <path d="m2 7 10 6 10-6" />
  </svg>
);

export const PinIcon = ({ className = "h-4 w-4" }: P) => (
  <svg {...stroke} className={className}>
    <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
    <circle cx="12" cy="10" r="3" />
  </svg>
);

export const ArrowIcon = ({ className = "h-4 w-4" }: P) => (
  <svg {...stroke} strokeWidth={1.8} className={className}>
    <path d="M5 12h14M13 6l6 6-6 6" />
  </svg>
);

export const ChevronDown = ({ className = "h-4 w-4" }: P) => (
  <svg {...stroke} strokeWidth={2} className={className}>
    <path d="m6 9 6 6 6-6" />
  </svg>
);

export const ChevronLeft = ({ className = "h-5 w-5" }: P) => (
  <svg {...stroke} strokeWidth={2} className={className}>
    <path d="m15 18-6-6 6-6" />
  </svg>
);

export const ChevronRight = ({ className = "h-5 w-5" }: P) => (
  <svg {...stroke} strokeWidth={2} className={className}>
    <path d="m9 18 6-6-6-6" />
  </svg>
);

export const CheckIcon = ({ className = "h-4 w-4" }: P) => (
  <svg {...stroke} strokeWidth={2.4} className={className}>
    <path d="M20 6 9 17l-5-5" />
  </svg>
);

export const StarIcon = ({ className = "h-4 w-4" }: P) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
    <path d="m12 2 2.9 6.26 6.85.77-5.1 4.63 1.42 6.74L12 17.02l-6.07 3.38 1.42-6.74-5.1-4.63 6.85-.77L12 2Z" />
  </svg>
);

export const PlayIcon = ({ className = "h-6 w-6" }: P) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
    <path d="M8 5.14v13.72a1 1 0 0 0 1.5.87l11.15-6.86a1 1 0 0 0 0-1.74L9.5 4.27A1 1 0 0 0 8 5.14Z" />
  </svg>
);

export const AnchorIcon = ({ className = "h-5 w-5" }: P) => (
  <svg {...stroke} className={className}>
    <circle cx="12" cy="5" r="3" />
    <path d="M12 22V8M5 12H2a10 10 0 0 0 20 0h-3" />
  </svg>
);

export const ShieldIcon = ({ className = "h-6 w-6" }: P) => (
  <svg {...stroke} className={className}>
    <path d="M12 2 4 5v6c0 5 3.4 9.4 8 11 4.6-1.6 8-6 8-11V5l-8-3Z" />
    <path d="m9 12 2 2 4-4" />
  </svg>
);

export const TagIcon = ({ className = "h-6 w-6" }: P) => (
  <svg {...stroke} className={className}>
    <path d="M20.6 13.4 12 22l-9-9V4a1 1 0 0 1 1-1h9l7.6 7.6a2 2 0 0 1 0 2.8Z" />
    <circle cx="7.5" cy="7.5" r="1.3" fill="currentColor" stroke="none" />
  </svg>
);

export const HeadsetIcon = ({ className = "h-6 w-6" }: P) => (
  <svg {...stroke} className={className}>
    <path d="M4 14v-2a8 8 0 0 1 16 0v2" />
    <rect x="2" y="14" width="4" height="6" rx="1.5" />
    <rect x="18" y="14" width="4" height="6" rx="1.5" />
    <path d="M20 20a3 3 0 0 1-3 3h-3" />
  </svg>
);

export const CalendarIcon = ({ className = "h-6 w-6" }: P) => (
  <svg {...stroke} className={className}>
    <rect x="3" y="5" width="18" height="16" rx="2" />
    <path d="M3 10h18M8 3v4M16 3v4" />
  </svg>
);

export const UsersIcon = ({ className = "h-4 w-4" }: P) => (
  <svg {...stroke} className={className}>
    <path d="M16 20v-1.5a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4V20" />
    <circle cx="9" cy="7" r="3.5" />
    <path d="M22 20v-1.5a4 4 0 0 0-3-3.87M16.5 3.6a4 4 0 0 1 0 7" />
  </svg>
);

export const RulerIcon = ({ className = "h-4 w-4" }: P) => (
  <svg {...stroke} className={className}>
    <path d="M3.5 13.5 13.5 3.5a2 2 0 0 1 2.8 0l4.2 4.2a2 2 0 0 1 0 2.8l-10 10a2 2 0 0 1-2.8 0l-4.2-4.2a2 2 0 0 1 0-2.8Z" />
    <path d="m8 9 2 2M11 6l2 2M5 12l2 2" />
  </svg>
);

export const BedIcon = ({ className = "h-4 w-4" }: P) => (
  <svg {...stroke} className={className}>
    <path d="M3 18V7M3 12h18v6M7 12V9h6a4 4 0 0 1 4 3" />
  </svg>
);

export const ClockIcon = ({ className = "h-4 w-4" }: P) => (
  <svg {...stroke} className={className}>
    <circle cx="12" cy="12" r="9" />
    <path d="M12 7v5l3.5 2" />
  </svg>
);

export const RouteIcon = ({ className = "h-5 w-5" }: P) => (
  <svg {...stroke} className={className}>
    <circle cx="5" cy="6" r="2.5" />
    <circle cx="19" cy="18" r="2.5" />
    <path d="M7.5 6H14a3.5 3.5 0 0 1 0 7h-4a3.5 3.5 0 0 0 0 7h6.5" />
  </svg>
);

export const BoatIcon = ({ className = "h-5 w-5" }: P) => (
  <svg {...stroke} className={className}>
    <path d="M2 18c2 0 2 1.5 4 1.5s2-1.5 4-1.5 2 1.5 4 1.5 2-1.5 4-1.5 2 1.5 4 1.5" />
    <path d="M4 15 5.5 9h13L20 15" />
    <path d="M12 9V4M12 4l5 3" />
  </svg>
);

/* Occasion icons, keyed to charterOccasions[].icon */
export const OccasionIcon = ({ name, className = "h-6 w-6" }: { name: string; className?: string }) => {
  const p = { ...stroke, className };
  switch (name) {
    case "sunset":
      return (
        <svg {...p}>
          <path d="M12 3v3M5.6 8.6 7 10M2 17h20M18.4 8.6 17 10M4 21h16" />
          <path d="M8 17a4 4 0 0 1 8 0" />
        </svg>
      );
    case "cake":
      return (
        <svg {...p}>
          <path d="M20 21v-8H4v8M2 21h20M7 13V9m5 4V9m5 4V9" />
          <path d="M4 13a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2" />
        </svg>
      );
    case "ring":
      return (
        <svg {...p}>
          <circle cx="12" cy="15" r="6" />
          <path d="m9 6 3-4 3 4-3 3-3-3Z" />
        </svg>
      );
    case "briefcase":
      return (
        <svg {...p}>
          <rect x="2" y="7" width="20" height="14" rx="2" />
          <path d="M8 7V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2M2 13h20" />
        </svg>
      );
    case "camera":
      return (
        <svg {...p}>
          <path d="M3 8h3l2-3h8l2 3h3a1 1 0 0 1 1 1v9a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V9a1 1 0 0 1 1-1Z" />
          <circle cx="12" cy="13" r="3.5" />
        </svg>
      );
    default:
      return (
        <svg {...p}>
          <path d="M2 18c2 0 2 1.5 4 1.5s2-1.5 4-1.5 2 1.5 4 1.5 2-1.5 4-1.5 2 1.5 4 1.5" />
          <path d="M6 15V6l7 3-7 3M13 15V4" />
        </svg>
      );
  }
};
