import vue from '@vitejs/plugin-vue';
import { resolve } from 'path';
import { defineConfig, loadEnv } from 'vite';
import { nodePolyfills } from 'vite-plugin-node-polyfills';
import vueDevTools from 'vite-plugin-vue-devtools';

// https://vitejs.dev/config/
export default ({ mode }) => {
	const env = loadEnv(mode, process.cwd(), '');

	return defineConfig({
		base: '/history',
		define: {
			'process.env': JSON.parse(
				JSON.stringify(env).replaceAll('VITE_', 'VUE_APP_'),
			),
		},
		server: {
			// host: true,  // uncomment me to enable localhost access by IP (including from other devices in the network)
		},
		css: {
			preprocessorOptions: {
				scss: {
					api: 'modern',
				},
			},
		},
		optimizeDeps: {
			include: [
				'clipboard-copy',
				'deep-equal',
				'deepmerge',
			],
			exclude: [
				'@webitel/ui-sdk/icons',
			],
		},
		resolve: {
			dedupe: [
				'vue',
				'@vue/compat',
			],
			alias: {
				vue: '@vue/compat',
				'@': resolve(__dirname, 'src'),
				'lodash/fp': 'lodash-es',
				lodash: 'lodash-es',
				/* vue-datepicker v4 relies on date-fns v2
         where "/esm" dir still exists. need to update vue-datepicker to v8 at least */
				'date-fns/esm': 'date-fns',
				'@aliasedDeps/api-services/axios': resolve(
					__dirname,
					'src/app/api/instance',
				),
			},
			// preserveSymlinks: false,
		},
		plugins: [
			vue({
				template: {
					compilerOptions: {
						compatConfig: {
							MODE: 2,
						},
					},
				},
			}),
			// https://www.npmjs.com/package/vite-plugin-node-polyfills
			nodePolyfills({
				// are needed for csv-parse
				include: [
					'buffer',
					'stream',
				],
				globals: {
					Buffer: true, // can also be 'build', 'dev', or false
				},
			}),
			vueDevTools({
				launchEditor: 'webstorm',
			}),
		],
		test: {
			globals: true,
			coverage: {
				enabled: true,
				reporter: 'json',
			},
			server: {
				deps: {
					inline: [
						'@webitel/ui-sdk/src',
					],
				},
			},
			alias: {
				/**
				 * override the default alias vue -> vue/compat for dev and prod,
				 * which is creating 2 vue instances while running tests :(
				 */
				vue: 'vue',
			},
			environment: 'happy-dom',
			setupFiles: [
				'./tests/config/config.js',
			],
		},
	});
};
