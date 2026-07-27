/**
 * Catálogo de servicios. Cada entrada genera una página propia en
 * /servicios/[slug], una tarjeta en el home y una entrada en el sitemap.
 *
 * Son exactamente dos, confirmados con la empresa: plataforma y arrastre.
 * No agregue aquí servicios que no se presten (cambio de llanta, paso de
 * corriente, combustible): anunciarlos y no darlos genera reclamos y le cuesta
 * la reseña.
 */

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
    image: '/grua7.jpg',
    imageAlt:
      'Unidad de arrastre Super Duty de Grúas Zamora Moya con bandera de Estados Unidos remolcando una camioneta en Costa Rica',
  },
];

export const SERVICE_SLUGS = SERVICES.map((s) => s.slug);

export function getService(slug: string): Service | undefined {
  return SERVICES.find((s) => s.slug === slug);
}
