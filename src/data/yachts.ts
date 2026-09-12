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
