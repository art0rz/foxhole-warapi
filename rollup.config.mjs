import typescript from '@rollup/plugin-typescript';
import dts from "rollup-plugin-dts";

export default [{
  input: 'src/index.ts',
  output: {
    dir: 'dist',
    format: 'cjs'
  },
  plugins: [typescript()]
}, {
  input: 'src/index.ts',
  output: {
    dir: 'dist',
    format: 'cjs'
  },
  plugins: [dts()]
}];