import React, { useState, useEffect, useRef } from 'react';

// src/components/primitives.jsx
// Shared building blocks: layout shells, the mono "system layer" labels,
// deployment-state status pills, scroll-reveal, and a small inline icon set.
// (In the TS handoff: src/components/ui/* — lucide-react replaces the inline icons.)


/* ---------- scroll reveal (IntersectionObserver; respects reduced-motion via CSS) ---------- */
function Reveal({ children, className = "", delay = 0, as: Tag = "div", ...rest }) {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            el.style.transitionDelay = delay + "ms";
            el.classList.add("in");
            io.unobserve(el);
          }
        });
      },
      { threshold: 0.16, rootMargin: "0px 0px -8% 0px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [delay]);
  return (
    <Tag ref={ref} className={"reveal " + className} {...rest}>
      {children}
    </Tag>
  );
}

/* ---------- section shell: full-width band + centered content column ---------- */
function Section({ id, children, className = "", bg = "transparent" }) {
  return (
    <section id={id} className={"relative w-full " + className} style={{ background: bg }}>
      <div className="mx-auto w-full max-w-shell px-6 md:px-10">{children}</div>
    </section>
  );
}

/* ---------- the mono telemetry kicker that heads every section ---------- */
function Kicker({ index, label, className = "" }) {
  return (
    <div className={"flex items-center gap-3 font-mono text-[11px] tracking-mono uppercase text-fg-dim " + className}>
      <span className="text-signal">{"//"}</span>
      <span className="text-fg-muted">{index}</span>
      <span className="h-px w-6 bg-line" aria-hidden="true"></span>
      <span>{label}</span>
    </div>
  );
}

/* ---------- deployment-state status pill (state derived from stable agent id) ---------- */
const STATE_BY_ID = { JANE: "core", MAVIS: "live", ATLAS: "build", VICTORIA: "training" };

function pillStyles(state) {
  switch (state) {
    case "live":     return { dot: "#FFC24A", text: "text-live",   ring: "border-live/40",   glow: "bg-live/10" };
    case "build":    return { dot: "#FFC24A", text: "text-signal", ring: "border-signal/40", glow: "bg-signal/10" };
    case "training": return { dot: "#9BA3AD", text: "text-fg-muted", ring: "border-fg-dim/40", glow: "bg-white/5" };
    default:         return { dot: "#EBEEF2", text: "text-fg",     ring: "border-line",      glow: "bg-white/5" };
  }
}

function StatusPill({ id, label, size = "sm", live = false }) {
  const state = STATE_BY_ID[id] || "core";
  const s = pillStyles(state);
  const pad = size === "lg" ? "px-3 py-1.5 text-[12px]" : "px-2.5 py-1 text-[10.5px]";
  return (
    <span className={`inline-flex items-center gap-2 rounded-full border ${s.ring} ${s.glow} ${pad} font-mono tracking-mono uppercase ${s.text}`}>
      <span className="relative flex h-[7px] w-[7px]">
        {live && (
          <span
            className="absolute inset-0 rounded-full"
            style={{ background: s.dot, animation: "pulse-ring 1.8s cubic-bezier(0,.55,.45,1) infinite" }}
            aria-hidden="true"
          ></span>
        )}
        <span className="relative h-[7px] w-[7px] rounded-full" style={{ background: s.dot }}></span>
      </span>
      {label}
    </span>
  );
}

/* ---------- tiny inline icon set (→ lucide-react in handoff) ---------- */
const I = {
  ArrowRight: (p) => (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M5 12h14M13 6l6 6-6 6"/></svg>),
  ArrowUpRight: (p) => (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M7 17 17 7M8 7h9v9"/></svg>),
  ChevronDown: (p) => (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="m6 9 6 6 6-6"/></svg>),
  Check: (p) => (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M20 6 9 17l-5-5"/></svg>),
  Mic: (p) => (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" {...p}><rect x="9" y="2" width="6" height="12" rx="3"/><path d="M5 10a7 7 0 0 0 14 0M12 19v3"/></svg>),
  Terminal: (p) => (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="m4 17 6-6-6-6M12 19h8"/></svg>),
  Linkedin: (p) => (<svg viewBox="0 0 24 24" fill="currentColor" {...p}><path d="M4.98 3.5A2.5 2.5 0 1 0 5 8.5a2.5 2.5 0 0 0-.02-5ZM3 9h4v12H3zM10 9h3.8v1.7h.05c.53-1 1.84-2.05 3.78-2.05 4.04 0 4.79 2.66 4.79 6.12V21h-4v-5.4c0-1.29-.02-2.95-1.8-2.95-1.8 0-2.08 1.4-2.08 2.85V21h-4z"/></svg>),
  Youtube: (p) => (<svg viewBox="0 0 24 24" fill="currentColor" {...p}><path d="M23 12s0-3.2-.4-4.7a2.5 2.5 0 0 0-1.77-1.77C19.3 5.1 12 5.1 12 5.1s-7.3 0-8.83.43A2.5 2.5 0 0 0 1.4 7.3C1 8.8 1 12 1 12s0 3.2.4 4.7a2.5 2.5 0 0 0 1.77 1.77C4.7 18.9 12 18.9 12 18.9s7.3 0 8.83-.43a2.5 2.5 0 0 0 1.77-1.77C23 15.2 23 12 23 12Zm-13 3.2V8.8l5.5 3.2Z"/></svg>),
};

export { Reveal, Section, Kicker, StatusPill, STATE_BY_ID, I };
