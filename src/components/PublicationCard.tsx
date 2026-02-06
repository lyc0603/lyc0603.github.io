import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

interface PublicationCardProps {
  badge?: string;
  title: string;
  authors: string;
  venue?: string;
  year?: string;
  links?: { label: string; url: string }[];
  abstract?: string;
  visualizationUrl?: string;
  visualizationAlt?: string;
  visualizationCaption?: string;
  bibtex?: string;
}

const BibTexDisplay = ({ bibtex }: { bibtex: string }) => {
  // Simple syntax highlighting for BibTeX
  const highlightBibtex = (text: string) => {
    return text.split('\n').map((line, i) => {
      // Match the entry type line: @type{key,
      if (line.match(/^@\w+\{/)) {
        const parts = line.match(/^(@\w+)(\{)(\w+)(,?)$/);
        if (parts) {
          return (
            <div key={i}>
              <span className="bibtex-keyword">{parts[1]}</span>
              <span>{parts[2]}</span>
              <span className="bibtex-key">{parts[3]}</span>
              <span>{parts[4]}</span>
            </div>
          );
        }
      }
      // Match field lines: key = {value},
      const fieldMatch = line.match(/^(\s*)(\w+)(\s*=\s*)(\{[^}]*\})(,?)$/);
      if (fieldMatch) {
        return (
          <div key={i}>
            <span>{fieldMatch[1]}</span>
            <span className="bibtex-keyword">{fieldMatch[2]}</span>
            <span>{fieldMatch[3]}</span>
            <span>{fieldMatch[4]}</span>
            <span>{fieldMatch[5]}</span>
          </div>
        );
      }
      return <div key={i}>{line}</div>;
    });
  };

  return (
    <div className="bibtex-container">
      <pre className="text-sm font-mono whitespace-pre-wrap">
        {highlightBibtex(bibtex)}
      </pre>
    </div>
  );
};

const PublicationCard = ({
  badge,
  title,
  authors,
  venue,
  year,
  links = [],
  abstract,
  visualizationUrl,
  visualizationAlt,
  visualizationCaption,
  bibtex,
}: PublicationCardProps) => {
  const [showBibtex, setShowBibtex] = useState(false);

  const handleLinkClick = (link: { label: string; url: string }, e: React.MouseEvent) => {
    if (link.label.toUpperCase() === 'BIB' && bibtex) {
      e.preventDefault();
      setShowBibtex(true);
    }
  };

  return (
    <>
      <div className="flex gap-4 py-4">
        {/* Badge */}
        {badge && (
          <div className="flex-shrink-0">
            <span className="publication-badge">{badge}</span>
          </div>
        )}

        {/* Content */}
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-foreground leading-snug">{title}</h3>
          <p className="text-sm text-muted-foreground mt-1">{authors}</p>
          {venue && (
            <p className="text-sm text-muted-foreground italic mt-1">
              {venue}{year && `, ${year}`}
            </p>
          )}

          {/* Links */}
          {links.length > 0 && (
            <div className="flex gap-2 mt-3">
              {links.map((link) => (
                <a
                  key={link.label}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="paper-link-btn"
                  onClick={(e) => handleLinkClick(link, e)}
                >
                  {link.label}
                </a>
              ))}
            </div>
          )}

          {/* Abstract */}
          {abstract && (
            <p className="text-sm text-muted-foreground mt-3 leading-relaxed">
              {abstract}
            </p>
          )}
        </div>

        {/* Visualization Area */}
        {visualizationUrl && (
        <div className="hidden md:block flex-shrink-0 w-56">
          <div className="rounded bg-white border border-border p-2 shadow-sm">
            <img
              src={visualizationUrl}
              alt={visualizationAlt || 'Visualization'}
              className="w-full h-auto object-contain"
            />

            {visualizationCaption && (
              <p className="mt-2 text-xs text-muted-foreground text-center leading-snug">
                {visualizationCaption}
              </p>
            )}
          </div>
        </div>
      )}
      </div>

      {/* BibTeX Modal */}
      <Dialog open={showBibtex} onOpenChange={setShowBibtex}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>BibTeX Citation</DialogTitle>
          </DialogHeader>
          {bibtex && <BibTexDisplay bibtex={bibtex} />}
        </DialogContent>
      </Dialog>
    </>
  );
};

export default PublicationCard;
