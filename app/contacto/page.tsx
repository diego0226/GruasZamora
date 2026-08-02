import type { Metadata } from 'next';
import Link from 'next/link';
import { Phone, Mail, MapPin, Clock3, MessageCircle, Facebook, Instagram } from 'lucide-react';

import { PageHero } from '@/components/sections/PageHero';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Reveal } from '@/components/ui/Reveal';
import { JsonLd } from '@/components/JsonLd';

import { SITE, CONTENT_UPDATED } from '@/lib/site';
import { ZONE_LINKS } from '@/lib/nav';
import { pageMetadata } from '@/lib/metadata';
import { breadcrumbSchema, webPageSchema } from '@/lib/schema';

/**
 * Página de contacto.
 *
 * Resuelve el hallazgo F-19: el sitio tenía botones de llamada y WhatsApp en
 * todas partes, pero ninguna URL estable donde estuvieran juntos el nombre, el
 * teléfono, el correo, el horario y la cobertura.
 *
 * Esa URL hace falta por tres motivos distintos:
 *
 *  1. Es la que se pone en la ficha de Google Business, en un directorio o en
 *     el perfil de Facebook. Un botón `tel:` que vive dentro de un hero no se
 *     puede enlazar desde fuera.
 *  2. Es donde un agente de IA o un rastreador va a buscar los datos de la
 *     empresa cuando alguien pregunte «cómo contacto a Grúas Zamora Moya».
 *  3. Es la página que consulta quien está comparando sin urgencia. Para la
 *     urgencia siguen estando los botones directos en cada página.
 *
 * NO lleva formulario a propósito: un formulario que nadie contesta en cinco
 * minutos es peor que no tenerlo cuando el visitante está varado en la
 * carretera.
 */

/* 40 caracteres: con el sufijo « | Grúas Zamora» que agrega la plantilla del
   layout queda en 55, por debajo de los ~60 donde Google corta el título. */
const TITLE = 'Contacto · Grúas 24/7 en Costa Rica';
const DESCRIPTION =
  'Teléfono, WhatsApp y correo de Grúas Zamora Moya. Base en Grecia, Alajuela, con servicio las 24 horas en todo Costa Rica. Llame al 8387-6352.';

export const metadata: Metadata = pageMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: '/contacto',
});

/** Lo que pedimos por teléfono para poder despachar la unidad correcta. */
const DATOS = [
  {
    titulo: 'Dónde está',
    texto:
      'Un punto de referencia sirve más que una dirección: el mojón, el peaje, el puente, el negocio más cercano. Si tiene señal, mándenos la ubicación por WhatsApp y listo.',
  },
  {
    titulo: 'Qué vehículo es',
    texto:
      'Marca, modelo y si es eléctrico o híbrido. Eso decide la unidad: un eléctrico viaja con las cuatro llantas sin girar —en plataforma o sobre speed dollies—, y un vehículo muy bajo necesita rampas.',
  },
  {
    titulo: 'Qué le pasó',
    texto:
      'Si no arranca, si no frena, si se salió de la vía, si tiene una llanta destruida o si quedó de un choque. De ahí sale si hace falta cabrestante.',
  },
  {
    titulo: 'A dónde va',
    texto:
      'El taller, la agencia, su casa o el punto que indique. Si todavía no lo tiene decidido, no importa: se puede definir en el camino.',
  },
];

