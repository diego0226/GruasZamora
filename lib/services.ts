/**
 * Catálogo de servicios. Cada entrada genera una página propia en
 * /servicios/[slug], una tarjeta en el home y una entrada en el sitemap.
 *
 * ── Dos clases de entrada, y por qué ────────────────────────────────────────
 *
 * `kind: 'unidad'` son las MÁQUINAS que existen: plataforma y arrastre. Son
 * exactamente dos, confirmadas con la empresa, y no se agregan más. Aquí no van
 * servicios que no se presten (cambio de llanta, paso de corriente,
 * combustible): anunciarlos y no darlos genera reclamos y le cuesta la reseña.
 *
 * `kind: 'caso'` son PROBLEMAS concretos que la gente busca por su nombre —
 * «grúa para carro eléctrico», «grúa para carro bloqueado»— y que este
 * equipo resuelve de una forma que la mayoría de la competencia no puede.
 * No son unidades nuevas: son la misma flotilla explicada desde el problema
 * en vez de desde la máquina.
 *
 * Existen como página propia por una razón medible: quien escribe «grúa para
 * carro eléctrico» no está buscando una cama plana, está buscando que alguien
 * le confirme que no le van a quemar el inversor. Esa respuesta no cabe como
 * párrafo dentro de la página de plataforma sin competirle a la propia página
 * de plataforma por su consulta principal. Por eso la mención de eléctricos se
 * DEGRADÓ en `grua-plataforma` (salió de su metaDescription) y vive completa
 * aquí: una consulta, una URL.
 *
 * El home y el índice de servicios los pintan por separado —las unidades
 * primero, los casos después— para no romper la pregunta que esas páginas
 * existen para responder: «¿cuál de las dos me mandan?».
 *
 * ⚠️ Módulo de servidor. Los componentes de cliente importan de `lib/nav.ts`.
 */

import { SERVICE_LINKS, assertNavParity } from './nav';

export type IconKey = 'flatbed' | 'wrecker' | 'ev' | 'locked';

export type Service = {
  slug: string;
  /**
   * `unidad` = una máquina de la flotilla. `caso` = un problema con página
   * propia. Ver la nota de arriba.
   */
  kind: 'unidad' | 'caso';
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
  /**
   * Otras formas en que la gente nombra este servicio. Solo alimentan el
   * `alternateName` del JSON-LD — no se pintan en ninguna parte.
   *
   * No es relleno de palabras clave: sirve para lo mismo que
   * `SITE.alternateNames`, decirle a un buscador que la entidad de esta URL y
   * la consulta que el usuario escribió son la misma cosa. Un eléctrico varado
   * se busca de seis maneras distintas y ninguna coincide con el `name`.
   */
  alternateNames?: string[];
};

