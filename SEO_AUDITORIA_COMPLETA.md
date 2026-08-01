# Auditoría SEO técnica, SEO local, GEO y rendimiento — Grúas Zamora Moya

Fecha de auditoría: 31 de julio de 2026  
Alcance: revisión estática integral del repositorio Next.js, artefactos de compilación locales y una comprobación de resultados de búsqueda. No se modificó código ni configuración del sitio.

## Resumen ejecutivo

El proyecto parte de una base técnicamente buena para un negocio local: App Router, generación estática, HTML renderizado en servidor, canónicas, `robots.txt`, sitemap, imágenes con `next/image`, datos NAP centralizados y JSON-LD consistente. La compilación de producción generó correctamente 18 URL de negocio indexables: inicio, índice de servicios, dos servicios y catorce landings de cobertura.

Sin embargo, hoy no está preparado para cumplir el objetivo más ambicioso —dominar Grecia y competir nacionalmente— porque la autoridad local, el control de duplicación de FAQs, la cobertura de zonas objetivo, la prueba de reputación y la medición de resultados quedan incompletos. El riesgo principal no es una falla de rastreo: es que muchas landings locales comparten una gran porción del mismo contenido y del mismo `FAQPage`, mientras faltan páginas para algunas localidades solicitadas y señales externas verificables que permitan ganar el paquete local.

Prioridades inmediatas:

1. Corregir el `FAQPage` repetido de las landings de zona y reducir el texto común repetido.
2. Incorporar Río Cuarto y definir una arquitectura editorial para las provincias/cantones solicitados que hoy no tienen URL propia, sin crear páginas de puerta.
3. Verificar y reforzar Google Business Profile, NAP, reseñas auténticas, enlaces de identidad y medición en Search Console/Bing/GA4.
4. Crear contenido de experiencia demostrable y útil para las intenciones de emergencia, traslados, rescate y cobertura real; no únicamente variantes de “grúas + ciudad”.
5. Medir CWV y conversiones en producción antes de seguir optimizando microdetalles de rendimiento.

## Metodología, evidencia y límites

Se revisaron las rutas, layouts, componentes, CSS, datos editoriales, JSON-LD, metadatos, sitemap, robots, `next.config.ts`, manifest, activos públicos, dependencias y documentación del repositorio. Se ejecutaron estas comprobaciones locales:

- `npm.cmd run lint`: correcto, sin errores.
- `npm.cmd run build`: correcto. Next.js 16.2.11 prerenderizó las rutas estáticas y SSG esperadas.
- Sitemap compilado: 18 URL canónicas de negocio y ninguna URL de 404, parámetros o previews.
- Robots compilado: permite el rastreo global y declara el sitemap canónico.

No se pudo obtener la respuesta HTTP pública de `www.gruaszamoramoya.com` desde el entorno de auditoría. Por tanto, no se afirma como verificado en producción el estado HTTP, redirecciones reales, cabeceras finales, indexación, datos de Search Console, Analytics, Core Web Vitals de campo, Google Business Profile ni valores de variables de entorno de Vercel. Cada hallazgo que depende de ellos se marca explícitamente como validación pendiente.

La búsqueda exploratoria muestra que los resultados nacionales compiten con sitios que comunican cobertura 24/7, plataforma/arrastre, rescate, teléfonos visibles, FAQ y, en algunos casos, amplia red de unidades. Eso no demuestra rankings ni calidad de esos competidores; sirve para identificar el estándar de contenido que el usuario verá en el SERP.

## Inventario y estado actual

| Área | Estado comprobado | Observación |
| --- | --- | --- |
| Arquitectura | Bueno | 18 URL comerciales estáticas; la profundidad máxima es baja gracias al footer y enlaces contextuales. |
| Indexabilidad en código | Bueno | Canónicas, sitemap, robots y rutas conocidas están alineados al dominio `www`. |
| SEO local | Parcial | Grecia y Occidente son fuertes en contenido; Río Cuarto y varias zonas nacionales prioritarias carecen de landing propia. |
| Contenido | Parcial | Hay contenido específico de rutas y distritos, pero una FAQ extensa se replica en todas las landings locales. |
| Schema | Parcial | `LocalBusiness`/`AutomotiveBusiness`, `Service`, `BreadcrumbList`, `WebSite`, `ItemList` y `FAQPage` están presentes. Falta depurar su uso y validar datos externos. |
| GEO | Parcial | HTML semántico y respuestas visibles favorecen extracción; faltan autoridad externa, frescura, contenido citable original y un manifiesto editorial para IA. |
| Rendimiento | Bueno en diseño; no medido en campo | SSG, `next/image`, AVIF/WebP, fuentes optimizadas y pocos terceros. No hay RUM/CWV ni prueba Lighthouse de producción. |
| Accesibilidad | Bueno en código | Landmarks, skip link, `details/summary`, `alt`, foco visible y reducción de movimiento. Requiere prueba manual de contraste, teclado y lector de pantalla. |
| Medición | Insuficiente | GA/GTM son opcionales; no hay eventos de CTA ni confirmación de que estén configurados. |

## Hallazgos positivos que se deben conservar

- Todas las URL de negocio conocidas se generan de manera estática (`dynamicParams = false`) y el contenido principal existe en el HTML inicial. Esto es favorable para Google, Bing y agentes que no ejecutan JavaScript completo.
- Cada página revisada tiene una sola intención principal y un único `h1`; las rutas de servicio y zona generan título, descripción, Open Graph y canonical propios.
- `metadataBase`, sitemap, robots y `@id` de JSON-LD consumen la misma fuente de dominio (`lib/site.ts`). Es una buena defensa contra inconsistencias de host.
- El sitemap contiene URL canónicas y fechas explícitas, sin `priority` ni `changefreq` irrelevantes.
- El sitio no bloquea GPTBot, PerplexityBot, ClaudeBot, Google-Extended ni Bingbot: la regla global de robots permite el rastreo.
- Las fotos principales usan `next/image`, tamaños responsivos, AVIF/WebP, caché prolongada y `priority` solamente en el hero de cada página.
- Las FAQ son texto visible con `details/summary` nativo, no contenido inyectado al interactuar. Esto es accesible y extraíble.
- Las páginas de zona contienen rutas, puntos de referencia, vecinos y enlaces internos; no son únicamente un título con el nombre de la ciudad.
- No se detectaron dependencias de analítica obligatorias, formularios pesados, mapas embebidos, vídeos ni imágenes remotas que compitan con el LCP por defecto.

---

## Hallazgos críticos y de alta prioridad

### F-01 — `FAQPage` duplicado entre las 14 landings de zona

**Problema**  
Cada ruta de zona construye su `FAQPage` con tres preguntas locales más las diez preguntas generales (`[...zoneFaqs(zone), ...FAQS]`). Por tanto, las mismas diez preguntas/respuestas y el mismo marcado se publican en catorce URL distintas. La propia documentación de `lib/faq.ts` reconoce el riesgo, pero la implementación actual lo vuelve a introducir. También se repite visible el bloque general de FAQ en cada landing.

