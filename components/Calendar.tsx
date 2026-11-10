/* "A schedule that gets you": work / life / match night calendar card. */
export function Calendar() {
  const cols = [
    { label: "Work", icon: <path d="M4 8h16v11H4zM9 8V6a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v2M4 13h16" />, cls: "bg-royal" },
    { label: "Life", icon: <path d="M8 11a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5zm8 0a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5zM3 19c0-2.8 2.2-5 5-5s5 2.2 5 5M13 19c0-2.8 2.2-5 5-5s3 2.2 3 5" />, cls: "bg-violet" },
    { label: "Match night", icon: <path d="M6 9h12a4 4 0 0 1 4 4v1a4 4 0 0 1-7 2.6L14 16h-4l-1 .6A4 4 0 0 1 2 14v-1a4 4 0 0 1 4-4zM7 12v3M5.5 13.5h3M16 12.5h.01M18.5 14h.01" />, cls: "bg-gold text-night" },
  ];
  return (
    <div className="reveal relative mx-auto w-full max-w-[26rem]" data-reveal="pop">
      <div className="absolute -top-4 left-[14%] h-8 w-2 rounded-full bg-white/80" aria-hidden />
      <div className="absolute -top-4 left-1/2 h-8 w-2 -translate-x-1/2 rounded-full bg-white/80" aria-hidden />
      <div className="absolute -top-4 right-[14%] h-8 w-2 rounded-full bg-white/80" aria-hidden />
      <div className="overflow-hidden rounded-2xl border-[3px] border-white/85 shadow-[var(--shadow)]">
        <div className="grid grid-cols-3">
          {cols.map((c, i) => (
            <div key={c.label} className={`${c.cls} ${c.cls.includes("gold") ? "" : "text-white"} grid aspect-[0.9/1] grid-rows-[auto_1fr] gap-2 border-white/40 p-3 text-center ${i > 0 ? "border-l-2" : ""}`}>
              <span className="caps-up text-[0.78rem] leading-tight">{c.label}</span>
              <span className="grid place-items-center">
                <svg viewBox="0 0 24 24" className="size-10" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                  {c.icon}
                </svg>
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
