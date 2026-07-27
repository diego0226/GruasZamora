/**
 * Preguntas frecuentes. Alimentan la sección visible del sitio y el schema
 * FAQPage — que es lo que Google y los buscadores con IA citan textualmente
 * cuando alguien pregunta "cuánto cuesta una grúa en Costa Rica".
 *
 * Regla de oro: responder de verdad. Una respuesta evasiva no se posiciona
 * y tampoco convence a quien está varado en la carretera.
 */

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