**Impacto**  
Alta probabilidad de similitud editorial innecesaria entre páginas que deben competir por localidades diferentes. Debilita la señal de unicidad de las landings y puede hacer que Google elija otra canónica o no valore las páginas como la mejor respuesta local. Para IA se multiplican pasajes idénticos sin aportar una fuente más útil. Además, un negocio local común normalmente no es elegible para resultados enriquecidos FAQ, por lo que no compensa la repetición.

**Prioridad**  
Crítica.

**Dificultad**  
Media.

**Beneficio esperado**  
Landings más diferenciadas, mejor concentración semántica por localidad y menor riesgo de contenido casi duplicado.

**Cómo solucionarlo**  
Mantener el bloque FAQ general y su `FAQPage` solamente en la página canónica que realmente lo desarrolla, preferiblemente la portada o una página de ayuda. En cada landing local publicar solo preguntas cuya respuesta cambie de forma material según la zona, con datos verificables: cobertura concreta, rutas, restricciones de acceso, tipo de rescate frecuente, áreas rurales y proceso de despacho. Si se conserva una pregunta general por utilidad, enlazar a la respuesta canónica en vez de copiar la respuesta completa. Validar que todo JSON-LD siga reflejando exactamente contenido visible en esa URL.

**Archivos afectados**  
`app/[zona]/page.tsx`, `lib/faq.ts`, `lib/schema.ts`.

**Dependencias**  
Confirmar con operaciones qué información local es real y sostenible para cada zona.

### F-02 — Río Cuarto no tiene URL, contenido ni entidad de cobertura propia

**Problema**  
Río Cuarto es una localidad objetivo explícita, pero no existe en `ZONES`, en el sitemap, en la navegación, en `areaServed` ni en el contenido principal. Las rutas generadas cubren Grecia, Occidente, Costa Rica, Alajuela, Naranjo, Sarchí, Palmares, San Ramón, Atenas, Poás, Zarcero, San José, Heredia y Cartago.

**Impacto**  
No existe una URL que concentre la intención “grúas Río Cuarto”, “grúa Río Cuarto” o rescate en sus rutas de acceso. La página nacional no aporta suficiente relevancia local para competir de forma consistente en esa consulta.

**Prioridad**  
Alta.

**Dificultad**  
Media.

**Beneficio esperado**  
Cobertura indexable de una localidad prioritaria y una entidad geográfica adicional en el grafo interno y en schema.

**Cómo solucionarlo**  
Crear una landing solo si la empresa realmente despacha allí y puede documentar cobertura útil y distinta: distritos/rutas reales, origen de despacho, tipo de unidad apropiada, condiciones de viaje y preguntas específicas. Enlazarla desde Grecia, Occidente, zonas vecinas, footer y sitemap. No reutilizar una página de Zarcero o San Ramón cambiando el topónimo.

**Archivos afectados**  
`lib/zones.ts`, `app/[zona]/page.tsx`, `app/sitemap.ts`, `components/sections/Coverage.tsx`, `components/layout/Footer.tsx`, `components/layout/Header.tsx`, `lib/schema.ts`.

**Dependencias**  
Validar cobertura comercial real, rutas atendidas y tiempo de desplazamiento antes de publicar.

### F-03 — Cobertura nacional declarada sin arquitectura suficiente para las provincias objetivo

**Problema**  
El sitio afirma atender todo Costa Rica y nombra Guanacaste, Puntarenas y Limón, pero no tiene URL propia para estas provincias. También falta una decisión explícita sobre municipios/ciudades nacionales de mayor demanda. San José, Heredia y Cartago tienen páginas de provincia, no páginas por ciudad/cantón, lo que puede no coincidir con la intención geolocalizada del usuario.

**Impacto**  
La relevancia de “grúas Guanacaste”, “grúas Puntarenas” y “grúas Limón” queda concentrada en una sección breve del home y en la página nacional. Esto es insuficiente frente a competidores que exponen cobertura, servicios y contacto por territorio. Crear páginas automáticamente sin prueba local tendría el efecto contrario: riesgo de páginas puerta y contenido escalado de bajo valor.

**Prioridad**  
Alta.

**Dificultad**  
Alta.

**Beneficio esperado**  
Mayor cobertura semántica nacional sin sacrificar calidad ni confianza.

**Cómo solucionarlo**  
Definir un mapa de demanda y capacidad. Priorizar primero las zonas con servicios reales, volumen de llamadas o rutas frecuentes. Cada página debe resolver una necesidad distinta: rutas de ingreso, tipo de traslado frecuente, cobertura rural, coordinación de traslados largos, talleres/destinos conocidos solo si la relación es verificable, y expectativas honestas de despacho. Para territorios donde solo se coordinan traslados programados, indicarlo claramente y no prometer respuesta local inmediata. Publicar páginas de provincia antes que decenas de cantones; abrir cantones únicamente cuando haya evidencia diferenciadora.

**Archivos afectados**  
`lib/zones.ts`, `app/[zona]/page.tsx`, `app/sitemap.ts`, `components/sections/Coverage.tsx`, `components/layout/Footer.tsx`, `lib/schema.ts`.

**Dependencias**  
Investigación de demanda, capacidad operativa, documentación de rutas y aprobación comercial.

### F-04 — Las plantillas locales aún presentan riesgo de “página de puerta” a escala

**Problema**  
Todas las zonas usan la misma composición: hero, lugares, rutas, dos bloques editoriales, dos servicios, checklist, vecinos, FAQ y CTA. El contenido de rutas y lugares es un diferenciador real, pero la estructura, la promesa, las CTA, los servicios, los beneficios y gran parte de la FAQ son uniformes. Al ampliar la lista de zonas sin elevar la proporción de información única, el riesgo crece.

**Impacto**  
Google puede interpretar un conjunto creciente de páginas geográficas como creadas para capturar variantes de consulta más que para resolver necesidades locales. Esto afecta SEO local y GEO: los modelos prefieren páginas con respuestas específicas, no sustituciones sistemáticas de nombres.

**Prioridad**  
Alta.

**Dificultad**  
Alta.

**Beneficio esperado**  
Escalabilidad editorial sana y mayor probabilidad de que cada URL conserve valor indexable propio.

**Cómo solucionarlo**  
Antes de añadir zonas, fijar un umbral editorial: una página nueva debe contener información operacional exclusiva, ejemplos de escenarios de esa localidad, rutas y restricciones verificadas, respuesta directa a la intención más común y enlaces contextuales únicos. Variar la arquitectura solo cuando la intención lo justifique; por ejemplo, una página de rescate en montaña no debe tener el mismo contenido que una página de traslado urbano. Mantener una hoja de control de similitud y revisar las páginas tras cada expansión.

**Archivos afectados**  
`lib/zones.ts`, `app/[zona]/page.tsx`, `lib/faq.ts`, `components/sections/FinalCta.tsx`.

**Dependencias**  
F-01, inventario de servicios realmente prestados y proceso editorial con revisión humana.

