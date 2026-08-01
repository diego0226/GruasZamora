/**
 * Catálogo de servicios. Cada entrada genera una página propia en
 * /servicios/[slug], una tarjeta en el home y una entrada en el sitemap.
 *
 * Son exactamente dos, confirmados con la empresa: plataforma y arrastre.
 * No agregue aquí servicios que no se presten (cambio de llanta, paso de
 * corriente, combustible): anunciarlos y no darlos genera reclamos y le cuesta
 * la reseña.
 *
 * ⚠️ Módulo de servidor. Los componentes de cliente importan de `lib/nav.ts`.
 */

import { SERVICE_LINKS, assertNavParity } from './nav';

export type IconKey = 'flatbed' | 'wrecker';

export type Service = {
  slug: string;
  /** Nombre corto para tarjetas y menús */
  name: string;
  /** H1 de la página de servicio */
  heading: string;
  metaTitle: string;
  metaDescription: string;
  icon: IconKey;
  /** Blurb de una línea para la tarjeta del home */
  summary: string;
  /** Párrafo de apertura de la página */
  intro: string;
  /** Especificaciones / diferenciadores */
  specs: string[];
  /** Situaciones concretas donde aplica este servicio */
  cases: { title: string; body: string }[];
  /**
   * Preguntas propias de este servicio.
   *
   * Existen para que las páginas de servicio dejen de repetir la FAQ general
   * del sitio. Las diez preguntas generales viven en el home y ahí se quedan;
   * aquí solo van preguntas cuya respuesta es específica de esta unidad. Ver
   * la nota de `lib/faq.ts`.
   */
  faqs: { question: string; answer: string }[];
  image: string;
  imageAlt: string;
};

