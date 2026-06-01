import React, { useState, useEffect, useRef } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { Reveal, Section, Kicker, StatusPill, STATE_BY_ID, I } from './primitives';

// src/components/OperatingFlow.jsx
// "The Operating Flow" — four flows, one chain of custody.
// Flows 01–03: horizontal stepped tracks.
// Flow 04: a DISPATCH / RETURN CIRCUIT (rebuilt — no radar). MAVIS is the hub;
// the four spokes are bays wired through governance gates. Outbound dispatch
// packets + dimmer audit-return packets run the wires. The autonomy dial
// tightens JANE's governance frame, sharpens the gates, drives live telemetry.

function flowPill(status) {
  if (/LIVE|VIVO/i.test(status)) return { dot: "#FFC24A", cls: "text-live border-live/40 bg-live/10", filled: true };
  if (/TRAIN|ENTREN/i.test(status)) return { dot: "#9BA3AD", cls: "text-fg-muted border-fg-dim/40 bg-white/5", filled: false };
  return { dot: "#FFC24A", cls: "text-signal border-signal/40 bg-signal/[0.06]", filled: false }; // backbone / inside
}

function FlowPill({ status }) {
  const s = flowPill(status);
  return (
    <span className={`inline-flex items-center gap-2 rounded-full border px-3 py-1 font-mono text-[10.5px] tracking-mono uppercase ${s.cls}`}>
      <span className="h-[7px] w-[7px] rounded-full" style={{ background: s.dot, boxShadow: s.filled ? "none" : "inset 0 0 0 1.5px " + s.dot, backgroundColor: s.filled ? s.dot : "transparent" }}></span>
      {status}
    </span>
  );
}

