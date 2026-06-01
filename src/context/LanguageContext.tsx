import React, { createContext, useContext, useEffect, useState } from 'react';
import { CONTENT, type Lang, type SiteContent } from '../content/site';

interface LangCtx {
  lang: Lang;
  t: SiteContent;
  setLang: (l: Lang) => void;
  toggle: () => void;
}

const LanguageContext = createContext<LangCtx>({
  lang: 'en',
  t: CONTENT.en,
  setLang: () => {},
  toggle: () => {},
});

export const useLanguage = () => useContext(LanguageContext);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLangState] = useState<Lang>(() => {
    try {
      return localStorage.getItem('jr-lang') === 'es' ? 'es' : 'en';
    } catch {
      return 'en';
    }
  });

  const setLang = (next: Lang) => {
    setLangState(next);
    try {
      localStorage.setItem('jr-lang', next);
    } catch {}
  };

  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  const value: LangCtx = {
    lang,
    t: CONTENT[lang],
    setLang,
    toggle: () => setLang(lang === 'en' ? 'es' : 'en'),
  };

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export { LanguageContext };
