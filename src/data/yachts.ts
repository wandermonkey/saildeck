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
    slug: "tara-sailing-catamaran-mumbai",
    name: "Tara Sailing Catamaran Mumbai",
    tagline: "A 40-foot twin-hull catamaran for up to 25 guests, sailing from the Gateway of India.",
    pricePerHour: 14000,
    guests: 25,
    lengthFt: 40,
    cabins: 2,
    crew: 2,
    destinations: ["mumbai"],
    category: "Catamaran",
    highlights: ["40ft twin-hull catamaran", "Up to 25 guests", "Departs the Gateway of India"],
    amenities: [
      "Two ensuite cabins",
      "Galley with fridge & stove",
      "Shaded aft lounge",
      "Forward trampoline deck",
      "Bluetooth sound system",
      "Swim platform",
    ],
    gallery: [
      { src: "/images/fleet/tara-sailing-catamaran/tara-catamaran-sunset-party.png", alt: "Tara under full sail at sunset with guests dancing on deck, string lights and a JBL speaker" },
      { src: "/images/fleet/tara-sailing-catamaran/tara-catamaran-3.jpg", alt: "Tara's twin hulls and fenders viewed from alongside at the mooring" },
      { src: "/images/fleet/tara-sailing-catamaran/tara-catamaran-11.jpg", alt: "Tara's stern at sunset with the tender boat alongside" },
      { src: "/images/fleet/tara-sailing-catamaran/tara-catamaran-9.jpg", alt: "Crew preparing Tara's bow among moored yachts in the anchorage" },
      { src: "/images/fleet/tara-sailing-catamaran/tara-catamaran-10.jpg", alt: "Tara moored at sunset with the tender boat tied alongside" },
      { src: "/images/fleet/tara-sailing-catamaran/tara-catamaran-4.jpg", alt: "Guests in life jackets aboard Tara under sail with the Mumbai skyline behind" },
      { src: "/images/fleet/tara-sailing-catamaran/tara-catamaran-7.jpg", alt: "Tara under way past the Middle Ground coastal battery with the city skyline behind" },
      { src: "/images/fleet/tara-sailing-catamaran/tara-catamaran-15.jpg", alt: "Guests seated on Tara's forward trampoline deck with the Taj Mahal Palace in view" },
      { src: "/images/fleet/tara-sailing-catamaran/tara-catamaran-17.jpg", alt: "Tara's stern nameplate and logo with guests aboard the aft deck" },
      { src: "/images/fleet/tara-sailing-catamaran/tara-catamaran-5.jpg", alt: "Guests seated on the aft deck in life jackets with the Taj Mahal Palace behind" },
      { src: "/images/fleet/tara-sailing-catamaran/tara-catamaran-1.jpg", alt: "A family with children relaxing on Tara's forward trampoline netting" },
      { src: "/images/fleet/tara-sailing-catamaran/tara-catamaran-14.jpg", alt: "A child playing on the trampoline deck with family looking on" },
      { src: "/images/fleet/tara-sailing-catamaran/tara-catamaran-12.jpg", alt: "Guests on Tara's aft deck at sunset beside the old coastal battery fort" },
      { src: "/images/fleet/tara-sailing-catamaran/tara-catamaran-13.jpg", alt: "A large group photo on Tara's foredeck at sunset with the coastal battery fort behind" },
      { src: "/images/fleet/tara-sailing-catamaran/tara-catamaran-2.jpg", alt: "A formal group portrait on Tara's foredeck at golden hour" },
      { src: "/images/fleet/tara-sailing-catamaran/tara-catamaran-19.jpg", alt: "A guest relaxing on the aft deck seat as the sun gets low" },
      { src: "/images/fleet/tara-sailing-catamaran/tara-catamaran-20.jpg", alt: "A guest standing at the bow holding the sail line under clear skies" },
    ],
    videos: [],
    description: [
      "**Tara** is a 40-foot twin-hull sailing catamaran chartered by the hour from the **Gateway of India**, and at up to **25 guests** she is the biggest group booking in the Saildeck fleet after the flagship. A catamaran's two hulls give her a wide, stable deck that barely rolls at anchor — the reason groups who would rather not think about their footing while holding a drink tend to book her over a monohull.",
      "Below deck she carries **two ensuite cabins** and a proper galley with a fridge and stove, so the boat can genuinely run a full-day charter rather than just a two-hour slot. On deck, a shaded aft lounge with a Bluetooth sound system covers the group when the sun is high, and the wide forward trampoline netting is where most people actually end up sitting — it is the one part of the boat every group's photos come from.",
      "Because she is licensed for a large group, Tara is the boat we put forward for a **[corporate offsite](/blog/corporate-yacht-charters-india)**, a milestone anniversary with three generations aboard, or a birthday that has outgrown a smaller charter — see our **[guide to matching group size to boat size](/blog/group-size-boat-size-guide)** if you are still deciding between her and a smaller yacht. She is also a comfortable, steady platform for a **[Mumbai Darshan by cruise](/products/mumbai-darshan-by-cruise)** past the Gateway, the old coastal forts and the naval dockyard — and for families, the wide flat deck and low freeboard make her one of the easier boats in the fleet to keep children safely in one place; more on that in our **[family boating guide](/blog/family-friendly-boating-mumbai-goa)**.",
      "Boarding is by tender from the Gateway of India in Colaba — if you are coming from elsewhere in the city, our **[guide to Mumbai's departure jetties](/blog/mumbai-harbour-vs-marine-drive-yacht-boarding)** covers the options. Every charter includes the captain and crew, fuel for the standard route, life jackets for every guest and the sound system. The 5–7pm slot is timed to the **[best light for a sunset cruise](/blog/sunset-cruises-in-mumbai-guide)** and is the first one to book out — message us on WhatsApp with your date and group size for a firm all-in price.",
    ],
    specs: [
      { label: "Type", value: "Sailing catamaran" },
      { label: "Length overall", value: "40 ft" },
      { label: "Layout", value: "2 ensuite cabins, galley, shaded aft lounge" },
      { label: "Guest capacity", value: "25 guests" },
      { label: "Home port", value: "Gateway of India, Mumbai" },
      { label: "Registration", value: "Commercial passenger licence" },
    ],
    pricingSlots: [
      { start: "7:00 AM", end: "9:00 AM", sailing: "1 hour cruising", anchorage: "1 hour anchorage", amount: 10000 },
      { start: "9:00 AM", end: "11:00 AM", sailing: "1 hour cruising", anchorage: "1 hour anchorage", amount: 10000 },
      { start: "2:00 PM", end: "4:00 PM", sailing: "1 hour cruising", anchorage: "1 hour anchorage", amount: 15000 },
      { start: "4:00 PM", end: "6:00 PM", sailing: "1 hour cruising", anchorage: "1 hour anchorage", amount: 20000 },
      { start: "5:00 PM", end: "7:00 PM", sailing: "1 hour cruising", anchorage: "1 hour anchorage", amount: 25000 },
      { start: "6:00 PM", end: "8:00 PM", sailing: "1 hour cruising", anchorage: "1 hour anchorage", amount: 20000 },
    ],
    pricingExtras: [
      "Additional hour — ₹13,000",
      "Overnight anchorage (9 am to 7 am) — ₹85,000",
      "Gateway of India to Mandwa, return journey — ₹35,000",
      "Photoshoot on board (per hour) — ₹16,000",
    ],
    pricingNote: "Special permissions are required for overnight sailing.",
    faqs: [
      {
        q: "How much does it cost to charter Tara?",
        a: "Two-hour slots run from ₹10,000 to ₹25,000 depending on the time of day, with the 5–7pm sunset slot priced highest. See the pricing table above for every departure time. An additional hour, overnight anchorage and on-board photoshoots are all quoted separately.",
      },
      {
        q: "How many guests can Tara carry?",
        a: "Up to 25 guests, which makes her the largest group booking in the fleet after our flagship motor yacht. Capacity is fixed by the vessel's coast guard licence and cannot be exceeded — give us an accurate head count, including children, when you enquire.",
      },
      {
        q: "Is Tara suitable for a corporate offsite or a large family gathering?",
        a: "Yes — the wide, stable twin-hull deck and the 25-guest capacity are exactly why groups book her over a smaller yacht for a corporate day out, an anniversary with the whole family, or a milestone birthday. See our corporate charter planning guide for how we typically structure a group booking.",
      },
      {
        q: "Where does Tara depart from, and is there a cabin to change or rest in?",
        a: "Boarding is by tender from the Gateway of India in Colaba. On board there are two ensuite cabins and a galley, so unlike a pure day boat, guests have somewhere private to change, rest or shelter from the sun during a longer charter.",
      },
      ...standardFaqs("Tara Sailing Catamaran Mumbai", 25),
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
    /* Saildeck's own boat. Gallery is the operator's real photography, used
       unedited. Facts below (capacity, transfer times, slot pricing) are
       reconciled from several Mumbai sailboat-charter operators offering the
       same XS 63 class vessel — cross-check against the actual licence and
       tariff before this goes live. */
    slug: "5-pax-sailing-boat-charter-mumbai",
    name: "5 Pax Sailing Boat",
    tagline: "A private, wind-powered sailboat from the Gateway of India — no engine, just sail.",
    pricePerHour: 2000,
    guests: 5,
    lengthFt: 21,
    cabins: 0,
    crew: 1,
    destinations: ["mumbai"],
    category: "Sailing Yacht",
    highlights: ["Wind-powered — no engine noise", "Private charter, up to 5 guests", "Departs the Gateway of India"],
    amenities: [
      "Private sailboat & skipper",
      "Motorboat transfer, both ways",
      "Life jackets for every guest",
      "Mineral water",
      "Cuddy cabin for shade & storage",
      "Open deck seating",
    ],
    gallery: [
      { src: "/images/fleet/5-pax-sailing-boat/5-pax-sailing-boat-caviar.webp", alt: "The 5 Pax Sailing Boat under full sail with guests aboard, named Caviar" },
      { src: "/images/fleet/5-pax-sailing-boat/5-pax-sailing-boat-marry-me.webp", alt: "A proposal set-up on the bow reading I Love U, Marry Me, decorated with roses and heart balloons" },
      { src: "/images/fleet/5-pax-sailing-boat/5-pax-sailing-boat-4.jpg", alt: "A couple sharing a private moment at the bow under sail, Mumbai skyline behind" },
      { src: "/images/fleet/5-pax-sailing-boat/5-pax-sailing-boat-7.jpg", alt: "A couple standing at the bow of Flora Queen with the Mumbai skyline in the distance" },
      { src: "/images/fleet/5-pax-sailing-boat/5-pax-sailing-boat-birthday-taj.webp", alt: "A happy birthday balloon display on the bow with the Taj Mahal Palace in the background" },
      { src: "/images/fleet/5-pax-sailing-boat/5-pax-sailing-boat-anniversary-sunset.webp", alt: "A happy anniversary balloon display on the bow at sunset" },
      { src: "/images/fleet/5-pax-sailing-boat/5-pax-sailing-boat-birthday-cake.webp", alt: "A guest seated at the bow with a birthday cake and rose garlands" },
      { src: "/images/fleet/5-pax-sailing-boat/5-pax-sailing-boat-anniversary-pink.webp", alt: "A happy anniversary balloon display on the bow with pink drapes and the Gateway of India behind" },
      { src: "/images/fleet/5-pax-sailing-boat/5-pax-sailing-boat-iloveu-sunset.webp", alt: "An I Love U balloon display on the bow at sunset with pink drapes" },
      { src: "/images/fleet/5-pax-sailing-boat/5-pax-sailing-boat-anniversary-silhouette.webp", alt: "A couple silhouetted at the bow under a happy anniversary balloon display at sunset" },
      { src: "/images/fleet/5-pax-sailing-boat/5-pax-sailing-boat-birthday-champagne.jpg", alt: "Guests toasting with a birthday cake on the bow, decorated with red heart balloons" },
      { src: "/images/fleet/5-pax-sailing-boat/5-pax-sailing-boat-crew-family.jpg", alt: "A young guest at the helm with the skipper alongside as the sailboat heels under sail" },
      { src: "/images/fleet/5-pax-sailing-boat/5-pax-sailing-boat-friends-group.jpg", alt: "A group of friends relaxing on the bow during a sail" },
      { src: "/images/fleet/5-pax-sailing-boat/5-pax-sailing-boat-family-lights.jpg", alt: "A family gathered on the bow at dusk with a passing motor yacht behind" },
      { src: "/images/fleet/5-pax-sailing-boat/5-pax-sailing-boat-anniversary-santa.webp", alt: "A happy anniversary balloon display on the bow with festive cushions" },
      { src: "/images/fleet/5-pax-sailing-boat/5-pax-sailing-boat-anniversary-hearts-skyline.webp", alt: "A happy anniversary balloon display on the bow with the Mumbai skyline behind" },
      { src: "/images/fleet/5-pax-sailing-boat/5-pax-sailing-boat-marry-me-skyline.webp", alt: "A proposal set-up on the bow reading I Love U, Marry Me, with the city skyline behind" },
      { src: "/images/fleet/5-pax-sailing-boat/5-pax-sailing-boat-birthday-sunset.webp", alt: "A happy birthday balloon display on the bow at sunset with rose bouquets" },
      { src: "/images/fleet/5-pax-sailing-boat/5-pax-sailing-boat-iloveu-sunset-2.webp", alt: "An I Love U balloon display on the bow at sunset with the harbour lit gold" },
      { src: "/images/fleet/5-pax-sailing-boat/5-pax-sailing-boat-anniversary-gold-sunset.webp", alt: "A couple watching the sunset from the bow under a happy anniversary balloon display" },
    ],
    videos: [],
    description: [
      "The **5 Pax Sailing Boat** is Saildeck's XS 63 — a 21-foot open sailboat that carries up to **5 guests** under sail alone, with no engine running once you're actually sailing. There is no shared deck and no motor hum, just wind against canvas and the water moving under the hull. She departs from the **Gateway of India** in Colaba, and she is the boat to book when the point of the afternoon is the sailing itself rather than a jacuzzi and a sound system.",
      "You meet the crew at **Jetty No. 5**, directly across the road from the Taj Mahal Palace's main entrance at the Gateway of India — arrive fifteen minutes before your slot with a government photo ID. A motorboat carries you out to the sailboat at anchor, about fifteen minutes each way, so a two-hour booking works out to roughly ninety minutes of actual sailing. If you're weighing this against a boarding point further from South Mumbai, [our guide to Mumbai's departure jetties](/blog/mumbai-harbour-vs-marine-drive-yacht-boarding) covers the difference.",
      "Dress for wind rather than a party — light, breathable clothing, a cap, sunglasses and flat, non-slip shoes are the practical choice, since heels have no place on a moving deck. Carry your ID, sunscreen and as much water as you would drink on a two-hour outing in the sun. [Our full packing list for a yacht charter](/blog/what-to-pack-for-a-yacht-charter) covers the rest, most of which applies here too. No swimming ability is required — life jackets are carried for everyone aboard, including children from about three years old.",
      "Because she seats only five, this is the boat couples book for a quiet date or a **proposal**, and the one families choose when a big motor yacht feels like overkill for an afternoon on the water. No sailing experience is needed — the skipper handles the boat and is happy to explain what's going on if you ask. If the idea has you thinking about learning properly rather than just riding along, [our guide to learning to sail in India](/blog/learning-to-sail-in-india) is a reasonable next stop. Planning to pop the question instead? [Here is how we set up a proposal on a yacht](/blog/how-to-plan-a-proposal-on-a-yacht).",
      "Pricing is for the whole boat, not per person, and the earliest slots are the best value — see the full slot pricing below. The 6–8pm sunset departure is the one most people ask for first, so if that's the plan, [read what actually makes a good sunset cruise](/blog/sunset-cruises-in-mumbai-guide) before you pick a date, since sunset time shifts by more than an hour across the year. Message us on WhatsApp with your date and head count for a firm price and the day's exact reporting time.",
    ],
    specs: [
      { label: "Builder", value: "XS Marine" },
      { label: "Length overall", value: "21 ft" },
      { label: "Layout", value: "Open deck, cuddy cabin below" },
      { label: "Propulsion", value: "Sail only — no engine while sailing" },
      { label: "Guest capacity", value: "5 guests" },
      { label: "Home port", value: "Gateway of India, Mumbai" },
    ],
    pricingSlots: [
      { start: "7:00 AM", end: "9:00 AM", sailing: "1.5 hr private sailing", anchorage: "30 min transfer, both ways", amount: 3500 },
      { start: "9:00 AM", end: "11:00 AM", sailing: "1.5 hr private sailing", anchorage: "30 min transfer, both ways", amount: 3500 },
      { start: "2:00 PM", end: "4:00 PM", sailing: "1.5 hr private sailing", anchorage: "30 min transfer, both ways", amount: 4000 },
      { start: "4:00 PM", end: "6:00 PM", sailing: "1.5 hr private sailing", anchorage: "30 min transfer, both ways", amount: 4500 },
      { start: "6:00 PM", end: "8:00 PM", sailing: "1.5 hr private sailing", anchorage: "30 min transfer, both ways", amount: 4500 },
    ],
    pricingExtras: [
      "Weekend and public holiday slots — ₹500 extra per booking",
      "8:00 PM to 10:00 PM night slot, where available — ₹1,000 extra",
      "Cake on board — ₹950",
      "Flower bouquet on board — ₹850",
    ],
    pricingNote:
      "Prices are for the whole boat, up to 5 guests — not per person. Morning slots are the best value; the 6–8pm sunset slot books out first. Alcohol is not permitted on board this vessel.",
    faqs: [
      {
        q: "How much does the 5 Pax Sailing Boat cost?",
        a: "From ₹3,500 for the whole boat on a weekday morning slot, up to ₹4,500 for the 6–8pm sunset departure. Weekends and public holidays run ₹500 higher across all slots. See the full pricing above for every departure time.",
      },
      {
        q: "Do I need sailing experience?",
        a: "No. A qualified skipper sails the boat throughout — you are a guest, not crew, though you are welcome to ask questions or take the helm for a stretch if the skipper judges conditions suitable.",
      },
      {
        q: "Where exactly do we meet, and how do we get to the boat?",
        a: "At Jetty No. 5, directly across the road from the Taj Mahal Palace hotel's main entrance at the Gateway of India, Colaba. A motorboat then carries you out to the sailboat at anchor — about fifteen minutes each way, which is why a two-hour slot gives roughly ninety minutes of actual sailing.",
      },
      {
        q: "What should we wear and bring?",
        a: "Light, breathable clothing, a cap, sunglasses and flat non-slip shoes — avoid heels. Bring a government photo ID, sunscreen and water. A light jacket is worth having on evening slots, which can be breezy.",
      },
      {
        q: "Is this boat suitable for children or non-swimmers?",
        a: "Yes. Life jackets are carried for every guest and swimming ability is not required. Children from about three years old are welcome with a guardian aboard.",
      },
      {
        q: "Can we bring alcohol, food, or a cake?",
        a: "Alcohol is not permitted aboard this vessel. Outside snacks are generally fine, and we can arrange a cake (₹950) or a flower bouquet (₹850) on board — flag it when you book so it is ready for boarding.",
      },
      {
        q: "What happens if the weather is bad on our date?",
        a: "The skipper makes the final call on safety grounds. If the coast guard suspends sailing or wind conditions are unsafe, we reschedule your charter to another date at no cost.",
      },
      {
        q: "Is this the boat to book for a proposal or an anniversary?",
        a: "It's one of our most-booked boats for exactly that — small enough to feel private, with an open bow that photographs well against the skyline. Tell us the occasion when you enquire and we will suggest timing and decoration options.",
      },
    ],
  },
  {
    /* Saildeck's own boat. Gallery is the operator's real photography, used
       unedited. lengthFt is read off the "XS27" hull marking visible in one
       of the profile shots — cross-check against the actual registration
       before this goes live, the same way Tara's specs needed correcting. */
    slug: "tikla-queen-8-pax-sailing-boat-mumbai",
    name: "Tikla Queen",
    tagline: "A larger XS Marine sailboat for up to 8 guests, with sail and an auxiliary outboard.",
    pricePerHour: 2500,
    guests: 8,
    lengthFt: 27,
    cabins: 0,
    crew: 2,
    destinations: ["mumbai"],
    category: "Sailing Yacht",
    highlights: ["Sail plus auxiliary outboard", "Private charter, up to 8 guests", "Decorated cuddy cabin below deck"],
    amenities: [
      "Private sailboat & skipper",
      "Auxiliary outboard motor",
      "Motorboat transfer, both ways",
      "Life jackets for every guest",
      "Below-deck cuddy cabin",
      "Open bow & aft seating",
    ],
    gallery: [
      { src: "/images/fleet/tikla-queen/tikla-queen-hero.jpg", alt: "Tikla Queen under sail with a family aboard and the Mumbai skyline behind" },
      { src: "/images/fleet/tikla-queen/tikla-queen-side-profile.jpeg", alt: "Tikla Queen's green hull and nameplate viewed from alongside at anchor" },
      { src: "/images/fleet/tikla-queen/tikla-queen-skyline.jpg", alt: "Tikla Queen under sail with the Taj Mahal Palace and Gateway of India in the distance" },
      { src: "/images/fleet/tikla-queen/tikla-queen-crew-guests.jpg", alt: "The skipper and a small group of guests aboard Tikla Queen under sail" },
      { src: "/images/fleet/tikla-queen/tikla-queen-skipper-sail.jpg", alt: "The skipper hoisting sail as a family of guests looks on" },
      { src: "/images/fleet/tikla-queen/tikla-queen-bow-family.jpg", alt: "A family with a young child seated at the bow under sail" },
      { src: "/images/fleet/tikla-queen/tikla-queen-family-1.jpg", alt: "A family seated on the aft deck as Tikla Queen sails past the Mumbai skyline" },
      { src: "/images/fleet/tikla-queen/tikla-queen-family-2.jpg", alt: "A family group photo on deck decorated with a red and white balloon string" },
      { src: "/images/fleet/tikla-queen/tikla-queen-family-3.jpg", alt: "Guests seated on the bow under sail with the sail number IND 261 visible" },
      { src: "/images/fleet/tikla-queen/tikla-queen-balloons-sailing.jpg", alt: "A group celebration aboard Tikla Queen decorated with red balloons, under sail" },
      { src: "/images/fleet/tikla-queen/tikla-queen-cabin-cushions.jpg", alt: "The below-deck cuddy cabin with monogrammed sequin cushions for a celebration" },
      { src: "/images/fleet/tikla-queen/tikla-queen-birthday-cabin.jpg", alt: "A birthday decoration set-up in the cuddy cabin with balloons and rose petals" },
      { src: "/images/fleet/tikla-queen/tikla-queen-sunset-solo.jpg", alt: "A guest at the bow at sunset with balloons strung along the rail" },
    ],
    videos: [],
    description: [
      "**Tikla Queen** is a larger sister to Saildeck's XS Marine sailboats — built by the same yard, but with room for up to **8 guests** rather than five, and with a small outboard alongside her sail for when the wind drops. She departs from the **Gateway of India** in Colaba, and the extra length shows most in how many people she carries comfortably rather than in how the sailing itself feels.",
      "Below deck she has a proper **cuddy cabin** rather than a bare storage locker — enough headroom and bench seating to shelter from the sun, and enough space that we regularly decorate it for a birthday or anniversary with sequin cushions spelling out names, fairy lights and rose petals. On deck, the open bow and the aft seating around the tiller are where most groups actually sit, with the city skyline behind them for most of the sail.",
      "Because she seats more than our smaller sailboat, Tikla Queen is the one families book for an outing with grandparents and children in the same group, and the one groups choose for a **[birthday on the water](/blog/bachelorette-birthday-parties-on-a-yacht)** where eight people need to fit rather than five. If you are weighing up how many guests a given boat can actually take, **[our guide to matching group size to boat size](/blog/group-size-boat-size-guide)** covers the trade-offs across the fleet.",
      "Boarding follows the same pattern as our other sailboats — a motorboat transfer from the jetty out to Tikla Queen at anchor, so allow the transfer time on both ends of your slot. [Our guide to Mumbai's departure jetties](/blog/mumbai-harbour-vs-marine-drive-yacht-boarding) covers the boarding point in detail, and [our packing list for a yacht charter](/blog/what-to-pack-for-a-yacht-charter) covers what to wear and bring — light clothing and flat shoes, not heels, since this is still an open sailing deck rather than a motor yacht's flat sundeck.",
      "No sailing experience is needed — a skipper and deckhand run the boat throughout. Pricing is for the whole boat, not per person; see the full slot pricing below, and message us on WhatsApp with your date and head count for a firm price and the day's exact reporting time.",
    ],
    specs: [
      { label: "Builder", value: "XS Marine" },
      { label: "Length overall", value: "27 ft" },
      { label: "Layout", value: "Open deck, decorated cuddy cabin below" },
      { label: "Propulsion", value: "Sail, with an auxiliary outboard" },
      { label: "Guest capacity", value: "8 guests" },
      { label: "Home port", value: "Gateway of India, Mumbai" },
    ],
    pricingSlots: [
      { start: "7:00 AM", end: "9:00 AM", sailing: "1.5 hr private sailing", anchorage: "30 min transfer, both ways", amount: 5000 },
      { start: "9:00 AM", end: "11:00 AM", sailing: "1.5 hr private sailing", anchorage: "30 min transfer, both ways", amount: 5000 },
      { start: "2:00 PM", end: "4:00 PM", sailing: "1.5 hr private sailing", anchorage: "30 min transfer, both ways", amount: 5500 },
      { start: "4:00 PM", end: "6:00 PM", sailing: "1.5 hr private sailing", anchorage: "30 min transfer, both ways", amount: 6000 },
      { start: "6:00 PM", end: "8:00 PM", sailing: "1.5 hr private sailing", anchorage: "30 min transfer, both ways", amount: 6000 },
    ],
    pricingExtras: [
      "Weekend and public holiday slots — ₹500 extra per booking",
      "Cuddy cabin decoration (balloons, cushions, petals) — from ₹2,500",
      "Cake on board — ₹950",
      "Flower bouquet on board — ₹850",
    ],
    pricingNote:
      "Prices are for the whole boat, up to 8 guests — not per person. Morning slots are the best value; the 6–8pm sunset slot books out first. Alcohol is not permitted on board this vessel.",
    faqs: [
      {
        q: "How much does Tikla Queen cost to charter?",
        a: "From ₹5,000 for the whole boat on a weekday morning slot, up to ₹6,000 for the 6–8pm sunset departure. Weekends and public holidays run ₹500 higher across all slots. See the full pricing above for every departure time.",
      },
      {
        q: "How is Tikla Queen different from the smaller 5 Pax Sailing Boat?",
        a: "Mainly capacity and the cabin — Tikla Queen carries up to 8 guests rather than 5, and her below-deck cuddy cabin is roomier, which is why we use it for decorated birthday and anniversary set-ups. She also carries a small auxiliary outboard alongside her sail.",
      },
      {
        q: "Do I need sailing experience?",
        a: "No. A skipper and deckhand sail the boat throughout — you are a guest, not crew, though you are welcome to ask questions if you're curious.",
      },
      {
        q: "Where do we meet, and how do we get to the boat?",
        a: "At the jetty near the Gateway of India in Colaba. A motorboat then carries you out to Tikla Queen at anchor — allow about fifteen minutes each way, which is why a two-hour slot gives roughly ninety minutes of actual sailing.",
      },
      {
        q: "Can you decorate the cabin for a birthday or anniversary?",
        a: "Yes — balloons, a name spelled out in cushions, fairy lights and rose petals are all things we've set up in the cuddy cabin before. Tell us the occasion and the names when you book and we will quote the decoration separately.",
      },
      {
        q: "Is this boat suitable for children and grandparents in the same group?",
        a: "Yes, that's a large part of why families choose her over the smaller sailboat — more deck space and a proper cabin to retreat to. Life jackets are carried for every guest and swimming ability is not required.",
      },
      {
        q: "Can we bring alcohol, food, or a cake?",
        a: "Alcohol is not permitted aboard this vessel. Outside snacks are generally fine, and we can arrange a cake (₹950) or a flower bouquet (₹850) — flag it when you book so it is ready for boarding.",
      },
      {
        q: "What happens if the weather is bad on our date?",
        a: "The skipper makes the final call on safety grounds. If the coast guard suspends sailing or wind conditions are unsafe, we reschedule your charter to another date at no cost.",
      },
    ],
  },
  {
    /* Saildeck's own boat. Gallery is the operator's real photography, used
       unedited. lengthFt is an estimate from her visible proportions and the
       forward cabin — she is not an XS Marine boat like Tikla Queen and the
       5 Pax boat, she has a genoa on a furler, a teak saloon and a real
       V-berth. Confirm the actual length and registration before this goes
       live, the same way Tara's and Tikla's specs needed correcting. */
    slug: "tantallon-7-pax-sailing-boat-mumbai",
    name: "Tantallon",
    tagline: "A classic teak-finished cruising sailboat for up to 7 guests, with a real cabin below.",
    pricePerHour: 3000,
    guests: 7,
    lengthFt: 30,
    cabins: 1,
    crew: 2,
    destinations: ["mumbai"],
    category: "Sailing Yacht",
    highlights: ["Classic teak-finished saloon", "Forward cabin with real berths", "Private charter, up to 7 guests"],
    amenities: [
      "Private sailboat & skipper",
      "Forward V-berth cabin",
      "Teak-finished saloon & dining table",
      "Auxiliary outboard motor",
      "Candlelit dinner set-up available",
      "Life jackets for every guest",
    ],
    gallery: [
      { src: "/images/fleet/tantallon/tantallon-hero.jpeg", alt: "A couple in formal wear on the bow of Tantallon under sail, her name on the hull" },
      { src: "/images/fleet/tantallon/tantallon-side-profile-guests.jpg", alt: "Tantallon under sail with guests seated at the bow, skyline behind" },
      { src: "/images/fleet/tantallon/tantallon-bow-guests-sailing.jpg", alt: "Guests seated at the bow as Tantallon heels under a genoa and mainsail" },
      { src: "/images/fleet/tantallon/tantallon-skyline-portrait.jpeg", alt: "A guest posed at the bow with the Mumbai skyline and Gateway of India behind" },
      { src: "/images/fleet/tantallon/tantallon-couple-skyline.jpeg", alt: "A couple standing at the bow under sail with the city skyline in view" },
      { src: "/images/fleet/tantallon/tantallon-guests-bow.jpeg", alt: "A group of friends seated at the bow at golden hour with the harbour behind" },
      { src: "/images/fleet/tantallon/tantallon-family-sunset.jpeg", alt: "A family seated at the bow watching the sunset with a child in a life jacket" },
      { src: "/images/fleet/tantallon/tantallon-bow-family-sunset.jpg", alt: "A family group at the bow at sunset as Tantallon sails on" },
      { src: "/images/fleet/tantallon/tantallon-cockpit-group.jpg", alt: "Guests seated in the cockpit under sail with the crew at the helm" },
      { src: "/images/fleet/tantallon/tantallon-cockpit-sunset.jpg", alt: "The cockpit and striped seating as Tantallon sails into the sunset" },
      { src: "/images/fleet/tantallon/tantallon-cockpit-empty.jpg", alt: "The cockpit's striped cushioned seating and teak fittings at anchor" },
      { src: "/images/fleet/tantallon/tantallon-saloon-day.jpg", alt: "The teak-finished saloon with striped cushions and a fold-down dining table" },
      { src: "/images/fleet/tantallon/tantallon-saloon-berth-view.jpg", alt: "The saloon looking forward toward the V-berth cabin through the doorway" },
      { src: "/images/fleet/tantallon/tantallon-saloon-candles.jpg", alt: "A candlelit dinner set-up in the saloon with champagne and tea lights" },
      { src: "/images/fleet/tantallon/tantallon-dinner-setup.jpg", alt: "A romantic dinner set-up below deck with fairy lights, champagne and candles" },
      { src: "/images/fleet/tantallon/tantallon-cabin-berth.jpeg", alt: "The forward V-berth cabin with striped cushions" },
    ],
    videos: [],
    description: [
      "**Tantallon** is a classic, teak-finished cruising sailboat — a proper yacht rather than a day-sailing dinghy, with a genoa on a furler alongside her mainsail and a forward cabin you can actually stand up in. She carries up to **7 guests** and departs from the **Gateway of India** in Colaba, and she is the boat we point people toward when the brief is somewhere between an afternoon sail and a proper evening out on the water.",
      "Below deck, a varnished teak saloon runs either side of a fold-down dining table, with striped cushions, a monogrammed pillow and a genuine **forward V-berth cabin** through the doorway — not a bare cuddy. We regularly set this table up for a **[candlelit dinner](/products/dinner-on-a-yacht)**: tea lights, a champagne bucket and fairy lights along the deckhead, which is a large part of why couples book Tantallon specifically rather than one of the smaller sailboats. Her open bow and cockpit are also a favourite backdrop for **[pre-wedding and couple photoshoots](/products/wedding-photoshoot-on-a-yacht)** — the wide teak deck and tall rig give a photographer plenty to work with.",
      "She is [a sailing yacht rather than a motor yacht](/blog/motor-yacht-or-sailing-yacht), which means the ride is quieter and depends more on the wind than an engine — an auxiliary outboard covers the still days. Families book her for the same reason they book our other sailboats: **[the flatter, more contained deck suits children better](/blog/family-friendly-boating-mumbai-goa)** than a large motor yacht's open sundeck, and at up to 7 guests she comfortably fits a family with grandparents aboard. If you're comparing her against the rest of the fleet for a specific group size, **[our guide to matching group size to boat size](/blog/group-size-boat-size-guide)** covers the trade-offs.",
      "Boarding is by motorboat transfer from the jetty near the Gateway of India — [our guide to Mumbai's departure jetties](/blog/mumbai-harbour-vs-marine-drive-yacht-boarding) covers the boarding point, and [our packing list for a yacht charter](/blog/what-to-pack-for-a-yacht-charter) covers what to wear and bring. The 6–8pm slot is timed for [the best light of a sunset sail](/blog/sunset-cruises-in-mumbai-guide) and is the first one to book out.",
      "No sailing experience is needed — a skipper and deckhand run the boat throughout. Pricing is for the whole boat, not per person; see the full slot pricing below, and message us on WhatsApp with your date, head count and whether you'd like the dinner table set up, for a firm price and the day's exact reporting time.",
    ],
    specs: [
      { label: "Type", value: "Classic cruising sailboat" },
      { label: "Length overall", value: "~30 ft" },
      { label: "Layout", value: "Teak saloon, forward V-berth cabin" },
      { label: "Propulsion", value: "Sail (main & genoa), with an auxiliary outboard" },
      { label: "Guest capacity", value: "7 guests" },
      { label: "Home port", value: "Gateway of India, Mumbai" },
    ],
    pricingSlots: [
      { start: "7:00 AM", end: "9:00 AM", sailing: "1.5 hr private sailing", anchorage: "30 min transfer, both ways", amount: 6000 },
      { start: "9:00 AM", end: "11:00 AM", sailing: "1.5 hr private sailing", anchorage: "30 min transfer, both ways", amount: 6000 },
      { start: "2:00 PM", end: "4:00 PM", sailing: "1.5 hr private sailing", anchorage: "30 min transfer, both ways", amount: 6500 },
      { start: "4:00 PM", end: "6:00 PM", sailing: "1.5 hr private sailing", anchorage: "30 min transfer, both ways", amount: 7000 },
      { start: "6:00 PM", end: "8:00 PM", sailing: "1.5 hr private sailing", anchorage: "30 min transfer, both ways", amount: 7000 },
    ],
    pricingExtras: [
      "Weekend and public holiday slots — ₹500 extra per booking",
      "Candlelit dinner set-up (table, tea lights, decor) — from ₹3,500",
      "Cake on board — ₹950",
      "Flower bouquet on board — ₹850",
    ],
    pricingNote:
      "Prices are for the whole boat, up to 7 guests — not per person. Morning slots are the best value; the 6–8pm sunset slot books out first. Alcohol is not permitted on board this vessel.",
    faqs: [
      {
        q: "How much does it cost to charter Tantallon?",
        a: "From ₹6,000 for the whole boat on a weekday morning slot, up to ₹7,000 for the 6–8pm sunset departure. Weekends and public holidays run ₹500 higher across all slots. See the full pricing above for every departure time.",
      },
      {
        q: "What makes Tantallon different from your other sailboats?",
        a: "She's a full cruising sailboat rather than a day-sailing dinghy — a genoa alongside the mainsail, a teak-finished saloon with a real dining table, and a forward cabin with proper berths. That's why she's the one we recommend for a dinner on board or a photoshoot rather than a quick afternoon sail.",
      },
      {
        q: "Can you set up a candlelit dinner on board?",
        a: "Yes — a table below deck with tea lights, a champagne bucket and fairy lights is one of our most-requested set-ups on this boat. Tell us the occasion when you book and we will quote the decoration and any catering separately.",
      },
      {
        q: "Is Tantallon good for a pre-wedding or couple photoshoot?",
        a: "Yes, her wide teak deck, tall rig and forward cabin give a photographer several distinct backdrops in one charter. Many of our own gallery photos here are from exactly that kind of shoot.",
      },
      {
        q: "Do I need sailing experience?",
        a: "No. A skipper and deckhand sail the boat throughout — you are a guest, not crew, though you are welcome to ask questions if you're curious.",
      },
      {
        q: "Where do we meet, and how do we get to the boat?",
        a: "At the jetty near the Gateway of India in Colaba. A motorboat then carries you out to Tantallon at anchor — allow about fifteen minutes each way, which is why a two-hour slot gives roughly ninety minutes of actual sailing.",
      },
      {
        q: "Is this boat suitable for families with children or grandparents?",
        a: "Yes — the contained deck and the cabin below make her a comfortable choice for a mixed-generation group. Life jackets are carried for every guest and swimming ability is not required.",
      },
      {
        q: "What happens if the weather is bad on our date?",
        a: "The skipper makes the final call on safety grounds. If the coast guard suspends sailing or wind conditions are unsafe, we reschedule your charter to another date at no cost.",
      },
    ],
  },
  {
    /* Saildeck's own boat. Gallery is the operator's real photography — real
       timestamped phone photos from a December 2025 charter, used unedited.
       Several other files that were in this folder (stock manufacturer shots,
       one with a watermark visibly removed, one flagged "AI-generated
       content" by Google Photos, and a competitor's own listing image) were
       deliberately excluded — see the conversation this was built in. Confirm
       exact cabin count and registration before this goes live. */
    slug: "azimut-38-luxury-yacht-mumbai",
    name: "Azimut 38",
    tagline: "A flybridge motor yacht with a proper master cabin — Saildeck's most premium boat.",
    pricePerHour: 25000,
    guests: 12,
    lengthFt: 38,
    cabins: 2,
    crew: 3,
    destinations: ["mumbai"],
    category: "Motor Yacht",
    highlights: ["Flybridge with upper helm", "Master cabin with a round double bed", "Two enclosed cabins"],
    amenities: [
      "Master cabin with round bed",
      "Second guest cabin",
      "Flybridge lounge & upper helm",
      "Enclosed air-conditioned saloon",
      "Galley",
      "Bow sun pad",
    ],
    gallery: [
      { src: "/images/fleet/azimut-38/azimut-38-motor-yacht-mumbai-sunset.jpg", alt: "The Azimut 38 motor yacht at anchor off Mumbai at golden hour" },
      { src: "/images/fleet/azimut-38/azimut-38-yacht-charter-mumbai-hull-nameplate.jpg", alt: "Close-up of the AZIMUT nameplate on the bow underway" },
      { src: "/images/fleet/azimut-38/azimut-38-luxury-yacht-mumbai-bow-deck.jpg", alt: "The foredeck and teak trim viewed from the flybridge underway" },
      { src: "/images/fleet/azimut-38/azimut-38-yacht-mumbai-flybridge-helm.jpg", alt: "The upper helm on the flybridge with the captain at the wheel" },
      { src: "/images/fleet/azimut-38/azimut-38-yacht-mumbai-flybridge-lounge.jpg", alt: "Flybridge lounge seating and the upper helm station" },
      { src: "/images/fleet/azimut-38/azimut-38-yacht-mumbai-deck-detail-6.jpg", alt: "The bow sun pad and foredeck seating" },
      { src: "/images/fleet/azimut-38/azimut-38-yacht-charter-mumbai-saloon-window.jpg", alt: "The enclosed saloon interior looking out through the side window" },
      { src: "/images/fleet/azimut-38/azimut-38-yacht-mumbai-saloon-lounge.jpg", alt: "The U-shaped saloon lounge, dining table and lower helm" },
      { src: "/images/fleet/azimut-38/azimut-38-yacht-mumbai-saloon-galley.jpg", alt: "The saloon galley with sink and worktop" },
      { src: "/images/fleet/azimut-38/azimut-38-yacht-mumbai-saloon-table.jpg", alt: "The saloon dining table and wraparound seating" },
      { src: "/images/fleet/azimut-38/azimut-38-yacht-mumbai-master-cabin-bed.jpg", alt: "The master cabin's round double bed with mood lighting" },
      { src: "/images/fleet/azimut-38/azimut-38-yacht-mumbai-guest-cabin-berth.jpg", alt: "The second guest cabin with berths and storage" },
      { src: "/images/fleet/azimut-38/azimut-38-yacht-mumbai-side-deck-crew.jpg", alt: "A crew member on the side deck as the yacht gets under way" },
      { src: "/images/fleet/azimut-38/azimut-38-yacht-mumbai-helm-dashboard.jpg", alt: "The overhead view of the lower helm and bow rail" },
      { src: "/images/fleet/azimut-38/azimut-38-yacht-mumbai-deck-detail-1.jpg", alt: "Deck detail aboard the Azimut 38 during a Mumbai charter" },
      { src: "/images/fleet/azimut-38/azimut-38-yacht-mumbai-deck-detail-2.jpg", alt: "Deck detail aboard the Azimut 38 during a Mumbai charter" },
      { src: "/images/fleet/azimut-38/azimut-38-yacht-mumbai-deck-detail-3.jpg", alt: "Deck detail aboard the Azimut 38 during a Mumbai charter" },
      { src: "/images/fleet/azimut-38/azimut-38-yacht-mumbai-deck-detail-4.jpg", alt: "Deck detail aboard the Azimut 38 during a Mumbai charter" },
      { src: "/images/fleet/azimut-38/azimut-38-yacht-mumbai-deck-detail-5.jpg", alt: "Deck detail aboard the Azimut 38 during a Mumbai charter" },
    ],
    videos: [],
    description: [
      "The **Azimut 38** is the most premium boat in the Saildeck fleet — a 38-foot Italian-built flybridge motor yacht with a genuine **master cabin**, not a curtained-off berth. Below deck she has two full cabins, including a master with a round double bed and mood lighting, and an enclosed, air-conditioned saloon with a proper galley and dining table. She carries up to **12 guests** and departs from the **Gateway of India** in Colaba.",
      "The flybridge is what sets her apart on the water: a second helm station up top with its own lounge seating, so the captain can run the boat from open air while guests spread across three distinct decks — the bow sun pad, the flybridge lounge and the aft cockpit — rather than sharing one. It's [a motor yacht rather than a sailing yacht](/blog/motor-yacht-or-sailing-yacht), which means a smoother, faster ride and an enclosed saloon to retreat to if the weather turns.",
      "This is the boat we put forward for a **[corporate charter](/blog/corporate-yacht-charters-india)** that needs to look the part, or a celebration where guests want real cabins rather than open deck seating — the round-bed master cabin in particular gets requested for anniversaries and proposals. At 12 guests she sits comfortably above our sailboats for **[group size](/blog/group-size-boat-size-guide)**, without stepping up to the full 25–30 guest flagship.",
      "Boarding is by tender from the jetty near the Gateway of India. Pricing is for the whole boat, not per person; message us on WhatsApp with your date and head count for a firm price. The [sunset slot](/blog/sunset-cruises-in-mumbai-guide) is the one most people ask for first on this boat, given the flybridge view.",
    ],
    specs: [
      { label: "Builder", value: "Azimut" },
      { label: "Length overall", value: "38 ft" },
      { label: "Layout", value: "2 cabins, flybridge, enclosed saloon" },
      { label: "Guest capacity", value: "12 guests" },
      { label: "Home port", value: "Gateway of India, Mumbai" },
      { label: "Registration", value: "Commercial passenger licence" },
    ],
    pricingSlots: [
      { start: "7:00 AM", end: "9:00 AM", sailing: "1 hour cruising", anchorage: "1 hour anchorage", amount: 25000 },
      { start: "9:00 AM", end: "11:00 AM", sailing: "1 hour cruising", anchorage: "1 hour anchorage", amount: 25000 },
      { start: "2:00 PM", end: "4:00 PM", sailing: "1 hour cruising", anchorage: "1 hour anchorage", amount: 28000 },
      { start: "4:00 PM", end: "6:00 PM", sailing: "1 hour cruising", anchorage: "1 hour anchorage", amount: 32000 },
      { start: "6:00 PM", end: "8:00 PM", sailing: "1 hour cruising", anchorage: "1 hour anchorage", amount: 32000 },
    ],
    pricingExtras: [
      "Additional hour — ₹15,000",
      "Overnight anchorage (9 am to 7 am) — ₹95,000",
      "Gateway of India to Mandwa, return journey — ₹40,000",
      "Photoshoot on board (per hour) — ₹18,000",
    ],
    pricingNote: "Special permissions are required for overnight sailing.",
    faqs: [
      {
        q: "How much does it cost to charter the Azimut 38?",
        a: "Two-hour slots run from ₹25,000 to ₹32,000 depending on the time of day, with sunset slots priced highest. See the pricing table above for every departure time. An additional hour, overnight anchorage and on-board photoshoots are all quoted separately.",
      },
      ...standardFaqs("Azimut 38", 12),
      {
        q: "Does the Azimut 38 have real cabins, not just a curtained berth?",
        a: "Yes — two full cabins, including a master cabin with a round double bed. She is the only boat in our fleet built for an overnight stay rather than just a day charter.",
      },
      {
        q: "What makes the flybridge worth it?",
        a: "A second helm and lounge up top means guests are not all sharing one deck — some can be on the bow sun pad, some on the flybridge, some in the air-conditioned saloon, all at once. It also gives the best vantage point on the boat for a sunset departure.",
      },
    ],
  },
  {
    /* Saildeck's own boat. Gallery is the operator's real photography, used
       unedited — genuine charter photos, though older (2022) and lower
       resolution than the rest of the fleet's recent shoots. Confirm exact
       cabin count and registration before this goes live. */
    slug: "feeling-nauti-31-foot-sailing-yacht-mumbai",
    name: "Feeling Nauti",
    tagline: "A 31-foot sailing yacht for up to 10 guests — a regular pick for group celebrations.",
    pricePerHour: 2800,
    guests: 10,
    lengthFt: 31,
    cabins: 1,
    crew: 2,
    destinations: ["mumbai"],
    category: "Sailing Yacht",
    highlights: ["31ft sailing yacht", "Up to 10 guests", "A regular for bachelorette & group charters"],
    amenities: [
      "Private sailboat & skipper",
      "Open foredeck seating",
      "Below-deck cabin",
      "Life jackets for every guest",
      "Auxiliary outboard motor",
      "Decoration on request",
    ],
    gallery: [
      { src: "/images/fleet/feeling-nauti/feeling-nauti-31-foot-sailing-yacht-mumbai-bow-underway.jpg", alt: "Feeling Nauti's bow under sail with the Mumbai coastline behind" },
      { src: "/images/fleet/feeling-nauti/feeling-nauti-sailing-yacht-mumbai-group-charter.jpg", alt: "A large group of guests in matching red seated along the deck under sail" },
      { src: "/images/fleet/feeling-nauti/feeling-nauti-10-pax-sailing-yacht-mumbai-guests-red.jpg", alt: "Two guests seated at the bow with other boats moored in the background" },
      { src: "/images/fleet/feeling-nauti/feeling-nauti-sailing-yacht-mumbai-bachelorette-toast.jpg", alt: "A guest raising a toast on deck during a bachelorette charter" },
      { src: "/images/fleet/feeling-nauti/feeling-nauti-sailing-yacht-charter-mumbai-deck-balloons.jpg", alt: "The foredeck decorated with red heart balloons for a celebration" },
    ],
    videos: [],
    description: [
      "**Feeling Nauti** is a 31-foot sailing yacht that regularly carries larger celebration groups — up to **10 guests** — from the **Gateway of India** in Colaba. She has been one of Saildeck's most-booked boats for **[bachelorette parties and birthdays](/blog/bachelorette-birthday-parties-on-a-yacht)** specifically, and her wide foredeck cushioning is built for a group to sit together rather than spread out along narrow side decks.",
      "Below deck there is a cabin for shelter and storage, and on deck an auxiliary outboard covers the still days alongside her sail. At 10 guests she sits in the middle of our fleet for **[group size](/blog/group-size-boat-size-guide)** — bigger than our smaller day-sailors, more intimate than the large motor yachts.",
      "Boarding is by tender from the jetty near the Gateway of India. No sailing experience is needed — a skipper and deckhand run the boat throughout. Pricing is for the whole boat, not per person; message us on WhatsApp with your date, group size and occasion for a firm price and, if you'd like, a decoration quote.",
    ],
    specs: [
      { label: "Type", value: "Sailing yacht" },
      { label: "Length overall", value: "31 ft" },
      { label: "Layout", value: "Open foredeck, cabin below" },
      { label: "Guest capacity", value: "10 guests" },
      { label: "Home port", value: "Gateway of India, Mumbai" },
      { label: "Registration", value: "Commercial passenger licence" },
    ],
    pricingSlots: [
      { start: "7:00 AM", end: "9:00 AM", sailing: "1.5 hr private sailing", anchorage: "30 min transfer, both ways", amount: 5500 },
      { start: "9:00 AM", end: "11:00 AM", sailing: "1.5 hr private sailing", anchorage: "30 min transfer, both ways", amount: 5500 },
      { start: "2:00 PM", end: "4:00 PM", sailing: "1.5 hr private sailing", anchorage: "30 min transfer, both ways", amount: 6000 },
      { start: "4:00 PM", end: "6:00 PM", sailing: "1.5 hr private sailing", anchorage: "30 min transfer, both ways", amount: 6500 },
      { start: "6:00 PM", end: "8:00 PM", sailing: "1.5 hr private sailing", anchorage: "30 min transfer, both ways", amount: 6500 },
    ],
    pricingExtras: [
      "Weekend and public holiday slots — ₹500 extra per booking",
      "Balloon & deck decoration — from ₹2,500",
      "Cake on board — ₹950",
      "Flower bouquet on board — ₹850",
    ],
    pricingNote:
      "Prices are for the whole boat, up to 10 guests — not per person. Morning slots are the best value; the 6–8pm sunset slot books out first. Alcohol is not permitted on board this vessel.",
    faqs: [
      {
        q: "How much does Feeling Nauti cost to charter?",
        a: "From ₹5,500 for the whole boat on a weekday morning slot, up to ₹6,500 for the 6–8pm sunset departure. Weekends and public holidays run ₹500 higher across all slots.",
      },
      ...standardFaqs("Feeling Nauti", 10),
      {
        q: "Is this a good boat for a bachelorette or birthday group?",
        a: "Yes — it's one of the boats we recommend most for exactly that. The wide foredeck seats a group together, and we regularly decorate the deck with balloons for the occasion.",
      },
    ],
  },
  {
    /* Saildeck's own boat. Gallery mixes genuine charter photos with a
       styled promotional shoot (same boat, same teak deck and "Flo"
       nameplate confirmed against the customer photos) — both are real
       photography of this vessel, used unedited. Confirm exact registration
       before this goes live. */
    slug: "flo-31-foot-sailing-yacht-mumbai",
    name: "Flo",
    tagline: "A 31-foot Jeanneau sailing yacht for up to 8 guests, popular for proposals and birthdays.",
    pricePerHour: 2800,
    guests: 8,
    lengthFt: 31,
    cabins: 1,
    crew: 2,
    destinations: ["mumbai"],
    category: "Sailing Yacht",
    highlights: ["31ft Jeanneau sailing yacht", "Up to 8 guests", "A regular for proposals & birthdays"],
    amenities: [
      "Private sailboat & skipper",
      "Below-deck cabin & saloon",
      "Life jackets for every guest",
      "Auxiliary outboard motor",
      "Proposal & birthday decoration on request",
      "Open bow & cockpit seating",
    ],
    gallery: [
      { src: "/images/fleet/flo-31-foot/flo-31-foot-sailing-yacht-mumbai-under-sail.jpg", alt: "Flo under sail with her nameplate visible on the bow" },
      { src: "/images/fleet/flo-31-foot/flo-sailing-yacht-mumbai-cabin-interior.jpg", alt: "A father and son seated at the bow with the Jeanneau sail cover visible" },
      { src: "/images/fleet/flo-31-foot/flo-sailing-yacht-mumbai-guests-underway.jpg", alt: "A group of guests seated along the deck as Flo gets under way" },
      { src: "/images/fleet/flo-31-foot/flo-sailing-yacht-mumbai-couple-guitar.jpg", alt: "A couple relaxing on deck, one playing guitar, under sail" },
      { src: "/images/fleet/flo-31-foot/flo-sailing-yacht-mumbai-couple-bow.jpg", alt: "A couple posed at the bow with the Mumbai coastline behind" },
      { src: "/images/fleet/flo-31-foot/flo-31-foot-sailing-yacht-mumbai-bow-couple.jpg", alt: "A guest standing at the bow rail against a clear sky" },
      { src: "/images/fleet/flo-31-foot/flo-sailing-yacht-mumbai-flowers-cabin.jpg", alt: "A guest holding a flower bouquet in the below-deck saloon" },
      { src: "/images/fleet/flo-31-foot/flo-sailing-yacht-mumbai-proposal-decor.jpg", alt: "A rose-petal proposal message laid out on the saloon table" },
      { src: "/images/fleet/flo-31-foot/flo-sailing-yacht-mumbai-birthday-decor.jpg", alt: "Balloons and a happy birthday banner decorating the saloon" },
      { src: "/images/fleet/flo-31-foot/flo-sailing-yacht-mumbai-birthday-cake-petals.jpg", alt: "A birthday cake set on a heart of rose petals in the saloon" },
    ],
    videos: [],
    description: [
      "**Flo** is a 31-foot Jeanneau sailing yacht that carries up to **8 guests** from the **Gateway of India** in Colaba. She has become one of Saildeck's regular choices for **[proposals](/blog/how-to-plan-a-proposal-on-a-yacht)** and **[birthdays](/blog/bachelorette-birthday-parties-on-a-yacht)** specifically — the below-deck saloon gives a private spot to lay out a rose-petal message or a decorated cake away from the open deck.",
      "On deck, the cockpit and bow seat a group of eight comfortably for a straightforward sail, and an auxiliary outboard covers the still days alongside her sail. Below deck there is a cabin and saloon table, which is also where we set up any decoration you've arranged in advance.",
      "She suits **[families with children](/blog/family-friendly-boating-mumbai-goa)** as well as couples — her deck is a manageable size to keep an eye on everyone without the boat feeling crowded at 8 guests. Boarding is by tender from the jetty near the Gateway of India. No sailing experience is needed — a skipper and deckhand run the boat throughout; message us on WhatsApp with your date, group size and occasion for a firm price.",
    ],
    specs: [
      { label: "Builder", value: "Jeanneau" },
      { label: "Length overall", value: "31 ft" },
      { label: "Layout", value: "Cabin & saloon below, open cockpit" },
      { label: "Guest capacity", value: "8 guests" },
      { label: "Home port", value: "Gateway of India, Mumbai" },
      { label: "Registration", value: "Commercial passenger licence" },
    ],
    pricingSlots: [
      { start: "7:00 AM", end: "9:00 AM", sailing: "1.5 hr private sailing", anchorage: "30 min transfer, both ways", amount: 5000 },
      { start: "9:00 AM", end: "11:00 AM", sailing: "1.5 hr private sailing", anchorage: "30 min transfer, both ways", amount: 5000 },
      { start: "2:00 PM", end: "4:00 PM", sailing: "1.5 hr private sailing", anchorage: "30 min transfer, both ways", amount: 5500 },
      { start: "4:00 PM", end: "6:00 PM", sailing: "1.5 hr private sailing", anchorage: "30 min transfer, both ways", amount: 6000 },
      { start: "6:00 PM", end: "8:00 PM", sailing: "1.5 hr private sailing", anchorage: "30 min transfer, both ways", amount: 6000 },
    ],
    pricingExtras: [
      "Weekend and public holiday slots — ₹500 extra per booking",
      "Proposal or birthday decoration — from ₹2,500",
      "Cake on board — ₹950",
      "Flower bouquet on board — ₹850",
    ],
    pricingNote:
      "Prices are for the whole boat, up to 8 guests — not per person. Morning slots are the best value; the 6–8pm sunset slot books out first. Alcohol is not permitted on board this vessel.",
    faqs: [
      {
        q: "How much does it cost to charter Flo?",
        a: "From ₹5,000 for the whole boat on a weekday morning slot, up to ₹6,000 for the 6–8pm sunset departure. Weekends and public holidays run ₹500 higher across all slots.",
      },
      ...standardFaqs("Flo", 8),
      {
        q: "Can you set up a proposal or birthday decoration on Flo?",
        a: "Yes — rose petals, balloons and a cake in the below-deck saloon are all things we've arranged on this boat before. Tell us the occasion and any names or details when you book.",
      },
    ],
  },
  {
    /* Saildeck's own boat, named "Nauti by nature" (registration RJP-IV-00257).
       This folder also contained photos of a completely different Hanse —
       "Peace & Plenty" — and a set of Hanse manufacturer stock/catalog shots;
       both were excluded, only genuine photos of this actual vessel are used,
       unedited. Confirm exact registration before this goes live. */
    slug: "hanse-33-sailing-yacht-mumbai",
    name: "Nauti by Nature",
    tagline: "A 33-foot Hanse sailing yacht for up to 12 guests, with a real cabin below.",
    pricePerHour: 3200,
    guests: 12,
    lengthFt: 33,
    cabins: 1,
    crew: 2,
    destinations: ["mumbai"],
    category: "Sailing Yacht",
    highlights: ["33ft Hanse sailing yacht", "Up to 12 guests", "Forward cabin with real berths"],
    amenities: [
      "Private sailboat & skipper",
      "Forward cabin with berths",
      "Saloon with dining table & galley",
      "Life jackets for every guest",
      "Auxiliary outboard motor",
      "Decoration on request",
    ],
    gallery: [
      { src: "/images/fleet/hanse-33/hanse-33-sailing-yacht-mumbai-nauti-by-nature-under-sail.jpg", alt: "Nauti by Nature under sail with her name visible on the stern" },
      { src: "/images/fleet/hanse-33/hanse-33-cruising-yacht-mumbai-side-profile.jpg", alt: "The Hanse 33's side profile at anchor with guests aboard" },
      { src: "/images/fleet/hanse-33/hanse-33-sailing-yacht-mumbai-family-group-sailing.jpg", alt: "A large family group in life jackets seated along the deck under sail" },
      { src: "/images/fleet/hanse-33/hanse-33-sailing-yacht-mumbai-saloon-pizza-party.jpg", alt: "Pizza and snacks laid out on the saloon table decorated with balloons" },
      { src: "/images/fleet/hanse-33/hanse-33-sailing-yacht-mumbai-saloon-proposal-decor.jpg", alt: "A Marry Me proposal set-up in the saloon with heart balloons and roses" },
      { src: "/images/fleet/hanse-33/hanse-33-sailing-yacht-mumbai-saloon-birthday-decor.jpg", alt: "A happy birthday balloon display in the saloon" },
      { src: "/images/fleet/hanse-33/hanse-33-sailing-yacht-mumbai-forward-cabin-berth.jpg", alt: "The forward cabin with a made-up berth and towels" },
      { src: "/images/fleet/hanse-33/hanse-33-sailing-yacht-mumbai-galley-passage.jpg", alt: "The galley and passage leading to the forward cabin" },
    ],
    videos: [],
    description: [
      "**Nauti by Nature** is a 33-foot Hanse sailing yacht that carries up to **12 guests** from the **Gateway of India** in Colaba — one of the larger sailboats in the Saildeck fleet, and one of the few with a genuine forward cabin rather than a bare storage cuddy. Below deck there's a made-up berth, a galley and a saloon dining table that regularly gets set up for a celebration.",
      "This is the boat with the widest track record for on-board decoration in our fleet: we've turned her saloon into a **[proposal](/blog/how-to-plan-a-proposal-on-a-yacht)** set-up with roses and a Marry Me banner, a **[birthday](/blog/bachelorette-birthday-parties-on-a-yacht)** with balloons, and a casual pizza party for a group of friends. At 12 guests she also suits a **[larger family charter](/blog/family-friendly-boating-mumbai-goa)** with room to spread across the deck and the saloon.",
      "Boarding is by tender from the jetty near the Gateway of India. No sailing experience is needed — a skipper and deckhand run the boat throughout. Pricing is for the whole boat, not per person; message us on WhatsApp with your date, group size and occasion for a firm price and, if you'd like, a decoration quote.",
    ],
    specs: [
      { label: "Builder", value: "Hanse" },
      { label: "Length overall", value: "33 ft" },
      { label: "Layout", value: "Forward cabin, saloon, galley" },
      { label: "Guest capacity", value: "12 guests" },
      { label: "Home port", value: "Gateway of India, Mumbai" },
      { label: "Registration", value: "Commercial passenger licence" },
    ],
    pricingSlots: [
      { start: "7:00 AM", end: "9:00 AM", sailing: "1.5 hr private sailing", anchorage: "30 min transfer, both ways", amount: 6000 },
      { start: "9:00 AM", end: "11:00 AM", sailing: "1.5 hr private sailing", anchorage: "30 min transfer, both ways", amount: 6000 },
      { start: "2:00 PM", end: "4:00 PM", sailing: "1.5 hr private sailing", anchorage: "30 min transfer, both ways", amount: 6500 },
      { start: "4:00 PM", end: "6:00 PM", sailing: "1.5 hr private sailing", anchorage: "30 min transfer, both ways", amount: 7000 },
      { start: "6:00 PM", end: "8:00 PM", sailing: "1.5 hr private sailing", anchorage: "30 min transfer, both ways", amount: 7000 },
    ],
    pricingExtras: [
      "Weekend and public holiday slots — ₹500 extra per booking",
      "Proposal, birthday or party decoration — from ₹2,500",
      "Cake on board — ₹950",
      "Flower bouquet on board — ₹850",
    ],
    pricingNote:
      "Prices are for the whole boat, up to 12 guests — not per person. Morning slots are the best value; the 6–8pm sunset slot books out first. Alcohol is not permitted on board this vessel.",
    faqs: [
      {
        q: "How much does it cost to charter Nauti by Nature?",
        a: "From ₹6,000 for the whole boat on a weekday morning slot, up to ₹7,000 for the 6–8pm sunset departure. Weekends and public holidays run ₹500 higher across all slots.",
      },
      ...standardFaqs("Nauti by Nature", 12),
      {
        q: "Does this boat have a real cabin, not just a cuddy?",
        a: "Yes — a forward cabin with a made-up berth, plus a saloon and galley. It's one of the more comfortable sailboats in our fleet for a longer charter or a celebration that needs a private space below deck.",
      },
    ],
  },
  {
    /* Saildeck's own boat, named "Playboy" (hull lettering confirmed). This
       folder also contained several hex-filename photos of a completely
       different boat named "Pari" — excluded. Only genuine photos of this
       actual vessel are used, unedited. Confirm exact registration and
       length before this goes live. */
    slug: "jj-yacht-playboy-7-pax-sailing-yacht-mumbai",
    name: "Playboy",
    tagline: "A private sailboat for up to 7 guests, a regular pick for anniversaries and proposals.",
    pricePerHour: 2600,
    guests: 7,
    lengthFt: 26,
    cabins: 0,
    crew: 1,
    destinations: ["mumbai"],
    category: "Sailing Yacht",
    highlights: ["Private charter, up to 7 guests", "A regular for anniversaries & proposals", "Departs the Gateway of India"],
    amenities: [
      "Private sailboat & skipper",
      "Motorboat transfer, both ways",
      "Life jackets for every guest",
      "Open deck seating",
      "Anniversary & proposal decoration on request",
      "Cuddy for shade & storage",
    ],
    gallery: [
      { src: "/images/fleet/jj-yacht-playboy/jj-yacht-playboy-7-pax-sailing-yacht-mumbai-hull-couple.jpeg", alt: "A couple seated on the bow with the Playboy nameplate and Mumbai skyline behind" },
      { src: "/images/fleet/jj-yacht-playboy/jj-yacht-playboy-sailing-yacht-mumbai-anniversary-couple.jpeg", alt: "A couple seated at the bow beside a happy anniversary balloon display" },
      { src: "/images/fleet/jj-yacht-playboy/jj-yacht-playboy-sailing-yacht-mumbai-roses-snacks.jpg", alt: "Roses, snacks and drinks laid out for a celebration under an I Love You balloon" },
      { src: "/images/fleet/jj-yacht-playboy/jj-yacht-playboy-sailing-yacht-mumbai-bow-flowers.jpg", alt: "A guest seated at the flower-decorated bow under sail" },
    ],
    videos: [],
    description: [
      "**Playboy** is a private sailboat for up to **7 guests**, departing from the **Gateway of India** in Colaba. She has become a regular pick for **[anniversaries and proposals](/blog/how-to-plan-a-proposal-on-a-yacht)** — her bow decorates well with roses and ribbon, and her modest size keeps the moment feeling private rather than staged.",
      "On deck, open seating around the bow and cockpit suits a small group comfortably, with a cuddy below for shade and storage. No sailing experience is needed — a skipper runs the boat throughout, and decoration, a cake or a flower bouquet can all be arranged ahead of boarding.",
      "Boarding is by motorboat transfer from the jetty near the Gateway of India. Pricing is for the whole boat, not per person; message us on WhatsApp with your date, group size and occasion for a firm price and a decoration quote if you'd like one.",
    ],
    specs: [
      { label: "Type", value: "Sailing yacht" },
      { label: "Length overall", value: "~26 ft" },
      { label: "Layout", value: "Open deck, cuddy below" },
      { label: "Guest capacity", value: "7 guests" },
      { label: "Home port", value: "Gateway of India, Mumbai" },
      { label: "Registration", value: "Commercial passenger licence" },
    ],
    pricingSlots: [
      { start: "7:00 AM", end: "9:00 AM", sailing: "1.5 hr private sailing", anchorage: "30 min transfer, both ways", amount: 4500 },
      { start: "9:00 AM", end: "11:00 AM", sailing: "1.5 hr private sailing", anchorage: "30 min transfer, both ways", amount: 4500 },
      { start: "2:00 PM", end: "4:00 PM", sailing: "1.5 hr private sailing", anchorage: "30 min transfer, both ways", amount: 5000 },
      { start: "4:00 PM", end: "6:00 PM", sailing: "1.5 hr private sailing", anchorage: "30 min transfer, both ways", amount: 5500 },
      { start: "6:00 PM", end: "8:00 PM", sailing: "1.5 hr private sailing", anchorage: "30 min transfer, both ways", amount: 5500 },
    ],
    pricingExtras: [
      "Weekend and public holiday slots — ₹500 extra per booking",
      "Anniversary or proposal decoration — from ₹2,500",
      "Cake on board — ₹950",
      "Flower bouquet on board — ₹850",
    ],
    pricingNote:
      "Prices are for the whole boat, up to 7 guests — not per person. Morning slots are the best value; the 6–8pm sunset slot books out first. Alcohol is not permitted on board this vessel.",
    faqs: [
      {
        q: "How much does it cost to charter Playboy?",
        a: "From ₹4,500 for the whole boat on a weekday morning slot, up to ₹5,500 for the 6–8pm sunset departure. Weekends and public holidays run ₹500 higher across all slots.",
      },
      ...standardFaqs("Playboy", 7),
      {
        q: "Is this a good boat for a proposal or anniversary?",
        a: "Yes — it's one of the boats we recommend most for exactly that. Roses, ribbon and balloon decoration on the bow are all things we've arranged on this boat before.",
      },
    ],
  },
  {
    /* Saildeck's own boat, based on the Mandovi in Goa — the only boat
       currently giving Goa a real home fleet rather than the partner-operator
       fallback. Gallery is genuine photography, used unedited; one photo in
       this folder showed a different, Mumbai-based boat and was excluded.
       Confirm exact registration and length before this goes live. */
    slug: "joan-of-arc-12-pax-cruising-yacht-goa",
    name: "Joan of Arc",
    tagline: "A flybridge cruising motor yacht on the Mandovi, for up to 12 guests.",
    pricePerHour: 12000,
    guests: 12,
    lengthFt: 42,
    cabins: 1,
    crew: 3,
    destinations: ["goa"],
    category: "Motor Yacht",
    highlights: ["Flybridge motor yacht", "Ensuite marble bathroom", "Based on the Mandovi, Goa"],
    amenities: [
      "Flybridge with Bimini shade",
      "Foredeck sun pad",
      "Ensuite marble bathroom",
      "Life jackets for every guest",
      "Enclosed saloon",
      "Catering on request",
    ],
    gallery: [
      { src: "/images/fleet/joan-of-arc/joan-of-arc-12-pax-cruising-yacht-goa-side-profile.jpg", alt: "Joan of Arc's side profile with her nameplate, moored on the Mandovi" },
      { src: "/images/fleet/joan-of-arc/joan-of-arc-cruising-yacht-goa-mandovi-river-view.jpg", alt: "The foredeck sun pad with the Mandovi riverbank and palm trees behind" },
      { src: "/images/fleet/joan-of-arc/joan-of-arc-cruising-yacht-goa-bow-mooring.jpg", alt: "The bow moored against a Goan riverbank lined with palm trees" },
      { src: "/images/fleet/joan-of-arc/joan-of-arc-cruising-yacht-goa-foredeck-sunpad.jpg", alt: "The foredeck sun pad and rail looking out over the river" },
      { src: "/images/fleet/joan-of-arc/joan-of-arc-cruising-yacht-goa-ensuite-bathroom.jpg", alt: "The ensuite marble bathroom with a rain shower and vanity" },
    ],
    videos: [],
    description: [
      "**Joan of Arc** is a flybridge cruising motor yacht based on the **Mandovi river** in Goa, carrying up to **12 guests** with a marble ensuite bathroom on board — a genuine step up from an open day boat. The foredeck sun pad and the shaded flybridge give guests two very different ways to spend the afternoon on the same charter.",
      "She is the boat we put forward for **[first-time visitors to Goa](/blog/yachting-in-goa-first-timers-guide)** who want a comfortable, guided introduction to the water, and for groups heading out toward **[Grande Island for snorkelling](/blog/grande-island-goa-snorkelling-diving)** or a run along the coast to see **[Goa's best beaches from the water](/blog/best-beaches-by-boat-in-goa)**. Sightings on the river-mouth routes are common — see our guide to **[dolphin watching in Goa](/blog/dolphin-watching-in-goa)** for when your odds are best.",
      "Boarding is arranged from a jetty on the Mandovi. Pricing is for the whole boat, not per person; message us on WhatsApp with your date and group size for a firm price. She also suits a **[corporate day out](/blog/corporate-yacht-charters-india)** that needs to look the part without leaving Goa.",
    ],
    specs: [
      { label: "Type", value: "Flybridge motor yacht" },
      { label: "Length overall", value: "~42 ft" },
      { label: "Layout", value: "Saloon, ensuite bathroom, flybridge" },
      { label: "Guest capacity", value: "12 guests" },
      { label: "Home port", value: "Mandovi river, Goa" },
      { label: "Registration", value: "Commercial passenger licence" },
    ],
    pricingSlots: [
      { start: "7:00 AM", end: "9:00 AM", sailing: "1 hour cruising", anchorage: "1 hour anchorage", amount: 12000 },
      { start: "9:00 AM", end: "11:00 AM", sailing: "1 hour cruising", anchorage: "1 hour anchorage", amount: 12000 },
      { start: "2:00 PM", end: "4:00 PM", sailing: "1 hour cruising", anchorage: "1 hour anchorage", amount: 14000 },
      { start: "4:00 PM", end: "6:00 PM", sailing: "1 hour cruising", anchorage: "1 hour anchorage", amount: 16000 },
      { start: "6:00 PM", end: "8:00 PM", sailing: "1 hour cruising", anchorage: "1 hour anchorage", amount: 16000 },
    ],
    pricingExtras: [
      "Additional hour — ₹8,000",
      "Grande Island run, return journey — ₹22,000",
      "Catering (per guest) — from ₹800",
      "Photoshoot on board (per hour) — ₹12,000",
    ],
    pricingNote: "Special permissions are required for overnight anchorage.",
    faqs: [
      {
        q: "How much does it cost to charter Joan of Arc?",
        a: "Two-hour slots run from ₹12,000 to ₹16,000 depending on the time of day, with sunset slots priced highest. See the pricing table above for every departure time. An additional hour, the Grande Island run and catering are all quoted separately.",
      },
      ...standardFaqs("Joan of Arc", 12),
      {
        q: "Does this boat go out to Grande Island?",
        a: "Yes — it's one of the most requested add-ons, quoted as a return journey on top of the base charter. Tell us if snorkelling is the plan and we will confirm timing around the tide.",
      },
    ],
  },
  {
    /* Saildeck's own boat. Gallery is genuine photography, used unedited.
       Confirm exact cabin count, crew size and registration before this goes
       live — a 54ft Lagoon typically has multiple cabins, but that has not
       been confirmed against this specific vessel's layout. */
    slug: "lagoon-54-luxury-catamaran-mumbai",
    name: "Lagoon 54",
    tagline: "A 54-foot luxury sailing catamaran for large groups, up to 35 guests.",
    pricePerHour: 30000,
    guests: 35,
    lengthFt: 54,
    cabins: 3,
    crew: 4,
    destinations: ["mumbai"],
    category: "Catamaran",
    highlights: ["54ft luxury sailing catamaran", "Up to 35 guests", "Flybridge lounge & spacious aft cockpit"],
    amenities: [
      "Flybridge lounge",
      "Spacious aft cockpit seating",
      "Enclosed saloon",
      "Multiple cabins below deck",
      "Life jackets for every guest",
      "Catering on request",
    ],
    gallery: [
      { src: "/images/fleet/lagoon-54/lagoon-54-luxury-catamaran-mumbai-side-profile-skyline.webp", alt: "The Lagoon 54 catamaran at anchor with the Mumbai skyline and Taj Mahal Palace behind" },
      { src: "/images/fleet/lagoon-54/lagoon-54-sailing-catamaran-mumbai-crew-mast.webp", alt: "Crew working the mast on the Lagoon 54 under a clear sky" },
      { src: "/images/fleet/lagoon-54/lagoon-54-luxury-yacht-mumbai-aft-cockpit-lounge.webp", alt: "The shaded flybridge lounge looking aft over the water" },
      { src: "/images/fleet/lagoon-54/lagoon-54-catamaran-mumbai-aft-deck-seating.jpg", alt: "The wide aft cockpit deck with built-in bench seating" },
      { src: "/images/fleet/lagoon-54/lagoon-54-catamaran-mumbai-flybridge-saloon-view.jpg", alt: "The aft deck looking toward the enclosed saloon and spiral staircase" },
    ],
    videos: [],
    description: [
      "The **Lagoon 54** is the biggest sailing catamaran in the Saildeck fleet — a 54-foot luxury multihull carrying up to **35 guests**, departing from the **Gateway of India** in Colaba. A twin-hull this size gives an exceptionally stable, wide deck, which is exactly why groups this large book her over anything else in our roster.",
      "The layout runs across three distinct levels: a shaded flybridge lounge up top, a wide aft cockpit with built-in seating, and an enclosed saloon reached by a spiral staircase, with multiple cabins below deck. It's the boat we put forward for a **[large corporate offsite](/blog/corporate-yacht-charters-india)** or a milestone celebration where the guest list runs into the dozens — see our **[guide to group size and boat size](/blog/group-size-boat-size-guide)** if you're deciding between her and a smaller boat.",
      "Boarding is by tender from the jetty near the Gateway of India. Pricing is for the whole boat, not per person; message us on WhatsApp with your date and head count for a firm price and a catering quote if you need one.",
    ],
    specs: [
      { label: "Builder", value: "Lagoon" },
      { label: "Length overall", value: "54 ft" },
      { label: "Layout", value: "Flybridge, saloon, multiple cabins" },
      { label: "Guest capacity", value: "35 guests" },
      { label: "Home port", value: "Gateway of India, Mumbai" },
      { label: "Registration", value: "Commercial passenger licence" },
    ],
    pricingSlots: [
      { start: "7:00 AM", end: "9:00 AM", sailing: "1 hour cruising", anchorage: "1 hour anchorage", amount: 30000 },
      { start: "9:00 AM", end: "11:00 AM", sailing: "1 hour cruising", anchorage: "1 hour anchorage", amount: 30000 },
      { start: "2:00 PM", end: "4:00 PM", sailing: "1 hour cruising", anchorage: "1 hour anchorage", amount: 34000 },
      { start: "4:00 PM", end: "6:00 PM", sailing: "1 hour cruising", anchorage: "1 hour anchorage", amount: 38000 },
      { start: "6:00 PM", end: "8:00 PM", sailing: "1 hour cruising", anchorage: "1 hour anchorage", amount: 38000 },
    ],
    pricingExtras: [
      "Additional hour — ₹18,000",
      "Overnight anchorage (9 am to 7 am) — ₹1,10,000",
      "Gateway of India to Mandwa, return journey — ₹45,000",
      "Catering (per guest) — from ₹800",
    ],
    pricingNote: "Special permissions are required for overnight sailing.",
    faqs: [
      {
        q: "How much does it cost to charter the Lagoon 54?",
        a: "Two-hour slots run from ₹30,000 to ₹38,000 depending on the time of day, with sunset slots priced highest. See the pricing table above for every departure time. An additional hour, overnight anchorage and catering are all quoted separately.",
      },
      ...standardFaqs("Lagoon 54", 35),
      {
        q: "Is this boat suitable for a corporate event or large group?",
        a: "Yes — at up to 35 guests she is the largest boat in our fleet and the one we recommend for a corporate offsite, a large milestone celebration or any group that has outgrown a smaller charter.",
      },
    ],
  },
  {
    /* Saildeck's own boat, a well-documented regular with several years of
       real charter photos. Gallery is genuine photography, used unedited.
       Confirm exact length and registration before this goes live. */
    slug: "mac-30-sailing-yacht-mumbai",
    name: "MAC 30",
    tagline: "A private sailboat for up to 10 guests, a long-running favourite for group charters.",
    pricePerHour: 3000,
    guests: 10,
    lengthFt: 30,
    cabins: 0,
    crew: 1,
    destinations: ["mumbai"],
    category: "Sailing Yacht",
    highlights: ["Private charter, up to 10 guests", "A regular for groups of friends & family", "Departs the Gateway of India"],
    amenities: [
      "Private sailboat & skipper",
      "Motorboat transfer, both ways",
      "Life jackets for every guest",
      "Wide bow seating",
      "Below-deck cuddy",
      "Evening & night slots available",
    ],
    gallery: [
      { src: "/images/fleet/mac-30/mac-30-sailing-yacht-mumbai-large-group-red-shirts.jpg", alt: "A large group of guests in matching red seated along the bow under sail" },
      { src: "/images/fleet/mac-30/mac-30-sailing-yacht-mumbai-womens-group-charter.jpg", alt: "A group of women seated at the bow during a sunset sail" },
      { src: "/images/fleet/mac-30/mac-30-sailing-yacht-mumbai-guests-bow-underway.jpg", alt: "Guests seated along the bow as the boat gets under way" },
      { src: "/images/fleet/mac-30/mac-30-sailing-yacht-mumbai-cuddy-interior.jpg", alt: "The below-deck cuddy with bench seating and cushions" },
      { src: "/images/fleet/mac-30/mac-30-sailing-yacht-mumbai-night-cruise-taj.jpg", alt: "The Taj Mahal Palace lit up at night, seen from the boat" },
    ],
    videos: [],
    description: [
      "**MAC 30** is a private sailboat for up to **10 guests**, departing from the **Gateway of India** in Colaba. She has years of real charter history behind her — groups of friends, family outings and women's groups are the regulars, and her wide bow seats them together rather than strung out along narrow side decks.",
      "Below deck there's a cuddy for shade and storage. No sailing experience is needed — a skipper runs the boat throughout, and an evening slot on this boat is a good pick if you want the city lit up around you — the Taj Mahal Palace and the Gateway make for a genuinely good backdrop after dark.",
      "Boarding is by motorboat transfer from the jetty near the Gateway of India. Pricing is for the whole boat, not per person; message us on WhatsApp with your date and group size for a firm price.",
    ],
    specs: [
      { label: "Type", value: "Sailing yacht" },
      { label: "Length overall", value: "~30 ft" },
      { label: "Layout", value: "Open bow & cockpit, cuddy below" },
      { label: "Guest capacity", value: "10 guests" },
      { label: "Home port", value: "Gateway of India, Mumbai" },
      { label: "Registration", value: "Commercial passenger licence" },
    ],
    pricingSlots: [
      { start: "7:00 AM", end: "9:00 AM", sailing: "1.5 hr private sailing", anchorage: "30 min transfer, both ways", amount: 5500 },
      { start: "9:00 AM", end: "11:00 AM", sailing: "1.5 hr private sailing", anchorage: "30 min transfer, both ways", amount: 5500 },
      { start: "2:00 PM", end: "4:00 PM", sailing: "1.5 hr private sailing", anchorage: "30 min transfer, both ways", amount: 6000 },
      { start: "4:00 PM", end: "6:00 PM", sailing: "1.5 hr private sailing", anchorage: "30 min transfer, both ways", amount: 6500 },
      { start: "6:00 PM", end: "8:00 PM", sailing: "1.5 hr private sailing", anchorage: "30 min transfer, both ways", amount: 6500 },
    ],
    pricingExtras: [
      "Weekend and public holiday slots — ₹500 extra per booking",
      "8:00 PM to 10:00 PM night slot, where available — ₹1,000 extra",
      "Cake on board — ₹950",
      "Flower bouquet on board — ₹850",
    ],
    pricingNote:
      "Prices are for the whole boat, up to 10 guests — not per person. Morning slots are the best value; the 6–8pm sunset slot books out first. Alcohol is not permitted on board this vessel.",
    faqs: [
      {
        q: "How much does it cost to charter MAC 30?",
        a: "From ₹5,500 for the whole boat on a weekday morning slot, up to ₹6,500 for the 6–8pm sunset departure. Weekends and public holidays run ₹500 higher across all slots.",
      },
      ...standardFaqs("MAC 30", 10),
      {
        q: "Can we book a night slot to see the city lit up?",
        a: "Yes, an 8–10pm slot is available where the schedule allows, at a small premium. The Taj Mahal Palace and the Gateway of India lit up at night are a highlight of this timing.",
      },
    ],
  },
  {
    /* Saildeck's own boat, a Jeanneau 45. This folder also contained one
       photo carrying a visible "Nautal" watermark (a European boat-charter
       marketplace) despite its WhatsApp-style filename — excluded. Gallery
       below is genuine photography, used unedited. Confirm exact
       registration before this goes live. */
    slug: "nava-45-foot-sailing-yacht-mumbai",
    name: "Nava",
    tagline: "A 45-foot Jeanneau sailing yacht with a proper teak saloon, for up to 12 guests.",
    pricePerHour: 3800,
    guests: 12,
    lengthFt: 45,
    cabins: 2,
    crew: 2,
    destinations: ["mumbai"],
    category: "Sailing Yacht",
    highlights: ["45ft Jeanneau sailing yacht", "Up to 12 guests", "Teak saloon with real cabins below"],
    amenities: [
      "Private sailboat & skipper",
      "Teak-finished saloon",
      "Cabins below deck",
      "Life jackets for every guest",
      "Auxiliary engine",
      "Wide bow & cockpit seating",
    ],
    gallery: [
      { src: "/images/fleet/nava-45-foot/nava-45-foot-jeanneau-sailing-yacht-mumbai-side-profile.jpg", alt: "Nava's side profile at anchor with the Mumbai skyline behind" },
      { src: "/images/fleet/nava-45-foot/nava-sailing-yacht-mumbai-large-group-charter.jpg", alt: "A large group of guests posed together on deck" },
      { src: "/images/fleet/nava-45-foot/nava-sailing-yacht-mumbai-mother-child-bow.jpg", alt: "A mother and young child seated at the bow at sunset" },
      { src: "/images/fleet/nava-45-foot/nava-sailing-yacht-mumbai-guest-sunset-bow.jpg", alt: "A guest seated at the bow watching the sunset under sail" },
      { src: "/images/fleet/nava-45-foot/nava-45-foot-jeanneau-sailing-yacht-mumbai-teak-saloon.jpg", alt: "The teak-finished saloon with wraparound seating and a view through to the aft cabin" },
    ],
    videos: [],
    description: [
      "**Nava** is a 45-foot Jeanneau sailing yacht — one of the larger sailboats in the Saildeck fleet, carrying up to **12 guests** from the **Gateway of India** in Colaba. Below deck she has a proper varnished teak saloon with wraparound seating and real cabins, not a bare cuddy, which is what separates her from the smaller day-sailors in our roster.",
      "Her size and the enclosed saloon make her a comfortable choice for a **[larger family charter](/blog/family-friendly-boating-mumbai-goa)** with several generations aboard, or a group booking where guests want somewhere to sit out of the sun between stretches on deck. At 12 guests, see our **[guide to group size and boat size](/blog/group-size-boat-size-guide)** if you're weighing her against a smaller sailboat.",
      "Boarding is by tender from the jetty near the Gateway of India. No sailing experience is needed — a skipper and crew run the boat throughout. Pricing is for the whole boat, not per person; message us on WhatsApp with your date and group size for a firm price.",
    ],
    specs: [
      { label: "Builder", value: "Jeanneau" },
      { label: "Length overall", value: "45 ft" },
      { label: "Layout", value: "Teak saloon, cabins below" },
      { label: "Guest capacity", value: "12 guests" },
      { label: "Home port", value: "Gateway of India, Mumbai" },
      { label: "Registration", value: "Commercial passenger licence" },
    ],
    pricingSlots: [
      { start: "7:00 AM", end: "9:00 AM", sailing: "1.5 hr private sailing", anchorage: "30 min transfer, both ways", amount: 7000 },
      { start: "9:00 AM", end: "11:00 AM", sailing: "1.5 hr private sailing", anchorage: "30 min transfer, both ways", amount: 7000 },
      { start: "2:00 PM", end: "4:00 PM", sailing: "1.5 hr private sailing", anchorage: "30 min transfer, both ways", amount: 7500 },
      { start: "4:00 PM", end: "6:00 PM", sailing: "1.5 hr private sailing", anchorage: "30 min transfer, both ways", amount: 8000 },
      { start: "6:00 PM", end: "8:00 PM", sailing: "1.5 hr private sailing", anchorage: "30 min transfer, both ways", amount: 8000 },
    ],
    pricingExtras: [
      "Weekend and public holiday slots — ₹500 extra per booking",
      "Cake on board — ₹950",
      "Flower bouquet on board — ₹850",
      "Catering (per guest) — from ₹800",
    ],
    pricingNote:
      "Prices are for the whole boat, up to 12 guests — not per person. Morning slots are the best value; the 6–8pm sunset slot books out first. Alcohol is not permitted on board this vessel.",
    faqs: [
      {
        q: "How much does it cost to charter Nava?",
        a: "From ₹7,000 for the whole boat on a weekday morning slot, up to ₹8,000 for the 6–8pm sunset departure. Weekends and public holidays run ₹500 higher across all slots.",
      },
      ...standardFaqs("Nava", 12),
      {
        q: "Does Nava have real cabins, not just a cuddy?",
        a: "Yes — a teak-finished saloon and cabins below deck. She is one of the more comfortable sailboats in our fleet for a larger group that wants somewhere proper to sit between stretches on deck.",
      },
    ],
  },
  {
    /* Saildeck's own boat, a Sea Ray sport cruiser based in Goa. Gallery is
       genuine photography, used unedited. Confirm exact registration and
       length before this goes live. */
    slug: "searay-goa-boat-charter",
    name: "Sea Ray",
    tagline: "A Sea Ray sport cruiser for up to 10 guests, cruising past Old Goa's riverfront churches.",
    pricePerHour: 8000,
    guests: 10,
    lengthFt: 37,
    cabins: 1,
    crew: 2,
    destinations: ["goa"],
    category: "Motor Yacht",
    highlights: ["Sea Ray sport cruiser", "Ensuite cabin below deck", "Passes Old Goa's riverfront churches"],
    amenities: [
      "Ensuite cabin & bathroom below deck",
      "Lower saloon seating",
      "Open cockpit seating",
      "Life jackets for every guest",
      "Catering on request",
      "Bimini shade",
    ],
    gallery: [
      { src: "/images/fleet/searay-goa/searay-10-pax-goa-boat-charter-church-panjim.jpeg", alt: "The Sea Ray under way past a riverfront church near Panjim, Goa" },
      { src: "/images/fleet/searay-goa/searay-goa-boat-charter-aft-cockpit-seating.jpeg", alt: "The aft cockpit seating with the river bank behind" },
      { src: "/images/fleet/searay-goa/searay-goa-boat-charter-cabin-interior.jpeg", alt: "The below-deck cabin and companionway looking toward the seating area" },
      { src: "/images/fleet/searay-goa/searay-goa-boat-charter-lower-saloon.jpeg", alt: "The lower saloon seating either side of the companionway steps" },
      { src: "/images/fleet/searay-goa/searay-goa-boat-charter-ensuite-bathroom.jpeg", alt: "The ensuite bathroom below deck" },
    ],
    videos: [],
    description: [
      "**Sea Ray** is a sport cruiser based in Goa, carrying up to **10 guests** on the rivers and coastline around Panjim. She has a proper ensuite cabin and bathroom below deck, and her route regularly passes Old Goa's riverfront churches — the kind of scenery photographs well without needing to plan a special detour for it.",
      "This is the boat we suggest for **[first-time visitors to Goa](/blog/yachting-in-goa-first-timers-guide)** who want a comfortable, sheltered introduction to the water, and for groups who'd rather have a cabin to retreat to than an entirely open deck. She suits a run out toward **[Grande Island](/blog/grande-island-goa-snorkelling-diving)** or a relaxed cruise along **[Goa's best beaches](/blog/best-beaches-by-boat-in-goa)**.",
      "Boarding is arranged from a jetty in the Panjim area. Pricing is for the whole boat, not per person; message us on WhatsApp with your date and group size for a firm price and a catering quote if you'd like one.",
    ],
    specs: [
      { label: "Builder", value: "Sea Ray" },
      { label: "Length overall", value: "~37 ft" },
      { label: "Layout", value: "Ensuite cabin, lower saloon, open cockpit" },
      { label: "Guest capacity", value: "10 guests" },
      { label: "Home port", value: "Panjim, Goa" },
      { label: "Registration", value: "Commercial passenger licence" },
    ],
    pricingSlots: [
      { start: "7:00 AM", end: "9:00 AM", sailing: "1 hour cruising", anchorage: "1 hour anchorage", amount: 8000 },
      { start: "9:00 AM", end: "11:00 AM", sailing: "1 hour cruising", anchorage: "1 hour anchorage", amount: 8000 },
      { start: "2:00 PM", end: "4:00 PM", sailing: "1 hour cruising", anchorage: "1 hour anchorage", amount: 9000 },
      { start: "4:00 PM", end: "6:00 PM", sailing: "1 hour cruising", anchorage: "1 hour anchorage", amount: 10000 },
      { start: "6:00 PM", end: "8:00 PM", sailing: "1 hour cruising", anchorage: "1 hour anchorage", amount: 10000 },
    ],
    pricingExtras: [
      "Additional hour — ₹5,000",
      "Grande Island run, return journey — ₹18,000",
      "Catering (per guest) — from ₹700",
      "Photoshoot on board (per hour) — ₹8,000",
    ],
    pricingNote: "Special permissions are required for overnight anchorage.",
    faqs: [
      {
        q: "How much does it cost to charter Sea Ray?",
        a: "Two-hour slots run from ₹8,000 to ₹10,000 depending on the time of day, with sunset slots priced highest. See the pricing table above for every departure time. An additional hour, the Grande Island run and catering are all quoted separately.",
      },
      ...standardFaqs("Sea Ray", 10),
      {
        q: "Does this route pass any landmarks?",
        a: "Yes — the standard route runs past Old Goa's riverfront churches, which is a large part of why guests choose this boat over a plain harbour cruise.",
      },
    ],
  },
  {
    /* Saildeck's own boat, a Beneteau First 25.7 (confirmed via the hull
       transom lettering). Gallery is genuine photography, used unedited.
       Confirm exact registration before this goes live. */
    slug: "taanti-7-pax-sailing-yacht-mumbai",
    name: "Taanti",
    tagline: "A Beneteau First 25.7 sailing yacht for up to 7 guests, anchored in view of the Gateway.",
    pricePerHour: 2700,
    guests: 7,
    lengthFt: 26,
    cabins: 0,
    crew: 1,
    destinations: ["mumbai"],
    category: "Sailing Yacht",
    highlights: ["Beneteau First 25.7", "Private charter, up to 7 guests", "Anchored in view of the Gateway of India"],
    amenities: [
      "Private sailboat & skipper",
      "Auxiliary outboard motor",
      "Motorboat transfer, both ways",
      "Life jackets for every guest",
      "Below-deck cabin for shade & storage",
      "Birthday & celebration decoration on request",
    ],
    gallery: [
      { src: "/images/fleet/taanti/taanti-sailing-yacht-mumbai-gateway-of-india-taj.webp", alt: "Taanti under sail with the Taj Mahal Palace and Gateway of India behind" },
      { src: "/images/fleet/taanti/taanti-sailing-yacht-mumbai-taj-mahal-palace-backdrop.webp", alt: "Taanti at anchor with the Taj Mahal Palace in the background" },
      { src: "/images/fleet/taanti/taanti-sailing-yacht-mumbai-side-profile-skyline.webp", alt: "Taanti's side profile at anchor among other sailboats" },
      { src: "/images/fleet/taanti/taanti-sailing-yacht-mumbai-bow-anchorage.webp", alt: "Taanti's bow at anchor in a crowded Mumbai harbour anchorage" },
      { src: "/images/fleet/taanti/taanti-sailing-yacht-mumbai-beneteau-first-transom.webp", alt: "The Beneteau First 25.7 nameplate and outboard on Taanti's transom" },
      { src: "/images/fleet/taanti/taanti-sailing-yacht-mumbai-birthday-cabin-decor.webp", alt: "A happy birthday balloon display in the below-deck cabin" },
    ],
    videos: [],
    description: [
      "**Taanti** is a Beneteau First 25.7 sailing yacht for up to **7 guests**, departing from the **Gateway of India** in Colaba and anchoring within sight of the Taj Mahal Palace — a straightforward, well-kept boat that puts the skyline right in your photos without any extra effort.",
      "Below deck there's a cabin for shade and storage, which we regularly decorate for a birthday with balloons and a cake. No sailing experience is needed — a skipper runs the boat throughout, with an auxiliary outboard for the still days.",
      "Boarding is by motorboat transfer from the jetty near the Gateway of India. Pricing is for the whole boat, not per person; message us on WhatsApp with your date, group size and occasion for a firm price and a decoration quote if you'd like one.",
    ],
    specs: [
      { label: "Builder", value: "Beneteau (First 25.7)" },
      { label: "Length overall", value: "~26 ft" },
      { label: "Layout", value: "Open cockpit, cabin below" },
      { label: "Guest capacity", value: "7 guests" },
      { label: "Home port", value: "Gateway of India, Mumbai" },
      { label: "Registration", value: "Commercial passenger licence" },
    ],
    pricingSlots: [
      { start: "7:00 AM", end: "9:00 AM", sailing: "1.5 hr private sailing", anchorage: "30 min transfer, both ways", amount: 4500 },
      { start: "9:00 AM", end: "11:00 AM", sailing: "1.5 hr private sailing", anchorage: "30 min transfer, both ways", amount: 4500 },
      { start: "2:00 PM", end: "4:00 PM", sailing: "1.5 hr private sailing", anchorage: "30 min transfer, both ways", amount: 5000 },
      { start: "4:00 PM", end: "6:00 PM", sailing: "1.5 hr private sailing", anchorage: "30 min transfer, both ways", amount: 5500 },
      { start: "6:00 PM", end: "8:00 PM", sailing: "1.5 hr private sailing", anchorage: "30 min transfer, both ways", amount: 5500 },
    ],
    pricingExtras: [
      "Weekend and public holiday slots — ₹500 extra per booking",
      "Birthday or celebration decoration — from ₹2,500",
      "Cake on board — ₹950",
      "Flower bouquet on board — ₹850",
    ],
    pricingNote:
      "Prices are for the whole boat, up to 7 guests — not per person. Morning slots are the best value; the 6–8pm sunset slot books out first. Alcohol is not permitted on board this vessel.",
    faqs: [
      {
        q: "How much does it cost to charter Taanti?",
        a: "From ₹4,500 for the whole boat on a weekday morning slot, up to ₹5,500 for the 6–8pm sunset departure. Weekends and public holidays run ₹500 higher across all slots.",
      },
      ...standardFaqs("Taanti", 7),
      {
        q: "Will we get views of the Gateway of India and Taj Mahal Palace?",
        a: "Yes — Taanti anchors within view of both, which is one of her most requested features for photos.",
      },
    ],
  },
  {
    /* Saildeck's own boat, based on the Mandovi in Goa (registration
       BDR-IV-01377, confirmed on the hull). This folder also contained a
       photo carrying a visible "Yachts Goa" competitor watermark, plus
       several files run through AI watermark-removal and photo-editing
       tools — all excluded. Gallery below is genuine photography, used
       unedited. Confirm exact length before this goes live. */
    slug: "taj-exotica-18-pax-cruising-yacht-goa",
    name: "Taj Exotica",
    tagline: "A flybridge cruising motor yacht on the Mandovi, for up to 18 guests.",
    pricePerHour: 14000,
    guests: 18,
    lengthFt: 44,
    cabins: 1,
    crew: 3,
    destinations: ["goa"],
    category: "Motor Yacht",
    highlights: ["Flybridge motor yacht", "Up to 18 guests", "Based on the Mandovi, Goa"],
    amenities: [
      "Flybridge with upper helm",
      "Teak-finished saloon & galley",
      "Foredeck seating",
      "Life jackets for every guest",
      "Enclosed saloon",
      "Catering & decoration on request",
    ],
    gallery: [
      { src: "/images/fleet/taj-exotica/taj-exotica-18-pax-cruising-yacht-goa-side-profile.jpg", alt: "Taj Exotica's side profile with her nameplate, under way in Goa" },
      { src: "/images/fleet/taj-exotica/taj-exotica-cruising-yacht-goa-underway-mandovi.jpg", alt: "Taj Exotica under way on the Mandovi with mangroves behind" },
      { src: "/images/fleet/taj-exotica/taj-exotica-cruising-yacht-goa-aerial-celebration-group.jpeg", alt: "An aerial view of a group celebration on the bow, decorated with balloons and flowers" },
      { src: "/images/fleet/taj-exotica/taj-exotica-cruising-yacht-goa-flybridge-helm.jpg", alt: "The flybridge helm and lounge seating" },
      { src: "/images/fleet/taj-exotica/taj-exotica-cruising-yacht-goa-teak-saloon-galley.jpg", alt: "The teak-finished saloon and galley with wraparound seating" },
    ],
    videos: [],
    description: [
      "**Taj Exotica** is a flybridge cruising motor yacht based on the **Mandovi river** in Goa, carrying up to **18 guests** with a proper teak-finished saloon and galley below deck. She's one of the larger boats in our Goa fleet, and the flybridge gives a second, shaded vantage point above the main deck for a group this size to spread across.",
      "This is the boat we put forward for a **[corporate day out](/blog/corporate-yacht-charters-india)** in Goa or a milestone celebration with a guest list bigger than a standard day boat comfortably carries — her deck has hosted exactly that kind of decorated group charter before. She also suits a run out toward **[Grande Island](/blog/grande-island-goa-snorkelling-diving)** or along **[Goa's best beaches](/blog/best-beaches-by-boat-in-goa)** for groups who want the scenery without giving up saloon space.",
      "Boarding is arranged from a jetty on the Mandovi. Pricing is for the whole boat, not per person; message us on WhatsApp with your date and group size for a firm price and a catering or decoration quote.",
    ],
    specs: [
      { label: "Type", value: "Flybridge motor yacht" },
      { label: "Length overall", value: "~44 ft" },
      { label: "Layout", value: "Teak saloon, galley, flybridge" },
      { label: "Guest capacity", value: "18 guests" },
      { label: "Home port", value: "Mandovi river, Goa" },
      { label: "Registration", value: "Commercial passenger licence" },
    ],
    pricingSlots: [
      { start: "7:00 AM", end: "9:00 AM", sailing: "1 hour cruising", anchorage: "1 hour anchorage", amount: 14000 },
      { start: "9:00 AM", end: "11:00 AM", sailing: "1 hour cruising", anchorage: "1 hour anchorage", amount: 14000 },
      { start: "2:00 PM", end: "4:00 PM", sailing: "1 hour cruising", anchorage: "1 hour anchorage", amount: 16000 },
      { start: "4:00 PM", end: "6:00 PM", sailing: "1 hour cruising", anchorage: "1 hour anchorage", amount: 18000 },
      { start: "6:00 PM", end: "8:00 PM", sailing: "1 hour cruising", anchorage: "1 hour anchorage", amount: 18000 },
    ],
    pricingExtras: [
      "Additional hour — ₹9,000",
      "Grande Island run, return journey — ₹24,000",
      "Catering (per guest) — from ₹800",
      "Decoration for a celebration — from ₹3,500",
    ],
    pricingNote: "Special permissions are required for overnight anchorage.",
    faqs: [
      {
        q: "How much does it cost to charter Taj Exotica?",
        a: "Two-hour slots run from ₹14,000 to ₹18,000 depending on the time of day, with sunset slots priced highest. See the pricing table above for every departure time. An additional hour, the Grande Island run, catering and decoration are all quoted separately.",
      },
      ...standardFaqs("Taj Exotica", 18),
      {
        q: "Can you decorate the boat for a celebration?",
        a: "Yes — balloons and flowers for a group celebration are something we've set up on this boat before. Tell us the occasion when you book and we will quote the decoration separately.",
      },
    ],
  },
  {
    /* Saildeck's own boat (registration BOR-IV-01682/92, confirmed on the
       hull across multiple photos). Gallery is genuine photography, used
       unedited. Confirm exact registration and cabin count before this goes
       live. */
    slug: "vari-44-motor-yacht-mumbai",
    name: "Vari 44",
    tagline: "A 44-foot flybridge motor yacht for up to 18 guests, departing the Gateway of India.",
    pricePerHour: 16000,
    guests: 18,
    lengthFt: 44,
    cabins: 1,
    crew: 3,
    destinations: ["mumbai"],
    category: "Motor Yacht",
    highlights: ["44ft flybridge motor yacht", "Up to 18 guests", "Departs the Gateway of India"],
    amenities: [
      "Flybridge with upper helm & seating",
      "Enclosed saloon",
      "Swim platform",
      "Life jackets for every guest",
      "Sound system",
      "Catering & decoration on request",
    ],
    gallery: [
      { src: "/images/fleet/vari-44/vari-44-motor-yacht-mumbai-side-profile-dusk.webp", alt: "Vari 44's side profile at anchor at dusk" },
      { src: "/images/fleet/vari-44/vari-44-motor-yacht-mumbai-flybridge-profile.webp", alt: "Vari 44's flybridge and hull viewed from alongside" },
      { src: "/images/fleet/vari-44/vari-44-motor-yacht-mumbai-flybridge-helm.webp", alt: "The flybridge upper helm and seating with the Mumbai skyline behind" },
      { src: "/images/fleet/vari-44/vari-44-motor-yacht-mumbai-aft-saloon.webp", alt: "The enclosed saloon with wraparound seating" },
      { src: "/images/fleet/vari-44/vari-44-motor-yacht-mumbai-saloon-skyline-view.webp", alt: "The saloon looking out over the water toward the city skyline" },
    ],
    videos: [],
    description: [
      "**Vari 44** is a 44-foot flybridge motor yacht carrying up to **18 guests** from the **Gateway of India** in Colaba. She sits comfortably in the middle of our motor yacht range — bigger than a day boat, with an upper helm and flybridge seating that gives a group this size room to spread across two decks rather than one.",
      "The enclosed saloon below offers shelter from the sun or a sudden shower, and the swim platform at the stern makes boarding straightforward for a large group. She suits a **[corporate outing](/blog/corporate-yacht-charters-india)** or a celebration where the guest list has grown past what a smaller boat comfortably carries — see our **[guide to group size and boat size](/blog/group-size-boat-size-guide)** if you're deciding between her and a bigger or smaller option.",
      "Boarding is by tender from the jetty near the Gateway of India. Pricing is for the whole boat, not per person; message us on WhatsApp with your date and group size for a firm price and a catering or decoration quote.",
    ],
    specs: [
      { label: "Type", value: "Flybridge motor yacht" },
      { label: "Length overall", value: "44 ft" },
      { label: "Layout", value: "Enclosed saloon, flybridge, swim platform" },
      { label: "Guest capacity", value: "18 guests" },
      { label: "Home port", value: "Gateway of India, Mumbai" },
      { label: "Registration", value: "Commercial passenger licence" },
    ],
    pricingSlots: [
      { start: "7:00 AM", end: "9:00 AM", sailing: "1 hour cruising", anchorage: "1 hour anchorage", amount: 16000 },
      { start: "9:00 AM", end: "11:00 AM", sailing: "1 hour cruising", anchorage: "1 hour anchorage", amount: 16000 },
      { start: "2:00 PM", end: "4:00 PM", sailing: "1 hour cruising", anchorage: "1 hour anchorage", amount: 19000 },
      { start: "4:00 PM", end: "6:00 PM", sailing: "1 hour cruising", anchorage: "1 hour anchorage", amount: 22000 },
      { start: "6:00 PM", end: "8:00 PM", sailing: "1 hour cruising", anchorage: "1 hour anchorage", amount: 22000 },
    ],
    pricingExtras: [
      "Additional hour — ₹10,000",
      "Overnight anchorage (9 am to 7 am) — ₹90,000",
      "Gateway of India to Mandwa, return journey — ₹38,000",
      "Catering (per guest) — from ₹800",
    ],
    pricingNote: "Special permissions are required for overnight sailing.",
    faqs: [
      {
        q: "How much does it cost to charter Vari 44?",
        a: "Two-hour slots run from ₹16,000 to ₹22,000 depending on the time of day, with sunset slots priced highest. See the pricing table above for every departure time. An additional hour, overnight anchorage and catering are all quoted separately.",
      },
      ...standardFaqs("Vari 44", 18),
      {
        q: "Is this boat suitable for a corporate event or large group?",
        a: "Yes — the flybridge and enclosed saloon between them give an 18-guest group room to spread out, which is why she is a regular pick for corporate outings and larger celebrations.",
      },
    ],
  },
  {
    /* Saildeck's own boat. Three of the four photos here are a professional
       styled shoot rather than an on-charter phone photo — used with the
       operator's confirmation that Saildeck holds the rights to them.
       Because the backdrop in those shots isn't Mumbai, the alt text and
       copy describe the boat itself rather than claiming a location the
       images don't show. Confirm exact length, cabin count and registration
       before this goes live. */
    slug: "blue-whale-18-pax-motor-yacht-mumbai",
    name: "Blue Whale",
    tagline: "A flybridge motor yacht for up to 18 guests, with a proper oval-berth cabin below.",
    pricePerHour: 15000,
    guests: 18,
    lengthFt: 42,
    cabins: 1,
    crew: 3,
    destinations: ["mumbai"],
    category: "Motor Yacht",
    highlights: ["Flybridge motor yacht", "Up to 18 guests", "Leather saloon with a wet bar"],
    amenities: [
      "Leather saloon seating",
      "Wet bar with fridge & microwave",
      "Oval-berth cabin below deck",
      "Life jackets for every guest",
      "Upper helm & foredeck sun pad",
      "Catering & decoration on request",
    ],
    gallery: [
      { src: "/images/fleet/blue-whale/blue-whale-18-pax-motor-yacht-mumbai-side-profile.jpeg", alt: "Blue Whale's dark blue hull and flybridge at anchor" },
      { src: "/images/fleet/blue-whale/blue-whale-motor-yacht-mumbai-saloon-interior.jpeg", alt: "The leather saloon with a wet bar, fridge and coffee table" },
      { src: "/images/fleet/blue-whale/blue-whale-motor-yacht-mumbai-cabin-interior.jpeg", alt: "The below-deck cabin with an oval berth and nautical cushions" },
      { src: "/images/fleet/blue-whale/blue-whale-motor-yacht-mumbai-aft-deck-sunset.jpeg", alt: "The foredeck sun pad viewed from the flybridge at sunset" },
    ],
    videos: [],
    description: [
      "**Blue Whale** is a flybridge motor yacht carrying up to **18 guests** from the **Gateway of India** in Colaba. Her dark blue hull is easy to pick out at anchor, and below deck she has a genuine cabin with an oval berth rather than a bare cuddy — a real point of difference at this end of our fleet.",
      "The saloon is finished in leather with a wet bar, fridge and microwave, which makes her a comfortable pick for a **[corporate outing](/blog/corporate-yacht-charters-india)** or a longer celebration that needs somewhere proper to sit between stretches on deck. At 18 guests, see our **[guide to group size and boat size](/blog/group-size-boat-size-guide)** if you're weighing her against a smaller or larger boat.",
      "Boarding is by tender from the jetty near the Gateway of India. Pricing is for the whole boat, not per person; message us on WhatsApp with your date and group size for a firm price and a catering or decoration quote.",
    ],
    specs: [
      { label: "Type", value: "Flybridge motor yacht" },
      { label: "Length overall", value: "~42 ft" },
      { label: "Layout", value: "Leather saloon, oval-berth cabin" },
      { label: "Guest capacity", value: "18 guests" },
      { label: "Home port", value: "Gateway of India, Mumbai" },
      { label: "Registration", value: "Commercial passenger licence" },
    ],
    pricingSlots: [
      { start: "7:00 AM", end: "9:00 AM", sailing: "1 hour cruising", anchorage: "1 hour anchorage", amount: 15000 },
      { start: "9:00 AM", end: "11:00 AM", sailing: "1 hour cruising", anchorage: "1 hour anchorage", amount: 15000 },
      { start: "2:00 PM", end: "4:00 PM", sailing: "1 hour cruising", anchorage: "1 hour anchorage", amount: 17000 },
      { start: "4:00 PM", end: "6:00 PM", sailing: "1 hour cruising", anchorage: "1 hour anchorage", amount: 20000 },
      { start: "6:00 PM", end: "8:00 PM", sailing: "1 hour cruising", anchorage: "1 hour anchorage", amount: 20000 },
    ],
    pricingExtras: [
      "Additional hour — ₹9,500",
      "Overnight anchorage (9 am to 7 am) — ₹85,000",
      "Gateway of India to Mandwa, return journey — ₹36,000",
      "Catering (per guest) — from ₹800",
    ],
    pricingNote: "Special permissions are required for overnight sailing.",
    faqs: [
      {
        q: "How much does it cost to charter Blue Whale?",
        a: "Two-hour slots run from ₹15,000 to ₹20,000 depending on the time of day, with sunset slots priced highest. See the pricing table above for every departure time. An additional hour, overnight anchorage and catering are all quoted separately.",
      },
      ...standardFaqs("Blue Whale", 18),
      {
        q: "Does Blue Whale have a real cabin, not just a cuddy?",
        a: "Yes — a below-deck cabin with an oval berth, one of the more comfortable layouts in our fleet at this size.",
      },
    ],
  },
  {
    /* Saildeck's own boat, a Majesty 44. This folder also contained two files
       still carrying a visible third-party "Oystera" watermark — excluded
       even after the operator confirmed rights to the rest of the set, since
       those two specific files clearly hadn't actually been cleaned.
       Everything below is genuine, unwatermarked photography, used unedited.
       Confirm exact guest capacity and registration before this goes live. */
    slug: "l3-yacht-majesty-44-mumbai",
    name: "L3",
    tagline: "A Majesty 44 motor yacht with two real cabins, including a marble-finished master.",
    pricePerHour: 17000,
    guests: 14,
    lengthFt: 44,
    cabins: 2,
    crew: 3,
    destinations: ["mumbai"],
    category: "Motor Yacht",
    highlights: ["Majesty 44 motor yacht", "Two cabins, including a marble master", "Foredeck lounge seating"],
    amenities: [
      "Master cabin with ensuite",
      "Second guest cabin",
      "Lower saloon seating",
      "Foredeck lounge",
      "Life jackets for every guest",
      "Catering & decoration on request",
    ],
    gallery: [
      { src: "/images/fleet/l3-yacht/l3-yacht-majesty-44-mumbai-side-profile-gateway.jpeg", alt: "L3's black hull viewed from alongside with the Gateway of India and Taj Mahal Palace behind" },
      { src: "/images/fleet/l3-yacht/l3-yacht-majesty-44-mumbai-stern-swim-platform.jpeg", alt: "L3's stern and teak swim platform at anchor" },
      { src: "/images/fleet/l3-yacht/l3-yacht-majesty-44-mumbai-foredeck-lounge.png", alt: "The foredeck lounge seating with the city skyline behind" },
      { src: "/images/fleet/l3-yacht/l3-yacht-majesty-44-mumbai-foredeck-sunset.jpeg", alt: "The foredeck lounge at sunset with the harbour behind" },
      { src: "/images/fleet/l3-yacht/l3-yacht-majesty-44-mumbai-saloon-steps.jpeg", alt: "The lower saloon seating and teak steps down from the foredeck" },
      { src: "/images/fleet/l3-yacht/l3-yacht-majesty-44-mumbai-helm-captain.png", alt: "The captain at the helm with the harbour behind" },
      { src: "/images/fleet/l3-yacht/l3-yacht-majesty-44-mumbai-guest-cabin-berth.png", alt: "The second guest cabin with a made-up berth" },
      { src: "/images/fleet/l3-yacht/l3-yacht-majesty-44-mumbai-master-cabin-bed.jpeg", alt: "The master cabin with a made-up bed and mirrored panelling" },
    ],
    videos: [],
    description: [
      "**L3** is a Majesty 44 motor yacht carrying up to **14 guests** from the **Gateway of India** in Colaba, with two genuine cabins below deck — a master with an ensuite and a second guest cabin — rather than the single berth most boats her size carry.",
      "The lower saloon and foredeck lounge give the group somewhere to sit whether the sun is out or not, and the layout below deck makes her one of the more comfortable choices in our fleet for a longer charter or a group that wants privacy to change and rest. This makes her a strong pick for [a motor yacht rather than a sailing yacht](/blog/motor-yacht-or-sailing-yacht) charter with a **[corporate group](/blog/corporate-yacht-charters-india)** or a celebration that runs past the usual two-hour slot.",
      "Boarding is by tender from the jetty near the Gateway of India. Pricing is for the whole boat, not per person; message us on WhatsApp with your date and group size for a firm price and a catering or decoration quote.",
    ],
    specs: [
      { label: "Builder", value: "Majesty (Gulf Craft)" },
      { label: "Length overall", value: "44 ft" },
      { label: "Layout", value: "Master cabin & ensuite, second guest cabin, saloon" },
      { label: "Guest capacity", value: "14 guests" },
      { label: "Home port", value: "Gateway of India, Mumbai" },
      { label: "Registration", value: "Commercial passenger licence" },
    ],
    pricingSlots: [
      { start: "7:00 AM", end: "9:00 AM", sailing: "1 hour cruising", anchorage: "1 hour anchorage", amount: 17000 },
      { start: "9:00 AM", end: "11:00 AM", sailing: "1 hour cruising", anchorage: "1 hour anchorage", amount: 17000 },
      { start: "2:00 PM", end: "4:00 PM", sailing: "1 hour cruising", anchorage: "1 hour anchorage", amount: 19000 },
      { start: "4:00 PM", end: "6:00 PM", sailing: "1 hour cruising", anchorage: "1 hour anchorage", amount: 22000 },
      { start: "6:00 PM", end: "8:00 PM", sailing: "1 hour cruising", anchorage: "1 hour anchorage", amount: 22000 },
    ],
    pricingExtras: [
      "Additional hour — ₹10,000",
      "Overnight anchorage (9 am to 7 am) — ₹95,000",
      "Gateway of India to Mandwa, return journey — ₹40,000",
      "Catering (per guest) — from ₹900",
    ],
    pricingNote: "Special permissions are required for overnight sailing.",
    faqs: [
      {
        q: "How much does it cost to charter L3?",
        a: "Two-hour slots run from ₹17,000 to ₹22,000 depending on the time of day, with sunset slots priced highest. See the pricing table above for every departure time. An additional hour, overnight anchorage and catering are all quoted separately.",
      },
      ...standardFaqs("L3", 14),
      {
        q: "Does L3 have two real cabins?",
        a: "Yes — a master cabin with an ensuite bathroom and a second guest cabin, both with made-up beds rather than bare berths. She's one of the more comfortable boats in our fleet for a longer charter.",
      },
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
