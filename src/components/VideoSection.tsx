"use client";

import { useState } from "react";
import type { VideoRef } from "@/data/yachts";
import { PlayIcon } from "./icons";
import { SectionTitle } from "./ui";

/**
 * Video block shown under the boat description.
 *
 * Two kinds of source:
 *  - self-hosted (`src`/`webm`/`poster` in /public/videos) — Saildeck's own
 *    footage, served from the site;
 *  - YouTube (`youtubeId`) — a "lite embed": only the poster renders until
 *    someone presses play, because a cold YouTube iframe pulls well over a
 *    megabyte of script.
 *
 * Either way nothing heavy loads until the visitor asks for it.
 */
export function VideoSection({
  videos,
  title = "Watch the",
  accent = "walkthrough",
  eyebrow = "Video",
}: {
  videos: VideoRef[];
  title?: string;
  accent?: string;
  eyebrow?: string;
}) {
  const [playing, setPlaying] = useState<string | null>(null);

  if (videos.length === 0) {
    if (process.env.NODE_ENV === "production") return null;
    return (
      <section className="border-t border-line bg-surface py-14">
        <div className="container-x">
          <div className="rounded-2xl border-2 border-dashed border-line p-10 text-center">
            <p className="eyebrow">Video section</p>
            <h2 className="mt-3 font-display text-xl">This is where boat videos will appear</h2>
            <p className="mx-auto mt-3 max-w-lg text-sm leading-relaxed text-muted">
              Add entries to the <code className="text-crimson">videos</code> array for this boat
              in <code className="text-crimson">src/data/yachts.ts</code> — a self-hosted file in
              /public/videos or a YouTube id — and the section renders automatically. This
              placeholder is hidden in production.
            </p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="border-t border-line bg-surface py-16 md:py-20">
      <div className="container-x">
        <SectionTitle
          eyebrow={eyebrow}
          title={title}
          accent={accent}
          sub="Walkthroughs and on-board footage, so you know exactly what you are booking."
        />

        <div className={`mt-10 grid gap-6 ${videos.length > 1 ? "md:grid-cols-2" : "max-w-4xl"}`}>
          {videos.map((v) => {
            const id = v.youtubeId ?? v.src ?? v.title;
            const poster = v.poster ?? (v.youtubeId ? `https://i.ytimg.com/vi/${v.youtubeId}/maxresdefault.jpg` : undefined);
            const isPlaying = playing === id;

            return (
              <figure key={id} className="overflow-hidden rounded-2xl border border-line bg-black shadow-[var(--shadow-card)]">
                <div className="relative aspect-video">
                  {isPlaying && v.youtubeId ? (
                    <iframe
                      src={`https://www.youtube-nocookie.com/embed/${v.youtubeId}?autoplay=1&rel=0`}
                      title={v.title}
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                      className="absolute inset-0 h-full w-full"
                    />
                  ) : isPlaying ? (
                    <video
                      controls
                      autoPlay
                      playsInline
                      poster={poster}
                      preload="metadata"
                      className="absolute inset-0 h-full w-full bg-black"
                    >
                      {v.webm && <source src={v.webm} type="video/webm" />}
                      {v.src && <source src={v.src} type="video/mp4" />}
                    </video>
                  ) : (
                    <button
                      type="button"
                      onClick={() => setPlaying(id)}
                      className="group absolute inset-0 h-full w-full"
                      aria-label={`Play video: ${v.title}`}
                      data-cta="video-play"
                    >
                      {/* Plain img: posters are either a YouTube CDN asset or a
                          small static file, neither of which needs next/image. */}
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      {poster && (
                        <img
                          src={poster}
                          alt=""
                          loading="lazy"
                          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                        />
                      )}
                      <span className="absolute inset-0 grid place-items-center bg-navy-deep/20 transition-colors group-hover:bg-navy-deep/10">
                        <span className="grid h-16 w-16 place-items-center rounded-full bg-crimson pl-1 text-white shadow-lg transition-transform group-hover:scale-110">
                          <PlayIcon className="h-6 w-6" />
                        </span>
                      </span>
                    </button>
                  )}
                </div>
                <figcaption className="bg-white px-5 py-4 text-sm font-medium text-navy">{v.title}</figcaption>
              </figure>
            );
          })}
        </div>
      </div>
    </section>
  );
}
