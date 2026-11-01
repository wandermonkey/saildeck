/**
 * Standalone ticketed events — parties and themed cruises with their own
 * fixed date, price and capacity, as opposed to `products.ts` (charter
 * "experiences" you book for your own group on a date of your choosing).
 *
 * ⚠️ SAMPLE CONTENT — all 6 events below are placeholders (fake dates,
 * prices, capacity/booked counts) built to demonstrate the page and the
 * detail popup. Replace with real events before this goes live. Photos are
 * genuine Saildeck fleet photography, reused from `yachts.ts` galleries.
 */

export type SaildeckEvent = {
  slug: string;
  title: string;
  category: string;
  /** Display date, e.g. "Sat, 22 Nov 2026". */
  dateLabel: string;
  /** ISO date, for sorting and schema markup. */
  dateISO: string;
  timeLabel: string;
  location: string;
  /** Per-person price in INR. */
  price: number;
  /** Card cover photo. */
  image: string;
  imageAlt: string;
  /** Shown in the detail popup's photo carousel — first entry matches `image`. */
  gallery: { src: string; alt: string }[];
  description: string;
  terms: string[];
  capacity: number;
  booked: number;
};

export const events: SaildeckEvent[] = [
  {
    slug: "sunset-music-cruise",
    title: "Sunset Music Cruise",
    category: "Music & Party",
    dateLabel: "Sat, 22 Nov 2026",
    dateISO: "2026-11-22",
    timeLabel: "6:00 PM – 9:00 PM",
    location: "Gateway of India, Colaba, Mumbai",
    price: 1500,
    image: "/images/fleet/tara-sailing-catamaran/tara-catamaran-sunset-party.png",
    imageAlt: "Guests dancing on deck at sunset with string lights and a speaker",
    gallery: [
      { src: "/images/fleet/tara-sailing-catamaran/tara-catamaran-sunset-party.png", alt: "Guests dancing on deck at sunset with string lights and a speaker" },
      { src: "/images/fleet/blue-whale/blue-whale-motor-yacht-mumbai-aft-deck-sunset.jpeg", alt: "The aft deck lounge at sunset" },
      { src: "/images/fleet/l3-yacht/l3-yacht-majesty-44-mumbai-foredeck-sunset.jpeg", alt: "The foredeck lounge at sunset with the harbour behind" },
    ],
    description:
      "A live DJ, a open deck and the city lighting up behind you — our most-requested open-ticket night out on the water. Grab a spot on the catamaran's wide deck, dance as the sun goes down over the Gateway of India, and stay for the skyline after dark. Welcome drink and light snacks included.",
    terms: [
      "Tickets are per person and include a welcome drink and light snacks.",
      "Boarding closes 15 minutes before departure — arrive by 5:45 PM at Jetty No. 5.",
      "Entry is 21+. Please carry a valid photo ID.",
      "Non-refundable, but transferable to another guest up to 24 hours before the event.",
      "In case of unsafe weather the event is rescheduled and your ticket carries over automatically.",
    ],
    capacity: 60,
    booked: 42,
  },
  {
    slug: "new-years-eve-harbour-party",
    title: "New Year's Eve Harbour Party",
    category: "Music & Party",
    dateLabel: "Wed, 31 Dec 2026",
    dateISO: "2026-12-31",
    timeLabel: "9:00 PM – 1:00 AM",
    location: "Gateway of India, Colaba, Mumbai",
    price: 4500,
    image: "/images/fleet/azimut-38/azimut-38-motor-yacht-mumbai-sunset.jpg",
    imageAlt: "The Azimut 38 motor yacht at anchor off Mumbai at golden hour",
    gallery: [
      { src: "/images/fleet/azimut-38/azimut-38-motor-yacht-mumbai-sunset.jpg", alt: "The Azimut 38 motor yacht at anchor off Mumbai at golden hour" },
      { src: "/images/fleet/allegra/allegra-flybridge-dark-bimini-lounge.webp", alt: "The flybridge lounge after dark" },
      { src: "/images/fleet/vari-44/vari-44-motor-yacht-mumbai-sunset-celebration-bow.webp", alt: "A celebration on the bow at sunset" },
    ],
    description:
      "Ring in the new year from the water — a flybridge lounge, a countdown with the city skyline as backdrop, and Mumbai's harbour fireworks in full view. Our biggest night of the year, on our largest party-ready boats. Includes a welcome drink and a midnight toast.",
    terms: [
      "Tickets are per person and include a welcome drink and a midnight toast.",
      "Boarding closes 15 minutes before departure — arrive by 8:45 PM at Jetty No. 5.",
      "Entry is 21+. Please carry a valid photo ID.",
      "Non-refundable, but transferable to another guest up to 48 hours before the event (New Year's Eve books out — plan ahead).",
      "In case of unsafe weather the event is rescheduled and your ticket carries over automatically.",
    ],
    capacity: 80,
    booked: 61,
  },
  {
    slug: "full-moon-sailing-party",
    title: "Full Moon Sailing Party",
    category: "Sailing",
    dateLabel: "Fri, 5 Dec 2026",
    dateISO: "2026-12-05",
    timeLabel: "7:00 PM – 10:00 PM",
    location: "Gateway of India, Colaba, Mumbai",
    price: 1200,
    image: "/images/fleet/hanse-33/hanse-33-nauti-by-nature-sunset-hero.webp",
    imageAlt: "Nauti by Nature, a Hanse 33 sailing yacht, under sail at sunset with guests aboard",
    gallery: [
      { src: "/images/fleet/hanse-33/hanse-33-nauti-by-nature-sunset-hero.webp", alt: "Nauti by Nature, a Hanse 33 sailing yacht, under sail at sunset with guests aboard" },
      { src: "/images/fleet/hanse-33/hanse-33-nauti-by-nature-sunset-skyline.webp", alt: "A sailing yacht under sail at sunset with the Mumbai skyline" },
      { src: "/images/fleet/tikla-queen/tikla-queen-sunset-solo.jpg", alt: "A sailboat at anchor at sunset" },
    ],
    description:
      "No engine, no speakers — just wind, open water and the full moon over the harbour. A quieter kind of night out, for people who'd rather sail than stand around a dance floor. Small groups, real sailboats, and a genuinely different way to spend a Friday night.",
    terms: [
      "Tickets are per person. Bring a light jacket — the water is breezier after dark.",
      "Boarding closes 15 minutes before departure — arrive by 6:45 PM at Jetty No. 5.",
      "Suitable for ages 10 and up, accompanied by an adult.",
      "Non-refundable, but transferable to another guest up to 24 hours before the event.",
      "Runs only on confirmed clear, calm nights — if conditions are unsafe your ticket moves to the next full moon at no cost.",
    ],
    capacity: 40,
    booked: 18,
  },
  {
    slug: "corporate-networking-cruise",
    title: "Corporate Networking Cruise",
    category: "Corporate",
    dateLabel: "Thu, 27 Nov 2026",
    dateISO: "2026-11-27",
    timeLabel: "5:30 PM – 8:30 PM",
    location: "Gateway of India, Colaba, Mumbai",
    price: 2000,
    image: "/images/fleet/nava-45-foot/nava-sailing-yacht-mumbai-large-group-charter.jpg",
    imageAlt: "A large group of guests posed together on deck",
    gallery: [
      { src: "/images/fleet/nava-45-foot/nava-sailing-yacht-mumbai-large-group-charter.jpg", alt: "A large group of guests posed together on deck" },
      { src: "/images/fleet/azimut-38/azimut-38-yacht-mumbai-flybridge-lounge.jpg", alt: "Flybridge lounge seating and the upper helm station" },
      { src: "/images/fleet/allegra/allegra-flybridge-aft-lounge-helm.webp", alt: "The flybridge aft lounge and helm" },
    ],
    description:
      "An open networking evening for Mumbai's business and startup crowd — on a boat, not in another hotel ballroom. Structured enough to actually meet people, relaxed enough to enjoy the evening. Canapés and two drinks included.",
    terms: [
      "Tickets are per person and include canapés and two drinks.",
      "Boarding closes 15 minutes before departure — arrive by 5:15 PM at Jetty No. 5.",
      "Business casual dress code — flat, non-slip shoes recommended.",
      "Non-refundable, but transferable to a colleague up to 24 hours before the event.",
      "In case of unsafe weather the event is rescheduled and your ticket carries over automatically.",
    ],
    capacity: 50,
    booked: 33,
  },
  {
    slug: "ladies-night-yacht-party",
    title: "Ladies Night Yacht Party",
    category: "Music & Party",
    dateLabel: "Fri, 28 Nov 2026",
    dateISO: "2026-11-28",
    timeLabel: "7:00 PM – 10:00 PM",
    location: "Gateway of India, Colaba, Mumbai",
    price: 1800,
    image: "/images/fleet/mac-30/mac-30-sailing-yacht-mumbai-womens-group-charter.jpg",
    imageAlt: "A group of women seated at the bow during a sunset sail",
    gallery: [
      { src: "/images/fleet/mac-30/mac-30-sailing-yacht-mumbai-womens-group-charter.jpg", alt: "A group of women seated at the bow during a sunset sail" },
      { src: "/images/fleet/feeling-nauti/feeling-nauti-sailing-yacht-mumbai-bachelorette-toast.jpg", alt: "A guest raising a toast on deck" },
      { src: "/images/fleet/flo-31-foot/flo-sailing-yacht-mumbai-bachelorette-party.jpg", alt: "A bachelorette group on deck with a bride-to-be sash and photo-booth props" },
    ],
    description:
      "An evening on the water, just for the girls — music, mocktails and a photo-booth corner, with the city skyline doing the rest. A regular sell-out, so this one tends to book up fast.",
    terms: [
      "Tickets are per person and include a welcome mocktail and light snacks.",
      "Boarding closes 15 minutes before departure — arrive by 6:45 PM at Jetty No. 5.",
      "Entry is 18+. Please carry a valid photo ID.",
      "Non-refundable, but transferable to another guest up to 24 hours before the event.",
      "In case of unsafe weather the event is rescheduled and your ticket carries over automatically.",
    ],
    capacity: 35,
    booked: 35,
  },
  {
    slug: "weekend-deck-brunch",
    title: "Weekend Deck Brunch & Live Music",
    category: "Brunch",
    dateLabel: "Sun, 23 Nov 2026",
    dateISO: "2026-11-23",
    timeLabel: "11:00 AM – 2:00 PM",
    location: "Gateway of India, Colaba, Mumbai",
    price: 1000,
    image: "/images/fleet/tantallon/tantallon-cockpit-group.jpg",
    imageAlt: "Guests seated in the cockpit under sail with the crew at the helm",
    gallery: [
      { src: "/images/fleet/tantallon/tantallon-cockpit-group.jpg", alt: "Guests seated in the cockpit under sail with the crew at the helm" },
      { src: "/images/fleet/5-pax-sailing-boat/5-pax-sailing-boat-friends-group.jpg", alt: "A group of friends relaxing on the bow during a sail" },
      { src: "/images/fleet/taj-exotica/taj-exotica-cruising-yacht-goa-aerial-celebration-group.jpeg", alt: "An aerial view of a group celebration on deck" },
    ],
    description:
      "A lazy Sunday on deck — brunch, an acoustic set and the harbour going by at an easy pace. A good one to bring the family to, or just to not be on land for a few hours.",
    terms: [
      "Tickets are per person and include a full brunch spread and one beverage.",
      "Boarding closes 15 minutes before departure — arrive by 10:45 AM at Jetty No. 5.",
      "Suitable for all ages — children under 5 sail free.",
      "Non-refundable, but transferable to another guest up to 24 hours before the event.",
      "In case of unsafe weather the event is rescheduled and your ticket carries over automatically.",
    ],
    capacity: 45,
    booked: 9,
  },
];

export const getEvent = (slug: string) => events.find((e) => e.slug === slug);
