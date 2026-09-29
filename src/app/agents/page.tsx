import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

import { PageHero } from "@/components/PageHero";
import { CtaBand } from "@/components/CtaBand";
import { Faq } from "@/components/Faq";
import { JsonLd } from "@/components/JsonLd";
import { Reveal } from "@/components/Reveal";
import { AgentSignupForm } from "@/components/AgentSignupForm";
import { SectionTitle } from "@/components/ui";
import {
  TagIcon, ShieldIcon, HeadsetIcon, CalendarIcon, CheckIcon,
  UsersIcon, PinIcon, ArrowIcon, WhatsAppIcon, StarIcon,
} from "@/components/icons";

import { yachts, inr, type Yacht } from "@/data/yachts";
import { destinations, type DestinationSlug } from "@/data/destinations";
import { buildMetadata, breadcrumbSchema, faqSchema, serviceSchema } from "@/lib/seo";
import { whatsappLink, site } from "@/lib/site";

const HERO_IMAGE = "/images/fleet/tara-sailing-catamaran/tara-catamaran-7.jpg";

export const metadata: Metadata = buildMetadata({
  title: "Yacht Charter B2B & Agent Rates — Travel Agent Partner Program Mumbai & Goa",
  description:
    "Register as a Saildeck B2B partner for net agent rates across a 20-boat fleet in Mumbai and Goa. Margins structured up to 20% per booking, a dedicated WhatsApp booking group, plus free promotional sails, photoshoots and blog features for travel agents, DMCs and event planners.",
  path: "/agents",
  image: `${site.url}${HERO_IMAGE}`,
});

const breadcrumb = [
  { name: "Home", path: "/" },
  { name: "Agents & B2B Rates", path: "/agents" },
];

/** Sailing yachts and catamarans are wind-driven; everything else is engine-driven. */
const sailOrPower = (category: Yacht["category"]) =>
  category === "Sailing Yacht" || category === "Catamaran" ? "Sail" : "Power";

const locationNames = (slugs: Yacht["destinations"]) =>
  slugs.map((s) => destinations.find((d) => d.slug === s)?.name ?? s).join(", ");

/**
 * The fleet list grouped by home port rather than one long undifferentiated
 * run of 20 cards — "Mumbai fleet" / "Goa fleet" as real H3 headings gives
 * the page topical structure for both a scanning agent and a search engine,
 * and it's derived live so a boat moving city never needs a manual update.
 */
const destinationOrder: DestinationSlug[] = ["mumbai", "goa", "navi-mumbai", "rest-of-india"];
const fleetByDestination = destinationOrder
  .map((slug) => ({
    slug,
    name: destinations.find((d) => d.slug === slug)?.name ?? slug,
    boats: yachts.filter((y) => y.destinations.includes(slug)),
  }))
  .filter((g) => g.boats.length > 0);

/** First video, whichever form it takes — YouTube link if hosted there,
 *  otherwise the self-hosted file. Falls back to a placeholder link when a
 *  boat has none yet, per the brief: keep it a live link, just an empty one. */
const videoHref = (y: Yacht) => {
  const v = y.videos[0];
  if (!v) return "#";
  if (v.youtubeId) return `https://www.youtube.com/watch?v=${v.youtubeId}`;
  return v.src ?? "#";
};

/**
 * Deliberately a qualitative line rather than a published net number — this
 * page is public and unauthenticated, and printing exact wholesale pricing
 * for all 20 boats would hand it to any competitor reading the same page.
 * The margin structure and the public retail rate are both real; the exact
 * net rate is confirmed once someone actually registers as a partner.
 */
const b2bCosting = (y: Yacht) =>
  `Public retail rate is ${inr(y.pricePerHour)}/hour. Partner net rate is structured up to 20% below this on confirmed bookings — resell at any price above your net cost. Exact net rate confirmed on registration.`;

const benefits = [
  {
    icon: <TagIcon className="h-6 w-6" />,
    title: "Margins up to 20% a booking",
    body: "Net rates sit below our published retail price on every boat in the fleet, so the gap between what you pay and what you charge your client is yours to keep.",
  },
  {
    icon: <ShieldIcon className="h-6 w-6" />,
    title: "A real, inspected fleet",
    body: "Every boat you resell is one we run ourselves or know first-hand — licensed, crewed and insured. Nothing you quote is a boat you've never actually seen.",
  },
  {
    icon: <HeadsetIcon className="h-6 w-6" />,
    title: "One point of contact",
    body: "A dedicated WhatsApp group between us handles availability checks, quotes and confirmations — no call centre, no ticket number, no waiting on hold.",
  },
  {
    icon: <CalendarIcon className="h-6 w-6" />,
    title: "Fast, firm quotes",
    body: "Tell us the date, the boat and the head count. You get a firm net rate back the same day, so you can hold your client's price with confidence.",
  },
];

