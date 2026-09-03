export type InstaPost = {
  /** Link to the actual post. Replace with your real permalinks. */
  href: string;
  image: string;
  alt: string;
  caption: string;
  /** "photo" adds no badge; "reel" and "carousel" show the matching icon. */
  kind: "photo" | "reel" | "carousel";
};

/**
 * ⚠️ PLACEHOLDER FEED — REPLACE BEFORE LAUNCH
 *
 * These are stock images standing in for Saildeck's Instagram grid so the
 * carousel can be designed and reviewed. Swap them for your real posts.
 *
 * Two ways to make this live:
 *
 * 1. Manual (no API, zero maintenance risk): paste your best nine posts here
 *    with their permalinks and a downloaded copy of each image in
 *    /public/images/instagram/. Update it when you post something good.
 *
 * 2. Automatic: use the Instagram Basic Display API or a service like
 *    Behold/EmbedSocial to fetch the feed, and map the response into this same
 *    shape. Note Instagram's CDN URLs expire, so an API integration must either
 *    proxy or re-cache the images — do not hotlink them directly.
 */
export const instagramPosts: InstaPost[] = [
  {
    href: "https://www.instagram.com/saildeck",
    image: "https://images.unsplash.com/photo-1749183563789-ae17d4a952d2?auto=format&fit=crop&w=900&q=80",
    alt: "Guests on the upper deck of a charter yacht beside the pool",
    caption: "Sunday on the Solstice Dream. Deck jacuzzi, bar open, Mumbai behind us.",
    kind: "photo",
  },
  {
    href: "https://www.instagram.com/saildeck",
    image: "https://images.unsplash.com/photo-1628029338883-61644ec68475?auto=format&fit=crop&w=900&q=80",
    alt: "Yacht on open water as the sun sets behind it",
    caption: "The two hours everyone books, and the one nobody regrets.",
    kind: "reel",
  },
  {
    href: "https://www.instagram.com/saildeck",
    image: "https://images.unsplash.com/photo-1628336707631-68131ca720c3?auto=format&fit=crop&w=900&q=80",
    alt: "Guests raising champagne glasses on a yacht deck",
    caption: "Birthdays hit different at anchor.",
    kind: "carousel",
  },
  {
    href: "https://www.instagram.com/saildeck",
    image: "https://images.unsplash.com/photo-1597154200389-d7ac4c75e180?auto=format&fit=crop&w=900&q=80",
    alt: "Speedboat under way at speed across open water",
    caption: "Gateway to Mandwa in twenty minutes. The road takes three hours.",
    kind: "reel",
  },
  {
    href: "https://www.instagram.com/saildeck",
    image: "https://images.unsplash.com/photo-1599582350162-83106f579198?auto=format&fit=crop&w=900&q=80",
    alt: "A couple sitting together at the stern of a yacht",
    caption: "She said yes. The crew stayed out of the frame.",
    kind: "photo",
  },
  {
    href: "https://www.instagram.com/saildeck",
    image: "https://images.unsplash.com/photo-1414437384035-787b9df782d7?auto=format&fit=crop&w=900&q=80",
    alt: "Catamaran under sail at sunset",
    caption: "Grande Island run. Flat water the whole way out.",
    kind: "photo",
  },
  {
    href: "https://www.instagram.com/saildeck",
    image: "https://images.unsplash.com/photo-1567899378494-47b22a2ae96a?auto=format&fit=crop&w=900&q=80",
    alt: "Luxury motor yacht moored in a sheltered bay",
    caption: "85 feet of flagship. Thirty guests, five crew, one very good afternoon.",
    kind: "carousel",
  },
  {
    href: "https://www.instagram.com/saildeck",
    image: "https://images.unsplash.com/photo-1570168007204-dfb528c6958f?auto=format&fit=crop&w=900&q=80",
    alt: "The Gateway of India seen from the harbour at dusk",
    caption: "Home port. Still the best skyline to leave behind.",
    kind: "photo",
  },
  {
    href: "https://www.instagram.com/saildeck",
    image: "https://images.unsplash.com/photo-1759497904811-fc906fdcd270?auto=format&fit=crop&w=900&q=80",
    alt: "Guests enjoying a day out on a yacht",
    caption: "Full day charter, swim stop at Elephanta, lunch on board.",
    kind: "carousel",
  },
];
