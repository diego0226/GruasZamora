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
import { faqSchema } from '@/lib/schema';

export const metadata: Metadata = {
  alternates: { canonical: '/' },
};

export default function HomePage() {
  return (
    <>
      <JsonLd data={faqSchema()} />

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
