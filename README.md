# Jane Riveros — Astro Handoff

A production Astro port of the **“Built Without a Blueprint”** site. The original
was a single-file React + Babel-in-browser build (`legacy/Jane Riveros.html`);
this package is the same site as a real Astro project: typed content, a Tailwind
token config, and ESM React components bundled by Vite.

---

## Quick start

```bash
cd astro-handoff
npm install
npm run dev          # http://localhost:4321
```

Other scripts:

```bash
npm run build        # production build → dist/
npm run preview      # serve the production build
npm run check        # astro check (type-check; optional, see notes)
```

Requires Node 18.20+ / 20.3+ / 21+.

---

## Project structure

```
astro-handoff/
├─ astro.config.mjs            # React + Tailwind integrations
├─ tailwind.config.ts          # design tokens (ported 1:1 from the original)
├─ tsconfig.json
├─ package.json
├─ public/
│  └─ assets/                  # hero-control-room.jpg, jane-portrait-v2.png,
│                              # boardroom.jpg, archive-corridor.jpg
├─ src/
│  ├─ pages/index.astro        # the single route + <head> + MAVIS embed
│  ├─ styles/global.css        # @tailwind layers + all keyframes/utilities
│  ├─ content/site.ts          # SINGLE SOURCE OF TRUTH for copy (EN + ES)
│  ├─ context/LanguageContext.tsx
│  └─ components/
│     ├─ App.tsx               # composes the page (the React island root)
│     ├─ primitives.tsx        # Reveal, Section, Kicker, StatusPill, I (icons)
│     ├─ Nav.tsx  Hero.tsx
│     ├─ SystemArchitecture.tsx   LiveBuilds.tsx
│     ├─ MavisCapabilities.tsx    OperatingFlow.tsx
│     ├─ CinematicBand.tsx  BeforeAgents.tsx  Journey.tsx
│     ├─ Principles.tsx  BuildingInPublic.tsx  Closing.tsx  Footer.tsx
└─ legacy/                     # the original single-file build, for reference
   ├─ Jane Riveros.html
   ├─ src/  (the original .jsx + content.js)
   └─ assets/
```

---

## Architecture notes

**One React island.** The whole page hydrates as a single `<App client:only="react" />`
in `index.astro`. This is deliberate: every section reads the shared
`LanguageContext` (EN/ES toggle) and most are scroll-driven, so splitting into
per-section islands would fragment that context. `client:only` skips SSR, which
avoids a hydration mismatch on the language toggle (it reads `localStorage`).
If you later want SSR/streaming, lift language into a cross-island store
(e.g. `nanostores`) and switch sections to `client:visible`.

**Content.** All copy lives in `src/content/site.ts` as `CONTENT.en` / `CONTENT.es`.
Components never hardcode strings — they read `useLanguage().t`. `SiteContent` and
`Lang` types are inferred from the object. Edit copy there.

**Design tokens.** `tailwind.config.ts` defines the palette (`ink`, `line`, `fg`,
`signal`, `live`), fonts (`display`/`sans`/`mono`), `tracking-mono`, `max-w-shell`,
and numeric `font-400…700` utilities. System CSS (keyframes, scrollbar, the
`.dial-range` slider, `.bg-grid`, `.reveal`) is in `src/styles/global.css`.

**The four rebuilt sections** (vs. the earlier radar-based versions):
- `SystemArchitecture.tsx` — JANE governance rail → distribution bus → 3 wired agent bays.
- `LiveBuilds.tsx` — deployment status board with animated maturity bars (Training→In Build→Live).
- `MavisCapabilities.tsx` — capability patchbay (INPUT / ACTION modules) over a GOVERN power rail.
- `OperatingFlow.tsx` — Flow 04 is now a **dispatch/return circuit** (no radar), dial-driven.

**MAVIS voice agent.** The ElevenLabs embed is an inline script in `index.astro`.
Set `window.MAVIS_AGENT_ID` to your real agent id to activate it; until then it
stays dormant and logs an info line (no errors).

---

## Suggested follow-ups (optional, not required to run)

- **Icons:** `primitives.tsx` ships an inline icon set (`I.*`). Swap for
  `lucide-react` if you prefer (`npm i lucide-react`).
- **Types:** components were ported from JS and are loosely typed; `tsconfig`
  relaxes `noImplicitAny`/`strictNullChecks` so `astro build` is clean. Run
  `npm run check` and tighten types incrementally if you want full strictness.
- **Build log:** `BuildingInPublic.tsx` uses a static `entries` array — wire it
  to a live Supabase realtime query when ready (see the `TODO` in that file).
- **Images:** assets are served statically from `public/assets/`. For
  optimization, move them to `src/assets/` and use `astro:assets` `<Image>`.

---

## Migrating an edit from `legacy/` → Astro

The `.jsx` files in `legacy/src/components/` map 1:1 to the `.tsx` files in
`src/components/`. The only mechanical differences:
1. ESM imports at the top (React hooks, `useLanguage`, the primitives barrel).
2. `Object.assign(window, { X })` became `export { X }`.
3. `"assets/…"` image paths became `"/assets/…"` (served from `public/`).
4. Global `window.CONTENT` became the imported `CONTENT` in `content/site.ts`.

Otherwise the component bodies are unchanged.
