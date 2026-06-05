import resolve from '@rollup/plugin-node-resolve';
import typescript from '@rollup/plugin-typescript';
import terser from '@rollup/plugin-terser'; // 修正這行

export default {
  input: 'src/venetian-blinds-card.ts',
  output: {
    file: 'dist/venetian-blinds-card.js',
    format: 'es',
    sourcemap: true,
  },
  plugins: [
    resolve(),
    typescript(),
    terser({
      output: { comments: false }
    })
  ]
};