# Implementación de la auditoría SEO — Grúas Zamora Moya

Fecha: 31 de julio de 2026
Fuente de verdad: [`SEO_AUDITORIA_COMPLETA.md`](./SEO_AUDITORIA_COMPLETA.md) (hallazgos F-01 a F-26)

Estado final: `npm run lint` sin errores, `npm run build` correcto, 33 rutas prerenderizadas, 25 URL de negocio en el sitemap.

---

## Resumen en una tabla

| | Antes | Después |
| --- | --- | --- |
| URL de negocio | 18 | **25** |
| Landings de zona | 14 | **18** |
| URL que emiten `FAQPage` | 15 | **1** (la portada) |
| Solapamiento de 8-gramas entre landings de zona | 69–74 % | **48–54 %** |
| Contenido exclusivo de una landing (Poás) | 26,7 % | **45,0 %** |
| `og:site_name` presente | 1 de 18 URL | **25 de 25** |
| Twitter Card propia de la página | 1 de 18 URL | **25 de 25** |
| Texto editorial de zonas en el bundle de cliente | 24 KB en todas las páginas | **0** |
| Enlaces a `/servicios` desde encabezado y pie | 0 | **25** |
| Enlaces de vecindad no recíprocos | 16 | **0** |
| Enlaces internos que recibe cada zona | 18 chrome + 3–13 contextuales | **25 chrome + 6–16 contextuales** |

---

## Antes de empezar: ocho defectos que la auditoría no pudo ver

La auditoría se hizo sin acceso a producción y marcó varios hallazgos como «pendiente de validación». Se comprobó el sitio en vivo con `curl`, y eso cerró tres hallazgos y destapó ocho defectos nuevos que sí eran corregibles en código.

**Cerrados por verificación, sin necesidad de tocar nada:**

- **F-21** — el apex, `http://` y el dominio viejo `gruas-zamora.vercel.app` redirigen los tres con **308 de un solo salto** a `www.gruaszamoramoya.com`. Correcto.
- **F-22** — CSP, HSTS, `nosniff`, `Referrer-Policy` y `Permissions-Policy` llegan íntegras al navegador. Ningún proxy las altera.
- **F-10 (parcial)** — compresión activa: la portada son 240 KB de HTML que viajan en **27,5 KB**. La imagen LCP en AVIF pesa 25 KB a 828 px.

**Confirmados como ausentes en producción:**

| | Estado real |
| --- | --- |
| Google Search Console | ✅ etiqueta de verificación presente |
| Bing Webmaster Tools | ❌ sin verificar |
| GA4 / GTM | ❌ **cero analítica desplegada** |
| `NEXT_PUBLIC_GOOGLE_BUSINESS_URL` | ❌ vacía |

**Defectos nuevos, todos corregidos en esta implementación:**

1. `og:site_name` ausente en 17 de 18 URL.
2. `twitter:title` y `twitter:description` de **todas** las páginas interiores eran las de la portada.
3. `/servicios` casi huérfana: 2 enlaces contextuales y **cero** desde encabezado o pie.
4. 16 enlaces de «zonas vecinas» de una sola vía.
5. 24 KB de texto editorial de zonas viajando al navegador en todas las páginas.
6. Menú móvil cerrado: 11 enlaces seguían siendo enfocables con el tabulador.
7. Contraste `chrome-500` en 4,0–4,2:1 sobre texto de 11–12 px (WCAG AA pide 4,5:1).
8. Imágenes servidas con `Cache-Control: max-age=0, must-revalidate`, anulando el `minimumCacheTTL` de un año que ya estaba configurado.

---

## Bloque 1 · Duplicación de contenido — F-01, F-11, F-04

**Problema.** Las diez preguntas generales —638 palabras— se pintaban en las 18 páginas del sitio y quince de ellas emitían el mismo `FAQPage`. Medido sobre el HTML compilado: dos landings de zona cualesquiera compartían el 69–74 % de sus secuencias de ocho palabras, y Poás resultaba única solo en un 26,7 %.

**Qué se hizo.**

