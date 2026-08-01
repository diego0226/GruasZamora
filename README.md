# Grúas Zamora Moya — Sitio web

Sitio de **Grúas Zamora Moya**, empresa de grúas de Grecia, Alajuela, con servicio 24/7 en todo Costa Rica.

Dos servicios, y solo dos: **grúa de plataforma** y **grúa de arrastre**. No se anuncia nada más — ver la nota en `lib/services.ts`.

Construido en **Next.js 16 (App Router)** con dos prioridades por encima de todo lo demás:

1. **Contacto inmediato.** Quien entra a esta página normalmente está varado en la carretera. El teléfono está visible arriba del pliegue en todas las páginas y, apenas se empieza a bajar, aparecen accesos flotantes de llamada y WhatsApp en la esquina inferior derecha (en todos los tamaños de pantalla, no solo en móvil — ver `components/layout/FloatingContact.tsx`).
2. **Posicionamiento local.** Salir de primeros cuando alguien en Grecia, Naranjo, Sarchí, San Ramón o Alajuela busque «grúas» en Google. El alcance nacional viene después.

---

## Arrancar el proyecto

```bash
npm install
```

```bash
npm run dev
```

Abre en `http://localhost:3000`.

| Comando | Qué hace |
| --- | --- |
| `npm run dev` | Servidor de desarrollo |
| `npm run build` | Compilación de producción |
| `npm start` | Sirve la compilación de producción |
| `npm run lint` | ESLint |

> El `build` descarga las fuentes de Google la primera vez (`next/font` las autohospeda en el resultado, pero necesita bajarlas para eso). En una red sin salida a internet el build falla ahí. No afecta al visitante: en producción las fuentes se sirven desde el propio dominio.

---

## Estructura

```
app/
├── layout.tsx                  Fuentes, metadata global y JSON-LD del negocio
├── page.tsx                    Home — única página con FAQPage
├── [zona]/page.tsx             Landings locales: /gruas-grecia, /gruas-occidente…
├── servicios/
│   ├── page.tsx                Índice + tabla comparativa plataforma vs arrastre
│   └── [servicio]/page.tsx     Detalle de cada servicio (plataforma, arrastre)
├── contacto/page.tsx           NAP indexable, qué datos enviar al llamar
├── que-hacer-si-se-vara/       Guía de emergencia
├── privacidad/page.tsx         Política de privacidad
├── llms.txt/route.ts           Resumen del negocio para agentes de IA
├── sitemap.ts                  /sitemap.xml
├── robots.ts                   /robots.txt
├── manifest.ts                 /manifest.webmanifest
├── icon.svg                    Favicon (escudo de la marca)
├── apple-icon.tsx              PNG 180×180 para iOS — también es el `logo` del schema
├── not-found.tsx               404
└── globals.css                 Sistema de diseño

components/
├── layout/                     Header, Footer, accesos flotantes
├── sections/                   Bloques de página
├── ui/                         Botones, escudo, revelado, contadores
├── Analytics.tsx               GA4 o GTM, solo si hay variable configurada
└── CtaTracking.tsx             Convierte clics de `data-cta` en eventos

lib/
├── site.ts                     ⭐ Teléfono, correo, dirección, redes, fechas
├── nav.ts                      ⭐ Navegación ligera para componentes de cliente
├── metadata.ts                 Constructor de metadatos por página
├── services.ts                 Catálogo de servicios
├── zones.ts                    Zonas de cobertura y su contenido
├── faq.ts                      Preguntas frecuentes
└── schema.ts                   Constructores de JSON-LD

scripts/
└── generate-og.mjs             Genera public/og.jpg (requiere `sharp`)
```

La imagen para compartir es un JPG estático en `public/og.jpg`, **no** una ruta `opengraph-image`. El motivo está explicado en la cabecera de `scripts/generate-og.mjs`: `next/og` solo emite PNG y uno de 1200×630 con una foto dentro pesa ~1,3 MB, peso al que WhatsApp descarta la vista previa.

---

## Dos reglas que hay que conocer antes de tocar nada

### 1. `lib/nav.ts` para componentes de cliente, nunca `lib/zones.ts`

`lib/zones.ts` pesa unos 24 KB de texto editorial. Si un componente con `'use client'` lo importa —aunque solo use tres nombres— el empaquetador manda el módulo entero al navegador **en todas las páginas**. Pasó con el `Header`.

`lib/nav.ts` tiene lo mínimo (slug y nombre) y es lo que deben importar los componentes de cliente. Los de servidor pueden usar los catálogos completos sin coste.

