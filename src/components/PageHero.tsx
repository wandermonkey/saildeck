import Image from "next/image";
import Link from "next/link";
import { Reveal } from "./Reveal";

/**
 * Shared hero for interior pages.
 *
 * The banner photograph is the point — on a charter site it is how a visitor
 * works out what the page is actually selling. So instead of a full-frame dark
 * scrim, the text sits in its own frosted panel and the rest of the image is
 * left alone. Only a soft bottom gradient remains, to seat the panel and stop
 * the image cutting hard against the section below.
 */
export function PageHero({
  eyebrow,
  title,
  accent,
  sub,
  image,
  imageAlt,
  breadcrumb,
  facts,
  children,
  compact = false,
}: {
  eyebrow?: string;
  title: string;
  accent?: string;
  sub?: string;
  image: string;
  imageAlt: string;
  breadcrumb: { name: string; path: string }[];
  facts?: { label: string; value: string }[];
  children?: React.ReactNode;
  compact?: boolean;
}) {
  return (
    <>
      <section className={`relative flex items-end overflow-hidden ${compact ? "min-h-[46vh]" : "min-h-[58vh]"}`}>
        <Image src={image} alt={imageAlt} fill priority quality={75} sizes="100vw" className="object-cover" />

        {/* Light touch only: enough to seat the panel, not enough to hide the boat. */}
        <div className="absolute inset-0 bg-gradient-to-t from-navy-deep/70 via-navy-deep/10 to-transparent" />

        <div className="container-x relative z-10 w-full py-10 md:py-12">
          <Reveal>
            <div className="max-w-3xl rounded-2xl bg-navy-deep/72 p-6 backdrop-blur-md md:p-8">
              <nav aria-label="Breadcrumb" className="mb-4">
                <ol className="flex flex-wrap items-center gap-2 text-xs text-white/65">
                  {breadcrumb.map((b, i) => (
                    <li key={b.path} className="flex items-center gap-2">
                      {i > 0 && <span aria-hidden="true">/</span>}
                      {i === breadcrumb.length - 1 ? (
                        <span className="text-white/90">{b.name}</span>
                      ) : (
                        <Link href={b.path} className="transition-colors hover:text-white">{b.name}</Link>
                      )}
                    </li>
                  ))}
                </ol>
              </nav>

              {eyebrow && (
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-teal">{eyebrow}</p>
              )}

              <h1 className="mt-2.5 text-3xl leading-[1.06] text-white sm:text-4xl md:text-5xl">
                {title} {accent && <span className="italic font-normal text-white/85">{accent}</span>}
              </h1>

              {sub && <p className="mt-4 max-w-2xl leading-relaxed text-white/80">{sub}</p>}

              {children && <div className="mt-6">{children}</div>}
            </div>
          </Reveal>
        </div>
      </section>

      {facts && facts.length > 0 && (
        <div className="border-b border-line bg-white">
          <div className="container-x grid grid-cols-2 gap-6 py-6 sm:grid-cols-4">
            {facts.map((f) => (
              <div key={f.label}>
                <div className="text-[11px] font-semibold uppercase tracking-wider text-faint">{f.label}</div>
                <div className="mt-1 font-display text-lg font-semibold text-navy">{f.value}</div>
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
}
