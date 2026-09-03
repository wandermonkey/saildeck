# Saildeck — how this site actually ranks

## First, the honest part

No site ranks #1 immediately. Not this one, not one built by anybody else.

Google has to crawl the pages, index them, and then decide over weeks whether
the domain deserves to sit above competitors who have been collecting reviews
and links for years. For a commercial phrase like "yacht rental in Mumbai" you
are competing against operators, aggregators and OTA listings. Realistic shape:

| When | What normally happens |
|------|----------------------|
| Week 1–2 | Pages get indexed. You start ranking for your brand name ("Saildeck"). |
| Week 3–8 | Long-tail pages appear — "pre wedding shoot on yacht Goa", "yacht with jacuzzi Mumbai". These convert well and have little competition. |
| Month 3–6 | The city pages start moving on the main money terms, **if** the Google Business Profile and reviews work below is being done. |
| Month 6+ | Top-3 for the main terms is realistic with sustained reviews and links. |

Anyone promising instant #1 is either buying ads (which is legitimate — just
call it what it is) or selling you link schemes that get domains penalised.

**What is fully in our control is the technical foundation, and that is done.**
It means you compete on reputation and content instead of losing on
fundamentals. The rest of this document is the part that is on you.

---

## What is already built

**Technical**
- Every page statically pre-rendered — near-instant TTFB, strong Core Web Vitals
- ~112 KB of JavaScript on first load; no animation library, no icon library
- Fonts self-hosted at build time (no render-blocking Google Fonts request)
- Images served as AVIF/WebP, correctly sized per breakpoint, hero preloaded
- Auto-generated `sitemap.xml` and `robots.txt`
- Canonical URL, Open Graph and Twitter card on every page, from one helper
- Mobile-first, accessible focus states, `prefers-reduced-motion` respected

**Structured data** (this is what produces rich results in the SERP)
- `TouristAttraction` business entity with address, geo, hours, area served
- `Product` + `Offer` on each yacht page → price can show in search results
- `Service` + `UnitPriceSpecification` on city and experience pages
- `FAQPage` on home, FAQ, city and buy-a-boat pages → expandable Q&A in the SERP
- `BreadcrumbList` on every interior page → breadcrumb trail instead of a raw URL
- `ItemList` on fleet and experiences

**Page architecture** — each page targets one intent rather than competing with
itself:

| URL | Target intent |
|-----|---------------|
| `/` | brand + "yacht charter India" |
| `/yacht-rental-mumbai` | **highest commercial value** — transactional, local |
| `/yacht-rental-goa` | **highest commercial value** — transactional, local |
| `/fleet/[yacht]` | "yacht with jacuzzi", "yacht for 30 people Mumbai" |
| `/experiences/birthday-on-a-yacht` | "birthday party on yacht Mumbai" |
| `/experiences/proposal-and-anniversary` | "proposal on yacht", "romantic cruise" |
| `/experiences/pre-wedding-shoot` | "pre wedding shoot on yacht Goa" |
| `/experiences/corporate-charter` | "corporate yacht event Mumbai" |
| `/buy-a-boat` | "buy a yacht in India" — different audience, high value |
| `/faq` | question searches, feeds the FAQ rich result |

The experience pages matter more than they look. "Yacht rental Mumbai" is
fiercely contested; "birthday party on a yacht in Mumbai price" is not, and the
person searching it is far closer to booking.

---

## Do these in your first week

### 1. Google Search Console — day one
Verify at [search.google.com/search-console](https://search.google.com/search-console),
submit `https://www.saildeck.com/sitemap.xml`, then use **URL Inspection →
Request Indexing** on the home page and both city pages. This is the single
fastest way to get crawled.

Set `GOOGLE_SITE_VERIFICATION` in your environment and the meta tag is added
automatically.

### 2. Google Business Profile — the highest-leverage thing you can do
For "yacht rental Mumbai", the map pack sits above the normal results. Getting
into it beats almost any on-page work.

- Claim/verify the profile for the exact business name **Saildeck**
- Category: *Boat Rental Service* (secondary: *Boat Tour Agency*)
- Address and phone must match `src/lib/site.ts` **character for character** —
  inconsistent details ("NAP") actively suppress local ranking
- Add 20+ real photos of your actual boats
- Post weekly; each post is a small freshness signal
- Do the same on Bing Places, Justdial, Sulekha and TripAdvisor

### 3. Reviews — this is the real ranking lever
Volume, recency and rating of Google reviews drive local pack position more than
anything on the website.

Make it a process, not a hope: message every guest the day after their charter
with a direct review link. Aim for **2–4 new reviews a week, sustained**. Reply
to every one, including the bad ones — visible replies are a ranking factor and
a conversion factor.

### 4. Links, earned honestly
- Get listed in Mumbai and Goa tourism directories
- Offer charters to travel and wedding photographers in exchange for a credited
  link from their blog
- Pitch "things to do in Mumbai" listicles — journalists want a photo and a price
- Wedding planners and corporate event agencies will link to a supplier page

**Never buy links or use a "guaranteed #1" SEO vendor.** Link schemes are the
main cause of manual penalties, and recovery takes months.

---

## Content plan for months 2–4

Add a `/blog` and publish one genuinely useful piece a month. These rank for
research-stage searches and give you something to link internally from:

1. *What it actually costs to rent a yacht in Mumbai (2026 prices)* — pricing
   transparency ranks well because nobody else does it
2. *Best time of year for a yacht charter in Goa* — seasonality, monsoon dates
3. *Sunset cruise vs day charter: which to book*
4. *How to plan a proposal on a yacht* — checklist format
5. *Gateway of India vs Bandra: where to board in Mumbai*
6. *Yacht party rules in India: capacity, alcohol, music, timing*

Write them for a human deciding whether to book. Thin AI-generated filler is
actively demoted now, and it is obvious to readers too.

---

## Measuring it

Watch these in Search Console, monthly:

- **Impressions** — is Google showing you at all? This moves first.
- **Average position** per query — direction matters more than the number.
- **Queries you did not expect** — these tell you which page to write next.
- **Core Web Vitals** should stay green. If they slip, it will be a large
  unoptimised image someone added later.

In GA4, the numbers that actually matter are WhatsApp clicks and form
submissions per page — not sessions. The `data-cta` attributes are already in
place for this (see README).

---

## What would genuinely put you top-3 fastest

If you want results in weeks rather than months, the honest answer is:

1. **Google Ads** on "yacht rental mumbai" and similar, while SEO matures. It is
   paid, it is instant, and the city pages are already built to convert it.
2. **Reviews at volume** — 50+ genuine Google reviews will move you further than
   any amount of additional page work.
3. **Instagram** — this category is discovered visually. Reels of actual
   charters feed both bookings and the branded searches that Google rewards.

The website is the part that converts that attention. It is now built to do
that. The attention itself has to be earned.
