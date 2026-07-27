/**
 * Preguntas frecuentes. Alimentan la sección visible del sitio y el schema
 * FAQPage — que es lo que Google y los buscadores con IA citan textualmente
 * cuando alguien pregunta "cuánto cuesta una grúa en Costa Rica".
 *
 * Regla de oro: responder de verdad. Una respuesta evasiva no se posiciona
 * y tampoco convence a quien está varado en la carretera.
 */

import type { Zone } from './zones';

export type Faq = { question: string; answer: string };

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
      'La plataforma carga el vehículo completo sobre una cama plana: ninguna llanta toca el suelo, no suma kilometraje y no hay desgaste. Es la opción correcta para autos de lujo, deportivos bajos, eléctricos, híbridos y vehículos sin llantas o sin frenos. La de arrastre levanta el vehículo por las llantas con un sistema under-lift y lo remolca; sirve donde una plataforma no maniobra —sótanos, calles angostas, cunetas— y trae cabrestante para recuperar vehículos fuera de la vía. Tenemos las dos y le decimos cuál necesita según lo que nos describa.',
  },
  {
    question: '¿Qué debo hacer mientras espero la grúa?',
    answer:
      'Encienda las luces de emergencia y, si puede hacerlo con seguridad, mueva el vehículo al hombro de la carretera. Coloque los triángulos de seguridad a buena distancia. Salga del vehículo por el lado contrario al tránsito y espere detrás de la barrera de contención o lo más lejos posible de la calzada, nunca dentro del carro ni parado frente a él. Si es de noche, use algo reflectivo o la linterna del celular. Y guarde nuestro número por si necesita actualizarnos la ubicación.',
  },
  {
    question: '¿Pueden trasladar vehículos eléctricos e híbridos?',
    answer:
      'Sí, y siempre en plataforma. Los fabricantes de vehículos eléctricos prohíben remolcarlos con las llantas motrices en el suelo, porque al girar el motor eléctrico genera corriente y puede dañar el sistema de tracción. Cargarlo completo sobre la cama es el único método aprobado, y es el que usamos.',
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
 * Genera 3 preguntas específicas de una zona a partir de sus datos reales.
 *
 * Por qué existe esto: antes las 13 landings de zona mostraban exactamente las
 * mismas 10 preguntas —unas 1.500 palabras idénticas— y emitían el mismo
 * `FAQPage`. Son justo las páginas que tienen que posicionar para "grúas
 * Grecia", "grúas Naranjo" y demás, y repetir el 40 % del texto entre ellas
 * diluye precisamente lo que las diferencia.
 *
 * Las respuestas se arman con los datos que ya viven en `lib/zones.ts` —rutas
 * concretas, distritos reales, relación con la base de Grecia—, así que cada
 * una dice algo verdadero y distinto de esa zona. No es texto hilado para
 * rellenar: si no aportara información, sería peor que no tenerlo.
 */
export function zoneFaqs(zone: Zone): Faq[] {
  return [
    { question: arrivalQuestion(zone), answer: arrivalAnswer(zone) },
    { question: coverageQuestion(zone), answer: coverageAnswer(zone) },
    { question: routesQuestion(zone), answer: routesAnswer(zone) },
  ];
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
