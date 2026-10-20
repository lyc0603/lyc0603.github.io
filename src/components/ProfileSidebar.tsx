import { Github, FileText, Linkedin } from 'lucide-react';
import { ui } from '@/i18n/content';
import { useLanguage } from '@/i18n/LanguageContext';

const ProfileSidebar = () => {
  const { t } = useLanguage();

  return (
    <aside className="w-full lg:w-56 flex-shrink-0">
      <div className="sticky top-6 space-y-4">
        {/* Profile Image */}
        <div className="flex justify-center">
          <div className="w-36 h-36 rounded-lg overflow-hidden bg-secondary">
            <img
              /* load from asset/profile.jpg in production */
              src="/asset/profile.jpg"
              alt="Profile"
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* Name and Info */}
        <div className="text-center space-y-0.5">
          <h1 className="text-lg font-semibold">{t(ui.name)}</h1>
          <p className="text-sm text-muted-foreground">ycluo@hku.hk</p>
          <p className="text-sm text-muted-foreground">{t(ui.researchField)}</p>
        </div>

        {/* Social Links */}
        <div className="flex justify-center gap-3">
          <a
            href="https://github.com/lyc0603"
            className="p-2 rounded-md hover:bg-secondary transition-colors text-foreground"
            aria-label="GitHub"
          >
            <Github className="w-5 h-5" />
          </a>
          <a
            href="https://www.linkedin.com/in/yichen-luo-8aba91245/"
            className="p-2 rounded-md hover:bg-secondary transition-colors text-foreground"
            aria-label="LinkedIn"
          >
            <Linkedin className="w-5 h-5" />
          </a>
          <a
            href="https://scholar.google.com/citations?user=_oQ5ynAAAAAJ&hl=en"
            className="p-2 rounded-md hover:bg-secondary transition-colors text-foreground"
            aria-label="Google Scholar"
          >
            {/* Google Scholar mark (Simple Icons); lucide-react has no Scholar icon */}
            <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5" aria-hidden="true">
              <path d="M5.242 13.769 0 9.5 12 0l12 9.5-5.242 4.269C17.548 11.249 14.978 9.5 12 9.5c-2.977 0-5.548 1.748-6.758 4.269zM12 10a7 7 0 1 0 0 14 7 7 0 0 0 0-14z" />
            </svg>
          </a>
        </div>

        {/* Navigation */}
        <nav className="space-y-0.5 pt-3 border-t border-border">
          <a href="#about" className="block py-1.5 text-center text-sm hover:text-link-hover text-foreground">
            {t(ui.navAbout)}
          </a>
          <a href="#publications" className="block py-1.5 text-center text-sm hover:text-link-hover text-foreground">
            {t(ui.navPublications)}
          </a>
          <a href="#working-papers" className="block py-1.5 text-center text-sm hover:text-link-hover text-foreground">
            {t(ui.navWorkingPapers)}
          </a>
          <a href="#photography" className="block py-1.5 text-center text-sm hover:text-link-hover text-foreground">
            {t(ui.navPhotography)}
          </a>
        </nav>

        {/* CV Link */}
        <div className="text-center pt-3">
          <a
            href="/asset/pdf/cv.pdf"
            className="inline-flex items-center gap-2 text-sm hover:text-link-hover text-foreground"
          >
            <FileText className="w-4 h-4" />
            {t(ui.cv)}
          </a>
        </div>

        {/* Copyright */}
        <p className="text-center text-xs text-muted-foreground pt-6">
          © {new Date().getFullYear()}
        </p>
      </div>
    </aside>
  );
};

export default ProfileSidebar;