export const SERVICES: Service[] = [
  {
    slug: 'grua-plataforma',
    name: 'Grúa de plataforma',
    heading: 'Grúa de plataforma en Costa Rica',
    metaTitle: 'Grúa de Plataforma en Costa Rica 24/7',
    metaDescription:
      'Grúa de plataforma en Grecia, Occidente y todo Costa Rica. Traslado sin desgaste para autos de lujo, eléctricos y sin llantas. 24/7. Llame al 8387-6352.',
    icon: 'flatbed',
    summary:
      'La cama se inclina, el vehículo sube completo y viaja con las cuatro llantas fuera del suelo. Cero kilometraje, cero desgaste.',
    intro:
      'La plataforma es el método más seguro que existe para mover un vehículo. Al cargarlo completo sobre la cama, ninguna llanta toca el asfalto durante el traslado: no suma kilómetros, no calienta la transmisión y no arriesga el parachoques ni los faldones bajos. Es la única opción correcta para autos de lujo, deportivos con poca altura libre, vehículos eléctricos e híbridos, y para cualquier carro que quedó sin llantas o sin frenos.',
    specs: [
      'Cama plana con sistema hidráulico de inclinación',
      'Sujeción de cuatro puntos con fajas y cadenas',
      'Cabrestante para subir vehículos que no ruedan',
      'Rampas para autos de baja altura libre',
      'Unidades aseguradas con pólizas del INS',
    ],
    cases: [
      {
        title: 'Autos de lujo y deportivos',
        body: 'Faldones bajos, llantas de perfil bajo y suspensiones deportivas exigen rampas y ángulos de carga suaves. La plataforma evita el raspón que un arrastre mal hecho deja garantizado.',
      },
      {
        title: 'Vehículos eléctricos e híbridos',
        body: 'Los fabricantes de eléctricos prohíben el arrastre con llantas en el suelo: el motor eléctrico genera corriente al girar y puede dañar el sistema. La plataforma es el método aprobado.',
      },
      {
        title: 'Colisiones y vehículos sin llantas',
        body: 'Cuando el carro no rueda —choque, llanta destruida, eje partido— el cabrestante lo sube completo a la cama sin arrastrarlo por el pavimento.',
      },
      {
        title: 'Traslados largos entre provincias',
        body: 'Para mover un vehículo de Grecia a Guanacaste o al Caribe, la plataforma no le suma kilometraje al odómetro ni desgaste al tren motriz.',
      },
    ],
    faqs: [
      {
        question: '¿Cuándo necesito plataforma y no arrastre?',
        answer:
          'Siempre que el vehículo no deba rodar durante el traslado. Es obligatorio en eléctricos e híbridos, y es lo correcto en autos de lujo, deportivos con poca altura libre, vehículos sin llantas o sin frenos, y en cualquier carro que salga de una colisión. También conviene en traslados largos entre provincias, porque no le suma kilómetros al odómetro. Si nos describe el vehículo y qué le pasó, le decimos por teléfono cuál de las dos unidades corresponde antes de despacharla.',
      },
      {
        question: '¿Pueden subir un vehículo que no arranca ni rueda?',
        answer:
          'Sí. La plataforma trae cabrestante justamente para eso: el cable lo sube completo a la cama sin arrastrarlo por el pavimento. Da igual si el motor está fundido, si tiene una llanta destruida, si quedó con el eje partido o si lleva años guardado en un garaje sin moverse.',
      },
      {
        question: '¿Un auto deportivo o muy bajo se raspa al subir?',
        answer:
          'No, porque la unidad trae rampas para altura libre reducida y la cama se inclina hidráulicamente para suavizar el ángulo de carga. Es exactamente el escenario donde un arrastre mal hecho deja el faldón o el parachoques raspado, y la razón por la que estos vehículos se cargan en plataforma y no de otra forma.',
      },
      {
        question: '¿Cómo se sujeta el vehículo durante el viaje?',
        answer:
          'Con sujeción de cuatro puntos, combinando fajas y cadenas. Las cuatro llantas viajan fuera del suelo, así que durante el traslado no se calienta la transmisión ni se desgasta el tren motriz. Las unidades están aseguradas con las pólizas del INS correspondientes al servicio.',
      },
    ],
    image: '/grua3.jpg',
    imageAlt:
      'Grúa de plataforma de Grúas Zamora Moya con la bandera de Estados Unidos pintada, trasladando un Porsche en Costa Rica',
  },
  {
    slug: 'grua-arrastre',
    name: 'Grúa de arrastre',
    heading: 'Grúa de arrastre y rescate vehicular',
    metaTitle: 'Grúa de Arrastre y Rescate Vehicular 24/7',
    metaDescription:
      'Grúa de arrastre con under-lift y cabrestante hidráulico para rescate en carretera, parqueos bajos y terreno difícil. Todo Costa Rica. Llame al 8387-6352.',
    icon: 'wrecker',
    summary:
      'Sistema under-lift americano y cabrestante hidráulico para sacar el vehículo de donde una plataforma no entra.',
    intro:
      'Hay lugares donde una plataforma sencillamente no maniobra: sótanos con techo bajo, calles angostas de cuadrante, cunetas profundas, lastre y barro. Para eso está la unidad de arrastre. El sistema under-lift levanta el vehículo por las llantas —nunca por el parachoques ni por el chasis— y el cabrestante hidráulico lo recupera desde donde haya quedado.',
    specs: [
      'Sistema under-lift: levanta por las llantas, sin tocar la carrocería',
      'Cabrestante hidráulico para recuperación fuera de la vía',
      'Maniobra en parqueos subterráneos y calles angostas',
      'Trabajo en lastre, barro y pendientes',
      'Unidades aseguradas con pólizas del INS',
    ],
    cases: [
      {
        title: 'Vehículo fuera de la carretera',
        body: 'Salidas de vía en la Interamericana, cunetas y taludes. El cabrestante lo devuelve al asfalto antes de trasladarlo.',
      },
      {
        title: 'Parqueos subterráneos y sótanos',
        body: 'Donde la altura libre no permite una plataforma, la unidad de arrastre entra, engancha y saca el vehículo.',
      },
      {
        title: 'Calles angostas de cuadrante',
        body: 'En los centros de Grecia, Sarchí o Naranjo, el radio de giro corto del arrastre resuelve lo que una cama plana no puede.',
      },
      {
        title: 'Caminos de lastre y barro',
        body: 'Fincas, cafetales y caminos vecinales de Occidente: tracción y cable para sacar el vehículo hasta terreno firme.',
      },
    ],
    faqs: [
      {
        question: '¿En qué casos entra el arrastre donde no entra una plataforma?',
        answer:
          'En sótanos y parqueos subterráneos con techo bajo, en las calles angostas de los cuadrantes —los centros de Grecia, Sarchí o Naranjo—, y en caminos de lastre y barro hacia fincas y cafetales. El radio de giro de la unidad de arrastre es aproximadamente la mitad que el de una cama plana, y esa diferencia es la que decide si el vehículo se puede sacar o no.',
      },
      {
        question: '¿El sistema under-lift daña la carrocería o el chasis?',
        answer:
          'No, porque no los toca. El under-lift levanta el vehículo tomándolo por las llantas, nunca por el parachoques ni por el chasis, que es justo el error que deja daños en un remolque improvisado con eslinga o gancho.',
      },
      {
        question: '¿Pueden sacar un vehículo que se salió de la carretera?',
        answer:
          'Sí, para eso está el cabrestante hidráulico. Salidas de vía en la Interamericana, cunetas, taludes y vehículos atascados en pendiente con barro: el cable lo recupera hasta terreno firme y ahí se decide si se traslada o si puede seguir por sus propios medios. Es el rescate más frecuente en la cuesta de Zarcero y en los accesos hacia Toro Amarillo.',
      },
      {
        question: '¿Sirve el arrastre para un vehículo eléctrico o híbrido?',
        answer:
          'No, y es importante: los fabricantes de eléctricos prohíben remolcarlos con las llantas motrices en el suelo, porque al girar el motor eléctrico genera corriente y puede dañar el sistema de tracción. Un eléctrico o un híbrido se mueve en plataforma, cargado completo. Si nos dice qué vehículo es, despachamos la unidad correcta a la primera.',
      },
    ],
    image: '/grua7.jpg',
    imageAlt:
      'Unidad de arrastre Super Duty de Grúas Zamora Moya con bandera de Estados Unidos remolcando una camioneta en Costa Rica',
  },
];

/* Revienta el build si alguien agrega un servicio y olvida `lib/nav.ts`. */
assertNavParity(SERVICES, SERVICE_LINKS, 'lib/services.ts');

export const SERVICE_SLUGS = SERVICES.map((s) => s.slug);

export function getService(slug: string): Service | undefined {
  return SERVICES.find((s) => s.slug === slug);
}
