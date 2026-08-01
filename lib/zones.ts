/**
 * Zonas de cobertura. Cada entrada genera una landing local en /[slug],
 * con contenido propio (nada de plantillas repetidas: Google castiga el
 * "doorway page" y premia el detalle geográfico real).
 *
 * Las tres primeras son las palabras clave prioritarias del negocio:
 * "grúas Grecia", "grúas occidente" y "grúas en Costa Rica".
 *
 * ⚠️ Este módulo es SOLO de servidor. Pesa unos 24 KB de texto editorial y no
 * debe importarse desde un componente con `'use client'`: el empaquetador lo
 * mandaría entero al navegador en todas las páginas. Los componentes de
 * cliente usan `lib/nav.ts`. Ver la nota completa en ese archivo.
 */

import { ZONE_LINKS, assertNavParity } from './nav';

export type Zone = {
  slug: string;
  /** Nombre limpio: "Grecia" */
  name: string;
  /** Cómo se nombra dentro de una frase: "en Grecia", "en todo Costa Rica" */
  inName: string;
  heading: string;
  metaTitle: string;
  metaDescription: string;
  kind: 'canton' | 'region' | 'provincia' | 'nacional';
  /**
   * Qué promete la página sobre el despacho. Es una decisión comercial, no
   * geográfica, y por eso va aparte de `kind`.
   *
   *   `base`        — Grecia. Las unidades duermen aquí.
   *   `rapida`      — se sale a una emergencia con disponibilidad normal.
   *   `coordinada`  — traslado largo: se cierra hora y precio por teléfono
   *                   antes de que salga la unidad. NO se promete respuesta
   *                   inmediata.
   *
   * La distinción existe porque el texto generado de las preguntas frecuentes
   * cambia con ella. Guanacaste y Limón no pueden llevar la misma promesa que
   * Sarchí, y prometer de más en una página que capta la búsqueda solo genera
   * llamadas que terminan mal.
   */
  dispatch: 'base' | 'rapida' | 'coordinada';
  /** Se muestra bajo el H1 */
  lead: string;
  /** Distritos, barrios o cantones cubiertos */
  places: string[];
  /** Rutas y carreteras donde se atiende con más frecuencia */
  routes: { name: string; note: string }[];
  /** Secciones de contenido único de la zona */
  body: { title: string; text: string }[];
  /**
   * Slugs vecinos que esta zona declara.
   *
   * Es una declaración dirigida, pero la vecindad se PINTA como no dirigida:
   * `getNeighbors()` devuelve la unión de lo que la zona declara y de quién la
   * declara a ella. Ver la nota de esa función.
   */
  nearby: string[];
  /** Prioridad en el sitemap */
  priority: number;
  geo?: { latitude: number; longitude: number };
};

