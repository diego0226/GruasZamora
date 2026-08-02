/**
 * Preguntas frecuentes. Alimentan la sección visible del sitio y el schema
 * FAQPage.
 *
 * Regla de oro: responder de verdad. Una respuesta evasiva no se posiciona
 * y tampoco convence a quien está varado en la carretera.
 *
 * ── Dónde vive cada bloque, y por qué ───────────────────────────────────────
 *
 * `FAQS` son las preguntas GENERALES del negocio y su única casa es la
 * portada. No se repiten en ninguna otra URL.
 *
 * El motivo es medible. Antes este bloque —638 palabras— se pintaba entero en
 * las 18 páginas del sitio: home, índice de servicios, las dos páginas de
 * servicio y las catorce landings de zona. Son 10.846 palabras duplicadas, y
 * el efecto sobre las páginas que tienen que competir por «grúas Grecia» o
 * «grúas Naranjo» era el siguiente, contado sobre el HTML compilado:
 *
 *   · dos landings de zona cualesquiera compartían entre el 69 % y el 74 %
 *     de sus secuencias de ocho palabras;
 *   · la landing de Poás resultaba única solo en un 26,7 %;
 *   · las dos páginas de servicio compartían el 79 %.
 *
 * Google no necesita decidir que eso es spam para que haga daño: basta con
 * que, al comparar catorce páginas casi iguales, elija una y trate al resto
 * como variantes. Y a un modelo de IA, catorce copias del mismo párrafo no le
 * dan catorce fuentes: le dan una, repetida.
 *
 * Por eso cada tipo de página lleva ahora solo preguntas cuya respuesta
 * cambia de verdad según dónde esté:
 *
 *   · portada             → `FAQS` (las diez generales) + su FAQPage
 *   · landing de zona     → `zoneFaqs(zone)`, armadas con datos de esa zona
 *   · página de servicio  → `service.faqs`, en lib/services.ts
 *   · índice de servicios → ninguna; enlaza a la portada
 *
 * Quien quiera las preguntas generales llega por un enlace a la portada, que
 * es donde tienen su respuesta canónica.
 */

import type { Zone } from './zones';

export type Faq = { question: string; answer: string };

/** Ancla de la sección de preguntas en la portada, para enlazar desde el resto. */
export const FAQ_CANONICAL_PATH = '/#preguntas';

