import React, { useState, useEffect, useRef } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { Reveal, Section, Kicker, StatusPill, STATE_BY_ID, I } from './primitives';

// src/components/LiveBuilds.jsx
// Rebuilt as a DEPLOYMENT STATUS BOARD. A maturity track (TRAINING → IN BUILD →
// LIVE) heads the section; each system is a full-width deployment row with an
// animated maturity bar parked at its current stage. Same copy, new framing.

// stage + maturity derived from the stable agent id (single source of truth)
const STAGE_META = {
  live:     { idx: 2, pct: 100, label: "PRODUCTION" },
  build:    { idx: 1, pct: 64,  label: "INTEGRATION" },
  training: { idx: 0, pct: 30,  label: "SUPERVISED" },
};
const STAGE_TRACK = ["TRAINING", "IN BUILD", "LIVE"];

function MaturityBar({ pct, accent, dim, reduce }) {
  const [w, setW] = useState(reduce ? pct : 0);
  useEffect(() => {
    if (reduce) return;
    const id = requestAnimationFrame(() => setTimeout(() => setW(pct), 60));
    return () => cancelAnimationFrame(id);
  }, [pct, reduce]);
  return (
    <div className="relative h-1.5 w-full overflow-hidden rounded-full" style={{ background: "rgba(255,255,255,0.06)" }}>
      {/* stage tick marks at 1/3 + 2/3 */}
      <span className="pointer-events-none absolute inset-y-0 left-1/3 w-px" style={{ background: "rgba(255,255,255,0.12)" }} aria-hidden="true"></span>
      <span className="pointer-events-none absolute inset-y-0 left-2/3 w-px" style={{ background: "rgba(255,255,255,0.12)" }} aria-hidden="true"></span>
      <span
        className="block h-full rounded-full"
        style={{
          width: w + "%",
          background: dim ? "linear-gradient(90deg, rgba(155,163,173,0.5), #9BA3AD)" : `linear-gradient(90deg, rgba(255,194,74,0.45), ${accent})`,
          boxShadow: dim ? "none" : `0 0 14px -2px ${accent}`,
          transition: "width 1.1s cubic-bezier(.22,.61,.36,1)",
        }}
      ></span>
    </div>
  );
}

function DeployRow({ card, i, reduce }) {
  const state = STATE_BY_ID[card.id];
  const meta = STAGE_META[state] || STAGE_META.training;
  const dim = state === "training";
  const accent = dim ? "#9BA3AD" : "#FFC24A";

  return (
    <Reveal
      delay={i * 90}
      className="group relative grid grid-cols-1 gap-6 rounded-xl border border-line bg-ink-800/60 p-6 transition-all duration-300 hover:border-fg-dim/50 md:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)] md:items-center md:p-7"
    >
      {/* left rail accent keyed to stage */}
      <span className="absolute inset-y-5 left-0 w-[3px] rounded-full" style={{ background: `linear-gradient(180deg, ${accent}, transparent)` }} aria-hidden="true"></span>

      {/* LEFT: identity + description + maturity */}
      <div className="md:pl-3">
        <div className="flex items-center gap-3">
          <span className="font-mono text-[11px] text-fg-dim tabular-nums">{String(i + 1).padStart(2, "0")}</span>
          <h3 className="font-display text-[26px] font-600 tracking-tight text-fg">{card.id}</h3>
          <StatusPill id={card.id} label={card.status} size="lg" live={card.id === "MAVIS"} />
        </div>

        <p className="mt-3 text-fg-muted leading-[1.55]" style={{ fontSize: "14.5px" }}>{card.desc}</p>

        <div className="mt-5">
          <div className="mb-2 flex items-center justify-between font-mono text-[10px] tracking-mono uppercase">
            <span className="text-fg-dim">MATURITY · {meta.label}</span>
            <span style={{ color: accent }} className="tabular-nums">{meta.pct}%</span>
          </div>
          <MaturityBar pct={meta.pct} accent={accent} dim={dim} reduce={reduce} />
          {/* stage track labels */}
          <div className="mt-2 flex justify-between font-mono text-[9px] tracking-mono uppercase">
            {STAGE_TRACK.map((s, k) => (
              <span key={s} style={{ color: k === meta.idx ? accent : "#3A4048" }}>{s}</span>
            ))}
          </div>
        </div>
      </div>

      {/* RIGHT: capability manifest + cta */}
      <div className="md:border-l md:border-line md:pl-7">
        <div className="font-mono text-[9.5px] tracking-mono uppercase text-fg-dim">MANIFEST</div>
        <ul className="mt-3 grid gap-2 sm:grid-cols-2">
          {card.features.map((f, k) => (
            <li key={k} className="flex items-center gap-2.5 font-mono text-[12px] text-fg-muted">
              <I.Check className="h-3.5 w-3.5 shrink-0" style={{ color: accent }} />
              {f}
            </li>
          ))}
        </ul>
        <a href="#contact" className="mt-6 inline-flex items-center gap-2 font-mono text-[12px] tracking-mono uppercase text-fg-dim transition-colors group-hover:text-signal">
          {card.cta}
          <I.ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
        </a>
      </div>
    </Reveal>
  );
}

function LiveBuilds() {
  const { t } = useLanguage();
  const b = t.builds;
  const [reduce, setReduce] = useState(false);
  useEffect(() => { setReduce(window.matchMedia("(prefers-reduced-motion: reduce)").matches); }, []);

  return (
    <Section id="builds" className="py-24 md:py-32" bg="#0A0C0F">
      <Reveal><Kicker index={b.index} label={b.kicker} /></Reveal>
      <Reveal delay={80}>
        <h2 className="mt-6 font-display font-600 leading-[1.04] tracking-[-0.01em] text-fg" style={{ fontSize: "clamp(1.9rem, 4.4vw, 3.4rem)" }}>
          {b.title}
        </h2>
      </Reveal>

      {/* legend: deployment pipeline */}
      <Reveal delay={120} className="mt-8 flex flex-wrap items-center gap-x-3 gap-y-2 font-mono text-[10px] tracking-mono uppercase text-fg-dim">
        <span className="text-fg-muted">PIPELINE</span>
        {STAGE_TRACK.map((s, k) => (
          <React.Fragment key={s}>
            <span className="flex items-center gap-1.5">
              <span className="h-1.5 w-1.5 rounded-full" style={{ background: k === 2 ? "#FFC24A" : k === 1 ? "rgba(255,194,74,0.55)" : "#5B6470" }}></span>
              {s}
            </span>
            {k < STAGE_TRACK.length - 1 && <I.ArrowRight className="h-3 w-3 text-fg-faint" />}
          </React.Fragment>
        ))}
      </Reveal>

      <div className="mt-8 space-y-4">
        {b.cards.map((c, i) => <DeployRow key={c.id} card={c} i={i} reduce={reduce} />)}
      </div>
    </Section>
  );
}

export { LiveBuilds };
