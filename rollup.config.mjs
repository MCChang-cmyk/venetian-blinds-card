import typescript from '@rollup/plugin-typescript';
import nodeResolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
// 🎯 1. 引入剛剛安裝的 JSON 插件
import json from '@rollup/plugin-json'; 

export default {
  input: 'src/venetian-blinds-card.ts',
  output: {
    file: 'dist/venetian-blinds-card.js',
    format: 'es',
    sourcemap: false,
  },
  plugins: [
    // 🎯 2. 在插件陣列最前面或適當位置加上 json()
    json(), 
    nodeResolve(),
    commonjs(),
    typescript({
      typescript: await import('typescript').then(m => m.default)
    }),
  ],
};