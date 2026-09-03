import type { DestinationSlug } from "./destinations";

export type VideoRef = {
  title: string;
  /** YouTube video id — used when the footage lives on YouTube. */
  youtubeId?: string;
  /** Self-hosted alternative: files in /public/videos. */
  src?: string;
  webm?: string;
  poster?: string;
};

/** One row of a charter time-slot pricing table (see PricingTable.tsx). */
export type PricingSlot = {
  start: string;
  end: string;
  sailing: string;
  anchorage: string;
  /** INR, all-in for the slot. */
  amount: number;
};

export type Yacht = {
  slug: string;
  name: string;
  tagline: string;
  /** Indicative charter rate in INR per hour. */
  pricePerHour: number;
  wasPricePerHour?: number;
  guests: number;
  lengthFt: number;
  cabins: number;
  crew: number;
  destinations: DestinationSlug[];
  category: "Motor Yacht" | "Sailing Yacht" | "Speedboat" | "Catamaran";
  highlights: string[];
  amenities: string[];
  /** First image is the card thumbnail and the carousel's opening frame. */
  gallery: { src: string; alt: string }[];
  /** Rendered under the description. An empty array hides the section. */
  videos: VideoRef[];
  /** Rendered as an accordion below the listing. */
  faqs: { q: string; a: string }[];
  /**
   * Long-form description, one string per paragraph. When present it replaces
   * the generic auto-generated copy on the product page. This is the text
   * Google indexes for the boat, so write it for a reader and keep the
   * model name, the city and the occasions people search for in it.
   */
  description?: string[];
  /** Builder specifications, shown as a table under the description. */
  specs?: { label: string; value: string }[];
  /** Time-slot pricing grid, shown as its own table when present. */
  pricingSlots?: PricingSlot[];
  /** Bullet list of add-on charges shown under the pricing table. */
  pricingExtras?: string[];
  /** Small print under the pricing table, e.g. permission requirements. */
  pricingNote?: string;
  featured?: boolean;
};

/**
 * NOTE FOR SAILDECK: prices carry over from the current saildeck.com. The
 * guests / length / cabins / crew figures are PLACEHOLDERS — replace them with
 * real specs before launch. Wrong capacity causes refund disputes at the jetty,
 * and Google flags Product markup that contradicts the page.
 *
 * Photography is Unsplash stock. Replace `gallery` with your own shots of each
 * boat — on a charter site this is the biggest single trust factor, because
 * guests compare the photo to the boat waiting at the jetty.
 *
 * ⚠️ SAMPLE CONTENT — every boat below except the Princess 61 now carries a
 * `description`, `specs` table and `pricingSlots` table so every product page
 * uses the same layout. The numbers and copy are placeholders scaled off each
 * boat's existing hourly rate, written to demonstrate the page — they are NOT
 * real tariffs or specifications. Replace with the actual slot pricing,
 * technical specs and copy for each boat before this goes live. Do not let
 * these figures reach a customer.
 */

const standardFaqs = (name: string, guests: number) => [
  {
    q: `What is included in the ${name} charter price?`,
    a: "The captain and crew, fuel for the standard route, life jackets for every guest and the on-board sound system. Catering, bar service, decoration, water sports and extra hours are quoted separately and confirmed before you pay anything.",
  },
  {
    q: `How many guests can the ${name} carry?`,
    a: `Up to ${guests} guests. This is fixed by the vessel's coast guard licence and cannot be exceeded for any reason, so please give us an accurate head count when you enquire — including children and infants.`,
  },
  {
    q: "Is there a minimum booking duration?",
    a: "Two hours on weekends and public holidays, one hour midweek. Island and full-day charters are quoted as a package rather than by the hour.",
  },
  {
    q: "How and where do we board?",
    a: "Boarding is from the jetty, where a tender runs you out to the yacht at anchor — usually about ten minutes. The exact jetty and reporting time are confirmed on your booking sheet the day before.",
  },
  {
    q: "What happens if the weather is bad on our date?",
    a: "If the coast guard suspends sailing or the captain judges conditions unsafe, we reschedule your charter to another date at no cost. That call is made on safety grounds, never commercial ones.",
  },
  {
    q: "Can we bring our own food, cake and decorations?",
    a: "Outside food and a cake are generally fine, and we will confirm for this specific boat. Alcohol rules vary by vessel and by the permits in force on the day, so check with us before buying anything.",
  },
  {
    q: "How far in advance should we book?",
    a: "Weekday charters can often be arranged within the same week. Weekend slots, sunset departures and anything in December need two to three weeks' notice.",
  },
];

