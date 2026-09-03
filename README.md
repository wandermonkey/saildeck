# Saildeck

Marketing site for Saildeck — yacht charters, speedboat transfers, brokerage and
marine services across Mumbai, Navi Mumbai and Goa.

Next.js 15 (App Router), React 19, TypeScript, Tailwind CSS v4. 59 pages, all
statically pre-rendered; the only server route is the enquiry endpoint.

---

## Running it

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build
npm start        # serve the production build
```

Node 20+.

> **This folder is inside OneDrive.** OneDrive syncs `.next` and turns files
> into reparse points, which makes Next.js fail with `EINVAL: readlink`.
> `npm run dev` and `npm run build` therefore clear `.next` first. The proper
> fixes are to exclude `.next` in OneDrive settings, or move the project to
> something like `C:\dev\saildeck`. Never run `npm run build` while `npm run dev`
> is running — they share `.next`.

---

## ⚠️ Must fix before launch

These will actively harm you if they ship as-is.

### 1. The Google reviews are placeholders

`src/data/reviews.ts` contains sample cards, **not real customer feedback**.
Publishing invented reviews attributed to named people is misleading, breaches
Google's review policies and India's consumer-protection rules on fake reviews,
and risks suspension of your Business Profile.

Two honest fixes:

- Paste in genuine Google reviews verbatim, with reviewer names exactly as they
  appear on Google, or
- **Better:** set `GOOGLE_PLACES_API_KEY` and `GOOGLE_PLACE_ID` in `.env.local`.
  `getReviews()` in `src/lib/reviews.ts` then pulls them live from your Business
  Profile and the section keeps itself current.

The aggregate rating in `src/lib/site.ts` (`rating: { value, count }`) is also a
placeholder. Only publish a number you can point to.

### 1b. The Instagram feed is placeholder

`src/data/instagram.ts` holds stock images standing in for your grid so the
carousel could be designed. Replace them with your real posts and permalinks,
or wire the Instagram Basic Display API. Instagram's own CDN URLs expire, so an
API integration has to re-cache the images rather than hotlink them.

### 1c. Fleet names still need your catalogue

You pointed me at `wa.me/c/918424848489`. WhatsApp catalogues are only readable
inside the app — the public page carries no product data, so I could not pull
the names, prices or photos. **Send me the product list** (a screenshot export,
a CSV, or just the names and prices) and I will replace the fleet in
`src/data/yachts.ts`. The nine boats currently listed are the ones from your
existing saildeck.com.

### 2. The logo is a placeholder SVG

I could not extract the logo files you attached in chat, so
`public/images/logo-saildeck.svg` and `logo-saildeck-white.svg` are stand-ins
drawn to match. **Overwrite both files with your real exports** (same paths, keep
roughly a 300×72 viewbox) and the header and footer pick them up with no code
change. The white version is for the navy footer.

### 3. Prices need confirming

| What | Where | Note |
|---|---|---|
| Speedboat route prices | `src/data/speedboats.ts` | Benchmarked against the Mumbai market (Gateway–Mandwa private transfers run roughly ₹6,000–8,500 one way). **Not Saildeck's own rates.** These are your most price-sensitive pages. |
| Yacht hourly rates | `src/data/yachts.ts` | Carried over from the current saildeck.com. |

### 4. Boat specs are invented

Guests / length / cabins / crew in `src/data/yachts.ts` are placeholders. Wrong
capacity causes refund disputes at the jetty, and Google flags Product markup
that contradicts the page.

### 5. Service copy needs a truth pass

`src/data/pages.ts` holds the management, sailing-school and brokerage pages.
The copy is written from standard Indian marine-industry practice — read it and
correct anything Saildeck does not actually do, especially **certifications
(RYA/IRS/MMD), yard capabilities, build sizes and lead times**.

### 6. Photography is stock

All images are Unsplash. On a charter site your own photographs are the single
biggest trust factor — guests compare the photo to the boat at the jetty. See
"Swapping in your own photos" below.

### 7. Still to add

- `public/og.jpg` — 1200×630 social share image (WhatsApp/Instagram previews are blank without it)
- `src/app/icon.png` — 512×512 favicon
- Deposit % and cancellation windows in `src/app/terms/page.tsx` (marked `[X]`)
- Legal review of Privacy (DPDP Act 2023) and Terms
- Boat videos — see below

---

## The homepage video

Your clip (`Yacht Charters and Rental in Mumbai.mp4`, 4K/60fps, 48 MB) was
transcoded for web into `public/videos/`:

| File | Size | Purpose |
|---|---|---|
| `saildeck-hero.webm` | 2.8 MB | VP9, preferred by Chrome/Firefox/Edge |
| `saildeck-hero.mp4` | 2.9 MB | H.264 fallback, Safari and older browsers |
| `saildeck-hero-poster.jpg` | 90 KB | Shown before the video loads |
| `public/og.jpg` | 39 KB | Social share card, cut from the same footage |

It plays clean — autoplay, muted, looping, **no dark overlay** — and is not
fetched at all until the section is close to the viewport, so the homepage's
loading performance is unaffected. Data-saver and reduced-motion settings leave
the poster in place instead.

To re-encode after editing the source, the commands are in the git history of
this README, or:

```bash
ffmpeg -i input.mp4 -vf "scale=1600:-2,fps=30" -c:v libx264 -crf 26 -preset slower -movflags +faststart -an public/videos/saildeck-hero.mp4
ffmpeg -i input.mp4 -vf "scale=1600:-2,fps=30" -c:v libvpx-vp9 -crf 36 -b:v 0 -row-mt 1 -an public/videos/saildeck-hero.webm
```

## Adding boat videos

Each boat has a `videos` array in `src/data/yachts.ts`:

```ts
videos: [
  { youtubeId: "dQw4w9WgXcQ", title: "Celestial Wave — full walkthrough" },
],
```

The section renders automatically under the description. It uses a click-to-load
player: only the poster image loads with the page, and the YouTube iframe (over
a megabyte of script) is injected only when someone presses play. While the array
is empty the section is hidden in production and shows a dashed placeholder in
development so you can see where it sits.

---

## Swapping in your own photos

Put files in `public/images/`, then change the gallery entries:

```ts
gallery: [
  { src: "/images/fleet/princess-61/princess-61-11.jpg", alt: "Princess 61 cruising past the Mumbai skyline at dusk" },
],
```

Export at ~2000px wide, JPEG quality 80. Next.js converts to AVIF/WebP and
resizes per breakpoint. The **first image** in each gallery is the listing-card
thumbnail and the carousel's opening frame. Once no Unsplash URLs remain, delete
the `remotePatterns` block in `next.config.ts`.

Write real alt text — it is how blind visitors experience the page and how Google
indexes the image.

---

## Environment variables

Copy `.env.example` to `.env.local`:

```
NEXT_PUBLIC_SITE_URL=https://www.saildeck.com
ENQUIRY_TO_EMAIL=info@saildeck.com
RESEND_API_KEY=            # optional — enquiry emails
GOOGLE_SITE_VERIFICATION=  # from Google Search Console
GOOGLE_PLACES_API_KEY=     # optional — live Google reviews
GOOGLE_PLACE_ID=           # optional — live Google reviews
```

Without `RESEND_API_KEY` the enquiry form validates and logs to the server
console but sends no email. The WhatsApp button in the form is deliberately
independent, so leads still reach you if email breaks.

---

## Site structure

The whole navigation tree lives in **one file**: `src/data/navigation.ts`. The
header renders the top two levels as dropdowns; the footer renders the full depth
as a sitemap. Add a page there and it appears in both, plus the internal-link
graph.

Header menu: **Fleet · Speedboats · Buy & Sell Yachts · Management · Blog ·
About Us**, with a crimson **Contact us** button on the right.

```
/                                     Home
/fleet                                + 9 boat pages          [header]
/speedboats                           + 3 routes              [header]
/yachts                               + 4 brokerage pages     [header]
/management                           + 7 owner services      [header]
/blog                                 + 6 posts               [header]
/about                                                        [header]
  /about/team
  /about/marinas
  /about/sailing-school               + 4 course pages
