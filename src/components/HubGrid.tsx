import Link from "next/link";
import Image from "next/image";
import { Reveal } from "./Reveal";
import { ArrowIcon } from "./icons";
import type { ContentPage } from "@/data/pages";

/**
 * Card grid used by the hub pages (Buy & Sell, Management, Sailing School).
 * Keeping it here means all three index pages stay visually identical without
 * three copies of the same markup.
 */
export function HubGrid({ pages, columns = 3 }: { pages: ContentPage[]; columns?: 2 | 3 }) {
  return (
    <div className={`grid gap-6 sm:grid-cols-2 ${columns === 3 ? "lg:grid-cols-3" : ""}`}>
      {pages.map((p, i) => (
        <Reveal key={p.href} delay={(i % 3) * 70}>
          <Link href={p.href} data-cta="hub-card" className="card card-hover group flex h-full flex-col overflow-hidden">
            <div className="relative aspect-[16/10] overflow-hidden bg-surface-2">
              <Image
                src={p.image}
                alt={p.imageAlt}
                fill
                sizes="(max-width: 768px) 100vw, 33vw"
                priority={i < 3}
                className="object-cover transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-105"
              />
            </div>
            <div className="flex flex-1 flex-col p-6">
              <h3 className="font-display text-xl leading-tight transition-colors group-hover:text-crimson">
                {p.title} {p.accent && <span className="italic font-normal">{p.accent}</span>}
              </h3>
              <p className="mt-2.5 line-clamp-3 flex-1 text-sm leading-relaxed text-muted">{p.intro}</p>
              <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-medium text-crimson transition-all group-hover:gap-3">
                Read more <ArrowIcon className="h-3.5 w-3.5" />
              </span>
            </div>
          </Link>
        </Reveal>
      ))}
    </div>
  );
}
