// Next 16 ya publica configuraciones flat nativas: no hace falta FlatCompat
// (que además rompe con eslint-plugin-react por referencias circulares).
import nextCoreWebVitals from 'eslint-config-next/core-web-vitals';
import nextTypeScript from 'eslint-config-next/typescript';

const config = [
  ...nextCoreWebVitals,
  ...nextTypeScript,
  {
    ignores: ['.next/**', 'node_modules/**', 'next-env.d.ts'],
  },
];

export default config;
