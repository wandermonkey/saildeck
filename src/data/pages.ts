/**
 * Content-driven inner pages.
 *
 * Management services, sailing school and yacht sales all share one shape and
 * one template, so adding a service is a data edit rather than a new React
 * page. Each entry carries its own SEO title/description and FAQ block, which
 * is what keeps these from reading as thin doorway pages to Google.
 *
 * NOTE FOR SAILDECK: this copy is written from standard Indian marine-industry
 * practice. Read it before launch and correct anything Saildeck does not
 * actually offer — especially certifications, yard capabilities and lead times.
 */
export type ContentPage = {
  slug: string;
  /** Full route, so the template and sitemap never have to guess. */
  href: string;
  eyebrow: string;
  title: string;
  /** Rendered in serif italic after the title. */
  accent?: string;
  seoTitle: string;
  seoDescription: string;
  intro: string;
  image: string;
  imageAlt: string;
  /** Small stat strip under the hero. */
  facts?: { label: string; value: string }[];
  /**
   * Optional placard grid rendered between the hero and the main sections —
   * a tile per sub-service, each linking to an in-page anchor (its `id`)
   * rather than a separate route until that route exists. Used by the yacht
   * management page to cover every discipline Burgess-style without forcing
   * a dozen thin pages into existence up front.
   */
  placards?: {
    id: string;
    title: string;
    image: string;
    imageAlt: string;
    description: string;
  }[];
  /** Eyebrow/title/sub shown above the placard grid, if `placards` is set. */
  placardsIntro?: { eyebrow: string; title: string; accent?: string; sub?: string };
  /**
   * Hides the sticky "Talk to us about this" enquiry-form sidebar next to
   * the main content, switching to a full-width single column. Use for a
   * page that already funnels enquiries through its placards/CTA band and
   * doesn't need a second form competing for attention.
   */
  hideEnquireForm?: boolean;
  sections: {
    /** Anchor id for a placard's "Know more" link to scroll to, e.g. "crew-management". */
    id?: string;
    heading: string;
    /**
     * One paragraph, or several for a section that needs to go deep (a
     * comparison, the financial mechanics). Each entry renders as its own
     * <p>. Supports the same `**bold**` and `[text](/path)` markers as blog
     * copy (see RichText.tsx) — use the link syntax to point at a relevant
     * post in /blog rather than leaving a claim unsupported.
     */
    body: string | string[];
    /** Same markdown-lite syntax as `body`. */
    bullets?: string[];
    /** Optional supporting photo, shown under this section's copy. */
    image?: { src: string; alt: string; caption?: string };
  }[];
  faqs: { q: string; a: string }[];
};

/* ========================================================================
   Management — owner services
   ======================================================================== */

