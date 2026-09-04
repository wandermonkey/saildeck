import { GoogleIcon, StarIcon, ArrowIcon } from "./icons";
import { Reveal } from "./Reveal";
import type { ReviewsResult } from "@/lib/reviews";

/**
 * Google reviews block, modelled on the reference site: the aggregate rating
 * and Google mark on the left, individual review cards scrolling on the right.
 *
 * When `isSample` is true we are rendering placeholder copy rather than real
 * feedback — see src/data/reviews.ts. A visible notice is shown in development
 * so this cannot quietly ship as if it were genuine.
 */
export function GoogleReviews({ data }: { data: ReviewsResult }) {
  const { reviews, rating, total, isSample, profileUrl } = data;
  const showSampleWarning = isSample && process.env.NODE_ENV !== "production";

  return (
    <section className="border-y border-line bg-surface py-16 md:py-24">
      <div className="container-x">
        {showSampleWarning && (
          <p className="mb-8 rounded-xl border border-crimson/30 bg-crimson-soft px-5 py-4 text-sm text-crimson">
            <strong>Placeholder reviews.</strong> These are sample cards, not real customer
            feedback. Add your genuine Google reviews in <code>src/data/reviews.ts</code>, or set{" "}
            <code>GOOGLE_PLACES_API_KEY</code> and <code>GOOGLE_PLACE_ID</code> to pull them live.
            This notice is hidden in production — the placeholder text is not.
          </p>
        )}

        <div className="grid gap-10 lg:grid-cols-[20rem_1fr] lg:items-start lg:gap-14">
          <Reveal>
            <div className="rounded-2xl border border-line bg-white p-7 shadow-[var(--shadow-card)]">
              <GoogleIcon className="h-8 w-8" />
              <h2 className="mt-5 text-2xl leading-tight">
                What our guests <span className="italic font-normal text-crimson">say</span>
              </h2>

              <div className="mt-5 flex items-baseline gap-2">
                <span className="font-display text-5xl font-semibold text-navy">{rating.toFixed(1)}</span>
                <span className="text-sm text-muted">out of 5</span>
              </div>

              <div className="mt-2 flex gap-0.5 text-[#FBBC05]">
                {[...Array(5)].map((_, i) => (
                  <StarIcon key={i} className="h-5 w-5" />
                ))}
              </div>

              <p className="mt-3 text-sm text-muted">
                Based on {total} Google reviews
              </p>

              <a
                href={profileUrl}
                target="_blank"
                rel="noopener noreferrer"
                data-cta="reviews-google"
                className="mt-6 inline-flex items-center gap-2 rounded-full border border-line px-5 py-2.5 text-sm font-medium text-navy transition-all hover:border-crimson hover:text-crimson"
              >
                Read all reviews
                <ArrowIcon className="h-4 w-4" />
              </a>
            </div>
          </Reveal>

          {/* Horizontal scroller so the block stays one row tall on desktop and
              swipes on mobile, matching the reference layout.

              min-w-0 on this Reveal is load-bearing: it is a grid item, and
              grid items default to min-width:auto, which sizes the track to
              fit the scroller's full unscrolled content instead of letting
              overflow-x-auto clip it — the classic "grid blowout" bug. Without
              it this pushed the whole page over 1600px wide on a 375px phone. */}
          <Reveal delay={120} className="min-w-0">
            <div className="no-scrollbar -mx-5 flex snap-x snap-mandatory gap-5 overflow-x-auto px-5 pb-2 lg:mx-0 lg:px-0">
              {reviews.map((r, i) => (
                <article
                  key={i}
                  className="flex w-[19rem] shrink-0 snap-start flex-col rounded-2xl border border-line bg-white p-6 shadow-[var(--shadow-card)] sm:w-[21rem]"
                >
                  <div className="flex items-center gap-3">
                    <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-navy text-sm font-semibold text-white">
                      {r.initial}
                    </span>
                    <div className="min-w-0">
                      <p className="truncate text-sm font-semibold text-navy">{r.author}</p>
                      <p className="text-xs text-faint">{r.timeAgo}</p>
                    </div>
                    <GoogleIcon className="ml-auto h-4 w-4 shrink-0" />
                  </div>

                  <div className="mt-4 flex gap-0.5 text-[#FBBC05]">
                    {[...Array(5)].map((_, s) => (
                      <StarIcon key={s} className={`h-4 w-4 ${s < r.rating ? "" : "text-line"}`} />
                    ))}
                  </div>

                  <p className="mt-3 text-sm leading-relaxed text-muted">{r.text}</p>
                </article>
              ))}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
