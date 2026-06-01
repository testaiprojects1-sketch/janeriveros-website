import React, { useState, useEffect, useRef } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { Reveal, Section, Kicker, StatusPill, STATE_BY_ID, I } from './primitives';

// src/components/Principles.jsx
// 5 statements as a manifesto, revealed one at a time via a pinned scroll,
// with a 1/5 progress indicator. Falls back to a static list under reduced-motion.

function Principles() {
  const { t } = useLanguage();
  const p = t.principles;
  const count = p.items.length;
  const ref = useRef(null);
  const [idx, setIdx] = useState(0);
  const [reduce, setReduce] = useState(false);

  useEffect(() => { setReduce(window.matchMedia("(prefers-reduced-motion: reduce)").matches); }, []);

  useEffect(() => {
    if (reduce) return;
    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const el = ref.current;
        if (!el) return;
        const rect = el.getBoundingClientRect();
        const dist = rect.height - window.innerHeight;
        const prog = Math.max(0, Math.min(0.999, -rect.top / dist));
        setIdx(Math.max(0, Math.min(count - 1, Math.floor(prog * count))));
      });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => { window.removeEventListener("scroll", onScroll); window.removeEventListener("resize", onScroll); cancelAnimationFrame(raf); };
  }, [reduce, count]);

  // reduced-motion: simple stacked list
  if (reduce) {
    return (
      <Section id="principles" className="py-24 md:py-32">
        <Kicker index={p.index} label={p.kicker} />
        <h2 className="mt-6 font-display font-600 tracking-[-0.01em] text-fg" style={{ fontSize: "clamp(1.9rem,4vw,3rem)" }}>{p.title}</h2>
        <ol className="mt-10 space-y-8 border-t border-line pt-8">
          {p.items.map((it, i) => (
            <li key={i} className="grid grid-cols-[auto_1fr] gap-6">
              <span className="font-mono text-signal text-[13px] tracking-mono">{String(i + 1).padStart(2, "0")}</span>
              <p className="font-display font-500 tracking-[-0.005em] text-fg" style={{ fontSize: "clamp(1.3rem,3vw,2rem)" }}>{it}</p>
            </li>
          ))}
        </ol>
      </Section>
    );
  }

  return (
    <section id="principles" ref={ref} className="relative" style={{ height: `${count * 62 + 30}vh` }}>
      <div className="sticky top-0 h-screen flex items-center overflow-hidden">
        <div className="mx-auto w-full max-w-shell px-6 md:px-10">
          <Kicker index={p.index} label={p.kicker} />

          {/* progress indicator */}
          <div className="mt-7 flex items-center gap-5">
            <div className="font-mono text-[13px] tracking-mono text-fg-muted">
              <span className="text-signal">{String(idx + 1).padStart(2, "0")}</span>
              <span className="text-fg-dim"> / {String(count).padStart(2, "0")}</span>
            </div>
            <div className="flex gap-2 flex-1 max-w-[280px]">
              {p.items.map((_, i) => (
                <span key={i} className="h-[3px] flex-1 rounded-full transition-all duration-500" style={{ background: i <= idx ? "#FFC24A" : "#2a2418" }}></span>
              ))}
            </div>
          </div>

          {/* crossfaded statements */}
          <div className="relative mt-10 min-h-[42vh] md:min-h-[38vh]">
            {p.items.map((it, i) => (
              <div
                key={i}
                className="absolute inset-0 flex items-start transition-all duration-500"
                style={{
                  opacity: i === idx ? 1 : 0,
                  transform: i === idx ? "translateY(0)" : i < idx ? "translateY(-18px)" : "translateY(18px)",
                  pointerEvents: i === idx ? "auto" : "none",
                }}
                aria-hidden={i !== idx}
              >
                <p className="font-display font-600 tracking-[-0.01em] text-fg max-w-[20ch] md:max-w-[18ch]" style={{ fontSize: "clamp(2rem, 6vw, 5rem)", lineHeight: 1.02 }}>
                  {it}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export { Principles };
