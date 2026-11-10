"use client";

import { useState } from "react";
import { motion } from "motion/react";
import { internRoles, volunteerRoles } from "@/lib/content";
import { ArrowNE } from "@/components/Decor";

const tabs = [
  { key: "volunteer", label: "Volunteer", roles: volunteerRoles, path: "Volunteer" },
  { key: "intern", label: "Internship + contract", roles: internRoles, path: "Internship" },
];

/** Volunteer / Internship toggle over the numbered role list. */
export function RoleTabs() {
  const [active, setActive] = useState(0);
  const tab = tabs[active];
  return (
    <div>
      <div role="tablist" aria-label="Role type" className="relative inline-flex rounded-full border-2 border-line p-1">
        {tabs.map((t, i) => (
          <button key={t.key} role="tab" aria-selected={i === active} onClick={() => setActive(i)} className={`relative z-10 rounded-full px-5 py-2.5 text-[0.95rem] font-bold transition-colors duration-300 ${i === active ? "text-night" : "text-ink"}`}>
            {i === active && <motion.span layoutId="role-tab" className="absolute inset-0 -z-10 rounded-full bg-gold" transition={{ type: "spring", stiffness: 400, damping: 32 }} />}
            {t.label}
          </button>
        ))}
      </div>
      <motion.ol key={tab.key} initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }} className="mt-6 divide-y divide-line">
        {tab.roles.map((r) => (
          <li key={r.title} className="group grid grid-cols-[auto_1fr] items-start gap-x-5 py-5 md:grid-cols-[auto_1fr_auto]">
            <span className="cond text-[clamp(2.2rem,3.4vw,3.2rem)] text-gold">{r.n}</span>
            <span>
              <span className="caps block text-[clamp(1.3rem,2vw,1.8rem)] transition-transform duration-500 group-hover:translate-x-2">{r.title}</span>
              <span className="sub block text-muted">{r.blurb}</span>
            </span>
            <a href="#apply" className="link-arrow col-start-2 mt-2 text-sm text-gold md:col-start-3 md:mt-1 md:self-center" data-cursor>
              <span className="link-u">Learn more</span> <ArrowNE size={16} />
            </a>
          </li>
        ))}
      </motion.ol>
    </div>
  );
}
