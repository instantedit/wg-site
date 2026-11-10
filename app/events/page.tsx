import type { Metadata } from "next";
import { Split } from "@/components/Split";
import { ArrowNE, Chevrons, Dots, Skew, Stripes } from "@/components/Decor";
import { Band, Cta, Eyebrow, GoldRule, LinkRow, Marquee, Watermark, WidePhoto } from "@/components/Sections";
import { Newsletter } from "@/components/Newsletter";
import { eventKinds, patreonPerks, site } from "@/lib/content";

export const metadata: Metadata = { title: "Events", description: "Game nights, themed events, and community meetups in Hawaiʻi. Low pressure, high connection." };

const perkIcons = [
  <path key="d" d="M19.5 5.5A16 16 0 0 0 15.6 4l-.5 1a14 14 0 0 0-6.2 0l-.5-1a16 16 0 0 0-3.9 1.5C2 9.3 1.4 13 1.7 16.6A16 16 0 0 0 6.5 19l1-1.6a10 10 0 0 1-1.6-.8l.4-.3a11.5 11.5 0 0 0 11.4 0l.4.3-1.6.8 1 1.6a16 16 0 0 0 4.8-2.4c.4-4.2-.7-7.8-2.8-11.1zM9 14.3c-.9 0-1.7-.9-1.7-2s.7-2 1.7-2 1.7.9 1.7 2-.8 2-1.7 2zm6 0c-.9 0-1.7-.9-1.7-2s.7-2 1.7-2 1.7.9 1.7 2-.8 2-1.7 2z" />,
  <path key="m" d="M3 10v4a2 2 0 0 0 2 2h2l5 4V4L7 8H5a2 2 0 0 0-2 2zm13 2h5M16.5 7.5l4-2.5M16.5 16.5l4 2.5" />,
  <path key="g" d="M6 9h12a4 4 0 0 1 4 4v1a4 4 0 0 1-7 2.6L14 16h-4l-1 .6A4 4 0 0 1 2 14v-1a4 4 0 0 1 4-4zM7 12v3M5.5 13.5h3M16 12.5h.01M18.5 14h.01" />,
  <path key="s" d="M12 3l2.7 5.6 6.1.9-4.4 4.3 1 6.1L12 17l-5.4 2.9 1-6.1L3.2 9.5l6.1-.9z" />,
];

