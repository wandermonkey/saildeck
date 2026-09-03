export type Review = {
  author: string;
  /** Initial shown in the avatar circle. */
  initial: string;
  rating: number;
  timeAgo: string;
  text: string;
};

/**
 * ⚠️ PLACEHOLDER CONTENT — REPLACE BEFORE LAUNCH ⚠️
 *
 * These are sample reviews written to demonstrate the layout. They are NOT
 * real customer feedback and must not be published as if they were.
 *
 * Publishing invented reviews attributed to named people is misleading to
 * customers and breaches Google's review policies and India's consumer
 * protection rules on fake reviews. It also puts the Google Business Profile
 * at risk of suspension — which would cost far more traffic than the reviews
 * would ever have won.
 *
 * Two honest ways to fill this section:
 *
 * 1. Paste in your genuine Google reviews, verbatim, with the reviewer's
 *    display name exactly as it appears on Google.
 * 2. Better — set GOOGLE_PLACES_API_KEY and GOOGLE_PLACE_ID in .env.local and
 *    `getReviews()` in src/lib/reviews.ts will pull them live from your
 *    Business Profile, so the section stays current on its own.
 *
 * Until one of those is done, treat this section as unfinished.
 */
export const sampleReviews: Review[] = [
  {
    author: "Sample Review — replace",
    initial: "S",
    rating: 5,
    timeAgo: "2 weeks ago",
    text: "Placeholder text showing how a five-star review renders in this layout. Replace with a genuine review from your Google Business Profile before the site goes live.",
  },
  {
    author: "Sample Review — replace",
    initial: "S",
    rating: 5,
    timeAgo: "1 month ago",
    text: "Placeholder text demonstrating a longer review that runs to several lines, so you can see how the card handles a fuller piece of customer feedback in this column width.",
  },
  {
    author: "Sample Review — replace",
    initial: "S",
    rating: 5,
    timeAgo: "1 month ago",
    text: "Placeholder text for a third review card. Genuine reviews mentioning the boat name, the occasion and the crew tend to convert best, so prioritise those when you choose which to feature.",
  },
  {
    author: "Sample Review — replace",
    initial: "S",
    rating: 4,
    timeAgo: "2 months ago",
    text: "Placeholder text showing a four-star review. Keeping an occasional four-star review visible reads as more credible than a wall of perfect fives.",
  },
  {
    author: "Sample Review — replace",
    initial: "S",
    rating: 5,
    timeAgo: "3 months ago",
    text: "Placeholder text for a fifth card, which is where the carousel begins to scroll on a desktop screen. Replace all of these with real feedback.",
  },
];
