// src/components/SystemArchitecture.jsx
// THE SHOWPIECE — an authority schematic (rebuilt, no radial graph).
// JANE is a full-width GOVERNANCE RAIL at the top. A live distribution bus
// drops from the rail and branches into three agent BAYS wired beneath it.
// Every bay shows its capabilities in place; hovering a bay energizes its
// branch of the bus. Keyboard accessible; motion gated by reduced-motion.

function BusBranch({ slot, hot, reduce }) {
  // slot: 0,1,2 — which of the three columns this branch feeds.
  // Rendered inside a 3-col grid so each branch sits dead-center over its bay.
  return (
    <div className="relative flex flex-col items-center" aria-hidden="true">
      {/* gate node sitting on the trunk */}
      <span
        className="relative z-10 grid h-4 w-4 place-items-center rounded-[3px] border"
        style={{
          borderColor: hot ? "#FFC24A" : "rgba(255,194,74,0.35)",
          background: "#0A0C0F",
          boxShadow: hot ? "0 0 16px -2px rgba(255,194,74,0.7)" : "none",
          transform: "rotate(45deg)",
          transition: "all .3s",
        }}
      >
        <span className="h-1 w-1 rounded-[1px]" style={{ background: hot ? "#FFC24A" : "rgba(255,194,74,0.45)" }}></span>
      </span>
      {/* vertical drop into the bay */}
      <span
        className="block w-px"
        style={{
          height: "28px",
          backgroundImage: "linear-gradient(180deg, #FFC24A 0 7px, transparent 7px 13px)",
          backgroundSize: "1px 13px",
          opacity: hot ? 0.95 : 0.4,
          animation: reduce ? "none" : `pipe-flow-v ${hot ? 0.7 : 1.1}s linear infinite`,
          transition: "opacity .3s",
        }}
      ></span>
    </div>
  );
}

function AgentBay({ node, hot, onHover, reduce }) {
  return (
    <button
      type="button"
      onMouseEnter={() => onHover(node.id)}
      onMouseLeave={() => onHover(null)}
      onFocus={() => onHover(node.id)}
      onBlur={() => onHover(null)}
      aria-label={`${node.id} — ${node.role}`}
      className="group relative flex w-full flex-col rounded-xl border p-5 text-left outline-none transition-all duration-300"
      style={{
        borderColor: hot ? "rgba(255,194,74,0.55)" : "rgba(255,255,255,0.08)",
        background: hot ? "rgba(255,194,74,0.05)" : "rgba(14,17,21,0.85)",
        boxShadow: hot ? "0 0 40px -14px rgba(255,194,74,0.6)" : "none",
        transform: hot ? "translateY(-2px)" : "none",
      }}
    >
      {/* registration corner brackets */}
      {["left-2 top-2 border-l border-t", "right-2 top-2 border-r border-t"].map((c, i) => (
        <span key={i} className={`pointer-events-none absolute h-3 w-3 ${c}`} style={{ borderColor: hot ? "rgba(255,194,74,0.5)" : "rgba(91,100,112,0.3)", transition: "border-color .3s" }} aria-hidden="true"></span>
      ))}

      <div className="flex items-start justify-between gap-3">
        <div>
          <div className="font-display text-[22px] font-600 tracking-tight text-fg">{node.id}</div>
          <div className="mt-1 font-mono text-[10.5px] tracking-mono uppercase text-fg-muted leading-[1.4]">{node.role}</div>
        </div>
        <StatusPill id={node.id} label={node.status} live={node.id === "MAVIS"} />
      </div>

      <ul className="mt-5 space-y-2.5 border-t border-line pt-5">
        {node.capabilities.map((c, i) => (
          <li key={i} className="flex items-start gap-2.5 text-fg-muted leading-[1.5]" style={{ fontSize: "13px" }}>
            <span className="mt-[7px] h-1 w-1 shrink-0 rounded-full" style={{ background: hot ? "#FFC24A" : "#5B6470", transition: "background .3s" }} aria-hidden="true"></span>
            <span>{c}</span>
          </li>
        ))}
      </ul>
    </button>
  );
}

