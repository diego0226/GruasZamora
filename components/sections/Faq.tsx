import { Plus } from 'lucide-react';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Reveal } from '@/components/ui/Reveal';
import { FAQS, type Faq as FaqItem } from '@/lib/faq';

/**
 * Acordeón con <details>/<summary> nativo: cero JavaScript, accesible por
 * teclado y con todo el texto presente en el HTML — que es justo lo que
 * necesita el crawler para poder citar la respuesta.
 */
export function Faq({
  items = FAQS,
  title,
}: {
  items?: FaqItem[];
  /** Las landings de zona lo sobrescriben para nombrar la zona en el H2. */
  title?: React.ReactNode;
}) {
  return (
    <section id="preguntas" className="scroll-mt-24 bg-night-950 py-20 lg:py-28">
      <div className="mx-auto max-w-4xl px-5 sm:px-6">
        <SectionHeading
          eyebrow="Preguntas frecuentes"
          title={
            title ?? (
              <>
                Lo que todo el mundo <span className="text-flag-red-lit">pregunta</span>
              </>
            )
          }
          lead="Respuestas directas, sin rodeos. Si su duda no está aquí, llame y se la contestamos por teléfono."
        />

        <div className="mt-12 divide-y divide-chrome-300/12 border-y border-chrome-300/12">
          {items.map((faq, i) => (
            <Reveal key={faq.question} delay={Math.min(i * 50, 250)}>
              <details className="group">
                <summary className="flex cursor-pointer list-none items-start justify-between gap-6 py-5 text-left transition-colors hover:text-flag-red-lit [&::-webkit-details-marker]:hidden">
                  <h3 className="font-body text-base font-bold normal-case tracking-normal text-chrome-100 transition-colors group-hover:text-flag-red-lit sm:text-lg">
                    {faq.question}
                  </h3>
                  <Plus
                    className="mt-0.5 size-5 shrink-0 text-flag-red-lit transition-transform duration-300 group-open:rotate-45"
                    aria-hidden="true"
                  />
                </summary>
                <p className="pb-6 pr-10 leading-relaxed text-chrome-400">{faq.answer}</p>
              </details>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
