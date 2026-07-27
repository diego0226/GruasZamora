# Informe SEO — Grúas Zamora Moya

**Fecha:** 27 de julio de 2026
**Dominio:** `https://www.gruaszamoramoya.com`
**Auditoría de origen:** [`SEO_AUDIT.md`](./SEO_AUDIT.md)

---

## Lo más importante de este informe

Antes de esta intervención, el sitio publicado en el dominio nuevo tenía esta etiqueta en todas sus
páginas:

```html
<link rel="canonical" href="https://gruas-zamora.vercel.app"/>
```

Eso es una instrucción directa a Google: *«no indexes esta URL, la buena es la otra».* El dominio que
usted acaba de comprar le estaba cediendo el 100 % de sus señales al subdominio de Vercel, y por sí
solo no iba a posicionar nunca — sin importar cuánto contenido tuviera.

**Ya está corregido y verificado.** Todo lo demás del informe es mejora sobre una base que ya era
buena; esto era una reparación.

---

## Errores encontrados

| # | Error | Gravedad | Estado |
|---|-------|----------|--------|
| 1 | Canonical, `og:url`, sitemap, robots.txt y JSON-LD apuntaban a `gruas-zamora.vercel.app` | Crítica | ✅ Corregido |
| 2 | El dominio viejo servía el sitio completo con HTTP 200 (contenido duplicado) | Crítica | ✅ Corregido |
| 3 | `lastmod` del sitemap era la hora del build en las 18 URLs | Media | ✅ Corregido |
| 4 | Mismo bloque de FAQ y mismo `FAQPage` repetidos en 17 URLs | Media | ✅ Corregido |
| 5 | 8 meta descriptions pasaban de 160 caracteres — se cortaba el teléfono | Media | ✅ Corregido |
| 6 | Sin GA4 ni GTM: cero medición | Media | ✅ Cableado (falta el ID) |
| 7 | Sin verificación de Bing Webmaster Tools | Media | ✅ Cableado (falta el ID) |
| 8 | Faltaban CSP y `Permissions-Policy` | Media | ✅ Corregido |
| 9 | Sin `manifest.webmanifest` ni icono para iOS | Baja | ✅ Corregido |
| 10 | `export const metadata` en `not-found.tsx` era código muerto | Baja | ✅ Eliminado |
| 11 | 4,4 MB de imágenes sin referenciar en `public/` | Baja | ✅ Eliminadas |
| 12 | `host` en robots.txt (directiva de Yandex, Google la ignora) | Baja | ✅ Eliminada |
| 13 | Variable muerta en `scripts/generate-og.mjs` (aviso de ESLint) | Baja | ✅ Eliminada |

Dos errores se detectaron **durante** la implementación, no en la auditoría inicial, y ambos los
provocaron cambios míos:

| # | Error introducido | Cómo se detectó | Estado |
|---|-------------------|-----------------|--------|
| 14 | `Cache-Control` propio en `/_next/static` duplicaba lo que Next ya hace y podía romper el modo desarrollo | Aviso del propio `next build` | ✅ Revertido |
| 15 | La CSP sin `'unsafe-eval'` dejaba sin overlay de errores ni trazas al modo desarrollo | Consola del navegador | ✅ Acotado a desarrollo |

---

## Cambios realizados

### 1. Dominio canónico — la reparación crítica

`lib/site.ts` usaba el dominio de Vercel como valor por defecto y dependía de que alguien recordara
configurar `NEXT_PUBLIC_SITE_URL` en producción. Nadie lo hizo, y el sitio salió a producción
señalando el dominio equivocado.

El valor por defecto ahora **es el dominio real**, así que funciona aunque no se configure ninguna
variable. Se usa la forma **con `www`** porque Vercel redirige el apex hacia `www` con un 308: apuntar
el canonical al apex señalaría una URL que redirige, un salto de más en cada rastreo.

Verificado en el build de producción:

```
Canonicales apuntando al dominio viejo ....... 0 de 18
Títulos duplicados ........................... 0
Descripciones duplicadas ..................... 0
Páginas sin exactamente un <h1> .............. 0
```

### 2. Redirección 308 del dominio viejo

`gruas-zamora.vercel.app` respondía 200 con el sitio entero. Ahora redirige permanentemente al
dominio nuevo, lo que además traslada la autoridad que hubiera acumulado.

La redirección apunta al **host exacto**, no a `*.vercel.app`: los deploys de preview también viven
en ese dominio y un comodín los habría redirigido todos a producción, dejando imposible revisar un
cambio antes de publicarlo.

### 3. Sitemap y robots.txt

