/**
 * Zonas de cobertura. Cada entrada genera una landing local en /[slug],
 * con contenido propio (nada de plantillas repetidas: Google castiga el
 * "doorway page" y premia el detalle geográfico real).
 *
 * Las tres primeras son las palabras clave prioritarias del negocio:
 * "grúas Grecia", "grúas occidente" y "grúas en Costa Rica".
 */

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
  /** Se muestra bajo el H1 */
  lead: string;
  /** Distritos, barrios o cantones cubiertos */
  places: string[];
  /** Rutas y carreteras donde se atiende con más frecuencia */
  routes: { name: string; note: string }[];
  /** Secciones de contenido único de la zona */
  body: { title: string; text: string }[];
  /** Slugs vecinos para enlazado interno */
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
    ],
    nearby: ['gruas-sarchi', 'gruas-naranjo', 'gruas-poas', 'gruas-alajuela', 'gruas-atenas'],
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
    slug: 'gruas-san-jose',
    name: 'San José',
    inName: 'en San José',
    heading: 'Grúas en San José',
    metaTitle: 'Grúas en San José 24 Horas · Traslados',
    metaDescription:
      'Grúas en San José las 24 horas: Circunvalación, Ruta 27, Ruta 32 y centro. Traslados desde y hacia Occidente, plataforma y arrastre. Llame al 8387-6352.',
    kind: 'provincia',
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
];

export const ZONE_SLUGS = ZONES.map((z) => z.slug);

export function getZone(slug: string): Zone | undefined {
  return ZONES.find((z) => z.slug === slug);
}

/** Zonas destacadas en el home y en el menú. */
export const FEATURED_ZONES = ZONES.filter((z) => z.priority >= 1);