export const ZONES: Zone[] = [
  /* ─────────────────────────── PRIORIDAD 1 ─────────────────────────── */
  {
    slug: 'gruas-grecia',
    name: 'Grecia',
    inName: 'en Grecia',
    heading: 'Grúas en Grecia, Alajuela',
    metaTitle: 'Grúas en Grecia 24/7 · Servicio Inmediato',
    metaDescription:
      'Grúas en Grecia, Alajuela las 24 horas. Plataforma, arrastre y rescate en Tacares, San Roque, Puente de Piedra y todo el cantón. Llame al 8387-6352.',
    kind: 'canton',
    dispatch: 'base',
    geo: { latitude: 10.0722, longitude: -84.3136 },
    lead:
      'Grecia es nuestra base. Aquí vivimos, aquí guardamos las unidades y desde aquí salimos. Si su vehículo quedó varado dentro del cantón, no está llamando a una central en San José que va a despachar a alguien desde lejos: está llamando al vecino que ya conoce la cuesta donde usted está parado.',
    places: [
      'Grecia centro',
      'San Isidro',
      'San José',
      'San Roque',
      'Tacares',
      'Puente de Piedra',
      'Bolívar',
      'Rincón de Salas',
      'Los Ángeles',
      'Calle Rodríguez',
    ],
    routes: [
      {
        name: 'Ruta 118 (Grecia – Alajuela)',
        note: 'La arteria del cantón. Curvas cerradas bajando hacia Alajuela y tráfico pesado a toda hora.',
      },
      {
        name: 'Ruta 1 · Autopista Bernardo Soto',
        note: 'El acceso rápido a Grecia. Atendemos incidentes en ambos sentidos y en las entradas de Puente de Piedra.',
      },
      {
        name: 'Cuesta de Tacares',
        note: 'Pendiente y curvas donde los frenos y los embragues sufren. Es uno de nuestros llamados más frecuentes.',
      },
      {
        name: 'Ruta 726 (Grecia – Sarchí)',
        note: 'Conexión hacia Sarchí Sur y Sarchí Norte, con tramos angostos.',
      },
    ],
    body: [
      {
        title: 'Conocemos el cantón calle por calle',
        text: 'Cuando alguien llama y dice "estoy en la cuesta antes de Tacares" o "frente al súper de Puente de Piedra", no necesitamos que nos comparta la ubicación por WhatsApp ni que nos explique cómo llegar. Eso, en una emergencia, se traduce directamente en minutos. Más de 30 años trabajando en Grecia significan que el cantón lo tenemos mapeado en la cabeza, incluidos los caminos de lastre hacia los cafetales y las calles angostas del cuadrante central donde una plataforma no maniobra.',
      },
      {
        title: 'La calle angosta del centro no es problema',
        text: 'El cuadrante de Grecia, alrededor de la Iglesia de Metal y el parque, tiene calles estrechas y parqueos con salidas complicadas. Por eso operamos dos tipos de unidad: la plataforma para el traslado limpio de vehículos livianos y de lujo, y la unidad de arrastre con sistema under-lift para meterse donde la cama plana simplemente no cabe.',
      },
      {
        title: 'Atención local, cobertura nacional',
        text: 'Que la base esté en Grecia no limita el servicio. Si el carro se le varó en Grecia pero el taller de confianza está en San José, o si compró un vehículo en Guanacaste y lo quiere en su casa aquí, el traslado se hace igual. La base local es la ventaja para llegar rápido, no un límite de hasta dónde vamos.',
      },
      {
        title: 'Qué pasa desde que llama hasta que llega la unidad',
        text: 'Primero le preguntamos tres cosas: dónde está, qué vehículo es y qué le pasó. Con eso se decide sola la unidad —plataforma si el carro no debe rodar, arrastre si hay que sacarlo de donde quedó— y se calcula el tiempo real desde la base. Antes de colgar usted ya sabe el monto y a qué hora llega la grúa. No hay una segunda llamada para "ajustar el precio" cuando el operador ve el carro: eso es exactamente lo que la gente teme al llamar una grúa que no conoce, y es la razón por la que el precio se cierra al principio y no al final.',
      },
      {
        title: 'Grecia también atiende hacia el norte',
        text: 'Hasta 2017 Río Cuarto era el distrito trece de este cantón, y aunque hoy sea cantón propio la ruta sigue siendo la misma que hemos hecho siempre. Si el vehículo quedó en la carretera de montaña hacia Cariblanco o en un camino de finca por Santa Rita, se atiende desde aquí. Lo mismo hacia Sarchí por la 726 y hacia Poás por Carrillos: Grecia queda en el punto donde esas tres salidas se juntan, y por eso el tiempo de respuesta en toda esa franja es corto.',
      },
    ],
    nearby: [
      'gruas-sarchi',
      'gruas-naranjo',
      'gruas-poas',
      'gruas-alajuela',
      'gruas-atenas',
      'gruas-rio-cuarto',
    ],
    priority: 1.0,
  },
  {
    slug: 'gruas-occidente',
    name: 'Occidente',
    inName: 'en Occidente',
    heading: 'Grúas en Occidente de Alajuela',
    metaTitle: 'Grúas en Occidente de Alajuela 24 Horas',
    metaDescription:
      'Grúas 24/7 en todo el Occidente de Alajuela: Grecia, Sarchí, Naranjo, Palmares, San Ramón, Zarcero, Atenas y Poás. Base en Grecia. Llame al 8387-6352.',
    kind: 'region',
    dispatch: 'rapida',
    geo: { latitude: 10.0722, longitude: -84.3136 },
    lead:
      'Occidente no es una zona plana. Son cuestas, neblina, curvas cerradas y tramos de la Interamericana donde el tráfico pesado no perdona un error. Operamos desde Grecia, en el centro de la región, con las unidades listas las 24 horas para cualquiera de los cantones de la zona.',
    places: [
      'Grecia',
      'Sarchí',
      'Naranjo',
      'Palmares',
      'San Ramón',
      'Zarcero',
      'Atenas',
      'Poás',
      'Valverde Vega',
      'Orotina',
      'San Mateo',
    ],
    routes: [
      {
        name: 'Ruta 1 · Interamericana Norte',
        note: 'El eje de Occidente. Atendemos desde el peaje de Naranjo hasta la bajura de San Ramón.',
      },
      {
        name: 'Cuesta de Zarcero (Ruta 141)',
        note: 'Neblina, pendiente sostenida y curvas. La combinación que más rescates nos genera en la región.',
      },
      {
        name: 'Cuesta de Naranjo',
        note: 'Subida larga donde los vehículos con carga recalientan y los frenos se cristalizan al bajar.',
      },
      {
        name: 'Ruta 118 y Ruta 726',
        note: 'Los enlaces internos entre Grecia, Sarchí y Alajuela.',
      },
      {
        name: 'Ruta 3 y accesos a Atenas',
        note: 'Curvas hacia La Garita y conexión con la Ruta 27.',
      },
    ],
    body: [
      {
        title: 'Estar en el centro de la región es la ventaja',
        text: 'Grecia queda a pocos minutos de Sarchí, Naranjo, Poás y Atenas, y con acceso directo a la Interamericana para llegar a Palmares, San Ramón y Zarcero. Una empresa despachando desde San José tiene que cruzar toda el área metropolitana antes de empezar a acercarse. Nosotros ya estamos adentro de la región.',
      },
      {
        title: 'Terreno que exige el equipo correcto',
        text: 'Occidente combina asfalto de alta velocidad con caminos de lastre hacia fincas y cafetales. Un vehículo que se sale en una curva de la cuesta de Zarcero necesita cabrestante hidráulico, no una cama plana. Un carro de lujo que se varó en la Interamericana necesita plataforma, no arrastre. Tener las dos unidades es lo que permite resolver bien en cualquiera de los dos escenarios.',
      },
      {
        title: 'Neblina y lluvia: la temporada de más llamadas',
        text: 'De mayo a noviembre, los tramos altos de Zarcero y Naranjo amanecen y anochecen con visibilidad reducida. Es cuando más salidas de vía atendemos. Si le pasó, lo primero es ponerse a salvo fuera del vehículo y detrás de la barrera de contención; lo segundo es llamar. Salimos a cualquier hora, con lluvia y de noche.',
      },
      {
        title: 'No todos los cantones piden lo mismo',
        text: 'Zarcero y la parte alta de Naranjo generan sobre todo rescates: vehículos que se salieron en una curva y quedaron fuera de la calzada, donde primero hay que recuperar con cable y después decidir si se traslada. Sarchí y el cuadrante de Grecia piden maniobra en calle angosta, que es terreno de arrastre. La Interamericana entre Palmares y San Ramón pide carga rápida y señalización, porque el riesgo ahí no es el vehículo sino el tráfico que viene detrás. Y Atenas y Poás concentran recalentamientos y frenos exigidos por la pendiente. Saber de antemano qué suele pasar en cada punto es lo que permite despachar la unidad correcta a la primera en vez de mandar una y tener que volver con la otra.',
      },
      {
        title: 'Los tramos que concentran las llamadas',
        text: 'Si tuviéramos que apostar dónde va a sonar el teléfono, serían cinco puntos: la cuesta de Zarcero en la Ruta 141 con neblina, la cuesta de Naranjo por recalentamiento subiendo y frenos bajando, la bajura de San Ramón hacia Esparza, la cuesta de Tacares en Grecia y las curvas de la Ruta 3 hacia La Garita desde Atenas. Son tramos con pendiente sostenida, pocos espacios seguros para orillarse y tráfico pesado. Si va a hacer alguno de esos recorridos con el carro cargado, revise refrigerante y frenos antes de salir: la mayoría de las varadas que atendemos ahí se veían venir.',
      },
    ],
    nearby: [
      'gruas-grecia',
      'gruas-naranjo',
      'gruas-san-ramon',
      'gruas-palmares',
      'gruas-zarcero',
      'gruas-sarchi',
    ],
    priority: 1.0,
  },
  {
    slug: 'gruas-costa-rica',
    name: 'Costa Rica',
    inName: 'en Costa Rica',
    heading: 'Grúas en Costa Rica — cobertura nacional 24/7',
    metaTitle: 'Grúas en Costa Rica 24/7 · Todo el País',
    metaDescription:
      'Grúas en todo Costa Rica 24 horas: plataforma, arrastre y rescate vehicular en las 7 provincias. Más de 30 años de experiencia. Llame al 8387-6352.',
    kind: 'nacional',
    dispatch: 'rapida',
    geo: { latitude: 9.9281, longitude: -84.0907 },
    lead:
      'Un traslado no se detiene en el límite de la provincia. Trabajamos en las siete provincias del país: del Caribe a Guanacaste, de la Zona Norte al Pacífico Sur. Si el vehículo tiene que moverse, lo movemos.',
    places: [
      'San José',
      'Alajuela',
      'Cartago',
      'Heredia',
      'Guanacaste',
      'Puntarenas',
      'Limón',
    ],
    routes: [
      {
        name: 'Ruta 1 · Interamericana Norte',
        note: 'De San José a Peñas Blancas, pasando por todo Occidente y Guanacaste.',
      },
      {
        name: 'Ruta 2 · Interamericana Sur',
        note: 'Cerro de la Muerte y Pacífico Sur. Altura, neblina y pendientes largas.',
      },
      {
        name: 'Ruta 27 · Ruta del Sol',
        note: 'San José – Caldera. Alta velocidad y los accesos a Atenas y Orotina.',
      },
      {
        name: 'Ruta 32 · Braulio Carrillo',
        note: 'Hacia Limón. Lluvia constante, deslizamientos y tráfico de contenedores.',
      },
      {
        name: 'Ruta 34 · Costanera Sur',
        note: 'Jacó, Quepos y Dominical.',
      },
      {
        name: 'Ruta 21 · Nicoya',
        note: 'Península de Nicoya y playas de Guanacaste.',
      },
    ],
    body: [
      {
        title: 'Emergencias y traslados programados',
        text: 'La cobertura nacional funciona en dos modos. El de emergencia: usted se varó lejos de casa y necesita que alguien llegue. Y el programado: compró un vehículo en otra provincia, se está mudando, o tiene un carro guardado que ya no circula y hay que moverlo con fecha y hora. Los dos se resuelven con la misma llamada.',
      },
      {
        title: 'Distancias reales, expectativas claras',
        text: 'Costa Rica es pequeña en el mapa y grande en la carretera: de Grecia a Puerto Viejo de Limón son varias horas de manejo, no minutos. Cuando llame le decimos con franqueza cuánto va a tardar la unidad en llegar y cuánto cuesta el traslado antes de salir. Preferimos un dato incómodo y cierto que una promesa bonita que no se cumple.',
      },
      {
        title: 'Respaldo con pólizas del INS y factura electrónica',
        text: 'Las unidades están aseguradas con pólizas del INS y emitimos factura electrónica autorizada por el Ministerio de Hacienda. Eso importa cuando el traslado lo paga una empresa, un taller, una agencia o una aseguradora, y también cuando usted simplemente quiere un comprobante formal de que su vehículo viajó respaldado.',
      },
    ],
    nearby: ['gruas-occidente', 'gruas-grecia', 'gruas-alajuela', 'gruas-san-jose', 'gruas-heredia', 'gruas-cartago'],
    priority: 1.0,
  },

  /* ─────────────────────────── CANTONES ─────────────────────────── */
  {
    slug: 'gruas-alajuela',
    name: 'Alajuela',
    inName: 'en Alajuela',
    heading: 'Grúas en Alajuela',
    metaTitle: 'Grúas en Alajuela 24 Horas · Remolque',
    metaDescription:
      'Grúas 24/7 en Alajuela centro, La Garita, Río Segundo, Turrúcares y alrededores del Aeropuerto Juan Santamaría. Plataforma y arrastre 24/7. 8387-6352.',
    kind: 'canton',
    dispatch: 'rapida',
    geo: { latitude: 10.0162, longitude: -84.2116 },
    lead:
      'Alajuela concentra el aeropuerto, la zona franca y el tramo más cargado de la Interamericana. Es tráfico denso, muchos vehículos de alquiler y conductores que no conocen las salidas. Estamos a pocos minutos por la Ruta 118.',
    places: [
      'Alajuela centro',
      'La Garita',
      'Río Segundo',
      'San Antonio del Tejar',
      'Turrúcares',
      'La Guácima',
      'Sabanilla',
      'San Rafael',
      'Carrizal',
      'Desamparados de Alajuela',
      'Tambor',
    ],
    routes: [
      {
        name: 'Ruta 1 · Autopista Bernardo Soto',
        note: 'El tramo con más volumen del país entre San José y Alajuela.',
      },
      {
        name: 'Radial Aeropuerto Juan Santamaría',
        note: 'Vehículos de alquiler y traslados con hora de vuelo de por medio.',
      },
      {
        name: 'Ruta 118 (Alajuela – Grecia)',
        note: 'Nuestra vía de acceso directa: llegamos sin cruzar el área metropolitana.',
      },
      {
        name: 'Ruta 3 hacia La Garita',
        note: 'Conexión con Atenas y la Ruta 27.',
      },
    ],
    body: [
      {
        title: 'Aeropuerto y vehículos de alquiler',
        text: 'Cuando el problema es con un carro alquilado y hay un vuelo de por medio, el tiempo pesa distinto. Coordinamos el traslado del vehículo mientras usted resuelve con la arrendadora, y emitimos factura electrónica para que el trámite del reembolso no se le complique después.',
      },
      {
        title: 'Tráfico denso, maniobra ajustada',
        text: 'Recoger un vehículo varado sobre la Bernardo Soto en hora pico exige señalización correcta y una maniobra rápida y limpia. No es solo enganchar y salir: es hacerlo sin convertir el operativo en un segundo accidente.',
      },
    ],
    nearby: ['gruas-grecia', 'gruas-poas', 'gruas-atenas', 'gruas-occidente', 'gruas-san-jose'],
    priority: 0.8,
  },
  {
    slug: 'gruas-naranjo',
    name: 'Naranjo',
    inName: 'en Naranjo',
    heading: 'Grúas en Naranjo',
    metaTitle: 'Grúas en Naranjo 24/7 · Remolque y Rescate',
    metaDescription:
      'Grúas en Naranjo 24 horas: cuesta de Naranjo, Ruta 141 hacia Zarcero, Cirrí Sur y San Jerónimo. Plataforma, arrastre y rescate. Llame al 8387-6352.',
    kind: 'canton',
    dispatch: 'rapida',
    geo: { latitude: 10.0947, longitude: -84.3808 },
    lead:
      'Naranjo es cuesta pura y el cruce obligado hacia Zarcero y la Zona Norte. Es de las zonas donde más nos llaman por frenos recalentados bajando y por vehículos que no completan la subida.',
    places: [
      'Naranjo centro',
      'San Miguel',
      'San José',
      'Cirrí Sur',
      'San Jerónimo',
      'San Juan',
      'El Rosario',
      'Palmitos',
    ],
    routes: [
      {
        name: 'Cuesta de Naranjo (Ruta 1)',
        note: 'Subida larga y sostenida: recalentamiento al subir, frenos exigidos al bajar.',
      },
      {
        name: 'Ruta 141 (Naranjo – Zarcero – Ciudad Quesada)',
        note: 'La salida a la Zona Norte, con neblina frecuente en la parte alta.',
      },
      {
        name: 'Peaje de Naranjo',
        note: 'Punto de referencia habitual para coordinar el encuentro con la unidad.',
      },
    ],
    body: [
      {
        title: 'Si se le recalentó subiendo, no siga',
        text: 'La cuesta de Naranjo castiga los motores con años encima. Si la aguja se le fue al rojo, orillarse y apagar es lo correcto: seguir "solo un poquito más" es la diferencia entre un radiador y un empaque de culata. Llegamos y lo trasladamos al taller que usted indique.',
      },
      {
        title: 'Camino a la Zona Norte',
        text: 'Mucho del tráfico que atendemos aquí va o viene de Ciudad Quesada y La Fortuna. Si el vehículo falló en ese trayecto, el traslado se coordina en cualquiera de las dos direcciones, sin importar la hora.',
      },
    ],
    nearby: ['gruas-grecia', 'gruas-zarcero', 'gruas-sarchi', 'gruas-palmares', 'gruas-occidente'],
    priority: 0.8,
  },
  {
    slug: 'gruas-sarchi',
    name: 'Sarchí',
    inName: 'en Sarchí',
    heading: 'Grúas en Sarchí',
    metaTitle: 'Grúas en Sarchí 24 Horas · Remolque',
    metaDescription:
      'Grúas en Sarchí Norte, Sarchí Sur, San Pedro y Toro Amarillo las 24 horas. Remolque de plataforma y arrastre. A minutos desde Grecia. 8387-6352.',
    kind: 'canton',
    dispatch: 'rapida',
    geo: { latitude: 10.0886, longitude: -84.3486 },
    lead:
      'Sarchí queda a minutos de nuestra base en Grecia. Calles del cuadrante angostas, mucho turismo en temporada y caminos que suben hacia Toro Amarillo: los tres escenarios los atendemos con la unidad correcta.',
    places: [
      'Sarchí Norte',
      'Sarchí Sur',
      'San Pedro',
      'Rodríguez',
      'Toro Amarillo',
      'Trojas',
    ],
    routes: [
      {
        name: 'Ruta 726 (Grecia – Sarchí)',
        note: 'Nuestro acceso directo desde la base. Tramos angostos con poca visibilidad.',
      },
      {
        name: 'Ruta 118 hacia Naranjo',
        note: 'Conexión con la Interamericana.',
      },
      {
        name: 'Caminos hacia Toro Amarillo',
        note: 'Lastre y pendiente: terreno de cabrestante, no de plataforma.',
      },
    ],
    body: [
      {
        title: 'El cuadrante turístico',
        text: 'Alrededor de la fábrica de carretas y el parque, las calles son estrechas y en temporada alta se llenan. Ahí la unidad de arrastre resuelve mejor que una cama plana, porque el radio de giro es la mitad.',
      },
      {
        title: 'Subiendo hacia Toro Amarillo',
        text: 'Los caminos hacia las fincas altas son de lastre y con pendiente. Un vehículo que se atascó ahí no necesita grúa: necesita cable. El cabrestante hidráulico lo saca hasta terreno firme y de ahí se decide si se traslada o sigue por sus propios medios.',
      },
    ],
    nearby: ['gruas-grecia', 'gruas-naranjo', 'gruas-poas', 'gruas-occidente'],
    priority: 0.8,
  },
  {
    slug: 'gruas-palmares',
    name: 'Palmares',
    inName: 'en Palmares',
    heading: 'Grúas en Palmares',
    metaTitle: 'Grúas en Palmares 24/7 · Remolque',
    metaDescription:
      'Grúas en Palmares 24 horas: centro, Zaragoza, Buenos Aires, Santiago y Esquipulas. Cobertura reforzada durante las Fiestas de Palmares. 8387-6352.',
    kind: 'canton',
    dispatch: 'rapida',
    geo: { latitude: 10.0553, longitude: -84.4356 },
    lead:
      'Palmares es tranquilo once meses al año y luego llegan las fiestas. Para las dos situaciones estamos disponibles, con acceso directo por la Interamericana desde Grecia.',
    places: [
      'Palmares centro',
      'Zaragoza',
      'Buenos Aires',
      'Santiago',
      'Candelaria',
      'Esquipulas',
      'La Granja',
    ],
    routes: [
      {
        name: 'Ruta 1 · Interamericana Norte',
        note: 'Acceso principal y punto habitual de atención.',
      },
      {
        name: 'Ruta 712 (Palmares – San Ramón)',
        note: 'Enlace con el cantón vecino.',
      },
      {
        name: 'Accesos a Zaragoza y Esquipulas',
        note: 'Calles de cuadrante y zonas residenciales.',
      },
    ],
    body: [
      {
        title: 'Temporada de Fiestas de Palmares',
        text: 'En enero el cantón multiplica su población y los parqueos improvisados se llenan. Es cuando más salidas hacemos por vehículos bloqueados, baterías descargadas después de horas con las luces puestas, y traslados de gente que —con buen criterio— decidió no manejar. Si esa es su situación, llame: es mejor que la alternativa.',
      },
      {
        title: 'El resto del año',
        text: 'Fuera de fiestas, la mayoría de llamadas son de la Interamericana y de averías en casa. Atendemos igual, a cualquier hora, con plataforma o arrastre según lo que el vehículo necesite.',
      },
    ],
    nearby: ['gruas-san-ramon', 'gruas-naranjo', 'gruas-grecia', 'gruas-occidente'],
    priority: 0.8,
  },
  {
    slug: 'gruas-san-ramon',
    name: 'San Ramón',
    inName: 'en San Ramón',
    heading: 'Grúas en San Ramón',
    metaTitle: 'Grúas en San Ramón 24 Horas · Rescate',
    metaDescription:
      'Grúas y rescate vehicular en San Ramón las 24 horas: bajura de San Ramón, Ruta 702 hacia La Fortuna, Piedades y Volio. Plataforma y arrastre. 8387-6352.',
    kind: 'canton',
    dispatch: 'rapida',
    geo: { latitude: 10.0894, longitude: -84.4711 },
    lead:
      'San Ramón es el cantón más extenso de Occidente y el que tiene los tramos más exigentes: la bajura hacia Puntarenas y la salida a La Fortuna por Peñas Blancas.',
    places: [
      'San Ramón centro',
      'Santiago',
      'San Juan',
      'Piedades Norte',
      'Piedades Sur',
      'San Rafael',
      'San Isidro',
      'Los Ángeles',
      'Alfaro',
      'Volio',
      'Concepción',
      'Zapotal',
      'Peñas Blancas',
    ],
    routes: [
      {
        name: 'Bajura de San Ramón (Ruta 1)',
        note: 'Descenso largo hacia el Pacífico. Frenos exigidos y tráfico pesado.',
      },
      {
        name: 'Ruta 702 (San Ramón – La Fortuna)',
        note: 'Montaña, neblina y curvas cerradas camino a la Zona Norte.',
      },
      {
        name: 'Ruta 1 en el centro',
        note: 'Cruce de entrada al cantón y punto de referencia frecuente.',
      },
    ],
    body: [
      {
        title: 'La bajura: donde fallan los frenos',
        text: 'Bajar hacia Esparza con el pie pegado al freno es la receta para cristalizar las pastillas y perder presión. Si sintió el pedal esponjoso o le empezó a oler a quemado, oríllese en el primer espacio seguro. Es de los rescates que más hacemos y siempre es mejor la grúa que seguir bajando.',
      },
      {
        title: 'Camino a La Fortuna',
        text: 'La Ruta 702 es hermosa y es dura: neblina, curvas y poca señal de celular en varios tramos. Si se le varó ahí, mándenos la ubicación apenas tenga señal; conocemos la ruta y sabemos dónde se puede maniobrar.',
      },
    ],
    nearby: ['gruas-palmares', 'gruas-naranjo', 'gruas-zarcero', 'gruas-occidente'],
    priority: 0.8,
  },
  {
    slug: 'gruas-atenas',
    name: 'Atenas',
    inName: 'en Atenas',
    heading: 'Grúas en Atenas',
    metaTitle: 'Grúas en Atenas 24/7 · Remolque y Rescate',
    metaDescription:
      'Grúas en Atenas las 24 horas: centro, Jesús, Mercedes, Concepción y accesos a la Ruta 27 y La Garita. Plataforma, arrastre y rescate. 8387-6352.',
    kind: 'canton',
    dispatch: 'rapida',
    geo: { latitude: 9.9797, longitude: -84.3806 },
    lead:
      'Atenas conecta el Valle Central con el Pacífico. Las curvas hacia La Garita y el enlace con la Ruta 27 generan un flujo constante de vehículos que no conocen la vía.',
    places: [
      'Atenas centro',
      'Jesús',
      'Mercedes',
      'San Isidro',
      'Concepción',
      'San José',
      'Santa Eulalia',
      'Escobal',
    ],
    routes: [
      {
        name: 'Ruta 3 (Atenas – La Garita)',
        note: 'Curvas continuas y pendiente. Muy transitada los fines de semana.',
      },
      {
        name: 'Ruta 27 · Ruta del Sol',
        note: 'Alta velocidad hacia Caldera y Jacó, con accesos desde el cantón.',
      },
      {
        name: 'Ruta 137 hacia Orotina',
        note: 'Bajada hacia el Pacífico con tramos de poca visibilidad.',
      },
    ],
    body: [
      {
        title: 'Tránsito de fin de semana hacia la playa',
        text: 'Viernes en la tarde y domingo en la noche el flujo hacia y desde el Pacífico se dispara, y con él las varadas: recalentamiento en la subida de regreso, llantas reventadas y baterías que no aguantaron. Trabajamos esos horarios porque son justamente cuando más se necesita el servicio.',
      },
      {
        title: 'Curvas que no perdonan un carro cargado',
        text: 'La Ruta 3 hacia La Garita con el carro lleno de gente y equipaje exige más de los frenos de lo que la mayoría calcula. Si algo falla ahí, hay pocos espacios seguros para orillarse: dígannos el mojón o el punto de referencia más cercano y coordinamos la maniobra.',
      },
    ],
    nearby: ['gruas-alajuela', 'gruas-grecia', 'gruas-occidente', 'gruas-san-jose'],
    priority: 0.8,
  },
  {
    slug: 'gruas-poas',
    name: 'Poás',
    inName: 'en Poás',
    heading: 'Grúas en Poás',
    metaTitle: 'Grúas en Poás 24 Horas · Remolque',
    metaDescription:
      'Grúas en Poás las 24 horas: San Pedro, Carrillos, Sabana Redonda y la ruta al Volcán Poás. Rescate en pendiente con cabrestante. Llame al 8387-6352.',
    kind: 'canton',
    dispatch: 'rapida',
    geo: { latitude: 10.0894, longitude: -84.2622 },
    lead:
      'Poás es subida constante, neblina en la parte alta y mucho turismo camino al volcán. Estamos al lado, por la Ruta 118 desde Grecia.',
    places: [
      'San Pedro',
      'San Juan',
      'San Rafael',
      'Carrillos Alto',
      'Carrillos Bajo',
      'Sabana Redonda',
    ],
    routes: [
      {
        name: 'Ruta al Volcán Poás (Ruta 146)',
        note: 'Pendiente sostenida, neblina y frío. Motores y frenos trabajan al límite.',
      },
      {
        name: 'Ruta 712 (Carrillos – Grecia)',
        note: 'Nuestro acceso más directo al cantón.',
      },
      {
        name: 'Ruta 107 hacia Alajuela',
        note: 'Conexión con el aeropuerto y la Interamericana.',
      },
    ],
    body: [
      {
        title: 'Subiendo al volcán',
        text: 'La carretera al Parque Nacional exige primera y segunda buena parte del trayecto. Cada semana atendemos vehículos que no completaron la subida o que bajaron con los frenos cocinados. Si va a subir, revise refrigerante y frenos antes; si ya está varado allá arriba, llame y subimos.',
      },
      {
        title: 'Neblina y frío en la parte alta',
        text: 'De Sabana Redonda hacia arriba la visibilidad se cierra sin aviso. Si tuvo que orillarse, encienda las luces de emergencia, salga del vehículo por el lado de la montaña y espere lejos de la calzada. Llegamos con señalización.',
      },
    ],
    nearby: ['gruas-grecia', 'gruas-alajuela', 'gruas-sarchi', 'gruas-occidente'],
    priority: 0.8,
  },
  {
    slug: 'gruas-zarcero',
    name: 'Zarcero',
    inName: 'en Zarcero',
    heading: 'Grúas en Zarcero',
    metaTitle: 'Grúas en Zarcero 24/7 · Rescate en Cuesta',
    metaDescription:
      'Grúas en Zarcero las 24 horas: cuesta de Zarcero, Ruta 141, Laguna, Tapesco y Guadalupe. Rescate con cabrestante en pendiente y neblina. 8387-6352.',
    kind: 'canton',
    dispatch: 'rapida',
    geo: { latitude: 10.1897, longitude: -84.3908 },
    lead:
      'Zarcero es altura, frío y neblina. La cuesta que sube desde Naranjo es uno de los tramos que más rescates genera en todo Occidente, sobre todo de noche y en invierno.',
    places: ['Zarcero centro', 'Laguna', 'Tapesco', 'Guadalupe', 'Palmira', 'Zapote', 'Brisas'],
    routes: [
      {
        name: 'Cuesta de Zarcero (Ruta 141)',
        note: 'Pendiente larga, curvas cerradas y neblina densa. Alta frecuencia de salidas de vía.',
      },
      {
        name: 'Ruta 141 hacia Ciudad Quesada',
        note: 'Continuación hacia la Zona Norte, con tramos de montaña.',
      },
      {
        name: 'Caminos hacia Tapesco y Laguna',
        note: 'Rutas agrícolas con lastre y pendiente.',
      },
    ],
    body: [
      {
        title: 'La cuesta en invierno',
        text: 'Asfalto mojado, neblina que reduce la visibilidad a metros y curvas que se cierran más de lo que uno espera. Cuando un vehículo se sale aquí, casi siempre queda fuera de la calzada y hay que sacarlo con cable antes de poder trasladarlo. Para eso está el cabrestante hidráulico.',
      },
      {
        title: 'Zona agrícola de altura',
        text: 'Los caminos hacia las fincas de Tapesco y Laguna son de lastre, con pendiente y barro en invierno. Atendemos vehículos livianos y camionetas atascadas en esos accesos.',
      },
    ],
    nearby: ['gruas-naranjo', 'gruas-san-ramon', 'gruas-occidente', 'gruas-grecia'],
    priority: 0.8,
  },
  {
    /* Zona objetivo declarada por la empresa que hasta ahora no tenía URL
       (hallazgo F-02). Los distritos y las rutas de aquí son geografía
       pública verificable; el tono de despacho lo confirmó la empresa: se
       atiende igual que el resto de Occidente. */
    slug: 'gruas-rio-cuarto',
    name: 'Río Cuarto',
    inName: 'en Río Cuarto',
    heading: 'Grúas en Río Cuarto, Alajuela',
    metaTitle: 'Grúas en Río Cuarto 24/7 · Alajuela',
    metaDescription:
      'Grúas en Río Cuarto las 24 horas: Santa Rita, Santa Isabel y la Ruta 126 desde Vara Blanca. Rescate en montaña y caminos de finca. Llame al 8387-6352.',
    kind: 'canton',
    dispatch: 'rapida',
    geo: { latitude: 10.3406, longitude: -84.2094 },
    lead:
      'Río Cuarto fue distrito de Grecia hasta 2017, y para nosotros sigue siendo territorio conocido: es la bajada hacia la Zona Norte que hemos hecho toda la vida. Montaña, neblina, lluvia casi todo el año y caminos de finca que se ponen imposibles en invierno.',
    places: [
      'Río Cuarto centro',
      'Santa Rita',
      'Santa Isabel',
      'Los Ángeles',
      'Fincas y potreros del cantón',
    ],
    routes: [
      {
        name: 'Ruta 126 (Vara Blanca – Cariblanco – Río Cuarto)',
        note: 'La vía de acceso desde el Valle Central. Montaña, curvas cerradas y neblina que baja sin aviso a partir de Vara Blanca.',
      },
      {
        name: 'Salida hacia Venecia y la Zona Norte',
        note: 'Conexión con San Carlos. Mucho tráfico agrícola pesado y tramos con superficie irregular.',
      },
      {
        name: 'Caminos de finca hacia piñeras y potreros',
        note: 'Lastre y barro. En invierno es terreno de cabrestante, no de cama plana.',
      },
    ],
    body: [
      {
        title: 'Del distrito 13 de Grecia a cantón propio',
        text: 'Hasta 2017 Río Cuarto era el distrito número trece del cantón de Grecia. Que se independizara administrativamente no cambió el mapa que llevamos en la cabeza: es la misma ruta que hemos subido y bajado durante décadas para atender averías en la carretera de montaña. Cuando alguien llama diciendo que quedó varado "pasando Cariblanco" o "antes de llegar a Santa Rita", no hace falta que nos explique dónde es.',
      },
      {
        title: 'La 126 castiga los frenos en la bajada',
        text: 'La carretera que une el Valle Central con Río Cuarto es descenso sostenido con curvas. Bajar con el pie pegado al freno cristaliza las pastillas y hace perder presión justo donde hay menos espacios seguros para orillarse. Si el pedal se le puso esponjoso o empezó a oler a quemado, deténgase en el primer punto seguro y llame: es una de las varadas más frecuentes de esta ruta y no mejora siguiendo.',
      },
      {
        title: 'Invierno, barro y caminos de finca',
        text: 'Río Cuarto es zona de piña y ganadería, y buena parte de los accesos a las fincas son de lastre. Con las lluvias, una camioneta que entra cargada sale atascada. Eso no se resuelve con una plataforma: se resuelve con cable. El cabrestante hidráulico lo saca hasta terreno firme y de ahí se decide si hace falta trasladarlo o puede seguir por sus propios medios.',
      },
    ],
    nearby: ['gruas-grecia', 'gruas-poas', 'gruas-sarchi', 'gruas-occidente'],
    priority: 0.8,
  },
  {
    slug: 'gruas-san-jose',
    name: 'San José',
    inName: 'en San José',
    heading: 'Grúas en San José',
    metaTitle: 'Grúas en San José 24 Horas · Traslados',
    metaDescription:
      'Grúas en San José las 24 horas: Circunvalación, Ruta 27, Ruta 32 y centro. Traslados desde y hacia Occidente, plataforma y arrastre. Llame al 8387-6352.',
    kind: 'provincia',
    dispatch: 'rapida',
    geo: { latitude: 9.9281, longitude: -84.0907 },
    lead:
      'Buena parte de nuestros traslados empiezan o terminan en San José: talleres especializados, agencias, concesionarios y compras entre particulares. Subimos y bajamos por la Interamericana todos los días.',
    places: [
      'San José centro',
      'Escazú',
      'Santa Ana',
      'Curridabat',
      'Desamparados',
      'Tibás',
      'Moravia',
      'Pavas',
      'Uruca',
    ],
    routes: [
      {
        name: 'Circunvalación (Ruta 39)',
        note: 'Congestión constante y pocos espacios seguros para maniobrar.',
      },
      {
        name: 'Ruta 27 · Ruta del Sol',
        note: 'Salida hacia el Pacífico y conexión con Atenas.',
      },
      {
        name: 'Ruta 32 · Braulio Carrillo',
        note: 'Hacia Limón, con lluvia y tráfico pesado.',
      },
      {
        name: 'Ruta 1 hacia Alajuela y Occidente',
        note: 'El eje que usamos a diario para traslados entre provincias.',
      },
    ],
    body: [
      {
        title: 'Traslados a talleres y agencias',
        text: 'Si su vehículo requiere un taller especializado o servicio de agencia en San José y usted vive en Occidente, hacemos el viaje completo: lo retiramos en su casa y lo entregamos donde corresponde, con factura electrónica si la necesita para el trámite.',
      },
      {
        title: 'Compras de vehículo entre particulares',
        text: 'Comprar un carro en San José y manejarlo de vuelta sin conocerlo es un riesgo innecesario, sobre todo si tiene años guardado. Lo trasladamos en plataforma hasta su casa o directamente al taller donde le hará la revisión.',
      },
    ],
    nearby: ['gruas-alajuela', 'gruas-heredia', 'gruas-cartago', 'gruas-costa-rica'],
    priority: 0.7,
  },
  {
    slug: 'gruas-heredia',
    name: 'Heredia',
    inName: 'en Heredia',
    heading: 'Grúas en Heredia',
    metaTitle: 'Grúas en Heredia 24 Horas · Remolque',
    metaDescription:
      'Grúas en Heredia las 24 horas: centro, Santo Domingo, San Pablo, Belén, Barva y las zonas francas. Plataforma y arrastre desde Grecia. Llame al 8387-6352.',
    kind: 'provincia',
    dispatch: 'rapida',
    geo: { latitude: 9.9981, longitude: -84.1197 },
    lead:
      'Heredia queda a un tramo directo de autopista desde Grecia. Es tráfico de gente que se mueve todos los días entre la provincia y San José, con parques industriales y zonas francas donde los parqueos son grandes pero las salidas complicadas.',
    places: [
      'Heredia centro',
      'San Francisco',
      'Mercedes',
      'Ulloa',
      'Santo Domingo',
      'San Pablo',
      'Santa Bárbara',
      'San Rafael',
      'Belén',
      'Flores',
      'Barva',
      'San Joaquín',
    ],
    routes: [
      {
        name: 'Autopista General Cañas (Ruta 1)',
        note: 'El eje que nos conecta directo desde Grecia. Presa constante y pocos hombros seguros.',
      },
      {
        name: 'Ruta 3 (Heredia – Alajuela)',
        note: 'Alternativa cuando la General Cañas está cerrada, y vía de acceso a Santa Bárbara y Barva.',
      },
      {
        name: 'Ruta 5 (Heredia – San José)',
        note: 'Salida hacia Tibás y el centro, con tramos angostos en Santo Domingo.',
      },
      {
        name: 'Ruta 126 hacia Vara Blanca',
        note: 'Montaña, neblina y pendiente camino a Poás y Sarapiquí.',
      },
    ],
    body: [
      {
        title: 'Zonas francas y parques industriales',
        text: 'Alrededor de Ulloa, Belén y Flores se concentran las zonas francas. Atendemos tanto al empleado que se le quedó el carro en el parqueo al salir del turno como a la empresa que necesita mover una unidad de flotilla, con factura electrónica para el trámite interno.',
      },
      {
        title: 'La presa no es excusa',
        text: 'Un vehículo varado sobre la General Cañas en hora pico es un riesgo real y una molestia para miles de personas. Salimos con señalización y hacemos la maniobra rápido; conocemos en qué puntos del tramo se puede cargar sin cerrar un carril completo.',
      },
    ],
    nearby: ['gruas-alajuela', 'gruas-san-jose', 'gruas-poas', 'gruas-grecia', 'gruas-cartago'],
    priority: 0.7,
  },
  {
    slug: 'gruas-cartago',
    name: 'Cartago',
    inName: 'en Cartago',
    heading: 'Grúas en Cartago',
    metaTitle: 'Grúas en Cartago 24 Horas · Remolque',
    metaDescription:
      'Grúas en Cartago las 24 horas: centro, Tres Ríos, Paraíso, El Guarco y Turrialba. Rescate en la cuesta de Ochomogo y traslados a todo el país. 8387-6352.',
    kind: 'provincia',
    dispatch: 'rapida',
    geo: { latitude: 9.8644, longitude: -83.9194 },
    lead:
      'Cartago es altura, neblina y una de las cuestas más exigentes del Valle Central. Llegamos por la Circunvalación y la Florencio del Castillo, y hacemos traslados desde y hacia Occidente todo el año.',
    places: [
      'Cartago centro',
      'Tres Ríos',
      'La Unión',
      'Paraíso',
      'Oreamuno',
      'El Guarco',
      'Tejar',
      'San Rafael',
      'Turrialba',
    ],
    routes: [
      {
        name: 'Ruta 2 · Autopista Florencio del Castillo',
        note: 'San José – Cartago. Alta velocidad, tráfico pesado y la subida de Ochomogo.',
      },
      {
        name: 'Cuesta de Ochomogo',
        note: 'Neblina que se cierra sin aviso y pendiente sostenida. Frenos y motores trabajan al límite.',
      },
      {
        name: 'Ruta 10 (Tres Ríos – Paraíso)',
        note: 'La vía vieja, con curvas y cuadrantes angostos donde el arrastre resuelve mejor.',
      },
      {
        name: 'Ruta 230 hacia Turrialba',
        note: 'Montaña y curvas largas bajando hacia el Caribe.',
      },
    ],
    body: [
      {
        title: 'Ochomogo: la cuesta que cocina los frenos',
        text: 'Bajar de Cartago hacia San José con el pie pegado al freno es la causa número uno de las varadas que atendemos en la zona. Si el pedal se le puso esponjoso o huele a quemado, oríllese antes de seguir. La bajada no se termina donde uno cree.',
      },
      {
        title: 'Romería y fechas de mucho movimiento',
        text: 'En los días de la romería el acceso a Cartago se satura y hay restricciones de circulación. Coordinamos los traslados con eso en cuenta y le decimos de frente si el tiempo de llegada se va a alargar por el cierre de vías.',
      },
    ],
    nearby: ['gruas-san-jose', 'gruas-heredia', 'gruas-costa-rica', 'gruas-alajuela'],
    priority: 0.7,
  },

  /* ───────────────── PROVINCIAS DE TRASLADO COORDINADO ─────────────────
     Guanacaste, Puntarenas y Limón se nombraban en el home y en la página
     nacional pero no tenían URL propia (hallazgo F-03).

     Llevan `dispatch: 'coordinada'` a propósito: son varias horas de manejo
     reales desde Grecia, y la empresa confirmó que ahí el servicio es traslado
     coordinado con hora y precio cerrados por teléfono, no salida inmediata a
     una varada. Las páginas lo dicen en el primer párrafo. Prometer respuesta
     rápida a 250 km de la base captaría la búsqueda y perdería al cliente. */
  {
    slug: 'gruas-guanacaste',
    name: 'Guanacaste',
    inName: 'en Guanacaste',
    heading: 'Grúas y traslados en Guanacaste',
    metaTitle: 'Grúas en Guanacaste · Traslados 24/7',
    metaDescription:
      'Traslado de vehículos desde y hacia Guanacaste: Liberia, Santa Cruz, Nicoya, Cañas y las playas. Coordinado con hora y precio cerrados. 8387-6352.',
    kind: 'provincia',
    dispatch: 'coordinada',
    geo: { latitude: 10.6339, longitude: -85.4377 },
    lead:
      'Guanacaste está a varias horas de manejo desde Grecia, y preferimos decirlo de frente: aquí no somos la opción para una varada que necesita grúa en veinte minutos. Somos la opción para mover un vehículo entre Guanacaste y el resto del país con fecha, hora y precio cerrados antes de que salga la unidad.',
    places: [
      'Liberia',
      'Santa Cruz',
      'Nicoya',
      'Cañas',
      'Bagaces',
      'Carrillo',
      'Tilarán',
      'Abangares',
      'La Cruz',
      'Nandayure',
      'Hojancha',
    ],
    routes: [
      {
        name: 'Ruta 1 · Interamericana Norte',
        note: 'El eje que usamos para subir: Esparza, Cañas, Liberia y hasta Peñas Blancas.',
      },
      {
        name: 'Ruta 18 · Puente La Amistad sobre el Tempisque',
        note: 'El acceso corto a la península de Nicoya, y el que decide cuánto dura el viaje.',
      },
      {
        name: 'Ruta 21 (Liberia – Santa Cruz – Nicoya)',
        note: 'La columna de la península y la salida hacia las playas.',
      },
      {
        name: 'Ruta 142 (Cañas – Tilarán)',
        note: 'Subida hacia la zona del Arenal, con viento fuerte en la parte alta.',
      },
    ],
    body: [
      {
        title: 'Qué sí resolvemos aquí',
        text: 'Compró un vehículo en Liberia y lo quiere en el Valle Central. Se muda y tiene que mover un carro que no circula. Tiene una unidad de flotilla varada en una finca y hay que sacarla. Un vehículo quedó de un accidente en la Interamericana y el taller está en San José. Todo eso son traslados programados o semiprogramados, y son exactamente lo que hacemos bien a esta distancia: se coordina, se confirma el precio, sale la unidad.',
      },
      {
        title: 'Qué no le vamos a prometer',
        text: 'Que llegamos en media hora a una varada en Playa Sámara. De Grecia a la península hay varias horas de manejo reales, con el paso del Tempisque de por medio. Si usted está varado en Guanacaste ahora mismo y necesita a alguien de inmediato, lo honesto es decirle que busque una grúa de la zona. Llámenos igual si el traslado puede esperar o si nadie más le resuelve: le damos el tiempo real y usted decide.',
      },
      {
        title: 'Calor, distancia y el estado del vehículo',
        text: 'Un traslado largo hacia o desde Guanacaste conviene hacerlo en plataforma: el vehículo viaja cargado, no suma kilometraje y no se expone a que un problema mecánico empeore en el camino. Es la diferencia entre entregar el carro como estaba y entregarlo con doscientos kilómetros más encima.',
      },
    ],
    nearby: ['gruas-costa-rica', 'gruas-puntarenas', 'gruas-occidente', 'gruas-san-ramon'],
    priority: 0.6,
  },
  {
    slug: 'gruas-puntarenas',
    name: 'Puntarenas',
    inName: 'en Puntarenas',
    heading: 'Grúas y traslados en Puntarenas',
    metaTitle: 'Grúas en Puntarenas · Traslados 24/7',
    metaDescription:
      'Traslado de vehículos en Puntarenas: Esparza, Caldera, Jacó, Quepos y el Pacífico Sur. Coordinado con hora y precio cerrados. Llame al 8387-6352.',
    kind: 'provincia',
    dispatch: 'coordinada',
    geo: { latitude: 9.9763, longitude: -84.8384 },
    lead:
      'Puntarenas es la provincia más larga del país: de Esparza al sur de Golfito hay una diferencia enorme de tiempo. La parte cercana —Esparza, Caldera, Orotina— la atendemos bajando por la Interamericana; del Pacífico central hacia el sur, el servicio es traslado coordinado con hora y precio cerrados.',
    places: [
      'Puntarenas centro',
      'Esparza',
      'Caldera',
      'Miramar',
      'Jacó',
      'Quepos',
      'Parrita',
      'Monteverde',
      'Osa',
      'Golfito',
      'Corredores',
    ],
    routes: [
      {
        name: 'Ruta 27 · Ruta del Sol',
        note: 'San José – Caldera. Alta velocidad y el acceso más rápido al Pacífico central.',
      },
      {
        name: 'Bajura de San Ramón (Ruta 1)',
        note: 'El descenso hacia Esparza. Frenos exigidos y tráfico pesado: es de los tramos donde más nos llaman.',
      },
      {
        name: 'Ruta 34 · Costanera Sur',
        note: 'Jacó, Parrita, Quepos y Dominical. Puentes angostos y tramos sin hombro.',
      },
      {
        name: 'Ruta 2 · Interamericana Sur',
        note: 'Cerro de la Muerte hacia el Pacífico Sur. Altura, neblina y pendientes largas.',
      },
    ],
    body: [
      {
        title: 'La parte cercana es otra cosa',
        text: 'Esparza, Caldera y la bajura son prácticamente una extensión de nuestra zona de trabajo: bajamos por ahí constantemente y el tramo de la Ruta 1 desde San Ramón lo conocemos de memoria. Ahí los tiempos se parecen más a los de Occidente que a los del resto de la provincia. De Jacó hacia el sur la distancia manda y el servicio se coordina.',
      },
      {
        title: 'Fin de semana en la playa que termina mal',
        text: 'Viernes en la tarde y domingo en la noche el flujo hacia el Pacífico se dispara, y con él las varadas: recalentamiento en la subida de regreso, llantas reventadas después de kilómetros de sol y baterías que no aguantaron. Si le pasó y el vehículo tiene que volver al Valle Central, ese traslado lo hacemos con el precio cerrado desde la llamada.',
      },
      {
        title: 'Traslados desde el Pacífico Sur',
        text: 'Osa, Golfito y Corredores están a muchas horas de Grecia. Son viajes que se planifican: se acuerda el día, se confirma el monto y se coordina quién entrega y quién recibe el vehículo. No es un servicio de emergencia a esa distancia, y decirlo claro evita que alguien espere una grúa que no va a llegar a tiempo.',
      },
    ],
    nearby: ['gruas-costa-rica', 'gruas-guanacaste', 'gruas-san-ramon', 'gruas-atenas'],
    priority: 0.6,
  },
  {
    slug: 'gruas-limon',
    name: 'Limón',
    inName: 'en Limón',
    heading: 'Grúas y traslados en Limón',
    metaTitle: 'Grúas en Limón · Traslados y Rescate',
    metaDescription:
      'Traslado de vehículos desde y hacia Limón: Guápiles, Siquirres, Matina y el Caribe Sur, por la Ruta 32. Coordinado con precio cerrado. 8387-6352.',
    kind: 'provincia',
    dispatch: 'coordinada',
    geo: { latitude: 9.9907, longitude: -83.0359 },
    lead:
      'Llegar al Caribe significa cruzar el Braulio Carrillo, y esa carretera manda sobre cualquier estimación de tiempo: lluvia constante, deslizamientos y cierres que nadie anuncia con antelación. Por eso aquí trabajamos con traslados coordinados y con el tiempo dicho de frente, no con promesas de llegada.',
    places: [
      'Limón centro',
      'Guápiles',
      'Guácimo',
      'Siquirres',
      'Matina',
      'Batán',
      'Pococí',
      'Cahuita',
      'Puerto Viejo',
      'Talamanca',
    ],
    routes: [
      {
        name: 'Ruta 32 · Braulio Carrillo',
        note: 'El paso obligado. Lluvia constante, neblina en la parte alta, deslizamientos y tráfico de contenedores.',
      },
      {
        name: 'Ruta 36 (Limón – Cahuita – Sixaola)',
        note: 'La costa caribeña hacia el sur, con tramos angostos y puentes de una vía.',
      },
      {
        name: 'Ruta 4 (Zona Norte – Caribe)',
        note: 'Alternativa por Guápiles cuando la 32 está cerrada.',
      },
    ],
    body: [
      {
        title: 'La Ruta 32 decide el tiempo, no nosotros',
        text: 'El Braulio Carrillo se cierra por deslizamientos con más frecuencia de la que uno quisiera, y cuando eso pasa el desvío suma horas. Es la razón principal por la que aquí no damos un tiempo de llegada corto: preferimos decirle "el traslado se hace mañana a tal hora" y cumplir, que prometerle algo hoy y quedar atrapados en un cierre.',
      },
      {
        title: 'Guápiles y Siquirres están más cerca de lo que parece',
        text: 'La primera parte de la provincia —Guápiles, Guácimo, Siquirres— queda del lado de acá de la montaña y es notablemente más accesible que la costa. Muchos de los traslados que hacemos hacia el Caribe terminan ahí: vehículos que van a un taller del Valle Central o que vuelven de uno.',
      },
      {
        title: 'Humedad, sal y vehículos guardados',
        text: 'En el Caribe un vehículo que pasa meses sin moverse se deteriora rápido: humedad, sal y óxido trabajan todo el año. Cuando toca sacarlo, lo normal es que ya no arranque ni ruede bien. Ese caso se resuelve con cabrestante y plataforma, cargándolo completo, y es de los traslados que más nos piden desde esta zona.',
      },
    ],
    nearby: ['gruas-costa-rica', 'gruas-cartago', 'gruas-san-jose', 'gruas-heredia'],
    priority: 0.6,
  },
];