export const managementServices: ContentPage[] = [
  {
    slug: "boat-building",
    href: "/management/boat-building",
    eyebrow: "Management",
    title: "Boat",
    accent: "building",
    seoTitle: "Boat Building in India — Custom RIBs, Sports Boats & Tenders",
    seoDescription:
      "Custom boat building in India up to 40 ft. GRP sports boats, RIBs, dinghies and commercial tenders built to survey, with design support and IRS/MMD certification.",
    intro:
      "We build GRP and aluminium boats up to 40 feet — sports boats, RIBs, dinghies, patrol craft and commercial tenders. Every hull is engineered for Indian conditions: heavy monsoon layup, silty harbour water and long service intervals between yards.",
    image: "https://images.unsplash.com/photo-1516132006923-6cf348e5dee2?auto=format&fit=crop&w=1800&q=80",
    imageAlt: "Boat under construction in a boatyard workshop",
    facts: [
      { label: "Build size", value: "Up to 40 ft" },
      { label: "Materials", value: "GRP & aluminium" },
      { label: "Typical build", value: "4–9 months" },
      { label: "Certification", value: "IRS / MMD" },
    ],
    sections: [
      {
        heading: "What we build",
        body: "Our yard work concentrates on small commercial and leisure craft, where build quality matters more than volume. We take on one-off custom hulls as readily as short production runs.",
        bullets: [
          "Sports boats and day cruisers, 18–40 ft",
          "Rigid inflatable boats (RIBs) for dive, patrol and yacht tender duty",
          "Sailing dinghies and training boats for clubs and academies",
          "Commercial ferries, workboats and pilot tenders built to survey",
          "Custom yacht tenders matched to a mothership's davits and garage",
        ],
      },
      {
        heading: "How a build runs",
        body: "You get a single project manager from concept to handover. We work to a fixed specification and a staged payment schedule tied to milestones you can come and inspect — hull lamination, deck join, systems fit-out, sea trial.",
        bullets: [
          "Requirement study and concept sketch",
          "Naval architecture and structural drawings",
          "Tooling, lamination and hull moulding",
          "Systems, propulsion and interior fit-out",
          "Sea trials, survey and registration handover",
        ],
      },
      {
        heading: "Built for Indian waters",
        body: "Boats here work harder than the brochure assumes. Salt-heavy air on the west coast, silt that eats impellers, and four months a year out of the water. We spec heavier anodes, accessible seacocks, and layouts that can be hosed out — the unglamorous decisions that decide whether a boat is still good in year eight.",
      },
    ],
    faqs: [
      {
        q: "How long does a custom boat build take in India?",
        a: "A 24–30 ft GRP sports boat typically takes four to six months from signed drawings to sea trial. Larger or heavily customised builds run to nine months. Monsoon affects lamination scheduling, so a build started in April moves faster than one started in July.",
      },
      {
        q: "Can you build to commercial survey?",
        a: "Yes. We build to Indian Register of Shipping and MMD requirements for passenger and workboat categories. Tell us the intended service and passenger count at the design stage — retrofitting a hull to survey afterwards is far more expensive than building to it.",
      },
      {
        q: "Do you handle registration and certification?",
        a: "We prepare the documentation and coordinate survey attendance. Final registration is in the owner's name with the relevant maritime board or MMD, and we hand over a complete document pack at delivery.",
      },
      {
        q: "What is the payment structure?",
        a: "Staged against milestones — typically a design deposit, then payments at hull moulding, deck join, systems completion and pre-delivery. You are welcome at the yard at every stage.",
      },
    ],
  },
  {
    slug: "marina-consultancy",
    href: "/management/marina-consultancy",
    eyebrow: "Management",
    title: "Marina",
    accent: "consultancy",
    seoTitle: "Marina Consultancy & Pontoon Development in India",
    seoDescription:
      "Marina planning, pontoon design and jetty development consultancy for Indian waterfronts. Feasibility studies, layout, permissions, construction oversight and operations.",
    intro:
      "India has a long coastline and very few working marinas. We advise developers, state tourism boards and private clubs on what it actually takes to build and run one — from feasibility and berth mix through to the day the first boat ties up.",
    image: "https://images.unsplash.com/photo-1548574505-5e239809ee19?auto=format&fit=crop&w=1800&q=80",
    imageAlt: "Marina pontoons with boats berthed alongside",
    facts: [
      { label: "Scope", value: "Concept to operations" },
      { label: "Berths", value: "20 to 300+" },
      { label: "Water", value: "Sea, creek, river" },
      { label: "Coverage", value: "Pan-India" },
    ],
    sections: [
      {
        heading: "Where we come in",
        body: "Most marina projects in India fail on one of three things: a berth mix nobody wanted, a permissions path nobody mapped, or an operating model that ignores the monsoon. We work on all three before a single pile goes in.",
        bullets: [
          "Site feasibility, bathymetry review and wave-climate assessment",
          "Demand study and berth mix — what sizes will actually fill",
          "Master planning, pontoon layout and hardstand sizing",
          "CRZ, maritime board and environmental permissions strategy",
          "Tender documentation and contractor evaluation",
          "Construction supervision and commissioning",
          "Operating model, tariff structure and staffing plan",
        ],
      },
      {
        heading: "Pontoon and jetty systems",
        body: "We specify floating pontoon systems, gangways, fingers and mooring hardware suited to local tidal range and swell, and supervise installation. Concrete or aluminium float selection is driven by exposure, not by catalogue price.",
      },
      {
        heading: "Running it afterwards",
        body: "A marina is a hospitality business that happens to be on water. We help set up berth licensing, fuel and pump-out handling, security, and the maintenance calendar — and we can operate the facility on your behalf.",
      },
    ],
    faqs: [
      {
        q: "What permissions does a marina need in India?",
        a: "Typically CRZ clearance, state maritime board approval, port or fisheries department consent depending on the water body, and environmental clearance above certain thresholds. The exact path varies by state, which is why the permissions strategy is done at feasibility stage, not after design.",
      },
      {
        q: "How long does a marina project take?",
        a: "Feasibility and permissions usually run twelve to twenty-four months, construction six to eighteen depending on scale and whether breakwater work is needed. Anyone quoting materially less has not accounted for clearances.",
      },
      {
        q: "Do you work on small private jetties too?",
        a: "Yes. A twenty-berth club jetty gets the same engineering attention as a large commercial marina, at a scope and fee matched to it.",
      },
    ],
  },
  {
    slug: "yacht-timeshare",
    href: "/management/yacht-timeshare",
    eyebrow: "Management",
    title: "Yacht",
    accent: "timeshare",
    seoTitle: "Yacht Timeshare & Fractional Ownership in India — Mumbai & Goa",
    seoDescription:
      "Fractional yacht ownership and yacht club membership in Mumbai and Goa. Own a real share, get a guaranteed 12–90 days a year, and let us run the crew, berth, insurance and monsoon layup.",
    intro:
      "Most privately owned yachts in India sail fewer than twenty days a year while costing their owner every day of it. Fractional ownership and timeshare exist to fix that arithmetic — a group of owners share one vessel, each gets a guaranteed allocation of days, and the fixed costs of running a boat divide by however many people are holding a share.",
    image: "https://images.unsplash.com/photo-1567899378494-47b22a2ae96a?auto=format&fit=crop&w=1800&q=80",
    imageAlt: "Motor yacht at anchor in a calm bay",
    facts: [
      { label: "Shares", value: "1/16 to 1/4" },
      { label: "Days a year", value: "12 to 90" },
      { label: "Co-owners", value: "Up to 16" },
      { label: "Includes", value: "Crew & upkeep" },
    ],
    sections: [
      {
        heading: "How it works",
        body: [
          "You buy a defined share of a specific vessel, held through a co-ownership structure — typically the boat sits inside its own company, with each owner holding equity in proportion to their share. That share entitles you to a fixed number of days a year, booked through a rolling calendar that rotates weekends, long weekends and the peak December–January window fairly between owners so the same person is never last in line twice running.",
          "Everything that keeps the boat legal, insured and seaworthy is handled by us under one annual management fee — berthing, insurance, crew, cleaning, routine maintenance, and the [monsoon layup and recommissioning](/blog/monsoon-season-yachting-india) that every boat on this coast needs whether it sails or not. You turn up, the boat is fuelled, crewed and ready, and you settle only the fuel and catering for that trip.",
        ],
        bullets: [
          "Berthing, insurance and mooring included in the annual fee",
          "Crew, cleaning and routine maintenance handled by us",
          "Guaranteed peak-season allocation, rotated year to year",
          "Monsoon layup and recommissioning managed for you",
          "Exit route at the end of term through resale of your share",
        ],
        image: {
          src: "https://images.unsplash.com/photo-1574850802664-10ad30c3ed80?auto=format&fit=crop&w=1600&q=80",
          alt: "Boats moored along a marina pontoon",
          caption: "The share buys you a fixed slot in the calendar, not a specific weekend — the rotation is what keeps it fair.",
        },
      },
      {
        heading: "Timeshare or fractional ownership — they are not the same thing",
        body: [
          "The two words get used interchangeably and that causes real confusion when people compare offers. In a pure timeshare or club-membership model, you buy a right to use a boat for a set number of weeks — no title, no equity, and usually no stake in what the vessel is worth when the programme ends. It is the cheaper way in, and it suits someone who wants guaranteed access without ever thinking about the asset again.",
          "Fractional ownership is a different instrument: you hold actual legal title to a percentage of the vessel, alongside the same guaranteed usage rights. When the boat is eventually sold — typically at the end of a five-to-seven-year term — you recover your share of the proceeds rather than simply walking away. It costs more upfront for exactly that reason.",
          "We structure Saildeck arrangements as fractional ownership by default, because an Indian-registered vessel with clear title among co-owners avoids the ambiguity that a pure usage-rights contract can create if a dispute ever reaches a court here. A club-membership structure is available on request for anyone who genuinely just wants the days and none of the asset.",
        ],
      },
      {
        heading: "How the numbers actually compare",
        body: [
          "A full 45–65ft motor yacht bought outright in India commonly costs its owner somewhere around ten percent of the vessel's value every year in berthing, insurance, crew and upkeep — the full breakdown is in [our guide to the real cost of owning a yacht in India](/blog/true-cost-of-owning-a-yacht-in-india) — and that bill arrives whether the boat leaves the dock twice or fifty times. A 1/8th share on the same class of boat puts a fraction of that capital down and divides the running cost eight ways, for a guaranteed allocation that, at two to three outings a month, comfortably covers how most owners actually use a boat.",
          "Chartering sits at the other end: no capital at all, and [what a straight hourly or per-slot charter costs](/blog/what-it-costs-to-rent-a-yacht-in-mumbai) works out cheaper than any ownership structure below roughly ten to fifteen days a year. Past that usage, a share starts winning on cost per day, and it also buys you something chartering cannot — the same boat, held for you, rather than whatever is available on the fleet that weekend.",
        ],
      },
      {
        heading: "Share sizes and what each one buys",
        body: "Shares run from 1/16th up to 1/4 of a vessel, with a hard cap on the number of co-owners on any one boat so the calendar never gets too crowded to actually deliver guaranteed days.",
        bullets: [
          "1/16th share — around 12 guaranteed days a year, boat capped at 16 owners",
          "1/8th share — around 25 guaranteed days a year, the most common allocation",
          "1/4 share — up to 90 days a year, typically held by two to four owners",
          "Multiple shares can be combined on one vessel for a larger allocation",
          "Unused weeks can be released into the calendar for other owners to book",
        ],
      },
      {
        heading: "Choosing a boat for shared ownership",
        body: [
          "The boat matters more in a shared structure than in solo ownership, because it has to satisfy several owners' idea of a good weekend rather than just one. Whether that means [a motor yacht or a sailing catamaran](/blog/motor-yacht-or-sailing-yacht) usually comes down to how the group plans to use it — motor yachts suit short high-guest-count outings, catamarans suit longer trips and owners who want to helm the boat themselves between charters.",
          "Every vessel we bring into a fractional structure goes through [an independent marine survey](/blog/yacht-survey-guide) before the syndicate is formed, and we walk buyers through [new against a used boat](/blog/new-vs-used-yacht-india) on cost, depreciation and how long the programme is likely to run. If the vessel is a new import rather than an existing Indian-flagged boat, [import duty and GST](/blog/yacht-import-duty-taxes-india) get added to the entry price before shares are priced — we do that arithmetic up front so nobody discovers it after signing.",
        ],
      },
      {
        heading: "What is included in the annual fee, and what is not",
        body: "One fixed management fee, agreed before you buy in, covers everything that keeps the boat legal and ready. It does not cover what you personally consume on board.",
        bullets: [
          "Included — berthing, insurance, licensed crew, routine servicing",
          "Included — a season-by-season maintenance schedule, handled for you",
          "Included — monsoon haul-out, storage and recommissioning",
          "Not included — fuel, priced on actual use per trip",
          "Not included — catering, drinks and any add-on decoration",
        ],
      },
      {
        heading: "Who it suits",
        body: "People who want a specific boat available on their own dates without the cost and administration of sole ownership — and who use a boat perhaps two or three times a month in season. Below that, [chartering by the day or the hour](/blog/how-to-rent-a-yacht-in-india) is honestly cheaper and involves zero admin. Above it, buying outright starts to make more sense than sharing.",
      },
      {
        heading: "What you actually pay",
        body: "A capital amount for the share, then a fixed annual operating contribution covering berth, insurance, crew and scheduled maintenance. Fuel is billed on use. There are no surprise assessments — unplanned repairs come out of a reserve fund we build into the annual figure from day one, so a gearbox failure in year three is not a bill that lands on whoever happens to be using the boat that week.",
      },
      {
        heading: "Exit and resale",
        body: "A share is an asset, not a subscription you simply let lapse. When you are ready to leave the syndicate — at the end of the agreed term, or earlier if your circumstances change — your share is sold the same way we handle [any yacht sale](/blog/how-to-sell-a-yacht-in-india): valued against current market comparables, marketed to our buyer network, with the remaining owners given first right of refusal before it goes outside the group.",
        image: {
          src: "https://images.unsplash.com/photo-1638262052640-82e94d64664a?auto=format&fit=crop&w=1600&q=80",
          alt: "Two people shaking hands over a table, closing a deal",
          caption: "Shares are transferable at any point — most owners exit through a sale to an incoming buyer, not by waiting out the full term.",
        },
      },
    ],
    faqs: [
      {
        q: "Is yacht timeshare the same as fractional ownership?",
        a: "No, though the terms are often used loosely. Timeshare buys you the right to use a boat for a set number of weeks with no ownership stake. Fractional ownership buys you actual legal title to a share of the vessel alongside the same usage rights, so you also share in the resale value at the end of the term. We default new clients into fractional ownership for exactly that reason, but a pure timeshare structure is available on request.",
      },
      {
        q: "What if two owners want the same weekend?",
        a: "The booking calendar rotates priority. Peak dates like New Year and long weekends are allocated in a fixed rotation agreed at the start, so nobody gets the same holiday twice in a row while another owner never gets it.",
      },
      {
        q: "How many other owners will I be sharing the boat with?",
        a: "Between four and sixteen, depending on the share size you buy. A 1/4 share typically sits alongside two to three other owners; a 1/16th share sits in a syndicate of up to sixteen. We cap the owner count on every vessel so the guaranteed-days promise is always deliverable.",
      },
      {
        q: "Can I charter out my unused days?",
        a: "Yes, and many owners do. We will place your unused allocation into the charter fleet and pass through the revenue less operating costs and commission.",
      },
      {
        q: "Who actually operates the boat — do I need a licence?",
        a: "Every Saildeck fractional vessel comes with a licensed captain and crew as standard, so no owner needs a licence to use their allocation. Owners who hold the relevant certification can request bareboat access on specific vessels, agreed separately at the time shares are issued.",
      },
      {
        q: "What happens if the boat needs a major repair?",
        a: "Scheduled maintenance and routine wear are already priced into your annual fee. Larger unplanned repairs draw from the reserve fund every syndicate carries from the outset, topped up through the annual fee rather than billed as a surprise one-off assessment.",
      },
      {
        q: "Can I buy more than one share on the same boat?",
        a: "Yes, subject to the vessel's owner cap. Combining shares is the usual route to a larger allocation without moving to full outright ownership.",
      },
      {
        q: "How do I exit?",
        a: "Shares are transferable, subject to the other owners' first right of refusal. We will market your share as part of our brokerage at the standard commission.",
      },
    ],
  },
  {
    slug: "yacht-management",
    href: "/management/yacht-management",
    eyebrow: "Management",
    title: "Yacht",
    accent: "management",
    seoTitle: "Yacht Management Company in Mumbai & Goa — Crew, Technical, Safety, Accounting & Insurance",
    seoDescription:
      "Saildeck is a full-service yacht management company in India covering marine operations, technical management, accounting, safety & security, crew management, crew recruitment, procurement and insurance — Mumbai, Navi Mumbai and Goa.",
    intro:
      "Yacht ownership should be an unqualified pleasure. In India it rarely is, because a vessel here needs someone watching eight things at once — the crew's payroll, the engine's service interval, the Coast Guard's paperwork, the insurer's renewal date — every single week of the year. Saildeck's owner-services team is that someone. We run the full operational, technical, financial and compliance load of owning a yacht out of Mumbai, Navi Mumbai and Goa, so the only decision left to you is when you want to go sailing.",
    image: "https://images.unsplash.com/photo-1562281302-809108fd533c?auto=format&fit=crop&w=1800&q=80",
    imageAlt: "A private motor yacht berthed at a marina",
    facts: [
      { label: "Disciplines", value: "8, under one team" },
      { label: "Cover", value: "365 days a year" },
      { label: "Reporting", value: "Monthly statement" },
      { label: "Ports", value: "Mumbai, Goa, Navi Mumbai" },
    ],
    hideEnquireForm: true,
    placardsIntro: {
      eyebrow: "What's covered",
      title: "Eight disciplines,",
      accent: "one accountable team",
      sub: "Most owners start with one or two of these and end up handing over all eight within a year, once they see what a week of self-managing a boat actually costs in time. Each is scoped and priced separately — take only what you need. Tap 'Know more' on any tile to jump straight to the detail.",
    },
    placards: [
      {
        id: "marine-operations",
        title: "Marine Operations",
        image: "https://images.unsplash.com/photo-1495657809423-db624a2298dc?auto=format&fit=crop&w=1400&q=80",
        imageAlt: "Aerial view of a marina and harbour with boats berthed",
        description: "A single point of contact for your captain — berthing, provisioning, fuel, charts and communications sorted before the boat ever needs them.",
      },
      {
        id: "technical-management",
        title: "Technical Management",
        image: "https://images.unsplash.com/photo-1788108761794-bb16df229bf1?auto=format&fit=crop&w=1400&q=80",
        imageAlt: "A marine engineer working on a boat engine on the dock",
        description: "Planned maintenance, class and survey compliance, and a technical team on call for the day something needs an engineer rather than a guess.",
      },
      {
        id: "accounting",
        title: "Accounting",
        image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1400&q=80",
        imageAlt: "Financial performance graphs displayed on a laptop screen",
        description: "A monthly statement you can actually read — real running costs, budget against actual, GST-compliant invoicing, nothing buried in a line item.",
      },
      {
        id: "safety-and-security",
        title: "Safety & Security",
        image: "https://images.unsplash.com/photo-1632148731474-14aa7fb7a8ad?auto=format&fit=crop&w=1400&q=80",
        imageAlt: "A life preserver mounted on a vessel with a large ship behind",
        description: "Safety management, coastal security registration and statutory compliance held to the same standard whether you sail six days a year or sixty.",
      },
      {
        id: "crew-management",
        title: "Crew Management",
        image: "https://images.unsplash.com/photo-1753526372680-7d368f2f068e?auto=format&fit=crop&w=1400&q=80",
        imageAlt: "Crew members working together on the deck of a boat",
        description: "Payroll, statutory compliance and welfare for your crew handled under one roof, so the liability of being their employer never lands on you.",
      },
      {
        id: "crew-recruitment",
        title: "Crew Recruitment",
        image: "https://images.unsplash.com/photo-1521791136064-7986c2920216?auto=format&fit=crop&w=1400&q=80",
        imageAlt: "Two people shaking hands after an interview",
        description: "Captains, engineers and deckhands sourced, certificate-checked and reference-checked from our own network before they ever meet your boat.",
      },
      {
        id: "procurement",
        title: "Procurement",
        image: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=1400&q=80",
        imageAlt: "Organised inventory boxes on warehouse shelving",
        description: "Spares, equipment and consumables sourced at the right price and landed on time — without you chasing three vendors for one gasket.",
      },
      {
        id: "insurance",
        title: "Insurance",
        image: "https://images.unsplash.com/photo-1562564055-71e051d33c19?auto=format&fit=crop&w=1400&q=80",
        imageAlt: "A hand signing an insurance document",
        description: "Hull, machinery and liability cover placed with insurers who understand Indian coastal risk, with claims handled on your behalf.",
      },
    ],
    sections: [
      {
        id: "marine-operations",
        heading: "Marine Operations",
        body: [
          "Your captain gets one number to call, not a rolodex. We coordinate everything that has to happen on shore before and after every trip — berthing and mooring across our home ports, provisioning runs, fuel supply, chart and navigation-equipment updates, and the running inventory of everything that should be on board and isn't.",
          "We also carry the relationship with the harbour authorities so your captain doesn't have to rebuild it every season — Mumbai Port Trust and equivalent Navi Mumbai and Goa authorities, Coast Guard notices, customs for a vessel moving between states or returning from abroad.",
        ],
        bullets: [
          "Berthing and mooring coordination across Mumbai, Navi Mumbai and Goa",
          "Provisioning and fuel supply arranged ahead of every departure",
          "Liaison with port authorities, Coast Guard and customs",
          "Chart, navigation-equipment and communications updates",
          "Full onboard inventory tracked and replenished",
          "One point of contact for your captain, day or night",
        ],
      },
      {
        id: "technical-management",
        heading: "Technical Management",
        body: [
          "A planned maintenance system tracked against manufacturer intervals rather than memory — so a service interval never gets discovered by something failing at sea. We schedule and attend annual and special surveys with the Indian Register of Shipping and Mercantile Marine Department, manage haul-out and antifouling at your home port or a yard we trust, and vet every contractor before they touch your boat.",
          "A technical issue at anchor off Alibaug at 6pm on a Saturday is a different problem from the same issue in a workshop on Monday morning. Our technical desk is reachable outside office hours for exactly that reason, and every job — routine or urgent — goes into the same maintenance record so the boat's history is never scattered across three people's memories.",
        ],
        bullets: [
          "Planned maintenance system tracked against manufacturer intervals",
          "Annual and special survey scheduling with IRS / MMD",
          "Haul-out, antifouling and dry-dock project management",
          "Round-the-clock technical support for issues at sea",
          "Vendor and contractor vetting and on-site oversight",
          "Complete, auditable maintenance and service history",
        ],
      },
      {
        id: "accounting",
        heading: "Accounting",
        body: "We run a dedicated account for every vessel we manage, with a monthly statement showing hours run, work carried out and spend against an agreed budget — the same statement, every month, so you can compare year on year rather than decode a fresh format each time. GST-compliant invoicing is standard, and nothing above your agreed threshold is spent without your sign-off first.",
        bullets: [
          "Monthly statement of hours run, work done and spend against budget",
          "GST-compliant invoicing and documentation",
          "Owner sign-off required above an agreed spending threshold",
          "Annual budget built from real running-cost history, not estimates",
          "Transparent charter-revenue accounting if the boat is chartered",
          "Records available on request, not only at year end",
        ],
      },
      {
        id: "safety-and-security",
        heading: "Safety & Security",
        body: [
          "A safety management system covering scheduled drills, pre-departure checklists and life-saving equipment audits, run to the same discipline commercial operators use even though most of the boats we manage are privately registered. Life jackets, life rafts and firefighting equipment are serviced on a tracked schedule, not when someone remembers.",
          "Mumbai's coastal waters carry security protocols most owners never learn about until they're mid-application — Coast Guard and marine police registration, biometric identity cards for crew, and reporting requirements that apply whether the boat leaves the marina once a year or every weekend. We hold this paperwork current so a security check never becomes the reason a trip gets cancelled.",
        ],
        bullets: [
          "Safety management system covering drills, checklists and equipment audits",
          "Coastal security registration with Coast Guard and marine police",
          "Life jackets, life rafts and firefighting gear serviced on schedule",
          "Emergency response and evacuation planning for every vessel",
          "Crew safety training and certification records kept current",
          "Incident reporting and documentation handled on your behalf",
        ],
      },
      {
        id: "crew-management",
        heading: "Crew Management",
        body: "Crew can be employed directly by you with us administering payroll and compliance, or engaged through Saildeck entirely — most owners with any charter use choose the second, because it removes the employer's liability from their own name. Either way, PF, ESI and labour-law compliance, leave and rotation, training records and welfare standards are all managed centrally, with one line to us for anything crew-related rather than three separate departments to chase.",
        bullets: [
          "Crew employed and payrolled through Saildeck, or administered on your behalf",
          "Statutory compliance — PF, ESI and applicable labour law",
          "Leave, rotation and training records maintained centrally",
          "Uniforms, welfare and onboard living standards set and checked",
          "Regular performance reviews",
          "One point of contact for any crew-related matter",
        ],
      },
      {
        id: "crew-recruitment",
        heading: "Crew Recruitment",
        body: "We source captains, engineers, deckhands and stewards from our own network across Mumbai and Goa rather than an open listing, and every candidate is certificate-checked, medically cleared and reference-checked before they're shortlisted to you. Skippers are matched to your specific vessel and how you actually use it — a family day-sailor and a charter-earning motor yacht want different temperaments at the helm — and we arrange a trial period before anything becomes permanent.",
        bullets: [
          "Candidates sourced from our own crew network, not a public listing",
          "Certification, medical fitness and references checked before shortlisting",
          "Skippers matched to your vessel and how you actually use it",
          "Trial periods arranged before any permanent placement",
          "Replacement crew sourced quickly if someone leaves",
          "Ongoing training recommended as a crew member's role develops",
        ],
      },
      {
        id: "procurement",
        heading: "Procurement",
        body: "Fleet-wide purchasing volume gets you better rates on spares and consumables than a single owner sourcing alone, and a dedicated procurement desk means the three-vendor chase for one gasket is our problem, not yours. Parts that aren't stocked in India are handled through import logistics we already run for the fleet, with a quality check on anything before it's fitted — and an emergency-sourcing route when the boat genuinely needs to sail tomorrow.",
        bullets: [
          "Spares and consumables sourced from vetted local and international vendors",
          "Import logistics handled for parts not available in India",
          "Negotiated rates through fleet-wide purchasing volume",
          "Quality checked before anything is fitted to your boat",
          "Emergency sourcing when a part is needed to sail on schedule",
          "Every purchase itemised on your monthly statement",
        ],
      },
      {
        id: "insurance",
        heading: "Insurance",
        body: "We place hull, machinery and liability cover with marine insurers who actually underwrite Indian coastal risk rather than treat it as an afterthought to a global policy, and add passenger liability where a vessel is registered for charter. Cover is reviewed annually as the boat's use or condition changes, renewals are tracked so nothing lapses unnoticed, and if you ever need to claim, we handle the negotiation rather than leaving you to do it alone at the worst possible moment.",
        bullets: [
          "Hull and machinery cover placed with insurers active in India",
          "Third-party and passenger liability cover for charter-registered vessels",
          "Annual risk review as the vessel's use or condition changes",
          "Claims handled and negotiated on your behalf",
          "Renewal tracking so cover never lapses unnoticed",
          "Documentation kept audit-ready for survey and registration",
        ],
      },
    ],
    faqs: [
      {
        q: "What does yacht management cost in India?",
        a: "Management fees are usually quoted as a monthly retainer scaled to vessel size, crew count and which of the eight disciplines you've asked us to run — separate from the actual running costs, which are billed at cost with full documentation. As a planning figure, total annual running costs on a private yacht tend to land near ten percent of the vessel's value; see our [guide to the real cost of owning a yacht in India](/blog/true-cost-of-owning-a-yacht-in-india) for the full breakdown.",
      },
      {
        q: "Do I have to take all eight services, or can I pick just a few?",
        a: "Pick what you need. Each discipline — marine operations, technical management, accounting, safety and security, crew management, crew recruitment, procurement and insurance — is scoped and priced on its own. Most owners start with technical management and crew, then add the rest once they see the time it saves.",
      },
      {
        q: "Do you manage boats you did not sell or build?",
        a: "Yes. Most vessels we manage were bought elsewhere. We start with a condition survey so both sides know exactly what's being taken on before anything is signed.",
      },
      {
        q: "Can you manage a yacht berthed outside Mumbai?",
        a: "We manage vessels in Mumbai, Navi Mumbai and Goa directly. Elsewhere on the Indian coast we work through vetted local partners with our own supervision, and we'll say so plainly rather than claim a presence we don't have.",
      },
      {
        q: "Who employs the crew — me or Saildeck?",
        a: "Either. Crew can be employed by you with us administering payroll and statutory compliance, or engaged through us entirely. Owners with any charter use usually prefer the second option, because it simplifies employer liability.",
      },
      {
        q: "Can the boat earn money while I'm not using it?",
        a: "If you want that, we place the vessel in the Saildeck charter fleet, handle bookings and crew, and account for revenue transparently on your monthly statement. Commercial registration and insurance need to be right first — we'll tell you honestly whether your vessel currently qualifies.",
      },
      {
        q: "What happens during the monsoon?",
        a: "Monsoon layup, antifouling and recommissioning fall under technical management — every vessel we manage gets a haul-out and service plan for the closed season, so the boat is ready on day one of the next one rather than needing a scramble in October. See our [guide to monsoon season and yachting in India](/blog/monsoon-season-yachting-india) for what that involves.",
      },
      {
        q: "How is my money and paperwork kept separate from other owners'?",
        a: "Every vessel has its own account, its own monthly statement and its own document file — nothing is pooled across owners. You can ask to see the underlying invoices behind any line item at any time.",
      },
    ],
  },
  {
    slug: "yacht-refit-and-repair",
    href: "/management/yacht-refit-and-repair",
    eyebrow: "Management",
    title: "Yacht refit",
    accent: "& repair",
    seoTitle: "Yacht Refit & Repair in India — GRP, Paint, Engines, Interiors",
    seoDescription:
      "Yacht refit and repair services in India. Hull and GRP work, awlgrip painting, antifouling, engine overhaul, electrical rewiring, upholstery and full interior refits.",
    intro:
      "Refit work is where a boat is either brought properly back to life or quietly ruined. We do it in stages you can see, with a written scope and a photographic record of everything that happened behind a panel before it went back on.",
    image: "https://images.unsplash.com/photo-1574850802664-10ad30c3ed80?auto=format&fit=crop&w=1800&q=80",
    imageAlt: "Boat hauled out on the hardstand for refit work",
    facts: [
      { label: "Haul-out", value: "Up to 60 ft" },
      { label: "Typical refit", value: "3–14 weeks" },
      { label: "Warranty", value: "On workmanship" },
      { label: "Record", value: "Photographic" },
    ],
    sections: [
      {
        heading: "Structural and hull",
        body: "GRP repair, osmosis treatment, keel and rudder work, stringer and bulkhead repair, and gelcoat restoration. Where a repair is structural we will tell you what it needs rather than what is cheapest to quote.",
        bullets: [
          "GRP and composite repair, laminate rebuild",
          "Osmosis diagnosis, peel and re-laminate",
          "Keel, rudder, shaft and skeg work",
          "Gelcoat restoration and compounding",
          "Two-pack topside and superstructure painting",
          "Antifouling, anode renewal and propeller service",
        ],
      },
      {
        heading: "Systems and propulsion",
        body: "Engine overhaul and repower, generator service, shaft alignment, sterndrive rebuild, fuel and cooling system work, complete electrical rewiring, navigation and entertainment electronics.",
      },
      {
        heading: "Interiors",
        body: "Joinery, headlining, flooring, upholstery and canvas. We work with the same trades every time, which is why the finish is consistent — this is the part of a refit most often subcontracted to whoever is free.",
      },
      {
        heading: "How we quote",
        body: "A survey first, then a written scope with line-item pricing. Anything discovered once panels are off is quoted as a variation and approved by you before work continues. You will not receive an invoice containing work you did not agree to.",
      },
    ],
    faqs: [
      {
        q: "How much does a yacht refit cost?",
        a: "It ranges from a few lakh for cosmetic work and antifouling to a substantial fraction of the vessel's value for a full structural and systems refit. We survey first and quote against a written scope, because refit estimates given over the phone are almost always wrong.",
      },
      {
        q: "How long will my boat be out of the water?",
        a: "Antifouling and routine service is a week to ten days. Paint work needs three to five weeks including cure time. A full refit with interior and systems runs three months or more. Monsoon is the sensible window for anything major.",
      },
      {
        q: "Do you offer a warranty on repair work?",
        a: "Yes, on our workmanship. Parts and equipment carry their manufacturer's warranty, which we register in your name.",
      },
      {
        q: "Can I visit while the work is happening?",
        a: "Please do. We would rather you saw the boat opened up than took our word for it, and we send progress photographs weekly to owners who cannot get to the yard.",
      },
    ],
  },
  {
    slug: "monsoon-storage",
    href: "/management/monsoon-storage",
    eyebrow: "Management",
    title: "Monsoon",
    accent: "storage",
    seoTitle: "Monsoon Boat Storage in Mumbai & Goa — Haul-Out & Layup",
    seoDescription:
      "Secure monsoon boat storage in India. Haul-out, pressure wash, engine pickling, covered and open hardstand, monthly checks and full recommissioning before the season.",
    intro:
      "From June to September the west coast shuts down for boats, and how a vessel is laid up decides what condition it is in come October. A badly stored boat loses more value in one monsoon than in three seasons of use.",
    image: "https://images.unsplash.com/photo-1516132006923-6cf348e5dee2?auto=format&fit=crop&w=1800&q=80",
    imageAlt: "Boats stored ashore on cradles for the off-season",
    facts: [
      { label: "Season", value: "June–September" },
      { label: "Storage", value: "Covered & open" },
      { label: "Checks", value: "Monthly, logged" },
      { label: "Return", value: "Sea-ready" },
    ],
    sections: [
      {
        heading: "Laying up properly",
        body: "Layup is a procedure, not a parking space. Everything below gets done before the boat goes on its cradle.",
        bullets: [
          "Haul-out, pressure wash and hull inspection with photographs",
          "Engine and generator pickling, fuel treatment and stabilisation",
          "Battery removal, conditioning and off-season charging",
          "Freshwater system drain, seacock service and dehumidification",
          "Canvas, upholstery and electronics removed to dry storage",
          "Cradle or trailer support correctly placed for the hull's structure",
        ],
      },
      {
        heading: "While it is ashore",
        body: "Monthly inspection with a written log — cover integrity, moisture, pest activity, battery state. You get the log. Yards that store boats and never look at them are how owners discover mould in October.",
      },
      {
        heading: "Recommissioning",
        body: "Antifouling, anode renewal, engine service, systems recommissioning and a sea trial before handover, so the first day of the season is spent sailing rather than troubleshooting.",
      },
    ],
    faqs: [
      {
        q: "When should I book monsoon storage?",
        a: "Book by April. Hardstand space in Mumbai and Goa is genuinely limited and it is fully allocated by late May most years.",
      },
      {
        q: "Is covered storage worth the difference?",
        a: "For a boat with significant brightwork, soft furnishings or a painted topside, yes. For a hard-wearing GRP boat with a good cover, open hardstand with proper layup is usually fine.",
      },
      {
        q: "Can I keep the boat in the water through the monsoon?",
        a: "We do not recommend it on the west coast, and in many locations the harbour authority restricts it. If it is unavoidable we will set up storm moorings and a monitoring routine, but hauling out is safer and usually cheaper than the risk.",
      },
      {
        q: "Does storage include insurance?",
        a: "Our yard carries liability cover, but your hull insurance should remain in force through layup. Tell your insurer the vessel is ashore — the premium usually drops.",
      },
    ],
  },
  {
    slug: "visiting-yacht-support",
    href: "/management/visiting-yacht-support",
    eyebrow: "Management",
    title: "Visiting yacht",
    accent: "support",
    seoTitle: "Yacht Agency & Visiting Yacht Support in India — Clearance & Berthing",
    seoDescription:
      "Yacht agency services for vessels visiting India. Customs and immigration clearance, cruising permits, berthing, bunkering, provisioning, crew changes and technical support.",
    intro:
      "India is a rewarding cruising ground with a demanding paperwork regime. We act as agent for visiting yachts — handling clearance, permits and logistics so a crew arriving after a long passage deals with one contact instead of six departments.",
    image: "https://images.unsplash.com/photo-1727174674169-c2f484052437?auto=format&fit=crop&w=1800&q=80",
    imageAlt: "Visiting yachts anchored off an Indian harbour",
    facts: [
      { label: "Ports", value: "Mumbai, Goa, Kochi" },
      { label: "Clearance", value: "In & out" },
      { label: "Support", value: "24/7 on arrival" },
      { label: "Crew", value: "Changes handled" },
    ],
    sections: [
      {
        heading: "Arrival and clearance",
        body: "We file ahead of your ETA and meet you on arrival. Customs, immigration, port health and harbour authority formalities are handled as one process rather than as separate visits.",
        bullets: [
          "Pre-arrival notification and documentation filing",
          "Customs, immigration and port health clearance",
          "Cruising permit applications and extensions",
          "Berth or mooring arrangement and shore access",
          "Departure clearance and onward port notification",
        ],
      },
      {
        heading: "While you are here",
        body: "Bunkering, water, provisioning, laundry, waste and pump-out, crew transfers, visa support, spares import and clearance, and technical assistance from our own yard if something has broken on passage.",
      },
      {
        heading: "Local knowledge",
        body: "Anchorages, tide and current advice, monsoon timing, and a frank view on which stretches of coast are worth the detour. We would rather you left with a good impression of cruising India than a good invoice from us.",
      },
    ],
    faqs: [
      {
        q: "Do I need an agent to bring a yacht into India?",
        a: "Not legally in every port, but practically it saves days. Clearance involves several departments with limited hours, and a local agent who files in advance turns a multi-day process into a single morning.",
      },
      {
        q: "How long can a foreign yacht stay in India?",
        a: "Stays are governed by the cruising permit and the crew's visas, which are issued separately and for different durations. We track both and start extension paperwork before either expires.",
      },
      {
        q: "Can you receive spares shipped to India for my yacht?",
        a: "Yes. Parts consigned to a yacht in transit can usually be cleared under concessional terms. Send us the shipping documents before dispatch — retrospective clearance is significantly harder.",
      },
    ],
  },
];

