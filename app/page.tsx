import Link from "next/link";
import { Cta, GoldRule } from "@/components/Sections";
import { YouTube } from "@/components/YouTube";
import { Split } from "@/components/Split";
import { ArrowNE, Chevrons, Dots, Skew, Stripes } from "@/components/Decor";
import { competition, involvement, site, steps } from "@/lib/content";

export default function Home() {
  return (
    <>
      {/* 1. Hero: poster headline, three skewed photos, WG watermark */}
      <section className="grain relative isolate overflow-hidden px-[5%] pt-[7.5rem] pb-8 md:pt-[8.5rem]" data-hero-zone>
        <span className="caps pointer-events-none absolute top-[9rem] left-1/2 -z-10 -translate-x-1/2 text-[34vw] leading-none text-[color:var(--wm)] select-none md:top-[6rem]" data-scrub-x="6" aria-hidden>
          WG
        </span>
        <Stripes className="absolute top-[32%] -left-[6%] w-[22vw] max-w-[260px] md:top-[38%]" />
        <Dots className="absolute top-[44%] -right-[4%] h-[18vw] w-[26vw] max-w-[340px]" />

        <div className="container text-center">
          <p className="eyebrow text-ink/80" data-hero="4">
            Hawai{"ʻ"}i · Community + Competition + Connection
          </p>
          <h1 className="caps mx-auto mt-4 text-h1">
            <span className="block" data-split>
              <Split text="Work Hard." />
            </span>
            <span className="relative mt-[0.08em] inline-block px-[0.2em] text-night">
              <span className="slab" data-hero="5" data-hero-kind="wipe" aria-hidden />
              <span className="relative block" data-split>
                <Split text="Play" />
              </span>
            </span>
            <span className="mt-[0.06em] block" data-split>
              <Split text="Together." />
            </span>
          </h1>
          <p className="sub mt-6 text-[clamp(1.1rem,1.8vw,1.5rem)]" data-hero="6">
            Gamers with jobs deserve a league too.
          </p>
          <div className="mt-7 flex flex-wrap items-center justify-center gap-3" data-hero="7">
            <Cta label="Find your league" href="/leagues#find-your-league" className="btn btn-gold" />
            <a href={site.discord} target="_blank" rel="noopener" className="btn btn-royal" data-magnetic>
              Join Discord <ArrowNE />
            </a>
          </div>
        </div>

        {/* Photo row */}
        <div className="relative container mt-10 grid grid-cols-[1fr_1.3fr_1fr] items-center md:mt-14">
          <div className="relative z-10 -mr-[9%]" data-hero="8" data-hero-kind="panel" data-hero-delay="0">
            <Skew src="/img/player-focus.jpg" alt="A competitive player in a gaming headset focused on the screen" className="aspect-[1.15/1] md:aspect-[1.5/1]" sizes="(min-width:768px) 32vw, 40vw" priority imgClass="object-[60%_40%]" />
          </div>
          <div className="relative z-20" data-hero="9" data-hero-kind="panel" data-hero-delay="0.12">
            <Skew src="/img/celebration.jpg" alt="A player celebrates with a hand-written Gen.G sign while the crowd cheers" className="aspect-[1.15/1] shadow-[var(--shadow)] md:aspect-[1.45/1]" sizes="(min-width:768px) 42vw, 50vw" priority imgClass="object-[50%_35%]" />
          </div>
          <div className="relative z-10 -ml-[9%]" data-hero="10" data-hero-kind="panel" data-hero-delay="0.24">
            <Skew src="/img/headset-player.jpg" alt="A player wearing a HyperX headset mid-match" className="aspect-[1.15/1] md:aspect-[1.5/1]" sizes="(min-width:768px) 32vw, 40vw" priority imgClass="object-[45%_40%]" />
          </div>
          <p className="cond absolute right-0 -bottom-5 z-30 -skew-x-12 bg-gold px-5 py-2.5 text-[clamp(0.95rem,1.4vw,1.3rem)] text-night shadow-[var(--shadow)] md:right-[2%] md:-bottom-6" data-hero="11" data-hero-kind="pop">
            <span className="block skew-x-12">Real life. Real competition.</span>
          </p>
        </div>
      </section>

      {/* 2. Marquee: Clock out. Squad up. */}
      <div className="scheme-pulse relative z-10 mt-12 overflow-hidden py-3.5 md:mt-16" data-marquee aria-hidden>
        <div className="marquee-track items-center gap-10 pr-10">
          {Array.from({ length: 8 }).map((_, i) => (
            <span key={i} className="cond flex items-center gap-5 text-[clamp(1.3rem,2.4vw,2rem)] whitespace-nowrap text-white">
              <Chevrons className="text-gold" />
              Clock out. Squad up.
            </span>
          ))}
        </div>
      </div>

      {/* 2b. Trailer */}
      <section id="trailer" className="relative scroll-mt-24 overflow-hidden px-[5%] pt-16 md:pt-24">
        <Stripes className="absolute top-[30%] -left-[4%] w-[16vw] max-w-[200px]" color="#8f11a8" />
        <Stripes className="absolute -right-[4%] bottom-[6%] w-[16vw] max-w-[200px]" flip />
        <div className="container grid items-center gap-10 lg:grid-cols-[1fr_1.9fr] lg:gap-14">
          <div>
            <p className="eyebrow text-gold">Official trailer</p>
            <h2 className="caps mt-3 text-h2" data-split>
              <Split text="See it|in action." />
            </h2>
            <GoldRule className="mt-5" />
            <p className="sub reveal mt-6 max-w-[24rem] text-[1.05rem] text-muted">Hawaiʻi’s first adult esports league. Gamers with jobs deserve a league too.</p>
          </div>
          <div className="reveal" data-reveal="right">
            <YouTube id="Seabw-w80t0" title={"Hawai\u02BBi\u2019s First Adult Esports League | Workin Gamerz Trailer"} poster="/img/trailer.jpg" />
          </div>
        </div>
      </section>

      {/* 3. Your game. Your schedule. */}
      <section id="competition" className="relative scroll-mt-24 overflow-hidden px-[5%] py-16 md:py-24">
        <Dots className="absolute -bottom-[2%] -left-[4%] h-[18vw] w-[24vw] max-w-[300px] rotate-180" />
        <div className="container grid items-center gap-12 lg:grid-cols-[1fr_1.15fr_1.1fr] lg:gap-8" data-hover-group>
          <div>
            <h2 className="caps text-h2" data-split>
              <Split text="Your game.|Your schedule." />
            </h2>
            <span className="mt-5 block h-1.5 w-24 bg-gold" data-line />
            <div className="reveal mt-8">
              <Cta label="Explore competition" href="/leagues" className="btn btn-gold" />
            </div>
          </div>

          <div className="relative mx-auto w-full max-w-[560px] lg:max-w-none">
            {competition.map((c, i) => (
              <div key={c.title} className={`relative ${i > 0 ? "-mt-2" : ""}`} style={{ width: "84%", marginLeft: `${(2 - i) * 8}%`, zIndex: 3 - i }} data-clip="left">
                <Skew src={c.img} alt={c.alt} className="aspect-[2.3/1]" sizes="(min-width:1024px) 30vw, 70vw" />
              </div>
            ))}
          </div>

          <ol className="divide-y divide-line" data-stagger>
            {competition.map((c) => (
              <li key={c.title} className="reveal group py-5 first:pt-0 last:pb-0" data-hover-item data-cursor>
                <Link href={c.href} className="block">
                <div className="flex items-baseline gap-4">
                  <span className="cond text-[clamp(2.2rem,3.2vw,3rem)] text-gold transition-transform duration-500 group-hover:-translate-x-1">{c.n}</span>
                  <h3 className="caps text-[clamp(1.5rem,2.4vw,2.3rem)] transition-transform duration-500 group-hover:translate-x-2">{c.title}</h3>
                </div>
                <p className="sub mt-1.5 text-[0.95rem] text-muted md:pl-[4.6rem]">{c.blurb}</p>
                </Link>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* 4. From signup to game night (ink band in both themes) */}
      <section className="scheme-ink relative overflow-hidden px-[5%] py-16 md:py-20">
        <Stripes className="absolute top-[8%] -left-[4%] w-[18vw] max-w-[220px]" />
        <Stripes className="absolute top-[6%] -right-[4%] w-[18vw] max-w-[220px]" flip color="#8f11a8" />
        <div className="container text-center">
          <h2 className="caps-up text-h2" data-split>
            <Split text="From signup|to game night." />
          </h2>

          <ol className="relative mt-12 grid grid-cols-2 gap-x-4 gap-y-10 md:mt-14 md:grid-cols-4" data-stagger="pop">
            <span className="pointer-events-none absolute top-[2.1rem] right-[12.5%] left-[12.5%] hidden border-t-[3px] border-dotted border-gold/70 md:block" data-line="center" aria-hidden>
              <span className="absolute top-1/2 left-1/3 size-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-gold" />
              <span className="absolute top-1/2 left-2/3 size-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-gold" />
            </span>
            {steps.map((s) => (
              <li key={s.n} className="reveal relative">
                <span className="cond block text-[clamp(3rem,5.6vw,4.6rem)] text-gold">
                  <span className="scheme-ink inline-block px-3">{s.n}</span>
                </span>
                <h3 className="caps mt-1 text-[clamp(1rem,1.4vw,1.25rem)] tracking-[-0.01em]">{s.title}</h3>
              </li>
            ))}
          </ol>

          <p className="sub reveal mt-10 text-[clamp(0.95rem,1.3vw,1.15rem)] text-ink/85">Top teams advance to playoffs. Featured matches, streams, and community recognition.</p>
        </div>
      </section>

      {/* 5. Built in Hawai'i. Built for your life. */}
      <section id="community" className="relative scroll-mt-24 overflow-hidden px-[5%] py-16 md:py-24">
        <div className="container">
          <div className="text-center">
            <h2 className="caps text-h2" data-split>
              <Split text="Built in Hawaiʻi.|Built for your life." />
            </h2>
            <span className="mx-auto mt-5 block h-1.5 w-24 bg-gold" data-line="center" />
          </div>

          <div className="relative mt-10 md:mt-14">
            <Stripes className="absolute top-[6%] -left-[5%] z-20 w-[16vw] max-w-[200px]" color="#8f11a8" />
            <Stripes className="absolute -right-[5%] bottom-[4%] z-20 w-[16vw] max-w-[200px]" flip />
            <div className="relative mx-auto w-[94%] md:w-[90%]" data-clip="left">
              <Skew src="/img/community.jpg" alt="Workin Gamerz members mingling at a community game night" className="aspect-[4/3] md:aspect-[2.6/1]" sizes="90vw" imgClass="object-[50%_45%]" tilt={false}>
                <span className="absolute inset-0 -z-10" />
              </Skew>
            </div>
          </div>

          <ul id="get-involved" className="mt-10 flex scroll-mt-32 flex-col items-center gap-5 md:flex-row md:justify-center md:gap-0" data-stagger>
            {involvement.map((l, i) => (
              <li key={l.title} className="reveal flex items-center">
                {i > 0 && <span className="mx-8 hidden h-7 w-[3px] -skew-x-12 bg-gold md:block" aria-hidden />}
                <Link href={l.url} className="link-arrow caps text-[clamp(1.2rem,1.8vw,1.6rem)] not-italic" data-cursor>
                  {l.title} <ArrowNE size={20} />
                </Link>
              </li>
            ))}
          </ul>
          <p className="sub reveal mt-6 text-center text-[clamp(0.95rem,1.3vw,1.15rem)] text-muted">Organized competition that respects your real-world responsibilities.</p>
        </div>
      </section>

      {/* 6. CTA: blue to purple band */}
      <section className="scheme-pulse relative overflow-hidden px-[5%] py-16 md:py-20">
        <Stripes className="absolute top-[10%] -left-[4%] w-[18vw] max-w-[220px]" />
        <Stripes className="absolute -right-[6%] bottom-[8%] w-[22vw] max-w-[280px] opacity-80" flip color="#c83bf0" />
        <Dots className="absolute -top-[4%] right-[10%] h-[14vw] w-[20vw] max-w-[240px] rotate-180 opacity-50" />
        <div className="container text-center">
          <h2 className="caps text-[clamp(2.6rem,6.6vw,6.2rem)] text-white" data-split>
            <Split text="Your next|GG starts here." />
          </h2>
          <div className="reveal mt-8 flex flex-col items-center gap-4">
            <Cta label="Find your league" href="/leagues#find-your-league" className="btn btn-gold btn-lg" />
            <Link href="/about" className="link-u text-[0.95rem] font-semibold italic text-white/90">
              Meet Workin Gamerz
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
