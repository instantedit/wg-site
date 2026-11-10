"use client";

import { useState } from "react";
import { ArrowNE } from "@/components/Decor";

/** Inline name + email signup, same /api/lead pipeline with the newsletter tag. */
export function Newsletter() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [state, setState] = useState<"idle" | "sending" | "done" | "error">("idle");

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return setState("error");
    setState("sending");
    try {
      const res = await fetch("/api/lead", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ intent: "newsletter", tags: ["events"], page: window.location.pathname, data: { name, email } }) });
      if (!res.ok) throw new Error();
      setState("done");
    } catch {
      setState("error");
    }
  };

  if (state === "done")
    return (
      <p className="sub flex items-center gap-3 text-[1.05rem]">
        <span className="grid size-9 place-items-center rounded-full bg-gold text-night" aria-hidden>
          ✓
        </span>
        You are in the loop. Watch your inbox for upcoming events.
      </p>
    );

  return (
    <form onSubmit={submit} className="flex flex-col gap-3 sm:flex-row" noValidate>
      <input type="text" name="name" placeholder="Name" autoComplete="name" value={name} onChange={(e) => setName(e.target.value)} className="field sm:w-[12rem]" aria-label="Name" />
      <input type="email" name="email" placeholder="Email" autoComplete="email" required value={email} onChange={(e) => setEmail(e.target.value)} className="field sm:flex-1" aria-label="Email" aria-invalid={state === "error"} />
      <button type="submit" className="btn btn-gold" disabled={state === "sending"} data-magnetic>
        {state === "sending" ? "Sending..." : "Keep me updated"} <ArrowNE />
      </button>
      {state === "error" && <p className="text-sm font-bold text-gold sm:basis-full">Enter a valid email and try again.</p>}
    </form>
  );
}