/contact                              (the header button; not a menu item)
/destinations   + /mumbai /goa /navi-mumbai /rest-of-india    (footer only)
/charters                                                     (footer only)
/faq  /privacy  /terms
```

Two sections are deliberately **footer-only**, flagged `hideInHeader` in
`src/data/navigation.ts`. Destinations and Charter Types carry real search
intent ("yacht rental mumbai"), so they keep their pages, their sitemap entries
and their internal links — they just do not take up header space. Flip the flag
to bring either back into the menu.

Management moved from `/about/management` to `/management` when it was promoted
into the main menu; permanent redirects for the old URLs are in
`next.config.ts`.

### Where the content lives

| File | Drives |
|---|---|
| `src/data/navigation.ts` | Header dropdowns + footer sitemap |
| `src/data/yachts.ts` | Fleet, galleries, videos, per-boat FAQs |
| `src/data/destinations.ts` | The four destination pages |
| `src/data/speedboats.ts` | The three transfer routes |
| `src/data/pages.ts` | Management, sailing school, brokerage pages |
| `src/data/blog.ts` | Blog posts |
| `src/data/company.ts` | Team roles, marinas, charter occasions |
| `src/data/reviews.ts` | Google review cards ⚠️ placeholder |
| `src/lib/site.ts` | Phone, email, address, WhatsApp — single source of truth |

**To add a boat:** append to `src/data/yachts.ts`. Its page, the listing grid,
the filters and the sitemap all update themselves.

---

## Design system

Defined in `src/app/globals.css`.

- **Navy** `#0a2a43` — structure, footer, dark bands
- **Crimson** `#a80b28` — from your logo; the single action colour, used for
  every primary CTA
