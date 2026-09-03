export type DestinationSlug = "mumbai" | "goa" | "navi-mumbai" | "rest-of-india";

export type Destination = {
  slug: DestinationSlug;
  name: string;
  shortName: string;
  seoTitle: string;
  seoDescription: string;
  h1: string;
  accent: string;
  intro: string;
  /** Departure jetties — these also capture "near me" searches. */
  departures: { name: string; note: string }[];
  routes: { name: string; duration: string; note: string }[];
  bestTime: string;
  facts: { label: string; value: string }[];
  faqs: { q: string; a: string }[];
  image: string;
  imageAlt: string;
  /** Which yachts are based here — matches Yacht.destinations */
  fleetNote: string;
};

export const destinations: Destination[] = [
  {
    slug: "mumbai",
    name: "Mumbai",
    shortName: "Mumbai",
    seoTitle: "Yacht Rental in Mumbai — Private Charters from Gateway of India",
    seoDescription:
      "Rent a private yacht in Mumbai from the Gateway of India. Sunset cruises, birthday and corporate charters with captain and crew, plus speedboat transfers to Elephanta and Alibaug.",
    h1: "Yacht rental in",
    accent: "Mumbai",
    intro:
      "Mumbai charters leave from the Gateway of India, which puts the skyline, Marine Drive and open sea within twenty minutes of the jetty. Boats are hired by the hour with captain and crew included, and the two-hour sunset slot is the one everybody wants.",
    departures: [
      { name: "Gateway of India, Colaba", note: "The main jetty. A ferry runs you out to the yacht at anchor — about ten minutes." },
      { name: "Bandra Bandstand", note: "Convenient for the western suburbs and best for evening departures." },
      { name: "Jawahar Dweep anchorage", note: "The usual anchor point for swim stops on longer day charters." },
    ],
    routes: [
      { name: "Sunset skyline cruise", duration: "2 hours", note: "Gateway to Marine Drive and back, timed to sunset." },
      { name: "Elephanta day cruise", duration: "4–6 hours", note: "Out to Elephanta Island with an anchored swim stop." },
      { name: "Harbour party charter", duration: "3 hours", note: "Anchored in the harbour with music, bar and catering." },
    ],
    bestTime:
      "October to May. The southwest monsoon closes coastal charter operations from June to September, so plan around it.",
    facts: [
      { label: "Season", value: "Oct – May" },
      { label: "From", value: "₹11,900/hr" },
      { label: "Main jetty", value: "Gateway of India" },
      { label: "Group size", value: "2 – 30 guests" },
    ],
    faqs: [
      {
        q: "How much does it cost to rent a yacht in Mumbai?",
        a: "Saildeck yachts in Mumbai start at ₹11,900 per hour and run to ₹33,000 per hour for the flagship. The rate includes captain, crew, fuel for the standard route and life jackets. Catering, decoration and water sports are quoted on top.",
      },
      {
        q: "Where do Mumbai yacht charters depart from?",
        a: "Almost all departures are from the Gateway of India in Colaba, with Bandra available for some boats. You board a ferry at the jetty which takes about ten minutes to reach the yacht at anchor.",
      },
      {
        q: "How many people can join a yacht in Mumbai?",
        a: "Our Mumbai fleet ranges from 10 guests up to 30. Capacity is fixed by each vessel's coast guard licence and cannot be exceeded, so tell us your group size when you enquire.",
      },
      {
        q: "Can we bring our own food and alcohol on board?",
        a: "Outside food is usually fine and we confirm per boat. Alcohol rules vary by vessel and by the permits in force on the day, so check with us before you buy anything.",
      },
      {
        q: "What happens if the weather turns?",
        a: "If the coast guard suspends sailing or the captain judges conditions unsafe, we move your charter to another date at no cost. Safety calls are made by the captain and are final.",
      },
    ],
    image: "https://images.unsplash.com/photo-1570168007204-dfb528c6958f?auto=format&fit=crop&w=1800&q=80",
    imageAlt: "The Gateway of India at dusk with boats on the harbour",
    fleetNote: "Six yachts and three speedboats based at the Gateway of India.",
  },
  {
    slug: "goa",
    name: "Goa",
    shortName: "Goa",
    seoTitle: "Yacht Rental in Goa — Private Boat Charters on the Mandovi",
    seoDescription:
      "Book a private yacht in Goa on the Mandovi river and the Arabian Sea. Sunset cruises, bachelorette parties, Grande Island day charters with captain and crew.",
    h1: "Yacht rental in",
    accent: "Goa",
    intro:
      "Goa charters leave from the Mandovi river at Panjim and from Britona, and the water is calm enough that first-timers rarely feel the swell. The classic booking is a sunset cruise down the Mandovi; the better one is a half day out to Grande Island for snorkelling.",
    departures: [
      { name: "Panjim jetty, Mandovi river", note: "Central and easy to reach from North Goa hotels." },
      { name: "Britona, Betim", note: "A quieter boarding point, popular for private parties." },
      { name: "Mormugao / Vasco", note: "The best starting point for Grande Island and South Goa charters." },
    ],
    routes: [
      { name: "Mandovi sunset cruise", duration: "2 hours", note: "River cruise past Panjim and Reis Magos fort." },
      { name: "Grande Island charter", duration: "5–6 hours", note: "Snorkelling and dolphin spotting with a swim stop." },
      { name: "Bachelorette party cruise", duration: "3 hours", note: "Decor, music and catering arranged on board." },
    ],
    bestTime:
      "November to March is peak season with the calmest water. Charters pause during the monsoon from June to September.",
    facts: [
      { label: "Season", value: "Nov – Mar peak" },
      { label: "From", value: "₹11,900/hr" },
      { label: "Main jetty", value: "Panjim, Mandovi" },
      { label: "Group size", value: "2 – 20 guests" },
    ],
    faqs: [
      {
        q: "How much is a yacht in Goa per hour?",
        a: "Goa yachts start around ₹11,900 per hour with captain and crew included. Most bookings carry a two or three hour minimum, and half-day island charters are quoted as a package.",
      },
      {
        q: "Will we see dolphins on a Goa yacht cruise?",
        a: "Sightings are common on the Grande Island and river-mouth routes, especially in the morning. They are wild animals, so no operator can guarantee them.",
      },
      {
        q: "Do you arrange decoration for birthdays and proposals in Goa?",
        a: "Yes. Floral setups, balloon decor, a cake and a photographer can all be arranged with 48 hours' notice. Tell us the occasion when you enquire and we will quote it with the boat.",
      },
      {
        q: "Is a yacht charter in Goa safe for children and non-swimmers?",
        a: "Yes. Life jackets are carried for every guest including child sizes, and the crew is trained in water rescue. Children must be supervised on deck at all times.",
      },
    ],
    image: "https://images.unsplash.com/photo-1519046904884-53103b34b206?auto=format&fit=crop&w=1800&q=80",
    imageAlt: "A palm-lined Goa beach with clear water and moored boats",
    fleetNote: "Five yachts and a catamaran operating from Panjim and Britona.",
  },
  {
    slug: "navi-mumbai",
    name: "Navi Mumbai",
    shortName: "Navi Mumbai",
    seoTitle: "Yacht & Boat Rental in Navi Mumbai — Belapur Jetty Charters",
    seoDescription:
      "Private yacht and speedboat charters in Navi Mumbai from Belapur jetty. Creek cruises, harbour trips and fast transfers to South Mumbai without the road traffic.",
    h1: "Yacht rental in",
    accent: "Navi Mumbai",
    intro:
      "Navi Mumbai is the quietest way onto the water in the region. Departures run from Belapur into the creek and out across the harbour, and for anyone living in Vashi, Kharghar or Panvel it removes the two-hour drive to Colaba entirely.",
    departures: [
      { name: "Belapur jetty", note: "Main departure point, quick access from Vashi, Kharghar and Panvel." },
      { name: "Nerul / Palm Beach", note: "Used for smaller boats and private pickups by arrangement." },
      { name: "JNPT harbour anchorages", note: "Anchoring points on the harbour crossing toward South Mumbai." },
    ],
    routes: [
      { name: "Creek and harbour cruise", duration: "2 hours", note: "Belapur creek out to the open harbour and back." },
      { name: "Belapur to Gateway transfer", duration: "35–45 minutes", note: "Fast crossing to South Mumbai, traffic-free." },
      { name: "Sunset charter", duration: "2–3 hours", note: "Evening cruise with the skyline across the water." },
    ],
    bestTime:
      "October to May, like the rest of the coast. The creek is more sheltered than open sea, so shoulder-season days here are often usable when Colaba departures are not.",
    facts: [
      { label: "Season", value: "Oct – May" },
      { label: "To Gateway", value: "35–45 min" },
      { label: "Main jetty", value: "Belapur" },
      { label: "Group size", value: "2 – 15 guests" },
    ],
    faqs: [
      {
        q: "Can I book a yacht from Navi Mumbai instead of the Gateway of India?",
        a: "Yes. We operate departures from Belapur jetty, which for anyone in Vashi, Kharghar or Panvel saves a long drive into South Mumbai. Boat choice is smaller than at the Gateway, so book a little further ahead.",
      },
      {
        q: "How long does a boat take from Navi Mumbai to South Mumbai?",
        a: "A speedboat crossing from Belapur to the Gateway area takes roughly 35 to 45 minutes depending on sea state — comfortably faster than the road at almost any time of day.",
      },
      {
        q: "Is the water calmer in Navi Mumbai?",
        a: "Inside the creek, yes, noticeably. Once you cross into the open harbour it is the same conditions as anywhere else in Mumbai, so the captain will route according to the day.",
      },
    ],
    image: "https://images.unsplash.com/photo-1676629147275-c306d03fe4fa?auto=format&fit=crop&w=1800&q=80",
    imageAlt: "A boat crossing calm harbour water in golden evening light",
    fleetNote: "Speedboats and mid-size yachts operating out of Belapur jetty.",
  },
  {
    slug: "rest-of-india",
    name: "Rest of India",
    shortName: "Rest of India",
    seoTitle: "Yacht Charters Across India — Kochi, Andamans, Lakshadweep & More",
    seoDescription:
      "Private yacht charters beyond Mumbai and Goa. Kochi backwaters, Andaman & Nicobar, Lakshadweep and coastal Karnataka, arranged with vetted local operators and Saildeck oversight.",
    h1: "Charters across the",
    accent: "rest of India",
    intro:
      "Mumbai and Goa are our home ports, but the best cruising in India is further out. We arrange charters along the rest of the coast through operators we have personally vetted, with our own people coordinating the booking.",
    departures: [
      { name: "Kochi, Kerala", note: "Backwaters and the Arabian Sea coast; strong year-round infrastructure." },
      { name: "Port Blair, Andaman & Nicobar", note: "The best diving and clearest water in Indian territory." },
      { name: "Kavaratti, Lakshadweep", note: "Permit-controlled, exceptional lagoon sailing." },
      { name: "Karwar & coastal Karnataka", note: "Quiet coastline, growing marina infrastructure." },
    ],
    routes: [
      { name: "Kerala backwater and coastal charter", duration: "1–3 days", note: "Combine open coast with the backwater network." },
      { name: "Andamans island-hopping", duration: "3–7 days", note: "Havelock, Neil and remote anchorages with diving." },
      { name: "Lakshadweep lagoon charter", duration: "5–10 days", note: "Permit-led itinerary, best planned months ahead." },
    ],
    bestTime:
      "The west coast runs October to May. The Andamans have a different weather pattern and are best from November to April, avoiding both monsoons.",
    facts: [
      { label: "Regions", value: "4+" },
      { label: "Notice", value: "3–8 weeks" },
      { label: "Permits", value: "Handled" },
      { label: "Oversight", value: "Saildeck" },
    ],
    faqs: [
      {
        q: "Do you operate charters outside Mumbai and Goa?",
        a: "We arrange them. Mumbai, Navi Mumbai and Goa are the ports where we run our own boats and crew. Elsewhere we work with operators we have inspected ourselves, and we say so plainly rather than pretending to a fleet we do not have there.",
      },
      {
        q: "How far in advance should I book an Andaman or Lakshadweep charter?",
        a: "Three to eight weeks, and longer for Lakshadweep because entry permits take time and are limited. Peak December and January dates need several months.",
      },
      {
        q: "Are permits required for Lakshadweep and the Andamans?",
        a: "Lakshadweep requires an entry permit for all visitors, and certain Andaman islands are restricted. We handle the applications as part of the booking.",
      },
      {
        q: "Can you arrange a multi-day liveaboard charter?",
        a: "Yes, particularly in the Andamans and Lakshadweep where liveaboard is the only sensible way to see the islands. Itineraries are built around diving, weather windows and permit constraints.",
      },
    ],
    image: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=1800&q=80",
    imageAlt: "A catamaran anchored off a remote tropical island",
    fleetNote: "Arranged through vetted partner operators with Saildeck coordination.",
  },
];

export const getDestination = (slug: string) =>
  destinations.find((d) => d.slug === slug);
