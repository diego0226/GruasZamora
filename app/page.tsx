import type { Metadata } from 'next';

import { Hero } from '@/components/sections/Hero';
import { Services } from '@/components/sections/Services';
import { Coverage } from '@/components/sections/Coverage';
import { EmergencySteps } from '@/components/sections/EmergencySteps';
import { About } from '@/components/sections/About';
import { Fleet } from '@/components/sections/Fleet';
import { Trust } from '@/components/sections/Trust';
import { Faq } from '@/components/sections/Faq';
import { FinalCta } from '@/components/sections/FinalCta';
import { JsonLd } from '@/components/JsonLd';
import { faqSchema, webPageSchema } from '@/lib/schema';
import { CONTENT_UPDATED } from '@/lib/site';
import { FAQS } from '@/lib/faq';

export const metadata: Metadata = {
  alternates: { canonical: '/' },
};

export default function HomePage() {
  /* La portada es la casa canónica de las preguntas generales: es la única URL
     del sitio que emite FAQPage. Ver la nota de lib/faq.ts. */
  const faq = faqSchema(FAQS, '/');

  return (
    <>
      <JsonLd
        data={[
          webPageSchema({
            path: '/',
            name: 'Grúas Zamora Moya — Grúas 24/7 en Grecia y todo Costa Rica',
            description:
              'Grúas 24/7 en Grecia y todo Costa Rica. Plataforma, arrastre y rescate vehicular.',
            dateModified: CONTENT_UPDATED.home,
            primaryEntityId: faq['@id'],
          }),
          faq,
        ]}
      />

      <Hero />
      <Services />
      <Coverage />
      <EmergencySteps />
      <About />
      <Fleet />
      <Trust />
      <Faq />
      <FinalCta />
    </>
  );
}
