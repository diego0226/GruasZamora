import { ShieldCheck, Receipt, Smartphone, Banknote, Landmark } from 'lucide-react';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Reveal } from '@/components/ui/Reveal';

const PILLARS = [
  {
    icon: ShieldCheck,
    title: 'Unidades aseguradas',
    body: 'Nuestras unidades cuentan con las pólizas del INS correspondientes al servicio. Su vehículo viaja respaldado desde que sube a la plataforma hasta que se entrega.',
  },
  {
    icon: Receipt,
    title: 'Factura electrónica',
    body: 'Emitimos factura electrónica autorizada por el Ministerio de Hacienda. Es lo que necesita si el servicio lo cubre una empresa, un taller, una agencia o una aseguradora.',
  },
];

const PAYMENTS = [
  { icon: Smartphone, label: 'SINPE Móvil' },
  { icon: Banknote, label: 'Efectivo' },
  { icon: Landmark, label: 'Transferencia' },
];

export function Trust() {
  return (
    <section className="tread-plate bg-night-900 py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-5 sm:px-6">
        <SectionHeading
          eyebrow="Respaldo"
          title={
            <>
              Formal en el papeleo, <span className="text-flag-red-lit">rápido en la calle</span>
            </>
          }
          lead="Un servicio de emergencia también tiene que ser un negocio serio cuando llega el momento de cobrar y de responder."
        />

        <div className="mt-14 grid gap-5 lg:grid-cols-3">
          {PILLARS.map(({ icon: Icon, title, body }, i) => (
            <Reveal key={title} delay={i * 100}>
              <article className="lift h-full border border-chrome-300/12 bg-night-800 p-7">
                <span className="mb-5 flex size-12 items-center justify-center rounded-sm bg-flag-red/15 text-flag-red-lit">
                  <Icon className="size-6" strokeWidth={1.7} />
                </span>
                <h3 className="text-xl text-chrome-50">{title}</h3>
                <p className="mt-3.5 leading-relaxed text-chrome-400">{body}</p>
              </article>
            </Reveal>
          ))}

          <Reveal delay={200}>
            <article className="h-full border border-chrome-300/12 bg-night-800 p-7">
              <h3 className="text-xl text-chrome-50">Formas de pago</h3>
              <p className="mt-3.5 leading-relaxed text-chrome-400">
                Se acomoda a como usted pueda, en el momento. Nadie anda con efectivo justo
                cuando se le vara el carro.
              </p>
              <ul className="mt-6 space-y-3">
                {PAYMENTS.map(({ icon: Icon, label }) => (
                  <li
                    key={label}
                    className="flex items-center gap-3 border-b border-chrome-300/10 pb-3 text-sm font-bold uppercase tracking-wide text-chrome-200 last:border-0 last:pb-0"
                  >
                    <Icon className="size-4 shrink-0 text-flag-red-lit" />
                    {label}
                  </li>
                ))}
              </ul>
            </article>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
