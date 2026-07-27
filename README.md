# Grúas Zamora Moya — Sitio web

Sitio de **Grúas Zamora Moya**, empresa de grúas de Grecia, Alajuela, con servicio 24/7 en todo Costa Rica.

Dos servicios, y solo dos: **grúa de plataforma** y **grúa de arrastre**. No se anuncia nada más — ver la nota en `lib/services.ts`.

Construido en **Next.js 16 (App Router)** con dos prioridades por encima de todo lo demás:

1. **Contacto inmediato.** Quien entra a esta página normalmente está varado en la carretera. El teléfono está visible arriba del pliegue en todas las páginas y, en móvil, hay una barra fija de llamada en la zona del pulgar.
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

---

## Estructura

```
app/
├── layout.tsx              Fuentes, metadata global y JSON-LD del negocio
├── page.tsx                Home
├── [zona]/page.tsx         Landings locales: /gruas-grecia, /gruas-occidente…
├── servicios/
│   ├── page.tsx            Índice de servicios
│   └── [servicio]/page.tsx Detalle de cada servicio (plataforma, arrastre)
├── sitemap.ts              /sitemap.xml
├── robots.ts               /robots.txt
├── opengraph-image.tsx     Imagen para compartir en WhatsApp y redes
├── icon.svg                Favicon (escudo de la marca)
├── not-found.tsx           404
└── globals.css             Sistema de diseño

components/
├── layout/                 Header, Footer, barra fija de llamada
├── sections/               Bloques de página
└── ui/                     Botones, escudo, revelado, contadores

lib/
├── site.ts                 ⭐ Teléfono, correo, dirección, redes
├── services.ts             Catálogo de servicios
├── zones.ts                Zonas de cobertura y su contenido
├── faq.ts                  Preguntas frecuentes
└── schema.ts               Constructores de JSON-LD
```

---

## Dónde editar el contenido

Casi todo el texto del sitio vive en `lib/`, no en los componentes.

| Para cambiar… | Edite |
| --- | --- |
| Teléfono, correo, dirección, redes sociales | `lib/site.ts` |
| Servicios que se ofrecen | `lib/services.ts` |
| Zonas de cobertura (cada una es una página) | `lib/zones.ts` |
| Preguntas frecuentes | `lib/faq.ts` |

**Agregar una zona nueva** basta con añadir un objeto a `ZONES` en `lib/zones.ts`: la página, el sitemap, los enlaces del pie y el JSON-LD se generan solos.

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

---

## SEO

Ya implementado en el código:

- Metadata por página con títulos bajo 60 caracteres y canónicas.
- JSON-LD: `LocalBusiness` + `AutomotiveBusiness`, `Service`, `FAQPage`, `BreadcrumbList`, `WebSite`.
- 14 landings locales con contenido propio por cantón (distritos, rutas, terreno).
- `sitemap.xml` y `robots.txt` generados; rastreadores de IA permitidos.
- Imágenes optimizadas en AVIF/WebP con textos alternativos descriptivos.
- Todo el contenido se renderiza en el servidor como HTML estático.

### Prioridad de palabras clave

El orden importa. Están declaradas en `TARGET_KEYWORDS` (`lib/site.ts`):

1. **Salir de primeros:** grúas Grecia, grúas occidente, grúas Alajuela, grúas San Ramón, grúas Naranjo, grúas Sarchí.
2. **Aparecer bien:** grúas en Costa Rica, grúa 24 horas, remolque de vehículos.

Cada cantón de Occidente tiene su propia página con contenido real —distritos, cuestas, rutas—, que es lo que separa una landing local que rankea de una plantilla repetida que Google ignora.

### Pendiente fuera del código

El código solo llega hasta cierto punto. Para rankear de primero en «grúas Grecia» hace falta además:

1. **Google Business Profile** verificado en Grecia, con horario 24 h, fotos de las unidades y el enlace al sitio. Es el factor más determinante del paquete local de Google.
2. **Reseñas de clientes reales.** Peso enorme en búsquedas locales.
3. **Dominio propio.** Un `.com` propio posiciona mejor que un subdominio de Vercel. `gruaszamora.com` ya está tomado; la recomendación es `gruaszamoramoya.com` — es el nombre completo de la empresa, sin guiones ni siglas, y calza exacto con el nombre del perfil de Google.
4. **Google Search Console:** dar de alta el dominio y enviar el sitemap.
5. **NAP consistente:** el nombre, teléfono y dirección deben escribirse **idénticos** en el sitio, Google, Facebook, Instagram y Waze.

---

## Rendimiento

Medido sobre la compilación de producción, primera carga de la portada:

| Recurso | Peso (comprimido) |
| --- | --- |
| HTML | 40 KB |
| CSS | 10 KB |
| JavaScript | 214 KB |
| Fuentes | 73 KB |
| Foto del hero (AVIF, 828 px) | 45 KB |
| **Total** | **≈ 382 KB** |

La foto original del hero pesa 1.26 MB; el visitante descarga 45 KB. Next.js la
convierte a AVIF y la sirve en el ancho exacto del dispositivo. **No hay que
mover las imágenes a un servicio externo:** eso agregaría un dominio más que
resolver y perdería esta optimización.

Lo que sí conviene cuidar:

- No subir fotos nuevas a `public/` sin necesidad. Las que no se usan igual se
  despliegan y ocupan espacio.
- `IMG_4771.jpg` (1.3 MB) e `IMG_9694.JPG` (3.1 MB) están en `public/` pero no
  se usan en ninguna página.
- Al agregar un peso tipográfico en `app/layout.tsx`, confirme que alguna clase
  lo use de verdad: cada peso es un archivo más que descargar.

---

## Configuración

Variables de entorno opcionales (`.env.local`):

```
NEXT_PUBLIC_SITE_URL=https://sudominio.com
NEXT_PUBLIC_GOOGLE_VERIFICATION=codigo-de-search-console
```

Sin `NEXT_PUBLIC_SITE_URL` el sitio usa `https://gruas-zamora.vercel.app` para canónicas y sitemap. **Actualícelo al comprar el dominio**, o Google indexará las URLs equivocadas.

---

## Despliegue

Vercel detecta Next.js sin configuración. Solo hay que definir `NEXT_PUBLIC_SITE_URL` en las variables de entorno del proyecto.
