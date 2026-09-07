/**
 * Experiences, events and packages — the reasons people charter, as opposed to
 * the boats they charter (those live in yachts.ts).
 *
 * These pages are deliberately thin for now: a banner carousel, a short intro
 * and the standard enquiry form. Each one is a landing page for a distinct
 * search intent ("proposal on a yacht mumbai", "yacht photoshoot"), so they
 * earn their own URL even before the long-form copy is written.
 *
 * ⚠️ PLACEHOLDER PHOTOGRAPHY — every image below is Unsplash stock. Swap them
 * for Saildeck's own shots of each experience before launch; on this kind of
 * page the photograph is the entire pitch, and a stock frame that obviously is
 * not your boat costs bookings.
 *
 * TO ADD MORE PHOTOS: push entries onto a product's `gallery` array. The
 * banner is a carousel (src/components/Gallery.tsx) — it grows arrows, a
 * counter and a thumbnail strip on its own once there is more than one shot.
 */

export type ProductCategory = "Romance" | "Celebrations" | "Cruises" | "Shoots & media";

export type Product = {
  slug: string;
  /** Card and page title. */
  name: string;
  category: ProductCategory;
  /** One exciting line, shown on the placard over the photo. Keep it short —
   *  anything past about 60 characters wraps to three lines on a phone. */
  teaser: string;
  /** Lead paragraph on the product page, under the title. */
  intro: string;
  /** 9:16 portrait crop — the placard card on /products only. */
  image: string;
  imageAlt: string;
  /**
   * Landscape shots for the banner carousel on the product page. The first
   * one is the same photograph as `image`, cropped wide, so the card and the
   * page it opens agree with each other.
   */
  gallery: { src: string; alt: string }[];
  seoTitle: string;
  seoDescription: string;
  /** Pre-filled WhatsApp text so an enquiry arrives already labelled. */
  whatsappMessage: string;
};

export const productCategories: ProductCategory[] = [
  "Romance",
  "Celebrations",
  "Cruises",
  "Shoots & media",
];

/**
 * Two crops of the same source photograph.
 *
 * Centre crop deliberately: `crop=entropy` was tried first and picked the
 * busiest vertical strip, which on these frames is usually scenery behind the
 * subject — it cropped a decorated boat down to the hillside behind it.
 */
const card = (id: string) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=900&h=1600&q=80`;
const wide = (id: string) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=1600&h=1000&q=80`;