### F-05 — Falta evidencia externa y operativa para ganar el paquete local de Google

**Problema**  
El código permite enlazar Google Business Profile mediante una variable, pero la compilación local no contiene ese valor y el repositorio no puede demostrar que el perfil exista, esté verificado, use el mismo NAP, tenga categoría correcta, horario 24/7, reseñas, fotos, publicaciones y enlaces consistentes. Tampoco hay evidencia de citas locales o directorios fiables.

**Impacto**  
Para consultas como “grúas cerca de mí” y “grúas Grecia”, el paquete local y Google Maps suelen aparecer antes de los resultados orgánicos. El sitio por sí solo no puede colocar al negocio en ese paquete. Sin entidad consistente, reseñas reales y señales de proximidad, el objetivo de ser número uno es improbable aunque el HTML sea perfecto.

**Prioridad**  
Crítica.

**Dificultad**  
Media.

**Beneficio esperado**  
Mayor visibilidad en Maps, confianza, conversiones por llamada y consolidación de la entidad de negocio.

**Cómo solucionarlo**  
Auditar y verificar el perfil: nombre legal usado de forma consistente, categoría primaria precisa, teléfono, URL canónica, área de servicio, horario, atributos, fotos originales periódicas y respuestas a reseñas. Solicitar reseñas auténticas después de servicios reales sin incentivos ni plantillas manipuladoras. Alinear Facebook, Instagram, Waze, directorios empresariales y cualquier perfil de aseguradoras o talleres solo cuando sea verdadero. Añadir el enlace público del perfil al sitio una vez validado.

**Archivos afectados**  
`lib/site.ts`, `.env.example`, `lib/schema.ts`; además Google Business Profile y perfiles externos.

**Dependencias**  
Propiedad del perfil, verificación de NAP y autorización de la empresa para gestionar reputación.

### F-06 — Datos NAP, coordenadas y radio de servicio necesitan verificación documental

**Problema**  
El schema usa “Grecia, Alajuela, Costa Rica”, coordenadas del centro de Grecia y un radio fijo de 200 000 metros. No hay calle, código postal ni prueba en el repositorio de que el punto geográfico sea la base exacta o de que ese círculo describa toda la cobertura. Una empresa de área de servicio no debe publicar una dirección que no atiende al público, pero tampoco debe inventar precisión geográfica.

**Impacto**  
Datos inconsistentes entre web, perfil de Google y directorios reducen confianza de entidad. Un radio que no representa la operación puede contradecir el mensaje “todo Costa Rica” o inducir a resultados/expectativas incorrectas.

**Prioridad**  
Alta.

**Dificultad**  
Baja.

**Beneficio esperado**  
Mejor coherencia de entidad y menor riesgo de señales locales contradictorias.

**Cómo solucionarlo**  
Confirmar qué formato de ubicación debe ser público según el modelo de negocio: dirección real visible si reciben clientes, o negocio de área de servicio con la dirección oculta en Google si no la reciben. Usar únicamente coordenadas verificadas de la base si se decide exponerlas. Sustituir o eliminar el radio si no representa todo el territorio servido y mantener `areaServed` como declaración de cobertura real. Replicar exactamente nombre, teléfono, correo y URL en todas las fichas externas.

**Archivos afectados**  
`lib/site.ts`, `lib/schema.ts`, `components/layout/Header.tsx`, `components/layout/Footer.tsx`, `components/sections/Coverage.tsx`, Google Business Profile.

**Dependencias**  
Validación de dirección, modelo de atención y cobertura por parte del propietario.

### F-07 — No hay prueba de reputación, experiencia verificable ni autoría

**Problema**  
El sitio declara 30+ años, pólizas del INS y factura electrónica, pero no aporta pruebas, autor/operador responsable, historia identificable, certificaciones verificables, testimonios reales, políticas de servicio ni una página que explique cómo se maneja un traslado. Las fotografías parecen propias, lo cual es valioso, pero no están contextualizadas con fecha, caso o crédito.

**Impacto**  
E-E-A-T y GEO dependen de que las afirmaciones sean confiables y citablemente específicas. En una categoría donde existe preocupación por estafas y daños, la falta de prueba puede reducir conversión y la predisposición de buscadores/IA a tratar el sitio como fuente confiable.

**Prioridad**  
Alta.

**Dificultad**  
Media.

**Beneficio esperado**  
Más confianza, diferenciación frente a páginas genéricas y mejor material para citas de IA.

**Cómo solucionarlo**  
Crear una sección de confianza basada solo en hechos documentables: quién atiende, trayectoria y metodología, qué significa estar asegurado, qué se confirma antes de despachar, protocolos para vehículos eléctricos/de lujo y cómo se emite factura. Añadir testimonios solo con consentimiento y contexto suficiente; no usar `Review` ni `AggregateRating` hasta que se puedan declarar de forma legítima y conforme a las políticas de Google. Publicar fotos propias con descripción de servicio real cuando la privacidad del cliente lo permita.

**Archivos afectados**  
`components/sections/About.tsx`, `components/sections/Trust.tsx`, `components/sections/Fleet.tsx`, `lib/faq.ts`, nuevas rutas de contenido, `lib/schema.ts` si se habilitan datos demostrables.

**Dependencias**  
Evidencia documental, consentimiento de clientes y validación jurídica/comercial de las afirmaciones.

### F-08 — La propuesta “asistencia en carretera” y “traslado de vehículos” no está mapeada con precisión a la oferta real

**Problema**  
El objetivo de negocio incluye asistencia en carretera, traslado y transporte de vehículos. El catálogo declara deliberadamente solo plataforma y arrastre; no confirma si el negocio ofrece cambio de llanta, batería, combustible, apertura o asistencia distinta al remolque. Algunas consultas objetivo podrían esperar esas prestaciones.

**Impacto**  
Una página que intente cubrir intenciones de asistencia que no puede cumplir generará mala experiencia y reseñas negativas. Por el contrario, si sí se ofrecen traslados programados, motos, eléctricos, flotillas o rescates específicos y no se explican, hay pérdida de cobertura semántica y comercial.

**Prioridad**  
Alta.

**Dificultad**  
Media.

**Beneficio esperado**  
Mejor correspondencia entre consultas, promesa, llamada entrante y conversión.

**Cómo solucionarlo**  
Construir un inventario firmado de servicios, exclusiones, tipos de vehículos, peso/capacidad, rutas y horarios. Mapear una intención principal por URL. Si no se ofrece asistencia ligera, explicarlo claramente: se atienden remolque, rescate y traslado, no todos los servicios de mecánica de carretera. Si el traslado programado es real y relevante, darle contenido propio con proceso, condiciones y cobertura, no una mera mención.

**Archivos afectados**  
`lib/services.ts`, `lib/faq.ts`, `components/sections/Services.tsx`, `app/servicios/page.tsx`, `app/servicios/[servicio]/page.tsx`, `lib/schema.ts`.

**Dependencias**  
Confirmación operativa de la oferta y criterios de despacho.