- `lastmod` pasa de `new Date()` a fechas estables por tipo de contenido. Google solo hace caso a
  `lastmod` cuando es verificablemente preciso; un sitio que declara que todo cambió en cada deploy
  enseña al rastreador a ignorar el campo por completo.
- Se eliminan `changeFrequency` y `priority`: Google declaró explícitamente que los ignora.
- Se elimina `host` del robots.txt (extensión de Yandex).
- La URL de la portada en el sitemap ahora coincide carácter por carácter con su canonical.

### 4. Contenido único por zona

Las 13 landings de zona mostraban las mismas 10 preguntas —unas 1.500 palabras idénticas— y emitían
el mismo `FAQPage`. Son justo las páginas que deben posicionar para «grúas Grecia», «grúas Naranjo» y
demás, y repetir el 40 % del texto entre ellas diluye lo que las diferencia.

Ahora cada zona genera **3 preguntas propias** a partir de los datos reales que ya vivían en
`lib/zones.ts` — rutas concretas, distritos cubiertos, relación con la base de Grecia:

> **¿Cuánto tardan en llegar a Naranjo?**
> **¿Qué distritos de Naranjo cubren?**
> **¿En qué carreteras de Naranjo atienden con más frecuencia?**

No es texto hilado para rellenar: cada respuesta dice algo verdadero y distinto de esa zona. El H2 de
la sección también se personaliza («Preguntas sobre grúas en Grecia»).

El `FAQPage` se emite solo donde el conjunto es único —portada y zonas—. En `/servicios` y en las
páginas de servicio el acordeón sigue visible porque al usuario le sirve, pero sin duplicar el schema.

### 5. Meta descriptions dentro del límite

8 descripciones pasaban de 160 caracteres. En este sitio eso no era cosmético: el teléfono va al final
de la frase, así que el recorte de Google se comía **justo el dato por el que existe el sitio**.

Todas quedaron entre 146 y 157 caracteres, con el teléfono dentro del corte.

### 6. Datos estructurados

- `sameAs` acepta ahora la ficha de Google Business por variable de entorno (ver más abajo — es la
  acción de mayor impacto que queda pendiente).
- Nuevo `ItemList` en `/servicios` para que Google entienda que es una página de catálogo.
- Se conserva lo que ya estaba bien: `LocalBusiness` + `AutomotiveBusiness`, `WebSite`, `Service` por
  página, `BreadcrumbList`, horario 24/7, `areaServed` con todas las zonas.

Validado sobre el HTML generado: los 4 bloques JSON-LD de cada página parsean sin errores.

**Sin `aggregateRating` ni reseñas inventadas.** Fabricarlas es causa de penalización manual y de
pérdida de todos los resultados enriquecidos del dominio. Las estrellas se ganan con reseñas reales
en Google Business.

### 7. Analítica y verificación — sin IDs falsos

`components/Analytics.tsx` carga GA4 o GTM mediante `@next/third-parties`, que los saca del camino
crítico para que no compitan con el LCP. Si la variable de entorno no existe, **no se renderiza nada
y no se descarga ningún script**.

Una decisión que conviene conocer: **si configura GTM, GA4 se ignora.** Lo normal es tener GA4 como
etiqueta dentro de GTM; cargar además el script directo dispararía cada visita dos veces y arruinaría
los datos justo cuando empiece a mirarlos.

Todas las variables están documentadas en [`.env.example`](./.env.example).

### 8. Seguridad

Se agregan `Content-Security-Policy`, `Permissions-Policy` y `Strict-Transport-Security` explícito
(con `includeSubDomains; preload`).

**Una decisión que conviene explicar en vez de disimular:** no se implementó una CSP con nonces. Los
nonces obligan a generar el HTML en cada petición, lo que **elimina la generación estática** de las
18 páginas y cambiaría un TTFB de decenas de milisegundos por uno de cientos. En un sitio sin login,
sin formularios y sin entrada de usuario, ese precio no se justifica — y menos cuando el objetivo
declarado es Core Web Vitals altos.

Lo que sí bloquea la CSP puesta: clickjacking, inyección de `<base>`, secuestro del destino de
formularios y plugins embebidos. Con `'unsafe-inline'` presente, `script-src` **no** protege contra
XSS; está para que las demás directivas puedan aplicarse. Decirlo de otro modo sería teatro.

`'unsafe-eval'` se agrega **solo en desarrollo**, porque React lo necesita para el overlay de errores
y las trazas. Producción queda estricta — verificado.

---

## Archivos modificados

**Modificados (14)**

