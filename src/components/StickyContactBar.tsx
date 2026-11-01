"use client";

import { usePathname } from "next/navigation";
import { site, telLink, whatsappLink } from "@/lib/site";
import { PhoneIcon, WhatsAppIcon } from "./icons";

/**
 * Full-width Call + WhatsApp bar, fixed to the bottom of the viewport on
 * small screens only — the desktop floating WhatsApp button (WhatsAppFab)
 * covers larger screens instead. On mobile, a thumb-width floating circle is
 * easy to miss under one-handed use; a bar that spans the screen isn't.
 */
export function StickyContactBar() {
  const pathname = usePathname();
  const context = pathname === "/" ? "" : ` (page: ${pathname})`;
  const href = whatsappLink(`Hi Saildeck! I would like to check availability for a yacht charter.${context}`);

  return (
    <div
      className="fixed inset-x-0 bottom-0 z-50 flex md:hidden"
      style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
      data-cta="sticky-contact-bar"
    >
      <a
        href={telLink}
        data-cta="sticky-call"
        className="flex flex-1 items-center justify-center gap-2 bg-navy py-3.5 text-sm font-semibold text-white"
      >
        <PhoneIcon className="h-4 w-4" />
        Call
      </a>
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        data-cta="sticky-whatsapp"
        className="flex flex-1 items-center justify-center gap-2 bg-[#25D366] py-3.5 text-sm font-semibold text-[#04210f]"
      >
        <WhatsAppIcon className="h-4 w-4" />
        WhatsApp
      </a>
      {/* Visually hidden fallback so screen readers still announce the
          number, matching the phone CTA pattern used elsewhere on the site. */}
      <span className="sr-only">{site.phoneDisplay}</span>
    </div>
  );
}
