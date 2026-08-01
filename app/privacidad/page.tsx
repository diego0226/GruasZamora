import type { Metadata } from 'next';
import Link from 'next/link';

import { PageHero } from '@/components/sections/PageHero';
import { Reveal } from '@/components/ui/Reveal';
import { JsonLd } from '@/components/JsonLd';

import { SITE, CONTENT_UPDATED } from '@/lib/site';
import { pageMetadata } from '@/lib/metadata';
import { breadcrumbSchema, webPageSchema } from '@/lib/schema';

/**
 * Política de privacidad — hallazgo F-23.
 *
 * ⚠️ ANTES DE DAR ESTO POR CERRADO: este texto describe con exactitud lo que
 * el sitio hace hoy a nivel técnico, pero NO es un documento revisado por un
 * abogado. La auditoría lo dice explícitamente y sigue siendo válido: la
 * exigencia concreta bajo la Ley 8968 y el reglamento de la PRODHAB depende de
 * cómo opere la empresa fuera del sitio —qué guarda de cada servicio, cuánto
 * tiempo, con quién lo comparte—, y eso no se puede deducir del repositorio.
 * Que un abogado lo revise antes de considerarlo cumplimiento.
 *
 * El texto se adapta solo a si hay analítica configurada. Es a propósito: una
 * política que dice «usamos Google Analytics» cuando no está activo es tan
 * incorrecta como una que lo calla cuando sí lo está, y hoy —comprobado en
 * producción— no hay ninguna herramienta de medición desplegada.
 */

const TITLE = 'Política de privacidad';
const DESCRIPTION =
  'Cómo trata Grúas Zamora Moya los datos de quienes visitan el sitio y de quienes llaman o escriben por WhatsApp o correo.';

export const metadata: Metadata = pageMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: '/privacidad',
});

/* Se lee en tiempo de compilación, igual que en components/Analytics.tsx. */
const HAY_ANALITICA = Boolean(process.env.NEXT_PUBLIC_GA_ID || process.env.NEXT_PUBLIC_GTM_ID);