### F-09 — Falta un plan de medición de conversiones y rendimiento orgánico

**Problema**  
GA4/GTM y las verificaciones de Google/Bing solo se cargan si existen variables de entorno. Los CTA incluyen atributos `data-cta`, pero no hay implementación de eventos para llamadas, WhatsApp, navegación a servicio/zona o profundidad. El repositorio tampoco contiene integración de Search Console, Bing Webmaster Tools, Core Web Vitals o un tablero de consultas locales.

**Impacto**  
No será posible saber si una mejora aumenta llamadas, si las landings canibalizan consultas, qué zona convierte, ni si IA/Google traen sesiones de calidad. Sin datos, el roadmap se convierte en opinión y se corre el riesgo de optimizar páginas que no generan negocio.

**Prioridad**  
Alta.

**Dificultad**  
Media.

**Beneficio esperado**  
Decisiones basadas en llamadas/WhatsApp, detección de oportunidades y prueba de ROI SEO.

**Cómo solucionarlo**  
Configurar una sola ruta de analítica —GTM o GA4 directo, no ambas en paralelo— y verificar producción. Definir eventos de intención con parámetros de página/zona/servicio: clic de llamada, clic de WhatsApp, correo, apertura de instrucciones, navegación a una landing y conversión confirmada cuando sea posible. Vincular Search Console, Bing Webmaster Tools y GA4. Registrar mensualmente impresiones, posición, CTR, llamadas, consultas con “Grecia”, cobertura nacional y referencias de IA.

**Archivos afectados**  
`components/Analytics.tsx`, `components/ui/CallButton.tsx`, `components/layout/FloatingContact.tsx`, `app/layout.tsx`, `.env.example`; configuraciones externas de GA4, GTM, Search Console y Bing.

**Dependencias**  
Consentimiento/privacidad aplicable, propiedad de cuentas y definición de conversiones.

### F-10 — No existe medición real de Core Web Vitals ni validación del HTML/headers de producción

**Problema**  
La arquitectura favorece rendimiento, pero el repositorio no entrega datos de campo, Web Vitals, PageSpeed Insights, Lighthouse móvil, TTFB regional, cache headers finales ni pruebas de redirección. La documentación contiene cifras históricas de peso, pero no prueba que representen el despliegue actual. La URL pública no fue accesible desde este entorno, por lo que tampoco pudo verificarse la respuesta final.

**Impacto**  
LCP, INP, CLS, TTFB y datos de indexación son propiedades de la experiencia desplegada, no del código fuente. Un CDN, la configuración de Vercel, fuentes, scripts de medición, caché o una imagen transformada pueden alterar el resultado sin que el repositorio lo revele.

**Prioridad**  
Alta.

**Dificultad**  
Media.

**Beneficio esperado**  
Prevención de regresiones y priorización correcta de optimizaciones de rendimiento.

**Cómo solucionarlo**  
Establecer una línea base móvil y desktop con PageSpeed Insights/WebPageTest para inicio, una página de zona y una página de servicio. Validar respuesta 200, canonical, robots meta, HSTS, CSP, `Cache-Control`, compresión y cadena HTTP→HTTPS/www. Incorporar RUM o reporte de Web Vitals y revisar el informe CWV de Search Console después de acumular datos. Definir presupuestos de JS, imagen LCP y terceros que bloqueen despliegues regresivos.

**Archivos afectados**  
`next.config.ts`, `app/layout.tsx`, `components/Analytics.tsx`, `components/sections/Hero.tsx`, `components/sections/PageHero.tsx`, configuración de Vercel y herramientas externas.

**Dependencias**  
Acceso a producción, Search Console y una URL pública accesible.

---

## Hallazgos de prioridad media

### F-11 — FAQ schema está implementado, pero su expectativa de rich result es incorrecta

**Problema**  
El código comenta que `FAQPage` habilita el acordeón en resultados. En la práctica, Google restringe visualmente los FAQ rich results a sitios de salud y gobierno bien conocidos; una empresa de grúas no debe planificar tráfico sobre ese resultado enriquecido. El schema sigue pudiendo ayudar a describir contenido, pero no garantiza presentación especial.

**Impacto**  
Riesgo de dedicar esfuerzo a un beneficio SERP improbable y de mantener marcado excesivo o duplicado por una expectativa incorrecta.

**Prioridad**  
Media.

**Dificultad**  
Baja.

**Beneficio esperado**  
Decisiones SEO más realistas y menor sobreuso de schema.

**Cómo solucionarlo**  
Mantener FAQ visibles por utilidad para el usuario y extracción por IA, pero tratar el marcado como una descripción semántica, no como mecanismo de CTR garantizado. Emitirlo únicamente donde las preguntas son contenido principal, son únicas y se responden por completo. Verificar con Rich Results Test y Schema Markup Validator tras cualquier cambio.

**Archivos afectados**  
`lib/schema.ts`, `lib/faq.ts`, `app/page.tsx`, `app/[zona]/page.tsx`.

**Dependencias**  
F-01.

### F-12 — Schema puede expresar mejor la relación entre página, negocio, servicio e imagen

**Problema**  
Los tipos principales están bien elegidos, pero las entidades de `Service` y FAQ no tienen `@id` estable, no enlazan explícitamente una `WebPage`/`mainEntityOfPage`, y las imágenes no se describen como `ImageObject`. No hay una estrategia de identidad por página más allá de URL y proveedor. No es un requisito para indexar, pero limita la precisión semántica.

**Impacto**  
Las máquinas pueden entender el sitio, aunque con menos conexiones explícitas entre página, oferta, proveedor e imagen. En GEO, una entidad consistente y enlazada reduce ambigüedad, especialmente por los homónimos de marca señalados en el propio código.

**Prioridad**  
Media.

**Dificultad**  
Media.

**Beneficio esperado**  
Mejor desambiguación de la empresa y mayor legibilidad de las páginas por sistemas automatizados.

**Cómo solucionarlo**  
Modelar cada URL importante como `WebPage` con URL/canonical, idioma y entidad principal; dar IDs estables a servicio y página; relacionar el servicio con el negocio proveedor y la imagen principal solo si esta se describe correctamente. No añadir `Product`, `AggregateRating`, `Review` o precios falsos: no son aplicables sin oferta/producto/reseñas verificables.

**Archivos afectados**  
`lib/schema.ts`, `app/page.tsx`, `app/servicios/page.tsx`, `app/servicios/[servicio]/page.tsx`, `app/[zona]/page.tsx`.

**Dependencias**  
Verificar NAP, oferta real y derechos/propiedad de las imágenes.

### F-13 — La cobertura editorial no cubre suficientes preguntas transaccionales y de seguridad

**Problema**  
Hay buena explicación de plataforma, arrastre y seguridad, pero faltan respuestas canónicas y fácilmente encontrables para intención alta: cómo cotizar un traslado programado, qué datos enviar por WhatsApp, qué vehículos/cargas se aceptan, qué documentación se solicita, qué hacer tras un accidente, cómo se coordina con aseguradora si aplica, y límites de la asistencia. La FAQ de precio evita dar una orientación incluso cuando podría explicarse una estructura tarifaria real.

