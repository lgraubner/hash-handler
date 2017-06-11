import babel from 'rollup-plugin-babel';
import flow from 'rollup-plugin-flow';
import fs from 'fs';

const pkg = JSON.parse(fs.readFileSync('./package.json'));

export default {
  entry: 'src/index.js',
  external: ['query-string'],
  moduleName: 'hashHandler',
  globals: {
    'query-string': 'queryString',
  },
  useStrict: false,
  sourceMap: true,
  plugins: [flow({ pretty: true }), babel()],
  targets: [
    { dest: pkg.main, format: 'umd' },
    { dest: pkg.module, format: 'es' },
  ],
};
