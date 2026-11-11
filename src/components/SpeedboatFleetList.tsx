import Image from "next/image";
import type { SpeedboatFleetEntry } from "@/data/speedboatFleet";
import { inr } from "@/data/yachts";
import { whatsappLink } from "@/lib/site";
import { Reveal } from "./Reveal";
import { Pill } from "./ui";
import { WhatsAppIcon } from "./icons";

/**
 * One row per boat: photo on one side, a pricing table on the other,
 * alternating sides boat to boat. Sibling to the 3 route cards above it on
 * /speedboats, but this list is "which boat", not "which route".
 */
export function SpeedboatFleetList({ boats }: { boats: SpeedboatFleetEntry[] }) {
  return (
    <div className="space-y-6">
      {boats.map((boat, i) => {
        const reversed = i % 2 === 1;
        const onRequestLink = (label: string) =>
          whatsappLink(`Hi Saildeck! I'd like a price for ${label} on the ${boat.name}.`);

        return (
          <Reveal key={boat.slug} delay={(i % 2) * 70}>
            <div className="card grid overflow-hidden md:grid-cols-[0.8fr_1.2fr]">
              <div
                className={`relative aspect-[16/10] md:aspect-auto md:min-h-[17rem] ${
                  reversed ? "md:order-2" : ""
                }`}
              >
                <Image
                  src={boat.image}
                  alt={boat.imageAlt}
                  fill
                  sizes="(max-width: 768px) 100vw, 40vw"
                  className="object-cover"
                />
              </div>

              <div className={`flex flex-col justify-center p-7 md:p-9 ${reversed ? "md:order-1" : ""}`}>
                <div className="flex flex-wrap items-center gap-2">
                  <Pill tone="crimson">Up to {boat.capacity} guests</Pill>
                </div>

                <h3 className="mt-3 font-display text-2xl md:text-[1.7rem]">{boat.name}</h3>

                <table className="mt-5 w-full text-sm">
                  <tbody className="divide-y divide-line">
                    <tr>
                      <td className="py-2.5 pr-4 text-muted">Capacity</td>
                      <td className="py-2.5 text-right font-medium text-navy">{boat.capacity} guests</td>
                    </tr>
                    {boat.routePrices.map((rp) => (
                      <tr key={rp.route}>
                        <td className="py-2.5 pr-4 text-muted">{rp.route} (one way)</td>
                        <td className="py-2.5 text-right font-medium text-navy">{inr(rp.price)}</td>
                      </tr>
                    ))}
                    <tr>
                      <td className="py-2.5 pr-4 text-muted">Return trip</td>
                      <td className="py-2.5 text-right">
                        <a
                          href={onRequestLink("a return trip")}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 font-medium text-crimson hover:underline"
                        >
                          <WhatsAppIcon className="h-3.5 w-3.5" /> On request
                        </a>
                      </td>
                    </tr>
                    <tr>
                      <td className="py-2.5 pr-4 text-muted">Harbour cruising (30 min)</td>
                      <td className="py-2.5 text-right">
                        <a
                          href={onRequestLink("a 30-minute harbour cruise")}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 font-medium text-crimson hover:underline"
                        >
                          <WhatsAppIcon className="h-3.5 w-3.5" /> On request
                        </a>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </Reveal>
        );
      })}
    </div>
  );
}
