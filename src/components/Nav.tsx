import React, { useState, useEffect, useRef } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { Reveal, Section, Kicker, StatusPill, STATE_BY_ID, I } from './primitives';

// src/components/Nav.jsx
// Minimal fixed nav. Logo, links, and the EN/ES toggle as a real mono switch.

function LangSwitch() {
  const { lang, t, setLang } = useLanguage();
  const isEs = lang === "es";
  return (
    <button
      type="button"
      onClick={() => setLang(isEs ? "en" : "es")}
      role="switch"
      aria-checked={isEs}
      aria-label={`Language: ${t.meta.lang}. Switch to ${t.meta.other}.`}
      className="group relative flex items-center rounded-full border border-line bg-ink-800/70 p-0.5 font-mono text-[10.5px] tracking-mono"
    >
      {/* sliding knob — half width, slides to active segment */}
      <span
        className="absolute top-0.5 bottom-0.5 left-0.5 w-[calc(50%-2px)] rounded-full bg-signal/15 border border-signal/40 transition-transform duration-300 ease-out"
        style={{ transform: isEs ? "translateX(100%)" : "translateX(0)" }}
        aria-hidden="true"
      ></span>
      <span className={`relative z-10 w-[74px] py-1 text-center uppercase transition-colors ${!isEs ? "text-signal" : "text-fg-dim"}`}>English</span>
      <span className={`relative z-10 w-[74px] py-1 text-center uppercase transition-colors ${isEs ? "text-signal" : "text-fg-dim"}`}>Español</span>
    </button>
  );
}

function Nav() {
  const { t } = useLanguage();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-ink/80 backdrop-blur-md border-b border-line" : "bg-transparent border-b border-transparent"
      }`}
    >
      <div className="mx-auto flex max-w-shell items-center justify-between px-6 md:px-10 h-[64px]">
        <a href="#top" className="font-display text-[17px] font-600 tracking-tight text-fg hover:text-signal transition-colors">
          {t.nav.logo}
        </a>

        <nav className="hidden md:flex items-center gap-8">
          {t.nav.links.map((l) => (
            <a
              key={l.id}
              href={l.href}
              className={`font-mono text-[12px] tracking-mono uppercase transition-colors ${
                l.id === "book" ? "text-signal hover:text-fg" : "text-fg-muted hover:text-fg"
              }`}
            >
              {l.label}
            </a>
          ))}
          <LangSwitch />
        </nav>

        {/* mobile */}
        <div className="flex items-center gap-3 md:hidden">
          <LangSwitch />
          <button
            type="button"
            aria-label="Menu"
            aria-expanded={open}
            onClick={() => setOpen((o) => !o)}
            className="flex h-9 w-9 flex-col items-center justify-center gap-[5px] rounded-md border border-line"
          >
            <span className={`h-px w-4 bg-fg transition-transform ${open ? "translate-y-[3px] rotate-45" : ""}`}></span>
            <span className={`h-px w-4 bg-fg transition-transform ${open ? "-translate-y-[3px] -rotate-45" : ""}`}></span>
          </button>
        </div>
      </div>

      {/* mobile drawer */}
      <div className={`md:hidden overflow-hidden transition-all duration-300 ${open ? "max-h-60 border-b border-line" : "max-h-0"}`}>
        <nav className="flex flex-col gap-1 px-6 pb-5 pt-1 bg-ink/95">
          {t.nav.links.map((l) => (
            <a
              key={l.id}
              href={l.href}
              onClick={() => setOpen(false)}
              className={`py-2 font-mono text-[13px] tracking-mono uppercase ${l.id === "book" ? "text-signal" : "text-fg-muted"}`}
            >
              {l.label}
            </a>
          ))}
        </nav>
      </div>
    </header>
  );
}

export { Nav, LangSwitch };
