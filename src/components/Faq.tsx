/**
 * Native <details> accordion: zero JavaScript, keyboard accessible for free,
 * and the answer text sits in the initial HTML where Google can read it — a
 * JS-only accordion often gets its answers skipped for FAQ rich results.
 */
export function Faq({ faqs }: { faqs: { q: string; a: string }[] }) {
  return (
    <div className="divide-y divide-line overflow-hidden rounded-2xl border border-line bg-white">
      {faqs.map((f) => (
        <details key={f.q} className="group">
          <summary className="flex cursor-pointer list-none items-center justify-between gap-6 px-5 py-4 transition-colors hover:bg-surface md:px-7 md:py-5">
            <h3 className="font-display text-base font-medium text-navy md:text-lg">{f.q}</h3>
            <span
              className="relative grid h-7 w-7 shrink-0 place-items-center rounded-full border border-line text-crimson transition-transform duration-300 group-open:rotate-45"
              aria-hidden="true"
            >
              <span className="absolute h-px w-3 bg-current" />
              <span className="absolute h-3 w-px bg-current" />
            </span>
          </summary>
          <p className="px-5 pb-5 pr-14 text-sm leading-relaxed text-muted md:px-7 md:pb-6 md:text-[0.95rem]">
            {f.a}
          </p>
        </details>
      ))}
    </div>
  );
}
