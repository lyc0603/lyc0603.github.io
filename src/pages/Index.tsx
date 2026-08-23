import ProfileSidebar from '@/components/ProfileSidebar';
import Section from '@/components/Section';
import PublicationCard from '@/components/PublicationCard';
import LanguageToggle from '@/components/LanguageToggle';
import { GraduationCap, Building2 } from 'lucide-react';
import {
  aboutText,
  badgeColors,
  education,
  positions,
  publications,
  ui,
  workingPapers,
} from '@/i18n/content';
import { useLanguage } from '@/i18n/LanguageContext';

const Index = () => {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-6xl mx-auto px-4 py-6 lg:py-8">
        {/* Header */}
        <header className="mb-6 pb-3 border-b border-section-border flex items-center justify-between gap-4">
          <p className="text-sm text-muted-foreground uppercase tracking-wider">
            {t(ui.mainPage)}
          </p>
          <LanguageToggle />
        </header>

        {/* Main Layout */}
        <div className="flex flex-col lg:flex-row gap-8">
          <ProfileSidebar />

          {/* Main Content */}
          <main className="flex-1 min-w-0">
            {/* About Me */}
            <Section id="about" title={t(ui.about)}>
              <p className="text-foreground leading-relaxed">{t(aboutText)}</p>
            </Section>

            <div className="section-divider" />

            {/* Current Position */}
            <Section id="position" title={t(ui.position)}>
              <ul className="space-y-2">
                {positions.map((position) => (
                  <li key={position.en} className="flex items-start gap-3">
                    <Building2 className="w-5 h-5 text-foreground flex-shrink-0 mt-0.5" />
                    <span>{t(position)}</span>
                  </li>
                ))}
              </ul>
            </Section>

            <div className="section-divider" />

            {/* Education */}
            <Section id="education" title={t(ui.education)}>
              <ul className="space-y-3">
                {education.map((degree) => (
                  <li key={degree.en} className="flex items-start gap-3">
                    <GraduationCap className="w-5 h-5 text-foreground flex-shrink-0 mt-0.5" />
                    <span>{t(degree)}</span>
                  </li>
                ))}
              </ul>
            </Section>

            <div className="section-divider" />

            {/* Publications */}
            <Section id="publications" title={t(ui.publications)}>
              <div className="divide-y divide-border">
                {publications.map((paper) => (
                  <PublicationCard
                    key={paper.title}
                    badge={paper.badge}
                    badgeColor={badgeColors[paper.badgeColorKey]}
                    title={paper.title}
                    authors={paper.authors}
                    venue={paper.venue && t(paper.venue)}
                    year={paper.year}
                    presentations={paper.presentations?.map((p) => ({
                      name: t(p.name),
                      year: p.year,
                    }))}
                    links={paper.links}
                    abstract={t(paper.abstract)}
                    bibtex={paper.bibtex}
                    visualizationUrl={paper.visualizationUrl}
                    visualizationAlt={paper.visualizationAlt}
                    visualizationCaption={
                      paper.visualizationCaption && t(paper.visualizationCaption)
                    }
                  />
                ))}
              </div>
            </Section>

            <div className="section-divider" />

            {/* Working Papers */}
            <Section id="working-papers" title={t(ui.workingPapers)}>
              <div className="divide-y divide-border">
                {workingPapers.map((paper) => (
                  <PublicationCard
                    key={paper.title}
                    badge={paper.badge}
                    badgeColor={badgeColors[paper.badgeColorKey]}
                    title={paper.title}
                    authors={paper.authors}
                    venue={paper.venue && t(paper.venue)}
                    year={paper.year}
                    presentations={paper.presentations?.map((p) => ({
                      name: t(p.name),
                      year: p.year,
                    }))}
                    links={paper.links}
                    abstract={t(paper.abstract)}
                    bibtex={paper.bibtex}
                    visualizationUrl={paper.visualizationUrl}
                    visualizationAlt={paper.visualizationAlt}
                    visualizationCaption={
                      paper.visualizationCaption && t(paper.visualizationCaption)
                    }
                  />
                ))}
              </div>
            </Section>
          </main>
        </div>
      </div>
    </div>
  );
};

export default Index;
