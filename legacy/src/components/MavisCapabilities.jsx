// src/components/MavisCapabilities.jsx
// "What Mavis Does" — rebuilt as a CAPABILITY PATCHBAY (the whole desk).
// Channels are patch modules: INPUT (converse / remember) and ACTION (execute /
// orchestrate / integrate). Every action module routes down into the GOVERN
// power rail — the authority everything plugs into. Same copy, new instrument.

function Jack({ hot }) {
  return (
    <span className="relative grid h-3.5 w-3.5 shrink-0 place-items-center rounded-full border" aria-hidden="true"
      style={{ borderColor: hot ? "#FFC24A" : "rgba(255,255,255,0.18)", transition: "border-color .3s" }}>
      <span className="h-1.5 w-1.5 rounded-full" style={{ background: hot ? "#FFC24A" : "#3A4048", transition: "background .3s" }}></span>
    </span>
  );
}

function ChannelModule({ ch, kind, active, onHover }) {
  const hot = active === ch.id;
  return (
    <div
      tabIndex={0}
      onMouseEnter={() => onHover(ch.id)}
      onMouseLeave={() => onHover(null)}
      onFocus={() => onHover(ch.id)}
      onBlur={() => onHover(null)}
      aria-label={`${ch.id}: ${ch.lines.map((l) => l[0] + " — " + l[1]).join("; ")}`}
      className="group relative flex flex-col rounded-xl border p-4 outline-none transition-all duration-300"
      style={{
        borderColor: hot ? "rgba(255,194,74,0.55)" : "rgba(255,255,255,0.08)",
        background: hot ? "rgba(255,194,74,0.05)" : "rgba(14,17,21,0.7)",
        boxShadow: hot ? "0 0 34px -14px rgba(255,194,74,0.55)" : "none",
      }}
    >
      {/* module header: channel + kind tag + jack count */}
      <div className="flex items-center justify-between gap-2 border-b border-line pb-3">
        <span className={`font-mono text-[12px] tracking-mono uppercase transition-colors ${hot ? "text-signal" : "text-fg"}`}>{ch.id}</span>
        <span className="font-mono text-[8.5px] tracking-mono uppercase text-fg-dim">{kind}</span>
      </div>

      {/* jacks: one row per verb/detail */}
      <ul className="mt-3 space-y-2.5">
        {ch.lines.map(([verb, detail], i) => (
          <li key={i} className="flex items-start gap-2.5">
            <Jack hot={hot} />
            <span className="flex flex-col gap-0.5">
              <span className="font-mono text-[10.5px] tracking-mono uppercase text-fg">{verb}</span>
              <span className="text-fg-muted leading-[1.4]" style={{ fontSize: "13px" }}>{detail}</span>
            </span>
          </li>
        ))}
      </ul>

      {/* down-tick: action modules feed the govern rail */}
      {kind === "ACTION" && (
        <span className="pointer-events-none absolute -bottom-[13px] left-1/2 h-3 w-px -translate-x-1/2"
          style={{ background: hot ? "#FFC24A" : "rgba(255,194,74,0.4)", transition: "background .3s" }} aria-hidden="true"></span>
      )}
    </div>
  );
}

function MavisCapabilities() {
  const { t } = useLanguage();
  const m = t.mavis;
  const [active, setActive] = useState(null);

  const input = m.channels.filter((c) => !c.authority && (c.id === "CONVERSE" || c.id === "CONVERSAR" || c.id === "REMEMBER" || c.id === "RECORDAR"));
  const action = m.channels.filter((c) => !c.authority && !input.includes(c));
  const govern = m.channels.find((c) => c.authority);

  return (
    <Section id="mavis" className="py-24 md:py-36" bg="#0A0C0F">
      <Reveal><Kicker index={m.index} label={m.kicker} /></Reveal>
      <Reveal delay={80}>
        <h2 className="mt-6 font-display font-600 leading-[1.04] tracking-[-0.01em] text-fg" style={{ fontSize: "clamp(2rem, 5vw, 4rem)" }}>
          {m.title}
        </h2>
      </Reveal>
      <Reveal delay={140}>
        <p className="mt-5 max-w-[64ch] text-fg-muted leading-[1.6]" style={{ fontSize: "1.0625rem" }}>{m.subtitle}</p>
      </Reveal>

      <Reveal delay={160} className="mt-12">
        <div className="relative rounded-2xl border border-line bg-ink-900/60 bg-grid p-5 md:p-7">
          {/* corner registration brackets */}
          {["left-3 top-3 border-l border-t", "right-3 top-3 border-r border-t", "left-3 bottom-3 border-l border-b", "right-3 bottom-3 border-r border-b"].map((c, i) => (
            <span key={i} className={`pointer-events-none absolute z-10 h-4 w-4 border-fg-dim/40 ${c}`} aria-hidden="true"></span>
          ))}

          {/* patchbay header */}
          <div className="mb-6 flex items-center justify-between border-b border-line pb-3.5">
            <div className="font-mono text-[12px] tracking-mono uppercase">
              <span className="text-signal">▟</span> <span className="text-fg">MAVIS · CAPABILITY PATCHBAY</span>
            </div>
            <span className="font-mono text-[10px] tracking-mono uppercase text-fg-dim">{m.hint}</span>
          </div>

          {/* INPUT channels */}
          <div className="mb-2 flex items-center gap-3 font-mono text-[9.5px] tracking-mono uppercase text-fg-dim">
            <span>INPUT</span><span className="h-px flex-1 bg-line"></span>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            {input.map((ch) => <ChannelModule key={ch.id} ch={ch} kind="INPUT" active={active} onHover={setActive} />)}
          </div>

          {/* ACTION channels */}
          <div className="mb-2 mt-7 flex items-center gap-3 font-mono text-[9.5px] tracking-mono uppercase text-fg-dim">
            <span>ACTION</span><span className="h-px flex-1 bg-line"></span>
          </div>
          <div className="grid gap-4 md:grid-cols-3">
            {action.map((ch) => <ChannelModule key={ch.id} ch={ch} kind="ACTION" active={active} onHover={setActive} />)}
          </div>

          {/* ===== GOVERN power rail — everything plugs in here ===== */}
          <div className="mt-5 rounded-xl border border-signal/35 bg-signal/[0.05] p-5">
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-signal/20 pb-3">
              <span className="inline-flex items-center gap-2 font-mono text-[12.5px] tracking-mono uppercase text-signal">
                <span className="h-1.5 w-1.5 rounded-full bg-signal" style={{ animation: "node-breathe 2.4s ease-in-out infinite" }}></span>
                {govern.id} · POWER RAIL
              </span>
              <span className="font-mono text-[10px] tracking-mono uppercase text-fg-dim">{m.governNote}</span>
            </div>
            <ul className="mt-4 grid gap-x-8 gap-y-3 sm:grid-cols-2">
              {govern.lines.map(([verb, detail], i) => (
                <li key={i} className="flex items-start gap-2.5">
                  <span className="mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full bg-signal" aria-hidden="true"></span>
                  <span className="flex flex-col gap-0.5 sm:flex-row sm:items-baseline sm:gap-3">
                    <span className="font-mono text-[11px] tracking-mono uppercase text-signal/90 w-[88px] shrink-0">{verb}</span>
                    <span className="text-fg-muted leading-[1.5]" style={{ fontSize: "14px" }}>{detail}</span>
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Reveal>
    </Section>
  );
}

Object.assign(window, { MavisCapabilities });