export default function Events() {
  return (
    <>
      {/* Hero */}
      <section className="grain relative isolate overflow-hidden px-[5%] pt-[7.5rem] pb-8 md:pt-[8.5rem]" data-hero-zone>
        <Watermark text="WG" center className="top-[6rem] text-[34vw] md:top-[4rem]" />
        <Stripes className="absolute top-[36%] -left-[6%] w-[20vw] max-w-[240px]" />
        <Dots className="absolute top-[28%] -right-[4%] h-[18vw] w-[24vw] max-w-[320px]" />
        <div className="container text-center">
          <Eyebrow className="text-ink/80">
            <span data-hero="4">Events Hub / Hawai{"ʻ"}i</span>
          </Eyebrow>
          <h1 className="caps mt-5 text-h1">
            <span className="block" data-split>
              <Split text="Your" />{" "}
              <span className="relative inline-block px-[0.2em] text-night">
                <span className="slab" data-hero="5" data-hero-kind="wipe" aria-hidden />
                <span className="relative">
                  <Split text="People." />
                </span>
              </span>
            </span>
            <span className="block" data-split>
              <Split text="Your play." />
            </span>
          </h1>
          <p className="sub mt-6 text-[clamp(1.05rem,1.6vw,1.4rem)]" data-hero="6">
            Game nights, community events, and connections beyond the match.
          </p>
          <div className="mt-7 flex flex-wrap items-center justify-center gap-3" data-hero="7">
            <a href="#stay-in-the-loop" className="btn btn-gold" data-magnetic>
              See upcoming events <ArrowNE />
            </a>
            <a href={site.discord} target="_blank" rel="noopener" className="btn btn-royal" data-magnetic>
              Join Discord <ArrowNE />
            </a>
          </div>
        </div>
        <div className="relative container mt-10 grid grid-cols-[1fr_1.25fr] items-center md:mt-14">
          <div className="relative z-10 -mr-[6%]" data-hero="8" data-hero-kind="panel">
            <Skew src="/img/celebration.jpg" alt="A player celebrates with a hand-written Gen.G sign while the crowd cheers" className="aspect-[1.1/1] md:aspect-[1.5/1]" sizes="(min-width:768px) 42vw, 48vw" priority imgClass="object-[50%_35%]" />
          </div>
          <div className="relative z-20" data-hero="9" data-hero-kind="panel" data-hero-delay="0.14">
            <Skew src="/img/community.jpg" alt="Workin Gamerz members gathered at a community game night" className="aspect-[1.1/1] shadow-[var(--shadow)] md:aspect-[1.6/1]" sizes="(min-width:768px) 52vw, 56vw" priority imgClass="object-[50%_45%]" />
          </div>
        </div>
      </section>

      <Marquee text="Community + Competition + Connection" className="mt-12 md:mt-16" />

      {/* Low pressure */}
      <section className="relative overflow-hidden px-[5%] py-16 md:py-24">
        <Dots className="absolute top-[20%] -left-[4%] h-[16vw] w-[22vw] max-w-[280px] rotate-180" />
        <div className="container text-center">
          <h2 className="caps-up text-h2" data-split>
            <Split text="Low pressure.|High connection." />
          </h2>
          <GoldRule center className="mt-5" />
          <LinkRow className="mt-12" items={eventKinds} />
          <div className="reveal mt-10">
            <a href="#stay-in-the-loop" className="btn btn-gold" data-magnetic>
              Get event updates <ArrowNE />
            </a>
          </div>
        </div>
      </section>

      {/* Keep the good games going */}
      <Band tone="ink">
        <div className="text-center">
          <h2 className="caps text-h2" data-split>
            <Split text="Keep the|good games going." />
          </h2>
        </div>
        <WidePhoto src="/img/community.jpg" alt="Workin Gamerz members at a community game night" pos="object-[50%_45%]" className="mt-10 md:mt-14">
          <a href={site.youtube} target="_blank" rel="noopener" aria-label="Watch Workin Gamerz on YouTube" className="group absolute inset-0 z-10 grid place-items-center" data-cursor>
            <span className="grid size-20 place-items-center rounded-full border-2 border-white/90 bg-night/40 text-white backdrop-blur transition-transform duration-500 group-hover:scale-110" data-float>
              <svg viewBox="0 0 24 24" className="ml-1 size-8" fill="currentColor" aria-hidden>
                <path d="M7 4.5v15l12-7.5z" />
              </svg>
            </span>
          </a>
        </WidePhoto>
        <LinkRow className="mt-10" items={[{ title: "Watch WG in action" }, { title: "Twitch", href: site.twitch }, { title: "YouTube", href: site.youtube }, { title: "Past events", href: site.youtube }]} />
      </Band>

      {/* Stay in the loop */}
      <section id="stay-in-the-loop" className="relative scroll-mt-24 overflow-hidden px-[5%] py-16 md:py-20">
        <div className="container grid items-center gap-8 lg:grid-cols-[auto_1fr] lg:gap-14">
          <div className="flex items-center gap-5">
            <span className="hidden h-24 w-3 -skew-x-12 bg-purple lg:block" data-line aria-hidden />
            <h2 className="caps text-h2" data-split>
              <Split text="Stay in|the loop." />
            </h2>
          </div>
          <div className="reveal lg:border-l lg:border-line lg:pl-14">
            <p className="sub mb-4 text-[1.05rem] text-muted">Upcoming events. Community news.</p>
            <Newsletter />
          </div>
        </div>
      </section>

      {/* Patreon */}
      <Band tone="pulse">
        <div className="grid items-center gap-10 lg:grid-cols-[1fr_1.3fr]">
          <div>
            <h2 className="caps text-h2 text-white" data-split>
              <Split text="Back the|community." />
            </h2>
            <div className="reveal mt-6">
              <Cta label="Support WG on Patreon" href={site.patreon} className="btn btn-gold" />
            </div>
          </div>
          <div className="lg:border-l lg:border-white/30 lg:pl-12">
            <ul className="grid gap-6 sm:grid-cols-2" data-stagger>
              {patreonPerks.map((p, i) => (
                <li key={p} className="reveal flex items-center gap-4">
                  <svg viewBox="0 0 24 24" className="size-9 shrink-0 text-gold" fill={i === 0 || i === 2 ? "currentColor" : "none"} stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                    {perkIcons[i]}
                  </svg>
                  <span className="sub text-[1.05rem] text-white">{p}</span>
                </li>
              ))}
            </ul>
            <p className="sub reveal mt-6 text-[0.95rem] text-white/80">Monthly support. Cancel anytime.</p>
          </div>
        </div>
      </Band>
    </>
  );
}
