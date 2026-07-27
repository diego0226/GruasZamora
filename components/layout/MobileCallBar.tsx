import { Phone } from 'lucide-react';
import { SITE } from '@/lib/site';

/**
 * Barra fija inferior en móvil.
 *
 * Es la pieza de conversión: en una emergencia el usuario entra desde el
 * celular, y el pulgar cae naturalmente en la parte baja de la pantalla.
 * Siempre visible, sin esperar a que haga scroll. El `body` compensa la
 * altura con padding para que nunca tape el pie de página.
 */
export function MobileCallBar() {
  return (
    <div className="fixed inset-x-0 bottom-0 z-50 lg:hidden">
      <div className="flag-rule h-[3px] w-full" />
      <div className="flex bg-night-950/95 backdrop-blur-xl">
        <a
          href={SITE.phone.href}
          data-cta="call-sticky"
          aria-label={`Llamar a Grúas Zamora Moya al ${SITE.phone.displayFull}`}
          className="flex flex-[3] items-center justify-center gap-3 bg-flag-red px-4 py-3 text-white transition-colors active:bg-flag-red-deep"
        >
          <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-white/15">
            <Phone className="size-5" strokeWidth={2.4} />
          </span>
          <span className="flex flex-col leading-none">
            <span className="text-[0.6rem] font-semibold uppercase tracking-[0.16em] text-white/85">
              Llamar ahora · 24/7
            </span>
            {/* Cifras tabulares y tracking positivo: el número tiene que
                leerse de un vistazo, no verse bonito */}
            <span className="mt-1.5 font-body text-xl font-extrabold tabular-nums tracking-[0.03em]">
              {SITE.phone.display}
            </span>
          </span>
        </a>

        <a
          href={SITE.whatsapp.href}
          target="_blank"
          rel="noopener noreferrer"
          data-cta="whatsapp-sticky"
          aria-label="Escribir a Grúas Zamora Moya por WhatsApp"
          className="flex flex-1 flex-col items-center justify-center gap-1 border-l border-white/10 bg-night-800 px-3 py-3.5 text-chrome-200 transition-colors active:bg-night-700"
        >
          <svg viewBox="0 0 24 24" className="size-6 fill-[#25D366]" aria-hidden="true">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z" />
          </svg>
          <span className="text-[0.6rem] font-bold uppercase tracking-widest">WhatsApp</span>
        </a>
      </div>
    </div>
  );
}
