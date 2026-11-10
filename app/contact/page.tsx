import type { Metadata } from "next";
import { Split } from "@/components/Split";
import { Dots, Stripes } from "@/components/Decor";
import { Eyebrow, GoldRule } from "@/components/Sections";
import { Wizard } from "@/components/Wizard";
import { contact } from "@/lib/wizards";
import { socials } from "@/lib/content";

export const metadata: Metadata = { title: "Contact", description: "Reach the Workin Gamerz team about leagues, tournaments, events, volunteering, or partnerships." };

export default function Contact() {
  return (
    <section className="grain relative isolate overflow-hidden px-[5%] pt-[7.5rem] pb-16 md:pt-[8.5rem] md:pb-24" data-hero-zone>
      <Stripes className="absolute top-[20%] -left-[6%] w-[18vw] max-w-[220px]" />
      <Dots className="absolute top-[12%] -right-[4%] h-[18vw] w-[24vw] max-w-[320px]" />
      <div className="container grid items-start gap-10 lg:grid-cols-[1fr_1.7fr] lg:gap-14">
        <div className="lg:sticky lg:top-32">
          <Eyebrow className="text-ink/80">
            <span data-hero="4">Contact WG</span>
          </Eyebrow>
          <h1 className="caps mt-4 text-[clamp(3rem,7vw,6.4rem)]" data-split>
            <Split text="Let’s|talk." />
          </h1>
          <GoldRule className="mt-5" />
          <p className="sub mt-6 max-w-[22rem] text-[1.1rem] text-muted" data-hero="6">
            Leagues, tournaments, events, volunteering, partnerships. Pick a topic and we will route it to the right person.
          </p>
          <ul className="mt-8 flex flex-wrap gap-x-5 gap-y-2 text-sm font-bold" data-hero="7">
            {socials.map((s) => (
              <li key={s.title}>
                <a href={s.url} target="_blank" rel="noopener" className="link-u">
                  {s.title}
                </a>
              </li>
            ))}
          </ul>
        </div>
        <div data-hero="8" data-hero-kind="up">
          <Wizard config={contact} />
        </div>
      </div>
    </section>
  );
}