export default function ContactoPage() {
  const crumbs = [
    { name: 'Inicio', path: '/' },
    { name: 'Contacto', path: '/contacto' },
  ];

  return (
    <>
      <JsonLd
        data={[
          webPageSchema({
            path: '/contacto',
            name: TITLE,
            description: DESCRIPTION,
            dateModified: CONTENT_UPDATED.info,
            hasBreadcrumb: true,
            type: 'ContactPage',
          }),
          breadcrumbSchema(crumbs),
        ]}
      />

      <PageHero
        crumbs={crumbs}
        title={
          <>
            Contacto <span className="text-flag-red-lit">directo</span>
          </>
        }
        lead="Contestamos a cualquier hora, todos los días del año. Si es una emergencia, llame: es más rápido que escribir."
      />

      {/* Datos de la empresa */}
      <section className="tread-plate bg-night-900 py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-5 sm:px-6">
          <SectionHeading
            eyebrow="Datos de la empresa"
            title={
              <>
                Grúas Zamora Moya, <span className="text-flag-red-lit">de Grecia</span>
              </>
            }
            lead="La empresa es de Grecia, Alajuela. Es un negocio de área de servicio: las unidades salen desde aquí hacia donde esté el vehículo, no se atiende al público en un local."
          />

          <Reveal className="mt-10">
            <dl className="grid gap-px overflow-hidden border border-chrome-300/12 bg-chrome-300/12 sm:grid-cols-2">
              <div className="bg-night-800 p-6">
                <dt className="flex items-center gap-2.5 text-xs font-bold uppercase tracking-wider text-chrome-400">
                  <Phone className="size-4 text-flag-red-lit" />
                  Teléfono
                </dt>
                <dd className="mt-3">
                  <a
                    href={SITE.phone.href}
                    data-cta="call-contacto"
                    className="font-body text-2xl font-extrabold tabular-nums text-chrome-50 transition-colors hover:text-flag-red-lit"
                  >
                    {SITE.phone.displayFull}
                  </a>
                </dd>
              </div>

              <div className="bg-night-800 p-6">
                <dt className="flex items-center gap-2.5 text-xs font-bold uppercase tracking-wider text-chrome-400">
                  <MessageCircle className="size-4 text-flag-red-lit" />
                  WhatsApp
                </dt>
                <dd className="mt-3">
                  <a
                    href={SITE.whatsapp.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    data-cta="whatsapp-contacto"
                    className="font-body text-2xl font-extrabold tabular-nums text-chrome-50 transition-colors hover:text-flag-red-lit"
                  >
                    {SITE.phone.display}
                  </a>
                </dd>
              </div>

              <div className="bg-night-800 p-6">
                <dt className="flex items-center gap-2.5 text-xs font-bold uppercase tracking-wider text-chrome-400">
                  <Mail className="size-4 text-flag-red-lit" />
                  Correo
                </dt>
                <dd className="mt-3">
                  <a
                    href={`mailto:${SITE.email}`}
                    data-cta="email-contacto"
                    className="break-all text-lg font-semibold text-chrome-200 transition-colors hover:text-flag-red-lit"
                  >
                    {SITE.email}
                  </a>
                </dd>
              </div>

              <div className="bg-night-800 p-6">
                <dt className="flex items-center gap-2.5 text-xs font-bold uppercase tracking-wider text-chrome-400">
                  <Clock3 className="size-4 text-flag-red-lit" />
                  Horario
                </dt>
                <dd className="mt-3 text-lg font-semibold text-chrome-200">
                  24 horas, los 365 días
                </dd>
              </div>

              <div className="bg-night-800 p-6 sm:col-span-2">
                <dt className="flex items-center gap-2.5 text-xs font-bold uppercase tracking-wider text-chrome-400">
                  <MapPin className="size-4 text-flag-red-lit" />
                  Base de operaciones
                </dt>
                <dd className="mt-3 text-lg font-semibold text-chrome-200">
                  {SITE.address.display}
                </dd>
              </div>
            </dl>
          </Reveal>

          <Reveal className="mt-8">
            <div className="flex flex-wrap items-center gap-3">
              <a
                href={SITE.social.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2.5 border border-chrome-300/20 px-4 py-2.5 text-sm font-semibold text-chrome-300 transition-colors hover:border-flag-red-lit hover:text-chrome-50"
              >
                <Facebook className="size-4 text-flag-red-lit" />
                Facebook
              </a>
              <a
                href={SITE.social.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2.5 border border-chrome-300/20 px-4 py-2.5 text-sm font-semibold text-chrome-300 transition-colors hover:border-flag-red-lit hover:text-chrome-50"
              >
                <Instagram className="size-4 text-flag-red-lit" />
                Instagram
              </a>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Qué datos enviar */}
      <section className="bg-night-950 py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-5 sm:px-6">
          <SectionHeading
            eyebrow="Al llamar"
            title={
              <>
                Cuatro datos y <span className="text-flag-red-lit">sale la unidad</span>
              </>
            }
            lead="Con esto le confirmamos el precio y el tiempo de llegada en la misma llamada, antes de despachar. Nunca se entera del monto cuando la grúa ya llegó."
          />

          <ol className="mt-12 grid gap-5 sm:grid-cols-2">
            {DATOS.map((dato, i) => (
              <Reveal key={dato.titulo} delay={(i % 2) * 90}>
                <li className="lift h-full border-l-4 border-flag-red bg-night-800 p-7">
                  <div className="mb-3 flex items-start justify-between gap-4">
                    <h3 className="text-xl text-chrome-50">{dato.titulo}</h3>
                    <span className="font-display text-3xl text-chrome-300/12" aria-hidden="true">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                  </div>
                  <p className="leading-relaxed text-chrome-400">{dato.texto}</p>
                </li>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      {/* Cobertura */}
      <section className="tread-plate bg-night-900 py-16 lg:py-20">
        <div className="mx-auto max-w-7xl px-5 sm:px-6">
          <SectionHeading
            eyebrow="Dónde llegamos"
            title="Cobertura"
            lead="Base en Grecia, respuesta rápida en Occidente y traslados coordinados a cualquier punto del país."
          />

          <Reveal className="mt-8">
            <ul className="flex flex-wrap gap-2.5">
              {ZONE_LINKS.map((z) => (
                <li key={z.slug}>
                  <Link
                    href={`/${z.slug}`}
                    className="inline-flex items-center gap-2 border border-chrome-300/18 bg-night-800 px-4 py-2.5 text-sm font-semibold text-chrome-300 transition-colors hover:border-flag-red-lit hover:text-chrome-50"
                  >
                    <MapPin className="size-3.5 text-flag-red-lit" />
                    {z.name}
                  </Link>
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal className="mt-8">
            <p className="max-w-3xl border-l-2 border-flag-red/50 pl-5 leading-relaxed text-chrome-400">
              <strong className="font-semibold text-chrome-200">
                Guanacaste, Puntarenas y Limón:
              </strong>{' '}
              también los cubrimos. Son traslados más largos, así que se coordinan por teléfono con
              hora y precio cerrados antes de que salga la unidad — nunca lo dejamos esperando sin
              un dato claro.
            </p>
          </Reveal>

          <Reveal className="mt-10">
            <p className="text-sm text-chrome-400">
              Formas de pago: {SITE.paymentMethods.join(' · ')}. Consulte también{' '}
              <Link
                href="/que-hacer-si-se-vara"
                className="font-semibold text-chrome-200 underline decoration-flag-red/50 underline-offset-4 transition-colors hover:text-flag-red-lit"
              >
                qué hacer mientras llega la grúa
              </Link>
              .
            </p>
          </Reveal>
        </div>
      </section>
    </>
  );
}
