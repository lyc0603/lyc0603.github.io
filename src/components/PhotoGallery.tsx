import { useState } from 'react';
import { ChevronLeft, ChevronRight, MapPin } from 'lucide-react';
import { Dialog, DialogContent, DialogDescription, DialogTitle } from '@/components/ui/dialog';
import { photos, ui } from '@/i18n/content';
import { useLanguage } from '@/i18n/LanguageContext';

/**
 * Laid out like the gallery on wenzhi-ding.com/blog: a grid of cards with a cropped thumbnail,
 * title and location, and a lightbox that shows the whole photo with prev/next navigation.
 */
const PhotoGallery = () => {
  const { t } = useLanguage();
  const [open, setOpen] = useState<number | null>(null);
  const step = (delta: number) =>
    setOpen((i) => (i === null ? i : (i + delta + photos.length) % photos.length));
  const photo = open === null ? null : photos[open];

  return (
    <>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
        {photos.map((p, i) => (
          <button
            key={p.src}
            type="button"
            onClick={() => setOpen(i)}
            className="group text-left rounded-md border border-border overflow-hidden bg-card hover:shadow-md transition-shadow"
          >
            <div className="aspect-[4/3] overflow-hidden bg-secondary">
              <img
                src={p.thumb}
                alt={t(p.alt)}
                loading="lazy"
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                style={p.focus ? { objectPosition: p.focus } : undefined}
              />
            </div>
            <div className="px-2.5 py-2">
              <p className="text-sm font-semibold text-foreground leading-tight">{t(p.title)}</p>
              <p className="text-xs text-muted-foreground mt-0.5">{t(p.location)}</p>
            </div>
          </button>
        ))}
      </div>

      <Dialog open={photo !== null} onOpenChange={(o) => !o && setOpen(null)}>
        {photo && (
          <DialogContent
            // Sized to the photo, so portrait photos get no bars at the sides.
            className="w-auto max-w-[95vw] p-0 gap-0 overflow-hidden flex flex-col md:flex-row"
            onKeyDown={(e) => {
              if (e.key === 'ArrowRight') step(1);
              if (e.key === 'ArrowLeft') step(-1);
            }}
          >
            <div className="relative flex-shrink-0">
              <img
                src={photo.src}
                alt={t(photo.alt)}
                className="block h-auto w-auto max-h-[85vh] max-w-[95vw] md:max-w-[calc(95vw-16rem)]"
              />
              <button
                type="button"
                onClick={() => step(-1)}
                aria-label={t(ui.previousPhoto)}
                className="absolute left-2 top-1/2 -translate-y-1/2 rounded-full bg-black/50 p-1.5 text-white hover:bg-black/70"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                type="button"
                onClick={() => step(1)}
                aria-label={t(ui.nextPhoto)}
                className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full bg-black/50 p-1.5 text-white hover:bg-black/70"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
            <div className="md:w-64 flex-shrink-0 p-5 pr-10 space-y-3">
              <DialogTitle className="text-base">{t(photo.title)}</DialogTitle>
              <p className="inline-flex items-center gap-1.5 rounded bg-secondary px-2 py-1 text-xs text-muted-foreground">
                <MapPin className="w-3.5 h-3.5" />
                {t(photo.location)}
              </p>
              <DialogDescription className="text-sm text-muted-foreground leading-relaxed">
                {t(photo.alt)}
              </DialogDescription>
            </div>
          </DialogContent>
        )}
      </Dialog>
    </>
  );
};

export default PhotoGallery;