**Impacto**  
Se pierden consultas long-tail, preguntas de IA y confianza antes de llamar. También crece el volumen de llamadas no calificadas si no se aclara la elegibilidad del servicio.

**Prioridad**  
Media.

**Dificultad**  
Media.

**Beneficio esperado**  
Mayor cobertura semántica, respuesta directa y tasa de conversión más cualificada.

**Cómo solucionarlo**  
Crear una guía canónica de “qué hacer y qué información enviar al pedir una grúa”, más una guía de traslado programado si se presta. Cada sección debe comenzar con una respuesta breve y autosuficiente, seguida de detalle práctico. Añadir precios orientativos únicamente si son reales, vigentes y se pueden mantener; si no, explicar de manera concreta los factores que cambian la cotización y qué recibirá el cliente antes del despacho.

**Archivos afectados**  
`lib/faq.ts`, `components/sections/EmergencySteps.tsx`, `app/servicios/page.tsx`, nuevas rutas de contenido y `app/sitemap.ts`.

**Dependencias**  
F-08 y validación comercial de precios, capacidad y protocolos.

### F-14 — Faltan señales explícitas de actualización y gobernanza editorial

**Problema**  
El sitemap usa fechas fijas correctas en principio, pero no hay fecha visible de última revisión, propietario editorial, proceso de actualización ni control de caducidad para datos como horarios, pagos, cobertura, protocolos o rutas. Las respuestas de FAQ dan impresiones de actualidad sin fecha.

**Impacto**  
Los sistemas de IA y los usuarios no pueden evaluar fácilmente la vigencia. Si cambia la operación y no se actualizan todas las fuentes, aparecen contradicciones NAP/contenido/schema.

**Prioridad**  
Media.

**Dificultad**  
Baja.

**Beneficio esperado**  
Más confianza, menor contenido desactualizado y `lastmod` útil para rastreo.

**Cómo solucionarlo**  
Establecer un responsable y una revisión trimestral de páginas comerciales, FAQ, cobertura, datos de contacto y schema. Mostrar una fecha de actualización solo donde se pueda mantener honesta. Actualizar `lastmod` por tipo de contenido únicamente cuando el contenido cambie de verdad y conservar un registro editorial.

**Archivos afectados**  
`app/sitemap.ts`, `lib/site.ts`, `lib/services.ts`, `lib/zones.ts`, `lib/faq.ts`, componentes de contenido.

**Dependencias**  
Proceso interno de revisión y dueño del contenido.

### F-15 — La gestión de fuentes es buena para runtime, pero fragiliza builds aislados

**Problema**  
`next/font/google` autohospeda fuentes en el resultado final, pero necesita descargarlas durante una compilación que no tenga caché. El build local falló inicialmente al no poder contactar Google Fonts y solo se completó después de permitir red. Esto no afecta la carga del usuario una vez desplegado, pero sí puede detener builds en redes restringidas.

**Impacto**  
Riesgo operativo de despliegue y de recuperación, no un problema de Core Web Vitals por sí mismo. Una compilación interrumpida puede retrasar correcciones SEO urgentes.

**Prioridad**  
Media.

**Dificultad**  
Media.

**Beneficio esperado**  
Despliegues reproducibles y menos dependencia de terceros durante build.

**Cómo solucionarlo**  
Definir una política de build con acceso saliente confiable o evaluar cargar archivos de fuente legalmente obtenidos desde el repositorio si la infraestructura exige compilaciones aisladas. Mantener `font-display: swap`, limitar pesos usados y medir el efecto antes de cambiar la solución actual.

**Archivos afectados**  
`app/layout.tsx`, proceso CI/CD, documentación de despliegue.

**Dependencias**  
Decisión de infraestructura y licenciamiento de fuentes.

### F-16 — No se reportan Web Vitals ni se limita el coste de la hidratación visual

**Problema**  
`Header`, `FloatingContact`, `Reveal` y `CountUp` son componentes cliente. En páginas extensas hay decenas de instancias de `Reveal`, cada una crea un `IntersectionObserver`. Es una elección razonable para animaciones, pero no existe medición para demostrar que no afecta INP, batería o CPU en móviles de gama baja.

**Impacto**  
El contenido sigue presente en HTML y no hay bloqueo de indexación, pero la hidratación/animación puede perjudicar la interacción bajo condiciones reales. Sin RUM no se puede afirmar que el diseño cumple INP.

**Prioridad**  
Media.

**Dificultad**  
Media.

**Beneficio esperado**  
Menor JavaScript de cliente o una optimización informada por datos, sin degradar la experiencia.

**Cómo solucionarlo**  
Medir primero. Si hay evidencia de impacto, centralizar observación de elementos, reducir animaciones en bloques no críticos, respetar `prefers-reduced-motion` —ya existe— y mantener visible el contenido sin JS. Verificar especialmente home y landings de zona en CPU/red móvil simulada.

**Archivos afectados**  
`components/ui/Reveal.tsx`, `components/ui/CountUp.tsx`, `components/layout/Header.tsx`, `components/layout/FloatingContact.tsx`, `app/globals.css`.

**Dependencias**  
F-10 y datos de dispositivos reales.

### F-17 — Falta una estrategia explícita de presencia y citación para IA

**Problema**  
El sitio es extraíble: HTML SSR, encabezados, FAQ, schema y NAP. No obstante, no hay plan para que terceros fiables describan a la empresa ni contenido original citable con hechos propios. Tampoco existe `llms.txt` u otra síntesis de negocio para agentes no-Google. Este archivo no es requisito de Google ni garantiza aparecer en ChatGPT/Claude/Perplexity.

**Impacto**  
La visibilidad en IA no se obtiene solo publicando schema. ChatGPT, Perplexity, Copilot y otros seleccionan fuentes por relevancia, autoridad, indexación y presencia externa. Sin fuentes independientes, la empresa tendrá menos probabilidades de ser mencionada o citada frente a marcas con perfiles, reseñas, medios y referencias locales.

**Prioridad**  
Media.

**Dificultad**  
Media.

**Beneficio esperado**  
Mayor claridad de entidad y opciones reales de aparecer como fuente, sin tácticas de spam.

**Cómo solucionarlo**  
Priorizar primero SEO y perfil local. Después crear activos de utilidad humana: guía de seguridad vial con fuentes oficiales, protocolo de traslado de eléctricos revisado por un técnico/fabricante, glosario de plataforma/under-lift y páginas de proceso. Conseguir menciones genuinas en directorios, comunidades y aliados relevantes, no enlaces masivos. Como capa opcional, publicar un `llms.txt` breve y mantenido que describa negocio, cobertura, contactos y URLs canónicas; no duplicar contenido ni crear una versión “para IA”.

**Archivos afectados**  
Nueva ruta/archivo público para `llms.txt`, `lib/site.ts`, contenido editorial nuevo, perfiles externos.

**Dependencias**  
F-05, F-07, F-14 y aprobación editorial.