/* ========================================================================
   Sailing school
   ======================================================================== */

export const sailingSchoolPages: ContentPage[] = [
  {
    slug: "learn-to-sail",
    href: "/about/sailing-school/learn-to-sail",
    eyebrow: "Sailing school",
    title: "Learn to",
    accent: "sail",
    seoTitle: "Learn to Sail in Mumbai & Goa — Beginner Sailing Courses",
    seoDescription:
      "Learn to sail in Mumbai and Goa with certified instructors. Beginner dinghy and keelboat courses for adults and children, no experience or swimming ability required to start.",
    intro:
      "Sailing is far easier to start than it looks and far harder to master than it looks, which is why it holds people for a lifetime. Our beginner courses put you on the helm on day one, in small groups, with an instructor in the boat.",
    image: "https://images.unsplash.com/photo-1414437384035-787b9df782d7?auto=format&fit=crop&w=1800&q=80",
    imageAlt: "Small sailing boats out on the water during a lesson",
    facts: [
      { label: "Start age", value: "8 years+" },
      { label: "Group size", value: "Max 4 per boat" },
      { label: "Course", value: "2–5 days" },
      { label: "Season", value: "Oct–May" },
    ],
    sections: [
      {
        heading: "Courses we run",
        body: "Every course is practical from the first session. Theory is taught on the water, where it makes sense, rather than in a classroom beforehand.",
        bullets: [
          "Discover Sailing — a half-day taster, no commitment",
          "Beginner dinghy course — two days, rigging to independent sailing",
          "Keelboat introduction — three days on a larger cruising boat",
          "Junior sailing — structured programme for 8 to 16 year olds",
          "Corporate sailing days — team programmes on multiple boats",
        ],
      },
      {
        heading: "What you need",
        body: "Nothing but clothes that can get wet and shoes with a grip. Buoyancy aids, boats and gear are provided. You do not need to be a strong swimmer — every student wears a buoyancy aid and a safety boat is on the water throughout.",
      },
      {
        heading: "After the beginner course",
        body: "Most students carry on into RYA-certified qualifications or join club sailing to build hours. We will tell you honestly which route suits how much time you actually have.",
      },
    ],
    faqs: [
      {
        q: "Do I need to know how to swim to learn sailing?",
        a: "No. Every student wears a buoyancy aid at all times and a safety boat is on the water for the whole session. Being comfortable in water helps your confidence, but it is not a requirement to start.",
      },
      {
        q: "What is the best age to start sailing?",
        a: "Children can start structured junior sailing from around eight, when they are big enough to handle a small dinghy. There is no upper limit — a meaningful share of our beginners are over fifty.",
      },
      {
        q: "When is the sailing season in Mumbai and Goa?",
        a: "October to May. Sailing pauses during the southwest monsoon from June to September when conditions are unsafe and most clubs lay up.",
      },
      {
        q: "Will I be able to sail on my own after a beginner course?",
        a: "After a two-day course most people can rig, launch, sail a course and return safely in light conditions with supervision nearby. Independent sailing in stronger wind takes more hours on the water, which is what the follow-on courses are for.",
      },
    ],
  },
  {
    slug: "rya-courses",
    href: "/about/sailing-school/rya-courses",
    eyebrow: "Sailing school",
    title: "RYA",
    accent: "courses",
    seoTitle: "RYA Sailing Courses in India — Competent Crew to Day Skipper",
    seoDescription:
      "Internationally recognised RYA sailing courses in India. Competent Crew, Day Skipper, Powerboat Level 2 and shorebased theory, taught by certified instructors in Mumbai and Goa.",
    intro:
      "RYA certification is the qualification the rest of the world recognises. If you intend to charter a yacht abroad, skipper your own boat, or work on the water professionally, this is the ladder worth climbing.",
    image: "https://images.unsplash.com/photo-1526761122248-c31c93f8b2b9?auto=format&fit=crop&w=1800&q=80",
    imageAlt: "Sailing yacht heeling under full sail at sunset",
    facts: [
      { label: "Recognition", value: "International" },
      { label: "Entry level", value: "Competent Crew" },
      { label: "Duration", value: "2–5 days" },
      { label: "Ratio", value: "Small groups" },
    ],
    sections: [
      {
        heading: "The course ladder",
        body: "Each certificate builds on the one before. You do not need previous experience to start at the bottom of it.",
        bullets: [
          "Start Yachting — a two-day introduction for complete beginners",
          "Competent Crew — become a genuinely useful member of a crew",
          "Day Skipper (Practical) — skipper a small yacht in familiar waters by day",
          "Day Skipper (Shorebased) — navigation, tides, collision regulations, weather",
          "Powerboat Level 2 — the standard qualification for handling a powered boat",
          "VHF Short Range Certificate — legally required to operate a marine radio",
        ],
      },
      {
        heading: "How courses run",
        body: "Practical courses are taught aboard, living and sailing as a crew. Shorebased theory can be taken in the evenings or over consecutive days. Small groups — you get real time on the helm rather than a turn every second hour.",
      },
      {
        heading: "Where it leads",
        body: "Day Skipper is the qualification most international charter companies want to see before handing over a yacht. Beyond it lie Coastal Skipper and Yachtmaster, which we can plan a route towards including the sea miles you will need to log.",
      },
    ],
    faqs: [
      {
        q: "Is an RYA certificate valid internationally?",
        a: "Yes. RYA qualifications are the most widely recognised recreational sailing certificates in the world, and Day Skipper or above is what most overseas charter operators ask for before bareboat hire.",
      },
      {
        q: "Which RYA course should I start with?",
        a: "With no experience, Start Yachting or Competent Crew. If you have already sailed a fair amount and want to skipper, go to Day Skipper — but do the shorebased theory first, because the practical assumes it.",
      },
      {
        q: "Do I need the shorebased theory before the practical Day Skipper?",
        a: "It is strongly recommended and most students find the practical course very hard going without it. Navigation, tidal calculation and collision regulations are examined material that cannot be absorbed in a week on the water.",
      },
      {
        q: "How many sea miles do I need for Yachtmaster?",
        a: "The mileage, night hours and passage requirements are set by the RYA and are substantial. We will plan a realistic route to build them, including qualifying passages, rather than pretend it is a short course.",
      },
    ],
  },
  {
    slug: "buy-sailing-gear",
    href: "/about/sailing-school/buy-sailing-gear",
    eyebrow: "Sailing school",
    title: "Buy sailing",
    accent: "gear",
    seoTitle: "Buy Sailing Gear in India — Chandlery, Foulies, Buoyancy Aids",
    seoDescription:
      "Sailing gear and marine chandlery in India. Buoyancy aids, lifejackets, foul weather gear, deck shoes, gloves, hardware, ropes, paints and electronics from global brands.",
    intro:
      "Good gear is the difference between enjoying a windy day and enduring it. We stock what actually works in Indian conditions — light, quick-drying, sun-resistant — rather than kit designed for the North Sea.",
    image: "https://images.unsplash.com/photo-1598448056086-307e98ef5c4a?auto=format&fit=crop&w=1800&q=80",
    imageAlt: "Sailing equipment and hardware laid out on a table",
    facts: [
      { label: "Personal kit", value: "In stock" },
      { label: "Hardware", value: "Indent & stock" },
      { label: "Students", value: "Discounted" },
      { label: "Delivery", value: "Pan-India" },
    ],
    sections: [
      {
        heading: "Personal equipment",
        body: "Everything you wear or carry aboard.",
        bullets: [
          "Buoyancy aids and self-inflating lifejackets with servicing",
          "Foul weather jackets, salopettes and spray tops",
          "Rash guards, sailing shorts, gloves and deck shoes",
          "Polarised sunglasses with retainers, and sun protection",
          "Dry bags, knives, whistles and personal safety kit",
        ],
      },
      {
        heading: "Boat hardware and chandlery",
        body: "Ropes and running rigging cut to length, blocks, cleats and deck hardware, shackles and anchoring gear, fenders and mooring lines, antifouling paints and lubricants, and marine electronics. Items we do not stock we indent, with an honest lead time rather than an optimistic one.",
      },
      {
        heading: "Advice included",
        body: "Buoyancy aid fit and lifejacket servicing matter more than brand. Bring the person the gear is for. We would rather sell you the right size once than the wrong one twice.",
      },
    ],
    faqs: [
      {
        q: "What sailing gear does a beginner actually need?",
        a: "For a beginner course, nothing — buoyancy aids and boats are provided. Once you are sailing regularly, buy in this order: your own buoyancy aid, sailing gloves, proper footwear, then a spray top. Foul weather gear can wait until you know what conditions you sail in.",
      },
      {
        q: "Do lifejackets need servicing?",
        a: "Self-inflating lifejackets do, annually — the cylinder, the firing head and the bladder all need checking. A lifejacket that has never been serviced should be treated as decoration, not safety equipment.",
      },
      {
        q: "Do you ship across India?",
        a: "Yes, we ship nationwide. Items requiring fit, particularly buoyancy aids for children, are better bought in person or with a size guide we will walk you through.",
      },
    ],
  },
  {
    slug: "buy-a-sailing-boat",
    href: "/about/sailing-school/buy-a-sailing-boat",
    eyebrow: "Sailing school",
    title: "Buy a sailing",
    accent: "boat",
    seoTitle: "Buy a Sailing Boat in India — Dinghies, Keelboats & Small Cruisers",
    seoDescription:
      "Buy a sailing dinghy or small keelboat in India. Optimist, Laser, 420 and club trainers, plus cruising keelboats. Advice on class choice, club berthing and running costs.",
    intro:
      "The first boat most people should buy is smaller than the one they want. A dinghy you sail every weekend teaches more, costs less and is sold more easily than a cruiser that sits on a mooring waiting for a free Saturday.",
    image: "https://images.unsplash.com/photo-1414437384035-787b9df782d7?auto=format&fit=crop&w=1800&q=80",
    imageAlt: "Sailing dinghies rigged and ready on the shore",
    facts: [
      { label: "Dinghies", value: "New & used" },
      { label: "Keelboats", value: "Brokerage" },
      { label: "Classes", value: "Optimist to J/24" },
      { label: "Support", value: "Berth & training" },
    ],
    sections: [
      {
        heading: "Dinghies and trainers",
        body: "Sensible first boats, in classes that have an active fleet in India — which matters, because a class nobody else sails is a boat you cannot race and cannot resell.",
        bullets: [
          "Optimist — the standard junior trainer, huge second-hand market",
          "Laser / ILCA — single-hander, the most widely sailed adult class",
          "420 and 470 — two-person performance dinghies for club racing",
          "Club trainers and stable double-handers for family sailing",
          "Beach catamarans for speed in open water",
        ],
      },
      {
        heading: "Keelboats and small cruisers",
        body: "If you want to stay out overnight or carry more people, a small keelboat is the step up. We broker used boats and advise on new imports, including the duty and registration picture, which is a substantial part of the real cost.",
      },
      {
        heading: "Before you buy",
        body: "Three questions decide the boat: where will it live, who sails it with you, and how many weekends a year will you honestly use it. Answer those and the choice usually makes itself. We will also arrange berthing and follow-on coaching so the boat actually gets used.",
      },
    ],
    faqs: [
      {
        q: "What is a good first sailing boat to buy in India?",
        a: "For an adult, a Laser/ILCA or a stable two-person dinghy. For a child, an Optimist. Both have active fleets and hold their value because there is always another family looking for one.",
      },
      {
        q: "How much does a sailing dinghy cost in India?",
        a: "A used club Optimist is the cheapest way in; a new imported one-design costs several times that once duty and freight are counted. We will lay out both options with the landed cost rather than the sticker price.",
      },
      {
        q: "Where can I keep a sailing dinghy?",
        a: "Most dinghies live at a club on a dinghy park, which is far cheaper than a marina berth. We can help arrange club membership and storage as part of the purchase.",
      },
      {
        q: "Should I buy new or used?",
        a: "Used, almost always, for a first boat. Sailing dinghies are simple and durable, the second-hand market is active, and you will learn what you actually want from the first year of sailing.",
      },
    ],
  },
];