export const FAQS: Faq[] = [
  {
    question: '¿Cuánto cuesta un servicio de grúa en Costa Rica?',
    answer:
      'El precio depende de tres cosas: la distancia entre nuestra base y su ubicación, el tipo de unidad que requiere el vehículo (plataforma o arrastre) y la dificultad del rescate. No manejamos una tarifa única porque no es honesto: no cuesta lo mismo un traslado dentro de Grecia que sacar un vehículo de una cuneta en la cuesta de Zarcero a medianoche. Cuando llame le damos el monto exacto antes de despachar la unidad, sin sorpresas al llegar.',
  },
  {
    question: '¿Atienden de noche, fines de semana y feriados?',
    answer:
      'Sí. El servicio es 24 horas, los 7 días de la semana, los 365 días del año, incluidos feriados y Semana Santa. Las emergencias en carretera no respetan horario de oficina y nosotros tampoco.',
  },
  {
    question: '¿Cuánto tardan en llegar?',
    answer:
      'Dentro de Grecia y los cantones vecinos de Occidente normalmente son minutos, porque la base está en Grecia y no tenemos que cruzar el área metropolitana. Para el resto del país el tiempo depende de la distancia real de manejo. En la misma llamada le damos un estimado franco: preferimos decirle "una hora y media" y cumplir, que prometerle veinte minutos y dejarlo esperando.',
  },
  {
    question: '¿Qué diferencia hay entre una grúa de plataforma y una de arrastre?',
    answer:
      'La plataforma carga el vehículo completo sobre una cama plana: ninguna llanta toca el suelo, no suma kilometraje y no hay desgaste. Es la opción correcta para autos de lujo, deportivos bajos, eléctricos, híbridos y vehículos sin llantas o sin frenos. La de arrastre levanta el vehículo por las llantas con un sistema under-lift y lo remolca; sirve donde una plataforma no maniobra —sótanos, calles angostas, cunetas— y trae cabrestante para recuperar vehículos fuera de la vía. Nuestra unidad de arrastre además carga speed dollies, dos plataformas rodantes que van bajo las llantas que quedarían en el suelo: con ellas el vehículo viaja sin que ninguna rueda gire, que es lo que permite mover un eléctrico o un carro con las llantas trabadas sin una cama plana. Tenemos las dos unidades y le decimos cuál necesita según lo que nos describa.',
  },
  {
    question: '¿Qué debo hacer mientras espero la grúa?',
    answer:
      'Encienda las luces de emergencia y, si puede hacerlo con seguridad, mueva el vehículo al hombro de la carretera. Coloque los triángulos de seguridad a buena distancia. Salga del vehículo por el lado contrario al tránsito y espere detrás de la barrera de contención o lo más lejos posible de la calzada, nunca dentro del carro ni parado frente a él. Si es de noche, use algo reflectivo o la linterna del celular. Y guarde nuestro número por si necesita actualizarnos la ubicación.',
  },
  {
    question: '¿Pueden trasladar vehículos eléctricos e híbridos?',
    answer:
      'Sí, y con las dos unidades. La regla que ponen los fabricantes es una sola: las llantas motrices no pueden girar durante el remolque, porque al girar el motor eléctrico genera corriente y puede dañar el sistema de tracción. Se cumple de dos formas. La primera es la plataforma, que lo carga completo sobre la cama. La segunda son los speed dollies de nuestra unidad de arrastre: dos plataformas rodantes que van bajo las llantas que quedarían en el suelo, de modo que ninguna rueda da una vuelta. Esa segunda opción es la que resuelve cuando el carro está en un sótano o en una calle donde una cama plana no entra, y es equipo que muy pocas grúas del país llevan.',
  },
  {
    question: '¿Trasladan vehículos que no arrancan o que están sin llantas?',
    answer:
      'Sí. Para eso está el cabrestante: si el vehículo no rueda —motor fundido, llanta destruida, choque, años guardado en un garaje— lo subimos completo a la plataforma con el cable, sin arrastrarlo por el pavimento.',
  },
  {
    question: '¿Cubren todo Costa Rica o solo Occidente?',
    answer:
      'Todo el país, las siete provincias, sin excepción. La empresa es de Grecia, Alajuela, y eso nos hace la opción más rápida para Occidente —Naranjo, Sarchí, Palmares, San Ramón, Atenas, Poás, Zarcero y Alajuela centro—, pero atendemos San José, Heredia, Cartago, Guanacaste, Puntarenas y Limón con la misma disponibilidad de 24 horas. Que seamos una empresa de Occidente no limita hasta dónde llegamos: solo cambia cuánto tardamos, y eso se lo decimos claro en la llamada.',
  },
  {
    question: '¿Qué formas de pago aceptan? ¿Dan factura?',
    answer:
      'Aceptamos SINPE Móvil, efectivo y transferencia bancaria. Emitimos factura electrónica autorizada por el Ministerio de Hacienda, que es lo que necesita si el servicio lo paga una empresa, un taller, una agencia o una aseguradora.',
  },
  {
    question: '¿Las unidades están aseguradas?',
    answer:
      'Sí. Nuestras unidades cuentan con las pólizas del INS correspondientes al servicio. Su vehículo viaja respaldado durante todo el traslado.',
  },
];

/* ────────────────────── Preguntas propias de cada zona ────────────────────── */

/**
 * Genera las preguntas específicas de una zona a partir de sus datos reales.
 *
 * Las respuestas se arman con lo que ya vive en `lib/zones.ts` —rutas
 * concretas, distritos reales, terreno, relación con la base de Grecia—, así
 * que cada una dice algo verdadero y distinto de esa zona. No es texto hilado
 * para rellenar: si no aportara información, sería peor que no tenerlo.
 *
 * Son cinco y no tres porque estas landings ya no llevan las diez preguntas
 * generales. Las dos nuevas —qué unidad se despacha y cómo pesa la distancia
 * en el precio— son justo las que un vecino de esa zona pregunta por teléfono,
 * y su respuesta cambia según el terreno y la distancia a Grecia.
 */
