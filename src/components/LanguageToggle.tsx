import { Link } from 'react-router-dom';
import { LANGUAGES } from '@/i18n/content';
import { useLanguage } from '@/i18n/LanguageContext';

/** "English | 中文" — the active language is plain text, the other is a link. */
const LanguageToggle = () => {
  const { lang } = useLanguage();

  return (
    <p className="text-sm">
      {LANGUAGES.map((language, index) => (
        <span key={language.code}>
          {index > 0 && <span className="text-muted-foreground mx-1.5">|</span>}
          {language.code === lang ? (
            <span className="text-muted-foreground" aria-current="true">
              {language.label}
            </span>
          ) : (
            <Link to={language.path} hrefLang={language.code}>
              {language.label}
            </Link>
          )}
        </span>
      ))}
    </p>
  );
};

export default LanguageToggle;
