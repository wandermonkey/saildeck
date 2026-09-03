/**
 * Team and marina content.
 *
 * The team page is deliberately built around ROLES rather than invented
 * people. Replace these with real profiles and photographs when you have them
 * — a named crew with faces converts far better than role descriptions, and
 * inventing staff to fill the page would be dishonest.
 */

export type TeamRole = {
  role: string;
  count: string;
  blurb: string;
  responsibilities: string[];
};

export const teamRoles: TeamRole[] = [
  {
    role: "Captains",
    count: "Licensed, on every charter",
    blurb:
      "Every Saildeck charter sails with a certified captain who holds final authority on route, timing and whether the boat leaves the jetty at all. That decision is never overruled commercially.",
    responsibilities: [
      "Passage planning and sea-state assessment",
      "Guest safety briefing before departure",
      "Vessel handling, anchoring and berthing",
      "Final call on weather and sailing conditions",
    ],
  },
  {
    role: "Deck crew",
    count: "Two to five per vessel",
    blurb:
      "Crew handle everything between boarding and disembarkation — lines, tenders, service, water sports and the safety equipment you hopefully never need.",
    responsibilities: [
      "Tender operation and guest transfers",
      "Service, catering support and bar",
      "Water sports supervision and swim stops",
      "Trained in water rescue and first aid",
    ],
  },
  {
    role: "Charter desk",
    count: "Your single point of contact",
    blurb:
      "The person who answers your first WhatsApp is the person who sees your booking through to boarding. No handoffs, no ticket numbers, no repeating yourself to a second department.",
    responsibilities: [
      "Availability, quoting and booking",
      "Add-ons: catering, decor, photography",
      "Boarding logistics and timings",
      "Weather rescheduling and follow-up",
    ],
  },
  {
    role: "Yard and technical",
    count: "Engineers and shipwrights",
    blurb:
      "The team behind refit, repair and monsoon layup. They are the reason a boat that is eight years old still behaves like one that is three.",
    responsibilities: [
      "Planned maintenance and engine servicing",
      "GRP, paint and structural repair",
      "Monsoon haul-out and recommissioning",
      "Pre-charter technical checks",
    ],
  },
  {
    role: "Sailing instructors",
    count: "Certified, small groups",
    blurb:
      "Instructors run the academy programmes and the RYA course ladder, teaching on the water rather than in a classroom.",
    responsibilities: [
      "Beginner and junior sailing programmes",
      "RYA practical and shorebased courses",
      "Safety boat cover during sessions",
      "Progression planning toward Day Skipper and beyond",
    ],
  },
];

export type Marina = {
  name: string;
  city: string;
  blurb: string;
  facilities: string[];
  image: string;
  imageAlt: string;
};