export function zoneFaqs(zone: Zone): Faq[] {
  return [
    { question: arrivalQuestion(zone), answer: arrivalAnswer(zone) },
    { question: coverageQuestion(zone), answer: coverageAnswer(zone) },
    { question: routesQuestion(zone), answer: routesAnswer(zone) },
    { question: unitQuestion(zone), answer: unitAnswer(zone) },
    { question: priceQuestion(zone), answer: priceAnswer(zone) },
  ];
}

/* ── Qué unidad se despacha ─────────────────────────────────────────────────
   La respuesta se deduce del terreno que la propia zona declara en sus rutas,
   así que una zona de lastre y pendiente y una de autopista no reciben el
   mismo texto. */

function unitQuestion(zone: Zone): string {
  return zone.kind === 'nacional'
    ? '¿Qué unidad despachan según el caso?'
    : `¿Qué grúa despachan normalmente en ${zone.name}?`;
}

/** Palabras del terreno declarado en las rutas de la zona. */
function terrain(zone: Zone): { rough: boolean; tight: boolean; highway: boolean } {
  const texto = zone.routes.map((r) => `${r.name} ${r.note}`).join(' ').toLowerCase();
  return {
    rough: /lastre|barro|cuneta|talud|pendiente|agrícola|finca/.test(texto),
    tight: /angost|cuadrante|estrech/.test(texto),
    highway: /autopista|interamericana|ruta 1\b|ruta 27|ruta 2\b|circunvalación/.test(texto),
  };
}

function unitAnswer(zone: Zone): string {
  if (zone.kind === 'nacional') {
    return 'Depende de dos cosas: qué vehículo es y dónde quedó. La plataforma es la primera opción en eléctricos e híbridos y la correcta en autos de lujo, deportivos bajos, vehículos sin llantas o sin frenos y traslados largos entre provincias, porque viaja cargado y no suma kilometraje. La unidad de arrastre, con under-lift y cabrestante, entra donde una cama plana no maniobra: sótanos, calles angostas y vehículos fuera de la vía; y como lleva speed dollies, ahí también puede mover un eléctrico o un carro con las llantas trabadas sin que ninguna rueda gire. Cuando llame, descríbanos el vehículo y el lugar y le decimos cuál corresponde antes de que salga la unidad.';
  }

  const { rough, tight, highway } = terrain(zone);
  const partes: string[] = [];

  if (rough) {
    partes.push(
      `En ${zone.name} sale seguido la unidad de arrastre con cabrestante, porque buena parte de los llamados son de vehículos fuera de la calzada o atascados en lastre y pendiente: ahí lo primero no es remolcar, es recuperar con cable hasta terreno firme.`
    );
  }
  if (tight) {
    partes.push(
      `Para el cuadrante, donde las calles son angostas y los parqueos tienen salidas complicadas, también resuelve mejor el arrastre: su radio de giro es la mitad que el de una cama plana.`
    );
  }
  if (highway) {
    partes.push(
      `En los tramos de autopista la plataforma es lo habitual, porque permite cargar rápido y despejar el carril sin convertir el operativo en un segundo accidente.`
    );
  }

  partes.push(
    'La plataforma es además la primera opción para eléctricos e híbridos y es lo correcto para autos de lujo, deportivos bajos y vehículos que no ruedan. Y cuando el carro está donde una cama plana no entra, la unidad de arrastre lo resuelve con speed dollies: las cuatro llantas viajan sin girar, así que sirve igual para un eléctrico o para uno con la caja trabada. Tenemos las dos unidades, así que la decisión se toma en la llamada según lo que nos describa, y sale la correcta a la primera.'
  );

  return partes.join(' ');
}

/* ── Cómo pesa la distancia en el precio ───────────────────────────────────
   La distancia a la base es uno de los tres factores reales de la tarifa, y es
   el único que cambia según la zona. Por eso la respuesta es distinta en la
   base, en la región, en un cantón vecino y en una provincia lejana. */

function priceQuestion(zone: Zone): string {
  return zone.kind === 'nacional'
    ? '¿Cuánto influye la distancia en el precio?'
    : `¿Cuesta más el servicio por estar en ${zone.name}?`;
}

