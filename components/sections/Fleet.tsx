import Image from 'next/image';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Reveal } from '@/components/ui/Reveal';

/**
 * Galería de la flotilla.
 *
 * Los `alt` no son decorativos: son la única forma en que Google entiende
 * qué hay en cada foto, y son parte del posicionamiento por imágenes para
 * búsquedas como "grúas Grecia" o "grúa plataforma Costa Rica".
 */
const PHOTOS = [
  {
    src: '/grua1.jpg',
    alt: 'Grúa de plataforma de Grúas Zamora Moya rotulada con la bandera de Estados Unidos, en servicio en Grecia, Alajuela',
    // Ancho completo en móvil, cuadrante grande en escritorio
    span: 'col-span-2 row-span-2',
  },
  {
    src: '/grua2.jpg',
    alt: 'Unidad de Grúas Zamora Moya cargando un vehículo liviano sobre la cama plana en Costa Rica',
  },
  {
    src: '/grua5.jpg',
    alt: 'Grúa de Grúas Zamora Moya atendiendo un servicio de remolque en carretera de Occidente',
  },
  {
    src: '/grua6.jpg',
    alt: 'Detalle de la rotulación con barras y estrellas de una unidad de Grúas Zamora Moya',
  },
  {
    src: '/IMG_9693.jpg',
    alt: 'Unidad de arrastre de Grúas Zamora Moya lista para un rescate vehicular en Alajuela',
  },
];

export function Fleet() {
  return (
    <section className="bg-night-950 py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-5 sm:px-6">
        <SectionHeading
          eyebrow="La flotilla"
          title={
            <>
              Las unidades que <span className="text-flag-red-lit">va a ver llegar</span>
            </>
          }
          lead="Barras y estrellas sobre cada carrocería. Si ve esta rotulación acercándose, ya está resuelto."
        />

        <div className="mt-14 grid auto-rows-[180px] grid-cols-2 gap-3 sm:auto-rows-[200px] sm:grid-cols-4 lg:auto-rows-[230px]">
          {PHOTOS.map((photo, i) => (
            <Reveal
              key={photo.src}
              delay={Math.min(i * 80, 320)}
              className={`group relative overflow-hidden border border-chrome-300/10 ${photo.span ?? ''}`}
            >
              <Image
                src={photo.src}
                alt={photo.alt}
                fill
                sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                quality={70}
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-night-950/70 via-transparent to-transparent opacity-70 transition-opacity duration-500 group-hover:opacity-30" />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
