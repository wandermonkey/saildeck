"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { whatsappLink } from "@/lib/site";
import { WhatsAppIcon } from "./icons";

/**
 * Floating WhatsApp button, bottom right on every page.
 *
 * The pre-filled message names the page the visitor came from, so the enquiry
 * lands in your inbox already qualified — you know which yacht or city they
 * were looking at before you reply.
 */
export function WhatsAppFab() {
  const pathname = usePathname();
  const [expanded, setExpanded] = useState(false);

  // Show the text label after a beat so it catches the eye without competing
  // with the hero on first paint, then collapse back to a circle.
  useEffect(() => {
    const show = setTimeout(() => setExpanded(true), 2600);
    const hide = setTimeout(() => setExpanded(false), 8000);
    return () => {
      clearTimeout(show);
      clearTimeout(hide);
    };
  }, []);

  const context = pathname === "/" ? "" : ` (page: ${pathname})`;
  const href = whatsappLink(
    `Hi Saildeck! I would like to check availability for a yacht charter.${context}`
  );

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      data-cta="whatsapp-fab"
      aria-label="Chat with Saildeck on WhatsApp"
      className="group fixed bottom-5 right-5 z-50 flex items-center gap-3 rounded-full bg-[#25D366] py-3.5 pl-4 pr-4 text-[#04210f] shadow-[0_10px_40px_-10px_rgba(37,211,102,0.8)] transition-all duration-500 hover:scale-105 md:bottom-7 md:right-7"
    >
      {/* Attention ping, purely decorative */}
      <span
        className="absolute inset-0 -z-10 rounded-full bg-[#25D366] motion-safe:animate-[pulse-ring_2.8s_ease-out_infinite]"
        aria-hidden="true"
      />
      <WhatsAppIcon className="h-6 w-6 shrink-0" />
      <span
        className={`overflow-hidden whitespace-nowrap text-sm font-semibold transition-all duration-500 ${
          expanded ? "max-w-[11rem] opacity-100" : "max-w-0 opacity-0 group-hover:max-w-[11rem] group-hover:opacity-100"
        }`}
      >
        Chat with us
      </span>
    </a>
  );
}