Las dos listas se verifican entre sí durante el build: agregar una zona y olvidar `lib/nav.ts` **revienta `npm run build`** con un mensaje explícito, en vez de dejar un hueco silencioso en el menú.

### 2. La FAQ general vive solo en la portada

Las diez preguntas de `FAQS` (`lib/faq.ts`) se muestran **únicamente** en el home, que es también la única URL que emite `FAQPage`.

Antes se repetían en las 18 páginas: 638 palabras × 18 URLs. Medido sobre el HTML compilado, dos landings de zona cualesquiera compartían entre el 69 % y el 74 % de sus secuencias de ocho palabras, y la de Poás resultaba única solo en un 26,7 %. Tras la corrección esas cifras bajaron a 48–54 % de solapamiento y 44,8 % de contenido exclusivo.

Cada tipo de página lleva ahora sus propias preguntas: `zoneFaqs(zone)` en las zonas, `service.faqs` en los servicios. El resto se alcanza por enlace.

---

## Dónde editar el contenido

Casi todo el texto del sitio vive en `lib/`, no en los componentes.

| Para cambiar… | Edite |
| --- | --- |
| Teléfono, correo, dirección, redes sociales | `lib/site.ts` |
| Años de trayectoria | `lib/site.ts` → `foundedYear` (los años se calculan solos) |
| Fechas de última revisión | `lib/site.ts` → `CONTENT_UPDATED` |
| Servicios que se ofrecen | `lib/services.ts` |
| Zonas de cobertura (cada una es una página) | `lib/zones.ts` **y** `lib/nav.ts` |
| Preguntas frecuentes generales | `lib/faq.ts` |

**Agregar una zona nueva:** añada el objeto a `ZONES` en `lib/zones.ts` y la entrada correspondiente en `ZONE_LINKS` de `lib/nav.ts`. La página, el sitemap, los enlaces del pie, las zonas vecinas y el JSON-LD se generan solos. Si olvida `lib/nav.ts`, el build falla y le dice qué falta.

Las **zonas vecinas** se calculan como grafo no dirigido: basta con declarar `nearby` en un sentido y `getNeighbors()` devuelve también las que apuntan a esa zona. No hay que editar las dos listas.

---

## Diseño

La paleta sale de la rotulación real de las unidades: azul marino con estrellas, franjas rojo y blanco, y ámbar de la barra de luces.

| Rol | Color |
| --- | --- |
| Fondo | `night-900` `#08111d` |
| Tarjetas | `night-800` `#0d1c2e` |
| Acción principal | `flag-red` `#c8102e` |
| Azul bandera | `flag-blue` `#0a3161` |
| Texto | `chrome-100` `#e6ecf4` |
| Urgencia / 24-7 | `signal` `#ffb020` |

Tipografía: **Anton** para titulares (condensada, como las letras pintadas en los camiones) y **Barlow** para el texto. Ambas se autohospedan con `next/font`, sin peticiones a Google en tiempo de ejecución.

> **Contraste:** `chrome-500` (`#64748b`) da 4,0–4,2:1 sobre los fondos oscuros del sitio, por debajo del 4,5:1 que pide WCAG AA para texto normal. No lo use para texto legible; para etiquetas pequeñas use `chrome-400`.

---

## SEO

Ya implementado en el código:

- Metadata por página con títulos bajo 60 caracteres, descripciones bajo 155 y canónicas propias.
- `openGraph` y `twitter` completos en cada ruta, construidos con `lib/metadata.ts`.
- JSON-LD atado por `@id`: `LocalBusiness` + `AutomotiveBusiness`, `WebSite`, `WebPage`, `Service`, `ImageObject`, `BreadcrumbList`, `ItemList` y `FAQPage` (solo en el home).
- 14 landings locales con contenido propio por cantón (distritos, rutas, terreno) y cinco preguntas frecuentes generadas de sus datos reales.
- `sitemap.xml` y `robots.txt` generados; rastreadores de IA permitidos.
- `llms.txt` generado desde las mismas fuentes que el sitio visible.
- Imágenes optimizadas en AVIF/WebP con textos alternativos descriptivos.
- Todo el contenido se renderiza en el servidor como HTML estático.

### Prioridad de palabras clave

El orden importa. Están declaradas en `TARGET_KEYWORDS` (`lib/site.ts`):