- Las `FAQS` generales viven **solo en la portada**, que es también la única URL que emite `FAQPage`.
- Las landings de zona pasaron de 3 a **5 preguntas propias**, generadas de sus datos reales. Las dos nuevas responden qué unidad se despacha (deducido del terreno que declara cada zona: lastre, cuadrante angosto, autopista) y cómo pesa la distancia en el precio (distinto en la base, en la región, en un cantón vecino y en una provincia lejana).
- Las páginas de servicio tienen ahora **4 preguntas propias cada una**, en `lib/services.ts`, escritas desde las especificaciones ya confirmadas de cada unidad.
- El índice `/servicios` cambió la FAQ repetida por una **tabla comparativa plataforma vs arrastre** de 8 criterios. Responde la pregunta que de verdad lleva a alguien a esa página y no existe en ninguna otra parte del sitio.
- Donde se quitó la copia se puso un enlace a la respuesta canónica: nadie se queda sin la información.
- Se corrigió el comentario de `faqSchema()` que prometía que el marcado «habilita el acordeón en los resultados». Google restringió ese formato a salud y gobierno; el marcado se mantiene por precisión semántica y extracción por IA, no como palanca de CTR **(F-11)**.

**Archivos.** `lib/faq.ts`, `lib/services.ts`, `lib/schema.ts`, `app/page.tsx`, `app/[zona]/page.tsx`, `app/servicios/page.tsx`, `app/servicios/[servicio]/page.tsx`, `components/sections/Faq.tsx`.

**Resultado medido.** Solapamiento 69–74 % → **48–54 %**. Contenido exclusivo de Poás 26,7 % → **45,0 %**. El resto del solapamiento es plantilla legítima (CTA, tarjetas de servicio, checklist de respaldo), no texto editorial.

---

## Bloque 2 · Metadatos y social

**Problema.** Next.js fusiona los metadatos de forma superficial: un bloque `openGraph` propio **reemplaza** al del layout en vez de completarlo. Las rutas de zona y servicio declaraban cuatro campos y perdían el resto.

**Qué se hizo.** Nuevo `lib/metadata.ts` con `pageMetadata()`, que construye `openGraph` completo (incluido `siteName`) y `twitter` propios para cada ruta. Todas las páginas lo usan.

**Beneficio.** Compartir la landing de Grecia por WhatsApp o X ahora muestra el nombre de la empresa y el título de esa página, no el de la portada.

---

## Bloque 3 · Datos estructurados — F-12, F-06, F-25

**Qué se hizo.**

- **Grafo atado por `@id`.** `WebSite` → `LocalBusiness` ← `Service`, con `WebPage` enlazando `isPartOf`, `about`, `mainEntity`, `breadcrumb` y `primaryImageOfPage`. Antes cada página declaraba entidades sueltas y el buscador tenía que deducir que el `Service` de `/gruas-grecia` y el de `/gruas-naranjo` los presta la misma empresa. Eso pesa aquí más de lo normal: buscar «Grúas Zamora» en Costa Rica devuelve varias empresas distintas, **incluida Grúas Diego Zamora en el mismo cantón de Grecia**.
- **`ImageObject`** propio con dimensiones y descripción, referenciado desde cada `WebPage`.
- **`logo` corregido**: apuntaba a `/icon.svg` y Google no admite SVG para el logo de una organización — es decir, no se estaba tomando ninguno. Ahora apunta a `/apple-icon`, el PNG de 180×180 que ya generaba el proyecto.
- **`GeoCircle` de 200 km eliminado (F-06).** Costa Rica mide unos 460 km: ese círculo dejaba fuera medio Guanacaste, el Pacífico Sur y buena parte de Limón, contradiciendo al texto visible. La cobertura se declara ahora solo con `areaServed`.
- **`areaServed` corregido**: «Occidente» se declaraba como `City` y no lo es (ahora `AdministrativeArea`); faltaban Guanacaste, Puntarenas y Limón, que ahora entran con página propia.
- **`hasOfferCatalog`** listaba cuatro servicios, dos de ellos sin ninguna página. Ahora referencia por `@id` los servicios que existen.
- **`ContactPage`** como subtipo en `/contacto`.
- **F-25 respetado**: no se añadió `hreflang`, `SearchAction`, `Product`, `Review` ni `AggregateRating`. No hay contraparte real y sería marcado decorativo.

