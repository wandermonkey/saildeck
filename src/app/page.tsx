import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";

import { Reveal } from "@/components/Reveal";
import { YachtCard } from "@/components/YachtCard";
import { Faq } from "@/components/Faq";
import { JsonLd } from "@/components/JsonLd";
import { CtaBand } from "@/components/CtaBand";
import { GoogleReviews } from "@/components/GoogleReviews";
import { HeroVideo } from "@/components/HeroVideo";
import { InstagramCarousel } from "@/components/InstagramCarousel";
import { PopularSearches } from "@/components/PopularSearches";
import { Button, Section, SectionHead, SectionTitle, Stat } from "@/components/ui";
import {
  ArrowIcon, ShieldIcon, TagIcon, HeadsetIcon, CalendarIcon,
  BoatIcon, RouteIcon, AnchorIcon, OccasionIcon, ClockIcon, WhatsAppIcon,
} from "@/components/icons";

import { yachts, inr } from "@/data/yachts";
import { destinations } from "@/data/destinations";
import { speedboatRoutes } from "@/data/speedboats";
import { posts, formatPostDate } from "@/data/blog";
import { charterOccasions } from "@/data/company";
import { site, whatsappLink } from "@/lib/site";
import { buildMetadata, faqSchema } from "@/lib/seo";
import { getReviews } from "@/lib/reviews";

export const metadata: Metadata = buildMetadata({
  title: "Yacht Rental Mumbai & Goa | Boat Charter & Speedboat Hire — Saildeck",
  description:
    "Rent a private yacht in Mumbai, Navi Mumbai or Goa from ₹2,999/hour with captain and crew. Speedboats to Elephanta and Alibaug, yacht sales, management and sailing school. Book on WhatsApp.",
  path: "/",
});

const homeFaqs = [
  {
    q: "How much does it cost to rent a yacht in Mumbai?",
    a: "Saildeck yachts in Mumbai start at ₹11,900 per hour and run to ₹33,000 per hour for the flagship. That is per boat, not per person — the captain, crew, fuel for the standard route and life jackets are all included. Catering, decoration and water sports are quoted separately.",
  },
  {
    q: "How do I book a yacht with Saildeck?",
    a: "Send us your date, city and group size on WhatsApp or through the enquiry form. We come back with the boats that are genuinely free, a firm price and a boarding point, usually within the hour. A deposit then holds the slot.",
  },
  {
    q: "What does the hourly charter price include?",
    a: "Captain, crew, fuel for the standard route, life jackets for every guest and the on-board sound system. Catering, decoration, photography, water sports and extra hours are quoted separately so you only pay for what you use.",
  },
  {
    q: "Which cities does Saildeck operate in?",
    a: "Mumbai, Navi Mumbai and Goa are our home ports, with our own boats and crew. Elsewhere along the Indian coast — Kochi, the Andamans and Lakshadweep — we arrange charters through operators we have vetted ourselves.",
  },
  {
    q: "Do you only do yacht charters?",
    a: "No. Charters and speedboat transfers are the visible half. We also broker yacht sales, manage vessels for owners, run refit, repair and monsoon storage, consult on marina development and teach sailing.",
  },
  {
    q: "When is the boating season in India?",
    a: "October to May on the west coast. The southwest monsoon closes charter operations from June to September, which is when refit, repair and monsoon layup work happens instead.",
  },
  {
    q: "How far in advance should I book a boat?",
    a: "Weekday charters can often be arranged the same week. Weekend slots, sunset departures and anything in December need two to three weeks' notice.",
  },
];