export default function PrivacidadPage() {
  const crumbs = [
    { name: 'Inicio', path: '/' },
    { name: 'Privacidad', path: '/privacidad' },
  ];

  return (
    <>
      <JsonLd
        data={[
          webPageSchema({
            path: '/privacidad',
            name: TITLE,
            description: DESCRIPTION,
            dateModified: CONTENT_UPDATED.info,
            hasBreadcrumb: true,
          }),
          breadcrumbSchema(crumbs),
        ]}
      />

      <PageHero
        crumbs={crumbs}
        title={
          <>
            Política de <span className="text-flag-red-lit">privacidad</span>
          </>
        }
        lead="Qué datos maneja este sitio, para qué, y qué puede pedirnos usted sobre ellos."
      />

      <section className="bg-night-900 py-16 lg:py-24">
        <div className="mx-auto max-w-3xl px-5 sm:px-6">
          <Reveal>
            <div className="space-y-10 text-base leading-relaxed text-chrome-300 sm:text-lg">
              <div>
                <h2 className="text-2xl text-chrome-50 sm:text-3xl">Quién trata los datos</h2>
                <p className="mt-4">
                  {SITE.legalName}, empresa de {SITE.address.display}. Para cualquier consulta
                  sobre este documento o sobre sus datos, escriba a{' '}
                  <a
                    href={`mailto:${SITE.email}`}
                    data-cta="email-privacidad"
                    className="font-semibold text-chrome-100 underline decoration-flag-red/50 underline-offset-4 transition-colors hover:text-flag-red-lit"
                  >
                    {SITE.email}
                  </a>{' '}
                  o llame al{' '}
                  <a
                    href={SITE.phone.href}
                    data-cta="call-privacidad"
                    className="font-semibold text-chrome-100 underline decoration-flag-red/50 underline-offset-4 transition-colors hover:text-flag-red-lit"
                  >
                    {SITE.phone.displayFull}
                  </a>
                  .
                </p>
              </div>

              <div>
                <h2 className="text-2xl text-chrome-50 sm:text-3xl">
                  Este sitio no tiene formularios
                </h2>
                <p className="mt-4">
                  No hay ningún campo donde escribir sus datos, ni registro, ni cuenta de usuario,
                  ni carrito. Los botones de la página abren su teléfono, su WhatsApp o su cliente
                  de correo: es su propia aplicación la que envía el mensaje, no este sitio.
                </p>
              </div>

              <div>
                <h2 className="text-2xl text-chrome-50 sm:text-3xl">
                  Qué pasa cuando usted nos contacta
                </h2>
                <p className="mt-4">
                  Cuando llama, escribe por WhatsApp o manda un correo, recibimos lo que usted nos
                  dice: su número de teléfono, su ubicación, los datos del vehículo y lo que le
                  pasó. Usamos esa información para una sola cosa — despachar la unidad correcta al
                  lugar correcto y emitir la factura si la pide.
                </p>
                <p className="mt-4">
                  No vendemos ni cedemos esa información a terceros con fines comerciales. Si el
                  servicio lo paga una empresa, un taller o una aseguradora, se comparte con esa
                  parte únicamente lo necesario para el trámite del pago.
                </p>
                <p className="mt-4">
                  Los mensajes de WhatsApp viajan por la infraestructura de esa plataforma, que
                  tiene sus propias condiciones y su propia política de privacidad. Si prefiere no
                  usarla, el teléfono y el correo funcionan igual.
                </p>
              </div>

              <div>
                <h2 className="text-2xl text-chrome-50 sm:text-3xl">Cookies y medición</h2>
                {HAY_ANALITICA ? (
                  <>
                    <p className="mt-4">
                      Este sitio usa Google Analytics para saber cuántas personas lo visitan, desde
                      qué buscador llegan y qué páginas leen. Son datos agregados y estadísticos:
                      sirven para decidir qué contenido mejorar, no para identificarlo a usted.
                    </p>
                    <p className="mt-4">
                      Esa herramienta instala cookies en su navegador. Puede bloquearlas o
                      borrarlas desde la configuración de su navegador sin que ninguna función del
                      sitio deje de servir: los botones de llamada y WhatsApp siguen funcionando
                      igual.
                    </p>
                  </>
                ) : (
                  <p className="mt-4">
                    Este sitio no instala cookies de publicidad ni de seguimiento, y hoy no tiene
                    ninguna herramienta de analítica activa. Si en el futuro se agrega una para
                    medir visitas de forma agregada, esta página se actualizará antes de activarla.
                  </p>
                )}
              </div>

              <div>
                <h2 className="text-2xl text-chrome-50 sm:text-3xl">Alojamiento</h2>
                <p className="mt-4">
                  El sitio está alojado en Vercel, que como cualquier servidor web registra datos
                  técnicos de las peticiones —dirección IP, tipo de navegador, hora— con fines de
                  operación y seguridad.
                </p>
              </div>

              <div>
                <h2 className="text-2xl text-chrome-50 sm:text-3xl">Sus derechos</h2>
                <p className="mt-4">
                  Puede pedirnos que le digamos qué información suya tenemos, que la corrijamos si
                  está mal o que la eliminemos cuando ya no sea necesaria para el servicio o para
                  las obligaciones de facturación. Escríbanos a{' '}
                  <a
                    href={`mailto:${SITE.email}`}
                    data-cta="email-privacidad-derechos"
                    className="font-semibold text-chrome-100 underline decoration-flag-red/50 underline-offset-4 transition-colors hover:text-flag-red-lit"
                  >
                    {SITE.email}
                  </a>{' '}
                  y le respondemos.
                </p>
              </div>

              <div>
                <h2 className="text-2xl text-chrome-50 sm:text-3xl">Cambios</h2>
                <p className="mt-4">
                  Si cambia la forma en que tratamos los datos, se actualiza esta página. La última
                  revisión es del {CONTENT_UPDATED.info}.
                </p>
                <p className="mt-4">
                  ¿Prefiere hablar? Puede ir directo a{' '}
                  <Link
                    href="/contacto"
                    className="font-semibold text-chrome-100 underline decoration-flag-red/50 underline-offset-4 transition-colors hover:text-flag-red-lit"
                  >
                    la página de contacto
                  </Link>
                  .
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
