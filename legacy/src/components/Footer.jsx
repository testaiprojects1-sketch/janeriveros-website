// src/components/Footer.jsx
function Footer() {
  const { t } = useLanguage();
  const f = t.footer;
  const icon = { li: I.Linkedin, yt: I.Youtube };
  return (
    <footer className="border-t border-line bg-ink">
      <div className="mx-auto max-w-shell px-6 md:px-10 py-10 flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
        <div className="font-mono text-[12px] tracking-mono text-fg-muted">{f.copyright}</div>

        <div className="flex items-center gap-6">
          {f.links.map((l) => {
            const Ic = icon[l.id];
            return (
              <a key={l.id} href={l.href} className="inline-flex items-center gap-2 font-mono text-[12px] tracking-mono uppercase text-fg-muted transition-colors hover:text-signal">
                {Ic && <Ic className="h-4 w-4" />}
                {l.label}
              </a>
            );
          })}
        </div>

        <div className="flex items-center gap-2 font-mono text-[11px] tracking-mono text-fg-dim">
          <span className="h-1.5 w-1.5 rounded-full bg-signal"></span>
          {f.version}
        </div>
      </div>
    </footer>
  );
}
Object.assign(window, { Footer });
