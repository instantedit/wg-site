import type { Metadata } from "next";
import { Split } from "@/components/Split";
import { Dots, Skew, Stripes } from "@/components/Decor";
import { Band, Cta, CtaBand, Eyebrow, GoldRule, Tag, Watermark, WidePhoto } from "@/components/Sections";
import { different, founderStory, mission, values, valuesIntro, whoFor } from "@/lib/content";

export const metadata: Metadata = { title: "About", description: "Get to know Workin Gamerz: the founder story, mission, and the community, competition, and connection behind Hawaiʻi’s esports leagues for working adults." };

export default function About() {
  return (
    <>
      {/* Hero */}
      <section className="grain relative isolate overflow-hidden px-[5%] pt-[7.5rem] pb-10 md:pt-[8.5rem] md:pb-16" data-hero-zone>
        <Watermark text="WG" className="top-[5rem] left-[6%] text-[30vw] md:top-[3rem]" />
        <Stripes className="absolute top-[62%] -left-[6%] w-[16vw] max-w-[200px]" />
        <Dots className="absolute top-[14%] -right-[4%] h-[18vw] w-[24vw] max-w-[320px]" />
        <div className="container grid items-center gap-10 lg:grid-cols-[1.15fr_1fr] lg:gap-10">
          <div>
            <Eyebrow className="text-ink/80">
              <span data-hero="4">Get to know WG</span>
            </Eyebrow>
            <h1 className="caps mt-4 text-[clamp(3rem,7vw,6.4rem)]">
              <span className="block" data-split>
                <Split text="Our love" />
              </span>
              <span className="block" data-split>
                <Split text="letter" />
              </span>
              <span className="relative mt-[0.08em] inline-block px-[0.2em] text-night">
                <span className="slab" data-hero="5" data-hero-kind="wipe" aria-hidden />
                <span className="relative block" data-split>
                  <Split text="to gaming." />
                </span>
              </span>
            </h1>
            <p className="sub mt-6 max-w-[30rem] text-[clamp(1.05rem,1.5vw,1.35rem)]" data-hero="6">
              Built so people never have to lose their connection to gaming just because life gets busy.
            </p>
            <div className="mt-7 flex flex-wrap items-center gap-3" data-hero="7">
              <Cta label="Find your league" href="/leagues#find-your-league" className="btn btn-gold" />
              <Cta label="Contact WG" href="/contact" className="btn btn-outline" />
            </div>
          </div>
          <div className="relative mx-auto w-full max-w-[34rem]">
            <div className="relative" data-hero="8" data-hero-kind="panel">
              <Skew src="/img/founder.jpg" alt="The Workin Gamerz founder smiling in a lei in front of the WG shield backdrop" className="aspect-[4/3.2] shadow-[var(--shadow)]" sizes="(min-width:1024px) 40vw, 90vw" priority imgClass="object-[55%_30%]" />
            </div>
            <div className="absolute -bottom-5 left-[6%] z-20" data-hero="11" data-hero-kind="pop">
              <Tag>Founder, Workin Gamerz</Tag>
            </div>
          </div>
        </div>
      </section>

      {/* Founder history */}
      <section className="relative overflow-hidden px-[5%] py-16 md:py-24">
        <Dots className="absolute -bottom-[2%] -left-[4%] h-[16vw] w-[22vw] max-w-[280px] rotate-180" />
        <div className="container grid gap-10 lg:grid-cols-[1fr_1.6fr] lg:gap-16">
          <div className="lg:sticky lg:top-32 lg:self-start">
            <Eyebrow className="text-gold">Brief founder history</Eyebrow>
            <h2 className="caps mt-3 text-h2" data-split>
              <Split text="Where it|started." />
            </h2>
            <GoldRule className="mt-5" />
          </div>
          <div className="space-y-6" data-stagger>
            {founderStory.map((p, i) => (
              <p key={i} className={`reveal text-[clamp(1.05rem,1.35vw,1.25rem)] leading-relaxed ${i === 0 ? "sub text-ink" : "text-muted"}`}>
                {p}
              </p>
            ))}
          </div>
        </div>
      </section>

      {/* Mission */}
      <Band tone="ink">
        <div className="grid items-center gap-10 lg:grid-cols-[auto_1fr] lg:gap-16">
          <div className="flex items-center gap-5">
            <span className="hidden h-28 w-3 -skew-x-12 bg-gold lg:block" data-line aria-hidden />
            <h2 className="caps text-[clamp(3rem,6vw,5.6rem)]" data-split>
              <Split text="Mission." />
            </h2>
          </div>
          <p className="sub reveal max-w-[44rem] text-[clamp(1.15rem,1.7vw,1.6rem)] leading-snug text-ink/90">{mission}</p>
        </div>
      </Band>

      {/* Core values */}
      <section className="relative overflow-hidden px-[5%] py-16 md:py-24">
        <Stripes className="absolute -right-[4%] top-[6%] w-[16vw] max-w-[200px]" flip />
        <div className="container">
          <div className="grid gap-8 lg:grid-cols-[1fr_1.4fr] lg:items-end">
            <div>
              <h2 className="caps-up text-h2" data-split>
                <Split text="Core|values." />
              </h2>
              <GoldRule className="mt-5" />
            </div>
            <p className="sub reveal text-[clamp(1rem,1.3vw,1.2rem)] text-muted">{valuesIntro}</p>
          </div>
          <ul className="mt-12 grid gap-5 md:grid-cols-3" data-stagger>
            {values.map((v) => (
              <li key={v.n} className="reveal group relative overflow-hidden rounded-[1.25rem] border border-line bg-card p-7 shadow-[var(--shadow)] transition-colors duration-500 hover:border-gold" data-tilt="5" data-cursor>
                <span className="cond block text-[clamp(2.6rem,4vw,3.6rem)] text-gold">{v.n}</span>
                <h3 className="caps mt-2 text-[clamp(1.6rem,2.4vw,2.2rem)]">{v.title}</h3>
                <span className="mt-4 block h-1 w-14 bg-gold transition-[width] duration-500 group-hover:w-24" aria-hidden />
                <p className="mt-4 text-[0.98rem] leading-relaxed text-muted">{v.body}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Who it's for */}
      <Band tone="pulse">
        <div className="grid items-center gap-10 lg:grid-cols-[1fr_1.2fr]">
          <div className="relative" data-clip="left">
            <Skew src="/img/celebration.jpg" alt="A player celebrates with a hand-written Gen.G sign while the crowd cheers" className="aspect-[4/3] md:aspect-[1.35/1]" sizes="(min-width:1024px) 42vw, 90vw" imgClass="object-[50%_35%]" />
          </div>
          <div>
            <h2 className="caps text-h2 text-white" data-split>
              <Split text="Who|it’s for." />
            </h2>
            <div className="mt-6 space-y-4" data-stagger>
              {whoFor.map((p, i) => (
                <p key={i} className={`reveal text-[clamp(1rem,1.3vw,1.2rem)] leading-relaxed ${i === 0 ? "sub text-white" : "text-white/85"}`}>
                  {p}
                </p>
              ))}
            </div>
          </div>
        </div>
      </Band>

      {/* What makes us different */}
      <section className="relative overflow-hidden px-[5%] py-16 md:py-24">
        <div className="container">
          <div className="text-center">
            <h2 className="caps text-h2" data-split>
              <Split text="What makes|us different?" />
            </h2>
            <GoldRule center className="mt-5" />
          </div>
          <WidePhoto src="/img/community.jpg" alt="Workin Gamerz members at a community game night" pos="object-[50%_45%]" className="mt-10 md:mt-14" />
          <div className="mx-auto mt-12 grid max-w-[64rem] gap-x-12 gap-y-6 md:grid-cols-2" data-stagger>
            {different.map((p, i) => (
              <p key={i} className="reveal flex gap-4 text-[clamp(1rem,1.3vw,1.15rem)] leading-relaxed text-muted">
                <span className="cond mt-1 shrink-0 text-2xl text-gold">0{i + 1}</span>
                {p}
              </p>
            ))}
          </div>
        </div>
      </section>

      <CtaBand title="Your next|GG starts here." button={{ label: "Find your league", href: "/leagues#find-your-league" }} link={{ label: "Contact WG", href: "/contact" }} />
    </>
  );
}