**Verificado.** JSON-LD por página: la portada emite `LocalBusiness`+`AutomotiveBusiness`, `WebSite`, `ImageObject`, `WebPage`, `FAQPage`. Las demás, lo que les corresponde y ni un tipo de más.

---

## Bloque 4 · SEO local y arquitectura — F-02, F-03

**Confirmado contigo antes de escribir una línea**, porque estas páginas afirman cosas sobre la operación real y la auditoría es explícita: *«crear una landing solo si la empresa realmente despacha allí»*.

- **`/gruas-rio-cuarto`** (F-02). Zona objetivo declarada que no tenía URL. Se escribió con el tono de respuesta rápida que confirmaste. Los distritos (Santa Rita, Santa Isabel) y la Ruta 126 son geografía pública verificable. El contenido aprovecha un dato real y útil: Río Cuarto fue el distrito 13 de Grecia hasta 2017, lo que justifica el enlace interno y la afirmación de conocimiento del terreno.
- **`/gruas-guanacaste`, `/gruas-puntarenas`, `/gruas-limon`** (F-03). Con el encuadre honesto de **traslado coordinado**: hora y precio cerrados antes de salir, sin prometer respuesta inmediata. Las tres páginas dicen en el primer párrafo que a esa distancia no son la opción para una varada urgente, y Guanacaste llega a recomendar buscar una grúa de la zona si el caso no puede esperar.
- **Campo `dispatch` nuevo** (`base` | `rapida` | `coordinada`) en el tipo `Zone`. Es una decisión comercial, no geográfica, y por eso va aparte de `kind`: el texto generado de las preguntas frecuentes cambia con ella. Sin esto, Limón habría heredado el texto de provincia que dice «subimos y bajamos por la Interamericana todos los días», cierto de San José y falso del Caribe.
- **Grecia y Occidente ampliadas** con tres bloques editoriales nuevos entre las dos, según elegiste: el proceso desde que llama hasta que llega la unidad, la cobertura hacia el norte, la comparación de qué pide cada cantón de Occidente y los cinco tramos que concentran las llamadas.
- **`components/sections/Coverage.tsx`** separa ahora «Resto del Valle Central» de «Traslados coordinados», porque agrupar Limón con San José daría a entender la misma promesa de servicio.

---

## Bloque 5 · Enlazado interno

- **`/servicios` rescatada.** Recibía 2 enlaces contextuales y **cero** desde encabezado o pie. El enlace «Servicios» del menú apuntaba al ancla `/#servicios` de la portada, no a la página. Ahora apunta a la página real y hay entradas explícitas en el menú móvil y en el pie: **25 enlaces de chrome + 3 contextuales**.
- **Vecindad recíproca.** En vez de arreglar a mano las 16 listas asimétricas, `getNeighbors()` calcula la unión de lo que una zona declara y de quién la declara a ella. Verificado sobre el HTML compilado: **0 enlaces no recíprocos**, media de 6,1 vecinas por zona. Cualquier zona nueva queda simétrica el día que se escribe.
- **Pie ampliado** con un bloque «Información» hacia las tres páginas nuevas.

---

## Bloque 6 · Rendimiento — F-16, F-10

