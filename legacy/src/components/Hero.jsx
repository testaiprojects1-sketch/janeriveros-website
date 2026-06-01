// src/components/Hero.jsx
// Hero — a full-bleed cinematic "mission-control" frame.
// A single photographic image carries the mood; copy sits over it with
// layered scrims for WCAG-AA legibility. Kept "alive" with the ticking
// telemetry strip + pulsing LIVE dot (no radar, no voice module).

const { useState: useStateH, useEffect: useEffectH } = React;

/* ---- text scramble: reveals left-to-right while cycling random glyphs.
   Vanilla (no framer-motion). Replays whenever `text` changes (e.g. EN/ES
   toggle). Honors prefers-reduced-motion by showing the final text. ---- */
const SCRAMBLE_CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
function Scramble({ text, as: Tag = "span", duration = 0.85, speed = 0.03, delay = 0, className, style }) {
  const [display, setDisplay] = useStateH(text);
  useEffectH(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setDisplay(text);
      return;
    }
    let interval = 0;
    let step = 0;
    const steps = duration / speed;
    const start = setTimeout(() => {
      interval = setInterval(() => {
        const progress = step / steps;
        let out = "";
        for (let i = 0; i < text.length; i++) {
          if (text[i] === " ") { out += " "; continue; }
          out += progress * text.length > i
            ? text[i]
            : SCRAMBLE_CHARS[Math.floor(Math.random() * SCRAMBLE_CHARS.length)];
        }
        setDisplay(out);
        step++;
        if (step > steps) { clearInterval(interval); setDisplay(text); }
      }, speed * 1000);
    }, delay);
    return () => { clearTimeout(start); clearInterval(interval); };
  }, [text, duration, speed, delay]);
  return <Tag className={className} style={style}>{display}</Tag>;
}

/* ---- ticking telemetry strip ---- */
function Telemetry() {
  const { t } = useLanguage();
  const s = t.hero.status;
  const [now, setNow] = useStateH(() => new Date());
  useEffectH(() => {
    const id = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(id);
  }, []);
  const p = (n) => String(n).padStart(2, "0");
  const clock = `${p(now.getHours())}:${p(now.getMinutes())}:${p(now.getSeconds())}`;
  return (
    <Reveal className="flex max-w-[640px] flex-wrap items-center gap-x-5 gap-y-2 border-b border-line pb-4 font-mono text-[10.5px] tracking-mono uppercase text-fg-dim">
      <span className="inline-flex items-center gap-2 text-live">
        <span className="relative flex h-1.5 w-1.5">
          <span className="absolute inset-0 rounded-full bg-live" style={{ animation: "pulse-ring 1.8s cubic-bezier(0,.55,.45,1) infinite" }}></span>
          <span className="relative h-1.5 w-1.5 rounded-full bg-live"></span>
        </span>
        {s.live}
      </span>
      <span className="h-3 w-px bg-line"></span>
      <span>{s.loc}</span>
      <span className="h-3 w-px bg-line"></span>
      <span className="hidden sm:inline">{s.sys}</span>
      <span className="ml-auto inline-flex items-center gap-2 text-fg-muted">
        {s.local}
        <span className="text-signal tabular-nums" style={{ fontVariantNumeric: "tabular-nums" }}>{clock}</span>
      </span>
    </Reveal>
  );
}