### F-18 — La intención “cerca de mí” depende de proximidad y Maps, no de una keyword en la página

**Problema**  
El negocio quiere competir por “grúas cerca de mí”. El sitio comunica Grecia y cobertura nacional, pero no puede decidir la ubicación del buscador ni sustituir el ranking de Maps. No debe crear una landing “cerca de mí” ni repetir la frase de forma artificial.

**Impacto**  
Una estrategia que intente resolver esta intención con keyword stuffing desperdiciará contenido y puede debilitar calidad. La oportunidad real está en proximidad, perfil local, categoría, disponibilidad, reputación y dirección/área de servicio correctas.

**Prioridad**  
Media.

**Dificultad**  
Baja.

**Beneficio esperado**  
Estrategia local alineada con cómo funcionan resultados geolocalizados.

**Cómo solucionarlo**  
Optimizar Google Business Profile, NAP, reseñas, fotos, respuestas y consistencia geográfica. Mantener en el sitio una declaración humana de base en Grecia y cobertura real, con tiempos de llegada honestos. Segmentar páginas por zonas con valor operacional, no por la frase “cerca de mí”.

**Archivos afectados**  
Google Business Profile, `lib/site.ts`, `components/sections/Coverage.tsx`, `lib/zones.ts`.

**Dependencias**  
F-05 y F-06.

### F-19 — Falta una página/flujo de contacto informativo que refuerce confianza y rastreabilidad

**Problema**  
Hay CTA de llamada, WhatsApp, email y una CTA final en todas las páginas, pero no existe una URL de contacto indexable con NAP, horario, cobertura, instrucciones de contacto, tratamiento de datos o preguntas previas. Para una urgencia el CTA directo es correcto, pero una página persistente sirve a usuarios que comparan, a directorios y a agentes que necesitan verificar la entidad.

**Impacto**  
Se reduce una señal de transparencia y se pierde una URL natural para enlaces de perfiles externos. La ausencia no bloquea el posicionamiento, pero limita E-E-A-T y conversión informada.

**Prioridad**  
Media.

**Dificultad**  
Media.

**Beneficio esperado**  
Mejor confianza, una URL estable para citas y contenido útil antes de llamar.

**Cómo solucionarlo**  
Crear una página de contacto solo si se puede completar con información auténtica: teléfono, WhatsApp, correo, base o modelo de área de servicio, horario, qué datos enviar, enlaces sociales/GBP y política de privacidad si se recoge analítica o formularios. No añadir un formulario si la empresa no puede responderlo con rapidez; para emergencias mantener los CTA directos.

**Archivos afectados**  
Nueva ruta de contacto, `components/layout/Header.tsx`, `components/layout/Footer.tsx`, `components/sections/FinalCta.tsx`, `app/sitemap.ts`, `lib/schema.ts`.

**Dependencias**  
F-05, F-06 y decisión sobre privacidad/atención.

### F-20 — Documentación operativa del repositorio contiene afirmaciones obsoletas

**Problema**  
`README.md` menciona una barra fija de llamada cuando el código usa accesos flotantes condicionados por scroll; lista `app/opengraph-image.tsx` aunque no existe; describe un fallback histórico de dominio que ya no coincide con `lib/site.ts`; y cita imágenes que no están en el inventario actual. También presenta cifras de rendimiento sin fecha/entorno reproducible.

**Impacto**  
No afecta directamente a Google, pero puede inducir un despliegue o cambio SEO incorrecto, dificultar auditorías futuras y generar configuraciones canónicas equivocadas.

**Prioridad**  
Media.

**Dificultad**  
Baja.

**Beneficio esperado**  
Menos errores operativos y gobernanza SEO consistente.

**Cómo solucionarlo**  
Actualizar la documentación para reflejar rutas, imágenes, dominio por defecto, configuración de variables, comportamiento real de contacto y método/fecha de cualquier métrica. Declarar qué verificaciones solo se pueden hacer en Vercel/producción y quién es responsable de ellas.

**Archivos afectados**  
`README.md`, `.env.example`, `lib/site.ts`, `components/layout/FloatingContact.tsx`.

**Dependencias**  
Confirmación del dominio y del proceso de despliegue.

---

## Hallazgos de prioridad baja y controles preventivos

### F-21 — Verificar en producción la redirección de todos los hosts históricos y variantes

**Problema**  
`next.config.ts` redirige solo el host legado exacto `gruas-zamora.vercel.app` a `www.gruaszamoramoya.com`. No se pudo comprobar en vivo el comportamiento del apex, variantes `www`, previews, HTTP, slash final ni cualquier dominio adicional que haya apuntado al proyecto.

**Impacto**  
Si alguna variante responde 200 con el mismo contenido, se dividen señales canónicas y enlaces. Si un host no existe, no hay problema; debe verificarse, no asumirse.

**Prioridad**  
Baja.

**Dificultad**  
Baja.

**Beneficio esperado**  
Consolidación limpia de autoridad y menos URLs duplicadas.

**Cómo solucionarlo**  
Inventariar dominios y subdominios en Vercel/DNS, ejecutar pruebas HTTP de cada variante y conservar 301/308 de una sola etapa hacia el host y ruta canónicos. Mantener previews bloqueados de indexación por la plataforma, sin redirigir a ciegas aquellos que se usan para QA.

**Archivos afectados**  
`next.config.ts`, configuración de dominios y DNS en Vercel.

**Dependencias**  
Acceso a DNS/Vercel y listado de hosts históricos.

### F-22 — Validar CSP y cabeceras finales, no solo su declaración en fuente

**Problema**  
La configuración declara CSP, HSTS, `nosniff`, política de referencias y permisos. Es positivo, pero proxies, Vercel y reglas de dominio pueden sobrescribir, duplicar o alterar cabeceras en producción. La CSP permite `unsafe-inline` en scripts por necesidad funcional, por lo que no es una protección completa contra XSS.

**Impacto**  
Principalmente seguridad y estabilidad, con efecto SEO indirecto si se rompen imágenes, analítica o renderizado. No es una deficiencia de ranking detectada en el código.

**Prioridad**  
Baja.

**Dificultad**  
Baja.

**Beneficio esperado**  
Menos fallas silenciosas y validación de la postura de seguridad documentada.

**Cómo solucionarlo**  
Revisar cabeceras de inicio, servicio y zona en producción. Probar que GA/GTM configurado, imágenes optimizadas y JSON-LD no sean bloqueados. Mantener la CSP mínima necesaria y revisar cualquier tercero nuevo antes de añadirlo.

**Archivos afectados**  
`next.config.ts`, `components/Analytics.tsx`, configuración de Vercel.

**Dependencias**  
Acceso a producción y, si aplica, IDs reales de analítica.

### F-23 — No hay una política visible de privacidad pese a la posible analítica

**Problema**  
El sitio puede cargar GA4 o GTM y ofrece correo/WhatsApp, pero no hay página visible de privacidad, términos de uso ni política de cookies. La exigencia legal exacta depende de la operación y jurisdicción; el repositorio no permite evaluarla jurídicamente.

