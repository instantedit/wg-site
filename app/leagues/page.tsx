import type { Metadata } from "next";
import Link from "next/link";
import { Split } from "@/components/Split";
import { ArrowNE, Dots, Skew, Stripes } from "@/components/Decor";
import { Band, Cta, Eyebrow, GoldRule, LinkRow, NumberedList, PhotoStack, Tag, Watermark } from "@/components/Sections";
import { Calendar } from "@/components/Calendar";
import { Wizard } from "@/components/Wizard";
import { leagueFinder } from "@/lib/wizards";
import { leagueFeatures, site, squadSteps } from "@/lib/content";

export const metadata: Metadata = { title: "Leagues", description: "Structured esports seasons for working adults in Hawaiʻi. Weekly matches, a regular season, and playoffs built around real-life schedules." };

export default function Leagues() {
  return (
    <>
      {/* Hero */}
      <section className="grain relative isolate overflow-hidden px-[5%] pt-[7.5rem] pb-10 md:pt-[8.5rem] md:pb-14" data-hero-zone>
        <Watermark text="01" outline className="top-[5rem] left-[22%] text-[26vw] md:top-[3rem]" />
        <Stripes className="absolute top-[24%] -left-[6%] w-[20vw] max-w-[240px]" />
        <Dots className="absolute right-0 bottom-[10%] h-[18vw] w-[24vw] max-w-[320px]" />
        <div className="container grid items-center gap-10 lg:grid-cols-[1fr_1.1fr] lg:gap-6">
          <div>
            <Eyebrow className="text-ink/80">
              <span data-hero="4">Competition Hub / Leagues</span>
            </Eyebrow>
            <h1 className="caps mt-4 text-[clamp(3rem,7.2vw,6.6rem)]">
              <span className="block" data-split>
                <Split text="Real life." />
              </span>
              <span className="block" data-split>
                <Split text="Real" />
              </span>
              <span className="relative mt-[0.08em] inline-block px-[0.2em] text-white">
                <span className="slab !bg-royal" data-hero="5" data-hero-kind="wipe" aria-hidden />
                <span className="relative block" data-split>
                  <Split text="Leagues." />
                </span>
              </span>
            </h1>
            <p className="sub mt-6 text-[clamp(1.1rem,1.6vw,1.4rem)]" data-hero="6">
              Structured seasons for working adults.
            </p>
            <div className="mt-7 flex flex-wrap items-center gap-3" data-hero="7">
              <a href="#features" className="btn btn-gold" data-magnetic>
                Explore leagues <ArrowNE />
              </a>
              <a href={site.discord} target="_blank" rel="noopener" className="btn btn-royal" data-magnetic>
                Join Discord <ArrowNE />
              </a>
            </div>
            <div className="mt-8 flex items-center gap-3" data-hero="11" data-hero-kind="pop">
              <Tag>New leagues coming soon</Tag>
              <Stripes className="w-10" color="#8f11a8" />
            </div>
          </div>
          <PhotoStack
            hero
            priority
            photos={[
              { src: "/img/player-focus.jpg", alt: "A competitive player in a gaming headset", pos: "object-[60%_35%]" },
              { src: "/img/gameplay.jpg", alt: "Gameplay on a competition monitor", pos: "object-[50%_40%]" },
              { src: "/img/headset-player.jpg", alt: "A player wearing a HyperX headset mid-match", pos: "object-[45%_35%]" },
            ]}
          />
        </div>
      </section>

      {/* Features */}
      <section id="features" className="scroll-mt-24 px-[5%] py-10 md:py-14">
        <div className="container">
          <NumberedList items={leagueFeatures} />
        </div>
      </section>

      {/* Schedule */}
      <Band tone="pulse">
        <div className="grid items-center gap-12 lg:grid-cols-[1.15fr_1fr]">
          <div>
            <h2 className="caps text-h2 text-white" data-split>
              <Split text="A schedule|that gets you." />
            </h2>
            <p className="sub reveal mt-6 max-w-[30rem] text-[clamp(1.05rem,1.4vw,1.3rem)] text-white/90">We work with you to schedule matches around your responsibilities.</p>
          </div>
          <div className="flex flex-col items-center gap-7">
            <Calendar />
            <a href="#find-your-league" className="reveal btn btn-outline" data-magnetic>
              Coordinate with the WG team
            </a>
          </div>
        </div>
      </Band>

      {/* Come solo */}
      <section className="relative overflow-hidden px-[5%] py-16 md:py-24">
        <Dots className="absolute -bottom-[2%] -left-[4%] h-[18vw] w-[24vw] max-w-[300px] rotate-180" />
        <div className="container">
          <div className="grid items-end gap-8 lg:grid-cols-[1fr_1.6fr]">
            <div>
              <h2 className="caps text-h2" data-split>
                <Split text="Come solo.|Find your|squad." />
              </h2>
              <GoldRule className="mt-5" />
            </div>
            <div className="relative" data-clip="left">
              <Stripes className="absolute -top-[10%] left-[2%] z-20 w-[12vw] max-w-[140px]" color="#8f11a8" />
              <Skew src="/img/community.jpg" alt="Workin Gamerz members meeting at a community game night" className="aspect-[4/3] md:aspect-[2.2/1]" sizes="(min-width:1024px) 60vw, 90vw" imgClass="object-[50%_45%]" tilt={false} />
            </div>
          </div>
          <LinkRow className="mt-12" items={squadSteps.map((t) => ({ title: t }))} />
          <div className="reveal mt-8 text-center">
            <a href={site.discord} target="_blank" rel="noopener" className="btn btn-royal" data-magnetic>
              Join the community <ArrowNE />
            </a>
          </div>
        </div>
      </section>

      {/* League finder */}
      <section className="grain relative px-[5%] pb-16 md:pb-24">
        <div className="container">
          <Wizard config={leagueFinder} />
        </div>
      </section>

      {/* Bring WG to work */}
      <Band tone="ink">
        <div className="grid items-center gap-10 lg:grid-cols-2">
          <h2 className="caps text-h2" data-split>
            <Split text="Bring WG|to work." />
          </h2>
          <div className="reveal">
            <Tag>Company leagues • Coming soon</Tag>
            <p className="sub mt-4 text-[1.05rem] text-ink/85">Company vs. company. Branded leagues and events.</p>
            <Cta label="Talk to WG" href="/tournaments#company" className="btn btn-gold mt-5" />
          </div>
        </div>
      </Band>

      {/* Keep gaming */}
      <section className="relative overflow-hidden px-[5%] py-16 md:py-20">
        <Dots className="absolute -right-[4%] -bottom-[4%] h-[16vw] w-[22vw] max-w-[280px]" />
        <div className="container grid items-center gap-8 lg:grid-cols-[1.3fr_auto_1fr]">
          <h2 className="caps text-h2" data-split>
            <Split text="Keep gaming|in your life." />
          </h2>
          <span className="hidden h-28 w-[3px] -skew-x-12 bg-gold lg:block" data-line aria-hidden />
          <div className="reveal flex flex-col items-start gap-4 lg:items-center">
            <Cta label="Contact WG" href="/contact" className="btn btn-gold btn-lg" />
            <Link href={site.patreon} target="_blank" rel="noopener" className="link-u text-[0.95rem] font-semibold italic text-purple dark:text-gold">
              Support the community
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
