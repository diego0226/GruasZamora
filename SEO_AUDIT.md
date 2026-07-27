# Auditoría SEO — Grúas Zamora Moya

**Fecha:** 27 de julio de 2026
**Dominio de producción:** `https://www.gruaszamoramoya.com`
**Stack:** Next.js 16 (App Router), React 19, TypeScript, Tailwind 4, desplegado en Vercel

---

## Resumen

El proyecto ya tenía una base SEO sólida antes de esta auditoría: metadata por página, sitemap y
robots generados, JSON-LD de negocio local, 13 landings de zona con contenido propio, breadcrumbs y
enlazado interno desde el pie. Ese trabajo **no se toca** — está bien hecho.

El problema es otro, y es grave: **el sitio recién publicado en el dominio nuevo le está diciendo a
Google que no lo indexe.** Todo lo demás de este documento es secundario frente a eso.

Se encontraron **12 problemas**. Uno es crítico y bloquea por completo el posicionamiento del dominio
nuevo; el resto va de medio a bajo.

| # | Problema | Impacto | Prioridad |
|---|----------|---------|-----------|
| 1 | Canonical, OG, sitemap, robots y JSON-LD apuntan al dominio viejo `.vercel.app` | Bloquea la indexación del dominio nuevo | **CRÍTICA** |
| 2 | `gruas-zamora.vercel.app` sigue sirviendo el sitio completo con HTTP 200 | Contenido duplicado en dos dominios | **CRÍTICA** |
| 3 | `lastmod` del sitemap es la hora del build | Google deja de confiar en la señal de frescura | Media |
| 4 | El mismo bloque de FAQ y el mismo `FAQPage` en 17 URLs | Contenido duplicado; schema fuera de guía | Media |
| 5 | Sin GA4 / GTM: no hay forma de medir nada | Se optimiza a ciegas | Media |
| 6 | Sin verificación de Bing Webmaster Tools | Se pierde tráfico de Bing y Copilot | Media |
| 7 | Faltan CSP y Permissions-Policy | Superficie de ataque y señal de calidad | Media |
| 8 | Sin `manifest.webmanifest` ni apple-touch-icon | Iconos genéricos al guardar en pantalla de inicio | Baja |
| 9 | `export const metadata` en `not-found.tsx` es código muerto | Ninguno real — confunde a quien mantenga | Baja |
| 10 | 4,4 MB de imágenes sin usar en `public/` | Deploys más lentos, repo inflado | Baja |
| 11 | `host` en robots.txt es directiva de Yandex | Ninguno — ruido | Baja |
| 12 | Sin Google Business Profile enlazado desde el schema | Es *el* factor #1 del SEO local | Media |

---

## 1. Canonical y todas las URLs absolutas apuntan al dominio viejo · CRÍTICA

### Problema

`lib/site.ts` define el dominio así:

```ts
url: (process.env.NEXT_PUBLIC_SITE_URL ?? 'https://gruas-zamora.vercel.app').replace(/\/$/, '')
```

La variable `NEXT_PUBLIC_SITE_URL` **no está configurada en Vercel**, así que se usa el respaldo.
Verificado en producción, en el dominio nuevo:

```
$ curl -s https://www.gruaszamoramoya.com/ | grep canonical
<link rel="canonical" href="https://gruas-zamora.vercel.app"/>

$ curl -s https://www.gruaszamoramoya.com/robots.txt
Host: https://gruas-zamora.vercel.app
Sitemap: https://gruas-zamora.vercel.app/sitemap.xml

$ curl -s https://www.gruaszamoramoya.com/sitemap.xml
<loc>https://gruas-zamora.vercel.app</loc>
```

Como `SITE.url` alimenta `metadataBase`, los canonical, `og:url`, el sitemap, el robots.txt y los
`@id`/`url`/`image`/`logo` del JSON-LD, **todas** las señales de URL del sitio apuntan al subdominio
de Vercel.

### Impacto SEO

Es el peor escenario posible para un dominio recién lanzado. Un `<link rel="canonical">` es una
instrucción directa: *«no indexes esta URL, indexa aquella».* El sitio le está diciendo a Google que
`www.gruaszamoramoya.com` es una copia y que la versión buena es `gruas-zamora.vercel.app`.

Consecuencias concretas:

- El dominio nuevo **no va a posicionar**. Google consolida autoridad, enlaces y señales en el
  `.vercel.app`.
- El sitemap enviado a Search Console listaría URLs de otro dominio → error de «URL no permitida».
- Los resultados enriquecidos se atribuyen al subdominio de Vercel.
- Cada enlace que alguien construya al dominio nuevo transfiere su valor al viejo.

Mientras esto siga así, ningún otro trabajo de SEO tiene efecto. Es la reparación número uno.

### Solución

Cambiar el respaldo de `lib/site.ts` al dominio real, para que funcione **aunque nadie configure la
variable de entorno**. La variable se conserva como override para entornos de preview:

