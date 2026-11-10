"use client";

import { useEffect, useState } from "react";

type Theme = "light" | "dark";
const KEY = "wg-theme";

/* Runs before paint (inlined in layout) so the first frame already wears the saved theme. */
export const themeScript = `(function(){try{var t=localStorage.getItem('${KEY}');if(t!=='light'&&t!=='dark'){t=matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light'}document.documentElement.setAttribute('data-theme',t)}catch(e){}})()`;

type DocWithVT = Document & { startViewTransition?: (cb: () => void) => { ready: Promise<void> } };

export function ThemeToggle({ className = "" }: { className?: string }) {
  const [theme, setTheme] = useState<Theme>("light");

  useEffect(() => {
    setTheme((document.documentElement.getAttribute("data-theme") as Theme) || "light");
  }, []);

  const apply = (next: Theme) => {
    document.documentElement.setAttribute("data-theme", next);
    try {
      localStorage.setItem(KEY, next);
    } catch {}
    setTheme(next);
  };

  const toggle = (e: React.MouseEvent<HTMLButtonElement>) => {
    const next: Theme = theme === "dark" ? "light" : "dark";
    const doc = document as DocWithVT;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!doc.startViewTransition || reduced) return apply(next);
    // The new theme grows out of the button as a circle.
    const x = e.clientX || window.innerWidth - 60;
    const y = e.clientY || 40;
    const r = Math.hypot(Math.max(x, innerWidth - x), Math.max(y, innerHeight - y));
    const vt = doc.startViewTransition(() => apply(next));
    vt.ready.then(() => {
      document.documentElement.animate(
        { clipPath: [`circle(0px at ${x}px ${y}px)`, `circle(${r}px at ${x}px ${y}px)`] },
        { duration: 700, easing: "cubic-bezier(.7,0,.2,1)", pseudoElement: "::view-transition-new(root)" },
      );
    });
  };

  const dark = theme === "dark";
  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={dark ? "Switch to light mode" : "Switch to dark mode"}
      aria-pressed={dark}
      className={`group relative grid size-11 place-items-center rounded-full border-2 border-current/25 transition-colors duration-500 hover:border-gold ${className}`}
      data-magnetic
    >
      <span className="sr-only">{dark ? "Light mode" : "Dark mode"}</span>
      {/* Sun */}
      <svg
        viewBox="0 0 24 24"
        className={`absolute size-5 transition-all duration-700 ease-[cubic-bezier(.7,0,.2,1)] ${dark ? "rotate-90 scale-50 opacity-0" : "rotate-0 scale-100 opacity-100"}`}
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        aria-hidden
      >
        <circle cx="12" cy="12" r="4" />
        <path d="M12 2.5v2.2M12 19.3v2.2M2.5 12h2.2M19.3 12h2.2M5.3 5.3l1.5 1.5M17.2 17.2l1.5 1.5M5.3 18.7l1.5-1.5M17.2 6.8l1.5-1.5" />
      </svg>
      {/* Moon */}
      <svg
        viewBox="0 0 24 24"
        className={`absolute size-5 transition-all duration-700 ease-[cubic-bezier(.7,0,.2,1)] ${dark ? "rotate-0 scale-100 opacity-100" : "-rotate-90 scale-50 opacity-0"}`}
        fill="currentColor"
        aria-hidden
      >
        <path d="M14.5 2.8a9.3 9.3 0 1 0 6.7 13.9A8 8 0 0 1 14.5 2.8z" />
      </svg>
      <span className="absolute inset-0 rounded-full bg-gold/0 transition-colors duration-500 group-hover:bg-gold/10" aria-hidden />
    </button>
  );
}
