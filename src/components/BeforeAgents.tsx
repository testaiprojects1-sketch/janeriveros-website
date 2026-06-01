import React, { useState, useEffect, useRef } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { Reveal, Section, Kicker, StatusPill, STATE_BY_ID, I } from './primitives';

// src/components/BeforeAgents.jsx
// Editorial long-form. Staccato lines get real typographic rhythm.
// Reserved slot for operational photography.

function BeforeAgents() {
  const { t } = useLanguage();
  const b = t.before;
  return (
    <Section id="before" className="py-24 md:py-36">
      <Reveal><Kicker index={b.index} label={b.kicker} /></Reveal>

      <div className="mt-12 grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16">
        {/* text column */}
        <div>
          <Reveal>
            <h2 className="font-display font-600 leading-[1.06] tracking-[-0.01em] text-fg" style={{ fontSize: "clamp(1.9rem, 4vw, 3rem)" }}>
              {b.title}
            </h2>
          </Reveal>

          {/* staccato lines */}
          <div className="mt-9 flex flex-col">
            {b.staccato.map((word, i) => (
              <Reveal key={i} delay={i * 110} className="flex items-baseline gap-4 border-b border-line py-3">
                <span className="font-mono text-[11px] tracking-mono text-signal/70 w-8">{String(i + 1).padStart(2, "0")}</span>
                <span className="font-display font-600 tracking-[-0.005em] text-fg" style={{ fontSize: "clamp(1.6rem, 4vw, 2.6rem)" }}>
                  {word}
                </span>
              </Reveal>
            ))}
          </div>

          <div className="mt-9 space-y-5 max-w-[58ch]">
            {b.body.map((p, i) => (
              <Reveal key={i} delay={60 + i * 60}>
                <p className="text-fg-muted leading-[1.75]" style={{ fontSize: "1.0625rem" }}>{p}</p>
              </Reveal>
            ))}
          </div>
        </div>

        {/* operational portrait — duotone treatment to sit native in the dark system */}
        <Reveal delay={120} className="lg:sticky lg:top-24 lg:self-start">
          <figure className="relative aspect-[4/5] w-full overflow-hidden rounded-xl border border-line bg-ink-900 bg-grid">
            <img
              src="/assets/jane-portrait-v2.png"
              alt="Jane Riveros"
              loading="lazy"
              decoding="async"
              className="absolute inset-0 h-full w-full object-cover object-[50%_22%] select-none"
              draggable="false"
            />
            {/* bottom scrim so the corner label stays legible over the image */}
            <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-ink/80 to-transparent" aria-hidden="true"></div>

            {/* corner crop marks — instrument framing */}
            {["left-3 top-3 border-l border-t", "right-3 top-3 border-r border-t", "left-3 bottom-3 border-l border-b", "right-3 bottom-3 border-r border-b"].map((c, i) => (
              <span key={i} className={`absolute z-10 h-4 w-4 border-fg-dim/50 ${c}`} aria-hidden="true"></span>
            ))}

            {/* top instrument label */}
            <figcaption className="absolute left-4 top-4 z-10 flex items-center gap-2 font-mono text-[10px] tracking-mono uppercase text-fg-dim">
              <span className="h-1.5 w-1.5 rounded-full bg-signal"></span>
              {b.photoCaption}
            </figcaption>

            <div className="absolute left-4 bottom-4 z-10 font-mono text-[10px] tracking-mono text-fg-faint">IMG_0001 · ƒ2.0 · 4:5</div>
          </figure>
        </Reveal>
      </div>
    </Section>
  );
}

export { BeforeAgents };
