import Link from 'next/link';
import { ArrowUpRight, MapPin, Home, Gauge, Map } from 'lucide-react';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Reveal } from '@/components/ui/Reveal';
import { ZONES, FEATURED_ZONES } from '@/lib/zones';

/**
 * Tres niveles, en este orden, porque es el orden en que importa:
 * de dónde somos → dónde llegamos rápido → hasta dónde llegamos.
 *
 * El tercero es el que más se malinterpreta: la gente asume que una empresa
 * de Grecia solo trabaja en Grecia.
 */
const TIERS = [
  {
    icon: Home,
    label: 'Somos de aquí',
    title: 'Grecia, Alajuela',
    body: 'La empresa es de Grecia. Aquí guardamos las unidades y desde aquí sale cada servicio.',
  },
  {
    icon: Gauge,
    label: 'Llegamos en minutos',
    title: 'Occidente y Alajuela',
    body: 'Naranjo, Sarchí, Palmares, San Ramón, Atenas, Poás, Zarcero y Alajuela centro. Estar adentro de la región es la ventaja.',
  },
  {
    icon: Map,
    label: 'Vamos hasta donde sea',
    title: 'Las 7 provincias',
    body: 'San José, Heredia, Cartago, Guanacaste, Puntarenas y Limón. Si el vehículo tiene que moverse, lo movemos.',
  },
];

export function Coverage() {
  const featuredSlugs = new Set(FEATURED_ZONES.map((z) => z.slug));
  const rest = ZONES.filter((z) => !featuredSlugs.has(z.slug));
  const cantones = rest.filter((z) => z.kind === 'canton');
  const provincias = rest.filter((z) => z.kind === 'provincia');

  return (
    <section id="cobertura" className="scroll-mt-24 bg-night-950 py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-5 sm:px-6">
        <SectionHeading
          eyebrow="Dónde llegamos"
          title={
            <>
              Somos de Grecia.{' '}
              <span className="text-flag-red-lit">Trabajamos en todo Costa Rica.</span>
            </>
          }
          lead="Ser una empresa de Occidente no significa que solo atendamos Occidente. Significa que en Occidente llegamos antes que nadie — y que al resto del país también vamos, con el tiempo y el precio claros desde la llamada."
        />

        {/* Los tres niveles de cobertura */}
        <ol className="mt-14 grid gap-4 md:grid-cols-3">
          {TIERS.map(({ icon: Icon, label, title, body }, i) => (
            <Reveal key={title} delay={i * 100}>
              <li className="relative flex h-full flex-col border-t-2 border-flag-red bg-night-900 p-7">
                <span
                  className="absolute right-6 top-5 font-display text-4xl text-chrome-300/8"
                  aria-hidden="true"
                >
                  {i + 1}
                </span>
                <Icon className="mb-5 size-7 text-flag-red-lit" strokeWidth={1.7} />
                <p className="text-[0.68rem] font-bold uppercase tracking-[0.2em] text-chrome-500">
                  {label}
                </p>
                <h3 className="mt-2 text-2xl text-chrome-50">{title}</h3>
                <p className="mt-3 leading-relaxed text-chrome-400">{body}</p>
              </li>
            </Reveal>
          ))}
        </ol>

        {/* Las tres páginas de cobertura principales */}
        <div className="mt-5 grid gap-5 lg:grid-cols-3">
          {FEATURED_ZONES.map((zone, i) => (
            <Reveal key={zone.slug} delay={i * 100}>
              <Link
                href={`/${zone.slug}`}
                className="lift stars-field group flex h-full flex-col justify-between border border-chrome-300/12 bg-night-800 p-7 transition-colors hover:border-flag-red/60"
              >
                <div>
                  <span className="mb-5 flex size-11 items-center justify-center rounded-sm bg-flag-red/15 text-flag-red-lit">
                    <MapPin className="size-5" />
                  </span>
                  <h3 className="text-2xl text-chrome-50">Grúas {zone.name}</h3>
                  <p className="mt-4 line-clamp-4 leading-relaxed text-chrome-400">
                    {zone.lead}
                  </p>
                </div>

                <span className="mt-7 inline-flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-flag-red-lit">
                  Ver cobertura
                  <ArrowUpRight className="size-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </span>
              </Link>
            </Reveal>
          ))}
        </div>

        {/* Listado completo — el bloque que sostiene el SEO local */}
        <Reveal className="mt-14 space-y-9">
          <div>
            <h3 className="mb-5 text-sm tracking-[0.22em] text-chrome-300">
              Cantones de Occidente y Alajuela
            </h3>
            <ul className="flex flex-wrap gap-2.5">
              {cantones.map((zone) => (
                <ZoneChip key={zone.slug} slug={zone.slug} name={zone.name} accent />
              ))}
            </ul>
          </div>

          <div>
            <h3 className="mb-5 text-sm tracking-[0.22em] text-chrome-300">
              Resto del Valle Central
            </h3>
            <ul className="flex flex-wrap gap-2.5">
              {provincias.map((zone) => (
                <ZoneChip key={zone.slug} slug={zone.slug} name={zone.name} />
              ))}
            </ul>
          </div>

          <p className="max-w-3xl border-l-2 border-flag-red/50 pl-5 leading-relaxed text-chrome-400">
            <strong className="font-semibold text-chrome-200">
              Guanacaste, Puntarenas y Limón:
            </strong>{' '}
            también los cubrimos. Son traslados más largos, así que se coordinan por teléfono
            con hora y precio cerrados antes de que salga la unidad — nunca lo dejamos
            esperando sin un dato claro.
          </p>
        </Reveal>
      </div>
    </section>
  );
}

function ZoneChip({
  slug,
  name,
  accent = false,
}: {
  slug: string;
  name: string;
  accent?: boolean;
}) {
  return (
    <li>
      <Link
        href={`/${slug}`}
        className={`inline-flex items-center gap-2 border px-4 py-2.5 text-sm font-semibold transition-colors hover:border-flag-red-lit hover:bg-night-800 hover:text-chrome-50 ${
          accent
            ? 'border-chrome-300/25 bg-night-900 text-chrome-200'
            : 'border-chrome-300/15 bg-night-900/60 text-chrome-400'
        }`}
      >
        <MapPin className="size-3.5 text-flag-red-lit" />
        {name}
      </Link>
    </li>
  );
}
