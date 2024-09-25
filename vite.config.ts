import vue from '@vitejs/plugin-vue'
import dns from 'dns'
import { URL, fileURLToPath } from 'node:url'
import AutoImport from 'unplugin-auto-import/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import Components from 'unplugin-vue-components/vite'
import { defineConfig } from 'vite'
import vueDevTools from 'vite-plugin-vue-devtools'
import svgLoader from 'vite-svg-loader'

dns.setDefaultResultOrder('verbatim')

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    svgLoader({
      svgoConfig: {
        multipass: true,
        plugins: [
          {
            name: 'preset-default',
            params: {
              overrides: {
                // viewBox is required to resize SVGs with CSS.
                // @see https://github.com/svg/svgo/issues/1128
                removeViewBox: false,
                convertColors: {
                  currentColor: true
                }
              }
            }
          },
          'removeDimensions'
        ]
      }
    }),
    vue(),
    vueDevTools(),
    Components({
      resolvers: [ElementPlusResolver()],
      dirs: ['src/components/base']
    }),
    AutoImport({
      dirs: ['src/utils'],
      resolvers: [ElementPlusResolver()],
      imports: ['vue', 'vue-router', 'pinia'],
      eslintrc: {
        enabled: true
      },
      dts: './auto-imports.d.ts',
      vueTemplate: true
    })
  ],
  css: {
    preprocessorOptions: {
      scss: {
        api: 'modern-compiler' // or "modern"
      }
    }
  },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  server: {
    port: 8080
  }
})