**Impacto**  
Es principalmente un riesgo de confianza, cumplimiento y medición; no un bloqueo técnico de SEO. Una empresa que pide contacto en una situación de urgencia se beneficia de explicar de forma breve cómo trata datos.

**Prioridad**  
Baja.

**Dificultad**  
Media.

**Beneficio esperado**  
Más confianza y una base más segura para analítica/formularios futuros.

**Cómo solucionarlo**  
Solicitar revisión legal local y publicar las políticas que correspondan al tratamiento real de datos. Enlazarlas desde el footer. Configurar consentimiento solo si resulta obligatorio para las herramientas y públicos utilizados, sin impedir los CTA de emergencia.

**Archivos afectados**  
Nuevas rutas legales, `components/layout/Footer.tsx`, `components/Analytics.tsx` y configuración de analítica.

**Dependencias**  
Asesoramiento jurídico y confirmación de herramientas de seguimiento.

### F-24 — Las alt text son descriptivas, pero falta una gobernanza de activos y derechos

**Problema**  
Las ocho imágenes públicas están en JPG de 276 KB a 1.36 MB antes de optimización. La entrega con `next/image` mitiga el peso en página, y los `alt` son detallados. No existe, sin embargo, un inventario de derechos, fecha, lugar, persona responsable y si cada foto puede mostrar vehículos de clientes.

**Impacto**  
Riesgo de confianza, privacidad y mantenimiento. Para SEO de imágenes y GEO, fotos originales con contexto verificable son más valiosas que archivos sin procedencia.

**Prioridad**  
Baja.

**Dificultad**  
Baja.

**Beneficio esperado**  
Mejor reutilización de fotos propias y menor riesgo de retirar activos importantes.

**Cómo solucionarlo**  
Mantener un inventario interno por imagen: origen, fecha aproximada, permiso, servicio, localidad y versión optimizada. Escribir alt que describa fielmente la imagen, sin forzar topónimos. Conservar imágenes principales existentes mientras se prueban sustituciones para no afectar LCP.

**Archivos afectados**  
`public/`, `components/sections/Hero.tsx`, `components/sections/Fleet.tsx`, `components/sections/About.tsx`, `lib/services.ts`.

**Dependencias**  
Confirmación de derechos y privacidad de fotografías.

### F-25 — No hace falta `hreflang`, `SearchAction` ni schema de producto en el estado actual

**Problema**  
No hay versiones lingüísticas ni un buscador interno, y los servicios no se venden como productos con precio/transacción pública. Implementar `hreflang`, `SearchAction` o `Product` sin una contraparte real sería marcado decorativo.

**Impacto**  
Ninguno negativo actual. El riesgo sería añadir schema inválido para perseguir rich results inexistentes.

**Prioridad**  
Baja.

**Dificultad**  
Baja.

**Beneficio esperado**  
Evitar trabajo sin retorno y mantener el grafo de schema creíble.

**Cómo solucionarlo**  
Conservar `lang="es-CR"` y no añadir `hreflang` hasta que exista una versión en otro idioma con contenido completo, URL propia y demanda real. Añadir `SearchAction` únicamente si se incorpora un buscador funcional. Usar `Product` solo para productos reales con información pública pertinente.

**Archivos afectados**  
`app/layout.tsx`, `lib/schema.ts`, futuras rutas internacionales o de búsqueda.

**Dependencias**  
Cambio real de producto, idioma o funcionalidad.

### F-26 — Accesibilidad requiere una prueba manual posterior a la revisión de código

**Problema**  
El código implementa buena semántica, `main`, `nav`, foco visible, skip link, `aria-label` en iconos/CTA, alt y soporte de movimiento reducido. Aun así, no se puede confirmar mediante lectura de código el contraste en todos los estados, orden de foco real, menú móvil con lector de pantalla, targets táctiles, zoom al 200 %, ni renderizado bajo fallos de red.

**Impacto**  
Accesibilidad deficiente reduce conversión y limita el uso por agentes que leen el árbol de accesibilidad. También puede degradar señales de experiencia de usuario.

**Prioridad**  
Baja.

**Dificultad**  
Media.

**Beneficio esperado**  
Mejor acceso a un servicio de emergencia y detección de defectos que una auditoría estática no puede revelar.

**Cómo solucionarlo**  
Ejecutar una revisión manual móvil/desktop con teclado, lector de pantalla y zoom, complementada por Lighthouse/axe. Probar CTA flotantes ocultos, menú, acordeones, breadcrumbs, mensajes de 404 y foco después de navegar. Corregir solo incidencias verificadas, preservando la semántica nativa actual.

**Archivos afectados**  
`app/layout.tsx`, `components/layout/Header.tsx`, `components/layout/FloatingContact.tsx`, `components/sections/Faq.tsx`, `app/globals.css`.

**Dependencias**  
URL desplegada y dispositivos/navegadores de prueba.

---

## SEO on-page y mapa de intención recomendado

El sitio actual alinea bien título, H1, URL y contenido para Grecia, Occidente, Costa Rica y las zonas generadas. Debe conservar ese patrón sin llenar metadatos de palabras clave. La etiqueta `keywords` no impulsa ranking moderno; no perjudica en sí, pero no debe guiar la estrategia.

| Clúster | URL canónica propuesta | Intención | Requisito de unicidad |
| --- | --- | --- | --- |
| Grúas Grecia | `/gruas-grecia` | Urgencia local / respuesta desde base | Distritos, rutas, proceso de llegada, evidencia real de base. |
| Occidente | `/gruas-occidente` | Cobertura regional / rutas interurbanas | Comparar escenarios de montaña, cuestas y acceso a cantones. |
| Río Cuarto | Nueva URL solo si se atiende | Rescate/traslado local | Rutas, cobertura y operación realmente distintas. |
| Grúas Costa Rica | `/gruas-costa-rica` | Traslado nacional / coordinación | Explicar alcance, no prometer ETA local nacional. |
| Plataforma | `/servicios/grua-plataforma` | Método seguro / eléctricos / lujo | Instrucciones, aptitud por vehículo y limitaciones comprobables. |
| Arrastre y rescate | `/servicios/grua-arrastre` | Recuperación / accesos difíciles | Seguridad, escenarios, condiciones y límites operativos. |
| Traslado programado | Nueva URL si se presta | Cotización no urgente | Proceso, datos necesarios, destinos y reserva. |
| Guía de emergencia | Nueva URL editorial | “Qué hacer si…” | Información de seguridad con fuentes oficiales y autor/revisión. |

No crear páginas independientes para cada combinación “servicio + ciudad” hasta comprobar que se puede escribir contenido útil, distinto y real. La vinculación contextual entre una página local y un servicio ya existente suele ser suficiente como primera etapa.

## Evaluación GEO por plataforma

### Google AI Overviews y Gemini

