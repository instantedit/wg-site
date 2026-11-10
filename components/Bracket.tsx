/* Tournament bracket: four opening matches feed two semifinals and a final. Connector lines are
   SVG paths drawn on scroll (data-draw), the pills pop in staggered. */
export function Bracket() {
  const pill = (label: string, tone: "royal" | "purple" | "gold", cls = "") => (
    <span className={`reveal sub inline-flex items-center justify-center rounded-full px-6 py-2.5 text-[clamp(0.95rem,1.3vw,1.15rem)] ${tone === "royal" ? "bg-royal text-white" : tone === "purple" ? "bg-purple text-white" : "bg-gold text-night"} ${cls}`}>{label}</span>
  );
  return (
    <div className="relative mx-auto max-w-[62rem]" data-stagger="pop">
      {/* Desktop: three columns with SVG connectors */}
      <div className="relative hidden grid-cols-[1fr_auto_1fr_auto_1fr] items-center gap-x-0 md:grid">
        <div className="grid gap-y-3">
          {["Opening matches", "Opening matches"].map((l, i) => (
            <span key={i} className="block">
              {pill(l, "royal", "w-full")}
            </span>
          ))}
          <span className="h-4" />
          {["Opening matches", "Opening matches"].map((l, i) => (
            <span key={i} className="block">
              {pill(l, "royal", "w-full")}
            </span>
          ))}
        </div>
        <svg viewBox="0 0 80 260" className="h-[17rem] w-20 text-ink" fill="none" stroke="currentColor" strokeWidth="3" aria-hidden>
          <path d="M0 30 H28 V86 H0 M28 58 H80" data-draw />
          <path d="M0 174 H28 V230 H0 M28 202 H80" data-draw />
        </svg>
        <div className="grid gap-y-[6.5rem]">
          {pill("Semifinals", "purple", "w-full")}
          {pill("Semifinals", "purple", "w-full")}
        </div>
        <svg viewBox="0 0 80 260" className="h-[17rem] w-20 text-ink" fill="none" stroke="currentColor" strokeWidth="3" aria-hidden>
          <path d="M0 58 H34 V202 H0 M34 130 H80" data-draw />
        </svg>
        <div>{pill("Final", "gold", "caps w-full py-4 text-[clamp(1.4rem,2.2vw,2rem)] not-italic")}</div>
      </div>

      {/* Mobile: vertical list */}
      <ol className="grid gap-3 md:hidden">
        <li className="grid grid-cols-2 gap-3">
          {pill("Opening", "royal", "w-full")}
          {pill("Opening", "royal", "w-full")}
        </li>
        <li className="grid grid-cols-2 gap-3">
          {pill("Opening", "royal", "w-full")}
          {pill("Opening", "royal", "w-full")}
        </li>
        <li className="grid grid-cols-2 gap-3">
          {pill("Semifinal", "purple", "w-full")}
          {pill("Semifinal", "purple", "w-full")}
        </li>
        <li>{pill("Final", "gold", "caps w-full py-4 text-2xl not-italic")}</li>
      </ol>
    </div>
  );
}
