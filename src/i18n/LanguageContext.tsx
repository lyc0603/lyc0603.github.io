import { createContext, ReactNode, useContext, useEffect, useMemo } from 'react';
import { useLocation } from 'react-router-dom';
import { Lang, Localized, ui } from './content';

interface LanguageContextValue {
  lang: Lang;
  /** Pick the current language out of a localized value. */
  t: (value: Localized) => string;
  /** Path of the given page in the other language, for the toggle. */
  otherLangPath: string;
}

const LanguageContext = createContext<LanguageContextValue | null>(null);

/** The Chinese version of the site lives under /zh. */
export const langFromPathname = (pathname: string): Lang =>
  pathname === '/zh' || pathname.startsWith('/zh/') ? 'zh' : 'en';

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const { pathname } = useLocation();
  const lang = langFromPathname(pathname);

  useEffect(() => {
    document.documentElement.lang = lang === 'zh' ? 'zh-CN' : 'en';
    document.title = ui.siteTitle[lang];
  }, [lang]);

  const value = useMemo<LanguageContextValue>(
    () => ({
      lang,
      t: (localized: Localized) => localized[lang],
      otherLangPath: lang === 'zh' ? '/' : '/zh',
    }),
    [lang],
  );

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