La base correcta es la misma que SEO: accesibilidad de rastreo, contenido útil original, entidad local reconocible, reputación y ranking orgánico. No se necesita un archivo especial para aparecer. Priorizar perfiles locales, pruebas de experiencia y páginas que respondan completamente consultas reales. Evitar fragmentar texto o producir series masivas de páginas “para IA”.

### ChatGPT con búsqueda y Perplexity

El HTML estático, FAQ visibles, schema y datos directos ayudan a extracción. Falta aquello que vuelve una respuesta citable: fuentes externas, fecha/revisión, explicaciones originales, casos/criterios verificables y presencia de marca fuera del dominio. Un `llms.txt` puede ser una ayuda opcional para descubrimiento, nunca un sustituto de autoridad.

### Claude y Copilot

El sitio es navegable por enlaces HTML y tiene semántica razonable. Para Copilot, Bing Webmaster Tools y la salud de Bing son especialmente importantes; el código admite verificación pero no confirma que se haya configurado. Para Claude, la claridad, seguridad del contenido y menciones externas son más importantes que aumentar schema.

### Pautas GEO comunes

- Abrir cada sección importante con una respuesta directa y verificable.
- Mantener los hechos clave completos en el HTML: negocio, área atendida, horario, teléfono y proceso de despacho.
- Citar fuentes primarias cuando se den recomendaciones de seguridad, seguros o vehículos eléctricos.
- Distinguir hechos de promesas: no afirmar tiempos, tarifas, capacidades o relaciones sin poder cumplirlas y probarlas.
- Publicar contenido para personas; la claridad estructurada también favorece a los modelos.

## Competencia: patrón observado y respuesta estratégica

Los competidores nacionales encontrados comunican servicio 24/7, teléfono/WhatsApp inmediato, cobertura de provincias, plataforma y arrastre, rescate y FAQ. Algunos reclaman gran cantidad de unidades, asistencia ligera, flotas, precios claros o seguimiento. No se deben copiar afirmaciones de escala que Grúas Zamora Moya no pueda demostrar.

La oportunidad diferencial de Grúas Zamora Moya es más concreta: empresa de Grecia, conocimiento comprobable de Occidente, dos tipos de unidad explicados con precisión, fotos propias, 30 años si puede demostrarse, y claridad antes de despachar. Para ganar Grecia no hace falta parecer una red nacional enorme; hace falta ser la entidad local más verificable, reseñada, visible en Maps y útil en las rutas donde el cliente realmente queda varado.

## Validaciones obligatorias fuera del repositorio

1. Search Console: propiedad de dominio, sitemap enviado, páginas indexadas, inspección de `/gruas-grecia`, cobertura, canónicas seleccionadas, CWV y consultas por zona.
2. Bing Webmaster Tools: propiedad verificada, sitemap, rastreo y consultas; es relevante para Bing/Copilot.
3. Google Business Profile: verificación, categoría, NAP, área de servicio, horario, fotos, reseñas y enlace al sitio.
4. Rich Results Test y Schema Markup Validator: inicio, una zona y un servicio; revisar warnings y que JSON-LD visible coincida con la página.
5. PageSpeed Insights/WebPageTest: móvil y desktop para inicio, zona y servicio; registrar LCP, INP, CLS, TTFB, FCP, JS y LCP element.
6. HTTP: probar `http`, apex, `www`, dominio Vercel histórico, slash/no-slash y previews según inventario real.
7. SEO local: revisar NAP exacto en Facebook, Instagram, Maps, Waze, directorios y cualquier referencia de talleres/aseguradoras.
8. IA: ejecutar mensualmente un conjunto fijo de consultas en Google, ChatGPT, Perplexity, Gemini, Claude y Copilot; registrar menciones, citas y competidores, sin confundir una prueba aislada con un ranking estable.

---

## Roadmap priorizado

### Quick Wins (menos de 1 hora)

1. Quitar las FAQ generales del `FAQPage` de cada landing de zona y conservar únicamente FAQ propias de la zona.
2. Verificar el valor desplegado de `NEXT_PUBLIC_GOOGLE_BUSINESS_URL`, las verificaciones de Google/Bing y la analítica; no asumir que las variables locales reflejan Vercel.
3. Añadir Río Cuarto al backlog editorial con investigación operativa, sin publicarlo hasta validar cobertura.
4. Corregir README y documentación de dominio, rutas, imágenes, contacto y métricas históricas.
5. Enviar sitemap y validar una URL de inicio, Grecia y servicio en Search Console/Bing.

### Alto impacto

1. Completar/optimizar Google Business Profile y un programa ético de reseñas reales.
2. Resolver F-01 y revisar similitud visible de todas las landings locales.
3. Crear arquitectura de cobertura priorizada: Río Cuarto primero; luego provincias/zonas nacionales solo con datos reales.
4. Publicar contenido de confianza y experiencia demostrable, incluida guía de solicitud de grúa/traslado si el negocio lo presta.
5. Configurar eventos de llamada/WhatsApp, GA4 o GTM único, Search Console y Bing Webmaster Tools.

### Impacto medio

1. Enriquecer schema con relación `WebPage`–`Service`–negocio tras validar NAP y datos.
2. Crear página de contacto informativa y políticas necesarias si se confirma el tratamiento de datos.
3. Establecer calendario trimestral de revisión y fechas de actualización honestas.
4. Medir CWV en producción, rendimiento móvil y coste de las animaciones antes de cambiar componentes.
5. Crear activos GEO citablemente útiles y obtener presencia externa auténtica.

### Largo plazo

1. Expandir landings locales solo mediante evidencia de demanda/capacidad y revisión de duplicación.
2. Desarrollar guías de seguridad, eléctricos, traslados programados y rescate con fuentes y expertos reales.
3. Crear relaciones verificables con talleres, aseguradoras, comunidades y medios locales, sin enlaces de pago ni menciones falsas.
4. Monitorizar share of voice local, consultas de IA, reseñas, llamadas y conversiones por zona cada mes.
5. Considerar fuentes locales/autohospedadas si la infraestructura de build requiere independencia de Google Fonts.

### Recomendaciones opcionales

1. Publicar `llms.txt` conciso y mantenido tras consolidar la información canónica; no esperar beneficio directo de Google.
2. Añadir `ImageObject` y relaciones de página al JSON-LD después de validar la propiedad y el contexto de las fotos.
3. Diseñar contenido para inglés únicamente si existen clientes, capacidad de atención y contenido humano completo; no traducir plantillas masivamente.
4. Crear una página de preguntas de seguridad con fuentes oficiales, manteniendo las respuestas de urgencia claras y sin sustituir servicios de emergencia oficiales.

## Conclusión

La prioridad no es añadir más palabras clave ni más schema. El sitio ya cuenta con una base técnica superior a la de muchas páginas de servicios locales. La siguiente ganancia provendrá de consolidar una entidad local demostrable en Grecia, eliminar repetición estructural, cubrir las zonas objetivo con contenido operacional real, medir llamadas y conversiones, y construir reputación externa auténtica. Esa combinación es la que puede mejorar simultáneamente Google tradicional, Maps y la probabilidad de ser entendido/citado por buscadores con IA.
