import { Mail, MapPin, Clock3 } from 'lucide-react';
import { CallButton, WhatsAppButton } from '@/components/ui/CallButton';
import { Reveal } from '@/components/ui/Reveal';
import { SITE } from '@/lib/site';

/**
 * Cierre de página. Quien llegó hasta acá ya se convenció: lo único que
 * queda es no ponerle un solo obstáculo entre la decisión y la llamada.
 */
export function FinalCta({
  title,
  lead,
}: {
  title?: React.ReactNode;
  lead?: React.ReactNode;
}) {
  return (
    <section id="contacto" className="relative scroll-mt-24 overflow-hidden bg-night-900">
      <div className="flag-fade" aria-hidden />

      <div className="relative py-20 lg:py-24">
        <div className="stars-field absolute inset-0 opacity-60" />

        <Reveal className="relative mx-auto max-w-3xl px-5 text-center sm:px-6">
          <p className="mb-6 inline-flex items-center gap-2.5 rounded-sm border border-flag-red-lit/40 bg-night-950/70 px-3.5 py-2 text-[0.7rem] font-bold uppercase tracking-[0.22em] text-chrome-100">
            <span className="lightbar-dot inline-block size-2 rounded-full" />
            Contestamos a cualquier hora
          </p>

          <h2 className="text-3xl leading-[0.95] text-chrome-50 sm:text-4xl lg:text-5xl">
            {title ?? (
              <>
                ¿Necesita una grúa <span className="text-flag-red-lit">ahora mismo?</span>
              </>
            )}
          </h2>

          <p className="mx-auto mt-5 max-w-xl text-base leading-relaxed text-chrome-300 sm:text-lg">
            {lead ??
              'Una llamada basta. Nos dice dónde está y qué le pasó al vehículo, le confirmamos precio y tiempo de llegada, y sale la unidad.'}
          </p>

          <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <CallButton size="lg" className="w-full sm:w-auto" />
            <WhatsAppButton size="lg" label="WhatsApp" className="w-full sm:w-auto" />
          </div>

          <ul className="mt-12 flex flex-col items-center justify-center gap-4 border-t border-chrome-300/15 pt-8 text-sm text-chrome-400 sm:flex-row sm:gap-8">
            <li className="flex items-center gap-2.5">
              <Clock3 className="size-4 shrink-0 text-flag-red-lit" />
              24 horas, los 365 días
            </li>
            <li className="flex items-center gap-2.5">
              <MapPin className="size-4 shrink-0 text-flag-red-lit" />
              {SITE.address.display}
            </li>
            <li>
              <a
                href={`mailto:${SITE.email}`}
                className="flex items-center gap-2.5 transition-colors hover:text-chrome-100"
              >
                <Mail className="size-4 shrink-0 text-flag-red-lit" />
                {SITE.email}
              </a>
            </li>
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