```
app/layout.tsx                    dominio, descripción, verificación Bing, <Analytics/>
app/sitemap.ts                    lastmod estable, sin changefreq/priority
app/robots.ts                     sin directiva host
app/not-found.tsx                 elimina metadata muerta
app/[zona]/page.tsx               FAQs propias de zona + schema propio
app/servicios/page.tsx            ItemList, sin FAQPage duplicado
app/servicios/[servicio]/page.tsx sin FAQPage duplicado
components/sections/Faq.tsx       acepta título personalizado
lib/site.ts                       DOMINIO CANÓNICO + Google Business
lib/schema.ts                     sameAs con ficha, serviceListSchema
lib/faq.ts                        generador de FAQs por zona
lib/zones.ts                      5 descripciones acortadas
lib/services.ts                   2 descripciones acortadas
next.config.ts                    redirección 308, CSP, cabeceras
scripts/generate-og.mjs           variable muerta
```

**Nuevos (5)**

```
app/manifest.ts                   manifest para pantalla de inicio
app/apple-icon.tsx                icono PNG 180x180 para iOS (1,9 KB)
components/Analytics.tsx          GA4/GTM por variables de entorno
.env.example                      todas las variables documentadas
SEO_AUDIT.md                      auditoría de origen
```

**Eliminados (2)** — `public/IMG_9694.JPG` (3,07 MB) y `public/IMG_4771.jpg` (1,34 MB), sin
referenciar en ningún lado.

**Dependencia agregada (1)** — `@next/third-parties`, oficial de Vercel.

---

## Verificación

Todo lo siguiente se comprobó sobre el HTML realmente generado, no sobre el código fuente:

```
Build de producción ................. ✅ 25 rutas, todas estáticas, 0 avisos
TypeScript .......................... ✅ sin errores
ESLint .............................. ✅ sin errores ni avisos
Canonicales correctos ............... ✅ 18 / 18
Títulos únicos ...................... ✅ 18 / 18   (51–60 caracteres)
Descripciones únicas ................ ✅ 18 / 18   (146–157 caracteres)
Un solo <h1> por página ............. ✅ 18 / 18
Jerarquía de encabezados ............ ✅ H1→H2→H3 sin saltos
Imágenes sin alt .................... ✅ 0
JSON-LD parseable ................... ✅ 4 bloques por página
FAQs por zona ....................... ✅ 13 preguntas (3 propias + 10 generales)
sitemap.xml ......................... ✅ 18 URLs, dominio correcto
robots.txt .......................... ✅ dominio correcto
manifest.webmanifest ................ ✅ 200
apple-icon .......................... ✅ 200, image/png, 1,9 KB
Slug inventado ...................... ✅ 404 real
Desborde horizontal en móvil ........ ✅ ninguno (375 px)
Violaciones de CSP .................. ✅ ninguna
Imágenes rotas ...................... ✅ ninguna
```

---

## Lighthouse esperado y Core Web Vitals

Con la salvedad honesta de que Lighthouse varía según red y dispositivo, y de que estas cifras son
una **estimación**, no una medición:

| Categoría | Esperado |
|-----------|----------|
| Rendimiento (móvil) | 90–100 |
| Accesibilidad | 95–100 |
| Buenas prácticas | 100 |
| SEO | 100 |

| Métrica | Objetivo de Google | Situación |
|---------|--------------------|-----------|
| **LCP** | < 2,5 s | Favorable: HTML estático desde CDN, foto del hero con `priority`, AVIF/WebP en el tamaño exacto de cada breakpoint |
| **CLS** | < 0,1 | Favorable: todas las imágenes con `fill` y contenedor dimensionado; fuentes autohospedadas con `display: swap` |
| **INP** | < 200 ms | Favorable: casi todo es HTML estático; el acordeón usa `<details>` nativo, sin JavaScript |
| **TTFB** | < 800 ms | Favorable: 25 rutas prerenderizadas, servidas desde el borde |

Lo que más ayuda aquí es una decisión de arquitectura que ya venía tomada: **todo el sitio es
estático**. No hay base de datos, ni consultas, ni renderizado por petición. Se preservó
deliberadamente al descartar la CSP con nonces.

**Una oportunidad de rendimiento que queda abierta:** las fotos de la flotilla pesan entre 0,26 y
1,3 MB cada una en origen. Next las convierte y redimensiona al vuelo, así que el visitante no
descarga esos pesos — pero optimizarlas en origen aceleraría los builds y el primer visitante de cada
variante. No es urgente.

---

## Checklist SEO

**Técnico**