/* ========================================================================
   Buy & sell yachts
   ======================================================================== */

export const yachtSalesPages: ContentPage[] = [
  {
    slug: "sell-your-yacht",
    href: "/yachts/sell-your-yacht",
    eyebrow: "Brokerage",
    title: "Sell your",
    accent: "yacht",
    seoTitle: "Sell Your Yacht in India — Brokerage, Valuation & Listing",
    seoDescription:
      "Sell your yacht or boat in India with Saildeck. Free valuation, professional photography, listing across marketplaces, buyer vetting, survey coordination and transfer paperwork.",
    intro:
      "Boats sell on presentation and paperwork, in that order. Most private sales in India stall because the photographs are poor and the documents are incomplete — both of which are fixable before the boat goes on the market.",
    image: "https://images.unsplash.com/photo-1570422774250-c951ec3ef74c?auto=format&fit=crop&w=1800&q=80",
    imageAlt: "Motor yacht presented alongside a marina berth",
    facts: [
      { label: "Valuation", value: "Free" },
      { label: "Photography", value: "Included" },
      { label: "Reach", value: "India & overseas" },
      { label: "Paperwork", value: "Handled" },
    ],
    sections: [
      {
        heading: "How we sell a boat",
        body: "A structured process, so a serious buyer never has to wait for information.",
        bullets: [
          "Realistic valuation against actual recent sales, not asking prices",
          "Pre-sale tidy, detail and any quick-win rectification worth doing",
          "Professional photography and video, on the water and ashore",
          "Full specification sheet with service history and document pack",
          "Listing across Indian and international brokerage channels",
          "Buyer qualification, viewings and sea trial coordination",
          "Survey management and negotiation of the survey list",
          "Transfer of registration, deletion and closing paperwork",
        ],
      },
      {
        heading: "Pricing it honestly",
        body: "We will tell you what your boat is worth, not what you hoped. An overpriced listing goes stale, and a stale listing sells for less than a correctly priced one would have. If the number is disappointing we will explain exactly which factors are driving it and which are worth fixing first.",
      },
      {
        heading: "What it costs you",
        body: "A commission on completion, agreed in writing up front. Photography and listing are included. There is no upfront fee and no charge if the boat does not sell.",
      },
    ],
    faqs: [
      {
        q: "How long does it take to sell a yacht in India?",
        a: "A correctly priced, well-presented boat in a popular size typically finds a buyer in three to six months. Large or unusual vessels take longer simply because the buyer pool is small.",
      },
      {
        q: "What paperwork do I need to sell my boat?",
        a: "Registration certificate, proof of ownership and purchase, insurance history, survey reports if any, service records, and customs documents for an imported vessel. Missing import papers are the single most common reason a sale collapses at the last stage.",
      },
      {
        q: "Should I repair the boat before selling?",
        a: "Cosmetic work and a proper detail almost always pay for themselves. Major structural or engine work usually does not — buyers discount it further than it costs you, so it is often better to price the boat honestly and disclose the issue.",
      },
      {
        q: "Do you charge if the boat does not sell?",
        a: "No. Our commission is payable on completion only.",
      },
    ],
  },
  {
    slug: "buy-a-motor-yacht",
    href: "/yachts/buy-a-motor-yacht",
    eyebrow: "Brokerage",
    title: "Buy a motor",
    accent: "yacht",
    seoTitle: "Buy a Motor Yacht in India — New & Pre-Owned Motor Yachts",
    seoDescription:
      "Buy a motor yacht in India. New and pre-owned motor yachts and flybridge cruisers, with independent survey, import and duty guidance, registration, berthing and crew support.",
    intro:
      "A motor yacht is the right choice for most Indian owners: short seasons, sheltered coastal water, and guests who want space and shade rather than a heel angle. The hard part is not choosing the boat — it is understanding what it will cost to run.",
    image: "https://images.unsplash.com/photo-1567899378494-47b22a2ae96a?auto=format&fit=crop&w=1800&q=80",
    imageAlt: "Flybridge motor yacht moored at a marina",
    facts: [
      { label: "Sizes", value: "30–100 ft" },
      { label: "Condition", value: "New & pre-owned" },
      { label: "Survey", value: "Independent" },
      { label: "After sale", value: "Managed" },
    ],
    sections: [
      {
        heading: "What to look at",
        body: "Size drives everything else — crew, berth, fuel and yard costs all scale with it. Most first-time owners are happier a size down from where they started looking.",
        bullets: [
          "Day boats and sports cruisers, 30–45 ft, owner-driven",
          "Flybridge cruisers, 45–65 ft, one or two crew",
          "Larger motor yachts, 65 ft and up, full-time crew",
          "Catamaran power boats for stability and shallow draft",
        ],
      },
      {
        heading: "Buying used, properly",
        body: "We insist on an independent survey by a surveyor you appoint, not one we recommend. Engine hours, service history, osmosis, corrosion and — for an imported hull — a complete customs trail. A boat with missing import documents is worth far less and is difficult to resell.",
      },
      {
        heading: "The real cost of ownership",
        body: "Berthing, crew salaries, insurance, annual survey, antifouling, monsoon layup, fuel and maintenance. As a planning figure, budget roughly ten percent of the vessel's value per year. We will model it properly against the specific boat before you commit, and arrange management and charter placement afterwards if you want the boat to earn.",
      },
    ],
    faqs: [
      {
        q: "How much does a motor yacht cost in India?",
        a: "Landed cost depends heavily on import duty and GST for a foreign-built hull, which can add a substantial percentage over the overseas price. We quote landed cost including duties, freight, commissioning and registration, because the sticker price is not the number that matters.",
      },
      {
        q: "Should I buy a boat already in India or import one?",
        a: "A boat already imported and registered here removes duty risk and paperwork uncertainty, and is usually the easier purchase. Importing gives you more choice and a newer vessel for the money, but budget more time and get the duty position confirmed before you commit.",
      },
      {
        q: "Do I need a licence to drive my own motor yacht?",
        a: "For private recreational use the requirement varies by state and vessel category, and a commercially registered vessel must be operated by licensed crew. We recommend Powerboat Level 2 as a minimum regardless — insurers increasingly ask for it.",
      },
      {
        q: "Can the yacht pay for itself through charter?",
        a: "It can offset a meaningful share of running costs, not usually all of them. It requires commercial registration, licensed crew and the right insurance, and those need to be planned before purchase rather than retrofitted.",
      },
    ],
  },
  {
    slug: "buy-a-sailing-yacht",
    href: "/yachts/buy-a-sailing-yacht",
    eyebrow: "Brokerage",
    title: "Buy a sailing",
    accent: "yacht",
    seoTitle: "Buy a Sailing Yacht in India — Cruisers, Racers & Catamarans",
    seoDescription:
      "Buy a sailing yacht in India. Cruising monohulls, performance racers and sailing catamarans, with survey, rig inspection, import guidance, berthing and skipper training.",
    intro:
      "Sailing yachts cost less to run than a motor yacht of the same length and reward you differently — you go slower, you use almost no fuel, and you spend the afternoon actually doing something.",
    image: "https://images.unsplash.com/photo-1526761122248-c31c93f8b2b9?auto=format&fit=crop&w=1800&q=80",
    imageAlt: "Sailing yacht under full sail on open water",
    facts: [
      { label: "Sizes", value: "25–60 ft" },
      { label: "Types", value: "Mono & multihull" },
      { label: "Rig check", value: "Included in survey" },
      { label: "Training", value: "RYA route" },
    ],
    sections: [
      {
        heading: "Monohull or catamaran",
        body: "A monohull sails better upwind, costs less to berth and is cheaper to buy. A catamaran is level, has far more living space and shallower draft, and is easier on guests who do not sail. In Indian coastal conditions, both work — the decision is about how you will use the boat.",
        bullets: [
          "Cruising monohulls, 30–50 ft, for coastal and passage sailing",
          "Performance cruisers for owners who intend to race",
          "One-design keelboats for club racing fleets",
          "Sailing catamarans for space, stability and charter use",
        ],
      },
      {
        heading: "What the survey must cover",
        body: "Hull and structure, keel attachment, rudder bearings, standing and running rigging with age, sails and their condition, engine and saildrive, and electrical systems. Rigging has a service life regardless of appearance — an old rig on a tidy boat is a large cost sitting just out of sight.",
      },
      {
        heading: "Learning to sail her",
        body: "If you are buying before you can confidently skipper, we will build a training plan onto the purchase — RYA Day Skipper, then supervised hours on your own boat until it is genuinely yours to handle.",
      },
    ],
    faqs: [
      {
        q: "Is a sailing yacht cheaper to own than a motor yacht?",
        a: "Generally yes. Fuel is a fraction, engines are smaller and work less, and many sailing yachts of this size are owner-operated rather than crewed. Rigging and sails are the offsetting costs, and both are predictable if you plan for them.",
      },
      {
        q: "How old is too old for a sailing yacht?",
        a: "A well-maintained GRP hull from the 1990s can be a sound purchase. Age matters far less than maintenance history, rigging age and whether the boat has been laid up properly each monsoon.",
      },
      {
        q: "Can I sail a yacht in India during the monsoon?",
        a: "No. The season runs October to May; from June to September the west coast is unsafe and most operations stop. Budget for haul-out and layup as part of annual ownership cost.",
      },
      {
        q: "What size sailing yacht can I handle myself?",
        a: "With Day Skipper level competence, most people can handle a 32–38 ft cruiser short-handed. Beyond about 45 ft, loads and berthing get demanding enough that you will want crew or a very well set up boat.",
      },
    ],
  },
  {
    slug: "buy-a-speedboat",
    href: "/yachts/buy-a-speedboat",
    eyebrow: "Brokerage",
    title: "Buy a",
    accent: "speedboat",
    seoTitle: "Buy a Speedboat in India — RIBs, Sports Boats & Tenders",
    seoDescription:
      "Buy a speedboat in India. RIBs, sports boats, centre consoles and yacht tenders, new and pre-owned, with engine survey, registration, trailer and berthing support.",
    intro:
      "A speedboat is the most-used boat most owners ever buy. It is cheap to run, easy to store on a trailer, and it turns a two-hour road journey down the coast into a twenty-minute crossing.",
    image: "https://images.unsplash.com/photo-1593351415075-3bac9f45c877?auto=format&fit=crop&w=1800&q=80",
    imageAlt: "Speedboat running across open water",
    facts: [
      { label: "Sizes", value: "16–36 ft" },
      { label: "Types", value: "RIB, console, sports" },
      { label: "Storage", value: "Trailer or berth" },
      { label: "Engines", value: "Outboard & sterndrive" },
    ],
    sections: [
      {
        heading: "Which type suits you",
        body: "The hull type matters more than the badge on the engine cover.",
        bullets: [
          "RIBs — tough, seaworthy and forgiving alongside; the practical all-rounder",
          "Centre consoles — walkaround deck space, best for fishing and diving",
          "Bowriders and sports boats — seating and sunbathing for family days",
          "Yacht tenders — sized to a mothership's davits or garage",
          "Commercial and charter boats built to passenger survey",
        ],
      },
      {
        heading: "Engines and survey",
        body: "Outboards are simpler, lighter and easier to service in India than sterndrives, and parts are more widely available. On a used boat, compression testing and an ECU hours readout matter more than how the topsides look. We arrange an independent engine survey as a matter of course.",
      },
      {
        heading: "Registration, storage and running",
        body: "We handle registration with the relevant maritime board, advise on trailer versus berth storage, and arrange servicing. A trailered boat kept under cover costs a fraction of a berthed one and lasts longer — for most owners it is the right answer.",
      },
    ],
    faqs: [
      {
        q: "How much does a speedboat cost in India?",
        a: "A used 18–21 ft outboard boat is the accessible entry point; a new imported RIB or sports boat of 25 ft and up costs several times that once duty and freight land. We quote landed, registered cost rather than a base price.",
      },
      {
        q: "Outboard or sterndrive?",
        a: "Outboard, for almost every Indian owner. Servicing is simpler, spares are easier to source, there is no corrosion-prone drive leg sitting permanently in silty water, and resale is stronger.",
      },
      {
        q: "Do I need a licence to operate a speedboat?",
        a: "Requirements vary by state for private use, and commercial passenger operation requires licensed crew and a surveyed vessel. We recommend RYA Powerboat Level 2 for any owner-operator — it is a two-day course and insurers look favourably on it.",
      },
      {
        q: "Where can I keep a speedboat in Mumbai?",
        a: "Options are a marina berth, a club mooring, or trailer storage with launching at a ramp. Trailer storage is the cheapest and keeps the boat out of the water, which materially extends hull and engine life.",
      },
    ],
  },
];

export const allContentPages = [
  ...managementServices,
  ...sailingSchoolPages,
  ...yachtSalesPages,
];

export const getManagementService = (slug: string) =>
  managementServices.find((p) => p.slug === slug);
export const getSailingSchoolPage = (slug: string) =>
  sailingSchoolPages.find((p) => p.slug === slug);
export const getYachtSalesPage = (slug: string) =>
  yachtSalesPages.find((p) => p.slug === slug);
