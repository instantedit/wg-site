/* Relume Footer 4 (logo, link row, bottom bar), compressed into the single ink bar that closes the
   mockup: shield, three-word tagline, page links over social links with gold dots, the domain. */
import Link from "next/link";
import { footerNav, site, socials } from "@/lib/content";
import { Logo } from "@/components/Decor";

export function Footer4() {
  return (
    <footer className="scheme-ink relative overflow-hidden px-[5%] pt-10 pb-8">
      <div className="container">
        <div className="grid items-center gap-8 lg:grid-cols-[auto_1fr_auto]">
          <div className="flex items-center gap-5">
            <Link href="/" aria-label="Workin Gamerz home">
              <Logo className="h-20" />
            </Link>
            <p className="sub text-[1.05rem] leading-tight text-ink/90">
              Community.
              <br />
              Competition.
              <br />
              Connection.
            </p>
          </div>

          <div className="flex flex-col items-start gap-4 lg:items-center lg:border-x lg:border-line lg:px-10">
            <ul className="flex flex-wrap gap-x-7 gap-y-2 text-[0.95rem] font-bold">
              {footerNav.map((l) => (
                <li key={l.title}>
                  <Link href={l.url} className="link-u">
                    {l.title}
                  </Link>
                </li>
              ))}
            </ul>
            <ul className="flex flex-wrap items-center gap-x-4 gap-y-2 text-[0.9rem] font-semibold text-ink/80">
              {socials.map((s, i) => (
                <li key={s.title} className="flex items-center gap-4">
                  {i > 0 && <span className="size-1.5 rounded-full bg-gold" aria-hidden />}
                  <a href={s.url} target="_blank" rel="noopener" className="link-u hover:text-ink">
                    {s.title}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <a href={site.url} className="link-u text-[1rem] font-bold lg:justify-self-end">
            {site.web}
          </a>
        </div>

        <p className="mt-8 border-t border-line pt-5 text-[0.78rem] text-muted">
          © {new Date().getFullYear()} {site.name} · {site.city} · Made with ALOHA by{" "}
          <a href="https://instantedit.com" target="_blank" rel="noopener" className="underline decoration-gold/60 underline-offset-4 hover:text-ink">
            instantedit
          </a>
        </p>
      </div>
    </footer>
  );
}
