import Link from "next/link";
import { Split } from "@/components/Split";
import { ArrowNE, Chevrons, Dots, Skew, Stripes } from "@/components/Decor";

type Href = { label: string; href: string; external?: boolean };

const isExternal = (href: string) => /^https?:/.test(href);
export function Cta({ label, href, external, className = "", children }: Href & { className?: string; children?: React.ReactNode }) {
  const ext = external ?? isExternal(href);
  const inner = (
    <>
      {label} {children ?? <ArrowNE />}
    </>
  );
  if (ext)
    return (
      <a href={href} target="_blank" rel="noopener" className={className} data-magnetic>
        {inner}
      </a>
    );
  return (
    <Link href={href} className={className} data-magnetic>
      {inner}
    </Link>
  );
}

export function Eyebrow({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return <p className={`eyebrow ${className}`}>{children}</p>;
}

export function GoldRule({ center = false, className = "" }: { center?: boolean; className?: string }) {
  return <span className={`block h-1.5 w-24 bg-gold ${center ? "mx-auto" : ""} ${className}`} data-line={center ? "center" : undefined} />;
}

/** Skewed label pill: "New leagues coming soon", "Company leagues • Coming soon". */
export function Tag({ children, tone = "gold", className = "" }: { children: React.ReactNode; tone?: "gold" | "purple" | "outline"; className?: string }) {
  const t = tone === "gold" ? "bg-gold text-night" : tone === "purple" ? "bg-purple text-white" : "border-2 border-current";
  return (
    <span className={`sub inline-block -skew-x-12 px-5 py-2 text-[0.95rem] ${t} ${className}`}>
      <span className="block skew-x-12">{children}</span>
    </span>
  );
}

/** Huge italic text behind a hero. */
export function Watermark({ text, className = "", outline = false, center = false }: { text: string; className?: string; outline?: boolean; center?: boolean }) {
  return (
    <span
      className={`caps pointer-events-none absolute -z-10 leading-none select-none ${center ? "inset-x-0 text-center" : ""} ${className}`}
      style={outline ? { WebkitTextStroke: "2px #d9b640", color: "transparent", opacity: 0.55 } : { color: "var(--wm)" }}
      data-scrub-x="6"
      aria-hidden
    >
      {text}
    </span>
  );
}

/** Stair-stepped stack of three skewed photos (leagues hero, home competition). */
export function PhotoStack({ photos, className = "", priority = false, hero = false }: { photos: { src: string; alt: string; pos?: string }[]; className?: string; priority?: boolean; hero?: boolean }) {
  return (
    <div className={`relative ${className}`}>
      {photos.map((p, i) => (
        <div key={p.src} className={`relative ${i > 0 ? "-mt-2" : ""}`} style={{ width: "84%", marginLeft: `${(photos.length - 1 - i) * 8}%`, zIndex: photos.length - i }} {...(hero ? { "data-hero": String(8 + i), "data-hero-kind": "panel", "data-hero-delay": String(i * 0.12) } : { "data-clip": "left" })}>
          <Skew src={p.src} alt={p.alt} className="aspect-[2.3/1]" sizes="(min-width:1024px) 40vw, 90vw" priority={priority} imgClass={p.pos ?? ""} />
        </div>
      ))}
    </div>
  );
}

/** Three photos in a row, middle one taller (home and tournaments heroes). */
export function PhotoRow({ photos, tag, hero = true }: { photos: { src: string; alt: string; pos?: string }[]; tag?: string; hero?: boolean }) {
  return (
    <div className="relative container mt-10 grid grid-cols-[1fr_1.3fr_1fr] items-center md:mt-14">
      {photos.map((p, i) => (
        <div key={p.src} className={`relative ${i === 1 ? "z-20" : i === 0 ? "z-10 -mr-[9%]" : "z-10 -ml-[9%]"}`} {...(hero ? { "data-hero": String(8 + i), "data-hero-kind": "panel", "data-hero-delay": String(i * 0.12) } : { "data-clip": "left" })}>
          <Skew src={p.src} alt={p.alt} className={i === 1 ? "aspect-[1.15/1] shadow-[var(--shadow)] md:aspect-[1.45/1]" : "aspect-[1.15/1] md:aspect-[1.5/1]"} sizes={i === 1 ? "(min-width:768px) 42vw, 50vw" : "(min-width:768px) 32vw, 40vw"} priority imgClass={p.pos ?? ""} />
        </div>
      ))}
      {tag && (
        <p className="cond absolute right-0 -bottom-5 z-30 -skew-x-12 bg-gold px-5 py-2.5 text-[clamp(0.95rem,1.4vw,1.3rem)] text-night shadow-[var(--shadow)] md:right-[2%] md:-bottom-6" data-hero="11" data-hero-kind="pop">
          <span className="block skew-x-12">{tag}</span>
        </p>
      )}
    </div>
  );
}

/** 01 WEEKLY MATCHES | Compete on a consistent schedule. */
export function NumberedList({ items, className = "" }: { items: { n: string; title: string; blurb: string }[]; className?: string }) {
  return (
    <ol className={`divide-y divide-line ${className}`} data-stagger>
      {items.map((it) => (
        <li key={it.n} className="reveal group grid items-center gap-x-6 gap-y-1 py-6 md:grid-cols-[5rem_1fr_auto_1fr] md:py-7">
          <span className="cond text-[clamp(2.4rem,4vw,3.6rem)] text-gold transition-transform duration-500 group-hover:-translate-x-1">{it.n}</span>
          <h3 className="caps text-[clamp(1.6rem,2.8vw,2.6rem)] transition-transform duration-500 group-hover:translate-x-2">{it.title}</h3>
          <span className="hidden h-10 w-[3px] -skew-x-12 bg-gold/70 md:block" aria-hidden />
          <p className="sub text-[1rem] text-muted md:text-[1.05rem]">{it.blurb}</p>
        </li>
      ))}
    </ol>
  );
}

/** Full-width band with corner stripes. tone: ink (black) | pulse (blue to purple). */
export function Band({ tone, children, className = "", id, dots = false }: { tone: "ink" | "pulse"; children: React.ReactNode; className?: string; id?: string; dots?: boolean }) {
  return (
    <section id={id} className={`relative scroll-mt-24 overflow-hidden px-[5%] py-14 md:py-20 ${tone === "ink" ? "scheme-ink" : "scheme-pulse"} ${className}`}>
      <Stripes className="absolute top-[8%] -left-[4%] w-[18vw] max-w-[220px]" />
      <Stripes className="absolute -right-[4%] bottom-[6%] w-[18vw] max-w-[220px]" flip color={tone === "ink" ? "#8f11a8" : "#d9b640"} />
      {dots && <Dots className="absolute -top-[4%] right-[12%] h-[14vw] w-[20vw] max-w-[240px] rotate-180 opacity-50" />}
      <div className="relative container">{children}</div>
    </section>
  );
}

/** 01 SIGN UP | 02 GET MATCH DETAILS | 03 COMPETE, optional chevrons between. */
export function StepsRow({ steps, note, chevrons = false, bars = true, className = "" }: { steps: { n: string; title: string }[]; note?: string; chevrons?: boolean; bars?: boolean; className?: string }) {
  return (
    <div className={`text-center ${className}`}>
      <ol className={`grid grid-cols-2 gap-x-4 gap-y-8 md:flex md:items-start md:justify-center ${chevrons ? "md:gap-6" : "md:gap-0"}`} data-stagger="pop">
        {steps.map((s, i) => (
          <li key={s.n} className="reveal flex items-start justify-center">
            {i > 0 && chevrons && <Chevrons size={30} className="mt-3 mr-6 hidden shrink-0 text-gold md:block" />}
            {i > 0 && bars && !chevrons && <span className="mx-8 mt-3 hidden h-14 w-[3px] shrink-0 -skew-x-12 bg-gold/80 md:block lg:mx-12" aria-hidden />}
            <span className="block">
              <span className="cond block text-[clamp(2.8rem,5vw,4.4rem)] text-gold">{s.n}</span>
              <span className="caps mt-1 block text-[clamp(1rem,1.5vw,1.35rem)] tracking-[-0.01em]">{s.title}</span>
            </span>
          </li>
        ))}
      </ol>
      {note && <p className="sub reveal mt-9 text-[clamp(0.95rem,1.3vw,1.15rem)] text-ink/85">{note}</p>}
    </div>
  );
}

/** Closing CTA band: big caps title, gold button, optional underline link. */
export function CtaBand({ title, button, link, tone = "pulse", eyebrow }: { title: string; button: Href; link?: Href; tone?: "pulse" | "ink"; eyebrow?: string }) {
  return (
    <Band tone={tone} dots>
      <div className="text-center">
        {eyebrow && <Tag tone="outline" className="reveal mb-6 text-sm">{eyebrow}</Tag>}
        <h2 className="caps text-[clamp(2.6rem,6.6vw,6.2rem)] text-white" data-split>
          <Split text={title} />
        </h2>
        <div className="reveal mt-8 flex flex-col items-center gap-4">
          <Cta {...button} className="btn btn-gold btn-lg" />
          {link && (
            <Cta {...link} className="link-u text-[0.95rem] font-semibold italic text-white/90">
              <span />
            </Cta>
          )}
        </div>
      </div>
    </Band>
  );
}

/** "Play with us | Volunteer | Partner with WG" style row. */
export function LinkRow({ items, className = "" }: { items: { title: string; href?: string; blurb?: string }[]; className?: string }) {
  return (
    <ul className={`flex flex-col items-center gap-5 md:flex-row md:justify-center md:gap-0 ${className}`} data-stagger>
      {items.map((l, i) => (
        <li key={l.title} className="reveal flex items-center text-center">
          {i > 0 && <span className="mx-8 hidden h-9 w-[3px] -skew-x-12 bg-gold md:block lg:mx-10" aria-hidden />}
          <span>
            {l.href ? (
              <Cta label={l.title} href={l.href} className="link-arrow caps text-[clamp(1.2rem,1.8vw,1.6rem)]">
                <ArrowNE size={20} />
              </Cta>
            ) : (
              <span className="caps text-[clamp(1.2rem,1.8vw,1.6rem)]">{l.title}</span>
            )}
            {l.blurb && <span className="sub mt-1 block text-[0.95rem] text-muted">{l.blurb}</span>}
          </span>
        </li>
      ))}
    </ul>
  );
}

/** Wide skewed photo with corner stripes (community sections). */
export function WidePhoto({ src, alt, pos = "", className = "", children }: { src: string; alt: string; pos?: string; className?: string; children?: React.ReactNode }) {
  return (
    <div className={`relative ${className}`}>
      <Stripes className="absolute top-[6%] -left-[5%] z-20 w-[16vw] max-w-[200px]" color="#8f11a8" />
      <Stripes className="absolute -right-[5%] bottom-[4%] z-20 w-[16vw] max-w-[200px]" flip />
      <div className="relative mx-auto w-[94%] md:w-[90%]" data-clip="left">
        <Skew src={src} alt={alt} className="aspect-[4/3] md:aspect-[2.6/1]" sizes="90vw" imgClass={pos} tilt={false}>
          {children}
        </Skew>
      </div>
    </div>
  );
}

/** Blue-to-purple marquee strip with gold chevrons. */
export function Marquee({ text, className = "" }: { text: string; className?: string }) {
  return (
    <div className={`scheme-pulse relative z-10 overflow-hidden py-3.5 ${className}`} data-marquee aria-hidden>
      <div className="marquee-track items-center gap-10 pr-10">
        {Array.from({ length: 8 }).map((_, i) => (
          <span key={i} className="cond flex items-center gap-5 text-[clamp(1.3rem,2.4vw,2rem)] whitespace-nowrap text-white">
            <Chevrons className="text-gold" />
            {text}
          </span>
        ))}
      </div>
    </div>
  );
}