function priceAnswer(zone: Zone): string {
  const cierre =
    ' En todos los casos le damos el monto exacto por teléfono antes de despachar la unidad: nunca se entera del precio cuando la grúa ya llegó.';

  if (zone.slug === 'gruas-grecia') {
    return (
      'El precio se arma con tres cosas: la distancia desde nuestra base, el tipo de unidad que requiere el vehículo y la dificultad del rescate. Estando en Grecia, la primera juega a su favor — la base está aquí, así que el traslado dentro del cantón es el más corto que hacemos. Lo que sí puede mover el monto es el rescate: no es lo mismo cargar un carro estacionado en el cuadrante que sacar uno de una cuneta en la cuesta de Tacares de madrugada.' +
      cierre
    );
  }

  if (zone.kind === 'nacional') {
    return (
      'Es uno de los tres factores, junto con el tipo de unidad y la dificultad del rescate. Dentro de Occidente la distancia casi no pesa porque la base está en Grecia; al resto del Valle Central pesa poco; y a Guanacaste, Puntarenas o Limón sí es el factor principal, porque son varias horas de manejo reales en cada sentido. No manejamos una tarifa única porque no sería honesto: no cuesta lo mismo un traslado dentro de Grecia que uno hasta el Caribe.' +
      cierre
    );
  }

  if (zone.dispatch === 'coordinada') {
    return (
      `Sí, y es el factor que más pesa: ${zone.name} está a varias horas de manejo desde Grecia y el viaje se hace en los dos sentidos. Por eso aquí el precio se cierra completo antes de salir, con el día y la hora acordados. No hay tarifa de lista para una distancia así, pero tampoco hay sorpresas: el monto se define en la llamada y no cambia al llegar.` +
      cierre
    );
  }

  if (zone.kind === 'provincia') {
    return (
      `${zone.name} no es nuestra base, así que la distancia sí entra en el cálculo junto con el tipo de unidad y la dificultad del rescate. Dicho eso, subimos y bajamos por la Interamericana todos los días y buena parte de nuestros traslados empiezan o terminan aquí, así que no es un viaje excepcional que se cobre como tal.` +
      cierre
    );
  }

  if (zone.kind === 'region') {
    return (
      'La base está en Grecia, en el centro mismo de la región, así que para los cantones de Occidente la distancia es el factor que menos pesa. Los otros dos —el tipo de unidad y la dificultad del rescate— son los que de verdad mueven el monto: sacar un vehículo de una cuneta en la cuesta de Zarcero no cuesta lo mismo que cargarlo en el hombro de la Interamericana.' +
      cierre
    );
  }

  return (
    `No por estar en ${zone.name}. Salimos desde Grecia, que queda cerca, así que la distancia es el factor que menos pesa en su caso; los que mueven el monto son el tipo de unidad que requiere el vehículo y la dificultad del rescate.` +
    cierre
  );
}

/** "a, b y c" — como se enumera en español, no con coma final. */
function enumerate(items: string[]): string {
  if (items.length <= 1) return items[0] ?? '';
  return `${items.slice(0, -1).join(', ')} y ${items[items.length - 1]}`;
}

function arrivalQuestion(zone: Zone): string {
  return zone.kind === 'nacional'
    ? '¿Cuánto tardan en llegar si estoy lejos de Grecia?'
    : `¿Cuánto tardan en llegar a ${zone.name}?`;
}