function StepTrack({ track, i }) {
  const [active, setActive] = useState(-1);
  const [pulse, setPulse] = useState(0);
  const reduce = useRef(false);
  const n = track.steps.length;

  // a "live" pulse travels step→step so the flow reads as running
  useEffect(() => {
    reduce.current = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce.current) return;
    const id = setInterval(() => setPulse((p) => (p + 1) % n), 1100);
    return () => clearInterval(id);
  }, [n]);

  const hot = (si) => (active === -1 ? si === pulse : si === active);

  return (
    <Reveal delay={i * 90} className="relative rounded-xl border border-line bg-ink-800/50 p-6 md:p-7">
      {["left-3 top-3 border-l border-t", "right-3 top-3 border-r border-t", "left-3 bottom-3 border-l border-b", "right-3 bottom-3 border-r border-b"].map((c, k) => (
        <span key={k} className={`pointer-events-none absolute h-3.5 w-3.5 border-fg-dim/30 ${c}`} aria-hidden="true"></span>
      ))}

      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-baseline gap-3">
          <span className="font-mono text-[12px] tracking-mono text-signal">{track.id}</span>
          <span className="font-mono text-[11px] tracking-mono uppercase text-fg-muted">{track.actor}</span>
        </div>
        <FlowPill status={track.status} />
      </div>

      {/* PROCESS FLOW — step cards joined by flowing connectors.
          Desktop: horizontal flex that wraps; mobile: vertical stack. */}
      <ol
        className="mt-7 flex flex-col gap-0 md:flex-row md:flex-wrap md:items-stretch md:gap-y-6"
        aria-label={track.id + " " + track.actor}
        onMouseLeave={() => setActive(-1)}
      >
        {track.steps.map(([label, detail], si) => {
          const on = hot(si);
          const last = si === n - 1;
          return (
            <li key={si} className="flex flex-col md:flex-row md:items-stretch">
              <button
                type="button"
                onMouseEnter={() => setActive(si)}
                onFocus={() => setActive(si)}
                onClick={() => setActive(si)}
                aria-label={`Step ${si + 1} of ${n}: ${label}. ${detail}`}
                className="group flex w-full text-left outline-none md:w-[178px]"
              >
                <span
                  className="relative flex w-full flex-col rounded-lg border p-3.5 transition-all duration-300"
                  style={{
                    borderColor: on ? "rgba(255,194,74,0.6)" : "rgba(255,255,255,0.08)",
                    background: on ? "rgba(255,194,74,0.07)" : "rgba(14,17,21,0.6)",
                    boxShadow: on ? "0 0 30px -10px rgba(255,194,74,0.5)" : "none",
                  }}
                >
                  <span className="flex items-center gap-2">
                    <span
                      className="grid h-6 w-6 shrink-0 place-items-center rounded-md font-mono text-[10.5px] transition-colors"
                      style={{
                        border: "1px solid " + (on ? "#FFC24A" : "rgba(255,255,255,0.12)"),
                        background: on ? "rgba(255,194,74,0.16)" : "transparent",
                        color: on ? "#FFC24A" : "#5B6470",
                      }}
                    >
                      {String(si + 1).padStart(2, "0")}
                    </span>
                    <span className={`font-mono text-[10.5px] leading-tight tracking-mono uppercase transition-colors ${on ? "text-fg" : "text-fg-muted"}`}>
                      {label}
                    </span>
                  </span>
                  <span className="mt-2 text-fg-dim leading-[1.4] transition-colors group-hover:text-fg-muted" style={{ fontSize: "11.5px" }}>
                    {detail}
                  </span>
                </span>
              </button>

              {/* connector to next step */}
              {!last && (
                <span className="flex items-center justify-center py-1.5 md:px-1.5 md:py-0" aria-hidden="true">
                  {/* horizontal pipe (desktop) */}
                  <span
                    className="relative hidden h-px w-5 md:block"
                    style={{
                      backgroundImage: "linear-gradient(90deg, #FFC24A 0 8px, transparent 8px 14px)",
                      backgroundSize: "14px 1px",
                      opacity: 0.7,
                      animation: reduce.current ? "none" : "pipe-flow 0.9s linear infinite",
                    }}
                  >
                    <span className="absolute -right-[3px] -top-[3px] h-1.5 w-1.5 rotate-45 border-r border-t border-signal"></span>
                  </span>
                  {/* vertical pipe (mobile) */}
                  <span
                    className="block h-5 w-px md:hidden"
                    style={{
                      backgroundImage: "linear-gradient(180deg, #FFC24A 0 8px, transparent 8px 14px)",
                      backgroundSize: "1px 14px",
                      opacity: 0.7,
                      animation: reduce.current ? "none" : "pipe-flow-v 0.9s linear infinite",
                    }}
                  ></span>
                </span>
              )}
            </li>
          );
        })}
      </ol>
    </Reveal>
  );
}

/* ---- Flow 04: dispatch / return circuit (hub + wired bays, no radar) ---- */
// viewBox geometry shared by the SVG wire layer and the HTML node overlay.
const HUB = { x: 180, y: 240 };
const MOD_X = 600;                 // module left edge in viewBox units
const MOD_Y = [80, 187, 293, 400]; // one wire per spoke

