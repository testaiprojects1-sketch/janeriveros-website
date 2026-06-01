// src/components/Journey.jsx
// "The Journey" as a visual route map. A serpentine path draws itself in amber
// as you scroll; station nodes light up when reached and milestone cards connect
// in on alternating sides. Mobile falls back to a vertical lit path.
// Scroll-driven, honors prefers-reduced-motion (everything shown lit).

function Journey() {
  const { t } = useLanguage();
  const j = t.journey;
  const ms = j.milestones;
  const n = ms.length;
  const wrapRef = useRef(null);
  const [progress, setProgress] = useState(0);   // 0..1 along the route
  const [reduce, setReduce] = useState(false);

  useEffect(() => {
    const r = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    setReduce(r);
    if (r) { setProgress(1); return; }
    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const wrap = wrapRef.current;
        if (!wrap) return;
        const rect = wrap.getBoundingClientRect();
        const mark = window.innerHeight * 0.52;
        const p = (mark - rect.top) / rect.height;
        setProgress(Math.max(0, Math.min(1, p)));
      });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => { window.removeEventListener("scroll", onScroll); window.removeEventListener("resize", onScroll); cancelAnimationFrame(raf); };
  }, []);

  // node i is "reached" once the route has been drawn past it
  const threshold = (i) => (n === 1 ? 0 : i / (n - 1));
  const lit = (i) => progress >= threshold(i) - 0.001;

  // ---- desktop serpentine geometry (normalized viewBox, preserveAspectRatio none) ----
  const rowH = 220;
  const totalH = n * rowH;
  const xL = 270, xR = 730;
  const wp = ms.map((_, i) => ({ x: i % 2 === 0 ? xL : xR, y: rowH / 2 + i * rowH }));
  let routeD = `M ${wp[0].x} ${wp[0].y}`;
  for (let i = 1; i < n; i++) {
    const midY = (wp[i - 1].y + wp[i].y) / 2;
    routeD += ` C ${wp[i - 1].x} ${midY} ${wp[i].x} ${midY} ${wp[i].x} ${wp[i].y}`;
  }

  return (
    <Section id="journey" className="py-24 md:py-36" bg="#0A0C0F">
      <Reveal><Kicker index={j.index} label={j.kicker} /></Reveal>
      <Reveal delay={80}>
        <h2 className="mt-6 font-display font-600 tracking-[-0.01em] text-fg" style={{ fontSize: "clamp(2.4rem, 7vw, 5rem)" }}>
          {j.title}
        </h2>
      </Reveal>

      {/* progress readout */}
      <Reveal delay={120} className="mt-5 flex items-center gap-4">
        <div className="font-mono text-[11px] tracking-mono uppercase text-fg-dim">
          ROUTE <span className="text-signal">{String(Math.round(progress * 100)).padStart(3, "0")}%</span>
        </div>
        <div className="h-px flex-1 max-w-[260px] bg-line">
          <div className="h-px bg-signal transition-[width] duration-150" style={{ width: `${progress * 100}%` }}></div>
        </div>
      </Reveal>

      <div ref={wrapRef} className="relative mt-12">
        {/* ============ DESKTOP: serpentine route map ============ */}
        <div className="relative mx-auto hidden md:block" style={{ height: totalH + "px", maxWidth: "920px" }}>
          <svg viewBox={`0 0 1000 ${totalH}`} preserveAspectRatio="none" className="absolute inset-0 h-full w-full" aria-hidden="true">
            {/* base route */}
            <path d={routeD} fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="2" vectorEffect="non-scaling-stroke" />
            {/* lit route — draws in with scroll */}
            <path
              d={routeD}
              fill="none"
              stroke="#FFC24A"
              strokeWidth="2"
              strokeLinecap="round"
              vectorEffect="non-scaling-stroke"
              pathLength="1"
              strokeDasharray="1"
              strokeDashoffset={1 - progress}
              style={{ filter: "drop-shadow(0 0 6px rgba(255,194,74,0.6))" }}
            />
          </svg>

          {/* station nodes */}
          {wp.map((p, i) => {
            const on = lit(i);
            return (
              <span
                key={"n" + i}
                className="absolute z-10 -translate-x-1/2 -translate-y-1/2 transition-all duration-500"
                style={{ left: (p.x / 1000) * 100 + "%", top: (p.y / totalH) * 100 + "%" }}
                aria-hidden="true"
              >
                <span className="grid h-4 w-4 place-items-center rounded-full border-2 transition-all duration-500"
                  style={{
                    background: on ? "#FFC24A" : "#0A0C0F",
                    borderColor: on ? "#FFC24A" : "#2a323a",
                    boxShadow: on ? "0 0 0 6px rgba(255,194,74,0.14), 0 0 22px -2px rgba(255,194,74,0.7)" : "none",
                  }}>
                </span>
              </span>
            );
          })}

          {/* milestone cards — alternate sides, light/connect in when reached */}
          {ms.map((m, i) => {
            const p = wp[i];
            const on = lit(i);
            const leftNode = i % 2 === 0;
            return (
              <div
                key={m.year}
                className="absolute z-0 transition-all duration-700"
                style={{
                  top: (p.y / totalH) * 100 + "%",
                  ...(leftNode
                    ? { left: "calc(27% + 28px)", right: "4%" }
                    : { right: "calc(27% + 28px)", left: "4%", textAlign: "right" }),
                  transform: `translateY(-50%) translateX(${on ? "0" : leftNode ? "-14px" : "14px"})`,
                  opacity: on ? 1 : 0.32,
                }}
              >
                <div className="font-mono text-[28px] tracking-tight transition-colors duration-500" style={{ color: on ? "#FFC24A" : "#5B6470" }}>
                  {m.year}
                </div>
                <div className="mt-1 font-mono text-[10.5px] tracking-mono uppercase text-fg-dim">{m.tag}</div>
                <p className={`mt-2 text-fg leading-[1.5] ${leftNode ? "" : "ml-auto"}`} style={{ fontSize: "1.05rem", maxWidth: "42ch" }}>{m.body}</p>
              </div>
            );
          })}
        </div>

        {/* ============ MOBILE: vertical lit path ============ */}
        <div className="relative md:hidden pl-8">
          <div className="absolute top-1 bottom-1 left-[5px] w-[2px] bg-line" aria-hidden="true"></div>
          <div className="absolute top-1 left-[5px] w-[2px] bg-signal" style={{ height: `${progress * 100}%`, boxShadow: "0 0 10px rgba(255,194,74,0.6)" }} aria-hidden="true"></div>
          <ol className="space-y-11">
            {ms.map((m, i) => {
              const on = lit(i);
              return (
                <li key={m.year} className="relative">
                  <span className="absolute -left-[27px] top-1.5 z-10 grid h-3.5 w-3.5 place-items-center rounded-full border-2 transition-all duration-500"
                    style={{ background: on ? "#FFC24A" : "#0A0C0F", borderColor: on ? "#FFC24A" : "#2a323a", boxShadow: on ? "0 0 0 4px rgba(255,194,74,0.14)" : "none" }} aria-hidden="true"></span>
                  <div className="font-mono text-[22px] tracking-tight transition-colors duration-500" style={{ color: on ? "#FFC24A" : "#5B6470" }}>{m.year}</div>
                  <div className="mt-1 font-mono text-[10px] tracking-mono uppercase text-fg-dim">{m.tag}</div>
                  <p className="mt-2 text-fg leading-[1.5]" style={{ fontSize: "1.05rem", opacity: on ? 1 : 0.4, transition: "opacity .5s" }}>{m.body}</p>
                </li>
              );
            })}
          </ol>
        </div>
      </div>
    </Section>
  );
}

Object.assign(window, { Journey });