/* Revienta el build si alguien agrega una zona y olvida `lib/nav.ts`. */
assertNavParity(ZONES, ZONE_LINKS, 'lib/zones.ts');

export const ZONE_SLUGS = ZONES.map((z) => z.slug);

export function getZone(slug: string): Zone | undefined {
  return ZONES.find((z) => z.slug === slug);
}

/** Zonas destacadas en el home y en el menú. */
export const FEATURED_ZONES = ZONES.filter((z) => z.priority >= 1);

/**
 * Vecinas de una zona: lo que declara MÁS quien la declara a ella.
 *
 * Por qué la unión y no solo `nearby`: los enlaces estaban escritos a mano y
 * dieciséis de ellos eran de una sola vía. Occidente enlazaba a Grecia y
 * Grecia no devolvía el enlace; Heredia enlazaba a Poás, a Alajuela y a Grecia
 * sin que ninguna respondiera. Un enlace de ida y vuelta reparte autoridad en
 * los dos sentidos y le da al rastreador un grafo sin callejones; uno de ida
 * sola desperdicia la mitad.
 *
 * Calcularlo en vez de arreglar las dieciséis listas a mano es lo que evita
 * que el problema vuelva: cualquier zona nueva queda simétrica el día que se
 * escribe, sin que nadie tenga que acordarse de editar las vecinas.
 *
 * El orden respeta primero lo declarado a propósito —esas son las vecinas
 * geográficas de verdad, las que el autor eligió— y después las entrantes.
 */
export function getNeighbors(slug: string): Zone[] {
  const zone = getZone(slug);
  if (!zone) return [];

  const entrantes = ZONES.filter((z) => z.slug !== slug && z.nearby.includes(slug)).map(
    (z) => z.slug
  );

  const slugs = [...new Set([...zone.nearby, ...entrantes])];

  return slugs.map(getZone).filter((z): z is Zone => z !== undefined);
}
