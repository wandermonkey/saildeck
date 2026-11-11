/**
 * The actual speedboats available for charter, as opposed to `speedboats.ts`
 * (the 3 standard routes — Elephanta, Alibaug/Mandwa, Navi Mumbai — sold as
 * their own landing pages). This list renders on /speedboats right below
 * those 3 route cards, one row per boat with its capacity and per-route
 * pricing.
 *
 * ⚠️ SAMPLE CONTENT — images are Unsplash stock (reused from speedboats.ts's
 * already-verified set), not real photos of these boats. Swap in real
 * photography before this goes live. Route prices are the figures the
 * operator gave directly; return-trip and harbour-cruising prices were not
 * provided, so both show "On request" and point to WhatsApp rather than a
 * guessed number.
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
    image: u("1568476612160-787b6a1d5fb1"),
    imageAlt: "Speedboat under way on open sea — sample photo, to be replaced",
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
    image: u("1552160757-52790c6f4faf"),
    imageAlt: "Motorboat cutting through deep blue water leaving a white wake — sample photo, to be replaced",
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
    image: u("1597154200389-d7ac4c75e180"),
    imageAlt: "Speedboat at speed crossing open water — sample photo, to be replaced",
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
    image: u("1622082671151-2cbd184f9e60"),
    imageAlt: "Bow of a speedboat cutting through blue water — sample photo, to be replaced",
  },
];