export const SERVICES: Service[] = [
  {
    slug: 'grua-plataforma',
    kind: 'unidad',
    name: 'Grúa de plataforma',
    heading: 'Grúa de plataforma en Costa Rica',
    metaTitle: 'Grúa de Plataforma en Costa Rica 24/7',
    /* Sin «eléctricos» a propósito: esa consulta la trabaja
       /servicios/grua-carro-electrico. Dos páginas del mismo sitio con la
       misma palabra clave en la descripción compiten entre ellas. */
    metaDescription:
      'Grúa de plataforma en Grecia, Occidente y todo Costa Rica. Traslado sin desgaste para autos de lujo, deportivos bajos y sin llantas. Llame al 8387-6352.',
    icon: 'flatbed',
    summary:
      'La cama se inclina, el vehículo sube completo y viaja con las cuatro llantas fuera del suelo. Cero kilometraje, cero desgaste.',
    intro:
      'La plataforma es el método más seguro que existe para mover un vehículo. Al cargarlo completo sobre la cama, ninguna llanta toca el asfalto durante el traslado: no suma kilómetros, no calienta la transmisión y no arriesga el parachoques ni los faldones bajos. Es la primera opción para autos de lujo, deportivos con poca altura libre, vehículos eléctricos e híbridos, y para cualquier carro que quedó sin llantas o sin frenos.',
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
        body: 'Un eléctrico no puede rodar remolcado con las llantas motrices en el suelo, y la plataforma lo carga completo. Es la primera opción; cuando el vehículo está donde una cama plana no entra, la alternativa son los speed dollies de la unidad de arrastre.',
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
          'Siempre que el vehículo no deba rodar durante el traslado. Es lo correcto en autos de lujo, deportivos con poca altura libre, vehículos sin llantas o sin frenos, y en cualquier carro que salga de una colisión. También conviene en traslados largos entre provincias, porque no le suma kilómetros al odómetro. En eléctricos e híbridos la plataforma es la primera opción, aunque no la única: la unidad de arrastre con speed dollies también los mueve sin que ninguna llanta gire. Si nos describe el vehículo y qué le pasó, le decimos por teléfono cuál de las dos unidades corresponde antes de despacharla.',
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
    kind: 'unidad',
    name: 'Grúa de arrastre',
    heading: 'Grúa de arrastre y rescate vehicular',
    metaTitle: 'Grúa de Arrastre con Speed Dolly 24/7',
    metaDescription:
      'Grúa de arrastre con under-lift, cabrestante hidráulico y speed dollies para rescate en carretera, sótanos y terreno difícil. Llame al 8387-6352.',
    icon: 'wrecker',
    summary:
      'Sistema under-lift, cabrestante hidráulico y speed dollies para sacar el vehículo de donde una plataforma no entra.',
    intro:
      'Hay lugares donde una plataforma sencillamente no maniobra: sótanos con techo bajo, calles angostas de cuadrante, cunetas profundas, lastre y barro. Para eso está la unidad de arrastre. El sistema under-lift levanta el vehículo por las llantas —nunca por el parachoques ni por el chasis— y el cabrestante hidráulico lo recupera desde donde haya quedado. Además carga speed dollies: dos plataformas rodantes que se meten bajo las llantas que quedarían en el suelo, de modo que el vehículo viaja con las cuatro ruedas sin girar. Es equipo poco común —en Costa Rica se cuentan con los dedos de una mano las unidades que lo llevan— y es lo que permite mover en arrastre un eléctrico o un carro con las llantas trabadas.',
    specs: [
      'Sistema under-lift: levanta por las llantas, sin tocar la carrocería',
      'Speed dollies: el otro eje también viaja sin girar',
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
      {
        title: 'Llantas que no giran',
        body: 'Caja trabada en Park, freno de mano pegado, mordazas agarrotadas o una rueda torcida de un golpe. Los speed dollies van bajo esas llantas y el carro viaja sin que ninguna dé una vuelta.',
      },
      {
        title: 'Eléctricos donde no entra una plataforma',
        body: 'Un eléctrico en el sótano de un condominio es el caso típico: la cama plana no baja y remolcarlo a ras de suelo le puede costar el sistema de tracción. Con dollies el arrastre lo saca sin que las ruedas motrices giren.',
      },
    ],
    faqs: [
      {
        question: '¿Qué es un speed dolly y por qué importa?',
        answer:
          'Son dos plataformas de acero con rodines que se meten bajo las llantas que quedarían tocando el asfalto. El under-lift levanta un eje y los dollies se encargan del otro: el resultado es que las cuatro ruedas del vehículo viajan sin dar una sola vuelta, igual que en una plataforma, pero con una unidad que sí entra en un sótano o en una calle de cuadrante. Importa porque es lo que hace posible remolcar un eléctrico, un carro con la caja trabada o uno con las mordazas pegadas sin dañarlo. Es equipo poco común en el país: la mayoría de las grúas de arrastre no lo carga.',
      },
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
          'Con speed dollies, sí. Sin ellos, no. La regla que ponen los fabricantes es que las llantas motrices no giren durante el remolque, porque al girar el motor eléctrico genera corriente y puede dañar el sistema de tracción; los dollies cumplen esa regla poniendo ese eje sobre rodines en vez de sobre el asfalto. Nuestra primera opción para un eléctrico sigue siendo la plataforma, porque es más simple; el arrastre con dollies es lo que resuelve cuando el carro está donde una cama plana no llega. Si nos dice qué vehículo es y dónde quedó, sale la unidad correcta a la primera.',
      },
    ],
    image: '/grua7.jpg',
    imageAlt:
      'Unidad de arrastre Super Duty de Grúas Zamora Moya remolcando una camioneta con speed dollies bajo las llantas traseras, en Costa Rica',
    alternateNames: [
      'Grúa de arrastre con speed dolly',
      'Grúa con under-lift',
      'Rescate vehicular con cabrestante',
    ],
  },
  {
    slug: 'grua-carro-electrico',
    kind: 'caso',
    name: 'Grúa para carro eléctrico',
    heading: 'Grúa para carro eléctrico e híbrido',
    metaTitle: 'Grúa para Carro Eléctrico 24/7 en Costa Rica',
    metaDescription:
      'Grúa para carro eléctrico e híbrido en todo Costa Rica. Plataforma o speed dollies: ninguna llanta gira, cero riesgo para el motor. Llame al 8387-6352.',
    icon: 'ev',
    summary:
      'Un eléctrico no se remolca con las llantas motrices girando. Lo movemos en plataforma o con speed dollies, con las cuatro ruedas fuera del suelo.',
    intro:
      'Costa Rica tiene una de las flotas eléctricas más grandes de la región y muy pocas grúas equipadas para moverla bien. El problema es concreto y no es opinable: en un eléctrico las ruedas motrices van conectadas al motor de tracción por una reducción fija, sin un neutro que las desacople de verdad. Si el carro rueda remolcado, el motor gira con él y se comporta como un generador: manda corriente a un sistema que está apagado. De ahí salen inversores quemados y averías que ninguna garantía cubre, y por eso los manuales de un BYD, un Tesla, un Ioniq o un Leaf dicen todos lo mismo —nunca remolcar con las llantas en el suelo—. Lo mismo aplica al eje motriz de un híbrido. Nosotros lo resolvemos de dos maneras y las dos dejan las cuatro llantas sin girar: la plataforma, que lo carga completo, y la unidad de arrastre con speed dollies, que levanta un eje con el under-lift y pone el otro sobre plataformas rodantes. La segunda es la que salva el día cuando el carro está en un sótano, en una calle angosta o en un parqueo donde una cama plana no entra.',
    specs: [
      'Plataforma con cabrestante para cargarlo completo',
      'Speed dollies para que ninguna rueda motriz gire',
      'Sujeción por llanta, sin fajas cruzadas sobre los bajos',
      'Sin manipular el cableado naranja de alta tensión',
      'Traslado a agencia, taller autorizado o punto de carga',
      'Unidades aseguradas con pólizas del INS',
    ],
    cases: [
      {
        title: 'Se quedó sin carga en carretera',
        body: 'Es la llamada más común con eléctricos y no tiene misterio: el carro está perfecto, solo no camina. Se carga y se lleva al punto de carga o a donde usted diga. Lo que no se puede es empujarlo ni jalarlo unos metros «para sacarlo del carril» — esos metros son los que hacen el daño.',
      },
      {
        title: 'Está en un sótano donde no entra la plataforma',
        body: 'Condominios, torres de oficinas y parqueos de centro comercial con altura libre baja. La cama plana no baja la rampa y el eléctrico no puede salir rodando enganchado. Aquí es donde los speed dollies dejan de ser un lujo y pasan a ser la única forma correcta de sacarlo.',
      },
      {
        title: 'Después de una colisión',
        body: 'Un eléctrico chocado se trata distinto: no se toca el cableado naranja, no se abre el paquete de baterías y el vehículo se estaciona lejos de estructuras y de otros carros durante los días siguientes, porque una batería golpeada puede recalentar horas o días después. Se carga completo y se entrega donde la aseguradora o la agencia indiquen.',
      },
      {
        title: 'Híbridos y enchufables',
        body: 'Un híbrido tiene el mismo problema en su eje motriz aunque traiga motor de gasolina. La regla práctica es la misma: ese eje no gira durante el traslado. Díganos marca y modelo en la llamada y sale la unidad que corresponde.',
      },
    ],
    faqs: [
      {
        question: '¿Se puede remolcar un carro eléctrico con las llantas en el suelo?',
        answer:
          'No. Es la única regla realmente innegociable de este servicio. En un eléctrico las ruedas motrices están acopladas al motor de tracción sin un neutro que las libere, así que rodar remolcado hace que el motor gire y genere corriente hacia un sistema apagado. El resultado puede ser desde un código de avería hasta un inversor o un motor dañado, y es un daño que las garantías excluyen expresamente porque es un error de manejo, no una falla de fábrica. Ni siquiera «unos metros para sacarlo del carril»: el traslado empieza y termina con las cuatro llantas fuera del suelo.',
      },
      {
        question: '¿Entonces solo sirve la plataforma?',
        answer:
          'No, hay dos métodos válidos y los dos cumplen la misma condición. El primero es la plataforma: el carro sube completo a la cama y viaja cargado. El segundo es la unidad de arrastre con speed dollies, que levanta un eje con el under-lift y pone el otro sobre dos plataformas rodantes, de modo que ninguna rueda gira aunque el vehículo vaya remolcado. Nuestra primera opción es la plataforma porque es más simple; los dollies son los que resuelven cuando el carro está donde una cama plana no entra. Es equipo poco común en el país, y es la razón por la que podemos decirle que sí a un eléctrico en un sótano.',
      },
      {
        question: '¿Qué hago si mi eléctrico se quedó sin carga en la carretera?',
        answer:
          'Oríllese mientras todavía tenga potencia —un eléctrico avisa con bastante anticipación, y es mucho más fácil moverlo antes de que se detenga solo que después—, encienda las luces de emergencia y coloque los triángulos. Después llame y díganos marca, modelo y dónde está. No lo empuje ni deje que nadie lo jale con una eslinga o una faja: ese es el momento en que se hace el daño caro. Nosotros llegamos, lo cargamos y lo dejamos en el punto de carga, en la agencia o donde usted indique.',
      },
      {
        question: '¿Es riesgoso mover un eléctrico después de un choque?',
        answer:
          'Se maneja con precauciones concretas, no con miedo. No se toca el cableado de alta tensión —el naranja—, no se abre ni se punza el paquete de baterías, y el vehículo se deja estacionado a distancia de estructuras y de otros vehículos, porque una batería golpeada puede recalentar horas o incluso días después del golpe. Si ve humo, olor dulzón o escucha chasquidos, aléjese y llame al 9-1-1 antes que a nosotros. Para el traslado, se carga completo en plataforma y se entrega donde la aseguradora o la agencia lo pidan.',
      },
      {
        question: '¿Un eléctrico pesa demasiado para la grúa?',
        answer:
          'Un eléctrico pesa entre 300 y 600 kilos más que su equivalente de gasolina, casi todo por el paquete de baterías, y eso sí cambia cómo se sujeta y cómo se distribuye la carga — pero está muy dentro de la capacidad de nuestras unidades. Lo que sí conviene decirnos en la llamada es el modelo: no es lo mismo un carro urbano compacto que una camioneta eléctrica grande, y saberlo de antemano evita el viaje en vano.',
      },
    ],
    image: '/grua7.jpg',
    imageAlt:
      'Speed dollies bajo las llantas traseras de un vehículo remolcado por Grúas Zamora Moya, el método que permite mover un carro eléctrico sin que las ruedas giren',
    alternateNames: [
      'Grúa para vehículo eléctrico',
      'Grúa para carro híbrido',
      'Remolque de vehículos eléctricos en Costa Rica',
      'Traslado de carro eléctrico varado',
    ],
  },
  {
    slug: 'grua-carro-bloqueado',
    kind: 'caso',
    name: 'Grúa para carro bloqueado',
    heading: 'Grúa para carro bloqueado o trabado',
    metaTitle: 'Grúa para Carro Bloqueado o Trabado 24/7',
    metaDescription:
      'Grúa para carro bloqueado: llantas trabadas, caja en Park, freno de mano pegado o sin llave. Speed dollies en todo Costa Rica. Llame al 8387-6352.',
    icon: 'locked',
    summary:
      'Si las llantas no giran —caja en Park, freno pegado, sin llave— los speed dollies lo mueven igual, sin arrastrarlo por el pavimento.',
    intro:
      '«Bloqueado» casi siempre quiere decir lo mismo: el carro está entero pero las llantas no giran. Puede ser la caja trabada en Park porque se murió la batería y el selector electrónico no responde, el freno de mano electrónico que no suelta, el bloqueo de la columna de dirección sin la llave, unas mordazas agarrotadas después de meses parqueado, o una rueda que quedó torcida de un golpe. En todos esos casos el error clásico es jalarlo con una eslinga: se plancha la llanta contra el asfalto, se raya el aro y a veces se lleva por delante media suspensión. La solución de verdad son los speed dollies. Son dos plataformas rodantes que se meten bajo las llantas que quedarían en el suelo: el under-lift levanta un eje y los dollies se encargan del otro, así que el vehículo viaja sin que ninguna de sus cuatro ruedas dé una vuelta. No hace falta que la caja ponga en neutro, ni que el freno suelte, ni que la llave aparezca.',
    specs: [
      'Speed dollies para el eje que no puede girar',
      'Under-lift que levanta por las llantas, sin tocar la carrocería',
      'Cabrestante hidráulico para el que ni siquiera se puede empujar',
      'Maniobra en sótanos, calles angostas y parqueos de techo bajo',
      'Plataforma como alternativa cuando el sitio lo permite',
      'Unidades aseguradas con pólizas del INS',
    ],
    cases: [
      {
        title: 'Caja trabada en Park',
        body: 'Con la batería muerta, un selector electrónico no pasa a neutro y no hay forma de que las ruedas motrices giren. Es el caso más común en carros modernos y el que más veces resuelven los dollies: no se necesita neutro si ninguna llanta va a rodar.',
      },
      {
        title: 'Freno de mano electrónico pegado',
        body: 'El freno de estacionamiento eléctrico se libera con corriente, así que sin batería queda aplicado. Forzarlo arrastrando el carro raspa las llantas y castiga las mordazas. Con dollies bajo ese eje, el freno puede quedarse aplicado sin que importe.',
      },
      {
        title: 'Sin llave o con el volante bloqueado',
        body: 'Llave perdida, llave partida, mando sin batería o columna de dirección bloqueada: el carro no se puede encender, ni desbloquear el volante, ni poner en neutro. Se levanta y se traslada igual, hasta el taller o el cerrajero.',
      },
      {
        title: 'Mordazas pegadas o rueda trabada de un golpe',
        body: 'Un vehículo que lleva meses parqueado suele tener las pastillas pegadas al disco por óxido, y uno que salió de un choque puede traer una rueda torcida contra el guardabarros. Ninguna de las dos gira, y ninguna de las dos necesita girar para salir de ahí.',
      },
    ],
    faqs: [
      {
        question: '¿Pueden mover un carro que no pone en neutro?',
        answer:
          'Sí, y es exactamente para lo que existen los speed dollies. La pregunta de fondo es otra: si las llantas no giran, ¿cómo viaja el carro? La respuesta es que no giran en ningún momento. El under-lift levanta un eje del suelo y los dollies —dos plataformas de acero con rodines— van bajo las llantas del otro eje. El vehículo se mueve porque los rodines ruedan, no porque sus ruedas rueden. Da igual que la caja esté trabada en Park, que la batería esté muerta o que el selector no responda.',
      },
      {
        question: '¿Y si el freno de mano no suelta o no tengo la llave?',
        answer:
          'El mismo procedimiento resuelve los dos casos. Un freno de estacionamiento electrónico necesita corriente para liberarse, así que sin batería se queda aplicado; y sin llave no hay forma de desbloquear la columna de dirección ni de sacar la caja de Park. Con dollies eso deja de ser un problema, porque el carro no depende de que sus ruedas giren para moverse. Lo que sí le pedimos es que nos lo diga en la llamada: es el dato que decide si sale la unidad de arrastre con dollies o la plataforma.',
      },
      {
        question: '¿Se daña el carro si lo mueven con las llantas trabadas?',
        answer:
          'Hecho bien, no se daña nada: ninguna llanta roza el asfalto, el under-lift toma el vehículo por las ruedas y no por la carrocería, y nada queda apoyado sobre el chasis. Lo que sí daña es lo otro —jalarlo con una eslinga o una faja con las llantas trabadas—, y el destrozo es predecible: la banda de rodamiento se plancha contra el pavimento en cuestión de metros, el aro se raya y, si el freno estaba aplicado, se castigan pastillas y mordazas. Si alguien le ofrece «llevárselo así nomás», ese es el momento de decir que no.',
      },
      {
        question: '¿Sirve si el carro lleva años parqueado sin moverse?',
        answer:
          'Sí, es un servicio que hacemos seguido: carros que quedaron guardados en un garaje o en una finca, con las pastillas pegadas al disco por óxido, llantas desinfladas o cuarteadas y batería muerta hace tiempo. Nada de eso hace falta arreglarlo antes. Se levanta, se ponen los dollies o se sube completo a la plataforma con el cabrestante, y se entrega en el taller. Avísenos si además está en un espacio cerrado o con otros vehículos alrededor, para llevar la unidad que maniobre ahí.',
      },
      {
        question: '¿Y si lo que tengo es otro carro bloqueándome la salida?',
        answer:
          'Ese es el otro sentido de «bloqueado» y también lo atendemos, pero con una condición que conviene decir de frente: solo se remueve un vehículo cuando quien lo solicita tiene autoridad para hacerlo. En una propiedad privada eso significa el dueño del inmueble o la administración del condominio, y el traslado se documenta con fotografías antes de mover nada. Si el vehículo está en vía pública, la remoción la ordena la policía de tránsito, no el vecino afectado: en ese caso lo correcto es reportarlo primero al 9-1-1 y nosotros trabajamos con lo que ellos indiquen. Llamar y explicarnos la situación no cuesta nada, y le decimos en un minuto si el caso procede.',
      },
    ],
    image: '/grua7.jpg',
    imageAlt:
      'Vehículo con las llantas traseras sobre speed dollies remolcado por la unidad de arrastre de Grúas Zamora Moya en Costa Rica',
    alternateNames: [
      'Grúa para carro con llantas trabadas',
      'Grúa para carro que no pone en neutro',
      'Grúa para carro sin llave',
      'Remolque de vehículo inmovilizado',
    ],
  },
];

/* Revienta el build si alguien agrega un servicio y olvida `lib/nav.ts`. */
assertNavParity(SERVICES, SERVICE_LINKS, 'lib/services.ts');

export const SERVICE_SLUGS = SERVICES.map((s) => s.slug);

/** Las máquinas de la flotilla. Son las que compara el índice de servicios. */
export const UNIT_SERVICES = SERVICES.filter((s) => s.kind === 'unidad');

/** Los problemas con página propia. Ver la nota de la cabecera. */
export const CASE_SERVICES = SERVICES.filter((s) => s.kind === 'caso');

export function getService(slug: string): Service | undefined {
  return SERVICES.find((s) => s.slug === slug);
}
