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
   *
   * A gallery with exactly one entry skips the carousel entirely and renders
   * at that photo's own intrinsic size (see `width`/`height` below) instead
   * of being force-cropped into the carousel's wide aspect ratio — for a
   * single real (often portrait) photo rather than a curated set of same-ratio
   * shots. Set `width`/`height` (the file's actual pixel dimensions) whenever
   * you want that — omit them and it falls back to the cropped carousel frame.
   */
  gallery: { src: string; alt: string; width?: number; height?: number }[];
  seoTitle: string;
  seoDescription: string;
  /** Pre-filled WhatsApp text so an enquiry arrives already labelled. */
  whatsappMessage: string;

  /**
   * Everything below is optional — most experience pages stay deliberately
   * thin (see the file header). A page with real search demand and a lot to
   * say (pricing tiers, add-ons, a long FAQ) can fill these in instead, and
   * the template renders them when present without changing anything for
   * the pages that don't use them yet.
   */

  /** Small stat strip shown under the title, e.g. "From ₹3,500". */
  facts?: { label: string; value: string }[];

  /** Long-form sections rendered between the intro and "How booking works". */
  sections?: {
    heading: string;
    /** One paragraph, or several — same markdown-lite as blog copy (RichText). */
    body: string | string[];
    bullets?: string[];
    /**
     * `width`/`height` (the file's actual pixel dimensions) render the photo
     * at its own aspect ratio, uncropped. Omit them and it falls back to a
     * cropped 16:9 frame.
     */
    image?: { src: string; alt: string; caption?: string; width?: number; height?: number };
  }[];

  /** Boat/price-tier cards, e.g. compact sail boats through luxury motor yachts. */
  pricingTiers?: {
    label: string;
    price: string;
    unit?: string;
    description: string;
    bestFor?: string;
  }[];

  /** Add-on cards — decor, photography, catering, drone, etc. */
  addOns?: { title: string; price: string; description: string }[];

  /** Overrides the generic "Good to know" bullet list when set. */
  goodToKnow?: string[];

  /** Long FAQ list rendered above "Other experiences". */
  faqs?: { q: string; a: string }[];
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
      "A proposal on a yacht buys you the one thing no restaurant, rooftop or beach in Mumbai or Goa can promise: total privacy at the exact moment it matters, with nobody's cousin, waiter or stranger wandering into the photo. We hold the boat, the decor, the crew and the timing — you hold the ring. Flowers on the rail, a Marry Me sign at the right height for the camera, and a captain who knows to anchor and go quiet exactly when you ask.",
    image: "/images/products/proposal-on-a-yacht/proposal-on-a-yacht-mumbai-goa-marry-me-sunset-hero.jpg",
    imageAlt: "A couple embracing beside a lit Marry Me sign on a yacht bow at sunset, the Mumbai skyline behind",
    // Single entry deliberately — Gallery.tsx only shows carousel chrome
    // (arrows, counter, thumbnail strip) once there is more than one shot,
    // so this renders as one plain banner image, no carousel.
    gallery: [
      { src: "/images/products/proposal-on-a-yacht/proposal-on-a-yacht-mumbai-goa-marry-me-sunset-hero.jpg", alt: "A couple embracing beside a lit Marry Me sign on a yacht bow at sunset, the Mumbai skyline behind", width: 1200, height: 1600 },
    ],
    seoTitle: "Proposal on a Yacht in Mumbai & Goa — Boats from ₹3,500, Decor from ₹500",
    seoDescription:
      "Plan a proposal on a yacht or sailboat in Mumbai and Goa. Boats from ₹3,500 to ₹40,000, Marry Me decor from ₹500 to ₹15,000, photographers, catering and a timed golden-hour or sunrise anchorage — arranged before you board.",
    whatsappMessage: "Hi Saildeck! I would like to plan a proposal on a yacht.",
    facts: [
      { label: "Boats from", value: "₹3,500 / 2 hrs" },
      { label: "Luxury yachts to", value: "₹40,000" },
      { label: "Decor add-ons", value: "₹500 – ₹15,000" },
      { label: "Best time", value: "7 – 9 AM" },
    ],
    sections: [
      {
        heading: "Why a proposal on a yacht works better than almost anywhere else",
        body: [
          "On land, a proposal competes with other people's Saturday — waiters circling the table, a stranger's flash photography, a cousin who wasn't supposed to know yet wandering past at the wrong second. A yacht removes all of that by design. Once you clear the harbour there is no one else on the boat but the people you chose to be there, and the captain and crew are briefed to stay out of frame and out of earshot until you signal otherwise.",
          "It also solves the backdrop problem every proposal has. Mumbai's skyline from open water — the Gateway of India, the Taj Mahal Palace dome, the fishing boats silhouetted against the Arabian Sea — is a view almost nobody watches from this angle, which is exactly what makes it read as a moment rather than a location. In Goa, the same logic plays out against the Mandovi's river mouth, Aguada's fort walls, or open water off Vagator with nothing but sea to the horizon. Either city gives you a clean, uncluttered frame that a beach, a restaurant terrace or a rooftop in the same city simply cannot.",
        ],
        image: {
          src: "/images/products/proposal-on-a-yacht/proposal-on-a-yacht-mumbai-gateway-of-india-couple.jpg",
          alt: "A couple in a red dress and suit on a motor yacht bow with the Gateway of India and Taj Mahal Palace Hotel behind",
          caption: "The Gateway of India and Taj Mahal Palace Hotel from the water — a backdrop no restaurant or rooftop in the city can match.",
          width: 1203,
          height: 803,
        },
      },
      {
        heading: "Choosing the right boat for your proposal",
        body: "The boat matters less than people expect and more than they plan for. A couple proposing quietly with no one else aboard wants something small and intimate; a couple bringing four close friends to hide nearby with a camera wants deck space and somewhere for a decorated corner that isn't the only place to stand. We ask two questions before recommending anything: how many people are actually coming, and do you want a produced moment (full decor, a hidden photographer, maybe a small celebration after) or a quiet one (just the two of you and the sea).",
        bullets: [
          "Compact sailboats and day boats — intimate, just the two of you, from ₹3,500 for 2 hours",
          "Mid-size motor yachts and catamarans — deck space for a small group and a photographer, ₹8,000–₹15,000",
          "Premium and luxury motor yachts — a cabin, a larger deck and a more produced setup, ₹25,000–₹40,000",
          "Every price is per boat, not per person — a small entourage costs the same as a couple alone",
          "The exact boat and rate depend on your date and home port — we confirm both before you pay a deposit",
        ],
        image: {
          src: "/images/products/proposal-on-a-yacht/proposal-on-a-yacht-sailboat-heart-balloons-mumbai.jpg",
          alt: "A couple on a sailboat bow with red heart balloons trailing from the rigging",
          caption: "A compact sailboat proposal, balloons trailing from the rigging — the ₹3,500 entry tier in practice.",
          width: 1192,
          height: 812,
        },
      },
      {
        heading: "Marry Me decor, balloons and styling",
        body: "Decoration is quoted as its own line, separate from the charter, in packages from ₹500 up to ₹15,000 depending on how elaborate you want it. A simple Marry Me balloon arch or foil sign is enough for most couples and photographs cleanly against open water. At the top end, we run a full rose-petal runway, a floral arch, fairy lights for a dawn or dusk shoot, and a styled table for the toast afterwards. Tell us your budget for this line specifically and we'll show you what it buys rather than upselling you past it.",
        bullets: [
          "Marry Me balloon arch or foil signage only — from ₹500",
          "Petals, balloons and a banner set up together — ₹2,500–₹5,000",
          "Full floral arch, petal runway, fairy lights and a styled toast table — ₹8,000–₹15,000",
          "Colour themes matched to your outfits or the time of day on request",
          "Decor is set up before you board — you walk into it, not into a crew still working",
        ],
        image: {
          src: "/images/products/proposal-on-a-yacht/proposal-on-a-yacht-marry-me-floral-heart-decor.jpg",
          alt: "A heart-shaped floral arch with an illuminated Will You Marry Me sign and candles on a yacht bow at night",
          caption: "A full floral setup — the ₹8,000–₹15,000 top tier, styled and lit before you board.",
          width: 1190,
          height: 1190,
        },
      },
      {
        heading: "Photography, food and the rest of the production",
        body: [
          "Most proposals want the moment on camera without the photographer being visible in it. We can place a shooter on deck as an obvious third guest, or brief them to stay low and shoot candidly from a distance — tell us which and we'll set the boat up accordingly. Photography and videography are quoted separately from the charter, based on hours on the water and what you want delivered (edited stills, a highlight reel, or both).",
          "Food is as simple or as done-up as you want. Bring your own cake and snacks and we provide plates, glasses and basic serving — no extra charge. Or ask us to arrange catering: a cake, canapés, a full sit-down meal or a delivered order from a restaurant near the jetty, all quoted and confirmed before you board so there's no second bill waiting when you're back on land. A sound system is standard on every boat for a playlist or a first song.",
        ],
        bullets: [
          "In-house photographer and videographer available, quoted by the hour",
          "Bring your own cake and snacks — plates and serving included at no extra cost",
          "Catering arranged on request: cake, canapés, a full meal, or a nearby restaurant delivery",
          "Bluetooth sound system on every boat for your own playlist",
          "A short champagne toast or celebration after the proposal can be built into the same booking",
        ],
      },
      {
        heading: "Alcohol on board",
        body: "Alcohol is not automatically included and needs prior permission before your date — Indian coastal and excise rules mean it can't simply be brought aboard on the day without us knowing in advance. Tell us if you want champagne for the toast or drinks for a small group and we'll confirm what's possible for your specific boat and route, and arrange it properly rather than leaving it to chance at the jetty.",
      },
      {
        heading: "Drone photography — different rules in Mumbai and Goa",
        body: "If aerial footage of the proposal matters to you, this is the one thing that depends entirely on which city you book in. Drone flights are not permitted over Mumbai's coastal waters near the Gateway of India — the area sits inside restricted airspace, and no operator can legally fly there regardless of what's advertised elsewhere. In Goa, drone photography is allowed with the standard permissions in place, so if an aerial shot of the boat and the moment is important to you, a Goa charter is the one that can actually deliver it. We arrange the drone operator as part of the photography package when you book in Goa.",
      },
      {
        heading: "The best time of day to propose",
        body: [
          "Early morning — 7 to 9 AM — is genuinely the best window, and not for a romantic reason so much as a practical one. The water off both Mumbai and Goa is at its calmest before the day's boat traffic and wind pick up, which means a steadier deck, cleaner audio if you're filming, and none of the afternoon haze that dulls the skyline in photographs. The light is soft and directional rather than flat overhead sun, harbour and marina traffic is lightest, and you have the anchorage largely to yourselves.",
          "Sunset remains the popular choice for couples who want the golden-hour colour in their photographs and don't mind sharing the window with every other boat doing the same thing that evening — bookings for the last two hours before dusk go first and are worth confirming early. Either way, we time the anchorage to the light you've chosen, not the other way around.",
        ],
        image: {
          src: "/images/products/proposal-on-a-yacht/proposal-on-a-yacht-sunset-flybridge-couple-embrace.jpg",
          alt: "A couple embracing on the flybridge deck of a motor yacht at sunset",
          caption: "Sunset's golden-hour light — the popular alternative to the 7–9 AM window.",
          width: 1331,
          height: 888,
        },
      },
      {
        heading: "How we keep the surprise",
        body: "If your partner doesn't know, tell us and we plan around it. That usually means booking the charter under a generic occasion, briefing the crew on the cover story you're using to get them to the jetty, and timing the decor to go up in the few minutes between boarding and the moment you want it revealed — either set up before you board if your partner won't see the boat beforehand, or concealed and unveiled once you're underway. We've done this enough times to know where a surprise typically falls apart, and we plan around those points specifically.",
        image: {
          src: "/images/products/proposal-on-a-yacht/proposal-on-a-yacht-cunning-plan-sailboat-couple.jpg",
          alt: "A couple standing at the mast of the sailboat Cunning Plan at dusk",
          caption: "Quiet, private, just the two of you — the moment before the ask.",
          width: 874,
          height: 1318,
        },
      },
    ],
    pricingTiers: [
      {
        label: "Compact sail & day boats",
        price: "From ₹3,500",
        unit: "for 2 hours",
        description: "Small, intimate boats for two, sometimes three or four. The simplest way to be genuinely alone on the water.",
        bestFor: "A quiet, private proposal with no one else aboard",
      },
      {
        label: "Mid-size motor yachts & catamarans",
        price: "₹8,000 – ₹15,000",
        unit: "for 2 hours",
        description: "More deck space for a small group, a photographer, and a proper decorated corner without crowding the boat.",
        bestFor: "A decorated proposal with a photographer or a few close friends",
      },
      {
        label: "Premium & luxury motor yachts",
        price: "₹25,000 – ₹40,000",
        unit: "for 2–3 hours",
        description: "A cabin, a larger deck and a more finished vessel for an elaborate setup, filming, or a celebration straight after.",
        bestFor: "A fully produced proposal, video shoot or one that rolls into a party",
      },
    ],
    addOns: [
      {
        title: "Marry Me balloons or signage",
        price: "From ₹500",
        description: "A balloon arch or foil Marry Me sign — the simplest package and the one most couples choose.",
      },
      {
        title: "Petals, balloons & banner",
        price: "₹2,500 – ₹5,000",
        description: "Rose petals, a balloon arch and a personalised banner set up together before you board.",
      },
      {
        title: "Full floral & fairy-light styling",
        price: "₹8,000 – ₹15,000",
        description: "A floral arch, petal runway, fairy lights and a styled toast table for a fully produced moment.",
      },
      {
        title: "Photography & videography",
        price: "Quoted by the hour",
        description: "An in-house shooter, visible or discreet — your choice — delivering edited stills, a highlight reel, or both.",
      },
      {
        title: "Catering & cake",
        price: "Quoted on request",
        description: "Cake, canapés, a full meal, or a delivered order from a restaurant near the jetty. Bring-your-own is always fine too.",
      },
      {
        title: "Drone coverage (Goa only)",
        price: "Quoted with photography",
        description: "Aerial stills and video, arranged with the photography package. Not permitted over Mumbai's coastal waters.",
      },
    ],
    goodToKnow: [
      "Boats range from ₹3,500 for a compact sail boat up to ₹40,000 for a luxury motor yacht, priced per boat for a standard 2-hour charter.",
      "Marry Me decor and styling is a separate add-on from ₹500 for balloons up to ₹15,000 for a full floral setup.",
      "Alcohol is not automatically included — it needs prior permission before your date, not a request made at the jetty.",
      "Drone photography is not permitted over Mumbai's coastal waters. It is allowed in Goa with standard permissions.",
      "Early morning, 7–9 AM, is the best window for calm water and soft light; sunset is the popular alternative and books out first.",
      "The season runs October to May; the southwest monsoon closes operations on both coasts.",
      "Weather cancellations called by the coast guard are rescheduled at no cost.",
    ],
    faqs: [
      {
        q: "What is the best time of day to propose on a yacht?",
        a: "Early morning — 7 to 9 AM — is genuinely the best window. The water is calmest before the day's traffic picks up, the light is soft rather than harsh overhead sun, and you'll have the anchorage largely to yourselves. Sunset is the popular alternative for the golden-hour colour in photographs, but those slots book out first and are worth confirming early.",
      },
      {
        q: "How much does a proposal on a yacht cost in Mumbai or Goa?",
        a: "The charter itself runs from ₹3,500 for a compact sail boat up to ₹40,000 for a luxury motor yacht, for a standard 2-hour booking, priced per boat rather than per person. Decor is a separate line from ₹500 for simple balloons to ₹15,000 for a full floral setup. We confirm the exact boat and total before you pay a deposit.",
      },
      {
        q: "Can we drink alcohol on the boat?",
        a: "Not automatically — alcohol requires prior permission before your date because of coastal and excise rules on both coasts. Tell us in advance if you want champagne for the toast or drinks for your group and we'll confirm what's possible for your specific boat and route.",
      },
      {
        q: "Can we get drone photos or video of the proposal?",
        a: "It depends on the city. Drone flights are not permitted over Mumbai's coastal waters near the Gateway of India — that airspace is restricted regardless of what any operator advertises. In Goa, drone photography is allowed with standard permissions, so a Goa charter is the one to book if aerial footage matters to you.",
      },
      {
        q: "Do you provide a photographer or videographer?",
        a: "Yes, an in-house photographer and videographer are available, quoted separately by the hour. Tell us whether you want them visible on deck or shooting discreetly from a distance, and we'll brief them and set the boat up accordingly.",
      },
      {
        q: "Can we bring our own food and cake, or do you cater?",
        a: "Both. Bring your own cake and snacks and we provide plates, glasses and serving at no extra charge. Or ask us to arrange catering — cake, canapés, a full meal, or a delivery from a restaurant near the jetty — all quoted and confirmed before you board.",
      },
      {
        q: "What does the Marry Me decor actually include?",
        a: "It depends on the package. The entry package (from ₹500) is a balloon arch or a foil Marry Me sign. The mid-tier (₹2,500–₹5,000) adds rose petals and a personalised banner. The top package (₹8,000–₹15,000) is a full floral arch, a petal runway, fairy lights and a styled table for the toast afterwards.",
      },
      {
        q: "Can family or friends come along, or wait onshore?",
        a: "Either. Some couples bring two or three close people to hide nearby with a camera; others want the boat entirely to themselves and have everyone waiting at the jetty for a celebration afterwards. Tell us which and we'll size the boat correctly — a bigger group needs more deck space, which shifts you into the mid-size or luxury tier.",
      },
      {
        q: "How do you keep the proposal a surprise?",
        a: "Tell us your partner doesn't know and we plan around it — a generic occasion on the booking, a cover story briefed to the crew for getting them to the jetty, and decor timed to appear either before boarding or once you're underway, whichever suits your plan. We've run enough of these to know where a surprise typically slips, and we plan around those points.",
      },
      {
        q: "How far in advance should we book?",
        a: "Two to three weeks is comfortable for a standard decorated proposal. Sunset slots, weekends and the December–February peak season book out faster, so if your date and time matter more than flexibility, message us as early as you can.",
      },
      {
        q: "What happens if the weather is bad on our date?",
        a: "If the coast guard suspends sailing or the captain judges conditions unsafe, we reschedule at no cost. That decision is always about safety and is never a commercial one.",
      },
      {
        q: "Is the boat completely private, or do we share it with other guests?",
        a: "Fully private. A Saildeck charter is exclusive to your booking — the only people aboard are your group, the captain and the crew running the boat, and anyone you've specifically arranged (a photographer, for instance).",
      },
      {
        q: "Is there a minimum group size?",
        a: "No — a proposal for two is the most common booking we run. Pricing is per boat, so a couple alone pays the same as a small group on the same vessel.",
      },
      {
        q: "Can we extend the charter if the proposal takes longer than planned, or we want to keep celebrating?",
        a: "Usually yes, subject to the boat's next booking and the captain's availability that day. Tell us if you'd like flexibility built in and we'll flag a boat with room to extend rather than one booked back-to-back.",
      },
      {
        q: "Do you operate proposal charters in both Mumbai and Goa?",
        a: "Yes. Mumbai charters leave from near the Gateway of India in Colaba; Goa charters run from the Mandovi River and coastal jetties around Panjim, Vasco and Candolim depending on the boat. Pricing, timing advice and decor packages are the same across both — drone availability is the one thing that differs.",
      },
      {
        q: "Which boat should we pick if we just want something small and quiet?",
        a: "A compact sail or day boat, from ₹3,500 for 2 hours. It's the most intimate option, best suited to a couple proposing with no one else aboard and a simple balloon or foil sign as the only decor.",
      },
      {
        q: "Is music available on board?",
        a: "Yes, every boat has a Bluetooth sound system as standard, so you can run your own playlist or have a specific song ready for the moment.",
      },
      {
        q: "Is champagne or a toast included, or is that extra?",
        a: "It's an add-on, arranged alongside your alcohol permission and decor package rather than bundled silently into the charter price — we quote it as its own line so there's no surprise on the final bill.",
      },
    ],
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
