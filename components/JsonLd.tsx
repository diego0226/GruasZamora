/**
 * Inyecta JSON-LD. Se renderiza en el servidor, así que el schema ya viene
 * en el HTML inicial: no depende de que el crawler ejecute JavaScript.
 */
export function JsonLd({ data }: { data: object | object[] }) {
  return (
    <script
      type="application/ld+json"
      // El contenido es nuestro, generado desde lib/schema.ts — nunca input de usuario.
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(data).replace(/</g, '\\u003c'),
      }}
    />
  );
}