- **24 KB fuera del bundle de cliente.** El `Header` es `'use client'` e importaba `FEATURED_ZONES` de `lib/zones.ts`; el empaquetador no sabe recortar un módulo, así que mandaba al navegador los `lead`, `body`, `routes` y `places` de las catorce zonas **en todas las páginas**. Nuevo `lib/nav.ts` con slug y nombre. Verificado: **ningún chunk de cliente contiene ya texto editorial de zonas**.
- **Guardia de compilación.** `assertNavParity()` compara las dos listas durante el prerenderizado: agregar una zona y olvidar `lib/nav.ts` **revienta el build** con un mensaje explícito, en vez de dejar un hueco silencioso en el menú.
- **Un solo `IntersectionObserver`** compartido por todos los `Reveal`, en vez de uno por instancia (más de treinta por página). Mismo efecto visual, una fracción del coste en un teléfono de gama baja.
- **`Cache-Control` para `public/`.** Las fotos salían con `max-age=0, must-revalidate`, y el optimizador de `next/image` hereda la caché del origen: las variantes AVIF de la imagen LCP se revalidaban en cada navegación pese al `minimumCacheTTL` de un año. Ahora 30 días con `stale-while-revalidate`. No se usa `immutable` a propósito: los archivos no llevan hash en el nombre.
- **Reporte de Web Vitals** con `useReportWebVitals`, sin librerías nuevas y sin coste si no hay analítica configurada.
- **Fuentes revisadas (F-15 parcial).** Se comprobó que los cinco pesos precargados (76 KB) se usan todos: Anton 400 y Barlow 400/600/700/800. No hay desperdicio que recortar.

---

## Bloque 7 · Accesibilidad — F-26

- **`inert` en el menú móvil cerrado.** Se colapsa con `max-h-0`, que lo recorta visualmente pero no lo saca del árbol de foco: el tabulador entraba en 11 enlaces invisibles antes de llegar al contenido. Verificado en el navegador: con el menú cerrado el foco no entra; al abrirlo, aterriza en el primer enlace.
- **`aria-controls`** en el botón de menú. Sin él, un lector de pantalla anuncia que algo se expandió pero no puede decir qué.
- **Contraste corregido.** `chrome-500` (4,0–4,2:1) sustituido por `chrome-400` (5,8–6,7:1) en migas de pan, etiquetas del pie, indicadores de About, etiquetas de Coverage y encabezados del menú móvil.
- **Tabla comparativa accesible**: `<caption>` en `sr-only`, `<th scope>` en filas y columnas, y desbordamiento con scroll propio. Verificado a 375 px: la tabla scrollea dentro de su contenedor y **el documento no scrollea horizontalmente**.

---

## Bloque 8 · Medición — F-09

- **`components/CtaTracking.tsx`**: un único escuchador delegado en `document` que convierte los `data-cta` —que ya existían en el código sin que nadie los leyera— en eventos con método, ubicación y página. Un servicio de grúas no tiene carrito: la conversión *es* el clic en llamar o en WhatsApp.
- Se añadieron `data-cta` a los enlaces de correo y teléfono que no lo tenían.
- **CSP corregida en dos puntos reales**: `connect-src` no cubría `region1.google-analytics.com` (GA4 usa hosts regionales, así que los eventos de Costa Rica se habrían bloqueado en silencio el día que se configure la medición), y `frame-src 'none'` bloqueaba el `<noscript>` de GTM.

---

## Bloque 9 · Contenido nuevo — F-13, F-19, F-23

| Ruta | Hallazgo | Qué resuelve |
| --- | --- | --- |
| `/que-hacer-si-se-vara` | F-13 | Guía de emergencia con URL propia. Abre con la respuesta directa, cuatro pasos, siete errores comunes y seis casos particulares. **Manda al 9-1-1 antes que a la grúa cuando hay personas heridas**: una empresa que vende el traslado no debe ponerse por delante de un servicio de emergencia. |
| `/contacto` | F-19 | NAP indexable y estable: la URL que se pone en la ficha de Google, en un directorio o en Facebook. Sin formulario a propósito — uno que nadie contesta en cinco minutos es peor que no tenerlo. |
| `/privacidad` | F-23 | Describe el tratamiento real. **Se adapta solo** a si hay analítica configurada: decir «usamos Google Analytics» cuando no está activo es tan incorrecto como callarlo cuando sí lo está. |
| `/llms.txt` | F-17 | Resumen del negocio para agentes de IA, generado de las mismas fuentes que el sitio visible. Incluye una sección **«Qué NO presta»** y una nota de desambiguación frente a los homónimos. |

