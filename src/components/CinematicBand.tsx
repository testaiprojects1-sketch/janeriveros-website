import React, { useState, useEffect, useRef } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { Reveal, Section, Kicker, StatusPill, STATE_BY_ID, I } from './primitives';

// src/components/CinematicBand.jsx
// Full-bleed cinematic photographic band — premium editorial rhythm between
// sections, and part of the storytelling (governance origin / audit trail).
// Dark scrims keep copy legible (WCAG AA) and blend the image into the page;
// instrument framing (corner brackets + mono caption) keeps it on-system.
// Subtle parallax on scroll; disabled under prefers-reduced-motion.

const BAND_IMG = {
  boardroom: "/assets/boardroom.jpg",   // "Banks. Regulators. Fortune 100."
  archive:   "/assets/archive-corridor.jpg", // immutable audit trail
};

function CinematicBand({ variant }) {
  const { t } = useLanguage();
  const data = t.bands[variant];
  const img = BAND_IMG[variant];
  const ref = useRef(null);
  const [reduce, setReduce] = useState(false);
  const [off, setOff] = useState(0);

  useEffect(() => {
    const r = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    setReduce(r);
    if (r) return;
    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const el = ref.current;
        if (!el) return;
        const rect = el.getBoundingClientRect();
        const prog = (window.innerHeight - rect.top) / (window.innerHeight + rect.height);
        setOff(Math.max(-1, Math.min(1, prog * 2 - 1)));
      });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => { window.removeEventListener("scroll", onScroll); cancelAnimationFrame(raf); };
  }, []);

  return (
    <section ref={ref} className="relative w-full overflow-hidden" aria-label={data.line}>
      <img
        src={img}
        alt=""
        aria-hidden="true"
        loading="lazy"
        decoding="async"
        className="absolute inset-x-0 -top-[10%] h-[120%] w-full object-cover select-none"
        style={{ transform: reduce ? "none" : `translateY(${off * 6}%)`, willChange: "transform" }}
        draggable="false"
      />
      {/* vertical scrim: blends top + bottom into the page background */}
      <div className="absolute inset-0" aria-hidden="true"
        style={{ background: "linear-gradient(180deg, #08090B 0%, rgba(8,9,11,0.30) 24%, rgba(8,9,11,0.55) 62%, #08090B 100%)" }}></div>
      {/* horizontal scrim: protects the copy on the left */}
      <div className="absolute inset-0" aria-hidden="true"
        style={{ background: "linear-gradient(90deg, rgba(8,9,11,0.88) 0%, rgba(8,9,11,0.35) 46%, transparent 72%)" }}></div>

      {/* caption — normal flow with generous padding so it can never overlap */}
      <div className="relative mx-auto flex min-h-[56vh] max-w-shell flex-col justify-center px-6 py-24 md:min-h-[68vh] md:px-10">
        <Reveal className="max-w-[44ch]">
          <div className="font-mono text-[11px] tracking-mono uppercase text-signal">{data.tag}</div>
          <h3 className="mt-4 font-display font-600 leading-[1.06] tracking-[-0.01em] text-fg"
              style={{ fontSize: "clamp(1.8rem, 4.4vw, 3.4rem)" }}>
            {data.line}
          </h3>
          <div className="mt-7 inline-flex items-center gap-2.5 font-mono text-[10.5px] tracking-mono uppercase text-fg-dim">
            <span className="h-1.5 w-1.5 rounded-full bg-signal" style={reduce ? {} : { animation: "node-breathe 2.4s ease-in-out infinite" }}></span>
            {data.meta}
          </div>
        </Reveal>
      </div>

      {/* corner registration brackets */}
      {["left-5 top-5 border-l border-t", "right-5 top-5 border-r border-t", "left-5 bottom-5 border-l border-b", "right-5 bottom-5 border-r border-b"].map((c, i) => (
        <span key={i} className={`pointer-events-none absolute z-10 h-5 w-5 border-fg-dim/40 ${c}`} aria-hidden="true"></span>
      ))}
    </section>
  );
}

export { CinematicBand };
