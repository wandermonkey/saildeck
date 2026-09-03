import { sampleReviews, type Review } from "@/data/reviews";
import { site } from "./site";

export type ReviewsResult = {
  reviews: Review[];
  rating: number;
  total: number;
  /** True when we are showing placeholder content rather than real reviews. */
  isSample: boolean;
  /** Deep link to the Business Profile review list, when we know the place id. */
  profileUrl: string;
};

const PLACE_ID = process.env.GOOGLE_PLACE_ID;
const API_KEY = process.env.GOOGLE_PLACES_API_KEY;

/**
 * Pulls reviews from the Google Places API when it is configured, and falls
 * back to the flagged sample set when it is not.
 *
 * Revalidates daily — reviews do not change often enough to justify hitting a
 * billed API on every request, and a cached response keeps the homepage fast.
 */
export async function getReviews(): Promise<ReviewsResult> {
  const profileUrl = PLACE_ID
    ? `https://search.google.com/local/reviews?placeid=${PLACE_ID}`
    : `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(site.legalName + " " + site.address.city)}`;

  if (!PLACE_ID || !API_KEY) {
    return {
      reviews: sampleReviews,
      rating: site.rating.value,
      total: site.rating.count,
      isSample: true,
      profileUrl,
    };
  }

  try {
    const res = await fetch(
      `https://places.googleapis.com/v1/places/${PLACE_ID}?fields=rating,userRatingCount,reviews&key=${API_KEY}`,
      { next: { revalidate: 86400 } }
    );
    if (!res.ok) throw new Error(`Places API returned ${res.status}`);

    const data = await res.json();

    const reviews: Review[] = (data.reviews ?? []).map(
      (r: {
        authorAttribution?: { displayName?: string };
        rating?: number;
        relativePublishTimeDescription?: string;
        originalText?: { text?: string };
        text?: { text?: string };
      }) => {
        const author = r.authorAttribution?.displayName ?? "Google user";
        return {
          author,
          initial: author.charAt(0).toUpperCase(),
          rating: r.rating ?? 5,
          timeAgo: r.relativePublishTimeDescription ?? "",
          text: r.originalText?.text ?? r.text?.text ?? "",
        };
      }
    );

    if (reviews.length === 0) throw new Error("Places API returned no reviews");

    return {
      reviews,
      rating: data.rating ?? site.rating.value,
      total: data.userRatingCount ?? site.rating.count,
      isSample: false,
      profileUrl,
    };
  } catch (err) {
    // Never let a third-party outage break the homepage — fall back quietly.
    console.warn("[reviews] falling back to sample content:", err);
    return {
      reviews: sampleReviews,
      rating: site.rating.value,
      total: site.rating.count,
      isSample: true,
      profileUrl,
    };
  }
}
