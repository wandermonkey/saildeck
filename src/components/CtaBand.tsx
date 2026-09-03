import { Button } from "./ui";
import { ArrowIcon, WhatsAppIcon, PhoneIcon } from "./icons";
import { whatsappLink, telLink, site } from "@/lib/site";
import { Reveal } from "./Reveal";

/**
 * The mid-page call to action, dropped into every template so no page can ship
 * without a clear next step — that was a hard requirement for this build.
 */
export function CtaBand({
  title = "Ready when you are",
  accent = "Let us check the date.",
  sub = "Tell us when, where and how many. We come back with options and a firm price, usually within the hour.",
  whatsappMessage,
}: {
  title?: string;
  accent?: string;
  sub?: string;
  whatsappMessage?: string;
}) {
  return (
    <section className="relative overflow-hidden bg-navy py-16 md:py-20">
      <div className="grid-lines absolute inset-0" aria-hidden="true" />
      <div
        className="absolute -right-24 top-1/2 h-80 w-80 -translate-y-1/2 rounded-full bg-crimson/25 blur-[100px]"
        aria-hidden="true"
      />

      <div className="container-x relative">
        <Reveal>
          <div className="flex flex-col items-center gap-8 text-center lg:flex-row lg:justify-between lg:text-left">
            <div className="max-w-2xl">
              <h2 className="text-3xl leading-tight text-white md:text-[2.4rem]">
                {title} <span className="italic font-normal text-white/80">{accent}</span>
              </h2>
              <p className="mt-4 leading-relaxed text-white/70">{sub}</p>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row lg:shrink-0 lg:flex-col xl:flex-row">
              <Button href="/contact" size="lg" dataCta="cta-band-primary">
                Enquire now <ArrowIcon />
              </Button>
              <Button href={whatsappLink(whatsappMessage)} variant="whatsapp" size="lg" external dataCta="cta-band-whatsapp">
                <WhatsAppIcon className="h-5 w-5" />
                WhatsApp
              </Button>
              <a
                href={telLink}
                data-cta="cta-band-call"
                className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full px-8 py-4 text-base font-medium text-white ring-1 ring-white/25 transition-all hover:-translate-y-0.5 hover:bg-white/10"
              >
                <PhoneIcon className="h-4 w-4" />
                {site.phoneDisplay}
              </a>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
