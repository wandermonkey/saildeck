import Link from "next/link";
import { Button } from "@/components/ui";
import { ArrowIcon } from "@/components/icons";

export default function NotFound() {
  return (
    <section className="flex min-h-[68vh] items-center bg-surface py-20">
      <div className="container-x text-center">
        <p className="eyebrow">Off course</p>
        <h1 className="mx-auto mt-4 max-w-2xl text-4xl leading-[1.06] md:text-6xl">
          This page has <span className="italic font-normal text-crimson">drifted</span>
        </h1>
        <p className="mx-auto mt-5 max-w-md text-muted">
          The link is broken or the page has moved. The fleet is still where you left it.
        </p>

        <div className="mt-9 flex flex-col justify-center gap-3 sm:flex-row">
          <Button href="/fleet" size="lg">
            Browse the fleet <ArrowIcon className="h-4 w-4" />
          </Button>
          <Button href="/" variant="outline" size="lg">
            Back to home
          </Button>
        </div>

        <div className="mt-12 flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm text-faint">
          {[
            { href: "/destinations/mumbai", label: "Yacht rental Mumbai" },
            { href: "/destinations/goa", label: "Yacht rental Goa" },
            { href: "/speedboats", label: "Speedboats" },
            { href: "/yachts", label: "Buy & sell yachts" },
            { href: "/contact", label: "Contact" },
          ].map((l) => (
            <Link key={l.href} href={l.href} className="transition-colors hover:text-crimson">
              {l.label}
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
