import type { Metadata } from "next";
import { Split } from "@/components/Split";
import { ArrowNE, Chevrons, Dots, Skew, Stripes } from "@/components/Decor";
import { Band, Cta, CtaBand, Eyebrow, GoldRule, LinkRow, Tag, Watermark, WidePhoto } from "@/components/Sections";
import { RoleTabs } from "@/components/RoleTabs";
import { Wizard } from "@/components/Wizard";
import { getInvolved } from "@/lib/wizards";
import { growthTracks, productionRoles } from "@/lib/content";

export const metadata: Metadata = { title: "Get Involved", description: "Volunteer, intern, or contract with Workin Gamerz. Real experience in esports, production, and community." };

export default function GetInvolved() {
  return (
    <>
      {/* Hero */}
      <section className="grain relative isolate overflow-hidden px-[5%] pt-[7.5rem] pb-10 md:pt-[8.5rem] md:pb-14" data-hero-zone>
        <Watermark text="WG" className="top-[5rem] left-[8%] text-[30vw] md:top-[3rem]" />
        <Stripes className="absolute top-[58%] -left-[6%] w-[16vw] max-w-[200px]" />
        <Dots className="absolute top-[18%] -right-[4%] h-[18vw] w-[24vw] max-w-[320px]" />
        <div className="container grid items-center gap-10 lg:grid-cols-[1fr_1.15fr] lg:gap-8">
          <div>
            <Eyebrow className="text-ink/80">
              <span data-hero="4">Get Involved / Career Hub</span>
            </Eyebrow>
            <h1 className="caps mt-4 text-[clamp(3rem,7vw,6.4rem)]">
              <span className="block" data-split>
                <Split text="Don’t just" />
              </span>
              <span className="block" data-split>
                <Split text="play." />
              </span>
              <span className="relative mt-[0.08em] inline-block px-[0.2em] text-night">
                <span className="slab" data-hero="5" data-hero-kind="wipe" aria-hidden />
                <span className="relative block" data-split>
                  <Split text="Build it." />
                </span>
              </span>
            </h1>
            <p className="sub mt-6 max-w-[24rem] text-[clamp(1.1rem,1.6vw,1.4rem)]" data-hero="6">
              Real experience in esports, production, and community.
            </p>
            <div className="mt-7" data-hero="7">
              <a href="#find-your-role" className="btn btn-gold" data-magnetic>
                Explore opportunities <ArrowNE />
              </a>
            </div>
            <div className="mt-6" data-hero="11" data-hero-kind="pop">
              <Tag tone="purple">Volunteers • Interns • Contractors</Tag>
            </div>
          </div>
          <div className="grid gap-3">
            <div className="relative z-10 ml-[6%]" data-hero="8" data-hero-kind="panel">
              <Skew src="/img/volunteer.jpg" alt="A Workin Gamerz volunteer pointing at the WG banner" className="aspect-[2/1]" sizes="(min-width:1024px) 52vw, 90vw" priority imgClass="object-[50%_30%]" />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="relative" data-hero="9" data-hero-kind="panel" data-hero-delay="0.12">
                <Skew src="/img/camera.jpg" alt="A camera operator filming a match" className="aspect-[1.3/1]" sizes="(min-width:1024px) 26vw, 45vw" priority imgClass="object-[50%_30%]" />
              </div>
              <div className="relative" data-hero="10" data-hero-kind="panel" data-hero-delay="0.24">
                <Skew src="/img/volunteers.jpg" alt="Two community volunteers smiling at the event desk" className="aspect-[1.3/1]" sizes="(min-width:1024px) 26vw, 45vw" priority imgClass="object-[50%_30%]" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Find your role */}
      <Band tone="ink" id="find-your-role">
        <div className="grid items-start gap-10 lg:grid-cols-[1fr_2fr] lg:gap-14">
          <div>
            <h2 className="caps text-[clamp(3rem,6vw,5.6rem)]" data-split>
              <Split text="Find|your|role." />
            </h2>
            <div className="reveal mt-6">
              <a href="#apply" className="btn btn-gold" data-magnetic>
                Volunteer with WG <ArrowNE />
              </a>
            </div>
          </div>
          <div className="reveal">
            <RoleTabs />
          </div>
        </div>
      </Band>

      {/* Make the moments matter */}
      <Band tone="pulse">
        <div className="grid items-center gap-10 lg:grid-cols-[1fr_1.25fr]">
          <div className="relative" data-clip="left">
            <Skew src="/img/camera.jpg" alt="A camera operator filming a Workin Gamerz match" className="aspect-[4/3] md:aspect-[1.4/1]" sizes="(min-width:1024px) 42vw, 90vw" imgClass="object-[50%_30%]" />
          </div>
          <div>
            <h2 className="caps text-h2 text-white" data-split>
              <Split text="Make the|moments matter." />
            </h2>
            <ul className="mt-8 grid gap-x-8 gap-y-4 sm:grid-cols-2" data-stagger>
              {productionRoles.map((r) => (
                <li key={r} className="reveal flex items-center gap-3">
                  <Chevrons className="shrink-0 text-gold" />
                  <span className="caps text-[clamp(1rem,1.4vw,1.25rem)] text-white">{r}</span>
                </li>
              ))}
            </ul>
            <p className="sub reveal mt-6 text-[1rem] text-white/85">Help bring matches, broadcasts, and highlights to life.</p>
          </div>
        </div>
      </Band>

      {/* Learn. Create. Grow. */}
      <section className="relative overflow-hidden px-[5%] py-16 md:py-24">
        <Dots className="absolute top-[12%] -right-[4%] h-[16vw] w-[22vw] max-w-[280px]" />
        <div className="container">
          <div className="text-center">
            <h2 className="caps-up text-h2" data-split>
              <Split text="Learn. Create.|Grow with WG." />
            </h2>
            <GoldRule center className="mt-5" />
          </div>
          <WidePhoto src="/img/community.jpg" alt="Workin Gamerz members at a community game night" pos="object-[50%_45%]" className="mt-10 md:mt-14" />
          <LinkRow className="mt-10" items={growthTracks.map((t) => ({ title: t }))} />
          <p className="sub reveal mt-5 text-center text-[1.05rem] text-muted">Hands-on internships and contractor opportunities.</p>
          <div className="reveal mt-8 flex flex-col items-center gap-3">
            <Tag tone="outline">Full-time positions • Coming soon</Tag>
            <p className="sub text-[0.95rem] text-muted">Our current focus is volunteers, interns, and contractors.</p>
          </div>
        </div>
      </section>

      {/* Apply */}
      <section className="grain relative px-[5%] pb-16 md:pb-24">
        <div className="container">
          <Wizard config={getInvolved} />
        </div>
      </section>

      <CtaBand title="Your next|chapter starts here." button={{ label: "Get involved", href: "#apply" }} link={{ label: "View roles + responsibilities", href: "#find-your-role" }} />
    </>
  );
}
