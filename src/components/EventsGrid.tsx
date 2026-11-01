"use client";

import { useState } from "react";
import { EventCard } from "./EventCard";
import { EventModal } from "./EventModal";
import type { SaildeckEvent } from "@/data/events";

export function EventsGrid({ events }: { events: SaildeckEvent[] }) {
  const [selected, setSelected] = useState<SaildeckEvent | null>(null);

  return (
    <>
      <div className="grid grid-cols-2 gap-3 sm:gap-5 md:grid-cols-3 xl:grid-cols-4">
        {events.map((event, i) => (
          <EventCard key={event.slug} event={event} onOpen={setSelected} priority={i < 4} />
        ))}
      </div>

      <EventModal event={selected} onClose={() => setSelected(null)} />
    </>
  );
}