export const marinas: Marina[] = [
  {
    name: "Gateway of India",
    city: "Mumbai",
    blurb:
      "Our primary Mumbai departure point. Boats lie at anchor in the harbour and guests board via tender from the jetty — a crossing of about ten minutes.",
    facilities: ["Tender boarding", "Guest waiting area", "Fuel and water by arrangement", "Coast guard clearance point"],
    image: "https://images.unsplash.com/photo-1570168007204-dfb528c6958f?auto=format&fit=crop&w=1400&q=80",
    imageAlt: "The Gateway of India seen from the harbour at dusk",
  },
  {
    name: "Belapur Jetty",
    city: "Navi Mumbai",
    blurb:
      "The Navi Mumbai base, serving Vashi, Kharghar and Panvel. Sheltered creek water makes it usable on days when open-sea departures are marginal.",
    facilities: ["Alongside berthing", "Vehicle access and parking", "Sheltered creek water", "Fast harbour crossing to South Mumbai"],
    image: "https://images.unsplash.com/photo-1676629147275-c306d03fe4fa?auto=format&fit=crop&w=1400&q=80",
    imageAlt: "Calm harbour water with a boat under way",
  },
  {
    name: "Panjim, Mandovi River",
    city: "Goa",
    blurb:
      "Central Goa departures on the Mandovi, minutes from North Goa hotels. Flat river water for the first stretch, which suits guests new to boats.",
    facilities: ["River pontoon berthing", "Central location", "Calm water departures", "Evening cruise routes"],
    image: "https://images.unsplash.com/photo-1519046904884-53103b34b206?auto=format&fit=crop&w=1400&q=80",
    imageAlt: "The Goa coastline with palms and clear water",
  },
  {
    name: "Britona, Betim",
    city: "Goa",
    blurb:
      "A quieter Goa boarding point across the river from Panjim, used for private parties and charters that want to board away from the crowds.",
    facilities: ["Private boarding", "Parking on site", "Group charter staging", "Close to North Goa"],
    image: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=1400&q=80",
    imageAlt: "A catamaran anchored in a quiet bay",
  },
  {
    name: "Mandwa Jetty",
    city: "Alibaug",
    blurb:
      "The Alibaug end of the speedboat run. Taxis and pre-booked cars wait at the jetty; Alibaug town is about thirty minutes on by road.",
    facilities: ["Speedboat transfers", "Taxi rank", "Onward car booking", "Day-charter turnaround"],
    image: "https://images.unsplash.com/photo-1574850802664-10ad30c3ed80?auto=format&fit=crop&w=1400&q=80",
    imageAlt: "Boats moored along a jetty pontoon",
  },
];

/** Occasions people charter for — used on the Charters page. */
export const charterOccasions = [
  {
    name: "Sunset cruise",
    image: "https://images.unsplash.com/photo-1628029338883-61644ec68475?auto=format&fit=crop&w=1200&q=80",
    imageAlt: "Yacht on open water as the sun sets behind it",
    blurb: "Two hours, golden hour, the skyline going pink behind you. The most booked slot we run.",
    duration: "2 hours",
    icon: "sunset" as const,
  },
  {
    name: "Birthdays",
    image: "https://images.unsplash.com/photo-1628336707631-68131ca720c3?auto=format&fit=crop&w=1200&q=80",
    imageAlt: "Guests raising champagne glasses on a yacht deck",
    blurb: "Cake, decor, your playlist and no closing time. We handle the setup so you step aboard to a finished room.",
    duration: "2–4 hours",
    icon: "cake" as const,
  },
  {
    name: "Proposals & anniversaries",
    image: "https://images.unsplash.com/photo-1599582350162-83106f579198?auto=format&fit=crop&w=1200&q=80",
    imageAlt: "A couple sitting together at the stern of a yacht",
    blurb: "A private deck, no audience, and a crew briefed to make themselves scarce at the right moment.",
    duration: "2–3 hours",
    icon: "ring" as const,
  },
  {
    name: "Corporate & offsites",
    image: "https://images.unsplash.com/photo-1708246117134-9b3b72fd4e76?auto=format&fit=crop&w=1200&q=80",
    imageAlt: "A corporate group gathered on the deck of a chartered yacht",
    blurb: "Client entertaining, team days and product shoots. GST invoice, fixed itinerary, transfers arranged.",
    duration: "3 hours to full day",
    icon: "briefcase" as const,
  },
  {
    name: "Pre-wedding shoots",
    image: "https://images.unsplash.com/photo-1768099672705-6767a4ab4322?auto=format&fit=crop&w=1200&q=80",
    imageAlt: "A couple watching the sunset over the water with a glass of wine",
    blurb: "Golden-hour slots with deck space for a crew, a changing area below, and drone-friendly water.",
    duration: "2–4 hours",
    icon: "camera" as const,
  },
  {
    name: "Island day charters",
    image: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=1200&q=80",
    imageAlt: "Catamaran anchored off a tropical island in clear water",
    blurb: "Anchor off Elephanta or Grande Island, swim, eat, use the water toys, come back at dusk.",
    duration: "5–8 hours",
    icon: "island" as const,
  },
];