function SystemArchitecture() {
  const { t } = useLanguage();
  const a = t.architecture;
  const [hot, setHot] = useState(null);
  const [reduce, setReduce] = useState(false);
  useEffect(() => { setReduce(window.matchMedia("(prefers-reduced-motion: reduce)").matches); }, []);

  const janeStatus = a.center.role.split(" · ")[0];

  return (
    <Section id="arch" className="py-24 md:py-36">
      <Reveal><Kicker index={a.index} label={a.kicker} /></Reveal>
      <Reveal delay={80}>
        <h2 className="mt-6 font-display font-600 leading-[1.02] tracking-[-0.01em] text-fg whitespace-pre-line"
            style={{ fontSize: "clamp(2rem, 5vw, 4rem)" }}>
          {a.title}
        </h2>
      </Reveal>
      <Reveal delay={140}>
        <p className="mt-5 max-w-[58ch] text-fg-muted leading-[1.6]" style={{ fontSize: "1.0625rem" }}>{a.subtitle}</p>
      </Reveal>

      <Reveal delay={160} className="mt-12 rounded-2xl border border-line bg-ink-900/60 bg-grid p-5 md:p-8 overflow-hidden">
        {/* panel instrument header */}
        <div className="mb-7 flex items-center justify-between">
          <span className="font-mono text-[10px] tracking-mono uppercase text-fg-dim">HOVER / TAP A BAY</span>
          <span className="flex items-center gap-2 font-mono text-[10px] tracking-mono uppercase text-fg-dim">
            <span className="h-1.5 w-1.5 rounded-full bg-signal" style={reduce ? {} : { animation: "node-breathe 2.2s ease-in-out infinite" }}></span>
            FLEET OK
          </span>
        </div>

        {/* ===== JANE — governance authority rail ===== */}
        <div
          className="relative rounded-xl border p-5 md:p-6"
          style={{
            borderColor: "rgba(255,194,74,0.4)",
            background: "linear-gradient(180deg, rgba(255,194,74,0.07), rgba(255,194,74,0.02))",
            boxShadow: "inset 0 1px 0 rgba(255,194,74,0.18)",
          }}
        >
          <span className="pointer-events-none absolute inset-x-0 top-0 h-px" style={{ background: "linear-gradient(90deg, transparent, #FFC24A, transparent)" }} aria-hidden="true"></span>
          <div className="grid gap-5 md:grid-cols-[minmax(220px,300px)_1fr] md:items-center">
            <div className="flex items-center gap-4">
              <span className="grid h-12 w-12 shrink-0 place-items-center rounded-lg border border-signal/50" style={{ background: "rgba(255,194,74,0.08)" }}>
                <span className="h-2 w-2 rounded-full bg-signal" style={reduce ? {} : { animation: "node-breathe 3s ease-in-out infinite" }}></span>
              </span>
              <div>
                <div className="flex items-center gap-2.5">
                  <span className="font-display text-[24px] font-600 tracking-tight text-fg">JANE</span>
                  <span className="rounded-full border border-signal/40 bg-signal/[0.06] px-2.5 py-0.5 font-mono text-[9.5px] tracking-mono uppercase text-signal">{janeStatus}</span>
                </div>
                <div className="mt-0.5 font-mono text-[10px] tracking-mono uppercase text-fg-muted">{a.center.role}</div>
              </div>
            </div>
            {/* JANE's mandate — the standard the fleet runs inside */}
            <ul className="grid gap-x-6 gap-y-2 sm:grid-cols-3 md:border-l md:border-signal/20 md:pl-6">
              {a.center.capabilities.map((c, i) => (
                <li key={i} className="flex items-start gap-2 text-fg-muted leading-[1.4]" style={{ fontSize: "12px" }}>
                  <span className="mt-[6px] h-1 w-1 shrink-0 rounded-full bg-signal" aria-hidden="true"></span>
                  <span>{c}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* ===== distribution bus ===== */}
        <div className="hidden md:block" aria-hidden="true">
          {/* center down-tick from rail to trunk */}
          <div className="flex justify-center">
            <span
              className="block w-px"
              style={{
                height: "22px",
                backgroundImage: "linear-gradient(180deg, #FFC24A 0 7px, transparent 7px 13px)",
                backgroundSize: "1px 13px",
                opacity: 0.55,
                animation: reduce ? "none" : "pipe-flow-v 1.1s linear infinite",
              }}
            ></span>
          </div>
          {/* horizontal trunk + three branch gates aligned to the columns below */}
          <div className="relative">
            <span className="pointer-events-none absolute left-[16.66%] right-[16.66%] top-[8px] h-px" style={{ background: "linear-gradient(90deg, rgba(255,194,74,0.45), rgba(255,194,74,0.25), rgba(255,194,74,0.45))" }}></span>
            <div className="relative grid grid-cols-3">
              {[0, 1, 2].map((s) => (
                <BusBranch key={s} slot={s} hot={hot === a.nodes[s].id} reduce={reduce} />
              ))}
            </div>
          </div>
        </div>

        {/* mobile connector */}
        <div className="my-4 flex justify-center md:hidden" aria-hidden="true">
          <span className="block h-6 w-px" style={{ background: "linear-gradient(180deg, rgba(255,194,74,0.5), transparent)" }}></span>
        </div>

        {/* ===== agent bays ===== */}
        <div className="grid gap-4 md:mt-1 md:grid-cols-3">
          {a.nodes.map((node) => (
            <AgentBay key={node.id} node={node} hot={hot === node.id} onHover={setHot} reduce={reduce} />
          ))}
        </div>
      </Reveal>
    </Section>
  );
}

Object.assign(window, { SystemArchitecture });
