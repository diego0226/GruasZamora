'use client';

import { useEffect, useState } from 'react';
import { Phone } from 'lucide-react';
import { WhatsAppGlyph } from '@/components/ui/WhatsAppGlyph';
import { SITE } from '@/lib/site';
import { cn } from '@/lib/utils';

/**
 * Accesos flotantes de llamada y WhatsApp.
 *
 * Reemplaza la barra fija inferior. Arriba del todo no se ve nada: el hero ya
 * trae sus propios botones de llamar y WhatsApp, y repetirlos pegados al borde
 * inferior recargaba la pantalla sin agregar nada. Aparecen en cuanto la
 * persona empieza a bajar —que es cuando los botones del hero ya se fueron— y
 * se esconden solos al volver arriba.
 *
 * Van en todos los tamaños de pantalla, no solo en móvil.
 */

/**
 * Umbrales de aparición, en píxeles de scroll.
 *
 * Se calculan contra la altura de la ventana en vez de fijarlos: en un celular
 * en horizontal la pantalla mide 400px y un umbral fijo de 300 dejaría los
 * botones sin aparecer casi nunca. El mínimo evita que salten con un empujón
 * de dos píxeles; el máximo, que en una pantalla muy alta haya que bajar medio
 * kilómetro para verlos.
 */
function thresholds() {
  const show = Math.min(Math.max(window.innerHeight * 0.35, 220), 420);
  // Histéresis: una vez visibles se esconden más abajo de donde aparecieron,
  // para que quedarse quieto justo en el umbral no los haga parpadear.
  return { show, hide: show * 0.55 };
}

export function FloatingContact() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // Se lee `scrollY` directo en el manejador, sin agrupar por cuadro de
    // animación: es un valor que el navegador ya tiene, leerlo no fuerza
    // recálculo de layout, y React descarta el render cuando el booleano no
    // cambia — que es lo que pasa en casi todos los eventos de scroll.
    const read = () => {
      const { show, hide } = thresholds();
      const y = window.scrollY;
      setVisible((prev) => (prev ? y > hide : y > show));
    };

    // Primera lectura al montar: si alguien recarga a media página o entra
    // directo a un ancla, los botones ya tienen que estar donde corresponde.
    read();

    window.addEventListener('scroll', read, { passive: true });
    window.addEventListener('resize', read, { passive: true });

    return () => {
      window.removeEventListener('scroll', read);
      window.removeEventListener('resize', read);
    };
  }, []);

  return (
    // `inert` mientras están ocultos: sin esto siguen siendo enlaces reales y
    // el tabulador se mete en dos botones invisibles antes de llegar al pie.
    <div
      inert={!visible}
      className={cn(
        'fixed bottom-5 right-5 z-50 flex flex-col items-center gap-3 sm:bottom-7 sm:right-7',
        'transition-[opacity,transform] duration-300 ease-out',
        visible ? 'translate-y-0 opacity-100' : 'pointer-events-none translate-y-4 opacity-0'
      )}
    >
      <a
        href={SITE.whatsapp.href}
        target="_blank"
        rel="noopener noreferrer"
        data-cta="whatsapp-float"
        aria-label="Escribir a Grúas Zamora Moya por WhatsApp"
        className={cn(
          'flex size-14 items-center justify-center rounded-full bg-[#25D366]',
          'shadow-[0_10px_28px_-8px_rgba(0,0,0,0.85)]',
          'transition-transform duration-200 hover:scale-105 active:scale-95'
        )}
      >
        <WhatsAppGlyph className="size-7 fill-white" />
      </a>

      {/* La llamada va abajo: es el CTA principal y queda donde cae el pulgar. */}
      <a
        href={SITE.phone.href}
        data-cta="call-float"
        aria-label={`Llamar a Grúas Zamora Moya al ${SITE.phone.displayFull}`}
        className={cn(
          'flex size-14 items-center justify-center rounded-full bg-flag-red text-white',
          'shadow-[0_10px_28px_-8px_rgba(0,0,0,0.85)]',
          'transition-[transform,background-color] duration-200',
          'hover:scale-105 hover:bg-flag-red-lit active:scale-95'
        )}
      >
        <Phone className="size-6" strokeWidth={2.4} />
      </a>
    </div>
  );
}
