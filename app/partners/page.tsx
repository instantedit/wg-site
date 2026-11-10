import type { Metadata } from "next";
import Image from "next/image";
import { Split } from "@/components/Split";
import { ArrowNE, Dots, Stripes } from "@/components/Decor";
import { Band, Cta, Eyebrow, GoldRule, PhotoStack, StepsRow } from "@/components/Sections";
import { Wizard } from "@/components/Wizard";
import { partnerInquiry } from "@/lib/wizards";
import { partnerProcess, partnerValue, partners } from "@/lib/content";

export const metadata: Metadata = { title: "Partners", description: "Partner with Workin Gamerz to reach working professionals through gaming, competition, and live content in Hawaiʻi." };

export default function Partners() {
  return (
    <>
      {/* Hero: gold in light mode, ink in dark */}
      <section className="relative isolate overflow-hidden bg-gold px-[5%] pt-[7.5rem] pb-12 text-night md:pt-[8.5rem] md:pb-16 dark:bg-bg dark:text-ink" data-hero-zone>
        <span className="caps pointer-events-none absolute top-[5rem] left-[26%] -z-10 text-[30vw] leading-none text-night/[0.06] select-none md:top-[3rem] dark:text-paper/[0.05]" data-scrub-x="6" aria-hidden>
          WG
        </span>
        <Stripes className="absolute -bottom-[4%] -left-[4%] w-[16vw] max-w-[200px]" color="#1f3ddb" />
        <Stripes className="absolute -right-[4%] -bottom-[6%] w-[18vw] max-w-[220px]" flip color="#8f11a8" />
        <Dots className="absolute top-[14%] -right-[3%] h-[16vw] w-[22vw] max-w-[300px]" />
        <div className="container grid items-center gap-10 lg:grid-cols-[1fr_1.1fr] lg:gap-6">
          <div>
            <Eyebrow className="flex items-center gap-4">
              <span data-hero="4">Partner with Workin Gamerz</span>
              <span className="h-[2px] w-24 bg-current" data-line aria-hidden />
            </Eyebrow>
            <h1 className="caps mt-4 text-[clamp(3rem,7vw,6.4rem)]">
              <span className="block" data-split>
                <Split text="Your brand." />
              </span>
              <span className="relative mt-[0.08em] inline-block px-[0.2em] text-night">
                <span className="slab !bg-paper" data-hero="5" data-hero-kind="wipe" aria-hidden />
                <span className="relative block" data-split>
                  <Split text="Our next" />
                </span>
              </span>
              <span className="block" data-split>
                <Split text="chapter." />
              </span>
            </h1>
            <p className="sub mt-6 max-w-[26rem] text-[clamp(1.05rem,1.5vw,1.3rem)]" data-hero="6">
              Connect with working professionals through gaming, competition, and live content.
            </p>
            <div className="mt-7" data-hero="7">
              <a href="#partner-form" className="btn btn-night btn-adapt" data-magnetic>
                Become a partner <ArrowNE />
              </a>
            </div>
          </div>
          <PhotoStack
            hero
            priority
            photos={[
              { src: "/img/speaker-1.jpg", alt: "A speaker presenting on stage at a Workin Gamerz event", pos: "object-[50%_30%]" },
              { src: "/img/speaker-2.jpg", alt: "A guest speaking on the mic in front of the WG backdrop", pos: "object-[50%_30%]" },
              { src: "/img/speaker-3.jpg", alt: "A panelist gesturing while speaking at a WG event", pos: "object-[50%_30%]" },
            ]}
          />
        </div>
      </section>

      {/* Partners */}
      <section className="relative overflow-hidden px-[5%] py-16 md:py-24">
        <Dots className="absolute top-[8%] -left-[4%] h-[16vw] w-[22vw] max-w-[280px] rotate-180" />
        <Dots className="absolute -right-[4%] bottom-[8%] h-[16vw] w-[22vw] max-w-[280px]" />
        <div className="container">
          <h2 className="caps text-h2" data-split>
            <Split text="Built on|good partnerships." />
          </h2>
          <GoldRule className="mt-5" />
          <ul className="mt-12 grid gap-10 md:grid-cols-2 md:gap-0" data-stagger>
            {partners.map((p, i) => (
              <li key={p.name} className={`reveal flex flex-col items-center text-center ${i > 0 ? "md:border-l-[3px] md:border-gold/80" : ""} md:px-10`}>
                <div className="flex aspect-[2.4/1] w-full max-w-[26rem] items-center justify-center rounded-2xl bg-white p-8 shadow-[var(--shadow)]" data-tilt="6">
                  <Image src={p.logo} alt={p.name} width={p.w} height={p.h} className="h-auto max-h-full w-full object-contain" sizes="(min-width:768px) 26rem, 80vw" />
                </div>
                <h3 className="caps mt-6 text-[clamp(1.4rem,2.2vw,2rem)]">{p.name}</h3>
                <p className="sub mt-1 text-muted">{p.blurb}</p>
                <Cta label={p.cta} href={p.href} className="btn btn-gold btn-sm mt-5" />
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Value */}
      <Band tone="ink">
        <div className="text-center">
          <h2 className="caps-up text-h2" data-split>
            <Split text="More than|a logo placement." />
          </h2>
        </div>
        <StepsRow className="mt-10" steps={partnerValue} note="Built in Hawaiʻi. Designed for lasting connections." />
      </Band>

      {/* Process */}
      <Band tone="pulse" className="!py-8 md:!py-10">
        <StepsRow steps={partnerProcess} chevrons />
      </Band>

      {/* Form */}
      <section className="grain relative px-[5%] py-16 md:py-24">
        <div className="container grid items-start gap-10 lg:grid-cols-[1fr_1.7fr] lg:gap-14">
          <div className="lg:sticky lg:top-32">
            <h2 className="caps text-h2" data-split>
              <Split text="Let’s build|something|good." />
            </h2>
            <GoldRule className="mt-5" />
            <p className="sub reveal mt-6 text-[1.1rem] text-muted">Tell us what your brand has in mind.</p>
          </div>
          <div className="reveal">
            <Wizard config={partnerInquiry} />
          </div>
        </div>
      </section>
    </>
  );
}