1. **Salir de primeros:** grúas Grecia, grúas occidente, grúas Alajuela, grúas San Ramón, grúas Naranjo, grúas Sarchí.
2. **Aparecer bien:** grúas en Costa Rica, grúa 24 horas, remolque de vehículos.

### Pendiente fuera del código

El código solo llega hasta cierto punto. Estado verificado en producción el 31 de julio de 2026:

| | Estado |
| --- | --- |
| Dominio propio y canónicas | ✅ `www.gruaszamoramoya.com`, con 308 de un solo salto desde el apex, desde `http://` y desde el dominio viejo de Vercel |
| Google Search Console | ✅ etiqueta de verificación presente |
| Bing Webmaster Tools | ❌ sin verificar — es el índice detrás de Copilot y DuckDuckGo |
| Analítica (GA4 o GTM) | ❌ ninguna configurada: el sitio no está midiendo nada |
| Ficha de Google Business enlazada | ❌ `NEXT_PUBLIC_GOOGLE_BUSINESS_URL` vacía |
| Reseñas de clientes reales | ❌ pendiente — peso enorme en búsquedas locales |

Las cuatro filas con ❌ se resuelven **configurando variables en Vercel y cuentas externas**, no tocando código. La ficha de Google Business es, con diferencia, la más importante: para «grúas Grecia» el paquete de mapas sale antes que los enlaces azules, y ese paquete lo alimenta la ficha.

**NAP consistente:** el nombre, teléfono y dirección deben escribirse **idénticos** en el sitio, Google, Facebook, Instagram y Waze. Hoy existen fichas de la empresa en varios directorios (nexdu, tuugo, amarillasaz, amerpages, aiyellow) que aparecen en la búsqueda de marca por encima del sitio propio; conviene revisarlas y alinearlas.

---

## Rendimiento

Medido el 31 de julio de 2026 sobre `https://www.gruaszamoramoya.com`, con `curl` desde fuera de Costa Rica. No es una prueba de campo: para eso hacen falta PageSpeed Insights y el informe de Core Web Vitals de Search Console, que necesita tráfico real acumulado.

| Recurso | Medida |
| --- | --- |
| HTML de la portada | 240 KB sin comprimir → **27,5 KB transferidos** |
| Foto del hero (AVIF, 828 px) | 25 KB |
| Foto del hero (AVIF, 1920 px) | 112 KB |
| Fuentes precargadas | 5 archivos, 76 KB en total |
| TTFB | ~370 ms desde EE. UU., servido de caché de borde |

La foto original del hero pesa 1,26 MB; el visitante descarga 25 KB en móvil. Next.js la convierte a AVIF y la sirve en el ancho exacto del dispositivo. **No hay que mover las imágenes a un servicio externo:** eso agregaría un dominio más que resolver y perdería esta optimización.

Lo que sí conviene cuidar:

- No subir fotos nuevas a `public/` sin necesidad. Las que no se usan igual se despliegan y ocupan espacio. Hoy las ocho que hay se usan todas.
- Al agregar un peso tipográfico en `app/layout.tsx`, confirme que alguna clase lo use de verdad: cada peso es un archivo más que descargar, y hoy ya se precargan cinco.
- No importe `lib/zones.ts` ni `lib/services.ts` desde un componente de cliente. Ver la regla 1 más arriba.

---

## Configuración

Todas las variables son opcionales; el sitio funciona sin ninguna. Ver `.env.example` para la explicación de cada una.

```
NEXT_PUBLIC_SITE_URL                 Solo para previews. Por defecto usa el dominio real.
NEXT_PUBLIC_GOOGLE_VERIFICATION      Search Console
NEXT_PUBLIC_BING_VERIFICATION        Bing Webmaster Tools
NEXT_PUBLIC_GA_ID                    Google Analytics 4
NEXT_PUBLIC_GTM_ID                   Google Tag Manager (tiene prioridad sobre GA4)
NEXT_PUBLIC_GOOGLE_BUSINESS_URL      Ficha de Google Business → sameAs del JSON-LD
```

`NEXT_PUBLIC_SITE_URL` **no hace falta en producción**: el valor por defecto en `lib/site.ts` ya es `https://www.gruaszamoramoya.com`. Es a propósito — si dependiera de que alguien recuerde configurarla, el día que se olvide el sitio entero le diría a Google que la versión buena está en otro dominio.

---

## Despliegue

Vercel detecta Next.js sin configuración. No hace falta definir ninguna variable para que el sitio funcione y posicione correctamente; las de la tabla de arriba solo activan medición y verificaciones.
