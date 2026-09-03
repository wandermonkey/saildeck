export type Post = {
  slug: string;
  title: string;
  excerpt: string;
  seoTitle: string;
  seoDescription: string;
  category: "Guides" | "Destinations" | "Ownership" | "Sailing" | "Buying";
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
const existingPosts: Post[] = [
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
          "Yacht charter pricing in Mumbai is **quoted by the hour, per boat**, and that last part matters more than anything else on the invoice. A boat that costs ₹14,000 an hour costs the same whether four people board or fourteen — so the per-head number people actually care about is decided by how many friends you bring, not by which operator you pick.",
          "This is a plain guide to what the money buys, written by people who run the boats rather than resell them.",
        ],
      },
      {
        heading: "What the hourly rate covers",
        paras: [
          "At Saildeck, and at most reputable Mumbai operators, the hourly rate includes the **captain and crew, fuel for the standard route**, life jackets for every guest, and the on-board sound system. That is the floor. Anything below that price is usually a boat without proper crew or insurance, which is not a saving.",
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
          "Timing matters too. **Sunset slots on a Saturday in December** are the most expensive two hours in the Mumbai charter calendar. The same boat on a Tuesday morning in March is a different proposition entirely, and nobody ever regrets a weekday charter once they see the empty harbour.",
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
        heading: "**November to February** — peak",
        paras: [
          "The best conditions of the year. Calm water, clear skies, comfortable temperatures and reliable visibility for the **Grande Island run**. It is also when everyone else wants to sail, so weekend and New Year slots go months ahead and prices sit at their highest.",
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
          "The southwest monsoon shuts charter operations down. This is not caution — the **coast guard restricts small-craft movement** and the sea state genuinely does not permit it. Any operator offering you a Goa charter in July is one to walk away from.",
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
    title: "Speedboat or ferry: getting from **Mumbai to Alibaug**",
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
        heading: "A **private speedboat**",
        paras: [
          "Twenty minutes, on your schedule, with your own group and your luggage. You are chartering the whole boat, so the price is fixed regardless of whether two or six people travel — which is what makes it sensible for a family or a group and expensive for one person.",
          "Nobody should book a speedboat to save money. You book it to save two and a half hours and arrive without having queued for anything.",
        ],
      },
      {
        heading: "The monsoon",
        paras: [
          "From roughly June to September all water crossings stop. The road is the only option, and it is a slow one in the rain. Plan Alibaug trips for the **October–May window**.",
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
          "As a planning figure, budget annual running costs at roughly **ten percent of the vessel's value**. It is a blunt instrument, but across a decade of Indian ownership it holds up better than any more precise-sounding estimate. A boat worth two crore costs something in the region of twenty lakh a year to keep properly.",
          "Spend less than that and you are deferring maintenance rather than avoiding cost. Deferred maintenance on a boat compounds faster than almost anything else you can own.",
        ],
      },
      {
        heading: "Where it goes",
        paras: ["Broadly, in this order of size for a crewed motor yacht in Mumbai or Goa:"],
        bullets: [
          "**Crew salaries** — the largest line on any crewed vessel",
          "Berthing or mooring fees, which vary enormously by location",
          "Insurance, which is priced on value, use and crew qualification",
          "**Monsoon haul-out, layup and recommissioning** — an unavoidable annual cost",
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
          "Book the boat to leave roughly **ninety minutes before sunset**. That puts you anchored in open water, with the light at its best, at the moment you actually want. Sunset time moves by more than an hour across the season, so confirm the date's actual time rather than assuming a 6pm departure works.",
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
          "If the **coast guard suspends sailing**, your charter reschedules free — but your plans for the evening do not. Decide in advance what happens if the boat cannot sail, and tell us, so we can help you move it rather than watch you improvise.",
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
          "No. Every student wears a **buoyancy aid** and a safety boat is on the water throughout. Being comfortable in water helps your confidence, which helps you learn faster, but it is not a prerequisite for a first course.",
        ],
      },
      {
        heading: "The certification ladder",
        paras: [
          "If you only ever want to sail with friends on weekends, you do not need certification at all. If you want to charter a yacht abroad or skipper your own boat, the **RYA ladder** is the one the world recognises: Competent Crew, then **Day Skipper** theory, then Day Skipper practical.",
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

/**
 * ⚠️ Real photography, verified subject matter — every image below was
 * checked visually before use (see the project's image-vetting habit: never
 * trust a stock-photo alt tag alone, confirm the actual picture). None of
 * these are Saildeck's own boats; swap in real charter photography as it
 * becomes available, same as the fleet listings.
 *
 * These 30 posts were generated as a batch. Read them before publishing —
 * verify any factual claim (import duty figures, survey requirements, RYA
 * course names, safety rules) against current regulation before it reaches a
 * customer. Treat this as a strong first draft, not finished copy.
 */
const newPosts: Post[] = [
  {
    slug: "complete-guide-to-yachting-in-mumbai",
    title: "The complete guide to yachting in Mumbai",
    excerpt:
      "Where charters leave from, what a day on the water actually looks like, what it costs, and how the season works — everything to know before you book.",
    seoTitle: "Yachting in Mumbai — The Complete 2026 Guide",
    seoDescription:
      "A complete guide to yachting in Mumbai: departure points, popular routes, pricing, the best season, and how to book a private charter from the Gateway of India.",
    category: "Destinations",
    date: "2025-09-05",
    readMins: 8,
    image: "https://images.unsplash.com/photo-1751608734207-1c68d53554b4?auto=format&fit=crop&w=1800&q=80",
    imageAlt: "The Gateway of India and Taj Mahal Palace hotel on the Mumbai waterfront",
    body: [
      {
        paras: [
          "Mumbai is not an obvious yachting city on paper — a working port, dense traffic, a monsoon that shuts the coast for four months a year. And yet **yachting in Mumbai** has quietly become one of the more interesting things to do in the city, precisely because so few visitors think to look for it.",
          "This is the guide we wish existed when we started: where boats actually leave from, what a booking costs, what the water is like, and the small details that decide whether your afternoon goes well.",
        ],
      },
      {
        heading: "Where charters depart from",
        paras: [
          "Almost every **Mumbai yacht charter** leaves from the Gateway of India in Colaba. You do not board directly at the monument — a tender ferries you out to the yacht at anchor in the harbour, a crossing of about ten minutes. [Bandra Bandstand](/destinations/mumbai) is used by a handful of operators for evening departures, and [Belapur in Navi Mumbai](/destinations/navi-mumbai) is a genuinely useful alternative if you live in the eastern suburbs and do not want to fight South Mumbai traffic.",
        ],
      },
      {
        heading: "What a charter actually looks like",
        paras: [
          "You arrive at the jetty, a crew member meets you, and the tender takes you out to the boat. From there it is entirely dictated by what you booked — a two-hour sunset run past Marine Drive, a half-day out toward Elephanta Island with a swim stop, or a static harbour charter for a party where nobody wants to feel the boat move much.",
        ],
        bullets: [
          "**Sunset cruise** — 2 hours, the most booked slot, timed to leave the jetty about ninety minutes before sunset",
          "**Elephanta day cruise** — 4 to 6 hours, includes an anchored stop near the island",
          "**Harbour charter** — 2 to 3 hours, stays close to the city for parties and shoots",
        ],
      },
      {
        heading: "What it costs",
        paras: [
          "Rates in Mumbai run from roughly ₹11,900 an hour for a smaller boat up to ₹30,000+ for a flagship motor yacht, priced per boat rather than per person. That figure usually covers the captain, crew, fuel for the standard route and life jackets — catering, decoration and water sports are quoted on top. Our [fleet page](/fleet) lists current boats and rates if you want to compare.",
        ],
      },
      {
        heading: "The season",
        paras: [
          "October to May. The southwest monsoon makes the Arabian Sea unsafe for charter operations from roughly June to September, and any operator offering to take you out in July is one to be wary of. December through February brings the calmest water and the busiest calendar — book sunset slots two to three weeks ahead if you can.",
        ],
      },
      {
        heading: "Getting started",
        paras: [
          "The fastest way to check a date is a straight message with your preferred day, time and group size — most operators, including us, reply with real availability within the hour. See our [Mumbai charter page](/destinations/mumbai) for departure details and current boats, or go straight to [charter types](/charters) if you already know the occasion.",
        ],
      },
    ],
  },
  {
    slug: "best-yacht-routes-gateway-of-india",
    title: "Best yacht routes and cruises from the Gateway of India",
    excerpt:
      "Five routes that actually work, how long each takes, and which one suits a first-time charter versus a full day on the water.",
    seoTitle: "Best Yacht Routes from the Gateway of India, Mumbai",
    seoDescription:
      "The best yacht routes and cruises from the Gateway of India: sunset runs past **Marine Drive**, **Elephanta Island** day trips, harbour parties and more, with timing and tips.",
    category: "Destinations",
    date: "2025-09-19",
    readMins: 7,
    image: "https://images.unsplash.com/photo-1573143950521-36ef5345dae9?auto=format&fit=crop&w=1800&q=80",
    imageAlt: "Boats moored on the water near the Gateway of India, Mumbai",
    body: [
      {
        paras: [
          "The **Gateway of India** is the departure point for most yacht charters in Mumbai, but where the boat actually goes once it clears the harbour is where the day gets decided. Here are the five routes that come up again and again, and who each one suits.",
        ],
      },
      {
        heading: "1. The Marine Drive sunset run",
        paras: [
          "Out past the harbour mouth and along the coast toward Marine Drive, timed so the sun goes down while the skyline is in view. Two hours, the most requested route in the fleet, and the one to pick if this is your first **yacht cruise in Mumbai**.",
        ],
      },
      {
        heading: "2. The Elephanta approach",
        paras: [
          "A longer run out toward Elephanta Island, usually four to six hours with an anchored stop for swimming before heading back. This is the route for a proper day out rather than an evening — pack accordingly. If you would rather skip the boat entirely and take a dedicated crossing, see our [Mumbai to Elephanta speedboat](/speedboats/mumbai-to-elephanta) page.",
        ],
      },
      {
        heading: "3. The static harbour charter",
        paras: [
          "For a party, a corporate event or a photo shoot, some charters barely move — the boat anchors close to the Gateway and stays there for the duration. Less motion, easier catering logistics, and the skyline stays in every photograph.",
        ],
      },
      {
        heading: "4. The Bandra evening loop",
        paras: [
          "A shorter option departing from Bandra Bandstand rather than Colaba, useful if your group is based in the western suburbs. The route runs along the coast rather than into the open harbour, which keeps the water calmer.",
        ],
      },
      {
        heading: "5. The full-day charter",
        paras: [
          "Combine several of the above — morning cruising, an anchored lunch stop, water toys in the afternoon, sunset on the way back. This only really works on a larger boat with the crew and space to support it; check our [fleet](/fleet) for boats built for a longer day.",
        ],
      },
      {
        heading: "Picking the right one",
        paras: [
          "First-timers and small groups should default to the sunset run — it is short enough to be an easy yes and long enough to feel like a proper outing. Bigger groups celebrating something specific tend toward the static harbour charter, and anyone who actually wants to swim should book the Elephanta route with the swim stop confirmed in advance.",
        ],
      },
    ],
  },
  {
    slug: "sunset-cruises-in-mumbai-guide",
    title: "Sunset cruises in Mumbai: the complete guide",
    excerpt:
      "Why the two-hour **sunset slot** is the most booked charter in the city, how to time it against the actual sunset, and what to expect on board.",
    seoTitle: "Sunset Cruise in Mumbai — Timing, Cost & Booking Guide",
    seoDescription:
      "Everything to know about a sunset cruise in Mumbai: how the timing works against the real sunset, what it costs, what is included, and how to book one.",
    category: "Destinations",
    date: "2025-10-03",
    readMins: 6,
    image: "https://images.unsplash.com/photo-1751608734211-a3222aaeb4ce?auto=format&fit=crop&w=1800&q=80",
    imageAlt: "The Mumbai skyline over the water at sunset",
    body: [
      {
        paras: [
          "A **sunset cruise in Mumbai** is the single most booked charter in the city, and once you have done one it is obvious why: the light does something to the skyline in the last hour before dark that no photograph fully captures.",
        ],
      },
      {
        heading: "How the timing actually works",
        paras: [
          "Sunset moves by over an hour across the year, so a good operator will not offer a fixed 6pm slot — the boat should leave roughly ninety minutes before the actual sunset time on your date, giving you time to clear the harbour and be in open water when the light turns. Confirm the exact departure time when you book rather than assuming it is the same year-round.",
        ],
      },
      {
        heading: "What is included",
        paras: [
          "A standard two-hour sunset slot includes the captain and crew, fuel for the route, life jackets and the sound system on most boats. Catering, a bar setup and decoration are add-ons quoted separately — see [charter types](/charters) for what is typically offered.",
        ],
        bullets: [
          "Captain and crew for the full booking",
          "Fuel for the standard route out and back",
          "Life jackets for every guest, child sizes available",
          "Bluetooth sound system on most boats",
        ],
      },
      {
        heading: "Best months for it",
        paras: [
          "December to February gives the clearest air and calmest water, so the skyline photographs best. October, November, March and April are still good and considerably easier to book. The monsoon (June to September) closes sunset cruises entirely.",
        ],
      },
      {
        heading: "Booking tips",
        paras: [
          "Weekend sunset slots go first — book two to three weeks out if your date is a Saturday. Bring a light layer; it cools quickly once the sun is down and you are on open water. If you want the occasion to be more than a plain cruise, our [birthday and proposal charters](/charters) build decoration and catering into the same booking.",
        ],
      },
    ],
  },
  {
    slug: "mumbai-harbour-vs-marine-drive-yacht-boarding",
    title: "Mumbai harbour vs Marine Drive: where to board your yacht",
    excerpt:
      "Gateway of India, Bandra or Navi Mumbai — a straight comparison of the city's yacht boarding points and which one actually suits your group.",
    seoTitle: "Where to Board a Yacht in Mumbai — Gateway, Bandra or Navi Mumbai",
    seoDescription:
      "Comparing Mumbai's yacht boarding points: the Gateway of India, Bandra Bandstand and Belapur in Navi Mumbai, with travel time, water conditions and who each suits.",
    category: "Destinations",
    date: "2025-10-17",
    readMins: 6,
    image: "https://images.unsplash.com/photo-1680014340368-217dca91d261?auto=format&fit=crop&w=1800&q=80",
    imageAlt: "View of the Mumbai city skyline from across the water",
    body: [
      {
        paras: [
          "There is more than one place to board a **yacht in Mumbai**, and which one makes sense depends entirely on where you are coming from and what kind of day you want. Here is the honest comparison.",
        ],
      },
      {
        heading: "Gateway of India, Colaba",
        paras: [
          "The default, and for good reason — the largest fleet operates from here, and it puts you in open harbour water within minutes of boarding. The trade-off is South Mumbai traffic getting there, which can turn a twenty-minute drive into an hour on a weekday evening. See our full [Mumbai destination guide](/destinations/mumbai) for departure details.",
        ],
      },
      {
        heading: "Bandra Bandstand",
        paras: [
          "A smaller but genuinely useful option for anyone based in the western suburbs. Fewer boats operate from here, so book further ahead, and the routes tend to run along the coast rather than out into the open harbour.",
        ],
      },
      {
        heading: "Belapur, Navi Mumbai",
        paras: [
          "The most overlooked option, and often the most practical one for **Vashi, Kharghar or Panvel**. The creek water here is more sheltered than the open sea, which means charters can sometimes run on days when Colaba departures are marginal. It also happens to be the fastest way to reach South Mumbai by water — see our [Belapur to Gateway crossing](/speedboats/mumbai-to-navi-mumbai) if that is what you actually need.",
        ],
      },
      {
        heading: "Which one to pick",
        paras: [
          "If the skyline view is the point of the trip, **Gateway of India wins outright**. If you are based in the suburbs and just want an easy evening on the water without the drive into Colaba, Bandra or Belapur will save you more time than the marginally better view costs you.",
        ],
      },
    ],
  },
  {
    slug: "elephanta-island-by-boat-guide",
    title: "A local's guide to Elephanta Island by boat",
    excerpt:
      "The ferry versus a private charter, what the caves are actually like, and the practical details that make or break the trip.",
    seoTitle: "Elephanta Island by Boat — A Complete Visitor's Guide",
    seoDescription:
      "How to visit Elephanta Island by boat from Mumbai: ferry versus private speedboat, what the caves involve, opening days, and tips for a smoother trip.",
    category: "Destinations",
    date: "2025-10-31",
    readMins: 7,
    image: "https://images.unsplash.com/photo-1702538861077-6f169714043a?auto=format&fit=crop&w=1800&q=80",
    imageAlt: "Boats moored in Mumbai harbour on the way to Elephanta Island",
    body: [
      {
        paras: [
          "**Elephanta Island** sits about six nautical miles off the Gateway of India, and the boat trip out is honestly half the reason to go — you get a view of the Mumbai skyline from the water that almost nobody sees.",
        ],
      },
      {
        heading: "Ferry or private boat",
        paras: [
          "The public ferry is the cheapest way across and takes about an hour each way, leaving on a schedule rather than to suit you. A private speedboat covers the same crossing in around twenty-five minutes and lets you set your own timing — see our [Mumbai to Elephanta speedboat](/speedboats/mumbai-to-elephanta) page for current pricing.",
        ],
      },
      {
        heading: "What is actually there",
        paras: [
          "The UNESCO-listed rock-cut caves date to somewhere between the 5th and 8th centuries and centre on a large sculpture of Shiva. From the jetty it is a climb of roughly 120 steps up to the caves — there is very little shade, so a hat and water matter more than most people expect.",
        ],
        bullets: [
          "Caves are closed on **Mondays** — check before you plan the trip",
          "Entry tickets to the caves are bought separately at the island, not included in the boat fare",
          "The climb is around 120 steps with limited shade",
          "A small toy train runs part of the way up from the jetty for those who want it",
        ],
      },
      {
        heading: "Combining it with a charter",
        paras: [
          "If you would rather make a full day of it than a quick crossing, several **yacht charters in Mumbai** run an Elephanta route with an anchored swim stop on the way, which turns the trip into a proper outing rather than a there-and-back visit. Our [fleet page](/fleet) lists boats set up for the longer route.",
        ],
      },
    ],
  },
  {
    slug: "yachting-in-goa-first-timers-guide",
    title: "Yachting in Goa: a first-timer's guide",
    excerpt:
      "Where charters leave from, what the water is actually like, and the difference between a Mandovi cruise and a Grande Island trip.",
    seoTitle: "Yachting in Goa — A First-Timer's Guide (2026)",
    seoDescription:
      "New to yachting in Goa? A first-timer's guide covering the Mandovi river, Grande Island, departure points in Panjim and Britona, pricing and the best season.",
    category: "Destinations",
    date: "2025-11-14",
    readMins: 7,
    image: "https://images.unsplash.com/photo-1727193120195-8aa3e4280c62?auto=format&fit=crop&w=1800&q=80",
    imageAlt: "A group of boats moored on the Mandovi river in Goa",
    body: [
      {
        paras: [
          "**Yachting in Goa** feels like a different sport to Mumbai — the water is calmer, the pace is slower, and most people's first charter is on the Mandovi river rather than the open sea. If you have never booked one before, here is what to expect.",
        ],
      },
      {
        heading: "Where to board",
        paras: [
          "**Panjim jetty** on the Mandovi is the central, easiest option and works well if you are staying in North Goa. Britona, across the river, is quieter and popular for private parties. For trips further south toward Grande Island, Mormugao near Vasco is the better starting point. Full detail on our [Goa destination page](/destinations/goa).",
        ],
      },
      {
        heading: "Mandovi cruise or Grande Island",
        paras: [
          "A Mandovi river cruise is calm, scenic and short — usually two hours, passing Reis Magos fort and the Panjim waterfront, and it is the route almost every first-timer starts with. A **Grande Island charter** is a different proposition: five to six hours out into open water for snorkelling and a swim stop, better suited to a full day than an evening.",
        ],
      },
      {
        heading: "What it costs",
        paras: [
          "Goa charters start around ₹11,900 an hour for the smaller boats in the fleet, with a two-hour minimum on most bookings. Island charters with a swim stop are usually quoted as a fixed package rather than an hourly rate — check current boats on our [fleet page](/fleet).",
        ],
      },
      {
        heading: "Best season",
        paras: [
          "November to March is peak — the calmest water and the busiest calendar of the year. March through May stays sailable and is considerably easier to book if you can handle the heat. The monsoon, roughly June to September, closes the season entirely.",
        ],
      },
    ],
  },
  {
    slug: "things-to-do-yacht-charter-goa",
    title: "Things to do on a yacht charter in Goa",
    excerpt:
      "Beyond the sunset cruise — snorkelling, dolphin spotting, beach-hopping and the routes that actually fill a full day out.",
    seoTitle: "What to Do on a Yacht Charter in Goa — Full Guide",
    seoDescription:
      "Ideas for a yacht charter in Goa beyond the sunset cruise: snorkelling at Grande Island, dolphin watching, beach-hopping by boat, and full-day itineraries.",
    category: "Destinations",
    date: "2025-11-28",
    readMins: 7,
    image: "https://images.unsplash.com/photo-1614082242765-7c98ca0f3df3?auto=format&fit=crop&w=1800&q=80",
    imageAlt: "Colourful beach huts and palm trees on the Goa coastline",
    body: [
      {
        paras: [
          "A **yacht charter in Goa** does not have to mean two hours of drinks on the Mandovi. Book the right boat and the right route, and it turns into an entire day of things to actually do.",
        ],
      },
      {
        heading: "Snorkelling at Grande Island",
        paras: [
          "The most popular full-day option. The water off Grande Island is clear enough for reasonable snorkelling, and most charters anchor for an hour or two so guests can swim and use the gear on board. See our [Grande Island guide](/blog/grande-island-goa-snorkelling-diving) for more on what to expect underwater.",
        ],
      },
      {
        heading: "Dolphin watching",
        paras: [
          "Dolphin sightings are genuinely common on the river-mouth and Grande Island routes, especially in the morning. No operator can promise them — they are wild animals — but a morning departure meaningfully improves your odds.",
        ],
      },
      {
        heading: "Beach-hopping by boat",
        paras: [
          "Reaching a beach by water rather than road cuts out the traffic and the parking entirely, and several of Goa's better stretches of sand are genuinely easier to reach this way. A half-day charter with two or three stops works well for a group that wants variety over one long anchor.",
        ],
      },
      {
        heading: "Water sports",
        paras: [
          "Several boats in the Goa fleet carry jet skis, kayaks or snorkel gear as standard — check what is included before you book if this is the point of the trip rather than an extra.",
        ],
        bullets: [
          "**Jet skis** — available on select boats, usually a supervised session at anchor",
          "**Kayaks** — self-paddle around the anchorage",
          "**Snorkelling gear** — carried on most island-route boats",
        ],
      },
      {
        heading: "Just the sunset",
        paras: [
          "And if none of the above appeals, the plain two-hour Mandovi sunset cruise remains the easiest, most reliable booking in the fleet — sometimes the simple version is the right one.",
        ],
      },
    ],
  },
  {
    slug: "grande-island-goa-snorkelling-diving",
    title: "Grande Island Goa: snorkelling, diving and boat trips",
    excerpt:
      "What the water is actually like, what you will see, and how to book a boat out to one of Goa's better snorkelling spots.",
    seoTitle: "Grande Island Goa — Snorkelling, Diving & Boat Trip Guide",
    seoDescription:
      "A guide to Grande Island near Goa: what the snorkelling and diving are like, visibility and best season, and how to book a boat charter out to it.",
    category: "Destinations",
    date: "2025-12-12",
    readMins: 6,
    image: "https://images.unsplash.com/photo-1682687981630-cefe9cd73072?auto=format&fit=crop&w=1800&q=80",
    imageAlt: "A snorkeller over a coral reef in clear tropical water",
    body: [
      {
        paras: [
          "**Grande Island**, off the coast near Mormugao, is the closest thing South Goa has to a proper reef trip — not the Maldives, but genuinely worth the boat ride for anyone who has not snorkelled in Indian waters before.",
        ],
      },
      {
        heading: "What the water is like",
        paras: [
          "Visibility is decent rather than exceptional, and it improves noticeably in the dry months. You will see reef fish, some coral and, with luck, a turtle — expectations set at 'a good introduction' rather than 'world-class reef' will leave you pleasantly surprised.",
        ],
      },
      {
        heading: "Snorkelling vs diving",
        paras: [
          "Most boat operators offer snorkelling as standard on the anchor stop, gear included. **Scuba diving** is usually arranged through a separate certified dive operator based near the island rather than the charter boat itself — worth confirming which one you are booking if diving is the actual goal.",
        ],
      },
      {
        heading: "Best time to go",
        paras: [
          "November to February for the clearest water and calmest crossing. The monsoon closes the route entirely, and the shoulder months either side can be choppier on the open-water stretch out to the island.",
        ],
      },
      {
        heading: "Booking a trip",
        paras: [
          "A **Grande Island charter is typically** a five to six hour booking including the crossing, an anchored snorkel stop and the return. See our [Goa charter page](/destinations/goa) for current boats and departure points.",
        ],
      },
    ],
  },
  {
    slug: "best-beaches-by-boat-in-goa",
    title: "Best beaches to reach by boat in Goa",
    excerpt:
      "Skip the traffic and the parking — the stretches of Goa coastline that are genuinely better reached from the water.",
    seoTitle: "Best Goa Beaches to Reach by Boat — Local Guide",
    seoDescription:
      "Which Goa beaches are worth reaching by boat rather than road: quieter stretches of coastline, how to plan a beach-hopping charter, and what to expect.",
    category: "Destinations",
    date: "2025-12-27",
    readMins: 6,
    image: "https://images.unsplash.com/photo-1636874161697-1466985204fa?auto=format&fit=crop&w=1800&q=80",
    imageAlt: "A boat pulled up on a sandy beach in Goa",
    body: [
      {
        paras: [
          "Some of **Goa's best coastline** is genuinely easier to reach by water than by road, particularly in peak season when the beach roads and parking near the popular stretches get difficult. Here is where a boat actually earns its keep.",
        ],
      },
      {
        heading: "Quieter southern stretches",
        paras: [
          "The coastline south of the main tourist beaches thins out fast once you are on the water rather than the highway, and a boat gets you to a quiet anchorage without the drive, the parking search or the beach-shack crowd that comes with road access.",
        ],
      },
      {
        heading: "**Grande Island** and nearby coves",
        paras: [
          "Beyond the snorkelling spot itself, the coastline around Grande Island has smaller coves that are effectively boat-access only — worth asking your captain about if a private, uncrowded stop matters more than a named beach.",
        ],
      },
      {
        heading: "Planning a beach-hopping day",
        paras: [
          "A **half-day charter** with two or three planned stops works better than trying to cram in more — each anchor and swim stop takes longer than it looks on a map. Talk to us about a route before you book; see [things to do on a Goa charter](/blog/things-to-do-yacht-charter-goa) for the fuller list of options.",
        ],
      },
    ],
  },
  {
    slug: "dolphin-watching-in-goa",
    title: "Dolphin watching in Goa: what to expect",
    excerpt:
      "Where sightings actually happen, the best time of day, and why no operator can promise you will see one.",
    seoTitle: "Dolphin Watching in Goa — Where, When & What to Expect",
    seoDescription:
      "A realistic guide to dolphin watching in Goa: which routes see the most sightings, the best time of day, and how to book a boat trip that gives you the best odds.",
    category: "Destinations",
    date: "2026-01-10",
    readMins: 5,
    image: "https://images.unsplash.com/photo-1440020143730-090579c4d53c?auto=format&fit=crop&w=1800&q=80",
    imageAlt: "A pod of dolphins swimming in clear blue water",
    body: [
      {
        paras: [
          "**Dolphin watching in Goa** is one of those things every boat operator advertises and few explain honestly — sightings are common, but they are wild animals, and any trip promising a guarantee is overselling it.",
        ],
      },
      {
        heading: "Where sightings happen most",
        paras: [
          "The river-mouth stretch where the **Mandovi meets the open sea**, and the open water around **Grande Island, are the two most reliable areas**. Both are already on the standard route for most half-day and full-day charters, so you do not usually need a dedicated 'dolphin trip' to have a real chance.",
        ],
      },
      {
        heading: "Best time of day",
        paras: [
          "Morning, generally before 10am, gives the best odds — calmer water and dolphins that are more active before the day's boat traffic picks up. An early departure is worth the earlier alarm if this is genuinely the point of your trip.",
        ],
      },
      {
        heading: "Booking a trip",
        paras: [
          "Any Grande Island or river-mouth charter gives you a realistic chance without needing a specialist boat. See [things to do on a Goa charter](/blog/things-to-do-yacht-charter-goa) for the full range of routes, or check our [Goa destination page](/destinations/goa) for current boats and departure times.",
        ],
      },
    ],
  },
  {
    slug: "how-to-buy-a-yacht-in-india",
    title: "How to buy a yacht in India: the complete guide",
    excerpt:
      "From working out what you actually need to closing the deal — a straight walk through buying a yacht in India, written by people who run boats rather than sell them.",
    seoTitle: "How to Buy a Yacht in India — Complete 2026 Buyer's Guide",
    seoDescription:
      "A complete guide to buying a yacht in India: choosing a size, new vs used, survey, import duty, registration and the questions to ask before you commit.",
    category: "Buying",
    date: "2026-01-24",
    readMins: 10,
    image: "https://images.unsplash.com/photo-1638262052640-82e94d64664a?auto=format&fit=crop&w=1800&q=80",
    imageAlt: "Two people shaking hands over a table, closing a deal",
    body: [
      {
        paras: [
          "Buying a **yacht in India** is a smaller, less transparent market than most first-time buyers expect, and the advice that applies to the Mediterranean or Florida does not map cleanly onto Indian conditions — different duty regime, different berthing infrastructure, a real monsoon to plan around. Here is the version written for here.",
        ],
      },
      {
        heading: "Start with how you will actually use it",
        paras: [
          "The single biggest mistake first-time buyers make is buying the boat they want to have owned rather than the one that matches how they will actually use it. A boat used twice a month for day trips with friends has completely different requirements to one meant for overnight cruising with a family. Answer that question honestly before you look at a single listing.",
        ],
      },
      {
        heading: "New or pre-owned",
        paras: [
          "A pre-owned boat already in India removes the biggest source of risk — **import duty and paperwork uncertainty** — and is usually the easier first purchase. A new or imported vessel gives more choice for the money but adds real time and cost to the process. See our [buying a motor yacht](/yachts/buy-a-motor-yacht) and [buying a sailing yacht](/yachts/buy-a-sailing-yacht) pages for the detail on each path.",
        ],
      },
      {
        heading: "The survey is not optional",
        paras: [
          "An **independent marine survey**, arranged by you rather than the seller, is the single most important step in the process. It covers the hull, engine, rigging and systems, and it is what protects you from buying someone else's expensive problem.",
        ],
      },
      {
        heading: "Registration and paperwork",
        paras: [
          "Boats are registered with the relevant maritime board or the **Mercantile Marine Department** depending on category, with survey and safety certification requirements that scale with size and passenger capacity. An imported hull additionally needs a clean customs trail — missing import documents are the single most common reason a resale later falls through.",
        ],
        bullets: [
          "Independent marine survey before any deposit becomes non-refundable",
          "Confirmed customs and import documentation for any foreign-built hull",
          "Registration with the state maritime board or MMD as appropriate",
          "A realistic running-cost budget, not just the purchase price",
        ],
      },
      {
        heading: "What ownership actually costs afterward",
        paras: [
          "Berthing, crew, insurance, annual survey and monsoon haul-out add up to a meaningful annual figure — budget roughly ten percent of the vessel's value a year as a planning number. We go into this properly in [what it costs to own a yacht in India](/blog/true-cost-of-owning-a-yacht-in-india).",
        ],
      },
      {
        heading: "Where to get help",
        paras: [
          "A good broker earns their commission by telling you things you did not want to hear — that a boat is priced too high, that a size is wrong for your use case, that a listing's paperwork is incomplete. If you want a second opinion before you commit, [talk to us](/contact) — we advise on purchases we are not selling as readily as ones we are.",
        ],
      },
    ],
  },
  {
    slug: "new-vs-used-yacht-india",
    title: "New vs used yachts in India: which should you buy?",
    excerpt:
      "The real trade-offs between a new import and a pre-owned boat already in the country, laid out plainly.",
    seoTitle: "New vs Used Yacht in India — Which Should You Buy?",
    seoDescription:
      "New versus used yachts in India compared: import cost and timeline for a new boat, the paperwork risk on a used one, and how to decide which suits you.",
    category: "Buying",
    date: "2026-02-07",
    readMins: 7,
    image: "https://images.unsplash.com/photo-1480951904597-5387d1c232da?auto=format&fit=crop&w=1800&q=80",
    imageAlt: "A row of yachts moored on a dock",
    body: [
      {
        paras: [
          "Every first-time buyer asks this eventually: **new or used**? In the Indian market the honest answer usually favours used, but it is worth understanding exactly why before you decide it does not apply to you.",
        ],
      },
      {
        heading: "The case for used",
        paras: [
          "A pre-owned boat already registered and imported into India removes the two biggest sources of cost and delay — **import duty exposure** and customs paperwork. You can also see exactly what you are getting, survey it properly, and negotiate against real condition rather than a brochure.",
        ],
      },
      {
        heading: "The case for new",
        paras: [
          "Buying new or importing gives you far more choice for the money, a boat with no hidden maintenance history, and full manufacturer warranty. The trade-off is a **landed cost that includes duty and freight** on top of the purchase price, and a timeline measured in months rather than weeks.",
        ],
      },
      {
        heading: "What duty actually adds",
        paras: [
          "Import duty and GST on a foreign-built hull can add a substantial percentage over the overseas price — enough to change the calculation entirely. We break this down properly in [import duty and taxes on yachts in India explained](/blog/yacht-import-duty-taxes-india).",
        ],
      },
      {
        heading: "How to decide",
        paras: [
          "If this is your first boat, a well-surveyed used vessel already in India is almost always the lower-risk, faster path in. If you have owned before and know precisely what you want, importing new starts to make more sense. Either way, an independent survey and a clear customs history are non-negotiable — see [the yacht survey guide](/blog/yacht-survey-guide) for what that should cover.",
        ],
      },
    ],
  },
  {
    slug: "yacht-import-duty-taxes-india",
    title: "Import duty and taxes on yachts in India explained",
    excerpt:
      "What actually gets added to the price of an imported boat, and why the landed cost matters more than the sticker price.",
    seoTitle: "Yacht Import Duty & Taxes in India — What You Actually Pay",
    seoDescription:
      "A plain-English explanation of yacht import duty and taxes in India: what gets added to a foreign-built boat's price, GST, and why landed cost is what matters.",
    category: "Buying",
    date: "2026-02-21",
    readMins: 8,
    image: "https://images.unsplash.com/photo-1550266679-e12e22602d34?auto=format&fit=crop&w=1800&q=80",
    imageAlt: "A view of a marina with yachts moored along the dock",
    body: [
      {
        paras: [
          "The number that matters when importing a yacht into India is never the overseas price — it is the **landed cost**, after duty, GST, freight and commissioning are added. This is the single most common place first-time buyers get their budget wrong.",
        ],
      },
      {
        heading: "What gets added",
        paras: [
          "**Import duty and GST** apply to foreign-built vessels brought into India, calculated against the **assessable value of the boat**, and together they can add a substantial percentage over the quoted overseas price. The exact figure depends on the vessel's classification and use — a private recreational boat and a commercially registered charter vessel are not treated identically.",
        ],
      },
      {
        heading: "Freight and commissioning",
        paras: [
          "On top of duty, budget for shipping the vessel to India, survey on arrival, and commissioning before it is seaworthy again — none of which show up in the seller's listed price but all of which are real costs of getting the boat here and usable.",
        ],
      },
      {
        heading: "Why this changes the buy decision",
        paras: [
          "Once landed cost is properly calculated, a used boat already registered in India is frequently cheaper for an equivalent specification than importing new — see our comparison in [new vs used yachts in India](/blog/new-vs-used-yacht-india). It is worth getting this number confirmed before you fall in love with a specific overseas listing.",
        ],
      },
      {
        heading: "Get the number confirmed early",
        paras: [
          "Duty rates and classifications change, and getting this wrong is expensive in both directions — overpaying because you assumed the worst, or committing to a purchase you cannot actually afford once the real number lands. [Talk to us](/contact) before you commit to an overseas purchase and we will help get the landed cost confirmed properly.",
        ],
      },
    ],
  },
  {
    slug: "yacht-survey-guide",
    title: "The yacht survey: what it is and why you cannot skip it",
    excerpt:
      "What a marine surveyor actually checks, what it costs, and the one habit that protects every yacht purchase in India.",
    seoTitle: "Yacht Survey Guide — What It Covers and Why It Matters",
    seoDescription:
      "What a marine survey covers when buying a yacht in India: hull, engine, rigging and systems checks, typical cost, and why an independent survey is non-negotiable.",
    category: "Buying",
    date: "2026-03-15",
    readMins: 7,
    image: "https://images.unsplash.com/photo-1699993949078-7b5fb23affe7?auto=format&fit=crop&w=1800&q=80",
    imageAlt: "A close-up of a boat engine during a technical inspection",
    body: [
      {
        paras: [
          "A **marine survey** is the single step that separates a good yacht purchase from an expensive mistake, and it is also the step most often skipped by buyers in a hurry. It should never be optional, regardless of how good the boat looks on the day you view it.",
        ],
      },
      {
        heading: "What a surveyor actually checks",
        paras: [
          "A proper survey covers the **hull and structure for osmosis** or damage, the keel and rudder attachment, engine condition and hours, electrical systems, and — on a sailing yacht — the rigging and sails. The surveyor produces a written report with a condition rating and, usually, a list of items that need attention.",
        ],
        bullets: [
          "Hull and structural condition, including osmosis testing on GRP boats",
          "Engine hours, compression and general mechanical condition",
          "Electrical systems and wiring condition",
          "Standing and running rigging age, on a sailing yacht",
          "Safety equipment and compliance with current requirements",
        ],
      },
      {
        heading: "Who should arrange it",
        paras: [
          "You, not the seller and not the broker representing the seller. An **independent surveyor you appoint** has no incentive to soften a finding, which is the entire point of paying for one.",
        ],
      },
      {
        heading: "What it costs and how long it takes",
        paras: [
          "Survey cost scales with vessel size, and a proper survey with haul-out for hull inspection typically takes a full day. It is a small fraction of the purchase price and, on a boat where it uncovers a real issue, easily pays for itself many times over in either a renegotiated price or a purchase you correctly walked away from.",
        ],
      },
      {
        heading: "After the survey",
        paras: [
          "Findings become the basis for a renegotiation or a walk-away decision, not a reason to panic over every minor note — a surveyor's job is to list everything, including things that are normal wear. Read the report with someone who has been through a few of these before; see our guide on [how to buy a yacht in India](/blog/how-to-buy-a-yacht-in-india) for where the survey sits in the wider process.",
        ],
      },
    ],
  },
  {
    slug: "motor-yacht-or-sailing-yacht",
    title: "Motor yacht or sailing yacht: choosing your first boat",
    excerpt:
      "Running costs, skill required and what each actually feels like on the water — a straight comparison for a first-time Indian buyer.",
    seoTitle: "Motor Yacht vs Sailing Yacht — Which Should You Buy First?",
    seoDescription:
      "Motor yacht or sailing yacht: comparing running costs, skill required, and what ownership actually looks like for a first-time buyer in India.",
    category: "Buying",
    date: "2026-03-29",
    readMins: 7,
    image: "https://images.unsplash.com/photo-1506527240747-720a3e17b910?auto=format&fit=crop&w=1800&q=80",
    imageAlt: "A person sailing a small boat on open water",
    body: [
      {
        paras: [
          "Almost every first-time buyer eventually asks: **motor yacht or sailing yacht**? Both are genuine, sensible choices for Indian waters — the right answer depends on what you actually want a day on the water to feel like.",
        ],
      },
      {
        heading: "Running costs",
        paras: [
          "A sailing yacht burns a fraction of the fuel a motor yacht does over the same distance, since the engine is used mainly for manoeuvring rather than propulsion. The offsetting cost is **rigging and sails, which have a real service life** and need periodic renewal. Motor yachts trade that for higher, steadier fuel and engine maintenance costs.",
        ],
      },
      {
        heading: "Skill and crew",
        paras: [
          "A motor yacht is more forgiving to operate and easier to hand over to a hired captain with minimal handover time. A sailing yacht rewards someone who wants to learn the boat properly — see [learn to sail: a beginner's guide](/blog/learn-to-sail-beginners-guide-india) if that sounds appealing rather than daunting.",
        ],
      },
      {
        heading: "What the day actually feels like",
        paras: [
          "Motor yachts are about arriving somewhere and enjoying the space once you are there — more deck area, more speed, more comfort for guests who are not sailors. Sailing yachts are about the process itself; if the sail is the point rather than the destination, that changes the whole calculation.",
        ],
      },
      {
        heading: "For Indian conditions specifically",
        paras: [
          "Both work fine on the west coast in season. Motor yachts handle Mumbai's harbour chop with more ease for guests unused to boats; sailing yachts are genuinely pleasant in Goa's calmer, more consistent breeze. Neither operates during the monsoon regardless of type.",
        ],
      },
      {
        heading: "Making the call",
        paras: [
          "If you are buying primarily to entertain guests who are not boaters themselves, lean motor. If you or someone in the household actually wants to sail, and is willing to put in the hours to learn it properly, a sailing yacht will reward that investment. See [buying a motor yacht](/yachts/buy-a-motor-yacht) or [buying a sailing yacht](/yachts/buy-a-sailing-yacht) for the specifics of each path.",
        ],
      },
    ],
  },
  {
    slug: "how-to-sell-a-yacht-in-india",
    title: "How to sell a yacht in India: a seller's guide",
    excerpt:
      "Pricing it honestly, presenting it properly, and the paperwork that decides whether a sale actually closes.",
    seoTitle: "How to Sell a Yacht in India — A Complete Seller's Guide",
    seoDescription:
      "A guide to selling a yacht in India: honest valuation, presentation and photography, listing strategy, buyer vetting, and the paperwork that makes a sale close cleanly.",
    category: "Buying",
    date: "2026-04-05",
    readMins: 7,
    image: "https://images.unsplash.com/photo-1587365001066-8263b7061a38?auto=format&fit=crop&w=1800&q=80",
    imageAlt: "A white boat moored at a marina",
    body: [
      {
        paras: [
          "Selling a **yacht in India** is a smaller, slower market than selling a car, and most private sales stall for one of two reasons: the price is unrealistic, or the paperwork is not ready. Both are entirely fixable before you list.",
        ],
      },
      {
        heading: "Price it against real sales, not hope",
        paras: [
          "An overpriced listing sits for months, goes stale, and eventually sells for less than a correctly priced one would have from day one. Value it against comparable recent sales rather than what similar boats are currently asking — asking prices and selling prices are frequently very different numbers.",
        ],
      },
      {
        heading: "Presentation matters more than people expect",
        paras: [
          "A proper detail before photography, and **professional photography** rather than phone snaps, materially changes how quickly a boat sells. Buyers judge condition from the listing before they ever see the boat in person.",
        ],
      },
      {
        heading: "Get the paperwork ready before you list",
        paras: [
          "Registration certificate, proof of ownership, insurance history, survey reports and service records should all be assembled before the first viewing, not requested after an offer. For an imported hull, incomplete **customs documentation is the single most common reason** a sale collapses at the final stage — sort this out first.",
        ],
        bullets: [
          "Registration certificate and proof of ownership",
          "Full service and maintenance history",
          "Any existing survey reports",
          "Complete customs and import documentation, if the hull was imported",
        ],
      },
      {
        heading: "Expect a survey, and welcome it",
        paras: [
          "A serious buyer will commission their own independent survey — see [the yacht survey guide](/blog/yacht-survey-guide) for what that involves. Treat a thorough buyer as a good sign, not an obstacle; it usually means the sale will actually close.",
        ],
      },
      {
        heading: "Getting help",
        paras: [
          "A broker earns their commission through the parts sellers find tedious — qualifying buyers, managing viewings, and negotiating the survey list without the deal falling apart. See [sell your yacht](/yachts/sell-your-yacht) if you would rather hand the process to someone who does it full time.",
        ],
      },
    ],
  },
  {
    slug: "how-to-rent-a-yacht-in-india",
    title: "How to rent a yacht in India: a complete guide",
    excerpt:
      "From working out group size to reading a quote properly — everything to know before you book your first charter.",
    seoTitle: "How to Rent a Yacht in India — Complete Booking Guide",
    seoDescription:
      "A complete guide to renting a yacht in India: how pricing works, what to check before booking, group size and boat size, and how to read a charter quote.",
    category: "Guides",
    date: "2026-04-21",
    readMins: 8,
    image: "https://images.unsplash.com/photo-1774579891903-b48c080536b5?auto=format&fit=crop&w=1800&q=80",
    imageAlt: "Two luxury yachts moored at a dock at sunset",
    body: [
      {
        paras: [
          "**Renting a yacht in India** is simpler than most first-timers expect once you know how the pricing and booking actually work — this is the straight version, without the sales pitch.",
        ],
      },
      {
        heading: "How pricing works",
        paras: [
          "Charters are priced **per boat, per hour**, not per person — a rate of ₹14,000 an hour costs the same whether four guests board or fourteen, so the per-head cost falls sharply as your group grows. Most boats carry a two-hour minimum on weekends, one hour midweek.",
        ],
      },
      {
        heading: "What is included versus what is extra",
        paras: [
          "The hourly rate should cover the captain, crew, fuel for the standard route and safety equipment. Catering, decoration, photography and water sports are legitimately separate — the warning sign is an operator who will not put those add-on prices in writing before you pay a deposit.",
        ],
      },
      {
        heading: "Choosing the right boat size",
        paras: [
          "**Guest capacity is set by the vessel's licence** and cannot be exceeded for any price — give an accurate head count when you enquire, including children. See [group size and boat size](/blog/group-size-boat-size-guide) for a fuller breakdown of what fits comfortably at different capacities.",
        ],
      },
      {
        heading: "Reading a quote properly",
        paras: [
          "A trustworthy quote states the exact route, duration, what is included, and every add-on cost before you pay anything. Ask specifically what happens if the weather is bad on your date — a reputable operator reschedules at no cost rather than sailing in unsafe conditions or keeping your deposit.",
        ],
        bullets: [
          "Exact route and duration confirmed in writing",
          "A clear list of what the hourly rate includes",
          "Add-on prices quoted before any deposit is paid",
          "A stated weather-cancellation policy",
        ],
      },
      {
        heading: "Booking timeline",
        paras: [
          "Weekday charters can often be arranged within the same week. Weekend slots, sunset departures and anything in December need two to three weeks of notice. See [charter types](/charters) for current boats and availability, or [message us on WhatsApp](/contact) with your date and group size for a same-day quote.",
        ],
      },
    ],
  },
  {
    slug: "yacht-charter-etiquette",
    title: "Yacht charter etiquette: what guests should know",
    excerpt:
      "The unwritten rules that make a charter go smoothly for you, your crew and everyone else on board.",
    seoTitle: "Yacht Charter Etiquette — A Guest's Guide",
    seoDescription:
      "Yacht charter etiquette for guests: footwear, tipping, dealing with the crew, alcohol rules and the small habits that make a charter run smoothly.",
    category: "Guides",
    date: "2026-05-05",
    readMins: 6,
    image: "https://images.unsplash.com/photo-1759497904811-fc906fdcd270?auto=format&fit=crop&w=1800&q=80",
    imageAlt: "A group of people enjoying a day on a yacht",
    body: [
      {
        paras: [
          "A little **charter etiquette** goes a long way toward a good day on the water — most of it is common sense, but a few things are specific to boats and worth knowing before you board.",
        ],
      },
      {
        heading: "Footwear",
        paras: [
          "Soft-soled, **non-marking shoes** only, or better, go barefoot on deck. Black-soled shoes scuff the deck surface, and heels can damage it outright — most crews will ask you to remove them before boarding if you turn up in the wrong footwear.",
        ],
      },
      {
        heading: "Listen to the crew",
        paras: [
          "The captain's instructions on safety, where to sit during manoeuvring and how many guests can be on deck at once are not suggestions. A good crew is discreet and lets the day feel effortless, which is exactly why guests sometimes forget they are still in charge of the boat's safety.",
        ],
      },
      {
        heading: "Alcohol and outside food",
        paras: [
          "Rules vary by vessel and by the permits in force on a given day — confirm before you buy anything rather than assuming. Most operators are relaxed about outside food; alcohol is the area that varies most, so ask directly.",
        ],
      },
      {
        heading: "Tipping",
        paras: [
          "Not obligatory, but customary for good service, similar to a restaurant. **Ten percent of the charter cost**, split among the crew, is a reasonable guide for a booking where the crew went out of their way.",
        ],
      },
      {
        heading: "Timing",
        paras: [
          "Arrive at the jetty on time — the tender out to the boat runs on a schedule, and a late group eats into everyone's charter time, including their own. If you are running late, call ahead; most crews can hold a few minutes if they know in advance.",
        ],
      },
    ],
  },
  {
    slug: "what-to-pack-for-a-yacht-charter",
    title: "What to pack for a yacht charter in India",
    excerpt:
      "The genuinely useful list — sun protection, footwear, motion sickness and the small things people always forget.",
    seoTitle: "What to Pack for a Yacht Charter — Packing Checklist",
    seoDescription:
      "A practical packing checklist for a yacht charter in India: sun protection, footwear, seasickness remedies, and what to actually leave at home.",
    category: "Guides",
    date: "2026-05-19",
    readMins: 5,
    image: "https://images.unsplash.com/photo-1748623219231-17c16afb7805?auto=format&fit=crop&w=1800&q=80",
    imageAlt: "A man standing on the deck of a boat looking out at the city",
    body: [
      {
        paras: [
          "A short, genuinely useful list rather than a generic travel checklist — what actually matters for a **yacht charter** on the Indian coast.",
        ],
      },
      {
        heading: "Definitely bring",
        paras: [
          "Sun protection is the one thing nobody packs enough of — reflection off the water roughly doubles your sun exposure compared to being on land, even on a cloudy day.",
        ],
        bullets: [
          "**Sunscreen, reapplied** — reflection off the water makes burning fast",
          "A hat and sunglasses with a retainer strap",
          "A light layer for after sunset, once the wind picks up",
          "A change of clothes if any water sports are planned",
          "**Motion sickness tablets**, taken an hour before boarding if you are prone to it",
        ],
      },
      {
        heading: "Leave at home",
        paras: [
          "Hard-soled shoes and heels, which damage the deck and are usually asked to come off anyway. Anything you would be genuinely upset to lose overboard — the sea has a way of taking sunglasses and phones during the excitement of a swim stop.",
        ],
      },
      {
        heading: "For families with children",
        paras: [
          "Bring your own child-size sun hat and rash guard even though life jackets are provided — supervision matters more than gear, so plan for one adult per child near the water at all times.",
        ],
      },
      {
        heading: "One habit worth adopting",
        paras: [
          "Put your phone and anything else you cannot get wet in a dry bag or a zip-lock before boarding, not after someone asks you to. A splash on deck is more common than people expect, even on a calm day.",
        ],
      },
    ],
  },
  {
    slug: "group-size-boat-size-guide",
    title: "Group size and boat size: how many guests fit on a yacht",
    excerpt:
      "A practical guide to matching your group to the right boat, and why the licensed capacity is not the number that actually matters.",
    seoTitle: "Yacht Group Size Guide — How Many Guests Fit Comfortably",
    seoDescription:
      "How to match your group size to the right yacht: licensed capacity versus comfortable capacity, and a practical guide by guest count for a charter in India.",
    category: "Guides",
    date: "2026-06-02",
    readMins: 6,
    image: "https://images.unsplash.com/photo-1736299297925-da1c8b1e2072?auto=format&fit=crop&w=1800&q=80",
    imageAlt: "A group of people standing together on the deck of a boat",
    body: [
      {
        paras: [
          "Every boat has a licensed capacity, set by its coast guard certificate — but the number that actually determines whether your **group size** matches the boat is comfort, not the legal maximum.",
        ],
      },
      {
        heading: "Why licensed capacity is not the target",
        paras: [
          "A boat licensed for twenty people at that exact number feels genuinely full — no spare deck space, limited seating, a crowded feel by the second hour. Booking to roughly seventy to eighty percent of licensed capacity is where most charters actually feel comfortable.",
        ],
      },
      {
        heading: "By group size",
        paras: [
          "A rough guide, though every boat differs — see individual listings on our [fleet page](/fleet) for exact specs.",
        ],
        bullets: [
          "**2–8 guests** — smaller boats, ₹11,900–14,000/hr range, plenty of deck space",
          "**8–16 guests** — mid-size boats, most birthday and small corporate bookings",
          "**16–24 guests** — larger boats with a proper sun deck and lounge area",
          "**24+ guests** — flagship boats, best for events with catering and a DJ",
        ],
      },
      {
        heading: "Capacity is a hard limit either way",
        paras: [
          "Regardless of comfort preferences, the licensed number cannot be exceeded for any price — a reputable operator will simply say no rather than squeeze in extra guests, and that is a sign they take safety seriously rather than a frustrating rule.",
        ],
      },
      {
        heading: "When you are between sizes",
        paras: [
          "If your group sits between two boat sizes, size up rather than down — a slightly larger boat with room to spare is a better booking than a full one, especially for a party where people will be moving around rather than seated the whole time.",
        ],
      },
    ],
  },
  {
    slug: "yacht-charter-safety-questions",
    title: "Yacht charter safety: questions to ask before you book",
    excerpt:
      "The five questions that tell you whether an operator is properly run, before you commit any money.",
    seoTitle: "Yacht Charter Safety — Questions to Ask Before Booking",
    seoDescription:
      "Five safety questions to ask a yacht charter operator before booking in India: licensing, life jackets, weather policy, capacity and crew qualifications.",
    category: "Guides",
    date: "2026-06-09",
    readMins: 6,
    image: "https://images.unsplash.com/photo-1768887587363-7c039c39baa1?auto=format&fit=crop&w=1800&q=80",
    imageAlt: "People standing on a dock next to moored yachts",
    body: [
      {
        paras: [
          "Not every operator running charters in India is properly licensed and equipped, and it is worth asking a few direct **safety** questions before you pay a deposit rather than finding out on the day.",
        ],
      },
      {
        heading: "1. Is the captain licensed and is the boat commercially registered?",
        paras: [
          "A straightforward yes should come without hesitation. Commercial passenger registration and a **licensed captain are the baseline**, not an upgrade — an operator who is vague about this is one to avoid.",
        ],
      },
      {
        heading: "2. What is your weather policy?",
        paras: [
          "The answer should be that the charter is **rescheduled at no cost** if the coast guard suspends sailing or the captain judges conditions unsafe, and that this decision is made on safety grounds rather than to protect a booking. If they hedge on refunding or rescheduling, that is a real warning sign.",
        ],
      },
      {
        heading: "3. Are life jackets provided for every guest, including children?",
        paras: [
          "Should be an immediate yes, with child sizes specifically available. This is basic safety equipment, not an add-on.",
        ],
      },
      {
        heading: "4. What is the licensed guest capacity, and will you enforce it?",
        paras: [
          "A trustworthy operator states the number plainly and will not exceed it for any price, even a full group offering extra money. See [group size and boat size](/blog/group-size-boat-size-guide) for why this matters beyond just legality.",
        ],
      },
      {
        heading: "5. What happens if something goes wrong on board?",
        paras: [
          "Ask whether crew are trained in first aid and water rescue, and whether there is a clear emergency plan. A confident, specific answer is a good sign; a shrug is not.",
        ],
      },
    ],
  },
  {
    slug: "corporate-yacht-charters-india",
    title: "Corporate yacht charters in India: a planning guide",
    excerpt:
      "Offsites, client entertaining and team events on the water — what to plan for and how to get it invoiced properly.",
    seoTitle: "Corporate Yacht Charters in India — Planning Guide",
    seoDescription:
      "Planning a corporate yacht charter in India: offsites, client entertaining, GST invoicing, catering and logistics for a team event or business function on the water.",
    category: "Guides",
    date: "2026-06-28",
    readMins: 7,
    image: "https://images.unsplash.com/photo-1574353366565-ba6996936b63?auto=format&fit=crop&w=1800&q=80",
    imageAlt: "Aerial view of white motorboats moored on calm water",
    body: [
      {
        paras: [
          "A **corporate yacht charter** is a genuinely effective way to run a client event or a team offsite — it forces a different kind of conversation than a conference room, and it is memorable in a way most corporate venues are not.",
        ],
      },
      {
        heading: "Choosing the format",
        paras: [
          "A half-day static charter suits a working offsite with a fixed agenda. A sunset cruise works better for client entertaining, where the point is the atmosphere rather than a schedule. Full-day charters combine both, with structured time in the morning and a relaxed afternoon.",
        ],
      },
      {
        heading: "Invoicing and paperwork",
        paras: [
          "Most operators, including us, provide a **GST invoice** for corporate bookings on request — confirm this before you book if it matters for your company's expense process.",
        ],
      },
      {
        heading: "Practical logistics",
        paras: [
          "Fixed timings matter more for a corporate event than a leisure charter — confirm boarding time, return time and a contingency plan for anyone running late. Ground transfers from the office to the jetty can usually be arranged as part of the booking.",
        ],
        bullets: [
          "Confirm a **fixed itinerary and timings** in writing",
          "GST invoicing arranged in advance",
          "Catering matched to the format — working lunch versus canapés",
          "On-board branding or signage if the event needs it",
        ],
      },
      {
        heading: "Booking multiple boats",
        paras: [
          "For a larger group that will not fit on a single vessel, multiple boats can be booked to run in convoy or anchor together — worth planning further ahead than a single-boat booking. See [charter types](/charters) for current fleet capacity, or [get in touch](/contact) to talk through a larger event.",
        ],
      },
    ],
  },
  {
    slug: "wedding-proposal-on-a-yacht-india",
    title: "Planning a wedding or proposal on a yacht in India",
    excerpt:
      "Timing it to the light, briefing the crew, and the small details that decide whether the moment goes the way you pictured it.",
    seoTitle: "Wedding & Proposal on a Yacht in India — Planning Guide",
    seoDescription:
      "How to plan a proposal or wedding on a yacht in India: timing to sunset, arranging flowers and a photographer, keeping the surprise, and weather contingency.",
    category: "Guides",
    date: "2026-07-05",
    readMins: 7,
    image: "https://images.unsplash.com/photo-1772940817118-f5eba2efe23f?auto=format&fit=crop&w=1800&q=80",
    imageAlt: "A boat decorated with flowers on the water",
    body: [
      {
        paras: [
          "A **proposal on a yacht** or a small wedding on the water is one of the more requested occasions we plan, and the ones that go well share a few things in common — timing, a briefed crew, and a weather backup plan.",
        ],
      },
      {
        heading: "Time it to the light, not the clock",
        paras: [
          "Book the boat to leave roughly **ninety minutes before sunset**, so you are anchored in open water at the exact moment the light turns. Sunset time shifts by more than an hour across the year, so confirm the actual time for your date rather than assuming a fixed evening slot.",
        ],
      },
      {
        heading: "Brief the crew properly",
        paras: [
          "Tell the operator the plan in advance and a good crew will work around it — the anchoring point, when drinks appear, and when everyone makes themselves scarce for the actual moment. This is the single detail that separates a smooth proposal from an awkward one.",
        ],
      },
      {
        heading: "Details worth arranging",
        paras: [
          "In roughly the order they matter:",
        ],
        bullets: [
          "A photographer positioned before you board, not summoned afterward",
          "Flowers or decoration set below deck, invisible until the right moment",
          "A cake and something cold, with 48 hours' notice",
          "Somewhere secure for the ring that is not a pocket on a moving boat",
        ],
      },
      {
        heading: "For a small wedding on board",
        paras: [
          "**Guest capacity is fixed by the vessel's licence**, so confirm numbers early and choose a boat with margin for a wedding party moving around rather than staying seated. See [group size and boat size](/blog/group-size-boat-size-guide) for how to match numbers to a boat.",
        ],
      },
      {
        heading: "Have a weather answer",
        paras: [
          "If the coast guard suspends sailing, your charter reschedules for free — but the rest of your plans for the day may not move as easily. Decide your fallback in advance and tell the operator, rather than improvising on the day.",
        ],
      },
    ],
  },
  {
    slug: "bachelorette-birthday-parties-on-a-yacht",
    title: "Bachelorette and birthday parties on a yacht",
    excerpt:
      "How to plan a group celebration on the water — music, catering, decoration and getting the timing right.",
    seoTitle: "Bachelorette & Birthday Parties on a Yacht — Planning Guide",
    seoDescription:
      "Planning a bachelorette or birthday party on a yacht in India: music and sound systems, catering, decoration, timing, and what to check before you book.",
    category: "Guides",
    date: "2026-07-12",
    readMins: 6,
    image: "https://images.unsplash.com/photo-1773594559238-1f4bcf8672a8?auto=format&fit=crop&w=1800&q=80",
    imageAlt: "A boat sailing across calm blue water toward a rocky island",
    body: [
      {
        paras: [
          "A **birthday or bachelorette on a yacht** turns a fairly standard celebration into something people actually remember — the setting does most of the work, but a few planning details make the day run better.",
        ],
      },
      {
        heading: "Picking the length",
        paras: [
          "Two hours works for a straightforward celebration with drinks and music. Three to four hours gives room for catering, cake and photos without feeling rushed. A full-day charter suits a bigger group who want swimming and water sports built in as well.",
        ],
      },
      {
        heading: "Music and sound",
        paras: [
          "Most boats carry a **Bluetooth sound system** as standard — confirm this before assuming you can just plug in a playlist. For a bigger event, a dedicated DJ can usually be arranged as an add-on.",
        ],
      },
      {
        heading: "Decoration and cake",
        paras: [
          "Balloon or floral decoration, a custom cake and a bar setup are the most requested add-ons, and all need roughly **48 hours' notice** to arrange properly. Confirm exactly what is included and what costs extra before you pay a deposit.",
        ],
      },
      {
        heading: "Keeping a surprise",
        paras: [
          "If it is a surprise birthday, brief the crew in advance — they can help manage boarding so the guest of honour does not see decorations set up before the reveal moment.",
        ],
      },
      {
        heading: "Booking it",
        paras: [
          "See [charter types](/charters) for boats suited to a party atmosphere, or [message us](/contact) with your date, group size and occasion for a same-day quote.",
        ],
      },
    ],
  },
  {
    slug: "pre-wedding-fashion-shoots-on-a-yacht",
    title: "Pre-wedding and fashion shoots on a yacht",
    excerpt:
      "Golden-hour timing, deck space for a crew, and the practical details that make a shoot on the water go smoothly.",
    seoTitle: "Pre-Wedding & Fashion Shoots on a Yacht — Planning Guide",
    seoDescription:
      "Planning a pre-wedding or fashion shoot on a yacht in India: golden-hour timing, space for a crew and equipment, drone rules, and booking tips.",
    category: "Guides",
    date: "2026-07-19",
    readMins: 6,
    image: "https://images.unsplash.com/photo-1689737969303-a32ea2f78f0a?auto=format&fit=crop&w=1800&q=80",
    imageAlt: "A couple standing together on a sandy beach at the water's edge",
    body: [
      {
        paras: [
          "A **pre-wedding or fashion shoot on a yacht** gives a photographer a backdrop nobody else in the album has, and it books differently from a leisure charter — timing and crew space matter more than the route.",
        ],
      },
      {
        heading: "**Golden hour** is the whole point",
        paras: [
          "Book either the first ninety minutes after sunrise or the last ninety before sunset — both give soft, flattering light without the harsh overhead sun of midday. Confirm the exact times for your date, since they shift meaningfully across the year.",
        ],
      },
      {
        heading: "Space for a crew and equipment",
        paras: [
          "A shoot needs more deck space than a leisure charter for the same number of people — a photographer, an assistant, reflectors and outfit changes all need room. Book a boat a size up from what the guest count alone would suggest.",
        ],
      },
      {
        heading: "Changing space",
        paras: [
          "A cabin below deck doubles as a changing area for outfit changes — confirm this is available and private before the shoot, particularly for a multi-look fashion shoot rather than a single pre-wedding set.",
        ],
      },
      {
        heading: "Drones",
        paras: [
          "**Drone photography** is generally fine outside restricted zones, but Mumbai harbour has specific restrictions worth checking with the operator before you plan a shot list around aerial footage.",
        ],
      },
      {
        heading: "Booking",
        paras: [
          "Give more notice than a standard charter — golden-hour slots are popular with photographers as well as leisure guests. See our [fleet](/fleet) for boats with generous deck space, or [get in touch](/contact) to plan timing around your date.",
        ],
      },
    ],
  },
  {
    slug: "water-sports-on-a-yacht-charter",
    title: "Water sports you can do on a yacht charter",
    excerpt:
      "Jet skis, kayaks, snorkelling and more — what is actually available, and how to make sure it is included before you book.",
    seoTitle: "Water Sports on a Yacht Charter — What's Available & How to Book",
    seoDescription:
      "A guide to water sports available on a yacht charter in India: jet skis, kayaks, snorkelling and windsurfing, and how to confirm what is actually included.",
    category: "Guides",
    date: "2026-08-02",
    readMins: 6,
    image: "https://images.unsplash.com/photo-1680238577907-6e4549d95b44?auto=format&fit=crop&w=1800&q=80",
    imageAlt: "Two people riding jet skis on the water",
    body: [
      {
        paras: [
          "Not every boat carries **water sports** gear, and it is one of the most common things guests assume is included when it is actually an add-on — worth confirming before you book if this is the point of your trip.",
        ],
      },
      {
        heading: "Jet skis",
        paras: [
          "Carried as standard on a handful of boats in the fleet, usually run as a **supervised session** while the yacht is at anchor rather than a free-for-all. Confirm age and licensing requirements for anyone wanting to drive rather than ride.",
        ],
      },
      {
        heading: "Kayaks",
        paras: [
          "A lower-key option, self-paddled around the anchorage, and generally available on more boats than jet skis since they need no fuel or supervision beyond basic safety.",
        ],
      },
      {
        heading: "Snorkelling",
        paras: [
          "Best suited to Goa's **Grande Island route** and similarly clear-water anchorages — Mumbai harbour water is not clear enough to make snorkelling worthwhile. Gear is usually carried on island-route boats as standard.",
        ],
      },
      {
        heading: "Windsurfing",
        paras: [
          "Available on a smaller number of boats, and genuinely useful only if someone in the group already knows how to windsurf — it is not something most charters teach on the day.",
        ],
      },
      {
        heading: "Checking before you book",
        paras: [
          "Ask specifically which water sports are included at no extra cost versus quoted separately, and whether a swim stop is built into the route or needs to be requested. See our [fleet page](/fleet) for boats that list water toys as standard.",
        ],
      },
    ],
  },
  {
    slug: "monsoon-season-yachting-india",
    title: "Monsoon season and yachting in India: what you need to know",
    excerpt:
      "Why the west coast shuts down for four months a year, what happens to boats during it, and how to plan around it.",
    seoTitle: "Monsoon Season & Yachting in India — What to Know",
    seoDescription:
      "How the monsoon affects yachting in India: why charters stop from June to September, what happens to boats during layup, and how to plan a trip around the season.",
    category: "Ownership",
    date: "2026-08-09",
    readMins: 6,
    image: "https://images.unsplash.com/photo-1524679166686-04237b4667b4?auto=format&fit=crop&w=1800&q=80",
    imageAlt: "A large wave breaking on the open sea",
    body: [
      {
        paras: [
          "The **monsoon** is the single biggest fact of yachting life on India's west coast, and it shapes everything from booking windows to boat maintenance schedules. Here is what it actually means in practice.",
        ],
      },
      {
        heading: "Why charters stop",
        paras: [
          "From roughly June to September, the southwest monsoon brings sustained high winds, heavy swell and reduced visibility that make coastal charter operations genuinely unsafe. The coast guard **restricts small-craft movement** during this period, and any operator offering charters in the middle of it is one to avoid.",
        ],
      },
      {
        heading: "What happens to the boats",
        paras: [
          "Vessels are hauled out and properly laid up — engine pickling, battery removal, hull inspection and dehumidification — rather than left in the water. This is also when refit and repair work happens, since the boats are ashore anyway. See [monsoon storage](/management/monsoon-storage) and [yacht refit and repair](/management/yacht-refit-and-repair) for what proper layup actually involves.",
        ],
      },
      {
        heading: "Planning a trip around it",
        paras: [
          "**October to May is the reliable window**, with October and May as shoulder months that can still carry some weather risk early or late in the season. December through February is peak — book two to three weeks ahead for weekend and sunset slots during this window.",
        ],
      },
      {
        heading: "If you own a boat",
        paras: [
          "Monsoon layup is not optional for a boat kept on the west coast — a vessel left in the water through the season deteriorates fast, and most harbour authorities restrict it in any case. Book hardstand space by April; it is genuinely limited and fully allocated by late May most years.",
        ],
      },
    ],
  },
  {
    slug: "learn-to-sail-beginners-guide-india",
    title: "Learn to sail: a beginner's guide to sailing courses in India",
    excerpt:
      "What a first lesson actually involves, whether you need to swim, and the certification ladder worth knowing about.",
    seoTitle: "Learn to Sail in India — A Beginner's Guide",
    seoDescription:
      "A beginner's guide to learning to sail in India: what a first lesson involves, whether you need to swim, RYA certification, and where to start.",
    category: "Sailing",
    date: "2026-08-23",
    readMins: 7,
    image: "https://images.unsplash.com/photo-1786718915228-767631820632?auto=format&fit=crop&w=1800&q=80",
    imageAlt: "Two people sailing a small dinghy with a bright spinnaker",
    body: [
      {
        paras: [
          "**Learning to sail** in India is more accessible than its reputation suggests — most clubs are short of new members, not gatekeeping them, and a genuine beginner can be handling a small boat within a single weekend.",
        ],
      },
      {
        heading: "What a first lesson looks like",
        paras: [
          "Good beginner courses are practical from the first session rather than starting with a classroom — you rig a small dinghy, learn to steer and trim a sail, and are usually sailing independently in light wind by the end of day one, with an instructor nearby throughout.",
        ],
      },
      {
        heading: "Do you need to swim?",
        paras: [
          "No. Every student wears a **buoyancy aid** throughout, and a safety boat stays on the water for the whole session. Being a confident swimmer helps your comfort level, but it is not a prerequisite to start.",
        ],
      },
      {
        heading: "The certification ladder",
        paras: [
          "If you only want to sail casually with friends, no certification is needed at all. If you eventually want to charter a yacht abroad or skipper your own boat, the **RYA ladder** — Competent Crew, then Day Skipper — is the internationally recognised path. See [RYA courses](/about/sailing-school/rya-courses) for the full progression.",
        ],
      },
      {
        heading: "Getting started",
        paras: [
          "Book a half-day taster before committing to a full course — it costs little and tells you quickly whether sailing is genuinely for you. See [learn to sail](/about/sailing-school/learn-to-sail) for course options in Mumbai and Goa.",
        ],
      },
    ],
  },
  {
    slug: "yacht-maintenance-checklist-india",
    title: "Yacht maintenance in India: a season-by-season checklist",
    excerpt:
      "What needs attention before the season starts, during it, and before monsoon layup — a practical maintenance calendar for Indian conditions.",
    seoTitle: "Yacht Maintenance Checklist for India — Season by Season",
    seoDescription:
      "A season-by-season yacht maintenance checklist for Indian conditions: pre-season checks, in-season care, and monsoon layup preparation.",
    category: "Ownership",
    date: "2026-08-26",
    readMins: 7,
    image: "https://images.unsplash.com/photo-1662208760728-f0880014a2ad?auto=format&fit=crop&w=1800&q=80",
    imageAlt: "A group of boats moored together on the water",
    body: [
      {
        paras: [
          "**Yacht maintenance** in India runs on a different calendar to most of the world, built around a hard four-month season closure rather than year-round use. Here is a practical checklist by season.",
        ],
      },
      {
        heading: "Pre-season, September to October",
        paras: [
          "**Recommissioning after monsoon layup**: antifouling, anode renewal, engine service and a full sea trial before the season's first charter or outing. This is not optional maintenance — it is what makes the difference between a smooth season and one full of avoidable breakdowns.",
        ],
        bullets: [
          "Antifouling and hull inspection after haul-out",
          "Anode renewal",
          "Engine and generator service",
          "Battery reconditioning and electrical system check",
          "Sea trial before the first real outing",
        ],
      },
      {
        heading: "In-season, October to May",
        paras: [
          "Regular washdowns after every trip to remove salt, particularly around fittings and electronics. Indian coastal water is harder on hardware than many owners expect — silt and salt air both accelerate corrosion, so routine checks matter more here than in cleaner cruising grounds.",
        ],
      },
      {
        heading: "Pre-monsoon layup, May to June",
        paras: [
          "**Proper layup is a procedure**, not just parking the boat ashore: haul-out, pressure wash, engine and generator pickling, battery removal, and dehumidification below deck. See [monsoon storage](/management/monsoon-storage) for what a professional layup actually covers.",
        ],
      },
      {
        heading: "Getting help",
        paras: [
          "A yard that does this properly is worth more than a marginally cheaper one that does not — a badly laid-up boat loses more condition in one monsoon than in three seasons of normal use. See [yacht refit and repair](/management/yacht-refit-and-repair) for structural and systems work beyond routine maintenance.",
        ],
      },
    ],
  },
  {
    slug: "family-friendly-boating-mumbai-goa",
    title: "Family-friendly boating in Mumbai and Goa: sailing with kids",
    excerpt:
      "Safety, age guidance, and how to actually plan a charter that works for a family rather than just adults.",
    seoTitle: "Family Boating in Mumbai & Goa — A Guide for Sailing with Kids",
    seoDescription:
      "A guide to family-friendly boating in Mumbai and Goa: safety equipment, age guidance, boat choice and tips for a charter that genuinely works with children.",
    category: "Guides",
    date: "2026-08-29",
    readMins: 6,
    image: "https://images.unsplash.com/photo-1783476698500-1ccef22260a4?auto=format&fit=crop&w=1800&q=80",
    imageAlt: "Colourful kayaks lined up on a sandy lake shore",
    body: [
      {
        paras: [
          "**Boating with children** in Mumbai or Goa works well with a bit of planning — the mistake most families make is booking the same trip they would as adults and expecting it to translate directly.",
        ],
      },
      {
        heading: "Safety first, genuinely",
        paras: [
          "**Child-size life jackets** should be available on any boat you book, and one adult should be responsible for supervising each child near the water at all times — crew help with the boat, not childcare. Confirm both before you book.",
        ],
      },
      {
        heading: "Choosing the right route",
        paras: [
          "A shorter, calmer route beats a long, ambitious one for young children — a two-hour harbour cruise or a Mandovi river run holds attention better than a full-day open-water charter. Save the longer routes for when children are old enough to genuinely enjoy them.",
        ],
      },
      {
        heading: "Timing around nap schedules and heat",
        paras: [
          "A morning or late-afternoon departure avoids both nap-time meltdowns and the harshest midday sun. Bring shade — hats and rash guards — since deck shade is often limited.",
        ],
      },
      {
        heading: "What keeps kids entertained",
        paras: [
          "A **swim stop, if the boat and weather allow it**, does more for a family charter than almost anything else. Kayaks, if carried, are a good option for slightly older children under supervision.",
        ],
      },
      {
        heading: "Booking it",
        paras: [
          "Tell the operator you are booking with children when you enquire — it changes which boat and route make sense. See [charter types](/charters) or [get in touch](/contact) with ages and group size for a tailored suggestion.",
        ],
      },
    ],
  },
];

export const posts: Post[] = [...existingPosts, ...newPosts].sort((a, b) =>
  b.date.localeCompare(a.date)
);

export const getPost = (slug: string) => posts.find((p) => p.slug === slug);

export const formatPostDate = (iso: string) =>
  new Date(iso).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