function Hero() {
  const { t } = useLanguage();

  // subtle parallax / slow drift on the backdrop, disabled for reduced-motion
  const imgRef = React.useRef(null);
  useEffectH(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const y = window.scrollY;
        if (imgRef.current && y < window.innerHeight) {
          imgRef.current.style.transform = `scale(1.06) translateY(${y * 0.12}px)`;
        }
      });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => { window.removeEventListener("scroll", onScroll); cancelAnimationFrame(raf); };
  }, []);

  return (
    <Section id="top" className="relative min-h-[100svh] flex items-center pt-24 pb-28 overflow-hidden">
      {/* cinematic full-bleed backdrop — the mission-control room at night */}
      <img
        ref={imgRef}
        src="assets/hero-control-room.jpg"
        alt=""
        aria-hidden="true"
        decoding="async"
        className="pointer-events-none absolute inset-0 z-0 h-full w-full origin-center scale-[1.06] object-cover select-none"
        draggable="false"
      />
      {/* scrims: vertical (nav + blend to page) and horizontal (protect copy on the left) */}
      <div className="pointer-events-none absolute inset-0 z-0" aria-hidden="true"
        style={{ background: "linear-gradient(180deg, rgba(8,9,11,0.85) 0%, rgba(8,9,11,0.30) 20%, rgba(8,9,11,0.42) 55%, #08090B 100%)" }}></div>
      <div className="pointer-events-none absolute inset-0 z-0" aria-hidden="true"
        style={{ background: "linear-gradient(90deg, rgba(8,9,11,0.92) 0%, rgba(8,9,11,0.6) 42%, rgba(8,9,11,0.15) 78%, transparent 100%)" }}></div>

      {/* corner instrument ticks */}
      {["left-6 top-20 border-l border-t", "right-6 top-20 border-r border-t", "left-6 bottom-6 border-l border-b", "right-6 bottom-6 border-r border-b"].map((c, i) => (
        <span key={i} className={`pointer-events-none absolute z-10 hidden h-5 w-5 border-fg-dim/30 md:block ${c}`} aria-hidden="true"></span>
      ))}

      <div className="relative z-10 w-full">
        <Telemetry />

        <Reveal delay={60} className="mt-8 font-mono text-[11px] md:text-[12px] tracking-mono uppercase text-fg-muted">
          {t.hero.eyebrow}
        </Reveal>

        <Reveal delay={120}>
          <h1 className="mt-5 font-display font-600 leading-[0.9] tracking-[-0.01em] text-fg"
              style={{ fontSize: "clamp(3rem, 11vw, 9.5rem)", textShadow: "0 2px 40px rgba(0,0,0,0.55)" }}>
            {(() => {
              const parts = t.hero.name.split(" ");
              const rest = parts.slice(1).join(" ");
              return (
                <>
                  <Scramble as="span" text={parts[0]} duration={1.4} speed={0.085} delay={120} />
                  {rest && (<> <em className="italic text-signal" style={{ fontWeight: 500 }}><Scramble as="span" text={rest} duration={1.7} speed={0.085} delay={120} /></em></>)}
                </>
              );
            })()}
          </h1>
        </Reveal>

        <Reveal delay={200}>
          <p className="mt-7 font-display font-500 text-fg/95 leading-[1.05] tracking-[-0.005em]"
             style={{ fontSize: "clamp(1.5rem, 4.4vw, 3.2rem)", textShadow: "0 2px 30px rgba(0,0,0,0.5)" }}>
            <Scramble as="span" text={t.hero.tagline} duration={1.6} speed={0.085} delay={620} />
          </p>
        </Reveal>

        {/* accent line — the line that must land */}
        <Reveal delay={270} className="mt-6 flex items-start gap-3">
          <span className="mt-2 h-3 w-3 shrink-0 rotate-45 border border-signal" aria-hidden="true"></span>
          <p className="font-mono text-signal tracking-[0.01em] leading-[1.35]" style={{ fontSize: "clamp(1rem, 2.1vw, 1.45rem)" }}>
            <Scramble as="span" text={t.hero.accent} duration={1.7} speed={0.085} delay={1200} />
          </p>
        </Reveal>
        <Reveal delay={310}>
          <p className="mt-5 pl-6 font-mono text-[12px] md:text-[13px] tracking-mono uppercase text-fg-dim">
            {t.hero.proof}
          </p>
        </Reveal>

        <Reveal delay={360}>
          <p className="mt-9 max-w-[54ch] text-fg-muted leading-[1.7]" style={{ fontSize: "clamp(1rem, 1.4vw, 1.125rem)" }}>
            {t.hero.lede}
          </p>
        </Reveal>

        <Reveal delay={430} className="mt-9 flex flex-wrap items-center gap-4">
          <a href="#builds"
             className="group inline-flex items-center gap-2.5 rounded-md bg-signal px-6 py-3.5 font-mono text-[13px] tracking-mono uppercase text-ink font-600 transition-transform hover:-translate-y-0.5">
            {t.hero.ctaPrimary}
            <I.ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </a>
          <a href="#contact"
             className="group inline-flex items-center gap-2.5 rounded-md border border-fg-dim/50 bg-ink-900/40 px-6 py-3.5 font-mono text-[13px] tracking-mono uppercase text-fg backdrop-blur-sm transition-colors hover:border-signal hover:text-signal">
            {t.hero.ctaSecondary}
          </a>
        </Reveal>
      </div>

      {/* scroll cue */}
      <a href="#arch" className="absolute left-1/2 bottom-6 z-10 -translate-x-1/2 flex flex-col items-center gap-2 text-fg-dim hover:text-signal transition-colors">
        <span className="font-mono text-[10px] tracking-mono">{t.hero.scroll}</span>
        <I.ChevronDown className="h-4 w-4 anim-bob" />
      </a>
    </Section>
  );
}

Object.assign(window, { Hero });
