import { ImageResponse } from 'next/og';

/**
 * Icono para "Agregar a pantalla de inicio" en iOS.
 *
 * iOS no admite SVG para este icono —por eso `app/icon.svg` no le sirve— y
 * exige un PNG. Se genera con `next/og` en tiempo de build en vez de commitear
 * un binario más: a 180x180 el PNG pesa unos pocos KB, así que el problema de
 * peso que obligó a que la imagen de compartir fuera un JPG estático (ver
 * scripts/generate-og.mjs) aquí no aplica.
 *
 * El diseño es el mismo de la rotulación de las unidades: barras y estrellas.
 * iOS recorta el icono con esquinas redondeadas por su cuenta, así que el arte
 * llega hasta el borde a propósito.
 */

export const size = { width: 180, height: 180 };
export const contentType = 'image/png';

const ROJO = '#c8102e';
const AZUL = '#0a3161';
const CROMO = '#f5f8fc';

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          backgroundColor: CROMO,
        }}
      >
        {/* Cantón azul con la estrella */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: '100%',
            height: 78,
            backgroundColor: AZUL,
          }}
        >
          <svg width="46" height="46" viewBox="0 0 24 24" fill={CROMO}>
            <path d="M12 1.5 14.7 9.2 22.8 9.2 16.2 14.1 18.7 21.8 12 17 5.3 21.8 7.8 14.1 1.2 9.2 9.3 9.2Z" />
          </svg>
        </div>

        {/* Barras */}
        {[0, 1, 2].map((i) => (
          <div
            key={i}
            style={{
              display: 'flex',
              width: '100%',
              height: 17,
              marginTop: i === 0 ? 17 : 17,
              backgroundColor: ROJO,
            }}
          />
        ))}
      </div>
    ),
    size
  );
}