- **Teal** `#2aa8a8` — small accents and icons only, so crimson always wins
- **Surfaces** white on `#f4f7f9`, cards with a soft shadow
- **Playfair Display** for headings, with italic for the accent phrase
- **Inter** for body, UI, and the uppercase hero headline

> One trap worth knowing: base element styles **must** sit inside `@layer base`.
> Tailwind v4 puts utilities in a cascade layer, and unlayered CSS beats every
> layer — an unlayered `h1 { color }` silently overrides `text-white` and makes
> headings vanish on dark heroes.

---

## Conversion design

Every page has a primary CTA above the fold, a `<CtaBand>` mid-page, and the
footer. No cart — charters are quoted, not checked out.

- **Floating WhatsApp button** bottom-right sitewide; the pre-filled message
  names the page the visitor came from, so enquiries arrive pre-qualified.
- **Enquiry form** offers "WhatsApp instead" at equal weight and carries whatever
  was typed into the chat.
- **CTA tracking:** every button has a `data-cta` attribute. One listener wires
  the lot to GA4:

```js
document.addEventListener("click", (e) => {
  const el = e.target.closest("[data-cta]");
  if (el) gtag("event", "cta_click", { cta_id: el.dataset.cta });
});
```

---

## SEO built in

- Every page statically pre-rendered; ~103 KB shared JS, no animation or icon library
- Canonical, Open Graph and Twitter tags from one helper (`src/lib/seo.ts`)
- Schema.org: `LocalBusiness`, `Product` + `Offer` on boats, `Service` +
  `UnitPriceSpecification` on routes and services, `FAQPage`, `BreadcrumbList`,
  `ItemList`, `Article`
- FAQ accordions use native `<details>` so answers sit in the HTML where Google
  reads them
- `sitemap.xml` and `robots.txt` generated from the data files
- Flat keyword-matching URLs (`/speedboats/mumbai-to-alibaug`)

See `SEO-PLAYBOOK.md` for the off-site work that actually drives rankings.

---

## Deploying

Push to GitHub, import at [vercel.com/new](https://vercel.com/new), set the
environment variables, add `saildeck.com` under Domains, point DNS at Vercel.

**Replacing the existing WordPress site:** export the old URL list from Google
Search Console and add redirects in `next.config.ts` from every URL with traffic
or backlinks to its new equivalent — *before* switching DNS. Dropping URLs
without redirects throws away every ranking the domain currently holds. This is
the most common way a redesign tanks traffic.
