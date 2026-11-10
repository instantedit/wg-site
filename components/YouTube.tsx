"use client";

/* Click-to-play YouTube embed. Shows the poster and a play button first, then swaps in the
   privacy-enhanced player, so the page does not load YouTube until someone wants to watch. */
import { useState } from "react";
import Image from "next/image";

export function YouTube({ id, title, poster }: { id: string; title: string; poster: string }) {
  const [playing, setPlaying] = useState(false);
  return (
    <div className="relative aspect-video w-full overflow-hidden rounded-[1.25rem] border border-line bg-night shadow-[var(--shadow)]">
      {playing ? (
        <iframe
          className="absolute inset-0 size-full"
          src={`https://www.youtube-nocookie.com/embed/${id}?autoplay=1&rel=0&playsinline=1`}
          title={title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen
        />
      ) : (
        <button type="button" onClick={() => setPlaying(true)} className="group absolute inset-0 block size-full text-left" aria-label={`Play video: ${title}`} data-cursor>
          <Image src={poster} alt="" fill sizes="(min-width:1024px) 70vw, 92vw" quality={85} className="object-cover transition-transform duration-[1.4s] ease-[cubic-bezier(.2,.8,.2,1)] group-hover:scale-[1.04]" />
          <span className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(11,13,19,.15),rgba(11,13,19,.55))]" aria-hidden />
          <span className="absolute top-1/2 left-1/2 grid size-20 -translate-x-1/2 -translate-y-1/2 place-items-center md:size-24" aria-hidden>
            <span className="absolute inset-0 animate-ping rounded-full bg-gold/40 [animation-duration:2.2s] motion-reduce:animate-none" />
            <span className="relative grid size-full place-items-center rounded-full bg-gold text-night shadow-[0_12px_30px_rgba(0,0,0,.45)] transition-transform duration-500 group-hover:scale-110">
              <svg viewBox="0 0 24 24" className="ml-1 size-9" fill="currentColor">
                <path d="M7 4.5v15l12-7.5z" />
              </svg>
            </span>
          </span>
        </button>
      )}
    </div>
  );
}
