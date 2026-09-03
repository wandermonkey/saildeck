/**
 * Speedboat transfer routes.
 *
 * Prices are indicative per-boat charter rates benchmarked against the Mumbai
 * market (Gateway–Mandwa private transfers sit around ₹6,000–₹8,500 one way
 * for a 5–6 seater). CONFIRM SAILDECK'S OWN RATES BEFORE LAUNCH — these are
 * the most price-sensitive pages on the site and a wrong number here costs you
 * trust on the first phone call.
 */
export type SpeedboatRoute = {
  slug: string;
  name: string;
  from: string;
  to: string;
  seoTitle: string;
  seoDescription: string;
  h1: string;
  accent: string;
  intro: string;
  duration: string;
  distanceNm: string;
  capacity: string;
  /** Indicative one-way charter price for the whole boat, in INR. */
  priceOneWay: number;
  priceReturn: number;
  includes: string[];
  goodToKnow: string[];
  /** Banner image for the page hero. */
  image: string;
  imageAlt: string;
  /** Carousel on the route page — same component as the boat listings. */
  gallery: { src: string; alt: string }[];
  faqs: { q: string; a: string }[];
};

const u = (id: string) =>
  `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=1600&q=80`;

export const speedboatRoutes: SpeedboatRoute[] = [
  {
    slug: "mumbai-to-elephanta",
    name: "Mumbai to Elephanta",
    from: "Gateway of India",
    to: "Elephanta Island",
    seoTitle: "Mumbai to Elephanta Speedboat — Private Charter from Gateway of India",
    seoDescription:
      "Private speedboat from the Gateway of India to Elephanta Caves in about 25 minutes. Skip the ferry queue, set your own timings, up to 6 guests per boat. Book on WhatsApp.",
    h1: "Mumbai to Elephanta",
    accent: "by speedboat",
    intro:
      "The public ferry takes an hour each way and leaves when it is full. A private speedboat does the crossing in about twenty-five minutes, waits for you at the island, and brings you back when you are ready — which turns a full-day expedition into a comfortable half day.",
    duration: "25 minutes each way",
    distanceNm: "≈ 6 nautical miles",
    capacity: "Up to 6 guests",
    priceOneWay: 9000,
    priceReturn: 25000,
    includes: [
      "Private boat — no sharing with other groups",
      "Licensed skipper and crew",
      "Life jackets for every guest, child sizes available",
      "Fuel for the standard route",
      "Waiting time at the island on a return charter",
    ],
    goodToKnow: [
      "Elephanta Caves are closed on Mondays — check before you book.",
      "There is a steep flight of around 120 steps from the jetty up to the caves.",
      "Return charters typically allow a three-hour stay; longer is quoted per hour.",
      "Carry water, sun protection and a hat — there is very little shade on the climb.",
      "Entry tickets to the caves are paid separately at the island.",
    ],
    image: "https://images.unsplash.com/photo-1593351415075-3bac9f45c877?auto=format&fit=crop&w=1800&q=80",
    imageAlt: "Speedboat crossing Mumbai harbour toward Elephanta Island",
    gallery: [
      { src: u("1568476612160-787b6a1d5fb1"), alt: "Speedboat under way on open sea toward Elephanta" },
      { src: u("1700981245449-312027b124cb"), alt: "Boats on Mumbai harbour with the city skyline behind" },
      { src: u("1552160757-52790c6f4faf"), alt: "Motorboat cutting through deep blue water leaving a white wake" },
      { src: u("1520255870062-bd79d3865de7"), alt: "Guests aboard a private speedboat in golden evening light" },
      { src: u("1682414593649-c3e4024a7995"), alt: "Mumbai harbour water with the city in the background" },
    ],
    faqs: [
      {
        q: "How long does the speedboat take from Mumbai to Elephanta?",
        a: "About twenty-five minutes from the Gateway of India, against roughly an hour on the public ferry. Sea conditions can add a few minutes but rarely more.",
      },
      {
        q: "How much does a private speedboat to Elephanta cost?",
        a: "A return charter with waiting time at the island is around ₹25,000 for the boat, carrying up to six guests. One-way transfers are quoted separately. The price is per boat, not per person.",
      },
      {
        q: "Is Elephanta open every day?",
        a: "No — the caves are closed on Mondays. The island itself and the boat crossing still run, but there is little point going on a Monday.",
      },
      {
        q: "Can we take children on the speedboat?",
        a: "Yes. Child-size life jackets are carried and the crossing is short. Bear in mind the climb from the jetty to the caves is around 120 steps, which is a lot for very small children in the heat.",
      },
      {
        q: "What happens if the sea is rough?",
        a: "The captain will either delay departure or, if the coast guard restricts sailing, reschedule your charter at no cost. We do not run the crossing in unsafe conditions.",
      },
    ],
  },
  {
    slug: "mumbai-to-alibaug",
    name: "Mumbai to Alibaug",
    from: "Gateway of India",
    to: "Mandwa Jetty, Alibaug",
    seoTitle: "Mumbai to Alibaug Speedboat — Private Transfer to Mandwa Jetty",
    seoDescription:
      "Private speedboat from the Gateway of India to Mandwa jetty, Alibaug, in about 20 minutes. Fixed price per boat, up to 6 guests, your own departure time. Book on WhatsApp.",
    h1: "Mumbai to Alibaug",
    accent: "by speedboat",
    intro:
      "The road to Alibaug takes three hours on a good day and considerably longer on a Friday evening. The speedboat does it in twenty minutes, on your schedule rather than the ferry timetable, and drops you at Mandwa jetty with your car or taxi waiting.",
    duration: "20 minutes each way",
    distanceNm: "≈ 9 nautical miles",
    capacity: "Up to 6 guests",
    priceOneWay: 7500,
    priceReturn: 13500,
    includes: [
      "Private boat with licensed skipper",
      "Life jackets for every guest",
      "Fuel for the standard route",
      "Luggage space for a weekend bag per guest",
      "Coordination with your onward taxi at Mandwa",
    ],
    goodToKnow: [
      "Departures run through daylight hours; night crossings are restricted.",
      "Mandwa jetty has taxis and pre-booked cars waiting; Alibaug town is about 30 minutes on.",
      "Weekend and long-weekend slots book out early — give us a few days' notice.",
      "Same-day return is usually cheaper than two separate one-way charters.",
      "Large luggage or sports equipment should be flagged when booking.",
    ],
    image: "https://images.unsplash.com/photo-1597154200389-d7ac4c75e180?auto=format&fit=crop&w=1800&q=80",
    imageAlt: "Speedboat under way at speed across open water",
    gallery: [
      { src: u("1597154200389-d7ac4c75e180"), alt: "Speedboat at speed on the crossing to Mandwa" },
      { src: u("1584212893031-410e387fbaf1"), alt: "Private speedboat on calm water off the Maharashtra coast" },
      { src: u("1569748133568-b68f8812723a"), alt: "Aerial view of a speedboat crossing open ocean" },
      { src: u("1622082671151-2cbd184f9e60"), alt: "Bow of a speedboat cutting through blue water" },
      { src: u("1519046904884-53103b34b206"), alt: "Palm-lined coastline near Alibaug seen from the water" },
    ],
    faqs: [
      {
        q: "How long is the speedboat from Mumbai to Alibaug?",
        a: "Around twenty minutes from the Gateway of India to Mandwa jetty. The road journey for the same trip is typically three hours or more.",
      },
      {
        q: "How much does a speedboat to Alibaug cost?",
        a: "A one-way private charter is around ₹7,500 for the boat and a same-day return around ₹13,500, carrying up to six guests. That is per boat — six people travelling together pay the same as two.",
      },
      {
        q: "Is the speedboat cheaper than the ferry?",
        a: "No. The scheduled catamaran ferry is far cheaper per person. You charter a speedboat to travel on your own timing, with your own group, without queuing — not to save money.",
      },
      {
        q: "Do speedboats to Alibaug run during the monsoon?",
        a: "No. Crossings are suspended through the southwest monsoon from roughly June to September when the coast guard restricts small-craft movement.",
      },
      {
        q: "Can I get a taxi at Mandwa jetty?",
        a: "Yes, taxis wait at the jetty, and we can pre-book a car for you. Alibaug town is about thirty minutes from Mandwa by road.",
      },
    ],
  },
  {
    slug: "mumbai-to-navi-mumbai",
    name: "Mumbai to Navi Mumbai",
    from: "Gateway of India",
    to: "Belapur Jetty",
    seoTitle: "Mumbai to Navi Mumbai Speedboat — Gateway to Belapur Transfer",
    seoDescription:
      "Private speedboat between the Gateway of India and Belapur jetty, Navi Mumbai, in about 40 minutes. Skip the harbour road traffic. Fixed per-boat pricing, up to 6 guests.",
    h1: "Mumbai to Navi Mumbai",
    accent: "by speedboat",
    intro:
      "Two cities separated by a harbour and joined by a road that is congested for most of the day. The water crossing takes about forty minutes regardless of the hour, which is why this route is increasingly a commuter run rather than a leisure one.",
    duration: "35–45 minutes each way",
    distanceNm: "≈ 12 nautical miles",
    capacity: "Up to 6 guests",
    priceOneWay: 11000,
    priceReturn: 19500,
    includes: [
      "Private boat with licensed skipper",
      "Life jackets for every guest",
      "Fuel for the standard route",
      "Flexible departure timing within daylight hours",
      "Pickup from Gateway of India or Belapur, either direction",
    ],
    goodToKnow: [
      "Crossing time is unaffected by road traffic — it is the same at 9am and 6pm.",
      "The route crosses commercial shipping lanes, so the skipper may adjust the line.",
      "Corporate accounts and repeat commuter bookings are quoted at a monthly rate.",
      "Belapur jetty gives quick access to Vashi, Kharghar and Panvel.",
      "Daylight operation only; night crossings are restricted.",
    ],
    image: "https://images.unsplash.com/photo-1676629147275-c306d03fe4fa?auto=format&fit=crop&w=1800&q=80",
    imageAlt: "Boat crossing Mumbai harbour with the city in the distance",
    gallery: [
      { src: u("1676629147275-c306d03fe4fa"), alt: "Boat crossing the harbour in golden evening light" },
      { src: u("1567369244263-8f45293b2178"), alt: "Speedboat seen from above on the harbour crossing" },
      { src: u("1666843527155-14ec5f016802"), alt: "Mumbai harbour water with the city skyline beyond" },
      { src: u("1668403778734-98d95d31a110"), alt: "Guests aboard a private transfer boat" },
      { src: u("1672313961515-7635e35ffc8e"), alt: "Sun setting over the Mumbai skyline from the water" },
    ],
    faqs: [
      {
        q: "How long does the boat take from Mumbai to Navi Mumbai?",
        a: "Thirty-five to forty-five minutes between the Gateway of India and Belapur jetty depending on sea state. Unlike the road, that time does not change with rush hour.",
      },
      {
        q: "Is a speedboat faster than driving to Navi Mumbai?",
        a: "In peak traffic, comfortably. Off-peak the road can be competitive on time. The consistency is the real benefit — the crossing takes the same time every trip.",
      },
      {
        q: "Do you offer regular commuter bookings?",
        a: "Yes. Repeat and corporate bookings on this route are quoted on a monthly basis, which works out considerably cheaper than individual charters.",
      },
      {
        q: "Which jetty do you use in Navi Mumbai?",
        a: "Belapur, which is the most practical access point for Vashi, Kharghar and Panvel. Other pickup points can be arranged with notice.",
      },
    ],
  },
];

export const getSpeedboatRoute = (slug: string) =>
  speedboatRoutes.find((r) => r.slug === slug);