function CircuitFlow({ radial, gov, reduce }) {
  const ringOpacity = 0.22 + (gov / 100) * 0.55;          // frame brightness
  const gateOpacity = Math.max(0, (gov - 25) / 75);       // gate sharpness
  const spokes = radial.spokes;
  const gates = Math.round(1 + (gov / 100) * 5);          // live telemetry
  const handoff = Math.round(4 + (gov / 100) * 38);
  const autonomy = 100 - gov;

  return (
    <div className="relative">
      {/* ===== mobile: labeled envelope with vertical list ===== */}
      <div className="md:hidden rounded-xl border-2 p-5" style={{ borderColor: `rgba(255,194,74,${0.3 + ringOpacity * 0.4})` }}>
        <div className="font-mono text-[11px] tracking-mono uppercase text-signal">{radial.ring}</div>
        <p className="mt-1 font-mono text-[10px] tracking-mono uppercase text-fg-dim">{radial.ringNote}</p>
        <div className="mt-4 rounded-lg border border-signal/40 bg-signal/[0.05] p-3 text-center">
          <div className="font-display text-[20px] font-600 text-fg">{radial.center}</div>
          <div className="font-mono text-[10px] tracking-mono uppercase text-signal/80">{radial.centerNote}</div>
        </div>
        <div className="my-3 flex items-center justify-center gap-2 font-mono text-[9px] tracking-mono uppercase text-fg-dim">
          <span>DISPATCH ↓</span><span className="text-signal/60">·</span><span>AUDIT ↑</span>
        </div>
        <ul className="space-y-2">
          {spokes.map((s) => (
            <li key={s.id} className="flex items-center gap-3 rounded-lg border border-line bg-ink-800/60 p-3">
              <span className="grid h-5 w-5 shrink-0 place-items-center rounded-[3px] border border-signal/40" style={{ opacity: 0.5 + gateOpacity * 0.5 }} aria-hidden="true">
                <span className="h-1.5 w-1.5 rotate-45 border-r border-t border-signal"></span>
              </span>
              <span>
                <span className="font-mono text-[11px] tracking-mono uppercase text-fg">{s.label || s.id}</span>
                <span className="block text-fg-muted" style={{ fontSize: "12.5px" }}>{s.note}</span>
              </span>
            </li>
          ))}
        </ul>
      </div>

      {/* ===== desktop: dispatch/return circuit inside JANE's governance frame ===== */}
      <div
        className="relative mx-auto hidden w-full max-w-[760px] rounded-2xl md:block"
        style={{
          aspectRatio: "1000 / 480",
          border: `2px solid rgba(255,194,74,${ringOpacity})`,
          background: "linear-gradient(180deg, rgba(255,194,74,0.02), transparent)",
          boxShadow: `inset 0 0 60px -30px rgba(255,194,74,${ringOpacity})`,
          transition: "border-color .25s, box-shadow .25s",
        }}
      >
        {/* inner guard outline — density rises with governance */}
        <span className="pointer-events-none absolute inset-2 rounded-xl" style={{ border: `1px dashed rgba(255,194,74,${0.08 + gateOpacity * 0.22})` }} aria-hidden="true"></span>

        {/* JANE frame label */}
        <div className="absolute left-1/2 top-3 -translate-x-1/2 text-center">
          <div className="font-mono text-[10.5px] tracking-mono uppercase text-signal">{radial.ring}</div>
          <div className="font-mono text-[9px] tracking-mono uppercase text-fg-dim">{radial.ringNote}</div>
        </div>

        {/* live telemetry readouts on the frame */}
        <div className="absolute right-3 top-9 rounded-md border border-line bg-ink-900/85 px-2.5 py-1.5 text-right backdrop-blur-sm">
          <div className="font-mono text-[8.5px] tracking-mono uppercase text-fg-dim">GATES</div>
          <div className="font-mono text-[14px] text-signal tabular-nums">{String(gates).padStart(2, "0")}</div>
        </div>
        <div className="absolute bottom-3 left-3 rounded-md border border-line bg-ink-900/85 px-2.5 py-1.5 backdrop-blur-sm">
          <div className="font-mono text-[8.5px] tracking-mono uppercase text-fg-dim">HANDOFF</div>
          <div className="font-mono text-[14px] text-signal tabular-nums">{handoff}%</div>
        </div>
        <div className="absolute bottom-3 right-3 rounded-md border border-line bg-ink-900/85 px-2.5 py-1.5 text-right backdrop-blur-sm">
          <div className="font-mono text-[8.5px] tracking-mono uppercase text-fg-dim">AUTONOMY</div>
          <div className="font-mono text-[14px] text-fg tabular-nums">{autonomy}%</div>
        </div>

        {/* wire layer */}
        <svg viewBox="0 0 1000 480" className="absolute inset-0 h-full w-full" preserveAspectRatio="xMidYMid meet" aria-hidden="true">
          <defs>
            <radialGradient id="hubGlow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#FFC24A" stopOpacity="0.30" />
              <stop offset="100%" stopColor="#FFC24A" stopOpacity="0" />
            </radialGradient>
          </defs>

          <circle cx={HUB.x} cy={HUB.y} r="92" fill="url(#hubGlow)" />

          {MOD_Y.map((my, i) => {
            const mid = { x: (HUB.x + MOD_X) / 2, y: (HUB.y + my) / 2 };
            const dispatchPath = `M${HUB.x},${HUB.y} L${MOD_X},${my}`;
            const auditPath = `M${MOD_X},${my} L${HUB.x},${HUB.y}`;
            return (
              <g key={i}>
                {/* base wire */}
                <line x1={HUB.x} y1={HUB.y} x2={MOD_X} y2={my} stroke="#FFC24A" strokeOpacity="0.30" strokeWidth="1.2" />
                {!reduce && (
                  <>
                    {/* dispatch: hub → module */}
                    <circle r="3" fill="#FFC24A">
                      <animateMotion dur={`${2.4 + i * 0.3}s`} repeatCount="indefinite" path={dispatchPath} />
                    </circle>
                    {/* audit return: module → hub (dimmer) */}
                    <circle r="1.9" fill="#FFC24A" opacity="0.5">
                      <animateMotion dur={`${3.4 + i * 0.3}s`} repeatCount="indefinite" path={auditPath} />
                    </circle>
                  </>
                )}
                {/* governance gate — sharpens as the dial tightens */}
                <rect x={mid.x - 5} y={mid.y - 5} width="10" height="10" fill="#0A0C0F" stroke="#FFC24A" strokeWidth="1.3" opacity={gateOpacity} transform={`rotate(45 ${mid.x} ${mid.y})`} />
              </g>
            );
          })}
        </svg>

        {/* MAVIS hub node */}
        <div className="absolute z-10 -translate-x-1/2 -translate-y-1/2 text-center" style={{ left: "18%", top: "50%" }}>
          <div className="relative grid h-[118px] w-[118px] place-items-center rounded-full border border-signal/60 bg-signal/[0.08]"
            style={{ boxShadow: "0 0 50px -8px rgba(255,194,74,0.6)" }}>
            <span className="absolute inset-[10px] rounded-full border border-signal/25" style={reduce ? {} : { animation: "node-breathe 3.2s ease-in-out infinite" }} aria-hidden="true"></span>
            <div>
              <div className="font-display text-[20px] font-600 text-fg">{radial.center}</div>
              <div className="px-2 font-mono text-[8.5px] tracking-mono uppercase text-signal/80">{radial.centerNote}</div>
            </div>
          </div>
        </div>

        {/* spoke module bays */}
        {spokes.map((s, i) => (
          <div key={s.id} className="absolute z-10 -translate-y-1/2" style={{ left: "60%", right: "3%", top: (MOD_Y[i] / 480) * 100 + "%" }}>
            <div className="rounded-lg border border-line bg-ink-800/85 p-2.5 backdrop-blur-sm transition-colors hover:border-signal/50">
              <div className="flex items-center gap-1.5">
                <span className="h-1.5 w-1.5 rounded-full bg-signal" style={reduce ? {} : { animation: `node-breathe ${2 + i * 0.4}s ease-in-out infinite` }}></span>
                <span className="font-mono text-[11px] tracking-mono uppercase text-fg">{s.label || s.id}</span>
              </div>
              <div className="mt-1 text-fg-muted leading-[1.35]" style={{ fontSize: "11.5px" }}>{s.note}</div>
            </div>
          </div>
        ))}
      </div>

      {/* legend: what the two packet streams mean */}
      <div className="mt-4 hidden items-center justify-center gap-6 font-mono text-[10px] tracking-mono uppercase text-fg-dim md:flex">
        <span className="flex items-center gap-2"><span className="h-2 w-2 rounded-full bg-signal"></span>DISPATCH · hub → bay</span>
        <span className="flex items-center gap-2"><span className="h-2 w-2 rounded-full bg-signal/50"></span>AUDIT RETURN · bay → hub</span>
        <span className="flex items-center gap-2"><span className="h-2.5 w-2.5 rotate-45 border border-signal"></span>GOVERNANCE GATE</span>
      </div>

      {/* return path + risk branch */}
      <div className="mt-6 grid gap-3 sm:grid-cols-2">
        <div className="flex items-center gap-2.5 rounded-lg border border-line bg-ink-800/40 px-4 py-3 font-mono text-[11px] tracking-mono uppercase text-fg-muted">
          <span className="h-1.5 w-1.5 rounded-full bg-signal"></span>{radial.returnPath}
        </div>
        <div className="flex items-center gap-2.5 rounded-lg border px-4 py-3 font-mono text-[11px] tracking-mono uppercase transition-colors"
          style={{ borderColor: `rgba(255,194,74,${0.2 + gateOpacity * 0.4})`, color: gateOpacity > 0.4 ? "#FFC24A" : "#9BA3AD" }}>
          <span className="h-1.5 w-1.5 rounded-full bg-signal"></span>{radial.riskBranch}
        </div>
      </div>
    </div>
  );
}

