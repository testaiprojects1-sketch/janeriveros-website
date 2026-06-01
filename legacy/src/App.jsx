// src/App.jsx
// Language provider (useState + localStorage persistence) + page assembly.
// In the TS handoff this provider lives in src/context/LanguageContext.tsx and
// App.tsx just composes the sections.

function LanguageProvider({ children }) {
  const [lang, setLangState] = useState(() => {
    try { return localStorage.getItem("jr-lang") === "es" ? "es" : "en"; } catch (e) { return "en"; }
  });

  const setLang = (next) => {
    setLangState(next);
    try { localStorage.setItem("jr-lang", next); } catch (e) {}
  };

  useEffect(() => { document.documentElement.lang = lang; }, [lang]);

  const value = {
    lang,
    t: window.CONTENT[lang],
    setLang,
    toggle: () => setLang(lang === "en" ? "es" : "en"),
  };
  return <window.LanguageContext.Provider value={value}>{children}</window.LanguageContext.Provider>;
}

function App() {
  return (
    <LanguageProvider>
      <Nav />
      <main>
        <Hero />
        <SystemArchitecture />
        <LiveBuilds />
        <MavisCapabilities />
        <OperatingFlow />
        <CinematicBand variant="boardroom" />
        <BeforeAgents />
        <Journey />
        <Principles />
        <BuildingInPublic />
        <CinematicBand variant="archive" />
        <Closing />
      </main>
      <Footer />
    </LanguageProvider>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
