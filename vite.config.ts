import vue from '@vitejs/plugin-vue';
import { defineConfig, loadEnv } from 'vite';
import { nodePolyfills } from 'vite-plugin-node-polyfills';
import createSvgSpritePlugin from 'vite-plugin-svg-sprite';
import vueDevTools from 'vite-plugin-vue-devtools';
import { resolve } from 'path';

// https://vitejs.dev/config/
export default ({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');

  return defineConfig({
    base: '/history',
    define: {
      'process.env': JSON.parse(JSON.stringify(env)
        .replaceAll('VITE_', 'VUE_APP_')),
    },
    server: {
      host: true,
      port: 8080,
    },
    css: {
      preprocessorOptions: {
        scss: {
          api: 'modern',
          additionalData: `@use "@/app/css/main.scss" as *;`,
        },
      },
    },
    optimizeDeps: {
      include: ['clipboard-copy', 'deep-equal', 'deepmerge'],
    },
    resolve: {
      dedupe: ['vue', '@vue/compat'],
      alias: {
        vue: '@vue/compat',
        '@': resolve(__dirname, 'src'),
        'lodash/fp': 'lodash-es',
        'lodash': 'lodash-es',
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
        include: ['buffer', 'stream'],
        globals: {
          Buffer: true, // can also be 'build', 'dev', or false
        },
      }),
      createSvgSpritePlugin({
        include: '**/sprite/*.svg',
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
        'vue': 'vue',
      },
      environment: 'happy-dom',
      setupFiles: ['./tests/config/config.js'],
    },
  });
}