export const products: Product[] = [
  {
    slug: "dinner-on-a-yacht",
    name: "Dinner on a Yacht",
    category: "Celebrations",
    teaser: "A private table on deck, the city lit up behind you.",
    intro:
      "A laid table on a moving deck. Starters as you leave the Gateway, mains at anchor, and the Mumbai skyline lit up the whole way through dessert. Catering, crockery, crew and the timing are ours to arrange — you pick the menu and the hour.",
    image: card("photo-1548428938-b1063c60f386"),
    imageAlt: "A candlelit table laid with wine glasses and flowers at dusk",
    gallery: [
      { src: wide("photo-1548428938-b1063c60f386"), alt: "A candlelit table laid with wine glasses and flowers at dusk" },
      { src: wide("photo-1598448056086-307e98ef5c4a"), alt: "A dining table set for a meal on board" },
      { src: wide("photo-1674606878551-f424ad6ce965"), alt: "Shaded deck seating around a low table" },
      { src: wide("photo-1697124510322-27ef594f67fd"), alt: "A saloon lounge with sofas and a coffee table" },
    ],
    seoTitle: "Dinner on a Yacht in Mumbai — Private Candlelight Dining at Sea",
    seoDescription:
      "Book a private dinner on a yacht in Mumbai. A laid table on deck, catering arranged, and the city skyline behind you. Whole-boat pricing with captain and crew included.",
    whatsappMessage: "Hi Saildeck! I would like to arrange a dinner on a yacht.",
  },
  {
    slug: "yacht-date",
    name: "Yacht Date",
    category: "Romance",
    teaser: "Two hours, two people, and open water.",
    intro:
      "Just the two of you, a captain who stays out of the frame, and a stretch of quiet water off Mumbai. Two hours is the usual booking — long enough to clear the harbour, drop anchor somewhere calm and watch the light go.",
    image: card("photo-1768099672705-6767a4ab4322"),
    imageAlt: "A couple watching the sunset from a boat with a glass of wine",
    gallery: [
      { src: wide("photo-1768099672705-6767a4ab4322"), alt: "A couple watching the sunset from a boat with a glass of wine" },
      { src: wide("photo-1599582350162-83106f579198"), alt: "A couple sitting together at the stern of a yacht" },
      { src: wide("photo-1598770722761-0cab70ffd2fb"), alt: "The view from the bow across the water at sunset" },
    ],
    seoTitle: "Yacht Date in Mumbai — Private Romantic Boat Charter for Two",
    seoDescription:
      "A private yacht date in Mumbai for two. Two hours on the water with a licensed captain and crew, anchorage at sunset, and the whole boat to yourselves.",
    whatsappMessage: "Hi Saildeck! I would like to plan a yacht date for two.",
  },
  {
    slug: "proposal-on-a-yacht",
    name: "Proposal on a Yacht",
    category: "Romance",
    teaser: "Ask the question with the skyline behind you.",
    intro:
      "Flowers on the rail, the ring somewhere safe, and a crew briefed to disappear at exactly the right moment. We set the boat up before you board and time the anchorage for golden hour, so the moment lands where you planned it rather than wherever the boat happens to be.",
    image: card("photo-1772940817118-f5eba2efe23f"),
    imageAlt: "A boat decorated with flowers on the water",
    gallery: [
      { src: wide("photo-1772940817118-f5eba2efe23f"), alt: "A boat decorated with flowers on the water" },
      { src: wide("photo-1599582350162-83106f579198"), alt: "A couple sitting together at the stern of a yacht" },
      { src: wide("photo-1681331325415-a497fd712ee6"), alt: "A yacht silhouetted against an evening sky" },
    ],
    seoTitle: "Proposal on a Yacht in Mumbai — Private Engagement Setup at Sea",
    seoDescription:
      "Plan a proposal on a yacht in Mumbai. Decoration, flowers, timed sunset anchorage and a discreet crew, arranged before you board. Photographer available on request.",
    whatsappMessage: "Hi Saildeck! I would like to plan a proposal on a yacht.",
  },
  {
    slug: "wedding-photoshoot-on-a-yacht",
    name: "Wedding Photoshoot on a Yacht",
    category: "Shoots & media",
    teaser: "Golden hour, open deck, nobody in the background.",
    intro:
      "A yacht gives your photographer what no beach in Mumbai can: a clean horizon, no bystanders wandering into frame, and light that moves with you. We hold position for the shots that need stillness and run for the ones that need a wake.",
    image: card("photo-1538009670962-731a0818975a"),
    imageAlt: "A bride in a white gown photographed on the deck of a yacht",
    gallery: [
      { src: wide("photo-1538009670962-731a0818975a"), alt: "A bride in a white gown photographed on the deck of a yacht" },
      { src: wide("photo-1753703986203-cae375294196"), alt: "A bride and groom celebrating their wedding on a boat" },
      { src: wide("photo-1731368960318-832d21828761"), alt: "A bride and groom standing together on a boat" },
      { src: wide("photo-1675377910957-50d9c5d8a9ec"), alt: "A bride and groom posing for a photograph beside a boat" },
    ],
    seoTitle: "Wedding & Pre-Wedding Photoshoot on a Yacht in Mumbai",
    seoDescription:
      "Charter a yacht for a wedding or pre-wedding photoshoot in Mumbai. Clean horizons, no crowds, golden-hour timing and a captain who works to your shot list.",
    whatsappMessage: "Hi Saildeck! I would like to book a yacht for a wedding photoshoot.",
  },
  {
    slug: "sunset-cruise",
    name: "Sunset Cruise",
    category: "Cruises",
    teaser: "The two hours everyone books, and nobody regrets.",
    intro:
      "Board about ninety minutes before sunset, clear the harbour while there is still light on the water, and drop anchor as it turns. It is the most-booked slot we run on every boat in the fleet, which is exactly why it is worth reserving early.",
    image: card("photo-1628029338883-61644ec68475"),
    imageAlt: "A yacht on open water as the sun sets behind it",
    gallery: [
      { src: wide("photo-1628029338883-61644ec68475"), alt: "A yacht on open water as the sun sets behind it" },
      { src: wide("photo-1598770722761-0cab70ffd2fb"), alt: "The view from the bow across the water at sunset" },
      { src: wide("photo-1526761122248-c31c93f8b2b9"), alt: "A sailing yacht heeling under full sail at sunset" },
      { src: wide("photo-1774579891903-b48c080536b5"), alt: "Two luxury yachts moored at a dock at sunset" },
    ],
    seoTitle: "Sunset Cruise in Mumbai — Private Yacht Charter at Golden Hour",
    seoDescription:
      "Book a private sunset cruise in Mumbai. Board ninety minutes before sundown, anchor for golden hour, and pay for the whole boat rather than per person.",
    whatsappMessage: "Hi Saildeck! I would like to book a sunset cruise.",
  },
  {
    slug: "sunrise-cruise",
    name: "Morning Sunrise Cruise",
    category: "Cruises",
    teaser: "Flat water, empty harbour, a city still asleep.",
    intro:
      "The sea off Mumbai is at its calmest before eight, the harbour is empty, and the light is soft enough to photograph anything. Early starts are the best-kept secret on this coast — and the slot where you are most likely to see dolphins.",
    image: card("photo-1768887586998-3d21cf894bc9"),
    imageAlt: "Sailboats in a misty harbour at first light",
    gallery: [
      { src: wide("photo-1768887586998-3d21cf894bc9"), alt: "Sailboats in a misty harbour at first light" },
      { src: wide("photo-1768887587069-e776945e6f88"), alt: "Sailboats in a foggy harbour with the city skyline behind" },
      { src: wide("photo-1676629147275-c306d03fe4fa"), alt: "Calm harbour water with a boat under way" },
    ],
    seoTitle: "Morning Sunrise Cruise in Mumbai — Early Private Yacht Charter",
    seoDescription:
      "A sunrise cruise from the Gateway of India. The calmest water of the day, an empty harbour and soft early light, on a private boat with captain and crew.",
    whatsappMessage: "Hi Saildeck! I would like to book a morning sunrise cruise.",
  },
  {
    slug: "birthday-on-a-yacht",
    name: "Birthday on a Yacht",
    category: "Celebrations",
    teaser: "Cake at anchor. Sound system included.",
    intro:
      "Decoration, a cake that survives the tender ride, a bar, and a sound system that actually carries on an open deck. Tell us the age, the head count and the mood, and the boat is set up before your first guest steps aboard.",
    image: card("photo-1628336707631-68131ca720c3"),
    imageAlt: "Guests raising champagne glasses on a yacht deck",
    gallery: [
      { src: wide("photo-1628336707631-68131ca720c3"), alt: "Guests raising champagne glasses on a yacht deck" },
      { src: wide("photo-1759497904811-fc906fdcd270"), alt: "A group of people enjoying a day on a yacht" },
      { src: wide("photo-1736299297925-da1c8b1e2072"), alt: "A group standing together on the deck of a boat" },
    ],
    seoTitle: "Birthday Party on a Yacht in Mumbai — Private Celebration Charter",
    seoDescription:
      "Throw a birthday on a yacht in Mumbai. Decoration, cake, bar and sound system arranged, whole-boat pricing for groups from two to thirty guests.",
    whatsappMessage: "Hi Saildeck! I would like to plan a birthday on a yacht.",
  },
  {
    slug: "mumbai-darshan-by-cruise",
    name: "Mumbai Darshan by Cruise",
    category: "Cruises",
    teaser: "The Gateway, Marine Drive and the forts, from the water.",
    intro:
      "The city seen from the side it was built to be approached from. The Gateway of India and the Taj, the curve of Marine Drive, the harbour forts and the working docks — narrated by a crew who know what you are actually looking at.",
    image: card("photo-1751608734207-1c68d53554b4"),
    imageAlt: "The Gateway of India and Taj Mahal Palace hotel seen from the harbour",
    gallery: [
      { src: wide("photo-1751608734207-1c68d53554b4"), alt: "The Gateway of India and Taj Mahal Palace hotel seen from the harbour" },
      { src: wide("photo-1751608734211-a3222aaeb4ce"), alt: "The Mumbai skyline over the water at sunset" },
      { src: wide("photo-1570168007204-dfb528c6958f"), alt: "Yachts on Mumbai harbour with the city behind" },
      { src: wide("photo-1680014340368-217dca91d261"), alt: "The Mumbai city skyline seen from across the water" },
    ],
    seoTitle: "Mumbai Darshan by Cruise — Sightseeing Boat Tour of the Harbour",
    seoDescription:
      "See Mumbai from the water: Gateway of India, Marine Drive, the harbour forts and the docks, on a private cruise with a crew who narrate the route.",
    whatsappMessage: "Hi Saildeck! I would like to book a Mumbai darshan cruise.",
  },
  {
    slug: "film-shooting-on-a-yacht",
    name: "Film Shooting on a Yacht",
    category: "Shoots & media",
    teaser: "A location that moves, with the paperwork already sorted.",
    intro:
      "Features, ad films, music videos and OTT shoots. We supply the vessel, the crew and the permissions — coast guard intimation, port clearance and a captain who is used to holding a heading while a shot is set up.",
    image: card("photo-1524834671419-aa7d41c1c657"),
    imageAlt: "A silhouetted camera crew filming beside the water",
    gallery: [
      { src: wide("photo-1524834671419-aa7d41c1c657"), alt: "A silhouetted camera crew filming beside the water" },
      { src: wide("photo-1632187981988-40f3cbaeef5e"), alt: "A crew gathered around a camera set-up on location" },
      { src: wide("photo-1594394489098-74ac04c0fc2e"), alt: "A professional video camera recording on location" },
    ],
    seoTitle: "Film Shooting on a Yacht in Mumbai — Boat Hire for Productions",
    seoDescription:
      "Hire a yacht for film, ad, music video or OTT shoots in Mumbai. Vessel, crew, coast guard intimation and port permissions handled by one team.",
    whatsappMessage: "Hi Saildeck! I would like to enquire about a yacht for a film shoot.",
  },
  {
    slug: "influencer-collaborations",
    name: "Influencer Collaborations",
    category: "Shoots & media",
    teaser: "A deck that looks as good as it feels.",
    intro:
      "Content-first charters for creators and brands, with rates and deliverables agreed up front rather than negotiated at the jetty. Come for a reel, a campaign shoot or a launch — we will tell you which boat photographs best in which light.",
    image: card("photo-1749183563789-ae17d4a952d2"),
    imageAlt: "Guests on the upper deck of a charter yacht beside the pool",
    gallery: [
      { src: wide("photo-1749183563789-ae17d4a952d2"), alt: "Guests on the upper deck of a charter yacht beside the pool" },
      { src: wide("photo-1759497904811-fc906fdcd270"), alt: "A group of people enjoying a day on a yacht" },
      { src: wide("photo-1708246117134-9b3b72fd4e76"), alt: "A group gathered on the deck of a chartered yacht" },
    ],
    seoTitle: "Influencer Collaborations — Yacht Charters for Creators & Brands",
    seoDescription:
      "Yacht collaborations for creators and brands in Mumbai and Goa. Content-first charters with deliverables and rates agreed before the shoot date.",
    whatsappMessage: "Hi Saildeck! I would like to discuss an influencer collaboration.",
  },
  {
    slug: "yacht-photographers",
    name: "Yacht Photographers",
    category: "Shoots & media",
    teaser: "Someone on board who already knows the light.",
    intro:
      "Photographers who have shot on these boats before, so nobody spends the first hour working out where to stand. Book one alongside any charter and you step off with a set of edited images instead of four hundred phone photos.",
    image: card("photo-1763400681783-9657ab2d5a46"),
    imageAlt: "A photographer shooting a portrait on the deck of a boat",
    gallery: [
      { src: wide("photo-1763400681783-9657ab2d5a46"), alt: "A photographer shooting a portrait on the deck of a boat" },
      { src: wide("photo-1763736808975-ecf176e1bd72"), alt: "Taking a photograph from a boat at sea" },
      { src: wide("photo-1763400681249-7aedc1394675"), alt: "Photographing the coastline from a boat" },
      { src: wide("photo-1763736808904-ea253061553e"), alt: "Framing a shot from the deck of a boat" },
    ],
    seoTitle: "Yacht Photographers in Mumbai — Onboard Photography for Charters",
    seoDescription:
      "Add a photographer to any Saildeck charter. Shooters who know these boats and this harbour, delivering edited images rather than raw phone photos.",
    whatsappMessage: "Hi Saildeck! I would like to book a photographer for a charter.",
  },
];

export const getProduct = (slug: string) => products.find((p) => p.slug === slug);
