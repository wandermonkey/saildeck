"use client";

import { useState } from "react";
import { CheckIcon } from "@/components/icons";

/** A labelled value with a one-click copy button — used throughout /pay for
 *  bank and UPI details, which people need to copy accurately, not retype. */
export function CopyField({ label, value }: { label: string; value: string }) {
  const [copied, setCopied] = useState(false);

  async function copy() {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      // Clipboard access can fail (permissions, insecure context) — the
      // value is still selectable text, so this is a soft failure.
    }
  }

  return (
    <div className="flex items-center justify-between gap-3 border-b border-line pb-3 last:border-0 last:pb-0">
      <div className="min-w-0">
        <dt className="text-[11px] uppercase tracking-wide text-faint">{label}</dt>
        <dd className="mt-0.5 truncate text-sm font-medium text-navy">{value}</dd>
      </div>
      <button
        type="button"
        onClick={copy}
        className="shrink-0 rounded-full border border-line px-3 py-1.5 text-xs font-medium text-navy transition-colors hover:border-crimson hover:text-crimson"
      >
        {copied ? (
          <span className="flex items-center gap-1 text-teal">
            <CheckIcon className="h-3 w-3" /> Copied
          </span>
        ) : (
          "Copy"
        )}
      </button>
    </div>
  );
}
