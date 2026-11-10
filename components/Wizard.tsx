"use client";

/* Multi-step lead form. Steps slide in from the right, a gold bar tracks progress, chips and
   choice cards replace plain checkboxes and radios, and the whole thing posts to /api/lead. */
import { useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import type { Field, WizardConfig } from "@/lib/wizards";
import { ArrowNE } from "@/components/Decor";
import { site } from "@/lib/content";

type Values = Record<string, string | string[]>;

export function Wizard({ config, className = "" }: { config: WizardConfig; className?: string }) {
  const [step, setStep] = useState(0);
  const [dir, setDir] = useState(1);
  const [values, setValues] = useState<Values>({});
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [state, setState] = useState<"idle" | "sending" | "done" | "error">("idle");
  const [delivered, setDelivered] = useState(true);
  const hp = useRef<HTMLInputElement>(null);
  const top = useRef<HTMLDivElement>(null);

  const total = config.steps.length;
  const current = config.steps[step];

  // Prefill from the query string, e.g. /contact?topic=Tournaments
  useEffect(() => {
    const q = new URLSearchParams(window.location.search);
    const pre: Values = {};
    config.steps.flatMap((s) => s.fields).forEach((f) => {
      const v = q.get(f.name);
      if (v) pre[f.name] = f.type === "chips" ? v.split(",") : v;
    });
    if (Object.keys(pre).length) setValues((p) => ({ ...pre, ...p }));
  }, [config]);

  const set = (name: string, v: string | string[]) => {
    setValues((p) => ({ ...p, [name]: v }));
    setErrors((p) => {
      if (!p[name]) return p;
      const n = { ...p };
      delete n[name];
      return n;
    });
  };

  const validate = () => {
    const errs: Record<string, string> = {};
    current.fields.forEach((f) => {
      const v = values[f.name];
      const empty = v == null || (Array.isArray(v) ? v.length === 0 : v.trim() === "");
      if (f.required && empty) errs[f.name] = f.type === "chips" || f.type === "radio" ? "Pick at least one." : "Required.";
      else if (f.type === "email" && typeof v === "string" && v && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v)) errs[f.name] = "Enter a valid email.";
    });
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const go = (d: number) => {
    if (d > 0 && !validate()) return;
    setDir(d);
    setStep((s) => Math.min(total - 1, Math.max(0, s + d)));
    top.current?.scrollIntoView({ block: "nearest", behavior: "smooth" });
  };

  const submit = async () => {
    if (!validate()) return;
    setState("sending");
    try {
      const res = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ intent: config.intent, tags: config.tags, page: window.location.pathname, data: values, website_hp: hp.current?.value ?? "" }),
      });
      const json = (await res.json().catch(() => ({}))) as { ok?: boolean; delivered?: boolean };
      if (!res.ok || !json.ok) throw new Error("failed");
      setDelivered(json.delivered !== false);
      setState("done");
    } catch {
      setState("error");
    }
  };

  const progress = useMemo(() => ((state === "done" ? total : step) / total) * 100, [step, total, state]);
  const variants = { enter: (d: number) => ({ x: d * 60, opacity: 0 }), center: { x: 0, opacity: 1 }, exit: (d: number) => ({ x: d * -60, opacity: 0 }) };

  return (
    <div ref={top} id={config.id} className={`scroll-mt-28 overflow-hidden rounded-[1.25rem] border border-line bg-card shadow-[var(--shadow)] ${className}`}>
      <div className="h-1.5 w-full bg-line/60">
        <motion.div className="h-full bg-gold" animate={{ width: `${progress}%` }} transition={{ duration: 0.6, ease: [0.2, 0.8, 0.2, 1] }} />
      </div>

      <div className="grid gap-8 p-6 md:grid-cols-[14rem_1fr] md:p-10 lg:grid-cols-[17rem_1fr]">
        {/* Rail */}
        <aside className="md:border-r md:border-line md:pr-8">
          <p className="eyebrow text-gold">{config.eyebrow}</p>
          <h3 className="caps mt-3 text-[clamp(1.6rem,2.4vw,2.2rem)]">{config.title}</h3>
          <ol className="mt-6 hidden gap-3 md:grid">
            {config.steps.map((s, i) => {
              const done = state === "done" || i < step;
              const active = i === step && state !== "done";
              return (
                <li key={s.title} className={`flex items-center gap-3 text-sm font-bold transition-colors ${active ? "text-ink" : done ? "text-gold" : "text-muted"}`}>
                  <span className={`cond grid size-8 place-items-center rounded-full border-2 text-base transition-colors ${active ? "border-gold bg-gold text-night" : done ? "border-gold text-gold" : "border-line"}`}>{done && !active ? "✓" : i + 1}</span>
                  {s.title}
                </li>
              );
            })}
          </ol>
          <p className="cond mt-6 text-2xl text-muted md:hidden">
            {String(Math.min(step + 1, total)).padStart(2, "0")} <span className="text-line">/</span> {String(total).padStart(2, "0")}
          </p>
        </aside>

        {/* Steps */}
        <div className="relative min-h-[22rem]">
          <AnimatePresence mode="wait" custom={dir} initial={false}>
            {state === "done" ? (
              <motion.div key="done" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="flex h-full flex-col justify-center py-6">
                <span className="grid size-16 place-items-center rounded-full bg-gold text-night" aria-hidden>
                  <svg viewBox="0 0 24 24" className="size-8" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M5 12.5l4.5 4.5L19 7" />
                  </svg>
                </span>
                <h4 className="caps mt-6 text-[clamp(1.8rem,3vw,2.6rem)]">{config.success.title}</h4>
                <p className="sub mt-3 max-w-[36rem] text-[1.05rem] text-muted">{config.success.body}</p>
                {!delivered && <p className="mt-3 text-sm text-muted">Preview mode: this submission was logged but not sent to the CRM yet.</p>}
                <a href={site.discord} target="_blank" rel="noopener" className="btn btn-royal mt-7 w-fit" data-magnetic>
                  Join the Discord <ArrowNE />
                </a>
              </motion.div>
            ) : (
              <motion.div key={step} custom={dir} variants={variants} initial="enter" animate="center" exit="exit" transition={{ duration: 0.4, ease: [0.2, 0.8, 0.2, 1] }}>
                <h4 className="caps-up text-[clamp(1.3rem,2vw,1.7rem)]">{current.title}</h4>
                {current.blurb && <p className="sub mt-1 text-muted">{current.blurb}</p>}
                <div className="mt-6 grid gap-5 sm:grid-cols-2">
                  {current.fields.map((f) => (
                    <FieldInput key={f.name} field={f} value={values[f.name]} error={errors[f.name]} onChange={(v) => set(f.name, v)} />
                  ))}
                </div>
                <input ref={hp} type="text" name="website_hp" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden />
                {state === "error" && <p className="mt-4 text-sm font-bold text-purple">Something went wrong sending that. Try again, or reach us on Discord.</p>}
                <div className="mt-8 flex flex-wrap items-center gap-3">
                  {step > 0 && (
                    <button type="button" onClick={() => go(-1)} className="btn btn-outline btn-sm">
                      Back
                    </button>
                  )}
                  {step < total - 1 ? (
                    <button type="button" onClick={() => go(1)} className="btn btn-gold" data-magnetic>
                      Continue <ArrowNE />
                    </button>
                  ) : (
                    <button type="button" onClick={submit} disabled={state === "sending"} className="btn btn-gold disabled:opacity-60" data-magnetic>
                      {state === "sending" ? "Sending..." : config.submitLabel} <ArrowNE />
                    </button>
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}

function FieldInput({ field: f, value, error, onChange }: { field: Field; value: string | string[] | undefined; error?: string; onChange: (v: string | string[]) => void }) {
  const wide = f.type === "textarea" || f.type === "radio" || f.type === "chips" || !f.half;
  const id = `f-${f.name}`;
  return (
    <div className={wide ? "sm:col-span-2" : ""}>
      <label htmlFor={id} className="mb-2 block text-[0.8rem] font-extrabold tracking-[0.08em] uppercase">
        {f.label}
      </label>
      {f.type === "textarea" && <textarea id={id} rows={4} className="field" placeholder={f.placeholder} value={(value as string) ?? ""} onChange={(e) => onChange(e.target.value)} />}
      {(f.type === "text" || f.type === "email" || f.type === "tel" || f.type === "url") && (
        <input id={id} type={f.type} className="field" placeholder={f.placeholder} value={(value as string) ?? ""} onChange={(e) => onChange(e.target.value)} autoComplete={f.type === "email" ? "email" : f.type === "tel" ? "tel" : f.name === "name" ? "name" : undefined} />
      )}
      {f.type === "radio" && (
        <div role="radiogroup" aria-labelledby={id} className="grid gap-3 sm:grid-cols-3">
          {f.options?.map((o) => (
            <button key={o} type="button" role="radio" aria-checked={value === o} onClick={() => onChange(o)} className="choice">
              <span className="choice-dot" aria-hidden />
              {o}
            </button>
          ))}
        </div>
      )}
      {f.type === "chips" && (
        <div className="flex flex-wrap gap-2.5">
          {f.options?.map((o) => {
            const arr = Array.isArray(value) ? value : [];
            const on = arr.includes(o);
            return (
              <button key={o} type="button" aria-pressed={on} onClick={() => onChange(on ? arr.filter((x) => x !== o) : [...arr, o])} className="chip">
                {o}
              </button>
            );
          })}
        </div>
      )}
      {f.hint && !error && <p className="mt-1.5 text-xs text-muted">{f.hint}</p>}
      {error && <p className="mt-1.5 text-xs font-bold text-purple">{error}</p>}
    </div>
  );
}
