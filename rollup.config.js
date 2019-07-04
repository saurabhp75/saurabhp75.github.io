import { terser } from "rollup-plugin-terser";

export default {
  input: 'index.js',
  external: ['d3'],
  output: {
    file: 'bundle.js',
    format: 'iife',
    sourcemap: true,
    globals: { d3: 'd3' }
  },
  plugins: [terser()]
};