```ts
url: (process.env.NEXT_PUBLIC_SITE_URL ?? 'https://www.gruaszamoramoya.com').replace(/\/$/, '')
```

Se usa la versión **con `www`** a propósito: Vercel ya redirige el apex (`gruaszamoramoya.com` → 308
→ `www.gruaszamoramoya.com`, verificado). Si el canonical apuntara al apex, señalaría una URL que
redirige — un rodeo innecesario que Google tiene que resolver en cada rastreo.

---

## 2. El dominio viejo sigue sirviendo el sitio completo · CRÍTICA

### Problema

```
$ curl -s -o /dev/null -w "%{http_code}" https://gruas-zamora.vercel.app/
200
```

Los dos dominios sirven el mismo sitio, palabra por palabra, con estado 200.

### Impacto SEO

Contenido duplicado entre dominios. Google elige uno como canónico y, con el canonical actual
apuntando justamente al `.vercel.app`, elegiría el equivocado. Aunque se arregle el problema #1,
dejar el dominio viejo respondiendo 200 mantiene dos copias del sitio compitiendo.

### Solución

Redirección permanente (308) a nivel de host en `next.config.ts`, **acotada al host exacto** de
producción viejo. Es importante que sea exacto y no un comodín `*.vercel.app`: los deploys de preview
también viven en `.vercel.app` y un comodín los rompería a todos.

---

## 3. El `lastmod` del sitemap es la hora del build · Media

### Problema

`app/sitemap.ts` calcula `const lastModified = new Date()` y se lo asigna a las 18 URLs. Cada deploy
—aunque solo cambie un color— reporta que las 18 páginas se modificaron en ese instante.

### Impacto SEO

Google documenta que `lastmod` solo se toma en cuenta si es «consistentemente y verificablemente
preciso». Un sitio que declara que todo cambió en cada deploy entrena al rastreador a **ignorar el
campo entero**. Se pierde la capacidad de señalar un cambio real cuando de verdad importe.

### Solución

Fecha estable por tipo de contenido, definida en el código y actualizada a mano solo cuando el
contenido cambia de verdad. Se eliminan también `changeFrequency` y `priority`, que Google declara
explícitamente que ignora.

---

## 4. FAQ idéntica en 17 URLs · Media

### Problema

`<Faq />` renderiza las mismas 10 preguntas (~1.500 palabras) en el home, en `/servicios`, en las 2
páginas de servicio y en las 13 landings de zona. Y `faqSchema()` emite el mismo `FAQPage` en las
mismas 17 URLs.

### Impacto SEO

Dos problemas distintos:

1. **Contenido:** las landings de zona son el activo que debe posicionar para «grúas Grecia», «grúas
   Naranjo», etc. Que el 40 % del texto de cada una sea idéntico al de las otras 12 diluye
   exactamente lo que las hace únicas.
2. **Schema:** la guía de Google para `FAQPage` pide que se use en la página cuyo contenido principal
   *son* esas preguntas. Repetirlo en todo el sitio es forzar la guía.

### Solución

Generar 3 preguntas propias por zona a partir de los datos reales que ya existen en `lib/zones.ts`
(rutas concretas, distritos cubiertos, relación con la base de Grecia) y anteponerlas a las
generales. No es texto hilado: cada respuesta dice algo verdadero y distinto de esa zona.

---

## 5. Sin analítica · Media

### Problema

No hay GA4, GTM ni ninguna medición. No se sabe qué páginas traen llamadas, qué consultas traen
gente, ni si un cambio mejoró o empeoró.

### Impacto SEO

Indirecto pero real: sin datos, cada decisión posterior es una corazonada.

### Solución

Cablear GA4 y GTM con `@next/third-parties`, leyendo los IDs de variables de entorno. Sin IDs
inventados: si la variable no existe, no se renderiza absolutamente nada y no se carga ningún script.

---

## 6. Sin verificación de Bing · Media

### Problema

`layout.tsx` contempla `NEXT_PUBLIC_GOOGLE_VERIFICATION` pero no hay equivalente para Bing.

### Impacto SEO

Bing es el índice detrás de Copilot y de DuckDuckGo. Para un negocio local es tráfico pequeño pero
real, y verificar el sitio da acceso gratuito a sus datos de rastreo.

### Solución

Agregar soporte para `NEXT_PUBLIC_BING_VERIFICATION` con el mismo patrón condicional.

---

## 7. Faltan CSP y Permissions-Policy · Media

### Problema

`next.config.ts` define `X-Content-Type-Options`, `Referrer-Policy` y `X-Frame-Options`. Vercel
agrega HSTS por su cuenta (verificado: `max-age=63072000`). Faltan `Content-Security-Policy` y
`Permissions-Policy`.

### Impacto SEO