- [x] Metadata dinámica por página
- [x] Títulos únicos (51–60 caracteres)
- [x] Descripciones únicas (146–157 caracteres)
- [x] Canonical en todas las páginas, al dominio correcto
- [x] Meta robots (index/follow, `max-image-preview: large`)
- [x] robots.txt correcto, abierto también a rastreadores de IA
- [x] sitemap.xml automático con `lastmod` fiable
- [x] Open Graph completo, con imagen de 90 KB que WhatsApp sí muestra
- [x] Twitter Cards
- [x] JSON-LD: LocalBusiness, AutomotiveBusiness, WebSite, Service, ItemList
- [x] BreadcrumbList visible y en schema
- [x] FAQPage, sin duplicar entre URLs
- [x] Redirección del dominio viejo
- [x] HTTPS con HSTS, apex → www
- [x] CSP, Permissions-Policy, X-Frame-Options, nosniff, Referrer-Policy

**Indexación**

- [x] Sin páginas duplicadas
- [x] Sin títulos duplicados
- [x] Sin descripciones duplicadas
- [x] Canonicales correctos
- [x] Nada bloqueado por accidente
- [x] Sin enlaces rotos (54 enlaces por página, verificados)

**Contenido y arquitectura**

- [x] Un `<h1>` por página, con la palabra clave
- [x] Jerarquía de encabezados sin saltos
- [x] URLs limpias con palabra clave (`/gruas-grecia`)
- [x] Profundidad máxima: 2 clics
- [x] Enlazado interno: pie con las 13 zonas y 2 servicios; cada zona enlaza a sus vecinas
- [x] Anchor text descriptivo («Grúas Naranjo», no «clic aquí»)
- [x] Contenido único por zona

**Accesibilidad**

- [x] `alt` en todas las imágenes
- [x] `aria-label` en controles interactivos
- [x] Enlace «Saltar al contenido»
- [x] Navegación por teclado (`<details>` nativo)
- [x] `lang="es-CR"`

**Pendiente de usted (requiere cuentas, no código)**

- [ ] Crear el perfil de Google Business
- [ ] Verificar en Google Search Console y enviar el sitemap
- [ ] Verificar en Bing Webmaster Tools
- [ ] Crear la propiedad de GA4 y poner el ID en Vercel

---

## Keywords por página

| URL | Keyword principal | Secundarias | Intención |
|-----|-------------------|-------------|-----------|
| `/` | grúas Costa Rica | grúas 24 horas, grúas Zamora, remolque de vehículos | Transaccional urgente |
| `/gruas-grecia` | **grúas Grecia** | grúa Grecia Alajuela, remolque Grecia, grúa Tacares | Local urgente |
| `/gruas-occidente` | **grúas occidente** | grúas Occidente Alajuela, grúa Interamericana | Local urgente |
| `/gruas-costa-rica` | **grúas en Costa Rica** | grúa nacional, traslado entre provincias | Transaccional |
| `/gruas-alajuela` | grúas Alajuela | grúa aeropuerto, grúa La Garita | Local urgente |
| `/gruas-naranjo` | grúas Naranjo | grúa cuesta de Naranjo, grúa Ruta 141 | Local urgente |
| `/gruas-sarchi` | grúas Sarchí | grúa Sarchí Norte, grúa Sarchí Sur | Local urgente |
| `/gruas-palmares` | grúas Palmares | grúa Fiestas de Palmares | Local estacional |
| `/gruas-san-ramon` | grúas San Ramón | grúa bajura San Ramón, grúa Ruta 702 | Local urgente |
| `/gruas-atenas` | grúas Atenas | grúa Ruta 27, grúa La Garita | Local urgente |
| `/gruas-poas` | grúas Poás | grúa Volcán Poás, grúa Carrillos | Local urgente |
| `/gruas-zarcero` | grúas Zarcero | grúa cuesta de Zarcero, rescate en pendiente | Local urgente |
| `/gruas-san-jose` | grúas San José | traslado San José–Occidente, grúa Circunvalación | Transaccional |
| `/gruas-heredia` | grúas Heredia | grúa zona franca, grúa General Cañas | Transaccional |
| `/gruas-cartago` | grúas Cartago | grúa Ochomogo, grúa Tres Ríos | Transaccional |
| `/servicios` | servicios de grúa Costa Rica | tipos de grúa, plataforma o arrastre | Informativa |
| `/servicios/grua-plataforma` | grúa de plataforma | grúa para carro de lujo, grúa para eléctrico | Informativa → transaccional |
| `/servicios/grua-arrastre` | grúa de arrastre | rescate vehicular, cabrestante, under-lift | Informativa → transaccional |

