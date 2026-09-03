export type NavNode = {
  label: string;
  href: string;
  /** Short line shown under the label in the header dropdown. */
  blurb?: string;
  children?: NavNode[];
  /**
   * Keep the page in the footer sitemap and the crawlable link graph, but
   * leave it out of the header. Used for sections that still matter for SEO
   * but would otherwise crowd the main menu.
   */
  hideInHeader?: boolean;
};

/**
 * The whole site map, in one tree.
 *
 * The header renders the top two levels as dropdowns; the footer renders the
 * full depth as a sitemap. Adding a page here puts it in the navigation, the
 * footer and the internal-link graph at once.
 */
export const navigation: NavNode[] = [
  { label: "Home", href: "/" },

  { label: "Fleet", href: "/fleet", blurb: "Yachts and boats for charter" },

  {
    label: "Speedboats",
    href: "/speedboats",
    blurb: "Fast private transfers",
    children: [
      { label: "Mumbai to Elephanta", href: "/speedboats/mumbai-to-elephanta", blurb: "Caves run, 25 minutes" },
      { label: "Mumbai to Alibaug", href: "/speedboats/mumbai-to-alibaug", blurb: "Mandwa jetty, 20 minutes" },
      { label: "Mumbai to Navi Mumbai", href: "/speedboats/mumbai-to-navi-mumbai", blurb: "Belapur, beat the traffic" },
    ],
  },

  {
    label: "Buy & Sell Yachts",
    href: "/yachts",
    blurb: "Brokerage and new builds",
    children: [
      { label: "Sell Your Yacht", href: "/yachts/sell-your-yacht", blurb: "Listing, valuation, closing" },
      { label: "Buy a Motor Yacht", href: "/yachts/buy-a-motor-yacht", blurb: "New and pre-owned" },
      { label: "Buy a Sailing Yacht", href: "/yachts/buy-a-sailing-yacht", blurb: "Cruisers and racers" },
      { label: "Buy a Speedboat", href: "/yachts/buy-a-speedboat", blurb: "RIBs, sports boats, tenders" },
    ],
  },

  {
    label: "Management",
    href: "/management",
    blurb: "Owner services",
    children: [
      { label: "Boat Building", href: "/management/boat-building", blurb: "Custom builds up to 40 ft" },
      { label: "Marina Consultancy", href: "/management/marina-consultancy", blurb: "Feasibility to operations" },
      { label: "Yacht Timeshare", href: "/management/yacht-timeshare", blurb: "Fractional ownership" },
      { label: "Yacht Management", href: "/management/yacht-management", blurb: "Crew, compliance, upkeep" },
      { label: "Yacht Refit & Repair", href: "/management/yacht-refit-and-repair", blurb: "Hull, systems, interiors" },
      { label: "Monsoon Storage", href: "/management/monsoon-storage", blurb: "Haul-out and layup" },
      { label: "Visiting Yacht Support", href: "/management/visiting-yacht-support", blurb: "Clearance and agency" },
    ],
  },

  { label: "Blog", href: "/blog", blurb: "Guides and journal" },

  {
    label: "About Us",
    href: "/about",
    blurb: "Who we are",
    children: [
      { label: "Team", href: "/about/team", blurb: "Captains and crew" },
      { label: "Marinas", href: "/about/marinas", blurb: "Where we berth" },
      {
        label: "Sailing School",
        href: "/about/sailing-school",
        blurb: "Learn to sail",
        children: [
          { label: "Learn to Sail", href: "/about/sailing-school/learn-to-sail" },
          { label: "RYA Courses", href: "/about/sailing-school/rya-courses" },
          { label: "Buy Sailing Gear", href: "/about/sailing-school/buy-sailing-gear" },
          { label: "Buy a Sailing Boat", href: "/about/sailing-school/buy-a-sailing-boat" },
        ],
      },
    ],
  },

  /* Kept out of the header — the "Contact us" button already goes here. */
  { label: "Contact", href: "/contact", hideInHeader: true },

  /* Kept out of the header to save space, but these pages carry real search
     intent ("yacht rental mumbai"), so they stay in the footer sitemap. */
  {
    label: "Destinations",
    href: "/destinations",
    hideInHeader: true,
    children: [
      { label: "Mumbai", href: "/destinations/mumbai" },
      { label: "Goa", href: "/destinations/goa" },
      { label: "Navi Mumbai", href: "/destinations/navi-mumbai" },
      { label: "Rest of India", href: "/destinations/rest-of-india" },
    ],
  },

  { label: "Charter Types", href: "/charters", hideInHeader: true },
];

/** Header shows everything except Home and anything flagged hideInHeader. */
export const headerNav = navigation.filter((n) => n.href !== "/" && !n.hideInHeader);
