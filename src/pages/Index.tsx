import ProfileSidebar from '@/components/ProfileSidebar';
import Section from '@/components/Section';
import PublicationCard from '@/components/PublicationCard';
import LanguageToggle from '@/components/LanguageToggle';
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
import type { Paper } from '@/i18n/content';

/** Working papers: finance first, otherwise in the order of the data (Array.sort is stable).
 * Publications keep the data's order, computer science first. */
const financeFirst = (papers: Paper[]) =>
  [...papers].sort((a, b) => Number(a.field !== 'finance') - Number(b.field !== 'finance'));

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
                    <span className="w-10 h-6 flex-shrink-0 flex items-center justify-center">
                      <img src={position.logo.src} alt={position.logo.alt} className="max-w-full max-h-full object-contain" />
                    </span>
                    <span>
                      {position.link
                        ? (() => {
                            const text = t(position);
                            const label = t(position.link.label);
                            const i = text.indexOf(label);
                            return (
                              <>
                                {text.slice(0, i)}
                                <a href={position.link.url} target="_blank" rel="noopener noreferrer">
                                  {label}
                                </a>
                                {text.slice(i + label.length)}
                              </>
                            );
                          })()
                        : t(position)}
                    </span>
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
                    <span className="w-10 h-6 flex-shrink-0 flex items-center justify-center">
                      <img src={degree.logo.src} alt={degree.logo.alt} className="max-w-full max-h-full object-contain" />
                    </span>
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
                    key={paper.title.en}
                    badge={paper.badge}
                    badgeColor={badgeColors[paper.badgeColorKey]}
                    field={paper.field}
                    title={t(paper.title)}
                    authors={t(paper.authors)}
                    venue={paper.venue}
                    venueUrl={paper.venueUrl}
                    year={paper.year}
                    presentations={paper.presentations}
                    mediaCoverage={paper.mediaCoverage}
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
                {financeFirst(workingPapers).map((paper) => (
                  <PublicationCard
                    key={paper.title.en}
                    badge={paper.badge}
                    badgeColor={badgeColors[paper.badgeColorKey]}
                    field={paper.field}
                    title={t(paper.title)}
                    authors={t(paper.authors)}
                    venue={paper.venue}
                    venueUrl={paper.venueUrl}
                    year={paper.year}
                    presentations={paper.presentations}
                    mediaCoverage={paper.mediaCoverage}
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
