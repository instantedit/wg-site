"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/**
 * Site-wide GSAP motion, driven by data attributes. Mounted once by RevealInit in the root layout.
 *
 *   data-hero="1..n"        on-load entrance, sequenced by the number
 *     data-hero-kind="up|fade|left|right|zoom|panel|wipe|pop"
 *   data-split              word-by-word masked rise (use <Split> inside)
 *   .reveal                 rises in on scroll; data-reveal="up|left|right|fade|pop", data-delay
 *   data-stagger            on a parent: sequences its `.reveal` children
 *   data-clip="up|down|left|right"   photo unmasks on scroll (wrapper around a .skew-panel)
 *   data-line               rule draws across on scroll (data-line="center" grows from the middle)
 *   data-draw               SVG path draws itself on scroll
 *   data-float              gentle bob
 *   data-parallax="0.15"    drifts while its section scrolls
 *   data-zoom               photo eases from 1.18 to 1 while it scrolls through view
 *   data-scrub-x="-8"       slides sideways with scroll (xPercent)
 *   data-marquee            infinite strip, speeds and skews with scroll velocity
 *   data-magnetic           button leans toward the cursor (desktop)
 *   data-tilt               card tilts in 3D toward the cursor (desktop)
 *   data-hover-group        hovering a [data-hover-item] lights the matching [data-hover-target]
 *   data-progress           scaleX tracks page scroll
 *   data-cursor             grows the custom cursor ring while hovered
 *
 * Entrance tweens use fromTo + clearProps so nothing is left stuck hidden.
 */
