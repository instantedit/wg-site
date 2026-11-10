import Image from "next/image";

type IconProps = { size?: number; className?: string };

/** North-east arrow used on every CTA in the mockup. */
export function ArrowNE({ size = 18, className = "" }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden>
      <path d="M7 17L17 7M9 7h8v8" />
    </svg>
  );
}

export function Chevrons({ size = 22, className = "" }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden>
      <path d="M4 5l6 7-6 7h4.5l6-7-6-7zM11.5 5l6 7-6 7H16l6-7-6-7z" />
    </svg>
  );
}

/** Three parallel gold speed stripes. */
export function Stripes({ className = "", flip = false, color = "#d9b640" }: { className?: string; flip?: boolean; color?: string }) {
  return (
    <svg viewBox="0 0 200 120" className={`pointer-events-none select-none ${className}`} style={flip ? { transform: "scaleX(-1)" } : undefined} aria-hidden>
      <g fill={color} transform="skewX(-28)">
        <rect x="30" y="0" width="16" height="120" />
        <rect x="62" y="0" width="16" height="120" />
        <rect x="94" y="0" width="16" height="120" />
      </g>
    </svg>
  );
}

/** Purple halftone corner, fading toward the page. */
export function Dots({ className = "" }: { className?: string }) {
  return <div className={`dots pointer-events-none ${className}`} style={{ maskImage: "radial-gradient(ellipse at 100% 100%, #000 30%, transparent 72%)", WebkitMaskImage: "radial-gradient(ellipse at 100% 100%, #000 30%, transparent 72%)" }} aria-hidden />;
}

/** Parallelogram photo frame. `tilt` adds the 3D cursor tilt on desktop. */
export function Skew({ src, alt, className = "", sizes = "(min-width:1024px) 33vw, 90vw", priority = false, tilt = true, imgClass = "", children }: { src: string; alt: string; className?: string; sizes?: string; priority?: boolean; tilt?: boolean; imgClass?: string; children?: React.ReactNode }) {
  return (
    <div className={`skew-panel ${className}`} data-tilt={tilt ? "8" : undefined} data-hover-target="">
      <Image src={src} alt={alt} fill sizes={sizes} priority={priority} quality={85} className={`object-cover ${imgClass}`} />
      {children}
    </div>
  );
}

export function Logo({ className = "h-14" }: { className?: string }) {
  return <Image src="/logo/wg-shield.png" alt="Workin Gamerz" width={244} height={270} priority className={`w-auto ${className}`} />;
}
