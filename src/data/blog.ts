export type Post = {
  slug: string;
  title: string;
  excerpt: string;
  seoTitle: string;
  seoDescription: string;
  category: "Guides" | "Destinations" | "Ownership" | "Sailing";
  date: string;
  readMins: number;
  image: string;
  imageAlt: string;
  /** Simple block model — headings and paragraphs, rendered by the template. */
  body: { heading?: string; paras: string[]; bullets?: string[] }[];
};

/**
 * Posts here target research-stage searches that the commercial pages cannot
 * rank for. Publishing one genuinely useful piece a month is worth more than
 * a burst of thin articles — Google demotes filler, and so do readers.
 */
export const posts: Post[] = [
  {
    slug: "what-it-costs-to-rent-a-yacht-in-mumbai",
    title: "What it actually costs to rent a yacht in Mumbai",
    excerpt:
      "Hourly rates, what is genuinely included, the add-ons that catch people out, and how to read a charter quote properly.",
    seoTitle: "Yacht Rental Cost in Mumbai — Real Prices and Hidden Extras",
    seoDescription:
      "A straight breakdown of yacht rental prices in Mumbai: hourly rates by boat size, what the price includes, which add-ons cost extra and how to compare quotes fairly.",
    category: "Guides",
    date: "2026-08-18",
    readMins: 7,
    image: "https://images.unsplash.com/photo-1570168007204-dfb528c6958f?auto=format&fit=crop&w=1800&q=80",
    imageAlt: "Yachts on Mumbai harbour with the city behind",
    body: [
      {
        paras: [
          "Yacht charter pricing in Mumbai is quoted by the hour, per boat, and that last part matters more than anything else on the invoice. A boat that costs ₹14,000 an hour costs the same whether four people board or fourteen — so the per-head number people actually care about is decided by how many friends you bring, not by which operator you pick.",
          "This is a plain guide to what the money buys, written by people who run the boats rather than resell them.",
        ],
      },
      {
        heading: "What the hourly rate covers",
        paras: [
          "At Saildeck, and at most reputable Mumbai operators, the hourly rate includes the captain and crew, fuel for the standard route, life jackets for every guest, and the on-board sound system. That is the floor. Anything below that price is usually a boat without proper crew or insurance, which is not a saving.",
        ],
        bullets: [
          "Licensed captain and deck crew",
          "Fuel for the agreed route — long detours are billed separately",
          "Coast-guard-compliant safety equipment and life jackets",
          "Bluetooth sound system and basic soft drinks on most boats",
        ],
      },
      {
        heading: "Where the extras come from",
        paras: [
          "Catering, bar service, floral or balloon decoration, a cake, a photographer and water sports are all quoted on top. None of these are unreasonable — but they should be quoted before you pay a deposit, not presented at the jetty. If an operator will not put add-ons in writing in advance, that tells you something.",
          "The two extras most commonly underestimated are catering for larger groups and extra hours. Charters overrun, and overrun time is billed at the standard hourly rate.",
        ],
      },
      {
        heading: "What drives the price up",
        paras: [
          "Boat size is the obvious one, but it is not linear. Below about fifty feet you are paying for capacity. Above it you are paying for deck space, a jacuzzi, air conditioning that actually copes, and crew numbers.",
          "Timing matters too. Sunset slots on a Saturday in December are the most expensive two hours in the Mumbai charter calendar. The same boat on a Tuesday morning in March is a different proposition entirely, and nobody ever regrets a weekday charter once they see the empty harbour.",
        ],
      },
      {
        heading: "How to compare two quotes",
        paras: [
          "Ask three questions and the comparison becomes easy. What is the licensed guest capacity? What exactly is included in the hourly rate? And what happens if the coast guard suspends sailing on our date?",
          "An operator who answers all three clearly and in writing is usually the one who will also answer the phone when something goes wrong.",
        ],
      },
    ],
  },
  {
    slug: "best-time-for-a-yacht-charter-in-goa",
    title: "The best time of year for a yacht charter in Goa",
    excerpt:
      "Season by season: when the water is calmest, when prices peak, and the shoulder weeks most people overlook.",
    seoTitle: "Best Time for a Yacht Charter in Goa — Season, Weather & Prices",
    seoDescription:
      "When to book a yacht in Goa. Month-by-month conditions on the Mandovi and open sea, peak and shoulder season pricing, monsoon closure dates and what to expect.",
    category: "Destinations",
    date: "2026-07-29",
    readMins: 6,
    image: "https://images.unsplash.com/photo-1519046904884-53103b34b206?auto=format&fit=crop&w=1800&q=80",
    imageAlt: "A quiet Goa beach with palms and clear water",
    body: [
      {
        paras: [
          "Goa has a short, reliable charter season and a hard stop either side of it. Understanding the shape of the year is the difference between a flat, glassy afternoon on the Mandovi and a cancelled booking.",
        ],
      },
      {
        heading: "November to February — peak",
        paras: [
          "The best conditions of the year. Calm water, clear skies, comfortable temperatures and reliable visibility for the Grande Island run. It is also when everyone else wants to sail, so weekend and New Year slots go months ahead and prices sit at their highest.",
        ],
      },
      {
        heading: "March to May — the underrated window",
        paras: [
          "Hotter, quieter and considerably easier to book. The sea stays calm well into May in most years, and the light in the last hour before sunset is at its best. If you are flexible on dates and can tolerate the heat, this is where the value is.",
        ],
      },
      {
        heading: "June to September — closed",
        paras: [
          "The southwest monsoon shuts charter operations down. This is not caution — the coast guard restricts small-craft movement and the sea state genuinely does not permit it. Any operator offering you a Goa charter in July is one to walk away from.",
          "It is a good window for something else, though: this is when yards do refit work, and when boats come out for antifouling and layup.",
        ],
      },
      {
        heading: "October — the reopening",
        paras: [
          "The season restarts as the monsoon withdraws, usually through October. Conditions settle week by week rather than overnight, so early October bookings carry some weather risk. By the end of the month it is generally reliable, and prices have not yet reached peak.",
        ],
      },
    ],
  },
  {
    slug: "speedboat-vs-ferry-mumbai-to-alibaug",
    title: "Speedboat or ferry: getting from Mumbai to Alibaug",
    excerpt:
      "Three ways across the harbour compared on time, cost and hassle — and an honest answer on when the speedboat is worth it.",
    seoTitle: "Mumbai to Alibaug: Speedboat vs Ferry vs Road Compared",
    seoDescription:
      "Comparing the speedboat, catamaran ferry and road route from Mumbai to Alibaug on journey time, cost per person and convenience, with monsoon closure dates.",
    category: "Guides",
    date: "2026-06-21",
    readMins: 5,
    image: "https://images.unsplash.com/photo-1597154200389-d7ac4c75e180?auto=format&fit=crop&w=1800&q=80",
    imageAlt: "Speedboat crossing open water at speed",
    body: [
      {
        paras: [
          "Alibaug is about ninety minutes away and three hours away at the same time, depending entirely on how you get there. Here is the honest comparison.",
        ],
      },
      {
        heading: "By road",
        paras: [
          "Three hours on a good day via the Atal Setu, considerably more on a Friday evening or a long weekend. It is the cheapest option if you already have a car and the only one that gets you there with your own vehicle at the far end. It is also the least pleasant.",
        ],
      },
      {
        heading: "The catamaran ferry",
        paras: [
          "Scheduled, air-conditioned, cheap per head, and about an hour door to jetty. For a couple or a solo traveller it is comfortably the best value crossing available. The trade-off is the timetable — you leave when it leaves, and on peak weekends it fills.",
        ],
      },
      {
        heading: "A private speedboat",
        paras: [
          "Twenty minutes, on your schedule, with your own group and your luggage. You are chartering the whole boat, so the price is fixed regardless of whether two or six people travel — which is what makes it sensible for a family or a group and expensive for one person.",
          "Nobody should book a speedboat to save money. You book it to save two and a half hours and arrive without having queued for anything.",
        ],
      },
      {
        heading: "The monsoon",
        paras: [
          "From roughly June to September all water crossings stop. The road is the only option, and it is a slow one in the rain. Plan Alibaug trips for the October–May window.",
        ],
      },
    ],
  },
  {
    slug: "true-cost-of-owning-a-yacht-in-india",
    title: "The true cost of owning a yacht in India",
    excerpt:
      "Berthing, crew, insurance, monsoon layup and the ten-percent rule — what ownership costs after the purchase price.",
    seoTitle: "Cost of Owning a Yacht in India — Running Costs Explained",
    seoDescription:
      "What it really costs to own a yacht in India: berthing, crew salaries, insurance, survey, antifouling, monsoon storage and maintenance, with the ten-percent planning rule.",
    category: "Ownership",
    date: "2026-05-30",
    readMins: 8,
    image: "https://images.unsplash.com/photo-1574850802664-10ad30c3ed80?auto=format&fit=crop&w=1800&q=80",
    imageAlt: "Boats moored along a marina pontoon",
    body: [
      {
        paras: [
          "The purchase price is the part everybody researches and the smallest part of the decision. Here is what the years afterwards look like.",
        ],
      },
      {
        heading: "The ten-percent rule",
        paras: [
          "As a planning figure, budget annual running costs at roughly ten percent of the vessel's value. It is a blunt instrument, but across a decade of Indian ownership it holds up better than any more precise-sounding estimate. A boat worth two crore costs something in the region of twenty lakh a year to keep properly.",
          "Spend less than that and you are deferring maintenance rather than avoiding cost. Deferred maintenance on a boat compounds faster than almost anything else you can own.",
        ],
      },
      {
        heading: "Where it goes",
        paras: ["Broadly, in this order of size for a crewed motor yacht in Mumbai or Goa:"],
        bullets: [
          "Crew salaries — the largest line on any crewed vessel",
          "Berthing or mooring fees, which vary enormously by location",
          "Insurance, which is priced on value, use and crew qualification",
          "Monsoon haul-out, layup and recommissioning — an unavoidable annual cost",
          "Antifouling, anodes and annual survey",
          "Scheduled engine and generator servicing",
          "Fuel, which is usage-driven and often smaller than people expect",
        ],
      },
      {
        heading: "The monsoon is a fixed cost",
        paras: [
          "Four months a year the boat cannot be used and still costs money. Haul-out, pressure wash, engine pickling, storage and recommissioning happen every single year on the west coast. Owners who budget for eight months of ownership and twelve months of cost are the ones who do not get surprised.",
        ],
      },
      {
        heading: "Ways to reduce it",
        paras: [
          "Three genuinely work. Buy smaller than you first intended — every cost above scales with length. Charter the boat out when you are not using it, which requires commercial registration planned before purchase, not after. Or buy a share rather than the whole boat, which divides every line item above by the number of owners.",
          "The fourth option, doing less maintenance, is not a saving. It is a loan against the resale value at an unfavourable rate.",
        ],
      },
    ],
  },
  {
    slug: "how-to-plan-a-proposal-on-a-yacht",
    title: "How to plan a proposal on a yacht",
    excerpt:
      "Timing, logistics, keeping it secret, and the small details that decide whether it goes the way you pictured.",
    seoTitle: "How to Plan a Proposal on a Yacht in Mumbai or Goa",
    seoDescription:
      "A practical checklist for proposing on a private yacht in India: timing it to sunset, arranging flowers and a photographer discreetly, weather contingency and keeping the surprise.",
    category: "Guides",
    date: "2026-04-14",
    readMins: 6,
    image: "https://images.unsplash.com/photo-1599582350162-83106f579198?auto=format&fit=crop&w=1800&q=80",
    imageAlt: "A couple sitting together at the stern of a yacht",
    body: [
      {
        paras: [
          "We run a lot of these. The ones that go well have three things in common: the timing is planned around the light, the crew know the plan before you board, and there is a wet-weather answer agreed in advance.",
        ],
      },
      {
        heading: "Time it to the sunset, not the clock",
        paras: [
          "Book the boat to leave roughly ninety minutes before sunset. That puts you anchored in open water, with the light at its best, at the moment you actually want. Sunset time moves by more than an hour across the season, so confirm the date's actual time rather than assuming a 6pm departure works.",
        ],
      },
      {
        heading: "Brief the crew, not your partner",
        paras: [
          "Tell us in advance and the whole crew works around it — the anchoring point, when drinks appear, and crucially when everybody makes themselves scarce. A proposal with three deckhands watching from six feet away is a different memory.",
        ],
      },
      {
        heading: "The details that matter",
        paras: ["In rough order of how much difference they make:"],
        bullets: [
          "A photographer positioned before you board, not summoned afterwards",
          "Flowers set below deck so nothing is visible when you step on",
          "A cake and something cold, arranged with 48 hours' notice",
          "Somewhere secure for the ring that is not your pocket on a moving boat",
          "A plan for the phone calls afterwards — signal is patchy offshore",
        ],
      },
      {
        heading: "Have a weather answer",
        paras: [
          "If the coast guard suspends sailing, your charter reschedules free — but your plans for the evening do not. Decide in advance what happens if the boat cannot sail, and tell us, so we can help you move it rather than watch you improvise.",
        ],
      },
    ],
  },
  {
    slug: "learning-to-sail-in-india",
    title: "Learning to sail in India: an honest starting guide",
    excerpt:
      "Where to learn, what it costs, how long it takes, and whether you need to swim first.",
    seoTitle: "Learning to Sail in India — Courses, Costs and Where to Start",
    seoDescription:
      "How to start sailing in India: beginner courses in Mumbai and Goa, RYA certification routes, what equipment you need, season timing and realistic costs.",
    category: "Sailing",
    date: "2026-03-08",
    readMins: 7,
    image: "https://images.unsplash.com/photo-1414437384035-787b9df782d7?auto=format&fit=crop&w=1800&q=80",
    imageAlt: "Sailing dinghies out on the water during a lesson",
    body: [
      {
        paras: [
          "Sailing has a reputation in India for being expensive and closed off. The first part is less true than it used to be, and the second was never really true — most clubs are actively short of new members.",
        ],
      },
      {
        heading: "Start in a dinghy, not a yacht",
        paras: [
          "A small dinghy teaches you more in a weekend than a large yacht teaches in a month, because everything you do has an immediate and obvious consequence. It is also considerably cheaper, and capsizing one is a rite of passage rather than an incident.",
        ],
      },
      {
        heading: "Do you need to swim?",
        paras: [
          "No. Every student wears a buoyancy aid and a safety boat is on the water throughout. Being comfortable in water helps your confidence, which helps you learn faster, but it is not a prerequisite for a first course.",
        ],
      },
      {
        heading: "The certification ladder",
        paras: [
          "If you only ever want to sail with friends on weekends, you do not need certification at all. If you want to charter a yacht abroad or skipper your own boat, the RYA ladder is the one the world recognises: Competent Crew, then Day Skipper theory, then Day Skipper practical.",
          "Day Skipper is the qualification most international charter companies ask for. Everything beyond it is for people who have decided this is a serious part of their life.",
        ],
      },
      {
        heading: "When to learn",
        paras: [
          "October to May. The monsoon closes sailing on the west coast entirely, so a course booked for July will not run. October and November are the pleasantest months to be on the water learning.",
        ],
      },
    ],
  },
];

export const getPost = (slug: string) => posts.find((p) => p.slug === slug);

export const formatPostDate = (iso: string) =>
  new Date(iso).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