---

## Bloque 10 · Gobernanza — F-14, F-20

- **`CONTENT_UPDATED` en `lib/site.ts`**: una sola fuente para el `lastmod` del sitemap y el `dateModified` del JSON-LD. Antes la fecha vivía dentro de `app/sitemap.ts` y el schema no declaraba ninguna.
- **`foundedYear` en vez de `yearsOfExperience: 30`**. Un número fijo envejece en silencio: en 2030 el sitio seguiría diciendo «más de 30 años» cuando serían 34. Hoy da 30 igual — el texto visible no cambia.
- **README reescrito.** Tenía cinco afirmaciones falsas verificadas: describía una barra fija de llamada que no existe, listaba `app/opengraph-image.tsx` que no existe, decía que sin variable el sitio usa el dominio de Vercel (ya no), citaba dos imágenes que no están en `public/`, y presentaba métricas sin fecha ni método. Ahora incluye las dos reglas de arquitectura que hay que conocer, la advertencia de contraste y la tabla de estado real de producción.

---

## Qué NO se implementó, y por qué

Estas son las tareas de la auditoría que **no** son de código. No se «dejaron pendientes» por falta de tiempo: no se pueden resolver desde el repositorio.

| Hallazgo | Por qué no | Qué hace falta |
| --- | --- | --- |
| **F-05 · Google Business Profile** | Es una cuenta externa. Ningún cambio de código pone el negocio en el paquete de mapas. **Es el hallazgo de mayor impacto de toda la auditoría.** | Verificar la ficha, categoría primaria, horario 24 h, área de servicio y fotos. Después poner la URL pública en `NEXT_PUBLIC_GOOGLE_BUSINESS_URL` en Vercel — el código ya la consume en `sameAs`. |
| **F-07 · Reseñas y testimonios** | No se pueden fabricar. `lib/schema.ts` advierte explícitamente que inventar `aggregateRating` puede costar el dominio. | Pedir reseñas reales tras servicios reales, sin incentivos. Cuando existan, se pueden declarar legítimamente. |
| **F-09 · Analítica** | El código está listo y verificado; falta la cuenta y la variable. | Crear GA4 **o** GTM (no ambos) y definir `NEXT_PUBLIC_GA_ID` o `NEXT_PUBLIC_GTM_ID` en Vercel. |
| **Bing Webmaster Tools** | Cuenta externa. Es el índice detrás de Copilot y DuckDuckGo. | Importar la propiedad desde Search Console y poner `NEXT_PUBLIC_BING_VERIFICATION`. |
| **F-10 · CWV de campo** | El reporte ya está implementado, pero los datos de campo requieren tráfico real acumulado. | PageSpeed Insights sobre portada, una zona y un servicio; después el informe de Core Web Vitals de Search Console. |
| **F-06 · Dirección exacta** | Se eliminó el radio falso, pero si la calle y las coordenadas exactas deben ser públicas es una decisión del dueño. | Definir si se recibe público en un local. Si no, mantener el modelo de área de servicio (que es lo que declara el sitio hoy). |
| **F-08 · Inventario firmado de servicios** | El sitio ya declara qué **no** hace, incluso en `llms.txt`. Un inventario formal con pesos, capacidades y exclusiones es documentación operativa. | Confirmar por escrito tipos de vehículo, peso máximo y criterios de despacho. |
| **F-13 · Precios orientativos** | La auditoría permite publicarlos «únicamente si son reales, vigentes y se pueden mantener». No se me dio ninguna tarifa. **El competidor que rankea en «grúas Grecia» sí publica precios** (₡12.000–₡92.500 según distancia y peso). | Decidir si se publica una estructura tarifaria. Es una ventaja competitiva real y hoy se está cediendo. |
| **F-24 · Derechos de imagen** | Inventario de procedencia, fecha y consentimiento: proceso interno. | Registrar por foto quién la tomó, cuándo y si puede mostrar vehículos de clientes. |
| **F-26 · Prueba manual completa** | Se hizo verificación programática (foco, contraste calculado, desbordamiento, `inert`). Lector de pantalla real y zoom al 200 % en dispositivos físicos no se pueden simular aquí. | Una pasada con VoiceOver o NVDA y con zoom al 200 %. |
| **F-15 · Fuentes autohospedadas en el repo** | Exigiría descargar archivos de fuente y verificar licencias, y la auditoría lo marca como decisión de infraestructura. Se documentó en el README. | Solo si el CI necesita compilar sin salida a internet. |

