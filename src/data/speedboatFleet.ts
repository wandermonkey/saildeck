/**
 * The actual speedboats available for charter, as opposed to `speedboats.ts`
 * (the 3 standard routes — Elephanta, Alibaug/Mandwa, Navi Mumbai — sold as
 * their own landing pages). This list renders on /speedboats right below
 * those 3 route cards, one row per boat with its capacity and per-route
 * pricing.
 *
 * ⚠️ SAMPLE CONTENT — most images below are still Unsplash stock (reused
 * from speedboats.ts's already-verified set), not real photos of these
 * boats — swap in real photography before this goes live. Baug Life is the
 * first to get its own real photo (lightly colour/contrast-enhanced, same
 * scene). Route prices are the figures the operator gave directly;
 * return-trip and harbour-cruising prices were not provided, so both show
 * "On request" and point to WhatsApp rather than a guessed number.
 */

export type SpeedboatFleetEntry = {
  slug: string;
  name: string;
  capacity: number;
  /** One-way, whole-boat price per route, in INR. */
  routePrices: { route: string; price: number }[];
  image: string;
  imageAlt: string;
};

const u = (id: string) => `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=1600&q=80`;

export const speedboatFleet: SpeedboatFleetEntry[] = [
  {
    slug: "baug-life-mahindra-33",
    name: "Baug Life (Mahindra 33)",
    capacity: 12,
    routePrices: [
      { route: "Mumbai to Mandwa", price: 14000 },
      { route: "Mumbai to Navi Mumbai", price: 25000 },
      { route: "Mumbai to Elephanta", price: 24000 },
    ],
    image: "/images/speedboats/baug-life-mahindra-33/baug-life-mahindra-33-speedboat-mumbai-harbour-sunset.jpg",
    imageAlt:
      "SB The Baug Life, a Mahindra 33 speedboat, cruising Mumbai harbour at sunset — private speedboat charter for Mandwa, Elephanta and Navi Mumbai transfers",
  },
  {
    slug: "blue-whale-speedboat",
    name: "Blue Whale",
    capacity: 8,
    routePrices: [
      { route: "Mumbai to Mandwa", price: 10000 },
      { route: "Mumbai to Navi Mumbai", price: 22000 },
      { route: "Mumbai to Elephanta", price: 18000 },
    ],
    image: "/images/speedboats/blue-whale-speedboat/blue-whale-8-seater-speedboat-mumbai-to-mandwa.jpg",
    imageAlt:
      "Blue Whale, an 8-seater speedboat, moored in Mumbai harbour — private speedboat charter for Mandwa, Elephanta and Navi Mumbai transfers",
  },
  {
    slug: "aqua-ferry",
    name: "Aqua Ferry",
    capacity: 12,
    routePrices: [
      { route: "Mumbai to Mandwa", price: 13000 },
      { route: "Mumbai to Navi Mumbai", price: 24000 },
      { route: "Mumbai to Elephanta", price: 22000 },
    ],
    image: "/images/speedboats/aqua-ferry-speedboat/aqua-ferry-12-seater-speedboat-mumbai-to-mandwa.jpg",
    imageAlt:
      "Aqua Ferry, a 12-seater cabin speedboat, moored in Mumbai harbour — private speedboat charter for Mandwa, Elephanta and Navi Mumbai transfers",
  },
  {
    slug: "lilah",
    name: "Lilah",
    capacity: 12,
    routePrices: [
      { route: "Mumbai to Mandwa", price: 14000 },
      { route: "Mumbai to Navi Mumbai", price: 25000 },
      { route: "Mumbai to Elephanta", price: 24000 },
    ],
    image: u("1584212893031-410e387fbaf1"),
    imageAlt: "Private speedboat on calm water — sample photo, to be replaced",
  },
  {
    slug: "zamia",
    name: "Zamia",
    capacity: 8,
    routePrices: [
      { route: "Mumbai to Mandwa", price: 9000 },
      { route: "Mumbai to Navi Mumbai", price: 25000 },
      { route: "Mumbai to Elephanta", price: 24000 },
    ],
    image: "/images/speedboats/zamia-speedboat/zamia-8-seater-speedboat-mumbai-charter.jpg",
    imageAlt:
      "S.B. Zamia, an 8-seater speedboat, in Mumbai harbour — private speedboat charter for Mandwa, Elephanta and Navi Mumbai transfers",
  },
];
