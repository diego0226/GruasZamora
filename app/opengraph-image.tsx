import { ImageResponse } from 'next/og';
import { SITE } from '@/lib/site';

export const alt = 'Grúas Zamora Moya — Grúas 24/7 en Grecia, Occidente y todo Costa Rica';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

/**
 * Imagen que se ve al compartir el sitio en WhatsApp, Facebook o Messenger.
 * En un negocio local eso importa: la mayoría de las recomendaciones llegan
 * como un link pegado en un chat.
 */
export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          backgroundColor: '#08111d',
          padding: '64px 72px',
          fontFamily: 'sans-serif',
        }}
      >
        {/* Franja de la bandera */}
        <div style={{ display: 'flex', position: 'absolute', top: 0, left: 0, right: 0, height: 12 }}>
          <div style={{ flex: 1, backgroundColor: '#c8102e' }} />
          <div style={{ flex: 1, backgroundColor: '#f5f8fc' }} />
          <div style={{ flex: 1, backgroundColor: '#1b4f8f' }} />
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: 18,
              height: 18,
              borderRadius: 9,
              backgroundColor: '#e8192f',
            }}
          />
          <div
            style={{
              display: 'flex',
              fontSize: 22,
              fontWeight: 700,
              letterSpacing: 6,
              color: '#aebccd',
            }}
          >
            DISPONIBLE 24 HORAS · 365 DÍAS
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <div
            style={{
              display: 'flex',
              fontSize: 82,
              fontWeight: 800,
              lineHeight: 1.05,
              color: '#f5f8fc',
              letterSpacing: -2,
            }}
          >
            GRÚAS 24/7 EN GRECIA,
          </div>
          <div
            style={{
              display: 'flex',
              fontSize: 82,
              fontWeight: 800,
              lineHeight: 1.05,
              color: '#e8192f',
              letterSpacing: -2,
            }}
          >
            OCCIDENTE Y COSTA RICA
          </div>
          <div
            style={{
              display: 'flex',
              marginTop: 26,
              fontSize: 30,
              color: '#aebccd',
            }}
          >
            Plataforma · Arrastre · Rescate vehicular
          </div>
        </div>

        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <div style={{ display: 'flex', fontSize: 26, fontWeight: 700, color: '#f5f8fc', letterSpacing: 4 }}>
              GRÚAS ZAMORA MOYA
            </div>
            <div style={{ display: 'flex', fontSize: 22, color: '#64748b', marginTop: 8 }}>
              {SITE.address.display}
            </div>
          </div>

          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              backgroundColor: '#c8102e',
              color: '#ffffff',
              fontSize: 46,
              fontWeight: 800,
              padding: '20px 38px',
              letterSpacing: -1,
            }}
          >
            {SITE.phone.display}
          </div>
        </div>
      </div>
    ),
    size
  );
}
