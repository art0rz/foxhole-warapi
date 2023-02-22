import typescript from '@rollup/plugin-typescript';
import dts from 'rollup-plugin-dts';
import terser from '@rollup/plugin-terser';
import pkg from './package.json' assert { type: 'json' };

export default [{
	input: 'src/index.ts',
	output: [
		{
			file: pkg.main,
			format: 'cjs'
		},
		{
			file: pkg.module,
			format: 'es' // the preferred format
		},
		{
			file: pkg.browser,
			format: 'iife',
			name: 'FoxholeWarAPI' // the global which can be used in a browser
		}
	],
	plugins: [typescript(), terser()]
}, {
	input: pkg.types,
	output: {
		format: 'cjs'
	},
	plugins: [dts()]
}];