export const yachts: Yacht[] = [
  {
    /* Saildeck's own boat — photos and video from the Princess 61 folder.
       Guest capacity, crew count and the hourly rate below still need
       confirming against the licence and the actual tariff. */
    slug: "princess-61-luxury-motor-yacht-mumbai",
    name: "Princess 61",
    tagline: "A British-built flybridge motor yacht, based at the Gateway of India. The flagship of the Mumbai fleet.",
    pricePerHour: 33000,
    guests: 32,
    lengthFt: 61,
    cabins: 3,
    crew: 3,
    destinations: ["mumbai"],
    category: "Motor Yacht",
    highlights: ["Open flybridge", "Three en-suite cabins", "Teak aft deck"],
    amenities: [
      "Open flybridge with bimini shade",
      "Air-conditioned saloon with leather seating",
      "Three cabins, three bathrooms",
      "Teak-laid aft cockpit with wraparound seating",
      "Foredeck sun area",
      "Dining table for on-board meals",
      "Sound system",
      "Swim platform",
      "Deck lighting for evening charters",
      "Galley for catering service",
    ],
    gallery: [
      { src: "/images/fleet/princess-61/princess-61-11.jpg", alt: "Princess 61 motor yacht Lifescapes cruising past the Mumbai skyline at dusk with guests on deck" },
      { src: "/images/fleet/princess-61/princess-61-1.jpg", alt: "Princess 61 luxury motor yacht at anchor off Mumbai, side profile with the city behind" },
      { src: "/images/fleet/princess-61/princess-61-4.jpg", alt: "View along the Princess 61 foredeck toward the Mumbai coastline" },
      { src: "/images/fleet/princess-61/princess-61-9.jpg", alt: "Teak-laid aft cockpit of the Princess 61 with seating and steps to the flybridge" },
      { src: "/images/fleet/princess-61/princess-61-7.jpg", alt: "Princess 61 main saloon with cream leather seating, dining table and cherry wood joinery" },
      { src: "/images/fleet/princess-61/princess-61-8.jpg", alt: "Saloon lounge area on the Princess 61 with bar cabinet and stairway to the flybridge" },
      { src: "/images/fleet/princess-61/princess-61-5.jpg", alt: "Forward guest cabin on the Princess 61 with double berth and overhead hatch" },
      { src: "/images/fleet/princess-61/princess-61-6.jpg", alt: "Lower helm station of the Princess 61 with instruments and leather helm seat" },
      { src: "/images/fleet/princess-61/princess-61-10.jpg", alt: "Guests on the flybridge of the Princess 61 at golden hour in Mumbai harbour" },
      { src: "/images/fleet/princess-61/princess-61-3.jpg", alt: "Princess 61 yacht at anchor in Mumbai harbour on a hazy morning" },
    ],
    videos: [
      {
        title: "Princess 61 — on the water off Mumbai",
        src: "/videos/princess-61.mp4",
        webm: "/videos/princess-61.webm",
        poster: "/videos/princess-61-poster.jpg",
      },
    ],
    description: [
      "The **Princess 61** is the flagship of Saildeck's **luxury yacht charter in Mumbai**: a 61-foot flybridge motor yacht built by Princess Yachts in Plymouth, England, and based at the **Gateway of India**. She carries up to **32 guests** with a licensed captain and crew, and is the boat we send when the occasion calls for it — a milestone birthday, a proposal at sunset, a corporate evening for a client who has seen a lot of yachts.",
      "The deep-V hull runs level and dry through Mumbai harbour chop, and the layout spreads across three levels so a full guest list never feels crowded. The open **flybridge** is the best seat in the city — shaded, wraparound seating, an uninterrupted view of Marine Drive and the harbour as the light goes, and where most guests spend a **sunset cruise**. Below it, the air-conditioned saloon is finished in high-gloss cherry joinery with cream leather seating and a dining table, opening onto a teak-laid aft cockpit so the whole boat entertains as one space.",
      "Three private cabins and three bathrooms below deck give guests somewhere to change or step away from the party, and double as a dressing room for a **pre-wedding shoot**. This is the yacht to book for a **birthday party on a yacht in Mumbai**, a marriage proposal, a **corporate yacht charter**, a bachelorette, or a full day out to Elephanta Island with a swim stop. Decoration, catering, a bar and a photographer are all arranged and quoted before any deposit.",
      "Every charter includes the captain and crew, fuel for the standard route, life jackets for every guest and the sound system. Boarding is by tender from the Gateway of India jetty. Message us on WhatsApp with your date, group size and occasion for a firm all-in price, usually within the hour.",
    ],
    specs: [
      { label: "Builder", value: "Princess Yachts, Plymouth, UK" },
      { label: "Model", value: "Princess 61 Flybridge" },
      { label: "Length overall", value: "18.77 m / 61 ft 7 in" },
      { label: "Beam", value: "4.88 m / 16 ft" },
      { label: "Draft", value: "1.35 m / 4 ft 6 in" },
      { label: "Layout", value: "3 cabins, 3 bathrooms, saloon, flybridge" },
      { label: "Propulsion", value: "Twin inboard diesels, shaft drive" },
      { label: "Home port", value: "Gateway of India, Mumbai" },
      { label: "Registration", value: "Commercial passenger licence" },
    ],
    pricingSlots: [
      { start: "7:00 AM", end: "9:00 AM", sailing: "1 hour cruising", anchorage: "1 hour anchorage", amount: 30000 },
      { start: "9:00 AM", end: "11:00 AM", sailing: "1 hour cruising", anchorage: "1 hour anchorage", amount: 30000 },
      { start: "2:00 PM", end: "4:00 PM", sailing: "1 hour cruising", anchorage: "1 hour anchorage", amount: 30000 },
      { start: "4:00 PM", end: "6:00 PM", sailing: "1 hour cruising", anchorage: "1 hour anchorage", amount: 45000 },
      { start: "5:00 PM", end: "7:00 PM", sailing: "1 hour cruising", anchorage: "1 hour anchorage", amount: 60000 },
      { start: "6:00 PM", end: "8:00 PM", sailing: "1 hour cruising", anchorage: "1 hour anchorage", amount: 55000 },
    ],
    pricingExtras: [
      "Additional hour — ₹20,000",
      "Overnight anchorage (9 am to 7 am) — ₹1,20,000",
      "Mumbai to Mandwa, return journey — ₹55,000",
      "Photoshoot on board (per hour) — ₹25,000",
    ],
    pricingNote: "Special permissions are required for overnight sailing.",
    faqs: [
      {
        q: "How much does it cost to charter the Princess 61 in Mumbai?",
        a: "Two-hour slots run from ₹30,000 to ₹60,000 depending on the time of day, with sunset slots priced highest. See the full pricing table above for every departure time. An additional hour is ₹20,000, and overnight anchorage, a Mandwa run and on-board photoshoots are all quoted separately. Message us with your date and group size to confirm the slot.",
      },
      {
        q: "Where does the Princess 61 depart from?",
        a: "The Gateway of India, Colaba. The yacht lies at anchor in the harbour and a tender runs you out from the jetty in about ten minutes. Arrive fifteen minutes before your slot.",
      },
      ...standardFaqs("Princess 61", 32),
    ],
    featured: true,
  },
  {
    slug: "vanguard-serenity",
    name: "Vanguard Serenity",
    tagline: "Water toys, open water, and a whole day with nowhere to be.",
    pricePerHour: 19000,
    guests: 20,
    lengthFt: 65,
    cabins: 3,
    crew: 4,
    destinations: ["mumbai", "goa"],
    category: "Motor Yacht",
    highlights: ["Jet skis and kayaks", "Windsurfing gear", "On-board gym"],
    amenities: ["Jet skis", "Kayaks", "Windsurfing", "Gym", "Sun deck", "Wi-Fi", "Swim platform"],
    gallery: [
      { src: "https://images.unsplash.com/photo-1605281317010-fe5ffe798166?auto=format&fit=crop&w=1800&q=80", alt: "Vanguard Serenity anchored in open blue water" },
      { src: "https://images.unsplash.com/photo-1759497904811-fc906fdcd270?auto=format&fit=crop&w=1800&q=80", alt: "Guests enjoying a day aboard the Vanguard Serenity" },
      { src: "https://images.unsplash.com/photo-1535078035266-a0fa7d3b8f65?auto=format&fit=crop&w=1800&q=80", alt: "Bright saloon interior with seating" },
      { src: "https://images.unsplash.com/photo-1614350391736-ed8619d63c06?auto=format&fit=crop&w=1800&q=80", alt: "Aerial view of the yacht under way" },
      { src: "https://images.unsplash.com/photo-1598448056086-307e98ef5c4a?auto=format&fit=crop&w=1800&q=80", alt: "Dining area with table and chairs on board" },
    ],
    videos: [],
    description: [
      "The **Vanguard Serenity** is a 65-foot motor yacht built for groups who want to be in the water as much as on it, chartered by the hour from **Mumbai** and **Goa**. She carries up to **20 guests** with a licensed captain and crew, and comes with her own jet skis, kayaks and windsurfing gear — most charters here turn into a full day out rather than a two-hour cruise.",
      "The bright, open saloon seats the whole group comfortably with wide windows on both sides, and there is a small on-board gym for anyone who wants one. The wide sun deck and swim platform are built around the water toys, so guests move straight from the boat into the sea rather than watching from the rail.",
      "Popular for a full-day **island charter**, a **birthday party on a yacht**, or a corporate day out where the water sports are the point rather than an add-on. Every charter includes the captain and crew, fuel for the standard route, life jackets for every guest and the sound system. Message us on WhatsApp with your date, city and group size for a firm all-in price.",
    ],
    specs: [
      { label: "Type", value: "Motor yacht" },
      { label: "Length overall", value: "65 ft" },
      { label: "Layout", value: "3 cabins, 4 crew" },
      { label: "Guest capacity", value: "20 guests" },
      { label: "Home ports", value: "Mumbai & Goa" },
      { label: "Registration", value: "Commercial passenger licence" },
    ],
    pricingSlots: [
      { start: "7:00 AM", end: "9:00 AM", sailing: "1 hour cruising", anchorage: "1 hour anchorage", amount: 32000 },
      { start: "9:00 AM", end: "11:00 AM", sailing: "1 hour cruising", anchorage: "1 hour anchorage", amount: 32000 },
      { start: "2:00 PM", end: "4:00 PM", sailing: "1 hour cruising", anchorage: "1 hour anchorage", amount: 32000 },
      { start: "4:00 PM", end: "6:00 PM", sailing: "1 hour cruising", anchorage: "1 hour anchorage", amount: 42000 },
      { start: "5:00 PM", end: "7:00 PM", sailing: "1 hour cruising", anchorage: "1 hour anchorage", amount: 55000 },
      { start: "6:00 PM", end: "8:00 PM", sailing: "1 hour cruising", anchorage: "1 hour anchorage", amount: 50000 },
    ],
    pricingExtras: [
      "Additional hour — ₹18,000",
      "Overnight anchorage (9 am to 7 am) — ₹1,10,000",
      "Mumbai to Mandwa, return journey — ₹50,000",
      "Photoshoot on board (per hour) — ₹20,000",
    ],
    pricingNote: "Special permissions are required for overnight sailing.",
    faqs: [
      {
        q: "How much does it cost to charter the Vanguard Serenity?",
        a: "Two-hour slots run from ₹32,000 to ₹55,000 depending on the time of day, with sunset slots priced highest. See the pricing table above for every departure time. An additional hour, overnight anchorage and on-board photoshoots are all quoted separately.",
      },
      ...standardFaqs("Vanguard Serenity", 20),
    ],
    featured: true,
  },
  {
    slug: "solstice-dream",
    name: "Solstice Dream",
    tagline: "Open terrace, deck jacuzzi, and a bar that stays open.",
    pricePerHour: 16000,
    guests: 18,
    lengthFt: 60,
    cabins: 2,
    crew: 3,
    destinations: ["mumbai", "goa"],
    category: "Motor Yacht",
    highlights: ["Deck jacuzzi", "Open terrace", "Premium bar"],
    amenities: ["Jacuzzi", "Open terrace", "Premium bar", "Sound system", "Sun beds", "Wi-Fi"],
    gallery: [
      { src: "https://images.unsplash.com/photo-1749183563789-ae17d4a952d2?auto=format&fit=crop&w=1800&q=80", alt: "Guests on the upper deck of the Solstice Dream beside the pool" },
      { src: "https://images.unsplash.com/photo-1628336707631-68131ca720c3?auto=format&fit=crop&w=1800&q=80", alt: "Guests raising glasses on the deck" },
      { src: "https://images.unsplash.com/photo-1674606878551-f424ad6ce965?auto=format&fit=crop&w=1800&q=80", alt: "Shaded deck seating with a low table" },
      { src: "https://images.unsplash.com/photo-1502986591842-471865a47d0e?auto=format&fit=crop&w=1800&q=80", alt: "Cabin interior with soft furnishings" },
      { src: "https://images.unsplash.com/photo-1570422774250-c951ec3ef74c?auto=format&fit=crop&w=1800&q=80", alt: "Solstice Dream moored alongside" },
    ],
    videos: [],
    description: [
      "The **Solstice Dream** is a 60-foot motor yacht chartered by the hour from **Mumbai** and **Goa**, built around an open terrace, a deck jacuzzi and a bar that stays open for the whole booking. She carries up to **18 guests** with a licensed captain and crew — the boat we point people toward when the jacuzzi is the actual ask.",
      "The upper deck wraps around the jacuzzi with sun beds either side, and the sound system runs the length of the boat, so the party never has to move indoors. Below, the saloon offers shade and air conditioning for anyone who wants a break from the sun without leaving the group.",
      "A regular pick for a **sunset cruise**, a **birthday party on a yacht**, or a bachelorette that wants a pool without needing an island for it. Every charter includes the captain and crew, fuel for the standard route, life jackets for every guest and the sound system. Message us on WhatsApp with your date, city and group size for a firm all-in price.",
    ],
    specs: [
      { label: "Type", value: "Motor yacht" },
      { label: "Length overall", value: "60 ft" },
      { label: "Layout", value: "2 cabins, 3 crew" },
      { label: "Guest capacity", value: "18 guests" },
      { label: "Home ports", value: "Mumbai & Goa" },
      { label: "Registration", value: "Commercial passenger licence" },
    ],
    pricingSlots: [
      { start: "7:00 AM", end: "9:00 AM", sailing: "1 hour cruising", anchorage: "1 hour anchorage", amount: 26000 },
      { start: "9:00 AM", end: "11:00 AM", sailing: "1 hour cruising", anchorage: "1 hour anchorage", amount: 26000 },
      { start: "2:00 PM", end: "4:00 PM", sailing: "1 hour cruising", anchorage: "1 hour anchorage", amount: 26000 },
      { start: "4:00 PM", end: "6:00 PM", sailing: "1 hour cruising", anchorage: "1 hour anchorage", amount: 34000 },
      { start: "5:00 PM", end: "7:00 PM", sailing: "1 hour cruising", anchorage: "1 hour anchorage", amount: 45000 },
      { start: "6:00 PM", end: "8:00 PM", sailing: "1 hour cruising", anchorage: "1 hour anchorage", amount: 40000 },
    ],
    pricingExtras: [
      "Additional hour — ₹15,000",
      "Overnight anchorage (9 am to 7 am) — ₹95,000",
      "Mumbai to Mandwa, return journey — ₹42,000",
      "Photoshoot on board (per hour) — ₹18,000",
    ],
    pricingNote: "Special permissions are required for overnight sailing.",
    faqs: [
      {
        q: "How much does it cost to charter the Solstice Dream?",
        a: "Two-hour slots run from ₹26,000 to ₹45,000 depending on the time of day, with sunset slots priced highest. See the pricing table above for every departure time. An additional hour, overnight anchorage and on-board photoshoots are all quoted separately.",
      },
      ...standardFaqs("Solstice Dream", 18),
    ],
    featured: true,
  },
  {
    slug: "elysian-tide",
    name: "Elysian Tide",
    tagline: "Built for groups who would rather be in the water than on it.",
    pricePerHour: 14000,
    guests: 15,
    lengthFt: 55,
    cabins: 2,
    crew: 3,
    destinations: ["goa"],
    category: "Catamaran",
    highlights: ["Jet skis and kayaks", "Wide swim platform", "Shaded lounge"],
    amenities: ["Jet skis", "Kayaks", "Swim platform", "Shaded lounge", "Bluetooth sound", "Snorkel gear"],
    gallery: [
      { src: "https://images.unsplash.com/photo-1414437384035-787b9df782d7?auto=format&fit=crop&w=1800&q=80", alt: "Elysian Tide catamaran under sail at sunset" },
      { src: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=1800&q=80", alt: "Catamaran at anchor off a tropical island" },
      { src: "https://images.unsplash.com/photo-1598448154313-6e7789856d06?auto=format&fit=crop&w=1800&q=80", alt: "Interior seating aboard the catamaran" },
      { src: "https://images.unsplash.com/photo-1519046904884-53103b34b206?auto=format&fit=crop&w=1800&q=80", alt: "Clear water and beach at the anchorage" },
    ],
    videos: [],
    description: [
      "The **Elysian Tide** is a 55-foot power catamaran chartered by the hour out of **Goa**, built for groups who would rather be in the water than on it. She carries up to **15 guests** with a licensed captain and crew, and comes with jet skis, kayaks and snorkel gear on board.",
      "The twin-hull layout gives a wide, stable deck with almost no roll at anchor, and a swim platform that runs the width of the stern — the whole group can be in the water at once rather than queuing off a single ladder. A shaded lounge amidships gives guests somewhere out of the sun between swims.",
      "The regular choice for a **Grande Island charter** with a snorkelling stop, or any full-day booking where the water toys matter more than the sundeck. Every charter includes the captain and crew, fuel for the standard route, life jackets for every guest and the sound system. Message us on WhatsApp with your date and group size for a firm all-in price.",
    ],
    specs: [
      { label: "Type", value: "Catamaran" },
      { label: "Length overall", value: "55 ft" },
      { label: "Layout", value: "2 cabins, 3 crew" },
      { label: "Guest capacity", value: "15 guests" },
      { label: "Home port", value: "Panjim / Britona, Goa" },
      { label: "Registration", value: "Commercial passenger licence" },
    ],
    pricingSlots: [
      { start: "7:00 AM", end: "9:00 AM", sailing: "1 hour cruising", anchorage: "1 hour anchorage", amount: 22000 },
      { start: "9:00 AM", end: "11:00 AM", sailing: "1 hour cruising", anchorage: "1 hour anchorage", amount: 22000 },
      { start: "2:00 PM", end: "4:00 PM", sailing: "1 hour cruising", anchorage: "1 hour anchorage", amount: 22000 },
      { start: "4:00 PM", end: "6:00 PM", sailing: "1 hour cruising", anchorage: "1 hour anchorage", amount: 28000 },
      { start: "5:00 PM", end: "7:00 PM", sailing: "1 hour cruising", anchorage: "1 hour anchorage", amount: 38000 },
      { start: "6:00 PM", end: "8:00 PM", sailing: "1 hour cruising", anchorage: "1 hour anchorage", amount: 34000 },
    ],
    pricingExtras: [
      "Additional hour — ₹13,000",
      "Overnight anchorage (9 am to 7 am) — ₹85,000",
      "Panjim to Grande Island, return journey — ₹35,000",
      "Photoshoot on board (per hour) — ₹16,000",
    ],
    pricingNote: "Special permissions are required for overnight sailing.",
    faqs: [
      {
        q: "How much does it cost to charter the Elysian Tide?",
        a: "Two-hour slots run from ₹22,000 to ₹38,000 depending on the time of day, with sunset slots priced highest. See the pricing table above for every departure time. An additional hour, overnight anchorage and on-board photoshoots are all quoted separately.",
      },
      ...standardFaqs("Elysian Tide", 15),
    ],
  },
  {
    slug: "azure-horizon",
    name: "Azure Horizon",
    tagline: "Sunset cruises, done properly.",
    pricePerHour: 14000,
    guests: 16,
    lengthFt: 58,
    cabins: 2,
    crew: 3,
    destinations: ["mumbai"],
    category: "Motor Yacht",
    highlights: ["Open terrace", "Deck jacuzzi", "Premium bar"],
    amenities: ["Jacuzzi", "Open terrace", "Premium bar", "Wi-Fi", "Sun beds", "Air conditioning"],
    gallery: [
      { src: "https://images.unsplash.com/photo-1628029338883-61644ec68475?auto=format&fit=crop&w=1800&q=80", alt: "Azure Horizon on open water as the sun sets" },
      { src: "https://images.unsplash.com/photo-1598770722761-0cab70ffd2fb?auto=format&fit=crop&w=1800&q=80", alt: "View from the bow across the water at sunset" },
      { src: "https://images.unsplash.com/photo-1697207342205-8b3a7d704e9a?auto=format&fit=crop&w=1800&q=80", alt: "Guest looking out of a large saloon window" },
      { src: "https://images.unsplash.com/photo-1681331325415-a497fd712ee6?auto=format&fit=crop&w=1800&q=80", alt: "The yacht silhouetted against an evening sky" },
    ],
    videos: [],
    description: [
      "The **Azure Horizon** is a 58-foot motor yacht chartered by the hour from the **Gateway of India**, built for one job in particular: a proper **sunset cruise** in Mumbai. She carries up to **16 guests** with a licensed captain and crew.",
      "The open terrace and deck jacuzzi sit up top with a clear run of sky to the west, and the premium bar stays open through the booking. Air conditioning below deck gives guests somewhere cool to step into between rounds on deck.",
      "Booked most often for an evening on the water timed to golden hour, a small birthday group, or a couple wanting a quieter charter than the bigger boats in the fleet. Every charter includes the captain and crew, fuel for the standard route, life jackets for every guest and the sound system. Message us on WhatsApp with your date and group size for a firm all-in price.",
    ],
    specs: [
      { label: "Type", value: "Motor yacht" },
      { label: "Length overall", value: "58 ft" },
      { label: "Layout", value: "2 cabins, 3 crew" },
      { label: "Guest capacity", value: "16 guests" },
      { label: "Home port", value: "Gateway of India, Mumbai" },
      { label: "Registration", value: "Commercial passenger licence" },
    ],
    pricingSlots: [
      { start: "7:00 AM", end: "9:00 AM", sailing: "1 hour cruising", anchorage: "1 hour anchorage", amount: 22000 },
      { start: "9:00 AM", end: "11:00 AM", sailing: "1 hour cruising", anchorage: "1 hour anchorage", amount: 22000 },
      { start: "2:00 PM", end: "4:00 PM", sailing: "1 hour cruising", anchorage: "1 hour anchorage", amount: 22000 },
      { start: "4:00 PM", end: "6:00 PM", sailing: "1 hour cruising", anchorage: "1 hour anchorage", amount: 28000 },
      { start: "5:00 PM", end: "7:00 PM", sailing: "1 hour cruising", anchorage: "1 hour anchorage", amount: 38000 },
      { start: "6:00 PM", end: "8:00 PM", sailing: "1 hour cruising", anchorage: "1 hour anchorage", amount: 34000 },
    ],
    pricingExtras: [
      "Additional hour — ₹13,000",
      "Overnight anchorage (9 am to 7 am) — ₹85,000",
      "Mumbai to Mandwa, return journey — ₹35,000",
      "Photoshoot on board (per hour) — ₹16,000",
    ],
    pricingNote: "Special permissions are required for overnight sailing.",
    faqs: [
      {
        q: "How much does it cost to charter the Azure Horizon?",
        a: "Two-hour slots run from ₹22,000 to ₹38,000 depending on the time of day, with sunset slots priced highest. See the pricing table above for every departure time. An additional hour, overnight anchorage and on-board photoshoots are all quoted separately.",
      },
      ...standardFaqs("Azure Horizon", 16),
    ],
  },
  {
    slug: "triton-odyssey",
    name: "Triton Odyssey",
    tagline: "Panoramic glass, a stabilised ride, signal the whole way out.",
    pricePerHour: 14000,
    guests: 14,
    lengthFt: 56,
    cabins: 2,
    crew: 3,
    destinations: ["mumbai", "goa", "navi-mumbai"],
    category: "Motor Yacht",
    highlights: ["Panoramic windows", "Auto stabilisation", "High-speed internet"],
    amenities: ["Panoramic windows", "Stabilisers", "High-speed Wi-Fi", "Air conditioning", "Sun deck"],
    gallery: [
      { src: "https://images.unsplash.com/photo-1570422774250-c951ec3ef74c?auto=format&fit=crop&w=1800&q=80", alt: "Triton Odyssey moored alongside in calm water" },
      { src: "https://images.unsplash.com/photo-1674606867357-a9b26fbdca9e?auto=format&fit=crop&w=1800&q=80", alt: "Saloon seating facing a large screen" },
      { src: "https://images.unsplash.com/photo-1697124510322-27ef594f67fd?auto=format&fit=crop&w=1800&q=80", alt: "Lounge with sofas and a coffee table" },
      { src: "https://images.unsplash.com/photo-1598448251941-ae4dd47dba33?auto=format&fit=crop&w=1800&q=80", alt: "Helm seating and controls" },
    ],
    videos: [],
    description: [
      "The **Triton Odyssey** is a 56-foot motor yacht chartered by the hour from **Mumbai**, **Navi Mumbai** and **Goa**, built around a stabilised ride and floor-to-ceiling panoramic windows. She carries up to **14 guests** with a licensed captain and crew, and is a regular pick for guests who want a smooth crossing more than a big party deck.",
      "Auto stabilisation keeps the ride level through most conditions, and the panoramic saloon windows mean the view carries on even with the air conditioning running. High-speed Wi-Fi on board makes her a genuine option for a working meeting or a livestreamed event as much as a leisure charter.",
      "Well suited to a **corporate charter**, a client meeting on the water, or any group that wants comfort over spectacle. Every charter includes the captain and crew, fuel for the standard route, life jackets for every guest and the sound system. Message us on WhatsApp with your date, city and group size for a firm all-in price.",
    ],
    specs: [
      { label: "Type", value: "Motor yacht" },
      { label: "Length overall", value: "56 ft" },
      { label: "Layout", value: "2 cabins, 3 crew" },
      { label: "Guest capacity", value: "14 guests" },
      { label: "Home ports", value: "Mumbai, Navi Mumbai & Goa" },
      { label: "Registration", value: "Commercial passenger licence" },
    ],
    pricingSlots: [
      { start: "7:00 AM", end: "9:00 AM", sailing: "1 hour cruising", anchorage: "1 hour anchorage", amount: 22000 },
      { start: "9:00 AM", end: "11:00 AM", sailing: "1 hour cruising", anchorage: "1 hour anchorage", amount: 22000 },
      { start: "2:00 PM", end: "4:00 PM", sailing: "1 hour cruising", anchorage: "1 hour anchorage", amount: 22000 },
      { start: "4:00 PM", end: "6:00 PM", sailing: "1 hour cruising", anchorage: "1 hour anchorage", amount: 28000 },
      { start: "5:00 PM", end: "7:00 PM", sailing: "1 hour cruising", anchorage: "1 hour anchorage", amount: 38000 },
      { start: "6:00 PM", end: "8:00 PM", sailing: "1 hour cruising", anchorage: "1 hour anchorage", amount: 34000 },
    ],
    pricingExtras: [
      "Additional hour — ₹13,000",
      "Overnight anchorage (9 am to 7 am) — ₹85,000",
      "Mumbai to Mandwa, return journey — ₹35,000",
      "Photoshoot on board (per hour) — ₹16,000",
    ],
    pricingNote: "Special permissions are required for overnight sailing.",
    faqs: [
      {
        q: "How much does it cost to charter the Triton Odyssey?",
        a: "Two-hour slots run from ₹22,000 to ₹38,000 depending on the time of day, with sunset slots priced highest. See the pricing table above for every departure time. An additional hour, overnight anchorage and on-board photoshoots are all quoted separately.",
      },
      ...standardFaqs("Triton Odyssey", 14),
    ],
  },
  {
    slug: "nautica-nova",
    name: "Nautica Nova",
    tagline: "The smooth one. Barely notices a swell.",
    pricePerHour: 13000,
    guests: 12,
    lengthFt: 50,
    cabins: 2,
    crew: 2,
    destinations: ["mumbai", "navi-mumbai"],
    category: "Motor Yacht",
    highlights: ["Panoramic windows", "Auto stabilisation", "High-speed internet"],
    amenities: ["Panoramic windows", "Stabilisers", "Wi-Fi", "Air conditioning", "Sun deck"],
    gallery: [
      { src: "https://images.unsplash.com/photo-1614350391736-ed8619d63c06?auto=format&fit=crop&w=1800&q=80", alt: "Nautica Nova seen from above on deep blue water" },
      { src: "https://images.unsplash.com/photo-1598448056086-307e98ef5c4a?auto=format&fit=crop&w=1800&q=80", alt: "Dining table and chairs in the saloon" },
      { src: "https://images.unsplash.com/photo-1676629147275-c306d03fe4fa?auto=format&fit=crop&w=1800&q=80", alt: "The yacht under way in golden evening light" },
      { src: "https://images.unsplash.com/photo-1535078035266-a0fa7d3b8f65?auto=format&fit=crop&w=1800&q=80", alt: "Bright interior lounge area" },
    ],
    videos: [],
    description: [
      "The **Nautica Nova** is a 50-foot motor yacht chartered by the hour from **Mumbai** and **Navi Mumbai** — the smooth one in the fleet, with auto stabilisation that barely notices a swell. She carries up to **12 guests** with a licensed captain and crew.",
      "Panoramic windows keep the saloon bright without giving up the air conditioning, and Wi-Fi on board means the crossing does not have to be offline. It is a compact, easy boat for a smaller group who want comfort without the size of a bigger yacht.",
      "A dependable choice for a small **birthday party**, a couple's **sunset cruise**, or a short family outing. Every charter includes the captain and crew, fuel for the standard route, life jackets for every guest and the sound system. Message us on WhatsApp with your date, city and group size for a firm all-in price.",
    ],
    specs: [
      { label: "Type", value: "Motor yacht" },
      { label: "Length overall", value: "50 ft" },
      { label: "Layout", value: "2 cabins, 2 crew" },
      { label: "Guest capacity", value: "12 guests" },
      { label: "Home ports", value: "Mumbai & Navi Mumbai" },
      { label: "Registration", value: "Commercial passenger licence" },
    ],
    pricingSlots: [
      { start: "7:00 AM", end: "9:00 AM", sailing: "1 hour cruising", anchorage: "1 hour anchorage", amount: 20000 },
      { start: "9:00 AM", end: "11:00 AM", sailing: "1 hour cruising", anchorage: "1 hour anchorage", amount: 20000 },
      { start: "2:00 PM", end: "4:00 PM", sailing: "1 hour cruising", anchorage: "1 hour anchorage", amount: 20000 },
      { start: "4:00 PM", end: "6:00 PM", sailing: "1 hour cruising", anchorage: "1 hour anchorage", amount: 26000 },
      { start: "5:00 PM", end: "7:00 PM", sailing: "1 hour cruising", anchorage: "1 hour anchorage", amount: 35000 },
      { start: "6:00 PM", end: "8:00 PM", sailing: "1 hour cruising", anchorage: "1 hour anchorage", amount: 31000 },
    ],
    pricingExtras: [
      "Additional hour — ₹12,000",
      "Overnight anchorage (9 am to 7 am) — ₹78,000",
      "Mumbai to Mandwa, return journey — ₹32,000",
      "Photoshoot on board (per hour) — ₹15,000",
    ],
    pricingNote: "Special permissions are required for overnight sailing.",
    faqs: [
      {
        q: "How much does it cost to charter the Nautica Nova?",
        a: "Two-hour slots run from ₹20,000 to ₹35,000 depending on the time of day, with sunset slots priced highest. See the pricing table above for every departure time. An additional hour, overnight anchorage and on-board photoshoots are all quoted separately.",
      },
      ...standardFaqs("Nautica Nova", 12),
    ],
  },
  {
    slug: "luminous-horizon",
    name: "Luminous Horizon",
    tagline: "Small group, big evening.",
    pricePerHour: 12000,
    guests: 10,
    lengthFt: 45,
    cabins: 1,
    crew: 2,
    destinations: ["goa"],
    category: "Motor Yacht",
    highlights: ["Open terrace", "Premium bar", "Wi-Fi on board"],
    amenities: ["Open terrace", "Premium bar", "Wi-Fi", "Sound system", "Sun pads"],
    gallery: [
      { src: "https://images.unsplash.com/photo-1681331325415-a497fd712ee6?auto=format&fit=crop&w=1800&q=80", alt: "Luminous Horizon at anchor in golden evening light" },
      { src: "https://images.unsplash.com/photo-1599582350162-83106f579198?auto=format&fit=crop&w=1800&q=80", alt: "Guests seated at the stern of the yacht" },
      { src: "https://images.unsplash.com/photo-1502986591842-471865a47d0e?auto=format&fit=crop&w=1800&q=80", alt: "Cabin with soft furnishings and natural light" },
      { src: "https://images.unsplash.com/photo-1519046904884-53103b34b206?auto=format&fit=crop&w=1800&q=80", alt: "The Goa coastline seen from the water" },
    ],
    videos: [],
    description: [
      "The **Luminous Horizon** is a 45-foot motor yacht chartered by the hour from **Goa** — a small-group boat built for a big evening rather than a big guest list. She carries up to **10 guests** with a licensed captain and crew.",
      "The open terrace and premium bar are the whole point of this boat: a tight, sociable deck where everyone stays in the same conversation, with Wi-Fi on board and the sound system running the show. It is the easiest booking in the Goa fleet for a small group that wants the evening to feel private.",
      "Booked most for an intimate **sunset cruise** on the Mandovi, a small birthday, or a proposal that wants a quiet deck rather than a crowd. Every charter includes the captain and crew, fuel for the standard route, life jackets for every guest and the sound system. Message us on WhatsApp with your date and group size for a firm all-in price.",
    ],
    specs: [
      { label: "Type", value: "Motor yacht" },
      { label: "Length overall", value: "45 ft" },
      { label: "Layout", value: "1 cabin, 2 crew" },
      { label: "Guest capacity", value: "10 guests" },
      { label: "Home port", value: "Panjim / Britona, Goa" },
      { label: "Registration", value: "Commercial passenger licence" },
    ],
    pricingSlots: [
      { start: "7:00 AM", end: "9:00 AM", sailing: "1 hour cruising", anchorage: "1 hour anchorage", amount: 18000 },
      { start: "9:00 AM", end: "11:00 AM", sailing: "1 hour cruising", anchorage: "1 hour anchorage", amount: 18000 },
      { start: "2:00 PM", end: "4:00 PM", sailing: "1 hour cruising", anchorage: "1 hour anchorage", amount: 18000 },
      { start: "4:00 PM", end: "6:00 PM", sailing: "1 hour cruising", anchorage: "1 hour anchorage", amount: 24000 },
      { start: "5:00 PM", end: "7:00 PM", sailing: "1 hour cruising", anchorage: "1 hour anchorage", amount: 32000 },
      { start: "6:00 PM", end: "8:00 PM", sailing: "1 hour cruising", anchorage: "1 hour anchorage", amount: 28000 },
    ],
    pricingExtras: [
      "Additional hour — ₹11,000",
      "Overnight anchorage (9 am to 7 am) — ₹70,000",
      "Panjim to Grande Island, return journey — ₹28,000",
      "Photoshoot on board (per hour) — ₹14,000",
    ],
    pricingNote: "Special permissions are required for overnight sailing.",
    faqs: [
      {
        q: "How much does it cost to charter the Luminous Horizon?",
        a: "Two-hour slots run from ₹18,000 to ₹32,000 depending on the time of day, with sunset slots priced highest. See the pricing table above for every departure time. An additional hour, overnight anchorage and on-board photoshoots are all quoted separately.",
      },
      ...standardFaqs("Luminous Horizon", 10),
    ],
  },
  {
    slug: "mariners-haven",
    name: "Mariner's Haven",
    tagline: "The easiest yes on the fleet.",
    pricePerHour: 11900,
    guests: 10,
    lengthFt: 42,
    cabins: 1,
    crew: 2,
    destinations: ["mumbai", "goa", "navi-mumbai"],
    category: "Motor Yacht",
    highlights: ["Hot tub", "Spacious decks", "Modern interior"],
    amenities: ["Hot tub", "Sun deck", "Modern interior", "Bluetooth sound", "Cool box"],
    gallery: [
      { src: "https://images.unsplash.com/photo-1585000962552-70f0a67223d9?auto=format&fit=crop&w=1800&q=80", alt: "Bow of the Mariner's Haven cutting through blue water" },
      { src: "https://images.unsplash.com/photo-1674606878551-f424ad6ce965?auto=format&fit=crop&w=1800&q=80", alt: "Deck seating with a low table" },
      { src: "https://images.unsplash.com/photo-1759497904811-fc906fdcd270?auto=format&fit=crop&w=1800&q=80", alt: "Guests enjoying a day on board" },
      { src: "https://images.unsplash.com/photo-1598448154313-6e7789856d06?auto=format&fit=crop&w=1800&q=80", alt: "Interior seating below deck" },
    ],
    videos: [],
    description: [
      "The **Mariner's Haven** is a 42-foot motor yacht chartered by the hour from **Mumbai**, **Navi Mumbai** and **Goa** — the easiest yes on the fleet, and the one we suggest first for a small group booking their first charter. She carries up to **10 guests** with a licensed captain and crew.",
      "A hot tub and spacious sun deck sit up top, with a modern interior below for anyone stepping out of the sun. Bluetooth sound and a cool box come standard, so the boat needs almost no setup before guests board.",
      "A reliable choice for a first-time **yacht charter in Mumbai**, a small **birthday party**, or a relaxed afternoon with the hot tub as the main event. Every charter includes the captain and crew, fuel for the standard route, life jackets for every guest and the sound system. Message us on WhatsApp with your date, city and group size for a firm all-in price.",
    ],
    specs: [
      { label: "Type", value: "Motor yacht" },
      { label: "Length overall", value: "42 ft" },
      { label: "Layout", value: "1 cabin, 2 crew" },
      { label: "Guest capacity", value: "10 guests" },
      { label: "Home ports", value: "Mumbai, Navi Mumbai & Goa" },
      { label: "Registration", value: "Commercial passenger licence" },
    ],
    pricingSlots: [
      { start: "7:00 AM", end: "9:00 AM", sailing: "1 hour cruising", anchorage: "1 hour anchorage", amount: 18000 },
      { start: "9:00 AM", end: "11:00 AM", sailing: "1 hour cruising", anchorage: "1 hour anchorage", amount: 18000 },
      { start: "2:00 PM", end: "4:00 PM", sailing: "1 hour cruising", anchorage: "1 hour anchorage", amount: 18000 },
      { start: "4:00 PM", end: "6:00 PM", sailing: "1 hour cruising", anchorage: "1 hour anchorage", amount: 23000 },
      { start: "5:00 PM", end: "7:00 PM", sailing: "1 hour cruising", anchorage: "1 hour anchorage", amount: 30000 },
      { start: "6:00 PM", end: "8:00 PM", sailing: "1 hour cruising", anchorage: "1 hour anchorage", amount: 27000 },
    ],
    pricingExtras: [
      "Additional hour — ₹10,500",
      "Overnight anchorage (9 am to 7 am) — ₹68,000",
      "Mumbai to Mandwa, return journey — ₹28,000",
      "Photoshoot on board (per hour) — ₹13,500",
    ],
    pricingNote: "Special permissions are required for overnight sailing.",
    faqs: [
      {
        q: "How much does it cost to charter the Mariner's Haven?",
        a: "Two-hour slots run from ₹18,000 to ₹30,000 depending on the time of day, with sunset slots priced highest. See the pricing table above for every departure time. An additional hour, overnight anchorage and on-board photoshoots are all quoted separately.",
      },
      ...standardFaqs("Mariner's Haven", 10),
    ],
  },
];

export const getYacht = (slug: string) => yachts.find((y) => y.slug === slug);
export const featuredYachts = yachts.filter((y) => y.featured);
export const yachtsInDestination = (d: DestinationSlug) =>
  yachts.filter((y) => y.destinations.includes(d));

export const inr = (n: number) =>
  new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(n);
