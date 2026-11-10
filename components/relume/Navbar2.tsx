"use client";

/* Relume Navbar 2 (logo left, menu center, button right), adapted to the Workin Gamerz header:
   shield logo, four links, theme toggle and the gold Join Discord pill. Hides on scroll down, returns
   on scroll up. Mobile menu is CSS-breakpoint driven (no JS media query branch). */
import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "motion/react";
import { footerNav, nav, site, socials } from "@/lib/content";
import { ArrowNE, Logo } from "@/components/Decor";
import { ThemeToggle } from "@/components/ThemeToggle";

// Routes whose hero is the black band, so the header starts in light text.
const inkHeroes = ["/tournaments"];

export function Navbar2() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => setOpen(false), [pathname]);

  useEffect(() => {
    let last = window.scrollY;
    const handler = () => {
      const y = window.scrollY;
      setScrolled(y > 24);
      if (y > 320 && y > last + 4) setHidden(true);
      else if (y < last - 4 || y < 320) setHidden(false);
      last = y;
    };
    handler();
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const onInk = inkHeroes.includes(pathname) && !scrolled && !open;
  return (
    <header
      className={`fixed inset-x-0 top-0 z-[999] transition-[transform,background-color,box-shadow,color] duration-500 ease-[cubic-bezier(.2,.8,.2,1)] ${onInk ? "text-paper" : "text-ink"} ${
        scrolled || open ? "bg-bg/85 shadow-[0_1px_0_var(--line)] backdrop-blur-xl" : "bg-transparent"
      }`}
      style={{ transform: hidden && !open ? "translateY(-110%)" : "translateY(0)" }}
    >
      <span className="absolute inset-x-0 bottom-0 h-[2px] origin-left bg-gold" data-progress aria-hidden />
      <nav aria-label="Main" className="px-[5%]">
        <div className="mx-auto flex min-h-[5.5rem] max-w-[88rem] items-center justify-between gap-4 lg:grid lg:grid-cols-[1fr_auto_1fr]">
          <Link href="/" aria-label="Workin Gamerz home" className="shrink-0" data-hero="1" data-hero-kind="fade">
            <Logo className="h-14 md:h-[4.4rem]" />
          </Link>

          <ul className="hidden items-center gap-2 text-[1rem] font-bold lg:flex" data-hero="2" data-hero-kind="fade">
            {nav.map((l) => (
              <li key={l.title}>
                <Link href={l.url} className="block px-4 py-2">
                  <span className="link-u" aria-current={pathname.startsWith(l.url) ? "page" : undefined}>{l.title}</span>
                </Link>
              </li>
            ))}
          </ul>

          <div className="flex items-center justify-end gap-3" data-hero="3" data-hero-kind="fade">
            <ThemeToggle />
            <a href={site.discord} target="_blank" rel="noopener" className="btn btn-gold btn-sm hidden sm:inline-flex" data-magnetic>
              Join Discord <ArrowNE size={16} />
            </a>
            <button className="flex size-11 flex-col items-center justify-center lg:hidden" aria-label={open ? "Close menu" : "Open menu"} aria-expanded={open} onClick={() => setOpen((p) => !p)}>
              <motion.span className="my-[3px] h-[2.5px] w-7 rounded bg-current" animate={open ? ["open", "rotatePhase"] : "closed"} variants={topLineVariants} />
              <motion.span className="my-[3px] h-[2.5px] w-7 rounded bg-current" animate={open ? "open" : "closed"} variants={middleLineVariants} />
              <motion.span className="my-[3px] h-[2.5px] w-7 rounded bg-current" animate={open ? ["open", "rotatePhase"] : "closed"} variants={bottomLineVariants} />
            </button>
          </div>
        </div>

        <motion.div initial={false} animate={open ? { height: "auto", opacity: 1 } : { height: 0, opacity: 0 }} transition={{ duration: 0.45, ease: [0.2, 0.8, 0.2, 1] }} className="overflow-hidden lg:hidden">
          <ul className="pt-2 pb-8">
            {footerNav.map((l, i) => (
              <motion.li key={l.title} initial={false} animate={open ? { y: 0, opacity: 1 } : { y: 14, opacity: 0 }} transition={{ delay: open ? 0.08 + i * 0.05 : 0, duration: 0.35 }}>
                <Link href={l.url} onClick={() => setOpen(false)} className="flex items-baseline justify-between border-b border-line py-4">
                  <span className="caps text-[2.2rem]">{l.title}</span>
                  <span className="cond text-xl text-gold">0{i + 1}</span>
                </Link>
              </motion.li>
            ))}
            <li className="flex flex-wrap gap-x-5 gap-y-2 pt-5 text-sm font-bold text-muted">
              {socials.map((s) => (
                <a key={s.title} href={s.url} target="_blank" rel="noopener" className="link-u">
                  {s.title}
                </a>
              ))}
            </li>
            <li className="pt-6">
              <a href={site.discord} target="_blank" rel="noopener" className="btn btn-gold w-full">
                Join Discord <ArrowNE />
              </a>
            </li>
          </ul>
        </motion.div>
      </nav>
    </header>
  );
}

const topLineVariants = {
  open: { translateY: 8, transition: { delay: 0.1 } },
  rotatePhase: { rotate: -45, transition: { delay: 0.2 } },
  closed: { translateY: 0, rotate: 0, transition: { duration: 0.2 } },
};
const middleLineVariants = {
  open: { width: 0, transition: { duration: 0.1 } },
  closed: { width: "1.75rem", transition: { delay: 0.3, duration: 0.2 } },
};
const bottomLineVariants = {
  open: { translateY: -8, transition: { delay: 0.1 } },
  rotatePhase: { rotate: 45, transition: { delay: 0.2 } },
  closed: { translateY: 0, rotate: 0, transition: { duration: 0.2 } },
};
