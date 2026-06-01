// src/components/BuildingInPublic.jsx
// Terminal / command-log. Styled as a real shell: traffic-light chrome, tab,
// line-number gutter, prompt, color-coded streaming output, blinking cursor,
// CRT scanline, and a status bar. Same content (dated build-log entries).
// TODO: replace mock `entries` with a live Supabase query (realtime channel on
//       the build_log table), ordered by date desc. Keep the streaming reveal.

function BuildingInPublic() {
  const { t } = useLanguage();
  const b = t.building;
  const ref = useRef(null);
  const [shown, setShown] = useState(0);     // entries fully streamed in
  const [typed, setTyped] = useState("");    // characters typed on the prompt line
  const [done, setDone] = useState(false);
  const cmd = "status --live";

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (!e.isIntersecting) return;
        io.disconnect();
        if (reduce) { setTyped(cmd); setShown(b.entries.length); setDone(true); return; }
        // 1) type the command, 2) stream the result lines
        let ci = 0;
        const typeTick = () => {
          ci += 1;
          setTyped(cmd.slice(0, ci));
          if (ci < cmd.length) setTimeout(typeTick, 52);
          else {
            let i = 0;
            const rowTick = () => {
              i += 1; setShown(i);
              if (i < b.entries.length) setTimeout(rowTick, 460);
              else setDone(true);
            };
            setTimeout(rowTick, 360);
          }
        };
        setTimeout(typeTick, 300);
      });
    }, { threshold: 0.3 });
    io.observe(el);
    return () => io.disconnect();
  }, [b.entries.length]);

  // line-number gutter count: prompt + streamed rows + (summary/cursor)
  const totalLines = 1 + shown + (done ? 2 : 1);
  const lineNos = Array.from({ length: Math.max(totalLines, 1) }, (_, i) => i + 1);

  return (
    <Section id="public" className="py-24 md:py-32" bg="#0A0C0F">
      <Reveal><Kicker index={b.index} label={b.kicker} /></Reveal>

      <Reveal delay={80} className="mt-8">
        <div ref={ref} className="overflow-hidden rounded-xl border border-line bg-[#060708] shadow-2xl"
          style={{ boxShadow: "0 30px 80px -30px rgba(0,0,0,0.9), 0 0 0 1px rgba(255,255,255,0.03)" }}>

          {/* title bar */}
          <div className="flex items-center gap-3 border-b border-line bg-[#0B0D10] px-4 py-2.5">
            <div className="flex gap-2" aria-hidden="true">
              <span className="h-3 w-3 rounded-full" style={{ background: "#FF5F57" }}></span>
              <span className="h-3 w-3 rounded-full" style={{ background: "#FEBC2E" }}></span>
              <span className="h-3 w-3 rounded-full" style={{ background: "#28C840" }}></span>
            </div>
            <div className="ml-2 flex items-center gap-2 rounded-t-md border-b-2 border-signal/70 bg-[#060708] px-3 py-1 font-mono text-[11px] tracking-mono text-fg-muted">
              <I.Terminal className="h-3.5 w-3.5 text-signal" />
              jane@infra: ~/builds
            </div>
            <span className="ml-auto font-mono text-[10px] tracking-mono uppercase text-fg-faint">zsh · 100×32</span>
          </div>

          {/* terminal body with scanline overlay */}
          <div className="relative">
            {/* CRT scanline sweep */}
            <div className="pointer-events-none absolute inset-0 z-10 overflow-hidden opacity-[0.5]" aria-hidden="true">
              <div className="absolute inset-x-0 h-24 -top-24" style={{ background: "linear-gradient(180deg, transparent, rgba(255,194,74,0.05), transparent)", animation: "scanline 7s linear infinite" }}></div>
            </div>
            {/* static scanlines texture */}
            <div className="pointer-events-none absolute inset-0 z-10 opacity-[0.04]" aria-hidden="true"
              style={{ backgroundImage: "repeating-linear-gradient(180deg, #fff 0 1px, transparent 1px 3px)" }}></div>

            <div className="relative z-0 flex font-mono text-[13px] md:text-[13.5px] leading-[1.85]">
              {/* line-number gutter */}
              <div className="select-none border-r border-line bg-[#080A0C] px-3 py-5 text-right text-fg-faint" aria-hidden="true">
                {lineNos.map((ln) => (<div key={ln}>{String(ln).padStart(2, "0")}</div>))}
              </div>

              {/* output */}
              <div className="flex-1 overflow-x-auto px-5 py-5">
                {/* prompt + typed command */}
                <div className="whitespace-nowrap">
                  <span className="text-signal">jane@infra</span>
                  <span className="text-fg-dim">:</span>
                  <span className="text-fg-muted">~/builds</span>
                  <span className="text-fg-dim">$ </span>
                  <span className="text-fg">{typed}</span>
                  {!done && typed.length < cmd.length && <span className="ml-px inline-block h-[1.05em] w-[7px] translate-y-[2px] bg-signal anim-blink"></span>}
                </div>

                {/* streamed result rows */}
                <div className="mt-1.5">
                  {b.entries.map((e, i) => (
                    <div
                      key={i}
                      className="flex items-start gap-2.5 transition-all duration-300"
                      style={{ opacity: i < shown ? 1 : 0, transform: i < shown ? "none" : "translateY(4px)" }}
                      aria-hidden={i >= shown}
                    >
                      <span className="text-fg-faint">{String(i + 1).padStart(2, "0")}</span>
                      <I.Check className="mt-[4px] h-3.5 w-3.5 shrink-0 text-signal" />
                      <span className="shrink-0 whitespace-nowrap text-fg-dim">[{e.date}]</span>
                      <span className="shrink-0 rounded bg-signal/10 px-1.5 font-mono text-[10.5px] uppercase tracking-mono text-signal">ok</span>
                      <span className="text-fg-muted">{e.text}</span>
                    </div>
                  ))}
                </div>

                {/* summary + live prompt cursor */}
                {done && (
                  <div className="mt-2 text-fg-dim">
                    <span className="text-signal">→</span> {b.entries.length} events · synced
                  </div>
                )}
                <div className="mt-1.5 whitespace-nowrap">
                  <span className="text-signal">jane@infra</span>
                  <span className="text-fg-dim">:</span>
                  <span className="text-fg-muted">~/builds</span>
                  <span className="text-fg-dim">$ </span>
                  {done && <span className="inline-block h-[1.05em] w-[7px] translate-y-[2px] bg-signal anim-blink" aria-hidden="true"></span>}
                </div>
              </div>
            </div>
          </div>

          {/* status bar */}
          <div className="flex items-center justify-between border-t border-line bg-[#0B0D10] px-4 py-2.5 font-mono text-[10.5px] tracking-mono uppercase">
            <span className="inline-flex items-center gap-2 text-live">
              <span className="relative flex h-1.5 w-1.5">
                <span className="absolute inset-0 rounded-full bg-live" style={{ animation: "pulse-ring 1.8s cubic-bezier(0,.55,.45,1) infinite" }}></span>
                <span className="relative h-1.5 w-1.5 rounded-full bg-live"></span>
              </span>
              live
            </span>
            <span className="text-fg-dim normal-case">{b.footerLine}</span>
          </div>
        </div>
      </Reveal>
    </Section>
  );
}

Object.assign(window, { BuildingInPublic });