export function useReveal() {
  const pathname = usePathname();

  useEffect(() => {
    const root = document.documentElement;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    root.classList.add("gsap-ready");
    root.classList.toggle("reduced", reduced);
    if (reduced) return;

    const cleanups: (() => void)[] = [];
    const mm = gsap.matchMedia();
    const on = <K extends keyof HTMLElementEventMap>(el: EventTarget, ev: K | string, fn: EventListenerOrEventListenerObject, opts?: AddEventListenerOptions) => {
      el.addEventListener(ev, fn, opts);
      cleanups.push(() => el.removeEventListener(ev, fn, opts));
    };

    const ctx = gsap.context(() => {
      const inHero = (el: Element) => Boolean(el.closest("[data-hero-zone]"));

      // 1. Hero entrance timeline
      const tl = gsap.timeline({ defaults: { ease: "expo.out", duration: 1.2 }, delay: 0.1 });
      gsap.utils.toArray<HTMLElement>("[data-hero-zone] [data-split]").forEach((el, i) => {
        tl.fromTo(
          el.querySelectorAll(".w > span"),
          { yPercent: 115, opacity: 0 },
          { yPercent: 0, opacity: 1, duration: 1.3, stagger: 0.06, clearProps: "transform" },
          0.15 + i * 0.18,
        );
      });
      const heroEls = gsap.utils.toArray<HTMLElement>("[data-hero]").sort((a, b) => Number(a.dataset.hero) - Number(b.dataset.hero));
      heroEls.forEach((el, i) => {
        const kind = el.dataset.heroKind ?? "up";
        const from: gsap.TweenVars = { opacity: 0 };
        const to: gsap.TweenVars = { opacity: 1, x: 0, y: 0, scale: 1, clearProps: "transform" };
        let at: gsap.Position = i === 0 ? 0.4 : "-=0.95";
        if (kind === "up") from.y = 28;
        if (kind === "left") from.x = -50;
        if (kind === "right") from.x = 50;
        if (kind === "fade") to.duration = 1.6;
        if (kind === "pop") {
          from.scale = 0.6;
          from.rotate = -6;
          to.rotate = 0;
          to.ease = "back.out(2)";
          to.duration = 0.9;
        }
        if (kind === "zoom") {
          from.scale = 1.16;
          from.opacity = 1;
          to.duration = 2.4;
          to.ease = "power3.out";
          at = 0;
        }
        if (kind === "wipe") {
          from.scaleX = 0;
          from.transformOrigin = "0% 50%";
          from.opacity = 1;
          to.scaleX = 1;
          to.duration = 0.9;
          to.ease = "expo.inOut";
          at = 0.5;
        }
        if (kind === "panel") {
          from.clipPath = "inset(0% 100% 0% 0%)";
          from.x = -40;
          from.opacity = 1;
          to.clipPath = "inset(0% 0% 0% 0%)";
          to.duration = 1.5;
          to.ease = "expo.inOut";
          to.clearProps = "transform,clipPath";
          at = 0.55 + Number(el.dataset.heroDelay ?? 0);
        }
        tl.fromTo(el, from, to, at);
      });

      // 2. Word reveals outside the hero
      gsap.utils
        .toArray<HTMLElement>("[data-split]")
        .filter((el) => !inHero(el))
        .forEach((el) => {
          gsap.fromTo(
            el.querySelectorAll(".w > span"),
            { yPercent: 115, opacity: 0 },
            { yPercent: 0, opacity: 1, duration: 1.15, ease: "expo.out", stagger: 0.055, clearProps: "transform", scrollTrigger: { trigger: el, start: "top 88%", once: true } },
          );
        });

      // 3. Staggered groups
      const claimed = new Set<Element>();
      gsap.utils.toArray<HTMLElement>("[data-stagger]").forEach((group) => {
        const items = Array.from(group.querySelectorAll<HTMLElement>(".reveal"));
        items.forEach((i) => claimed.add(i));
        if (!items.length) return;
        const pop = group.dataset.stagger === "pop";
        gsap.fromTo(
          items,
          pop ? { opacity: 0, scale: 0.7, y: 20 } : { opacity: 0, y: 50 },
          { opacity: 1, y: 0, scale: 1, duration: pop ? 0.9 : 1.1, ease: pop ? "back.out(1.8)" : "expo.out", stagger: 0.12, clearProps: "transform", scrollTrigger: { trigger: group, start: "top 85%", once: true } },
        );
      });

      // 4. Single reveals
      gsap.utils
        .toArray<HTMLElement>(".reveal")
        .filter((el) => !claimed.has(el) && !inHero(el))
        .forEach((el) => {
          const dir = el.dataset.reveal ?? "up";
          const from: gsap.TweenVars = { opacity: 0 };
          if (dir === "up") from.y = 40;
          if (dir === "left") from.x = -60;
          if (dir === "right") from.x = 60;
          if (dir === "pop") from.scale = 0.7;
          gsap.fromTo(el, from, { opacity: 1, x: 0, y: 0, scale: 1, duration: 1.1, delay: parseFloat(el.dataset.delay ?? "0"), ease: dir === "pop" ? "back.out(1.8)" : "expo.out", clearProps: "transform", scrollTrigger: { trigger: el, start: "top 88%", once: true } });
        });

      // 5. Photo unmasks
      const clipFrom: Record<string, string> = { up: "inset(100% 0% 0% 0%)", down: "inset(0% 0% 100% 0%)", left: "inset(0% 100% 0% 0%)", right: "inset(0% 0% 0% 100%)" };
      gsap.utils.toArray<HTMLElement>("[data-clip]").forEach((el) => {
        const dir = el.dataset.clip || "up";
        const img = el.querySelector("img");
        const t = gsap.timeline({ scrollTrigger: { trigger: el, start: "top 85%", once: true } });
        t.fromTo(el, { clipPath: clipFrom[dir] }, { clipPath: "inset(0% 0% 0% 0%)", duration: 1.5, ease: "expo.inOut", clearProps: "clipPath" });
        if (img) t.fromTo(img, { scale: 1.3 }, { scale: 1, duration: 2, ease: "expo.out", clearProps: "transform" }, 0.15);
      });

      // 6. Rules draw across
      gsap.utils.toArray<HTMLElement>("[data-line]").forEach((el) => {
        gsap.fromTo(
          el,
          { scaleX: 0, transformOrigin: el.dataset.line === "center" ? "50% 50%" : "0% 50%" },
          { scaleX: 1, duration: 1.4, ease: "expo.inOut", delay: inHero(el) ? 1 : 0, scrollTrigger: inHero(el) ? undefined : { trigger: el, start: "top 92%", once: true } },
        );
      });

      // 6b. SVG paths draw themselves
      gsap.utils.toArray<SVGGeometryElement>("[data-draw]").forEach((el) => {
        const len = el.getTotalLength();
        gsap.fromTo(el, { strokeDasharray: len, strokeDashoffset: len }, { strokeDashoffset: 0, duration: 1.6, ease: "expo.inOut", scrollTrigger: { trigger: el.closest("svg") ?? el, start: "top 85%", once: true } });
      });

      // 7. Float
      gsap.utils.toArray<HTMLElement>("[data-float]").forEach((el, i) => {
        gsap.to(el, { y: -9, duration: 2.4 + (i % 3) * 0.4, ease: "sine.inOut", yoyo: true, repeat: -1 });
      });

      // 8. Parallax
      gsap.utils.toArray<HTMLElement>("[data-parallax]").forEach((el) => {
        const amount = parseFloat(el.dataset.parallax || "0.12");
        gsap.fromTo(el, { yPercent: -amount * 50 }, { yPercent: amount * 50, ease: "none", scrollTrigger: { trigger: el.closest("section") ?? el.parentElement ?? el, start: "top bottom", end: "bottom top", scrub: true } });
      });

      // 9. Scrubbed photo zoom
      gsap.utils.toArray<HTMLElement>("[data-zoom]").forEach((el) => {
        gsap.fromTo(el, { scale: 1.18 }, { scale: 1, ease: "none", scrollTrigger: { trigger: el.parentElement ?? el, start: "top bottom", end: "bottom top", scrub: true } });
      });

      // 10. Sideways scrub for oversized text
      gsap.utils.toArray<HTMLElement>("[data-scrub-x]").forEach((el) => {
        const amt = parseFloat(el.dataset.scrubX || "-8");
        gsap.fromTo(el, { xPercent: -amt / 2 }, { xPercent: amt / 2, ease: "none", scrollTrigger: { trigger: el.closest("section") ?? el, start: "top bottom", end: "bottom top", scrub: 0.8 } });
      });

      // 11. Marquee with scroll-velocity boost
      gsap.utils.toArray<HTMLElement>("[data-marquee]").forEach((el) => {
        const track = el.querySelector<HTMLElement>(".marquee-track");
        if (!track) return;
        const loop = gsap.fromTo(track, { xPercent: 0 }, { xPercent: -50, duration: 28, ease: "none", repeat: -1 });
        const skewTo = gsap.quickTo(track, "skewX", { duration: 0.5, ease: "power3" });
        ScrollTrigger.create({
          trigger: el,
          start: "top bottom",
          end: "bottom top",
          onUpdate: (self) => {
            const v = self.getVelocity();
            loop.timeScale(1 + Math.min(Math.abs(v) / 300, 5));
            skewTo(gsap.utils.clamp(-10, 10, v / -250));
            gsap.to(loop, { timeScale: 1, duration: 1.2, overwrite: true, delay: 0.1 });
          },
        });
        const settle = () => skewTo(0);
        ScrollTrigger.addEventListener("scrollEnd", settle);
        cleanups.push(() => ScrollTrigger.removeEventListener("scrollEnd", settle));
      });

      // 12. Page progress hairline
      gsap.utils.toArray<HTMLElement>("[data-progress]").forEach((el) => {
        gsap.fromTo(el, { scaleX: 0, transformOrigin: "0% 50%" }, { scaleX: 1, ease: "none", scrollTrigger: { trigger: document.body, start: "top top", end: "bottom bottom", scrub: 0.3 } });
      });

      // 13. Hover groups: list item lights its photo
      gsap.utils.toArray<HTMLElement>("[data-hover-group]").forEach((group) => {
        const items = group.querySelectorAll<HTMLElement>("[data-hover-item]");
        const targets = group.querySelectorAll<HTMLElement>("[data-hover-target]");
        items.forEach((it, i) => {
          on(it, "mouseenter", () => {
            group.classList.add("is-hovering");
            targets.forEach((t, j) => t.classList.toggle("is-active", i === j));
          });
          on(it, "mouseleave", () => {
            group.classList.remove("is-hovering");
            targets.forEach((t) => t.classList.remove("is-active"));
          });
        });
      });

      // 14. Desktop only: magnetic buttons, 3D tilt, cursor ring
      mm.add("(min-width: 1024px) and (hover: hover)", () => {
        gsap.utils.toArray<HTMLElement>("[data-magnetic]").forEach((el) => {
          const xTo = gsap.quickTo(el, "x", { duration: 0.5, ease: "power3" });
          const yTo = gsap.quickTo(el, "y", { duration: 0.5, ease: "power3" });
          on(el, "mousemove", ((e: MouseEvent) => {
            const r = el.getBoundingClientRect();
            xTo((e.clientX - (r.left + r.width / 2)) * 0.25);
            yTo((e.clientY - (r.top + r.height / 2)) * 0.35);
          }) as EventListener);
          on(el, "mouseleave", () => {
            xTo(0);
            yTo(0);
          });
        });

        gsap.utils.toArray<HTMLElement>("[data-tilt]").forEach((el) => {
          const strength = parseFloat(el.dataset.tilt || "9");
          gsap.set(el, { transformPerspective: 1000 });
          const rx = gsap.quickTo(el, "rotationX", { duration: 0.7, ease: "power3" });
          const ry = gsap.quickTo(el, "rotationY", { duration: 0.7, ease: "power3" });
          const img = el.querySelector("img");
          const ix = img ? gsap.quickTo(img, "xPercent", { duration: 0.9, ease: "power3" }) : null;
          const iy = img ? gsap.quickTo(img, "yPercent", { duration: 0.9, ease: "power3" }) : null;
          on(el, "mousemove", ((e: MouseEvent) => {
            const r = el.getBoundingClientRect();
            const px = (e.clientX - r.left) / r.width - 0.5;
            const py = (e.clientY - r.top) / r.height - 0.5;
            ry(px * strength);
            rx(-py * strength);
            ix?.(px * -3);
            iy?.(py * -3);
          }) as EventListener);
          on(el, "mouseleave", () => {
            rx(0);
            ry(0);
            ix?.(0);
            iy?.(0);
          });
        });

        const ring = document.querySelector<HTMLElement>(".cursor");
        if (ring) {
          const cx = gsap.quickTo(ring, "x", { duration: 0.35, ease: "power3" });
          const cy = gsap.quickTo(ring, "y", { duration: 0.35, ease: "power3" });
          const cs = gsap.quickTo(ring, "scale", { duration: 0.4, ease: "power3" });
          let shown = false;
          on(window, "mousemove", ((e: MouseEvent) => {
            cx(e.clientX);
            cy(e.clientY);
            if (!shown) {
              shown = true;
              gsap.to(ring, { opacity: 1, duration: 0.4 });
            }
            const hot = (e.target as Element | null)?.closest("a, button, [data-cursor]");
            cs(hot ? 2.2 : 1);
          }) as EventListener);
          on(document, "mouseleave", () => gsap.to(ring, { opacity: 0, duration: 0.3 }));
        }
      });

      ScrollTrigger.refresh();
    });

    const onLoad = () => ScrollTrigger.refresh();
    window.addEventListener("load", onLoad);

    return () => {
      window.removeEventListener("load", onLoad);
      cleanups.forEach((c) => c());
      mm.revert();
      ctx.revert();
    };
  }, [pathname]);
}