/**
 * Genuine Saildeck fleet photography — not stock. Sourcing "real Indian
 * sailing yacht" images from a stock library isn't actually verifiable (the
 * Miami-skyline mishap on the proposal page is exactly this failure mode),
 * so this pulls straight from boats already in the live fleet instead —
 * shot on Mumbai and Goa water, unedited, and already vetted for this site.
 */
const fleetGallery = [
  { src: "/images/fleet/tara-sailing-catamaran/tara-catamaran-7.jpg", alt: "Tara under way past the Middle Ground coastal battery with the Mumbai skyline behind", boat: "Tara Sailing Catamaran" },
  { src: "/images/fleet/nava-45-foot/nava-45-foot-jeanneau-sailing-yacht-mumbai-side-profile.jpg", alt: "Nava's side profile at anchor with the Mumbai skyline behind", boat: "Nava, 45ft Jeanneau" },
  { src: "/images/fleet/hanse-33/hanse-33-sailing-yacht-mumbai-nauti-by-nature-under-sail.jpg", alt: "Nauti by Nature under sail with her name visible on the stern", boat: "Nauti by Nature, Hanse 33" },
  { src: "/images/fleet/5-pax-sailing-boat/5-pax-sailing-boat-caviar.webp", alt: "The 5 Pax Sailing Boat under full sail with guests aboard, named Caviar", boat: "5 Pax Sailing Boat" },
  { src: "/images/fleet/mac-30/mac-30-sailing-yacht-mumbai-guests-bow-underway.jpg", alt: "Guests seated along the bow of the MAC 30 as she gets under way", boat: "MAC 30" },
  { src: "/images/fleet/tara-sailing-catamaran/tara-catamaran-15.jpg", alt: "Guests seated on Tara's forward trampoline deck with the Taj Mahal Palace in view", boat: "Tara Sailing Catamaran" },
  { src: "/images/fleet/flo-31-foot/flo-33-foot-sailing-yacht-mumbai-hero.jpg", alt: "Flo at anchor with her nameplate visible on the bow", boat: "Flo, 33ft Sailing Yacht" },
  { src: "/images/fleet/nava-45-foot/nava-sailing-yacht-mumbai-guest-sunset-bow.jpg", alt: "A guest seated at Nava's bow watching the sunset under sail", boat: "Nava, 45ft Jeanneau" },
];

const incentives = [
  {
    title: "Free promotional sails",
    body: "A complimentary slot on the water for you or your team to experience the boats you're selling — the easiest way to describe a charter convincingly is to have been on one.",
  },
  {
    title: "Free photoshoots",
    body: "Need fresh imagery for your own listings or socials? We'll arrange a photoshoot on one of our boats at no cost, so your marketing isn't relying on our stock photos.",
  },
  {
    title: "Blog features and backlinks",
    body: "Mention Saildeck on your own website or blog and we'll return the favour — a feature on our blog and a link back to you, so the visibility runs both directions.",
  },
  {
    title: "A dedicated WhatsApp group",
    body: "Every partner gets a shared WhatsApp Business group with our booking team — availability, quotes and confirmations in one thread, not scattered across emails and calls.",
  },
];

