import type { Metadata } from "next";
import { Split } from "@/components/Split";
import { ArrowNE, Dots, Skew, Stripes } from "@/components/Decor";
import { Band, Cta, CtaBand, Eyebrow, GoldRule, PhotoRow, StepsRow, Tag, Watermark } from "@/components/Sections";
import { Bracket } from "@/components/Bracket";
import { Wizard } from "@/components/Wizard";
import { companyPlay } from "@/lib/wizards";
import { site, tournamentSteps } from "@/lib/content";

export const metadata: Metadata = { title: "Tournaments", description: "One-day esports tournaments in Hawaiʻi. A full competitive experience with no full-season commitment." };

export default function Tournaments() {
  return (
    <>
      {/* Hero on ink in both themes */}
      <section className="scheme-ink relative isolate overflow-hidden px-[5%] pt-[7.5rem] pb-10 md:pt-[8.5rem] md:pb-14" data-hero-zone>
        <Watermark text="Tournaments" outline center className="top-[7.5rem] text-[11.5vw] md:top-[7rem]" />
        <Stripes className="absolute top-[30%] -left-[6%] w-[20vw] max-w-[240px]" />
        <Dots className="absolute top-[22%] -right-[4%] h-[18vw] w-[24vw] max-w-[320px]" />
        <div className="container text-center">
          <Eyebrow className="text-ink/80">
            <span data-hero="4">Competition Hub / Tournaments</span>
          </Eyebrow>
          <h1 className="caps mt-5 text-h1">
            <span className="block" data-split>
              <Split text="One day." />
            </span>
            <span className="block" data-split>
              <Split text="All game." />
            </span>
          </h1>
          <p className="sub mt-6 text-[clamp(1.05rem,1.6vw,1.4rem)]" data-hero="6">
            A full competitive experience. No full-season commitment.
          </p>
          <div className="mt-7 flex flex-wrap items-center justify-center gap-3" data-hero="7">
            <a href="#path" className="btn btn-gold" data-magnetic>
              Explore tournaments <ArrowNE />
            </a>
            <Cta label="Competition FAQ" href="/contact?topic=Tournaments" className="btn btn-outline" />
          </div>
        </div>
        <PhotoRow
          photos={[
            { src: "/img/player-focus.jpg", alt: "A competitive player in a gaming headset", pos: "object-[60%_40%]" },
            { src: "/img/gameplay.jpg", alt: "Gameplay on a competition monitor", pos: "object-[50%_40%]" },
            { src: "/img/headset-player.jpg", alt: "A player wearing a HyperX headset mid-match", pos: "object-[45%_40%]" },
          ]}
        />
      </section>

      {/* Bracket */}
      <section id="path" className="relative scroll-mt-24 overflow-hidden px-[5%] py-16 md:py-24">
        <Dots className="absolute -bottom-[2%] -left-[4%] h-[16vw] w-[22vw] max-w-[280px] rotate-180" />
        <Stripes className="absolute -right-[4%] bottom-[8%] w-[16vw] max-w-[200px]" flip />
        <div className="container">
          <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <div>
              <h2 className="caps text-h2" data-split>
                <Split text="Your path|to the finals." />
              </h2>
              <GoldRule className="mt-5" />
            </div>
            <Tag className="reveal w-fit text-[1.05rem]">Bracket-style competition</Tag>
          </div>
          <div className="mt-12 md:mt-16">
            <Bracket />
          </div>
        </div>
      </section>

      {/* Steps */}
      <Band tone="pulse" className="!py-12 md:!py-14">
        <StepsRow steps={tournamentSteps} note="Structured, single-day competition built for working adults." />
      </Band>

      {/* Big moments */}
      <section className="relative overflow-hidden px-[5%] py-16 md:py-24">
        <div className="container grid items-center gap-10 lg:grid-cols-[1fr_1.5fr]">
          <div>
            <h2 className="caps text-h2" data-split>
              <Split text="Big moments.|Real|community." />
            </h2>
            <p className="sub reveal mt-5 max-w-[22rem] text-[1.05rem] text-muted">Featured matches, streams, and community recognition.</p>
            <div className="reveal mt-6 flex flex-col items-start gap-3">
              <Cta label="Watch WG in action" href={site.twitch} className="btn btn-gold btn-sm" />
              <Cta label="Explore past events" href={site.youtube} className="btn btn-gold btn-sm" />
            </div>
          </div>
          <div className="relative" data-clip="right">
            <Stripes className="absolute -top-[8%] -right-[4%] z-20 w-[12vw] max-w-[140px]" />
            <Skew src="/img/celebration.jpg" alt="A player celebrates with a hand-written Gen.G sign while the crowd cheers" className="aspect-[4/3] md:aspect-[1.9/1]" sizes="(min-width:1024px) 58vw, 90vw" imgClass="object-[50%_35%]" tilt={false} />
          </div>
        </div>
      </section>

      {/* Company tournaments + wizard */}
      <Band tone="ink" id="company">
        <div className="text-center">
          <h2 className="caps text-h2" data-split>
            <Split text="Your company.|Your competition." />
          </h2>
          <div className="reveal mt-6 flex flex-col items-center gap-3">
            <Tag tone="outline" className="text-gold">Company tournaments • Coming soon</Tag>
            <p className="sub text-[1.05rem] text-ink/85">Custom formats for your team, culture, and schedule.</p>
          </div>
        </div>
        <div className="reveal mt-10">
          <Wizard config={companyPlay} />
        </div>
      </Band>

      <CtaBand title="Ready to|run it back?" button={{ label: "Contact WG", href: "/contact" }} />
    </>
  );
}
