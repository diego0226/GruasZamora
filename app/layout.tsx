import type { Metadata, Viewport } from 'next';
import { Anton, Barlow } from 'next/font/google';
import './globals.css';

import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { FloatingContact } from '@/components/layout/FloatingContact';
import { JsonLd } from '@/components/JsonLd';
import { Analytics } from '@/components/Analytics';
import { SITE, TARGET_KEYWORDS, OG_IMAGE } from '@/lib/site';
import { localBusinessSchema, websiteSchema } from '@/lib/schema';

/* Tipografía de rotulación: condensada y pesada, como las letras pintadas
   en las unidades. Se autohospedan — cero peticiones a Google en runtime. */
const anton = Anton({
  subsets: ['latin'],
  weight: '400',
  variable: '--font-anton',
  display: 'swap',
});

const barlow = Barlow({
  subsets: ['latin'],
  // Solo los pesos que el sitio usa de verdad. El 500 no aparecía en ninguna
  // clase y aun así se descargaba: cada peso es un archivo más que bajar en
  // datos móviles.
  weight: ['400', '600', '700', '800'],
  variable: '--font-barlow',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    // Google corta el título alrededor de los 60 caracteres. El sufijo de
    // marca lo pone la plantilla, así que los títulos de cada página NO deben
    // repetirlo — se duplicaría y se perdería la palabra clave en el corte.
    //
    // La portada abre con el nombre completo a propósito. Es la única página
    // que compite por la búsqueda de marca "Grúas Zamora", y esa búsqueda la
    // pelean varios homónimos; el nombre en la primera posición del título es
    // la señal más directa de que este es el resultado que se busca. "Grúas"
    // sigue siendo la primera palabra, así que la consulta genérica no pierde.
    default: 'Grúas Zamora Moya | Grúas 24/7 en Grecia y todo Costa Rica',
    template: '%s | Grúas Zamora',
  },
  /* Google recorta el fragmento alrededor de los 160 caracteres. El teléfono va
     al final, así que pasarse de largo no solo corta la frase: corta justo el
     dato por el que existe el sitio. Todas las descripciones se mantienen por
     debajo de 155.

     Empieza con el nombre porque Google resalta en negrita las palabras de la
     búsqueda dentro del fragmento: quien busque la marca la ve destacada en la
     primera línea. */
  description:
    'Grúas Zamora Moya: grúas 24/7 en Grecia y todo Costa Rica. Plataforma, arrastre y rescate vehicular. Más de 30 años de experiencia. Llame al 8387-6352.',
  keywords: [...TARGET_KEYWORDS],
  applicationName: SITE.name,
  authors: [{ name: SITE.name }],
  creator: SITE.name,
  publisher: SITE.name,
  category: 'Servicios automotrices',
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: 'es_CR',
    siteName: SITE.name,
    url: SITE.url,
    title: 'Grúas Zamora Moya — Grúas 24/7 en Grecia y todo Costa Rica',
    description:
      'Grúa de plataforma y de arrastre las 24 horas. Empresa de Grecia, servicio en todo Costa Rica. Llame al 8387-6352.',
    images: [OG_IMAGE],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Grúas Zamora Moya — Grúas 24/7 en Grecia y todo Costa Rica',
    description:
      'Grúa de plataforma y de arrastre las 24 horas en todo Costa Rica. Llame al 8387-6352.',
    images: ['/og.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  /* Verificación de propiedad ante los buscadores. Cada una se emite solo si
     su variable existe: una etiqueta de verificación con un valor inventado no
     verifica nada y ensucia el <head>.

     Google  → Search Console, propiedad de prefijo de URL
     Bing    → Bing Webmaster Tools, que es además el índice detrás de Copilot
               y de DuckDuckGo */
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_VERIFICATION || undefined,
    other: process.env.NEXT_PUBLIC_BING_VERIFICATION
      ? { 'msvalidate.01': process.env.NEXT_PUBLIC_BING_VERIFICATION }
      : undefined,
  },
};

export const viewport: Viewport = {
  themeColor: '#08111d',
  colorScheme: 'dark',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    // suppressHydrationWarning: el script de abajo agrega la clase `js` al
    // <html> antes de que React hidrate, así que el atributo class del cliente
    // nunca va a coincidir con el del servidor. Solo silencia este elemento
    // —un nivel, sin tocar los hijos—, que es justo para lo que existe.
    <html
      lang="es-CR"
      className={`${anton.variable} ${barlow.variable}`}
      suppressHydrationWarning
    >
      <head>
        {/* El schema del negocio va una sola vez, en la raíz: el resto de
            páginas lo referencian por @id desde lib/schema.ts */}
        <JsonLd data={[localBusinessSchema(), websiteSchema()]} />

        {/* Activa las animaciones de entrada SOLO si el JavaScript corre.
            Sin esta clase, `.js .reveal` nunca aplica y todo el contenido se
            ve de una vez. Va en línea y sin defer para que la clase exista
            antes del primer pintado y no haya parpadeo. Es lo que evita que
            un fallo de JS deje media página invisible — inaceptable en un
            sitio al que la gente entra varada en la carretera. */}
        <script
          dangerouslySetInnerHTML={{
            __html: `document.documentElement.classList.add('js')`,
          }}
        />
      </head>
      <body className="antialiased">
        <a
          href="#contenido"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-sm focus:bg-flag-red focus:px-4 focus:py-2 focus:font-bold focus:text-white"
        >
          Saltar al contenido
        </a>

        <Header />
        <main id="contenido">{children}</main>
        <Footer />
        <FloatingContact />
        <Analytics />
      </body>
    </html>
  );
}