---

## Mejoras que no estaban en la auditoría

Documentadas aquí porque el encargo lo pedía explícitamente.

1. **`assertNavParity()`** — guardia de compilación que impide que la navegación y el catálogo se desincronicen. Sin esto, la optimización del bundle habría creado una forma nueva de romper el menú en silencio.
2. **`getNeighbors()` como grafo no dirigido** — resuelve las 16 asimetrías y evita que el problema vuelva, en vez de parchear las listas una vez.
3. **Campo `dispatch`** — separa la promesa comercial de la clasificación geográfica. Es lo que permite que Limón y San José tengan textos honestos y distintos.
4. **Tabla comparativa en `/servicios`** — sustituye contenido duplicado por el formato que más se cita en respuestas de IA.
5. **`foundedYear` calculado** — elimina una afirmación que envejecía sola.
6. **CSP: hosts regionales de GA4 y `<noscript>` de GTM** — dos fallos que solo se habrían manifestado el día que se active la medición, y como «GA no registra nada», de lo más difícil de diagnosticar.
7. **`Cache-Control` en `public/`** — el `minimumCacheTTL` configurado no tenía efecto observable en el navegador.
8. **Observador compartido, `inert`, `aria-controls` y contraste** — los cuatro detectados midiendo, no leyendo.
9. **FAQ propias por servicio** — permiten quitar la FAQ general de esas páginas sin dejarlas sin contenido.

---

## Riesgos que conviene que revises

1. **Lee las cuatro páginas nuevas de zona.** Río Cuarto, Guanacaste, Puntarenas y Limón afirman cosas sobre cómo operas. La geografía es pública y verificable; el encuadre de servicio es el que confirmaste, pero el texto lo escribí yo y tú sabes si suena a tu empresa.
2. **`legalName` sigue siendo `'Grúas Zamora Moya'` sin «S.A.»**, mientras los directorios existentes (nexdu, tuugo, amarillasaz, amerpages) te listan como «GRUAS ZAMORA MOYA S.A.». Si la razón social lleva S.A., conviene alinearlo — el NAP consistente es una señal local directa.
3. **Los directorios te describen ofreciendo «alquiler de grúas para construcción»**, que contradice el posicionamiento del sitio. Vale la pena corregir esas fichas.
4. **En la búsqueda de marca, el sitio propio no aparece**: lo ocupan los directorios y hay un homónimo en tu mismo cantón (Grúas Diego Zamora). El `alternateName` del schema ayuda, pero la ficha de Google verificada es lo que decide.
5. **`CONTENT_UPDATED` quedó en `2026-07-31`.** Solo cámbialo cuando cambie el contenido de verdad.
6. **Las landings no prioritarias quedaron en ~820 palabras** (elegiste ampliar solo Grecia y Occidente). El competidor tiene ~4.000 en su página de Grecia. Cuando quieras subirlas, el lugar es el arreglo `body` de cada zona en `lib/zones.ts`, y lo que más pesa es conocimiento operativo que solo tienes tú.

---

## Lo siguiente, por orden de impacto

1. **Ficha de Google Business verificada.** Nada de lo anterior compite con esto para «grúas Grecia».
2. **Programa de reseñas reales.**
3. **Variables en Vercel**: analítica y URL de la ficha. Quince minutos, y desbloquea toda la medición.
4. **Bing Webmaster Tools**, por Copilot.
5. **Decidir sobre precios orientativos** — hoy es la ventaja que el competidor tiene y tú no.
6. **Alinear el NAP** en los directorios existentes.
7. **Línea base de PageSpeed Insights** en portada, una zona y un servicio.
