// src/components/Closing.jsx
function Closing() {
  const { t } = useLanguage();
  const c = t.closing;
  return (
    <Section id="contact" className="py-28 md:py-40 bg-grid">
      <div className="flex flex-col items-start">
        <Reveal>
          <h2 className="font-display font-600 tracking-[-0.01em] text-fg leading-[0.95]" style={{ fontSize: "clamp(3rem, 11vw, 8.5rem)" }}>
            {c.title}
          </h2>
        </Reveal>
        <Reveal delay={120}>
          <p className="mt-6 font-display text-fg-muted" style={{ fontSize: "clamp(1.2rem, 2.6vw, 1.9rem)" }}>{c.sub}</p>
        </Reveal>
        <Reveal delay={220}>
          <a href="#" className="group mt-12 inline-flex items-center gap-3 rounded-md bg-signal px-8 py-4 font-mono text-[13px] tracking-mono uppercase text-ink font-600 transition-transform hover:-translate-y-0.5">
            {c.cta}
            <I.ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </a>
        </Reveal>
        <Reveal delay={300}>
          <p className="mt-10 font-mono text-[11px] tracking-mono uppercase text-fg-dim">{c.note}</p>
        </Reveal>
      </div>
    </Section>
  );
}
Object.assign(window, { Closing });