export default function AgentsPage() {
  const itemList = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Saildeck fleet — agent and B2B rates",
    itemListElement: yachts.map((y, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: y.name,
      url: `https://www.saildeck.com/fleet/${y.slug}`,
    })),
  };

  const partnerService = serviceSchema({
    name: "Yacht Charter B2B & Agent Partner Program",
    description:
      "B2B reseller program for travel agents, DMCs, wedding and event planners and OTAs — net agent rates across Saildeck's Mumbai and Goa yacht, catamaran, sailboat and speedboat fleet.",
    path: "/agents",
    image: HERO_IMAGE,
  });

  return (
    <>
      <JsonLd data={[breadcrumbSchema(breadcrumb), faqSchema(faqs), itemList, partnerService]} />

      <PageHero
        breadcrumb={breadcrumb}
        eyebrow="Partners"
        title="Agents &"
        accent="B2B rates"
        sub="Sell our fleet as your own inventory. Net rates on every boat, margins structured up to 20% behind every booking, and a partner desk that answers on WhatsApp — not a form that goes quiet."
        image={HERO_IMAGE}
        imageAlt="Tara, a sailing catamaran, under way off Mumbai past the Middle Ground coastal battery with the city skyline behind"
        facts={[
          { label: "Partner margin", value: "Up to 20%" },
          { label: "Fleet", value: `${yachts.length} boats` },
          { label: "Coverage", value: "Mumbai, Goa, Navi Mumbai" },
          { label: "Booking desk", value: "Dedicated WhatsApp group" },
        ]}
      >
        <div className="flex flex-wrap gap-3">
          <a
            href="#register"
            className="inline-flex items-center gap-2 rounded-full bg-crimson px-6 py-3 text-sm font-medium text-white transition-all hover:-translate-y-0.5 hover:bg-crimson-dark"
            data-cta="agents-hero-register"
          >
            Register as a partner <ArrowIcon className="h-4 w-4" />
          </a>
          <a
            href="#fleet-rates"
            className="inline-flex items-center gap-2 rounded-full bg-white/12 px-6 py-3 text-sm font-medium text-white backdrop-blur-sm ring-1 ring-white/30 transition-all hover:-translate-y-0.5 hover:bg-white hover:text-navy"
            data-cta="agents-hero-fleet"
          >
            See the fleet &amp; rates ↓
          </a>
        </div>
      </PageHero>

      {/* ================= TRUST BAR ================= */}
      <div className="border-b border-line bg-white py-4">
        <div className="container-x flex flex-wrap items-center justify-center gap-x-8 gap-y-2 text-sm text-muted">
          <span className="flex items-center gap-1.5">
            <span className="flex text-[#FBBC05]">
              {[...Array(5)].map((_, i) => <StarIcon key={i} className="h-3.5 w-3.5" />)}
            </span>
            <strong className="text-navy">{site.rating.value}</strong> from {site.rating.count} direct-guest reviews
          </span>
          <span className="hidden h-4 w-px bg-line sm:block" />
          <span>Licensed captain &amp; crew on every boat</span>
          <span className="hidden h-4 w-px bg-line sm:block" />
          <span>Same-day quotes on WhatsApp</span>
        </div>
      </div>

      {/* ================= WHO THIS IS FOR ================= */}
      <section className="py-14 md:py-16">
        <div className="container-x">
          <Reveal>
            <SectionTitle
              align="center"
              eyebrow="Who this is for"
              title="Built for anyone who"
              accent="sells experiences on the water"
              sub="If a client ever asks you for a boat in Mumbai or Goa, this is the rate card that turns that question into a booking you earn from."
            />
          </Reveal>
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {[
              { label: "Travel agents & tour operators", href: "/destinations", note: "Add a yacht charter to any Mumbai or Goa itinerary" },
              { label: "DMCs handling India-bound groups", href: "/destinations", note: "A vetted, insured fleet you can quote with confidence" },
              { label: "Wedding & event planners", href: "/products/wedding-photoshoot-on-a-yacht", note: "Pre-wedding shoots, sundowners and reception venues afloat" },
              { label: "Corporate concierge & OTAs", href: "/management", note: "Offsites, client entertainment and repeatable corporate rates" },
              { label: "Hotel concierge desks", href: "/charters", note: "A ready answer when a guest asks what there is to do on the water" },
              { label: "Photographers & content creators", href: "/products/influencer-collaborations", note: "Resell shoots and collaborations on boats you already know" },
            ].map((w) => (
              <Link
                key={w.label}
                href={w.href}
                className="group flex flex-col rounded-2xl border border-line bg-white p-5 transition-colors hover:border-crimson/40 hover:bg-surface"
              >
                <span className="font-display text-base font-semibold text-navy group-hover:text-crimson">{w.label}</span>
                <span className="mt-1.5 text-sm leading-relaxed text-muted">{w.note}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ================= WHY PARTNER ================= */}
      <section className="py-14 md:py-20">
        <div className="container-x">
          <Reveal>
            <SectionTitle
              align="center"
              eyebrow="Why partner with us"
              title="Built for agents who"
              accent="resell for a living"
              sub="You're not our only channel and we're not yours — this works when it's straightforward for both sides."
            />
          </Reveal>
          <div className="mt-11 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {benefits.map((b, i) => (
              <Reveal key={b.title} delay={(i % 4) * 70}>
                <div className="h-full rounded-2xl border border-line bg-white p-6">
                  <span className="grid h-12 w-12 place-items-center rounded-full bg-crimson-soft text-crimson">
                    {b.icon}
                  </span>
                  <h3 className="mt-4 font-display text-base font-semibold text-navy">{b.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted">{b.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ================= HOW THE MARGIN WORKS ================= */}
      <section className="border-y border-line bg-surface py-14 md:py-20">
        <div className="container-x grid gap-12 lg:grid-cols-[1.1fr_1fr] lg:items-start lg:gap-16">
          <Reveal>
            <SectionTitle eyebrow="The mechanics" title="How the margin" accent="actually works" />
            <div className="mt-6 space-y-4 leading-relaxed text-muted">
              <p>
                Register once, and every boat in the fleet comes with a net rate sitting
                below its public retail price — the same price a direct customer sees on
                this site. The gap between the net rate we confirm to you and whatever you
                quote your client is structured up to 20% and is yours to keep in full;
                we never contact your client directly or undercut your price.
              </p>
              <p>
                A confirmed booking is simple: message the date, boat and head count into
                the shared WhatsApp group, get a firm net rate and availability back the
                same day, and confirm with a deposit exactly the way a direct charter
                works. We run the crew, the boat and the operations end — you run the
                relationship with your client.
              </p>
            </div>
            <ul className="mt-6 space-y-3">
              {[
                "No minimum booking volume to register",
                "No exclusivity required — sell alongside any other operator",
                "Net rates apply to charters, speedboat transfers and experiences alike",
                "You invoice your client directly; we invoice you at the net rate",
              ].map((b) => (
                <li key={b} className="flex items-start gap-3 text-sm text-muted">
                  <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-teal-soft text-teal">
                    <CheckIcon className="h-3 w-3" />
                  </span>
                  {b}
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal delay={100}>
            <div className="rounded-2xl border border-line bg-white p-7">
              <h3 className="font-display text-lg font-semibold text-navy">Partner incentives</h3>
              <p className="mt-1.5 text-sm text-muted">On top of the margin, every registered partner gets:</p>
              <div className="mt-5 space-y-5">
                {incentives.map((inc) => (
                  <div key={inc.title}>
                    <h4 className="text-sm font-semibold text-navy">{inc.title}</h4>
                    <p className="mt-1 text-sm leading-relaxed text-muted">{inc.body}</p>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ================= REAL FLEET PHOTOGRAPHY ================= */}
      <section className="border-y border-line bg-surface py-14 md:py-20">
        <div className="container-x">
          <Reveal>
            <SectionTitle
              align="center"
              eyebrow="See what you're selling"
              title="Real boats, photographed on"
              accent="Mumbai and Goa waters"
              sub="No stock photography — every shot below is one of our own boats, on its own water, so you know exactly what you're quoting your client."
            />
          </Reveal>
          <div className="mt-10 grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-4">
            {fleetGallery.map((g, i) => (
              <Reveal key={g.src} delay={(i % 4) * 60}>
                <figure className="group relative aspect-[4/5] overflow-hidden rounded-2xl bg-surface-2">
                  <Image
                    src={g.src}
                    alt={g.alt}
                    fill
                    sizes="(max-width: 640px) 50vw, (max-width: 768px) 50vw, 25vw"
                    className="object-cover transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-105"
                  />
                  <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-navy-deep/85 via-navy-deep/10 to-transparent p-3 text-xs font-medium text-white">
                    {g.boat}
                  </figcaption>
                </figure>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ================= FLEET & B2B RATES ================= */}
      <section id="fleet-rates" className="scroll-mt-20 py-14 md:py-20">
        <div className="container-x">
          <Reveal>
            <SectionTitle
              align="center"
              eyebrow="The fleet"
              title={`All ${yachts.length} boats,`}
              accent="one B2B rate card"
              sub="Every boat we run, with the specifics you need to quote a client — type, capacity, home port and how the B2B costing works. Video, photo and spec-sheet links are provided where we have them."
            />
          </Reveal>

          <div className="mt-11 space-y-14">
            {fleetByDestination.map((group) => (
              <div key={group.slug}>
                <h3 className="font-display text-xl font-semibold text-navy">
                  {group.name} fleet <span className="font-normal text-muted">— {group.boats.length} boats</span>
                </h3>
                <div className="mt-6 space-y-5">
                  {group.boats.map((y, i) => (
              <Reveal key={y.slug} delay={(i % 6) * 40}>
                <article className="grid gap-5 rounded-2xl border border-line bg-white p-5 sm:grid-cols-[9rem_1fr] sm:p-6">
                  <div className="relative aspect-[4/3] overflow-hidden rounded-xl bg-surface sm:aspect-square">
                    <Image
                      src={y.gallery[0].src}
                      alt={y.gallery[0].alt}
                      fill
                      sizes="(max-width: 640px) 100vw, 144px"
                      className="object-cover"
                    />
                  </div>

                  <div className="min-w-0">
                    <div className="flex flex-wrap items-start justify-between gap-3">
                      <div>
                        <h4 className="font-display text-lg font-semibold text-navy">{y.name}</h4>
                        <p className="text-sm text-muted">{y.category} · {sailOrPower(y.category)}</p>
                      </div>
                      <Link
                        href={`/fleet/${y.slug}`}
                        className="inline-flex shrink-0 items-center gap-1.5 rounded-full border border-line px-4 py-2 text-xs font-medium text-navy transition-colors hover:border-crimson hover:text-crimson"
                        data-cta="agents-view-boat"
                      >
                        View boat on Saildeck site <ArrowIcon className="h-3.5 w-3.5" />
                      </Link>
                    </div>

                    <dl className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-4">
                      <div>
                        <dt className="flex items-center gap-1.5 text-[11px] uppercase tracking-wide text-faint">
                          <UsersIcon className="h-3.5 w-3.5" /> Pax
                        </dt>
                        <dd className="mt-0.5 text-sm font-medium text-navy">{y.guests}</dd>
                      </div>
                      <div>
                        <dt className="flex items-center gap-1.5 text-[11px] uppercase tracking-wide text-faint">
                          <PinIcon className="h-3.5 w-3.5" /> Location
                        </dt>
                        <dd className="mt-0.5 text-sm font-medium text-navy">{locationNames(y.destinations)}</dd>
                      </div>
                      <div className="col-span-2 sm:col-span-2">
                        <dt className="text-[11px] uppercase tracking-wide text-faint">Type</dt>
                        <dd className="mt-0.5 text-sm font-medium text-navy">{y.category} ({sailOrPower(y.category)})</dd>
                      </div>
                    </dl>

                    <p className="mt-4 rounded-xl bg-surface p-3.5 text-sm leading-relaxed text-muted">
                      <span className="font-semibold text-navy">B2B costing — </span>
                      {b2bCosting(y)}
                    </p>

                    <div className="mt-4 flex flex-wrap gap-x-5 gap-y-2 text-sm">
                      <a
                        href={videoHref(y)}
                        target={videoHref(y) === "#" ? undefined : "_blank"}
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 font-medium text-crimson transition-all hover:gap-2.5"
                        data-cta="agents-video-link"
                      >
                        Videos <ArrowIcon className="h-3.5 w-3.5" />
                      </a>
                      <a
                        href="#"
                        className="inline-flex items-center gap-1.5 font-medium text-crimson transition-all hover:gap-2.5"
                        data-cta="agents-photos-link"
                      >
                        Photos <ArrowIcon className="h-3.5 w-3.5" />
                      </a>
                      <a
                        href="#"
                        className="inline-flex items-center gap-1.5 font-medium text-crimson transition-all hover:gap-2.5"
                        data-cta="agents-pdf-link"
                      >
                        Spec sheet (PDF) <ArrowIcon className="h-3.5 w-3.5" />
                      </a>
                    </div>
                  </div>
                </article>
              </Reveal>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= FAQ ================= */}
      <section className="border-t border-line bg-surface py-14 md:py-20">
        <div className="container-x">
          <Reveal>
            <SectionTitle align="center" eyebrow="Questions" title="Partner program" accent="FAQ" />
          </Reveal>
          <Reveal delay={100}>
            <div className="mx-auto mt-10 max-w-3xl">
              <Faq faqs={faqs} />
            </div>
          </Reveal>
        </div>
      </section>

      {/* ================= REGISTER ================= */}
      <section id="register" className="scroll-mt-20 py-14 md:py-20">
        <div className="container-x grid gap-12 lg:grid-cols-[1fr_23rem] lg:items-start lg:gap-16">
          <Reveal>
            <SectionTitle
              eyebrow="Get started"
              title="Register as a"
              accent="Saildeck partner"
              sub="Four fields, no account, no commitment. We come back with your partner net rates and add you to the shared WhatsApp group directly."
            />
            <div className="mt-8 rounded-2xl border border-line bg-white p-6">
              <h3 className="font-display text-base font-semibold text-navy">What happens after you register</h3>
              <ol className="mt-4 space-y-4">
                {[
                  { t: "We confirm your details", d: "A quick check that your business is real and a good fit — usually the same business day." },
                  { t: "You get net rates and a WhatsApp group invite", d: "Your partner net rates across the fleet, and an invite to the shared group with our booking desk." },
                  { t: "You start quoting clients", d: "Message a date, boat and head count into the group whenever you have a client to quote — we confirm availability and the net rate back fast." },
                ].map((s, i) => (
                  <li key={s.t} className="flex gap-4">
                    <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-crimson-soft font-display text-sm font-semibold text-crimson">
                      {i + 1}
                    </span>
                    <div className="min-w-0">
                      <h4 className="font-display text-sm font-semibold text-navy">{s.t}</h4>
                      <p className="mt-1 text-sm leading-relaxed text-muted">{s.d}</p>
                    </div>
                  </li>
                ))}
              </ol>
              <a
                href={whatsappLink("Hi Saildeck! I would like to register as an agent / B2B partner.")}
                target="_blank"
                rel="noopener noreferrer"
                data-cta="agents-whatsapp-direct"
                className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-full bg-[#25D366] px-6 py-3.5 text-sm font-semibold text-[#04210f] transition-all hover:-translate-y-0.5"
              >
                <WhatsAppIcon className="h-4 w-4" />
                Or just message us on WhatsApp
              </a>
            </div>
          </Reveal>

          <Reveal delay={120} className="lg:sticky lg:top-28">
            <AgentSignupForm />
          </Reveal>
        </div>
      </section>

      <CtaBand
        title="Selling yachts already?"
        accent="Let's make it official."
        sub="Register above or message us directly — we'll have your net rates back to you the same day."
        whatsappMessage="Hi Saildeck! I would like to register as an agent / B2B partner."
      />
    </>
  );
}

const faqs = [
  {
    q: "How much margin can I actually make as a partner?",
    a: "Net rates are structured up to 20% below the public retail price shown on saildeck.com, boat by boat. You resell at any price above your net cost — most partners hold close to the retail price and keep the full margin, though that's entirely your call.",
  },
  {
    q: "Is there a minimum number of bookings to register?",
    a: "No. There's no minimum volume and no ongoing commitment — you register once, get net rates across the fleet, and book as often or as rarely as your business needs.",
  },
  {
    q: "Do I need to sell Saildeck exclusively?",
    a: "No. We don't require exclusivity. Sell alongside any other operator you already work with — we'd just like first look at business that fits our fleet.",
  },
  {
    q: "How do I get a quote for a specific date and boat?",
    a: "Message the date, the boat (or the occasion, if you want a recommendation) and the head count into the shared WhatsApp group. We come back with a firm net rate and availability the same day.",
  },
  {
    q: "Who invoices whom?",
    a: "You invoice your client directly at whatever price you've quoted them. We invoice you at the confirmed net rate. Your client never sees our pricing or hears from us directly unless you'd prefer we do.",
  },
  {
    q: "What is the WhatsApp Business group for?",
    a: "It's the single channel for availability checks, quotes and booking confirmations between your team and ours — no separate emails, tickets or call centre. Every registered partner gets an invite.",
  },
  {
    q: "What are the free promotional sails and photoshoots?",
    a: "Registered partners can arrange a complimentary sail to experience the boats first-hand, and a free photoshoot on board for their own marketing — both scheduled around boat availability, at no cost to you.",
  },
  {
    q: "How does the blog feature and backlink exchange work?",
    a: "Mention Saildeck on your own website or blog and we'll feature your business on our blog with a link back to you — genuinely reciprocal, not a one-way ask.",
  },
  {
    q: "What happens if a booking is cancelled or rescheduled?",
    a: "The same weather and cancellation terms that apply to a direct charter apply to a B2B booking — a coast guard weather cancellation is rescheduled at no cost. Client-side cancellations follow the deposit terms confirmed at booking.",
  },
  {
    q: "Can I get video, photos or a spec sheet for boats I don't see linked yet?",
    a: "Yes — message us in the WhatsApp group and we'll get you whatever's available for that specific boat. We're adding video, photo and spec-sheet links to every listing on this page as they're ready.",
  },
];