function AutonomyDial({ dial, gov, setGov }) {
  return (
    <div className="rounded-xl border border-line bg-ink-800/50 p-6 md:p-7">
      <div className="flex items-center justify-between font-mono text-[10.5px] tracking-mono uppercase">
        <span className="text-fg-dim">{dial.left}</span>
        <span className="text-signal">{dial.label}</span>
        <span className="text-fg-dim">{dial.right}</span>
      </div>
      <input
        type="range" min="0" max="100" value={gov}
        onChange={(e) => setGov(Number(e.target.value))}
        aria-label={`${dial.label}: 0 = ${dial.ends[0]}, 100 = ${dial.ends[1]}`}
        className="dial-range mt-4 w-full"
      />
      <div className="mt-2 flex justify-between font-mono text-[10px] tracking-mono uppercase text-fg-faint">
        <span>{dial.ends[0]}</span>
        <span className="text-signal">{gov}%</span>
        <span>{dial.ends[1]}</span>
      </div>
      <p className="mt-5 max-w-[68ch] text-fg-muted leading-[1.6]" style={{ fontSize: "14.5px" }}>{dial.caption}</p>
    </div>
  );
}

function OperatingFlow() {
  const { t } = useLanguage();
  const f = t.flow;
  const [gov, setGov] = useState(72);
  const [reduce, setReduce] = useState(false);
  useEffect(() => { setReduce(window.matchMedia("(prefers-reduced-motion: reduce)").matches); }, []);

  return (
    <Section id="flow" className="py-24 md:py-36">
      <Reveal><Kicker index={f.index} label={f.kicker} /></Reveal>
      <Reveal delay={80}>
        <h2 className="mt-6 font-display font-600 leading-[1.04] tracking-[-0.01em] text-fg" style={{ fontSize: "clamp(2rem, 5vw, 4rem)" }}>
          {f.title}
        </h2>
      </Reveal>
      <Reveal delay={140}>
        <p className="mt-5 max-w-[66ch] text-fg-muted leading-[1.6]" style={{ fontSize: "1.0625rem" }}>{f.subtitle}</p>
      </Reveal>

      {/* tracks 01–03 */}
      <div className="mt-12 space-y-5">
        {f.tracks.map((tr, i) => <StepTrack key={tr.id} track={tr} i={i} />)}
      </div>

      {/* Flow 04 circuit + dial */}
      <Reveal delay={120} className="mt-12 rounded-xl border border-line bg-ink-900/50 bg-grid p-6 md:p-10">
        <div className="flex flex-wrap items-baseline justify-between gap-3">
          <div className="flex items-baseline gap-3">
            <span className="font-mono text-[12px] tracking-mono text-signal">{f.radial.id}</span>
            <h3 className="font-display text-[22px] md:text-[26px] font-600 tracking-[-0.01em] text-fg">{f.radial.title}</h3>
          </div>
          <span className="font-mono text-[10px] tracking-mono uppercase text-fg-dim">INSIDE JANE’S GOVERNANCE</span>
        </div>

        <div className="mt-8">
          <CircuitFlow radial={f.radial} gov={gov} reduce={reduce} />
        </div>

        <p className="mx-auto mt-8 max-w-[60ch] text-center font-display italic text-fg/90" style={{ fontSize: "clamp(1.05rem, 2vw, 1.4rem)" }}>
          {f.radial.caption}
        </p>

        <div className="mt-8">
          <AutonomyDial dial={f.dial} gov={gov} setGov={setGov} />
        </div>
      </Reveal>
    </Section>
  );
}

export { OperatingFlow };
