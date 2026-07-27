/**
 * Escudo de la marca: cantón azul con estrella y franjas rojo/blanco.
 * Es la misma bandera que llevan pintadas las unidades, reducida a un
 * símbolo que sigue siendo legible a 16 píxeles.
 *
 * `uid` mantiene único el id del clipPath cuando el escudo aparece más de
 * una vez en la misma página (header y footer, por ejemplo).
 */
export function ShieldMark({ className, uid = 'a' }: { className?: string; uid?: string }) {
  const outline =
    'M4 1h32a3 3 0 0 1 3 3v17c0 11-9 17.6-19 22C10 38.6 1 32 1 21V4a3 3 0 0 1 3-3z';
  const clipId = `gz-shield-${uid}`;

  return (
    <svg viewBox="0 0 40 44" className={className} fill="none" aria-hidden="true">
      <clipPath id={clipId}>
        <path d={outline} />
      </clipPath>

      <g clipPath={`url(#${clipId})`}>
        <rect width="40" height="44" fill="#f5f8fc" />
        <rect y="17" width="40" height="4.5" fill="#c8102e" />
        <rect y="26" width="40" height="4.5" fill="#c8102e" />
        <rect y="35" width="40" height="4.5" fill="#c8102e" />
        <rect width="40" height="17" fill="#0a3161" />
        <path
          d="M20 2.5 21.59 6.82 26.18 6.99 22.57 9.83 23.82 14.26 20 11.7 16.18 14.26 17.43 9.83 13.82 6.99 18.41 6.82Z"
          fill="#fff"
        />
      </g>

      <path d={outline} stroke="#f5f8fc" strokeWidth="1.8" />
    </svg>
  );
}
