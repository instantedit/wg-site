import type { Metadata } from "next";
import Image from "next/image";
import { Split } from "@/components/Split";
import { ArrowNE, Dots, Skew, Stripes } from "@/components/Decor";
import { Band, Cta, Eyebrow, GoldRule, NumberedList, Tag, Watermark } from "@/components/Sections";
import { Wizard } from "@/components/Wizard";
import { sponsorDiscovery } from "@/lib/wizards";
import { partners, sponsorPlacements, sponsorProcess, sponsorReasons } from "@/lib/content";

export const metadata: Metadata = {
  title: "Sponsors",
  description: "Sponsor Workin Gamerz and connect your brand with Hawaiʻi’s working professionals through leagues, tournaments, streams, and community events. Start with a short discovery form.",
};

export default function Sponsors() {
  return (
    <>
      {/* Hero */}
      <section className="grain relative isolate overflow-hidden px-[5%] pt-[7.5rem] pb-10 md:pt-[8.5rem] md:pb-14" data-hero-zone>
        <Watermark text="WG" className="top-[5rem] left-[10%] text-[30vw] md:top-[3rem]" />
        <Stripes className="absolute top-[60%] -left-[6%] w-[16vw] max-w-[200px]" />
        <Dots className="absolute top-[16%] -right-[4%] h-[18vw] w-[24vw] max-w-[320px]" />
        <div className="container grid items-center gap-10 lg:grid-cols-[1fr_1.15fr] lg:gap-8">
          <div>
            <Eyebrow className="text-ink/80">
              <span data-hero="4">For sponsors</span>
            </Eyebrow>
            <h1 className="caps mt-4 text-[clamp(2.7rem,6vw,5.4rem)]">
              <span className="block" data-split>
                <Split text="Reach" />
              </span>
              <span className="block" data-split>
                <Split text="gamers" />
              </span>
              <span className="relative mt-[0.08em] inline-block px-[0.2em] whitespace-nowrap text-night">
                <span className="slab" data-hero="5" data-hero-kind="wipe" aria-hidden />
                <span className="relative block" data-split>
                  <Split text="with jobs." />
                </span>
              </span>
            </h1>
            <p className="sub mt-6 max-w-[27rem] text-[clamp(1.05rem,1.5vw,1.3rem)]" data-hero="6">
              Connect your brand with a growing community of working professionals through gaming, competition, and live content.
            </p>
            <div className="mt-7 flex flex-wrap items-center gap-3" data-hero="7">
              <a href="#discovery" className="btn btn-gold" data-magnetic>
                Start discovery <ArrowNE />
              </a>
              <Cta label="Meet our partners" href="/partners" className="btn btn-outline" />
            </div>
            <div className="mt-6" data-hero="11" data-hero-kind="pop">
              <Tag tone="purple">Early discovery • No commitment</Tag>
            </div>
          </div>
          <div className="grid gap-3">
            <div className="relative z-10 ml-[6%]" data-hero="8" data-hero-kind="panel">
              <Skew src="/img/celebration.jpg" alt="A crowd cheering at a Workin Gamerz event, one fan holding up a hand-written sign" className="aspect-[2/1]" sizes="(min-width:1024px) 52vw, 90vw" priority imgClass="object-[50%_35%]" />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="relative" data-hero="9" data-hero-kind="panel" data-hero-delay="0.12">
                <Skew src="/img/camera.jpg" alt="A camera operator filming a Workin Gamerz match" className="aspect-[1.3/1]" sizes="(min-width:1024px) 26vw, 45vw" priority imgClass="object-[50%_30%]" />
              </div>
              <div className="relative" data-hero="10" data-hero-kind="panel" data-hero-delay="0.24">
                <Skew src="/img/gameplay.jpg" alt="Gameplay on a competition monitor beside a player wearing a headset" className="aspect-[1.3/1]" sizes="(min-width:1024px) 26vw, 45vw" priority imgClass="object-[50%_40%]" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why sponsor */}
      <section className="relative overflow-hidden px-[5%] py-16 md:py-24">
        <Stripes className="absolute top-[6%] -right-[4%] w-[16vw] max-w-[200px]" flip />
        <div className="container">
          <div className="grid gap-8 lg:grid-cols-[1fr_1.2fr] lg:items-end">
            <div>
              <h2 className="caps text-h2" data-split>
                <Split text="Why brands|team up with WG." />
              </h2>
              <GoldRule className="mt-5" />
            </div>
            <p className="sub reveal text-[clamp(1rem,1.3vw,1.2rem)] text-muted">Gamers with jobs show up every week. That gives your brand something a one-off ad cannot: the same engaged audience, again and again.</p>
          </div>
          <ul className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4" data-stagger>
            {sponsorReasons.map((r) => (
              <li key={r.n} className="reveal group relative overflow-hidden rounded-[1.25rem] border border-line bg-card p-7 shadow-[var(--shadow)] transition-colors duration-500 hover:border-gold" data-tilt="5" data-cursor>
                <span className="cond block text-[clamp(2.4rem,3.4vw,3.2rem)] text-gold">{r.n}</span>
                <h3 className="caps mt-2 text-[clamp(1.25rem,1.6vw,1.5rem)]">{r.title}</h3>
                <span className="mt-4 block h-1 w-14 bg-gold transition-[width] duration-500 group-hover:w-24" aria-hidden />
                <p className="mt-4 text-[0.98rem] leading-relaxed text-muted">{r.body}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Where your brand shows up */}
      <Band tone="ink">
        <div className="grid items-start gap-10 lg:grid-cols-[1fr_1.7fr] lg:gap-14">
          <div>
            <h2 className="caps text-[clamp(2.6rem,5.2vw,4.8rem)]" data-split>
              <Split text="Where|your brand|shows up." />
            </h2>
            <div className="reveal mt-6">
              <Tag>Packages shaped in discovery</Tag>
            </div>
            <p className="sub reveal mt-5 max-w-[22rem] text-[1rem] text-ink/85">Every sponsorship is tailored. Tell us your goals first, and we build the fit around them.</p>
          </div>
          <NumberedList items={sponsorPlacements} />
        </div>
      </Band>

      {/* How it works */}
      <section className="relative overflow-hidden px-[5%] py-16 md:py-24">
        <Dots className="absolute top-[6%] -right-[4%] h-[16vw] w-[22vw] max-w-[280px]" />
        <div className="container">
          <div className="text-center">
            <h2 className="caps-up text-h2" data-split>
              <Split text="From first hello|to game night." />
            </h2>
            <GoldRule center className="mt-5" />
          </div>
          <ol className="mt-12 grid gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-4" data-stagger>
            {sponsorProcess.map((s, i) => (
              <li key={s.n} className="reveal border-t-[3px] border-gold pt-5">
                <span className="cond block text-[clamp(2.6rem,4vw,3.6rem)] text-gold">{s.n}</span>
                <h3 className="caps mt-1 text-[clamp(1.3rem,1.8vw,1.6rem)]">{s.title}</h3>
                <p className="mt-3 text-[0.98rem] leading-relaxed text-muted">{s.body}</p>
                {i === 0 && (
                  <a href="#discovery" className="link-arrow mt-4 text-sm" data-cursor>
                    <span className="link-u">Start here</span> <ArrowNE size={16} />
                  </a>
                )}
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Discovery wizard */}
      <section className="grain relative px-[5%] pb-16 md:pb-24">
        <div className="container grid items-start gap-10 lg:grid-cols-[1fr_1.7fr] lg:gap-14">
          <div className="lg:sticky lg:top-32">
            <Eyebrow className="text-gold">Early discovery</Eyebrow>
            <h2 className="caps mt-3 text-h2" data-split>
              <Split text="What are|your needs?" />
            </h2>
            <GoldRule className="mt-5" />
            <p className="sub reveal mt-6 max-w-[24rem] text-[1.1rem] text-muted">Four short steps, no commitment. Your answers go straight to the WG team, so the first call starts with your goals and not a pitch.</p>
          </div>
          <div className="reveal">
            <Wizard config={sponsorDiscovery} />
          </div>
        </div>
      </section>

      {/* Current partners */}
      <Band tone="pulse">
        <div className="grid items-center gap-10 lg:grid-cols-[1fr_1.5fr]">
          <div>
            <h2 className="caps text-h2 text-white" data-split>
              <Split text="In good|company." />
            </h2>
            <p className="sub reveal mt-5 max-w-[22rem] text-[1.05rem] text-white/90">Brands already building with Workin Gamerz.</p>
            <div className="reveal mt-6">
              <Cta label="Meet our partners" href="/partners" className="btn btn-gold" />
            </div>
          </div>
          <ul className="grid gap-5 sm:grid-cols-2" data-stagger>
            {partners.map((p) => (
              <li key={p.name} className="reveal flex aspect-[2.2/1] items-center justify-center rounded-2xl bg-white p-7 shadow-[var(--shadow)]" data-tilt="6">
                <Image src={p.logo} alt={p.name} width={p.w} height={p.h} className="h-auto max-h-full w-full object-contain" sizes="(min-width:640px) 22rem, 80vw" />
              </li>
            ))}
          </ul>
        </div>
      </Band>
    </>
  );
}