Sus cuatro objetivos declarados —«grúas Grecia», «grúas occidente», «grúas Zamora» y «grúas Costa
Rica»— tienen cada uno su página dedicada, salvo la de marca, que corresponde a la portada (donde
debe estar).

---

## Próximos pasos

### Ahora — 5 minutos, obligatorio

**Desplegar.** Los cambios están en su computadora; hasta que no se publiquen, el sitio sigue
diciéndole a Google que indexe el dominio de Vercel.

```bash
git add -A && git commit -m "Corrige el dominio canónico y refuerza el SEO técnico" && git push
```

### Esta semana — por orden de impacto

**1. Crear el perfil de Google Business.** Es la acción de mayor impacto de toda esta lista, por
encima de cualquier cosa del código.

Cuando alguien busca «grúas Grecia» desde el teléfono, lo primero que ve no son los enlaces azules:
es el paquete de mapas con tres fichas. Esas fichas salen de Google Business Profile. Un sitio
técnicamente perfecto **sin ficha** pierde contra un competidor con ficha mediocre y 40 reseñas.

Al crearlo: categoría principal «Servicio de grúa», horario 24 horas, zona de servicio con todos los
cantones, y fotos reales de las unidades. Después pegue la URL de la ficha en Vercel como
`NEXT_PUBLIC_GOOGLE_BUSINESS_URL` para enlazarla desde los datos estructurados.

**2. Search Console.** Agregar `https://www.gruaszamoramoya.com` como propiedad de prefijo de URL,
verificar con la etiqueta HTML (variable `NEXT_PUBLIC_GOOGLE_VERIFICATION`) y enviar
`/sitemap.xml`. Después, «Inspección de URLs» → solicitar indexación de la portada y de las tres
zonas prioritarias.

**3. Reseñas.** Es el factor que más mueve el paquete de mapas y el único que no se programa. Pida
la reseña **al terminar el servicio**, cuando el cliente acaba de ver su carro a salvo — no por
mensaje tres días después. Un enlace corto guardado en el teléfono del operador convierte mucho
mejor que pedirle a alguien que busque el negocio.

**4. GA4.** Crear la propiedad y poner el ID en Vercel como `NEXT_PUBLIC_GA_ID`.

### Este mes

- **Bing Webmaster Tools.** Permite importar la propiedad directamente desde Search Console. Es el
  índice detrás de Copilot y DuckDuckGo.
- **Directorios locales con NAP idéntico.** El nombre, la dirección y el teléfono tienen que
  aparecer **exactamente igual** que en `lib/site.ts` — «Grúas Zamora Moya», «Grecia, Alajuela,
  Costa Rica», «+506 8387-6352». Una variación («Gruas Zamora S.A.», otro formato de teléfono)
  divide la señal en dos negocios distintos a ojos de Google.
- **Fotos en la ficha de Google.** Las fichas con fotos reales reciben bastante más interacción. Ya
  tiene las imágenes de la flotilla en el repositorio.

### Más adelante

- **Contenido de temporada.** El sitio ya menciona las Fiestas de Palmares y la romería de Cartago.
  Publicar algo antes de cada temporada alta —enero en Palmares, agosto en Cartago, Semana Santa en
  las rutas a playa— captura búsquedas que suben de golpe y bajan igual de rápido.
- **Optimizar las fotos en origen** (ver la nota de rendimiento).
- **Más zonas**, si el negocio crece hacia Guanacaste o el Caribe. La arquitectura ya lo soporta:
  agregar una entrada en `lib/zones.ts` genera la landing, el sitemap, el schema y los enlaces
  internos.

---

## Expectativas realistas

Sería fácil terminar este informe prometiendo el primer lugar. No sería honesto.

**Lo que va a pasar rápido (días):** «grúas Zamora» y variantes de marca. Con el dominio correcto y
el sitio indexado, la competencia por su propio nombre es prácticamente nula.

**Lo que toma semanas:** «grúas Grecia» y las zonas de Occidente. Son consultas de volumen moderado
y competencia local. Las páginas están bien construidas y la ventaja de proximidad es real.

**Lo que toma meses:** «grúas Costa Rica» y las consultas nacionales. Ahí compiten empresas grandes
del área metropolitana con presupuesto de anuncios y años de antigüedad de dominio.

Y una advertencia sobre el punto de partida: el dominio es nuevo. Google aplica de hecho un periodo
de observación a los dominios recién registrados. Las primeras semanas van a parecer lentas aunque
todo esté perfecto — y ahora está perfecto del lado técnico.

**La palanca más grande que le queda no está en este repositorio.** Está en crear la ficha de Google
Business y en juntar reseñas reales. El sitio ya hace su parte.