Directo, ninguno: Google no usa cabeceras de seguridad como factor de ranking. Indirecto, sí — es
parte de lo que un auditor de calidad revisa, y una CSP bien puesta evita que un script inyectado
pueda exfiltrar datos o incrustar el sitio en un iframe ajeno.

### Solución y una decisión honesta

Se implementa una CSP que bloquea la superficie de ataque real de un sitio estático de folletería:
`frame-ancestors`, `base-uri`, `form-action`, `object-src`, `upgrade-insecure-requests`.

**No se implementa una CSP con nonces**, y conviene decir por qué en vez de simular que sí: los
nonces obligan a generar el HTML en cada petición, lo que **elimina la generación estática** del
sitio. Se cambiaría un TTFB de ~50 ms por uno de ~300 ms. En un sitio sin login, sin formularios y
sin entrada de usuario, ese intercambio no se justifica — y el objetivo declarado del proyecto es
Core Web Vitals cercanos a 100.

---

## 8–11. Problemas menores · Baja

| Problema | Detalle | Solución |
|----------|---------|----------|
| Sin manifest ni apple-touch-icon | Al guardar el sitio en la pantalla de inicio del teléfono aparece un icono genérico | Agregar `app/manifest.ts` y `apple-icon.svg` |
| `metadata` en `not-found.tsx` | Next.js **no lee** `export const metadata` desde `not-found.tsx`; es código muerto que aparenta funcionar. El 404 real ya lo da el estado HTTP 404 | Eliminar el export y documentar por qué |
| 4,4 MB sin usar | `IMG_9694.JPG` (3,07 MB) e `IMG_4771.jpg` (1,34 MB) no se referencian en ningún lado | Eliminar del repo |
| `host` en robots.txt | Directiva propietaria de Yandex; Google la ignora | Eliminar |

---

## 12. El factor que el código no puede resolver · Media

Hay que decirlo con claridad porque cambia las expectativas del proyecto: **para «grúas Grecia» y
consultas locales parecidas, el sitio web no es el factor principal de posicionamiento.** Lo es el
perfil de Google Business.

Cuando alguien busca «grúas Grecia» desde el teléfono, lo primero que aparece no son los diez enlaces
azules: es el paquete de mapas con tres fichas. Esas fichas salen de Google Business Profile, y se
ordenan por proximidad, relevancia y prominencia — donde el volumen y la frecuencia de **reseñas**
pesan muchísimo.

Un sitio técnicamente perfecto sin ficha de Google Business pierde contra un competidor con una ficha
mediocre y 40 reseñas. El código de este repositorio puede quedar impecable —y va a quedar
impecable— pero la ficha hay que crearla y trabajarla aparte. Va detallado en `SEO_REPORT.md`.

Del lado del código sí se puede preparar el terreno: dejar el `sameAs` del schema listo para enlazar
la ficha en cuanto exista, vía variable de entorno.

---

## Lo que se revisó y está correcto

No todo estaba mal. Esto se auditó y **no requiere cambios**:

- **Títulos y descripciones únicos** en las 18 URLs. Sin duplicados. Longitudes dentro de rango.
- **Jerarquía de encabezados** correcta: un solo `<h1>` por página, `<h2>`/`<h3>` bien anidados.
- **`alt` en todas las imágenes**, descriptivos y con las palabras clave de forma natural.
- **`next/image`** en todas las fotos, con AVIF/WebP, `sizes` correctos y `priority` solo en el LCP.
- **Fuentes autohospedadas** con `next/font` y `display: swap` — cero peticiones a Google en runtime.
- **Enlazado interno**: el pie enlaza las 13 zonas y los 2 servicios desde cualquier página; cada
  zona enlaza a sus vecinas. Profundidad máxima: 2 clics.
- **URLs limpias y con palabra clave**: `/gruas-grecia`, `/servicios/grua-plataforma`.
- **Breadcrumbs** visibles y con `BreadcrumbList` en JSON-LD.
- **`dynamicParams = false`** en las rutas dinámicas: cualquier slug inventado da 404 real, no una
  página vacía indexable.
- **Acordeón de FAQ con `<details>` nativo**: todo el texto está en el HTML inicial, sin depender de
  JavaScript para que el rastreador lo lea.
- **Sin `aggregateRating` ni reseñas inventadas** en el schema. Correcto y deliberado: fabricarlas es
  causa de penalización manual.
- **Enlace «Saltar al contenido»** y `aria-label` en los controles interactivos.
- **HTTPS** con HSTS activo, y apex → www con 308.

---

## Orden de ejecución

1. Problemas 1 y 2 — sin esto, nada más importa
2. Problemas 3, 4, 11 — indexación y contenido
3. Problemas 5, 6, 12 — medición y SEO local
4. Problemas 7, 8, 9, 10 — seguridad y limpieza
5. Build de producción, verificación y `SEO_REPORT.md`