function arrivalAnswer(zone: Zone): string {
  /* Las provincias de traslado coordinado se responden primero y aparte: el
     texto genérico de provincia dice «subimos y bajamos por la Interamericana
     todos los días», que es cierto de San José y falso de Limón. */
  if (zone.dispatch === 'coordinada') {
    return `Aquí somos francos: ${zone.name} está a varias horas de manejo desde Grecia, así que no somos la opción para una varada que necesita una grúa de inmediato. Lo que sí hacemos, y hacemos bien, es el traslado coordinado: se acuerda el día y la hora, se cierra el precio antes de salir y la unidad viaja. Si usted está varado ahora mismo y necesita a alguien ya, lo correcto es que busque una grúa de la zona — se lo vamos a decir por teléfono igual.`;
  }

  if (zone.slug === 'gruas-grecia') {
    return 'Grecia es la base: aquí guardamos las unidades y desde aquí sale cada servicio. Dentro del cantón el tiempo se mide en minutos, no en horas, porque no hay que cruzar el área metropolitana para empezar a acercarse. En la misma llamada le damos el estimado concreto según el punto exacto donde esté.';
  }

  if (zone.kind === 'nacional') {
    return 'Depende de la distancia real de manejo desde Grecia. Costa Rica es pequeña en el mapa y grande en la carretera: dentro de Occidente hablamos de minutos, al resto del Valle Central de menos de una hora, y a Guanacaste, Puntarenas o Limón de varias horas. En la llamada le decimos con franqueza cuánto va a tardar la unidad antes de que salga. Preferimos decirle "tres horas" y cumplir, que prometerle una y dejarlo esperando en la carretera.';
  }

  if (zone.kind === 'region') {
    return 'La base está en Grecia, en el centro mismo de la región y con acceso directo a la Interamericana. Para los cantones vecinos —Sarchí, Naranjo, Poás, Atenas— normalmente son minutos; para San Ramón o Zarcero, algo más por la distancia real de manejo. Una empresa que despacha desde San José tiene que cruzar toda el área metropolitana antes de siquiera acercarse a Occidente: nosotros ya estamos adentro.';
  }

  if (zone.kind === 'provincia') {
    return `${zone.name} no es nuestra base, así que aquí somos francos: el tiempo depende de la distancia real de manejo desde Grecia y del tráfico del momento. Subimos y bajamos por la Interamericana todos los días y buena parte de nuestros traslados empiezan o terminan en ${zone.name}, sea por talleres especializados, agencias o compras entre particulares. Le damos el estimado en la llamada, antes de despachar la unidad.`;
  }

  return `Salimos desde Grecia, así que ${zone.name} queda dentro de nuestro radio de respuesta rápida: no tenemos que cruzar el área metropolitana para llegar. El tiempo exacto depende del punto donde esté dentro del cantón, y se lo confirmamos en la llamada junto con el precio, antes de que la unidad salga.`;
}

function coverageQuestion(zone: Zone): string {
  if (zone.kind === 'nacional') return '¿De verdad cubren las siete provincias?';
  if (zone.kind === 'region') return '¿Qué cantones de Occidente cubren?';
  if (zone.kind === 'provincia') return `¿Qué zonas de ${zone.name} cubren?`;
  return `¿Qué distritos de ${zone.name} cubren?`;
}

function coverageAnswer(zone: Zone): string {
  const places = enumerate([...zone.places]);

  if (zone.dispatch === 'coordinada') {
    return `Coordinamos traslados desde y hacia ${places}. La cobertura es real, pero funciona distinto que en Occidente: se planifica el viaje, se confirma el monto y se acuerda quién entrega y quién recibe el vehículo. Cuanto más lejos esté el punto, más conviene resolverlo con fecha en vez de esperar una respuesta inmediata.`;
  }

  if (zone.kind === 'nacional') {
    return `Sí, sin excepción: ${places}. La empresa es de Grecia, Alajuela, y eso nos hace la opción más rápida para Occidente, pero atendemos el resto del país con la misma disponibilidad de 24 horas. Que seamos una empresa de Occidente no limita hasta dónde llegamos: solo cambia cuánto tardamos, y eso se lo decimos claro desde la llamada.`;
  }

  return `Cubrimos ${zone.name} completo. Los puntos donde más nos llaman son ${places}. Si su punto de referencia no aparece en esa lista, llame igual: después de más de 30 años trabajando la zona, es muy probable que lo conozcamos sin que tenga que explicarnos cómo llegar — y eso, en una emergencia, se traduce directamente en minutos.`;
}

function routesQuestion(zone: Zone): string {
  return zone.kind === 'nacional'
    ? '¿En qué carreteras atienden con más frecuencia?'
    : `¿En qué carreteras de ${zone.name} atienden con más frecuencia?`;
}

function routesAnswer(zone: Zone): string {
  const routes = zone.routes.map((r) => `${r.name} — ${r.note}`).join(' ');

  return `${routes} Conocer el terreno no es un detalle de folleto: define qué unidad se despacha —plataforma para el traslado limpio, arrastre con cabrestante para sacar el vehículo de donde quedó— y cuánto tarda en llegar.`;
}