const services = [
  { href: "/fleet", title: "Yacht charters", blurb: "Private hire by the hour from Mumbai, Navi Mumbai and Goa.", icon: <BoatIcon className="h-6 w-6" /> },
  { href: "/speedboats", title: "Speedboat transfers", blurb: "Elephanta, Alibaug and Navi Mumbai — fast, private, on your timing.", icon: <RouteIcon className="h-6 w-6" /> },
  { href: "/yachts", title: "Buy & sell yachts", blurb: "Brokerage for motor yachts, sailing yachts and speedboats.", icon: <TagIcon className="h-6 w-6" /> },
  { href: "/management/yacht-management", title: "Yacht management", blurb: "Crew, compliance, maintenance and berthing, handled.", icon: <ShieldIcon className="h-6 w-6" /> },
  { href: "/about/sailing-school", title: "Sailing school", blurb: "Learn to sail, and the RYA course ladder beyond it.", icon: <AnchorIcon className="h-6 w-6" /> },
  { href: "/about/marinas", title: "Marinas & jetties", blurb: "Where we berth, and consultancy for new waterfronts.", icon: <CalendarIcon className="h-6 w-6" /> },
];

export default async function HomePage() {
  const reviews = await getReviews();
  const featured = yachts.slice(0, 6);

  return (
    <>
      <JsonLd data={faqSchema(homeFaqs)} />

      {/* ================= HERO ================= */}
      <section className="relative flex min-h-[74vh] items-center overflow-hidden">
        <HeroVideo />
        {/* Kept deliberately faint — just enough to seat the text panel, not
            enough to hide the footage behind it. */}
        <div className="absolute inset-0 bg-gradient-to-r from-navy-deep/35 via-navy-deep/8 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-navy-deep/30 via-transparent to-navy-deep/15" />

        <div className="container-x relative z-10 py-16 md:py-20">
          {/* Panel is smaller and less opaque than before, and the blur is
              gone entirely — the video needs to read clearly through it, not
              just around its edges. */}
          <Reveal className="max-w-xl rounded-2xl bg-navy-deep/38 p-5 md:p-7">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-teal">
              Mumbai · Navi Mumbai · Goa
            </p>

            <h1
              className="mt-3 text-3xl font-bold uppercase leading-[1.02] tracking-tight text-white [text-shadow:0_2px_16px_rgba(6,28,46,0.65)] sm:text-4xl md:text-[2.75rem]"
              style={{ fontFamily: "var(--font-inter)" }}
            >
              Yacht rental
              <br />
              in Mumbai &amp; Goa
            </h1>
            <p className="mt-1.5 font-display text-2xl italic text-teal [text-shadow:0_2px_12px_rgba(6,28,46,0.5)] sm:text-3xl md:text-[2.2rem]">
              Live the journey.
            </p>

            <p className="mt-4 max-w-lg text-sm leading-relaxed text-white/90 [text-shadow:0_1px_8px_rgba(6,28,46,0.6)] sm:text-base">
              Private yacht charters from {inr(2999)} an hour with licensed captain and
              crew, speedboat transfers to Elephanta and Alibaug, and a full marine
              services business behind it.
            </p>

            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <Button href="/fleet" size="lg" dataCta="hero-primary">
                Explore the fleet <ArrowIcon className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
              <Button href={whatsappLink()} variant="light" size="lg" external dataCta="hero-whatsapp">
                <WhatsAppIcon className="h-5 w-5" />
                WhatsApp us
              </Button>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ================= QUICK LINKS BAR ================= */}
      <div className="relative z-20 -mt-10 md:-mt-12">
        <div className="container-x">
          <div className="grid overflow-hidden rounded-2xl border border-line bg-white shadow-[var(--shadow-float)] sm:grid-cols-2 lg:grid-cols-4">
            {[
              { href: "/fleet", label: "Charter a yacht", note: `From ${inr(2999)}/hour`, icon: <BoatIcon className="h-5 w-5" /> },
              { href: "/speedboats", label: "Book a speedboat", note: "Elephanta · Alibaug", icon: <RouteIcon className="h-5 w-5" /> },
              { href: "/yachts", label: "Buy or sell a yacht", note: "Brokerage & new builds", icon: <TagIcon className="h-5 w-5" /> },
              { href: "/contact", label: "Talk to us", note: site.phoneDisplay, icon: <HeadsetIcon className="h-5 w-5" /> },
            ].map((q) => (
              <Link
                key={q.href}
                href={q.href}
                data-cta="quickbar"
                className="group flex items-center gap-4 border-line p-5 transition-colors hover:bg-surface sm:border-r sm:last:border-r-0 lg:p-6"
              >
                <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-crimson-soft text-crimson transition-colors group-hover:bg-crimson group-hover:text-white">
                  {q.icon}
                </span>
                <span className="min-w-0">
                  <span className="block text-sm font-semibold text-navy">{q.label}</span>
                  <span className="block truncate text-xs text-muted">{q.note}</span>
                </span>
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* ================= FLEET ================= */}
      <Section>
        <div className="container-x">
          <Reveal>
            <SectionHead
              eyebrow="Our fleet"
              title="Yachts and boats for"
              accent="charter"
              sub="Every boat is inspected, crewed and priced by the hour. Filter by group size, or tell us the occasion and we will pick for you."
              linkHref="/fleet"
              linkLabel="View all boats"
            />
          </Reveal>

          <div className="mt-11 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {featured.map((y, i) => (
              <Reveal key={y.slug} delay={(i % 3) * 80}>
                <YachtCard yacht={y} priority={i < 3} />
              </Reveal>
            ))}
          </div>
        </div>
      </Section>

      {/* ================= OCCASIONS ================= */}
      <Section tone="surface">
        <div className="container-x">
          <Reveal>
            <SectionHead
              eyebrow="Occasions"
              title="Come aboard for a"
              accent="reason"
              sub="Sunsets, birthdays, proposals, offsites. We have run all of them often enough to know what usually goes wrong, and to plan around it."
              linkHref="/charters"
              linkLabel="All charter types"
            />
          </Reveal>

          <div className="mt-11 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {charterOccasions.map((o, i) => (
              <Reveal key={o.name} delay={(i % 3) * 70}>
                <Link
                  href="/charters"
                  data-cta="occasion-card"
                  className="card card-hover group flex h-full flex-col overflow-hidden"
                >
                  <div className="relative aspect-[16/10] overflow-hidden bg-surface-2">
                    <Image
                      src={o.image}
                      alt={o.imageAlt}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      className="object-cover transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-105"
                    />
                    <span className="absolute left-3 top-3 grid h-10 w-10 place-items-center rounded-full bg-white/95 text-crimson shadow-sm backdrop-blur">
                      <OccasionIcon name={o.icon} className="h-5 w-5" />
                    </span>
                    <span className="absolute bottom-3 right-3 flex items-center gap-1.5 rounded-full bg-white/95 px-3 py-1 text-[11px] font-medium text-navy shadow-sm backdrop-blur">
                      <ClockIcon className="h-3 w-3" />
                      {o.duration}
                    </span>
                  </div>

                  <div className="flex flex-1 flex-col p-6">
                    <h3 className="font-display text-lg transition-colors group-hover:text-crimson">{o.name}</h3>
                    <p className="mt-2 flex-1 text-sm leading-relaxed text-muted">{o.blurb}</p>
                    <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-crimson transition-all group-hover:gap-3">
                      Plan this <ArrowIcon className="h-3.5 w-3.5" />
                    </span>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </Section>

      {/* ================= SERVICES ================= */}
      <Section>
        <div className="container-x">
          <Reveal>
            <SectionTitle
              align="center"
              eyebrow="What we do"
              title="A full marine business,"
              accent="not just a boat"
              sub="Charters are how most people meet us. Owners, developers and sailors know us for the rest."
            />
          </Reveal>

          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((s, i) => (
              <Reveal key={s.href} delay={(i % 3) * 70}>
                <Link href={s.href} data-cta="service-card" className="card card-hover group flex h-full flex-col p-7">
                  <span className="grid h-12 w-12 place-items-center rounded-xl bg-crimson-soft text-crimson transition-colors group-hover:bg-crimson group-hover:text-white">
                    {s.icon}
                  </span>
                  <h3 className="mt-5 font-display text-xl transition-colors group-hover:text-crimson">{s.title}</h3>
                  <p className="mt-2 flex-1 text-sm leading-relaxed text-muted">{s.blurb}</p>
                  <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-medium text-crimson transition-all group-hover:gap-3">
                    Learn more <ArrowIcon className="h-3.5 w-3.5" />
                  </span>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </Section>

      {/* ================= TRUST STRIP ================= */}
      <Section tone="surface" className="!py-12">
        <div className="container-x grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { icon: <TagIcon className="h-6 w-6" />, title: "Transparent pricing", body: "The rate you are quoted is the rate you pay. Add-ons agreed before any deposit." },
            { icon: <ShieldIcon className="h-6 w-6" />, title: "Licensed crew", body: "Certified captains and coast-guard-compliant safety gear on every departure." },
            { icon: <HeadsetIcon className="h-6 w-6" />, title: "One point of contact", body: "The person who answers your first message sees the booking through to boarding." },
            { icon: <CalendarIcon className="h-6 w-6" />, title: "Free weather reschedule", body: "If the coast guard suspends sailing, you move your date at no cost." },
          ].map((f, i) => (
            <Reveal key={f.title} delay={i * 70}>
              <div className="flex gap-4">
                <span className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-white text-teal shadow-sm">{f.icon}</span>
                <div>
                  <h3 className="font-display text-base font-semibold">{f.title}</h3>
                  <p className="mt-1 text-sm leading-relaxed text-muted">{f.body}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* ================= SPEEDBOAT PROMO ================= */}
      <section className="relative overflow-hidden bg-navy py-16 md:py-20">
        <div className="grid-lines absolute inset-0" aria-hidden="true" />
        <div className="container-x relative">
          <div className="grid gap-10 lg:grid-cols-[1fr_1.15fr] lg:items-center">
            <Reveal>
              <div className="relative aspect-[16/11] overflow-hidden rounded-2xl">
                <Image
                  src="https://images.unsplash.com/photo-1597154200389-d7ac4c75e180?auto=format&fit=crop&w=1400&q=80"
                  alt="Private speedboat under way at speed across Mumbai harbour"
                  fill
                  sizes="(max-width: 1024px) 100vw, 45vw"
                  className="object-cover"
                />
              </div>
            </Reveal>

            <Reveal delay={120}>
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-teal">Speedboat transfers</p>
              <h2 className="mt-3 text-3xl leading-tight text-white md:text-[2.4rem]">
                Beat the traffic. <span className="italic font-normal text-white/80">Take the water.</span>
              </h2>
              <p className="mt-4 max-w-lg leading-relaxed text-white/70">
                Alibaug in twenty minutes instead of three hours. Elephanta without the
                ferry queue. Private boats, your timing, fixed price for the whole boat.
              </p>

              <div className="mt-8 space-y-3">
                {speedboatRoutes.map((r) => (
                  <Link
                    key={r.slug}
                    href={`/speedboats/${r.slug}`}
                    data-cta="speedboat-row"
                    className="group flex items-center justify-between gap-4 rounded-xl border border-white/12 bg-white/5 p-4 transition-colors hover:border-teal/50 hover:bg-white/10"
                  >
                    <div className="min-w-0">
                      <p className="truncate font-medium text-white">{r.name}</p>
                      <p className="text-sm text-white/55">{r.duration} · {r.capacity}</p>
                    </div>
                    <div className="shrink-0 text-right">
                      <p className="text-sm font-semibold text-teal">{inr(r.priceOneWay)}</p>
                      <p className="text-xs text-white/45">one way</p>
                    </div>
                  </Link>
                ))}
              </div>

              <div className="mt-8">
                <Button href="/speedboats" variant="light" dataCta="speedboat-all">
                  All speedboat routes <ArrowIcon className="h-4 w-4" />
                </Button>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ================= DESTINATIONS ================= */}
      <Section>
        <div className="container-x">
          <Reveal>
            <SectionHead
              eyebrow="Destinations"
              title="Where we"
              accent="sail"
              sub="Boarding points across Mumbai, Navi Mumbai and Goa, plus arranged charters along the rest of the Indian coast."
              linkHref="/destinations"
              linkLabel="All destinations"
            />
          </Reveal>

          <div className="mt-11 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {destinations.map((d, i) => (
              <Reveal key={d.slug} delay={(i % 4) * 70}>
                <Link
                  href={`/destinations/${d.slug}`}
                  data-cta="destination-card"
                  className="group relative block aspect-[3/4] overflow-hidden rounded-2xl"
                >
                  <Image
                    src={d.image}
                    alt={d.imageAlt}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    className="object-cover transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-105"
                  />
                  {/* Only the bottom third is darkened — the photo stays clear. */}
                  <div className="absolute inset-x-0 bottom-0 h-2/5 bg-gradient-to-t from-navy-deep/90 to-transparent" />
                  <div className="absolute inset-x-0 bottom-0 p-5">
                    <h3 className="font-display text-xl text-white">{d.name}</h3>
                    <p className="mt-1 text-xs text-white/70">{d.facts[0].value} · {d.facts[1].value}</p>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </Section>

      {/* ================= GOOGLE REVIEWS ================= */}
      <GoogleReviews data={reviews} />

      {/* ================= INSTAGRAM ================= */}
      <InstagramCarousel />

      {/* ================= STATS ================= */}
      <Section>
        <div className="container-x grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { value: "9", label: "Boats in the charter fleet" },
            { value: "3", label: "Home ports on the west coast" },
            { value: "< 1 hr", label: "Typical reply time" },
            { value: "100%", label: "Licensed captains" },
          ].map((s, i) => (
            <Reveal key={s.label} delay={i * 70}>
              <Stat value={s.value} label={s.label} />
            </Reveal>
          ))}
        </div>
      </Section>

      {/* ================= BLOG ================= */}
      <Section tone="surface">
        <div className="container-x">
          <Reveal>
            <SectionHead
              eyebrow="Journal"
              title="Guides worth"
              accent="reading first"
              linkHref="/blog"
              linkLabel="Read the blog"
            />
          </Reveal>

          <div className="mt-11 grid gap-6 md:grid-cols-3">
            {posts.slice(0, 3).map((p, i) => (
              <Reveal key={p.slug} delay={i * 80}>
                <Link href={`/blog/${p.slug}`} data-cta="blog-card" className="card card-hover group flex h-full flex-col overflow-hidden">
                  <div className="relative aspect-[16/10] overflow-hidden bg-surface-2">
                    <Image
                      src={p.image}
                      alt={p.imageAlt}
                      fill
                      sizes="(max-width: 768px) 100vw, 33vw"
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  </div>
                  <div className="flex flex-1 flex-col p-6">
                    <p className="text-xs font-semibold uppercase tracking-wider text-crimson">{p.category}</p>
                    <h3 className="mt-2 font-display text-lg leading-snug transition-colors group-hover:text-crimson">{p.title}</h3>
                    <p className="mt-2 line-clamp-2 flex-1 text-sm leading-relaxed text-muted">{p.excerpt}</p>
                    <p className="mt-4 text-xs text-faint">{formatPostDate(p.date)} · {p.readMins} min read</p>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </Section>

      {/* ================= FAQ ================= */}
      <Section>
        <div className="container-x">
          <Reveal>
            <SectionTitle align="center" eyebrow="Questions" title="Everything people" accent="ask us first" />
          </Reveal>
          <Reveal delay={100}>
            <div className="mx-auto mt-10 max-w-3xl">
              <Faq faqs={homeFaqs} />
            </div>
          </Reveal>
        </div>
      </Section>

      <PopularSearches />

      <CtaBand />
    </>
  );
}
